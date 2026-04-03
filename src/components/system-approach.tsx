"use client";

import { motion } from "framer-motion";
import {
  FileCheck,
  Clock,
  UserCheck,
  FileText,
  ClipboardCheck,
  Globe,
} from "lucide-react";

const features = [
  {
    icon: FileCheck,
    title: "Стоимость в договоре = итоговый счёт",
    description:
      'Зафиксировали сумму — столько и выставим. Без «объём оказался больше, пересчитаем».',
  },
  {
    icon: Clock,
    title: "Заключение к согласованной дате",
    description:
      'Сроки прописаны в договоре. Не «доработаем на следующей неделе, потерпите».',
  },
  {
    icon: UserCheck,
    title: "Работаете с аудитором, не со стажёром",
    description:
      "Проект ведёт аттестованный аудитор, он же общается с вами. Не пришлём вчерашнего выпускника, который путает 41 и 43 счёт.",
  },
  {
    icon: FileText,
    title: "Запрашиваем только нужные документы",
    description:
      'Перечень под ваш объём и вашу специфику. Без списка на 150 позиций «прошлый аудитор просил — и мы попросим».',
  },
  {
    icon: ClipboardCheck,
    title: "Заключение + управленческое письмо с конкретикой",
    description:
      'Не аудиторское заключение «для галочки» и не копипаста управленческого письма с прошлого года. По каждому замечанию — что исправить и как.',
  },
  {
    icon: Globe,
    title: "Отчётность по РСБУ и МСФО",
    description:
      "Работаем с обоими стандартами. Знаем специфику компаний с консолидацией и иностранным участием.",
  },
];

export function SystemApproach() {
  return (
    <section className="py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Фиксированная цена в договоре, конкретные сроки, работаете напрямую
            с аудитором
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="bg-white rounded-2xl p-6 sm:p-7 glass-border hover:border-violet-200 transition-all group"
            >
              <div className="w-12 h-12 rounded-2xl bg-violet-100 flex items-center justify-center mb-5 group-hover:bg-violet-200 transition-colors">
                <feature.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-semibold text-base mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
