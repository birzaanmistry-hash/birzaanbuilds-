import { useEffect, useRef } from "react";

type Node = {
  x: number;
  y: number;
  r: number;
  pulse: number;
  pulseSpeed: number;
};

type Edge = {
  from: number;
  to: number;
  packets: number[];
  speed: number;
};

/**
 * Animated workflow graph — nodes wired together with data packets travelling
 * the edges. Rendered on canvas so it stays cheap at full-bleed size.
 */
export default function WorkflowCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let nodes: Node[] = [];
    let edges: Edge[] = [];
    let raf = 0;

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Lay nodes out on a loose grid, jittered so it reads organic, not mechanical.
      const cols = width < 640 ? 3 : width < 1100 ? 4 : 6;
      const rows = width < 640 ? 4 : 4;
      const cellW = width / cols;
      const cellH = height / rows;

      nodes = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const jitterX = (Math.random() - 0.5) * cellW * 0.55;
          const jitterY = (Math.random() - 0.5) * cellH * 0.55;
          nodes.push({
            x: cellW * (c + 0.5) + jitterX,
            y: cellH * (r + 0.5) + jitterY,
            r: Math.random() * 1.6 + 1.4,
            pulse: Math.random() * Math.PI * 2,
            pulseSpeed: Math.random() * 0.012 + 0.006,
          });
        }
      }

      // Wire each node forward to a couple of near neighbours.
      edges = [];
      nodes.forEach((node, i) => {
        const neighbours = nodes
          .map((other, j) => ({ j, d: Math.hypot(other.x - node.x, other.y - node.y) }))
          .filter((n) => n.j !== i && n.d < Math.max(cellW, cellH) * 1.5)
          .sort((a, b) => a.d - b.d)
          .slice(0, 2);

        neighbours.forEach(({ j }) => {
          if (edges.some((e) => (e.from === j && e.to === i) || (e.from === i && e.to === j))) return;
          edges.push({
            from: i,
            to: j,
            packets: Math.random() > 0.45 ? [Math.random()] : [],
            speed: Math.random() * 0.0022 + 0.0011,
          });
        });
      });
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Edges
      edges.forEach((edge) => {
        const a = nodes[edge.from];
        const b = nodes[edge.to];
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = "rgba(61, 127, 255, 0.10)";
        ctx.lineWidth = 1;
        ctx.stroke();

        // Data packets travelling the edge
        edge.packets.forEach((t) => {
          const px = a.x + (b.x - a.x) * t;
          const py = a.y + (b.y - a.y) * t;

          const trail = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
          trail.addColorStop(Math.max(0, t - 0.14), "rgba(61, 127, 255, 0)");
          trail.addColorStop(t, "rgba(90, 165, 255, 0.55)");
          trail.addColorStop(Math.min(1, t + 0.01), "rgba(61, 127, 255, 0)");
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = trail;
          ctx.lineWidth = 1.6;
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(px, py, 2.1, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(140, 190, 255, 0.9)";
          ctx.fill();
        });
      });

      // Nodes
      nodes.forEach((node) => {
        const breathe = (Math.sin(node.pulse) + 1) / 2;
        const glow = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.r * 7);
        glow.addColorStop(0, `rgba(61, 127, 255, ${0.20 + breathe * 0.18})`);
        glow.addColorStop(1, "rgba(61, 127, 255, 0)");
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.r * 7, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(180, 210, 255, ${0.45 + breathe * 0.35})`;
        ctx.fill();
      });
    };

    const tick = () => {
      nodes.forEach((n) => {
        n.pulse += n.pulseSpeed;
      });

      edges.forEach((edge) => {
        edge.packets = edge.packets
          .map((t) => t + edge.speed * 16)
          .filter((t) => t <= 1);
        // Occasionally fire a fresh packet so traffic keeps flowing.
        if (edge.packets.length === 0 && Math.random() < 0.004) {
          edge.packets.push(0);
        }
      });

      draw();
      raf = requestAnimationFrame(tick);
    };

    build();
    if (reduceMotion) {
      draw();
    } else {
      raf = requestAnimationFrame(tick);
    }

    const onResize = () => {
      cancelAnimationFrame(raf);
      build();
      if (reduceMotion) draw();
      else raf = requestAnimationFrame(tick);
    };

    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
