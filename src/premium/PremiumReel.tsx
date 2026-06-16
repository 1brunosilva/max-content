/**
 * PremiumReel — engine de tipografía kinética premium (estilo Google Health/Apple).
 *
 * Fondo Aurora + palabras GIGANTES que entran con eases variados (nunca todas
 * iguales: slam desde abajo, caída desde arriba, scale-pop, blur-in). UNA keyword
 * violeta con orbe difuso detrás. Líneas de acento que barren. Reveal de marca al
 * final. El guion manda; cada beat es una frase corta y potente.
 *
 * Nada reusado de templates viejos.
 */

import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  Easing,
  Audio,
  staticFile,
} from 'remotion';
import '../doc/fonts';
import { Aurora } from './Aurora';

const ARCHIVO = 'Archivo, sans-serif';
const MONO = '"DM Mono", monospace';
const VIOLET = '#a855f7';
const WHITE = '#F2F1F8';

export type Enter = 'up' | 'down' | 'scale' | 'blur';

export type PWord = {
  t: string;
  hl?: boolean;
  dim?: boolean;
  /** salto de línea después de esta palabra */
  br?: boolean;
  enter?: Enter;
};

export type PBeat = {
  from: number;
  dur: number;
  words: PWord[];
  /** tamaño de fuente base (px) */
  size?: number;
  /** acento opcional: línea que barre bajo la frase */
  rule?: boolean;
};

export type PremiumReelProps = {
  beats: PBeat[];
  label?: string;
  cta?: string;
  voiceSrc?: string;
};

const clamp = { extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const };

// ─── Palabra kinética ──────────────────────────────────────────────────────
const KWord: React.FC<{ word: PWord; fps: number; lf: number; idx: number; size: number }> = ({
  word,
  fps,
  lf,
  idx,
  size,
}) => {
  const start = 4 + idx * 4;
  const enter = word.enter ?? (word.hl ? 'scale' : idx % 2 === 0 ? 'up' : 'down');

  const s = spring({
    fps,
    frame: Math.max(0, lf - start),
    config:
      enter === 'scale'
        ? { damping: 11, stiffness: 150, mass: 0.7 } // overshoot para keyword
        : { damping: 18, stiffness: 200, mass: 0.6 },
    durationInFrames: 20,
  });

  // transform por tipo de entrada (eases distintos)
  let translateY = 0;
  let scale = 1;
  let blur = 0;
  if (enter === 'up') translateY = 70 * (1 - s);
  if (enter === 'down') translateY = -70 * (1 - s);
  if (enter === 'scale') {
    scale = interpolate(
      lf,
      [start, start + 8, start + 16, start + 24],
      [0.4, 1.14, 0.97, 1.0],
      { ...clamp, easing: Easing.bezier(0.34, 1.56, 0.64, 1) }
    );
  }
  if (enter === 'blur') blur = 14 * (1 - s);

  const color = word.hl ? VIOLET : word.dim ? 'rgba(242,241,248,0.42)' : WHITE;

  return (
    <span
      style={{
        position: 'relative',
        display: 'inline-block',
        margin: '0 0.16em',
        opacity: s,
        transform: `translateY(${translateY}px) scale(${scale})`,
        filter: blur > 0.2 ? `blur(${blur}px)` : undefined,
        color,
        fontFamily: ARCHIVO,
        fontWeight: word.hl ? 900 : 800,
        fontStretch: '96%',
        fontSize: size,
        lineHeight: 1.0,
        letterSpacing: '-0.035em',
        textShadow: word.hl
          ? '0 0 30px rgba(168,85,247,0.9), 0 0 70px rgba(124,58,237,0.5)'
          : '0 2px 30px rgba(0,0,0,0.35)',
        willChange: 'transform, opacity, filter',
      }}
    >
      {/* orbe difuso detrás de la keyword */}
      {word.hl && (
        <span
          style={{
            position: 'absolute',
            inset: '-40% -20%',
            background: 'radial-gradient(ellipse, rgba(168,85,247,0.45) 0%, transparent 65%)',
            filter: 'blur(26px)',
            zIndex: -1,
            opacity: s,
            transform: `scale(${0.8 + 0.4 * s})`,
          }}
        />
      )}
      {word.t}
    </span>
  );
};

// ─── Engine ────────────────────────────────────────────────────────────────
export const PremiumReel: React.FC<PremiumReelProps> = ({
  beats,
  label = 'CONCEPTO DEVELOPMENT',
  cta,
  voiceSrc,
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const total = beats.reduce((m, b) => Math.max(m, b.from + b.dur), 0);
  const ctaStart = total - 46;

  return (
    <AbsoluteFill style={{ overflow: 'hidden' }}>
      {voiceSrc && <Audio src={staticFile(voiceSrc)} />}

      <Aurora />

      {/* label DM Mono */}
      <div
        style={{
          position: 'absolute',
          top: Math.round(height * 0.065),
          left: 0,
          right: 0,
          textAlign: 'center',
          fontFamily: MONO,
          fontSize: 17,
          letterSpacing: '0.34em',
          color: 'rgba(242,241,248,0.55)',
          opacity: interpolate(frame, [0, 14], [0, 1], clamp),
        }}
      >
        {label}
      </div>

      {/* beats */}
      {beats.map((b, i) => {
        if (frame < b.from || frame >= b.from + b.dur) return null;
        const lf = frame - b.from;
        const size = b.size ?? 116;

        // salida: blur + leve scale-up en los últimos 9 frames
        const exit = interpolate(frame, [b.from + b.dur - 9, b.from + b.dur], [0, 1], clamp);
        const inOp = interpolate(lf, [0, 6], [0, 1], clamp);

        // agrupar palabras en líneas por `br`
        const lines: PWord[][] = [];
        let cur: PWord[] = [];
        b.words.forEach((w) => {
          cur.push(w);
          if (w.br) {
            lines.push(cur);
            cur = [];
          }
        });
        if (cur.length) lines.push(cur);

        let wi = 0;
        // barrido de regla
        const ruleP = spring({ fps, frame: Math.max(0, lf - 6), config: { damping: 20, stiffness: 120 }, durationInFrames: 22 });

        return (
          <AbsoluteFill
            key={i}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: `0 ${Math.round(width * 0.08)}px`,
              textAlign: 'center',
              opacity: inOp * (1 - exit),
              filter: exit > 0.05 ? `blur(${exit * 10}px)` : undefined,
              transform: `scale(${1 + exit * 0.04})`,
            }}
          >
            {lines.map((line, li) => (
              <div key={li} style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'baseline' }}>
                {line.map((w, k) => {
                  const node = <KWord key={k} word={w} fps={fps} lf={lf} idx={wi} size={size} />;
                  wi += 1;
                  return node;
                })}
              </div>
            ))}
            {b.rule && (
              <div
                style={{
                  marginTop: 38,
                  height: 4,
                  width: 220,
                  transformOrigin: 'center',
                  transform: `scaleX(${ruleP})`,
                  background: `linear-gradient(90deg, transparent, ${VIOLET}, transparent)`,
                  borderRadius: 2,
                }}
              />
            )}
          </AbsoluteFill>
        );
      })}

      {/* CTA / reveal de marca */}
      {cta && frame >= ctaStart && (
        <div
          style={{
            position: 'absolute',
            bottom: Math.round(height * 0.12),
            left: 0,
            right: 0,
            textAlign: 'center',
            fontFamily: MONO,
            fontSize: 23,
            letterSpacing: '0.12em',
            color: VIOLET,
            opacity: interpolate(frame, [ctaStart, ctaStart + 16], [0, 1], clamp),
            transform: `translateY(${interpolate(frame, [ctaStart, ctaStart + 16], [14, 0], clamp)}px)`,
          }}
        >
          → {cta}
        </div>
      )}

      {/* borde violeta inferior — firma */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 5,
          background: `linear-gradient(90deg, #7c3aed, ${VIOLET})`,
        }}
      />
    </AbsoluteFill>
  );
};
