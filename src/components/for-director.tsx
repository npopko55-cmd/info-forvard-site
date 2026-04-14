"use client";

import { motion } from "framer-motion";
import {
  Banknote,
  Clock,
  GraduationCap,
  FileCheck2,
  Users,
  ShieldCheck,
} from "lucide-react";

const facts = [
  {
    icon: Banknote,
    title: "Стоимость",
    text: "Обязательный аудит — от 80 000 ₽. Фиксируем в договоре. Доплат не будет.",
  },
  {
    icon: Clock,
    title: "Сроки",
    text: "От 2 недель. Точная дата сдачи заключения — в договоре.",
  },
  {
    icon: GraduationCap,
    title: "Квалификация",
    text: "25+ лет практики. 500+ аудитов. Аттестат по общему аудиту. Член СРО ААС. Судебный эксперт.",
  },
  {
    icon: FileCheck2,
    title: "Результат",
    text: "Немодифицированное заключение по ФЗ-307, МСА. Принимается ФНС, банками, акционерами.",
  },
  {
    icon: Users,
    title: "Одна команда",
    text: "Аудит, налоговый консалтинг и правовая поддержка — в одной компании.",
  },
  {
    icon: ShieldCheck,
    title: "Без риска",
    text: "Первая консультация бесплатная. Не подошли — ничего не теряете.",
  },
];

export function ForDirector() {
  return (
    <section className="py-20 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Что показать директору за минуту
          </h2>
          <p className="text-lg text-muted-foreground">
            Шесть фактов для согласования выбора аудитора
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {facts.map((fact, i) => (
            <motion.div
              key={fact.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="rounded-2xl p-6 bg-white border border-gray-200 hover:border-violet-300 hover:shadow-md transition-all"
            >
              <div className="w-12 h-12 rounded-xl gradient-violet flex items-center justify-center mb-4">
                <fact.icon className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-semibold mb-2">{fact.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {fact.text}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10 text-center"
        >
          <a
            href="#contact"
            className="inline-flex items-center justify-center rounded-xl px-8 h-14 gradient-violet text-white shadow-lg shadow-violet-500/20 font-medium text-base transition-opacity hover:opacity-90"
          >
            Обсудить задачу
          </a>
        </motion.div>
      </div>
    </section>
  );
}
