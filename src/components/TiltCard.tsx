import { useRef, useState } from "react";
import type { ReactNode } from "react";

/**
 * Pointer-reactive card: subtle 3D tilt plus a light that tracks the cursor.
 * Falls back to a plain container for touch and reduced-motion users.
 */
export default function TiltCard({
  children,
  className,
  onClick,
  active,
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  active?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});
  const [glow, setGlow] = useState({ x: 50, y: 50, on: false });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(hover: none)").matches) return;

    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rotateY = (px - 0.5) * 7;
    const rotateX = (0.5 - py) * 7;

    setStyle({
      transform: `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(0)`,
    });
    setGlow({ x: px * 100, y: py * 100, on: true });
  };

  const handleLeave = () => {
    setStyle({ transform: "perspective(900px) rotateX(0deg) rotateY(0deg)" });
    setGlow((g) => ({ ...g, on: false }));
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onClick={onClick}
      style={{ ...style, transition: "transform 350ms cubic-bezier(0.22, 1, 0.36, 1)" }}
      className={`relative ${className ?? ""}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300"
        style={{
          opacity: glow.on ? 1 : 0,
          background: `radial-gradient(420px circle at ${glow.x}% ${glow.y}%, rgba(61,127,255,0.10), transparent 42%)`,
        }}
      />
      {active && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -inset-px rounded-2xl border border-accent/50"
        />
      )}
      {children}
    </div>
  );
}
