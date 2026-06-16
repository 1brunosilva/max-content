/**
 * Curvas de easing premium. Para CÁMARA y MORPHS usar bezier (no spring):
 * la cámara se desliza y se asienta, nunca rebota.
 */
import { Easing } from 'remotion';

export const E = {
  /** ★ El "Apple/iOS": arranca rápido, settle largo. Default para morphs y reveals. */
  expoOut: Easing.bezier(0.16, 1, 0.3, 1),
  /** Ease-in-out simétrico: paneos largos de cámara, velocidad 0 en los keyframes (joins suaves). */
  smooth: Easing.bezier(0.45, 0, 0.55, 1),
  /** Leve anticipación antes de salir. */
  anticipate: Easing.bezier(0.34, 0, 0.2, 1),
  /** Material 3 "emphasized decelerate": entradas con autoridad. */
  emphasized: Easing.bezier(0.2, 0, 0, 1),
  /** Lineal (raro; solo para drift constante). */
  linear: (t: number) => t,
} as const;

export type EaseFn = (t: number) => number;
