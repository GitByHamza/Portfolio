import { redirect } from 'react-router'
import type { LoaderFunctionArgs } from 'react-router'
import { resolvePublicPath } from '../lib/site.ts'
import { structuredData } from '../lib/public-content.ts'

export function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url)
  const result = resolvePublicPath(url.pathname)
  if (result.kind === 'redirect') throw redirect(`${result.to}${url.search}`, 301)
  if (result.kind === 'missing') throw new Response('Page not found', { status: 404 })
  return { page: result.page, schema: structuredData(result.page) }
}
