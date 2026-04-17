import { getCurrentUser } from "@/lib/auth";
import { successResponse, errorResponse } from "@/lib/api-response";
import { prisma } from "@/lib/prisma";
import { DEMO_USER_ID } from "@/lib/demo";
import { createAuditLog } from "@/lib/audit";

export async function POST() {
  try {
    const user = await getCurrentUser();
    if (!user) return errorResponse("Não autenticado", 401);

    if (user.id === DEMO_USER_ID) {
      // In demo mode, generate a mock TOTP secret
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
      let secret = "";
      for (let i = 0; i < 32; i++) {
        secret += chars[Math.floor(Math.random() * chars.length)];
      }
      const otpauthUri = `otpauth://totp/CredBusiness:demo@credbusiness.com?secret=${secret}&issuer=CredBusiness&digits=6&period=30`;
      return successResponse({
        secret,
        otpauthUri,
        enabled: false,
        message: "Escaneie o QR Code com seu app autenticador (Google Authenticator, Authy, etc.)",
      });
    }

    // For real users, generate TOTP secret using Web Crypto
    const array = new Uint8Array(20);
    crypto.getRandomValues(array);
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
    let secret = "";
    for (let i = 0; i < 32; i++) {
      secret += chars[array[i % 20] % 32];
    }

    const otpauthUri = `otpauth://totp/CredBusiness:${user.email}?secret=${secret}&issuer=CredBusiness&digits=6&period=30`;

    return successResponse({
      secret,
      otpauthUri,
      enabled: false,
      message: "Escaneie o QR Code com seu app autenticador",
    });
  } catch (error) {
    console.error("2FA setup error:", error);
    return errorResponse("Erro ao configurar 2FA", 500);
  }
}

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) return errorResponse("Não autenticado", 401);

    if (user.id === DEMO_USER_ID) {
      return successResponse({ enabled: false });
    }

    // Check if 2FA is enabled
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const dbUser = user as any;
    return successResponse({
      enabled: dbUser.twoFactorEnabled || false,
    });
  } catch (error) {
    console.error("2FA status error:", error);
    return errorResponse("Erro ao verificar 2FA", 500);
  }
}

/**
 * PUT /api/auth/2fa
 * Verifies a TOTP code and enables 2FA for the user.
 * Body: { secret: string, code: string }
 */
export async function PUT(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) return errorResponse("Não autenticado", 401);
    if (user.id === DEMO_USER_ID) return errorResponse("Não disponível no modo demo", 403);

    const body = await request.json();
    const { secret, code } = body as { secret?: string; code?: string };

    if (!secret || !code || !/^\d{6}$/.test(code)) {
      return errorResponse("Código inválido. Informe os 6 dígitos do autenticador.", 400);
    }

    // Verify TOTP using Web Crypto API (RFC 6238)
    const isValid = await verifyTOTP(secret, code);
    if (!isValid) {
      return errorResponse("Código inválido ou expirado.", 400);
    }

    await prisma.user.update({
      where: { id: user.id },
      data: { twoFactorSecret: secret, twoFactorEnabled: true },
    });

    await createAuditLog({ userId: user.id, action: "2FA_ENABLED" });

    return successResponse({ enabled: true, message: "2FA ativado com sucesso." });
  } catch (error) {
    console.error("2FA enable error:", error);
    return errorResponse("Erro ao ativar 2FA", 500);
  }
}

/**
 * DELETE /api/auth/2fa
 * Disables 2FA for the user after verifying current code.
 * Body: { code: string }
 */
export async function DELETE(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) return errorResponse("Não autenticado", 401);
    if (user.id === DEMO_USER_ID) return errorResponse("Não disponível no modo demo", 403);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const dbUser = user as any;
    if (!dbUser.twoFactorEnabled || !dbUser.twoFactorSecret) {
      return errorResponse("2FA não está ativado.", 400);
    }

    const body = await request.json();
    const { code } = body as { code?: string };

    if (!code || !/^\d{6}$/.test(code)) {
      return errorResponse("Código inválido. Informe os 6 dígitos do autenticador.", 400);
    }

    const isValid = await verifyTOTP(dbUser.twoFactorSecret, code);
    if (!isValid) {
      return errorResponse("Código inválido ou expirado.", 400);
    }

    await prisma.user.update({
      where: { id: user.id },
      data: { twoFactorSecret: null, twoFactorEnabled: false },
    });

    await createAuditLog({ userId: user.id, action: "2FA_DISABLED" });

    return successResponse({ enabled: false, message: "2FA desativado." });
  } catch (error) {
    console.error("2FA disable error:", error);
    return errorResponse("Erro ao desativar 2FA", 500);
  }
}

// ─── TOTP helpers (RFC 6238, no external library required) ────────────────────

async function hmacSHA1(key: Uint8Array, data: Uint8Array): Promise<Uint8Array> {
  const cryptoKey = await crypto.subtle.importKey(
    "raw", key, { name: "HMAC", hash: "SHA-1" }, false, ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", cryptoKey, data);
  return new Uint8Array(signature);
}

function base32Decode(input: string): Uint8Array {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
  let bits = 0;
  let value = 0;
  const output: number[] = [];
  for (const char of input.toUpperCase().replace(/=+$/, "")) {
    const idx = alphabet.indexOf(char);
    if (idx === -1) continue;
    value = (value << 5) | idx;
    bits += 5;
    if (bits >= 8) {
      output.push((value >>> (bits - 8)) & 0xff);
      bits -= 8;
    }
  }
  return new Uint8Array(output);
}

async function generateTOTP(secret: string, counter: number): Promise<string> {
  const key = base32Decode(secret);
  const msg = new Uint8Array(8);
  let remaining = counter;
  for (let i = 7; i >= 0; i--) {
    msg[i] = remaining & 0xff;
    remaining = Math.floor(remaining / 256);
  }
  const hash = await hmacSHA1(key, msg);
  const offset = hash[hash.length - 1] & 0x0f;
  const code =
    ((hash[offset] & 0x7f) << 24) |
    ((hash[offset + 1] & 0xff) << 16) |
    ((hash[offset + 2] & 0xff) << 8) |
    (hash[offset + 3] & 0xff);
  return String(code % 1_000_000).padStart(6, "0");
}

async function verifyTOTP(secret: string, code: string): Promise<boolean> {
  const counter = Math.floor(Date.now() / 1000 / 30);
  // Allow ±1 window (90 seconds tolerance)
  for (const delta of [-1, 0, 1]) {
    const expected = await generateTOTP(secret, counter + delta);
    if (expected === code) return true;
  }
  return false;
}
