"use client";

import { motion } from "framer-motion";
import { Check, Phone, ArrowRight, ShieldCheck } from "lucide-react";
import { Img } from "@/components/img";
import type { Landing } from "@/lib/landings";

export function LandingHero({ hero }: { hero: Landing["hero"] }) {
  return (
    <section className="relative overflow-hidden bg-white pt-28 pb-16 sm:pt-32 sm:pb-20">
      {/* мягкая подсветка фона */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -right-24 w-[520px] h-[520px] rounded-full bg-violet-100/50 blur-3xl"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-[1fr_360px] gap-10 lg:gap-14 items-center">
          {/* Текст */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-violet-50 border border-violet-100 px-4 py-1.5 text-xs font-medium text-violet-800 mb-6">
              <ShieldCheck className="w-3.5 h-3.5" />
              {hero.eyebrow}
            </div>

            <h1 className="font-heading text-3xl sm:text-4xl lg:text-[52px] font-semibold leading-[1.08] mb-5 text-balance">
              {hero.title}{" "}
              <span className="text-primary">{hero.titleAccent}</span>
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed mb-7">
              {hero.lead}
            </p>

            <ul className="space-y-3 mb-9">
              {hero.points.map((p) => (
                <li key={p} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-violet-100 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <span className="text-[15px] sm:text-base leading-snug">
                    {p}
                  </span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="#contact"
                className="group inline-flex items-center justify-center gap-2 rounded-xl h-14 px-8 gradient-violet text-white font-semibold text-base shadow-lg shadow-violet-500/25 transition-opacity hover:opacity-90"
              >
                Получить консультацию
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="tel:+79011841190"
                className="inline-flex items-center justify-center gap-2 rounded-xl h-14 px-8 bg-white border border-gray-300 hover:border-primary hover:bg-violet-50 font-medium text-base transition-all"
              >
                <Phone className="w-4 h-4 text-primary" />
                +7 (901) 184-11-90
              </a>
            </div>
          </motion.div>

          {/* Сова — символ точного взгляда аудитора */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:block relative"
          >
            {/* Фиолетовое свечение за совой */}
            <div
              aria-hidden
              className="absolute inset-0 -m-16 rounded-full blur-3xl opacity-70 pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle, rgba(167,139,250,0.4) 0%, rgba(196,181,253,0.15) 45%, transparent 72%)",
              }}
            />

            <div
              className="relative w-full h-[420px]"
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
              />
            </div>

            {/* Цифры под совой */}
            <div className="relative grid grid-cols-3 gap-2 mt-2">
              {[
                { v: "30+", l: "лет опыта" },
                { v: "500+", l: "проверок" },
                { v: "СРО", l: "ААС" },
              ].map((s) => (
                <div key={s.l} className="text-center">
                  <div className="font-heading text-2xl font-semibold text-primary">
                    {s.v}
                  </div>
                  <div className="text-[11px] text-muted-foreground leading-tight mt-0.5">
                    {s.l}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
