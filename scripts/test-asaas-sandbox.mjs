function normalizeAsaasApiUrl(url) {
  const raw = (url || "https://api-sandbox.asaas.com/v3").trim().replace(/\/+$/, "");

  if (raw.endsWith("/api/v3")) {
    return `${raw.slice(0, -7)}/v3`;
  }

  return raw.endsWith("/v3") ? raw : `${raw}/v3`;
}

async function asaasRequest({ baseUrl, apiKey, path, method = "GET" }) {
  const response = await fetch(`${baseUrl}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      access_token: apiKey,
    },
  });

  const contentType = response.headers.get("content-type") || "";
  const body = contentType.includes("application/json")
    ? await response.json().catch(() => null)
    : await response.text().catch(() => null);

  return {
    ok: response.ok,
    status: response.status,
    body,
  };
}

async function main() {
  const apiKey = process.env.ASAAS_API_KEY || "";
  const baseUrl = normalizeAsaasApiUrl(process.env.ASAAS_API_URL);

  console.log("Asaas sandbox diagnostic");
  console.log(`Base URL: ${baseUrl}`);

  if (!baseUrl.includes("api-sandbox.asaas.com")) {
    console.error("O ambiente configurado nao e o sandbox do Asaas.");
    process.exit(1);
  }

  if (!apiKey || apiKey === "your-asaas-api-key" || apiKey === "$aact_your_key_here") {
    console.error("ASAAS_API_KEY nao esta configurada com uma chave sandbox valida.");
    process.exit(1);
  }

  const checks = [
    { label: "Saldo da conta", path: "/finance/balance" },
    { label: "Chaves PIX", path: "/pix/addressKeys" },
    { label: "Extrato financeiro", path: "/financialTransactions?limit=1" },
  ];

  let hasFailure = false;

  for (const check of checks) {
    const result = await asaasRequest({
      baseUrl,
      apiKey,
      path: check.path,
    });

    console.log(`\n[${result.ok ? "OK" : "FAIL"}] ${check.label} -> HTTP ${result.status}`);
    console.log(JSON.stringify(result.body, null, 2));

    if (!result.ok) {
      hasFailure = true;
    }
  }

  process.exit(hasFailure ? 1 : 0);
}

main().catch((error) => {
  console.error("Falha ao executar diagnostico do sandbox Asaas.");
  console.error(error);
  process.exit(1);
});
