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
  },
  {
    text:
      "«Выражаем благодарность команде специалистов за профессиональную и качественную оценку налоговых и бухгалтерских рисков нашей организации. Проведён глубокий анализ, выявлены потенциальные риски и даны развёрнутые рекомендации по их устранению. Особенно ценим индивидуальный подход, внимание к деталям и готовность разъяснять сложные вопросы. Рекомендуем ООО «ИНФО ФОРВАРД» как надёжного и компетентного партнёра.»",
    name: "В. В. Чудаева",
    role: "Финансовый директор АО «Антал Таланты»",
    pdf: "/review-antal-talenty.pdf",
  },
  {
    text:
      "«Проводили аудит бухгалтерской отчётности за 2025 год. Работа выполнена качественно и в срок. Особенно хочется отметить объективность аудиторов — они не просто искали ошибки, а предложили реальные пути их исправления. Все замечания были оформлены в виде понятных рекомендаций, что позволило нам быстро устранить недочёты. Отдельное спасибо за терпение и внимание к деталям!»",
    name: "В. Г. Телятников",
    role: "Генеральный директор ООО «Антал Бизнес Решения»",
    pdf: "/review-antal-business.pdf",
  }
];

// Лента рендерится тремя копиями: пользователь всегда в средней,
// а выход за её границы компенсируется мгновенным сдвигом на ширину копии.
// Копии одинаковые, поэтому сдвиг незаметен — скролл выглядит бесконечным.
const COPIES = [0, 1, 2];

export function ForDirector() {
  const trackRef = useRef<HTMLDivElement>(null);
  const animatingRef = useRef(false);
  const [active, setActive] = useState(0);

  /** Ширина одной копии ленты в пикселях */
  const setWidth = useCallback(() => {
    const el = trackRef.current;
    if (!el) return 0;
    const first = el.children[0] as HTMLElement | undefined;
    const secondCopyStart = el.children[reviews.length] as HTMLElement | undefined;
    if (!first || !secondCopyStart) return 0;
    return secondCopyStart.offsetLeft - first.offsetLeft;
  }, []);

  /** Возвращает пользователя в среднюю копию, если он ушёл в крайние */
  const normalize = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const w = setWidth();
    if (!w) return;
    let shifted = false;
    if (el.scrollLeft < w * 0.5) {
      el.style.scrollBehavior = "auto";
      el.scrollLeft += w;
      shifted = true;
    } else if (el.scrollLeft > w * 1.5) {
      el.style.scrollBehavior = "auto";
      el.scrollLeft -= w;
      shifted = true;
    }
    if (shifted) {
      void el.offsetWidth; // применяем позицию до возврата плавности
      el.style.scrollBehavior = "";
    }
  }, [setWidth]);

  const onScroll = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    if (!animatingRef.current) normalize();

    const w = setWidth();
    const card = el.children[0] as HTMLElement | undefined;
    if (!w || !card) return;
    const step = w / reviews.length;
    const rel = ((el.scrollLeft - w) % w + w) % w;
    setActive(Math.round(rel / step) % reviews.length);
  }, [normalize, setWidth]);

  // Стартуем со средней копии
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const start = () => {
      const w = setWidth();
      if (!w) return;
      el.style.scrollBehavior = "auto";
      el.scrollLeft = w;
      void el.offsetWidth;
      el.style.scrollBehavior = "";
    };
    start();
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", start);
    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", start);
    };
  }, [onScroll, setWidth]);

  const scrollByCard = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    normalize(); // сдвигаем до анимации, чтобы её не прервать
    const w = setWidth();
    const step = w ? w / reviews.length : el.clientWidth * 0.8;
    animatingRef.current = true;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
    window.setTimeout(() => {
      animatingRef.current = false;
      normalize();
    }, 450);
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

      {/* Отзывы — бесконечная лента */}
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
            <div className="h-px flex-1 bg-gray-300" />

            <div className="hidden sm:flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => scrollByCard(-1)}
                aria-label="Предыдущий отзыв"
                className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-foreground transition-all hover:border-primary hover:text-primary"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => scrollByCard(1)}
                aria-label="Следующий отзыв"
                className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-foreground transition-all hover:border-primary hover:text-primary"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Лента */}
        <div className="relative">
          {/* Затемнение по краям — подсказка, что лента продолжается */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 w-10 sm:w-16 z-10 bg-gradient-to-r from-gray-50 to-transparent"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 w-10 sm:w-16 z-10 bg-gradient-to-l from-gray-50 to-transparent"
          />

          <div
            ref={trackRef}
            className="flex gap-5 overflow-x-auto pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            style={{
              paddingInline: "max(1rem, calc((100vw - 72rem) / 2 + 1rem))",
            }}
          >
            {COPIES.map((copy) =>
              reviews.map((r) => (
                <div
                  key={`${copy}-${r.pdf}`}
                  aria-hidden={copy !== 1}
                  className="shrink-0 w-[290px] sm:w-[380px] relative rounded-3xl bg-white border border-violet-100 shadow-premium p-7 sm:p-8 flex flex-col"
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
                      tabIndex={copy === 1 ? 0 : -1}
                      className="group/link inline-flex items-center gap-1.5 text-sm font-medium text-primary self-start whitespace-nowrap"
                    >
                      Читать полный отзыв
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                    </a>
                  </div>
                </div>
              ))
            )}
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
            Листайте — отзывы идут по кругу
          </span>
        </div>
      </motion.div>
    </section>
  );
}
