"use client";

import { ArrowRight, FileCheck, Calculator, Search, Handshake, Scale, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

const services = [
  {
    id: "mandatory",
    title: "Обязательный аудит БФО",
    description:
      "Проверка бухгалтерской отчётности по ФЗ-307. Немодифицированное заключение для ФНС, банков и акционеров. Сдаём в срок.",
    timeline: "от 2 недель",
    price: "от 80 000 ₽",
    popular: true,
    icon: FileCheck,
  },
  {
    id: "tax",
    title: "Налоговый аудит",
    description:
      "Проверка налогового учёта и первички. Выявим риски доначислений до камералки.",
    timeline: "от 1 недели",
    price: "от 50 000 ₽",
    popular: true,
    icon: Calculator,
  },
  {
    id: "initiative",
    title: "Инициативный аудит",
    description:
      "Проверка отчётности и учётной политики по вашей инициативе — до внешней проверки.",
    timeline: "от 2 недель",
    price: "от 60 000 ₽",
    popular: false,
    icon: Search,
  },
  {
    id: "dd",
    title: "Due Diligence",
    description:
      "Проверка перед сделкой: БФО, налоговые риски, правовая экспертиза. Одна команда.",
    timeline: "от 3 недель",
    price: "от 150 000 ₽",
    popular: false,
    icon: Handshake,
  },
  {
    id: "forensic",
    title: "Судебная экспертиза и форензик",
    description:
      "Финансово-экономическая экспертиза для суда. Расследование хищений и корпоративных злоупотреблений.",
    timeline: "индивидуально",
    price: "от 200 000 ₽",
    popular: false,
    icon: Scale,
  },
  {
    id: "consulting",
    title: "Консультации и сопровождение",
    description:
      "Разовые консультации аудитора, абонентское сопровождение, восстановление учёта, проверка проводок.",
    timeline: "",
    price: "от 5 000 ₽",
    popular: false,
    icon: MessageCircle,
  },
];

export function Services() {
  return (
    <section id="services" className="py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mb-12"
        >
          <h2 className="font-heading text-4xl sm:text-5xl font-semibold mb-4">
            Шесть услуг — от консультации за 5 000 ₽ до форензика
          </h2>
          <p className="text-lg text-muted-foreground">
            Стоимость фиксируем в договоре после оценки объёма. Доплат не будет.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, i) => (
            <motion.a
              key={service.id}
              href="#contact"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className={`group relative rounded-2xl p-6 sm:p-7 transition-all duration-300 hover:shadow-premium-lg hover:-translate-y-1 flex flex-col bg-white ${
                service.popular
                  ? "border-2 border-primary"
                  : "border border-gray-200 hover:border-violet-200"
              }`}
            >
              {service.popular && (
                <div className="absolute -top-3 left-6 px-3 py-1 rounded-full gradient-violet text-xs font-semibold text-white shadow-md shadow-violet-500/25">
                  Рекомендуем
                </div>
              )}

              <div className="mb-5 w-12 h-12 rounded-xl gradient-violet flex items-center justify-center">
                <service.icon className="w-6 h-6 text-white" />
              </div>

              <div className="space-y-3 flex-1 flex flex-col">
                <h3 className="text-xl font-semibold">{service.title}</h3>
                <p className="text-sm leading-relaxed flex-1 text-muted-foreground">
                  {service.description}
                </p>

                <div className="pt-4 border-t border-gray-100">
                  {service.timeline && (
                    <div className="text-xs mb-1 text-muted-foreground">
                      {service.timeline}
                    </div>
                  )}
                  <div className="text-2xl font-bold">{service.price}</div>
                </div>

                <div className="flex items-center gap-2 text-sm font-medium pt-2 text-primary">
                  Рассчитать стоимость
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10 text-center"
        >
          <p className="text-muted-foreground mb-4">
            Задача не вписывается в перечень? Опишите ситуацию — разберёмся на
            консультации.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
          >
            Записаться на консультацию
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
