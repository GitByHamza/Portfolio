// Regional currency rules for the offer pages:
//   Pakistan → PKR · United Kingdom → GBP (only where a page has GBP prices) · everyone else → USD
// The displayed currency is determined by location, not a saved visitor preference.
//
// The visitor's country comes from the `tx_country` cookie set by netlify/edge-functions/geo.js.
// Without the cookie (local dev, cookies blocked) we fall back to a timezone guess.

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

// Select the regional price from currencies supported by this offer.
export function defaultCurrency(supported) {
  const country = getVisitorCountry()
  if (country === 'PK' && supported.includes('PKR')) return 'PKR'
  if (country === 'GB' && supported.includes('GBP')) return 'GBP'
  return 'USD'
}
