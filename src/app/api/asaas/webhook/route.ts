import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { successResponse, errorResponse } from "@/lib/api-response";
import { DEMO_MODE } from "@/lib/demo";

/**
 * Asaas Webhook Receiver
 * Recebe notificações em tempo real do Asaas sobre status de transações.
 * Configure a URL no painel Asaas: Configurações → Notificações → Webhook
 * URL: https://your-app.vercel.app/api/asaas/webhook
 */
export async function POST(request: NextRequest) {
  // Demo mode: ignore webhooks
  if (DEMO_MODE) {
    return successResponse({ received: true });
  }

  try {
    // Validate webhook token from Asaas
    const webhookToken = request.headers.get("asaas-access-token");
    const expectedToken = process.env.ASAAS_WEBHOOK_TOKEN;

    if (!expectedToken) {
      console.warn("ASAAS_WEBHOOK_TOKEN not configured — webhook rejected");
      return errorResponse("Webhook token not configured", 500);
    }

    if (!webhookToken || webhookToken !== expectedToken) {
      return errorResponse("Unauthorized", 401);
    }

    const body = await request.json();
    const { event, payment } = body;

    if (!event || !payment) {
      return errorResponse("Invalid webhook payload", 400);
    }

    // Map Asaas event to our transaction status
    const statusMap: Record<string, string> = {
      PAYMENT_CONFIRMED: "CONFIRMED",
      PAYMENT_RECEIVED: "CONFIRMED",
      PAYMENT_OVERDUE: "FAILED",
      PAYMENT_DELETED: "CANCELLED",
      PAYMENT_REFUNDED: "REFUNDED",
      PAYMENT_REFUND_IN_PROGRESS: "PENDING",
      TRANSFER_CREATED: "PENDING",
      TRANSFER_PENDING: "PENDING",
      TRANSFER_IN_BANK_PROCESSING: "PENDING",
      TRANSFER_DONE: "CONFIRMED",
      TRANSFER_FAILED: "FAILED",
      TRANSFER_CANCELLED: "CANCELLED",
    };

    const newStatus = statusMap[event];
    if (!newStatus) {
      // Unhandled event — log and acknowledge
      console.log(`Asaas webhook: unhandled event "${event}"`);
      return successResponse({ received: true });
    }

    // Update transaction if we have it locally (by asaasId)
    if (payment.id) {
      const updated = await prisma.transaction.updateMany({
        where: { asaasId: payment.id },
        data: { status: newStatus, updatedAt: new Date() },
      });

      if (updated.count > 0 && newStatus === "CONFIRMED") {
        // Create notification for user
        const transaction = await prisma.transaction.findFirst({
          where: { asaasId: payment.id },
        });
        if (transaction) {
          const isReceived = event === "PAYMENT_RECEIVED" || event === "PAYMENT_CONFIRMED";
          await prisma.notification.create({
            data: {
              userId: transaction.userId,
              title: isReceived ? "Pagamento confirmado" : "Atualização de transação",
              message: isReceived
                ? `Recebemos a confirmação do seu pagamento de R$ ${Number(transaction.amount).toFixed(2)}.`
                : `Status da transação atualizado para: ${newStatus}.`,
            },
          });
        }
      }
    }

    return successResponse({ received: true });
  } catch (error) {
    console.error("Asaas webhook error:", error);
    return errorResponse("Webhook processing failed", 500);
  }
}
