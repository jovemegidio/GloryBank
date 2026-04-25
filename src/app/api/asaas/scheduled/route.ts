import { NextRequest } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { cancelTransfer, createTransfer, normalizePixKey } from "@/lib/asaas";
import { prisma } from "@/lib/prisma";
import { successResponse, errorResponse } from "@/lib/api-response";
import { DEMO_USER_ID, DEMO_SCHEDULED_TRANSFERS } from "@/lib/demo";
import { createAuditLog } from "@/lib/audit";

const PIX_KEY_TYPES = new Set(["CPF", "CNPJ", "EMAIL", "PHONE", "EVP"]);
let demoScheduled = [...DEMO_SCHEDULED_TRANSFERS];

function parseScheduledDate(value: string): Date | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;

  const date = new Date(`${value}T12:00:00`);
  return Number.isNaN(date.getTime()) ? null : date;
}

function serializeScheduledTransfer(transfer: {
  id: string;
  pixKey: string;
  pixKeyType: string;
  amount: number;
  description: string | null;
  scheduledDate: Date | string;
  recurrence: string | null;
  status: string;
}) {
  return {
    id: transfer.id,
    pixKey: transfer.pixKey,
    pixKeyType: transfer.pixKeyType,
    amount: transfer.amount,
    description: transfer.description,
    scheduledDate:
      transfer.scheduledDate instanceof Date
        ? transfer.scheduledDate.toISOString()
        : transfer.scheduledDate,
    recurrence: transfer.recurrence ?? "ONCE",
    status: transfer.status,
  };
}

function createExternalReference(userId: string): string {
  return `sched_${userId}_${Date.now()}`;
}

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) return errorResponse("Nao autenticado", 401);

    if (user.id === DEMO_USER_ID) {
      return successResponse({
        data: demoScheduled.map((transfer) => serializeScheduledTransfer(transfer)),
      });
    }

    const transfers = await prisma.scheduledTransfer.findMany({
      where: { userId: user.id },
      orderBy: { scheduledDate: "asc" },
    });

    return successResponse({
      data: transfers.map((transfer) =>
        serializeScheduledTransfer({
          id: transfer.id,
          pixKey: transfer.pixKey,
          pixKeyType: transfer.pixKeyType,
          amount: Number(transfer.amount),
          description: transfer.description,
          scheduledDate: transfer.scheduledDate,
          recurrence: transfer.recurrence,
          status: transfer.status,
        })
      ),
    });
  } catch (error) {
    console.error("Scheduled transfers error:", error);
    return errorResponse("Erro ao buscar agendamentos", 500);
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) return errorResponse("Nao autenticado", 401);
    if (!user.asaasApiKey && user.id !== DEMO_USER_ID) {
      return errorResponse("Conta bancaria nao configurada", 400);
    }

    const body = await request.json();
    const pixKey = typeof body.pixKey === "string" ? body.pixKey.trim() : "";
    const pixKeyType = typeof body.pixKeyType === "string" ? body.pixKeyType : "";
    const amount = Number(body.amount);
    const description =
      typeof body.description === "string" && body.description.trim() !== ""
        ? body.description.trim()
        : null;
    const scheduledDate = typeof body.scheduledDate === "string" ? body.scheduledDate : "";
    const recurrence = typeof body.recurrence === "string" ? body.recurrence.toUpperCase() : "ONCE";

    if (!pixKey || !PIX_KEY_TYPES.has(pixKeyType) || !scheduledDate || !Number.isFinite(amount)) {
      return errorResponse("Dados invalidos", 400);
    }

    if (amount <= 0) return errorResponse("Valor deve ser positivo", 400);
    if (recurrence !== "ONCE") {
      return errorResponse(
        "PIX recorrente ainda nao foi habilitado nesta integracao. Use agendamento unico.",
        400
      );
    }

    const date = parseScheduledDate(scheduledDate);
    if (!date) return errorResponse("Data do agendamento invalida", 400);
    if (date <= new Date()) return errorResponse("Data deve ser futura", 400);

    const normalizedPixKey = normalizePixKey(
      pixKey,
      pixKeyType as "CPF" | "CNPJ" | "EMAIL" | "PHONE" | "EVP"
    );

    if (user.id === DEMO_USER_ID) {
      const newTransfer = {
        id: `demo-sched-${Date.now()}`,
        pixKey: normalizedPixKey,
        pixKeyType,
        amount,
        description,
        scheduledDate: date.toISOString(),
        recurrence,
        status: "PENDING",
      };
      demoScheduled = [newTransfer, ...demoScheduled];
      return successResponse(serializeScheduledTransfer(newTransfer), 201);
    }

    const externalReference = createExternalReference(user.id);
    const remoteTransfer = await createTransfer(
      {
        value: amount,
        operationType: "PIX",
        pixAddressKey: normalizedPixKey,
        pixAddressKeyType: pixKeyType,
        description: description ?? undefined,
        scheduleDate: scheduledDate,
        externalReference,
      },
      user.asaasApiKey!
    );

    const transfer = await prisma.scheduledTransfer.create({
      data: {
        userId: user.id,
        asaasTransferId: remoteTransfer.id,
        externalReference,
        pixKey: normalizedPixKey,
        pixKeyType,
        amount,
        description,
        scheduledDate: date,
        recurrence,
        status: remoteTransfer.status,
      },
    });

    await createAuditLog({
      userId: user.id,
      action: "SCHEDULED_TRANSFER_CREATED",
      ipAddress: request.headers.get("x-forwarded-for"),
      userAgent: request.headers.get("user-agent"),
      metadata: {
        amount,
        scheduledDate,
        pixKeyType,
      },
    });

    return successResponse(
      serializeScheduledTransfer({
        id: transfer.id,
        pixKey: transfer.pixKey,
        pixKeyType: transfer.pixKeyType,
        amount: Number(transfer.amount),
        description: transfer.description,
        scheduledDate: transfer.scheduledDate,
        recurrence: transfer.recurrence,
        status: transfer.status,
      }),
      201
    );
  } catch (error) {
    console.error("Create scheduled transfer error:", error);
    return errorResponse("Erro ao criar agendamento", 500);
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) return errorResponse("Nao autenticado", 401);

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return errorResponse("ID e obrigatorio", 400);

    if (user.id === DEMO_USER_ID) {
      demoScheduled = demoScheduled.filter((transfer) => transfer.id !== id);
      return successResponse({ success: true });
    }

    const transfer = await prisma.scheduledTransfer.findFirst({
      where: { id, userId: user.id },
    });

    if (!transfer) {
      return errorResponse("Agendamento nao encontrado", 404);
    }

    if (["DONE", "CANCELLED", "FAILED"].includes(transfer.status)) {
      return errorResponse("Este agendamento nao pode mais ser cancelado", 400);
    }

    if (transfer.asaasTransferId && user.asaasApiKey) {
      await cancelTransfer(transfer.asaasTransferId, user.asaasApiKey);
    }

    await prisma.scheduledTransfer.update({
      where: { id: transfer.id },
      data: { status: "CANCELLED" },
    });

    await createAuditLog({
      userId: user.id,
      action: "SCHEDULED_TRANSFER_CANCELLED",
      ipAddress: request.headers.get("x-forwarded-for"),
      userAgent: request.headers.get("user-agent"),
      metadata: {
        scheduledTransferId: transfer.id,
      },
    });

    return successResponse({ success: true });
  } catch (error) {
    console.error("Delete scheduled transfer error:", error);
    return errorResponse("Erro ao cancelar agendamento", 500);
  }
}
