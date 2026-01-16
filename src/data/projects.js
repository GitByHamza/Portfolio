export const projectsData = [
 {
  id: 1,
  title: "Myls (SaaS Platform)",
  overview: "A sophisticated SaaS platform for a Swiss company, enabling businesses to manage their presence across 37+ platforms (Google, Facebook, Apple Maps, etc.) from a single dashboard.",
  description: "This project involves a massive modernization effort, migrating a legacy Laravel 8 + Vue 2 codebase to a cutting-edge Vue 3 (Nuxt TS) and PHP Laravel 12 architecture. The platform empowers clients to control their digital listings without relying on third-party aggregators like Yext. It implements complex user role management via Spatie and features a high-performance, polished UI.",
  features: [
   "Multi-platform Business Listing Management (37+ Platforms)",
   "Role-Based Access Control (RBAC) using Spatie",
   "Modern UI/UX Redesign (Vue 3 + Tailwind)",
   "Direct API Integrations (Replacing Yext)",
   "Real-time Analytics Dashboard",
   "Multi-language Support (Swiss Market)"
  ],
  techStack: [
   { category: "Frontend", tech: "Vue 3, Nuxt.js (TypeScript), Tailwind CSS" },
   { category: "Backend", tech: "PHP Laravel 12, Spatie Permissions" },
   { category: "Database", tech: "MySQL" },
   { category: "Architecture", tech: "SaaS, RESTful API" }
  ],
  mainImage: "/myls.jpeg",
  images: [
   "/myls1.jpeg",
   "/myls2.jpeg",
   "/myls3.jpeg"
  ],
  demoUrl: "https://app.myls.ch",
  githubUrl: "#",
  tags: ["Vue 3", "Nuxt (TS)", "Laravel 12", "Spatie", "MySQL", "TailwindCSS"]
 },

 {
  id: 2,
  title: "Ecommerce Web App",
  overview: "A comprehensive ecommerce web application designed for a seamless shopping experience. Built with a robust React frontend and a powerful PHP Laravel backend, this platform handles everything from product browsing to secure checkout.",
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
  mainImage: "/hard.png",
  images: [
   "/hard.png",
   "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?q=80&w=2000&auto=format&fit=crop",
   "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?q=80&w=2000&auto=format&fit=crop"
  ],
  demoUrl: "https://houseofardesigns.com/",
  githubUrl: "#",
  tags: ["React Js", "Php Laravel 8.3", "TailwindCSS", "Bootstrap", "CSS", "MongoDB", "Javascript"]
 },

 {
  id: 3,
  title: "Realtime Chat Application",
  overview: "A lightning-fast real-time chat application allowing users to communicate instantly. Leveraging the power of Node.js and Socket.io, it ensures low-latency messaging and a smooth user experience.",
  description: "This application enables users to join chat rooms and send messages in real-time. It features live user status updates, message notifications, and a clean, modern interface. It demonstrates proficiency in handling WebSocket connections and managing ephemeral state.",
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
  mainImage: "/chatapp.png",
  images: [
   "/chatapp.png",
   "https://images.unsplash.com/photo-1530811761207-8d9d22f0a141?q=80&w=2000&auto=format&fit=crop",
   "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?q=80&w=2000&auto=format&fit=crop"
  ],
  demoUrl: "",
  githubUrl: "https://github.com/GitByHamza/MERN-CHAT-APP",
  tags: ["React", "TailwindCSS", "Node.js", "Socket.io", "MongoDB"]
 },
 {
  id: 4,
  title: "Todo App with Alarm",
  overview: "A premium productivity tool that goes beyond standard todo lists. This app features smart notifications and audible alarms to ensure you never miss a deadline.",
  description: "Designed with focus and productivity in mind, this app allows users to schedule tasks with specific times. When a task is due, the app plays a notification sound and triggers an alert. The state is persisted, ensuring tasks are saved even after closing the browser.",
  features: [
   "Task Scheduling with Date & Time",
   "Audible Alarm/Ringtone Notifications",
   "Task Priority Levels",
   "Persistent Storage (Local Storage/DB)",
   "Clean, Minimalist UI",
   "Mark as Complete/Delete Functionality"
  ],
  techStack: [
   { category: "Frontend", tech: "React.js, CSS" },
   { category: "Backend", tech: "Node.js (Optional for sync)" },
   { category: "Database", tech: "MongoDB" },
   { category: "Styling", tech: "TailwindCSS" }
  ],
  mainImage: "/todoapp.png",
  images: [
   "/todoapp.png",
   "https://images.unsplash.com/photo-1540350394557-8d14678e7f91?q=80&w=2000&auto=format&fit=crop",
   "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=2000&auto=format&fit=crop"
  ],
  demoUrl: "",
  githubUrl: "https://github.com/GitByHamza/Todo-app",
  tags: ["React", "TailwindCSS", "CSS", "MongoDB"]
 },

];
