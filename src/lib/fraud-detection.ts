import { prisma } from "./prisma";

export interface FraudCheckResult {
  blocked: boolean;
  reason?: string;
  alerts: Array<{ type: string; severity: "LOW" | "MEDIUM" | "HIGH"; detail: string }>;
}

export async function checkFraud(
  userId: string,
  amount: number,
  ip: string
): Promise<FraudCheckResult> {
  const alerts: FraudCheckResult["alerts"] = [];
  const now = new Date();

  // VELOCITY: >3 transações financeiras nos últimos 60 segundos
  const since60s = new Date(now.getTime() - 60_000);
  const recentCount = await prisma.auditLog.count({
    where: {
      userId,
      action: { in: ["PIX_SENT", "TRANSFER_SENT", "BOLETO_CREATED"] },
      createdAt: { gte: since60s },
    },
  });

  if (recentCount >= 3) {
    await prisma.auditLog.create({
      data: {
        userId,
        action: "FRAUD_ALERT",
        ipAddress: ip,
        metadata: JSON.stringify({ type: "VELOCITY", count: recentCount, windowSeconds: 60 }),
      },
    });
    return { blocked: true, reason: "Muitas transações em pouco tempo. Tente novamente em instantes.", alerts };
  }

  // HIGH_AMOUNT: acima de R$ 5.000
  if (amount >= 5000) {
    alerts.push({ type: "HIGH_AMOUNT", severity: "HIGH", detail: `Transação de alto valor: R$ ${amount.toFixed(2)}` });
  }

  // SUSPICIOUS_HOURS: entre 1h e 5h da manhã (horário local UTC-3)
  const hourBrasilia = (now.getUTCHours() - 3 + 24) % 24;
  if (hourBrasilia >= 1 && hourBrasilia < 5) {
    alerts.push({ type: "SUSPICIOUS_HOURS", severity: "MEDIUM", detail: `Transação em horário incomum: ${hourBrasilia}h` });
  }

  // NEW_IP: primeira transação desse IP nas últimas 24h para este usuário
  const since24h = new Date(now.getTime() - 86_400_000);
  const knownIp = await prisma.auditLog.findFirst({
    where: {
      userId,
      ipAddress: ip,
      action: { in: ["PIX_SENT", "TRANSFER_SENT", "BOLETO_CREATED"] },
      createdAt: { gte: since24h },
    },
  });
  if (!knownIp && ip !== "anonymous") {
    alerts.push({ type: "NEW_IP", severity: "LOW", detail: `Primeiro acesso do IP ${ip} nas últimas 24h` });
  }

  // Persistir alertas MEDIUM/HIGH
  for (const alert of alerts.filter((a) => a.severity !== "LOW")) {
    await prisma.auditLog.create({
      data: {
        userId,
        action: "FRAUD_ALERT",
        ipAddress: ip,
        metadata: JSON.stringify({ type: alert.type, severity: alert.severity, detail: alert.detail, amount }),
      },
    });
  }

  return { blocked: false, alerts };
}
