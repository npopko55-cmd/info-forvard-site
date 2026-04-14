"use client";

import { motion } from "framer-motion";
import { MagicBento } from "@/components/ui/magic-bento";

const stats = [
  {
    label: "Опыт",
    value: "30+ лет",
    description: "опыта у руководителя аудиторской практики",
  },
  {
    label: "Проверки",
    value: "500+",
    description: "аудиторских проверок за карьеру",
  },
  {
    label: "Отрасли",
    value: "50+",
    description: "от производства до IT — знаем специфику учёта",
  },
  {
    label: "Срок",
    value: "от 2 недель",
    description: "обязательный аудит БФО — 2–6 недель под объём",
  },
  {
    label: "Стоимость",
    value: "от 80 000 ₽",
    description: "обязательный аудит. Цена фиксируется в договоре",
  },
  {
    label: "Ответ",
    value: "15 минут",
    description: "среднее время ответа на заявку в рабочее время",
  },
];

export function ForDirector() {
  return (
    <section className="py-20 sm:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mb-12"
        >
          <h2 className="font-heading text-4xl sm:text-5xl font-semibold mb-4">
            Цифры, которые стоит знать
          </h2>
          <p className="text-lg text-muted-foreground">
            Факты для оценки аудиторской компании перед заявкой.
          </p>
        </motion.div>

        <MagicBento items={stats} />
      </div>
    </section>
  );
}
