import { useRef, useState } from 'react'
import { useLoaderData } from 'react-router'
import { ArrowRight, Check, ChevronDown, Play } from 'lucide-react'
import type { loader } from '../routes/tech-offer.tsx'
import { FUNNEL_ASSETS, FUNNEL_COPY, loomEmbedUrl } from '../content/tech-retail-funnel.ts'
import { carePlans, money, priceCatalog } from '../content/pricing.ts'
import { useLanguage } from '../context/LanguageContext.jsx'
import BrandLogo from '../components/BrandLogo.jsx'
import '../styles/tech-retail-offer.css'

export default function TechRetailOffer() {
  const { plan } = useLoaderData<typeof loader>()
  const { lang, isUrdu } = useLanguage()
  const copy = FUNNEL_COPY[lang as keyof typeof FUNNEL_COPY]
  const currency = 'USD'
  const price = priceCatalog.tech.growth
  const [playing, setPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const embed = loomEmbedUrl(FUNNEL_ASSETS.loomUrl)
  const screens = ['pc-builder', 'stock', 'warranty']

  function startPreview() {
    if (embed) { setPlaying(true); return }
    const video = videoRef.current
    if (!video) return
    video.focus({ preventScroll: true })
    void video.play().catch(() => setPlaying(false))
  }

  function BookingAction({ placement }: { placement: string }) {
    const contents = <>{copy.cta}<ArrowRight size={18} aria-hidden="true" /></>
    return <div className="tr-action">
      {FUNNEL_ASSETS.bookingUrl
        ? <a className="tr-cta" data-funnel-cta={placement} href={FUNNEL_ASSETS.bookingUrl}>{contents}</a>
        : <button className="tr-cta" data-funnel-cta={placement} type="button" disabled aria-describedby={`booking-${placement}`}>{contents}</button>}
      <p id={`booking-${placement}`} className="tr-action-note">{FUNNEL_ASSETS.bookingUrl ? copy.ctaNote : copy.pending}</p>
    </div>
  }

  return <div className="tr-funnel">
    <header className="tr-masthead" aria-label="TeXCodes">
      <BrandLogo variant="compact" /><span className="tr-masthead-divider" aria-hidden="true" />
      <span className="tr-product-name">Tech Retail OS</span>
    </header>

    <main id="page-content" tabIndex={-1}>
      <section className="tr-hero tr-wrap" aria-labelledby="offer-title">
        <h1 id="offer-title">{copy.headline[0]}<br /><em>{copy.headline[1]}</em></h1>
        <p className="tr-intro">{copy.intro}</p>
        <figure className="tr-preview">
          <div className={`tr-preview-screen${playing ? ' is-playing' : ''}`}>
            {playing && embed
              ? <iframe src={embed} title={copy.preview} allow="fullscreen; picture-in-picture" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" />
              : embed
                ? <img src={FUNNEL_ASSETS.poster} alt={copy.preview} width="1600" height="900" fetchPriority="high" />
                : <video ref={videoRef} controls preload="none" playsInline poster={FUNNEL_ASSETS.poster} width="1920" height="1080" aria-label={copy.preview} onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onEnded={() => setPlaying(false)}>
                  <source src={FUNNEL_ASSETS.video} type="video/mp4" />
                  <track kind="captions" src="/video/tech-retail-en.vtt" srcLang="en" label="English" />
                  {copy.videoFallback}
                </video>}
            {!playing && <button className="tr-watch" onClick={startPreview} type="button" aria-label={copy.videoButton}><Play aria-hidden="true" fill="currentColor" /></button>}
          </div>
          <figcaption><span>{copy.preview}</span><span>{copy.previewNote}</span></figcaption>
        </figure>
        <BookingAction placement="hero" />
      </section>

      <section className="tr-problems tr-section" aria-labelledby="problems-title">
        <div className="tr-wrap">
          <h2 id="problems-title">{copy.problemHeading}</h2>
          <div className="tr-problem-list">
            {copy.problems.map(([title, problem]) => <div key={title}><h3>{title}</h3><p>{problem}</p></div>)}
          </div>
        </div>
      </section>

      <section className="tr-section tr-wrap" aria-labelledby="workflows-title">
        <div className="tr-section-heading"><h2 id="workflows-title">{copy.solutionHeading}</h2><p>{copy.solutionIntro}</p></div>
        <div className="tr-workflows">
          {screens.map((screen, index) => <div className="tr-workflow" key={screen}>
            <div className="tr-workflow-copy"><h3>{copy.screenTitles[index]}</h3><p>{copy.problems[index][2]}</p></div>
            <figure>{index === 2
              ? <ol className="tr-serial-flow">{copy.serialSteps.map(([stage, record]) => <li key={stage}><strong>{stage}</strong><span>{record}</span></li>)}</ol>
              : <img src={`/tech-retail/${screen}.webp`} alt={copy.screenCaptions[index]} width="1200" height={index === 0 ? 845 : 609} loading="lazy" decoding="async" />}
              <figcaption>{copy.screenCaptions[index]}</figcaption></figure>
          </div>)}
        </div>
        <BookingAction placement="workflows" />
      </section>

      <section className="tr-offer-section tr-section" aria-labelledby="package-title">
        <div className="tr-wrap">
          <div className="tr-section-heading"><h2 id="package-title">{copy.offerHeading}</h2><p>{copy.offerIntro}</p></div>
          <div className="tr-package" id="multi-branch">
            <div className="tr-package-summary">
              <h3>{copy.offerName}</h3>
              <p className="tr-price-label">{copy.priceLabel}</p>
              <p className="tr-price">{money(price.USD.amount, 'USD')} <span className="tr-price-currency">USD</span></p>
              <p className="tr-regional-price">{copy.international}</p>
              <p className="tr-delivery">{copy.delivery}</p>
              <p className="tr-payment">40 / 40 / 20 <span>{isUrdu ? 'shuru / staging approval / launch' : 'start / staging approval / launch'}</span></p>
            </div>
            <div className="tr-package-includes"><p>{copy.included}</p><ul>{plan.modules.map((module) => <li key={module.title}><Check size={18} aria-hidden="true" /><span>{module.title.replace(/\s*\(included[^)]*\)/i, '')}</span></li>)}</ul></div>
          </div>
          <p className="tr-costs">{copy.care} {money(carePlans[1][currency], currency)} / {isUrdu ? 'mahana' : 'month'}.</p>
          <details className="tr-scope"><summary>{copy.scope}<ChevronDown size={18} aria-hidden="true" /></summary><div className="tr-scope-body">
            {plan.modules.map((module) => <div key={module.title}><h4>{module.title}</h4><p>{module.desc}</p><ul>{module.items?.map((item) => <li key={item}>{item}</li>)}</ul></div>)}
            <div><h4>{copy.exclusions}</h4><ul>{plan.exclusions.map((item) => <li key={item}>{item}</li>)}</ul></div>
          </div></details>
          <BookingAction placement="offer" />
        </div>
      </section>

      <section className="tr-section tr-wrap" aria-labelledby="process-title">
        <h2 id="process-title">{copy.processHeading}</h2>
        <ol className="tr-process">{copy.process.map(([title, description], index) => <li key={title}><span className="tr-step">{index + 1}</span><div><h3>{title}</h3><p>{description}</p></div></li>)}</ol>
      </section>

      <section className="tr-faq tr-section tr-wrap" aria-labelledby="faq-title"><h2 id="faq-title">{copy.faqHeading}</h2>
        <div>{copy.faq.map(([question, answer]) => <details key={question}><summary>{question}<ChevronDown size={18} aria-hidden="true" /></summary><p>{answer}</p></details>)}</div>
      </section>

      <section className="tr-final tr-section" aria-labelledby="final-title"><div className="tr-wrap"><h2 id="final-title">{copy.finalHeading}</h2><p>{copy.finalCopy}</p><BookingAction placement="final" /></div></section>
    </main>
    <footer className="tr-footer tr-wrap"><p>{copy.identity}</p><div><a href="/privacy-policy">{copy.privacy}</a><a href="/terms-of-service">{copy.terms}</a><a href="/solutions/terms">{copy.retailTerms}</a></div><small>© {new Date().getUTCFullYear()} TeXCodes</small></footer>
  </div>
}
