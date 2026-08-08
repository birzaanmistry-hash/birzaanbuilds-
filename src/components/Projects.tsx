import { projects } from "../data/resume";

export default function Projects() {
  return (
    <section id="projects" className="section border-b border-border">
      <h2 className="section-heading">AI Workflows — Deployed Projects</h2>
      <div className="grid gap-5">
        {projects.map((project) => (
          <div key={project.title} className="card">
            <div className="mb-2 flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-lg font-semibold text-white">{project.title}</h3>
              <span className="font-mono text-xs text-accent">{project.type}</span>
            </div>
            <p className="mb-3 text-sm leading-relaxed text-white/80">{project.description}</p>
            <div className="flex flex-wrap gap-2">
              {project.tools.map((tool) => (
                <span key={tool} className="pill text-[11px]">
                  {tool}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
