"use client";

import { motion } from "framer-motion";
import { Award, Shield, Scale, BookOpen, Building2, Globe } from "lucide-react";
import { Img } from "@/components/img";

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
    <section id="team" className="py-20 sm:py-28 bg-white relative overflow-hidden">
      {/* Subtle background texture */}
      <div className="absolute inset-0 opacity-30">
        <Img
          src="/images/texture-bg.jpg"
          alt=""
          fill
          className="object-cover"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <h2 className="font-heading text-4xl sm:text-5xl font-semibold max-w-3xl">
            25+ лет аудиторской практики. 500+ проверок. Руководитель лично
            контролирует каждый проект.
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="rounded-2xl overflow-hidden bg-white border border-gray-200 shadow-sm">
              <div className="relative w-full aspect-[4/5]">
                <Img
                  src="/images/oleynikova-v2.jpg"
                  alt="Наталья Олейникова"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <div className="text-xl font-bold">Наталья Олейникова</div>
                <div className="text-sm text-muted-foreground mt-1.5">
                  Генеральный директор · Аттестованный аудитор · Судебный эксперт
                </div>
              </div>
            </div>
          </motion.div>

          {/* Credentials + quote */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3 space-y-8"
          >
            <blockquote className="text-lg leading-relaxed text-muted-foreground border-l-4 border-primary pl-6">
              «За 25 лет мы провели более 500 аудитов — от небольших ООО до
              холдингов с консолидированной отчётностью. Производство, торговля,
              строительство, транспорт, медиа, медицина — знаем отраслевую
              специфику учёта. Я лично контролирую каждый проект. Для меня
              важно, чтобы управленческое письмо содержало конкретные
              рекомендации по учёту, а не шаблонные формулировки.»
            </blockquote>

            <div className="grid sm:grid-cols-2 gap-3">
              {credentials.map((cred) => (
                <div
                  key={cred.text}
                  className="flex items-start gap-3 p-3 rounded-xl bg-white/80 glass-border"
                >
                  <cred.icon className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  <span className="text-sm">{cred.text}</span>
                </div>
              ))}
            </div>

            <div>
              <h3 className="font-semibold mb-4">
                Отрасли, в которых проводили аудит:
              </h3>
              <div className="flex flex-wrap gap-2">
                {industries.map((ind) => (
                  <span
                    key={ind}
                    className="px-4 py-2 rounded-full bg-violet-50 text-sm text-violet-700 border border-violet-100"
                  >
                    {ind}
                  </span>
                ))}
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}
