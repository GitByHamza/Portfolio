import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { ArrowRight, MessageCircle } from 'lucide-react'
import { FUNNEL_COPY, SHOP_TYPES, funnelFormWhatsAppUrl } from '../content/tech-retail-funnel.ts'
import type { FunnelLanguage, ShopType } from '../content/tech-retail-funnel.ts'
import { BRANCH_OPTIONS, leadRow, rememberAdSource, validateLead } from '../lib/funnel-lead.ts'
import type { AdSource, LeadField } from '../lib/funnel-lead.ts'
import { trackPixelEvent } from '../lib/meta-pixel.ts'

const FIELDS: LeadField[] = ['shop', 'city', 'branches', 'whatsapp']

function sessionStore(): Storage | null {
  try { return window.sessionStorage } catch { return null }
}

// Saving is best effort: the visitor is already on their way to WhatsApp with the same answers.
async function saveLead(row: ReturnType<typeof leadRow>) {
  try {
    const { supabase } = await import('../lib/supabase.js')
    const timeout = new Promise<{ error: string }>((resolve) => setTimeout(() => resolve({ error: 'timed out' }), 8000))
    const { error } = await Promise.race([supabase.from('funnel_leads').insert(row), timeout])
    if (error) console.warn('Funnel lead was not saved:', error)
  } catch (error) {
    console.warn('Funnel lead was not saved:', error)
  }
}

type Props = { language: FunnelLanguage; shop: ShopType; onShopChange: (shop: ShopType) => void }

export default function FunnelLeadForm({ language, shop, onShopChange }: Props) {
  const copy = FUNNEL_COPY[language]
  const form = copy.form
  const [errors, setErrors] = useState<Partial<Record<LeadField, true>>>({})
  const [whatsapp, setWhatsapp] = useState<string | null>(null)
  const source = useRef<AdSource>({})
  const done = useRef<HTMLDivElement>(null)

  useEffect(() => { source.current = rememberAdSource(window.location.search, sessionStore()) }, [])
  useEffect(() => { if (whatsapp) done.current?.focus() }, [whatsapp])

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const value = (name: string) => String(data.get(name) ?? '')
    const result = validateLead({ shop: value('shop'), city: value('city'), branches: value('branches'), whatsapp: value('whatsapp'), website: value('website') })
    if (!result.ok) {
      setErrors(result.errors)
      const first = FIELDS.find((field) => result.errors[field])
      event.currentTarget.querySelector<HTMLElement>(`[name="${first}"]`)?.focus()
      return
    }
    setErrors({})
    const href = funnelFormWhatsAppUrl(language, result.lead)
    if (!result.spam) {
      trackPixelEvent(window as unknown as Parameters<typeof trackPixelEvent>[0], 'Lead', { content_name: result.lead.shop })
      void saveLead(leadRow(result.lead, language, source.current, window.location.pathname))
    }
    // Opened inside the submit handler so browsers treat it as the visitor's own tap.
    window.open(href, '_blank', 'noopener')
    setWhatsapp(href)
  }

  if (whatsapp) return <div className="tr-form-done" ref={done} tabIndex={-1} role="status">
    <h3>{form.doneHeading}</h3>
    <p>{form.doneCopy}</p>
    <a className="tr-cta" data-funnel-form="whatsapp" href={whatsapp} target="_blank" rel="noopener"><MessageCircle size={20} aria-hidden="true" />{form.doneCta}<ArrowRight size={18} aria-hidden="true" /></a>
  </div>

  const error = (field: LeadField) => errors[field] ? <p className="tr-field-error" id={`lead-${field}-error`}>{form.errors[field]}</p> : null
  const described = (field: LeadField) => errors[field] ? { 'aria-invalid': true, 'aria-describedby': `lead-${field}-error` } : {}

  return <form className="tr-form" data-funnel-form="lead" onSubmit={submit} onFocus={() => { void import('../lib/supabase.js') }} noValidate>
    <div className="tr-field">
      <label htmlFor="lead-shop">{form.shop}</label>
      <select id="lead-shop" name="shop" value={shop} onChange={(event) => onShopChange(event.target.value as ShopType)} {...described('shop')}>
        {SHOP_TYPES.map((type) => <option key={type} value={type}>{copy.shops[type].label}</option>)}
      </select>
      {error('shop')}
    </div>
    <div className="tr-field">
      <label htmlFor="lead-city">{form.city}</label>
      <input id="lead-city" name="city" type="text" autoComplete="address-level2" placeholder={form.cityPlaceholder} maxLength={60} {...described('city')} />
      {error('city')}
    </div>
    <fieldset className="tr-field tr-branches" {...described('branches')}>
      <legend>{form.branches}</legend>
      <div>{BRANCH_OPTIONS.map((option) => <label key={option}><input type="radio" name="branches" value={option} />{form.branchOptions[option]}</label>)}</div>
      {error('branches')}
    </fieldset>
    <div className="tr-field">
      <label htmlFor="lead-whatsapp">{form.whatsapp}</label>
      <input id="lead-whatsapp" name="whatsapp" type="tel" inputMode="tel" autoComplete="tel" placeholder={form.whatsappPlaceholder} maxLength={20} {...described('whatsapp')} />
      {error('whatsapp')}
    </div>
    <div className="tr-hp" aria-hidden="true"><label htmlFor="lead-website">Website</label><input id="lead-website" name="website" type="text" tabIndex={-1} autoComplete="off" /></div>
    <button className="tr-cta" type="submit"><MessageCircle size={20} aria-hidden="true" />{form.submit}<ArrowRight size={18} aria-hidden="true" /></button>
    <p className="tr-action-note">{form.note}</p>
  </form>
}
