# TeXCodes portfolio

React 19, React Router Framework Mode, Vite and Tailwind CSS. Public pages ship complete HTML, then hydrate for fast client navigation. The production build pre-renders 64 English and Roman Urdu pages; unknown URLs and aliases are handled by the SSR runtime.

## Local development

Use Node.js 22.18 or newer (Netlify is configured for Node 22).

```sh
npm ci
npm run dev
```

For a production preview:

```sh
npm run build
npm run preview
```

The preview defaults to port 3000; set PORT to change it. It runs the actual SSR build rather than a Vite SPA fallback.

## Checks

```sh
npm run verify
```

This runs lint, TypeScript checks, a fresh production build, unit/content checks, generated-HTML checks and production request-handler checks. Artifact-dependent tests skip if no build exists; use verify for release validation.

## Rendering and navigation

- src/root.jsx owns the document and src/entry.client.jsx hydrates it. src/entry.server.tsx returns complete server-rendered content.
- src/routes.ts defines route modules. Each page has its own browser bundle. Shared chrome stays mounted during client navigation.
- The small route manifest loads once initially, avoiding discovery requests during navigation; page code remains split by route.
- Navigation links prefetch likely destinations; other internal links prefetch when visible, including on mobile. There is no page curtain or artificial route delay.
- Page content is visible before scripts load. FAQs and add-ons use native details elements; plan scopes have ordinary links and dedicated pages.
- Browser-only smooth scrolling loads after the content. Reduced-motion users keep native scrolling.
- Canonical English URLs retain their existing paths. Roman Urdu lives at /ur and /ur/...; its language tag is ur-Latn, with left-to-right text. Legal documents remain English.
- Server HTML and the hydration snapshot use USD. The existing regional signal enhances the selected price after hydration. All eligible USD/PKR/GBP prices remain available in HTML tables. PKR is for Pakistan; GBP is offered for Console clients.
- Public HTML is shared and cacheable. Private admin responses are no-store. Do not add cookie-dependent content to cached HTML without changing the caching strategy.

## Updating public content

- src/data/business.js: business identity and contact links.
- src/data/projects.js: all case studies, statuses, screenshots and featured project data.
- src/content/pricing.ts: numeric regional plan prices, compare-at prices, care prices and common commercial facts.
- src/content/offers/: original English/Roman Urdu offer copy, complete scopes and add-ons. Plan amounts are applied from the shared numeric catalog.
- src/content/faq.ts: all FAQ questions and answers.
- src/locales/: portfolio interface and editorial copy.
- src/lib/site.ts: public route inventory and reviewed content date. Update the date when the public facts are reviewed; sitemap output does not invent update dates.

Change source content, run verify, then use the normal deployment workflow. There is no second hand-written AI description to maintain. Preserve the distinction between professional work, live products, demonstrations and projects in development.

## Sharing the offer with an assistant

After deployment, share https://texcodes.com/context. It covers the business, services, three offers, all plan prices, scope links, delivery/payment/ownership limits, recurring costs, all 12 projects and contact details.

- /context.md: the same briefing as Markdown; attach it to a chat that cannot browse.
- /llms.txt: a short directory of public content.
- /llms-full.txt: full plan modules, exclusions, add-ons, FAQs, case studies and published terms/policies.
- /sitemap.xml and /robots.txt: normal crawl discovery.

These exports are generated in the same build as the pages. LLM access is improved; discovery, provider support and memory between chats are not guaranteed. The public exports never query the contact-message database.

## Hosting

Vercel configuration is in vercel.json. It selects React Router Framework Mode and runs npm run build:vercel, which enables the Vercel preset and produces the SSR server bundle alongside build/client. The former /index.html SPA fallback has been removed. Vercel builds use only the Vercel adapter; local and Netlify builds use the Netlify adapter.

Shared routes import from react-router. The retired react-router-dom compatibility package can pull browser-only exports into the server function and trigger a missing-module failure after dependency tracing. The release tests trace and run an isolated server package in both Node module modes, checking public HTML, navigation data, resources and 404s without access to the development installation.

Netlify configuration is in netlify.toml. The React Router adapter creates the SSR function and the static publish directory is build/client. Deploy the complete framework build, not the former dist directory. The geo edge function only supplies an optional country signal; the initial HTML does not vary by country cookie.

The catch-all SPA rewrite has been removed. Redirect aliases are preserved; unknown pages and invalid project/plan IDs return actual HTTP 404 responses. Flat HTML mirrors support slashless static URLs, and Netlify's Pretty URLs post-processing is disabled so it cannot rewrite framework links after rendering. Keep the production hostname consistent with BUSINESS.url when configuring a domain.

No deploy or Git push is performed by the application build. Validate the provider preview and production responses when releasing; local checks cannot verify CDN/domain configuration or real-user network conditions.

## Contact and admin access

The existing public Supabase settings remain VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY. Contact submissions load the SDK only on form interaction. If delivery fails, the UI offers direct WhatsApp/email instead of claiming confirmed receipt. Do not put a service-role key in a VITE variable.

The old VITE_ADMIN_PASSWORD and sessionStorage gate are retired. /admin uses Supabase Auth email/password and requires a trusted app_metadata.portfolio_admin boolean claim. This claim must be set through a trusted Supabase admin operation, never editable user metadata.

Before deploying the authenticated dashboard:

1. Review current database policies and apply supabase/migrations/20261105_private_messages.up.sql through the normal migration workflow. It removes the original public read/delete policies and restricts those actions to the trusted admin claim; public contact inserts remain supported.
2. Create or identify the authorized Supabase Auth account and assign its portfolio_admin claim through a trusted admin operation. Refresh its session after changing claims.
3. Verify anonymous users and non-admin authenticated users cannot read or delete messages, and the authorized admin can read them.

On November 5, the project owner reported applying the migration and configuring the admin account, and confirmed successful dashboard access with existing messages. Anonymous/non-admin denial has not been independently verified. For another database, follow the steps above. The migration only removes the broad policies named in the original repository schema; inspect any additional live policies separately. The down migration deliberately restores the former public read/delete behavior, so use it only when that rollback is intended.

For a fresh database, supabase_schema.sql uses the secure admin policies by default. Admin HTML, messages and credentials are excluded from public pre-rendering, sitemaps and text exports.
