import { ComlinkDemo } from "./components/ComlinkDemo";
import { ElectricDemo } from "./components/ElectricDemo";
import { HonoDemo } from "./components/HonoDemo";
import { SatoriDemo } from "./components/SatoriDemo";
import { ThumbHashDemo } from "./components/ThumbHashDemo";
import { ValibotDemo } from "./components/ValibotDemo";

export function App() {
  return (
    <main>
      <header className="hero">
        <h1>
          ترسانة <span>KeroCodes</span>
        </h1>
        <p>8 أدوات هندسية في Starter واحد — Biome و Toxiproxy شغالين من الـ Terminal.</p>
        <code dir="ltr">npm run lint · npm run test:chaos</code>
      </header>
      <div className="grid">
        <ComlinkDemo />
        <SatoriDemo />
        <ValibotDemo />
        <ElectricDemo />
        <HonoDemo />
        <ThumbHashDemo />
      </div>
    </main>
  );
}
