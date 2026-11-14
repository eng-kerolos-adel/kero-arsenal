import { useState } from "react";
import { thumbHashToDataURL } from "thumbhash";
import { client } from "../lib/api";
import { Card } from "./Card";

interface Result {
  placeholder: string;
  original: string;
  bytes: number;
  hash: string;
}

const fromBase64 = (b64: string) => Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));

export function ThumbHashDemo() {
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState("");

  const onFile = async (file: File | undefined) => {
    if (!file) return;
    setError("");
    const res = await client.api.thumbhash.$post({ form: { image: file } });
    if (!res.ok) return setError("❌ ارفع png / jpeg / webp أقل من 5MB");
    const data = await res.json();
    setResult({
      placeholder: thumbHashToDataURL(fromBase64(data.thumbhash)),
      original: URL.createObjectURL(file),
      bytes: data.bytes,
      hash: data.thumbhash,
    });
  };

  return (
    <Card n={6} title="ThumbHash" tag="28-byte Placeholder">
      <input
        type="file"
        accept="image/png,image/jpeg,image/webp"
        onChange={(e) => onFile(e.target.files?.[0])}
      />
      {error && <p className="out bad">{error}</p>}
      {result && (
        <>
          <div className="row">
            <figure>
              <img className="thumb" src={result.placeholder} alt="placeholder" />
              <figcaption>Placeholder ({result.bytes} bytes)</figcaption>
            </figure>
            <figure>
              <img className="thumb" src={result.original} alt="original" />
              <figcaption>الأصلية</figcaption>
            </figure>
          </div>
          <code dir="ltr" className="hash">
            {result.hash}
          </code>
        </>
      )}
    </Card>
  );
}
