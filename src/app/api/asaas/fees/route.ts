import { successResponse } from "@/lib/api-response";
import { getAsaasFeesConfig } from "@/lib/asaas-fees";

export async function GET() {
  return successResponse(getAsaasFeesConfig());
}
