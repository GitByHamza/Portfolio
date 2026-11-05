# Tech Retail offer funnel: implementation and validation

Recorded November 5, 2026. This is an ordinary extension of the existing TeXCodes warm-paper, ink and emerald editorial system. It preserves the existing global implementation, detailed offer pages, scope data and regional prices. This document records the surface and its evidence; it does not establish a replacement brand or global design system.

The subsequent owner-requested revision pins this campaign to international USD pricing: $4,850 for the build and $280/month for optional Growth Care, sourced from the shared catalog. Campaign HTML, expanded scope and structured offer data omit PKR alternatives; regional prices remain on the detailed catalogue pages. Shared header/footer/funnel branding, favicons and default social previews now use the supplied brown TeXCodes monogram and calligraphic wordmark. A transparent cutout was prepared from the supplied logo; the website variants preserve its mark and lettering on a light backing for visibility in both themes.

The revision passes lint, TypeScript, a fresh production build and all 54 tests without skips. New checks cover USD-only campaign data and the new logo/favicon on all 66 public routes. Browser verification confirmed USD pricing with the scope expanded, loaded logo assets, dark-theme visibility and no captured console errors. The narrow viewport check found and corrected serial-workflow grid overflow; the recheck at 260 CSS pixels had no horizontal overflow. Image provenance is embedded in PNGs, with sidecars for the WebP/ICO derivatives.

## Delivered surface

| Item | Implementation |
| --- | --- |
| English route | `/tech-retail/offer` |
| Roman Urdu route | `/ur/tech-retail/offer` |
| Entry point | The Solutions flagship action leads to the localised funnel. |
| Page shell | A centred TeXCodes / Tech Retail OS masthead, without the portfolio navbar. Both routes sit outside the portfolio layout. |
| Audience and offer | Established computer retailers with two or three locations; one Tech Retail OS / Multi-Branch offer. |
| Conversion | Four booking actions: hero, workflows, offer and final section. All use the same destination. |
| Preserved routes | Existing Solutions, detailed retail offers, plan scopes and delivery terms remain registered. |

The active destination is the owner-supplied [Calendly URL](https://calendly.com/artsbyhamza/30min). External verification in the implementation session found the visible event title **FREE SITE AUDIT** and a **20-minute** duration. The URL slug is not used as a duration promise. The public actions say “Book a personalised demo” / “Apna personalised demo book karein”, with duration-neutral supporting copy. The dormant booking fallback copy is also duration-neutral in both languages. The external event title remains an owner-managed setting.

The funnel has no competing live-store demo action or tier selector. Product evidence leads into the offer, scope, process, FAQ and the final booking action. Legal links remain in the footer.

## Source and design evidence

| Source reviewed | Responsibility |
| --- | --- |
| `PRODUCT.md` | Product constraints, audience, honest evidence and supplied booking details. |
| `.impeccable/surfaces/src-pages-techretailoffer-tsx.md` | Approved Persuade surface, centred preview-led composition and incumbent visual direction. |
| `docs/tech-retail-funnel-brief.md` | Matching campaign direction contract. |
| `src/routes.ts`, `src/routes/tech-offer.tsx` | Separate EN/UR routes and the existing localised Multi-Branch loader data. |
| `src/pages/TechRetailOffer.tsx` | Page structure, four shared booking actions, native disclosures and preview behaviour. |
| `src/styles/tech-retail-offer.css` | Local responsive layout and interaction treatment. |
| `src/content/tech-retail-funnel.ts` | EN/Roman Urdu copy, asset settings and validated Loom embed URL conversion. |
| `src/content/pricing.ts`, `src/content/offers/tech.ts` | Shared regional prices, Growth Care and detailed offer scope. |
| `.impeccable/review/finish-review.md`, `finish-verdict.md` | Independent visual review and the limited verdict on its required correction. |

The page uses existing paper, ink, muted-ink, rule and serif-font variables. Its local treatment includes wide serif headings, crisp separators, restrained image corners and emerald booking buttons. The content container is capped at 1080px; the hero preview is capped at 960px. At the 700px breakpoint, workflow and package columns stack and booking buttons fill the available width. Section spacing changes from 78px to 52px. Focus-visible outlines and a reduced-motion override are present. These are observations of this surface, not new global token rules.

FAQ and scope use native `details` / `summary` elements. Main content and headings have explicit landmarks and associations. Product images have text alternatives and intrinsic dimensions; below-fold screenshots are lazy-loaded. The preview image is prioritised.

## Commercial scope preserved

The loader selects `PLANS_DETAIL[lang].growth`; the page renders that plan's existing modules, module details and exclusions. It does not create a parallel scope catalogue. Prices continue to come from `priceCatalog.tech.growth`, with optional care from `carePlans[1]`.

| Recorded shared value | Amount or condition |
| --- | --- |
| Multi-Branch one-time build | USD 4,850 / PKR 550,000, advertised regional prices rather than currency conversion. |
| Optional Growth Care | USD 280 / PKR 28,000 per month. |
| Delivery | 21 days after content and first payment; waiting for feedback or third-party approvals is additional. |
| Payment milestones | 40 / 40 / 20: start, staging approval and launch. |
| Running costs | Hosting, domain, gateway fees and AI usage are separate; Care Plans are optional and include hosting. |
| Boundaries | Existing exclusions, acceptance terms, ownership transfer and 30-day delivered-bug support remain explained. |

This documentation pass made no changes to prices, offer modules, exclusions or the detailed offer pages.

## Media and provenance

The owner confirmed that the Loom recording is not yet recorded. `FUNNEL_ASSETS.loomUrl` therefore remains `null`. The page shows an actual product screenshot with sample/demo-data labelling. Support for a supplied recording is implemented: an accepted HTTPS Loom share/embed URL is converted to an embed URL, and the iframe is mounted only after the visitor presses the walkthrough button. Playback of a real recording has not been verified because none has been supplied.

The three shipping WebP images derive from existing repository screenshots, resized to 1200px width at quality 82 without changing product content. Each has an adjacent `.webp.json` provenance sidecar.

| Shipping asset | Existing source | File size |
| --- | --- | ---: |
| `public/tech-retail/preview.webp` | `public/txs/home.png` — demonstration storefront with sample products. | 29,294 bytes |
| `public/tech-retail/pc-builder.webp` | `public/txs/rig builder full.png` — demonstration PC builder with sample data. | 74,988 bytes |
| `public/tech-retail/stock.webp` | `public/txs/dashboard products.png` — product and stock administration with demo data. | 34,824 bytes |

The original warranty-labelled candidate showed CMS configuration rather than serial or warranty records. It was excluded from the shipping asset directory. The third workflow now uses an honest text-only **Intake → Sale → Warranty** lifecycle, captioned “Serial-record workflow included in this scope”, with matching Roman Urdu copy. It explains supplied scope and does not claim to be captured warranty UI. `warranty.webp` is absent from the shipping asset directory.

## Validation record

The documentation pass reviewed source and recorded review evidence. Build, test and browser results below were supplied by the implementation session; they are not tests performed by the documenter.

| Check | Recorded result and limit |
| --- | --- |
| Initial normal production build and tests | Passed, with all 53 tests. |
| Vercel build and tests | Passed, with the same 53 tests, before the final screenshot-to-text proof correction. |
| Normal production build after the proof correction | Passed. All 53 tests passed again, with no skips. |
| Reported test coverage | 100% lines and 95.85% branches for the measured content, routing and utility modules. This is not whole-UI coverage. |
| Detector | `.impeccable/review/detector.json` contained `[]`. |
| Shipping raster provenance scan | Three rasters, zero missing provenance sidecars. |
| Earlier browser interaction pass | Observed EN/UR Solutions-to-funnel navigation, keyboard FAQ operation, native scope disclosure and four matching CTA destinations. |
| Corrected-UI responsive browser pass | Loaded proof assets, first CTA within the viewport and no horizontal overflow at reported 1280×800 and 390×844 viewports. |
| Fresh production-browser navigation | On local `react-router-serve` at `http://127.0.0.1:5173`, `/solutions` led to `/tech-retail/offer`; the page had no navbar and four booking links, and its FAQ opened with the keyboard. |
| Fresh production-browser console | A fresh browser tab captured no console errors while serving the clean production build. Earlier development/HMR stale-dependency logs did not recur in this check. |

The package scripts for the recorded build/test paths are `npm run build`, `npm run build:vercel` and `npm test`. This record does not imply that every command in `npm run verify` has passed.

The first visual review had disposition **fix**, identifying F1: a CMS screenshot mislabelled as warranty proof. After the correction, the reviewer reopened refreshed `desktop.jpg`, `mobile.jpg` and `desktop-hero.jpg` and issued disposition **ship** for **F1 resolved**. The full-page captures exclude scrollbar width from the reported desktop/mobile viewports. The verdict explicitly covers that single proof correction; its reviewer performed no browser, console, build or runtime tests. It is not a broad runtime approval.

## Remaining dependencies and observed drift

- The Loom recording remains an owner-supplied dependency. The screenshot fallback is usable now; recording playback still needs verification when a real URL is supplied.
- The active calendar is supplied and wired into all four actions. Its external title remains FREE SITE AUDIT, while the funnel promises a personalised demo without naming a duration.
- `DESIGN.md` and `.impeccable/design.json` were absent. The surface brief and matching campaign brief still contain a FINISH line naming `DESIGN.md`. That wording is recorded as documentation drift; this scoped extension preserves the incumbent global implementation and creates no invented global design system.

No `.env*` files or credential stores were read. This pass writes only this validation document and does not repair unrelated project context or source.

## Owner-requested video update — November 5, 2026

This later implementation supersedes the screenshot fallback and the earlier 960px preview cap. The hero now has an 820px maximum-width, 16:9 native player. The owner Loom remains null; a supplied recording can replace this overview later. The campaign now advertises USD 4,850 and optional USD 280/month care only; the detailed regional catalogue is preserved.

The editable Remotion project is `videos/tech-retail`. Its six-scene film uses the supplied branding, authentic PC-builder/stock demo screens, a labelled serial-workflow illustration, the shared USD price and the existing demo CTA. It includes an original stereo instrumental score and local open-licensed fonts. No client results or captured warranty UI are invented.

- Rendered master: 3840×2160, 30 fps, H.264/AAC stereo, 42.005 seconds, 36,973,027 bytes. The master stays in ignored `videos/tech-retail/out/`.
- Shipping website MP4: 1920×1080, 30 fps, 6,587,156 bytes, with fast-start metadata. Poster: 1600×900 WebP, 37,032 bytes. English captions are included.
- Inspected frames from all six scenes, including the actual export at 8, 15, 22, 29, 38 and 41.9 seconds. The final CTA remains visible at the end. Exported audio peak: −5.5 dB; no clipping detected.
- Browser confirmed explicit-play playback, 42.005-second duration, 1920×1080 video, no initial autoplay and `preload="none"`. The rendered player measured approximately 818×460 desktop and 334×187 mobile, maintaining 16:9. No mobile horizontal overflow was observed.
- Root lint, TypeScript checks, production build and all 54 tests passed. The isolated video project's lint and TypeScript checks passed separately. No new business logic was introduced by the film.
- Production preview restarted at `http://127.0.0.1:5173`. No commit, push or deployment was performed for the video update.
