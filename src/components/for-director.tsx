"use client";

import { motion } from "framer-motion";
import { Img } from "@/components/img";
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
    title: "Комплексная экспертиза",
    text: "Аудит + налоговый консалтинг + правовая поддержка. Одна команда.",
  },
  {
    icon: ShieldCheck,
    title: "Без риска",
    text: "Первая консультация бесплатная. Не подошли — ничего не теряете.",
  },
];

export function ForDirector() {
  return (
    <section className="py-20 sm:py-28 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-50 text-primary text-sm font-medium mb-6">
            Для согласования с руководителем
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Коротко для руководителя
          </h2>
          <p className="text-lg text-muted-foreground">
            Если нужно согласовать выбор аудитора — вот ключевое
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 grid sm:grid-cols-2 gap-4">
            {facts.map((fact, i) => (
              <motion.div
                key={fact.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="rounded-2xl p-6 bg-gray-50 glass-border"
              >
                <fact.icon className="w-5 h-5 text-primary mb-4" />
                <h3 className="font-semibold mb-2">{fact.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {fact.text}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Dashboard image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="hidden lg:flex items-center justify-center"
          >
            <Img
              src="/images/dashboard.png"
              alt="Аналитика"
              className="drop-shadow-xl"
            />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10 text-center"
        >
          <a
            href="#contact"
            className="inline-flex items-center justify-center rounded-full px-8 h-14 gradient-violet text-white shadow-lg shadow-violet-500/25 font-medium text-base transition-opacity hover:opacity-90"
          >
            Обсудить задачу
          </a>
        </motion.div>
      </div>
    </section>
  );
}
