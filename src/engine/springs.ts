/**
 * Presets de spring NOMBRADOS — solo para elementos que LLEGAN y "asientan"
 * (entrada de cards, números, keywords). NUNCA para la cámara (mete micro-rebotes
 * que se leen como temblor; la cámara usa bezier de easings.ts).
 */
import { spring, type SpringConfig } from 'remotion';

export const S = {
  /** Settle suave, SIN overshoot — entrada de cards, paneles, UIs. */
  settle: { damping: 26, stiffness: 120, mass: 1 } as Partial<SpringConfig>,
  /** Overshoot mínimo y elegante — números, keywords (no el 1.56 bouncy viejo). */
  gentle: { damping: 18, stiffness: 140, mass: 1 } as Partial<SpringConfig>,
  /** El snap punchy del sistema viejo — solo para acentos de marketing puntuales. */
  snap: { damping: 12, stiffness: 180, mass: 0.6 } as Partial<SpringConfig>,
} as const;

/** Helper PURO (no es hook): spring 0→1 con preset nombrado y delay opcional (frames). */
export const springPreset = (
  frame: number,
  fps: number,
  preset: Partial<SpringConfig>,
  delay = 0,
): number =>
  spring({ frame: frame - delay, fps, config: preset, durationInFrames: undefined });
