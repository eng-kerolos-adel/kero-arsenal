import { hc } from "hono/client";
// type-only import: مفيش كود سيرفر بيدخل الـ bundle، بس الـ Types
import type { AppType } from "../../../server/src/app";

/** Hono RPC client: كل endpoint ليه autocomplete وtypes كاملة من غير codegen */
export const client = hc<AppType>(window.location.origin);
