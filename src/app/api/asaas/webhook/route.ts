import { NextRequest } from "next/server";
import type { TransactionStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { successResponse, errorResponse } from "@/lib/api-response";
import { DEMO_MODE } from "@/lib/demo";

const STATUS_MAP: Record<string, string> = {
  PAYMENT_CONFIRMED: "CONFIRMED",
  PAYMENT_RECEIVED: "CONFIRMED",
  PAYMENT_OVERDUE: "FAILED",
  PAYMENT_DELETED: "CANCELLED",
  PAYMENT_REFUNDED: "REFUNDED",
  PAYMENT_REFUND_IN_PROGRESS: "PENDING",
  TRANSFER_CREATED: "PENDING",
  TRANSFER_PENDING: "PENDING",
  TRANSFER_IN_BANK_PROCESSING: "PENDING",
  TRANSFER_DONE: "DONE",
  TRANSFER_FAILED: "FAILED",
  TRANSFER_CANCELLED: "CANCELLED",
};

export async function POST(request: NextRequest) {
  if (DEMO_MODE) {
    return successResponse({ received: true });
  }

  try {
    const webhookToken = request.headers.get("asaas-access-token");
    const expectedToken = process.env.ASAAS_WEBHOOK_TOKEN;

    if (!expectedToken) {
      console.warn("ASAAS_WEBHOOK_TOKEN not configured; webhook rejected");
      return errorResponse("Webhook token not configured", 500);
    }

    if (!webhookToken || webhookToken !== expectedToken) {
      return errorResponse("Unauthorized", 401);
    }

    const body = await request.json();
    const event = typeof body.event === "string" ? body.event : "";
    const payment = body.payment as { id?: string } | undefined;
    const transfer = body.transfer as { id?: string } | undefined;
    const entityId = payment?.id ?? transfer?.id;

    if (!event || !entityId) {
      return errorResponse("Invalid webhook payload", 400);
    }

    const newStatus = STATUS_MAP[event];
    if (!newStatus) {
      console.log(`Asaas webhook: unhandled event "${event}"`);
      return successResponse({ received: true });
    }

    const [updatedTransactions, updatedScheduledTransfers] = await Promise.all([
      prisma.transaction.updateMany({
        where: { asaasId: entityId },
        data: { status: (newStatus === "DONE" ? "CONFIRMED" : newStatus) as TransactionStatus, updatedAt: new Date() },
      }),
      prisma.scheduledTransfer.updateMany({
        where: { asaasTransferId: entityId },
        data: { status: newStatus, updatedAt: new Date() },
      }),
    ]);

    if (updatedTransactions.count > 0 && (newStatus === "CONFIRMED" || newStatus === "DONE")) {
      const transaction = await prisma.transaction.findFirst({
        where: { asaasId: entityId },
      });

      if (transaction) {
        const isPaymentEvent = event.startsWith("PAYMENT_");
        await prisma.notification.create({
          data: {
            userId: transaction.userId,
            title: isPaymentEvent ? "Pagamento confirmado" : "Transferencia atualizada",
            message: isPaymentEvent
              ? `Recebemos a confirmacao de um pagamento de R$ ${Number(transaction.amount).toFixed(2)}.`
              : `A transferencia vinculada ao Asaas foi atualizada para ${newStatus}.`,
          },
        });
      }
    }

    if (updatedScheduledTransfers.count > 0 && (newStatus === "DONE" || newStatus === "CANCELLED")) {
      const scheduledTransfer = await prisma.scheduledTransfer.findFirst({
        where: { asaasTransferId: entityId },
      });

      if (scheduledTransfer) {
        await prisma.notification.create({
          data: {
            userId: scheduledTransfer.userId,
            title: newStatus === "DONE" ? "Agendamento executado" : "Agendamento cancelado",
            message:
              newStatus === "DONE"
                ? `Seu agendamento PIX de R$ ${Number(scheduledTransfer.amount).toFixed(2)} foi executado.`
                : "O agendamento PIX foi cancelado no Asaas.",
          },
        });
      }
    }

    return successResponse({ received: true });
  } catch (error) {
    console.error("Asaas webhook error:", error);
    return errorResponse("Webhook processing failed", 500);
  }
}
