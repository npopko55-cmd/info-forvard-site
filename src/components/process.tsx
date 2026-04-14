"use client";

import { motion } from "framer-motion";
import { Img } from "@/components/img";
const steps = [
  {
    num: "01",
    title: "Вы оставляете заявку",
    description: "Перезвоним в течение 15 минут в рабочее время.",
    accent: false,
  },
  {
    num: "02",
    title: "Проводим консультацию",
    description:
      'Разбираемся: какой аудит нужен, какой объём отчётности, какие ФСБУ применяете, есть ли консолидация. Называем сроки и стоимость — конкретно, а не «пришлите оборотку, посмотрим». Консультация бесплатная, без обязательств.',
    accent: true,
  },
  {
    num: "03",
    title: "Присылаем перечень документов",
    description:
      'Конкретный список: какие формы, за какие периоды, в каком виде. Под ваш объём, а не шаблон на 5 страниц. Не запрашиваем «всю первичку на всякий случай».',
    accent: false,
  },
  {
    num: "04",
    title: "Проводим аудит",
    description:
      'Работаем удалённо или с выездом. Не создаём авралов — если нужны доп. документы, запрашиваем заранее, а не когда у вас закрытие квартала. Вопросы по учёту обсуждаем, а не «напишите пояснилку».',
    accent: false,
  },
  {
    num: "05",
    title: "Сдаём заключение и управленческое письмо",
    description:
      'Аудиторское заключение — в срок, к согласованной дате. Управленческое письмо: что исправить в учёте, где риски искажений, что оптимизировать. Не шаблонное «рекомендуем усилить контроль» — конкретика по вашим проводкам и вашей учётке.',
    accent: true,
  },
];

export function Process() {
  return (
    <section id="process" className="py-20 sm:py-28 bg-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <Img src="/images/texture-bg.jpg" alt="" fill className="object-cover" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Аудит не должен парализовать бухгалтерию
          </h2>
          <p className="text-lg text-muted-foreground">
            5 шагов: от заявки до управленческого письма. 2–6 недель.
          </p>
        </motion.div>

        <div className="space-y-4">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className={`rounded-2xl p-6 sm:p-8 transition-all ${
                step.accent
                  ? "gradient-violet text-white"
                  : "bg-white border border-gray-200"
              }`}
            >
              <div className="flex gap-5 sm:gap-8">
                <div
                  className={`text-4xl sm:text-5xl font-bold shrink-0 ${
                    step.accent ? "text-white/30" : "text-violet-200"
                  }`}
                >
                  {step.num}
                </div>
                <div>
                  <h3
                    className={`text-lg sm:text-xl font-semibold mb-2 ${
                      step.accent ? "text-white" : ""
                    }`}
                  >
                    {step.title}
                  </h3>
                  <p
                    className={`leading-relaxed ${
                      step.accent ? "text-white/80" : "text-muted-foreground"
                    }`}
                  >
                    {step.description}
                  </p>
                </div>
              </div>
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
            Записаться на консультацию
          </a>
        </motion.div>
      </div>
    </section>
  );
}
