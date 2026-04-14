"use client";

import { ArrowUpRight, Calculator, UserCheck, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

export function CtaStrip({
  className = "",
}: {
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center justify-center gap-3 ${className}`}
    >
      <a
        href="#contact"
        className="group inline-flex items-center justify-center gap-2 rounded-full px-6 h-12 bg-[#16162B] hover:bg-[#26263F] text-white font-medium text-sm transition-all shadow-[0_8px_24px_rgba(22,22,43,0.2)] hover:shadow-[0_12px_32px_rgba(22,22,43,0.3)]"
      >
        <Calculator className="w-4 h-4" />
        Рассчитать стоимость
        <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </a>
      <a
        href="#team"
        className="inline-flex items-center justify-center gap-2 rounded-full px-6 h-12 border border-[#16162B]/15 hover:border-primary/40 bg-white hover:bg-violet-50 text-foreground font-medium text-sm transition-all"
      >
        <UserCheck className="w-4 h-4 text-primary" />
        Связаться с главным аудитором
      </a>
      <a
        href="tel:+79011841190"
        className="inline-flex items-center justify-center gap-2 rounded-full px-6 h-12 border border-[#16162B]/15 hover:border-primary/40 bg-white hover:bg-violet-50 text-foreground font-medium text-sm transition-all"
      >
        <MessageCircle className="w-4 h-4 text-primary" />
        Получить экспресс-консультацию
      </a>
    </motion.div>
  );
}
