import { motion } from "framer-motion";
import { skills } from "../data/resume";
import Reveal, { RevealWords } from "./Reveal";

export default function Skills() {
  return (
    <section id="skills" className="section border-t border-border">
      <Reveal variant="blur">
        <p className="eyebrow">Skills</p>
      </Reveal>
      <RevealWords
        text="What I bring to the table"
        className="mb-10 text-balance text-3xl font-bold sm:text-4xl"
      />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {skills.map((group, i) => (
          <Reveal key={group.category} delay={i * 0.08} variant="scale">
            <div className="card group h-full p-6 transition-colors duration-300 hover:border-accent/40">
              <h3 className="mb-4 font-display text-base font-semibold text-text">
                {group.category}
              </h3>
              <motion.div
                initial="hidden"
                whileInView="shown"
                viewport={{ once: true, margin: "-60px" }}
                transition={{ staggerChildren: 0.04, delayChildren: 0.1 + i * 0.05 }}
                className="flex flex-wrap gap-2"
              >
                {group.items.map((item) => (
                  <motion.span
                    key={item}
                    variants={{
                      hidden: { opacity: 0, scale: 0.86, y: 6 },
                      shown: { opacity: 1, scale: 1, y: 0 },
                    }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="pill transition-colors duration-200 hover:border-accent/50 hover:text-text"
                  >
                    {item}
                  </motion.span>
                ))}
              </motion.div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
