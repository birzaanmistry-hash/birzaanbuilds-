import { ventures } from "../data/resume";
import Reveal from "./Reveal";

export default function Ventures() {
  return (
    <section id="ventures" className="section border-t border-border">
      <Reveal>
        <p className="eyebrow">Ventures</p>
        <h2 className="mb-10 text-balance text-3xl font-bold sm:text-4xl">Building since 2023</h2>
      </Reveal>

      <div className="grid gap-8 sm:grid-cols-2">
        {ventures.map((venture, i) => (
          <Reveal key={venture.name} delay={i * 0.1} className="relative border-l border-border pl-6">
            <span className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-accent" />
            <p className="mb-1 font-mono text-xs uppercase tracking-wider text-muted">{venture.period}</p>
            <h3 className="mb-1 font-display text-xl font-semibold text-text">{venture.name}</h3>
            <p className="mb-3 text-sm font-medium text-accent">{venture.role}</p>
            <p className="text-sm leading-relaxed text-muted">{venture.description}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
