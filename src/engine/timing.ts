/**
 * Helpers de tiempo. Regla del motor continuo:
 *  - Beats de 3–6s (NO 1.5s). El hook va DENTRO del primer beat (antes de 1.5s).
 *  - Transiciones SOLAPADAS 20–40 frames (cero frames vacíos entre scenes).
 *  - 30fps base (no cambiar).
 */

export const FPS = 30;

/** Segundos → frames. */
export const f = (seconds: number): number => Math.round(seconds * FPS);

export type Range = { from: number; to: number; dur: number };

/**
 * Construye beats consecutivos SOLAPADOS a partir de duraciones (en frames).
 * `overlap` = cuántos frames se pisan dos beats vecinos (default 28 ≈ 0.93s).
 * Devuelve rangos {from,to} en el timeline global.
 */
export const beats = (durations: number[], overlap = 28, start = 0): Range[] => {
  const out: Range[] = [];
  let cursor = start;
  for (let i = 0; i < durations.length; i++) {
    const dur = durations[i];
    const from = i === 0 ? cursor : cursor - overlap;
    const to = from + dur;
    out.push({ from, to, dur });
    cursor = to;
  }
  return out;
};

/** Duración total de una lista de rangos (último `to`). */
export const totalFrames = (ranges: Range[]): number =>
  ranges.length ? ranges[ranges.length - 1].to : 0;

/** Progreso 0..1 dentro de un rango para el frame dado (clamp). */
export const progress = (frame: number, from: number, to: number): number => {
  if (to <= from) return frame >= to ? 1 : 0;
  const p = (frame - from) / (to - from);
  return p < 0 ? 0 : p > 1 ? 1 : p;
};
