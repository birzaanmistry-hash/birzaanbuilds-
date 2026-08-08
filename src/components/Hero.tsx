import { profile } from "../data/resume";

export default function Hero() {
  return (
    <header className="section flex min-h-[70vh] flex-col justify-center border-b border-border">
      <p className="mb-4 font-mono text-sm text-accent">
        {profile.age}-year-old founder · {profile.location}
      </p>
      <h1 className="text-4xl font-bold tracking-tight md:text-6xl">{profile.name}</h1>
      <p className="mt-4 font-mono text-base text-muted md:text-lg">{profile.tagline}</p>

      <div className="mt-8 flex flex-wrap gap-3 font-mono text-sm">
        <a href={`mailto:${profile.email}`} className="pill hover:border-accent hover:text-white">
          {profile.email}
        </a>
        <a href={profile.whatsapp} className="pill hover:border-accent hover:text-white" target="_blank" rel="noreferrer">
          {profile.phone}
        </a>
        <a href={profile.website} className="pill hover:border-accent hover:text-white" target="_blank" rel="noreferrer">
          tasklyn.in
        </a>
      </div>
    </header>
  );
}
