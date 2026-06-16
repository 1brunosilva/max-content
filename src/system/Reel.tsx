/**
 * Reel — builder declarativo. Un video = una lista de escenas (SceneSpec[]).
 * Auto-calcula tiempos y arma las transiciones (push-through con motion blur).
 * Cambiar la lista = otro video. Ver VIDEO-SYSTEM.md.
 */
import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { SCENES } from './scenes';

export type SceneSpec = { type: keyof typeof SCENES | string; props?: Record<string, unknown>; dur?: number };

const ease = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;
const expoOut = (t: number) => 1 - Math.pow(1 - t, 4);
const inOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

export const DEFAULT_DUR = 84; // ~2.8s por escena (ritmo aprobado)
export const OVERLAP = 16;

/** Frames donde arranca cada escena (solapadas). */
export const reelStarts = (scenes: SceneSpec[]): number[] => {
  const out: number[] = [];
  let cur = 0;
  for (const sc of scenes) {
    out.push(cur);
    cur += (sc.dur ?? DEFAULT_DUR) - OVERLAP;
  }
  return out;
};

/** Duración total del reel (frames). */
export const reelDuration = (scenes: SceneSpec[]): number => {
  const starts = reelStarts(scenes);
  const last = scenes.length - 1;
  return starts[last] + (scenes[last]?.dur ?? DEFAULT_DUR) + 30;
};

const Push: React.FC<{ s: number; e: number; last?: boolean; children: React.ReactNode }> = ({ s, e, last, children }) => {
  const f = useCurrentFrame();
  const T = 14;
  const inO = interpolate(f, [s, s + 12], [0, 1], ease);
  const op = Math.min(inO, last ? 1 : interpolate(f, [e, e + T], [1, 0], ease));
  let scale: number, blur: number, rotX: number;
  if (f < s + 12) { const t = interpolate(f, [s, s + 12], [0, 1], { ...ease, easing: expoOut }); scale = 0.7 + t * 0.3 + (1 - t) * t * 0.04; blur = (1 - t) * 7; rotX = (1 - t) * 6; }
  else if (f < e || last) { scale = interpolate(f, [s + 12, Math.max(e, s + 13)], [1, 1.04], ease); blur = 0; rotX = 0; }
  else { const t = interpolate(f, [e, e + T], [0, 1], { ...ease, easing: inOut }); scale = 1.04 + t * 0.9; blur = t * 10; rotX = -t * 4; }
  return <AbsoluteFill style={{ opacity: op, transform: `perspective(1600px) rotateX(${rotX}deg) scale(${scale})`, transformOrigin: '50% 52%', filter: blur > 0.2 ? `blur(${blur}px)` : 'none', backfaceVisibility: 'hidden' }}>{children}</AbsoluteFill>;
};

export const Reel: React.FC<{ scenes: SceneSpec[] }> = ({ scenes }) => {
  const starts = reelStarts(scenes);
  return (
    <AbsoluteFill style={{ background: '#000' }}>
      {scenes.map((sc, i) => {
        const s = starts[i];
        const e = s + (sc.dur ?? DEFAULT_DUR);
        const Comp = SCENES[sc.type as string];
        if (!Comp) return null;
        return <Push key={i} s={s} e={e} last={i === scenes.length - 1}><Comp s={s} {...(sc.props ?? {})} /></Push>;
      })}
    </AbsoluteFill>
  );
};
