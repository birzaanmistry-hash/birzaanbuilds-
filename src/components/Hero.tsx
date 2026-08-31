import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { profile } from "../data/resume";
import { useTypewriter } from "../hooks/useTypewriter";
import { MailIcon, PhoneIcon, PinIcon, ChevronIcon, ChatIcon } from "./icons";
import WorkflowCanvas from "./WorkflowCanvas";

const ENTER = {
  hidden: { opacity: 0, y: 22, filter: "blur(6px)" },
  shown: { opacity: 1, y: 0, filter: "blur(0px)" },
};

export default function Hero({ ready }: { ready: boolean }) {
  const tagline = useTypewriter(profile.taglines);
  const sectionRef = useRef<HTMLElement>(null);

  // Content drifts up and dissolves as the hero scrolls away; the graph
  // behind it moves slower, so the two layers separate.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -110]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const canvasY = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const canvasScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden pt-24"
    >
      <motion.div
        style={{ y: canvasY, scale: canvasScale }}
        className="absolute inset-0"
        aria-hidden="true"
      >
        <WorkflowCanvas />
        <div className="glow-orb left-1/2 top-1/3 h-[36rem] w-[36rem] -translate-x-1/2 bg-accent/20" />
        <div className="glow-orb -bottom-32 right-0 h-96 w-96 bg-accent/10" />
        {/* Fade the graph out under the copy so text stays legible,
            while leaving the right half of the canvas clearly visible */}
        <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/70 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-bg to-transparent" />
      </motion.div>

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="section relative w-full py-0"
      >
        <motion.div
          initial="hidden"
          animate={ready ? "shown" : "hidden"}
          transition={{ staggerChildren: 0.11, delayChildren: 0.05 }}
        >
          <motion.div
            variants={ENTER}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-accent backdrop-blur-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            Available for Internships · {profile.location}
          </motion.div>

          <h1 className="text-balance font-serif text-6xl font-medium leading-[0.98] tracking-tight sm:text-7xl md:text-8xl">
            {["Birzaan", "Mistry"].map((word, i) => (
              <span key={word} className="block overflow-hidden pb-[0.06em]">
                <motion.span
                  className="block"
                  variants={{ hidden: { y: "108%" }, shown: { y: "0%" } }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: i * 0.06 }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.div
            variants={ENTER}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 h-8 font-display text-xl font-semibold text-accent sm:text-2xl"
          >
            {tagline}
            <span
              className="ml-1 inline-block w-[2px] animate-pulse bg-accent align-middle"
              style={{ height: "1.1em" }}
            />
          </motion.div>

          <motion.p
            variants={ENTER}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 max-w-2xl text-balance text-lg leading-relaxed text-muted sm:text-xl"
          >
            {profile.age}-year-old AI generalist and entrepreneur shipping production systems that hand
            businesses <span className="text-text">back their time</span> — and make their money{" "}
            <span className="text-text">work harder</span>. I also teach students and developers how to
            actually use AI in their day-to-day work.
          </motion.p>

          <motion.div
            variants={ENTER}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mt-9 flex flex-wrap gap-4"
          >
            <a href="#projects" className="btn-primary group">
              View Projects
              <ChevronIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
            </a>
            <a href={profile.whatsapp} target="_blank" rel="noreferrer" className="btn-secondary">
              <ChatIcon className="h-4 w-4" />
              Contact Me
            </a>
          </motion.div>

          <motion.div
            variants={ENTER}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mt-12 flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted"
          >
            <a
              href={`mailto:${profile.email}`}
              className="flex items-center gap-2 transition-colors hover:text-accent"
            >
              <MailIcon className="h-4 w-4" /> {profile.email}
            </a>
            <a
              href={profile.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 transition-colors hover:text-accent"
            >
              <PhoneIcon className="h-4 w-4" /> {profile.phone}
            </a>
            <span className="flex items-center gap-2">
              <PinIcon className="h-4 w-4" /> {profile.location}
            </span>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        style={{ opacity: contentOpacity }}
        className="absolute inset-x-0 bottom-8 flex justify-center"
        aria-hidden="true"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: ready ? 1 : 0 }}
          transition={{ delay: 1.1, duration: 0.6 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-muted/70"
          >
            Scroll
            <span className="h-8 w-px bg-gradient-to-b from-accent to-transparent" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
