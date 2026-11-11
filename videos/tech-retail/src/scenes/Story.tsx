import { ArrowRight, Boxes, Check, Cpu, FileCheck2, MessageCircle, ShieldCheck } from 'lucide-react';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import { theme } from '../theme';
import { move, ProductScreen, Reveal, Scene } from '../components/Motion';

// The funnel's hero film. It shows no pricing, and neither does the page: the investment is explained
// on the demo call and written in the proposal.
// Wording matches the funnel page and the ads: Roman Urdu mixed with everyday English.
const WHATSAPP = '0309 1824000';
const SHOPS = ['Computer', 'Laptop', 'Console'];
const STEPS = [
  { name: 'Demo call', line: 'Aap ki shop ka kaam samajh kar system dikhate hain' },
  { name: 'Written proposal', line: 'Scope, timeline aur har kharcha, likha hua' },
  { name: 'Test, phir launch', line: 'Private link pe apna system check karein' },
];

const headline = { fontFamily: theme.fonts.display, fontWeight: 600, fontSize: 106, lineHeight: 1.06, letterSpacing: -3 } as const;
const body = { fontSize: 31, lineHeight: 1.55, color: theme.colors.muted } as const;

export function Opening() {
  return <Scene duration={5} note="Established tech shops ke liye custom-built retail system.">
    <div className="absolute text-center" style={{ left: 140, right: 140, top: 262 }}>
      <Reveal delay={.12}><div style={headline}>Aap ki tech shop ka system.</div></Reveal>
      <Reveal delay={.3}><div style={{ ...headline, color: theme.colors.green, marginTop: 16 }}>Stock aur warranty ke saath.</div></Reveal>
      <div className="flex justify-center" style={{ gap: 16, marginTop: 62 }}>
        {SHOPS.map((shop, index) => <Reveal delay={1 + index * .1} key={shop}><div style={{ padding: '13px 30px', border: `1px solid ${theme.colors.line}`, borderRadius: 999, fontSize: 29, fontWeight: 600 }}>{shop}</div></Reveal>)}
      </div>
    </div>
  </Scene>;
}

export function Compatibility() {
  return <Scene duration={8} note="Real product screen · Sample component catalogue">
    <div className="absolute" style={{ left: 96, top: 250, width: 650 }}>
      <Reveal delay={.1}><div className="flex items-center" style={{ gap: 16, color: theme.colors.muted, fontSize: 24, letterSpacing: 2.4, fontWeight: 600 }}><Cpu size={40} strokeWidth={1.5} />PC &amp; GAMING SHOPS</div></Reveal>
      <Reveal delay={.24}><h1 style={{ ...headline, marginTop: 30 }}>Parts jo<br /><span style={{ color: theme.colors.green }}>compatible</span><br />hon.</h1></Reveal>
      <div style={{ ...body, marginTop: 35 }}>{['CPU socket check', 'DDR4 / DDR5 match', 'Power supply estimate'].map((text, index) => <Reveal delay={.8 + index * .15} key={text}><p className="flex items-center" style={{ gap: 16, marginTop: 9 }}><Check size={24} />{text}</p></Reveal>)}</div>
    </div>
    <div className="absolute" style={{ left: 805, top: 208 }}><Reveal delay={.35}><ProductScreen src="assets/pc-builder.png" caption="PC builder: order se pehle check" /></Reveal></div>
  </Scene>;
}

export function Stock() {
  return <Scene duration={8} note="Real product administration · Demo catalogue aur sample stock data">
    <div className="absolute" style={{ left: 96, top: 208 }}><Reveal delay={.18}><ProductScreen src="assets/products.png" caption="Aap ka catalogue aur stock admin" reverse /></Reveal></div>
    <div className="absolute" style={{ left: 1245, top: 276, width: 580 }}>
      <Reveal delay={.1}><Boxes size={45} strokeWidth={1.5} color={theme.colors.muted} /></Reveal>
      <Reveal delay={.3}><h1 style={{ ...headline, marginTop: 27 }}>Apna stock,<br /><span style={{ color: theme.colors.green }}>har waqt.</span></h1></Reveal>
      <Reveal delay={.85}><p style={{ ...body, marginTop: 38 }}>Counter, online orders aur har branch, ek hi stock se.</p></Reveal>
      <Reveal delay={1.65}><div style={{ marginTop: 36, paddingTop: 26, borderTop: `1px solid ${theme.colors.line}`, fontSize: 29 }}>Har tech shop ke liye.</div></Reveal>
    </div>
  </Scene>;
}

export function Warranty() {
  const frame = useCurrentFrame(); const { fps } = useVideoConfig();
  const stages = [{ title: 'Stock intake', detail: 'Serial + supplier', icon: Boxes }, { title: 'Sale', detail: 'Invoice + customer', icon: FileCheck2 }, { title: 'Warranty', detail: 'Claim + replacement record', icon: ShieldCheck }];
  return <Scene duration={6.5} note="Serial-record workflow ki illustration · Scope build se pehle likh kar confirm hota hai">
    <div className="absolute text-center" style={{ top: 220, left: 130, right: 130 }}>
      <Reveal delay={.1}><h1 style={headline}>Har serial number ka<br /><span style={{ color: theme.colors.green }}>record.</span></h1></Reveal>
      <Reveal delay={.65}><p style={{ ...body, marginTop: 30 }}>Supplier ki delivery se customer ke claim tak.</p></Reveal>
    </div>
    <div className="absolute" style={{ top: 652, left: 250, width: 1420, height: 2, background: theme.colors.line }}><div style={{ height: 2, background: theme.colors.green, width: `${move(frame, .7 * fps, 3.5 * fps, 0, 100)}%` }} /></div>
    <div className="absolute flex justify-between" style={{ top: 585, left: 175, right: 175 }}>
      {stages.map(({ title, detail, icon: Icon }, index) => <Reveal delay={.7 + index * .6} key={title} style={{ width: 465, textAlign: 'center' }}>
        <div className="flex items-center justify-center" style={{ background: theme.colors.ink, width: 130, height: 130, border: `1px solid ${theme.colors.line}`, borderRadius: '50%', margin: '0 auto 28px' }}><Icon size={51} strokeWidth={1.3} /></div>
        <h2 style={{ fontSize: 36, fontWeight: 600 }}>{title}</h2><p style={{ ...body, fontSize: 26, marginTop: 12 }}>{detail}</p>
      </Reveal>)}
    </div>
  </Scene>;
}

export function Package() {
  return <Scene light duration={9.5} note="Kaam shuru hone se pehle scope aur har kharcha written proposal mein.">
    <div className="absolute" style={{ top: 262, left: 130, width: 700 }}>
      <Reveal delay={.1}><p style={{ fontSize: 29, color: theme.colors.lightMuted }}>Tech Retail OS</p></Reveal>
      <Reveal delay={.26}><h1 style={{ ...headline, fontSize: 150, letterSpacing: -5, lineHeight: 1, color: theme.colors.forest, marginTop: 34 }}>Pehle demo.</h1></Reveal>
      <Reveal delay={.65}><p style={{ fontFamily: theme.fonts.display, fontSize: 58, lineHeight: 1.15, letterSpacing: -1.2, marginTop: 26 }}>Phir aap ki shop<br />ke hisaab se scope.</p></Reveal>
      <Reveal delay={2.6}><p style={{ fontSize: 28, marginTop: 44, color: theme.colors.lightMuted, lineHeight: 1.6 }}>Har kharcha proposal mein likha hota hai, shuru se pehle.</p></Reveal>
    </div>
    <div className="absolute" style={{ top: 252, left: 930, width: 860 }}>
      {STEPS.map((step, index) => <Reveal delay={.9 + index * .45} key={step.name}><div className="flex items-center justify-between" style={{ gap: 28, paddingBlock: 38, borderBottom: `1px solid ${theme.colors.lightMuted}44` }}>
        <div><div style={{ fontFamily: theme.fonts.display, fontSize: 50, fontWeight: 600, letterSpacing: -1 }}>{step.name}</div><div style={{ fontSize: 27, color: theme.colors.lightMuted, marginTop: 10 }}>{step.line}</div></div>
        <div style={{ flexShrink: 0, padding: '12px 24px', borderRadius: 999, background: `${theme.colors.forest}18`, color: theme.colors.forest, fontSize: 25, fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>{String(index + 1).padStart(2, '0')}</div>
      </div></Reveal>)}
    </div>
  </Scene>;
}

export function Closing() {
  const frame = useCurrentFrame(); const { fps } = useVideoConfig();
  return <Scene hold duration={7.5} note="Final payment pe repository, database aur admin accounts aap ko transfer ho jate hain.">
    <div className="absolute text-center" style={{ top: 226, left: 160, right: 160 }}>
      <Reveal delay={.1}><h1 style={headline}>Aap ki shop ke liye bana.<br /><span style={{ color: theme.colors.green }}>Launch ke baad aap ka.</span></h1></Reveal>
      <Reveal delay={.6}><p style={{ ...body, marginTop: 34 }}>Dekhein yeh aap ki shop mein kaise chalega.</p></Reveal>
      <Reveal delay={1.1}><div className="inline-flex items-center" style={{ gap: 26, marginTop: 50, background: theme.colors.green, color: theme.colors.ink, padding: '27px 42px', borderRadius: 13, fontSize: 34, fontWeight: 700, transform: `scale(${1 + Math.sin(frame / fps * 1.8) * .003})` }}><MessageCircle size={36} />Apni shop ka demo book karein<ArrowRight size={35} /></div></Reveal>
      <Reveal delay={1.6}><p style={{ marginTop: 30, fontSize: 54, fontWeight: 700, letterSpacing: 1, fontVariantNumeric: 'tabular-nums' }}>{WHATSAPP}</p></Reveal>
    </div>
  </Scene>;
}
