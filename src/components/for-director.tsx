"use client";

import { motion } from "framer-motion";
import { MagicBento } from "@/components/ui/magic-bento";
import { CtaStrip } from "@/components/ui/cta-strip";

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
    value: "от 2 недель",
    description: "обязательный аудит БФО — 2–6 недель",
  },
];

export function ForDirector() {
  return (
    <section className="py-20 sm:py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mb-12 text-center mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-violet-100 text-xs font-medium text-primary mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            Команда в цифрах
          </div>
          <h2 className="font-heading text-4xl sm:text-5xl font-semibold mb-4 leading-[1.1]">
            Команда ИНФО-ФОРВАРД в цифрах
          </h2>
          <p className="text-lg text-muted-foreground">
            Четыре факта, которые стоит проверить перед выбором аудитора.
          </p>
        </motion.div>

        <MagicBento items={stats} />

        <CtaStrip className="mt-12" />
      </div>
    </section>
  );
}
