"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, TrendingUp, Quote } from "lucide-react";
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
    <span>
      {count}
      {suffix}
    </span>
  );
}

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden pt-28 pb-20"
      style={{
        background:
          "linear-gradient(180deg, #F5F2FB 0%, #FBFAFC 70%, #F5F2FB 100%)",
      }}
    >
      {/* Cloud fade — top */}
      <div
        className="absolute top-0 left-0 right-0 h-40 z-[5] pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.7) 40%, rgba(255,255,255,0) 100%)",
        }}
      />
      {/* Cloud fade — bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 z-[5] pointer-events-none"
        style={{
          background:
            "linear-gradient(0deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.7) 40%, rgba(255,255,255,0) 100%)",
        }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 space-y-8 relative z-20"
          >
            <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-semibold leading-[0.98] tracking-tight">
              Аудит,
              <br />
              которому
              <br />
              <span className="italic text-gradient-violet">доверяют</span>
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground max-w-md leading-relaxed">
              Проверяем отчётность компаний с выручкой от 400 млн до 5 млрд ₽.
              Заключение в срок, цена в договоре, аудитор — не стажёр.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="#contact"
                className="group inline-flex items-center justify-center gap-2 rounded-full px-7 h-13 py-4 bg-[#16162B] hover:bg-[#2a2a48] text-white font-medium text-sm transition-colors"
              >
                Узнать стоимость
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href="#services"
                className="inline-flex items-center justify-center rounded-full px-7 h-13 py-4 border border-gray-300 hover:border-primary hover:text-primary text-foreground font-medium text-sm transition-colors"
              >
                Услуги и цены
              </a>
            </div>

            {/* Floating testimonial card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="hidden sm:block mt-10 bg-white rounded-2xl p-5 shadow-premium border border-gray-100 max-w-sm"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-200 to-violet-300 flex items-center justify-center shrink-0">
                  <Quote className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-semibold">
                    Ваша отчётность — наш фокус
                  </div>
                  <div className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    25 лет опыта. 500+ проверок. Аудитор лично ведёт каждый
                    проект.
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Center — Owl statue, large, background blended out */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="lg:col-span-6 relative flex justify-center items-center min-h-[640px]"
          >
            {/* Soft radial glow backdrop */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[55%] w-[560px] h-[560px] rounded-full pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle, rgba(167,139,250,0.28) 0%, rgba(196,181,253,0.12) 45%, rgba(245,242,251,0) 70%)",
              }}
            />

            {/* Owl — cutout, large, cropped waist-up via mask */}
            <div
              className="relative w-[560px] h-[700px] z-10 -ml-16 lg:-ml-24"
              style={{
                maskImage:
                  "linear-gradient(180deg, transparent 0%, #000 10%, #000 78%, transparent 100%)",
                WebkitMaskImage:
                  "linear-gradient(180deg, transparent 0%, #000 10%, #000 78%, transparent 100%)",
              }}
            >
              <Img
                src="/images/owl-cutout.png"
                alt="Сова — символ аудита: зоркость, мудрость, точность"
                fill
                className="object-contain object-top"
              />
            </div>

            {/* Floating stats card — top right */}
            <motion.div
              initial={{ opacity: 0, x: 20, y: -10 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="absolute top-8 right-0 sm:-right-4 bg-white rounded-2xl p-4 shadow-premium-lg border border-gray-100 w-[220px] z-20"
            >
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-primary" />
                <span className="text-xs font-semibold">
                  Проверено за 2025
                </span>
              </div>
              <svg viewBox="0 0 200 60" className="w-full h-10">
                <defs>
                  <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#5B21B6" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#5B21B6" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d="M0,45 L25,38 L50,42 L75,28 L100,32 L125,20 L150,24 L175,12 L200,8 L200,60 L0,60 Z"
                  fill="url(#chartFill)"
                />
                <path
                  d="M0,45 L25,38 L50,42 L75,28 L100,32 L125,20 L150,24 L175,12 L200,8"
                  fill="none"
                  stroke="#5B21B6"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-xl font-bold">147</span>
                <span className="text-xs text-muted-foreground">
                  аудитов сдано
                </span>
              </div>
            </motion.div>

            {/* Floating 25+ years badge — top left */}
            <motion.div
              initial={{ opacity: 0, x: -20, y: 10 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="absolute top-32 left-0 sm:-left-6 bg-white rounded-2xl p-4 shadow-premium border border-gray-100 w-[160px] z-20"
            >
              <div className="text-3xl font-bold font-heading text-primary">
                <CountUp target={25} suffix="+" />
              </div>
              <div className="text-xs text-muted-foreground mt-0.5">
                лет практики
              </div>
            </motion.div>

            {/* Floating clients badge — bottom right */}
            <motion.div
              initial={{ opacity: 0, x: 20, y: 10 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="absolute bottom-16 right-0 sm:-right-2 bg-[#16162B] text-white rounded-2xl p-4 shadow-premium-lg w-[180px] z-20"
            >
              <div className="text-3xl font-bold font-heading">
                <CountUp target={500} suffix="+" />
              </div>
              <div className="text-xs text-white/70 mt-0.5">
                довольных клиентов
              </div>
              <div className="flex -space-x-2 mt-3">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="w-7 h-7 rounded-full border-2 border-[#16162B] bg-gradient-to-br from-violet-300 to-violet-500"
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
