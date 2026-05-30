export const projectsData = [
    {
        id: 6,
        title: "Toolkito — Micro SaaS Toolkit",
        overview: "A live production Micro SaaS platform offering 10+ professional-grade AI-powered tools for images, PDFs, and videos — completely free, no signup required, no watermarks.",
        description: "Toolkito is a fully self-built Micro SaaS product live at toolkito.app. It provides professional-grade browser-based tools including an AI Background Remover, AI Image Upscaler (2x/4x/8x), Image to Text OCR, Image Compressor, Video to MP3 Converter, and an all-in-one PDF Toolkit (merge, split, compress, convert). The platform features a freemium usage model with daily limits, a blog for SEO content, a pricing page, and a clean modern UI. Built from scratch as a solo product — from design and development to deployment and SEO strategy.",
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
        techStack: [
            { category: "Frontend", tech: "Next.js, Tailwind CSS, React" },
            { category: "Backend", tech: "Next.js API Routes, Node.js" },
            { category: "AI / Processing", tech: "Sharp, FFmpeg, Tesseract.js, Remove.bg API" },
            { category: "Database", tech: "Supabase (PostgreSQL)" },
            { category: "Deployment", tech: "Vercel, Custom Domain" },
        ],
        impact: "Live Production SaaS",
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
        description: "This project involves a massive modernization effort, migrating a legacy Laravel 8 + Vue 2 codebase to a cutting-edge Vue 3 (Nuxt TS) and PHP Laravel 12 architecture. The platform empowers clients to control their digital listings without relying on third-party aggregators like Yext. It implements complex user role management via Spatie and features a high-performance, polished UI. Currently live in Switzerland serving thousands of real businesses.",
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
        techStack: [
            { category: "Frontend", tech: "Vue 3, Nuxt.js (TypeScript), Tailwind CSS" },
            { category: "Backend", tech: "PHP Laravel 12, Spatie Permissions" },
            { category: "Database", tech: "MySQL" },
            { category: "Architecture", tech: "SaaS, Multi-tenant, RESTful API" }
        ],
        impact: "2,800+ Businesses",
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
        description: "This platform replaces a human receptionist with an intelligent AI agent. The WhatsApp Voice Agent responds to customers around the clock using the company's own data — handling FAQs, booking appointments, and qualifying leads automatically. The system includes a full CRM with pipeline management, a calendar integration for scheduling, and a real-time dashboard for monitoring all interactions. Built to save businesses hours of manual work every day.",
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
        techStack: [
            { category: "Frontend", tech: "Next.js, Tailwind CSS" },
            { category: "Backend", tech: "Node.js, Laravel" },
            { category: "AI", tech: "OpenAI API, Whisper, TTS" },
            { category: "Messaging", tech: "WhatsApp Business API" },
            { category: "Database", tech: "MySQL, MongoDB" }
        ],
        impact: "24/7 AI Automation",
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

    // {
    //     id: 3,
    //     title: "Financial Dashboard",
    //     overview: "A personal finance tracking application that provides real-time insights based on user inputs — helping individuals visualize spending, track budgets, and make smarter financial decisions.",
    //     description: "This application transforms raw financial data into actionable insights. Users input their income, expenses, and financial goals. The dashboard processes this data and generates visual reports including spending breakdowns, budget tracking, savings progress, and financial forecasts. Designed for individuals who want clarity over their finances without complex spreadsheets.",
    //     features: [
    //         "Real-time Financial Data Processing",
    //         "Income & Expense Tracking",
    //         "Budget Management with Visual Alerts",
    //         "Spending Category Breakdown (Charts)",
    //         "Savings Goal Tracker",
    //         "Monthly & Yearly Financial Reports",
    //         "Responsive Dashboard UI"
    //     ],
    //     techStack: [
    //         { category: "Frontend", tech: "React.js, Tailwind CSS, Chart.js" },
    //         { category: "Backend", tech: "Node.js, Express" },
    //         { category: "Database", tech: "MongoDB" },
    //         { category: "Languages", tech: "JavaScript" }
    //     ],
    //     mainImage: "/todoapp.png",
    //     images: [
    //         "/todoapp.png"
    //     ],
    //     demoUrl: "",
    //     githubUrl: "#",
    //     tags: ["React", "Node.js", "MongoDB", "Chart.js", "TailwindCSS", "Finance"]
    // },

    {
        id: 4,
        title: "Ecommerce Web App",
        overview: "A comprehensive ecommerce web application designed for a seamless shopping experience. Built with a robust React frontend and a powerful PHP Laravel backend.",
        description: "This project represents a full-stack ecommerce solution. It includes features like user authentication, product search and filtering, a dynamic shopping cart, and an admin dashboard for inventory management. The application is optimized for performance and SEO.",
        features: [
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
        description: "This application enables users to join chat rooms and send messages in real-time. It features live user status updates, message notifications, and a clean, modern interface. Demonstrates proficiency in handling WebSocket connections and managing ephemeral state.",
        features: [
            "Real-time Messaging using Socket.io",
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