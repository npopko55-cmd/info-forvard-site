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
  { icon: Globe, text: "Отчётность по РСБУ и МСФО. Аудит по ОСН, УСН, ЕНВД" },
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
      className="py-20 sm:py-28 bg-white relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14 max-w-3xl"
        >
          <h2 className="font-heading text-4xl sm:text-5xl font-semibold mb-4 leading-[1.1]">
            Главный аудитор, который отвечает за результат каждой проверки
          </h2>
          <p className="text-lg text-muted-foreground">
            30+ лет опыта · 500+ проверок за карьеру · каждый проект ведёт лично
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Photo card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-4"
          >
            <div className="rounded-2xl overflow-hidden bg-white border border-gray-200 shadow-premium sticky top-24">
              <div className="relative w-full aspect-[4/5]">
                <Img
                  src="/images/oleynikova-v2.jpg"
                  alt="Наталья Олейникова"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <div className="text-xl font-semibold">Наталья Олейникова</div>
                <div className="text-sm text-muted-foreground mt-1.5 leading-relaxed">
                  Генеральный директор · Аттестованный аудитор · Судебный эксперт
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
            className="lg:col-span-8 space-y-10"
          >
            <blockquote className="font-heading text-xl sm:text-2xl leading-[1.5] text-foreground border-l-2 border-primary pl-6">
              «За 30+ лет мы провели более 500 аудитов — от небольших ООО до
              холдингов с консолидированной отчётностью. Производство, торговля,
              строительство, транспорт, медиа, медицина — знаем отраслевую
              специфику учёта. Я лично веду каждый проект и отвечаю за
              содержательность управленческого письма.»
            </blockquote>

            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.12em] text-muted-foreground mb-4">
                Квалификация и членства
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                {credentials.map((cred) => (
                  <div
                    key={cred.text}
                    className="flex items-start gap-3 p-4 rounded-xl bg-white border border-gray-200"
                  >
                    <div className="w-8 h-8 rounded-lg bg-violet-50 flex items-center justify-center shrink-0">
                      <cred.icon className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-sm leading-relaxed">
                      {cred.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.12em] text-muted-foreground mb-4">
                Отрасли, в которых проводили аудит
              </div>
              <div className="flex flex-wrap gap-2">
                {industries.map((ind) => (
                  <span
                    key={ind}
                    className="px-4 py-2 rounded-full bg-violet-50 text-sm text-violet-800 border border-violet-100"
                  >
                    {ind}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <CtaStrip className="mt-16" />
      </div>
    </section>
  );
}
