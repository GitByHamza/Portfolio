import { Easing } from 'remotion';

export const theme = {
  colors: {
    ink: '#15241e', paper: '#f6f2e9', cream: '#f5edde', muted: '#a5b8ae',
    green: '#22c78b', forest: '#0b6b4c', line: '#344b3f', white: '#ffffff',
    lightMuted: '#5b6b61', brown: '#623f2a', glass: 'rgba(246,242,233,.06)',
    shadow: 'rgba(0,0,0,.28)', grain: 'rgba(246,242,233,.08)',
  },
  fonts: { display: 'Newsreader', body: 'Manrope' },
  ease: {
    out: Easing.bezier(.16, 1, .3, 1),
    in: Easing.bezier(.7, 0, .84, 0),
    inOut: Easing.bezier(.83, 0, .17, 1),
  },
  spring: { damping: 22, stiffness: 105, mass: .9 },
  safe: 96,
} as const;
