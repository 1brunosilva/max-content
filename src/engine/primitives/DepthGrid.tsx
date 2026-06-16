/**
 * DepthGrid — grilla de mundo tenue (profundidad/atmósfera). Va en <Layer depth≈0.15>.
 * Determinista. Líneas que se desvanecen hacia los bordes. Tamaño en px de mundo.
 */
import React from 'react';
import { useCurrentFrame } from 'remotion';

export const DepthGrid: React.FC<{
  w: number;
  h: number;
  cell?: number;
  color?: string;
  opacity?: number;
  /** scroll vertical suave (px/frame) */
  speed?: number;
}> = ({ w, h, cell = 120, color = 'rgba(168,85,247,0.14)', opacity = 1, speed = 0.6 }) => {
  const frame = useCurrentFrame();
  const offset = (frame * speed) % cell;
  const cols = Math.ceil(w / cell) + 1;
  const rows = Math.ceil(h / cell) + 2;
  return (
    <svg width={w} height={h} style={{ display: 'block', opacity, overflow: 'visible' }}>
      <defs>
        <radialGradient id="dg-fade" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#fff" stopOpacity="1" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <mask id="dg-mask">
          <rect width={w} height={h} fill="url(#dg-fade)" />
        </mask>
      </defs>
      <g mask="url(#dg-mask)">
        {Array.from({ length: cols }).map((_, i) => (
          <line key={`c${i}`} x1={i * cell} y1={0} x2={i * cell} y2={h} stroke={color} strokeWidth={1} />
        ))}
        {Array.from({ length: rows }).map((_, i) => {
          const y = i * cell - cell + offset;
          return <line key={`r${i}`} x1={0} y1={y} x2={w} y2={y} stroke={color} strokeWidth={1} />;
        })}
      </g>
    </svg>
  );
};
