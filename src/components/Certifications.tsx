import { certifications, education } from "../data/resume";

export default function Certifications() {
  return (
    <section id="certifications" className="section border-b border-border">
      <div className="grid gap-10 sm:grid-cols-2">
        <div>
          <h2 className="section-heading">Certifications</h2>
          <div className="grid gap-3">
            {certifications.map((cert) => (
              <div key={cert.name} className="flex flex-col">
                <span className="text-sm font-medium text-white">{cert.name}</span>
                <span className="font-mono text-xs text-muted">{cert.period}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="section-heading">Education</h2>
          <div className="grid gap-3">
            {education.map((edu) => (
              <div key={edu.degree} className="flex flex-col">
                <span className="text-sm font-medium text-white">{edu.degree}</span>
                <span className="font-mono text-xs text-muted">{edu.location}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
