export type ExperienceCompany = {
  id: string
  name: string
  href: string
  date: string
  trackingCompany: string
}

export type ExperienceMindsetItem = {
  prefix: string
  emphasis: string
}

export type ExperienceCard = {
  label: string
  heading?: string
  subheading?: string
  company?: ExperienceCompany
  bulletLabel?: string
  bullets?: string[]
  tagLabel?: string
  tags?: string[]
  description?: string
  mindsetLabel?: string
  mindset?: ExperienceMindsetItem[]
  closing?: string
}

export const ExperienceData: ExperienceCard[] = [
  {
    label: "— current role",
    heading: "Frontend Developer",
    subheading: "// full-stack responsibilities",
    company: {
      id: "company-link",
      name: "Softvence Agency",
      href: "https://softvence.agency/",
      date: "May 2025 - Present",
      trackingCompany: "softvence_agency",
    },
    bulletLabel: "— primary / day-to-day duties",
    bullets: [
      "Developing pixel-perfect, responsive websites with React, Tailwind CSS, Next, js, Redux Toolkit, Zustand, or other state management tools.",
      "Writing clean, optimized, and cross-browser-compatible code following W3C standards.",
      "Implementing JavaScript and TypeScript to enhance Ul interactivity.",
      "Converting PSD, Figma, and XD designs into HTML with high accuracy.",
      "Integrated REST APIs and optimized frontend performance and data fetching strategies.",
      "Collaborated with backend and design teams to deliver production-ready features.",
      "Understanding client requirements and effectively managing feedback.",
    ],
    tagLabel: "— current projects",
    tags: [
      "Admin & billing stack",
      "Vendor architecture",
      "Order Tools",
      "High-performance APIs",
    ],
  },
  {
    label: "— freelance experience",
    heading: "Full Stack Developer",
    subheading: "// freelance & client projects",
    company: {
      id: "company-link",
      name: "Self Employed",
      href: "/",
      date: "October 2023 - Present",
      trackingCompany: "self_employed",
    },
    bulletLabel: "— primary / day-to-day duties",
    bullets: [
      "Built and delivered production-ready web applications for clients across e-commerce, SaaS, and enterprise domains.",
      "Designed and developed full-stack applications using React, Next.js, Node.js, Express.js, PostgreSQL, MongoDB, and Prisma.",
      "Architected scalable backend systems with secure REST APIs, authentication, and role-based access control.",
      "Deployed and maintained applications on VPS servers using Docker, Nginx, and CI/CD workflows.",
      "Collaborated directly with clients to gather requirements, provide technical solutions, and deliver production-ready software.",
      "Developed enterprise management systems with multi-role dashboards, workflow automation, and real-time notifications.",
      "Managed the complete software development lifecycle from planning and architecture to deployment and ongoing maintenance.",
    ],
    tagLabel: "— notable work",
    tags: [
      "Enterprise ERP",
      "SaaS Platforms",
      "Docker & VPS",
      "Full-Stack Architecture",
    ],
  },
  {
    label: "— previous role",
    heading: "Junior Developer (MERN)",
    subheading: "// backend & full-stack development",
    company: {
      id: "company-link",
      name: "Core Devs Ltd.",
      href: "https://coredevsltd.com",
      date: "July 2023 - September 2023",
      trackingCompany: "core_devs_ltd",
    },
    bulletLabel: "— primary / day-to-day duties",
    bullets: [
      "Developed scalable backend services using Node.js, Express.js, and MongoDB.",
      "Built secure REST APIs with JWT authentication, OAuth integration, and input validation.",
      "Implemented asynchronous jobs, queues, and WebSocket-based real-time features.",
      "Integrated third-party APIs, payment gateways, and blockchain services.",
      "Optimized database queries, indexing, logging, and error handling to improve application performance.",
      "Collaborated with senior developers to build, test, and maintain production-ready applications.",
      "Followed clean code practices, Git workflows, and agile development processes.",
    ],
    tagLabel: "— key technologies",
    tags: ["Node.js", "Express.js", "MongoDB", "WebSockets"],
  },
]
