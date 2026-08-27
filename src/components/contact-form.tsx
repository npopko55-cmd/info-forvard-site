"use client";

import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, Check, X } from "lucide-react";
import { ymGoal } from "@/lib/metrika";
import { LEAD_FORM_EVENT } from "@/lib/lead-form";

// Форма заявок — Яндекс Формы (РФ, данные хранятся в Яндексе). Открывается в модальном окне.
const YANDEX_FORM_ID = "6a8d946002848fe6ed2fa42d";

const defaultBenefits = [
  "Бесплатная консультация — обсудим задачу и сроки",
  "Перезвоним за 15 минут в рабочее время",
  "Без обязательств",
];

export function ContactForm({
  source,
  heading = "Перезвоним за 15 минут",
  lead = "Оставьте заявку — обсудим вашу задачу на бесплатной консультации и договоримся о следующем шаге. Без обязательств.",
  benefits = defaultBenefits,
}: {
  /** Метка лендинга: попадает в Метрику и в адрес формы */
  source?: string;
  heading?: string;
  lead?: string;
  benefits?: string[];
}) {
  const [open, setOpen] = useState(false);

  const formSrc =
    `https://forms.yandex.ru/u/${YANDEX_FORM_ID}?iframe=1` +
    (source ? `&source=${encodeURIComponent(source)}` : "");

  // Скрипт авто-ресайза формы Яндекса (подтягиваем при первом открытии)
  useEffect(() => {
    if (!open) return;
    const id = "ya-forms-embed";
    if (!document.getElementById(id)) {
      const s = document.createElement("script");
      s.id = id;
      s.src = "https://forms.yandex.ru/_static/embed.js";
      s.async = true;
      document.body.appendChild(s);
    }
  }, [open]);

  // Закрытие по Esc + блокировка прокрутки фона, пока окно открыто
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const openForm = useCallback(() => {
    ymGoal("form_open", source ? { landing: source } : undefined);
    setOpen(true);
  }, [source]);

  // Форму можно открыть любой кнопкой на странице
  useEffect(() => {
    const onOpen = () => openForm();
    window.addEventListener(LEAD_FORM_EVENT, onOpen);
    return () => window.removeEventListener(LEAD_FORM_EVENT, onOpen);
  }, [openForm]);

  return (
    <section id="contact" className="py-20 sm:py-28 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-10"
        >
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold mb-3 leading-[1.1]">
            {heading}
          </h2>
          <p className="text-lg text-muted-foreground">{lead}</p>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_400px] gap-6 items-stretch">
          {/* CTA card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-5 sm:p-8 lg:p-10 border border-gray-100 shadow-sm flex flex-col"
          >
            {/* Steps */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <div className="flex items-center gap-3 flex-1 p-3 rounded-xl bg-violet-50 border border-violet-100">
                <div className="w-7 h-7 rounded-full gradient-violet text-white flex items-center justify-center text-sm font-bold shrink-0">
                  1
                </div>
                <div className="text-sm font-medium">Заявка</div>
              </div>
              <div className="flex items-center gap-3 flex-1 p-3 rounded-xl bg-gray-50">
                <div className="w-7 h-7 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center text-sm font-bold shrink-0">
                  2
                </div>
                <div className="text-sm text-muted-foreground">
                  Перезвоним за 15 минут в рабочее время
                </div>
              </div>
            </div>

            <ul className="space-y-3 mb-8">
              {benefits.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-violet-50 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <span className="text-base text-foreground">{b}</span>
                </li>
              ))}
            </ul>

            <div className="mt-auto">
              <button
                type="button"
                onClick={openForm}
                className="w-full rounded-xl h-14 text-base gradient-violet text-white shadow-lg shadow-violet-500/25 font-semibold transition-opacity hover:opacity-90"
              >
                Оставить заявку
              </button>
              <p className="text-xs text-muted-foreground mt-3 text-center">
                Займёт меньше минуты — заполняется в один экран
              </p>
            </div>
          </motion.div>

          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm space-y-6"
          >
            <a href="tel:+79011841190" className="flex items-center gap-4 group">
              <div className="w-11 h-11 rounded-xl bg-violet-50 flex items-center justify-center">
                <Phone className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Телефон</div>
                <div className="text-base font-semibold">
                  +7 (901) 184-11-90
                </div>
              </div>
            </a>

            <a
              href="mailto:info@iforvard.ru"
              className="flex items-center gap-4 group"
            >
              <div className="w-11 h-11 rounded-xl bg-violet-50 flex items-center justify-center">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Email</div>
                <div className="text-base font-semibold">info@iforvard.ru</div>
              </div>
            </a>

            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-violet-50 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Адрес</div>
                <div className="text-sm font-semibold">
                  Москва, ул. Ленинская Слобода, 26
                </div>
                <div className="text-xs text-muted-foreground mt-0.5">
                  БЦ ОМЕГА-2, помещ. 37/52
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-violet-50 flex items-center justify-center">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Работаем</div>
                <div className="text-base font-semibold">Пн — Пт: 9:00 — 18:00</div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100">
              <p className="text-xs text-muted-foreground">
                Перезвоним за 15 минут в рабочее время. Заявка вечером или в
                выходной — ответим утром.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Модальное окно с формой Яндекса */}
      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-start sm:items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Форма заявки"
        >
          <div
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-[680px] my-6 sm:my-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Закрыть"
              className="absolute -top-3 -right-3 w-9 h-9 rounded-full bg-white shadow-md border border-gray-100 flex items-center justify-center text-foreground hover:bg-gray-50 transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="p-3 sm:p-5">
              <iframe
                src={formSrc}
                name={`ya-form-${YANDEX_FORM_ID}`}
                title="Форма заявки"
                className="w-full rounded-xl"
                style={{ width: "100%", minHeight: 620, border: 0 }}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
