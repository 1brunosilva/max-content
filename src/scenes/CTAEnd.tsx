/**
 * CTAEnd — cierre. Logo (ícono PNG) + nombre + tagline + pill de CTA con el
 * gradiente de la marca. Última scene: no hace fade-out.
 */
import React from 'react';
import { useCurrentFrame, useVideoConfig, Img, staticFile } from 'remotion';
import { World, GlowOrb, springPreset, S } from '../engine';
import { useBrand } from '../brand';
import { useReveal, type Frames } from './_util';

export const CTAEnd: React.FC<{
  at: { x: number; y: number };
  frames: Frames;
}> = ({ at, frames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const b = useBrand();
  const reveal = useReveal(frames, 22, false);
  const logoIn = springPreset(frame, fps, S.settle, frames.from + 4);
  const pillIn = springPreset(frame, fps, S.gentle, frames.from + 26);

  return (
    <World x={at.x} y={at.y} opacity={reveal}>
      <div style={{ position: 'relative', width: 900, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <div style={{ position: 'absolute', top: -120, left: '50%', transform: 'translateX(-50%)' }}>
          <GlowOrb size={620} color={b.glow} opacity={0.5} />
        </div>
        <Img
          src={staticFile(b.logo)}
          style={{ width: 110, height: 110, opacity: logoIn, transform: `scale(${0.8 + logoIn * 0.2})`, marginBottom: 28 }}
        />
        <div style={{ fontFamily: b.font.display, fontWeight: 800, fontSize: 72, letterSpacing: '-0.035em', color: b.textHi, opacity: logoIn }}>
          {b.name}
        </div>
        {b.tagline ? (
          <div style={{ fontFamily: b.font.display, fontWeight: 400, fontSize: 36, color: b.textLo, marginTop: 12, opacity: logoIn }}>
            {b.tagline}
          </div>
        ) : null}
        <div
          style={{
            marginTop: 56,
            padding: '26px 56px',
            borderRadius: 100,
            background: b.accentGradient,
            boxShadow: `0 20px 60px -10px ${b.glow}`,
            fontFamily: b.font.display,
            fontWeight: 700,
            fontSize: 36,
            color: '#fff',
            opacity: pillIn,
            transform: `scale(${0.9 + pillIn * 0.1})`,
          }}
        >
          Hablemos de tu proyecto →
        </div>
        {b.cta ? (
          <div style={{ fontFamily: b.font.mono, fontSize: 24, letterSpacing: '0.1em', color: b.textLo, marginTop: 28, opacity: pillIn }}>
            {b.cta}
          </div>
        ) : null}
      </div>
    </World>
  );
};
