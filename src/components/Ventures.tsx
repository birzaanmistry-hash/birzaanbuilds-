import { motion } from "framer-motion";
import { ventures } from "../data/resume";
import Reveal, { RevealWords } from "./Reveal";

export default function Ventures() {
  return (
    <section id="ventures" className="section border-t border-border">
      <Reveal variant="blur">
        <p className="eyebrow">Ventures</p>
      </Reveal>
      <RevealWords
        text="Building since 2023"
        className="mb-10 text-balance text-3xl font-bold sm:text-4xl"
      />

      <div className="grid gap-8 sm:grid-cols-2">
        {ventures.map((venture, i) => (
          <Reveal key={venture.name} delay={i * 0.1} className="relative pl-6">
            {/* Timeline rail draws itself downward as the entry arrives */}
            <motion.span
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, margin: "-70px" }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="absolute left-0 top-0 h-full w-px origin-top bg-border"
              aria-hidden="true"
            />
            <motion.span
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, margin: "-70px" }}
              transition={{ duration: 0.45, delay: 0.25 + i * 0.1, ease: "backOut" }}
              className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_14px_2px_rgba(61,127,255,0.45)]"
              aria-hidden="true"
            />
            <p className="mb-1 font-mono text-xs uppercase tracking-wider text-muted">
              {venture.period}
            </p>
            <h3 className="mb-1 font-display text-xl font-semibold text-text">{venture.name}</h3>
            <p className="mb-3 text-sm font-medium text-accent">{venture.role}</p>
            <p className="text-sm leading-relaxed text-muted">{venture.description}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
