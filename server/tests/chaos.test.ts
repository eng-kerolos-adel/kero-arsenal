import pg from "pg";
import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest";
import { addLatency, ensureProxy, resetAll, setEnabled } from "./helpers/toxiproxy";

const PROXY = "postgres_main";
const url = process.env.CHAOS_DATABASE_URL ?? "postgresql://postgres:password@localhost:54322/kero";

async function timedQuery(connectionTimeoutMillis: number) {
  const client = new pg.Client({ connectionString: url, connectionTimeoutMillis });
  const started = performance.now();
  try {
    await client.connect();
    await client.query("SELECT 1");
    return { ok: true as const, ms: performance.now() - started };
  } catch (error) {
    return { ok: false as const, ms: performance.now() - started, error };
  } finally {
    await client.end().catch(() => {});
  }
}

describe("Chaos: Postgres عن طريق Toxiproxy", () => {
  beforeAll(async () => {
    await ensureProxy(PROXY, "0.0.0.0:54322", "postgres:5432");
    await resetAll();
  });
  afterEach(resetAll);
  afterAll(resetAll);

  it("الوضع الطبيعي: الاتصال بيشتغل", async () => {
    const r = await timedQuery(3000);
    expect(r.ok).toBe(true);
  });

  it("مع بطء 800ms: الاتصال بينجح بس أبطأ", async () => {
    await addLatency(PROXY, 800);
    const r = await timedQuery(15000);
    expect(r.ok).toBe(true);
    expect(r.ms).toBeGreaterThanOrEqual(800);
  });

  it("مع بطء 3000ms: التطبيق لازم يفشل بسرعة بالـ timeout بدل ما يتعلق", async () => {
    await addLatency(PROXY, 3000);
    const r = await timedQuery(1000);
    expect(r.ok).toBe(false);
    expect(r.ms).toBeLessThan(2500);
  });

  it("لو الشبكة اتقطعت تماماً: الخطأ بيظهر بسرعة", async () => {
    await setEnabled(PROXY, false);
    const r = await timedQuery(2000);
    expect(r.ok).toBe(false);
    expect(r.ms).toBeLessThan(2500);
  });
});
