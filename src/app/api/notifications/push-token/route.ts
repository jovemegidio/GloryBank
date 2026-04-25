import { NextRequest } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { successResponse, errorResponse } from "@/lib/api-response";

export async function POST(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return errorResponse("Não autenticado", 401);

  const body = await request.json();
  const { token } = body as { token?: string };

  if (!token || !token.startsWith("ExponentPushToken")) {
    return errorResponse("Token inválido", 400);
  }

  await prisma.user.update({ where: { id: user.id }, data: { pushToken: token } });
  return successResponse({ registered: true });
}

export async function DELETE(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return errorResponse("Não autenticado", 401);
  void request;
  await prisma.user.update({ where: { id: user.id }, data: { pushToken: null } });
  return successResponse({ unregistered: true });
}
