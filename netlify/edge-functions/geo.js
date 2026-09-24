// Netlify Edge Function: saves the visitor's country (from their IP, via Netlify's
// built-in geolocation) in a `tx_country` cookie. The site reads it to choose the
// default currency — see src/lib/currency.js.
export default async (request, context) => {
  const response = await context.next()

  const country = String(context.geo?.country?.code || '').toUpperCase()
  if (!/^[A-Z]{2}$/.test(country)) return response

  const current = (request.headers.get('cookie') || '').match(/(?:^|;\s*)tx_country=([A-Z]{2})/)?.[1]
  if (current === country) return response

  // Not HttpOnly: the browser code needs to read it.
  response.headers.append('Set-Cookie', `tx_country=${country}; Path=/; Max-Age=86400; SameSite=Lax; Secure`)
  return response
}

// Run on page requests only, not on static assets.
export const config = {
  path: '/*',
  excludedPath: [
    '/assets/*',
    '/*.css', '/*.js', '/*.json', '/*.map',
    '/*.png', '/*.jpg', '/*.jpeg', '/*.webp', '/*.gif', '/*.svg', '/*.ico',
    '/*.glb', '/*.pdf', '/*.txt', '/*.xml', '/*.woff', '/*.woff2',
  ],
}
