/**
 * Chrome — elementos de PANTALLA FIJA (no se mueven con la cámara). Van como hijos
 * directos de <Camera> (no dentro de <Layer>). Respetan las safe zones 9:16.
 *  - FullBg: fondo con profundidad (nunca plano).
 *  - UIChrome: label DM Mono (top-left), barra de marca (bottom 6px), ícono (bottom-left).
 */
import React from 'react';
import { AbsoluteFill, Img, staticFile } from 'remotion';
import { useBrand } from '../brand';

export const FullBg: React.FC = () => {
  const b = useBrand();
  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(120% 80% at 50% 18%, ${b.surface} 0%, ${b.ink} 55%, #000 100%)`,
      }}
    />
  );
};

export const UIChrome: React.FC<{ label?: string }> = ({ label }) => {
  const b = useBrand();
  const text = label ?? b.name.toUpperCase();
  return (
    <AbsoluteFill style={{ pointerEvents: 'none' }}>
      {/* label top-left (dentro del safe area superior 160px) */}
      <div
        style={{
          position: 'absolute',
          top: 96,
          left: 64,
          fontFamily: b.font.mono,
          fontSize: 22,
          letterSpacing: '0.22em',
          color: b.textLo,
          display: 'flex',
          alignItems: 'center',
          gap: 14,
        }}
      >
        <span style={{ width: 26, height: 2, background: b.primary }} />
        {text}
      </div>

      {/* ícono bottom-left (safe area inferior) */}
      <Img
        src={staticFile(b.logo)}
        style={{ position: 'absolute', bottom: 60, left: 60, width: 38, height: 38, opacity: 0.55 }}
      />

      {/* barra de marca (firma) */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: 6,
          background: b.accentGradient,
        }}
      />
    </AbsoluteFill>
  );
};
