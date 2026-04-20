"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, CheckCircle2, Send } from "lucide-react";

const revenueOptions = ["до 400 млн", "до 800 млн", "до 2 млрд", "2+ млрд"];
const accountingOptions = ["1–2", "3–4", "5 и более"];
const serviceOptions = [
  "Обратный звонок / обсудить задачу",
  "Обязательный аудит БФО",
  "Налоговый аудит",
  "Инициативный аудит",
  "Due Diligence",
  "Судебная экспертиза и форензик",
  "Обзорная проверка отчётности",
  "Трансформация РСБУ → МСФО",
  "Восстановление учёта",
  "Аутсорсинг главного бухгалтера",
  "Консультации и сопровождение",
  "Другое / уточню на консультации",
];

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [revenue, setRevenue] = useState(revenueOptions[1]);
  const [accounting, setAccounting] = useState(accountingOptions[0]);
  const [service, setService] = useState(serviceOptions[0]);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [telegram, setTelegram] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

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
            Перезвоним за 15 минут
          </h2>
          <p className="text-lg text-muted-foreground">
            Оставьте заявку — обсудим вашу задачу на бесплатной консультации и
            договоримся о следующем шаге. Без обязательств.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_400px] gap-6">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-5 sm:p-8 lg:p-10 border border-gray-100 shadow-sm"
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

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rounded-2xl gradient-violet p-8 sm:p-12 text-white text-center"
              >
                <CheckCircle2 className="w-14 h-14 mx-auto mb-4 text-white/90" />
                <h3 className="text-2xl font-bold mb-2">Заявка принята</h3>
                <p className="text-white/85">
                  Перезвоним в течение 15 минут в рабочее время и обсудим вашу
                  задачу. Если срочно —{" "}
                  <a href="tel:+79011841190" className="underline">
                    +7 (901) 184-11-90
                  </a>
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Service type */}
                <div>
                  <label className="block text-sm font-medium mb-3">
                    С какой задачей обратиться?
                  </label>
                  <div className="relative">
                    <select
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className="w-full h-12 px-4 pr-10 rounded-xl bg-gray-50 border border-gray-200 focus:border-primary focus:ring-2 focus:ring-violet-100 outline-none transition-all text-base appearance-none cursor-pointer"
                    >
                      {serviceOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path
                          d="M3.5 5.25L7 8.75L10.5 5.25"
                          stroke="currentColor"
                          strokeWidth="1.75"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Revenue */}
                <div>
                  <label className="block text-sm font-medium mb-3">
                    Выручка, руб./год
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {revenueOptions.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setRevenue(opt)}
                        className={`px-5 h-11 rounded-xl text-sm font-medium transition-all ${
                          revenue === opt
                            ? "gradient-violet text-white shadow-md shadow-violet-500/20"
                            : "bg-gray-50 text-foreground hover:bg-gray-100 border border-gray-200"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Accounting team */}
                <div>
                  <label className="block text-sm font-medium mb-3">
                    Бухгалтерия, чел.
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {accountingOptions.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setAccounting(opt)}
                        className={`px-5 h-11 rounded-xl text-sm font-medium transition-all ${
                          accounting === opt
                            ? "gradient-violet text-white shadow-md shadow-violet-500/20"
                            : "bg-gray-50 text-foreground hover:bg-gray-100 border border-gray-200"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Contacts */}
                <div>
                  <label className="block text-sm font-medium mb-3">
                    Контакты
                  </label>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <input
                      type="tel"
                      placeholder="+7"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="h-12 px-4 rounded-xl bg-gray-50 border border-gray-200 focus:border-primary focus:ring-2 focus:ring-violet-100 outline-none transition-all text-base"
                    />
                    <input
                      type="email"
                      placeholder="Электронная почта"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-12 px-4 rounded-xl bg-gray-50 border border-gray-200 focus:border-primary focus:ring-2 focus:ring-violet-100 outline-none transition-all text-base"
                    />
                  </div>
                </div>

                <label className="flex items-center gap-2.5 text-sm cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={telegram}
                    onChange={(e) => setTelegram(e.target.checked)}
                    className="w-4 h-4 accent-primary"
                  />
                  <Send className="w-4 h-4 text-primary" />
                  Связаться со мной в Telegram
                </label>

                <label className="flex items-start gap-2.5 text-xs text-muted-foreground cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    className="mt-0.5 w-4 h-4 accent-primary"
                  />
                  <span>
                    Я согласен на обработку персональных данных и ознакомлен с
                    политикой в отношении обработки персональных данных
                  </span>
                </label>

                <button
                  type="submit"
                  className="w-full rounded-xl h-14 text-base gradient-violet text-white shadow-lg shadow-violet-500/25 font-semibold transition-opacity hover:opacity-90"
                >
                  Отправить заявку
                </button>
              </form>
            )}
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
    </section>
  );
}
