/**
 * Helper صغير فوق Toxiproxy HTTP API (من غير dependencies إضافية).
 * Docs: https://github.com/Shopify/toxiproxy#http-api
 */
const API = process.env.TOXIPROXY_URL ?? "http://localhost:8474";

async function call(method: string, path: string, body?: unknown) {
  const res = await fetch(`${API}${path}`, {
    method,
    headers: { "Content-Type": "application/json" },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  if (!res.ok && res.status !== 404) {
    throw new Error(`Toxiproxy ${method} ${path} → ${res.status} ${await res.text()}`);
  }
  return res;
}

export async function ensureProxy(name: string, listen: string, upstream: string) {
  const existing = await call("GET", `/proxies/${name}`);
  if (existing.ok) return;
  await call("POST", "/proxies", { name, listen, upstream, enabled: true });
}

/** بطء في الشبكة (milliseconds) */
export async function addLatency(proxy: string, latency: number, jitter = 0) {
  await call("POST", `/proxies/${proxy}/toxics`, {
    name: "latency_downstream",
    type: "latency",
    stream: "downstream",
    toxicity: 1,
    attributes: { latency, jitter },
  });
}

/** قطع الاتصال بالكامل */
export async function setEnabled(proxy: string, enabled: boolean) {
  await call("POST", `/proxies/${proxy}`, { enabled });
}

/** يشيل كل الـ toxics ويرجّع كل الـ proxies enabled */
export async function resetAll() {
  await call("POST", "/reset");
}
