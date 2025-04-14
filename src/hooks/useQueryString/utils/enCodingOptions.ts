export function enCodingOptions<T>(obj: T): string {
  return `options=${encodeURIComponent(JSON.stringify(obj))}`;
}
