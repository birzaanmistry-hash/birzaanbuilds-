export const profile = {
  name: "Birzaan Mistry",
  taglines: ["AI Workflow Builder", "Business Developer", "Founder, Tasklyn.in"],
  age: 18,
  location: "Mumbai, India",
  email: "birzaanmistry@gmail.com",
  phone: "+91 9930226026",
  whatsapp: "https://wa.me/919930226026",
  website: "https://tasklyn.in",
  oneLiner:
    "I build production AI systems that save real businesses real time and real money — not vague automations, but tools with a UI clients actually use.",
};

export const skills = [
  {
    category: "AI & Automation",
    items: [
      "n8n Workflow Design",
      "AI Agent Architecture",
      "LLM Integration",
      "WhatsApp AI Bots",
      "Webhook Automation",
      "API Integration",
    ],
  },
  {
    category: "Business",
    items: [
      "Business Development",
      "Sales",
      "Cold Calling",
      "Client Acquisition",
      "Operations",
      "Negotiation",
    ],
  },
  {
    category: "Tech",
    items: [
      "Web Design",
      "Web Development",
      "HTML/CSS",
      "No-Code Tools",
      "Google Sheets Automation",
    ],
  },
  {
    category: "Soft Skills",
    items: ["Leadership", "Public Speaking", "Persuasion", "Event Management"],
  },
];

export const projects = [
  {
    title: "WhatsApp AI Parts Ordering Agent",
    type: "AI Agent | Automotive",
    metric: "3–5 hrs saved / day",
    description:
      "An AI agent on WhatsApp that identifies auto parts from natural language, checks live inventory via API, and returns pricing & availability. Handles 80% of inquiries without a human.",
    tools: ["n8n", "WhatsApp API", "GPT-4", "Google Sheets", "REST APIs"],
  },
  {
    title: "AI Dental Receptionist",
    type: "AI Agent | Healthcare",
    metric: "24/7 coverage",
    description:
      "A 24/7 AI receptionist for dental clinics handling WhatsApp & website chat — books appointments, answers FAQs, syncs to Google Calendar, and cuts no-shows with automated reminders.",
    tools: ["n8n", "OpenAI", "WhatsApp API", "Google Calendar", "Twilio"],
  },
  {
    title: "Lead Qualification & CRM Auto-Enrichment",
    type: "Sales Automation",
    metric: "20 min → 0 min",
    description:
      "Auto-enriches leads via Apollo.io, scores them by company size & intent, adds them to the CRM, and sends a personalized intro email — all in under 60 seconds per lead.",
    tools: ["n8n", "Apollo.io", "HubSpot CRM", "OpenAI", "Slack", "Gmail"],
  },
  {
    title: "AI Social Media Content Engine",
    type: "Marketing Automation",
    metric: "7 days in 3 min",
    description:
      "GPT-4 turns a single topic into a week of posts, routes them through Telegram for approval, and auto-schedules to Buffer. Currently running for 2 active clients.",
    tools: ["n8n", "GPT-4", "Telegram", "Buffer", "Google Sheets"],
  },
  {
    title: "Real Estate Video-to-CRM Pipeline",
    type: "AI Data Extraction",
    metric: "45 min → 2 min",
    description:
      "Transcribes a walkthrough video via Whisper, extracts structured property and investor data with GPT-4, and auto-populates the CRM — no manual data entry.",
    tools: ["n8n", "Whisper", "GPT-4", "HubSpot", "Google Drive"],
  },
];

export const ventures = [
  {
    name: "Tasklyn.in",
    role: "Founder",
    period: "Nov 2025 — Active",
    description:
      "Building AI agents and automated systems for businesses. Solo bootstrapped — product development, client acquisition, web hosting, and sales.",
  },
  {
    name: "Galaxia Enterprises",
    role: "Co-Founder",
    period: "2023 — 2024",
    description:
      "Co-founded and managed business development, client negotiations, and end-to-end operations.",
  },
];

export const achievements = [
  {
    icon: "medal",
    label: "Boxing",
    stat: "State-Level Silver",
    detail: "10+ district & state victories, Maharashtra",
  },
  {
    icon: "ball",
    label: "Football",
    stat: "National Trials",
    detail: "Selected for National Football Trials, 2023",
  },
  {
    icon: "bolt",
    label: "Sprinting",
    stat: "100m & 200m",
    detail: "Competitive track athlete",
  },
];

export const certifications = [
  { name: "AI Advanced Bootcamp, Outskill", status: "Completed" },
  { name: "HubSpot Sales Training", status: "In Progress" },
  { name: "Agentic AI Mastery Program, Haus Of Intelligence", status: "In Progress" },
];

export const education = [{ degree: "Grade 12 Commerce", location: "Mumbai, India" }];

export const nav = [
  { label: "Home", href: "#home" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Ventures", href: "#ventures" },
  { label: "Contact", href: "#contact" },
];
