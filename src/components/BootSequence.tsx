import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Node = {
  x: number;
  y: number;
  r: number;
  born: number; // ms into the sequence when this node appears
  ring: number;
};

type Edge = {
  from: number;
  to: number;
  born: number;
};

const LINES = [
  { t: 120, text: "initializing workflow engine" },
  { t: 620, text: "connecting agents · n8n · openai · whatsapp" },
  { t: 1180, text: "5 systems online" },
];

const GROW_END = 1350;
const SURGE_AT = 1400;
const EXIT_AT = 2050;
const DONE_AT = 2750;

/**
 * Cinematic open: a single node seeds a network that grows outward, floods
 * with data on a surge, then rushes past the viewer to drop you into the site.
 * Plays once per session; skipped entirely for reduced-motion users.
 */
export default function BootSequence({ onDone }: { onDone: () => void }) {
  const [visible, setVisible] = useState(true);
  const [exiting, setExiting] = useState(false);
  const [lineCount, setLineCount] = useState(0);
  const [pct, setPct] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const finished = useRef(false);

  const finish = useCallback(() => {
    if (finished.current) return;
    finished.current = true;
    setVisible(false);
    document.body.style.overflow = "";
    onDone();
  }, [onDone]);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let seen = false;
    try {
      seen = sessionStorage.getItem("bm_booted") === "1";
    } catch {
      seen = false;
    }

    if (reduceMotion || seen) {
      finished.current = true;
      setVisible(false);
      onDone();
      return;
    }

    try {
      sessionStorage.setItem("bm_booted", "1");
    } catch {
      /* private mode — it simply plays again next visit */
    }

    document.body.style.overflow = "hidden";

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    let raf = 0;
    const timers: number[] = [];

    if (canvas && ctx) {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const W = rect.width;
      const H = rect.height;
      canvas.width = Math.floor(W * dpr);
      canvas.height = Math.floor(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const cx = W / 2;
      const cy = H / 2;

      // Seed node, then three rings growing outward from it.
      const nodes: Node[] = [{ x: cx, y: cy, r: 3.4, born: 0, ring: 0 }];
      const ringSpec = [
        { count: 6, radius: Math.min(W, H) * 0.17, born: 380 },
        { count: 11, radius: Math.min(W, H) * 0.32, born: 700 },
        { count: 16, radius: Math.min(W, H) * 0.48, born: 1000 },
      ];

      ringSpec.forEach((spec, ri) => {
        for (let i = 0; i < spec.count; i++) {
          const angle = (i / spec.count) * Math.PI * 2 + ri * 0.5;
          const jitter = 0.86 + Math.random() * 0.28;
          nodes.push({
            x: cx + Math.cos(angle) * spec.radius * jitter * (W / H > 1.3 ? 1.55 : 1),
            y: cy + Math.sin(angle) * spec.radius * jitter,
            r: Math.random() * 1.4 + 1.5,
            born: spec.born + (i / spec.count) * 260,
            ring: ri + 1,
          });
        }
      });

      // Each node wires back toward the centre of the network.
      const edges: Edge[] = [];
      nodes.forEach((node, i) => {
        if (i === 0) return;
        let best = 0;
        let bestD = Infinity;
        nodes.forEach((other, j) => {
          if (j === i || other.ring >= node.ring) return;
          const d = Math.hypot(other.x - node.x, other.y - node.y);
          if (d < bestD) {
            bestD = d;
            best = j;
          }
        });
        edges.push({ from: best, to: i, born: node.born + 60 });
      });

      const start = performance.now();

      const frame = (now: number) => {
        const el = now - start;
        ctx.clearRect(0, 0, W, H);

        const surge = el >= SURGE_AT ? Math.min((el - SURGE_AT) / 520, 1) : 0;

        // Bloom flash from the centre on the surge
        if (surge > 0) {
          const bloomR = Math.max(W, H) * surge * 0.85;
          const bloom = ctx.createRadialGradient(cx, cy, 0, cx, cy, bloomR);
          const fade = 1 - surge;
          bloom.addColorStop(0, `rgba(61, 127, 255, ${0.20 * fade})`);
          bloom.addColorStop(0.55, `rgba(61, 127, 255, ${0.07 * fade})`);
          bloom.addColorStop(1, "rgba(61, 127, 255, 0)");
          ctx.fillStyle = bloom;
          ctx.fillRect(0, 0, W, H);
        }

        // Edges draw themselves outward from the parent node
        edges.forEach((edge) => {
          const a = nodes[edge.from];
          const b = nodes[edge.to];
          const p = Math.max(0, Math.min((el - edge.born) / 340, 1));
          if (p <= 0) return;

          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(a.x + (b.x - a.x) * p, a.y + (b.y - a.y) * p);
          ctx.strokeStyle = `rgba(61, 127, 255, ${0.16 + surge * 0.34})`;
          ctx.lineWidth = 1;
          ctx.stroke();

          // On the surge, a packet rips down every edge at once
          if (surge > 0 && p === 1) {
            const t = Math.min(surge * 1.35, 1);
            const px = a.x + (b.x - a.x) * t;
            const py = a.y + (b.y - a.y) * t;
            const trail = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
            trail.addColorStop(Math.max(0, t - 0.4), "rgba(61,127,255,0)");
            trail.addColorStop(t, "rgba(150, 200, 255, 0.95)");
            trail.addColorStop(Math.min(1, t + 0.01), "rgba(61,127,255,0)");
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = trail;
            ctx.lineWidth = 2.2;
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(px, py, 2.6, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(200, 228, 255, 1)";
            ctx.fill();
          }
        });

        // Nodes pop in with an expanding ring
        nodes.forEach((node) => {
          const age = el - node.born;
          if (age < 0) return;
          const pop = Math.min(age / 320, 1);
          const ease = 1 - Math.pow(1 - pop, 3);

          if (pop < 1) {
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.r + (1 - pop) * 26, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(61, 127, 255, ${0.5 * (1 - pop)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }

          const glowR = node.r * (7 + surge * 6);
          const glow = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, glowR);
          glow.addColorStop(0, `rgba(61, 127, 255, ${(0.3 + surge * 0.4) * ease})`);
          glow.addColorStop(1, "rgba(61, 127, 255, 0)");
          ctx.beginPath();
          ctx.arc(node.x, node.y, glowR, 0, Math.PI * 2);
          ctx.fillStyle = glow;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(node.x, node.y, node.r * ease, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(200, 226, 255, ${(0.7 + surge * 0.3) * ease})`;
          ctx.fill();
        });

        setPct(Math.min(Math.round((el / GROW_END) * 100), 100));

        if (el < DONE_AT) raf = requestAnimationFrame(frame);
      };

      raf = requestAnimationFrame(frame);
    }

    LINES.forEach((line, i) => {
      timers.push(window.setTimeout(() => setLineCount(i + 1), line.t));
    });
    timers.push(window.setTimeout(() => setExiting(true), EXIT_AT));
    timers.push(window.setTimeout(finish, DONE_AT));

    return () => {
      cancelAnimationFrame(raf);
      timers.forEach(clearTimeout);
      document.body.style.overflow = "";
    };
  }, [finish, onDone]);

  // Let people bail out of the intro immediately.
  useEffect(() => {
    if (!visible) return;
    const skip = () => {
      setExiting(true);
      window.setTimeout(finish, 420);
    };
    window.addEventListener("keydown", skip);
    window.addEventListener("pointerdown", skip);
    return () => {
      window.removeEventListener("keydown", skip);
      window.removeEventListener("pointerdown", skip);
    };
  }, [visible, finish]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] overflow-hidden bg-bg"
          animate={exiting ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
        >
          {/* The network rushes past the viewer on the way out */}
          <motion.div
            className="absolute inset-0"
            animate={exiting ? { scale: 3.4, filter: "blur(7px)" } : { scale: 1 }}
            transition={{ duration: 0.7, ease: [0.7, 0, 0.3, 1] }}
          >
            <canvas ref={canvasRef} className="h-full w-full" aria-hidden="true" />
          </motion.div>

          <motion.div
            animate={exiting ? { opacity: 0, y: -14 } : { opacity: 1 }}
            transition={{ duration: 0.35 }}
            className="absolute inset-x-0 bottom-14 px-8 sm:bottom-16 sm:px-14"
          >
            <div className="mx-auto max-w-content font-mono text-[11px] sm:text-xs">
              {LINES.slice(0, lineCount).map((line, i) => (
                <motion.p
                  key={line.text}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25 }}
                  className="mb-1.5 text-muted"
                >
                  <span className="mr-2 text-accent">›</span>
                  {line.text}
                  {i === lineCount - 1 && (
                    <span className="caret ml-1 inline-block h-3 w-[7px] translate-y-[1px] bg-accent" />
                  )}
                </motion.p>
              ))}

              <div className="mt-5 flex items-center gap-4">
                <div className="h-px flex-1 bg-border">
                  <motion.div
                    className="h-px bg-accent"
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.15 }}
                  />
                </div>
                <span className="w-10 shrink-0 text-right tabular-nums text-accent">{pct}%</span>
              </div>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: exiting ? 0 : 0.45 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="absolute inset-x-0 top-8 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-muted"
          >
            Click to skip
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
