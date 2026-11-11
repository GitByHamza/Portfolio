import { useEffect, useRef, useState } from 'react'
import type { Dispatch, SetStateAction } from 'react'
import { useLoaderData } from 'react-router'
import { ArrowRight, ArrowUpRight, Check, ChevronDown, MessageCircle, Play, ShieldCheck } from 'lucide-react'
import { FOUNDING_PARTNER_OPEN, FUNNEL_ASSETS, FUNNEL_COPY, SHOP_TYPES, adRef, funnelDemoUrl, funnelPlans, funnelQualifier, funnelWhatsAppUrl, isShopType } from '../content/tech-retail-funnel.ts'
import type { FunnelLanguage, ShopType } from '../content/tech-retail-funnel.ts'
import { useLanguage } from '../context/LanguageContext.jsx'
import BrandLogo from '../components/BrandLogo.jsx'
import FunnelLeadForm from '../components/FunnelLeadForm.tsx'
import { rememberAdSource } from '../lib/funnel-lead.ts'
import '../styles/tech-retail-offer.css'

// Open or close one item of a list of open dropdowns.
function toggleIn<T>(setOpen: Dispatch<SetStateAction<T[]>>, key: T) {
  setOpen((open) => open.includes(key) ? open.filter((item) => item !== key) : [...open, key])
}

function sessionStore(): Storage | null {
  try { return window.sessionStorage } catch { return null }
}

export default function TechRetailOffer() {
  const { lang } = useLanguage()
  const language = lang as FunnelLanguage
  const copy = FUNNEL_COPY[language]
  // Each shop type has its own pre-rendered page; the plain funnel starts on PC and also accepts ?shop=.
  const data = useLoaderData() as { page?: { shop?: string } } | undefined
  const loaderShop = data?.page?.shop
  const pageShop = isShopType(loaderShop) ? loaderShop : null
  const [shop, setShop] = useState<ShopType>(pageShop ?? 'pc')
  const [ref, setRef] = useState<string | null>(null)
  const [playing, setPlaying] = useState(false)
  const [openPlans, setOpenPlans] = useState<string[]>([])
  const [openFaq, setOpenFaq] = useState<number[]>([])
  const videoRef = useRef<HTMLVideoElement>(null)
  const current = copy.shops[shop]
  const whatsapp = funnelWhatsAppUrl(language, shop, undefined, false, ref)
  const tag = <span className="tr-plan-tag">{copy.planTag}</span>
  const problems = [
    { ask: copy.problemAsk, title: current.question, problem: current.pain, fix: current.fix, ops: current.fixPlan === 'growth' },
    { ask: copy.stockAsk, title: copy.stock[0], problem: copy.stock[1], fix: copy.stock[2], ops: true },
    { ask: copy.warrantyAsk, title: copy.warranty[0], problem: copy.warranty[1], fix: copy.warranty[2], ops: true },
  ]
  const faq = FOUNDING_PARTNER_OPEN ? [...copy.faq, copy.partnerFaq] : copy.faq

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const fromUrl = params.get('shop')
    if (!pageShop && isShopType(fromUrl)) setShop(fromUrl)
    setRef(adRef(rememberAdSource(window.location.search, sessionStore())))
  }, [pageShop])

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

  return <div className="tr-funnel" ref={page} data-shop-page={shop}>
    {FOUNDING_PARTNER_OPEN && <aside className="tr-strip" aria-label="Founding Partner"><p>
      <span>{copy.partnerStrip}</span>
      <a data-funnel-partner="whatsapp" href={funnelWhatsAppUrl(language, shop, undefined, true, ref)} target="_blank" rel="noopener">{copy.partnerStripCta}<ArrowRight size={15} aria-hidden="true" /></a>
    </p></aside>}
    <header className="tr-masthead" aria-label="TeXCodes">
      <BrandLogo variant="compact" /><span className="tr-masthead-divider" aria-hidden="true" />
      <span className="tr-product-name">Tech Retail OS</span>
    </header>

    <main id="page-content" tabIndex={-1}>
      <section className="tr-hero tr-wrap" aria-labelledby="offer-title">
        <h1 id="offer-title">{current.headline[0]}<em>{current.headline[1]}</em></h1>
        <p className="tr-intro">{current.sub}</p>
        <p className="tr-qualifier" data-funnel-qualifier={shop}>{funnelQualifier(language, shop)}</p>
        <div className="tr-shops" role="group" aria-labelledby="shop-prompt">
          <p id="shop-prompt">{copy.shopPrompt}</p>
          <div>{SHOP_TYPES.map((type) => <button key={type} type="button" data-shop={type} aria-pressed={shop === type} onClick={() => setShop(type)}>{copy.shops[type].label}</button>)}</div>
        </div>
        <div className="tr-action">
          <a className="tr-cta" data-funnel-cta="hero" href={whatsapp} target="_blank" rel="noopener"><MessageCircle size={20} aria-hidden="true" />{copy.cta}<ArrowRight size={18} aria-hidden="true" /></a>
          <p className="tr-action-note">{copy.ctaNote}</p>
          <p className="tr-demo"><a href={funnelDemoUrl(shop)} target="_blank" rel="noopener" data-funnel-demo={shop}>{copy.demoCta}<ArrowUpRight size={16} aria-hidden="true" /></a><span>{copy.demoNote}</span></p>
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
          <p className="tr-problems-intro">{copy.problemIntro}</p>
          <div className="tr-problem-list" aria-live="polite">
            {problems.map((item) => <div key={item.title}><p className="tr-ask">{item.ask}</p><h3>{item.title}</h3><p>{item.problem}</p><p className="tr-fix"><Check size={16} aria-hidden="true" /><span>{item.fix} {item.ops && tag}</span></p></div>)}
          </div>
        </div>
      </section>

      <section className="tr-section tr-wrap" aria-labelledby="proof-title">
        <div className="tr-section-heading"><h2 id="proof-title">{copy.storesHeading}</h2><p>{copy.storesIntro}</p></div>
        <div className="tr-screens">
          <div className="tr-screen">
            <h3>{current.featureTitle}</h3>
            <p className="tr-screen-line">{current.featureLine}</p>
            <figure>{current.points
              ? <ol className="tr-points">{current.points.map(([name, detail]) => <li key={name}><strong>{name}</strong><span>{detail}</span></li>)}</ol>
              : <img src="/tech-retail/pc-builder.webp" alt={current.featureCaption} width="1200" height="845" loading="lazy" decoding="async" />}
              <figcaption>{current.featureCaption}</figcaption></figure>
          </div>
          <div className="tr-screen">
            <h3>{copy.stockTitle}</h3>
            <p className="tr-screen-line">{copy.stockLine} {tag}</p>
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
            {funnelPlans(language, shop).map((plan, index) => {
              const open = openPlans.includes(plan.name)
              return <article className={`tr-plan${open ? ' is-open' : ''}${plan.recommended ? ' is-recommended' : ''}`} key={plan.name}>
                {plan.recommended && <p className="tr-plan-recommended">{plan.recommended}</p>}
                <h3>{plan.name}</h3>
                <p className="tr-plan-price" data-funnel-price={plan.key}>{plan.price}</p>
                <p className="tr-plan-line">{plan.line}</p>
                <p className="tr-plan-delivery">{plan.delivery}</p>
                <button className="tr-plan-toggle" type="button" aria-expanded={open} aria-controls={`plan-items-${index}`} onClick={() => toggleIn(setOpenPlans, plan.name)}>{copy.planItems}<ChevronDown size={18} aria-hidden="true" /></button>
                <div className="tr-plan-items tr-reveal" id={`plan-items-${index}`}><div><ul>{plan.items.map((item) => <li key={item}><Check size={17} aria-hidden="true" /><span>{item}</span></li>)}</ul></div></div>
                <a className="tr-plan-cta" data-funnel-plan={plan.name} href={funnelWhatsAppUrl(language, shop, plan.name, false, ref)} target="_blank" rel="noopener">{copy.planCta}<ArrowRight size={16} aria-hidden="true" /></a>
              </article>
            })}
          </div>
          <p className="tr-costs">{copy.plansNote}</p>
          <div className="tr-guarantee"><ShieldCheck size={22} aria-hidden="true" /><div><h3>{copy.guaranteeTitle}</h3><p>{copy.guarantee}</p></div></div>
        </div>
      </section>

      <section className="tr-trust tr-section" aria-labelledby="process-title">
        <div className="tr-wrap tr-trust-grid">
          <div>
            <h2 id="process-title">{copy.processHeading}</h2>
            <ol className="tr-process">{copy.process.map(([title, description], index) => <li key={title}><span className="tr-step">{index + 1}</span><div><h3>{title}</h3><p>{description}</p></div></li>)}</ol>
          </div>
          <div className="tr-owned-box">
            <h3 className="tr-owned-title">{copy.ownedHeading}</h3>
            <ul className="tr-owned">{copy.owned.map(([name, detail]) => <li key={name}><Check size={18} aria-hidden="true" /><span><strong>{name}</strong><small>{detail}</small></span></li>)}</ul>
          </div>
        </div>
      </section>

      <section className="tr-faq tr-section tr-wrap" aria-labelledby="faq-title"><h2 id="faq-title">{copy.faqHeading}</h2>
        <div>{faq.map(([question, answer], index) => {
          const open = openFaq.includes(index)
          return <div className={`tr-faq-item${open ? ' is-open' : ''}`} key={question}>
            <h3><button type="button" id={`faq-question-${index}`} aria-expanded={open} aria-controls={`faq-answer-${index}`} onClick={() => toggleIn(setOpenFaq, index)}>{question}<ChevronDown size={18} aria-hidden="true" /></button></h3>
            <div className="tr-reveal" id={`faq-answer-${index}`} role="region" aria-labelledby={`faq-question-${index}`}><div><p>{answer}</p></div></div>
          </div>
        })}</div>
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
    <footer className="tr-footer tr-wrap"><div><a href="/privacy-policy">{copy.privacy}</a><a href="/terms-of-service">{copy.terms}</a><a href="/offers/terms">{copy.retailTerms}</a></div><small>© {new Date().getUTCFullYear()} TeXCodes</small></footer>
    <a className={`tr-sticky${pastHero ? ' is-shown' : ''}`} data-funnel-sticky="whatsapp" tabIndex={pastHero ? undefined : -1} aria-hidden={pastHero ? undefined : true} href={whatsapp} target="_blank" rel="noopener"><MessageCircle size={20} aria-hidden="true" />{copy.stickyCta}</a>
  </div>
}
