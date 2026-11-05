import type { CSSProperties, ReactNode } from 'react';
import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { theme } from '../theme';

export const move = (frame: number, start: number, end: number, from: number, to: number) => interpolate(frame, [start, end], [from, to], {
  easing: theme.ease.inOut, extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
});

export function Reveal({ children, delay = 0, style }: { children: ReactNode; delay?: number; style?: CSSProperties }) {
  const frame = useCurrentFrame(); const { fps } = useVideoConfig();
  const progress = spring({ frame: frame - delay * fps, fps, config: theme.spring });
  return <div style={{ opacity: Math.min(1, Math.max(0, progress)), transform: `translateY(${(1 - progress) * 34}px) scale(${.98 + .02 * progress})`, ...style }}>{children}</div>;
}

export function Brand({ light = false }: { light?: boolean }) {
  const frame = useCurrentFrame(); const { fps } = useVideoConfig();
  return <div className="absolute flex items-center justify-between" style={{ inset: '64px 96px auto', fontFamily: theme.fonts.body }}>
    <Reveal delay={.04}><div className="flex items-center" style={{ gap: 12, padding: '10px 17px', background: theme.colors.cream, borderRadius: 10, transform: `scale(${1 + Math.sin(frame / fps * 1.3) * .003})` }}>
      <Img src={staticFile('assets/mark.png')} style={{ width: 42, height: 42 }} />
      <Img src={staticFile('assets/wordmark.webp')} style={{ width: 172, height: 'auto' }} />
    </div></Reveal>
    <Reveal delay={.18}><div style={{ color: light ? theme.colors.lightMuted : theme.colors.muted, fontSize: 22, letterSpacing: 3, fontWeight: 600 }}>TECH RETAIL OS</div></Reveal>
  </div>;
}

export function Backdrop({ light = false }: { light?: boolean }) {
  const frame = useCurrentFrame(); const { fps } = useVideoConfig();
  const shift = Math.sin(frame / fps * .35) * 35;
  return <AbsoluteFill style={{ background: light ? theme.colors.paper : theme.colors.ink }}>
    <AbsoluteFill style={{ background: `radial-gradient(ellipse at ${78 + shift * .05}% 28%, ${light ? theme.colors.cream : theme.colors.forest}55, transparent 64%), radial-gradient(ellipse at 8% 100%, ${theme.colors.brown}22, transparent 64%)` }} />
    <svg width="1920" height="1080" viewBox="0 0 1920 1080" style={{ position: 'absolute', opacity: .18 }}><path d={`M1280 -120 C ${1100 + shift} 280, 1760 480, 2060 1000`} fill="none" stroke={light ? theme.colors.brown : theme.colors.line} strokeWidth="1.5" /><path d={`M-100 960 C 500 ${850 + shift}, 650 1200, 1400 1250`} fill="none" stroke={light ? theme.colors.brown : theme.colors.line} strokeWidth="1.5" /></svg>
  </AbsoluteFill>;
}

export function Scene({ children, duration, light = false, hold = false, note }: { children: ReactNode; duration: number; light?: boolean; hold?: boolean; note: string }) {
  const frame = useCurrentFrame(); const { fps } = useVideoConfig();
  const entrance = interpolate(frame, [0, .28 * fps], [0, 1], { easing: theme.ease.out, extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const exit = interpolate(frame, [(duration - .34) * fps, duration * fps - 1], [1, 0], { easing: theme.ease.in, extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  return <AbsoluteFill style={{ opacity: entrance * (hold ? 1 : exit), color: light ? theme.colors.ink : theme.colors.paper, fontFamily: theme.fonts.body }}>
    <Backdrop light={light} />
    <AbsoluteFill>{children}</AbsoluteFill>
    <Brand light={light} />
    <div style={{ position: 'absolute', bottom: 47, left: 96, right: 96, borderTop: `1px solid ${light ? theme.colors.lightMuted + '33' : theme.colors.line}`, paddingTop: 19, fontSize: 21, letterSpacing: .1, color: light ? theme.colors.lightMuted : theme.colors.muted }}>{note}</div>
  </AbsoluteFill>;
}

export function ProductScreen({ src, caption, reverse = false }: { src: string; caption: string; reverse?: boolean }) {
  const frame = useCurrentFrame(); const { fps } = useVideoConfig();
  const zoom = move(frame, 0, 7.5 * fps, reverse ? 1.04 : 1, reverse ? 1 : 1.04);
  const pan = move(frame, 0, 7.5 * fps, 6, -8);
  return <div style={{ width: 1040, borderRadius: 22, overflow: 'hidden', boxShadow: `0 35px 90px ${theme.colors.shadow}`, background: theme.colors.paper }}>
    <div style={{ padding: '20px 25px', color: theme.colors.lightMuted, fontSize: 21, fontFamily: theme.fonts.body }}>{caption}</div>
    <div style={{ height: 664, overflow: 'hidden' }}><Img src={staticFile(src)} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', transform: `translateY(${pan}px) scale(${zoom})` }} /></div>
  </div>;
}

export function FinishLayers() {
  const frame = useCurrentFrame();
  const noise = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E")`;
  return <>
    <AbsoluteFill style={{ background: theme.colors.brown, opacity: .018, mixBlendMode: 'soft-light', pointerEvents: 'none' }} />
    <AbsoluteFill style={{ backgroundImage: noise, backgroundPosition: `${frame % 180}px ${frame * 3 % 180}px`, opacity: .016, mixBlendMode: 'soft-light', pointerEvents: 'none' }} />
    <AbsoluteFill style={{ background: `radial-gradient(ellipse at center, transparent 52%, ${theme.colors.shadow} 120%)`, pointerEvents: 'none' }} />
  </>;
}
