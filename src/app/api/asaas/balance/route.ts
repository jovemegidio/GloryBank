import { getCurrentUser } from "@/lib/auth";
import { getBalance } from "@/lib/asaas";
import { successResponse, errorResponse } from "@/lib/api-response";

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return errorResponse("Não autenticado", 401);
    }

    if (!user.asaasApiKey) {
      return successResponse({
        balance: 0,
        statistics: { pending: 0, overdue: 0, confirmed: 0 },
      });
    }

    const balance = await getBalance(user.asaasApiKey);
    return successResponse(balance);
  } catch (error) {
    console.error("Balance error:", error);
    return errorResponse("Erro ao buscar saldo", 500);
  }
}
