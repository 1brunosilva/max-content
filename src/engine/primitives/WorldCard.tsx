/**
 * WorldCard — "chrome" de tarjeta (la unidad que se hace scale-to-fill en los morphs).
 * Brand-agnóstica: recibe colores por props. Tamaño en px de mundo.
 */
import React from 'react';

export const WorldCard: React.FC<{
  w: number;
  h: number;
  radius?: number;
  surface?: string;
  border?: string;
  glow?: string;
  padding?: number;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}> = ({
  w,
  h,
  radius = 28,
  surface = '#111120',
  border = 'rgba(255,255,255,0.08)',
  glow,
  padding = 0,
  children,
  style,
}) => (
  <div
    style={{
      width: w,
      height: h,
      borderRadius: radius,
      background: surface,
      border: `1px solid ${border}`,
      boxShadow: glow ? `0 30px 80px -20px ${glow}, 0 0 0 1px ${border}` : '0 30px 80px -30px rgba(0,0,0,0.6)',
      padding,
      boxSizing: 'border-box',
      overflow: 'hidden',
      ...style,
    }}
  >
    {children}
  </div>
);
