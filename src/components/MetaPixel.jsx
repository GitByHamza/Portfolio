import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router'
import { getVisitorCountry } from '../lib/currency'
import { clickEvent, installPixel, isFunnelPath, pixelAllowed, trackPixelCustom, trackPixelEvent } from '../lib/meta-pixel'

// Loads the Meta Pixel for visitors in Pakistan and reports page views, funnel views,
// WhatsApp clicks and demo-store clicks. Renders nothing, so the server-rendered HTML is the same for everyone.
export default function MetaPixel() {
  const { pathname } = useLocation()
  const lastPath = useRef(null)

  useEffect(() => {
    if (!pixelAllowed(getVisitorCountry(), window.location.hostname)) return
    // The install itself sends the first page view; later route changes send their own.
    const installed = installPixel(window, document)
    if (installed || lastPath.current !== pathname) {
      if (!installed) trackPixelEvent(window, 'PageView')
      if (isFunnelPath(pathname)) trackPixelEvent(window, 'ViewContent', { content_name: 'Tech Retail OS funnel' })
    }
    lastPath.current = pathname
  }, [pathname])

  useEffect(() => {
    const onClick = (event) => {
      const link = event.target instanceof Element ? event.target.closest('a[href]') : null
      const report = link ? clickEvent(link.href, link.dataset) : null
      if (!report) return
      if (report.custom) trackPixelCustom(window, report.event, report.params)
      else trackPixelEvent(window, report.event, report.params)
    }
    document.addEventListener('click', onClick, true)
    return () => document.removeEventListener('click', onClick, true)
  }, [])

  return null
}
