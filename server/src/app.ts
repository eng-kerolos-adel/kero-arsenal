import { vValidator } from "@hono/valibot-validator";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { ImageFormSchema, OgQuerySchema, OrderInputSchema, UserSchema } from "../../shared/schemas";
import { createOrder, listOrders } from "./lib/db";
import { imageToThumbHash } from "./lib/thumbhash";
import { renderOgPng } from "./og/card";

/**
 * مهم: الـ Routes لازم تتسلسل (chaining) عشان TypeScript يلتقط الـ Types كلها
 * وبعدين الـ Client (hc) يعمل autocomplete لكل Endpoint.
 */
const api = new Hono()
  .get("/health", (c) => c.json({ status: "ok" as const, time: Date.now() }))

  // Valibot: validation على الـ JSON body (نفس الـ Schema اللي الفرونت بيستخدمها)
  .post("/users", vValidator("json", UserSchema), (c) => {
    const user = c.req.valid("json");
    return c.json({ ok: true as const, user });
  })

  // Postgres → ElectricSQL بيعمل sync للصفوف دي لحظياً للـ Frontend
  .get("/orders", async (c) => c.json(await listOrders()))
  .post("/orders", vValidator("json", OrderInputSchema), async (c) => {
    const order = await createOrder(c.req.valid("json"));
    return c.json(order, 201);
  })

  // Satori: كارت صورة ديناميك
  .get("/og", vValidator("query", OgQuerySchema), async (c) => {
    const png = await renderOgPng(c.req.valid("query"));
    return c.body(new Uint8Array(png), 200, {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=3600",
    });
  })

  // ThumbHash: صورة → ~28 بايت
  .post("/thumbhash", vValidator("form", ImageFormSchema), async (c) => {
    const { image } = c.req.valid("form");
    const result = await imageToThumbHash(Buffer.from(await image.arrayBuffer()));
    return c.json(result);
  });

export const app = new Hono().use(logger()).use("/api/*", cors()).route("/api", api);

// الـ Type ده هو اللي الفرونت بيستورده (type-only) عشان الـ Type-Safety من غير codegen
export type AppType = typeof app;
