import type { ReactNode } from "react";
import { Check } from "lucide-react";
import type { ArticleBlock } from "@/lib/articles";

/** Превращает разметку [текст](адрес) в ссылки, а **текст** — в жирный. */
function withLinks(text: string): ReactNode[] {
  const parts: ReactNode[] = [];
  const re = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let i = 0;

  while ((m = re.exec(text)) !== null) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    if (m[3] !== undefined) {
      parts.push(
        <strong key={`b${i++}`} className="font-semibold text-foreground">
          {m[3]}
        </strong>
      );
    } else {
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
    }
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

        if (b.type === "h3") {
          return (
            <h3 key={i} className="font-heading text-xl sm:text-[22px] font-semibold leading-snug mt-3">
              {b.text}
            </h3>
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

        if (b.type === "quote") {
          return (
            <blockquote
              key={i}
              className="flex flex-col gap-4 rounded-r-2xl border-l-[3px] border-violet-300 bg-gray-50 py-5 pl-6 pr-5 sm:pr-7"
            >
              {b.paragraphs.map((t) => (
                <p key={t} className="text-[16px] leading-[1.75] text-foreground/85">
                  {withLinks(t)}
                </p>
              ))}
            </blockquote>
          );
        }

        if (b.type === "formula") {
          return (
            <div key={i} className="rounded-2xl border border-violet-100 bg-violet-50 px-6 py-6 sm:px-8">
              <p className="font-heading text-[26px] sm:text-3xl font-semibold text-violet-900 tracking-wide mb-4">
                {b.formula}
              </p>
              <p className="text-sm text-muted-foreground mb-2">где:</p>
              <dl className="flex flex-col gap-1.5">
                {b.legend.map(([k, v]) => (
                  <div key={k} className="flex gap-3 text-[16px] leading-snug">
                    <dt className="w-9 shrink-0 font-semibold text-primary">{k}</dt>
                    <dd className="text-foreground/85">— {v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          );
        }

        if (b.type === "example") {
          return (
            <div key={i} className="rounded-2xl border border-gray-200 overflow-hidden">
              <div className="bg-gray-50 px-6 py-5 sm:px-8 border-b border-gray-200">
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-primary mb-2">
                  {b.title}
                </p>
                <p className="text-[16px] leading-[1.7] text-foreground/90">{withLinks(b.text)}</p>
              </div>
              <div className="px-6 py-5 sm:px-8">
                <p className="text-sm font-semibold text-foreground mb-3">{b.subtitle}</p>
                <dl className="flex flex-col">
                  {b.rows.map(([k, v], ri) => {
                    const total = ri === b.rows.length - 1;
                    return (
                      <div
                        key={k}
                        className={`flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-x-6 gap-y-0.5 py-2.5 border-b border-dashed border-gray-200 last:border-0 ${
                          total ? "pt-3.5" : ""
                        }`}
                      >
                        <dt className={`text-[15px] ${total ? "font-semibold text-foreground" : "text-muted-foreground"}`}>
                          {k}
                        </dt>
                        <dd
                          className={`tabular-nums sm:text-right ${
                            total ? "text-lg font-semibold text-primary" : "text-[15px] font-medium text-foreground"
                          }`}
                        >
                          {v}
                        </dd>
                      </div>
                    );
                  })}
                </dl>
              </div>
            </div>
          );
        }

        if (b.type === "checklist") {
          return (
            <div key={i} className="grid gap-4 sm:grid-cols-3">
              {b.groups.map((g, gi) => (
                <div key={g.title} className="rounded-2xl border border-gray-200 bg-white p-5">
                  <div className="flex items-center gap-2.5 mb-4">
                    <span className="shrink-0 w-7 h-7 rounded-full bg-primary text-white text-[13px] font-semibold flex items-center justify-center tabular-nums">
                      {gi + 1}
                    </span>
                    <p className="font-semibold text-[16px] leading-snug">{g.title}</p>
                  </div>
                  <ul className="flex flex-col gap-2.5">
                    {g.items.map((it) => (
                      <li key={it} className="flex gap-2.5 text-[15px] leading-snug text-foreground/85">
                        <Check className="w-4 h-4 mt-0.5 shrink-0 text-primary" />
                        <span>{withLinks(it)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          );
        }

        if (b.type === "table" && b.layout === "text") {
          return (
            <div key={i} className="my-2 overflow-x-auto rounded-2xl border border-gray-200">
              <table className="w-full border-collapse text-[15px] min-w-[520px]">
                <thead>
                  <tr className="bg-violet-50">
                    {b.head.map((h) => (
                      <th key={h} className="px-4 py-3 text-left font-semibold text-violet-900 border-b border-violet-100">
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
                          className={`px-4 py-3 align-top leading-snug ${
                            ci === 0 ? "w-[34%] font-semibold text-foreground" : "text-foreground/85"
                          }`}
                        >
                          {withLinks(cell)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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
