import { profile } from "../data/resume";

export default function Footer() {
  return (
    <footer className="section flex flex-col items-start gap-4 py-12 sm:flex-row sm:items-center sm:justify-between">
      <p className="font-mono text-xs text-muted">
        © {new Date().getFullYear()} {profile.name}. Built with Tasklyn.
      </p>
      <div className="flex gap-4 font-mono text-xs">
        <a href={`mailto:${profile.email}`} className="text-muted hover:text-accent">
          Email
        </a>
        <a href={profile.whatsapp} className="text-muted hover:text-accent" target="_blank" rel="noreferrer">
          WhatsApp
        </a>
        <a href={profile.website} className="text-muted hover:text-accent" target="_blank" rel="noreferrer">
          tasklyn.in
        </a>
      </div>
    </footer>
  );
}
