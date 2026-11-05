# SSR migration validation

Validated on November 5, 2026. The original migration checks and the subsequent deployed-function regression are recorded below.

## Implemented

- React Router 7.18.5 Framework Mode with request-time SSR and 64 pre-rendered public pages: 34 English and 30 Roman Urdu.
- Nine dedicated plan scopes, the `/context` briefing, Markdown/full-text exports, sitemap, robots rules, page metadata and structured data.
- Route-specific browser bundles, a complete initial route manifest, navigation/viewport prefetching, visible initial content, native FAQs/add-ons and deferred contact SDK loading.
- Canonical redirects, strict missing-project/plan handling, shared pricing and source-driven project summaries.
- Supabase Auth admin UI and reversible database-policy migrations; the project owner reported applying the migration and confirmed dashboard access.
- Vercel Framework Mode configuration and a Vercel server-bundle build, replacing staging's SPA fallback. Netlify/local builds remain supported.

## Automated checks

`npm run verify` passes: ESLint, strict TypeScript checking, a fresh production build and all 50 tests, with no skips. `npm run build:vercel` also passes, followed by the same 50 tests against its Node server bundle, including a run with the Vercel request handler enabled.

The checks inspect every generated page, all FAQ answers and add-ons, all nine complete scopes, canonical/language metadata, public exports, initial script contents, country-cookie behavior and the production request handler. Handler checks cover all public routes, redirects, invalid URLs, resource content types and non-cacheable admin login HTML. They also assert that route discovery is configured as `initial`, avoiding discovery requests during navigation, and verify deployment configuration and server-bundle resolution.

Coverage for the source content/routing/utility modules exercised by the tests is 100% of lines and 94.71% of branches. This is not whole-interface or live-database coverage.

## Browser checks

- Homepage → work archive → category filter → case study.
- Roman Urdu URL switching, translated project content and correct document language.
- Briefing → dedicated scope through same-site client navigation and keyboard activation.
- Light/dark controls, restoring the original dark preference afterward.
- Mobile at 390 × 844 and tablet at 768 × 1024: readable content, no document-width overflow, and corrected tablet header spacing.
- An HTML snapshot with every script removed: content remained visible and native FAQ expansion worked. The snapshot was temporary and is not shipped.
- No browser console errors or warnings in the checked flows.

## Loading measurements

| Measurement | Bytes |
| --- | ---: |
| Existing pre-migration JavaScript build artifact | 1,101,824 |
| Final homepage JavaScript module preloads | 501,366 |
| Sum of locally gzip-compressed initial modules | 155,874 |
| Final homepage HTML | 93,223 |

The final initial JavaScript set is about 54% smaller than the existing build artifact. The comparison artifact was already present and dated October 24; it was not a fresh baseline build of the latest pre-migration source. Gzip size is a local calculation, not a measured network transfer. The final route manifest adds a small initial payload to eliminate route-discovery round trips; other page code remains split and prefetched.

These are local build/behavior checks. Production CDN/domain behavior and real-user Core Web Vitals have not been measured.

## Deployed-function regression

After the initial release, the homepage served its generated HTML, but requests for `/about`, `/solutions` and navigation data returned Vercel `FUNCTION_INVOCATION_FAILED` responses. The owner supplied the runtime exception: missing `react-router/dist/development/dom-export.js`.

The shared layout retained one `react-router-dom` import. That compatibility entry re-exports browser APIs and caused an unnecessary `react-router/dom` dependency in the server function. Vercel's traced package omitted its CommonJS entry. The failure was reproduced locally by copying only the files found by Vercel's dependency tracer into a separate temporary directory and running with Node's experimental require-module support disabled; the same missing-module exception occurred.

The layout now imports `Outlet` directly from `react-router`, and the compatibility dependency is removed. A regression test runs that isolated package with require-module support enabled and disabled, requesting every public document and navigation-data URL, all public resources, admin login and a missing page. Both modes pass after the fix. The temporary package cannot resolve missing files through the working tree's installed dependencies.

## Deployment requirements and limits

The included Vercel configuration selects the React Router framework and `npm run build:vercel`, which enables the Vercel preset and emits a Node server bundle plus `build/client`. The Netlify configuration publishes `build/client` with its generated SSR function and disables Pretty URLs post-processing. Flat HTML mirrors support slashless static delivery. Both targets replace the former SPA catch-all. Keep the hostname consistent with `BUSINESS.url`.

The project owner reported applying `supabase/migrations/20261105_private_messages.up.sql` and configuring the trusted admin claim, then supplied a screenshot confirming authenticated access to existing enquiries. Live policies and anonymous/non-admin denial have not been independently inspected. For another database, review its policies, apply the migration and configure `app_metadata.portfolio_admin` on the intended Auth account. Contact delivery was not tested by sending a live submission.

Compatible dependency patches were applied. The dependency audit reports ten moderate findings: seven in the development lint-tool chain and three through the Vercel adapter's static-config/Ajv dependency chain. The production-only audit reports those three moderate findings and no high/critical findings; npm offers no automatic fix for that chain. No forced or breaking audit fix was applied.

After deployment, share `/context` with a browsing assistant or attach `/context.md`. Public HTML and exports are accessible without executing application JavaScript; provider discovery and retention across chats remain outside the site's control.
