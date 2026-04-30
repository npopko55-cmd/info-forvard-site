"use client";

import { motion } from "framer-motion";
import { Quote, ArrowUpRight } from "lucide-react";
import { MagicBento } from "@/components/ui/magic-bento";

const stats = [
  {
    label: "Опыт",
    value: "30+ лет",
    description: "опыта у главного аудитора практики",
  },
  {
    label: "Проверки",
    value: "500+",
    description: "аудиторских проверок за карьеру",
  },
  {
    label: "Отрасли",
    value: "50+",
    description: "от производства до IT — знаем специфику",
  },
  {
    label: "Срок",
    value: "под задачу",
    description: "подбираем индивидуально под отчётную дату и фиксируем в договоре",
  },
];

export function ForDirector() {
  return (
    <section className="py-20 sm:py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto mb-10 text-center"
        >
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold mb-4 leading-[1.1]">
            Команда ИНФО-ФОРВАРД в цифрах
          </h2>
          <p className="text-lg text-muted-foreground">
            Четыре факта, на которые стоит обратить внимание перед выбором
            аудитора.
          </p>
        </motion.div>

        {/* Stats */}
        <MagicBento items={stats} />

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto mt-16"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px flex-1 bg-gray-300" />
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              Отзывы клиентов говорят сами за себя
            </div>
            <div className="h-px flex-1 bg-gray-300" />
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {/* Review 1 — TSJ Pokrovskoye-Glebovo */}
            <div className="relative rounded-3xl bg-white border border-violet-100 shadow-premium p-7 sm:p-8 flex flex-col">
              <Quote className="absolute -top-4 left-7 w-10 h-10 text-primary bg-gray-50 p-1.5 rounded-full border border-violet-100" />
              <p className="text-base leading-relaxed text-foreground flex-1">
                «Команда ИНФО-ФОРВАРД проявила исключительную оперативность.
                Все этапы проверки проводились с максимальной тщательностью.
                Были выявлены не только потенциальные риски, но и предложены
                конструктивные пути их решения. Рекомендуем их услуги всем
                компаниям, которые ценят качество, скорость и надежность.»
              </p>
              <div className="mt-5 pt-5 border-t border-gray-100 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <div className="font-semibold text-sm">К. Ю. Рябцев</div>
                  <div className="text-sm text-muted-foreground">
                    Управляющий ТСЖ «Покровское-Глебово»
                  </div>
                </div>
                <a
                  href="/review-tsj-glebovo.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/link inline-flex items-center gap-1.5 text-sm font-medium text-primary self-start sm:self-end whitespace-nowrap"
                >
                  Читать полный отзыв
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                </a>
              </div>
            </div>

            {/* Review 2 — Mir Vesov */}
            <div className="relative rounded-3xl bg-white border border-violet-100 shadow-premium p-7 sm:p-8 flex flex-col">
              <Quote className="absolute -top-4 left-7 w-10 h-10 text-primary bg-gray-50 p-1.5 rounded-full border border-violet-100" />
              <p className="text-base leading-relaxed text-foreground flex-1">
                «Выражаем благодарность за качественную и профессиональную
                оценку налоговых и бухгалтерских рисков. Высокая компетентность,
                внимание к деталям, глубокое понимание актуальных требований
                законодательства. Полученные рекомендации оказались практичными
                и уже помогли оптимизировать процессы учёта и налогообложения.»
              </p>
              <div className="mt-5 pt-5 border-t border-gray-100 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <div className="font-semibold text-sm">В. А. Иванов</div>
                  <div className="text-sm text-muted-foreground">
                    Генеральный директор ООО «Мир Весов»
                  </div>
                </div>
                <a
                  href="/review-mir-vesov.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/link inline-flex items-center gap-1.5 text-sm font-medium text-primary self-start sm:self-end whitespace-nowrap"
                >
                  Читать полный отзыв
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
