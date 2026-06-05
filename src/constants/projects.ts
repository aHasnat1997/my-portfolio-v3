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
    title: "WabiSaviArt - Multi-Vendor Marketplace",
    blurb:
      "Etsy-inspired marketplace emphasizing transparency, authenticity, and community trust.",
    desc: "A production-ready multi-vendor marketplace connecting buyers and verified makers through role-based dashboards, secure checkout, messaging, and a rich product catalog with variants, media, and storytelling features.",
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
      "Role-based auth for buyer, seller, and admin workflows",
      "Product catalog with variants, inventory, and media galleries",
      "Stripe checkout with seller onboarding and payouts",
      "S3-compatible media uploads with presigned URLs",
      "Order management with refunds and dispute tracking",
      "Maker verification and authenticity badges",
      "Messaging between buyers and sellers",
    ],
    details: {
      role: "Backend Developer",
      scope: "Marketplace Platform",
      focus: "Trust + Payments",
      overview:
        "WabiSaviArt is a marketplace that prioritizes genuine creators and transparent commerce. The experience blends discovery, storytelling, and verified reviews with strong admin oversight and seller tooling.",
      vision:
        "Empower authentic makers and help buyers shop with confidence through verifiable signals and human review.",
      audience:
        "Independent artisans, boutique sellers, and customers seeking trusted, handcrafted products.",
      outcome:
        "A modular marketplace backend that supports scale, transparency, and feature growth.",
      problem:
        "The client needed a production-ready marketplace where sellers could manage products, orders, and shop identity, while buyers could browse, purchase, and communicate seamlessly. Beyond standard e-commerce, the platform had to support authenticity signals such as maker verification, imported reviews, transparent fees, and admin oversight of listings and disputes. The system also required reliable media handling and multi-seller payment flows without compromising performance or maintainability.",
      solution:
        "I delivered a modular backend built with NestJS and Prisma, designed around clear domain boundaries for users, sellers, catalog, orders, payments, and messaging. I integrated Stripe for checkout, refunds, and seller onboarding, implemented S3-compatible media uploads with presigned URLs, and added Redis-backed caching and sessions for stability. The API supports role-based workflows for buyers, sellers, and admins, enabling marketplace operations, verification features, and transparency reporting.",
      responsibilities: [
        "Architected and implemented core API modules for auth, catalog, orders, payments, and media",
        "Built role-based access control for admin, seller, and customer workflows",
        "Modeled and migrated the database schema with Prisma, including catalog variants and order lifecycle",
        "Integrated Stripe checkout, refunds, and seller onboarding and payout flows",
        "Implemented object storage uploads with presigned URLs and secure validation",
        "Supported deployment with Docker and runtime configuration for production",
      ],
      techStack: {
        frontend: "React, Vite, Refine, Material UI, TypeScript",
        backend: "Node.js (Bun runtime), NestJS, Prisma ORM",
        database: "PostgreSQL",
        infrastructure:
          "Docker, Redis, Stripe, S3-compatible storage, Twilio, Nodemailer, Git",
      },
      contributions: [
        "Built the core NestJS modules and API contracts for marketplace operations",
        "Designed Prisma models for users, sellers, products, orders, refunds, and disputes",
        "Implemented Stripe payment intent flow, refunds, and seller onboarding",
        "Added media uploads using S3-compatible storage with presigned URLs",
        "Introduced Redis-backed caching and session support for performance",
        "Hardened validation and error handling across public-facing endpoints",
        "Packaged the app for containerized deployment with Docker",
      ],
      challenges: [
        {
          title: "Multi-variant catalog and data integrity",
          problem:
            "The product catalog needed to support variants, inventory, and rich media while preserving consistency and fast queries.",
          solution:
            "I designed a normalized catalog schema with variant relationships and indexes, then enforced validation in the API to keep inventory, pricing, and media in sync.",
        },
        {
          title: "Reliable media handling",
          problem:
            "Seller uploads had to be secure, scalable, and resilient to failed or partial uploads.",
          solution:
            "I implemented presigned URL uploads to S3-compatible storage with size and type validation, plus consistent cleanup patterns for failed uploads.",
        },
        {
          title: "Payments, refunds, and seller payouts",
          problem:
            "The platform needed to handle multi-seller checkout, refunds, and payouts while keeping order and payment states consistent.",
          solution:
            "I integrated Stripe for checkout and seller onboarding, enforced order state transitions, and added webhook-driven updates for payment status and refunds.",
        },
      ],
      impact: [
        {
          title: "Production-ready backend",
          desc: "Aligned with transparency and authenticity goals for a trusted marketplace.",
        },
        {
          title: "Simplified deployment",
          desc: "Dockerized packaging reduced environment issues and sped up releases.",
        },
        {
          title: "Secure payment flows",
          desc: "Stripe Connect ensured safe checkout, refunds, and seller payouts.",
        },
        {
          title: "Maintainable architecture",
          desc: "Modular services and a well-structured schema support future growth.",
        },
      ],
      learning:
        "This project deepened my understanding of scalable marketplace architecture, Stripe Connect workflows, and the operational trade-offs of building trust features such as verification and transparent reporting.",
      images: [
        {
          src: "https://raw.githubusercontent.com/aHasnat1997/Projects_Overviews/refs/heads/main/The_WabiSaviArt/assets/image-1.png",
          caption: "Admin dashboard overview",
        },
        {
          src: "https://raw.githubusercontent.com/aHasnat1997/Projects_Overviews/refs/heads/main/The_WabiSaviArt/assets/image-2.png",
          caption: "Seller Product Details views",
        },
        {
          src: "https://raw.githubusercontent.com/aHasnat1997/Projects_Overviews/refs/heads/main/The_WabiSaviArt/assets/image-3.png",
          caption: "Orders Table View",
        },
        {
          src: "https://raw.githubusercontent.com/aHasnat1997/Projects_Overviews/refs/heads/main/The_WabiSaviArt/assets/image-4.png",
          caption: "Order Details View",
        },
        {
          src: "https://raw.githubusercontent.com/aHasnat1997/Projects_Overviews/refs/heads/main/The_WabiSaviArt/assets/image-5.png",
          caption: "Seller Store Details",
        },
      ],
    },
  },
  {
    id: "dove-pdf",
    tag: "// project_02",
    title: "Dove-PDF - Online PDF Toolkit",
    blurb: "Comprehensive PDF editor with client-side processing for privacy.",
    desc: "A web-based PDF tools platform enabling users to upload, edit, merge, compress, and optimize PDF files directly in the browser with client-side processing for enhanced privacy and instant feedback.",
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
      "PDF upload with validation and preview",
      "Client-side PDF editing, merging, and compression using PDF-lib",
      "Real-time processing feedback with progress indicators",
      "Web Workers for performance optimization on large files",
      "Google Ads integration for monetization",
      "Monorepo architecture for scalable tool additions",
    ],
    details: {
      role: "Fullstack Developer (Solo Project)",
      scope: "PDF Tools Platform",
      focus: "PDF Processing + UX + Modern Stack",
      overview:
        "Dove-PDF is a sophisticated online PDF editor and toolkit that enables users to upload, edit, highlight, annotate, merge, compress, and export PDF files directly in the browser. Built with a modern TypeScript monorepo architecture, the platform features advanced PDF-to-HTML conversion, real-time overlay editing, intelligent font preservation, and dual export pathways (direct PDF or HTML-to-PDF rendering) for maximum quality and flexibility.",
      vision:
        "Create a simple yet powerful PDF toolkit accessible to everyone, with a scalable architecture ready for future tool additions.",
      audience:
        "Clean, distraction-free interface that guides users through upload, processing, and download workflows with minimal friction.",
      outcome:
        "A production-ready PDF platform with core editing features, monetization through ads, and extensible architecture for new tools.",
      problem:
        "Users need quick, reliable tools to manage PDF documents without installing desktop software. The core technical challenges included converting complex PDFs to HTML while preserving layouts and 300+ font families (including LaTeX variants), enabling real-time overlay editing with precise positioning, maintaining original PDF quality on export when no content edits are made, and persisting large binary PDF data in browser storage without performance degradation.",
      solution:
        "I architected and implemented a full-stack PDF processing platform using a modern TypeScript stack. The frontend is a React 19 and Vite SPA utilizing Zustand and a custom IndexedDB adapter for persisting large binary data. I implemented a normalized coordinate system for resolution-independent overlays (highlights, signatures, images). The backend uses Express and tRPC, integrated with the Stirling PDF API for server-side PDF-to-HTML conversion and a custom font mapping engine to normalize font families. A dual export strategy applies direct binary overlays via pdf-lib for pristine quality or renders via headless Chrome when HTML content is modified.",
      responsibilities: [
        "Architected the entire PDF processing pipeline including PDF→HTML conversion, overlay system, font preservation, and dual export pathways",
        "Implemented IndexedDB persistence layer with custom Uint8Array serialization for handling large PDF files in browser storage",
        "Built normalized coordinate overlay system enabling resolution-independent highlight, signature, and image placement across different zoom levels",
        "Created intelligent font mapping system that parses HTML for font-family usage and maps 300+ font families to web-safe alternatives",
        "Integrated Stirling PDF API for server-side PDF-to-HTML conversion with ZIP extraction, asset embedding, and font processing",
        "Developed dual export strategy: direct PDF overlays via pdf-lib for pristine quality, and HTML-to-PDF via headless Chrome for edited content",
        "Implemented undo/redo system with state history tracking and keyboard shortcuts",
        "Designed and built React component architecture including preview panes with iframe rendering, overlay canvas interaction, and page reordering",
        "Optimized performance by batching file operations, streaming large files, using Web Workers for heavy processing, and implementing lazy loading",
        "Set up Turborepo monorepo with shared TypeScript configs, tRPC type safety, and coordinated builds across 3 applications",
      ],
      techStack: {
        frontend:
          "React 19, Vite, TailwindCSS 4, TypeScript, Zustand, PDF-lib, pdfjs-dist, html2canvas, jsPDF, react-pdf",
        backend:
          "Express, tRPC, TypeScript, Multer, Stirling PDF API, JSZip, html-to-docx, Headless Chrome (Puppeteer protocol)",
        processing:
          "PDF-lib, Canvas API, File API & Blob, IndexedDB, DOMParser, Base64 encoding/decoding",
        infrastructure:
          "Bun, Turborepo, Docker, Vercel, Git, ESLint + TypeScript ESLint, Vite SVGR plugin",
      },
      contributions: [
        "Built complete PDF-to-HTML conversion pipeline integrating Stirling PDF API, ZIP extraction, font/image asset processing, and HTML injection",
        "Implemented overlay coordinate system using normalized ratios (0-1) for resolution-independent positioning across different page sizes and zoom levels",
        "Created font mapping engine that parses font-family CSS, strips obfuscation prefixes, normalizes names, and generates @font-face rules for 300+ fonts",
        "Developed dual export pathways: direct PDF-lib overlay application for speed/quality, and HTML-to-PDF via headless Chrome for edited content",
        "Implemented IndexedDB persistence with custom serialization for Uint8Array binary data and state migration logic",
        "Built overlay canvas system with drag-and-drop, resize handles, hit detection, and real-time coordinate calculation",
        "Created highlight tool with color picker, freeform rectangle drawing, and semi-transparent rendering",
        "Implemented signature tool with image upload, aspect-ratio-preserved scaling, and center-aligned rendering",
        "Developed image insertion with file validation, size limits (10MB), and object-fit positioning",
        "Built undo/redo system with state history array, keyboard shortcuts, and selective overlay diffing",
        "Designed component architecture with LeftSidebar, PreviewPane, RightPanel, and TopBar, including page reordering and zoom controls",
      ],
      challenges: [
        {
          title: "PDF-to-HTML Conversion with Font Preservation",
          problem:
            "PDFs use embedded fonts that browsers cannot render without downloading. Academic PDFs often use LaTeX fonts with obfuscated names like 'GKKWXB+NimbusRomNo9L-Medi'. Converting to HTML while preserving typography requires mapping these fonts to web-safe alternatives while maintaining weight and style.",
          solution:
            "Built a comprehensive font mapping system that extracts font-family declarations, strips obfuscation prefixes, normalizes names, matches them against a 300-entry font map, infers weight/style for unknown fonts, and dynamically generates @font-face rules with data URLs or web-safe fallbacks injected into the HTML head.",
        },
        {
          title: "Overlay Positioning Across Zoom Levels and Export",
          problem:
            "Users edit PDFs at various zoom levels (50-150%), but overlays must position correctly relative to content regardless of preview zoom, export at correct positions in final PDF dimensions, survive page reordering, and work for both direct PDF and HTML export layouts.",
          solution:
            "Implemented a normalized coordinate system that stores overlay positions as ratios (0-1) of natural page dimensions rather than pixels. Each overlay stores a pageId to survive reordering. Coordinates are reverse-scaled based on zoom. During export, ratios are multiplied by PDF dimensions via pdf-lib or injected as absolute HTML elements for headless rendering.",
        },
        {
          title: "IndexedDB Persistence with Large Binary Data",
          problem:
            "PDFs are stored as Uint8Array (binary), but standard IndexedDB serialization via JSON.stringify loses binary data. Storing 50MB+ PDFs requires an efficient encoding strategy, as standard localStorage limits are insufficient and default Zustand serialization breaks on typed arrays.",
          solution:
            "Implemented a custom IndexedDB storage adapter for Zustand that walks the object tree during stringification to convert Uint8Array instances into base64 strings with a unique type marker. Processing is handled in 32KB chunks to avoid stack limits, with reverse decoding during hydration, selective state persistence, and migration logic for older overlay schemas.",
        },
      ],
      impact: [
        {
          title: "Technical Achievements",
          desc: "Converted complex PDFs to editable HTML with 95%+ font preservation across 300+ families, built a dual export pipeline preserving 100% original quality for non-edited PDFs, and achieved <100ms load times for 50MB+ files using IndexedDB.",
        },
        {
          title: "User Experience",
          desc: "Delivered instant client-side previews with real-time overlay rendering, zero data loss via automatic persistence/workspace recovery, and a privacy-focused architecture where PDFs process locally except during isolated conversion.",
        },
        {
          title: "Architecture & Scalability",
          desc: "Created an extensible Turborepo monorepo reducing build times by 60%, with a fully type-safe API via tRPC to eliminate runtime errors and a modular UI architecture prepared for future tool integrations.",
        },
        {
          title: "Monetization & Deployment",
          desc: "Integrated Google Ads strategically to provide a revenue stream without compromising user experience, backed by a production-ready Docker containerized environment.",
        },
      ],
      learning:
        "This project deepened my understanding of client-side PDF manipulation, file processing optimization, and memory management for large files in the browser. I gained valuable experience with PDF-lib for document manipulation, custom IndexedDB adapters for binary data storage, and the intricacies of handling various PDF formats with embedded fonts. The challenge of building a normalized coordinate system taught me important lessons about abstraction layers that decouple storage from presentation. I also learned effective techniques for building type-safe full-stack applications with tRPC and organizing complex codebases using Turborepo monorepos.",
      images: [
        {
          src: "https://raw.githubusercontent.com/aHasnat1997/Projects_Overviews/refs/heads/main/Dove-PDF/assets/image-1.png",
          caption: "Hero Section - PDF upload with drag-and-drop",
        },
        {
          src: "https://raw.githubusercontent.com/aHasnat1997/Projects_Overviews/refs/heads/main/Dove-PDF/assets/image-2.png",
          caption: "PDF editing interface",
        },
        {
          src: "https://raw.githubusercontent.com/aHasnat1997/Projects_Overviews/refs/heads/main/Dove-PDF/assets/image-3.png",
          caption: "Full Landing Page - Full application view",
        },
      ],
    },
  },
  {
    id: "sarkar-group-smd",
    tag: "// project_03",
    title: "Sarkar Group — SMD Internal Management System",
    blurb:
      "Multi-role internal tool for managing projects, equipment, employees, and workflows.",
    desc: "A production-grade internal management platform for a construction and marine engineering company. Multiple roles — Super Admin, Admin, Project Manager, Engineer, and Client — each operate within a tailored, permission-isolated dashboard covering project lifecycle, equipment tracking, financial approvals, HR applications, media publishing, and real-time notifications.",
    stack: [
      "TypeScript",
      "Express",
      "Prisma",
      "MongoDB",
      "Next.js",
      "Redux Toolkit",
      "MUI",
      "TailwindCSS",
      "SSE",
      "Docker",
    ],
    features: [
      "5 isolated role dashboards: SUPER_ADMIN, ADMIN, PROJECT_MANAGER, ENGINEER, CLIENT",
      "Project lifecycle management with engineer assignment, equipment linking, and status tracking",
      "Equipment registry with status tracking (WORKING / RUNNING / STAND_BY / BREAK_DOWN) and crew assignment",
      "Equipment request workflow: employee requests → admin approve/reject → auto-assign on approval",
      "Payment and requisition workflows with document upload, decline reason enforcement, and approval engine",
      "8 HR application types: leave, resignation, transfer, salary advance, loan, complaint, grievance, expense reimbursement",
      "Real-time SSE notifications pushed to all relevant users on every workflow event",
      "Rich media/blog system with TipTap editor, image upload, keyword tagging, and comment threads",
      "Project gallery with site photo uploads and team commenting",
      "Role-specific dashboards with KPI cards, month-over-month deltas, and parallel Prisma transaction aggregation",
    ],
    details: {
      role: "Fullstack Developer (Solo Project)",
      scope: "Full-Stack Internal Management Platform",
      focus: "RBAC + Approval Workflows + Real-time SSE + Generic Query Layer",
      overview:
        "Sarkar Group SMD replaces fragmented spreadsheet workflows with a unified internal platform. It handles the full operational lifecycle: registering and assigning construction and marine equipment, managing multi-department projects with engineers and clients, processing financial requisitions and payments, handling HR applications across 8 types, publishing company media with rich text, and delivering real-time SSE notifications to all relevant users on every workflow action — all within a clean role-based access system.",
      vision:
        "Replace disconnected manual processes with a single, permission-driven platform that every company role can use confidently — from the CEO approving requisitions to engineers submitting leave applications and uploading project site photos.",
      audience:
        "Internal company staff across construction, marine, and engineering departments — admins, project managers, engineers, and clients — each with a purpose-built dashboard that surfaces exactly the data and actions relevant to their role.",
      outcome:
        "A production-live system actively used for day-to-day company operations with 5 fully operational user roles, 15+ REST API modules, 20+ database models, real-time push notifications, and a Dockerized health-checked deployment on Vercel and MongoDB Atlas.",
      problem:
        "The company managed construction equipment, marine vessels, engineering projects, and a multi-department workforce through manual, disconnected processes. Core challenges included enforcing strict role-based permissions across every route and UI view without duplicating logic, tracking equipment across complex lifecycle states with a request/approval flow, running three parallel financial workflows (payments, requisitions, equipment requests) each needing submit → review → approve/reject cycles with notification feedback, supporting 8 distinct HR application types with document uploads and audit trails, delivering real-time notifications to relevant users without introducing WebSocket infrastructure complexity, and building a reusable query layer that supports search, filter, sort, paginate, and relation-include across 15+ modules without code duplication.",
      solution:
        "I designed and built the entire platform solo. The backend uses a structured Express Rocket server class (load → initiate → launch lifecycle) with JWT authentication, a role-array authGuard middleware on every protected route, and a generic chainable PrismaQueryBuilder that serves all 15+ modules — accepting any Prisma delegate and supporting .search() / .filter() / .sort() / .paginate() / .includeRelations() in a single reusable class. A singleton NotificationService maintains a Map<userId, Set<Response>> for all SSE connections, broadcasts to admin roles on workflow submissions, and sends targeted notifications to employees on approval or rejection, with 20-second keepalive pings and automatic connection cleanup. Role-specific dashboard endpoints use Prisma $transaction to run 10–15 parallel aggregation queries — KPI counts, month-over-month deltas, and recent records — in a single database round trip. The frontend uses Next.js 16 App Router with role-gated route groups, Redux Toolkit with redux-persist, MUI and TailwindCSS for UI, TipTap for rich media editing, and react-pdf for in-app document viewing.",
      responsibilities: [
        "Designed the full MongoDB schema: 20+ Prisma models, enums, relations, and join tables (ProjectsEngineers, ProductsProjects)",
        "Built generic PrismaQueryBuilder — chainable class with .search() / .filter() / .sort() / .paginate() / .includeRelations() reused across all 15+ modules",
        "Implemented JWT auth system: sign/verify/decode/blacklist Token utilities, role-array authGuard middleware, SSE-compatible sseAuthGuard with query-param token support",
        "Architected and implemented all 15+ API modules: users, admins, engineers, project managers, clients, projects, products, crews, payments, requisitions, applications, medias, project galleries, request products, notifications, dashboard",
        "Built singleton NotificationService: SSE client registry (Map<userId, Set<Response>>), broadcast-to-roles, targeted send, 20s keepalive pings, and connection lifecycle cleanup",
        "Designed role-specific dashboard aggregation using Prisma $transaction with 10–15 parallel queries and month-over-month delta calculations",
        "Implemented equipment assignment validation chain: project status check → equipment STAND_BY check → join record creation; reused in request-product auto-approval flow",
        "Built structured Rocket server class (load/initiate/launch) with CORS, cookie-parser, modular route registration, and global error handler",
        "Set up Next.js App Router with role-gated route groups, Redux Toolkit + redux-persist state management, next-auth session handling",
        "Built reusable frontend components: SMDDataTable, ProjectCard, DockUpload, ImageUploadField, PdfViewer, ViewFile, RichTextEditor (TipTap)",
        "Configured Docker multi-stage build (deps → builder → runner) with dumb-init, non-root user, health check endpoint, and Docker Compose orchestration",
      ],
      techStack: {
        backend:
          "TypeScript, Express.js, Prisma ORM, MongoDB, JWT (jsonwebtoken), Zod, Bcrypt, UUID, Nodemailer, EJS, Multer, Axios, cookie-parser, CORS",
        frontend:
          "Next.js 16 (App Router), React 18, Redux Toolkit, redux-persist, next-auth, MUI v6, TailwindCSS, Lucide React, Sonner, react-hook-form, Zod",
        richContent:
          "TipTap (heading, table, image, color, highlight, underline, text-align, font-family, placeholder), react-pdf, pdfjs-dist",
        fileStorage:
          "Cloudinary (profile images, equipment photos, documents, media posts), Multer (upload middleware)",
        realtime:
          "Server-Sent Events (SSE) via Express res.write(), singleton NotificationService with per-user client registry",
        infrastructure:
          "Docker (multi-stage), Docker Compose, dumb-init, Vercel, MongoDB Atlas, devcontainer, Vitest",
      },
      contributions: [
        "Designed and implemented full Prisma MongoDB schema with 20+ models, complex relations, enum-driven status fields, and atomic $transaction blocks",
        "Built PrismaQueryBuilder — generic chainable class eliminating query boilerplate across all 15+ modules with zero duplication",
        "Implemented JWT auth with Token.sign / Token.verify / Token.decode / Token.blacklist; authGuard middleware accepting role arrays; sseAuthGuard for query-param token on SSE routes",
        "Built NotificationService singleton: SSE client registry, broadcast-to-roles on submission events, targeted send on approval/rejection, keepalive pings, cleanup on close/finish/error",
        "Designed role-specific dashboard endpoints: Prisma $transaction with parallel aggregation queries, employee count deltas, application/requisition/product change indicators",
        "Implemented equipment assignment validation: project completion check → equipment STAND_BY check → create join record; called internally by request-product auto-approval",
        "Built approval workflow engine shared across payments, requisitions, and applications: PENDING → APPROVED/REJECTED with decline reason enforcement and SSE notification dispatch",
        "Set up Next.js role-gated routing: /(auth)/ for login/forgot-password, /(dashboard)/ with admin, project_manager, and engineer sub-routes",
        "Implemented TipTap rich text editor integration with heading, table, image, color, highlight, underline, text-align, and font-family extensions",
        "Configured Docker multi-stage build (deps → builder → runner), non-root user setup, dumb-init process management, and health check at /smd/api/v1/health",
      ],
      challenges: [
        {
          title: "Generic Query Layer Across 15+ Modules",
          problem:
            "Every module needed search, filter, sort, paginate, and relation-include. Duplicating this in each service would mean hundreds of lines of near-identical Prisma query code across 15+ services with no consistency.",
          solution:
            "Built a generic PrismaQueryBuilder<TModel, TWhereInput, TOrderByInput, TSelect, TInclude> class that accepts any Prisma delegate (findMany + count). All services instantiate it with their specific delegate and chain only the operations they need — .search(fields) / .filter(enumFields, additionalFilters) / .sort() / .paginate() / .includeRelations(include). One class, zero duplication across the entire API surface.",
        },
        {
          title: "Real-time Notifications Without WebSocket Infrastructure",
          problem:
            "Employees needed instant feedback when admins acted on their payment, requisition, or application submissions. Adding WebSocket infrastructure (socket.io, separate WS server) would add significant deployment complexity and resource overhead.",
          solution:
            "Implemented SSE via Express res.write(). A singleton NotificationService holds a Map<userId, Set<Response>> for all active connections. On workflow events it creates a DB record and pushes the payload to matching connections. A setInterval sends keepalive comment frames every 20 seconds to prevent proxy timeouts. Connection cleanup runs on res close, finish, and error events automatically.",
        },
        {
          title: "Equipment Assignment Validation Chain",
          problem:
            "Equipment can only be added to a project if the project is not Completed and the equipment status is STAND_BY. The request-product approval flow needed to auto-assign equipment on approval without bypassing these business rules or duplicating the validation logic.",
          solution:
            "All assignment operations are routed through ProjectService.addProduct which validates project status and equipment status before writing. When RequestProductsService.declineOrAccept sets status to APPROVED, it calls ProjectService.addProduct internally — reusing the exact same validation path. One source of truth, no bypass possible.",
        },
        {
          title: "Role-Specific Dashboard Aggregation Performance",
          problem:
            "Each role's dashboard required 10–15 different data points: total counts, month-over-month deltas, recent records, and active project lists. Running these sequentially would create unacceptable latency for a page that loads on every login.",
          solution:
            "Each dashboard endpoint wraps all queries in a single Prisma $transaction array, running them in parallel. Admin dashboard executes 15 simultaneous queries — employee aggregates, application deltas, requisition deltas, product deltas, latest clients, active projects, and personal schedule — resolved in one round trip with destructured results.",
        },
      ],
      impact: [
        {
          title: "15+ API Modules",
          desc: "Full coverage of every business domain: users, admins, engineers, project managers, clients, projects, products, crews, payments, requisitions, applications, medias, project galleries, request products, notifications, and dashboard — all with search, filter, sort, paginate, and relation queries.",
        },
        {
          title: "5 User Roles — Full Isolation",
          desc: "Complete permission isolation across SUPER_ADMIN, ADMIN, PROJECT_MANAGER, ENGINEER, and CLIENT with role-gated API routes and purpose-built frontend dashboards. Each role only sees and acts on what they're authorized for.",
        },
        {
          title: "Real-time SSE Push",
          desc: "Instant notification delivery to all relevant users on every workflow event — payment submitted, requisition approved, application rejected — with no polling and no missed updates.",
        },
        {
          title: "Production Live",
          desc: "Dockerized with multi-stage build, health checks, and Docker Compose orchestration. Deployed to Vercel (frontend) and MongoDB Atlas (database), actively used for day-to-day company operations.",
        },
      ],
      learning:
        "This project deepened my understanding of designing multi-role enterprise systems where access control must be consistent across both the API and UI layers. Building the generic PrismaQueryBuilder taught me the value of abstraction — one well-designed utility eliminated hundreds of lines of repetitive query code across 15+ modules. Implementing SSE from scratch gave me practical experience with HTTP streaming, connection lifecycle management, and the trade-offs versus WebSockets for one-directional push scenarios. Designing parallel dashboard aggregation with Prisma $transaction highlighted the importance of minimizing database round trips for data-heavy endpoints. The project also reinforced clean module architecture — thin controllers, service-layer business logic, route-level Zod validation — as the pattern that scales best when a codebase grows to 15+ interconnected modules with complex permission requirements.",
      images: [
        {
          src: "https://raw.githubusercontent.com/aHasnat1997/Projects_Overviews/refs/heads/main/SMD_Internal_Management_System/assets/Admin dashboard.png",
          caption: "Admin Dashboard Overview",
        },
        {
          src: "https://raw.githubusercontent.com/aHasnat1997/Projects_Overviews/refs/heads/main/SMD_Internal_Management_System/assets/Engineer dashboard.png",
          caption: "Engineer Dashboard Overview",
        },
        {
          src: "https://raw.githubusercontent.com/aHasnat1997/Projects_Overviews/refs/heads/main/SMD_Internal_Management_System/assets/Project Manager dashboard.png",
          caption: "Project Manager Dashboard Overview",
        },
        {
          src: "https://raw.githubusercontent.com/aHasnat1997/Projects_Overviews/refs/heads/main/SMD_Internal_Management_System/assets/Admin _ All projects.jpg",
          caption: "All Projects",
        },
        {
          src: "https://raw.githubusercontent.com/aHasnat1997/Projects_Overviews/refs/heads/main/SMD_Internal_Management_System/assets/All Employees.png",
          caption: "All Employees",
        },
        {
          src: "https://raw.githubusercontent.com/aHasnat1997/Projects_Overviews/refs/heads/main/SMD_Internal_Management_System/assets/Admin _ Media.png",
          caption: "All Media View",
        },
        {
          src: "https://raw.githubusercontent.com/aHasnat1997/Projects_Overviews/refs/heads/main/SMD_Internal_Management_System/assets/View Employee Details - Profile - Personal Information.png",
          caption: "View Employee Details",
        },
      ],
    },
  },
]
