import React from "react";
import { Link } from "react-router-dom";
import { 
  Cpu, 
  ShoppingBag, 
  Bot, 
  ArrowRight, 
  CheckCircle2, 
  ExternalLink,
  Sparkles,
  Zap,
  Layers,
  Database
} from "lucide-react";

export default function SolutionsSection() {
  const currency = typeof window !== 'undefined'
    ? localStorage.getItem('tex_pref_currency') ||
      (['Asia/Karachi', 'Asia/Kolkata'].includes(Intl.DateTimeFormat().resolvedOptions().timeZone) ? 'PKR' : 'USD')
    : 'USD'

  return (
    <section id="solutions" className="py-24 px-4 sm:px-6 lg:px-8 border-t border-zinc-800/80 bg-zinc-950/80 relative">
      {/* Background cyber accent */}
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-widest font-mono">
            <Sparkles className="size-3.5" />
            <span>SPECIALIZED INDUSTRY SOLUTIONS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase font-sans tracking-tight">
            Engineered To Drive Revenue, Not Monthly App Fees
          </h2>
          <p className="text-zinc-400 text-xs sm:text-sm font-mono leading-relaxed">
            We don't install generic WordPress templates. We architect bespoke digital systems and high-throughput e-commerce engines with zero vendor lock-in.
          </p>
        </div>

        {/* 3 Solutions Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch font-mono">

          {/* Solution 1: Tech & Computer Retail OS (FLAGSHIP) */}
          <div className="bg-gradient-to-b from-zinc-900/90 to-zinc-950 border-2 border-amber-500 p-8 flex flex-col justify-between space-y-6 relative shadow-2xl shadow-amber-500/10 group">
            <span className="absolute -top-3.5 right-6 bg-amber-500 text-black font-black text-[10px] px-3 py-1 uppercase tracking-widest">
              ★ FLAGSHIP B2B SOLUTION
            </span>

            <div className="space-y-4 pt-2">
              <div className="w-12 h-12 bg-zinc-950 border border-amber-500/40 flex items-center justify-center text-amber-400">
                <Cpu className="size-6" />
              </div>

              <div>
                <span className="text-[10px] text-amber-400 font-bold uppercase tracking-widest block mb-1">
                  INDUSTRY-SPECIFIC ENGINE
                </span>
                <h3 className="text-2xl font-black text-white uppercase font-sans">
                  Computer & CCTV Retail OS
                </h3>
                <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                  Engineered specifically for single & multi-branch electronics retailers. Includes an automated PC Builder compatibility engine, multi-warehouse stock sync, and hardware serial warranty logging.
                </p>
              </div>

              <div className="space-y-2 pt-2 border-t border-zinc-850 text-xs text-zinc-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-emerald-400 shrink-0" />
                  <span>Real-Time PC Builder (Sockets, RAM, TDP)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-emerald-400 shrink-0" />
                  <span>Multi-Branch Stock Telemetry Sync</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-emerald-400 shrink-0" />
                  <span>Automated WhatsApp Dispatch Integration</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-emerald-400 shrink-0" />
                  <span>100% Client Code & Database Ownership</span>
                </div>
              </div>

              <div className="pt-2 text-xs font-mono text-amber-400 font-bold">
                Investment: {currency === 'USD' ? '$2,450 – $8,500+ USD' : 'PKR 280,000 – 950,000+'}
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-800">
              <Link
                to="/solutions/tech-retail"
                className="w-full h-11 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-black font-black uppercase text-xs tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
              >
                <span>VIEW SOLUTION & PRICING</span>
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>

          {/* Solution 2: Custom Headless E-Commerce */}
          <div className="bg-zinc-900/60 border border-zinc-800 p-8 flex flex-col justify-between space-y-6 hover:border-cyan-500/50 transition-colors group">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-zinc-950 border border-zinc-800 flex items-center justify-center text-cyan-400">
                <ShoppingBag className="size-6" />
              </div>

              <div>
                <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-widest block mb-1">
                  DIRECT-TO-CONSUMER & WHOLESALE
                </span>
                <h3 className="text-2xl font-black text-white uppercase font-sans">
                  High-Conversion Web Storefronts
                </h3>
                <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                  Bespoke Next.js 16 + React 19 storefronts built for speed, conversion rate optimization, and SEO dominance. Sub-50ms page loads with zero Shopify revenue commissions.
                </p>
              </div>

              <div className="space-y-2 pt-2 border-t border-zinc-850 text-xs text-zinc-400">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-emerald-400 shrink-0" />
                  <span>Sub-50ms Global Edge Page Rendering</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-emerald-400 shrink-0" />
                  <span>Tailored Checkout & Payment Gateway Sync</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-emerald-400 shrink-0" />
                  <span>Advanced Product Bundling & Discounts</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-emerald-400 shrink-0" />
                  <span>0% Ongoing Sales Revenue Tax</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-800">
              <a
                href="#contact"
                className="w-full h-11 bg-zinc-800 hover:bg-zinc-700 text-white font-bold uppercase text-xs tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <span>REQUEST STORE AUDIT</span>
                <ArrowRight className="size-4" />
              </a>
            </div>
          </div>

          {/* Solution 3: AI Automations & Custom Business OS */}
          <div className="bg-zinc-900/60 border border-zinc-800 p-8 flex flex-col justify-between space-y-6 hover:border-cyan-500/50 transition-colors group">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-zinc-950 border border-zinc-800 flex items-center justify-center text-emerald-400">
                <Bot className="size-6" />
              </div>

              <div>
                <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest block mb-1">
                  OPERATIONAL INTELLIGENCE
                </span>
                <h3 className="text-2xl font-black text-white uppercase font-sans">
                  AI Agents & Business OS
                </h3>
                <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                  Custom internal administration dashboards, automated CRM dispatch, multi-agent AI pipelines, and operational telemetry that eliminate manual staff busywork.
                </p>
              </div>

              <div className="space-y-2 pt-2 border-t border-zinc-850 text-xs text-zinc-400">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-emerald-400 shrink-0" />
                  <span>Automated WhatsApp & Email Lead Routing</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-emerald-400 shrink-0" />
                  <span>4-Tier Role Based Access Control (RBAC)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-emerald-400 shrink-0" />
                  <span>AI Document Processing & Extraction</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-emerald-400 shrink-0" />
                  <span>Custom PostgreSQL Data Pipelines</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-800">
              <a
                href="#contact"
                className="w-full h-11 bg-zinc-800 hover:bg-zinc-700 text-white font-bold uppercase text-xs tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <span>CONSULT ON AI WORKFLOWS</span>
                <ArrowRight className="size-4" />
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
