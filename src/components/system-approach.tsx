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
import { CtaStrip } from "@/components/ui/cta-strip";

const features = [
  {
    icon: FileCheck,
    title: "Стоимость фиксируется в договоре",
    description:
      "Цену назовём после оценки объёма отчётности и внесём в договор. Дополнительных счетов за превышение часов не будет.",
  },
  {
    icon: Clock,
    title: "Сроки под вашу отчётную дату",
    description:
      "Дата сдачи заключения закрепляется в договоре — под дедлайн для ФНС, банка или акционеров.",
  },
  {
    icon: UserCheck,
    title: "Команда с опытом 20+ лет",
    description:
      "Аттестованные аудиторы, налоговые консультанты и юристы. Проект ведёт аудитор со стажем, не выпускник профильного курса.",
  },
  {
    icon: FileText,
    title: "Перечень документов одним пакетом",
    description:
      "Список формируем под ваш объём и специфику учёта. Без шаблонных запросов на 150 позиций и дополнительных требований в процессе.",
  },
  {
    icon: ClipboardCheck,
    title: "Содержательное управленческое письмо",
    description:
      "По каждому замечанию — конкретная рекомендация: что исправить в учёте и как. Без формулировок «усилить контроль» без продолжения.",
  },
  {
    icon: Globe,
    title: "РСБУ, МСФО и консолидация",
    description:
      "Работаем по обоим стандартам. Опыт с консолидированной отчётностью и компаниями с иностранным участием.",
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
          <h2 className="font-heading text-4xl sm:text-5xl font-semibold mb-4 leading-[1.1]">
            За 500+ проверок мы поняли, как сделать аудит легким и прозрачным
            для компании
          </h2>
          <p className="text-lg text-muted-foreground">
            Шесть принципов, на которых выстроен процесс — от первой заявки до
            управленческого письма.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="bg-white rounded-2xl p-6 sm:p-7 border border-gray-200 hover:border-violet-300 hover:shadow-premium transition-all group"
            >
              <div className="w-12 h-12 rounded-xl gradient-violet flex items-center justify-center mb-5">
                <feature.icon className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-semibold text-base mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        <CtaStrip className="mt-14" />
      </div>
    </section>
  );
}
