import sharp from "sharp";
import { rgbaToThumbHash } from "thumbhash";

/**
 * بياخد Buffer لأي صورة → بيرجّع ThumbHash (حوالي 25-28 بايت) كـ base64.
 * ThumbHash بيشترط الصورة ما تزيدش عن 100x100، فبنصغّرها الأول بـ sharp.
 */
export async function imageToThumbHash(input: Buffer) {
  const { data, info } = await sharp(input)
    .resize(100, 100, { fit: "inside" })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const hash = rgbaToThumbHash(info.width, info.height, data);
  return {
    thumbhash: Buffer.from(hash).toString("base64"),
    bytes: hash.length,
    width: info.width,
    height: info.height,
  };
}
