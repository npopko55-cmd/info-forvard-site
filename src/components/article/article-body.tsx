import type { ReactNode } from "react";
import type { ArticleBlock } from "@/lib/articles";

/** Превращает разметку [текст](адрес) в настоящие ссылки. */
function withLinks(text: string): ReactNode[] {
  const parts: ReactNode[] = [];
  const re = /\[([^\]]+)\]\(([^)]+)\)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let i = 0;

  while ((m = re.exec(text)) !== null) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    parts.push(
      <a
        key={`l${i++}`}
        href={m[2]}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary underline underline-offset-2 decoration-violet-300 hover:decoration-primary transition-colors"
      >
        {m[1]}
      </a>
    );
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

export function ArticleBody({ blocks }: { blocks: ArticleBlock[] }) {
  return (
    <div className="flex flex-col gap-5">
      {blocks.map((b, i) => {
        if (b.type === "h2") {
          return (
            <h2
              key={i}
              className="font-heading text-2xl sm:text-3xl font-semibold leading-tight mt-6 scroll-mt-28"
              id={`s${i}`}
            >
              {b.text}
            </h2>
          );
        }

        if (b.type === "p") {
          return (
            <p key={i} className="text-[17px] leading-[1.75] text-foreground/90">
              {withLinks(b.text)}
            </p>
          );
        }

        if (b.type === "ul") {
          return (
            <ul key={i} className="flex flex-col gap-2.5 pl-1">
              {b.items.map((it) => (
                <li key={it} className="flex gap-3 text-[17px] leading-[1.7] text-foreground/90">
                  <span className="mt-[11px] w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                  <span>{withLinks(it)}</span>
                </li>
              ))}
            </ul>
          );
        }

        if (b.type === "ol") {
          return (
            <ol key={i} className="flex flex-col gap-2.5">
              {b.items.map((it, n) => (
                <li key={it} className="flex gap-3 text-[17px] leading-[1.7] text-foreground/90">
                  <span className="shrink-0 w-6 h-6 mt-0.5 rounded-full bg-violet-100 text-primary text-[13px] font-semibold flex items-center justify-center tabular-nums">
                    {n + 1}
                  </span>
                  <span>{withLinks(it)}</span>
                </li>
              ))}
            </ol>
          );
        }

        // таблица проводок
        return (
          <div key={i} className="my-2 overflow-x-auto rounded-2xl border border-gray-200">
            <table className="w-full border-collapse text-[15px] min-w-[520px]">
              <thead>
                <tr className="bg-violet-50">
                  {b.head.map((h, hi) => (
                    <th
                      key={h}
                      className={`px-4 py-3 font-semibold text-violet-900 border-b border-violet-100 ${
                        hi === 0 ? "text-left" : "text-center w-24"
                      }`}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {b.rows.map((row, ri) => (
                  <tr key={ri} className="border-b border-gray-100 last:border-0">
                    {row.map((cell, ci) => (
                      <td
                        key={ci}
                        className={`px-4 py-3 align-top ${
                          ci === 0
                            ? "text-foreground/90 leading-snug"
                            : "text-center font-semibold tabular-nums text-primary"
                        }`}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  );
}
