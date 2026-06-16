/**
 * DocReel — Engine de video estilo "doc" (The Conversion Doc), marca Concepto.
 *
 * Es un SISTEMA, no un video: recibe un guion (`beats`) y lo monta.
 * Cada beat = un trozo de narración + una ilustración line-art que se dibuja
 * sola + (opcional) un contador. El guion manda; el visual acompaña.
 *
 * Look: fondo negro con profundidad (no plano), trazo blanco con glow,
 * UNA palabra keyword en violeta, tipografía Archivo + DM Mono, borde violeta
 * inferior (firma de marca). Slot de voz: `voiceSrc` (swap de un solo archivo).
 *
 * Nada reusado de templates viejos — componentes nuevos.
 */

import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Audio,
  staticFile,
  Easing,
} from 'remotion';
import './fonts';
import {
  TOKENS,
  ClockNight,
  IncomingMessage,
  ExitDoor,
  MaxChibi,
  SecondsRing,
  WireCube,
  WireDiamond,
  Burst,
} from './lineart';

const ARCHIVO = 'Archivo, sans-serif';
const MONO = '"DM Mono", monospace';

// ─── Tipos del guion ────────────────────────────────────────────────────────
export type Word = { t: string; hl?: boolean; dim?: boolean };

export type Visual =
  | { kind: 'clock' }
  | { kind: 'message' }
  | { kind: 'door' }
  | { kind: 'max' }
  | { kind: 'cube' }
  | { kind: 'diamond' }
  | { kind: 'burst' }
  | { kind: 'seconds'; value: number; max?: number };

export type Beat = {
  /** frame de inicio */
  from: number;
  /** duración en frames */
  dur: number;
  /** narración, palabra por palabra (hl = keyword violeta) */
  caption: Word[];
  /** ilustración line-art (opcional) */
  visual?: Visual;
  /** frames que tarda en dibujarse la ilustración (default 26) */
  drawIn?: number;
};

export type DocReelProps = {
  beats: Beat[];
  label?: string;
  cta?: string;
  /** archivo de voz en /public (ej: "voz/max-doc-1.mp3") */
  voiceSrc?: string;
};

// ─── Helpers ─────────────────────────────────────────────────────────────────
const clamp01 = (n: number) => Math.max(0, Math.min(1, n));

/** opacidad de un beat: fade-in al entrar, fade-out al salir (cross suave) */
const beatOpacity = (frame: number, from: number, dur: number) => {
  const inP = interpolate(frame, [from, from + 9], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const outP = interpolate(frame, [from + dur - 8, from + dur], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return Math.min(inP, outP);
};

// ─── Ilustración por beat ─────────────────────────────────────────────────────
const VisualRender: React.FC<{ visual: Visual; p: number; localFrame: number; drawIn: number }> = ({
  visual,
  p,
  localFrame,
  drawIn,
}) => {
  switch (visual.kind) {
    case 'clock':
      return <ClockNight p={p} size={300} />;
    case 'message':
      return <IncomingMessage p={p} size={300} />;
    case 'door':
      return <ExitDoor p={p} size={300} />;
    case 'max':
      return <MaxChibi p={p} size={330} accent />;
    case 'cube':
      return <WireCube p={p} size={300} accent />;
    case 'diamond':
      return <WireDiamond p={p} size={300} accent />;
    case 'burst':
      return <Burst p={p} size={320} accent localFrame={localFrame} />;
    case 'seconds': {
      const count = clamp01(localFrame / drawIn) * visual.value;
      return (
        <div style={{ position: 'relative', width: 300, height: 300, display: 'grid', placeItems: 'center' }}>
          <div style={{ position: 'absolute', inset: 0 }}>
            <SecondsRing p={p} seconds={count} max={visual.max ?? visual.value} size={300} />
          </div>
          <div
            style={{
              fontFamily: ARCHIVO,
              fontWeight: 800,
              fontStretch: '85%',
              fontSize: 96,
              color: TOKENS.stroke,
              letterSpacing: '-0.04em',
              display: 'flex',
              alignItems: 'baseline',
              gap: 4,
            }}
          >
            {count.toFixed(1).replace('.', ',')}
            <span style={{ fontSize: 40, color: TOKENS.violetLite, fontWeight: 700 }}>s</span>
          </div>
        </div>
      );
    }
    default:
      return null;
  }
};

// ─── Palabra de caption ────────────────────────────────────────────────────
const CaptionWord: React.FC<{ word: Word; fps: number; localFrame: number; idx: number }> = ({
  word,
  fps,
  localFrame,
  idx,
}) => {
  const start = 6 + idx * 3;
  const s = spring({
    fps,
    frame: Math.max(0, localFrame - start),
    config: { damping: 16, stiffness: 170, mass: 0.6 },
    durationInFrames: 16,
  });
  const pop = word.hl
    ? interpolate(localFrame, [start + 2, start + 10, start + 18], [1, 1.12, 1.0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: Easing.bezier(0.34, 1.56, 0.64, 1),
      })
    : 1;
  const color = word.hl ? TOKENS.violetLite : word.dim ? TOKENS.dim : TOKENS.stroke;
  return (
    <span
      style={{
        position: 'relative',
        display: 'inline-block',
        marginRight: '0.26em',
        opacity: s,
        transform: `translateY(${18 * (1 - s)}px) scale(${pop})`,
        color,
        // chip de highlight detrás de la keyword (estilo "The Conversion Doc")
        ...(word.hl
          ? {
              padding: '0.02em 0.18em',
              borderRadius: 10,
              background: 'rgba(124,58,237,0.16)',
              boxShadow: 'inset 0 0 0 1.5px rgba(168,85,247,0.45), 0 0 30px rgba(124,58,237,0.30)',
            }
          : {}),
        textShadow: word.hl
          ? '0 0 22px rgba(124,58,237,0.75), 0 0 52px rgba(124,58,237,0.40)'
          : 'none',
        willChange: 'transform, opacity',
      }}
    >
      {word.t}
    </span>
  );
};

// ─── Engine ───────────────────────────────────────────────────────────────────
export const DocReel: React.FC<DocReelProps> = ({ beats, label = 'CONCEPTO DEVELOPMENT', cta, voiceSrc }) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const totalDur = beats.reduce((m, b) => Math.max(m, b.from + b.dur), 0);
  const ctaStart = totalDur - 40;

  return (
    <AbsoluteFill style={{ backgroundColor: TOKENS.ink, overflow: 'hidden' }}>
      {/* voz */}
      {voiceSrc && <Audio src={staticFile(voiceSrc)} />}

      {/* profundidad: glow violeta sutil detrás del centro + vignette (fondo nunca plano) */}
      <AbsoluteFill
        style={{
          background:
            'radial-gradient(ellipse 65% 45% at 50% 46%, rgba(124,58,237,0.16) 0%, transparent 60%)',
        }}
      />
      <AbsoluteFill
        style={{
          background:
            'radial-gradient(ellipse 100% 100% at 50% 50%, transparent 38%, rgba(0,0,0,0.55) 100%)',
        }}
      />

      {/* label DM Mono */}
      <div
        style={{
          position: 'absolute',
          top: Math.round(height * 0.07),
          left: 0,
          right: 0,
          textAlign: 'center',
          fontFamily: MONO,
          fontSize: 17,
          letterSpacing: '0.34em',
          color: TOKENS.dim,
          opacity: interpolate(frame, [0, 14], [0, 1], { extrapolateRight: 'clamp' }),
        }}
      >
        {label}
      </div>

      {/* beats */}
      {beats.map((b, i) => {
        if (frame < b.from || frame >= b.from + b.dur) return null;
        const localFrame = frame - b.from;
        const drawIn = b.drawIn ?? 26;
        const op = beatOpacity(frame, b.from, b.dur);
        const drawP = clamp01(localFrame / drawIn);
        // vida del objeto: respira, flota y rota muy suave (no clavado)
        const breathe = 1 + 0.018 * Math.sin(localFrame * 0.06);
        const floatY = 10 * Math.sin(localFrame * 0.045);
        const rot = 2.2 * Math.sin(localFrame * 0.03);

        return (
          <AbsoluteFill
            key={i}
            style={{
              opacity: op,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* caption (tercio superior) */}
            <div
              style={{
                position: 'absolute',
                top: Math.round(height * 0.205),
                left: Math.round(width * 0.1),
                right: Math.round(width * 0.1),
                textAlign: 'center',
                fontFamily: ARCHIVO,
                fontWeight: 800,
                fontStretch: '88%',
                fontSize: 76,
                lineHeight: 1.02,
                letterSpacing: '-0.03em',
              }}
            >
              {b.caption.map((w, wi) => (
                <CaptionWord key={wi} word={w} fps={fps} localFrame={localFrame} idx={wi} />
              ))}
            </div>

            {/* ilustración (centro) */}
            {b.visual && (
              <div
                style={{
                  position: 'absolute',
                  top: Math.round(height * 0.48),
                  transform: `translateY(${-50 + 0}%) translateY(${floatY}px) rotate(${rot}deg) scale(${breathe})`,
                  display: 'grid',
                  placeItems: 'center',
                }}
              >
                <VisualRender visual={b.visual} p={drawP} localFrame={localFrame} drawIn={drawIn} />
              </div>
            )}
          </AbsoluteFill>
        );
      })}

      {/* CTA final */}
      {cta && frame >= ctaStart && (
        <div
          style={{
            position: 'absolute',
            bottom: Math.round(height * 0.11),
            left: 0,
            right: 0,
            textAlign: 'center',
            fontFamily: MONO,
            fontSize: 22,
            letterSpacing: '0.12em',
            color: TOKENS.violetLite,
            opacity: interpolate(frame, [ctaStart, ctaStart + 14], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }),
            transform: `translateY(${interpolate(frame, [ctaStart, ctaStart + 14], [12, 0], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            })}px)`,
          }}
        >
          → {cta}
        </div>
      )}

      {/* borde violeta inferior — firma de marca */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 5,
          background: `linear-gradient(90deg, ${TOKENS.violet}, ${TOKENS.violetLite})`,
        }}
      />
    </AbsoluteFill>
  );
};
