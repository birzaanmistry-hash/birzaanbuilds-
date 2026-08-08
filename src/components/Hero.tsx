import { motion } from "framer-motion";
import { profile } from "../data/resume";
import { MailIcon, PhoneIcon, PinIcon, ChevronIcon, ChatIcon, DownloadIcon } from "./icons";

export default function Hero() {
  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden pt-24">
      <div
        className="glow-orb left-1/2 top-1/3 h-[36rem] w-[36rem] -translate-x-1/2 bg-accent/20"
        aria-hidden="true"
      />
      <div className="glow-orb -bottom-32 right-0 h-96 w-96 bg-accent/10" aria-hidden="true" />

      <div className="section relative w-full py-0">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-accent"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          Available for Internships · {profile.location}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="text-balance font-serif text-6xl font-medium leading-[0.98] tracking-tight sm:text-7xl md:text-8xl"
        >
          Birzaan
          <br />
          Mistry
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-5 font-display text-xl font-semibold text-text sm:text-2xl"
        >
          Founder,{" "}
          <a
            href={profile.website}
            target="_blank"
            rel="noreferrer"
            className="text-accent underline decoration-accent/50 underline-offset-4 hover:decoration-accent"
          >
            Tasklyn.in
          </a>
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-5 max-w-2xl text-balance text-lg leading-relaxed text-muted sm:text-xl"
        >
          {profile.age}-year-old AI entrepreneur shipping production systems that hand businesses{" "}
          <span className="text-text">back their time</span> — and make their money{" "}
          <span className="text-text">work harder</span>.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-9 flex flex-wrap gap-4"
        >
          <a href="#projects" className="btn-primary">
            View Projects
            <ChevronIcon className="h-4 w-4" />
          </a>
          <a href={profile.whatsapp} target="_blank" rel="noreferrer" className="btn-secondary">
            <ChatIcon className="h-4 w-4" />
            Contact Me
          </a>
          <a href={profile.resumeUrl} download className="btn-outline">
            <DownloadIcon className="h-4 w-4" />
            Download Resume (PDF)
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="mt-12 flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted"
        >
          <a href={`mailto:${profile.email}`} className="flex items-center gap-2 transition-colors hover:text-accent">
            <MailIcon className="h-4 w-4" /> {profile.email}
          </a>
          <a href={profile.whatsapp} target="_blank" rel="noreferrer" className="flex items-center gap-2 transition-colors hover:text-accent">
            <PhoneIcon className="h-4 w-4" /> {profile.phone}
          </a>
          <span className="flex items-center gap-2">
            <PinIcon className="h-4 w-4" /> {profile.location}
          </span>
        </motion.div>
      </div>
    </section>
  );
}
