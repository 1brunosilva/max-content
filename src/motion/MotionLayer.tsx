/**
 * MotionLayer — capa de MOTION GRAPHICS constante y rápida (reusable).
 *
 * Bruno: "faltan motion graphics constantes y rápidos en ambas, al fallo".
 * Esto corre SIEMPRE de fondo/alrededor del texto, sin competir con la lectura:
 * grilla en perspectiva que scrollea, partículas que derivan, anillos que rotan,
 * barrido de luz, campo de "+" que titila, ticker DM Mono, brackets de esquina.
 *
 * `tone`: 'violet' (fondo aurora) o 'mono' (fondo negro). `intensity` 0..1.
 * Todo determinista (random seedeado de remotion) → sin flicker entre frames.
 */

import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, random, interpolate } from 'remotion';

type Tone = 'violet' | 'mono';
const palette = (tone: Tone) => ({
  line: tone === 'violet' ? 'rgba(216,180,254,0.22)' : 'rgba(234,234,242,0.16)',
  lineHot: tone === 'violet' ? 'rgba(216,180,254,0.5)' : 'rgba(168,85,247,0.55)',
  dot: tone === 'violet' ? 'rgba(233,213,255,0.7)' : 'rgba(234,234,242,0.6)',
  accent: '#a855f7',
  mono: tone === 'violet' ? 'rgba(233,213,255,0.4)' : 'rgba(150,150,180,0.4)',
});

// ─── Grilla en perspectiva que scrollea hacia el espectador ──────────────────
const PerspectiveGrid: React.FC<{ tone: Tone; k: number }> = ({ tone, k }) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const c = palette(tone);
  const rows = 14;
  const scroll = (frame * 1.6) % (height / rows);
  return (
    <svg width={width} height={height} style={{ position: 'absolute', inset: 0, opacity: 0.5 * k }}>
      {/* líneas horizontales que se acercan */}
      {Array.from({ length: rows }).map((_, i) => {
        const y = ((i * height) / rows + scroll) % height;
        const fade = interpolate(y, [0, height * 0.45, height], [0, 0.2, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
        return <line key={`h${i}`} x1={0} y1={y} x2={width} y2={y} stroke={c.line} strokeWidth={1} opacity={fade} />;
      })}
      {/* líneas verticales en fuga */}
      {Array.from({ length: 11 }).map((_, i) => {
        const x = (i / 10) * width;
        const vx = width / 2 + (x - width / 2) * 1.8;
        return <line key={`v${i}`} x1={width / 2} y1={height * 0.5} x2={vx} y2={height} stroke={c.line} strokeWidth={1} opacity={0.5} />;
      })}
    </svg>
  );
};

// ─── Partículas que derivan (constante) ──────────────────────────────────────
const Particles: React.FC<{ tone: Tone; k: number; count?: number }> = ({ tone, k, count = 40 }) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const c = palette(tone);
  return (
    <AbsoluteFill style={{ opacity: 0.9 * k }}>
      {Array.from({ length: count }).map((_, i) => {
        const bx = random(`px${i}`) * width;
        const by = random(`py${i}`) * height;
        const sp = 0.3 + random(`ps${i}`) * 1.1;
        const r = 1.2 + random(`pr${i}`) * 2.6;
        const y = (by - frame * sp * 1.4) % height;
        const yy = y < 0 ? y + height : y;
        const tw = 0.4 + 0.6 * Math.abs(Math.sin(frame * 0.05 + i));
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: bx + Math.sin(frame * 0.02 + i) * 14,
              top: yy,
              width: r,
              height: r,
              borderRadius: '50%',
              background: c.dot,
              opacity: tw,
              boxShadow: `0 0 ${r * 3}px ${c.dot}`,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

// ─── Anillos / polígonos line-art que rotan (constante) ──────────────────────
const FloatingRings: React.FC<{ tone: Tone; k: number }> = ({ tone, k }) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const c = palette(tone);
  const rings = [
    { x: 0.16, y: 0.2, r: 150, sides: 0, sp: 0.5 },
    { x: 0.86, y: 0.26, r: 110, sides: 6, sp: -0.7 },
    { x: 0.82, y: 0.8, r: 180, sides: 3, sp: 0.4 },
    { x: 0.12, y: 0.82, r: 120, sides: 0, sp: -0.55 },
  ];
  const poly = (cx: number, cy: number, r: number, n: number) =>
    Array.from({ length: n })
      .map((_, i) => {
        const a = (i / n) * Math.PI * 2 - Math.PI / 2;
        return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`;
      })
      .join(' ');
  return (
    <svg width={width} height={height} style={{ position: 'absolute', inset: 0, opacity: 0.6 * k }}>
      {rings.map((rg, i) => {
        const cx = rg.x * width;
        const cy = rg.y * height;
        const rot = frame * rg.sp;
        const breathe = rg.r * (1 + 0.06 * Math.sin(frame * 0.04 + i));
        return (
          <g key={i} transform={`rotate(${rot} ${cx} ${cy})`}>
            {rg.sides === 0 ? (
              <circle cx={cx} cy={cy} r={breathe} fill="none" stroke={c.line} strokeWidth={1.5} />
            ) : (
              <polygon points={poly(cx, cy, breathe, rg.sides)} fill="none" stroke={c.line} strokeWidth={1.5} />
            )}
          </g>
        );
      })}
    </svg>
  );
};

// ─── Campo de "+" que titila (de las referencias) ────────────────────────────
const PlusField: React.FC<{ tone: Tone; k: number; count?: number }> = ({ tone, k, count = 16 }) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const c = palette(tone);
  return (
    <AbsoluteFill style={{ opacity: 0.8 * k }}>
      {Array.from({ length: count }).map((_, i) => {
        const x = random(`plx${i}`) * width;
        const y = random(`ply${i}`) * height;
        const tw = 0.15 + 0.85 * Math.pow(Math.abs(Math.sin(frame * 0.06 + i * 1.3)), 3);
        const s = 8 + random(`pls${i}`) * 8;
        return (
          <div key={i} style={{ position: 'absolute', left: x, top: y, opacity: tw, color: c.lineHot, fontSize: s, fontWeight: 300, transform: 'translate(-50%,-50%)' }}>
            +
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

// ─── Barrido de luz que cruza (loop rápido) ──────────────────────────────────
const ScanBeam: React.FC<{ tone: Tone; k: number }> = ({ tone, k }) => {
  const frame = useCurrentFrame();
  const { width } = useVideoConfig();
  const period = 110;
  const p = (frame % period) / period;
  const x = interpolate(p, [0, 1], [-width * 0.4, width * 1.4]);
  const c = palette(tone);
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: x,
        width: width * 0.35,
        background: `linear-gradient(105deg, transparent, ${c.lineHot}, transparent)`,
        opacity: 0.10 * k,
        transform: 'skewX(-12deg)',
        filter: 'blur(8px)',
      }}
    />
  );
};

// ─── Ticker DM Mono que scrollea (constante) ─────────────────────────────────
const Ticker: React.FC<{ tone: Tone; k: number; yFrac: number; text: string; sp?: number }> = ({ tone, k, yFrac, text, sp = 2 }) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const c = palette(tone);
  const full = (text + '   ').repeat(8);
  const x = -((frame * sp) % (width * 1.2));
  return (
    <div
      style={{
        position: 'absolute',
        top: Math.round(height * yFrac),
        left: x,
        whiteSpace: 'nowrap',
        fontFamily: '"DM Mono", monospace',
        fontSize: 16,
        letterSpacing: '0.34em',
        color: c.mono,
        opacity: 0.7 * k,
      }}
    >
      {full}
    </div>
  );
};

// ─── Brackets de esquina que respiran ────────────────────────────────────────
const CornerBrackets: React.FC<{ tone: Tone; k: number }> = ({ tone, k }) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const c = palette(tone);
  const m = 54;
  const len = 34 + 8 * Math.sin(frame * 0.08);
  const s = { stroke: c.lineHot, strokeWidth: 2, fill: 'none' as const };
  return (
    <svg width={width} height={height} style={{ position: 'absolute', inset: 0, opacity: 0.5 * k }}>
      <path d={`M${m} ${m + len} V${m} H${m + len}`} {...s} />
      <path d={`M${width - m - len} ${m} H${width - m} V${m + len}`} {...s} />
      <path d={`M${m} ${height - m - len} V${height - m} H${m + len}`} {...s} />
      <path d={`M${width - m - len} ${height - m} H${width - m} V${height - m - len}`} {...s} />
    </svg>
  );
};

// ─── Capa compuesta ──────────────────────────────────────────────────────────
export const MotionLayer: React.FC<{ tone?: Tone; intensity?: number; ticker?: string }> = ({
  tone = 'violet',
  intensity = 1,
  ticker = 'CONCEPTO DEVELOPMENT · IA QUE VENDE · 24/7 ·',
}) => {
  const k = intensity;
  return (
    <AbsoluteFill style={{ pointerEvents: 'none' }}>
      <PerspectiveGrid tone={tone} k={k} />
      <FloatingRings tone={tone} k={k} />
      <PlusField tone={tone} k={k} />
      <Particles tone={tone} k={k} />
      <ScanBeam tone={tone} k={k} />
      <Ticker tone={tone} k={k} yFrac={0.93} text={ticker} sp={2} />
      <CornerBrackets tone={tone} k={k} />
    </AbsoluteFill>
  );
};
