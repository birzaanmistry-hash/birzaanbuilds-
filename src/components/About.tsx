import { profile } from "../data/resume";
import Reveal from "./Reveal";

export default function About() {
  return (
    <section id="about" className="section border-t border-border">
      <Reveal>
        <p className="eyebrow">About</p>
        <p className="max-w-3xl text-balance text-2xl font-medium leading-relaxed text-text sm:text-3xl">
          {profile.summary}
        </p>
      </Reveal>
    </section>
  );
}
