import { useEffect, useState } from "react";
import { client } from "../lib/api";
import { Card } from "./Card";

export function SatoriDemo() {
  const [title, setTitle] = useState("8 Secret Dev Tools");
  const [subtitle, setSubtitle] = useState("KeroCodes");
  const [src, setSrc] = useState("");

  // debounce بسيط عشان منبعتش request مع كل حرف
  useEffect(() => {
    const id = setTimeout(() => {
      // $url بيبني الـ URL بـ types: لو غيّرت اسم الـ query في السيرفر الفرونت هيديك error
      setSrc(client.api.og.$url({ query: { title, subtitle } }).toString());
    }, 300);
    return () => clearTimeout(id);
  }, [title, subtitle]);

  return (
    <Card n={2} title="Satori" tag="JSX → PNG">
      <input value={title} onChange={(e) => setTitle(e.target.value)} dir="ltr" maxLength={80} />
      <input
        value={subtitle}
        onChange={(e) => setSubtitle(e.target.value)}
        dir="ltr"
        maxLength={120}
      />
      {src && <img className="og" src={src} alt="OG card" />}
      <p className="hint">الصورة بتتولّد على السيرفر من JSX من غير متصفح.</p>
    </Card>
  );
}
