"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowDown } from "lucide-react";
import { motion } from "framer-motion";
import { Img } from "@/components/img";
import { RainbowMatrixShader } from "@/components/ui/rainbow-matrix-shader";

function CountUp({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
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
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
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

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden pt-20"
    >
      {/* Background shader */}
      <div className="absolute inset-0 z-0">
        <RainbowMatrixShader />
        <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/50 to-white/90" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass glass-border text-sm text-muted-foreground">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Аудиторская компания · Москва · Вся Россия
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
              Вы готовите отчётность —{" "}
              <span className="text-gradient-violet">мы её проверяем</span>
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground max-w-xl leading-relaxed">
              Аудит под ключ: от консультации до заключения и управленческого
              письма. Сами запросим первичку, сами проверим БФО, сдадим
              заключение в срок. Вам не придётся бросать закрытие периода.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-full px-8 text-base h-14 gradient-violet hover:opacity-90 text-white shadow-lg shadow-violet-500/25 font-medium transition-opacity"
              >
                Рассчитать стоимость аудита
              </a>
              <a
                href="#services"
                className="inline-flex items-center justify-center gap-2 rounded-full px-8 text-base h-14 bg-white/80 border border-border hover:bg-white font-medium transition-colors"
              >
                Услуги и цены
                <ArrowDown className="w-4 h-4" />
              </a>
            </div>
          </motion.div>

          {/* Right — dashboard image */}
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
          className="mt-16 lg:mt-24 grid grid-cols-3 gap-4 max-w-2xl"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white/80 glass-border rounded-2xl p-5 text-center sm:text-left backdrop-blur-sm"
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
