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

        {/* Testimonial block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto mt-16"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px flex-1 bg-gray-300" />
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              Отзывы клиентов говорят сами за себя
            </div>
            <div className="h-px flex-1 bg-gray-300" />
          </div>

          <div className="relative rounded-3xl bg-white border border-violet-100 shadow-premium p-7 sm:p-9">
            <Quote className="absolute -top-4 left-7 w-10 h-10 text-primary bg-gray-50 p-1.5 rounded-full border border-violet-100" />
            <p className="text-base sm:text-lg leading-relaxed text-foreground">
              «Команда ИНФО-ФОРВАРД проявила исключительную оперативность. Все
              этапы проверки проводились с максимальной тщательностью. Были
              выявлены не только потенциальные риски, но и предложены
              конструктивные пути их решения. Рекомендуем их услуги всем
              компаниям, которые ценят качество, скорость и надежность.»
            </p>
            <div className="mt-5 pt-5 border-t border-gray-100 flex items-end justify-between gap-4 flex-wrap">
              <div>
                <div className="font-semibold text-sm">К. Ю. Рябцев</div>
                <div className="text-sm text-muted-foreground">
                  Управляющий ТСЖ «Покровское-Глебово»
                </div>
              </div>
              <a
                href={`/review-tsj-glebovo.pdf`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:gap-2 transition-all"
              >
                Читать полный отзыв
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
