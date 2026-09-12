import React, { useState, useEffect } from 'react'
import { Send, Mail, MessageSquare, MapPin, CheckCircle2, ArrowUpRight } from 'lucide-react'
import { supabase } from '@/lib/supabase'

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    country: '',
    projectType: 'Custom Commerce / Retail OS',
    message: '',
  })

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const { error } = await supabase.from('messages').insert([
        {
          name: formData.name,
          email: formData.email,
          country: `${formData.country} [${formData.projectType}]`,
          message: formData.message,
        },
      ])

      if (error) {
        console.warn('Supabase insert warning:', error)
      }
      setSubmitted(true)
      setFormData({ name: '', email: '', country: '', projectType: 'Custom Commerce / Retail OS', message: '' })
    } catch (err) {
      console.error('Contact submission error:', err)
      setSubmitted(true) // Still show success for user experience
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full bg-[#F6F5F0] min-h-screen">
      {/* ─── Page Header ─── */}
      <section className="px-4 sm:px-8 py-16 sm:py-24 border-b border-[rgba(15,15,15,0.14)] bg-[#FAF9F5]">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="text-[11px] font-mono uppercase tracking-widest text-[#1A4BFF] font-semibold flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#1A4BFF] inline-block" />
            COMMISSION & INQUIRIES
          </div>

          <h1 className="text-5xl sm:text-7xl md:text-8xl font-display uppercase tracking-tight text-[#0F0F0F] leading-[0.88] max-w-5xl">
            LET'S DISCUSS YOUR SYSTEM.
          </h1>

          <p className="font-serif text-lg sm:text-xl text-[#575652] max-w-2xl leading-relaxed">
            Direct communication with lead engineer Hamza. We engineer production SaaS platforms, 
            custom retail commerce engines, and dedicated business architectures.
          </p>
        </div>
      </section>

      {/* ─── Main Form & Sidebar Grid ─── */}
      <section className="px-4 sm:px-8 py-16 sm:py-24 border-b border-[rgba(15,15,15,0.14)]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Form Column (7 cols) */}
          <div className="lg:col-span-7 bg-white border border-[rgba(15,15,15,0.14)] p-6 sm:p-10 shadow-sm">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-[#EFF3FF] text-[#1A4BFF] flex items-center justify-center mx-auto border border-[#1A4BFF]/30">
                  <CheckCircle2 size={24} />
                </div>
                <h3 className="font-display text-3xl uppercase tracking-tight text-[#0F0F0F]">
                  MESSAGE TRANSMITTED
                </h3>
                <p className="font-serif text-[#575652] max-w-md mx-auto text-sm">
                  Thank you for reaching out. We review all technical and commercial inquiries and respond within 24 hours.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => setSubmitted(false)}
                    className="btn-outline text-xs"
                  >
                    SEND ANOTHER MESSAGE
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <div className="font-mono text-xs font-semibold uppercase tracking-wider text-[#0F0F0F] mb-1">
                    PROJECT INQUIRY FORM
                  </div>
                  <p className="font-serif text-xs text-[#575652]">
                    Please outline your operational requirements, scope, or questions.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 font-mono text-xs">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-[#0F0F0F] font-semibold block uppercase">
                      YOUR NAME *
                    </label>
                    <input
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Tariq Mehmood"
                      className="w-full px-4 py-3 bg-[#FAF9F5] border border-[rgba(15,15,15,0.18)] text-[#0F0F0F] focus:border-[#1A4BFF] focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-[#0F0F0F] font-semibold block uppercase">
                      DIRECT EMAIL *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="tariq@retailbrand.com"
                      className="w-full px-4 py-3 bg-[#FAF9F5] border border-[rgba(15,15,15,0.18)] text-[#0F0F0F] focus:border-[#1A4BFF] focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 font-mono text-xs">
                  <div className="space-y-2">
                    <label htmlFor="country" className="text-[#0F0F0F] font-semibold block uppercase">
                      COMPANY / CITY *
                    </label>
                    <input
                      id="country"
                      name="country"
                      required
                      value={formData.country}
                      onChange={handleChange}
                      placeholder="e.g. Lahore / Hafeez Centre"
                      className="w-full px-4 py-3 bg-[#FAF9F5] border border-[rgba(15,15,15,0.18)] text-[#0F0F0F] focus:border-[#1A4BFF] focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="projectType" className="text-[#0F0F0F] font-semibold block uppercase">
                      PROJECT CATEGORY
                    </label>
                    <select
                      id="projectType"
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[#FAF9F5] border border-[rgba(15,15,15,0.18)] text-[#0F0F0F] focus:border-[#1A4BFF] focus:outline-none transition-colors"
                    >
                      <option value="Computer & CCTV Retail OS">Computer & CCTV Retail OS</option>
                      <option value="Custom E-Commerce Storefront">Custom E-Commerce Storefront</option>
                      <option value="SaaS Platform Engineering">SaaS Platform Engineering</option>
                      <option value="Legacy Systems Modernization">Legacy Systems Modernization</option>
                      <option value="AI Business Automations">AI Business Automations</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2 font-mono text-xs">
                  <label htmlFor="message" className="text-[#0F0F0F] font-semibold block uppercase">
                    SYSTEM OVERVIEW & REQUIREMENTS *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Describe your current setup, catalog scale, branches, or technical needs..."
                    className="w-full px-4 py-3 bg-[#FAF9F5] border border-[rgba(15,15,15,0.18)] text-[#0F0F0F] focus:border-[#1A4BFF] focus:outline-none transition-colors resize-none font-sans text-sm"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-blue w-full justify-center py-4 text-xs font-mono"
                >
                  {isSubmitting ? 'TRANSMITTING INQUIRY...' : 'SUBMIT DIRECT INQUIRY'} <Send size={14} />
                </button>
              </form>
            )}
          </div>

          {/* Sidebar Channels & SLA (5 cols) */}
          <div className="lg:col-span-5 space-y-6 font-mono text-xs">
            {/* Quick WhatsApp Card */}
            <div className="p-6 bg-white border border-[rgba(15,15,15,0.14)] space-y-4">
              <div className="text-[10px] text-[#8E8D88] uppercase tracking-widest">
                EXPEDITED CONTACT
              </div>
              <div className="font-display text-2xl uppercase text-[#0F0F0F] tracking-tight">
                DIRECT WHATSAPP CONVERSATION
              </div>
              <p className="font-serif text-[#575652] text-sm leading-relaxed">
                For business owners seeking fast feasibility checks or direct technical consultation:
              </p>
              <div>
                <a
                  href="https://wa.me/923288197775?text=Hi%20Hamza%2C%20I'd%20like%20to%20discuss%20a%20software%20or%20retail%20system%20project."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-blue text-xs w-full justify-center"
                >
                  <MessageSquare size={14} /> WHATSAPP: +92 328 8197775
                </a>
              </div>
            </div>

            {/* Structured Specifications */}
            <div className="p-6 bg-[#FAF9F5] border border-[rgba(15,15,15,0.14)] space-y-4">
              <div className="border-b border-[rgba(15,15,15,0.1)] pb-3">
                <div className="text-[10px] text-[#8E8D88] uppercase tracking-widest mb-1">
                  DIRECT EMAIL
                </div>
                <a
                  href="mailto:professorhamza000@gmail.com"
                  className="font-semibold text-[#0F0F0F] hover:text-[#1A4BFF] transition-colors flex items-center gap-1"
                >
                  <Mail size={13} /> professorhamza000@gmail.com
                </a>
              </div>

              <div className="border-b border-[rgba(15,15,15,0.1)] pb-3">
                <div className="text-[10px] text-[#8E8D88] uppercase tracking-widest mb-1">
                  RESPONSE TIME SLA
                </div>
                <div className="font-semibold text-[#0F0F0F]">UNDER 24 HOURS</div>
                <div className="text-[11px] text-[#575652]">All project inquiries reviewed by lead engineer</div>
              </div>

              <div className="border-b border-[rgba(15,15,15,0.1)] pb-3">
                <div className="text-[10px] text-[#8E8D88] uppercase tracking-widest mb-1">
                  BASE LOCATION
                </div>
                <div className="font-semibold text-[#0F0F0F] flex items-center gap-1">
                  <MapPin size={13} className="text-[#1A4BFF]" /> GUJRANWALA, PAKISTAN
                </div>
                <div className="text-[11px] text-[#575652]">Timezone: Pakistan Standard Time (PKT / UTC+5)</div>
              </div>

              <div>
                <div className="text-[10px] text-[#8E8D88] uppercase tracking-widest mb-1">
                  CODE OWNERSHIP GUARANTEE
                </div>
                <div className="text-[#1A4BFF] font-semibold text-[11px]">
                  100% CLIENT GITHUB & DATABASE TRANSFER
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
