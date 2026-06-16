/**
 * ProductHero — la capa foto-real: MAX (o el producto del cliente) entra como asset
 * de Higgsfield con glow + ken-burns sutil, y un titular corto en el espacio negativo.
 * Sin brand.hero → placeholder (orbe + ícono) para clientes sin personaje.
 */
import React from 'react';
import { useCurrentFrame, useVideoConfig, Img, staticFile, interpolate } from 'remotion';
import { World, GlowOrb, springPreset, S, E } from '../engine';
import { useBrand } from '../brand';
import { useReveal, type Frames, type Word } from './_util';

export const ProductHero: React.FC<{
  at: { x: number; y: number };
  frames: Frames;
  headline: Word[];
  imgSize?: number;
  startDelay?: number;
}> = ({ at, frames, headline, imgSize = 760, startDelay = 6 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const b = useBrand();
  const reveal = useReveal(frames);
  const enter = springPreset(frame, fps, S.settle, frames.from + startDelay);
  const kb = interpolate(frame, [frames.from, frames.to], [1.0, 1.06], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <World x={at.x} y={at.y} opacity={reveal}>
      <div style={{ position: 'relative', width: imgSize + 200, height: imgSize, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {/* glow detrás */}
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <GlowOrb size={imgSize * 1.3} color={b.glow} opacity={0.6 * enter} />
        </div>

        {/* hero foto-real o placeholder */}
        <div
          style={{
            position: 'relative',
            opacity: enter,
            transform: `scale(${(0.94 + enter * 0.06) * kb})`,
          }}
        >
          {b.hero ? (
            <Img
              src={staticFile(b.hero.src)}
              style={{ width: imgSize, height: imgSize, objectFit: 'contain', filter: 'drop-shadow(0 40px 80px rgba(0,0,0,0.6))' }}
            />
          ) : (
            <div
              style={{
                width: imgSize * 0.7,
                height: imgSize * 0.7,
                borderRadius: 48,
                background: b.accentGradient,
                boxShadow: `0 40px 100px -20px ${b.glow}`,
              }}
            />
          )}
        </div>

        {/* titular en el espacio negativo (izquierda-abajo) */}
        <div style={{ position: 'absolute', left: -40, bottom: -40, width: 520 }}>
          {headline.map((w, i) => {
            const t = interpolate(frame, [frames.from + 16 + i * 5, frames.from + 16 + i * 5 + 16], [0, 1], {
              easing: E.expoOut,
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });
            return (
              <span
                key={i}
                style={{
                  display: 'inline',
                  fontFamily: b.font.display,
                  fontWeight: 800,
                  fontSize: 76,
                  letterSpacing: '-0.035em',
                  color: w.hl ? b.primary : b.textHi,
                  textShadow: w.hl ? `0 0 38px ${b.glow}` : '0 2px 20px rgba(0,0,0,0.5)',
                  opacity: t,
                }}
              >
                {w.t}{' '}
              </span>
            );
          })}
        </div>
      </div>
    </World>
  );
};
