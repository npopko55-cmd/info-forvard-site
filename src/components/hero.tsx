"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, TrendingUp, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { Img } from "@/components/img";

function CountUp({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const run = () => {
      if (started.current) return;
      started.current = true;
      const duration = 2200;
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
      ([entry]) => entry.isIntersecting && run(),
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    if (ref.current) observer.observe(ref.current);
    const fallback = setTimeout(run, 1200);
    return () => {
      observer.disconnect();
      clearTimeout(fallback);
    };
  }, [target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export function Hero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden"
      style={{
        background:
          "radial-gradient(120% 60% at 50% 0%, #F5F2FB 0%, #FBFAFC 55%, #F5F2FB 100%)",
      }}
    >
      {/* Ambient violet blob behind owl */}
      <div
        aria-hidden
        className="absolute top-[-120px] right-[3%] w-[620px] h-[620px] rounded-full pointer-events-none opacity-65 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(167,139,250,0.4) 0%, rgba(196,181,253,0.15) 45%, transparent 72%)",
        }}
      />

      {/* Cloud fade — top */}
      <div
        aria-hidden
        className="absolute top-0 left-0 right-0 h-28 z-[5] pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.55) 45%, transparent 100%)",
        }}
      />
      {/* Cloud fade — bottom */}
      <div
        aria-hidden
        className="absolute bottom-0 left-0 right-0 h-28 z-[5] pointer-events-none"
        style={{
          background:
            "linear-gradient(0deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.55) 45%, transparent 100%)",
        }}
      />

      {/* Grain overlay */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-multiply z-[4]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-10 lg:pt-28 lg:pb-14">
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-10 items-center">
          {/* LEFT — text */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: { staggerChildren: 0.08, delayChildren: 0.05 },
              },
            }}
            className="lg:col-span-6 relative z-20 flex flex-col"
          >
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 12 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              }}
              className="inline-flex items-center gap-2 self-start px-3 py-1.5 rounded-full bg-white/70 backdrop-blur-sm border border-violet-200/80 text-xs font-medium text-primary mb-7"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Аудиторская компания · Москва · Вся Россия
            </motion.div>

            <motion.h1
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
              }}
              className="font-heading font-semibold leading-[1.02] tracking-[-0.02em] text-[clamp(2.25rem,5.2vw,4rem)] text-foreground"
            >
              Обязательный аудит БФО{" "}
              <span className="italic text-gradient-violet">
                в срок, с гарантией по договору
              </span>
            </motion.h1>

            <motion.p
              variants={{
                hidden: { opacity: 0, y: 12 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
              }}
              className="mt-6 text-base lg:text-lg text-muted-foreground max-w-md leading-relaxed"
            >
              Проверяем бухгалтерскую отчётность компаний с выручкой от 400 млн ₽.
              Готовим заключения, которые принимают ФНС, банки и акционеры.
            </motion.p>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 12 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
              }}
              className="mt-9 flex flex-col sm:flex-row gap-3"
            >
              <a
                href="#contact"
                className="group inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 bg-[#16162B] hover:bg-[#26263F] text-white font-medium text-sm transition-all shadow-[0_8px_24px_rgba(22,22,43,0.25)] hover:shadow-[0_12px_32px_rgba(22,22,43,0.35)]"
              >
                Рассчитать стоимость
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a
                href="#services"
                className="inline-flex items-center justify-center rounded-full px-7 py-3.5 border border-[#16162B]/15 hover:border-[#16162B]/40 bg-white/60 hover:bg-white/90 backdrop-blur-sm text-foreground font-medium text-sm transition-all"
              >
                Услуги и цены
              </a>
            </motion.div>

            {/* Testimonial-style floating card */}
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.95 }}
              className="mt-10 bg-white/95 backdrop-blur-sm rounded-2xl p-5 shadow-[0_12px_40px_-8px_rgba(76,29,149,0.18)] border border-white max-w-[340px]"
            >
              <div className="flex items-start gap-3.5">
                <div className="relative shrink-0">
                  <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100">
                    <Img
                      src="/images/oleynikova-v2.jpg"
                      alt="Наталья Олейникова"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-primary flex items-center justify-center shadow">
                    <svg
                      className="w-3 h-3 text-white"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <path
                        d="M3 8L6.5 11.5L13 5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-semibold leading-tight text-foreground">
                    30+ лет опыта · Член СРО ААС · Судэксперт
                  </div>
                  <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                    Аудит, налоговый консалтинг и правовая экспертиза — одной командой.
                  </p>
                  <a
                    href="#team"
                    className="mt-2.5 inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-primary hover:gap-1.5 transition-all"
                  >
                    Подробнее
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT — owl + floating cards */}
          <div className="lg:col-span-6 relative h-[560px] lg:h-[620px]">
            {/* Owl statue — larger, fills column with top/bottom fade */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="absolute -top-8 -bottom-8 -left-8 -right-8 lg:-top-12 lg:-bottom-12 lg:-left-12 lg:-right-12 z-10 pointer-events-none flex items-center justify-center"
            >
              {/* Pedestal glow */}
              <div
                aria-hidden
                className="absolute bottom-[14%] left-1/2 -translate-x-1/2 w-[60%] h-[100px] rounded-full blur-2xl opacity-70"
                style={{
                  background:
                    "radial-gradient(ellipse, rgba(91,33,182,0.3) 0%, rgba(91,33,182,0.08) 45%, transparent 78%)",
                }}
              />
              <div
                className="relative w-full h-full"
                style={{
                  maskImage:
                    "linear-gradient(180deg, transparent 0%, #000 12%, #000 84%, transparent 100%)",
                  WebkitMaskImage:
                    "linear-gradient(180deg, transparent 0%, #000 12%, #000 84%, transparent 100%)",
                }}
              >
                <Img
                  src="/images/owl-cutout.png"
                  alt="Скульптура совы — символ точного взгляда аудитора"
                  fill
                  className="object-contain drop-shadow-[0_30px_60px_rgba(76,29,149,0.22)]"
                  style={{ transform: "scale(1.25)" }}
                />
              </div>
            </motion.div>

            {/* Chart card — top-right */}
            <motion.div
              initial={{ opacity: 0, x: 24, y: -8 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7 }}
              className="absolute top-2 right-0 lg:-right-4 w-[230px] bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-[0_12px_40px_-8px_rgba(76,29,149,0.2)] border border-white z-20"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-violet-100 flex items-center justify-center">
                    <TrendingUp className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                    Проверено
                  </span>
                </div>
                <span className="text-[10px] text-muted-foreground font-medium">
                  2025
                </span>
              </div>
              <svg
                viewBox="0 0 200 60"
                className="w-full h-11"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#5B21B6" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#5B21B6" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d="M0,48 L25,40 L50,44 L75,28 L100,34 L125,18 L150,22 L175,10 L200,6 L200,60 L0,60 Z"
                  fill="url(#chartFill)"
                />
                <path
                  d="M0,48 L25,40 L50,44 L75,28 L100,34 L125,18 L150,22 L175,10 L200,6"
                  fill="none"
                  stroke="#5B21B6"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="200" cy="6" r="3.5" fill="#5B21B6" />
                <circle cx="200" cy="6" r="7" fill="#5B21B6" opacity="0.2" />
              </svg>
              <div className="flex items-end justify-between mt-2.5">
                <div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl font-heading font-semibold">
                      147
                    </span>
                    <span className="text-[11px] font-semibold text-green-600">
                      +24%
                    </span>
                  </div>
                  <span className="text-[10px] text-muted-foreground">
                    аудитов сдано
                  </span>
                </div>
              </div>
            </motion.div>

            {/* 30+ years micro-badge — middle left */}
            <motion.div
              initial={{ opacity: 0, x: -12, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.7, delay: 1.2 }}
              className="hidden lg:block absolute top-[42%] left-0 bg-white/95 backdrop-blur-sm rounded-2xl px-5 py-3.5 shadow-[0_12px_40px_-8px_rgba(76,29,149,0.18)] border border-white z-20"
            >
              <div className="text-2xl font-heading font-semibold text-primary leading-none">
                <CountUp target={30} suffix="+" />
              </div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-[0.12em] mt-1.5 font-semibold">
                лет опыта
              </div>
            </motion.div>

            {/* Clients stats card — bottom-right, clickable */}
            <motion.a
              href="#clients"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, delay: 1 }}
              className="absolute bottom-2 right-0 lg:right-4 w-[210px] bg-[#16162B] rounded-2xl p-5 shadow-[0_16px_48px_-10px_rgba(22,22,43,0.45)] z-20 overflow-hidden hover:scale-[1.03] transition-transform cursor-pointer"
            >
              <div
                aria-hidden
                className="absolute inset-0 opacity-55 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(90% 60% at 0% 0%, rgba(91,33,182,0.5), transparent)",
                }}
              />
              <div className="relative">
                <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/50 mb-2">
                  Клиенты
                </div>
                <div className="text-4xl font-heading font-semibold text-white leading-none">
                  <CountUp target={500} suffix="+" />
                </div>
                <div className="text-[11px] text-white/60 mt-1.5">
                  довольных компаний
                </div>
                <div className="flex -space-x-2 mt-4">
                  {[
                    "from-violet-300 to-violet-500",
                    "from-fuchsia-300 to-violet-400",
                    "from-violet-200 to-violet-400",
                  ].map((grad, i) => (
                    <div
                      key={i}
                      className={`w-7 h-7 rounded-full border-2 border-[#16162B] bg-gradient-to-br ${grad}`}
                    />
                  ))}
                  <div className="w-7 h-7 rounded-full border-2 border-[#16162B] bg-white/15 backdrop-blur-sm flex items-center justify-center text-[9px] font-semibold text-white">
                    +497
                  </div>
                </div>
              </div>
            </motion.a>
          </div>
        </div>

        {/* Social / contact strip */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="mt-8 flex items-center justify-center gap-2.5 relative z-20"
        >
          <a
            href="#"
            aria-label="Telegram"
            className="w-10 h-10 rounded-full bg-white/70 hover:bg-white border border-[#16162B]/10 hover:border-primary/40 backdrop-blur-sm flex items-center justify-center text-foreground hover:text-primary transition-all"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
              <path d="M9.04 15.67l-.36 5.05c.51 0 .73-.22.99-.48l2.38-2.27 4.93 3.6c.9.5 1.55.24 1.79-.83l3.25-15.22h.01c.29-1.35-.49-1.88-1.37-1.55L2.07 9.88c-1.32.5-1.3 1.23-.22 1.56l4.85 1.51 11.26-7.1c.53-.32 1.02-.15.62.2L9.04 15.67z" />
            </svg>
          </a>
          <a
            href="#"
            aria-label="WhatsApp"
            className="w-10 h-10 rounded-full bg-white/70 hover:bg-white border border-[#16162B]/10 hover:border-primary/40 backdrop-blur-sm flex items-center justify-center text-foreground hover:text-primary transition-all"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
              <path d="M17.47 14.38c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.48-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.79.37-.27.3-1.04 1.01-1.04 2.47 0 1.46 1.06 2.87 1.21 3.07.15.2 2.09 3.19 5.07 4.48.71.3 1.26.49 1.69.63.71.23 1.35.19 1.86.12.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35M12.04 21.5c-1.69 0-3.34-.45-4.78-1.3l-.34-.2-3.55.93.95-3.46-.22-.36c-.94-1.49-1.43-3.21-1.43-4.98 0-5.16 4.2-9.36 9.37-9.36 2.5 0 4.85.98 6.62 2.75 1.77 1.77 2.74 4.12 2.74 6.62 0 5.16-4.2 9.36-9.36 9.36m7.95-17.31C17.9 2.1 15.08 1 12.04 1 5.73 1 .61 6.12.61 12.42c0 2.02.53 3.99 1.53 5.73L.52 24l6.01-1.58c1.68.92 3.57 1.4 5.5 1.4h.01c6.3 0 11.43-5.12 11.43-11.43 0-3.05-1.19-5.92-3.35-8.08" />
            </svg>
          </a>
          <a
            href="tel:+79011841190"
            className="ml-2 inline-flex items-center gap-2 px-4 h-10 rounded-full bg-white/70 hover:bg-white border border-[#16162B]/10 hover:border-primary/40 backdrop-blur-sm text-[13px] font-medium text-foreground hover:text-primary transition-all"
          >
            <Phone className="w-3.5 h-3.5" />
            +7 (901) 184-11-90
          </a>
        </motion.div>
      </div>
    </section>
  );
}
