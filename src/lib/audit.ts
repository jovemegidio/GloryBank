import { prisma } from "./prisma";
import { DEMO_MODE } from "./demo";

export type AuditAction =
  | "LOGIN"
  | "LOGOUT"
  | "REGISTER"
  | "PIX_SENT"
  | "BOLETO_CREATED"
  | "TRANSFER_SENT"
  | "2FA_ENABLED"
  | "2FA_DISABLED"
  | "SESSION_EXPIRED"
  | "CARD_REQUESTED"
  | "SCHEDULED_TRANSFER_CREATED"
  | "SCHEDULED_TRANSFER_CANCELLED";

export async function createAuditLog({
  userId,
  action,
  ipAddress,
  userAgent,
  metadata,
}: {
  userId: string;
  action: AuditAction;
  ipAddress?: string | null;
  userAgent?: string | null;
  metadata?: Record<string, unknown>;
}): Promise<void> {
  // Skip audit logs in demo mode or when database is unavailable
  if (DEMO_MODE) return;

  try {
    await prisma.auditLog.create({
      data: {
        userId,
        action,
        ipAddress: ipAddress?.substring(0, 45) ?? null,
        userAgent: userAgent?.substring(0, 500) ?? null,
        metadata: metadata ? JSON.stringify(metadata) : null,
      },
    });
  } catch (error) {
    // Audit log failures should never break the main flow
    console.error("Audit log error:", error);
  }
}
