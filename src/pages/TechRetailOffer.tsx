import { useEffect, useRef, useState } from 'react'
import { ArrowRight, ArrowUpRight, Check, ChevronDown, MessageCircle, Play } from 'lucide-react'
import { FOUNDING_PARTNER_OPEN, FUNNEL_ASSETS, FUNNEL_COPY, SHOP_TYPES, funnelDemoUrl, funnelWhatsAppUrl } from '../content/tech-retail-funnel.ts'
import type { FunnelLanguage, ShopType } from '../content/tech-retail-funnel.ts'
import { useLanguage } from '../context/LanguageContext.jsx'
import BrandLogo from '../components/BrandLogo.jsx'
import '../styles/tech-retail-offer.css'

export default function TechRetailOffer() {
  const { lang } = useLanguage()
  const language = lang as FunnelLanguage
  const copy = FUNNEL_COPY[language]
  const [shop, setShop] = useState<ShopType>('pc')
  const [playing, setPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const current = copy.shops[shop]
  const whatsapp = funnelWhatsAppUrl(language, shop)
  const problems = [[current.question, current.pain, current.fix], copy.stock, copy.warranty]

  // The fixed mobile button shows only while no in-page WhatsApp button is on screen, so two never show together.
  const page = useRef<HTMLDivElement>(null)
  const [pastHero, setPastHero] = useState(false)
  useEffect(() => {
    const buttons = page.current?.querySelectorAll('[data-funnel-cta]')
    if (!buttons?.length || typeof IntersectionObserver === 'undefined') { setPastHero(true); return }
    const onScreen = new Set<Element>()
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) { if (entry.isIntersecting) onScreen.add(entry.target); else onScreen.delete(entry.target) }
      setPastHero(onScreen.size === 0)
    })
    buttons.forEach((button) => observer.observe(button))
    return () => observer.disconnect()
  }, [])

  // A plain render helper, not a component: the buttons keep their DOM nodes across re-renders, which the observer above relies on.
  function action(placement: string, demo = false) {
    return <div className="tr-action">
      <a className="tr-cta" data-funnel-cta={placement} href={whatsapp} target="_blank" rel="noopener"><MessageCircle size={20} aria-hidden="true" />{copy.cta}<ArrowRight size={18} aria-hidden="true" /></a>
      <p className="tr-action-note">{copy.ctaNote}</p>
      {demo && <p className="tr-demo"><a href={funnelDemoUrl(shop)} target="_blank" rel="noopener" data-funnel-demo={shop}>{copy.demoCta}<ArrowUpRight size={16} aria-hidden="true" /></a><span>{shop === 'mobile' || shop === 'camera' ? copy.demoNoteOther : copy.demoNote}</span></p>}
    </div>
  }

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
        {action('hero', true)}
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

      <section className="tr-section tr-wrap" aria-labelledby="workflows-title">
        <div className="tr-section-heading"><h2 id="workflows-title">{copy.solutionHeading}</h2><p>{copy.solutionIntro}</p></div>
        <div className="tr-workflows">
          <div className="tr-workflow">
            <div className="tr-workflow-copy"><h3>{current.featureTitle}</h3><p>{current.fix}</p></div>
            <figure>{current.points
              ? <ol className="tr-serial-flow">{current.points.map(([name, detail]) => <li key={name}><strong>{name}</strong><span>{detail}</span></li>)}</ol>
              : <img src="/tech-retail/pc-builder.webp" alt={current.featureCaption} width="1200" height="845" loading="lazy" decoding="async" />}
              <figcaption>{current.featureCaption}</figcaption></figure>
          </div>
          <div className="tr-workflow">
            <div className="tr-workflow-copy"><h3>{copy.stockTitle}</h3><p>{copy.stock[2]}</p></div>
            <figure><img src="/tech-retail/stock.webp" alt={copy.stockCaption} width="1200" height="609" loading="lazy" decoding="async" /><figcaption>{copy.stockCaption}</figcaption></figure>
          </div>
          <div className="tr-workflow">
            <div className="tr-workflow-copy"><h3>{copy.serialTitle}</h3><p>{copy.warranty[2]}</p></div>
            <figure><ol className="tr-serial-flow">{copy.serialSteps.map(([stage, record]) => <li key={stage}><strong>{stage}</strong><span>{record}</span></li>)}</ol><figcaption>{copy.serialCaption}</figcaption></figure>
          </div>
        </div>
        {action('workflows', true)}
      </section>

      <section className="tr-offer-section tr-section" aria-labelledby="plans-title">
        <div className="tr-wrap">
          <div className="tr-section-heading"><h2 id="plans-title">{copy.plansHeading}</h2><p>{copy.plansIntro}</p></div>
          <div className="tr-plans">
            {copy.plans.map((plan) => <article className="tr-plan" key={plan.name}>
              <h3>{plan.name}</h3>
              <p className="tr-plan-line">{plan.line}</p>
              <p className="tr-plan-delivery">{plan.delivery}</p>
              <ul>{plan.items.map((item) => <li key={item}><Check size={17} aria-hidden="true" /><span>{item}</span></li>)}</ul>
              <a className="tr-plan-cta" data-funnel-plan={plan.name} href={funnelWhatsAppUrl(language, shop, plan.name)} target="_blank" rel="noopener">{copy.planCta}<ArrowRight size={16} aria-hidden="true" /></a>
            </article>)}
          </div>
          <p className="tr-costs">{copy.plansNote}</p>
          {action('plans')}
        </div>
      </section>

      <section className="tr-section tr-wrap" aria-labelledby="stores-title">
        <div className="tr-section-heading"><h2 id="stores-title">{copy.storesHeading}</h2><p>{copy.storesIntro}</p></div>
        <div className="tr-stores">
          {copy.stores.map((store) => <a className="tr-store" key={store.shop} data-funnel-store={store.shop} href={funnelDemoUrl(store.shop)} target="_blank" rel="noopener">
            <span><strong>{store.name}</strong><small>{store.line}</small></span>
            <span className="tr-store-go">{copy.storeCta}<ArrowUpRight size={16} aria-hidden="true" /></span>
          </a>)}
        </div>
      </section>

      <section className="tr-section tr-wrap" aria-labelledby="process-title">
        <h2 id="process-title">{copy.processHeading}</h2>
        <ol className="tr-process">{copy.process.map(([title, description], index) => <li key={title}><span className="tr-step">{index + 1}</span><div><h3>{title}</h3><p>{description}</p></div></li>)}</ol>
      </section>

      <section className="tr-trust tr-section" aria-labelledby="owned-title">
        <div className="tr-wrap tr-trust-grid">
          <div>
            <h2 id="owned-title">{copy.ownedHeading}</h2>
            <p className="tr-trust-intro">{copy.ownedIntro}</p>
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

      <section className="tr-faq tr-section tr-wrap" aria-labelledby="faq-title"><h2 id="faq-title">{copy.faqHeading}</h2>
        <div>{copy.faq.map(([question, answer]) => <details key={question}><summary>{question}<ChevronDown size={18} aria-hidden="true" /></summary><p>{answer}</p></details>)}</div>
      </section>

      {FOUNDING_PARTNER_OPEN && <section className="tr-partner" aria-labelledby="partner-title"><div className="tr-wrap">
        <h2 id="partner-title">{copy.partnerHeading}</h2>
        <p>{copy.partnerBody}</p>
        <ul>{copy.partnerAsks.map((ask) => <li key={ask}><Check size={18} aria-hidden="true" /><span>{ask}</span></li>)}</ul>
        <a className="tr-partner-cta" data-funnel-partner="whatsapp" href={funnelWhatsAppUrl(language, shop, undefined, true)} target="_blank" rel="noopener"><MessageCircle size={19} aria-hidden="true" />{copy.partnerCta}<ArrowRight size={17} aria-hidden="true" /></a>
      </div></section>}

      <section className="tr-final tr-section" aria-labelledby="final-title"><div className="tr-wrap"><h2 id="final-title">{copy.finalHeading}</h2><p>{copy.finalCopy}</p>{action('final')}</div></section>
    </main>
    <footer className="tr-footer tr-wrap"><p>{copy.identity}</p><div><a href="/privacy-policy">{copy.privacy}</a><a href="/terms-of-service">{copy.terms}</a><a href="/offers/terms">{copy.retailTerms}</a></div><small>© {new Date().getUTCFullYear()} TeXCodes</small></footer>
    <a className={`tr-sticky${pastHero ? ' is-shown' : ''}`} data-funnel-sticky="whatsapp" tabIndex={pastHero ? undefined : -1} aria-hidden={pastHero ? undefined : true} href={whatsapp} target="_blank" rel="noopener"><MessageCircle size={20} aria-hidden="true" />{copy.stickyCta}</a>
  </div>
}
