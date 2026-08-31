import { useEffect, useRef, useState } from "react";

/**
 * Counts a numeric stat up when it scrolls into view. Non-numeric stats
 * (like "24/7" or "End-to-end") are passed straight through unchanged.
 */
export default function CountUp({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState<string>(value);
  const played = useRef(false);

  // Split "80%" -> prefix "", number 80, suffix "%"; "<60s" -> "<", 60, "s"
  const match = value.match(/^([^\d]*)(\d+(?:\.\d+)?)(.*)$/);

  useEffect(() => {
    if (!match) return;
    const el = ref.current;
    if (!el) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const [, prefix, numStr, suffix] = match;
    const target = parseFloat(numStr);
    const decimals = numStr.includes(".") ? numStr.split(".")[1].length : 0;

    if (reduceMotion) {
      setDisplay(value);
      return;
    }

    setDisplay(`${prefix}0${suffix}`);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || played.current) return;
          played.current = true;

          const duration = 1200;
          const start = performance.now();
          const step = (now: number) => {
            const p = Math.min((now - start) / duration, 1);
            // easeOutExpo — fast start, soft landing
            const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
            const current = (target * eased).toFixed(decimals);
            setDisplay(`${prefix}${current}${suffix}`);
            if (p < 1) requestAnimationFrame(step);
            else setDisplay(value);
          };
          requestAnimationFrame(step);
        });
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value, match]);

  return (
    <span ref={ref} className={className}>
      {match ? display : value}
    </span>
  );
}
