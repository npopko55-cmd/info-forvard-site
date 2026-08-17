"use client";

import { motion } from "framer-motion";
import {
  Award,
  Shield,
  Scale,
  BookOpen,
  Building2,
  Globe,
  Briefcase,
  GraduationCap,
} from "lucide-react";
import { Img } from "@/components/img";
import { CtaStrip } from "@/components/ui/cta-strip";

const people = [
  {
    id: "oleynikova",
    name: "Наталья Олейникова",
    role: "Генеральный директор · Аттестованный аудитор · Судебный эксперт",
    photo: "/images/oleynikova-v2.jpg",
    credentials: [
      { icon: Award, text: "Аттестат по общему аудиту № 042698" },
      { icon: Shield, text: "Член СРО ААС · ОРНЗ 22006157804" },
      {
        icon: Scale,
        text: "Судебный эксперт по финансово-экономической экспертизе",
      },
      {
        icon: Building2,
        text: "Налоговый эксперт при Московской городской думе",
      },
      { icon: BookOpen, text: "Лектор Актион-Пресс, спикер круглых столов ТПП" },
      { icon: Globe, text: "Аудит по РСБУ. ОСН и специальные налоговые режимы" },
    ],
  },
  {
    id: "elokhov",
    name: "Константин Елохов",
    role: "Ведущий аудитор",
    photo: "/images/elokhov.jpg",
    credentials: [
      {
        icon: Award,
        text: "Аттестат Минфина РФ по общему аудиту — с 2003 года",
      },
      { icon: Shield, text: "Член СРО ААС · ОРНЗ 22006123457" },
      {
        icon: Briefcase,
        text: "20+ лет в аудите, 30+ лет в бухгалтерском и налоговом учёте",
      },
      {
        icon: GraduationCap,
        text: "Ежегодное повышение квалификации — 40 часов",
      },
      {
        icon: Globe,
        text: "Производство, строительство, транспорт, торговля, услуги, НКО · ОСН, ЕСН, ЕНВД",
      },
      {
        icon: Building2,
        text: "Проверял «Саратовнефтегаз», «Порт Кавказ», «Фактор-ТС», «Биокард Логистик» и другие",
      },
    ],
  },
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
            Аудиторы, которые лично ведут вашу проверку
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground">
            30+ лет опыта · 500+ проверок · аттестованные аудиторы, члены СРО ААС
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5 lg:gap-6">
          {people.map((person, i) => (
            <motion.div
              key={person.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl bg-white border border-gray-200 shadow-premium p-5 sm:p-6 flex flex-col gap-5"
            >
              <div className="flex items-center gap-4 sm:gap-5">
                <div className="relative w-[112px] sm:w-[132px] aspect-[3/4] shrink-0 rounded-xl overflow-hidden bg-gray-100">
                  <Img
                    src={person.photo}
                    alt={person.name}
                    fill
                    className="object-cover object-top"
                  />
                </div>
                <div>
                  <div className="font-heading text-xl sm:text-2xl font-semibold leading-tight">
                    {person.name}
                  </div>
                  <div className="text-xs sm:text-[13px] text-muted-foreground mt-2 leading-relaxed">
                    {person.role}
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                {person.credentials.map((cred) => (
                  <div
                    key={cred.text}
                    className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100"
                  >
                    <div className="w-7 h-7 rounded-lg bg-violet-100 flex items-center justify-center shrink-0">
                      <cred.icon className="w-3.5 h-3.5 text-primary" />
                    </div>
                    <span className="text-[13px] leading-snug">{cred.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="mt-10 space-y-7"
        >
          <blockquote className="font-heading text-lg sm:text-xl leading-[1.5] text-foreground border-l-2 border-primary pl-5">
            «За 30+ лет мы провели более 500 аудитов — от ООО до холдингов с
            консолидированной отчётностью. Знаем отраслевую специфику учёта.
            Я лично веду каждый проект и отвечаю за содержательность итогового
            отчёта.»
            <footer className="mt-3 text-sm font-sans font-normal text-muted-foreground not-italic">
              Наталья Олейникова, главный аудитор практики
            </footer>
          </blockquote>

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
    </section>
  );
}
