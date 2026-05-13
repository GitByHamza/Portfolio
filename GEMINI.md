# 🌌 Hamza's Portfolio - Project Blueprint

Welcome to the definitive architectural guide and project blueprint for **Hamza's Professional Portfolio**. This document serves as the primary source of truth for project standards, technical architecture, and development workflows.

---

## 🚀 Project Overview

A high-performance, visually stunning, and interactive personal portfolio showcasing full-stack expertise, AI integration, and modern web aesthetics. This project is built with a focus on immersive UX, leveraging 3D graphics, smooth animations, and a robust backend.

- **URL:** [Live Demo](https://your-portfolio-url.com) (Placeholder)
- **Primary Focus:** UI/UX Excellence, 3D Interactivity, Full-stack Capabilities.

---

## 🛠 Tech Stack

### Frontend Core
- **Framework:** [React 19](https://react.dev/) (Functional Components, Hooks)
- **Build Tool:** [Vite 7](https://vitejs.dev/)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/) (using `@tailwindcss/vite`)
- **Animations:** [Framer Motion](https://www.framer.com/motion/), [GSAP](https://gsap.com/)
- **Smooth Scrolling:** [Lenis](https://lenis.darkroom.engineering/)

### 3D & Visuals
- **3D Engine:** [Three.js](https://threejs.org/) via `@react-three/fiber` & `@react-three/drei`
- **Post-processing:** `@react-three/postprocessing`
- **Backgrounds:** Custom Aurora and Star backgrounds.

### Backend & Infrastructure
- **BaaS:** [Supabase](https://supabase.com/) (Authentication, Database, Edge Functions)
- **Deployment:** [Vercel](https://vercel.com/) (Recommended)

---

## 📂 Directory Structure

```text
D:\SE\Portfolio\Portfolio\
├── public/                 # Static assets (3D models, images, icons)
├── src/
│   ├── assets/             # SVGs and component-specific assets
│   ├── components/         # Atomic and Layout components
│   │   ├── 3D/             # HeroScene3D, etc.
│   │   ├── UI/             # Buttons, Modals, Skeletons
│   │   └── Sections/       # Hero, About, Projects, Contact, etc.
│   ├── data/               # Static content (projects.js, testimonials.js)
│   ├── hooks/              # Custom React hooks (useDarkMode, etc.)
│   ├── lib/                # Utility configurations (supabase.js, utils.js)
│   ├── pages/              # Main route entries (Home, ProjectDetails, Admin)
│   ├── App.jsx             # Main Application Entry & Routing
│   ├── index.css           # Global styles and Tailwind directives
│   └── main.jsx            # React DOM mounting
└── supabase_schema.sql     # Database structure for portability
```

---

## 🎨 Development Standards & Conventions

### 1. Styling & UI
- **Tailwind First:** Always prefer Tailwind utility classes for styling.
- **Consistency:** Use the `cn()` utility (from `lib/utils.js`) for conditional class merging.
- **Responsiveness:** Mobile-first approach. Ensure 3D scenes are optimized for performance on smaller screens.
- **Dark Mode:** Native support via `useDarkMode` hook. Ensure all components are themed correctly.

### 2. Component Architecture
- **Functional Components:** Use arrow functions and hooks exclusively.
- **Prop Validation:** Prefer clean destructuring and default values.
- **Performance:** Memoize expensive calculations and 3D renders where necessary.

### 3. State & Backend
- **Supabase:** All dynamic data (e.g., contact form submissions, admin data) should flow through Supabase.
- **Routing:** Use `react-router-dom` for client-side navigation.

### 4. Git Workflow
- **Branching:** Main branch is for production. Use feature branches for major updates.
- **Commits:** Follow conventional commits (e.g., `feat:`, `fix:`, `docs:`, `chore:`).

---

## 🤖 AI Agent Instructions (Gemini CLI)

When working on this project, adhere to the following mandates:

1. **Maintain Aesthetic Integrity:** Ensure any new UI components match the "Aurora" and "Glassmorphism" aesthetic established in `AuroraBackground.jsx` and other UI components.
2. **3D Optimization:** When modifying 3D components (`HeroScene3D.jsx`), ensure assets are loaded efficiently using `useGLTF` and `Suspense`.
3. **Data-Driven Sections:** Sections like `ProjectsSection` must remain synchronized with `src/data/projects.js`.
4. **Clean Code:** Always run `npm run lint` before finalizing changes to ensure ESLint compliance.
5. **Types & Safety:** Although JS is used, write "pseudo-typed" code by ensuring variables are well-named and object structures are consistent with existing data.

---

## 📜 License

This project is private and for personal showcase purposes. All rights reserved.

---

*Last Updated: May 13, 2026*
