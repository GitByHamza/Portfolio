import { useEffect, useRef, useState } from 'react'
import { ArrowRight, ArrowUpRight, Check, ChevronDown, MessageCircle, Play } from 'lucide-react'
import { FOUNDING_PARTNER_OPEN, FUNNEL_ASSETS, FUNNEL_COPY, SHOP_TYPES, funnelDemoUrl, funnelWhatsAppUrl } from '../content/tech-retail-funnel.ts'
import type { FunnelLanguage, ShopType } from '../content/tech-retail-funnel.ts'
import { useLanguage } from '../context/LanguageContext.jsx'
import BrandLogo from '../components/BrandLogo.jsx'
import FunnelLeadForm from '../components/FunnelLeadForm.tsx'
import '../styles/tech-retail-offer.css'

export default function TechRetailOffer() {
  const { lang } = useLanguage()
  const language = lang as FunnelLanguage
  const copy = FUNNEL_COPY[language]
  const [shop, setShop] = useState<ShopType>('pc')
  const [playing, setPlaying] = useState(false)
  const [openPlans, setOpenPlans] = useState<string[]>([])
  const videoRef = useRef<HTMLVideoElement>(null)
  const current = copy.shops[shop]
  const whatsapp = funnelWhatsAppUrl(language, shop)
  const problems = [[current.question, current.pain, current.fix], copy.stock, copy.warranty]
  const togglePlan = (name: string) => setOpenPlans((open) => open.includes(name) ? open.filter((plan) => plan !== name) : [...open, name])

  // The fixed mobile button shows only while no in-page WhatsApp button or the form is on screen, so two never show together.
  const page = useRef<HTMLDivElement>(null)
  const [pastHero, setPastHero] = useState(false)
  useEffect(() => {
    const zones = page.current?.querySelectorAll('[data-funnel-cta], [data-funnel-zone]')
    if (!zones?.length || typeof IntersectionObserver === 'undefined') { setPastHero(true); return }
    const onScreen = new Set<Element>()
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) { if (entry.isIntersecting) onScreen.add(entry.target); else onScreen.delete(entry.target) }
      setPastHero(onScreen.size === 0)
    })
    zones.forEach((zone) => observer.observe(zone))
    return () => observer.disconnect()
  }, [])

  return <div className="tr-funnel" ref={page}>
    <header className="tr-masthead" aria-label="TeXCodes">
      <BrandLogo variant="compact" /><span className="tr-masthead-divider" aria-hidden="true" />
      <span className="tr-product-name">Tech Retail OS</span>
    </header>

    <main id="page-content" tabIndex={-1}>
      <section className="tr-hero tr-wrap" aria-labelledby="offer-title">
        <h1 id="offer-title">{copy.headline[0]}<br /><em>{copy.headline[1]}</em></h1>
        <p className="tr-intro">{copy.intro}</p>
        <div className="tr-shops" role="group" aria-labelledby="shop-prompt">
          <p id="shop-prompt">{copy.shopPrompt}</p>
          <div>{SHOP_TYPES.map((type) => <button key={type} type="button" data-shop={type} aria-pressed={shop === type} onClick={() => setShop(type)}>{copy.shops[type].label}</button>)}</div>
        </div>
        <div className="tr-action">
          <a className="tr-cta" data-funnel-cta="hero" href={whatsapp} target="_blank" rel="noopener"><MessageCircle size={20} aria-hidden="true" />{copy.cta}<ArrowRight size={18} aria-hidden="true" /></a>
          <p className="tr-action-note">{copy.ctaNote}</p>
          <p className="tr-demo"><a href={funnelDemoUrl(shop)} target="_blank" rel="noopener" data-funnel-demo={shop}>{copy.demoCta}<ArrowUpRight size={16} aria-hidden="true" /></a><span>{shop === 'mobile' || shop === 'camera' ? copy.demoNoteOther : copy.demoNote}</span></p>
        </div>
        <figure className="tr-preview">
          <div className={`tr-preview-screen${playing ? ' is-playing' : ''}`}>
            <video ref={videoRef} controls preload="none" playsInline poster={FUNNEL_ASSETS.poster} width="1920" height="1080" aria-label={copy.preview} onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onEnded={() => setPlaying(false)}>
              <source src={FUNNEL_ASSETS.video} type="video/mp4" />
              <track kind="captions" src={FUNNEL_ASSETS.captions} srcLang="ur" label="Roman Urdu" />
              {copy.videoFallback}
            </video>
            {!playing && <button className="tr-watch" onClick={() => { void videoRef.current?.play().catch(() => setPlaying(false)) }} type="button" aria-label={copy.videoButton}><Play aria-hidden="true" fill="currentColor" /></button>}
          </div>
          <figcaption><span>{copy.preview}</span><span>{copy.previewNote}</span></figcaption>
        </figure>
      </section>

      <section className="tr-problems tr-section" aria-labelledby="problems-title">
        <div className="tr-wrap">
          <h2 id="problems-title">{copy.problemHeading}</h2>
          <div className="tr-problem-list" aria-live="polite">
            {problems.map(([title, problem, fix]) => <div key={title}><h3>{title}</h3><p>{problem}</p><p className="tr-fix"><Check size={16} aria-hidden="true" /><span>{fix}</span></p></div>)}
          </div>
        </div>
      </section>

      <section className="tr-section tr-wrap" aria-labelledby="proof-title">
        <div className="tr-section-heading"><h2 id="proof-title">{copy.storesHeading}</h2><p>{copy.storesIntro}</p></div>
        <div className="tr-screens">
          <div className="tr-screen">
            <h3>{current.featureTitle}</h3>
            <figure>{current.points
              ? <ol className="tr-points">{current.points.map(([name, detail]) => <li key={name}><strong>{name}</strong><span>{detail}</span></li>)}</ol>
              : <img src="/tech-retail/pc-builder.webp" alt={current.featureCaption} width="1200" height="845" loading="lazy" decoding="async" />}
              <figcaption>{current.featureCaption}</figcaption></figure>
          </div>
          <div className="tr-screen">
            <h3>{copy.stockTitle}</h3>
            <figure><img src="/tech-retail/stock.webp" alt={copy.stockCaption} width="1200" height="609" loading="lazy" decoding="async" /><figcaption>{copy.stockCaption}</figcaption></figure>
          </div>
        </div>
        <div className="tr-stores">
          {copy.stores.map((store) => <a className="tr-store" key={store.shop} data-funnel-store={store.shop} href={funnelDemoUrl(store.shop)} target="_blank" rel="noopener">
            <span><strong>{store.name}</strong><small>{store.line}</small></span>
            <span className="tr-store-go">{copy.storeCta}<ArrowUpRight size={16} aria-hidden="true" /></span>
          </a>)}
        </div>
      </section>

      <section className="tr-offer-section tr-section" aria-labelledby="plans-title">
        <div className="tr-wrap">
          <div className="tr-section-heading"><h2 id="plans-title">{copy.plansHeading}</h2><p>{copy.plansIntro}</p></div>
          <div className="tr-plans">
            {copy.plans.map((plan, index) => {
              const open = openPlans.includes(plan.name)
              return <article className={`tr-plan${open ? ' is-open' : ''}`} key={plan.name}>
                <h3>{plan.name}</h3>
                <p className="tr-plan-line">{plan.line}</p>
                <p className="tr-plan-delivery">{plan.delivery}</p>
                <button className="tr-plan-toggle" type="button" aria-expanded={open} aria-controls={`plan-items-${index}`} onClick={() => togglePlan(plan.name)}>{copy.planItems}<ChevronDown size={18} aria-hidden="true" /></button>
                <ul id={`plan-items-${index}`}>{plan.items.map((item) => <li key={item}><Check size={17} aria-hidden="true" /><span>{item}</span></li>)}</ul>
                <a className="tr-plan-cta" data-funnel-plan={plan.name} href={funnelWhatsAppUrl(language, shop, plan.name)} target="_blank" rel="noopener">{copy.planCta}<ArrowRight size={16} aria-hidden="true" /></a>
              </article>
            })}
          </div>
          <p className="tr-costs">{copy.plansNote}</p>
        </div>
      </section>

      <section className="tr-trust tr-section" aria-labelledby="process-title">
        <div className="tr-wrap tr-trust-grid">
          <div>
            <h2 id="process-title">{copy.processHeading}</h2>
            <ol className="tr-process">{copy.process.map(([title, description], index) => <li key={title}><span className="tr-step">{index + 1}</span><div><h3>{title}</h3><p>{description}</p></div></li>)}</ol>
            <h3 className="tr-owned-title">{copy.ownedHeading}</h3>
            <ul className="tr-owned">{copy.owned.map(([name, detail]) => <li key={name}><Check size={18} aria-hidden="true" /><span><strong>{name}</strong><small>{detail}</small></span></li>)}</ul>
          </div>
          <aside className="tr-founder" aria-labelledby="founder-title">
            <p className="tr-founder-label" id="founder-title">{copy.founderHeading}</p>
            <div className="tr-founder-id"><span className="tr-founder-mark" aria-hidden="true">H</span><span><strong>{copy.founderName}</strong><small>{copy.founderRole}</small></span></div>
            {copy.founderLines.map((line) => <p key={line}>{line}</p>)}
            <a href={language === 'ur-en' ? '/ur/work' : '/work'}>{copy.founderWorkLink}<ArrowRight size={16} aria-hidden="true" /></a>
          </aside>
        </div>
      </section>

      {FOUNDING_PARTNER_OPEN && <section className="tr-partner" aria-labelledby="partner-title"><div className="tr-wrap">
        <h2 id="partner-title">{copy.partnerHeading}</h2>
        <p>{copy.partnerBody}</p>
        <ul>{copy.partnerAsks.map((ask) => <li key={ask}><Check size={18} aria-hidden="true" /><span>{ask}</span></li>)}</ul>
        <a className="tr-partner-cta" data-funnel-partner="whatsapp" href={funnelWhatsAppUrl(language, shop, undefined, true)} target="_blank" rel="noopener"><MessageCircle size={19} aria-hidden="true" />{copy.partnerCta}<ArrowRight size={17} aria-hidden="true" /></a>
      </div></section>}

      <section className="tr-faq tr-section tr-wrap" aria-labelledby="faq-title"><h2 id="faq-title">{copy.faqHeading}</h2>
        <div>{copy.faq.map(([question, answer]) => <details key={question}><summary>{question}<ChevronDown size={18} aria-hidden="true" /></summary><p>{answer}</p></details>)}</div>
      </section>

      <section className="tr-final tr-section" aria-labelledby="final-title"><div className="tr-wrap tr-final-grid">
        <div className="tr-final-copy">
          <h2 id="final-title">{copy.finalHeading}</h2>
          <p>{copy.finalCopy}</p>
        </div>
        <div>
          <div data-funnel-zone="form"><FunnelLeadForm language={language} shop={shop} onShopChange={setShop} /></div>
          <p className="tr-direct"><a data-funnel-cta="final" href={whatsapp} target="_blank" rel="noopener"><MessageCircle size={18} aria-hidden="true" />{copy.orDirect}</a></p>
        </div>
      </div></section>
    </main>
    <footer className="tr-footer tr-wrap"><p>{copy.identity}</p><div><a href="/privacy-policy">{copy.privacy}</a><a href="/terms-of-service">{copy.terms}</a><a href="/offers/terms">{copy.retailTerms}</a></div><small>© {new Date().getUTCFullYear()} TeXCodes</small></footer>
    <a className={`tr-sticky${pastHero ? ' is-shown' : ''}`} data-funnel-sticky="whatsapp" tabIndex={pastHero ? undefined : -1} aria-hidden={pastHero ? undefined : true} href={whatsapp} target="_blank" rel="noopener"><MessageCircle size={20} aria-hidden="true" />{copy.stickyCta}</a>
  </div>
}
