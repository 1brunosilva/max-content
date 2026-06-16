/**
 * VideoReel — Template para videos con fondo Higgsfield + texto animado Remotion
 *
 * Principios:
 * - 3+ cambios visuales en los primeros 45 frames (1.5s @30fps)
 * - Hook palabra por palabra con spring snappy (cada 4 frames)
 * - Keyword highlight: scale 1.08x + color violeta + glow en 8 frames
 * - Video de Higgsfield como fondo full-bleed (sin texto, solo escena)
 * - Texto SIEMPRE en 50% izquierdo del frame
 * - Gradiente fade suave izquierda → transparente
 *
 * Uso: V1, V2, V3 — 9 segundos @ 30fps = 270 frames
 */

import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  Easing,
  Img,
  Video,
  staticFile,
} from 'remotion';
import { inter } from '../shared/fonts';
import { C } from '../shared/theme';
import { ReelWord, ReelPhrase } from './TipoReel';

// ─── Tipos ────────────────────────────────────────────────────────────────────

export type VideoReelProps = {
  videoSrc: string;          // path relativo a /public (ej: 'v1-max-office.mp4')
  phrases: ReelPhrase[];     // frases con timing y palabras
  closingText?: string;      // texto de cierre pequeño
  closingFrame?: number;     // frame en que aparece el cierre
  closingColor?: string;
  label?: string;            // label DM Mono uppercase arriba
};

// ─── Helper: spring snappy ────────────────────────────────────────────────────

const snap = (fps: number, frame: number, startAt: number) =>
  spring({
    fps,
    frame: Math.max(0, frame - startAt),
    config: { damping: 12, stiffness: 180, mass: 0.6 },
    durationInFrames: 18,
  });

// ─── Componente palabra ───────────────────────────────────────────────────────

const Word: React.FC<{
  word: ReelWord;
  globalFrame: number;
  fps: number;
  startFrame: number;
  wordIndex: number;
  fontSize: number;
  lineHeight: number;
  weight: number;
}> = ({ word, globalFrame, fps, startFrame, wordIndex, fontSize, lineHeight, weight }) => {
  // Cada palabra entra 4 frames después de la anterior
  const wordStart = startFrame + wordIndex * 4;
  const p = snap(fps, globalFrame, wordStart);

  const highlightScale = word.highlight
    ? interpolate(
        globalFrame,
        [wordStart + 6, wordStart + 14, wordStart + 22],
        [1, 1.08, 1.0],
        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.34, 1.56, 0.64, 1) }
      )
    : 1;

  const color = word.highlight ? C.violet : word.dim ? C.muted : C.white;

  return (
    <span
      style={{
        display: 'inline-block',
        marginRight: '0.22em',
        opacity: p,
        transform: `translateY(${14 * (1 - p)}px) scale(${highlightScale})`,
        color,
        textShadow: word.highlight
          ? `0 0 32px rgba(139,92,246,${0.7 * p}), 0 0 64px rgba(124,58,237,${0.4 * p})`
          : 'none',
        fontSize,
        fontWeight: weight,
        lineHeight,
        letterSpacing: '-0.035em',
        fontFamily: inter,
        whiteSpace: 'pre',
        willChange: 'transform, opacity',
      }}
    >
      {word.text}
    </span>
  );
};

// ─── Template principal ───────────────────────────────────────────────────────

export const VideoReel: React.FC<VideoReelProps> = ({
  videoSrc,
  phrases,
  closingText,
  closingFrame = 70,
  closingColor,
  label,
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // Safe zones — vertical 3:4 / 4:5
  const padH    = Math.round(width * 0.09);    // 9% laterales
  const padTop  = Math.round(height * 0.12);   // 12% top
  const padBot  = Math.round(height * 0.45);   // 45% bottom — zona segura de UI

  // Fondo: fade in suave en los primeros 10 frames
  const bgOpacity = Math.min(1, frame / 10);

  return (
    <AbsoluteFill style={{ backgroundColor: '#0a0010', fontFamily: inter, overflow: 'hidden' }}>

      {/* ── Video de Higgsfield como fondo full-bleed ── */}
      <div style={{
        position: 'absolute', inset: 0,
        opacity: bgOpacity,
      }}>
        <Video
          src={staticFile(videoSrc)}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          startFrom={0}
          muted
          loop
        />
      </div>

      {/* ── Overlay oscuro general para legibilidad ── */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'rgba(0,0,0,0.40)',
      }} />

      {/* ── Gradiente izquierda: fade suave sin borde visible ── */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(90deg, rgba(5,0,20,0.88) 0%, rgba(5,0,20,0.70) 35%, rgba(5,0,20,0.35) 58%, rgba(5,0,20,0.08) 78%, transparent 100%)',
      }} />

      {/* ── Borde violeta inferior — firma de marca ── */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 4,
        background: 'linear-gradient(90deg, #7c3aed, #a855f7)',
      }} />

      {/* ── Zona de texto — 50% izquierdo ── */}
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          paddingTop: padTop,
          paddingBottom: padBot,
          paddingLeft: padH,
          paddingRight: 12,
          width: '50%',
        }}
      >
        {/* Label de sección */}
        {label && (
          <div style={{
            opacity: snap(fps, frame, 2),
            transform: `translateY(${10 * (1 - snap(fps, frame, 2))}px)`,
            fontSize: 12,
            fontWeight: 600,
            color: C.muted,
            letterSpacing: '0.12em',
            textTransform: 'uppercase' as const,
            fontFamily: inter,
            marginBottom: 20,
          }}>
            {label}
          </div>
        )}

        {/* Frases palabra por palabra */}
        {phrases.map((phrase, pi) => {
          const size   = phrase.size   ?? 76;
          const weight = phrase.weight ?? 900;
          const lh     = phrase.lineHeight ?? 0.92;

          // Agrupar palabras en líneas (respetando `break`)
          const lines: ReelWord[][] = [];
          let currentLine: ReelWord[] = [];
          phrase.words.forEach((w) => {
            currentLine.push(w);
            if (w.break) {
              lines.push(currentLine);
              currentLine = [];
            }
          });
          if (currentLine.length > 0) lines.push(currentLine);

          let wordOffset = 0;

          return (
            <div
              key={pi}
              style={{
                marginTop: phrase.marginTop ?? (pi > 0 ? 8 : 0),
                lineHeight: lh,
              }}
            >
              {lines.map((line, li) => (
                <div
                  key={li}
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'baseline',
                    marginBottom: li < lines.length - 1 ? `${size * 0.05}px` : 0,
                  }}
                >
                  {line.map((word, wi) => {
                    const globalWordIndex = wordOffset + wi;
                    if (wi === line.length - 1 && li < lines.length - 1) {
                      wordOffset += line.length;
                    }
                    return (
                      <Word
                        key={wi}
                        word={word}
                        globalFrame={frame}
                        fps={fps}
                        startFrame={phrase.startFrame}
                        wordIndex={globalWordIndex}
                        fontSize={size}
                        lineHeight={lh}
                        weight={weight}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          );
        })}

        {/* Texto de cierre — pequeño, separado, impacto máximo */}
        {closingText && (
          <div style={{
            opacity: snap(fps, frame, closingFrame),
            transform: `translateY(${12 * (1 - snap(fps, frame, closingFrame))}px)`,
            marginTop: 32,
            fontSize: 22,
            fontWeight: 500,
            color: closingColor ?? C.muted,
            letterSpacing: '-0.01em',
            lineHeight: 1.3,
            fontFamily: inter,
          }}>
            {closingText}
          </div>
        )}
      </AbsoluteFill>

      {/* ── Logo ícono pequeño — bottom-left ── */}
      <Img
        src={staticFile('concepto-icon.png')}
        style={{
          position: 'absolute',
          bottom: 24,
          left: 24,
          width: 28,
          height: 28,
          opacity: 0.40,
        }}
      />
    </AbsoluteFill>
  );
};
