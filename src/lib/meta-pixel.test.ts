import test from 'node:test'
import assert from 'node:assert/strict'
import { META_PIXEL_ID, installPixel, isWhatsAppLink, pixelAllowed, trackPixelEvent } from './meta-pixel.ts'

type Call = unknown[]
function fakeBrowser() {
  const inserted: { src: string; async: boolean }[] = []
  const first = { parentNode: { insertBefore: (node: { src: string; async: boolean }) => inserted.push(node) } }
  const doc = { createElement: () => ({ src: '', async: false }), getElementsByTagName: () => [first] }
  const win: { fbq?: ((...args: unknown[]) => void) & { queue?: Call[] }; _fbq?: unknown } = {}
  return { win, doc, inserted }
}

test('the pixel loads only for visitors in Pakistan', () => {
  assert.equal(pixelAllowed('PK'), true)
  for (const country of ['GB', 'US', 'DE', '', null]) assert.equal(pixelAllowed(country), false)
})

test('installing the pixel adds the Meta script once and queues init and the first page view', () => {
  const { win, doc, inserted } = fakeBrowser()
  assert.equal(installPixel(win, doc), true)
  assert.equal(inserted.length, 1)
  assert.equal(inserted[0].src, 'https://connect.facebook.net/en_US/fbevents.js')
  assert.equal(inserted[0].async, true)
  assert.deepEqual(win.fbq?.queue?.map((call) => Array.from(call)), [['init', META_PIXEL_ID], ['track', 'PageView']])
  assert.equal(installPixel(win, doc), false, 'a second install must not add another script')
  assert.equal(inserted.length, 1)
})

test('events are sent only when the pixel is present', () => {
  const { win, doc } = fakeBrowser()
  assert.equal(trackPixelEvent(win, 'Lead'), false)
  installPixel(win, doc)
  assert.equal(trackPixelEvent(win, 'Contact', { method: 'whatsapp' }), true)
  assert.deepEqual(Array.from(win.fbq?.queue?.at(-1) ?? []), ['track', 'Contact', { method: 'whatsapp' }])
})

test('a broken pixel never throws into the page', () => {
  const win = { fbq: () => { throw new Error('blocked') } }
  assert.equal(trackPixelEvent(win, 'Lead'), false)
})

test('WhatsApp links are recognised and other links are not', () => {
  for (const href of ['https://wa.me/923091824000', 'https://wa.me/923091824000?text=Hi', 'https://api.whatsapp.com/send?phone=923091824000', 'whatsapp://send?phone=923091824000']) assert.equal(isWhatsAppLink(href), true, href)
  for (const href of ['https://texcodes.com/offers', '/contact', 'mailto:admin@texcodes.com', 'https://wa.me.example.com/x', 'https://example.com/?next=https://wa.me/1', '', 'not a url']) assert.equal(isWhatsAppLink(href), false, href)
})
