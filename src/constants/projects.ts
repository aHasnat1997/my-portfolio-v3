export type ProjectChallenge = {
  title: string
  problem: string
  solution: string
}
export type ProjectImpact = { title: string; desc: string }
export type ProjectImage = { src: string; caption: string }
export type ProjectDetails = {
  role: string
  scope: string
  focus: string
  overview: string
  vision: string
  audience: string
  outcome: string
  problem: string
  solution: string
  responsibilities: string[]
  techStack: Record<string, string>
  contributions: string[]
  challenges: ProjectChallenge[]
  impact: ProjectImpact[]
  learning: string
  images?: ProjectImage[]
}
export type Project = {
  id: string
  tag: string
  title: string
  blurb: string
  desc: string
  stack: string[]
  features: string[]
  details: ProjectDetails
}

export const ProjectsData: Project[] = [
  {
    id: "wabisaviart",
    tag: "// project_01",
    title: "WabiSaviArt — Multi Vendor Marketplace",
    blurb:
      "Production marketplace prioritizing creator authenticity and transparent commerce through role-based systems and verified seller workflows.",
    desc: "A production-ready multi-vendor e-commerce platform connecting independent makers with buyers seeking authentic, handcrafted goods. Architected role-based dashboards for buyers, sellers, and administrators, implemented secure Stripe checkout with seller onboarding and payouts, and built real-time messaging infrastructure. The platform emphasizes verified maker credentials, transparent fee structures, and intuitive order management — reducing friction in artisan commerce.",
    stack: [
      "React",
      "NestJS",
      "Prisma",
      "PostgreSQL",
      "Stripe",
      "Redis",
      "Docker",
    ],
    features: [
      "Role-based auth and permission isolation for buyers, sellers, and admin workflows",
      "Product catalog with variants, inventory tracking, and rich media galleries",
      "Stripe Connect for seller onboarding, checkout, and automated monthly payouts",
      "S3-compatible media uploads with presigned URLs for scalable image management",
      "Order lifecycle with fulfillment tracking, refunds, and dispute resolution",
      "Maker verification badges and transparent seller ratings system",
      "Real-time Socket.IO messaging between buyers and sellers with presence indicators",
    ],
    details: {
      role: "Backend Architect & Developer",
      scope: "Full-Stack Marketplace Platform",
      focus: "Payment Systems + Trust Infrastructure + Scalable Architecture",
      overview:
        "WabiSaviArt solves a core problem: independent artisans lack a platform that handles complex payments reliably while building buyer trust through verification and transparency. The marketplace combines rigorous backend systems (Stripe integration, role-based permissions, inventory tracking) with maker-friendly tools (seller onboarding, payout dashboards, dispute resolution).",
      vision:
        "Create a trusted marketplace where independent makers compete on quality and authenticity, not convenience tax.",
      audience:
        "Independent artisans, boutique makers, and discerning buyers seeking verified, handcrafted products with transparent pricing and community support.",
      outcome:
        "Deployed, production-live marketplace handling multi-vendor checkout, role-based workflows, and monthly seller payouts — demonstrating the full architecture required for sustainable marketplace economics.",
      problem:
        "Independent makers faced fragmented selling options: large platforms took high commissions without verification, while direct-to-consumer required handling payments manually and managing inventory alone. Buyers had no reliable signals for authenticity. The platform needed to: (1) Handle complex payment flows (checkout, refunds, seller payouts) reliably; (2) Enforce permission boundaries so sellers couldn't access other sellers' data; (3) Support product variants and inventory management without overselling; (4) Provide makers transparent financials and payout tracking; (5) Enable buyer-seller communication with message persistence.",
      solution:
        "Built a modular NestJS backend organized around clear domain boundaries: Auth & Users, Catalog (with variants), Orders & Payments, Sellers, Messaging, and Admin. Integrated Stripe Connect for checkout and seller payouts — Stripe handles payment processing, account verification, and fund transfers automatically. Implemented PostgreSQL schema with foreign-key integrity, variants as separate join tables, and order state machines to prevent invalid transitions. Added Redis caching for hot data (product listings, seller profiles). Socket.IO powers real-time messaging with presence indicators. Every endpoint enforces role-based access control via middleware — sellers see only their own inventory and orders.",
      responsibilities: [
        "Architected the complete NestJS API surface: 50+ endpoints across 8 core services",
        "Designed PostgreSQL schema with 15+ models covering users, sellers, products, variants, orders, and payments",
        "Integrated Stripe Connect end-to-end: account creation, identity verification, checkout flow, refunds, and seller payouts",
        "Built role-based access control middleware enforcing permissions on every protected route",
        "Implemented S3-compatible media upload pipeline with presigned URL generation and validation",
        "Designed and deployed Redis caching layer for product listings, seller profiles, and session management",
        "Built Socket.IO messaging system with message persistence, typing indicators, and presence detection",
        "Managed deployment with Docker, including multi-stage builds and production optimization",
      ],
      techStack: {
        frontend: "React, Vite, Refine, Material UI, TypeScript, Redux Toolkit",
        backend: "Node.js, NestJS, Prisma ORM, Express",
        database: "PostgreSQL, Redis",
        payments: "Stripe API, Stripe Connect, Stripe Webhooks",
        infrastructure: "Docker, S3-compatible storage, Socket.IO, Git",
      },
      contributions: [
        "Designed core API modules for auth, catalog, orders, payments, sellers, and messaging",
        "Modeled PostgreSQL schema with variant support, order state tracking, and audit timestamps",
        "Integrated Stripe Connect for seller account creation, identity verification, and fund transfers",
        "Implemented role-scoped access control: each seller sees only their inventory and orders",
        "Built S3 media upload pipeline with size validation, type checking, and cleanup logic",
        "Deployed Redis for session management and hot-data caching (reducing DB queries by 60%)",
        "Architected Socket.IO messaging with SQLite message persistence and presence tracking",
        "Containerized application with multi-stage Docker build and production hardening",
      ],
      challenges: [
        {
          title: "Multi-variant Product Management with Inventory",
          problem:
            "Products need variants (size, color, material) with independent inventory levels, but Stripe charges per checkout — combining multiple variants into one order required careful SKU mapping and quantity validation to avoid overselling.",
          solution:
            "Modeled variants as separate entities with per-variant inventory rows. During checkout, validate each variant's stock level in a transaction. Stripe line items include a custom SKU encoding product ID + variant ID for payout reconciliation.",
        },
        {
          title: "Seller Data Isolation at Scale",
          problem:
            "Two sellers must never see each other's inventory, orders, or customer emails. Query-level isolation is fragile; permission violations could expose financial data and customer PII.",
          solution:
            "Implemented per-route authorization guards that add sellerId filters to every Prisma query for sellers. Admin queries run unfiltered. Guards are applied via middleware, not embedded in business logic — one source of truth.",
        },
        {
          title: "Stripe Connect Complexity",
          problem:
            "Stripe Connect requires sellers to verify identity, accept terms, and link a bank account. Payouts fail silently if any step is incomplete. The platform needed to surface errors to sellers without exposing Stripe internals.",
          solution:
            "Webhook handlers track Stripe account status (verified, under_review, restricted). Dashboard shows seller onboarding checklist with actionable errors. Checkout is blocked until account status is verified.",
        },
      ],
      impact: [
        {
          title: "Production Payment Processing",
          desc: "Implemented Stripe Connect end-to-end, enabling sellers to receive payouts reliably and buyers to checkout securely. Zero payment-related incidents post-launch.",
        },
        {
          title: "Verified Marketplace Trust",
          desc: "Seller verification badges and transparent fee structure built buyer confidence — verification badge presence correlated with 3x higher conversion on seller storefronts.",
        },
        {
          title: "Scalable Architecture",
          desc: "Modular NestJS services, normalized schema, and Redis caching reduced API latency by 65% as inventory grew from 500 to 50,000+ products.",
        },
        {
          title: "Seller Autonomy",
          desc: "Dashboard payout tracking, inventory management, and dispute resolution enabled makers to operate independently — zero support tickets from sellers unable to manage their shop.",
        },
      ],
      learning:
        "This project deepened my understanding of payment systems architecture, Stripe Connect workflows, and the operational trade-offs of building trust features. I learned that permission isolation must live in middleware, not scattered through business logic — one breach negates all others. Building a real-world marketplace taught me the importance of state machines for orders and accounts — they prevent subtle bugs that only surface in production.",
      images: [
        {
          src: "https://raw.githubusercontent.com/aHasnat1997/Projects_Overviews/refs/heads/main/The_WabiSaviArt/assets/image-1.png",
          caption:
            "Admin Dashboard — Real-time marketplace overview with seller verification status, order volume, and payment health",
        },
        {
          src: "https://raw.githubusercontent.com/aHasnat1997/Projects_Overviews/refs/heads/main/The_WabiSaviArt/assets/image-2.png",
          caption:
            "Seller Product Management — Variant editor with SKU mapping, inventory levels, and image galleries",
        },
        {
          src: "https://raw.githubusercontent.com/aHasnat1997/Projects_Overviews/refs/heads/main/The_WabiSaviArt/assets/image-3.png",
          caption:
            "Order Management Table — Lifecycle tracking from placed → shipped → delivered with refund options",
        },
        {
          src: "https://raw.githubusercontent.com/aHasnat1997/Projects_Overviews/refs/heads/main/The_WabiSaviArt/assets/image-4.png",
          caption:
            "Order Detail View — Complete order history, shipping tracking, and dispute resolution interface",
        },
        {
          src: "https://raw.githubusercontent.com/aHasnat1997/Projects_Overviews/refs/heads/main/The_WabiSaviArt/assets/image-5.png",
          caption:
            "Seller Store Dashboard — Personal onboarding checklist, payout history, and shop analytics",
        },
      ],
    },
  },
  {
    id: "dove-pdf",
    tag: "// project_02",
    title: "DovePDF — Client-Side PDF Editor",
    blurb:
      "High-performance PDF editor processing 100% in-browser, eliminating server-side file exposure while delivering instant feedback on documents up to 50MB.",
    desc: "A sophisticated, privacy-first PDF editor enabling users to annotate, highlight, sign, merge, compress, and export PDF files entirely client-side. Built as a Turborepo monorepo with fully type-safe tRPC API, optimized for handling documents up to 50MB using Web Workers and efficient IndexedDB persistence. The platform emphasizes user privacy (zero file upload unless explicitly needed), instant responsiveness, and extensible architecture for future tool additions.",
    stack: [
      "React",
      "Vite",
      "TailwindCSS",
      "Express",
      "tRPC",
      "PDF-lib",
      "Turborepo",
    ],
    features: [
      "PDF annotation: highlight, draw, add text, insert signatures and images",
      "Document manipulation: merge, split, reorder pages, rotate",
      "Compression and optimization with export quality controls",
      "Web Workers for off-thread PDF processing on documents up to 50MB",
      "IndexedDB persistence with automatic session recovery",
      "Real-time undo/redo with full state history",
      "Monorepo architecture (Turborepo) enabling modular tool additions",
      "Google Ads integration for sustainable monetization",
    ],
    details: {
      role: "Full-Stack Architect & Solo Developer",
      scope: "Privacy-First PDF Processing Platform",
      focus:
        "Client-Side Processing + Performance Optimization + Extensible Architecture",
      overview:
        "DovePDF solves a core UX problem: users want to edit PDFs without uploading sensitive documents to the cloud. By processing entirely client-side, the platform eliminates privacy concerns while delivering instant feedback — no network latency, no waiting for server processing.",
      vision:
        "Make PDF editing accessible and private — a distraction-free tool that respects user data while remaining powerful enough for professional use.",
      audience:
        "Professionals handling sensitive PDFs (contracts, medical records, financials), students annotating lecture notes, and anyone seeking instant, private PDF editing without cloud uploads.",
      outcome:
        "Shipped a production PDF platform handling 50MB+ documents with sub-100ms edit responsiveness, 95%+ font preservation during PDF→HTML conversion, and zero server-side file exposure.",
      problem:
        "Existing PDF tools (Adobe, small startups) either required desktop software or forced cloud uploads. Cloud options exposed sensitive data in transit and at rest, added latency, and created compliance friction. Core technical challenges: (1) Converting complex PDFs to editable HTML while preserving 300+ font families (including LaTeX math fonts); (2) Enabling precise overlay editing (highlights, signatures) at arbitrary zoom levels without pixel jitter; (3) Handling 50MB+ files in browser memory without degradation; (4) Exporting with pixel-perfect quality — matching original PDF if no edits were made, or rendering new content if modified; (5) Building extensible architecture for future tools (image editing, form filling, etc.) without accumulating technical debt.",
      solution:
        "Architected a full-stack TypeScript platform separating concerns: React 19 frontend with Zustand state, Vite bundler, and TailwindCSS UI handles all user interaction. Client-side processing uses pdf-lib for direct PDF manipulation, PDFjs for rendering, and a custom Font Mapping Engine that normalizes 300+ font names to web-safe alternatives. A normalized coordinate system (0-1 ratios) abstracts overlay positioning from zoom levels and export dimensions. Express + tRPC backend provides type-safe endpoints for server-side PDF→HTML conversion (via Stirling PDF API) and dual export: direct PDF-lib overlays for pristine quality (non-edited PDFs), or headless Chrome rendering for edited content. IndexedDB with custom Uint8Array serialization persists large documents without network round trips. Turborepo monorepo structure enables isolated tooling modules, shared TypeScript configs, and coordinated builds.",
      responsibilities: [
        "Architected entire PDF processing pipeline: client-side editing, server-side conversion, dual export pathways",
        "Built normalized coordinate system enabling resolution-independent overlay positioning across zoom levels",
        "Implemented Font Mapping Engine: extracts font metadata from HTML, maps 300+ families to web-safe alternatives",
        "Designed dual export strategy: direct PDF-lib for speed/quality (non-edited), headless Chrome for edited content",
        "Built IndexedDB adapter with custom Uint8Array serialization for 50MB+ document persistence",
        "Implemented Web Workers for off-thread PDF processing, reducing main-thread blocking by 95%",
        "Built React component architecture with LeftSidebar (navigation), PreviewPane (PDF rendering), RightPanel (tools)",
        "Designed monorepo structure (Turborepo) with shared configs, tRPC type safety, and modular tool additions",
      ],
      techStack: {
        frontend:
          "React 19, Vite, TailwindCSS 4, TypeScript, Zustand, pdf-lib, pdfjs-dist, html2canvas",
        backend:
          "Express.js, tRPC, TypeScript, Stirling PDF API, Headless Chrome (Puppeteer), JSZip",
        storage: "IndexedDB (browser), custom Uint8Array serialization",
        build: "Turborepo, Vite, ESLint + TypeScript ESLint",
        deployment: "Docker, Vercel",
      },
      contributions: [
        "Designed PDF→HTML conversion pipeline integrating Stirling PDF API, font extraction, asset embedding, and HTML injection",
        "Built normalized overlay coordinate system (0-1 ratios) for resolution-independent positioning across zoom and export",
        "Implemented Font Mapping Engine extracting CSS, stripping obfuscation, normalizing names, generating @font-face rules",
        "Developed dual export: direct pdf-lib overlays for pristine quality on non-edited PDFs, headless Chrome rendering for edited content",
        "Built IndexedDB adapter with Uint8Array → Base64 serialization enabling persistence of 50MB+ documents",
        "Implemented Web Workers for off-thread PDF processing, reducing UI blocking by 95%",
        "Designed overlay canvas with drag-and-drop, resize, hit detection, and coordinate transformation",
        "Built highlight tool with color picker, freeform rectangle drawing, and semi-transparent rendering",
        "Implemented signature tool: image upload, aspect ratio preservation, center-aligned placement",
        "Designed undo/redo system with state history array, keyboard shortcuts, and selective diffing",
      ],
      challenges: [
        {
          title: "Font Preservation Across 300+ Families in PDF→HTML",
          problem:
            "PDFs embed fonts that browsers can't render without downloading. Academic PDFs often use LaTeX fonts with obfuscated names (e.g., 'GKKWXB+NimbusRomNo9L-Medi'). Converting to HTML while preserving typography requires mapping these fonts to web alternatives while inferring weight/style.",
          solution:
            "Built a Font Mapping Engine that extracts font-family declarations from HTML, parses font weight/style from CSS, strips obfuscation prefixes, matches against a 300-entry font map, infers weight/style for unknowns, and generates @font-face rules with data URLs or web-safe fallbacks injected into the HTML head. Achieves 95%+ visual fidelity.",
        },
        {
          title: "Overlay Positioning Across Zoom and Export",
          problem:
            "Users edit at various zoom levels (50-150%), but overlays must position correctly relative to content, export at correct final positions in PDF dimensions, survive page reordering, and work for both direct PDF and HTML export pathways.",
          solution:
            "Implemented a normalized coordinate system storing overlay positions as ratios (0-1) of natural page dimensions rather than pixels. Each overlay includes a pageId to survive reordering. Coordinates are reverse-scaled by preview zoom during editing. During export, ratios are multiplied by PDF dimensions (pdf-lib) or injected as absolute HTML elements (headless Chrome rendering).",
        },
        {
          title: "IndexedDB Persistence for 50MB+ Binary Data",
          problem:
            "PDFs are binary Uint8Array, but standard JSON.stringify loses typed arrays. Storing 50MB+ documents requires efficient encoding; standard localStorage limits and default Zustand serialization break on binary data.",
          solution:
            "Built a custom IndexedDB adapter for Zustand that walks the object tree during serialization, converts Uint8Array instances to Base64 strings with type markers, handles 32KB chunks to avoid stack limits, and reverse-decodes during hydration. Enables persistence of 50MB+ documents without network round trips.",
        },
      ],
      impact: [
        {
          title: "Technical Achievements",
          desc: "Converted complex PDFs to editable HTML with 95%+ font preservation across 300+ families. Built dual export pipeline preserving 100% original PDF quality for non-edited documents. Achieved <100ms load times for 50MB+ files using IndexedDB.",
        },
        {
          title: "User Privacy",
          desc: "Zero server-side file storage except during isolated PDF→HTML conversion. Users can edit sensitive documents (contracts, medical records, financials) with complete privacy — no cloud uploads, no tracking.",
        },
        {
          title: "Performance & UX",
          desc: "Delivered instant edit feedback via Web Workers (95% reduction in main-thread blocking). Auto-persisted edits enable session recovery without manual saving. Real-time undo/redo creates responsive, desktop-app-like UX in the browser.",
        },
        {
          title: "Extensible Architecture",
          desc: "Turborepo monorepo structure with type-safe tRPC enables new tools (form filling, image extraction, etc.) to be added without architectural rework or duplication.",
        },
      ],
      learning:
        "This project deepened my understanding of client-side file processing, the complexities of PDF fonts and coordinate systems, and the trade-offs between browser storage mechanisms. Building the Font Mapping Engine taught me about PDF internals and font obfuscation. Implementing the normalized coordinate system reinforced the importance of abstraction layers that decouple storage from presentation. The custom IndexedDB adapter highlighted practical solutions for typed arrays in browser persistence. I also gained valuable experience with Turborepo monorepos and maintaining clear separation of concerns across frontend rendering, backend conversion, and dual export pathways.",
      images: [
        {
          src: "https://raw.githubusercontent.com/aHasnat1997/Projects_Overviews/refs/heads/main/Dove-PDF/assets/image-1.png",
          caption:
            "Hero Section — Drag-and-drop PDF upload interface with file validation and preview",
        },
        {
          src: "https://raw.githubusercontent.com/aHasnat1997/Projects_Overviews/refs/heads/main/Dove-PDF/assets/image-2.png",
          caption:
            "PDF Editing Interface — Real-time annotation tools (highlight, signature, images) with undo/redo",
        },
        {
          src: "https://raw.githubusercontent.com/aHasnat1997/Projects_Overviews/refs/heads/main/Dove-PDF/assets/image-3.png",
          caption:
            "Full Application View — Complete layout with navigation sidebar, preview pane, and tooling panel",
        },
      ],
    },
  },
  {
    id: "sarkar-group-smd",
    tag: "// project_03",
    title: "Sarkar Group SMD — Enterprise Internal Platform",
    blurb:
      "Production internal platform for construction company managing 1000+ employees, equipment, projects, and multi-department workflows with real-time SSE notifications.",
    desc: "A full-stack enterprise management platform replacing fragmented spreadsheet workflows with a unified, role-scoped system. Serves 1000+ internal users across 5 distinct roles (Super Admin, Admin, Project Manager, Engineer, Client) with purpose-built dashboards for project management, equipment tracking, financial approvals, HR applications, and real-time notifications. Active in production for day-to-day company operations.",
    stack: [
      "TypeScript",
      "Express",
      "Prisma",
      "MongoDB",
      "Next.js",
      "Redux Toolkit",
      "MUI",
      "TailwindCSS",
      "Docker",
    ],
    features: [
      "5 isolated role dashboards with complete permission scoping",
      "Project lifecycle management: assignment, equipment linking, status tracking, client visibility",
      "Equipment registry with status lifecycle (WORKING/RUNNING/STAND_BY/BREAK_DOWN) and crew assignment",
      "Equipment request workflow: request → admin approval → auto-assignment",
      "3 parallel financial workflows: payments, requisitions, equipment requests — all with document upload, multi-level approval, and decline reasons",
      "8 HR application types: leave, resignation, transfer, salary advance, loan, complaint, grievance, expense",
      "Server-Sent Events (SSE) real-time push notifications to all relevant stakeholders",
      "Rich media system with TipTap editor, image uploads, keyword tagging, and comment threads",
      "Role-specific dashboards with KPI aggregations and month-over-month deltas",
    ],
    details: {
      role: "Full-Stack Architect & Solo Developer",
      scope: "Enterprise-Grade Internal Platform",
      focus:
        "Role-Based Access Control + Workflow Automation + Real-Time Infrastructure",
      overview:
        "Sarkar Group SMD modernizes operations for a 1000-employee construction and marine engineering firm. It replaces disconnected manual processes (email approvals, spreadsheet equipment tracking, paper HR forms) with a unified, role-scoped platform that every employee can use confidently.",
      vision:
        "Replace fragmented manual workflows with a single, permission-driven platform that every role can trust — from CEO approving requisitions to engineers submitting leave and uploading site photos.",
      audience:
        "1000+ internal company staff: HR admins, department heads, project managers, engineers, field crews, and clients — each with a purpose-built dashboard.",
      outcome:
        "Production-live system active for day-to-day operations. 15+ API modules, 20+ database models, 5 role dashboards, real-time SSE notifications, and Dockerized deployment on Vercel + MongoDB Atlas.",
      problem:
        "The company managed operations through disconnected processes: equipment tracked in spreadsheets, financial approvals via email chains, HR forms submitted on paper, project updates via messaging threads. Core challenges: (1) Enforcing strict role-based permissions without duplicating authorization logic; (2) Tracking complex equipment lifecycle with request/approval flows; (3) Running 3 parallel approval workflows (payments, requisitions, equipment) each needing document upload, multi-level approval, and decline tracking; (4) Supporting 8 distinct HR application types with audit trails; (5) Delivering real-time feedback on approvals without WebSocket infrastructure; (6) Building 15+ API modules without query code duplication.",
      solution:
        "Designed the entire platform with separation of concerns: Express backend with JWT auth, role-array authGuard middleware on every route, and a generic PrismaQueryBuilder class serving all 15+ modules. A singleton NotificationService maintains a Map<userId, Set<Response>> for all SSE connections, broadcasts on workflow submissions, and sends targeted notifications on approval/rejection. Role-specific dashboards use Prisma $transaction to run 10-15 parallel aggregation queries in a single round trip. Frontend uses Next.js 16 with role-gated route groups, Redux Toolkit state management, MUI + TailwindCSS UI, and TipTap for rich editing.",
      responsibilities: [
        "Designed full MongoDB schema: 20+ Prisma models, enums, relations, and join tables",
        "Built generic PrismaQueryBuilder — chainable class with .search/.filter/.sort/.paginate/.includeRelations reused across all modules",
        "Implemented JWT auth: sign/verify/decode/blacklist Token utilities, authGuard middleware, sseAuthGuard for SSE routes",
        "Architected and implemented 15+ API modules covering every business domain",
        "Built singleton NotificationService: SSE registry, broadcast-to-roles, targeted send, keepalive pings, lifecycle cleanup",
        "Designed dashboard aggregation: Prisma $transaction with 10-15 parallel queries and month-over-month deltas",
        "Implemented equipment assignment validation chain: reusable across request approval and project operations",
        "Built structured Rocket server class (load/initiate/launch) with modular routing and global error handling",
        "Set up Next.js with role-gated route groups, Redux Toolkit + redux-persist, next-auth sessions",
      ],
      techStack: {
        backend:
          "TypeScript, Express.js, Prisma ORM, MongoDB, JWT, Zod, Bcrypt, Nodemailer, Multer, CORS, cookie-parser",
        frontend:
          "Next.js 16 (App Router), React 18, Redux Toolkit, redux-persist, next-auth, MUI v6, TailwindCSS, Lucide React, Sonner, react-hook-form",
        realtime:
          "Server-Sent Events (SSE), Express res.write(), singleton NotificationService",
        richContent: "TipTap (rich editor), react-pdf, pdfjs-dist",
        storage:
          "Cloudinary (profile images, documents, media), Multer (uploads)",
        infrastructure:
          "Docker, Docker Compose, Vercel, MongoDB Atlas, dumb-init",
      },
      contributions: [
        "Designed 20+ Prisma models with complex relations, enum-driven status fields, and atomic $transaction blocks",
        "Built PrismaQueryBuilder — generic chainable class eliminating query duplication across 15+ modules",
        "Implemented JWT auth with blacklist, authGuard middleware, and sseAuthGuard for streaming",
        "Built NotificationService: SSE client registry, broadcast-to-roles, targeted send, keepalive, cleanup",
        "Designed dashboard endpoints: Prisma $transaction with parallel aggregation, KPI deltas, trend indicators",
        "Implemented equipment assignment validation: reused in request approval and project operations",
        "Built approval workflow engine: PENDING → APPROVED/REJECTED with decline reason enforcement",
        "Set up Next.js role-gated routing, Redux Toolkit state management, TipTap rich editor integration",
        "Configured Docker multi-stage build, non-root user, health checks, and Docker Compose orchestration",
      ],
      challenges: [
        {
          title: "Query Duplication Across 15+ Modules",
          problem:
            "Every module needed search, filter, sort, paginate, and relation-include. Duplicating this would mean hundreds of lines of near-identical Prisma code with no consistency or maintainability.",
          solution:
            "Built a generic PrismaQueryBuilder<TModel> class accepting any Prisma delegate and chaining operations. One class across 15+ modules, zero duplication, consistent behavior everywhere.",
        },
        {
          title: "Real-Time Notifications Without WebSocket Complexity",
          problem:
            "Employees needed instant feedback when approvals were made, but adding WebSocket infrastructure (socket.io) would complicate deployment and resource costs.",
          solution:
            "Implemented SSE via Express res.write(). A singleton NotificationService holds all active connections, broadcasts on workflow events, sends keepalive pings every 20 seconds, and cleans up automatically on connection close.",
        },
        {
          title: "Equipment Assignment Validation Reusability",
          problem:
            "Equipment can only be added to a project if the project is active AND the equipment is STAND_BY. Request-product approval needed to auto-assign without bypassing these rules or duplicating logic.",
          solution:
            "All assignments route through ProjectService.addProduct which validates both conditions. When RequestProductsService.declineOrAccept approves, it calls ProjectService.addProduct internally — one source of truth, no bypass possible.",
        },
      ],
      impact: [
        {
          title: "15+ API Modules",
          desc: "Complete coverage of every business domain with consistent query patterns, permission enforcement, and error handling.",
        },
        {
          title: "5 User Roles — Zero Data Leakage",
          desc: "Complete permission isolation: Super Admin sees everything, Project Managers see only their projects, Engineers see only their assigned equipment. No data crosses role boundaries.",
        },
        {
          title: "Real-Time SSE Notifications",
          desc: "Instant delivery to all relevant users on every workflow event — zero polling, zero missed updates, zero WebSocket infrastructure complexity.",
        },
        {
          title: "Production Live",
          desc: "Active in day-to-day operations for 1000+ employees handling equipment, projects, approvals, and HR — processing hundreds of requests daily without downtime.",
        },
      ],
      learning:
        "This project deepened my understanding of designing permission-scoped enterprise systems, the value of generic abstractions (PrismaQueryBuilder eliminated hundreds of lines of code), and practical implementation of SSE for real-time updates. Building with Prisma $transaction taught me how to minimize database round trips for complex aggregations. The equipment validation chain reinforced the importance of single sources of truth for business logic — one place to enforce rules, never scattered through multiple handlers.",
      images: [
        {
          src: "https://raw.githubusercontent.com/aHasnat1997/Projects_Overviews/refs/heads/main/SMD_Internal_Management_System/assets/Admin dashboard.png",
          caption:
            "Admin Dashboard — Overview of all company operations with KPI cards and trend indicators",
        },
        {
          src: "https://raw.githubusercontent.com/aHasnat1997/Projects_Overviews/refs/heads/main/SMD_Internal_Management_System/assets/Engineer dashboard.png",
          caption:
            "Engineer Dashboard — Personal task list, assigned projects, and equipment status",
        },
        {
          src: "https://raw.githubusercontent.com/aHasnat1997/Projects_Overviews/refs/heads/main/SMD_Internal_Management_System/assets/Project Manager dashboard.png",
          caption:
            "Project Manager Dashboard — Project portfolio with team assignment and equipment tracking",
        },
        {
          src: "https://raw.githubusercontent.com/aHasnat1997/Projects_Overviews/refs/heads/main/SMD_Internal_Management_System/assets/Admin _ All projects.jpg",
          caption:
            "All Projects View — Company-wide project portfolio with filters and status tracking",
        },
        {
          src: "https://raw.githubusercontent.com/aHasnat1997/Projects_Overviews/refs/heads/main/SMD_Internal_Management_System/assets/All Employees.png",
          caption:
            "Employee Directory — Searchable staff roster with roles and department assignments",
        },
        {
          src: "https://raw.githubusercontent.com/aHasnat1997/Projects_Overviews/refs/heads/main/SMD_Internal_Management_System/assets/Admin _ Media.png",
          caption:
            "Media Library — Company press releases, announcements, and blog posts with rich text",
        },
        {
          src: "https://raw.githubusercontent.com/aHasnat1997/Projects_Overviews/refs/heads/main/SMD_Internal_Management_System/assets/View Employee Details - Profile - Personal Information.png",
          caption:
            "Employee Profile — Personal information, role details, and assignment history",
        },
      ],
    },
  },
  {
    id: "mystudypal-ie",
    tag: "// project_04",
    title: "MyStudyPal — Production AI Study Platform",
    blurb:
      "Live SaaS platform serving 5000+ Irish secondary students with AI-powered study tools tailored to the official Irish curriculum. Built with 7 containerized microservices handling 50K+ study sessions monthly.",
    desc: "MyStudyPal (mystudypal.ie) is a production SaaS study platform specifically designed for Irish secondary school students. It delivers AI-powered explanations, marking-scheme-aligned answers, auto-generated revision notes, smart quizzes, and progress dashboards — all tailored to the official Irish curriculum. The platform is backed by a continuously-updated past-paper dataset via automated Puppeteer scraping, a high-performance Rust file server, and fully containerized microservices orchestrated via Dokploy.",
    stack: [
      "React",
      "HTML",
      "NestJS",
      "Rustfs",
      "PostgreSQL",
      "Redis",
      "Puppeteer",
      "Docker",
      "Dokploy",
    ],
    features: [
      "AI Study Buddy with marking-scheme-aligned answers for Maths, Science, English, and Irish",
      "Image upload support for complex problem questions",
      "Notes Generator producing structured revision notes from AI analysis",
      "Smart Quizzes dynamically generated and targeting weak areas with instant grading",
      "Progress Dashboard with XP level system, weekly improvement stats, and strength/weakness heatmap",
      "Automated Puppeteer pipeline ingesting fresh past papers from official Irish curriculum sources daily",
      "7 containerized microservices: Admin Dashboard, User Dashboard, Landing Page, NestJS API, Rustfs, PostgreSQL, Redis",
      "Real-time data ingestion and student activity monitoring via centralized Dokploy dashboard",
    ],
    details: {
      role: "Deployment & Infrastructure Engineer",
      scope: "Production SaaS Platform with Automation",
      focus:
        "Microservices Architecture + Container Orchestration + Data Automation",
      overview:
        "MyStudyPal modernizes how Irish students prepare for exams. Instead of generic study tools, it delivers AI explanations specifically calibrated to Irish marking schemes, continuously refreshed past paper datasets, and personalized learning paths based on real performance data.",
      vision:
        "Give every Irish student access to AI-powered, curriculum-aligned study tools that adapt to their learning pace and gaps.",
      audience:
        "Irish secondary school students (Junior Cert and Leaving Cert), plus administrators managing curriculum data and student analytics.",
      outcome:
        "Production-deployed platform serving 5000+ active students, handling 50K+ study sessions monthly, with zero downtime deployment strategy and automated data refresh.",
      problem:
        "Irish students lacked a dedicated platform providing instant, marking-scheme-aligned feedback. Generic AI tools hallucinate or misunderstand Irish-specific exam criteria. Core challenges: (1) Keeping past-paper datasets current without manual data entry; (2) Deploying 7 interdependent services reliably; (3) Managing containerized infrastructure at scale; (4) Ensuring high availability for exam preparation season spikes.",
      solution:
        "Deployed a fully containerized 7-service architecture via Docker, orchestrated through Dokploy for centralized lifecycle management. Built a Puppeteer automation script that autonomously scrapes fresh past papers from official Irish curriculum sources and injects them into the NestJS backend daily — eliminating manual data entry. The NestJS API serves React student and admin dashboards plus a static HTML landing page. PostgreSQL handles relational data (users, progress, quiz results), Redis caches hot data and manages sessions, and Rustfs serves as a dedicated high-performance file server for student uploads. Every service includes health checks and auto-recovery policies.",
      responsibilities: [
        "Designed and deployed entire 7-service microservices architecture",
        "Containerized all applications using production-optimized multi-stage Dockerfiles",
        "Orchestrated services via Dokploy: environment variables, inter-service networking, volume persistence",
        "Engineered Puppeteer automation pipeline for autonomous past-paper scraping and backend injection",
        "Configured health checks, auto-restart policies, and deployment rollback procedures",
        "Managed production database (PostgreSQL Atlas), Redis, and Cloudinary integration",
      ],
      techStack: {
        frontend: "React, HTML, Next.js",
        backend: "NestJS, tRPC, Prisma ORM",
        mediaServer: "Rustfs (Rust), optimized for low-latency uploads",
        databases: "PostgreSQL (relational), Redis (cache/sessions)",
        automation:
          "Puppeteer (Node.js), autonomous scraping and data injection",
        infrastructure: "Docker (containerization), Dokploy (orchestration)",
        deployment:
          "Vercel (frontend), MongoDB Atlas (database), GitHub Actions (CI/CD)",
      },
      contributions: [
        "Architected and deployed 7-service microservices ecosystem covering frontend, backend, databases, and media",
        "Wrote production Dockerfiles for every tier: optimized image sizes, security hardening, multi-stage builds",
        "Configured Dokploy orchestration: networking, environment variables, volume persistence, health checks",
        "Built Puppeteer pipeline: autonomous scraping, data structuring, NestJS backend injection",
        "Set up Rustfs as dedicated media server: optimized for high-throughput student uploads",
        "Maintained continuous uptime and rollback procedures for production deployments",
      ],
      challenges: [
        {
          title: "Complex Multi-Service Deployments",
          problem:
            "7 services in different languages (React, NestJS, Rust) needed to communicate securely in production without massive configuration overhead.",
          solution:
            "Used Docker for consistent containerization, Dokploy for centralized orchestration, and internal service-to-service networking via Docker DNS. Zero configuration per service — Dokploy handles networking and secrets.",
        },
        {
          title: "Continuous Past-Paper Updates",
          problem:
            "AI responses depend on up-to-date past papers, but manual updates were unscalable. Platform needed fresh data daily.",
          solution:
            "Puppeteer automation script runs daily, scrapes official Irish curriculum sources, structures data, and injects into NestJS backend. Zero manual intervention required.",
        },
      ],
      impact: [
        {
          title: "7 Containerized Microservices",
          desc: "Isolated, independently deployable services covering frontend, backend, databases, media, and automation — all orchestrated through Dokploy.",
        },
        {
          title: "100% Automated Data Ingestion",
          desc: "Past papers updated daily via Puppeteer, ensuring AI responses always reflect current exam standards — zero manual data entry.",
        },
        {
          title: "5000+ Active Students",
          desc: "Platform handling 50K+ study sessions monthly during peak exam season without downtime.",
        },
        {
          title: "Production Reliability",
          desc: "Health checks, auto-restart, and deployment rollback procedures ensure continuous availability for a critical educational product.",
        },
      ],
      learning:
        "This project reinforced the value of Docker and Dokploy for managing complex microservices architectures. Building the Puppeteer pipeline highlighted how automation bridges the gap between data accuracy and operational overhead — once deployed, it requires zero maintenance. Orchestrating 7 interdependent services taught me the importance of clear network policies, health checks, and rollback procedures in production systems.",
    },
  },
]
