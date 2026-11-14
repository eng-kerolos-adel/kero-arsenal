import * as v from "valibot";

/**
 * Schemas مشتركة بين الـ Server والـ Web.
 * نفس الـ Schema بتتستخدم في الـ Validation على الـ Client وعلى الـ Server (Valibot).
 */

export const RoleSchema = v.picklist(["admin", "engineer", "designer"]);

export const UserSchema = v.object({
  name: v.pipe(v.string(), v.trim(), v.minLength(2, "الاسم لازم حرفين على الأقل")),
  email: v.pipe(v.string(), v.trim(), v.email("الإيميل مش صحيح")),
  role: RoleSchema,
});
export type User = v.InferOutput<typeof UserSchema>;

export const OrderInputSchema = v.object({
  customer: v.pipe(v.string(), v.trim(), v.minLength(2, "اسم العميل قصير")),
  item: v.pipe(v.string(), v.trim(), v.minLength(2, "اسم المنتج قصير")),
  amount: v.pipe(v.number(), v.minValue(1, "المبلغ لازم يكون أكبر من 0"), v.maxValue(100000)),
});
export type OrderInput = v.InferOutput<typeof OrderInputSchema>;

export const OgQuerySchema = v.object({
  title: v.optional(v.pipe(v.string(), v.maxLength(80)), "8 Secret Dev Tools"),
  subtitle: v.optional(v.pipe(v.string(), v.maxLength(120)), "KeroCodes"),
});

export const ImageFormSchema = v.object({
  image: v.pipe(
    v.instance(File, "ارفع صورة"),
    v.maxSize(5 * 1024 * 1024, "الصورة أكبر من 5MB"),
    v.mimeType(["image/png", "image/jpeg", "image/webp"], "png / jpeg / webp بس"),
  ),
});

// type (مش interface) عشان يتوافق مع Row بتاع ElectricSQL
export type OrderRow = {
  id: number;
  customer: string;
  item: string;
  amount: number;
  created_at: string;
};
