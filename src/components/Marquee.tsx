const STACK = [
  "n8n",
  "OpenAI",
  "GPT-4",
  "WhatsApp Cloud API",
  "HubSpot CRM",
  "Apollo.io",
  "Twilio",
  "Google Calendar",
  "Airtable",
  "Buffer",
  "Telegram",
  "Meta Ads",
  "Google Ads",
  "Whisper",
  "Webhooks",
  "REST APIs",
];

/**
 * Continuous tech-stack ticker. The list is rendered twice so the loop
 * has no visible seam.
 */
export default function Marquee() {
  return (
    <div className="marquee relative overflow-hidden border-y border-border/60 py-4">
      <div className="marquee-track flex w-max gap-10">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center gap-10" aria-hidden={copy === 1}>
            {STACK.map((item) => (
              <span
                key={`${copy}-${item}`}
                className="flex items-center gap-10 whitespace-nowrap font-mono text-xs uppercase tracking-[0.2em] text-muted/70"
              >
                {item}
                <span className="h-1 w-1 rounded-full bg-accent/50" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
