"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Quote, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { MagicBento } from "@/components/ui/magic-bento";
import { withBase } from "@/lib/prefix";

const stats = [
  {
    label: "Опыт",
    value: "30+ лет",
    description: "опыта у главного аудитора практики",
  },
  {
    label: "Проверки",
    value: "500+",
    description: "аудиторских проверок за карьеру",
  },
  {
    label: "Отрасли",
    value: "50+",
    description: "от производства до IT — знаем специфику",
  },
  {
    label: "Срок",
    value: "под задачу",
    description: "подбираем индивидуально под отчётную дату и фиксируем в договоре",
  },
];

const reviews = [
  {
    text:
      "«Команда ИНФО-ФОРВАРД проявила исключительную оперативность. Все этапы проверки проводились с максимальной тщательностью. Были выявлены не только потенциальные риски, но и предложены конструктивные пути их решения. Рекомендуем их услуги всем компаниям, которые ценят качество, скорость и надежность.»",
    name: "К. Ю. Рябцев",
    role: "Управляющий ТСЖ «Покровское-Глебово»",
    pdf: "/review-tsj-glebovo.pdf",
  },
  {
    text:
      "«Выражаем благодарность за качественную и профессиональную оценку налоговых и бухгалтерских рисков. Высокая компетентность, внимание к деталям, глубокое понимание актуальных требований законодательства. Полученные рекомендации оказались практичными и уже помогли оптимизировать процессы учёта и налогообложения.»",
    name: "В. А. Иванов",
    role: "Генеральный директор ООО «Мир Весов»",
    pdf: "/review-mir-vesov.pdf",
  },
  {
    text:
      "«Выражаем благодарность команде аудиторов за профессиональное и качественное проведение проверки бухгалтерской отчётности. Высокая компетентность, внимательность к деталям и глубокое понимание специфики нашей деятельности. Отдельно отмечаем доброжелательное отношение и готовность консультировать. Рекомендуем «Инфо Форвард» как надёжного и профессионального партнёра.»",
    name: "С. В. Бодунов",
    role: "Генеральный директор АО «АРМАДА»",
    pdf: "/review-armada.pdf",
  },
  {
    text:
      "«Выражаем искреннюю благодарность за высокий профессионализм, ответственный подход и внимательное отношение к деталям при проведении аудиторской проверки за 2025 год. Отмечаем чёткую организацию процесса, оперативное предоставление разъяснений и развёрнутые рекомендации. Считаем сотрудничество исключительно положительным и рекомендуем вас как надёжного и компетентного партнёра.»",
    name: "Е. О. Альховка",
    role: "Генеральный директор АО «Эстейт менеджмент»",
    pdf: "/review-estate-management.pdf",
  },
  {
    text:
      "«Выражаем искреннюю благодарность и признательность за высокий профессионализм и компетентность при проведении аудиторской проверки бухгалтерской отчётности за 2025 год. Работа выполнена профессионально, в полном объёме и в установленные сроки. Все вопросы решались оперативно, а взаимодействие с командой оставило только положительные впечатления. Рекомендуем вашу компанию как надёжного партнёра.»",
    name: "К. Н. Колунова",
    role: "Главный бухгалтер ООО «Колибри»",
    pdf: "/review-kolibri.pdf",
  },
  {
    text:
      "«Благодарим за качественную аудиторскую проверку бухгалтерской отчётности. Отмечаем высокий уровень коммуникации: взаимодействие с аудитором проходило легко и конструктивно. Специалисты не просто указывали на ошибки, а предлагали практические решения для их устранения. Весь процесс был чётко структурирован и прошёл максимально эффективно и комфортно для всей бухгалтерской службы.»",
    name: "М. И. Савченков",
    role: "Генеральный директор ООО «Курский Битумный Терминал»",
    pdf: "/review-kbt.pdf",
  },
  {
    text:
      "«Выражаем искреннюю благодарность за профессиональный подход к проведению аудиторской проверки за 2025 год. Аудиторы проявили глубокое знание законодательства и специфики нашей отрасли. Особенно ценно, что проверка не ограничилась подтверждением цифр: мы получили исчерпывающие рекомендации по оптимизации внутренних процессов и минимизации налоговых рисков. Работа выполнена точно в срок. Рекомендуем как надёжных и компетентных партнёров.»",
    name: "Ю. Е. Лукьянов",
    role: "Генеральный директор ООО «Сервистерминалгрупп»",
    pdf: "/review-stg.pdf",
  }
];

function plural(n: number) {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return "отзыв";
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return "отзыва";
  return "отзывов";
}

export function ForDirector() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [active, setActive] = useState(0);

  const update = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setAtStart(scrollLeft < 8);
    setAtEnd(scrollLeft + clientWidth >= scrollWidth - 8);
    const card = el.firstElementChild as HTMLElement | null;
    if (card) {
      const step = card.offsetWidth + 20;
      setActive(Math.min(reviews.length - 1, Math.round(scrollLeft / step)));
    }
  }, []);

  useEffect(() => {
    update();
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  const scrollBy = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    const step = card ? card.offsetWidth + 20 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <section className="py-20 sm:py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto mb-10 text-center"
        >
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold mb-4 leading-[1.1]">
            Команда ИНФО-ФОРВАРД в цифрах
          </h2>
          <p className="text-lg text-muted-foreground">
            Четыре факта, на которые стоит обратить внимание перед выбором
            аудитора.
          </p>
        </motion.div>

        {/* Stats */}
        <MagicBento items={stats} />
      </div>

      {/* Testimonials — горизонтальная лента */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-16"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-5">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              Отзывы клиентов говорят сами за себя
            </div>
            <span className="shrink-0 rounded-full bg-violet-100 border border-violet-200 px-3 py-1 text-xs font-semibold text-violet-800 tabular-nums">
              {reviews.length} {plural(reviews.length)}
            </span>
            <div className="h-px flex-1 bg-gray-300" />

            <div className="hidden sm:flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => scrollBy(-1)}
                disabled={atStart}
                aria-label="Предыдущий отзыв"
                className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-foreground transition-all hover:border-primary hover:text-primary disabled:opacity-35 disabled:hover:border-gray-200 disabled:hover:text-foreground disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => scrollBy(1)}
                disabled={atEnd}
                aria-label="Следующий отзыв"
                className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-foreground transition-all hover:border-primary hover:text-primary disabled:opacity-35 disabled:hover:border-gray-200 disabled:hover:text-foreground disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Лента */}
        <div className="relative">
          {/* затемнение по краям — подсказка, что лента продолжается */}
          <div
            aria-hidden
            className={`pointer-events-none absolute inset-y-0 left-0 w-10 sm:w-16 z-10 bg-gradient-to-r from-gray-50 to-transparent transition-opacity duration-300 ${
              atStart ? "opacity-0" : "opacity-100"
            }`}
          />
          <div
            aria-hidden
            className={`pointer-events-none absolute inset-y-0 right-0 w-10 sm:w-16 z-10 bg-gradient-to-l from-gray-50 to-transparent transition-opacity duration-300 ${
              atEnd ? "opacity-0" : "opacity-100"
            }`}
          />

          <div
            ref={trackRef}
            className="flex gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            style={{
              paddingInline: "max(1rem, calc((100vw - 72rem) / 2 + 1rem))",
            }}
          >
            {reviews.map((r) => (
              <div
                key={r.pdf}
                className="snap-start shrink-0 w-[290px] sm:w-[380px] relative rounded-3xl bg-white border border-violet-100 shadow-premium p-7 sm:p-8 flex flex-col"
              >
                <Quote className="absolute -top-4 left-7 w-10 h-10 text-primary bg-gray-50 p-1.5 rounded-full border border-violet-100" />
                <p className="text-[15px] leading-relaxed text-foreground flex-1">
                  {r.text}
                </p>
                <div className="mt-5 pt-5 border-t border-gray-100 flex flex-col gap-3">
                  <div>
                    <div className="font-semibold text-sm">{r.name}</div>
                    <div className="text-sm text-muted-foreground leading-snug">
                      {r.role}
                    </div>
                  </div>
                  <a
                    href={withBase(r.pdf)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/link inline-flex items-center gap-1.5 text-sm font-medium text-primary self-start whitespace-nowrap"
                  >
                    Читать полный отзыв
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Индикатор позиции */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-5 flex items-center gap-3">
          <div className="flex gap-1.5">
            {reviews.map((r, i) => (
              <span
                key={r.pdf}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === active ? "w-6 bg-primary" : "w-1.5 bg-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">
            Листайте, чтобы посмотреть остальные
          </span>
        </div>
      </motion.div>
    </section>
  );
}
