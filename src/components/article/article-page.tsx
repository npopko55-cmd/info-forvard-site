import { ArrowLeft, Clock, CalendarDays, Phone } from "lucide-react";
import { ArticleNavbar } from "@/components/article/article-navbar";
import { ArticleBody } from "@/components/article/article-body";
import { Footer } from "@/components/footer";
import { Img } from "@/components/img";
import { withBase } from "@/lib/prefix";
import type { Article } from "@/lib/articles";

export function ArticlePage({ article }: { article: Article }) {
  const home = withBase("/");

  return (
    <>
      <ArticleNavbar />

      <main className="pt-28 sm:pt-32 pb-4 bg-white">
        <article className="max-w-[760px] mx-auto px-4 sm:px-6">
          <a
            href={withBase("/articles/")}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-7"
          >
            <ArrowLeft className="w-4 h-4" />
            Все статьи
          </a>

          <h1 className="font-heading text-3xl sm:text-4xl lg:text-[42px] font-semibold leading-[1.15] text-balance mb-5">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground pb-6 mb-8 border-b border-gray-200">
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="w-4 h-4" />
              {article.dateLabel}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {article.readingTime}
            </span>
          </div>

          {article.cover && (
            <Img
              src={article.cover.src}
              alt={article.cover.alt}
              className="w-full aspect-[16/9] object-cover rounded-2xl mb-8"
            />
          )}

          <p className="text-lg leading-[1.7] text-foreground mb-8 pl-5 border-l-2 border-primary">
            {article.lead}
          </p>

          <ArticleBody blocks={article.blocks} />

          {/* Призыв к действию */}
          <aside className="mt-14 rounded-2xl border border-violet-100 bg-violet-50 p-7 sm:p-9">
            <h2 className="font-heading text-2xl font-semibold mb-3 leading-snug">
              {article.cta.title}
            </h2>
            <p className="text-[16px] leading-relaxed text-foreground/85 mb-6">
              {article.cta.text}
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={`${home}#contact`}
                className="inline-flex items-center justify-center rounded-xl py-3.5 px-7 gradient-violet text-white font-semibold text-[15px] shadow-lg shadow-violet-500/25 transition-opacity hover:opacity-90"
              >
                Получить консультацию
              </a>
              <a
                href="tel:+79011841190"
                className="inline-flex items-center justify-center gap-2 rounded-xl py-3.5 px-7 bg-white border border-gray-300 hover:border-primary font-medium text-[15px] transition-all"
              >
                <Phone className="w-4 h-4 text-primary" />
                +7 (901) 184-11-90
              </a>
            </div>
          </aside>
        </article>
      </main>

      <Footer sectionBase={home} />
    </>
  );
}
