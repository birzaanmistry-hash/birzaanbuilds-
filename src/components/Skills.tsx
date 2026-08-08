import { skills } from "../data/resume";
import Reveal from "./Reveal";

export default function Skills() {
  return (
    <section id="skills" className="section border-t border-border">
      <Reveal>
        <p className="eyebrow">Skills</p>
        <h2 className="mb-10 text-balance text-3xl font-bold sm:text-4xl">What I bring to the table</h2>
      </Reveal>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {skills.map((group, i) => (
          <Reveal key={group.category} delay={i * 0.08} className="card p-6 hover:border-accent/40">
            <h3 className="mb-4 font-display text-base font-semibold text-text">{group.category}</h3>
            <div className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span key={item} className="pill">
                  {item}
                </span>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
