export const projectsData = [
    {
        id: 8,
        title: "MediCore — Enterprise Hospital Management System (HMS)",
        overview: "A production-grade, multi-portal healthcare management ecosystem featuring a 4-level authentication panel (Super Admin, Doctor, Staff, Patient), config-driven clinical interfaces, interactive 32-tooth dental charting, and real-time hospital operations.",
        overview_ur: "4-level authentication panel (Super Admin, Doctor, Staff, Patient), config-driven clinical interfaces, interactive 32-tooth dental charting aur real-time hospital operations par mushtamil enterprise healthcare management system.",
        description: "MediCore HMS is an enterprise healthcare ERP engineered for multi-specialty hospitals, surgical clinics, and healthcare networks. Built on a headless architecture pairing a high-throughput Laravel 12 REST API with a Next.js 14/16 App Router frontend, it features a comprehensive 4-level login panel and multi-guard access control system tailored for four distinct user tiers: Super Admin (hospital governance, financial P&L, bed occupancy, doctor rosters), Doctor (specialty-tailored clinical dashboards, EMR SOAP notes, diagnostic orders), Staff (nursing triage, pharmacy dispensing, billing desks), and Patient (appointment scheduling, medical records, digital bill payments). It includes 1-click zero-friction demo sandbox authentication for all 4 roles, a dynamic config-driven physician portal where clinical modules (ICU, OT, Dental) toggle based on JSON schema, an interactive SVG 32-tooth dental chart with FDI notation, live ward bed occupancy tracking, and Recharts analytics for hospital census and department workloads.",
        description_ur: "MediCore HMS aik enterprise healthcare ERP hai jo multi-specialty hospitals aur clinics ke liye engineer kiya gaya hai. Isme Laravel 12 REST API aur Next.js frontend headless architecture par shamil hain, jisme 4 roles (Super Admin, Doctor, Staff, Patient) ke liye 1-click zero-friction sandbox login, JSON config-driven physician portal, interactive SVG 32-tooth dental chart with FDI notation, live ward bed tracking aur Recharts hospital analytics shamil hain.",
        features: [
            "4-Level Role-Based Login Panel & Multi-Guard Auth (Super Admin, Doctor, Staff, Patient)",
            "Instant 1-Click Demo Sandbox Switching Across All 4 Portal User Tiers",
            "Super Admin Portal: Hospital governance, ward bed mapping, and department revenue analytics",
            "Doctor Portal: Config-driven specialty views (OT, Dental, ICU) rendered dynamically via JSON configs",
            "Interactive Clinical Dental Chart (32 teeth mapped with FDI notation & condition color coding)",
            "Live Ward & Bed Occupancy Grid with Real-Time Available/Occupied/Cleaning Tracking",
            "Patient Portal: Online appointment booking, lab results history, and digital invoice payment",
            "Staff Portal: Front-desk triage, nursing workflows, and pharmacy medication dispensing",
            "Super Admin Analytics Suite (Census, Department Revenue, Demographic KPIs via Recharts)",
            "Robust Database Architecture (25 PostgreSQL tables, 20 Eloquent models, 27 API controllers)"
        ],
        features_ur: [
            "4-Level Role-Based Login Panel & Multi-Guard Auth (Super Admin, Doctor, Staff, Patient)",
            "Instant 1-Click Demo Sandbox Switching 4 Portals Ke Darmiyan",
            "Super Admin Portal: Hospital governance, ward bed mapping, aur department revenue analytics",
            "Doctor Portal: Config-driven specialty views (OT, Dental, ICU) jo JSON configs se render hoti hain",
            "Interactive Clinical Dental Chart (32 daant mapped FDI notation aur condition color coding ke sath)",
            "Live Ward & Bed Occupancy Grid real-time Available/Occupied/Cleaning tracking ke sath",
            "Patient Portal: Online appointment booking, lab results history, aur digital bill payment",
            "Staff Portal: Front-desk triage, nursing workflows, aur pharmacy medication dispensing",
            "Super Admin Analytics Suite (Census, Department Revenue, Demographic KPIs Recharts ke zariye)",
            "Mazboot Database Architecture (25 PostgreSQL tables, 20 Eloquent models, 27 API controllers)"
        ],
        techStack: [
            { category: "Frontend", tech: "Next.js 14/16 (App Router), React 19, TypeScript, Tailwind CSS 4" },
            { category: "Backend", tech: "PHP Laravel 12 (REST API), Laravel Sanctum (Multi-Guard Auth)" },
            { category: "Access Control", tech: "4-Level RBAC Portals (Super Admin, Doctor, Staff, Patient)" },
            { category: "Database & ORM", tech: "PostgreSQL, Eloquent ORM, Database Seeders & Factories" },
            { category: "UI & Visuals", tech: "shadcn/ui, Recharts, Lucide Icons, Custom SVG Dental Engine" },
            { category: "State & Data", tech: "TanStack React Query, Zustand, Axios, Zod Validation" },
        ],
        impact: "Enterprise Healthcare ERP",
        impact_ur: "Enterprise Healthcare ERP",
        mainImage: "/hms/landing.png",
        images: [
            "/hms/admin-dashboard.png",
            "/hms/admin-analytics.png",
            "/hms/admin-revenue.png",
            "/hms/login.png",
            "/hms/doctor-dental.png",
            "/hms/doctor-dashboard.png",
            "/hms/bed-management.png",
            "/hms/patient-dashboard.png",
            "/hms/staff-dashboard.png",
        ],
        demoUrl: "",
        githubUrl: "https://github.com/GitByHamza/Hospital-Management-System",
        tags: ["Laravel 12", "Next.js", "PostgreSQL", "Tailwind CSS", "Recharts", "TypeScript"],
    },

    {
        id: 7,
        title: "TXS — Enterprise Tech Store & PC Builder OS",
        overview: "A custom high-end e-commerce and retail management ecosystem built specifically for computer, gaming hardware, and electronics retailers — featuring an automated PC Builder compatibility engine, multi-branch inventory, and serial number warranty tracking.",
        overview_ur: "Computer hardware, gaming rigs aur CCTV electronics retailers ke liye khas tor par tayyar shuda high-end e-commerce aur retail OS — automated PC Builder compatibility engine, multi-branch stock sync, aur serial number warranty tracking ke sath.",
        description: "TXS is a production-grade retail OS tailored for technology and hardware retailers. It unifies physical branch inventories (e.g. Hafeez Centre, Techno City) and online storefront sales into a single screen. Features a custom PC Builder engine that automatically validates hardware compatibility (CPU sockets AM5/LGA1700, DDR4/DDR5 RAM, wattage headroom, and GPU chassis clearance) in real-time. Includes hardware serial number lifecycle tracking (IN_STOCK, SOLD, RMA) to eliminate counterfeit returns and streamline warranty claims.",
        description_ur: "TXS technology aur hardware retailers ke liye tayyar shuda production retail OS hai. Yeh physical branches (maslan Hafeez Centre, Techno City) aur online store ke stock ko ek live screen par combine karta hai. Isme custom PC Builder engine hai jo CPU sockets AM5/LGA1700, DDR4/DDR5 RAM, power supply wattage aur GPU clearance ko real-time validate karta hai. Hardware serial number lifecycle tracking (IN_STOCK, SOLD, RMA) warranty claims ko asaan banati hai.",
        features: [
            "Real-Time PC Builder Compatibility Engine (Sockets, Form Factor, Wattage)",
            "Multi-Branch Stock Synchronization (Physical Outlets + Online Store)",
            "Hardware Serial Number & RMA Warranty Tracking",
            "Granular Role-Based Access Control (Super Admin, Branch Manager, Staff)",
            "Dynamic CMS & Site Control Panel (Themes, Menus, Branding)",
            "Automated WhatsApp Order & Custom PC Build Sharing",
            "High-Performance Dark Cyberpunk Luxury Aesthetics",
            "Full Discount Code & Promotional Campaign Engine",
            "Automated PDF Receipt & Template Generation",
            "Zero-Friction 1-Click Administrative Demo Mode"
        ],
        features_ur: [
            "Real-Time PC Builder Compatibility Engine (Sockets, Form Factor, Wattage)",
            "Multi-Branch Stock Synchronization (Physical Outlets + Online Store)",
            "Hardware Serial Number & RMA Warranty Tracking",
            "Granular Role-Based Access Control (Super Admin, Branch Manager, Staff)",
            "Dynamic CMS & Site Control Panel (Themes, Menus, Branding)",
            "Automated WhatsApp Order & Custom PC Build Sharing",
            "High-Performance Dark Cyberpunk Luxury Aesthetics",
            "Full Discount Code & Promotional Campaign Engine",
            "Automated PDF Receipt & Template Generation",
            "Zero-Friction 1-Click Administrative Demo Mode"
        ],
        techStack: [
            { category: "Frontend", tech: "Next.js 16 (App Router), React 19, Tailwind CSS 4" },
            { category: "Backend", tech: "Next.js Server Actions, Node.js" },
            { category: "Database & ORM", tech: "PostgreSQL, Prisma ORM v7" },
            { category: "Auth & Security", tech: "NextAuth.js, Granular RBAC (Spatie-style)" },
            { category: "Deployment", tech: "Vercel, Hosted PostgreSQL" },
        ],
        impact: "Enterprise Tech Retail OS",
        impact_ur: "Enterprise Tech Retail OS",
        mainImage: "/txs/home.png",
        images: [
            "/txs/home.png",
            "/txs/products.png",
            "/txs/product details.png",
            "/txs/RIG BUILDER.png",
            "/txs/rig builder full.png",
            "/txs/dashboard.png",
            "/txs/dashboard products.png",
            "/txs/admin warranty.png",
            "/txs/admin site control.png",
            "/txs/dashboard email system.png"
        ],
        demoUrl: "https://store-demo-eight.vercel.app/",
        offerUrl: "/solutions/tech-retail",
        githubUrl: "https://github.com/GitByHamza/Enterprise-Tech-Ecom",
        tags: ["Next.js", "React", "Prisma", "PostgreSQL", "Tailwind CSS", "TypeScript"],
    },

    {
        id: 9,
        title: "Nexus Gaming — Console & Disc Retail OS",
        overview: "A specialized video game and console retail commerce platform featuring an instant trade-in buyback engine, laser optical disc condition verification, motherboard serial RMA tracking, and an enterprise counter POS.",
        overview_ur: "Gaming consoles, game discs aur trade-in retailers ke liye bespoke retail commerce OS — instant trade-in valuation engine, scratch-free disc condition grading, motherboard serial RMA tracking, aur backoffice POS ke sath.",
        description: "Nexus Gaming OS is an end-to-end retail operating system built specifically for console boutiques, physical disc retailers, and trade-in shops across the UK and international markets. It features a real-time trade-in valuation engine calculating instant cash vs store credit (+18% bonus), multi-branch stock sync (Central Hub, City Showroom, Express Warehouse), motherboard serial number verification to combat part-swapping fraud, optical disc laser condition grading, and a full administrative counter POS with order dispatch workflows.",
        description_ur: "Nexus Gaming OS video game consoles, physical disc retailers aur trade-in dukandaroon ke liye tayyar shuda mukammal retail operating system hai. Isme real-time trade-in valuation calculator (cash vs store credit bonus), multi-branch inventory sync, console motherboard serial verification, disc optical condition grading, aur complete admin counter POS dashboard shamil hain.",
        features: [
            "CEX-Style Instant Console & Game Disc Trade-In Valuation Engine",
            "Cash Payout vs Store Credit (+18% bonus) Automated Calculation",
            "Multi-Branch Stock Synchronization (Hub, Showroom, Warehouse)",
            "Motherboard Serial Number & Anti-Tamper Security Seal Tracking",
            "Optical Disc Laser Condition Grading (Mint, Very Good, Fair)",
            "Multi-Step Checkout with Tracked Courier & Showroom Pickup",
            "Tri-Currency Real-Time Switching (GBP £, USD $, PKR Rs)",
            "Digital Retail Warranty Certificate & Order Receipt Generation",
            "Automated WhatsApp Order & Trade-In Booking Dispatch",
            "Full Multi-Page Admin Backoffice (Dashboard, Inventory, Serials, Orders, Trade-In)"
        ],
        features_ur: [
            "CEX-Style Instant Console & Game Disc Trade-In Valuation Engine",
            "Cash Payout vs Store Credit (+18% bonus) Automated Calculation",
            "Multi-Branch Stock Synchronization (Hub, Showroom, Warehouse)",
            "Motherboard Serial Number & Anti-Tamper Security Seal Tracking",
            "Optical Disc Laser Condition Grading (Mint, Very Good, Fair)",
            "Multi-Step Checkout with Tracked Courier & Showroom Pickup",
            "Tri-Currency Real-Time Switching (GBP £, USD $, PKR Rs)",
            "Digital Retail Warranty Certificate & Order Receipt Generation",
            "Automated WhatsApp Order & Trade-In Booking Dispatch",
            "Full Multi-Page Admin Backoffice (Dashboard, Inventory, Serials, Orders, Trade-In)"
        ],
        techStack: [
            { category: "Frontend", tech: "React 19, React Router v7, Tailwind CSS, Lucide Icons" },
            { category: "Architecture", tech: "Client-Side Reactive State (StoreContext), Multi-Route SPA" },
            { category: "Internationalization", tech: "Tri-Currency Engine (GBP, USD, PKR) with Live Normalization" },
            { category: "Admin Suite", tech: "Multi-Node Inventory, Tamper RMA Registry, Trade-In Appraisals" },
            { category: "Deployment", tech: "Vercel Edge Network" },
        ],
        impact: "Console & Game Retail OS",
        impact_ur: "Console & Game Retail OS",
        mainImage: "/console/home.png",
        images: [
            "/console/home.png",
            "/console/product.png",
            "/console/admin.png",
            "/console/trade-in.png"
        ],
        demoUrl: "https://console-store-demo.vercel.app/",
        offerUrl: "/solutions/console-retail",
        tags: ["React", "JavaScript", "Tailwind CSS", "Retail OS", "E-Commerce", "Trade-In"],
    },

    {
        id: 6,
        title: "Toolkito — Micro SaaS Toolkit",
        overview: "A live production Micro SaaS platform offering 10+ professional-grade AI-powered tools for images, PDFs, and videos — completely free, no signup required, no watermarks.",
        overview_ur: "10+ professional AI tools (image upscaling, background removal, PDF conversions, OCR extraction, video to audio) faraham karne wala live production Micro SaaS platform — baghair kisi signup ya watermark ke.",
        description: "Toolkito is a fully self-built Micro SaaS product live at toolkito.app. It provides professional-grade browser-based tools including an AI Background Remover, AI Image Upscaler (2x/4x/8x), Image to Text OCR, Image Compressor, Video to MP3 Converter, and an all-in-one PDF Toolkit (merge, split, compress, convert). The platform features a freemium usage model with daily limits, a blog for SEO content, a pricing page, and a clean modern UI. Built from scratch as a solo product — from design and development to deployment and SEO strategy.",
        description_ur: "Toolkito ek mukammal self-built Micro SaaS product hai jo live toolkito.app par dastyab hai. Yeh browser-based tools faraham karta hai jisme AI Background Remover, AI Image Upscaler (2x/4x/8x), Image to Text OCR, Image Compressor, Video to MP3 Converter, aur all-in-one PDF Toolkit shamil hain. Freemium usage model, daily limits, aur SEO blog ke sath solo engineer ke tor par tayyar kiya gaya.",
        features: [
            "AI Background Remover (PNG/JPG/WebP, 5/day free)",
            "AI Image Upscaler — 2x, 4x, 8x quality enhancement",
            "Image to Text OCR (screenshots, photos, scanned docs)",
            "Image Compressor — up to 80% size reduction, no quality loss",
            "Video to MP3 Converter (MP4, AVI, MOV support)",
            "PDF Tools — Merge, Split, Compress, PDF to PNG/Word",
            "Freemium model with daily usage limits",
            "SEO Blog with tool-specific content",
            "No signup, no watermarks — completely free tier",
            "Responsive, modern UI with dark mode support",
        ],
        features_ur: [
            "AI Background Remover (PNG/JPG/WebP, 5/din free)",
            "AI Image Upscaler — 2x, 4x, 8x quality barhane ke liye",
            "Image to Text OCR (screenshots, photos, scanned documents)",
            "Image Compressor — 80% tak size kam karein baghair quality kharab kiye",
            "Video to MP3 Converter (MP4, AVI, MOV support)",
            "PDF Tools — Merge, Split, Compress, PDF to PNG/Word",
            "Daily usage limits ke sath Freemium model",
            "Tool-specific content ke sath SEO Blog",
            "Bina signup, bina kisi watermark ke — bilkul free tier",
            "Dark mode support ke sath responsive, modern UI"
        ],
        techStack: [
            { category: "Frontend", tech: "Next.js, Tailwind CSS, React" },
            { category: "Backend", tech: "Next.js API Routes, Node.js" },
            { category: "AI / Processing", tech: "Sharp, FFmpeg, Tesseract.js, Remove.bg API" },
            { category: "Database", tech: "Supabase (PostgreSQL)" },
            { category: "Deployment", tech: "Vercel, Custom Domain" },
        ],
        impact: "Live Production SaaS",
        impact_ur: "Live Production SaaS",
        mainImage: "/toolkito.png",
        images: [
            "/toolkito.png",
        ],
        demoUrl: "https://toolkito.app",
        githubUrl: "#",
        tags: ["Next.js", "Micro SaaS", "AI Tools", "Tailwind CSS", "Supabase", "Vercel", "Node.js"],
    },

    {
        id: 1,
        title: "Myls (SaaS Platform)",
        overview: "A production SaaS platform for a Swiss company with 2,800+ active business locations, enabling businesses to manage their presence across 37+ platforms (Google, Facebook, Apple Maps, etc.) from a single dashboard.",
        overview_ur: "Switzerland ki aik company ke liye production SaaS platform jo 2,800+ active business locations ko serve karta hai, aur karobaron ko 37+ platforms (Google, Facebook, Apple Maps) par apni digital listings manage karne ki ijazat deta hai.",
        description: "This project involves a massive modernization effort, migrating a legacy Laravel 8 + Vue 2 codebase to a cutting-edge Vue 3 (Nuxt TS) and PHP Laravel 12 architecture. The platform empowers clients to control their digital listings without relying on third-party aggregators like Yext. It implements complex user role management via Spatie and features a high-performance, polished UI. Currently live in Switzerland serving thousands of real businesses.",
        description_ur: "Is project mein legacy Laravel 8 + Vue 2 codebase ko cutting-edge Vue 3 (Nuxt TS) aur PHP Laravel 12 architecture par migrate kiya gaya. Platform clients ko third-party aggregators (jaise Yext) ke baghair direct control deta hai. Spatie ke zariye complex user role management aur high-performance UI implement ki gayi hai jo Switzerland mein hazaron real businesses serve kar rahi hai.",
        features: [
            "2,800+ Active Business Locations in Production",
            "Multi-platform Business Listing Management (37+ Platforms)",
            "Role-Based Access Control (RBAC) using Spatie",
            "Modern UI/UX Redesign (Vue 3 + Tailwind)",
            "Direct API Integrations (Replacing Yext)",
            "Real-time Analytics Dashboard",
            "Multi-language Support (Swiss Market)",
            "Laravel 8 → Laravel 12 Migration",
            "Vue 2 → Vue 3 (Nuxt 4) Upgrade"
        ],
        features_ur: [
            "Production mein 2,800+ Active Business Locations",
            "Multi-platform Business Listing Management (37+ Platforms)",
            "Spatie ke zariye Role-Based Access Control (RBAC)",
            "Modern UI/UX Redesign (Vue 3 + Tailwind CSS)",
            "Direct API Integrations (Yext ko replace karte hue)",
            "Real-time Analytics Dashboard",
            "Multi-language Support (Swiss Market)",
            "Laravel 8 → Laravel 12 Migration",
            "Vue 2 → Vue 3 (Nuxt 4) Upgrade"
        ],
        techStack: [
            { category: "Frontend", tech: "Vue 3, Nuxt.js (TypeScript), Tailwind CSS" },
            { category: "Backend", tech: "PHP Laravel 12, Spatie Permissions" },
            { category: "Database", tech: "MySQL" },
            { category: "Architecture", tech: "SaaS, Multi-tenant, RESTful API" }
        ],
        impact: "2,800+ Businesses",
        impact_ur: "2,800+ Businesses",
        mainImage: "/myls.png",
        images: [
            "/myls1.png",
            "/myls2.png",
            "/myls3.png"
        ],
        demoUrl: "https://app.myls.ch",
        githubUrl: "#",
        tags: ["Vue 3", "Nuxt (TS)", "Laravel 12", "Spatie", "MySQL", "TailwindCSS", "SaaS"]
    },

    {
        id: 2,
        title: "AI Receptionist Agent",
        overview: "A full-stack AI-powered business automation platform featuring a WhatsApp Voice Agent that handles customer inquiries 24/7, complete with CRM, pipelines, calendar management, and appointment booking.",
        overview_ur: "Full-stack AI business automation platform jisme WhatsApp Voice & Text Agent shamil hai jo 24/7 customer inquiries handle karta hai, CRM, pipelines, calendar management aur appointment booking ke sath.",
        description: "This platform replaces a human receptionist with an intelligent AI agent. The WhatsApp Voice Agent responds to customers around the clock using the company's own data — handling FAQs, booking appointments, and qualifying leads automatically. The system includes a full CRM with pipeline management, a calendar integration for scheduling, and a real-time dashboard for monitoring all interactions. Built to save businesses hours of manual work every day.",
        description_ur: "Yeh platform human receptionist ko aik intelligent AI agent se replace karta hai. WhatsApp Voice Agent company ke apne data ko use karte hue 24/7 customers ko reply karta hai — FAQs, appointments booking aur lead qualification automatically handle karta hai.",
        features: [
            "WhatsApp AI Voice Agent (24/7 Customer Replies)",
            "Company Knowledge Base Integration",
            "Automated Appointment Booking",
            "Full CRM with Pipeline Management",
            "Calendar & Scheduling System",
            "Real-time Interaction Dashboard",
            "Lead Qualification Automation",
            "Multi-channel Communication Support"
        ],
        features_ur: [
            "WhatsApp AI Voice Agent (24/7 Customer Replies)",
            "Company Knowledge Base Integration",
            "Automated Appointment Booking",
            "Full CRM with Pipeline Management",
            "Calendar & Scheduling System",
            "Real-time Interaction Dashboard",
            "Lead Qualification Automation",
            "Multi-channel Communication Support"
        ],
        techStack: [
            { category: "Frontend", tech: "Next.js, Tailwind CSS" },
            { category: "Backend", tech: "Node.js, Laravel" },
            { category: "AI", tech: "OpenAI API, Whisper, TTS" },
            { category: "Messaging", tech: "WhatsApp Business API" },
            { category: "Database", tech: "MySQL, MongoDB" }
        ],
        impact: "24/7 AI Automation",
        impact_ur: "24/7 AI Automation",
        mainImage: "/ai/main.png",
        images: [
            "/ai/pipelines.png",
            "/ai/Calendar.png",
            "/ai/CompanyData.png",
        ],
        demoUrl: "",
        githubUrl: "#",
        tags: ["Next.js", "Node.js", "OpenAI", "WhatsApp API", "CRM", "AI Agent", "Laravel"]
    },

    {
        id: 4,
        title: "Ecommerce Web App",
        overview: "A comprehensive ecommerce web application designed for a seamless shopping experience. Built with a robust React frontend and a powerful PHP Laravel backend.",
        overview_ur: "Seamless shopping experience ke liye mukammal e-commerce web application. React frontend aur PHP Laravel backend ke sath build ki gayi hai.",
        description: "This project represents a full-stack ecommerce solution. It includes features like user authentication, product search and filtering, a dynamic shopping cart, and an admin dashboard for inventory management. The application is optimized for performance and SEO.",
        description_ur: "Yeh project aik full-stack e-commerce solution hai jisme user authentication, product search aur filtering, dynamic shopping cart, aur inventory management ke liye admin dashboard shamil hain.",
        features: [
            "User Authentication & Authorization",
            "Product Search, Filtering & Sorting",
            "Dynamic Shopping Cart & Checkout",
            "Admin Dashboard for Product Management",
            "Responsive Design for Mobile & Desktop",
            "Secure Payment Gateway Integration"
        ],
        features_ur: [
            "User Authentication & Authorization",
            "Product Search, Filtering & Sorting",
            "Dynamic Shopping Cart & Checkout",
            "Admin Dashboard for Product Management",
            "Responsive Design for Mobile & Desktop",
            "Secure Payment Gateway Integration"
        ],
        techStack: [
            { category: "Frontend", tech: "React.js, Tailwind CSS, Bootstrap" },
            { category: "Backend", tech: "PHP Laravel 8.3" },
            { category: "Database", tech: "MongoDB, MySQL" },
            { category: "Languages", tech: "JavaScript, PHP" }
        ],
        impact: "Full E-commerce Suite",
        impact_ur: "Full E-commerce Suite",
        mainImage: "/hard.png",
        images: [
            "/hard.png",
            "/product.png",
            "/checkout.png",
            "/modal.png",
            "/details.png",
        ],
        demoUrl: "https://houseofardesigns.com/",
        githubUrl: "#",
        tags: ["React Js", "Php Laravel 8.3", "TailwindCSS", "Bootstrap", "MongoDB", "Javascript"]
    },

    {
        id: 5,
        title: "Realtime Chat Application",
        overview: "A lightning-fast real-time chat application allowing users to communicate instantly. Leveraging the power of Node.js and Socket.io for low-latency messaging.",
        overview_ur: "Tez tareen real-time chat application jo users ko fori communicate karne ki saholat deti hai. Node.js aur Socket.io ke zariye low-latency messaging.",
        description: "This application enables users to join chat rooms and send messages in real-time. It features live user status updates, message notifications, and a clean, modern interface. Demonstrates proficiency in handling WebSocket connections and managing ephemeral state.",
        description_ur: "Yeh application users ko chat rooms join karne aur real-time messages send karne ki ijazat deti hai. Live user online/offline status, message notifications aur clean modern interface iska hissa hain.",
        features: [
            "Real-time Messaging using Socket.io",
            "Live User Online/Offline Status",
            "Multiple Chat Rooms",
            "Typing Indicators",
            "Responsive Chat Interface",
            "Message Timestamping"
        ],
        features_ur: [
            "Socket.io ke zariye Real-time Messaging",
            "Live User Online/Offline Status",
            "Multiple Chat Rooms",
            "Typing Indicators",
            "Responsive Chat Interface",
            "Message Timestamping"
        ],
        techStack: [
            { category: "Frontend", tech: "React.js, Tailwind CSS" },
            { category: "Backend", tech: "Node.js, Express" },
            { category: "Real-time", tech: "Socket.io" },
            { category: "Database", tech: "MongoDB" }
        ],
        impact: "Real-time Messaging",
        impact_ur: "Real-time Messaging",
        mainImage: "/chatapp.png",
        images: [
            "/chatapp.png",
            "https://dribbble.com/shots/822440-Chat-App-iOS-Icon/attachments/85095",
        ],
        demoUrl: "",
        githubUrl: "https://github.com/GitByHamza/MERN-CHAT-APP",
        tags: ["React", "TailwindCSS", "Node.js", "Socket.io", "MongoDB"]
    },
];

export function getLocalizedProject(project, lang) {
    if (!project) return null
    const isUrdu = lang === 'ur-en'
    return {
        ...project,
        overview: (isUrdu && project.overview_ur) ? project.overview_ur : project.overview,
        description: (isUrdu && project.description_ur) ? project.description_ur : project.description,
        impact: (isUrdu && project.impact_ur) ? project.impact_ur : project.impact,
        features: (isUrdu && project.features_ur) ? project.features_ur : project.features,
    }
}