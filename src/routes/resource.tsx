import type { LoaderFunctionArgs } from 'react-router'
import { publicResource } from '../lib/public-resources.server.tsx'

export function loader({ request }: LoaderFunctionArgs) {
  const result = publicResource(new URL(request.url).pathname)
  if (!result) throw new Response('Not found', { status: 404 })
  return new Response(result.body, { headers: { 'Content-Type': result.type, 'Cache-Control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400', 'X-Content-Type-Options': 'nosniff' } })
}
