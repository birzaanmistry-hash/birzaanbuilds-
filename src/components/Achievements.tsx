import { motion } from "framer-motion";
import { achievements } from "../data/resume";
import Reveal, { RevealWords } from "./Reveal";
import TiltCard from "./TiltCard";
import { MedalIcon, BallIcon, BoltIcon } from "./icons";

const iconMap = { medal: MedalIcon, ball: BallIcon, bolt: BoltIcon } as const;

export default function Achievements() {
  return (
    <section className="section border-t border-border">
      <Reveal variant="blur">
        <p className="eyebrow">Achievements &amp; Athletics</p>
      </Reveal>
      <RevealWords
        text="Off the screen too"
        className="mb-10 text-balance text-3xl font-bold sm:text-4xl"
      />

      <div className="grid gap-5 sm:grid-cols-3">
        {achievements.map((item, i) => {
          const Icon = iconMap[item.icon as keyof typeof iconMap];
          return (
            <Reveal key={item.label} delay={i * 0.1} variant="scale">
              <TiltCard className="h-full">
                <div className="card group h-full p-6 transition-colors duration-300 hover:border-accent/40">
                  <motion.div
                    initial={{ scale: 0.6, opacity: 0, rotate: -12 }}
                    whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.6, delay: 0.15 + i * 0.1, ease: "backOut" }}
                    className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-accent transition-transform duration-300 group-hover:scale-110"
                  >
                    <Icon className="h-6 w-6" />
                  </motion.div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                    {item.label}
                  </p>
                  <p className="mb-2 font-display text-xl font-bold text-text">{item.stat}</p>
                  <p className="text-sm text-muted">{item.detail}</p>
                </div>
              </TiltCard>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
