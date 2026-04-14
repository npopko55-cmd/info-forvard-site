"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowDown, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { Img } from "@/components/img";

function CountUp({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const run = () => {
      if (started.current) return;
      started.current = true;
      const duration = 2000;
      const start = performance.now();
      const step = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Math.floor(eased * target));
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) run();
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    if (ref.current) observer.observe(ref.current);

    const fallback = setTimeout(run, 1500);

    return () => {
      observer.disconnect();
      clearTimeout(fallback);
    };
  }, [target]);

  return (
    <div ref={ref} className="text-3xl sm:text-4xl font-bold text-primary">
      {count}
      {suffix}
    </div>
  );
}

const stats = [
  { value: 25, suffix: "+", label: "лет практики" },
  { value: 500, suffix: "+", label: "проведённых аудитов" },
  { value: 15, suffix: " мин", label: "ответ на заявку" },
];

const trustPoints = [
  "Цена в договоре = итоговый счёт",
  "Заключение к согласованной дате",
  "Работаете с аудитором, не со стажёром",
  "Член СРО ААС · 25 лет практики",
];

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden pt-24 pb-16 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-7"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-50 border border-violet-100 text-sm text-primary font-medium">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Аттестат общего аудита · Член СРО ААС
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05]">
              Вы готовите отчётность —{" "}
              <span className="text-gradient-violet">мы её проверяем</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
              Запросим только нужные документы, проверим удалённо, не сорвём
              закрытие квартала. Заключение и управленческое письмо — к дате в
              договоре.
            </p>

            <ul className="space-y-2.5">
              {trustPoints.map((p) => (
                <li
                  key={p}
                  className="flex items-start gap-3 text-base text-foreground"
                >
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-xl px-8 text-base h-14 gradient-violet hover:opacity-90 text-white shadow-lg shadow-violet-500/20 font-medium transition-opacity"
              >
                Узнать стоимость за 1 минуту
              </a>
              <a
                href="#services"
                className="inline-flex items-center justify-center gap-2 rounded-xl px-6 text-base h-14 text-foreground hover:bg-gray-50 font-medium transition-colors"
              >
                Услуги и цены
                <ArrowDown className="w-4 h-4" />
              </a>
            </div>
          </motion.div>

          {/* Right — Dashboard */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="hidden lg:flex justify-center"
          >
            <Img
              src="/images/dashboard.png"
              alt="Аналитика аудита"
              className="drop-shadow-2xl"
            />
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-2xl p-5 shadow-[0_4px_20px_rgba(124,58,237,0.06)] border border-gray-100"
            >
              <CountUp target={stat.value} suffix={stat.suffix} />
              <div className="text-sm text-muted-foreground mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
