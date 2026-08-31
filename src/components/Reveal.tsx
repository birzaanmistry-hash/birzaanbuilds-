import { motion } from "framer-motion";
import type { ReactNode } from "react";

type Variant = "up" | "mask" | "blur" | "scale";

const VARIANTS = {
  up: {
    hidden: { opacity: 0, y: 28 },
    shown: { opacity: 1, y: 0 },
  },
  mask: {
    hidden: { opacity: 0, y: 24, clipPath: "inset(0 0 100% 0)" },
    shown: { opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" },
  },
  blur: {
    hidden: { opacity: 0, y: 18, filter: "blur(10px)" },
    shown: { opacity: 1, y: 0, filter: "blur(0px)" },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.94, y: 20 },
    shown: { opacity: 1, scale: 1, y: 0 },
  },
} as const;

export default function Reveal({
  children,
  delay = 0,
  className,
  variant = "up",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  variant?: Variant;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: "-70px" }}
      variants={VARIANTS[variant]}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Splits a line into words that rise into place one after another, so section
 * headings assemble themselves rather than just fading in.
 */
export function RevealWords({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const words = text.split(" ");

  return (
    <motion.h2
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: "-70px" }}
      transition={{ staggerChildren: 0.055, delayChildren: delay }}
      className={className}
    >
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden align-bottom">
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: "110%", opacity: 0 },
              shown: { y: "0%", opacity: 1 },
            }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </motion.h2>
  );
}
