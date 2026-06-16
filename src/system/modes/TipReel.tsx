/**
 * MODO "Tip" — contenido de VALOR (no venta). Look CLARO (distinto del oscuro de venta)
 * PERO con el MOVIMIENTO 3D aprobado: transiciones push-through con profundidad + motion
 * blur, cards de vidrio inclinadas en 3D, número gigante con parallax, chip glossy.
 * Regla del sistema: cada modo tiene su look, todos con movimiento 3D (nada plano).
 */
import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Img, staticFile } from 'remotion';
import { fontDisplay, fontMono } from '../../brand/fonts';

const VLT = '#6D28D9';
const VLT_L = '#9333EA';
const INK = '#1A1714';
const ease = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;
const expoOut = (t: number) => 1 - Math.pow(1 - t, 4);
const inOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const ipo = (f: number, a: number, b: number, x: number, y: number, e?: (t: number) => number) => interpolate(f, [a, b], [x, y], e ? { ...ease, easing: e } : ease);

export type Tip = { n: string; title: string; body: string; icon?: string };
export type TipData = { kicker: string; hook: { t: string; hl?: boolean }[]; tips: Tip[]; sign: string };

const DUR = 84, OV = 16;

// transición push-through con profundidad + motion blur (la aprobada)
const Push: React.FC<{ s: number; e: number; last?: boolean; children: React.ReactNode }> = ({ s, e, last, children }) => {
  const f = useCurrentFrame();
  const T = 14;
  const op = Math.min(ipo(f, s, s + 12, 0, 1), last ? 1 : ipo(f, e, e + T, 1, 0));
  let sc: number, blur: number, rotX: number;
  if (f < s + 12) { const t = ipo(f, s, s + 12, 0, 1, expoOut); sc = 0.72 + t * 0.28 + (1 - t) * t * 0.05; blur = (1 - t) * 8; rotX = (1 - t) * 7; }
  else if (f < e || last) { sc = ipo(f, s + 12, Math.max(e, s + 13), 1, 1.04); blur = 0; rotX = 0; }
  else { const t = ipo(f, e, e + T, 0, 1, inOut); sc = 1.04 + t * 0.9; blur = t * 11; rotX = -t * 4; }
  return <AbsoluteFill style={{ opacity: op, transform: `perspective(1600px) rotateX(${rotX}deg) scale(${sc})`, transformOrigin: '50% 52%', filter: blur > 0.2 ? `blur(${blur}px)` : 'none', backfaceVisibility: 'hidden' }}>{children}</AbsoluteFill>;
};

const LIGHT_BG = 'radial-gradient(125% 90% at 30% 25%,#FAF7F1 0%,#EDE7DB 55%,#E2DACB 100%)';
const Soft: React.FC<{ x: string; y: string; c?: string; size?: number }> = ({ x, y, c = 'rgba(124,58,237,0.16)', size = 900 }) => (
  <div style={{ position: 'absolute', left: x, top: y, width: size, height: size, transform: 'translate(-50%,-50%)', borderRadius: '50%', background: `radial-gradient(circle,${c},transparent 70%)`, filter: 'blur(50px)', pointerEvents: 'none' }} />
);
const Dust: React.FC = () => {
  const f = useCurrentFrame();
  return <AbsoluteFill style={{ pointerEvents: 'none' }}>{Array.from({ length: 18 }).map((_, i) => { const x = (i * 137) % 100; const y = (((i * 71) % 100) - f * 0.05 + 200) % 100; const s = 2 + (i % 3); return <div key={i} style={{ position: 'absolute', left: `${x}%`, top: `${y}%`, width: s, height: s, borderRadius: '50%', background: VLT, opacity: 0.12 * Math.abs(Math.sin(f * 0.05 + i)) }} />; })}</AbsoluteFill>;
};

const TIntro: React.FC<{ s: number; data: TipData }> = ({ s, data }) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: LIGHT_BG, padding: 80, justifyContent: 'center' }}>
      <Soft x="78%" y="30%" /><Dust />
      <div style={{ fontFamily: fontMono, fontSize: 22, letterSpacing: '0.16em', color: VLT, marginBottom: 36, opacity: ipo(f, s, s + 12, 0, 1) }}>{data.kicker}</div>
      <div style={{ transform: `translateY(${Math.sin(f * 0.035) * 8}px)` }}>
        {data.hook.map((l, i) => { const t = ipo(f, s + 8 + i * 7, s + 28 + i * 7, 0, 1, expoOut); return <div key={i} style={{ overflow: 'hidden', paddingBottom: 14, marginBottom: -14 }}><div style={{ transform: `translateY(${(1 - t) * 120}px)`, fontFamily: fontDisplay, fontWeight: 800, fontSize: 108, letterSpacing: '-0.035em', lineHeight: 1.04, color: l.hl ? VLT : INK }}>{l.t}</div></div>; })}
      </div>
      <div style={{ marginTop: 44, fontFamily: fontDisplay, fontSize: 30, color: '#857C6E', opacity: ipo(f, s + 40, s + 56, 0, 1) }}><span style={{ display: 'inline-block', transform: `translateX(${Math.sin(f * 0.1) * 8}px)` }}>→</span> Deslizá</div>
    </AbsoluteFill>
  );
};

const TTip: React.FC<{ s: number; tip: Tip }> = ({ s, tip }) => {
  const f = useCurrentFrame();
  const numIn = ipo(f, s + 4, s + 34, 0, 1, expoOut);
  const card = spring({ frame: f - (s + 8), fps: 30, config: { damping: 22, stiffness: 130, mass: 1 } });
  const chip = spring({ frame: f - (s + 14), fps: 30, config: { damping: 13, stiffness: 170, mass: 0.7 } });
  const under = ipo(f, s + 26, s + 50, 0, 1, expoOut);
  const drift = Math.sin(f * 0.035) * 7;
  return (
    <AbsoluteFill style={{ background: LIGHT_BG, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
      <Soft x="50%" y="48%" size={1100} /><Dust />
      {/* número gigante 3D con parallax + motion blur de entrada */}
      <div style={{ position: 'absolute', right: -50, top: 90, fontFamily: fontDisplay, fontWeight: 800, fontSize: 780, lineHeight: 0.8, color: VLT, opacity: 0.13 * numIn, transform: `translateX(${(1 - numIn) * 220}px) perspective(1300px) rotateY(${(1 - numIn) * -28}deg) translateY(${drift * 2}px)`, filter: numIn < 1 ? `blur(${(1 - numIn) * 24}px)` : 'none' }}>{tip.n}</div>
      {/* card de vidrio claro inclinada en 3D */}
      <div style={{ width: 880, opacity: card, transform: `perspective(1500px) rotateY(${-12 * (1 - card) - 7}deg) rotateX(4deg) translateY(${(1 - card) * 50 + drift}px) scale(${0.9 + card * 0.1})`, transformOrigin: 'center' }}>
        <div style={{ borderRadius: 34, background: 'rgba(255,255,255,0.72)', border: '1px solid rgba(124,58,237,0.18)', boxShadow: `0 60px 130px -34px rgba(80,40,140,0.45), inset 0 2px 0 rgba(255,255,255,0.9)`, backdropFilter: 'blur(12px)', padding: 56 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 28 }}>
            <div style={{ width: 104, height: 104, borderRadius: 26, background: `linear-gradient(135deg,${VLT},${VLT_L})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 52, boxShadow: `0 24px 50px -14px ${VLT}aa, inset 0 2px 6px rgba(255,255,255,0.5)`, transform: `scale(${0.7 + chip * 0.3}) rotate(${-8 + chip * 8}deg)`, flexShrink: 0 }}>{tip.icon ?? '⚡'}</div>
            <div style={{ fontFamily: fontMono, fontSize: 26, color: VLT, letterSpacing: '0.08em' }}>TIP {tip.n}</div>
          </div>
          <div style={{ fontFamily: fontDisplay, fontWeight: 800, fontSize: 74, letterSpacing: '-0.03em', lineHeight: 1.05, color: INK }}>{tip.title}</div>
          <div style={{ height: 6, width: 200 * under, background: `linear-gradient(90deg,${VLT},${VLT_L})`, borderRadius: 4, marginTop: 18 }} />
          <div style={{ marginTop: 28, fontFamily: fontDisplay, fontSize: 36, fontWeight: 400, lineHeight: 1.35, color: '#544D43', opacity: ipo(f, s + 28, s + 46, 0, 1), transform: `translateY(${ipo(f, s + 28, s + 46, 18, 0, expoOut)}px)` }}>{tip.body}</div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const TOutro: React.FC<{ s: number; data: TipData }> = ({ s, data }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const lo = spring({ frame: f - s, fps, config: { damping: 22, stiffness: 130 } });
  return (
    <AbsoluteFill style={{ background: 'radial-gradient(120% 80% at 50% 36%,#1A1426,#08060E 72%)', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
      <Soft x="50%" y="42%" c="rgba(124,58,237,0.5)" size={900} /><Dust />
      <Img src={staticFile('concepto-icon.png')} style={{ width: 90, height: 90, marginBottom: 26, opacity: lo, transform: `scale(${0.8 + lo * 0.2})` }} />
      <div style={{ fontFamily: fontDisplay, fontWeight: 800, fontSize: 66, letterSpacing: '-0.03em', color: '#F4F1EA', opacity: ipo(f, s + 6, s + 22, 0, 1) }}>{data.sign}</div>
      <div style={{ fontFamily: fontMono, fontSize: 24, letterSpacing: '0.12em', color: '#9A8FB5', marginTop: 22, opacity: ipo(f, s + 16, s + 32, 0, 1) }}>conceptodevelopment.com</div>
    </AbsoluteFill>
  );
};

export const TipReel: React.FC<{ data: TipData }> = ({ data }) => {
  const scenes = [
    { c: <TIntro s={0} data={data} /> },
    ...data.tips.map((tp, i) => ({ c: <TTip s={(i + 1) * (DUR - OV)} tip={tp} /> })),
    { c: <TOutro s={(data.tips.length + 1) * (DUR - OV)} data={data} /> },
  ];
  return (
    <AbsoluteFill style={{ background: '#000' }}>
      {scenes.map((sc, i) => { const s = i * (DUR - OV); return <Push key={i} s={s} e={s + DUR} last={i === scenes.length - 1}>{sc.c}</Push>; })}
    </AbsoluteFill>
  );
};

export const tipDuration = (data: TipData): number => (data.tips.length + 2) * (DUR - OV) + OV + 30;
