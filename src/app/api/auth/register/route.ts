import { NextRequest } from "next/server";
import { registerSchema } from "@/lib/validations";
import { hashPassword, createSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { createSubAccount, approveSandboxAccount, isSandboxAsaasApiUrl } from "@/lib/asaas";
import { successResponse, errorResponse, rateLimitResponse } from "@/lib/api-response";
import { checkRateLimit, getRateLimitConfig } from "@/lib/rate-limit";
import { DEMO_MODE } from "@/lib/demo";
import { createAuditLog } from "@/lib/audit";

export async function POST(request: NextRequest) {
  try {
    // Demo mode: registration is disabled — use the demo account
    if (DEMO_MODE) {
      return errorResponse(
        "Cadastro desabilitado no modo demonstração. Use: demo@credbusiness.com / Demo@123456",
        403
      );
    }

    // Rate limiting
    const ip = request.headers.get("x-forwarded-for") || "anonymous";
    const config = getRateLimitConfig("/api/auth/register");
    const rateLimit = checkRateLimit(`register:${ip}`, config);
    if (!rateLimit.allowed) {
      return rateLimitResponse(rateLimit.resetAt);
    }

    const body = await request.json();
    const validation = registerSchema.safeParse(body);
    const isMobileClient = request.headers.get("x-credbusiness-client") === "mobile";

    if (!validation.success) {
      const errors: Record<string, string[]> = {};
      validation.error.errors.forEach((err) => {
        const path = err.path.join(".");
        if (!errors[path]) errors[path] = [];
        errors[path].push(err.message);
      });
      return errorResponse("Dados inválidos", 400, errors);
    }

    const {
      name,
      email,
      cpfCnpj,
      phone,
      password,
      birthDate,
      companyType,
      incomeValue,
      address,
      addressNumber,
      province,
      postalCode,
    } = validation.data;
    const normalizedBirthDate = cpfCnpj.length === 11 ? birthDate || undefined : undefined;
    const normalizedCompanyType = cpfCnpj.length === 14 ? companyType || undefined : undefined;

    // Check if email or CPF/CNPJ already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { cpfCnpj }],
      },
    });

    if (existingUser) {
      if (existingUser.email === email) {
        return errorResponse("Este email já está em uso");
      }
      return errorResponse("Este CPF/CNPJ já está cadastrado");
    }

    // Hash password
    const passwordHash = await hashPassword(password);

    // Create Asaas sub-account
    let asaasAccount = null;
    try {
      asaasAccount = await createSubAccount({
        name,
        email,
        cpfCnpj,
        phone,
        mobilePhone: phone,
        incomeValue,
        birthDate: normalizedBirthDate,
        companyType: normalizedCompanyType,
        address,
        addressNumber,
        province,
        postalCode,
      });

      if (asaasAccount.apiKey && isSandboxAsaasApiUrl()) {
        await approveSandboxAccount(asaasAccount.apiKey).catch((error) => {
          console.warn("Sandbox sub-account approval failed:", error);
        });
      }
    } catch (error) {
      console.error("Asaas sub-account creation failed:", error);
      return errorResponse(
        error instanceof Error
          ? error.message
          : "Nao foi possivel abrir a conta digital no Asaas",
        400
      );
    }

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        cpfCnpj,
        phone,
        passwordHash,
        asaasCustomerId: asaasAccount?.id || null,
        asaasAccountId: asaasAccount?.id || null,
        asaasApiKey: asaasAccount?.apiKey || null,
        asaasWalletId: asaasAccount?.walletId || null,
        companyType: normalizedCompanyType || null,
        incomeValue,
        birthDate: normalizedBirthDate ? new Date(normalizedBirthDate) : null,
        address,
        addressNumber,
        province,
        postalCode,
      },
    });

    // Create session
    const userAgent = request.headers.get("user-agent") || undefined;
    const { token } = await createSession(user.id, userAgent, ip);

    await createAuditLog({
      userId: user.id,
      action: "REGISTER",
      ipAddress: ip,
      userAgent: request.headers.get("user-agent"),
      metadata: {
        hasAsaasAccount: Boolean(asaasAccount?.id),
      },
    });

    return successResponse(
      {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        sessionToken: isMobileClient ? token : undefined,
      },
      201
    );
  } catch (error) {
    console.error("Register error:", error);
    return errorResponse("Erro interno do servidor", 500);
  }
}
