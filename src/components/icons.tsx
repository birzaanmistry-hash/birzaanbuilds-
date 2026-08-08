type IconProps = { className?: string };

const base = "stroke-current fill-none";

export function MailIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" strokeWidth={1.75} className={`${base} ${className ?? ""}`}>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m4 7 8 6 8-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function PhoneIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" strokeWidth={1.75} className={`${base} ${className ?? ""}`}>
      <path
        d="M6.5 3.5h3l1.5 4-2 1.5a12 12 0 0 0 6 6l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A17 17 0 0 1 4.5 5.7a2 2 0 0 1 2-2.2Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function WhatsAppIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" strokeWidth={1.75} className={`${base} ${className ?? ""}`}>
      <path
        d="M7 18.5 3.5 20l1.5-3.5A8 8 0 1 1 12 20a8 8 0 0 1-5-1.5Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 9.5c0 3 2.5 5.5 5.5 5.5.6 0 1-.4.9-1l-.3-1.2-1.7-.6-1 .9a5 5 0 0 1-2.5-2.5l.9-1-.6-1.7L9.2 8c-.6 0-.2.5-.2 1.5Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PinIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" strokeWidth={1.75} className={`${base} ${className ?? ""}`}>
      <path d="M12 21s7-6.5 7-11.5a7 7 0 1 0-14 0C5 14.5 12 21 12 21Z" strokeLinejoin="round" />
      <circle cx="12" cy="9.5" r="2.25" />
    </svg>
  );
}

export function ChevronIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" strokeWidth={2} className={`${base} ${className ?? ""}`}>
      <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function MenuIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" strokeWidth={1.75} className={`${base} ${className ?? ""}`}>
      <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
    </svg>
  );
}

export function CloseIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" strokeWidth={1.75} className={`${base} ${className ?? ""}`}>
      <path d="m6 6 12 12M18 6 6 18" strokeLinecap="round" />
    </svg>
  );
}

export function MedalIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" strokeWidth={1.6} className={`${base} ${className ?? ""}`}>
      <path d="M8 3 6 9m10-6 2 6" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="14" r="6.5" />
      <path d="M12 10.5 13 13h2.4l-1.9 1.5.7 2.4L12 15.4 10 17l.7-2.5L8.8 13h2.3Z" strokeLinejoin="round" />
    </svg>
  );
}

export function BallIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" strokeWidth={1.6} className={`${base} ${className ?? ""}`}>
      <circle cx="12" cy="12" r="8.5" />
      <path
        d="M12 8.3 15 10.5l-1.1 3.5H10L9 10.5ZM12 8.3V4.5M13.9 14 17 16.5M10 14 7 16.5M9 10.5 4.8 9.3M15 10.5l4.2-1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function BoltIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" strokeWidth={1.6} className={`${base} ${className ?? ""}`}>
      <path d="M13 3 5 13.5h5.5L11 21l8-10.5h-5.5Z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
