"use client";

import { motion } from "framer-motion";
import type { Landing } from "@/lib/landings";

export function LandingDeliverables({
  deliverables,
}: {
  deliverables: Landing["deliverables"];
}) {
  return (
    <section className="py-20 sm:py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mb-10"
        >
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold mb-4 leading-[1.1]">
            {deliverables.heading}
          </h2>
          <p className="text-lg text-muted-foreground">{deliverables.lead}</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-5">
          {deliverables.items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="rounded-2xl bg-white border border-gray-200 shadow-premium p-6 sm:p-7 flex gap-5"
            >
              {item.icon && (
                <div className="w-12 h-12 rounded-xl gradient-violet flex items-center justify-center shrink-0">
                  <item.icon className="w-6 h-6 text-white" />
                </div>
              )}
              <div>
                <h3 className="text-lg font-semibold mb-2 leading-snug">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {item.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
