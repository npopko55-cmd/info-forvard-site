"use client";

import { ArrowUpRight, Calculator, UserCheck, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

export type CtaVariant = "calc" | "auditor" | "express";

const variants = {
  calc: {
    icon: Calculator,
    label: "Рассчитать стоимость",
    href: "#contact",
    style: "primary" as const,
  },
  auditor: {
    icon: UserCheck,
    label: "Связаться с главным аудитором",
    href: "tel:+79011841190",
    style: "outline" as const,
  },
  express: {
    icon: MessageCircle,
    label: "Получить экспресс-консультацию",
    href: "#contact",
    style: "outline" as const,
  },
};

export function CtaStrip({
  variant = "calc",
  className = "",
}: {
  variant?: CtaVariant;
  className?: string;
}) {
  const v = variants[variant];
  const Icon = v.icon;

  const isPrimary = v.style === "primary";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`flex items-center justify-center ${className}`}
    >
      <a
        href={v.href}
        className={
          isPrimary
            ? "group inline-flex items-center justify-center gap-2 rounded-full px-7 h-12 bg-[#16162B] hover:bg-[#26263F] text-white font-medium text-sm transition-all shadow-[0_8px_24px_rgba(22,22,43,0.2)] hover:shadow-[0_12px_32px_rgba(22,22,43,0.3)]"
            : "group inline-flex items-center justify-center gap-2 rounded-full px-7 h-12 border border-[#16162B]/20 hover:border-primary hover:bg-violet-50 bg-white text-foreground font-medium text-sm transition-all"
        }
      >
        <Icon className={`w-4 h-4 ${isPrimary ? "" : "text-primary"}`} />
        {v.label}
        <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </a>
    </motion.div>
  );
}
