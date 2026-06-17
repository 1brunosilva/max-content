/**
 * lib — mini-kit AISLADO para las exploraciones (no depende de apple/kit, para no
 * chocar con la otra sesión). Reglas Bruno horneadas: SLOW global, texto CENTRADO,
 * grande/legible, glow Siri prominente, cierre con hold. Ver EMPEZAR-ACA-VIDEO.md.
 */
import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from 'remotion';
import { fontDisplay, fontMono } from '../brand/fonts';

export const VLT = '#7C3AED', VLT_L = '#A855F7';
export const fonts = { display: fontDisplay, mono: fontMono };
const CL = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;
export const APPLE = Easing.bezier(0.16, 1, 0.3, 1);
export const SLOW = 1.2; // apenitas más lento, siempre
export const ip = (f: number, a: number, b: number, x: number, y: number, e: (t: number) => number = APPLE) =>
  interpolate(f, [a, b], [x, y], { ...CL, easing: e });
export const useF = () => useCurrentFrame() / SLOW;   // frame ya desacelerado
export const dur = (base: number) => Math.round(base * SLOW);

const Grain: React.FC = () => (
  <AbsoluteFill style={{ opacity: 0.05, pointerEvents: 'none', mixBlendMode: 'overlay' }}>
    <svg width="100%" height="100%"><filter id="lg"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" /></filter><rect width="100%" height="100%" filter="url(#lg)" /></svg>
  </AbsoluteFill>
);
const Bokeh: React.FC<{ seed?: number; hue?: string }> = ({ seed = 0, hue = VLT }) => {
  const f = useCurrentFrame();
  const orbs = [{ x: 20, y: 28, s: 420 }, { x: 80, y: 68, s: 560 }, { x: 60, y: 16, s: 280 }, { x: 30, y: 84, s: 340 }];
  return (
    <AbsoluteFill style={{ pointerEvents: 'none' }}>
      {orbs.map((o, i) => (
        <div key={i} style={{ position: 'absolute', left: `${o.x}%`, top: `${o.y}%`, width: o.s, height: o.s, transform: `translate(calc(-50% + ${Math.sin(f * 0.012 + i + seed) * 24}px), calc(-50% + ${Math.cos(f * 0.01 + i + seed) * 20}px))`, borderRadius: '50%', background: `radial-gradient(circle, ${hue} 0%, transparent 66%)`, opacity: 0.15, filter: 'blur(40px)' }} />
      ))}
    </AbsoluteFill>
  );
};
export const Stage: React.FC<{ bg?: string; hue?: string; seed?: number; children: React.ReactNode }> = ({ bg = 'radial-gradient(120% 95% at 50% 40%, #14101F 0%, #06050B 78%)', hue = VLT, seed = 0, children }) => (
  <AbsoluteFill style={{ background: bg, fontFamily: fontDisplay }}>
    <Bokeh seed={seed} hue={hue} />
    {children}
    <Grain />
    <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 8, background: `linear-gradient(90deg, ${VLT}, ${VLT_L})` }} />
  </AbsoluteFill>
);

const FOCUS = (a: number) => `conic-gradient(from ${a}deg, #4FE0FF, #5B8CFF, ${VLT_L}, #FF6FD8, #4FE0FF)`;
export const SiriGlow: React.FC<{ frame: number; intensity: number; radius: number; inset?: number }> = ({ frame, intensity, radius, inset = 0 }) => {
  if (intensity <= 0.001) return null;
  const g = FOCUS((frame * 4) % 360), p = 0.7 + 0.3 * Math.sin(frame * 0.18);
  return (<>
    <div style={{ position: 'absolute', inset: inset - 32, borderRadius: radius + 32, background: g, filter: 'blur(40px)', opacity: 0.6 * intensity * p }} />
    <div style={{ position: 'absolute', inset: inset - 3, borderRadius: radius + 3, background: g, filter: 'blur(1px)', opacity: 0.95 * intensity }} />
  </>);
};
export const SiriFrame: React.FC<{ frame: number; intensity: number }> = ({ frame, intensity }) => {
  if (intensity <= 0.001) return null;
  return <div style={{ position: 'absolute', inset: 26, borderRadius: 44, border: '2px solid transparent', background: `${FOCUS((frame * 4) % 360)} border-box`, WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude', opacity: 0.5 * intensity * (0.7 + 0.3 * Math.sin(frame * 0.18)) } as React.CSSProperties} />;
};

export type Ln = { t: string; hl?: boolean };
// label superior mono, grande/legible, centrado
export const Label: React.FC<{ frame: number; s: number; text: string; outAt?: number; dark?: boolean }> = ({ frame, s, text, outAt = 9999, dark = true }) => (
  <div style={{ position: 'absolute', top: 128, left: 0, right: 0, textAlign: 'center', fontFamily: fontMono, fontSize: 31, fontWeight: 500, letterSpacing: '0.13em', color: dark ? 'rgba(255,255,255,0.66)' : '#7E7969', opacity: ip(frame, s, s + 18, 0, 1) * (1 - ip(frame, outAt, outAt + 16, 0, 1)) }}>{text}</div>
);
// statement/payoff CENTRADO
export const BigType: React.FC<{ frame: number; s: number; lines: Ln[]; size?: number; dark?: boolean }> = ({ frame, s, lines, size = 92, dark = true }) => (
  <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 70px' }}>
    <div style={{ display: 'flex', flexDirection: 'column', gap: size * 0.06 }}>
      {lines.map((l, i) => {
        const t = ip(frame, s + i * 6, s + i * 6 + 24, 0, 1);
        return <span key={i} style={{ fontFamily: fontDisplay, fontWeight: 800, fontSize: size, letterSpacing: '-0.04em', lineHeight: 1.05, color: l.hl ? VLT_L : dark ? '#F2F0FA' : '#15131C', textShadow: l.hl ? `0 0 40px ${VLT}aa` : 'none', opacity: t, transform: `translateY(${(1 - t) * 22}px)`, filter: t < 0.9 ? `blur(${(1 - t) * 6}px)` : 'none' }}>{l.t}</span>;
      })}
    </div>
  </AbsoluteFill>
);
