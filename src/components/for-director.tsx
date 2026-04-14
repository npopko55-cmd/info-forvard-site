"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "25+", label: "лет аудиторской практики" },
  { value: "500+", label: "аудиторских проверок" },
  { value: "50+", label: "отраслей в опыте" },
  { value: "от 2", label: "недель — срок аудита" },
  { value: "от 80 000 ₽", label: "стоимость обязательного аудита" },
  { value: "15 мин", label: "среднее время ответа на заявку" },
];

export function ForDirector() {
  return (
    <section className="py-20 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mb-12"
        >
          <h2 className="font-heading text-4xl sm:text-5xl font-semibold mb-4">
            Цифры компании
          </h2>
          <p className="text-lg text-muted-foreground">
            Факты для оценки аудиторской компании перед заявкой.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-px bg-gray-200 rounded-2xl overflow-hidden">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="bg-white p-6 sm:p-8"
            >
              <div className="font-heading text-4xl sm:text-5xl font-semibold text-primary leading-none">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground mt-3 leading-relaxed">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
�ания выбора аудитора
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {facts.map((fact, i) => (
            <motion.div
              key={fact.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="rounded-2xl p-6 bg-white border border-gray-200 hover:border-violet-300 hover:shadow-premium transition-all"
            >
              <div className="w-12 h-12 rounded-xl gradient-violet flex items-center justify-center mb-4">
                <fact.icon className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-semibold mb-2">{fact.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {fact.text}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10 text-center"
        >
          <a
            href="#contact"
            className="inline-flex items-center justify-center rounded-xl px-8 h-14 gradient-violet text-white shadow-lg shadow-violet-500/20 font-medium text-base transition-opacity hover:opacity-90"
          >
            Обсудить задачу
          </a>
        </motion.div>
      </div>
    </section>
  );
}
