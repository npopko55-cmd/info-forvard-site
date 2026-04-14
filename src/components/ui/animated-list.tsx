"use client";

import {
  useRef,
  useState,
  useEffect,
  useCallback,
  ReactNode,
  MouseEvent,
} from "react";
import { motion, useInView } from "framer-motion";

type AnimatedItemProps = {
  children: ReactNode;
  delay?: number;
  index: number;
  onMouseEnter?: (e: MouseEvent) => void;
  onClick?: (e: MouseEvent) => void;
};

const AnimatedItem = ({
  children,
  delay = 0,
  index,
  onMouseEnter,
  onClick,
}: AnimatedItemProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3, once: false });
  return (
    <motion.div
      ref={ref}
      data-index={index}
      onMouseEnter={onMouseEnter}
      onClick={onClick}
      initial={{ scale: 0.85, opacity: 0 }}
      animate={inView ? { scale: 1, opacity: 1 } : { scale: 0.85, opacity: 0 }}
      transition={{ duration: 0.3, delay }}
      className="mb-3 cursor-pointer"
    >
      {children}
    </motion.div>
  );
};

export type AnimatedListItem = {
  q: string;
  a: string;
};

type AnimatedListProps = {
  items: AnimatedListItem[];
  showGradients?: boolean;
  enableArrowNavigation?: boolean;
  className?: string;
  displayScrollbar?: boolean;
  initialSelectedIndex?: number;
  maxHeight?: string;
};

export const AnimatedList = ({
  items,
  showGradients = true,
  enableArrowNavigation = true,
  className = "",
  displayScrollbar = false,
  initialSelectedIndex = 0,
  maxHeight = "560px",
}: AnimatedListProps) => {
  const listRef = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(initialSelectedIndex);
  const [keyboardNav, setKeyboardNav] = useState(false);
  const [topGradientOpacity, setTopGradientOpacity] = useState(0);
  const [bottomGradientOpacity, setBottomGradientOpacity] = useState(1);

  const handleItemClick = useCallback((index: number) => {
    setSelectedIndex((prev) => (prev === index ? -1 : index));
  }, []);

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    const { scrollTop, scrollHeight, clientHeight } = target;
    setTopGradientOpacity(Math.min(scrollTop / 50, 1));
    const bottomDistance = scrollHeight - (scrollTop + clientHeight);
    setBottomGradientOpacity(
      scrollHeight <= clientHeight ? 0 : Math.min(bottomDistance / 50, 1)
    );
  }, []);

  useEffect(() => {
    if (!enableArrowNavigation) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setKeyboardNav(true);
        setSelectedIndex((prev) => Math.min(prev + 1, items.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setKeyboardNav(true);
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [items.length, enableArrowNavigation]);

  useEffect(() => {
    if (!keyboardNav || selectedIndex < 0 || !listRef.current) return;
    const container = listRef.current;
    const selectedItem = container.querySelector<HTMLElement>(
      `[data-index="${selectedIndex}"]`
    );
    if (selectedItem) {
      const extraMargin = 50;
      const containerScrollTop = container.scrollTop;
      const containerHeight = container.clientHeight;
      const itemTop = selectedItem.offsetTop;
      const itemBottom = itemTop + selectedItem.offsetHeight;
      if (itemTop < containerScrollTop + extraMargin) {
        container.scrollTo({ top: itemTop - extraMargin, behavior: "smooth" });
      } else if (
        itemBottom >
        containerScrollTop + containerHeight - extraMargin
      ) {
        container.scrollTo({
          top: itemBottom - containerHeight + extraMargin,
          behavior: "smooth",
        });
      }
    }
    setKeyboardNav(false);
  }, [selectedIndex, keyboardNav]);

  return (
    <div className={`relative ${className}`}>
      <div
        ref={listRef}
        onScroll={handleScroll}
        style={{ maxHeight }}
        className={`overflow-y-auto p-1 pr-3 ${
          displayScrollbar ? "" : "scrollbar-hide"
        }`}
      >
        {items.map((item, index) => {
          const isSelected = selectedIndex === index;
          return (
            <AnimatedItem
              key={index}
              delay={0.05}
              index={index}
              onClick={() => handleItemClick(index)}
            >
              <div
                className={`rounded-xl border transition-all px-6 py-5 ${
                  isSelected
                    ? "bg-white border-primary shadow-md"
                    : "bg-white border-gray-200 hover:border-violet-300"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-medium text-base leading-snug">
                    {item.q}
                  </h3>
                  <div
                    className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                      isSelected
                        ? "gradient-violet text-white rotate-45"
                        : "bg-violet-50 text-primary"
                    }`}
                  >
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6 1V11M1 6H11"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                </div>
                <motion.div
                  initial={false}
                  animate={{
                    height: isSelected ? "auto" : 0,
                    opacity: isSelected ? 1 : 0,
                    marginTop: isSelected ? 12 : 0,
                  }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    {item.a}
                  </p>
                </motion.div>
              </div>
            </AnimatedItem>
          );
        })}
      </div>
      {showGradients && (
        <>
          <div
            className="pointer-events-none absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-white to-transparent transition-opacity duration-300"
            style={{ opacity: topGradientOpacity }}
          />
          <div
            className="pointer-events-none absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent transition-opacity duration-300"
            style={{ opacity: bottomGradientOpacity }}
          />
        </>
      )}
    </div>
  );
};

export default AnimatedList;
