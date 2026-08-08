import { profile } from "../data/resume";

export default function About() {
  return (
    <section id="about" className="section border-b border-border">
      <h2 className="section-heading">Summary</h2>
      <p className="max-w-3xl text-lg leading-relaxed text-white/90">{profile.summary}</p>
    </section>
  );
}
