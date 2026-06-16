/**
 * Aurora — fondo premium animado (estilo Google Health / Apple), marca Concepto.
 *
 * NO son "óvalos": son varios blobs MUY grandes y MUY difuminados que se mezclan
 * (blend screen) y derivan lento → luz de color suave, tipo mesh/aurora. Encima,
 * grano (feTurbulence) para matar banding y dar textura premium, y vignette sutil.
 *
 * Paleta marca: indigo profundo → violeta #7c3aed → violeta claro #a855f7 → magenta.
 * Todo se mueve con el frame (sin/cos desfasados) — nunca estático.
 */

import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';

type Blob = {
  color: string;
  /** posición base en % */
  x: number;
  y: number;
  /** radio en % del ancho */
  r: number;
  /** velocidad/ fase de deriva */
  phase: number;
  amp: number;
};

const BLOBS: Blob[] = [
  { color: 'rgba(124,58,237,0.55)', x: 28, y: 32, r: 70, phase: 0.0, amp: 9 },
  { color: 'rgba(168,85,247,0.50)', x: 74, y: 40, r: 64, phase: 1.7, amp: 11 },
  { color: 'rgba(91,33,182,0.55)', x: 50, y: 74, r: 78, phase: 3.1, amp: 8 },
  { color: 'rgba(217,70,239,0.34)', x: 80, y: 78, r: 52, phase: 4.4, amp: 13 },
  { color: 'rgba(56,38,120,0.50)', x: 18, y: 70, r: 60, phase: 5.6, amp: 10 },
];

export const Aurora: React.FC<{ intensity?: number }> = ({ intensity = 1 }) => {
  const frame = useCurrentFrame();
  const { width, height, durationInFrames } = useVideoConfig();
  const t = frame / 30;

  // entrada suave
  const fadeIn = interpolate(frame, [0, 18], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ backgroundColor: '#0a0712', overflow: 'hidden' }}>
      {/* blobs difuminados que derivan y respiran */}
      <AbsoluteFill style={{ filter: 'blur(70px)', opacity: 0.9 * fadeIn * intensity }}>
        {BLOBS.map((b, i) => {
          const dx = Math.sin(t * 0.18 + b.phase) * b.amp;
          const dy = Math.cos(t * 0.14 + b.phase * 1.3) * b.amp * 0.8;
          const scale = 1 + 0.08 * Math.sin(t * 0.22 + b.phase);
          const size = (b.r / 100) * width * 2;
          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: `${b.x + dx}%`,
                top: `${b.y + dy}%`,
                width: size,
                height: size,
                marginLeft: -size / 2,
                marginTop: -size / 2,
                borderRadius: '50%',
                background: `radial-gradient(circle, ${b.color} 0%, transparent 62%)`,
                mixBlendMode: 'screen',
                transform: `scale(${scale})`,
              }}
            />
          );
        })}
      </AbsoluteFill>

      {/* brillo central tenue para foco */}
      <AbsoluteFill
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 44%, rgba(168,85,247,0.12) 0%, transparent 60%)',
        }}
      />

      {/* grano premium (mata banding) */}
      <svg width={width} height={height} style={{ position: 'absolute', inset: 0, opacity: 0.05, mixBlendMode: 'overlay' }}>
        <filter id="auroraNoise">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#auroraNoise)" />
      </svg>

      {/* vignette sutil */}
      <AbsoluteFill
        style={{
          background:
            'radial-gradient(ellipse 100% 100% at 50% 50%, transparent 52%, rgba(0,0,0,0.5) 100%)',
        }}
      />

      {/* fade-out global al final (limpio) */}
      <AbsoluteFill
        style={{
          background: '#0a0712',
          opacity: interpolate(frame, [durationInFrames - 10, durationInFrames], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
        }}
      />
    </AbsoluteFill>
  );
};
