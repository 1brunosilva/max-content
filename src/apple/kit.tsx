/**
 * kit — el ADN del estilo Concepto (reutilizable). NO es una plantilla: son los
 * PRINCIPIOS en código para componer mecanismos NUEVOS cada día sin recaer en lo
 * mismo. Ver feedback-video-no-mismo-estilo (memoria) + VIDEO-SYSTEM.md.
 *
 * Reglas: 3D real (profundidad/rotación/parallax) · héroe por vez · física Apple
 * (entra rápido, desacelera, se asienta, micro-overshoot, nunca quieto) · glow
 * Siri como foco · transiciones espaciales (no cortes) · cards glassy = vocabulario
 * · base oscura cinematográfica con acento controlado (NO gradiente violeta plano).
 *
 * Un video = topic psicológico + UN mecanismo + este ADN. Variedad = recombinar.
 */
import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Easing } from 'remotion';
import { fontDisplay, fontMono } from '../brand/fonts';

export const VLT = '#7C3AED';
export const VLT_L = '#A855F7';
export const fonts = { display: fontDisplay, mono: fontMono };
const CL = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;

// ── FÍSICA (el "feeling Apple") ───────────────────────────────────────────────
export const APPLE = Easing.bezier(0.16, 1, 0.3, 1); // entra rápido, desacelera fuerte
export const ip = (f: number, a: number, b: number, x: number, y: number, e: (t: number) => number = APPLE) =>
  interpolate(f, [a, b], [x, y], { ...CL, easing: e });
// settle con micro-overshoot (el "asentarse")
export const useSettle = (start: number, opts?: { damping?: number; stiffness?: number; mass?: number }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({ frame: f - start, fps, config: { damping: opts?.damping ?? 15, stiffness: opts?.stiffness ?? 90, mass: opts?.mass ?? 1.1 } });
};

// ── AMBIENTE (base oscura cinematográfica, VARIABLE — no siempre igual) ────────
export const Grain: React.FC<{ op?: number }> = ({ op = 0.05 }) => (
  <AbsoluteFill style={{ opacity: op, pointerEvents: 'none', mixBlendMode: 'overlay' }}>
    <svg width="100%" height="100%"><filter id="kgr"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" /></filter><rect width="100%" height="100%" filter="url(#kgr)" /></svg>
  </AbsoluteFill>
);
export const Bokeh: React.FC<{ seed?: number; hue?: string }> = ({ seed = 0, hue = VLT }) => {
  const f = useCurrentFrame();
  const orbs = [{ x: 20, y: 28, s: 420 }, { x: 80, y: 68, s: 560 }, { x: 62, y: 16, s: 280 }, { x: 30, y: 84, s: 340 }];
  return (
    <AbsoluteFill style={{ pointerEvents: 'none' }}>
      {orbs.map((o, i) => {
        const dx = Math.sin(f * 0.012 + i * 1.7 + seed) * 26;
        const dy = Math.cos(f * 0.01 + i + seed) * 22;
        return <div key={i} style={{ position: 'absolute', left: `${o.x}%`, top: `${o.y}%`, width: o.s, height: o.s, transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px))`, borderRadius: '50%', background: `radial-gradient(circle, ${hue} 0%, transparent 66%)`, opacity: 0.16, filter: 'blur(40px)' }} />;
      })}
    </AbsoluteFill>
  );
};
// Stage: escenario 3D. `bg` distinto por mecanismo para NO repetir el mismo fondo.
export const Stage: React.FC<{ bg?: string; hue?: string; seed?: number; perspective?: number; children: React.ReactNode }> = ({ bg = 'radial-gradient(130% 95% at 50% 44%, #15151D 0%, #060608 74%)', hue = VLT, seed = 0, perspective = 1700, children }) => (
  <AbsoluteFill style={{ background: bg }}>
    <Bokeh seed={seed} hue={hue} />
    <AbsoluteFill style={{ perspective }}>{children}</AbsoluteFill>
    <Grain />
  </AbsoluteFill>
);

// drift constante: nada queda 100% quieto
export const Drift: React.FC<{ amp?: number; children: React.ReactNode }> = ({ amp = 5, children }) => {
  const f = useCurrentFrame();
  return <div style={{ transform: `translateY(${Math.sin(f * 0.02) * amp}px)` }}>{children}</div>;
};

// ── FOCO (glow tipo Siri — FAVORITO de Bruno, usar PROMINENTE) ────────────────
// Bruno: "el glow Siri me encanta, usalo bastante". Paleta viva (cyan→azul→violeta→
// rosa) que fluye, anillo nítido + bloom amplio. Es la firma del estilo.
const FOCUS = `conic-gradient(from VARdeg, #4FE0FF, #5B8CFF, ${VLT_L}, #FF6FD8, #4FE0FF)`;
export const SiriGlow: React.FC<{ frame: number; intensity: number; radius: number; inset?: number }> = ({ frame, intensity, radius, inset = 0 }) => {
  if (intensity <= 0.001) return null;
  const ang = (frame * 4) % 360;
  const pulse = 0.7 + 0.3 * Math.sin(frame * 0.18);
  const grad = FOCUS.replace('VAR', String(ang));
  return (
    <>
      <div style={{ position: 'absolute', inset: inset - 32, borderRadius: radius + 32, background: grad, filter: 'blur(40px)', opacity: 0.6 * intensity * pulse }} />
      <div style={{ position: 'absolute', inset: inset - 3, borderRadius: radius + 3, background: grad, filter: 'blur(1px)', opacity: 0.95 * intensity }} />
    </>
  );
};
// marco de luz en los bordes del cuadro (para "estar adentro" de algo)
export const SiriFrame: React.FC<{ frame: number; intensity: number; inset?: number }> = ({ frame, intensity, inset = 26 }) => {
  if (intensity <= 0.001) return null;
  const grad = FOCUS.replace('VAR', String((frame * 4) % 360));
  return <div style={{ position: 'absolute', inset, borderRadius: 44, border: '2px solid transparent', background: `${grad} border-box`, WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude', opacity: 0.5 * intensity * (0.7 + 0.3 * Math.sin(frame * 0.18)) } as React.CSSProperties} />;
};

// ── VOCABULARIO (cards glassy con contenido real) ─────────────────────────────
export const Glass: React.FC<{ w: number; h?: number; selected?: boolean; pad?: number; style?: React.CSSProperties; children: React.ReactNode }> = ({ w, h, selected, pad = 44, style, children }) => (
  <div style={{ width: w, height: h, borderRadius: 34, background: selected ? 'linear-gradient(165deg,#211B36 0%,#0E0B17 100%)' : 'rgba(255,255,255,0.05)', border: `1px solid ${selected ? VLT + '99' : 'rgba(255,255,255,0.12)'}`, backdropFilter: 'blur(14px)', boxShadow: selected ? `0 50px 130px -30px ${VLT}aa` : '0 30px 80px -34px rgba(0,0,0,0.8)', padding: pad, display: 'flex', flexDirection: 'column', justifyContent: 'center', ...style }}>{children}</div>
);

// ── TIPOGRAFÍA (grande, corta, entra rápido y se asienta) ─────────────────────
export type Ln = { t: string; hl?: boolean };
export const BigType: React.FC<{ frame: number; s: number; lines: Ln[]; size: number; align?: 'left' | 'center'; dark?: boolean }> = ({ frame, s, lines, size, align = 'center', dark = true }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: align === 'center' ? 'center' : 'flex-start', textAlign: align, gap: size * 0.05 }}>
    {lines.map((l, i) => {
      const at = s + i * 5;
      const t = ip(frame, at, at + 26, 0, 1);
      return <span key={i} style={{ fontFamily: fontDisplay, fontWeight: 800, fontSize: size, letterSpacing: '-0.04em', lineHeight: 1.02, color: l.hl ? VLT_L : dark ? '#F4F4FA' : '#0B0A12', textShadow: l.hl ? `0 0 44px ${VLT}aa` : 'none', opacity: t, transform: `translateY(${(1 - t) * 24}px) scale(${0.985 + t * 0.015})`, filter: t < 0.9 ? `blur(${(1 - t) * 6}px)` : 'none' }}>{l.t}</span>;
    })}
  </div>
);

// ── VERBOS de movimiento (los "verbos" del lenguaje; un mecanismo = verbo×sustantivo×coreografía) ──
// Cada verbo es una función pura (params) => string de `transform`. Se combinan/parametrizan
// → de acá salen cientos de mecanismos distintos sin escribir 150 archivos.
export const verbs = {
  // cover-flow: card en offset `o` respecto al centro, con apertura `p` (0..1)
  coverflow: (o: number, p: number, gap = 320, depth = 240, rot = 36) =>
    `translateX(${o * gap * p}px) translateZ(${-Math.abs(o) * depth}px) rotateY(${Math.max(-58, Math.min(58, -o * rot))}deg)`,
  // abanico: como coverflow pero con arco vertical (cartas en mano)
  fan: (o: number, p: number, gap = 250, depth = 120, rot = 16, arc = 26) =>
    `translateX(${o * gap * p}px) translateY(${-Math.abs(o) * arc * p}px) translateZ(${-Math.abs(o) * depth * p}px) rotateY(${-o * rot * p}deg)`,
  // flip: voltea sobre Y (o X) revelando la otra cara. p 0..1
  flip: (p: number, axis: 'y' | 'x' = 'y', deg = 180) => `rotate${axis === 'y' ? 'Y' : 'X'}(${p * deg}deg)`,
  // zoom dentro de un elemento: escala fuerte con leve deriva. p 0..1
  zoomInto: (p: number, maxScale = 3.4) => `scale(${1 + APPLE(p) * (maxScale - 1)})`,
  // dolly: empuje de cámara hacia adelante (toda la escena). p 0..1
  dolly: (p: number, z = 280) => `translateZ(${p * z}px)`,
  // rack de parallax: cada capa `layer` se mueve a distinta velocidad (scroll vertical)
  parallax: (layer: number, p: number, dist = 900) => `translateY(${-p * dist * (0.5 + layer * 0.5)}px)`,
  // scatter: dispersa hacia afuera/abajo (para "lo que se descarta"). p 0..1
  scatter: (o: number, p: number, fall = 760) => `translateY(${p * fall}px) translateX(${o * 40 * p}px) rotate(${o * 6 * p}deg)`,
  // rise: sube al frente y crece (para "el elegido"). p 0..1
  rise: (p: number, z = 320, grow = 0.28) => `translateZ(${p * z}px) scale(${1 + p * grow})`,
};
// número que tickea (countUp): devuelve el valor entero animado
export const countUp = (frame: number, from: number, to: number, target: number, e = APPLE) =>
  Math.round(ip(frame, from, to, 0, target, e));
