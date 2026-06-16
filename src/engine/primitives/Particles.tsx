/**
 * Particles — puntos que derivan en una región de mundo (w×h centrada en el origen
 * del <World>). Determinista (random seedeado). Va en <Layer depth 1.3–1.6> para
 * "volar a través" o depth≈0.4 como polvo de fondo.
 */
import React from 'react';
import { useCurrentFrame, random } from 'remotion';

export const Particles: React.FC<{
  w: number;
  h: number;
  count?: number;
  color?: string;
  seed?: string;
  speed?: number;
}> = ({ w, h, count = 50, color = 'rgba(233,213,255,0.7)', seed = 'p', speed = 1 }) => {
  const frame = useCurrentFrame();
  return (
    <div style={{ position: 'absolute', left: -w / 2, top: -h / 2, width: w, height: h }}>
      {Array.from({ length: count }).map((_, i) => {
        const bx = random(`${seed}x${i}`) * w;
        const by = random(`${seed}y${i}`) * h;
        const sp = (0.3 + random(`${seed}s${i}`) * 1.1) * speed;
        const r = 1.4 + random(`${seed}r${i}`) * 2.8;
        const y = ((by - frame * sp * 1.4) % h + h) % h;
        const tw = 0.35 + 0.65 * Math.abs(Math.sin(frame * 0.05 + i));
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: bx + Math.sin(frame * 0.02 + i) * 14,
              top: y,
              width: r,
              height: r,
              borderRadius: '50%',
              background: color,
              opacity: tw,
              boxShadow: `0 0 ${r * 3}px ${color}`,
            }}
          />
        );
      })}
    </div>
  );
};
