"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { Landing } from "@/lib/landings";
import { handleLeadClick } from "@/lib/lead-form";

export function LandingServices({
  services,
}: {
  services: Landing["services"];
}) {
  return (
    <section id="services" className="py-20 sm:py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mb-10"
        >
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold mb-4 leading-[1.1]">
            {services.heading}
          </h2>
          <p className="text-lg text-muted-foreground">{services.lead}</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.items.map((service, i) => (
            <motion.a
              key={service.id}
              href="#contact"
              onClick={handleLeadClick}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className={`group relative rounded-2xl p-6 sm:p-7 bg-white flex flex-col transition-all duration-300 hover:shadow-premium-lg hover:-translate-y-1 ${
                service.highlight
                  ? "border-2 border-primary"
                  : "border border-gray-200 hover:border-violet-200"
              }`}
            >
              {service.highlight && (
                <div className="absolute -top-3 left-6 px-3 py-1 rounded-full gradient-violet text-xs font-semibold text-white shadow-md shadow-violet-500/25">
                  Чаще всего заказывают
                </div>
              )}

              <div className="mb-5 w-12 h-12 rounded-xl gradient-violet flex items-center justify-center">
                <service.icon className="w-6 h-6 text-white" />
              </div>

              <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground flex-1">
                {service.description}
              </p>

              <div className="pt-4 mt-4 border-t border-gray-100 text-xs text-muted-foreground">
                {service.timeline}
              </div>

              <div className="flex items-center gap-2 text-sm font-medium pt-3 text-primary">
                Обсудить задачу
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
