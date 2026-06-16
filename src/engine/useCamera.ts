/**
 * useCamera — convierte un CamKey[] en un CamState CONTINUO para el frame actual.
 *
 * Clave del sistema: como es UNA función del frame (interpolación multipunto),
 * la cámara NUNCA salta. No hay <Sequence from=> que corte. El easing por defecto
 * es `smooth` (ease-in-out) → velocidad 0 en cada keyframe = joins sin tirones.
 *
 * Opcional `drift`: micro-oscilación permanente para que la cámara nunca quede
 * 100% quieta (sensación viva, premium). Muy chico por defecto.
 */
import { useCurrentFrame, interpolate } from 'remotion';
import { E, type EaseFn } from './easings';
import type { CamKey, CamState } from './types';

export type DriftConfig = { ampX: number; ampY: number; speedX: number; speedY: number };

const NO_DRIFT: DriftConfig = { ampX: 0, ampY: 0, speedX: 0, speedY: 0 };

export const useCamera = (
  path: CamKey[],
  opts?: { easing?: EaseFn; drift?: Partial<DriftConfig> },
): CamState => {
  const frame = useCurrentFrame();
  const easing = opts?.easing ?? E.smooth;
  const drift = { ...NO_DRIFT, ...(opts?.drift ?? {}) };

  const frames = path.map((k) => k.frame);
  const opt = { easing, extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const };

  const x = interpolate(frame, frames, path.map((k) => k.x), opt);
  const y = interpolate(frame, frames, path.map((k) => k.y), opt);
  const zoom = interpolate(frame, frames, path.map((k) => k.zoom), opt);
  const rotate = interpolate(frame, frames, path.map((k) => k.rotate ?? 0), opt);

  return {
    x: x + Math.sin(frame * drift.speedX) * drift.ampX,
    y: y + Math.cos(frame * drift.speedY) * drift.ampY,
    zoom,
    rotate,
  };
};

/** Drift sutil recomendado para piezas premium (apenas perceptible). */
export const SUBTLE_DRIFT: DriftConfig = { ampX: 7, ampY: 5, speedX: 0.018, speedY: 0.022 };
