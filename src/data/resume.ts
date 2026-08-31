export const profile = {
  name: "Birzaan Mistry",
  taglines: [
    "AI Generalist",
    "AI Consultant",
    "AI Workflow Builder",
    "AI Educator",
    "Founder, Tasklyn.in",
  ],
  age: 18,
  location: "Mumbai, India",
  email: "birzaanmistry@gmail.com",
  phone: "+91 9930226026",
  whatsapp: "https://wa.me/919930226026",
  website: "https://tasklyn.in",
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
      "Performance Marketing",
      "Paid Ads (Meta & Google)",
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
    tag: "AI Agent · Automotive",
    title: "WhatsApp AI Parts Ordering Agent",
    description:
      "Conversational WhatsApp agent that lets workshops order spare parts in natural language and routes orders straight to the distributor.",
    stat: "80%",
    statCaption: "Of orders fully automated",
    detail:
      "Built for production — handles edge cases, logs every run, and pages me on failure. Designed to drop into an existing team's stack with zero overhead.",
    tools: ["n8n", "WhatsApp Cloud API", "OpenAI", "Airtable"],
  },
  {
    tag: "Voice AI · Healthcare",
    title: "AI Dental Receptionist",
    description:
      "24/7 voice agent that books, reschedules, and confirms dental appointments — handing structured data straight to the clinic's calendar.",
    stat: "24/7",
    statCaption: "Front-desk coverage",
    detail:
      "Live in production — captures every call, syncs instantly to the calendar, and escalates anything it can't resolve straight to the front desk.",
    tools: ["Voice AI", "OpenAI", "Google Calendar", "Twilio"],
  },
  {
    tag: "Sales Automation · B2B",
    title: "Lead Qualification & CRM Auto-Enrichment",
    description:
      "Enriches every inbound lead via Apollo.io, scores it by company size and intent, and pushes it into the CRM with a personalized intro email already sent.",
    stat: "<60s",
    statCaption: "From new lead to CRM",
    detail:
      "Runs unattended — deduplicates against existing records, logs enrichment confidence, and flags anything ambiguous for manual review.",
    tools: ["n8n", "Apollo.io", "HubSpot CRM", "OpenAI"],
  },
  {
    tag: "Content Ops · Marketing",
    title: "AI Social Media Content Engine",
    description:
      "Turns a single topic into a week of on-brand posts, routes them through Telegram for approval, and auto-schedules the finals to Buffer.",
    stat: "3 min",
    statCaption: "For a full week of content",
    detail:
      "In active use by two clients — every post is versioned, approvals are logged, and nothing publishes without a human sign-off.",
    tools: ["n8n", "GPT-4", "Telegram", "Buffer"],
  },
  {
    tag: "CRM Ops · D2C E-commerce",
    title: "D2C Delivery Confidence & Retention Engine",
    description:
      "Tracks every D2C order from dispatch to doorstep inside one CRM, proactively resolving delivery anxiety before it turns into a support ticket.",
    stat: "End-to-end",
    statCaption: "Dispatch to repeat order, automated",
    detail:
      "Built around the CRM the team already runs on — triggers post-delivery retention flows automatically and needs zero manual follow-up.",
    tools: ["n8n", "CRM", "WhatsApp API", "Shipping APIs"],
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
    name: "AI Education",
    role: "Instructor",
    period: "Ongoing",
    description:
      "Teaching students and developers how to actually use AI in their day-to-day work — practical workflows and tools, not just theory. Across n8n, LLM integrations, and AI agent building.",
  },
  {
    name: "Performance Marketing",
    role: "Media Buyer",
    period: "Active",
    description:
      "Running paid ad campaigns for gyms — including Midtown Fitness, a fitness franchise — and multiple perfume brands. Creative, targeting, and spend optimization across Meta & Google Ads.",
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
