"use client";

import { useRef, useEffect, useCallback, useState, ReactNode } from "react";
import { gsap } from "gsap";
import "./magic-bento.css";

const GLOW_COLOR = "132, 0, 255";
const MOBILE_BREAKPOINT = 768;
const SPOTLIGHT_RADIUS = 400;
const PARTICLE_COUNT = 10;

export type BentoItem = {
  label: string;
  value: string;
  description?: string;
};

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

function createParticle(x: number, y: number) {
  const el = document.createElement("div");
  el.className = "bento-particle";
  el.style.left = `${x}px`;
  el.style.top = `${y}px`;
  return el;
}

function GlobalSpotlight({
  gridRef,
  enabled,
}: {
  gridRef: React.RefObject<HTMLDivElement | null>;
  enabled: boolean;
}) {
  useEffect(() => {
    if (!enabled || !gridRef.current) return;

    const spotlight = document.createElement("div");
    spotlight.className = "bento-global-spotlight";
    spotlight.style.background = `radial-gradient(circle, rgba(${GLOW_COLOR}, 0.18) 0%, rgba(${GLOW_COLOR}, 0.09) 15%, rgba(${GLOW_COLOR}, 0.04) 30%, rgba(${GLOW_COLOR}, 0.01) 55%, transparent 70%)`;
    document.body.appendChild(spotlight);

    const proximity = SPOTLIGHT_RADIUS * 0.5;
    const fade = SPOTLIGHT_RADIUS * 0.75;

    const onMove = (e: MouseEvent) => {
      const grid = gridRef.current;
      if (!grid) return;
      const rect = grid.getBoundingClientRect();
      const inside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

      const cards = grid.querySelectorAll<HTMLElement>(".bento-card");
      if (!inside) {
        gsap.to(spotlight, { opacity: 0, duration: 0.3 });
        cards.forEach((c) => c.style.setProperty("--glow-intensity", "0"));
        return;
      }

      let minDistance = Infinity;
      cards.forEach((card) => {
        const cr = card.getBoundingClientRect();
        const cx = cr.left + cr.width / 2;
        const cy = cr.top + cr.height / 2;
        const dist =
          Math.hypot(e.clientX - cx, e.clientY - cy) -
          Math.max(cr.width, cr.height) / 2;
        const effective = Math.max(0, dist);
        minDistance = Math.min(minDistance, effective);

        let intensity = 0;
        if (effective <= proximity) intensity = 1;
        else if (effective <= fade)
          intensity = (fade - effective) / (fade - proximity);

        const relX = ((e.clientX - cr.left) / cr.width) * 100;
        const relY = ((e.clientY - cr.top) / cr.height) * 100;
        card.style.setProperty("--glow-x", `${relX}%`);
        card.style.setProperty("--glow-y", `${relY}%`);
        card.style.setProperty("--glow-intensity", intensity.toString());
        card.style.setProperty("--glow-radius", `${SPOTLIGHT_RADIUS}px`);
      });

      gsap.to(spotlight, {
        left: e.clientX,
        top: e.clientY,
        duration: 0.12,
      });
      const opacity =
        minDistance <= proximity
          ? 0.85
          : minDistance <= fade
            ? ((fade - minDistance) / (fade - proximity)) * 0.85
            : 0;
      gsap.to(spotlight, { opacity, duration: opacity > 0 ? 0.2 : 0.5 });
    };

    const onLeave = () => {
      gsap.to(spotlight, { opacity: 0, duration: 0.3 });
      gridRef.current
        ?.querySelectorAll<HTMLElement>(".bento-card")
        .forEach((c) => c.style.setProperty("--glow-intensity", "0"));
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      spotlight.remove();
    };
  }, [enabled, gridRef]);

  return null;
}

function BentoCard({
  item,
  disableAnimations,
  clickEffect,
}: {
  item: BentoItem;
  disableAnimations: boolean;
  clickEffect: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isHovered = useRef(false);
  const particlesRef = useRef<HTMLElement[]>([]);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearParticles = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    particlesRef.current.forEach((p) => {
      gsap.to(p, {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        onComplete: () => p.remove(),
      });
    });
    particlesRef.current = [];
  }, []);

  useEffect(() => {
    if (disableAnimations || !cardRef.current) return;
    const el = cardRef.current;

    const spawnParticles = () => {
      if (!isHovered.current || !cardRef.current) return;
      const { width, height } = cardRef.current.getBoundingClientRect();
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const id = setTimeout(() => {
          if (!isHovered.current || !cardRef.current) return;
          const particle = createParticle(
            Math.random() * width,
            Math.random() * height
          );
          cardRef.current.appendChild(particle);
          particlesRef.current.push(particle);
          gsap.fromTo(
            particle,
            { scale: 0, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.7)" }
          );
          gsap.to(particle, {
            x: (Math.random() - 0.5) * 80,
            y: (Math.random() - 0.5) * 80,
            rotation: Math.random() * 360,
            duration: 2 + Math.random() * 2,
            repeat: -1,
            yoyo: true,
          });
          gsap.to(particle, {
            opacity: 0.3,
            duration: 1.5,
            repeat: -1,
            yoyo: true,
          });
        }, i * 100);
        timeoutsRef.current.push(id);
      }
    };

    const onEnter = () => {
      isHovered.current = true;
      spawnParticles();
    };
    const onLeave = () => {
      isHovered.current = false;
      clearParticles();
    };
    const onClick = (e: MouseEvent) => {
      if (!clickEffect) return;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const maxDist = Math.max(
        Math.hypot(x, y),
        Math.hypot(x - rect.width, y),
        Math.hypot(x, y - rect.height),
        Math.hypot(x - rect.width, y - rect.height)
      );
      const ripple = document.createElement("div");
      ripple.style.cssText = `position:absolute;width:${maxDist * 2}px;height:${maxDist * 2}px;border-radius:50%;background:radial-gradient(circle, rgba(${GLOW_COLOR},0.4) 0%, rgba(${GLOW_COLOR},0.2) 30%, transparent 70%);left:${x - maxDist}px;top:${y - maxDist}px;pointer-events:none;z-index:20;`;
      el.appendChild(ripple);
      gsap.fromTo(
        ripple,
        { scale: 0, opacity: 1 },
        {
          scale: 1,
          opacity: 0,
          duration: 0.8,
          onComplete: () => ripple.remove(),
        }
      );
    };

    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    el.addEventListener("click", onClick);
    return () => {
      isHovered.current = false;
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
      el.removeEventListener("click", onClick);
      clearParticles();
    };
  }, [disableAnimations, clickEffect, clearParticles]);

  return (
    <div ref={cardRef} className="bento-card bento-card--border-glow">
      <div className="bento-card__label">{item.label}</div>
      <div>
        <div className="bento-card__value">{item.value}</div>
        {item.description && (
          <div className="bento-card__description">{item.description}</div>
        )}
      </div>
    </div>
  );
}

export function MagicBento({ items }: { items: BentoItem[] }) {
  const gridRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const disableAnimations = isMobile;

  return (
    <div className="bento-section-wrapper">
      <GlobalSpotlight gridRef={gridRef} enabled={!disableAnimations} />
      <div ref={gridRef} className="bento-grid">
        {items.map((item, i) => (
          <BentoCard
            key={i}
            item={item}
            disableAnimations={disableAnimations}
            clickEffect
          />
        ))}
      </div>
    </div>
  );
}

export default MagicBento;
