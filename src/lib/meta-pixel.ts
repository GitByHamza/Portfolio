// Meta Pixel for the Pakistan ad campaigns.
//
// The pixel ID is a public identifier (it is visible in any page that loads the pixel), not a secret.
// The pixel is loaded only for visitors in Pakistan, where the ads run. Visitors elsewhere, including
// the UK and EU where consent would be needed first, never load Meta's script.

export const META_PIXEL_ID = '40406155468997777'
export const PIXEL_COUNTRIES = ['PK']
const SCRIPT_URL = 'https://connect.facebook.net/en_US/fbevents.js'

type Fbq = ((...args: unknown[]) => void) & { callMethod?: (...args: unknown[]) => void; queue?: unknown[]; push?: unknown; loaded?: boolean; version?: string }
type PixelWindow = { fbq?: Fbq; _fbq?: unknown }
type ScriptNode = { src: string; async: boolean }
type PixelDocument = { createElement(tag: 'script'): ScriptNode; getElementsByTagName(tag: 'script'): ArrayLike<{ parentNode: { insertBefore(node: ScriptNode, before: unknown): unknown } | null }> }

export function pixelAllowed(country: string | null | undefined): boolean {
  return !!country && PIXEL_COUNTRIES.includes(country)
}

/** Adds Meta's loader once, then queues `init` and the first page view. Returns false if it was already installed. */
export function installPixel(win: PixelWindow, doc: PixelDocument): boolean {
  if (win.fbq) return false
  const fbq: Fbq = function (...args: unknown[]) {
    if (fbq.callMethod) fbq.callMethod(...args)
    else fbq.queue!.push(args)
  }
  fbq.push = fbq; fbq.loaded = true; fbq.version = '2.0'; fbq.queue = []
  win.fbq = fbq
  if (!win._fbq) win._fbq = fbq
  const script = doc.createElement('script')
  script.async = true
  script.src = SCRIPT_URL
  const first = doc.getElementsByTagName('script')[0]
  first?.parentNode?.insertBefore(script, first)
  fbq('init', META_PIXEL_ID)
  fbq('track', 'PageView')
  return true
}

/** Sends a standard event if the pixel is present. Never throws: tracking must not break the page. */
export function trackPixelEvent(win: PixelWindow, event: 'PageView' | 'ViewContent' | 'Contact' | 'Lead', params?: Record<string, string>): boolean {
  if (typeof win.fbq !== 'function') return false
  try {
    if (params) win.fbq('track', event, params)
    else win.fbq('track', event)
    return true
  } catch {
    return false
  }
}

export function isWhatsAppLink(href: string): boolean {
  try {
    const url = new URL(href)
    if (url.protocol === 'whatsapp:') return true
    return url.protocol === 'https:' && ['wa.me', 'api.whatsapp.com', 'web.whatsapp.com'].includes(url.hostname)
  } catch {
    return false
  }
}
