import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router'
import { getVisitorCountry } from '../lib/currency'
import { installPixel, isWhatsAppLink, pixelAllowed, trackPixelEvent } from '../lib/meta-pixel'

// Loads the Meta Pixel for visitors in Pakistan and reports page views and WhatsApp clicks.
// Renders nothing, so the server-rendered HTML is the same for everyone.
export default function MetaPixel() {
  const { pathname } = useLocation()
  const lastPath = useRef(null)

  useEffect(() => {
    if (!pixelAllowed(getVisitorCountry())) return
    // The install itself sends the first page view; later route changes send their own.
    if (!installPixel(window, document) && lastPath.current !== pathname) trackPixelEvent(window, 'PageView')
    lastPath.current = pathname
  }, [pathname])

  useEffect(() => {
    const onClick = (event) => {
      const link = event.target instanceof Element ? event.target.closest('a[href]') : null
      if (link && isWhatsAppLink(link.href)) trackPixelEvent(window, 'Contact', { method: 'whatsapp' })
    }
    document.addEventListener('click', onClick, true)
    return () => document.removeEventListener('click', onClick, true)
  }, [])

  return null
}
