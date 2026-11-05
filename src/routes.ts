import { layout, route } from '@react-router/dev/routes'
import type { RouteConfig, RouteConfigEntry } from '@react-router/dev/routes'

function publicRoutes(prefix: string): RouteConfigEntry[] {
  const id = prefix ? 'ur-' : 'en-'
  return [
    route(prefix || '/', 'routes/home.tsx', { id: `${id}home` }),
    ...[
      ['work', 'work'], ['project/:id', 'project'], ['about', 'about'], ['contact', 'contact'],
      ['solutions', 'solutions'], ['solutions/tech-retail', 'tech'], ['solutions/laptop-retail', 'laptop'],
      ['solutions/console-retail', 'console'], ['solutions/:offer/plans/:plan', 'plan'], ['solutions/terms', 'terms'],
    ].map(([path, file]) => route(`${prefix}/${path}`, `routes/${file}.tsx`, { id: `${id}${file}` })),
  ]
}

export default [
  route('admin', 'routes/admin.tsx'),
  route('tech-retail/offer', 'routes/tech-offer.tsx', { id: 'en-tech-offer' }),
  route('ur/tech-retail/offer', 'routes/tech-offer.tsx', { id: 'ur-tech-offer' }),
  ...['context.md', 'llms.txt', 'llms-full.txt', 'robots.txt', 'sitemap.xml'].map((path) => route(path, 'routes/resource.tsx', { id: path })),
  layout('routes/layout.tsx', [
    ...publicRoutes(''), ...publicRoutes('/ur'),
    route('context', 'routes/context.tsx'),
    route('privacy-policy', 'routes/privacy.tsx'),
    route('terms-of-service', 'routes/legal-terms.tsx'),
    route('data-deletion', 'routes/data-deletion.tsx'),
    route('*', 'routes/fallback.tsx'),
  ]),
] satisfies RouteConfig
