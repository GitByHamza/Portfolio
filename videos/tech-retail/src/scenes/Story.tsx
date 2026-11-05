import { ArrowRight, Boxes, Check, CheckCheck, Cpu, FileCheck2, ShieldCheck } from 'lucide-react';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import { theme } from '../theme';
import { move, ProductScreen, Reveal, Scene } from '../components/Motion';
import offer from '../offer.generated.json';

const headline = { fontFamily: theme.fonts.display, fontWeight: 600, fontSize: 106, lineHeight: 1.06, letterSpacing: -3 } as const;
const body = { fontSize: 31, lineHeight: 1.55, color: theme.colors.muted } as const;

export function Opening() {
  return <Scene duration={5} note="Custom retail software for established computer shops.">
    <div className="absolute text-center" style={{ left: 140, right: 140, top: 245 }}>
      <Reveal delay={.12}><div style={headline}>Your PC builds.</div></Reveal>
      <Reveal delay={.26}><div style={headline}>Your branch stock.</div></Reveal>
      <Reveal delay={.40}><div style={{ ...headline, color: theme.colors.green, marginTop: 16 }}>One retail system.</div></Reveal>
      <Reveal delay={1.1}><p style={{ ...body, marginTop: 48 }}>An online store and back office built around how you sell.</p></Reveal>
    </div>
  </Scene>;
}

export function Compatibility() {
  return <Scene duration={8} note="Actual product demonstration · Sample component catalogue">
    <div className="absolute" style={{ left: 96, top: 264, width: 650 }}>
      <Reveal delay={.1}><Cpu size={45} strokeWidth={1.5} color={theme.colors.muted} /></Reveal>
      <Reveal delay={.24}><h1 style={{ ...headline, marginTop: 27 }}>Build with<br /><span style={{ color: theme.colors.green }}>compatible</span><br />parts.</h1></Reveal>
      <div style={{ ...body, marginTop: 35 }}>{['CPU socket checks', 'DDR4 / DDR5 matching', 'Estimated power requirements'].map((text, index) => <Reveal delay={.8 + index * .15} key={text}><p className="flex items-center" style={{ gap: 16, marginTop: 9 }}><Check size={24} />{text}</p></Reveal>)}</div>
    </div>
    <div className="absolute" style={{ left: 805, top: 208 }}><Reveal delay={.35}><ProductScreen src="assets/pc-builder.png" caption="The customer’s PC-building workflow" /></Reveal></div>
  </Scene>;
}

export function Stock() {
  return <Scene duration={8} note="Actual product administration · Demo catalogue and sample stock data">
    <div className="absolute" style={{ left: 96, top: 208 }}><Reveal delay={.18}><ProductScreen src="assets/products.png" caption="Your catalogue and product administration" reverse /></Reveal></div>
    <div className="absolute" style={{ left: 1245, top: 276, width: 580 }}>
      <Reveal delay={.1}><Boxes size={45} strokeWidth={1.5} color={theme.colors.muted} /></Reveal>
      <Reveal delay={.3}><h1 style={{ ...headline, marginTop: 27 }}>Know your<br /><span style={{ color: theme.colors.green }}>stock.</span></h1></Reveal>
      <Reveal delay={.85}><p style={{ ...body, marginTop: 38 }}>Connect the counter, online orders and up to three locations.</p></Reveal>
      <Reveal delay={1.65}><div style={{ marginTop: 36, paddingTop: 26, borderTop: `1px solid ${theme.colors.line}`, fontSize: 29 }}>One shared retail workflow.</div></Reveal>
    </div>
  </Scene>;
}

export function Warranty() {
  const frame = useCurrentFrame(); const { fps } = useVideoConfig();
  const stages = [{ title: 'Stock intake', detail: 'Serial + supplier', icon: Boxes }, { title: 'Sale', detail: 'Invoice + customer', icon: FileCheck2 }, { title: 'Warranty', detail: 'Claim + replacement record', icon: ShieldCheck }];
  return <Scene duration={6.5} note="Included serial-record workflow illustration · Scope confirmed before the build">
    <div className="absolute text-center" style={{ top: 220, left: 130, right: 130 }}>
      <Reveal delay={.1}><h1 style={headline}>Keep every serial<br /><span style={{ color: theme.colors.green }}>connected.</span></h1></Reveal>
      <Reveal delay={.65}><p style={{ ...body, marginTop: 30 }}>From the supplier’s delivery to the customer’s claim.</p></Reveal>
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
  return <Scene light duration={9.5} note={`Hosting, domains, gateway fees and AI usage are additional. Optional Growth Care: $${offer.care}/month.`}>
    <div className="absolute" style={{ top: 240, left: 130, width: 820 }}>
      <Reveal delay={.1}><p style={{ fontSize: 29, color: theme.colors.lightMuted }}>Tech Retail OS / Multi-Branch</p></Reveal>
      <Reveal delay={.26}><h1 style={{ fontFamily: theme.fonts.display, fontWeight: 600, fontSize: 183, letterSpacing: -5, lineHeight: 1, color: theme.colors.forest, marginTop: 46 }}>${offer.price.toLocaleString('en-US')}<span style={{ fontFamily: theme.fonts.body, fontSize: 40, letterSpacing: 0, marginLeft: 22 }}>USD</span></h1></Reveal>
      <Reveal delay={.65}><p style={{ fontSize: 30, marginTop: 25 }}>One-time build. Your shop, connected.</p></Reveal>
      <Reveal delay={1.15}><p style={{ fontSize: 28, marginTop: 48, color: theme.colors.lightMuted, lineHeight: 1.6, maxWidth: 710 }}>21-day delivery after your content and first payment arrive.*</p></Reveal>
      <Reveal delay={2.0}><p style={{ fontSize: 24, marginTop: 25, color: theme.colors.lightMuted }}>40 / 40 / 20 · start / staging approval / launch</p></Reveal>
    </div>
    <div className="absolute" style={{ top: 275, left: 1085, width: 650 }}>
      {['Online storefront + back office', 'PC compatibility builder', 'Stock across up to 3 locations', 'Serial-number warranty records', 'Online payments + AI assistant'].map((text, index) => <Reveal delay={.7 + index * .15} key={text}><div className="flex items-center" style={{ gap: 22, paddingBlock: 29, borderBottom: `1px solid ${theme.colors.lightMuted}44`, fontSize: 29, lineHeight: 1.4 }}><CheckCheck size={30} color={theme.colors.lightMuted} /><span>{text}</span></div></Reveal>)}
    </div>
    <Reveal delay={3.1} style={{ position: 'absolute', bottom: 139, left: 130, fontSize: 21, color: theme.colors.lightMuted }}>*Waiting for feedback and third-party approvals adds time.</Reveal>
  </Scene>;
}

export function Closing() {
  const frame = useCurrentFrame(); const { fps } = useVideoConfig();
  return <Scene hold duration={7.5} note="Repository, database and admin handover after final payment. The core engine is shared across clients.">
    <div className="absolute text-center" style={{ top: 240, left: 160, right: 160 }}>
      <Reveal delay={.1}><h1 style={headline}>Built around your shop.<br />Owned by you.</h1></Reveal>
      <Reveal delay={.6}><p style={{ ...body, marginTop: 36 }}>See how Tech Retail OS fits your products and workflow.</p></Reveal>
      <Reveal delay={1.1}><div className="inline-flex items-center" style={{ gap: 30, marginTop: 58, background: theme.colors.green, color: theme.colors.ink, padding: '27px 42px', borderRadius: 13, fontSize: 34, fontWeight: 700, transform: `scale(${1 + Math.sin(frame / fps * 1.8) * .003})` }}>Book a personalised demo<ArrowRight size={35} /></div></Reveal>
      <Reveal delay={1.6}><p style={{ marginTop: 35, fontSize: 27, color: theme.colors.muted }}>{offer.url}</p></Reveal>
    </div>
  </Scene>;
}
