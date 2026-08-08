import { useState } from "react";
import { projects } from "../data/resume";
import Reveal from "./Reveal";
import { ArrowUpRightIcon, ChevronIcon } from "./icons";

export default function Projects() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

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

      <div className="grid gap-5 lg:grid-cols-2">
        {projects.map((project, i) => {
          const isActive = activeIndex === i;
          return (
            <Reveal key={project.title} delay={(i % 2) * 0.08}>
              <button
                onClick={() => setActiveIndex(isActive ? null : i)}
                aria-pressed={isActive}
                className={`card flex h-full w-full flex-col p-7 text-left ${
                  isActive ? "border-accent/60" : "hover:border-accent/30"
                }`}
              >
                <div className="mb-5 flex items-start justify-between gap-4">
                  <div>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                      {project.tag}
                    </p>
                    <h3 className="font-display text-2xl font-bold leading-tight text-text">
                      {project.title}
                    </h3>
                  </div>
                  <span
                    className={`mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-colors ${
                      isActive ? "border-accent text-accent" : "border-border text-muted"
                    }`}
                  >
                    {isActive ? <ChevronIcon className="h-4 w-4" /> : <ArrowUpRightIcon className="h-3.5 w-3.5" />}
                  </span>
                </div>

                <p className="text-sm leading-relaxed text-muted">{project.description}</p>

                <div className="my-6 border-t border-border pt-6">
                  <p className="font-serif text-4xl font-medium text-accent sm:text-5xl">{project.stat}</p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-[0.15em] text-muted">
                    {project.statCaption}
                  </p>
                </div>

                <p className="mb-6 border-t border-border pt-6 text-sm leading-relaxed text-muted">
                  {project.detail}
                </p>

                <div className="mt-auto flex flex-wrap gap-2">
                  {project.tools.map((tool) => (
                    <span key={tool} className="pill text-[11px]">
                      {tool}
                    </span>
                  ))}
                </div>
              </button>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
