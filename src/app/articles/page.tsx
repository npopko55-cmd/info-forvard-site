import type { Metadata } from "next";
import { ArrowRight, CalendarDays, Clock } from "lucide-react";
import { ArticleNavbar } from "@/components/article/article-navbar";
import { Footer } from "@/components/footer";
import { articles } from "@/lib/articles";
import { withBase } from "@/lib/prefix";

export const metadata: Metadata = {
  title: "Статьи для бухгалтеров и руководителей — ИНФО ФОРВАРД",
  description:
    "Разборы требований бухгалтерского и налогового учёта от практикующих аудиторов: что проверяют, где ошибаются и чем это грозит компании.",
};

export default function ArticlesIndexPage() {
  return (
    <>
      <ArticleNavbar />

      <main className="pt-28 sm:pt-32 pb-16 bg-white min-h-[70vh]">
        <div className="max-w-[860px] mx-auto px-4 sm:px-6">
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.1] mb-4">
            Статьи
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mb-10">
            Разборы требований бухгалтерского и налогового учёта от практикующих
            аудиторов: что проверяют, где чаще всего ошибаются и чем это грозит
            компании.
          </p>

          <div className="flex flex-col gap-4">
            {articles.map((a) => (
              <a
                key={a.slug}
                href={withBase(`/articles/${a.slug}/`)}
                className="group rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 transition-all hover:border-violet-200 hover:shadow-premium-lg hover:-translate-y-0.5"
              >
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground mb-3">
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarDays className="w-3.5 h-3.5" />
                    {a.dateLabel}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    {a.readingTime}
                  </span>
                </div>

                <h2 className="font-heading text-xl sm:text-2xl font-semibold leading-snug mb-3">
                  {a.cardTitle}
                </h2>
                <p className="text-[15px] leading-relaxed text-muted-foreground line-clamp-3">
                  {a.lead}
                </p>

                <span className="inline-flex items-center gap-2 text-sm font-medium text-primary mt-5">
                  Читать статью
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </main>

      <Footer sectionBase={withBase("/")} />
    </>
  );
}
