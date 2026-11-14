import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { Resvg } from "@resvg/resvg-js";
import satori from "satori";

const require = createRequire(import.meta.url);
// Satori بيقبل TTF / OTF / WOFF (مش WOFF2)
const fontData = readFileSync(
  require.resolve("@fontsource/inter/files/inter-latin-700-normal.woff"),
);

const WIDTH = 1200;
const HEIGHT = 630;

/**
 * JSX → SVG (Satori) → PNG (Resvg). من غير متصفح ولا Puppeteer.
 * ملحوظة: Satori بيدعم subset من الـ CSS (Flexbox بس) — كل div فيه أكتر من child لازم display:flex.
 */
export async function renderOgPng({ title, subtitle }: { title: string; subtitle: string }) {
  const svg = await satori(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: WIDTH,
        height: HEIGHT,
        padding: 72,
        boxSizing: "border-box",
        color: "#ffffff",
        fontFamily: "Inter",
        background: "linear-gradient(135deg, #0B0F19 0%, #0f2a3a 100%)",
      }}
    >
      <div
        style={{ display: "flex", alignItems: "center", gap: 16, color: "#10B981", fontSize: 32 }}
      >
        <div style={{ width: 16, height: 16, borderRadius: 8, background: "#10B981" }} />
        KeroCodes
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div style={{ fontSize: 84, lineHeight: 1.1 }}>{title}</div>
        <div style={{ fontSize: 36, color: "#22D3EE" }}>{subtitle}</div>
      </div>
      <div style={{ display: "flex", fontSize: 21, color: "#94A3B8", flexWrap: "wrap", gap: 10 }}>
        {[
          "Comlink",
          "Satori",
          "Valibot",
          "ElectricSQL",
          "Biome",
          "Hono",
          "ThumbHash",
          "Toxiproxy",
        ].map((t) => (
          <div
            key={t}
            style={{
              display: "flex",
              padding: "6px 12px",
              border: "1px solid #334155",
              borderRadius: 999,
            }}
          >
            {t}
          </div>
        ))}
      </div>
    </div>,
    {
      width: WIDTH,
      height: HEIGHT,
      fonts: [{ name: "Inter", data: fontData, weight: 700, style: "normal" }],
    },
  );

  return new Resvg(svg, { fitTo: { mode: "width", value: WIDTH } }).render().asPng();
}
