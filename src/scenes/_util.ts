/** Utilidades compartidas por las scenes. */
import { useCurrentFrame, interpolate } from 'remotion';
import { E } from '../engine';

export type Frames = { from: number; to: number };

/**
 * Opacidad de aparición/desaparición de una scene. Las scenes vecinas crossfadean
 * mientras la cámara viaja. `fadeOut=false` para la última scene (cierre).
 */
export const useReveal = (frames: Frames, fade = 20, fadeOut = true): number => {
  const frame = useCurrentFrame();
  const inO = interpolate(frame, [frames.from, frames.from + fade], [0, 1], {
    easing: E.expoOut,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  if (!fadeOut) return inO;
  const outO = interpolate(frame, [frames.to - fade, frames.to], [1, 0], {
    easing: E.smooth,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return Math.min(inO, outO);
};

/** Palabra de un titular kinético. hl = keyword (acento+glow). dim = soporte muted. */
export type Word = { t: string; hl?: boolean; dim?: boolean; br?: boolean };
