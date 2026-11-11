import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { ArrowRight, CalendarCheck, MessageCircle } from 'lucide-react'
import { FUNNEL_COPY, NEED_OPTIONS, PROCESS_OPTIONS, SHOP_TYPES, adRef, funnelFormWhatsAppUrl, needLabel } from '../content/tech-retail-funnel.ts'
import type { FunnelLanguage, ShopType } from '../content/tech-retail-funnel.ts'
import { BRANCH_OPTIONS, leadRow, rememberAdSource, saveLeadRow, validateLead } from '../lib/funnel-lead.ts'
import type { AdSource, LeadField, LeadRow } from '../lib/funnel-lead.ts'
import { trackPixelEvent } from '../lib/meta-pixel.ts'

const FIELDS: LeadField[] = ['shop', 'city', 'branches', 'process', 'needs', 'whatsapp']

function sessionStore(): Storage | null {
  try { return window.sessionStorage } catch { return null }
}

async function saveLead(row: LeadRow): Promise<boolean> {
  try {
    const { supabase } = await import('../lib/supabase.js')
    return await saveLeadRow((lead) => supabase.from('funnel_leads').insert(lead), row)
  } catch (error) {
    console.warn('Funnel lead was not saved:', error)
    return false
  }
}

// idle: nothing to save (or a bot) · saving · saved · failed: the visitor can retry; the answers are also in the WhatsApp message.
type SaveState = 'idle' | 'saving' | 'saved' | 'failed'
type Props = { language: FunnelLanguage; shop: ShopType; onShopChange: (shop: ShopType) => void }

export default function FunnelLeadForm({ language, shop, onShopChange }: Props) {
  const copy = FUNNEL_COPY[language]
  const form = copy.form
  const [errors, setErrors] = useState<Partial<Record<LeadField, true>>>({})
  const [whatsapp, setWhatsapp] = useState<string | null>(null)
  const [save, setSave] = useState<SaveState>('idle')
  const [retried, setRetried] = useState(false)
  const source = useRef<AdSource>({})
  const row = useRef<LeadRow | null>(null)
  const done = useRef<HTMLDivElement>(null)

  useEffect(() => { source.current = rememberAdSource(window.location.search, sessionStore()) }, [])
  useEffect(() => { if (whatsapp) done.current?.focus() }, [whatsapp])

  function store() {
    if (!row.current) return
    setSave('saving')
    void saveLead(row.current).then((ok) => setSave(ok ? 'saved' : 'failed'))
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const value = (name: string) => String(data.get(name) ?? '')
    const result = validateLead({ shop: value('shop'), city: value('city'), branches: value('branches'), process: value('process'), needs: data.getAll('needs').map(String), whatsapp: value('whatsapp'), website: value('website') })
    if (!result.ok) {
      setErrors(result.errors)
      const first = FIELDS.find((field) => result.errors[field])
      event.currentTarget.querySelector<HTMLElement>(`[name="${first}"]`)?.focus()
      return
    }
    setErrors({})
    const href = funnelFormWhatsAppUrl(language, result.lead, adRef(source.current))
    if (!result.spam) {
      trackPixelEvent(window as unknown as Parameters<typeof trackPixelEvent>[0], 'Lead', { content_name: result.lead.shop })
      row.current = leadRow(result.lead, language, source.current, window.location.pathname)
      store()
    }
    // Opened inside the submit handler so browsers treat it as the visitor's own tap.
    window.open(href, '_blank', 'noopener')
    setWhatsapp(href)
  }

  if (whatsapp) return <div className="tr-form-done" ref={done} tabIndex={-1} role="status">
    <h3>{form.doneHeading}</h3>
    <p>{form.doneCopy}</p>
    <a className="tr-cta" data-funnel-form="whatsapp" href={whatsapp} target="_blank" rel="noopener"><MessageCircle size={20} aria-hidden="true" />{form.doneCta}<ArrowRight size={18} aria-hidden="true" /></a>
    {(save === 'failed' || (retried && save === 'saving')) && <div className="tr-save-note" data-funnel-save="failed">
      <p>{form.saveFailed}</p>
      <button type="button" disabled={save === 'saving'} onClick={() => { setRetried(true); store() }}>{save === 'saving' ? form.saveRetrying : form.saveRetry}</button>
    </div>}
    {retried && save === 'saved' && <p className="tr-save-note" data-funnel-save="saved">{form.saved}</p>}
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
    <fieldset className="tr-field tr-choices" {...described('branches')}>
      <legend>{form.branches}</legend>
      <div>{BRANCH_OPTIONS.map((option) => <label key={option}><input type="radio" name="branches" value={option} />{form.branchOptions[option]}</label>)}</div>
      {error('branches')}
    </fieldset>
    <fieldset className="tr-field tr-choices" {...described('process')}>
      <legend>{form.process}</legend>
      <div>{PROCESS_OPTIONS.map((option) => <label key={option}><input type="radio" name="process" value={option} />{form.processOptions[option]}</label>)}</div>
      {error('process')}
    </fieldset>
    <fieldset className="tr-field tr-choices tr-needs" {...described('needs')}>
      <legend>{form.needs} <span>{form.needsHint}</span></legend>
      <div>{NEED_OPTIONS.map((option) => <label key={option}><input type="checkbox" name="needs" value={option} />{needLabel(language, shop, option)}</label>)}</div>
      {error('needs')}
    </fieldset>
    <div className="tr-field">
      <label htmlFor="lead-whatsapp">{form.whatsapp}</label>
      <input id="lead-whatsapp" name="whatsapp" type="tel" inputMode="tel" autoComplete="tel" placeholder={form.whatsappPlaceholder} maxLength={20} {...described('whatsapp')} />
      {error('whatsapp')}
    </div>
    <div className="tr-hp" aria-hidden="true"><label htmlFor="lead-website">Website</label><input id="lead-website" name="website" type="text" tabIndex={-1} autoComplete="off" /></div>
    <button className="tr-cta" type="submit"><CalendarCheck size={20} aria-hidden="true" />{form.submit}<ArrowRight size={18} aria-hidden="true" /></button>
    <p className="tr-action-note">{form.note}</p>
  </form>
}
