# TeXCodes / Tech Retail OS film

42 seconds, 3840 × 2160, 30 fps, 16:9. The editable Remotion composition is `TechRetailOffer4K`.

The film follows the offer: PC compatibility, shared stock, serial records, the Multi-Branch package and a personalised demo. Product shots are authentic demo screens. The serial-record scene is explicitly a workflow illustration. Prices are generated from the portfolio's shared pricing source.

## Preview and render

From this directory, using Node 22.18+:

```sh
npm ci
npm run dev
npm run lint
npm run render:4k
npm run publish:web
```

`prepare:assets` runs before preview/render. It copies the portfolio logo and screenshots, downloads the two open-licensed fonts on first run, and creates the original stereo instrumental score. Rendering itself uses local assets.

The master is `out/texcodes-tech-retail-4k.mp4` (H.264, CRF 16). It stays outside Git. `publish:web` requires FFmpeg on PATH and produces a lighter 1080p H.264/AAC MP4 with fast-start metadata plus a 1600 × 900 WebP poster in the portfolio's `public/video/`. The site uses native controls, no autoplay, and `preload="none"`. English WebVTT captions are versioned beside the website video.

From the repository root, `npm run video:studio` opens the editor; `npm run video:render` renders and publishes the website assets. Install this directory's dependencies separately. Remotion is isolated from the portfolio's deployment dependencies and is linted/typechecked here.

## Edit

- `src/scenes/Story.tsx`: six scenes and offer copy.
- `src/components/Motion.tsx`: staged entrances, product camera moves and brand framing.
- `src/theme.ts`: palette, type, motion and safe margins.
- `src/TechRetailFilm.tsx`: sequence timing, local font loading and audio.
- `scripts/prepare.mjs`: asset provenance, shared prices and original audio synthesis.
- `scripts/publish-web.mjs`: website encoding and poster extraction.

After changing timing/copy, update `public/video/tech-retail-en.vtt`, render again, publish the web copy and rebuild the portfolio. The optional owner Loom URL in `src/content/tech-retail-funnel.ts` takes precedence when configured.

The logo was supplied by the owner; screenshots come from the existing portfolio's `public/txs/`. Manrope and Newsreader use the SIL Open Font License; preparation downloads their license notices alongside the local fonts. The instrumental score is generated for this project, with no stock audio. Remotion's own licensing terms apply to the rendering tool.
