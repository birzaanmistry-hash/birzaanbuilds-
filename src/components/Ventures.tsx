import { ventures } from "../data/resume";

export default function Ventures() {
  return (
    <section id="ventures" className="section border-b border-border">
      <h2 className="section-heading">Ventures</h2>
      <div className="grid gap-5 sm:grid-cols-2">
        {ventures.map((venture) => (
          <div key={venture.name} className="card">
            <h3 className="text-lg font-semibold text-white">{venture.name}</h3>
            <p className="mb-2 font-mono text-xs text-accent">
              {venture.type} · {venture.period}
            </p>
            <p className="text-sm leading-relaxed text-white/80">{venture.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
