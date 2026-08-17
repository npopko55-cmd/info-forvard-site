export const PREFIX = process.env.NEXT_PUBLIC_BASE_PATH || "";

/** Добавляет префикс базового пути к внутренней ссылке.
 *  При пустом NEXT_PUBLIC_BASE_PATH (боевой сайт на reg.ru) ничего не меняет. */
export function withBase(path: string): string {
  if (!PREFIX) return path;
  if (!path.startsWith("/")) return path;
  return `${PREFIX}${path}`;
}
