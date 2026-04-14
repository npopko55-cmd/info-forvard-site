"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

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
      "Разбираемся: какой аудит нужен, объём отчётности, какие ФСБУ применяете, есть ли консолидация. Называем сроки и стоимость конкретно. Консультация бесплатная.",
    accent: true,
  },
  {
    num: "03",
    title: "Присылаем перечень документов",
    description:
      "Конкретный список: какие формы, за какие периоды, в каком виде. Под ваш объём, а не шаблон на 5 страниц.",
    accent: false,
  },
  {
    num: "04",
    title: "Проводим аудит",
    description:
      "Удалённо или с выездом. Не создаём авралов: доп. документы запрашиваем заранее, а не во время закрытия квартала.",
    accent: false,
  },
  {
    num: "05",
    title: "Сдаём заключение и управленческое письмо",
    description:
      "Заключение к согласованной дате. Управленческое письмо: что исправить, где риски искажений — по вашим проводкам, а не шаблонное «усилить контроль».",
    accent: true,
  },
];

function StickyCard({
  step,
  index,
  total,
  containerRef,
}: {
  step: (typeof steps)[number];
  index: number;
  total: number;
  containerRef: React.RefObject<HTMLDivElement | null>;
}) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Scale down cards as they get "buried" by the next ones
  const segment = 1 / total;
  const scaleStart = index * segment;
  const scaleEnd = (index + 1) * segment;
  const targetScale = 1 - (total - index - 1) * 0.04;
  const scale = useTransform(
    scrollYProgress,
    [scaleStart, scaleEnd],
    [1, targetScale]
  );

  return (
    <div
      className="sticky"
      style={{ top: `${90 + index * 20}px` }}
    >
      <motion.div
        style={{ scale, transformOrigin: "top center" }}
        className={`mx-auto max-w-3xl rounded-3xl p-8 sm:p-10 shadow-xl ${
          step.accent
            ? "gradient-violet text-white"
            : "bg-white border border-gray-200"
        }`}
      >
        <div className="flex gap-6 sm:gap-8">
          <div
            className={`text-5xl sm:text-6xl font-bold shrink-0 leading-none ${
              step.accent ? "text-white/30" : "text-violet-200"
            }`}
          >
            {step.num}
          </div>
          <div>
            <h3
              className={`text-xl sm:text-2xl font-semibold mb-3 ${
                step.accent ? "text-white" : ""
              }`}
            >
              {step.title}
            </h3>
            <p
              className={`leading-relaxed ${
                step.accent ? "text-white/85" : "text-muted-foreground"
              }`}
            >
              {step.description}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function Process() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section id="process" className="py-20 sm:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mb-16"
        >
          <h2 className="font-heading text-4xl sm:text-5xl font-semibold mb-4">
            Как проходит аудит
          </h2>
          <p className="text-lg text-muted-foreground">
            Пять шагов от заявки до управленческого письма. От 2 до 6 недель.
          </p>
        </motion.div>

        <div ref={containerRef} className="relative space-y-6">
          {steps.map((step, i) => (
            <StickyCard
              key={step.num}
              step={step}
              index={i}
              total={steps.length}
              containerRef={containerRef}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
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
