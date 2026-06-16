/** GlowOrb — orbe radial difuso, decorativo. Va en un <Layer depth≈0.4>. */
import React from 'react';

export const GlowOrb: React.FC<{
  size: number;
  color: string;
  opacity?: number;
}> = ({ size, color, opacity = 0.5 }) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: '50%',
      background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
      opacity,
      filter: 'blur(40px)',
      pointerEvents: 'none',
    }}
  />
);
