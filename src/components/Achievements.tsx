import { achievements } from "../data/resume";
import Reveal from "./Reveal";
import { MedalIcon, BallIcon, BoltIcon } from "./icons";

const iconMap = { medal: MedalIcon, ball: BallIcon, bolt: BoltIcon } as const;

export default function Achievements() {
  return (
    <section className="section border-t border-border">
      <Reveal>
        <p className="eyebrow">Achievements & Athletics</p>
        <h2 className="mb-10 text-balance text-3xl font-bold sm:text-4xl">Off the screen too</h2>
      </Reveal>

      <div className="grid gap-5 sm:grid-cols-3">
        {achievements.map((item, i) => {
          const Icon = iconMap[item.icon as keyof typeof iconMap];
          return (
            <Reveal key={item.label} delay={i * 0.08} className="card p-6 hover:border-accent/40">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-accent">
                <Icon className="h-6 w-6" />
              </div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted">{item.label}</p>
              <p className="mb-2 font-display text-xl font-bold text-text">{item.stat}</p>
              <p className="text-sm text-muted">{item.detail}</p>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
