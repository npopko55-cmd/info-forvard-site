"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, CheckCircle2 } from "lucide-react";

const serviceOptions = [
  "Обязательный аудит БФО",
  "Налоговый аудит",
  "Инициативный аудит",
  "Due Diligence",
  "Судебная экспертиза",
  "Консультация аудитора",
  "Другое",
];

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [comment, setComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-20 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">
              Оставьте заявку — перезвоним за 15 минут
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Консультация аудитора бесплатная. Без обязательств.
            </p>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rounded-3xl gradient-violet p-8 sm:p-12 text-white text-center"
              >
                <CheckCircle2 className="w-16 h-16 mx-auto mb-4 text-white/80" />
                <h3 className="text-2xl font-bold mb-2">Заявка принята</h3>
                <p className="text-white/80">
                  Перезвоним в течение 15 минут в рабочее время.
                </p>
                <p className="text-white/60 mt-4 text-sm">
                  Если срочно — звоните:{" "}
                  <a href="tel:+79011841190" className="text-white underline">
                    +7 (901) 184-11-90
                  </a>
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <input
                    type="text"
                    placeholder="Имя *"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full h-14 px-5 rounded-2xl bg-gray-50 border border-border focus:border-primary focus:ring-2 focus:ring-violet-200 outline-none transition-all text-base"
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    placeholder="+7 (___) ___-__-__"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full h-14 px-5 rounded-2xl bg-gray-50 border border-border focus:border-primary focus:ring-2 focus:ring-violet-200 outline-none transition-all text-base"
                  />
                </div>
                <div>
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full h-14 px-5 rounded-2xl bg-gray-50 border border-border focus:border-primary focus:ring-2 focus:ring-violet-200 outline-none transition-all text-base appearance-none text-muted-foreground"
                  >
                    <option value="">Какая услуга интересует?</option>
                    {serviceOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <textarea
                    placeholder="Комментарий (необязательно)"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows={3}
                    className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-border focus:border-primary focus:ring-2 focus:ring-violet-200 outline-none transition-all text-base resize-none"
                  />
                </div>
                <label className="flex items-start gap-3 text-sm text-muted-foreground cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    className="mt-1 accent-primary"
                  />
                  Согласен на обработку персональных данных
                </label>
                <button
                  type="submit"
                  className="w-full rounded-full h-14 text-base gradient-violet text-white shadow-lg shadow-violet-500/25 font-medium transition-opacity hover:opacity-90"
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
            transition={{ delay: 0.2 }}
            className="space-y-8 lg:pt-16"
          >
            <div className="space-y-6">
              <a
                href="tel:+79011841190"
                className="flex items-center gap-4 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-violet-100 flex items-center justify-center group-hover:bg-violet-200 transition-colors">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Телефон</div>
                  <div className="text-lg font-semibold">
                    +7 (901) 184-11-90
                  </div>
                </div>
              </a>

              <a
                href="mailto:info@iforvard.ru"
                className="flex items-center gap-4 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-violet-100 flex items-center justify-center group-hover:bg-violet-200 transition-colors">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Email</div>
                  <div className="text-lg font-semibold">info@iforvard.ru</div>
                </div>
              </a>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-violet-100 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Адрес</div>
                  <div className="font-semibold">
                    Москва, ул. Ленинская Слобода, 26
                  </div>
                  <div className="text-sm text-muted-foreground">
                    БЦ ОМЕГА-2, помещ. 37/52
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-violet-100 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">
                    Время работы
                  </div>
                  <div className="font-semibold">Пн — Пт: 9:00 — 18:00</div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl p-6 gradient-violet-soft">
              <p className="text-sm text-muted-foreground">
                Перезвоним в течение 15 минут в рабочее время. Если заявка
                оставлена вечером или в выходной — свяжемся в начале следующего
                рабочего дня.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
