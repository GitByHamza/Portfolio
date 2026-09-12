import React from 'react'
import { motion } from 'framer-motion'
import { Zap, ShieldCheck, DollarSign, Layers, CheckCircle2, XCircle, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import Magnetic from './Magnetic'

const EngineeringStandardSection = () => {
  const comparisonItems = [
    {
      metric: 'Page Speed & Core Web Vitals',
      texcodes: 'Sub-50ms edge rendering with Next.js & Edge CDN. Perfect 95-100 Google Lighthouse score.',
      legacy: 'Slow 2.8s – 6.5s load times bloated by 30+ plugins, unoptimized scripts, and heavy database queries.',
      badge: '99+ Lighthouse'
    },
    {
      metric: 'Platform Fees & Revenue Tax',
      texcodes: '0% sales commission. 100% of revenue stays in your pocket. Pay only standard bank processing fees.',
      legacy: '2.0% – 3.0% platform cuts on every sale + $300+/month for essential recurring app subscriptions.',
      badge: '0% Revenue Tax'
    },
    {
      metric: 'Code & IP Ownership',
      texcodes: 'Complete ownership. Full GitHub repo transfer and independent PostgreSQL database control.',
      legacy: 'Vendor lock-in. If you stop paying your monthly store subscription, your store and customer data vanish.',
      badge: '100% IP Transfer'
    },
    {
      metric: 'Custom Business Logic & UX',
      texcodes: 'Zero limits. Custom PC builders, WhatsApp auto-dispatch, live inventory matrices, custom ERP sync.',
      legacy: 'Locked into cookie-cutter theme templates and constrained by rigid app marketplace limitations.',
      badge: 'Tailored Logic'
    },
    {
      metric: 'Security & Infrastructure',
      texcodes: 'Serverless edge architecture, automated SSL, isolated database, and zero WordPress-style plugin exploits.',
      legacy: 'Frequent plugin security vulnerabilities, spam injections, and broken checkouts after auto-updates.',
      badge: 'Enterprise Security'
    }
  ]

  const statHighlights = [
    { value: '< 50ms', label: 'Average Edge TTFB', sub: 'Instantaneous Storefront Experience' },
    { value: '0%', label: 'Platform Tax Taken', sub: 'Keep 100% Of Your Margins' },
    { value: '100%', label: 'Source Code Transfer', sub: 'Zero Vendor Lock-In Ever' },
    { value: '3x', label: 'Higher Conversion', sub: 'Fast Sites Turn Clicks into Cash' }
  ]

  return (
    <section id="standards" className="py-24 px-4 relative overflow-hidden bg-background/50 border-y border-white/5">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-pop/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/10 border border-primary/25 text-primary text-xs font-bold tracking-wider uppercase mb-4"
          >
            <Zap size={14} className="text-pop" /> The TeXCodes Architecture Standard
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold font-heading mb-5 tracking-tight"
          >
            Why Modern Brands Choose{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-pop to-primary">
              Engineered Software
            </span>{' '}
            Over Bloated CMS Templates
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-base md:text-lg leading-relaxed font-body"
          >
            Off-the-shelf platforms charge you forever while slowing your customer experience down with 40+ plugins. 
            We build blazing-fast, custom-engineered digital systems that you own outright.
          </motion.p>
        </div>

        {/* Highlight Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-16">
          {statHighlights.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-2xl bg-card/60 border border-white/10 backdrop-blur-md shadow-lg text-center group hover:border-primary/40 transition-colors"
            >
              <div className="text-3xl md:text-4xl font-extrabold font-heading text-foreground group-hover:text-pop transition-colors mb-1">
                {stat.value}
              </div>
              <div className="text-xs md:text-sm font-semibold text-primary mb-1">
                {stat.label}
              </div>
              <div className="text-[11px] text-muted-foreground font-body">
                {stat.sub}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Comparison Table / Cards */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl border border-white/10 bg-card/70 backdrop-blur-xl overflow-hidden shadow-2xl mb-12"
        >
          {/* Table Header */}
          <div className="grid grid-cols-1 md:grid-cols-12 border-b border-white/10 bg-secondary/30 text-xs font-bold uppercase tracking-wider text-muted-foreground">
            <div className="p-4 md:col-span-4 hidden md:block">Evaluation Dimension</div>
            <div className="p-4 md:col-span-4 text-primary flex items-center gap-2 bg-primary/5">
              <CheckCircle2 size={16} className="text-pop" /> TeXCodes Custom Next.js Architecture
            </div>
            <div className="p-4 md:col-span-4 text-muted-foreground flex items-center gap-2">
              <XCircle size={16} className="text-destructive/70" /> Legacy WordPress / Shopify Themes
            </div>
          </div>

          {/* Rows */}
          <div className="divide-y divide-white/5">
            {comparisonItems.map((item, idx) => (
              <div
                key={idx}
                className="grid grid-cols-1 md:grid-cols-12 text-sm p-4 md:p-5 hover:bg-white/[0.02] transition-colors items-center gap-4 md:gap-0"
              >
                {/* Metric Title */}
                <div className="md:col-span-4 pr-4">
                  <div className="font-heading font-bold text-foreground flex items-center gap-2">
                    {item.metric}
                  </div>
                  <span className="inline-block mt-1 text-[11px] font-semibold text-pop px-2 py-0.5 rounded bg-pop/10 border border-pop/25">
                    {item.badge}
                  </span>
                </div>

                {/* TeXCodes Column */}
                <div className="md:col-span-4 md:px-4 text-foreground/90 font-body bg-primary/[0.03] md:py-2 rounded-xl flex items-start gap-2.5">
                  <CheckCircle2 size={18} className="text-pop shrink-0 mt-0.5" />
                  <div>
                    <span className="md:hidden text-xs font-bold text-primary block mb-0.5">TeXCodes Standard:</span>
                    {item.texcodes}
                  </div>
                </div>

                {/* Legacy Column */}
                <div className="md:col-span-4 md:px-4 text-muted-foreground font-body flex items-start gap-2.5">
                  <XCircle size={18} className="text-destructive/60 shrink-0 mt-0.5" />
                  <div>
                    <span className="md:hidden text-xs font-bold text-muted-foreground block mb-0.5">Off-The-Shelf CMS:</span>
                    {item.legacy}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA Footer within section */}
        <div className="text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4">
            <Magnetic>
              <Link
                to="/solutions/tech-retail"
                className="cosmic-button flex items-center gap-2 text-sm px-6 py-3"
              >
                Inspect The Tech Retail Solution <ArrowRight size={16} />
              </Link>
            </Magnetic>
            <Magnetic>
              <a
                href="#contact-footer"
                className="px-6 py-3 rounded-full font-medium transition-all duration-300 hover:bg-secondary/50 border border-white/10 backdrop-blur-sm text-foreground flex items-center gap-2 hover:border-white/30 text-sm"
              >
                Discuss Technical Requirements
              </a>
            </Magnetic>
          </div>
        </div>
      </div>
    </section>
  )
}

export default EngineeringStandardSection
