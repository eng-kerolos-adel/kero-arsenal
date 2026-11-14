import { useShape } from "@electric-sql/react";
import { useState } from "react";
import * as v from "valibot";
import { OrderInputSchema, type OrderRow } from "../../../shared/schemas";
import { client } from "../lib/api";
import { Card } from "./Card";

const ELECTRIC_URL = import.meta.env.VITE_ELECTRIC_URL ?? "http://localhost:3000";

export function ElectricDemo() {
  // سطر واحد: الجدول بيتزامن لحظياً من Postgres للـ UI
  const { data, isLoading, error } = useShape<OrderRow>({
    url: `${ELECTRIC_URL}/v1/shape`,
    params: { table: "orders" },
  });
  const [form, setForm] = useState({ customer: "", item: "", amount: "" });
  const [msg, setMsg] = useState("");

  const add = async () => {
    const parsed = v.safeParse(OrderInputSchema, { ...form, amount: Number(form.amount) });
    if (!parsed.success) return setMsg(parsed.issues[0]?.message ?? "بيانات غلط");
    const res = await client.api.orders.$post({ json: parsed.output });
    setMsg(res.ok ? "✅ اتضاف — بص الجدول تحت" : "❌ فشل (Postgres شغال؟)");
    if (res.ok) setForm({ customer: "", item: "", amount: "" });
  };

  const rows = [...data].sort((a, b) => b.id - a.id);

  return (
    <Card n={4} title="ElectricSQL" tag="Postgres Sync">
      <div className="row">
        <input
          placeholder="العميل"
          value={form.customer}
          onChange={(e) => setForm({ ...form, customer: e.target.value })}
        />
        <input
          placeholder="المنتج"
          value={form.item}
          onChange={(e) => setForm({ ...form, item: e.target.value })}
        />
        <input
          placeholder="المبلغ"
          inputMode="numeric"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
        />
      </div>
      <button type="button" onClick={add}>
        أضف طلب (Hono RPC → Postgres)
      </button>
      {msg && <p className="out">{msg}</p>}
      {error && <p className="out bad">Electric مش شغال: شغّل npm run db:up</p>}
      {isLoading && <p className="hint">بيحمّل…</p>}
      <ul className="orders">
        {rows.map((o) => (
          <li key={o.id}>
            <b>#{o.id}</b> {o.customer} — {o.item} <span className="amt">{o.amount} EGP</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}
