import { useState } from "react";
import { client } from "../lib/api";
import { Card } from "./Card";

export function HonoDemo() {
  const [out, setOut] = useState("");

  const ping = async () => {
    // جرّب تكتب client.api. وشوف الـ autocomplete، وغيّر اسم health في السيرفر وشوف الـ error
    const res = await client.api.health.$get();
    const data = await res.json(); // data: { status: "ok"; time: number }
    setOut(`status=${data.status} • time=${new Date(data.time).toLocaleTimeString()}`);
  };

  return (
    <Card n={5} title="Hono RPC" tag="End-to-End Types">
      <pre dir="ltr">{`const res = await client.api.health.$get();\nconst data = await res.json(); // typed!`}</pre>
      <button type="button" onClick={ping}>
        Call /api/health
      </button>
      <p className="out good">{out}</p>
    </Card>
  );
}
