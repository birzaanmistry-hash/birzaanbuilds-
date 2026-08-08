import { profile, aboutStats } from "../data/resume";
import Reveal from "./Reveal";

export default function About() {
  return (
    <section id="about" className="section border-t border-border">
      <div className="grid gap-12 lg:grid-cols-[1.1fr,0.9fr] lg:gap-16">
        <Reveal>
          <p className="eyebrow">About</p>
          <h2 className="mb-6 text-balance text-3xl font-bold leading-tight sm:text-4xl">
            {profile.aboutHeadline}
          </h2>
          <p className="max-w-xl text-balance text-base leading-relaxed text-muted sm:text-lg">
            {profile.aboutBody}
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="grid grid-cols-2 gap-6 sm:gap-8">
            {aboutStats.map((stat) => (
              <div key={stat.label} className="border-l-2 border-accent/40 pl-4">
                <p className="font-display text-3xl font-bold text-text sm:text-4xl">{stat.value}</p>
                <p className="mt-1 text-sm text-muted">{stat.label}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
