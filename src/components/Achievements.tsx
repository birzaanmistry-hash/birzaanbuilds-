import { achievements } from "../data/resume";

export default function Achievements() {
  return (
    <section id="achievements" className="section border-b border-border">
      <h2 className="section-heading">Achievements & Athletics</h2>
      <div className="grid gap-3">
        {achievements.map((item) => (
          <div key={item.label} className="flex flex-col gap-1 sm:flex-row sm:gap-3">
            <span className="w-28 shrink-0 font-mono text-sm font-semibold text-accent">
              {item.label}:
            </span>
            <span className="text-sm text-white/80">{item.detail}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
