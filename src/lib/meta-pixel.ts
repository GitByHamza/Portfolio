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

// Local copies of the site (dev server, preview build, phone on the same Wi-Fi) must not send test events to Meta.
const LOCAL_HOST = /^(?:localhost|127\.\d+\.\d+\.\d+|\[::1\]|0\.0\.0\.0|.+\.localhost|.+\.test|10\.\d+\.\d+\.\d+|192\.168\.\d+\.\d+|172\.(?:1[6-9]|2\d|3[01])\.\d+\.\d+)$/i

export function pixelAllowed(country: string | null | undefined, hostname?: string): boolean {
  if (hostname !== undefined && LOCAL_HOST.test(hostname)) return false
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

/** Sends a custom event (for actions with no standard Meta event, such as opening a demo store). Never throws. */
export function trackPixelCustom(win: PixelWindow, event: 'LiveDemoClick', params?: Record<string, string>): boolean {
  if (typeof win.fbq !== 'function') return false
  try {
    if (params) win.fbq('trackCustom', event, params)
    else win.fbq('trackCustom', event)
    return true
  } catch {
    return false
  }
}

/** The ad funnel and its per-shop pages, in both languages. Their page view also counts as ViewContent. */
const FUNNEL_PATH = /^(?:\/ur)?\/tech-retail\/offer(?:\/(pc|laptop|console))?\/?$/
export function isFunnelPath(pathname: string): boolean {
  return FUNNEL_PATH.test(pathname)
}

/** The ViewContent label for a funnel page, naming the shop type when the page has one. */
export function funnelViewName(pathname: string): string {
  const shop = pathname.match(FUNNEL_PATH)?.[1]
  return shop ? `Tech Retail OS funnel: ${shop}` : 'Tech Retail OS funnel'
}

type LinkData = { funnelCta?: string; funnelPlan?: string; funnelPartner?: string; funnelSticky?: string; funnelForm?: string; funnelDemo?: string; funnelStore?: string }
export type ClickEvent = { custom: false; event: 'Contact'; params: Record<string, string> } | { custom: true; event: 'LiveDemoClick'; params: Record<string, string> }

/** What a link click should report: WhatsApp clicks as Contact (labelled by their place on the funnel), demo store links as LiveDemoClick. */
export function clickEvent(href: string, data: LinkData): ClickEvent | null {
  const demoShop = data.funnelDemo || data.funnelStore
  if (demoShop) return { custom: true, event: 'LiveDemoClick', params: { shop: demoShop } }
  if (!isWhatsAppLink(href)) return null
  const place = data.funnelCta || (data.funnelPlan && `plan: ${data.funnelPlan}`) || (data.funnelPartner && 'founding partner') || (data.funnelSticky && 'sticky') || (data.funnelForm && 'form')
  return { custom: false, event: 'Contact', params: place ? { method: 'whatsapp', content_name: place } : { method: 'whatsapp' } }
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
