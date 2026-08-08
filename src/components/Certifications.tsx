import { certifications, education } from "../data/resume";
import Reveal from "./Reveal";

export default function Certifications() {
  return (
    <section className="section border-t border-border">
      <div className="grid gap-12 sm:grid-cols-2">
        <Reveal>
          <p className="eyebrow">Certifications</p>
          <div className="grid gap-4">
            {certifications.map((cert) => (
              <div key={cert.name} className="flex items-center justify-between gap-4 border-b border-border pb-3">
                <span className="text-sm font-medium text-text">{cert.name}</span>
                <span
                  className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                    cert.status === "Completed"
                      ? "bg-accent-soft text-accent"
                      : "border border-border text-muted"
                  }`}
                >
                  {cert.status}
                </span>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="eyebrow">Education</p>
          <div className="grid gap-4">
            {education.map((edu) => (
              <div key={edu.degree} className="border-b border-border pb-3">
                <p className="text-sm font-medium text-text">{edu.degree}</p>
                <p className="text-sm text-muted">{edu.location}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
