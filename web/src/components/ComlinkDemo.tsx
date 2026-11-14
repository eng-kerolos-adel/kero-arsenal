import * as Comlink from "comlink";
import { useEffect, useRef, useState } from "react";
import { crunch } from "../workers/crunch";
import type { HeavyApi } from "../workers/heavy.worker";
import { Card } from "./Card";

const SIZE = 3_000_000;

export function ComlinkDemo() {
  const dot = useRef<HTMLDivElement>(null);
  const apiRef = useRef<Comlink.Remote<HeavyApi> | null>(null);
  const [fps, setFps] = useState(60);
  const [result, setResult] = useState("");

  // عدّاد FPS + نقطة بتتحرك بـ requestAnimationFrame: لو الـ Main Thread اتقفل هتشوفها واقفة
  useEffect(() => {
    let frames = 0;
    let last = performance.now();
    let raf = 0;
    const loop = (t: number) => {
      frames++;
      if (dot.current)
        dot.current.style.transform = `translateX(${(Math.sin(t / 300) + 1) * 120}px)`;
      if (t - last >= 500) {
        setFps(Math.round((frames * 1000) / (t - last)));
        frames = 0;
        last = t;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const worker = new Worker(new URL("../workers/heavy.worker.ts", import.meta.url), {
      type: "module",
    });
    apiRef.current = Comlink.wrap<HeavyApi>(worker);
    return () => worker.terminate();
  }, []);

  const runOnMainThread = () => {
    setResult("⏳ شغّال على الـ Main Thread…");
    // setTimeout عشان الرسالة تترسم قبل ما الصفحة تتقفل
    setTimeout(() => {
      const r = crunch(SIZE);
      setResult(`🧊 Main Thread: ${r.ms}ms (الشاشة كانت واقفة!)`);
    }, 50);
  };

  const runInWorker = async () => {
    setResult("⏳ شغّال في الـ Worker…");
    // استدعاء عادي بـ await — Comlink بيحوّله لـ postMessage ورا الستار
    const r = await apiRef.current?.crunch(SIZE);
    if (r) setResult(`⚡ Worker: ${r.ms}ms (والـ UI فضل سلس)`);
  };

  return (
    <Card n={1} title="Comlink" tag="Web Workers">
      <p className="hint">دوس على الزرين وراقب النقطة والـ FPS.</p>
      <div className="track">
        <div ref={dot} className="dot" />
      </div>
      <div className={`fps ${fps < 30 ? "bad" : "good"}`}>{fps} FPS</div>
      <div className="row">
        <button type="button" className="danger" onClick={runOnMainThread}>
          Main Thread
        </button>
        <button type="button" onClick={runInWorker}>
          Comlink Worker
        </button>
      </div>
      <p className="out">{result}</p>
    </Card>
  );
}
