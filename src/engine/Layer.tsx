/**
 * Layer — un plano de profundidad. Aplica la transform de cámara escalada por `depth`
 * para lograr PARALLAX. depth=1 = plano focal (se mueve con la cámara al 100%).
 * depth<1 = fondo (se mueve menos). depth>1 = primer plano (se mueve más, "volar a través").
 *
 * Guía: fondo 0.12–0.2 · glows/orbs 0.4 · acción/UIs/texto 1 · partículas frente 1.4–1.6.
 *
 * Los hijos se posicionan en coordenadas de MUNDO (usá <World x y>). El wrapper tiene
 * tamaño 0 con transformOrigin 0 0: el origen del wrapper == mundo (0,0).
 */
import React from 'react';
import { useCameraContext } from './Camera';

export const Layer: React.FC<{ depth?: number; children: React.ReactNode }> = ({
  depth = 1,
  children,
}) => {
  const { cam, anchor, viewport } = useCameraContext();

  // Cámara efectiva de este plano (parallax respecto del anchor).
  const camX = anchor.x + depth * (cam.x - anchor.x);
  const camY = anchor.y + depth * (cam.y - anchor.y);
  const zoom = 1 + (cam.zoom - 1) * depth;
  const rot = cam.rotate * depth;

  const transform = `translate(${viewport.w / 2}px, ${viewport.h / 2}px) scale(${zoom}) rotate(${rot}deg) translate(${-camX}px, ${-camY}px)`;

  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        width: 0,
        height: 0,
        transformOrigin: '0 0',
        transform,
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  );
};
