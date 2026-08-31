const SKILLS = [
  "AI Workflow Design",
  "Performance Marketing",
  "AI Agent Architecture",
  "Business Development",
  "AI Consulting",
  "Paid Ads · Meta & Google",
  "LLM Integration",
  "CRM Systems",
  "Client Acquisition",
  "Sales & Cold Calling",
  "Automation Architecture",
  "AI Education",
];

/**
 * Statement band of capabilities. Two rows travelling opposite directions so
 * the section reads as motion rather than a small ticker.
 */
export default function Marquee() {
  return (
    <section aria-label="Capabilities" className="relative overflow-hidden border-y border-border py-10">
      <p className="mx-auto mb-6 max-w-content px-6 font-mono text-[10px] uppercase tracking-[0.32em] text-muted/70 sm:px-10">
        What I do
      </p>

      <div className="marquee flex flex-col gap-3">
        <div className="marquee-track flex w-max gap-6">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 items-center gap-6" aria-hidden={copy === 1}>
              {SKILLS.map((skill, i) => (
                <span key={`${copy}-${skill}`} className="flex shrink-0 items-center gap-6">
                  <span
                    className={`whitespace-nowrap font-display text-2xl font-semibold tracking-[-0.02em] transition-colors sm:text-3xl ${
                      i % 3 === 1 ? "text-accent" : "text-text/85"
                    }`}
                  >
                    {skill}
                  </span>
                  <span className="h-1.5 w-1.5 shrink-0 rotate-45 bg-accent/60" />
                </span>
              ))}
            </div>
          ))}
        </div>

        <div className="marquee-track-reverse flex w-max gap-6">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 items-center gap-6" aria-hidden>
              {[...SKILLS].reverse().map((skill, i) => (
                <span key={`r-${copy}-${skill}`} className="flex shrink-0 items-center gap-6">
                  <span
                    className={`whitespace-nowrap font-mono text-sm uppercase tracking-[0.14em] sm:text-base ${
                      i % 3 === 0 ? "text-accent/70" : "text-muted/60"
                    }`}
                  >
                    {skill}
                  </span>
                  <span className="h-px w-6 shrink-0 bg-border" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
