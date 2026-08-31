import { useEffect, useRef, useState } from "react";

/**
 * Counts a numeric stat up when it scrolls into view. Non-numeric stats
 * (like "End-to-end") are passed straight through unchanged.
 */
export default function CountUp({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState<string>(value);
  const played = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Parsed inside the effect: String.match returns a new array every render,
    // so keeping it in the dependency array would re-run this forever.
    // "80%" -> ["", "80", "%"]; "<60s" -> ["<", "60", "s"]
    const match = value.match(/^([^\d]*)(\d+(?:\.\d+)?)(.*)$/);
    if (!match) {
      setDisplay(value);
      return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setDisplay(value);
      return;
    }

    const [, prefix, numStr, suffix] = match;
    const target = parseFloat(numStr);
    const decimals = numStr.includes(".") ? numStr.split(".")[1].length : 0;

    played.current = false;
    setDisplay(`${prefix}0${suffix}`);

    let frame = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || played.current) return;
          played.current = true;

          const duration = 1200;
          const start = performance.now();
          const step = (now: number) => {
            const p = Math.min((now - start) / duration, 1);
            // easeOutExpo — quick off the line, soft landing
            const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
            if (p < 1) {
              setDisplay(`${prefix}${(target * eased).toFixed(decimals)}${suffix}`);
              frame = requestAnimationFrame(step);
            } else {
              setDisplay(value);
            }
          };
          frame = requestAnimationFrame(step);
        });
      },
      { threshold: 0.35 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
