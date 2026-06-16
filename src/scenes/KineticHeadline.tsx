/**
 * KineticHeadline — titular kinético premium. Cada palabra entra con blur→clear +
 * leve subida, settle suave (no el slam viejo). Keywords (hl) en acento + glow.
 * Es scene (at/frames) y a la vez lo usan otras scenes para su texto.
 */
import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import { World, E } from '../engine';
import { useBrand } from '../brand';
import { useReveal, type Frames, type Word } from './_util';

export const KineticHeadline: React.FC<{
  at: { x: number; y: number };
  frames: Frames;
  words: Word[];
  size?: number;
  maxWidth?: number;
  startDelay?: number;
  stagger?: number;
  align?: 'left' | 'center';
  fadeOut?: boolean;
}> = ({
  at,
  frames,
  words,
  size = 92,
  maxWidth = 820,
  startDelay = 0,
  stagger = 5,
  align = 'left',
  fadeOut = true,
}) => {
  const frame = useCurrentFrame();
  const b = useBrand();
  const reveal = useReveal(frames, 20, fadeOut);

  return (
    <World x={at.x} y={at.y} w={maxWidth} opacity={reveal}>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: `${size * 0.16}px ${size * 0.26}px`,
          justifyContent: align === 'center' ? 'center' : 'flex-start',
          fontFamily: b.font.display,
          fontWeight: 800,
          fontSize: size,
          lineHeight: 1.0,
          letterSpacing: '-0.035em',
          width: maxWidth,
        }}
      >
        {words.map((w, i) => {
          const local = frame - frames.from - startDelay - i * stagger;
          const p = interpolate(local, [0, 18], [0, 1], {
            easing: E.expoOut,
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
          const y = (1 - p) * 26;
          const blur = (1 - p) * 10;
          const color = w.hl ? b.primary : w.dim ? b.textLo : b.textHi;
          return (
            <React.Fragment key={i}>
              <span
                style={{
                  display: 'inline-block',
                  transform: `translateY(${y}px)`,
                  filter: blur > 0.3 ? `blur(${blur}px)` : 'none',
                  opacity: p,
                  color,
                  textShadow: w.hl ? `0 0 38px ${b.glow}` : 'none',
                  whiteSpace: 'pre',
                }}
              >
                {w.t}
              </span>
              {w.br ? <span style={{ flexBasis: '100%', height: 0 }} /> : null}
            </React.Fragment>
          );
        })}
      </div>
    </World>
  );
};
