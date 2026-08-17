"use client";

import { motion } from "framer-motion";
import { CtaStrip } from "@/components/ui/cta-strip";
import type { Landing } from "@/lib/landings";

export function LandingCriteria({
  criteria,
}: {
  criteria: Landing["criteria"];
}) {
  return (
    <section id="criteria" className="py-20 sm:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mb-10"
        >
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold mb-4 leading-[1.1]">
            {criteria.heading}
          </h2>
          <p className="text-lg text-muted-foreground">{criteria.lead}</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {criteria.items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="rounded-2xl border border-gray-200 bg-gray-50 p-6 flex flex-col gap-3"
            >
              {item.icon && (
                <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
              )}
              <h3 className="text-base font-semibold leading-snug">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>

        {criteria.note && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-9 rounded-2xl border border-violet-100 bg-violet-50 p-6 sm:p-7 flex flex-col gap-5 items-center text-center"
          >
            <p className="text-base sm:text-lg max-w-2xl leading-relaxed">
              {criteria.note}
            </p>
            <CtaStrip variant="calc" />
          </motion.div>
        )}
      </div>
    </section>
  );
}
