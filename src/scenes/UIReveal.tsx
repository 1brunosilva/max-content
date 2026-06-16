/**
 * UIReveal — una card compacta se EXPANDE y revela una UI (dashboard). El "alivio":
 * tareas que antes eran caos ahora resueltas (checks en acento). Usa useBBoxMorph
 * para la caja + crossfade de contenido compacto→expandido.
 */
import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import { World, useBBoxMorph, useCrossfade, E } from '../engine';
import { useBrand } from '../brand';
import { useReveal, type Frames } from './_util';

export const UIReveal: React.FC<{
  at: { x: number; y: number };
  frames: Frames;
  compactLabel: string;
  title: string;
  rows: string[];
  expandAt?: number; // frames desde frames.from donde arranca la expansión
}> = ({ at, frames, compactLabel, title, rows, expandAt = 14 }) => {
  const frame = useCurrentFrame();
  const b = useBrand();
  const reveal = useReveal(frames);

  const exFrom = frames.from + expandAt;
  const exTo = exFrom + 34;
  const box = useBBoxMorph(
    { x: 0, y: 0, w: 420, h: 120, radius: 26 },
    { x: 0, y: 0, w: 720, h: 600, radius: 34 },
    { from: exFrom, to: exTo },
  );
  const { inOpacity, outOpacity } = useCrossfade({ from: exFrom, to: exTo });

  return (
    <World x={at.x} y={at.y} opacity={reveal}>
      <div
        style={{
          width: box.w,
          height: box.h,
          borderRadius: box.radius,
          background: b.surface,
          border: `1px solid ${b.border}`,
          boxShadow: `0 40px 100px -30px ${b.glow}`,
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* compacto (notificación) */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            gap: 18,
            padding: '0 30px',
            opacity: outOpacity,
          }}
        >
          <span style={{ width: 14, height: 14, borderRadius: '50%', background: b.primary, boxShadow: `0 0 18px ${b.glow}`, flexShrink: 0 }} />
          <span style={{ fontFamily: b.font.display, fontWeight: 600, fontSize: 30, color: b.textHi }}>
            {compactLabel}
          </span>
        </div>

        {/* expandido (dashboard de tareas resueltas) */}
        <div style={{ position: 'absolute', inset: 0, padding: 44, opacity: inOpacity, display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 30 }}>
            <span style={{ fontFamily: b.font.display, fontWeight: 700, fontSize: 34, color: b.textHi }}>{title}</span>
            <span style={{ fontFamily: b.font.mono, fontSize: 18, letterSpacing: '0.08em', color: b.primary, textTransform: 'uppercase' }}>
              MAX · live
            </span>
          </div>
          {rows.map((r, i) => {
            const t = interpolate(frame, [exTo + i * 8, exTo + i * 8 + 16], [0, 1], {
              easing: E.expoOut,
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });
            return (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 20,
                  padding: '20px 0',
                  borderBottom: `1px solid ${b.border}`,
                  opacity: t,
                  transform: `translateX(${(1 - t) * 24}px)`,
                }}
              >
                <span
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: 10,
                    background: b.accentGradient,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontSize: 20,
                    flexShrink: 0,
                  }}
                >
                  ✓
                </span>
                <span style={{ fontFamily: b.font.display, fontWeight: 500, fontSize: 28, color: b.textHi }}>{r}</span>
              </div>
            );
          })}
        </div>
      </div>
    </World>
  );
};
