import { useState } from "react";
import * as v from "valibot";
import { UserSchema } from "../../../shared/schemas";
import { client } from "../lib/api";
import { Card } from "./Card";

export function ValibotDemo() {
  const [form, setForm] = useState({ name: "", email: "", role: "engineer" });
  const [messages, setMessages] = useState<string[]>([]);
  const [ok, setOk] = useState(false);

  const submit = async () => {
    // 1) validation على الـ Client بنفس الـ Schema
    const parsed = v.safeParse(UserSchema, form);
    if (!parsed.success) {
      setOk(false);
      setMessages(parsed.issues.map((i) => i.message));
      return;
    }
    // 2) السيرفر بيعمل validation تاني بنفس الـ Schema (مش بنثق في الـ Client)
    const res = await client.api.users.$post({ json: parsed.output });
    if (res.ok) {
      const data = await res.json();
      setOk(true);
      setMessages([`✅ تم: ${data.user.name} (${data.user.role})`]);
    } else {
      setOk(false);
      setMessages(["❌ السيرفر رفض البيانات"]);
    }
  };

  return (
    <Card n={3} title="Valibot" tag="Validation ~1KB">
      <input
        placeholder="الاسم"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        placeholder="Email"
        dir="ltr"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
        <option value="admin">admin</option>
        <option value="engineer">engineer</option>
        <option value="designer">designer</option>
      </select>
      <button type="button" onClick={submit}>
        تحقق وابعت
      </button>
      {messages.map((m) => (
        <p key={m} className={ok ? "out good" : "out bad"}>
          {m}
        </p>
      ))}
    </Card>
  );
}
