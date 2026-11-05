import { useEffect, useId, useRef } from 'react'
import { ArrowRight, ChevronDown } from 'lucide-react'
import Link from './SiteLink'
import { useLanguage } from '../context/LanguageContext'
import '../styles/offer-navigation.css'

// Keep navigation lightweight; the full offer catalog is loaded on its own routes.
const offers = [
  { path: '/offers/tech-retail', label: 'offer_computers', product: 'Tech Retail OS' },
  { path: '/offers/laptop-retail', label: 'offer_laptops', product: 'Laptop Retail OS' },
  { path: '/offers/console-retail', label: 'offer_consoles', product: 'Console & Games Retail OS' },
]

export default function OffersMenu({ mobile = false, active = false, prefix = '', onNavigate }) {
  const menuRef = useRef(null)
  const hoveringRef = useRef(false)
  const panelId = useId()
  const { t } = useLanguage()

  useEffect(() => {
    const menu = menuRef.current
    function dismiss(event) {
      if (!menu.open) return
      if (event.type === 'pointerdown' && !menu.contains(event.target)) {
        menu.open = false
        hoveringRef.current = false
      } else if (event.key === 'Escape') {
        const focusedInside = menu.contains(document.activeElement)
        menu.open = false
        hoveringRef.current = false
        if (focusedInside) {
          event.preventDefault()
          menu.querySelector('summary').focus()
        }
      }
    }
    document.addEventListener('pointerdown', dismiss)
    document.addEventListener('keydown', dismiss)
    return () => {
      document.removeEventListener('pointerdown', dismiss)
      document.removeEventListener('keydown', dismiss)
    }
  }, [])

  function handleKeys(event) {
    if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) return
    const menu = menuRef.current
    const links = [...menu.querySelectorAll('a')]
    const index = links.indexOf(document.activeElement)
    if (index < 0 && !['ArrowDown', 'ArrowUp'].includes(event.key)) return
    event.preventDefault()
    menu.open = true
    const next = event.key === 'Home' ? 0
      : event.key === 'End' ? links.length - 1
        : event.key === 'ArrowDown' ? (index + 1) % links.length
          : index < 0 ? links.length - 1 : (index - 1 + links.length) % links.length
    links[next]?.focus()
  }

  return <details ref={menuRef} className={`nav-offers${mobile ? ' nav-offers--mobile' : ''}${active ? ' is-active' : ''}`}
    onPointerEnter={(event) => {
      if (event.pointerType !== 'mouse') return
      hoveringRef.current = true
      event.currentTarget.open = true
    }}
    onPointerLeave={(event) => {
      if (event.pointerType !== 'mouse') return
      hoveringRef.current = false
      if (!event.currentTarget.contains(document.activeElement)) event.currentTarget.open = false
    }}
    onBlur={(event) => {
      if (!event.currentTarget.contains(event.relatedTarget)) event.currentTarget.open = false
    }}
    onKeyDown={handleKeys}>
    <summary aria-controls={panelId} onClick={(event) => {
      // Hover already opened the disclosure; a mouse click keeps its links available.
      // Touch and keyboard retain the native summary toggle behavior.
      if (event.detail > 0 && hoveringRef.current) {
        event.preventDefault()
        menuRef.current.open = true
      }
    }}>
      {prefix}{t('nav', 'solutions')}<ChevronDown size={14} className="nav-offers-chevron" aria-hidden="true" />
    </summary>
    <div id={panelId} className="nav-offers-dropdown">
      <ul className="nav-offers-panel">
        {offers.map((offer) => <li key={offer.path}>
          <Link to={offer.path} prefetch="intent" onClick={() => {
            menuRef.current.open = false
            hoveringRef.current = false
            onNavigate?.()
          }}>
            <span><strong>{t('nav', offer.label)}</strong><small>{offer.product}</small></span>
            <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </li>)}
      </ul>
    </div>
  </details>
}
