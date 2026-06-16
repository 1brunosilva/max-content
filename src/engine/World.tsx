/**
 * World — posiciona a sus hijos en coordenadas de MUNDO, centrados en (x,y).
 * Vive dentro de un <Layer>. Tamaño opcional (para cajas con dimensión conocida,
 * útil en el morph scale-to-fill). Sin w/h, sólo ancla el centro.
 */
import React from 'react';

export const World: React.FC<{
  x: number;
  y: number;
  w?: number;
  h?: number;
  rotate?: number;
  opacity?: number;
  z?: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ x, y, w, h, rotate = 0, opacity, z, children, style }) => (
  <div
    style={{
      position: 'absolute',
      left: x,
      top: y,
      width: w,
      height: h,
      transform: `translate(-50%, -50%) rotate(${rotate}deg)`,
      transformOrigin: 'center center',
      opacity,
      zIndex: z,
      ...style,
    }}
  >
    {children}
  </div>
);
