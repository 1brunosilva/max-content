/**
 * Camera — el viewport. Provee el CamState por contexto y recorta el frame.
 * NO aplica la transform global: cada <Layer> calcula la suya (para parallax).
 * Mapeo (en Layer): screen = C + zoom·R(rot)·(world − cam).  En world=cam → centro.
 */
import React, { createContext, useContext } from 'react';
import { AbsoluteFill, useVideoConfig } from 'remotion';
import type { CamState, Vec, Viewport } from './types';

type CameraCtx = { cam: CamState; anchor: Vec; viewport: Viewport };

const Ctx = createContext<CameraCtx | null>(null);

export const useCameraContext = (): CameraCtx => {
  const v = useContext(Ctx);
  if (!v) throw new Error('useCameraContext debe usarse dentro de <Camera>');
  return v;
};

export const Camera: React.FC<{
  cam: CamState;
  /** Punto de mundo "fijo" para el parallax (default = primer target). */
  anchor?: Vec;
  background?: string;
  children: React.ReactNode;
}> = ({ cam, anchor, background = 'transparent', children }) => {
  const { width, height } = useVideoConfig();
  const a = anchor ?? { x: cam.x, y: cam.y };
  return (
    <AbsoluteFill style={{ overflow: 'hidden', background }}>
      <Ctx.Provider value={{ cam, anchor: a, viewport: { w: width, h: height } }}>
        {children}
      </Ctx.Provider>
    </AbsoluteFill>
  );
};
