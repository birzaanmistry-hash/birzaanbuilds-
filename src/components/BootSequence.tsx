import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LINES = [
  "initializing workflow engine",
  "connecting agents · n8n · openai",
  "5 systems online",
];

/**
 * Short boot overlay on first paint — the site starts up like one of the
 * systems it's describing, then wipes away to reveal the hero.
 * Skipped entirely for reduced-motion users and on repeat visits in a session.
 */
export default function BootSequence({ onDone }: { onDone: () => void }) {
  const [visible, setVisible] = useState(true);
  const [lineIndex, setLineIndex] = useState(0);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let alreadySeen = false;
    try {
      alreadySeen = sessionStorage.getItem("bm_booted") === "1";
    } catch {
      alreadySeen = false;
    }

    if (reduceMotion || alreadySeen) {
      setVisible(false);
      onDone();
      return;
    }

    try {
      sessionStorage.setItem("bm_booted", "1");
    } catch {
      /* private mode — the boot just plays again next time */
    }

    document.body.style.overflow = "hidden";

    const timers: number[] = [];
    LINES.forEach((_, i) => {
      timers.push(window.setTimeout(() => setLineIndex(i + 1), 260 + i * 300));
    });
    timers.push(
      window.setTimeout(() => {
        setVisible(false);
        document.body.style.overflow = "";
        onDone();
      }, 1500)
    );

    return () => {
      timers.forEach(clearTimeout);
      document.body.style.overflow = "";
    };
  }, [onDone]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-bg"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="px-6 font-mono text-xs sm:text-sm">
            {LINES.slice(0, lineIndex).map((line, i) => (
              <motion.p
                key={line}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.22 }}
                className="mb-1.5 text-muted"
              >
                <span className="mr-2 text-accent">›</span>
                {line}
                {i === lineIndex - 1 && (
                  <span className="caret ml-1 inline-block h-3 w-[7px] translate-y-[1px] bg-accent" />
                )}
              </motion.p>
            ))}
          </div>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
            className="absolute bottom-0 left-0 h-[2px] w-full origin-left bg-accent"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
