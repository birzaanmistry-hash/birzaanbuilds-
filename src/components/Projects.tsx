import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "../data/resume";
import Reveal from "./Reveal";
import { ChevronIcon } from "./icons";

export default function Projects() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="projects" className="section border-t border-border">
      <Reveal>
        <p className="eyebrow">AI Workflows — Deployed Projects</p>
        <h2 className="mb-4 text-balance text-3xl font-bold sm:text-4xl">
          Systems that save time and money
        </h2>
        <p className="mb-10 max-w-2xl text-muted">
          Not vague automations — production tools with real interfaces, running for real clients today.
        </p>
      </Reveal>

      <div className="grid gap-5">
        {projects.map((project, i) => {
          const isOpen = openIndex === i;
          return (
            <Reveal key={project.title} delay={i * 0.06}>
              <div className={`card overflow-hidden ${isOpen ? "border-accent/40" : "hover:border-accent/30"}`}>
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full flex-col gap-4 p-6 text-left sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex-1">
                    <div className="mb-2 flex flex-wrap items-center gap-3">
                      <h3 className="font-display text-lg font-semibold text-text">{project.title}</h3>
                      <span className="pill !border-accent/30 !text-accent">{project.type}</span>
                    </div>
                    <p className="text-sm text-muted sm:hidden">{project.description}</p>
                  </div>

                  <div className="flex items-center gap-6">
                    <span className="whitespace-nowrap font-display text-xl font-bold text-accent sm:text-2xl">
                      {project.metric}
                    </span>
                    <ChevronIcon
                      className={`h-5 w-5 shrink-0 text-muted transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-border px-6 pb-6 pt-5">
                        <p className="mb-4 hidden max-w-2xl text-sm leading-relaxed text-muted sm:block">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {project.tools.map((tool) => (
                            <span key={tool} className="pill text-[11px]">
                              {tool}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
