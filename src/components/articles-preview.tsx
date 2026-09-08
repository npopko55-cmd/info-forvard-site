"use client";

import { motion } from "framer-motion";
import { ArrowRight, CalendarDays, Clock } from "lucide-react";
import { articles } from "@/lib/articles";
import { withBase } from "@/lib/prefix";

/** Блок «Статьи» на главной: три последних материала + ссылка на весь список. */
export function ArticlesPreview() {
  const latest = articles.slice(0, 3);
  if (latest.length === 0) return null;

  return (
    <section id="articles" className="py-20 sm:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12"
        >
          <div className="max-w-2xl">
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold mb-4 leading-[1.1]">
              Статьи для бухгалтеров и руководителей
            </h2>
            <p className="text-lg text-muted-foreground">
              Разборы требований учёта от практикующих аудиторов: что проверяют,
              где чаще всего ошибаются и чем это грозит компании.
            </p>
          </div>

          <a
            href={withBase("/articles/")}
            className="hidden sm:inline-flex shrink-0 items-center gap-2 text-sm font-medium text-primary hover:gap-3 transition-all"
          >
            Все статьи
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>

        <div className="flex flex-col gap-4">
          {latest.map((a, i) => (
            <motion.a
              key={a.slug}
              href={withBase(`/articles/${a.slug}/`)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
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

              <h3 className="font-heading text-xl sm:text-2xl font-semibold leading-snug mb-3">
                {a.cardTitle}
              </h3>
              <p className="text-[15px] leading-relaxed text-muted-foreground max-w-3xl">
                {a.excerpt}
              </p>

              <span className="inline-flex items-center gap-2 text-sm font-medium text-primary mt-5">
                Читать статью
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </span>
            </motion.a>
          ))}
        </div>

        <a
          href={withBase("/articles/")}
          className="sm:hidden mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary"
        >
          Все статьи
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </section>
  );
}
