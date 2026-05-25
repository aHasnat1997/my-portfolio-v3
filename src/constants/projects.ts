export const ProjectsData = [
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
      role: "Fullstack Developer",
      scope: "PDF Tools Platform",
      focus: "PDF Processing + UX + Modern Stack",
      overview:
        "Dove-PDF is an online PDF tools platform that simplifies document management for users. Upload PDFs or images, edit content, merge multiple files, compress for optimization, and download processed documents—all through a clean, intuitive web interface.",
      vision:
        "Create a simple yet powerful PDF toolkit accessible to everyone, with a scalable architecture ready for future tool additions.",
      audience:
        "Clean, distraction-free interface that guides users through upload, processing, and download workflows with minimal friction.",
      outcome:
        "A production-ready PDF platform with core editing features, monetization through ads, and extensible architecture for new tools.",
      problem:
        "Users need quick, reliable tools to manage PDF documents without installing desktop software. The challenge was to build a web-based platform that handles PDF uploads, editing, merging, and compression efficiently while maintaining file quality and security. The system needed to process files client-side when possible for privacy, handle large files gracefully, provide instant feedback, and support a scalable architecture for adding more PDF tools. Additionally, the platform required ad integration for monetization without compromising user experience.",
      solution:
        "I delivered a comprehensive PDF tools platform using a modern TypeScript stack. The frontend is built with React and Vite, featuring drag-and-drop file uploads, real-time processing feedback, and a clean TailwindCSS interface. I integrated PDF-lib for client-side PDF manipulation, enabling editing, merging, and compression without server round-trips for enhanced privacy. The backend API, built with Express and tRPC, processing coordination, and serves optimized files. The monorepo architecture with Turborepo ensures maintainability and easy addition of new tools. Google Ads integration provides monetization while maintaining a clean user experience.",
      responsibilities: [
        "Architected the PDF processing pipeline with client-side and server-side components",
        "Implemented PDF upload, editing, merging, and compression features using PDF-lib",
        "Built drag-and-drop file upload interface with real-time progress feedback",
        "Designed clean, intuitive UI with TailwindCSS for seamless user workflows",
        "Integrated Google Ads placements strategically for monetization",
        "Created scalable backend API with tRPC for file handling and processing coordination",
        "Optimized file processing for performance and memory efficiency",
        "Set up monorepo structure for easy addition of future PDF tools",
      ],
      techStack: {
        frontend: "React, Vite, TailwindCSS, TypeScript, PDF-lib",
        backend: "Express, tRPC, TypeScript, File Processing APIs",
        processing: "PDF-lib, Canvas API, File API, Blob handling",
        infrastructure: "Bun runtime, Turborepo, Google Ads, Git",
      },
      contributions: [
        "Built the complete PDF upload system with file validation, and preview",
        "Implemented PDF editing features using PDF-lib for text, annotations, and modifications",
        "Created PDF merge functionality with reorderable file list and batch processing",
        "Developed compression algorithm integration to optimize PDF file sizes",
        "Designed and built the clean, user-friendly interface with TailwindCSS",
        "Integrated Google Ads with strategic placement for optimal monetization",
        "Implemented file processing pipeline with progress tracking and error handling",
        "Set up backend API with tRPC for file storage and processing coordination",
        "Optimized client-side processing for performance and memory management",
        "Created extensible architecture for easy addition of new PDF tools",
      ],
      challenges: [
        {
          title: "Large file handling and performance",
          problem:
            "Processing large PDF files in the browser can cause memory issues and slow performance, leading to poor user experience.",
          solution:
            "Implemented chunked file processing with Web Workers for heavy operations, added progress indicators, and optimized memory usage by processing files in streams where possible.",
        },
        {
          title: "PDF manipulation complexity",
          problem:
            "PDF editing, merging, and compression require complex operations while maintaining document integrity and quality.",
          solution:
            "Integrated PDF-lib for robust client-side manipulation, implemented validation checks at each step, and created fallback server-side processing for complex operations.",
        },
        {
          title: "Monetization without disruption",
          problem:
            "Integrating ads for revenue while maintaining a clean, user-friendly interface without disrupting the workflow.",
          solution:
            "Strategically placed Google Ads in non-intrusive locations, implemented lazy loading for ad scripts, and ensured ads don't interfere with core PDF processing functionality.",
        },
      ],
      impact: [
        {
          title: "Complete PDF toolkit",
          desc: "Delivered all core features: upload, edit, merge, compress, and download with intuitive workflows.",
        },
        {
          title: "Fast processing",
          desc: "Client-side processing provides instant feedback and enhanced privacy for users.",
        },
        {
          title: "Scalable architecture",
          desc: "Modular design allows easy addition of new PDF tools and features as needed.",
        },
        {
          title: "Monetization ready",
          desc: "Google Ads integration provides revenue stream without compromising user experience.",
        },
      ],
      learning:
        "This project deepened my understanding of client-side PDF manipulation, file processing optimization, and memory management for large files in the browser. I gained valuable experience with PDF-lib, Web Workers for performance, and balancing feature richness with simplicity in user interface design. The challenge of integrating monetization while maintaining user experience taught me important lessons about strategic ad placement.",
      images: [
        {
          src: "https://raw.githubusercontent.com/aHasnat1997/Projects_Overviews/refs/heads/main/Dove-PDF/assets/image-1.png",
          caption: "Hero Section",
        },
        {
          src: "https://raw.githubusercontent.com/aHasnat1997/Projects_Overviews/refs/heads/main/Dove-PDF/assets/image-2.png",
          caption: "PDF editing interface",
        },
        {
          src: "https://raw.githubusercontent.com/aHasnat1997/Projects_Overviews/refs/heads/main/Dove-PDF/assets/image-3.png",
          caption: "Full Landing Page",
        },
      ],
    },
  },
]
