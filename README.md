# Birzaan Mistry — Portfolio

Personal resume/landing site for Birzaan Mistry — AI Workflow Builder, Business Developer, and founder of [Tasklyn.in](https://tasklyn.in).

Built with React + TypeScript + Vite + Tailwind CSS.

## Local development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview   # preview the production build locally
```

Output is a fully static site in `dist/` — no server/runtime required.

## Deploying to Vercel

1. Push this repo to GitHub (already done if you're reading this from the repo).
2. Go to [vercel.com/new](https://vercel.com/new) and import the GitHub repo.
3. Vercel auto-detects Vite via `vercel.json` — Build Command `npm run build`, Output Directory `dist`. No env vars needed.
4. Click **Deploy**.

Or via CLI:

```bash
npm i -g vercel
vercel login
vercel --prod
```

## Connecting the domain (birzaanmistry.in via GoDaddy)

This is the part that failed before, so follow it exactly. In Vercel: **Project → Settings → Domains → Add** `birzaanmistry.in`. Vercel will show you the DNS records it needs. Then in GoDaddy:

1. **Turn off GoDaddy domain forwarding first.** GoDaddy → *My Products* → your domain → **DNS** → check for a "Forwarding" section. If forwarding is set up, it silently overrides your DNS records and Vercel will never verify. Delete/disable it.
2. **Keep GoDaddy as your DNS host** (simplest — don't switch nameservers) and add these records in GoDaddy's DNS Management, replacing/removing any existing `A` or `CNAME` record on the same host that conflicts:
   - Type `A`, Name `@`, Value `76.76.21.21`, TTL 600 (this is Vercel's anycast IP — Vercel's UI will confirm the exact value when you add the domain, use whatever it shows you)
   - Type `CNAME`, Name `www`, Value `cname.vercel-dns.com`, TTL 600
3. Remove GoDaddy's default parked-domain `A` record pointing at GoDaddy's parking page if one exists — that's the most common reason verification silently fails.
4. Save, then go back to Vercel and click **Refresh** on the domain — DNS usually propagates in minutes, but can take up to a few hours. Vercel auto-issues an SSL certificate once it verifies.
5. Set `birzaanmistry.in` as the **Production Domain** in Vercel and add `www.birzaanmistry.in` as a redirect to it (or vice versa).

If Vercel still shows "Invalid Configuration" after DNS looks correct, double check there isn't a second conflicting `A`/`AAAA`/`CNAME` record on `@` — GoDaddy sometimes keeps a stale one from the default parking setup even after you add the new one.
