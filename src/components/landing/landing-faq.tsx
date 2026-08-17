"use client";

import { motion } from "framer-motion";
import { AnimatedList } from "@/components/ui/animated-list";
import { CtaStrip } from "@/components/ui/cta-strip";
import type { Landing } from "@/lib/landings";

export function LandingFAQ({ faq }: { faq: Landing["faq"] }) {
  return (
    <section id="faq" className="py-20 sm:py-28 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold mb-4 leading-[1.1]">
            У меня есть вопрос...
          </h2>
          <p className="text-lg text-muted-foreground">
            Давайте разберём часто задаваемые вопросы. Нажмите, чтобы раскрыть
            ответ.
          </p>
        </motion.div>

        <AnimatedList
          items={faq}
          showGradients
          enableArrowNavigation={false}
          initialSelectedIndex={-1}
          maxHeight="640px"
        />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10 text-center"
        >
          <p className="text-muted-foreground mb-6">
            Не нашли ответа? Задайте вопрос напрямую.
          </p>
          <CtaStrip variant="express" />
        </motion.div>
      </div>
    </section>
  );
}
