import { useEffect, useRef, useState } from "react";

export function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      setVisible(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

/** Counts up from 0 to `target` the first time the element scrolls into view. */
export function useCounter(target: number, decimals = 0, duration = 1400) {
  const [display, setDisplay] = useState(decimals > 0 ? (0).toFixed(decimals) : "0");
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const format = (v: number) => (decimals > 0 ? v.toFixed(decimals) : Math.round(v).toLocaleString("en-US"));
    if (prefersReducedMotion()) {
      setDisplay(format(target));
      return;
    }
    let frame = 0;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        obs.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const pct = Math.min((now - start) / duration, 1);
          const ease = 1 - Math.pow(1 - pct, 3);
          setDisplay(format(ease * target));
          if (pct < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.5 },
    );
    obs.observe(el);
    return () => {
      obs.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [target, decimals, duration]);
  return { ref, display };
}
