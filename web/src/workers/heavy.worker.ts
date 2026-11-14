import * as Comlink from "comlink";
import { crunch } from "./crunch";

const api = { crunch };

// بنعمل expose للـ API — الباقي كله Comlink بيتكفل بيه (مفيش postMessage يدوي)
Comlink.expose(api);

export type HeavyApi = typeof api;
