import { skills } from "../data/resume";

export default function Skills() {
  return (
    <section id="skills" className="section border-b border-border">
      <h2 className="section-heading">Skills & Expertise</h2>
      <div className="grid gap-6 sm:grid-cols-2">
        {skills.map((group) => (
          <div key={group.category} className="card">
            <h3 className="mb-3 font-mono text-sm font-semibold text-white">{group.category}</h3>
            <div className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span key={item} className="pill">
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
