import { profile } from "../data/resume";
import Reveal from "./Reveal";
import { MailIcon, PhoneIcon, WhatsAppIcon } from "./icons";

export default function Footer() {
  return (
    <footer id="contact" className="relative overflow-hidden border-t border-border">
      <div className="glow-orb left-1/2 top-0 h-80 w-80 -translate-x-1/2 bg-accent/15" aria-hidden="true" />

      <div className="section relative text-center">
        <Reveal className="mx-auto max-w-2xl">
          <p className="eyebrow mx-auto justify-center before:hidden after:content-[''] after:h-px after:w-8 after:bg-accent">
            Get In Touch
          </p>
          <h2 className="mb-6 text-balance text-3xl font-bold sm:text-4xl">
            Open to internship opportunities — let&apos;s talk.
          </h2>

          <div className="mb-10 flex flex-wrap items-center justify-center gap-4">
            <a href={profile.whatsapp} target="_blank" rel="noreferrer" className="btn-primary">
              Message on WhatsApp
            </a>
            <a href={`mailto:${profile.email}`} className="btn-secondary">
              Email Me
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-muted">
            <a href={`mailto:${profile.email}`} className="flex items-center gap-2 transition-colors hover:text-accent">
              <MailIcon className="h-4 w-4" /> {profile.email}
            </a>
            <a href={profile.whatsapp} target="_blank" rel="noreferrer" className="flex items-center gap-2 transition-colors hover:text-accent">
              <PhoneIcon className="h-4 w-4" /> {profile.phone}
            </a>
            <a href={profile.website} target="_blank" rel="noreferrer" className="flex items-center gap-2 transition-colors hover:text-accent">
              <WhatsAppIcon className="h-4 w-4" /> tasklyn.in
            </a>
          </div>
        </Reveal>

        <p className="mt-16 text-xs text-muted">
          © {new Date().getFullYear()} {profile.name}
        </p>
      </div>
    </footer>
  );
}
