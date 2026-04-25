import { NextRequest } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { successResponse, errorResponse } from "@/lib/api-response";

export async function POST(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return errorResponse("Não autenticado", 401);

  const body = await request.json();
  const { subscription } = body as { subscription?: object };

  if (!subscription) return errorResponse("Subscription inválida", 400);

  await prisma.user.update({
    where: { id: user.id },
    data: { webPushSubscription: JSON.stringify(subscription) },
  });

  return successResponse({ registered: true });
}

export async function DELETE(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return errorResponse("Não autenticado", 401);
  void request;
  await prisma.user.update({ where: { id: user.id }, data: { webPushSubscription: null } });
  return successResponse({ unregistered: true });
}
