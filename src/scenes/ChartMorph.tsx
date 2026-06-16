/**
 * ChartMorph — una línea "plana/estancada" se TRANSFORMA en una curva de crecimiento
 * (flubber path morph). Refuerza el resultado: con el sistema, la curva sube.
 */
import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import { World, useSvgMorph, E } from '../engine';
import { useBrand } from '../brand';
import { useReveal, type Frames } from './_util';

// dos paths con misma cantidad de puntos → morph suave.
const FLAT = 'M40,300 L160,296 L280,302 L400,298 L520,300 L640,296';
const RISE = 'M40,330 L160,300 L280,250 L400,210 L520,140 L640,70';

export const ChartMorph: React.FC<{
  at: { x: number; y: number };
  frames: Frames;
  title?: string;
  morphAt?: number;
}> = ({ at, frames, title = 'Oportunidades atendidas', morphAt = 18 }) => {
  const frame = useCurrentFrame();
  const b = useBrand();
  const reveal = useReveal(frames);
  const mFrom = frames.from + morphAt;
  const mTo = mFrom + 40;
  const d = useSvgMorph(FLAT, RISE, { from: mFrom, to: mTo }, E.expoOut);
  const dotT = interpolate(frame, [mFrom, mTo], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const dotX = 40 + dotT * 600;
  const dotY = 300 - dotT * 230;

  return (
    <World x={at.x} y={at.y} opacity={reveal}>
      <div
        style={{
          width: 760,
          padding: 48,
          borderRadius: 34,
          background: b.surface,
          border: `1px solid ${b.border}`,
          boxShadow: `0 40px 100px -30px ${b.glow}`,
        }}
      >
        <div style={{ fontFamily: b.font.mono, fontSize: 22, letterSpacing: '0.06em', textTransform: 'uppercase', color: b.textLo, marginBottom: 20 }}>
          {title}
        </div>
        <svg width={680} height={360} style={{ display: 'block', overflow: 'visible' }}>
          <defs>
            <linearGradient id="cm-line" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor={b.primary} />
              <stop offset="100%" stopColor={b.primaryLight} />
            </linearGradient>
          </defs>
          <path d={d} fill="none" stroke="url(#cm-line)" strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />
          <circle cx={dotX} cy={dotY} r={9} fill={b.primaryLight} style={{ filter: `drop-shadow(0 0 14px ${b.glow})` }} />
        </svg>
      </div>
    </World>
  );
};
