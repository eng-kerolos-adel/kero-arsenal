<div align="center" dir="rtl">

# ⚡ ترسانة KeroCodes

### 8 أدوات هندسية في Starter واحد جاهز للتشغيل

**Comlink · Satori · Valibot · ElectricSQL · Biome · Hono RPC · ThumbHash · Toxiproxy**

![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Hono](https://img.shields.io/badge/Hono-4-E36002?logo=hono&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![Biome](https://img.shields.io/badge/Biome-2-60A5FA?logo=biome&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-10B981)

</div>

<div dir="rtl">

## 👋 إيه الريبو ده؟

ده الـ Starter اللي وعدتكم بيه في الفيديو. بدل ما تقرا عن 8 أدوات وتنساهم، هنا هتلاقيهم **متسطبين ومربوطين ببعض في مشروع واحد شغّال** — تشغّله، تفتح الكود، وتبدأ تاخد منه اللي يفيدك في مشروعك.

المشروع عبارة عن Dashboard صغيرة فيها Demo حي لكل أداة، وSetup كامل لـ Postgres و ElectricSQL و Toxiproxy بـ Docker.

| # | الأداة | بتحل إيه؟ | بتلاقيها فين في المشروع؟ |
|---|--------|-----------|---------------------------|
| 1 | [**Comlink**](https://github.com/GoogleChromeLabs/comlink) | تهنيج الـ UI من العمليات التقيلة | `web/src/workers/` |
| 2 | [**Satori**](https://github.com/vercel/satori) | توليد صور ديناميك من غير متصفح | `server/src/og/card.tsx` |
| 3 | [**Valibot**](https://valibot.dev) | حجم الـ Validation في الـ Bundle | `shared/schemas.ts` |
| 4 | [**ElectricSQL**](https://electric-sql.com) | مزامنة Postgres لحظياً مع الـ Client | `web/src/components/ElectricDemo.tsx` |
| 5 | [**Biome**](https://biomejs.dev) | بطء ESLint + Prettier وتعارضهم | `biome.json` |
| 6 | [**Hono RPC**](https://hono.dev/docs/guides/rpc) | غياب الـ Type-Safety بين الفرونت والباك | `server/src/app.ts` + `web/src/lib/api.ts` |
| 7 | [**ThumbHash**](https://evanw.github.io/thumbhash/) | الصور البيضا وقت التحميل | `server/src/lib/thumbhash.ts` |
| 8 | [**Toxiproxy**](https://github.com/Shopify/toxiproxy) | اختبار أعطال الشبكة قبل الـ Production | `server/tests/chaos.test.ts` |

---

## 🚀 تشغيل سريع (3 دقايق)

### المتطلبات

- **Node.js 20+** (يُفضّل 22)
- **Docker** (لـ Postgres و ElectricSQL و Toxiproxy)

### الخطوات

```bash
# 1) سطّب الـ dependencies (Workspaces: server + web)
npm install

# 2) شغّل Postgres + ElectricSQL + Toxiproxy
npm run db:up

# 3) شغّل الـ API والـ Frontend مع بعض
npm run dev
```

افتح 👉 **http://localhost:5173**

> 💡 لو مش عايز Docker دلوقتي: الأدوات 1 و 2 و 3 و 5 و 6 و 7 بتشتغل من غيره. الـ Docker محتاجه لـ ElectricSQL (الأداة 4) وToxiproxy (الأداة 8) وإضافة الطلبات.

### الأوامر

| الأمر | بيعمل إيه |
|-------|-----------|
| `npm run dev` | يشغّل السيرفر (`:8787`) والـ Vite (`:5173`) مع بعض |
| `npm run build` | Build للـ Frontend |
| `npm run typecheck` | فحص الـ Types للسيرفر والفرونت |
| `npm run lint` | Biome check (Lint + Format + Imports) |
| `npm run lint:fix` | Biome يصلّح اللي يقدر يصلّحه |
| `npm run db:up` / `db:down` | تشغيل / مسح الـ Containers والداتا |
| `npm run test:chaos` | اختبارات الأعطال بـ Toxiproxy (محتاجة `db:up`) |

### المنافذ (Ports)

| الخدمة | المنفذ |
|--------|--------|
| Frontend (Vite) | `5173` |
| API (Hono) | `8787` |
| Postgres | `54321` |
| ElectricSQL | `3000` |
| Toxiproxy API | `8474` |
| Postgres عن طريق Toxiproxy | `54322` |

---

## 🗂️ هيكل المشروع

```text
kero-arsenal/
├── biome.json                  # ← #5 Biome: إعدادات Lint + Format
├── docker-compose.yml          # Postgres + ElectricSQL + Toxiproxy
├── db/init.sql                 # جدول orders + بيانات تجريبية
├── shared/
│   └── schemas.ts              # ← #3 Valibot: Schemas مشتركة بين الفرونت والباك
├── server/                     # Hono API
│   ├── src/
│   │   ├── app.ts              # ← #6 Hono RPC: الـ Routes + export type AppType
│   │   ├── og/card.tsx         # ← #2 Satori: JSX → SVG → PNG
│   │   └── lib/
│   │       ├── thumbhash.ts    # ← #7 ThumbHash
│   │       └── db.ts           # اتصال Postgres
│   └── tests/
│       ├── chaos.test.ts       # ← #8 Toxiproxy: اختبارات الأعطال
│       └── helpers/toxiproxy.ts
└── web/                        # React + Vite
    └── src/
        ├── lib/api.ts          # ← #6 Hono RPC client (hc)
        ├── workers/            # ← #1 Comlink
        └── components/         # Demo لكل أداة (+ ElectricSQL #4)
```

---

## 🔍 الأدوات بالتفصيل

### 1️⃣ Comlink — شغّل العمليات التقيلة في Web Worker من غير `postMessage`

**المشكلة:** الـ JavaScript في المتصفح شغّال على Thread واحد (الـ Main Thread) هو نفسه اللي بيرسم الشاشة ويستقبل الضغطات. لو شغّلت عملية تقيلة (ترتيب داتا ضخمة، Parsing لملف كبير، معالجة صور) الشاشة بتقف ومحدش يعرف يضغط على حاجة.

**الحل:** الـ **Web Workers** بتشغّل الكود في Thread تاني، بس التعامل معاهم بـ `postMessage` و `onmessage` مؤلم وبيطلّع Boilerplate كتير. **Comlink** (من Google Chrome Labs) بتخلّيك تستدعي دالة الـ Worker **كأنها دالة عادية** بـ `await`.

**الكود من الـ Repo:**

```ts
// web/src/workers/heavy.worker.ts  ← جوه الـ Worker
import * as Comlink from "comlink";
import { crunch } from "./crunch";

const api = { crunch };
Comlink.expose(api);
export type HeavyApi = typeof api;
```

```ts
// web/src/components/ComlinkDemo.tsx  ← في الـ UI
const worker = new Worker(new URL("../workers/heavy.worker.ts", import.meta.url), {
  type: "module",
});
const api = Comlink.wrap<HeavyApi>(worker);

const result = await api.crunch(3_000_000); // الـ UI فضل سلس ✨
```

**جرّبها:** افتح الصفحة، دوس على زرار **Main Thread** وشوف النقطة بتقف والـ FPS بيقع، وبعدين دوس **Comlink Worker** وشوف إن الحركة مكمّلة.

**ملاحظات مهمة:**
- البيانات بتتنقل بين الـ Threads بـ [Structured Clone](https://developer.mozilla.org/docs/Web/API/Web_Workers_API/Structured_clone_algorithm) (يعني نسخ). للداتا الضخمة جداً استخدم `Comlink.transfer` مع `ArrayBuffer`.
- الـ Worker مبيقدرش يلمس الـ DOM.
- استخدمها لما العملية بتاخد أكتر من ~50ms. للحاجات الصغيرة، الـ Overhead مش مستاهل.

---

### 2️⃣ Satori — حوّل JSX لصورة على السيرفر من غير Puppeteer

**المشكلة:** عايز تولّد صور ديناميك (Open Graph Cards، شهادات، كروت مشاركة)؟ الحل التقليدي إنك تشغّل متصفح مخفي (Puppeteer / Playwright) تفتح فيه HTML وتاخد Screenshot. ده تقيل: بياكل RAM كتير، بطيء في الـ Cold Start، وصعب تشغّله على Serverless.

**الحل:** **Satori** (من Vercel) بياخد **JSX** ويحوّله لـ **SVG** مباشرة من غير متصفح. وبعدين **resvg** بيحوّل الـ SVG لـ PNG.

**الكود من الـ Repo:**

```tsx
// server/src/og/card.tsx
const svg = await satori(
  <div style={{ display: "flex", background: "#0B0F19", color: "#10B981", padding: 40 }}>
    <h1>{title}</h1>
  </div>,
  { width: 1200, height: 630, fonts: [{ name: "Inter", data: fontData, weight: 700 }] },
);
const png = new Resvg(svg).render().asPng();
```

**جرّبها:** غيّر النص في كارت Satori في الـ Dashboard، أو افتح مباشرة:
`http://localhost:8787/api/og?title=Hello&subtitle=World`

**ملاحظات مهمة:**
- Satori بيدعم **Subset من الـ CSS** (Flexbox أساساً). أي `div` فيه أكتر من Child لازم `display: "flex"`. مفيش `grid`.
- لازم تدّيه **الخط** صراحةً (TTF / OTF / WOFF — مش WOFF2).
- لو هتكتب **عربي** في الصورة: محتاج خط عربي، ودعم الـ RTL في Satori محدود، فجرّب النتيجة كويس قبل ما تعتمد عليها.

---

### 3️⃣ Valibot — Validation بنفس الإمكانيات وحجم أصغر بكتير

**المشكلة:** مكتبات الـ Validation المشهورة (زي Zod) ممتازة، لكن شكل الـ API بتاعها (Method Chaining) بيصعّب على الـ Bundler إنه يشيل الأجزاء اللي مش مستخدمة، فبتزوّد حجم الـ Bundle.

**الحل:** **Valibot** مبنية على **دوال صغيرة مستقلة** (`v.string()`, `v.email()`, `v.pipe()`)، فالـ Tree-Shaking بيشتغل صح وبتاخد في الـ Bundle **اللي استخدمته بس**. مطوّرينها بيذكروا إن الحجم ممكن يقل لحد ~90% حسب اللي بتستخدمه (الرقم بيختلف من مشروع لمشروع، قيّسه في مشروعك).

**الكود من الـ Repo:**

```ts
// shared/schemas.ts
import * as v from "valibot";

export const UserSchema = v.object({
  name: v.pipe(v.string(), v.trim(), v.minLength(2, "الاسم لازم حرفين على الأقل")),
  email: v.pipe(v.string(), v.trim(), v.email("الإيميل مش صحيح")),
  role: v.picklist(["admin", "engineer", "designer"]),
});

export type User = v.InferOutput<typeof UserSchema>; // الـ Type بيتولّد من الـ Schema
```

**الفكرة الذكية هنا:** الـ Schema مكتوبة **مرة واحدة** في `shared/` وبتتستخدم في مكانين:
1. **الفرونت:** `v.safeParse(UserSchema, form)` عشان تعرض الأخطاء للمستخدم فوراً.
2. **السيرفر:** `vValidator("json", UserSchema)` عشان متثقش في الـ Client أبداً.

**جرّبها:** اكتب إيميل غلط في كارت Valibot وشوف رسالة الخطأ، وحاول تبعت طلب غلط للسيرفر بـ `curl` وشوف إنه بيرفضه بـ `400`.

---

### 4️⃣ ElectricSQL — زامن Postgres مع الـ Frontend لحظياً

**المشكلة:** عايز الداتا تظهر عند المستخدم لحظياً لما حد يغيّرها؟ عادةً بتكتب Endpoint لكل جدول + Polling أو WebSockets + منطق Cache وInvalidation. شغل كتير وبيتكسر بسهولة.

**الحل:** **ElectricSQL** بيقعد جنب Postgres بتاعك ويعمل **Sync** لـ "Shapes" (جزء من جدول، مع Filter لو عايز) للـ Client عن طريق HTTP. بتستخدم Hook واحد في React وأي تعديل في الداتابيز بيظهر عند المستخدم.

**الكود من الـ Repo:**

```tsx
// web/src/components/ElectricDemo.tsx
import { useShape } from "@electric-sql/react";

const { data: orders } = useShape<OrderRow>({
  url: "http://localhost:3000/v1/shape",
  params: { table: "orders" },
});
```

**جرّبها:**
1. شغّل `npm run db:up` و `npm run dev`.
2. أضف طلب من الفورم، هتشوفه يظهر في القايمة فوراً.
3. افتح الصفحة في **تابين**، أضف طلب في واحد وشوفه يظهر في التاني من غير Refresh.
4. أو عدّل الداتا مباشرة في Postgres:
   ```bash
   docker compose exec postgres psql -U postgres -d kero \
     -c "INSERT INTO orders (customer, item, amount) VALUES ('Sara', 'Dashboard', 900);"
   ```

**ملاحظات مهمة:**
- Postgres لازم يشتغل بـ `wal_level=logical` (متظبط في `docker-compose.yml`).
- الـ Sync **للقراءة** (من Postgres للـ Client). الكتابة بتروح للـ API بتاعك (هنا عن طريق Hono RPC)، وده الـ Pattern الموصى بيه.
- ⚠️ `ELECTRIC_INSECURE=true` للـ Development **بس**. في الـ Production لازم تأمّن الـ Electric API (مثلاً بـ `ELECTRIC_SECRET` وتخلّي الـ Client يعدّي على Proxy بتاعك يتحقق من الصلاحيات).

---

### 5️⃣ Biome — أداة واحدة بدل ESLint + Prettier

**المشكلة:** ESLint + Prettier = ملفات إعدادات كتير، Plugins بتتعارض مع بعض، وسرعة بطيئة في المشاريع الكبيرة.

**الحل:** **Biome** أداة واحدة مكتوبة بـ **Rust**: Formatter + Linter + ترتيب الـ Imports، بملف إعدادات واحد. بتقدّم نفسها إنها أسرع بكتير (حوالي **35 ضعف** على الـ Formatting مقارنةً بـ Prettier حسب الـ Benchmarks بتاعتها).

**الإعدادات من الـ Repo:**

```json
// biome.json
{
  "formatter": { "indentStyle": "space", "indentWidth": 2, "lineWidth": 100 },
  "linter": { "enabled": true, "rules": { "preset": "recommended" } },
  "javascript": { "formatter": { "quoteStyle": "double" } },
  "assist": { "actions": { "source": { "organizeImports": "on" } } }
}
```

**جرّبها:**

```bash
npm run lint        # يفحص المشروع كله
npm run lint:fix    # يصلّح ويرتّب
```

> نفس الأمر `npx biome ci .` شغّال في الـ GitHub Actions (`.github/workflows/ci.yml`)، فأي Pull Request بكود مش متنسّق هيفشل.

**نصيحة:** سطّب إضافة **Biome** في VS Code وفعّل Format on Save.

---

### 6️⃣ Hono RPC — Type-Safety كامل بين الـ Backend والـ Frontend من غير Codegen

**المشكلة:** الفرونت بيكلم الباك بـ `fetch("/api/...")` ومفيش حاجة بتضمن إن الـ URL والـ Body والـ Response مظبوطين. تغيّر حاجة في الباك والفرونت يتكسر في الـ Production. الحلول التقليدية (GraphQL / OpenAPI Codegen) بتضيف طبقة تعقيد.

**الحل:** **Hono RPC**. بتصدّر **Type** الـ App من السيرفر، والفرونت بيستخدمه مع `hc` وبياخد **Autocomplete + Type Checking** لكل Endpoint من غير ما تولّد أي كود.

**الكود من الـ Repo:**

```ts
// server/src/app.ts
const api = new Hono()
  .get("/health", (c) => c.json({ status: "ok" as const, time: Date.now() }))
  .post("/orders", vValidator("json", OrderInputSchema), async (c) => {
    const order = await createOrder(c.req.valid("json"));
    return c.json(order, 201);
  });

export const app = new Hono().route("/api", api);
export type AppType = typeof app; // 👈 ده كل السحر
```

```ts
// web/src/lib/api.ts
import { hc } from "hono/client";
import type { AppType } from "../../../server/src/app"; // type-only: مفيش كود سيرفر بيدخل الـ Bundle

export const client = hc<AppType>(window.location.origin);

// في أي مكان:
const res = await client.api.orders.$post({ json: { customer: "Ali", item: "Site", amount: 500 } });
```

**جرّبها:** في الفرونت اكتب `client.api.` وشوف الـ Autocomplete، وبعدين غيّر اسم `/health` في السيرفر وشوف الفرونت بيطلّع Type Error فوراً (`npm run typecheck`).

**ملاحظة مهمة:** لازم تكتب الـ Routes بـ **Chaining** (`.get().post()`) عشان TypeScript يلتقط الـ Types. لو فصلتهم في سطور منفصلة على نفس الـ `app`، الـ Types هتضيع.

---

### 7️⃣ ThumbHash — Placeholder للصورة في حوالي 25 بايت

**المشكلة:** الصور بتتحمّل ببطء، فالمستخدم بيشوف مربع أبيض فاضي، ولما الصورة توصل الصفحة بتتنطط (Layout Shift).

**الحل:** **ThumbHash** بيضغط أي صورة لـ Hash صغير جداً (**حوالي 25 بايت**، بحد أقصى 28 تقريباً). ممكن تخزّنه في الداتابيز جنب الصورة، وتفكّه في الـ Client لـ Placeholder ناعم **بنفس نسبة الأبعاد** وبيدعم **الشفافية**.

**الكود من الـ Repo:**

```ts
// server/src/lib/thumbhash.ts  ← وقت رفع الصورة (على السيرفر)
const { data, info } = await sharp(input)
  .resize(100, 100, { fit: "inside" }) // ThumbHash بيشترط ≤ 100x100
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const hash = rgbaToThumbHash(info.width, info.height, data); // 👈 بايتات قليلة
```

```ts
// web/src/components/ThumbHashDemo.tsx  ← وقت العرض (في الـ Client)
const placeholderUrl = thumbHashToDataURL(hashBytes); // 👈 Placeholder فوري
```

**جرّبها:** ارفع أي صورة في كارت ThumbHash وقارن الـ Placeholder بالأصلية وشوف حجم الـ Hash بالبايت.

**الاستخدام العملي:** خزّن الـ Hash كـ `TEXT` (base64) في جدول الصور، وابعته مع بيانات الصورة في الـ API، واعرضه كـ `background-image` لحد ما الصورة الأصلية تخلّص تحميل.

---

### 8️⃣ Toxiproxy — اختبر أعطال الشبكة قبل ما العملاء يشوفوها

**المشكلة:** كل الاختبارات بتشتغل على شبكة مثالية (localhost). في الواقع الداتابيز بتبطّأ والاتصال بيقطع، والتطبيق بيتعلّق أو بيقع.

**الحل:** **Toxiproxy** (من Shopify) هو Proxy بتحطّه بين تطبيقك وأي خدمة (Postgres, Redis, API...)، وبتتحكم فيه بالكود عشان **تحاكي** بطء الشبكة، قطع الاتصال، Timeouts، وغيرها. ده اسمه **Chaos Testing**.

**الكود من الـ Repo:**

```ts
// server/tests/chaos.test.ts
it("مع بطء 3000ms: التطبيق لازم يفشل بسرعة بالـ timeout بدل ما يتعلق", async () => {
  await addLatency("postgres_main", 3000); // 👈 بطء 3 ثواني على Postgres
  const r = await timedQuery(1000);        // timeout 1 ثانية
  expect(r.ok).toBe(false);
  expect(r.ms).toBeLessThan(2500);         // فشل بسرعة، متعلّقش
});
```

**الـ Setup:** تطبيقك (أو الاختبار) بيتصل بـ Postgres على المنفذ `54322` (Toxiproxy) بدل `54321` (Postgres مباشرة). Toxiproxy بيوصّل الطلب لـ Postgres، ولما تضيف "Toxic" بيبوّظ الشبكة.

**جرّبها:**

```bash
npm run db:up
npm run test:chaos
```

الاختبارات بتغطي: الوضع الطبيعي، بطء متوسط (بينجح بس أبطأ)، بطء شديد (لازم Timeout سريع)، وقطع الشبكة بالكامل.

**جرّب بإيدك:**

```bash
# أضف بطء 2 ثانية على كل ردود Postgres
curl -X POST localhost:8474/proxies/postgres_main/toxics \
  -H 'Content-Type: application/json' \
  -d '{"name":"slow","type":"latency","stream":"downstream","toxicity":1,"attributes":{"latency":2000}}'

# ارجع الوضع الطبيعي
curl -X POST localhost:8474/reset
```

**الـ Toxics المتاحة:** `latency`, `bandwidth`, `slow_close`, `timeout`, `reset_peer`, `slicer`, `limit_data`.

---

## 📝 الفرق بين كود الفيديو وكود الـ Repo

كود الفيديو كان **مبسّط للعرض على الشاشة**. الكود هنا هو النسخة اللي شغّالة فعلاً، وفي نقطتين اتغيّروا:

| الأداة | في الفيديو | في الـ Repo (الصح) |
|--------|-----------|---------------------|
| ElectricSQL | `useShape({ url: ".../v1/shape/orders" })` | `useShape({ url: ".../v1/shape", params: { table: "orders" } })` — الجدول بيتحدد في `params` |
| Toxiproxy | `dbProxy.addToxic({ type: "latency", ... })` | بنكلم الـ HTTP API بتاع Toxiproxy مباشرة (`tests/helpers/toxiproxy.ts`) من غير مكتبة إضافية، والـ Toxic بيتبعت بـ `name` و `stream` و `toxicity` و `attributes` |

---

## ⚙️ متغيرات البيئة

القيم الافتراضية شغّالة من غير ما تعمل أي حاجة. لو عايز تغيّر حاجة، اضبطها كـ Environment Variables (`export PORT=9000`) — السيرفر بيقراها من الـ environment، والـ Vite بيقرا `VITE_*` من ملف `web/.env`. `.env.example` مرجع للقيم بس:

| المتغير | الافتراضي | الاستخدام |
|---------|-----------|-----------|
| `PORT` | `8787` | منفذ الـ API |
| `DATABASE_URL` | `postgresql://postgres:password@localhost:54321/kero` | اتصال الـ API بالداتابيز |
| `CHAOS_DATABASE_URL` | `postgresql://postgres:password@localhost:54322/kero` | اتصال الاختبارات عن طريق Toxiproxy |
| `TOXIPROXY_URL` | `http://localhost:8474` | Toxiproxy API |
| `VITE_ELECTRIC_URL` | `http://localhost:3000` | عنوان ElectricSQL للفرونت |

---

## 🛠️ حل المشاكل الشائعة

<details>
<summary><b>كارت ElectricSQL بيقول "Electric مش شغال"</b></summary>

اتأكد إن الـ Containers شغّالة: `docker compose ps`. لو Electric واقع، شوف اللوجات: `docker compose logs electric`.
</details>

<details>
<summary><b>الـ Port متشغّل (Address already in use)</b></summary>

غيّر المنفذ في `docker-compose.yml` (الجزء الأول من `"54321:5432"`) أو وقّف الخدمة اللي شاغلاه، وظبّط `.env` بنفس القيمة.
</details>

<details>
<summary><b>اختبارات Toxiproxy بتفشل بـ ECONNREFUSED</b></summary>

اتأكد إن `npm run db:up` خلّص وCompose قال إن كل الخدمات `healthy`. الاختبارات بتعمل الـ Proxy تلقائياً لو مش موجود.
</details>

<details>
<summary><b>sharp أو resvg بيطلّعوا error في التسطيب</b></summary>

الاتنين بيحمّلوا Binaries جاهزة لكل نظام. جرّب `rm -rf node_modules package-lock.json && npm install` وتأكد إنك على Node 20+.
</details>

<details>
<summary><b>Biome بيقول إن الـ schema version مختلفة</b></summary>

شغّل `npx biome migrate --write` وهيحدّث الـ `biome.json` للنسخة المسطّبة.
</details>

---

## 🚢 قبل الـ Production

- [ ] أمّن ElectricSQL (شيل `ELECTRIC_INSECURE`, واستخدم `ELECTRIC_SECRET` + Proxy للصلاحيات).
- [ ] غيّر باسوردات Postgres وحطّها في Environment Variables مش في الكود.
- [ ] ظبّط CORS في `server/src/app.ts` على الدومين بتاعك بدل `cors()` المفتوح.
- [ ] حط Rate Limiting على `/api/og` و `/api/thumbhash` (عمليات تقيلة نسبياً).
- [ ] ضيف Migrations حقيقية (Drizzle / Prisma / node-pg-migrate) بدل `db/init.sql`.

---

## 🤝 المساهمة

لو لقيت Bug أو عندك اقتراح، افتح Issue أو Pull Request. قبل ما تبعت PR:

```bash
npm run lint && npm run typecheck && npm run build
```

---

## 👨‍💻 عن المؤلف

**Kerolos Adel (KeroCodes)** — Frontend & Mobile Developer (Next.js / Flutter)، بعمل محتوى برمجي بالعربي على TikTok و Instagram و YouTube.

لو الريبو فادك، **⭐ اعمل Star** وشاركه مع زميلك المبرمج، وقولّي في الكومنتات أي أداة من الـ 8 هتستخدمها الأول. 🔥

## 📄 الرخصة

[MIT](./LICENSE)

</div>
