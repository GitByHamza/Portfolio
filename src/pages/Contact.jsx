import React, { useState, useEffect } from 'react'
import { Send, Mail, MessageSquare, MapPin, CheckCircle2, ArrowUpRight, AlertCircle } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { useLanguage } from '../context/LanguageContext'
import { FadeIn, StaggerContainer, StaggerItem } from '../components/motion/MotionReveal'

export default function Contact() {
  const { t, isUrdu } = useLanguage()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submissionWarning, setSubmissionWarning] = useState(false)
  const [lastSubmittedPayload, setLastSubmittedPayload] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    country: '',
    projectType: 'Tech Retail OS',
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
    setSubmissionWarning(false)

    const payload = { ...formData }
    setLastSubmittedPayload(payload)

    try {
      const { error } = await supabase.from('messages').insert([
        {
          name: payload.name,
          email: payload.email,
          country: `${payload.country} [${payload.projectType}]`,
          message: payload.message,
        },
      ])

      if (error) {
        console.warn('Supabase insert warning:', error)
        setSubmissionWarning(true)
      }
      setSubmitted(true)
      setFormData({ name: '', email: '', country: '', projectType: 'Tech Retail OS', message: '' })
    } catch (err) {
      console.error('Contact submission error:', err)
      setSubmissionWarning(true)
      setSubmitted(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  const getWhatsAppHref = (data) => {
    const d = data || formData
    const text = encodeURIComponent(
      `Hi Hamza, my name is ${d.name || 'Client'} (${d.email || ''}). I am inquiring about [${d.projectType || 'Commercial System'}] from ${d.country || 'Pakistan'}.\n\nRequirements:\n${d.message || ''}`
    )
    return `https://wa.me/923091824000?text=${text}`
  }

  return (
    <div className="w-full bg-[#F6F5F0] dark:bg-[#0F0F11] min-h-screen text-[#0F0F0F] dark:text-[#EDECE6] transition-colors duration-200">
      {/* ─── Page Header ─── */}
      <section className="px-4 sm:px-8 py-16 sm:py-24 border-b border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)] bg-[#FAF9F5] dark:bg-[#161619]">
        <FadeIn className="max-w-7xl mx-auto space-y-4">
          <div className="text-[11px] font-mono uppercase tracking-widest text-[#059669] dark:text-[#10B981] font-semibold flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#059669] dark:bg-[#10B981] inline-block" />
            {t('contact', 'badge')}
          </div>

          <h1 className="text-5xl sm:text-7xl md:text-8xl font-display uppercase tracking-tight text-[#0F0F0F] dark:text-[#EDECE6] leading-[0.88] max-w-5xl">
            {t('contact', 'title')}
          </h1>

          <p className="font-serif text-lg sm:text-xl text-[#575652] dark:text-[#9B9A95] max-w-2xl leading-relaxed">
            {t('contact', 'desc')}
          </p>
        </FadeIn>
      </section>

      {/* ─── Main Form & Sidebar Grid ─── */}
      <section className="px-4 sm:px-8 py-16 sm:py-24 border-b border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.12)]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Form Column (7 cols) */}
          <FadeIn className="lg:col-span-7 card-hover-guided bg-white dark:bg-[#161619] border border-[#08966a] p-6 sm:p-10 shadow-sm">
            {submitted ? (
              <div className="py-12 text-center space-y-5">
                <div className="w-12 h-12 rounded-full bg-[#ECFDF5] dark:bg-[#10B981]/20 text-[#059669] dark:text-[#10B981] flex items-center justify-center mx-auto border border-[#059669]/30">
                  <CheckCircle2 size={24} />
                </div>
                <h3 className="font-display text-3xl uppercase tracking-tight text-[#0F0F0F] dark:text-[#EDECE6]">
                  {t('contact', 'modal_title')}
                </h3>
                <p className="font-serif text-[#575652] dark:text-[#9B9A95] max-w-md mx-auto text-sm leading-relaxed">
                  {t('contact', 'modal_desc')}
                </p>

                {lastSubmittedPayload && (
                  <div className="pt-2">
                    <a
                      href={getWhatsAppHref(lastSubmittedPayload)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-blue text-xs inline-flex"
                    >
                      <MessageSquare size={14} /> {t('contact', 'backup_whatsapp')}
                    </a>
                  </div>
                )}

                <div className="pt-3">
                  <button
                    onClick={() => {
                      setSubmitted(false)
                      setSubmissionWarning(false)
                    }}
                    className="btn-outline text-xs"
                  >
                    {isUrdu ? 'DOOSRI INQUIRY BHEJEIN' : 'SEND ANOTHER INQUIRY'}
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <div className="font-mono text-xs font-semibold uppercase tracking-wider text-[#0F0F0F] dark:text-[#EDECE6] mb-1">
                    {isUrdu ? 'SYSTEM INQUIRY FORM' : 'PROJECT INQUIRY FORM'}
                  </div>
                  <p className="font-serif text-xs text-[#575652] dark:text-[#9B9A95]">
                    {isUrdu
                      ? 'Apne project ke requirements, timeline aur zaroori sawalat darj karein.'
                      : 'Please outline your operational requirements, scope, or questions.'}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 font-mono text-xs">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-[#0F0F0F] dark:text-[#EDECE6] font-semibold block uppercase">
                      {t('contact', 'name_label')}
                    </label>
                    <input
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={t('contact', 'name_placeholder')}
                      className="w-full px-4 py-3 bg-[#FAF9F5] dark:bg-[#1F1F24] border border-[rgba(15,15,15,0.18)] dark:border-[rgba(255,255,255,0.12)] text-[#0F0F0F] dark:text-[#EDECE6] focus:border-[#059669] dark:focus:border-[#10B981] focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-[#0F0F0F] dark:text-[#EDECE6] font-semibold block uppercase">
                      {t('contact', 'email_label')}
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder={t('contact', 'email_placeholder')}
                      className="w-full px-4 py-3 bg-[#FAF9F5] dark:bg-[#1F1F24] border border-[rgba(15,15,15,0.18)] dark:border-[rgba(255,255,255,0.12)] text-[#0F0F0F] dark:text-[#EDECE6] focus:border-[#059669] dark:focus:border-[#10B981] focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 font-mono text-xs">
                  <div className="space-y-2">
                    <label htmlFor="country" className="text-[#0F0F0F] dark:text-[#EDECE6] font-semibold block uppercase">
                      {t('contact', 'country_label')}
                    </label>
                    <input
                      id="country"
                      name="country"
                      required
                      value={formData.country}
                      onChange={handleChange}
                      placeholder={t('contact', 'country_placeholder')}
                      className="w-full px-4 py-3 bg-[#FAF9F5] dark:bg-[#1F1F24] border border-[rgba(15,15,15,0.18)] dark:border-[rgba(255,255,255,0.12)] text-[#0F0F0F] dark:text-[#EDECE6] focus:border-[#059669] dark:focus:border-[#10B981] focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="projectType" className="text-[#0F0F0F] dark:text-[#EDECE6] font-semibold block uppercase">
                      {t('contact', 'category_label')}
                    </label>
                    <select
                      id="projectType"
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[#FAF9F5] dark:bg-[#1F1F24] border border-[rgba(15,15,15,0.18)] dark:border-[rgba(255,255,255,0.12)] text-[#0F0F0F] dark:text-[#EDECE6] focus:border-[#059669] dark:focus:border-[#10B981] focus:outline-none transition-colors"
                    >
                      <option value="Tech Retail OS">{t('contact', 'cat_retail')}</option>
                      <option value="Laptop Retail OS">{t('contact', 'cat_laptop')}</option>
                      <option value="Console & Games Retail OS">{t('contact', 'cat_console')}</option>
                      <option value="Custom Enterprise Software / Web App">{t('contact', 'cat_custom')}</option>
                      <option value="SaaS Architecture & Backend Modernization">{t('contact', 'cat_saas')}</option>
                      <option value="Technical Consultation / Feasibility Check">{t('contact', 'cat_consultation')}</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2 font-mono text-xs">
                  <label htmlFor="message" className="text-[#0F0F0F] dark:text-[#EDECE6] font-semibold block uppercase">
                    {t('contact', 'requirements_label')}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={t('contact', 'requirements_placeholder')}
                    className="w-full px-4 py-3 bg-[#FAF9F5] dark:bg-[#1F1F24] border border-[rgba(15,15,15,0.18)] dark:border-[rgba(255,255,255,0.12)] text-[#0F0F0F] dark:text-[#EDECE6] focus:border-[#059669] dark:focus:border-[#10B981] focus:outline-none transition-colors resize-none font-sans text-sm"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-blue w-full justify-center py-4 text-xs font-mono cursor-pointer shadow-sm"
                >
                  {isSubmitting ? t('contact', 'submitting') : t('contact', 'submit')} <Send size={14} />
                </button>
              </form>
            )}
          </FadeIn>

          {/* Sidebar Channels & SLA (5 cols) */}
          <FadeIn direction="left" className="lg:col-span-5 space-y-6 font-mono text-xs">
            {/* Quick WhatsApp Card */}
            <div className="card-hover-guided p-6 bg-white dark:bg-[#161619] border border-[#08966a] space-y-4">
              <div className="text-[10px] text-[#08966a] dark:text-[#10B981] uppercase tracking-widest font-semibold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#08966a] dark:bg-[#10B981] animate-pulse" />
                {t('contact', 'expedited')}
              </div>
              <div className="font-display text-2xl uppercase text-[#0F0F0F] dark:text-[#EDECE6] tracking-tight">
                {t('contact', 'whatsapp_heading')}
              </div>
              <p className="font-serif text-[#575652] dark:text-[#9B9A95] text-sm leading-relaxed">
                {t('contact', 'whatsapp_desc')}
              </p>
              <div>
                <a
                  href="https://wa.me/923091824000?text=Hi%20Hamza%2C%20I'd%20like%20to%20discuss%20a%20software%20or%20retail%20system%20project."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-blue text-xs w-full justify-center shadow-sm group"
                >
                  <MessageSquare size={14} />
                  <span>{t('contact', 'whatsapp_btn')}</span>
                  <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform ml-1" />
                </a>
              </div>
            </div>

            {/* Structured Specifications */}
            <div className="card-hover-guided p-6 bg-[#FAF9F5] dark:bg-[#161619] border border-[#08966a] space-y-4">
              <div className="border-b border-[#08966a]/20 dark:border-[#08966a]/30 pb-3">
                <div className="text-[10px] text-[#8E8D88] dark:text-[#6A6965] uppercase tracking-widest mb-1">
                  {t('contact', 'email_heading')}
                </div>
                <a
                  href="mailto:admin@texcodes.com"
                  className="font-semibold text-[#0F0F0F] dark:text-[#EDECE6] hover:text-[#059669] dark:hover:text-[#10B981] transition-colors flex items-center gap-1"
                >
                  <Mail size={13} /> admin@texcodes.com
                </a>
              </div>

              <div className="border-b border-[#08966a]/20 dark:border-[#08966a]/30 pb-3">
                <div className="text-[10px] text-[#8E8D88] dark:text-[#6A6965] uppercase tracking-widest mb-1">
                  {t('contact', 'sla_heading')}
                </div>
                <div className="font-semibold text-[#0F0F0F] dark:text-[#EDECE6]">{t('contact', 'sla_val')}</div>
                <div className="text-[11px] text-[#575652] dark:text-[#9B9A95]">{t('contact', 'sla_desc')}</div>
              </div>

              <div className="border-b border-[#08966a]/20 dark:border-[#08966a]/30 pb-3">
                <div className="text-[10px] text-[#8E8D88] dark:text-[#6A6965] uppercase tracking-widest mb-1">
                  {t('contact', 'timezone_heading')}
                </div>
                <div className="font-semibold text-[#0F0F0F] dark:text-[#EDECE6] flex items-center gap-1">
                  <MapPin size={13} className="text-[#059669] dark:text-[#10B981]" /> GUJRANWALA, PAKISTAN
                </div>
                <div className="text-[11px] text-[#575652] dark:text-[#9B9A95]">{t('contact', 'timezone_desc')}</div>
              </div>

              <div>
                <div className="text-[10px] text-[#8E8D88] dark:text-[#6A6965] uppercase tracking-widest mb-1">
                  {isUrdu ? 'MALKIANA HUQOOQ GUARANTEE' : 'CODE OWNERSHIP GUARANTEE'}
                </div>
                <div className="text-[#059669] dark:text-[#10B981] font-semibold text-[11px]">
                  {isUrdu ? '100% CLIENT GITHUB AUR DATABASE TRANSFER' : '100% CLIENT GITHUB & DATABASE TRANSFER'}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}


