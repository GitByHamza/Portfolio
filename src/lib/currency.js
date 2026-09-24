// Default-currency rules for the offer pages:
//   Pakistan → PKR · United Kingdom → GBP (only where a page has GBP prices) · everyone else → USD
// PKR prices are only ever offered to visitors in Pakistan.
//
// The visitor's country comes from the `tx_country` cookie set by netlify/edge-functions/geo.js.
// Without the cookie (local dev, cookies blocked) we fall back to a timezone guess.

const SAVED_KEY = 'texcodes_currency'

export function getVisitorCountry() {
  if (typeof document === 'undefined') return null
  const match = document.cookie.match(/(?:^|;\s*)tx_country=([A-Z]{2})/)
  if (match) return match[1]
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone
    if (tz === 'Asia/Karachi') return 'PK'
    if (tz === 'Europe/London') return 'GB'
  } catch {
    // Intl unavailable
  }
  return null
}

// Currencies this visitor may see, out of the ones a page supports (e.g. ['USD', 'PKR']).
export function allowedCurrencies(supported) {
  const inPakistan = getVisitorCountry() === 'PK'
  return supported.filter((c) => c !== 'PKR' || inPakistan)
}

// Saved manual choice (if still allowed) → country rule → USD.
export function defaultCurrency(supported) {
  const allowed = allowedCurrencies(supported)
  try {
    const saved = localStorage.getItem(SAVED_KEY)
    if (saved && allowed.includes(saved)) return saved
  } catch {
    // storage unavailable (private mode)
  }
  const country = getVisitorCountry()
  if (country === 'PK' && allowed.includes('PKR')) return 'PKR'
  if (country === 'GB' && allowed.includes('GBP')) return 'GBP'
  return 'USD'
}
