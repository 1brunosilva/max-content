/**
 * useMorph — las tres técnicas de transformación del sistema:
 *   1. useBBoxMorph    → una card crece/cambia su caja {x,y,w,h,radius} (card → fullscreen).
 *   2. useCrossfade    → el contenido interno reemplaza al externo (la card "era" la próxima escena).
 *   3. useSvgMorph     → un contorno SVG se transforma en otro (gráfico → forma) vía flubber.
 *
 * Y `frameBBox`: helper PURO (no hook) para AUTORÍA de cam paths — calcula el
 * {x,y,zoom} de cámara que encuadra/llena una caja de mundo en el frame.
 */
import { useMemo } from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import { interpolate as flubberInterpolate } from 'flubber';
import { E, type EaseFn } from './easings';
import { progress } from './timing';
import type { BBox, Viewport } from './types';

type FrameRange = { from: number; to: number };

const lerp = (frame: number, r: FrameRange, a: number, b: number, easing: EaseFn) =>
  interpolate(frame, [r.from, r.to], [a, b], {
    easing,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

/** Interpola una caja de `from` a `to` en el rango de frames dado. */
export const useBBoxMorph = (
  from: BBox,
  to: BBox,
  range: FrameRange,
  easing: EaseFn = E.expoOut,
): Required<BBox> => {
  const frame = useCurrentFrame();
  return {
    x: lerp(frame, range, from.x, to.x, easing),
    y: lerp(frame, range, from.y, to.y, easing),
    w: lerp(frame, range, from.w, to.w, easing),
    h: lerp(frame, range, from.h, to.h, easing),
    radius: lerp(frame, range, from.radius ?? 0, to.radius ?? 0, easing),
  };
};

/** Crossfade: el contenido nuevo entra mientras el viejo sale, en el rango dado. */
export const useCrossfade = (
  range: FrameRange,
  easing: EaseFn = E.expoOut,
): { inOpacity: number; outOpacity: number } => {
  const frame = useCurrentFrame();
  const t = lerp(frame, range, 0, 1, easing);
  return { inOpacity: t, outOpacity: 1 - t };
};

/** Morphing de contorno SVG (flubber). El interpolador se construye UNA vez (useMemo). */
export const useSvgMorph = (
  pathA: string,
  pathB: string,
  range: FrameRange,
  easing: EaseFn = E.expoOut,
): string => {
  const frame = useCurrentFrame();
  const interpolator = useMemo(
    () => flubberInterpolate(pathA, pathB, { maxSegmentLength: 8 }),
    [pathA, pathB],
  );
  const t = progress(frame, range.from, range.to);
  return interpolator(easing(t));
};

/**
 * frameBBox — PURO. Devuelve la cámara que encuadra una caja de mundo.
 * fit='fill' → la caja CUBRE el frame (para scale-to-fill morph).
 * fit='contain' → la caja ENTRA completa (para "mostrar" un elemento).
 * `pad` reduce (contain) o no afecta (fill) — fracción 0..1.
 */
export const frameBBox = (
  box: BBox,
  vp: Viewport,
  fit: 'fill' | 'contain' = 'fill',
  pad = 0,
): { x: number; y: number; zoom: number } => {
  const zx = vp.w / box.w;
  const zy = vp.h / box.h;
  const base = fit === 'fill' ? Math.max(zx, zy) : Math.min(zx, zy);
  const zoom = fit === 'contain' ? base * (1 - pad) : base;
  return { x: box.x, y: box.y, zoom };
};
