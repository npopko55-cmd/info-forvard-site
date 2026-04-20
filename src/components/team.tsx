"use client";

import { motion } from "framer-motion";
import { Award, Shield, Scale, BookOpen, Building2, Globe } from "lucide-react";
import { Img } from "@/components/img";
import { CtaStrip } from "@/components/ui/cta-strip";

const credentials = [
  { icon: Award, text: "Аттестат по общему аудиту № 042698" },
  { icon: Shield, text: "Член СРО ААС (ОРНЗ №22006157804)" },
  { icon: Scale, text: "Судебный эксперт по финансово-экономической экспертизе" },
  { icon: Building2, text: "Налоговый эксперт при Московской городской думе" },
  { icon: BookOpen, text: "Лектор Актион-Пресс, спикер круглых столов ТПП" },
  { icon: Globe, text: "Отчётность по РСБУ и МСФО. Аудит по ОСН и спецрежимам" },
];

const industries = [
  "Производство",
  "Торговля",
  "Строительство и девелопмент",
  "Транспорт и логистика",
  "Медиа и IT",
  "Связь и IP-телефония",
  "Медицина",
  "Энергоснабжение",
  "НКО",
  "Компании с иностранным капиталом",
];

export function Team() {
  return (
    <section
      id="team"
      className="py-16 sm:py-20 bg-white relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 max-w-3xl"
        >
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold mb-3 leading-[1.1]">
            Главный аудитор, который отвечает за результат каждой проверки
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground">
            30+ лет опыта · 500+ проверок · каждый проект ведёт лично
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[320px_1fr] gap-6 lg:gap-10 items-start">
          {/* Photo card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="rounded-2xl overflow-hidden bg-white border border-gray-200 shadow-premium">
              <div className="relative w-full aspect-[4/5]">
                <Img
                  src="/images/oleynikova-v2.jpg"
                  alt="Наталья Олейникова"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-5">
                <div className="text-lg font-semibold leading-tight">
                  Наталья Олейникова
                </div>
                <div className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                  Генеральный директор · Аттестованный аудитор · Судебный
                  эксперт
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right side: quote + credentials + industries */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="space-y-7"
          >
            <blockquote className="font-heading text-lg sm:text-xl leading-[1.5] text-foreground border-l-2 border-primary pl-5">
              «За 30+ лет мы провели более 500 аудитов — от ООО до холдингов с
              консолидированной отчётностью. Знаем отраслевую специфику учёта.
              Я лично веду каждый проект и отвечаю за содержательность
              итогового отчёта.»
            </blockquote>

            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground mb-3">
                Квалификация и членства
              </div>
              <div className="grid sm:grid-cols-2 gap-2.5">
                {credentials.map((cred) => (
                  <div
                    key={cred.text}
                    className="flex items-start gap-3 p-3.5 rounded-xl bg-gray-50 border border-gray-100"
                  >
                    <div className="w-7 h-7 rounded-lg bg-violet-100 flex items-center justify-center shrink-0">
                      <cred.icon className="w-3.5 h-3.5 text-primary" />
                    </div>
                    <span className="text-[13px] leading-snug">
                      {cred.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground mb-3">
                Отрасли, в которых проводили аудит
              </div>
              <div className="flex flex-wrap gap-1.5">
                {industries.map((ind) => (
                  <span
                    key={ind}
                    className="px-3.5 py-1.5 rounded-full bg-violet-50 text-xs text-violet-800 border border-violet-100 font-medium"
                  >
                    {ind}
                  </span>
                ))}
              </div>
            </div>

            <CtaStrip variant="auditor" className="pt-2" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
