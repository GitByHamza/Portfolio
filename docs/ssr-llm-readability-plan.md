# Portfolio SSR and LLM readability plan

Prepared November 5, 2026. This records the approved analysis and migration plan. The implementation and its validation are documented in README.md and docs/ssr-validation.md; the inventory below describes the project before migration.

The intended result is that a browsing assistant can fetch a public URL and understand who TeXCodes is, what Hamza builds, the three retail offers, their prices and limits, relevant project evidence, and how to make contact. A single shareable context URL should cover the essentials without requiring the assistant to explore every visual page.

SSR helps deliver that information, but cannot make every LLM discover the site, browse the web, retain its contents across chats, or use a particular source. The practical workflow will be to share the context URL, or attach its generated text export when an assistant cannot browse.

## 1. What the project currently does

| Area | Repository evidence | Implication |
| --- | --- | --- |
| Application | React 19.1.1, Vite 7.1.1, React Router 7.8.0 in the lockfile | This is an existing React application with a direct migration path to React Router Framework Mode. |
| Initial rendering | `index.html` contains an empty root; `src/main.jsx` calls `createRoot`; `src/App.jsx` uses `BrowserRouter` | Public page copy normally arrives through browser JavaScript. |
| Existing HTML generation | `src/entry-legal.jsx`, `scripts/prerender-legal.js`, `src/lib/prerender.js` | Privacy, terms of service, and data deletion already receive build-time HTML. This is pre-rendering, rather than request-time SSR. |
| Public content | `src/data/business.js`, 12 entries in `src/data/projects.js`, English/Roman Urdu dictionaries, and offer components | Most portfolio content is local and can be rendered at build time without a database request. |
| Detailed offers | `TechRetailSolution.jsx`, `LaptopRetailSolution.jsx`, `ConsoleRetailSolution.jsx`, `PlanDetailModal.jsx` | Plan modules and exclusions depend on opening a modal; rendering the default page on a server would still omit them. |
| FAQs and extras | `OfferFAQ.jsx` renders only the open answer; offer add-on descriptions also depend on expansion state | SSR must be accompanied by content changes so these details exist without clicks. |
| Regional behavior | `LanguageContext.jsx`, `src/lib/currency.js`, `netlify/edge-functions/geo.js` | The server and browser can initially choose different text or prices, causing hydration mismatches. |
| Motion | `MotionReveal.jsx` starts sections at opacity zero; `PageCurtain.jsx` starts with a full-screen overlay | Server-generated text could remain visually hidden when JavaScript is unavailable. |
| Routing | Client redirects, duplicate project paths, and `public/_redirects` with a catch-all SPA rewrite | Redirects and missing pages need real HTTP behavior. |
| Metadata | Shared title, description, and Organization JSON-LD in `index.html`; legal-page metadata injection | Most routes need distinct server-rendered metadata and canonical URLs. |
| Discovery | No source `robots.txt`, sitemap, `llms.txt`, or public content export found | Discovery and direct context sharing need explicit support. |
| Deployment | Netlify redirect and edge-function files; README recommends Vercel and contains unresolved conflict markers | Netlify is the planning assumption, not a verified production configuration. |

The existing `dist/index.html` also has an empty root, while the existing privacy HTML includes its content. These artifacts are dated October 24, 2026; they are supporting evidence, not a fresh production build.

Baseline checks: `npm test` passes all 34 tests. Its coverage report covers the currently tested data, localization, and utility modules, not the entire UI. Some legal checks inspect the existing build artifacts. `npm run lint` fails with 50 existing errors, including unused variables, empty catches, refresh-rule issues, a conditional hook in `SkillsSection.jsx`, and `__dirname` in the Vite configuration. No new build was run for this planning task. Live-domain retrieval was unavailable through the research tool, so production HTML, headers, and database policy state remain unverified.

## 2. Recommended architecture

Adopt **React Router Framework Mode with SSR enabled**, retaining React, Vite, Tailwind, existing styling, and reusable page components. Pre-render the known public content routes during the build; use the SSR runtime for routes that need request handling, redirects, errors, or future live data. This gives public pages complete HTML while avoiding unnecessary computation for unchanged portfolio content. React Router supports this combination. [Rendering strategies](https://reactrouter.com/7.18.5/start/framework/rendering)

Keep runtime and development packages on a mutually compatible, supported React Router release. The repository currently uses version 7.8.0; use the versioned v7 migration documentation as the initial compatibility reference and verify adapter/Node/Vite requirements before installing packages. A router major-version upgrade should be a separate deliberate choice.

| Approach | Fit for this project | Decision |
| --- | --- | --- |
| Extend the hand-written legal pre-renderer to the whole site | Can supply HTML, but routing, hydration, metadata, status codes, and deployment behavior remain custom responsibilities | Useful as a fallback if static-only hosting becomes a hard constraint. |
| React Router Framework Mode, SSR plus public pre-rendering | Reuses the current stack and existing router concepts | Recommended. |
| Next.js App Router | Viable, but requires a larger routing, bundling, and component-boundary migration | Reconsider if broader product requirements justify a framework change. It is not required for this goal. |

Public content should have one authoritative data model, producing the visible pages, structured data, context page, and text exports. Presentation and interactions consume that model. A second hand-maintained AI description would eventually drift from the offer pages.

## 3. Route and rendering contract

| Routes | Target behavior |
| --- | --- |
| `/`, `/about`, `/work`, `/solutions`, `/contact` | Pre-rendered HTML with full public copy and working ordinary links. Contact details remain available without JavaScript. |
| `/project/:id` | Pre-render all 12 existing case studies from their data entries. Retain this as the canonical pattern because current internal links already use it. |
| `/work/:id` | Permanent HTTP redirect to `/project/:id` for valid IDs. |
| `/solutions/tech-retail`, `/solutions/laptop-retail`, `/solutions/console-retail` | Pre-render offer explanations, all plans, regional pricing tables, add-ons, FAQs, and links to full scopes. |
| `/solutions/:offer/plans/:plan` | Nine new pre-rendered scope pages: three offers multiplied by `single-store`, `multi-branch`, and `chain-wholesale`. Include modules, exclusions, prices, delivery conditions, payment milestones, and terms links. |
| `/solutions/terms` | Canonical shared retail terms page, including clearly identified regional prices and offer-specific conditions. Preserve existing `?offer=console` links and their meaning. |
| `/solutions/tech-retail/terms` | Permanent redirect to shared retail terms, preserving applicable query parameters. |
| `/privacy-policy`, `/terms-of-service`, `/data-deletion` | Pre-render through the unified pipeline, retaining current content and legal URLs. |
| Existing `/offer/*`, `/terms`, and `/privacy` aliases | Permanent server/CDN redirects to their existing destinations. |
| `/context` | New public, pre-rendered business briefing intended to be shared with an assistant or prospect. |
| `/context.md`, `/llms.txt`, `/llms-full.txt` | Generated public text resources with appropriate content types; never an SPA HTML response. |
| `/ur/...` | Stable Roman Urdu equivalents for currently translated portfolio and offer content. English legal pages remain clearly labelled English. |
| `/admin` | Authenticated private route; no messages in public HTML, public loaders, pre-render lists, or exports. Login may have a safe server-rendered shell. |
| Unknown paths, nonexistent IDs, or invalid plan slugs | A real HTTP 404 with a useful page. Validate IDs strictly rather than accepting partial numeric matches. |

There are 24 existing canonical English content pages after collapsing aliases, counting the 12 case studies separately. The nine scope pages and `/context` bring the proposed English HTML inventory to 34. Generate the inventory from route/content data so future projects are included automatically.

## 4. Implementation sequence

### Phase 1 — Establish the content and URL contract

1. Record all public routes, aliases, project IDs, offer/plan identifiers, and existing query parameters in a shared manifest.
2. Confirm the production host, final canonical hostname, build command, publish directory, and SSR runtime support. The domain fetch attempted during research redirected toward `www`; verify actual response headers before choosing a site-wide origin.
3. Capture representative desktop/mobile screens and interaction behavior to protect the current design during migration.
4. Record the current lint baseline and resolve errors that block the new pipeline. Require changed/new files to pass lint; separate broader cleanup when necessary.
5. Identify the authoritative wording for ownership, shared engine licensing, guarantees, support, recurring costs, and delivery conditions. In particular, reconcile blanket “100% IP ownership” messaging with the FAQ's shared-core-engine explanation before publishing a unified briefing. Do not invent new commercial commitments.

Deliverable: a route manifest, agreed content fields, deployment assumptions, and baseline checks.

### Phase 2 — Extract authoritative public content

1. Retain `business.js` and `projects.js` as existing sources where practical. Extract offer definitions, plan modules, exclusions, add-ons, care plans, FAQs, regional prices, and terms facts from the large page components into shared content modules.
2. Store prices as numeric amounts with ISO currency codes, regional applicability, billing period, and a fixed/starting-at/quoted distinction. Preserve the current advertised prices and compare-at values during extraction.
3. Keep copy translations separate from commercial amounts. Remove price values duplicated between `/solutions`, offer dictionaries, and modal definitions.
4. Make featured projects reference project IDs, with explicit editorial overrides only where necessary, rather than maintaining independent copies of the same facts.
5. Give every item a stable identifier and a reviewed update date. Preserve the distinction between live products, demonstrations, professional work, and projects in development.
6. Use typed new content/generation logic and validate required fields, URL references, supported currencies, unique IDs, and translation completeness.

Deliverable: one public model that drives every representation of an offer or project.

### Phase 3 — Introduce the SSR framework shell

1. Add the React Router framework Vite integration, compatible runtime packages, route configuration, and a root document. Keep the current source directory and CSS system.
2. Move document ownership from `index.html` to the framework root, preserving fonts, favicon, verification metadata, theme bootstrap, and global styles.
3. Replace the manually mounted `BrowserRouter`/`createRoot` entry with the framework's server rendering and hydration entries. Reuse existing pages through route modules, then migrate route-specific metadata and loaders.
4. Put public content retrieval in deterministic route loaders or shared static imports. Do not fetch contact messages as part of a root/public loader.
5. Define the pre-render list from the manifest, including all project IDs and plan pages. Supply the full commercial narrative in the HTML rather than deferring it behind Suspense fallbacks or client fetches.
6. Implement real redirects, route errors, and strict not-found behavior. Replace conflicting scroll-restoration logic while retaining the existing smooth-scroll enhancement.
7. Retire the separate legal-only entry and injection script after equivalent legal HTML and tests pass through the new pipeline.

The official adoption guide covers moving an application that currently uses `<Routes>` into Framework Mode. [Migration guide](https://reactrouter.com/7.18.5/upgrading/component-routes)

Deliverable: complete HTML on direct requests, followed by working browser hydration and navigation.

### Phase 4 — Make every public detail available without interaction

1. Keep all FAQ answers in HTML. Prefer native `<details>`/`<summary>` so expansion also works without JavaScript.
2. Keep add-on descriptions in HTML using the same approach. Do not conditionally remove their text based on open state.
3. Give each plan an ordinary anchor to its full scope page. Existing modals may remain as an enhancement, with the same content model driving both views.
4. Render the meaningful page content visibly by default. Apply entrance animations only when enhancement is active; ensure the page curtain is absent or harmless before hydration and when scripts fail.
5. Isolate Lenis, portals, browser storage, and any active canvas/WebGL effects behind safe browser initialization. `useDarkMode` currently reads `document` during state initialization; it needs a server-safe initial value if used by an SSR route. The current homepage does not mount `HeroScene3D`, so do not assume every installed visual dependency needs migration work.
6. Keep project galleries accompanied by descriptive text and captions; do not rely on screenshots to explain capabilities.

Deliverable: public pages remain readable, navigable, and commercially complete with JavaScript disabled.

### Phase 5 — Stabilize language, currency, and hydration

1. Make English the stable default for current URLs. Determine language from an explicit URL prefix for translated routes, with `lang="ur-Latn"` and left-to-right direction for Roman Urdu.
2. Make language controls ordinary links. Browser preferences can suggest a language after hydration; they must not produce different initial server/client trees or silently replace the canonical response.
3. Use a deterministic initial price display, backed by HTML tables listing every applicable regional price. Label Pakistan-only PKR and Console-only GBP availability explicitly; do not imply automatic exchange-rate conversions.
4. Reuse the existing country signal as an optional browser enhancement after hydration. Do not let a visitor cookie change shared pre-rendered HTML or generated content exports.
5. If request-time personalized HTML becomes a requirement later, move preference selection into the server loader, serialize the result, and define cache separation before enabling it. That is a different caching policy from shared pre-rendering.
6. Apply the same initial-state rule to theme controls and any dates. Do not hide widespread mismatches with `suppressHydrationWarning`.

React requires the first client render to match the server output. [Hydration requirements](https://react.dev/reference/react-dom/client/hydrateRoot)

Deliverable: consistent HTML and hydration across saved preferences, countries, and language settings.

### Phase 6 — Publish a reusable business briefing

Build `/context` as a concise, readable page containing:

- TeXCodes and Muhammad Ameer Hamza's identity, base/timezone, remote working scope, and verified contact/booking links.
- Custom engineering capabilities: SaaS and modernization, business systems, commerce, and AI automation, supported by existing portfolio content.
- The three retail offers, intended buyers, distinctive features, and all three plan tiers.
- Regional plan prices, what “from” means, optional recurring costs, third-party fees, and links to complete scopes.
- Delivery prerequisites, payment milestones, ownership/licensing boundaries, warranty, guarantee conditions, and exclusions.
- A compact index of all 12 projects with descriptions, status, relevant evidence, and detail links.
- A reviewed content date and authoritative terms links.

Generate `/context.md` from the same model for direct retrieval or attachment. Add `/llms.txt` as a short directory linking to the briefing, offers, and case studies. Add `/llms-full.txt` as the comprehensive English public-content export, including all plan scopes, add-ons, FAQ answers, terms, and case studies. Link translated public pages separately. If the full export becomes too large, retain the concise briefing and split detailed exports by offer/project rather than silently truncating them.

Use absolute canonical URLs, deterministic ordering, UTF-8, and correct content types. Add visible links to the briefing and text exports. Per-page Markdown alternatives can be added from the same generator where they improve retrieval.

`llms.txt` is a voluntary proposal, not a guarantee that any provider will discover or consume it. It supplements normal public HTML. [Proposal](https://llmstxt.org/)

Deliverable: a shareable URL that carries the core offer, plus a complete text export that can be attached to a chat.

### Phase 7 — Add metadata and crawl discovery

1. Generate unique titles, descriptions, canonical links, language alternates, and social metadata for public pages.
2. Generate Organization/Person/WebSite data and appropriate Service/Offer and project markup from the same public model. Ensure amounts, currencies, scope, and visible copy agree. Structured data must not be the only place where essential facts appear.
3. Generate `sitemap.xml` containing canonical public HTML URLs, including every case study and scope page. Use actual content update dates rather than refreshing every date on each build.
4. Serve `robots.txt` and link the sitemap. Review production CDN/bot rules for intended public retrieval access. Keep crawler access and model-training preferences as separate policy decisions.
5. Keep admin routes out of discovery and mark private/login responses appropriately. A robots rule or `noindex` is not access control.
6. Verify one-step canonical redirects, consistent hostname/trailing-slash policy, and real status codes. The current blanket SPA rewrite must not swallow resource files, redirects, SSR routes, or 404s.

Google's guidance supports server/pre-rendered content for crawlers that do not run JavaScript and explains the importance of HTTP status codes and canonical metadata. [JavaScript crawling guidance](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics)

Deliverable: discoverable canonical pages and correctly served machine-readable resources.

### Phase 8 — Validate and roll out

1. Configure the deployment adapter and build output for the confirmed hosting provider. For Netlify, use its supported React Router integration; do not deploy only the old `dist` folder and assume SSR exists. [Netlify integration](https://docs.netlify.com/build/frameworks/framework-setup-guides/react-router/)
2. Review the interaction between the existing geo edge function, static responses, SSR handler, caching, and redirects. Avoid adding an unnecessary second request-processing layer.
3. Generate HTML and all text/structured-data exports in one build, failing on missing required content. Source-controlled edits become public through a successful rebuild/deploy; no new CMS is required.
4. Validate a preview deployment with raw HTTP checks and browser checks. Preserve the current production deployment as a rollback target.
5. Release after the acceptance checks pass, then repeat direct URL/status/content checks on the production hostname and inspect runtime errors. Regenerate the sitemap and publish through the normal deployment workflow.

Deliverable: a verified preview, a reversible production release, and a documented content-update workflow.

## 5. Public/private boundary to address during migration

“All data” in the new public outputs means all intended public portfolio content. It must not include contact submissions, admin state, credentials, or private operational data.

The repository currently places an admin password comparison in browser code using a `VITE_` variable and trusts `sessionStorage` for the UI gate. The checked-in SQL also defines public message read and delete policies. Those are concrete code/schema concerns; the live database policies were not inspected. Before treating messages as private in the migrated deployment, verify actual policies, replace the UI gate with real authenticated authorization, and use version-controlled reversible policy migrations where needed. Keep message responses out of caches and exports. Do not copy the current password into a new public configuration variable.

This work protects the public-content boundary; it does not require changing the advertised offer or introducing unrelated product features.

## 6. Completion checks

- A plain HTTP GET for every public canonical route contains its expected title and meaningful text after scripts are removed. Checking for text somewhere in a JS bundle or serialized payload does not count.
- All 12 case studies are directly retrievable. All nine plan scopes include modules, exclusions, prices, delivery qualifiers, and terms links.
- All FAQ answers and add-on descriptions exist in page HTML. Native expansion and ordinary links work without JavaScript.
- With JavaScript disabled, content is visible and the curtain does not obscure the page. Navigation, language links, contact links, and full-scope links remain usable.
- Hydration produces no recoverable mismatch errors for English/Roman Urdu, light/dark preferences, and regional settings. Client controls still work after hydration and client navigation.
- Unknown pages, IDs, and plan slugs return HTTP 404. Aliases return permanent HTTP redirects. Text/XML resources return their own content types and never the application shell.
- `/context`, `/context.md`, `/llms.txt`, `/llms-full.txt`, visible prices, and structured data agree. A single source edit updates every applicable output in the next build.
- Sitemap entries resolve to canonical public pages. Private data is absent from generated files and unauthenticated responses; actual authorization is tested separately from `noindex`.
- Existing tests remain green. Add meaningful content-completeness, route/status, hydration, and export-parity checks; meet the workspace coverage target for new business logic. Run a fresh production build before artifact tests.
- Review representative desktop/mobile layouts, forms, galleries, modals, motion, theme controls, and links against the baseline. Contact delivery remains functional; external email/WhatsApp links provide a fallback.
- In a fresh browsing-enabled assistant session, provide only `/context` and ask it to explain the business, compare the three offers, identify plan limitations and recurring costs, and cite relevant portfolio evidence. Check its answer against the content model. Repeat with the downloadable export for a session without browsing. This validates the sharing workflow, not universal model behavior.

## 7. Proposed file-level work

| Files | Planned responsibility |
| --- | --- |
| `package.json`, lockfile, `vite.config.js`, new `react-router.config.ts` | Framework build/dev integration, compatible versions, SSR, and generated pre-render list. |
| New `src/root.jsx`, framework entry files, `src/routes.ts`, route modules | Document shell, hydration, route metadata/loaders, HTTP behavior, and error handling. |
| Existing `src/App.jsx`, `src/main.jsx`, `index.html` | Retire or reduce after framework ownership replaces the SPA bootstrap. |
| `src/data/business.js`, `src/data/projects.js`, new typed offer/content modules | Authoritative public facts, plan definitions, FAQs, and pricing. Preserve existing imports through adapters when useful. |
| Existing page components, `ProjectsSection.jsx`, `OfferFAQ.jsx`, `PlanDetailModal.jsx` | Consume shared content; expose complete scopes and native FAQ behavior. |
| `LanguageContext.jsx`, `currency.js`, theme/motion components | Deterministic initial rendering and safe browser enhancement. |
| New context/scope routes and public-content generator | Shareable briefing, nine scope pages, text exports, sitemap, and structured data. |
| `public/_redirects`, hosting configuration, `netlify/edge-functions/geo.js` | Canonical redirects and compatibility with SSR and generated resources. |
| `AdminDashboard.jsx`, auth/server modules, versioned Supabase migrations as required | Verified public/private boundary and real authorization. |
| Existing legal entry/script/tests and new integration checks | Consolidated HTML generation and regression coverage. |
| `README.md` | Accurate rendering/deployment instructions, conflict-marker cleanup, content editing, and the context-sharing workflow. |

Recommended dependency order: content contract → shared data → SSR shell → complete public scopes → deterministic preferences → context exports/discovery → deployment validation. Extract the common data before generating new summaries so pricing and scope cannot diverge.
