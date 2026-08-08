import { motion } from "framer-motion";
import { profile } from "../data/resume";
import { useTypewriter } from "../hooks/useTypewriter";
import { MailIcon, PhoneIcon, WhatsAppIcon, PinIcon } from "./icons";

export default function Hero() {
  const tagline = useTypewriter(profile.taglines);

  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden pt-24">
      <div
        className="glow-orb left-1/2 top-1/3 h-[36rem] w-[36rem] -translate-x-1/2 bg-accent/20"
        aria-hidden="true"
      />
      <div className="glow-orb -bottom-32 right-0 h-96 w-96 bg-accent/10" aria-hidden="true" />

      <div className="section relative w-full py-0">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="eyebrow"
        >
          {profile.age}-year-old founder · {profile.location}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="text-balance text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl"
        >
          {profile.name}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-4 h-9 font-display text-xl font-semibold text-accent sm:text-2xl"
        >
          {tagline}
          <span className="ml-1 inline-block w-[2px] animate-pulse bg-accent align-middle" style={{ height: "1.1em" }} />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-6 max-w-2xl text-balance font-display text-2xl font-bold leading-snug text-text sm:text-3xl"
        >
          I don&apos;t build automations. I build systems that hand businesses{" "}
          <span className="text-accent">back their time</span> — and make their money{" "}
          <span className="text-accent">work harder</span>.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-8 flex flex-wrap gap-4"
        >
          <a href="#projects" className="btn-primary">
            View Projects
          </a>
          <a href={profile.whatsapp} target="_blank" rel="noreferrer" className="btn-secondary">
            Contact Me
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted"
        >
          <a href={`mailto:${profile.email}`} className="flex items-center gap-2 transition-colors hover:text-accent">
            <MailIcon className="h-4 w-4" /> {profile.email}
          </a>
          <a href={profile.whatsapp} target="_blank" rel="noreferrer" className="flex items-center gap-2 transition-colors hover:text-accent">
            <PhoneIcon className="h-4 w-4" /> {profile.phone}
          </a>
          <a href={profile.whatsapp} target="_blank" rel="noreferrer" className="flex items-center gap-2 transition-colors hover:text-accent">
            <WhatsAppIcon className="h-4 w-4" /> WhatsApp
          </a>
          <span className="flex items-center gap-2">
            <PinIcon className="h-4 w-4" /> {profile.location}
          </span>
        </motion.div>
      </div>
    </section>
  );
}
