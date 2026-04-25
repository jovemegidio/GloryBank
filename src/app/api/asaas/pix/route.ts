import { NextRequest } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import {
  createPixTransfer,
  createPixQrCode,
  getPixKeys,
  createPixKey,
  normalizePixKey,
} from "@/lib/asaas";
import { prisma } from "@/lib/prisma";
import { pixTransferSchema } from "@/lib/validations";
import { successResponse, errorResponse, rateLimitResponse } from "@/lib/api-response";
import { checkRateLimit, getRateLimitConfig } from "@/lib/rate-limit";
import { DEMO_USER_ID, DEMO_PIX_KEYS, demoPIXQrCode, demoPIXTransfer } from "@/lib/demo";
import { createAuditLog } from "@/lib/audit";
import { checkFraud } from "@/lib/fraud-detection";

// Send PIX
export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) return errorResponse("Não autenticado", 401);
    if (!user.asaasApiKey && user.id !== DEMO_USER_ID) return errorResponse("Conta bancária não configurada", 400);

    // Rate limiting
    const ip = request.headers.get("x-forwarded-for") || "anonymous";
    const config = getRateLimitConfig("/api/asaas/pix");
    const rateLimit = checkRateLimit(`pix:${user.id}:${ip}`, config);
    if (!rateLimit.allowed) return rateLimitResponse(rateLimit.resetAt);

    const body = await request.json();
    const validation = pixTransferSchema.safeParse(body);

    if (!validation.success) {
      const errors: Record<string, string[]> = {};
      validation.error.errors.forEach((err) => {
        const path = err.path.join(".");
        if (!errors[path]) errors[path] = [];
        errors[path].push(err.message);
      });
      return errorResponse("Dados inválidos", 400, errors);
    }

    const { pixKey, pixKeyType, amount, description } = validation.data;
    const normalizedPixKey = normalizePixKey(pixKey, pixKeyType);

    // Fraud check
    if (user.id !== DEMO_USER_ID) {
      const fraud = await checkFraud(user.id, amount, ip);
      if (fraud.blocked) return errorResponse(fraud.reason ?? "Transação bloqueada por segurança", 429);
    }

    // Demo mode: return mock PIX result
    if (user.id === DEMO_USER_ID) {
      return successResponse(demoPIXTransfer(normalizedPixKey, amount, description));
    }

    const pixResult = await createPixTransfer(
      {
        value: amount,
        pixAddressKey: normalizedPixKey,
        pixAddressKeyType: pixKeyType,
        description,
      },
      user.asaasApiKey
    );

    // Record transaction
    await prisma.transaction.create({
      data: {
        userId: user.id,
        asaasId: pixResult.id,
        type: "PIX_SENT",
        status: pixResult.status === "DONE" ? "CONFIRMED" : "PENDING",
        amount,
        description,
        pixKey: normalizedPixKey,
        pixKeyType,
      },
    });

    await createAuditLog({
      userId: user.id,
      action: "PIX_SENT",
      ipAddress: ip,
      userAgent: request.headers.get("user-agent"),
      metadata: { amount, pixKeyType },
    });

    return successResponse(pixResult);
  } catch (error) {
    console.error("PIX transfer error:", error);
    return errorResponse("Erro ao realizar transferência PIX", 500);
  }
}

// Get PIX keys
export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) return errorResponse("Não autenticado", 401);
    if (!user.asaasApiKey && user.id !== DEMO_USER_ID) return errorResponse("Conta bancária não configurada", 400);

    const url = new URL(request.url);
    const action = url.searchParams.get("action");

    // Demo mode: return mock data for all PIX actions
    if (user.id === DEMO_USER_ID) {
      if (action === "qrcode") {
        const value = url.searchParams.get("value");
        return successResponse(demoPIXQrCode(value ? parseFloat(value) : undefined));
      }
      if (action === "create-key") {
        return successResponse({
          id: "demo-key-" + Date.now(),
          key: "random-evp-key-" + Date.now(),
          type: "EVP",
          status: "ACTIVE",
        });
      }
      return successResponse({
        data: DEMO_PIX_KEYS.data.map((key) => ({
          id: key.id,
          key: key.key,
          type: key.keyType,
          status: key.status,
        })),
      });
    }

    if (action === "qrcode") {
      const value = url.searchParams.get("value");
      const description = url.searchParams.get("description");

      const keysResponse = await getPixKeys(user.asaasApiKey);
      const activeKey = keysResponse.data?.find((k) => k.status === "ACTIVE");

      if (!activeKey) {
        return errorResponse("Nenhuma chave PIX ativa encontrada", 404);
      }

      const qrCode = await createPixQrCode(
        {
          addressKey: activeKey.key,
          value: value ? parseFloat(value) : undefined,
          description: description || undefined,
        },
        user.asaasApiKey
      );

      return successResponse(qrCode);
    }

    if (action === "create-key") {
      const type = url.searchParams.get("type") || "EVP";

      if (type !== "EVP") {
        return errorResponse("A API do Asaas permite criar apenas chaves aleatorias (EVP)", 400);
      }

      const key = await createPixKey("EVP", user.asaasApiKey);
      return successResponse({
        id: key.id,
        key: key.key,
        type: key.type ?? key.keyType ?? "EVP",
        status: key.status,
      });
    }

    const keys = await getPixKeys(user.asaasApiKey);
    return successResponse({
      data: (keys.data ?? []).map((key) => ({
        id: key.id,
        key: key.key,
        type: key.type ?? key.keyType ?? "EVP",
        status: key.status,
      })),
    });
  } catch (error) {
    console.error("PIX keys error:", error);
    return errorResponse("Erro ao buscar chaves PIX", 500);
  }
}
