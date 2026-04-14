"use client";

import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { Img } from "@/components/img";

const navItems = [
  { label: "Услуги", href: "#services" },
  { label: "О компании", href: "#team" },
  { label: "Как работаем", href: "#process" },
  { label: "Контакты", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "glass glass-border shadow-sm py-3" : "bg-transparent py-5"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2" aria-label="ИНФО ФОРВАРД">
          <Img
            src="/images/logo-v2.png"
            alt="ИНФО ФОРВАРД"
            className="h-10 w-auto object-contain"
          />
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <a
            href="tel:+79011841190"
            className="text-sm font-medium text-muted-foreground hover:text-foreground flex items-center gap-1.5 transition-colors"
          >
            <Phone className="w-3.5 h-3.5" />
            +7 (901) 184-11-90
          </a>
          <a
            href="#contact"
            className="inline-flex items-center justify-center rounded-full bg-primary hover:bg-primary/90 text-white px-6 h-10 text-sm font-medium transition-colors"
          >
            Консультация аудитора
          </a>
        </div>

        <button
          className="md:hidden p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden glass glass-border mt-2 mx-4 rounded-2xl p-4 space-y-3">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="block py-2 text-sm font-medium text-foreground"
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <a
            href="tel:+79011841190"
            className="block py-2 text-sm font-medium text-primary"
          >
            +7 (901) 184-11-90
          </a>
          <a
            href="#contact"
            onClick={() => setMobileOpen(false)}
            className="block w-full text-center rounded-full bg-primary text-white py-3 text-sm font-medium"
          >
            Консультация аудитора
          </a>
        </div>
      )}
    </header>
  );
}
