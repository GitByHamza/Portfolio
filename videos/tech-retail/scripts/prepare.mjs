import { copyFile, mkdir, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { priceCatalog, carePlans } from '../../../src/content/pricing.ts';

const publicRoot = new URL('../public/', import.meta.url);
for (const dir of ['assets', 'fonts', 'audio']) await mkdir(new URL(`${dir}/`, publicRoot), { recursive: true });
const assets = {
  'mark.png': 'brand/texcodes-mark.png',
  'wordmark.webp': 'brand/texcodes-wordmark.webp',
  'storefront.png': 'txs/home.png',
  'pc-builder.png': 'txs/rig builder full.png',
  'products.png': 'txs/dashboard products.png',
};
for (const [name, source] of Object.entries(assets)) await copyFile(new URL(`../../../public/${source}`, import.meta.url), new URL(`assets/${name}`, publicRoot));
await writeFile(new URL('../src/offer.generated.json', import.meta.url), JSON.stringify({ price: priceCatalog.tech.growth.USD.amount, care: carePlans[1].USD, url: 'texcodes.com/tech-retail/offer' }, null, 2) + '\n');

const fonts = [
  ['Manrope.ttf', 'https://raw.githubusercontent.com/google/fonts/main/ofl/manrope/Manrope%5Bwght%5D.ttf'],
  ['Newsreader.ttf', 'https://raw.githubusercontent.com/google/fonts/main/ofl/newsreader/Newsreader%5Bopsz%2Cwght%5D.ttf'],
  ['Manrope-OFL.txt', 'https://raw.githubusercontent.com/google/fonts/main/ofl/manrope/OFL.txt'],
  ['Newsreader-OFL.txt', 'https://raw.githubusercontent.com/google/fonts/main/ofl/newsreader/OFL.txt'],
];
await Promise.all(fonts.map(async ([name, url]) => {
  const file = new URL(`fonts/${name}`, publicRoot);
  if (existsSync(file)) return;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Font download failed: ${name}, HTTP ${response.status}`);
  await writeFile(file, Buffer.from(await response.arrayBuffer()));
}));

// Original, deterministic 80-BPM ambient score and restrained transition hits.
// No stock music, external audio licensing or network work during rendering.
const rate = 48000, duration = 42, samples = rate * duration;
const wav = Buffer.alloc(44 + samples * 4);
wav.write('RIFF', 0); wav.writeUInt32LE(wav.length - 8, 4); wav.write('WAVEfmt ', 8);
wav.writeUInt32LE(16, 16); wav.writeUInt16LE(1, 20); wav.writeUInt16LE(2, 22);
wav.writeUInt32LE(rate, 24); wav.writeUInt32LE(rate * 4, 28); wav.writeUInt16LE(4, 32); wav.writeUInt16LE(16, 34);
wav.write('data', 36); wav.writeUInt32LE(samples * 4, 40);
const chords = [[146.832, 174.614, 220, 261.626], [116.541, 146.832, 174.614, 220], [98, 116.541, 146.832, 174.614], [130.813, 164.814, 196, 293.665]];
const cuts = [0, 4.5, 12, 19.5, 25.5, 34.5];
let seed = 19;
for (let i = 0; i < samples; i++) {
  const t = i / rate;
  const chord = chords[Math.floor(t / 6) % chords.length];
  const chordPhase = t % 6;
  const envelope = Math.min(1, chordPhase / .8, (6 - chordPhase) / .8);
  let left = 0, right = 0;
  for (const frequency of chord) {
    left += Math.sin(2 * Math.PI * frequency * t) * .021 * envelope;
    right += Math.sin(2 * Math.PI * frequency * 1.0007 * t) * .021 * envelope;
  }
  const beat = t % .75;
  const pulse = Math.sin(2 * Math.PI * 57 * beat) * Math.exp(-beat * 22) * .07;
  const pluckPhase = t % 1.5;
  const pluck = Math.sin(2 * Math.PI * chord[Math.floor(t / 1.5) % 4] * 2 * pluckPhase) * Math.exp(-pluckPhase * 8) * .025;
  let hit = 0;
  seed = (seed * 1664525 + 1013904223) >>> 0;
  const noise = (seed / 4294967296) * 2 - 1;
  for (const cut of cuts) {
    const dt = t - cut;
    if (dt >= -.18 && dt < .22) hit += noise * .026 * Math.sin(Math.PI * (dt + .18) / .4) ** 2;
    if (dt >= 0 && dt < .3) hit += Math.sin(2 * Math.PI * (88 * dt - 65 * dt * dt)) * Math.exp(-dt * 20) * .10;
  }
  const fade = Math.max(0, Math.min(1, t / .35, (duration - t) / 1.8));
  const gain = 2.6 * fade;
  wav.writeInt16LE(Math.round(Math.max(-1, Math.min(1, (left + pulse + pluck + hit) * gain)) * 32767), 44 + i * 4);
  wav.writeInt16LE(Math.round(Math.max(-1, Math.min(1, (right + pulse + pluck + hit) * gain)) * 32767), 46 + i * 4);
}
await writeFile(new URL('audio/score.wav', publicRoot), wav);
console.log('Prepared logo, authentic demo screens, local fonts, shared USD offer and original 42-second score.');
