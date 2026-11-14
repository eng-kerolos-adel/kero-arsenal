/** عملية تقيلة CPU-bound: توليد وترتيب ملايين الأرقام */
export function crunch(size: number) {
  const started = performance.now();
  const numbers = Array.from({ length: size }, () => Math.random());
  numbers.sort((a, b) => a - b);
  return {
    size,
    median: numbers[Math.floor(size / 2)] ?? 0,
    ms: Math.round(performance.now() - started),
  };
}
