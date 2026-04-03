"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqItems = [
  {
    q: "Кому нужен обязательный аудит?",
    a: "Акционерным обществам, компаниям с выручкой от 400 млн ₽ или активами баланса от 60 млн ₽, и ряду других организаций по ФЗ-307. Не уверены, попадаете ли под критерии — проверим бесплатно на консультации.",
  },
  {
    q: "Из чего складывается стоимость аудита?",
    a: "Зависит от объёма отчётности, количества операций, специфики учёта и применяемых ФСБУ. Обязательный аудит — от 80 000 ₽. Точную стоимость назовём после оценки объёма и зафиксируем в договоре.",
  },
  {
    q: "Какие документы нужно подготовить?",
    a: 'Пришлём конкретный перечень после консультации: какие формы, за какие периоды, в каком формате. Не запрашиваем всю первичку «на всякий случай» — только то, что нужно для проверки.',
  },
  {
    q: "Сколько занимает аудит по времени?",
    a: "Обязательный аудит БФО — от 2 до 6 недель в зависимости от объёма операций. Экспресс-формат возможен. Сроки — в договоре.",
  },
  {
    q: "Аудит парализует работу бухгалтерии?",
    a: "Нет. Документы запрашиваем заранее, конкретным списком. Работаем удалённо или с выездом. Не устраиваем авралы посреди закрытия периода.",
  },
  {
    q: "Заключение примут ФНС и банки?",
    a: "Да. Аудиторы аттестованы, компания — член СРО. Заключение соответствует требованиям ФЗ-307 и МСА.",
  },
  {
    q: "Работаете по РСБУ и МСФО?",
    a: "Да, работаем с отчётностью по обоим стандартам. Есть опыт с консолидацией и трансформацией.",
  },
  {
    q: "Работаете по всей России?",
    a: "Да. Удалённо и с выездом в любой регион.",
  },
  {
    q: "Нужен не только аудит, но и налоговый консалтинг?",
    a: "Аудит, налоговый консалтинг и правовая экспертиза — одна команда. Привлекать специалистов отдельно не нужно.",
  },
  {
    q: "Что будет после заявки?",
    a: "Перезвоним в течение 15 минут в рабочее время. Проведём консультацию: разберём задачу, оценим объём, назовём сроки и стоимость. Без обязательств.",
  },
];

export function FAQ() {
  return (
    <section className="py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-12 items-start">
          {/* Left — mascot */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="hidden lg:flex flex-col items-center sticky top-32"
          >
            <Image
              src="/images/mascot.png"
              alt="Аудитор"
              width={280}
              height={280}
              className="drop-shadow-lg"
            />
            <p className="text-center text-sm text-muted-foreground mt-4 max-w-[240px]">
              Не нашли ответа? Спросите на бесплатной консультации.
            </p>
            <a
              href="#contact"
              className="mt-4 inline-flex items-center justify-center rounded-full px-6 h-11 gradient-violet text-white text-sm font-medium transition-opacity hover:opacity-90"
            >
              Задать вопрос
            </a>
          </motion.div>

          {/* Right — FAQ */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-10"
            >
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
                Вопросы, которые задают перед началом работы
              </h2>
            </motion.div>

            <Accordion className="space-y-3">
              {faqItems.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <AccordionItem className="bg-white rounded-2xl glass-border px-6 border">
                    <AccordionTrigger className="text-left font-medium py-5 hover:no-underline">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}
