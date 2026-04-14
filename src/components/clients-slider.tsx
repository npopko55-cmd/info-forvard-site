"use client";

import { motion } from "framer-motion";

const clients = [
  "РЖД",
  "Яндекс",
  "Рольф",
  "Атлас Копко",
  "Хёрст Шкулёв",
  "СМ-Клиника",
  "Газпром Надым Перевозки",
  "Ла Прерри Рус Групп",
  "ЗОМФИ",
  "Эксайд Текнолоджис",
];

function SliderRow({ reverse = false }: { reverse?: boolean }) {
  return (
    <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <motion.div
        className="flex gap-8 shrink-0"
        animate={{ x: reverse ? "0%" : "-50%" }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 30,
            ease: "linear",
          },
        }}
      >
        {[...clients, ...clients].map((name, i) => (
          <div
            key={`${name}-${i}`}
            className="shrink-0 px-6 py-3 rounded-xl bg-white border border-gray-200 flex items-center"
          >
            <span className="text-sm font-medium text-foreground/70 whitespace-nowrap">
              {name}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export function ClientsSlider() {
  return (
    <section id="clients" className="py-8 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-5">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-muted-foreground text-xs uppercase tracking-[0.18em] font-semibold"
        >
          Среди проверенных объектов
        </motion.p>
      </div>
      <SliderRow />
    </section>
  );
}
