/**
 * TipoReel — Template generativo para anuncios de feed (4:5) y reels (9:16)
 *
 * Principios aplicados:
 * - 3+ cambios visuales en los primeros 45 frames (1.5s @30fps)
 * - Hook palabra por palabra con spring snappy
 * - Keyword highlight: scale 1.08x + color violeta + glow en 8 frames
 * - Safe zones correctas: texto en zona útil, evita 120px laterales
 * - MAX generado específicamente para cada pieza, posicionado por diseño
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
  staticFile,
} from 'remotion';
import { inter } from '../shared/fonts';
import { C } from '../shared/theme';

// ─── Tipos ────────────────────────────────────────────────────────────────────

export type ReelWord = {
  text: string;
  highlight?: boolean; // violeta + scale + glow
  dim?: boolean;       // gris muted — palabras de soporte
  break?: boolean;     // salto de línea después de esta palabra
};

export type ReelPhrase = {
  words: ReelWord[];
  startFrame: number;       // frame en que empieza la frase
  size?: number;            // font-size, default 76
  weight?: number;          // default 900
  lineHeight?: number;      // default 0.92
  marginTop?: number;
};

export type TipoReelProps = {
  // Imagen de MAX (path relativo a /public)
  maxSrc?: string;
  maxSide?: 'right' | 'left' | 'none';  // dónde está MAX
  maxWidthPct?: number;                  // qué % del ancho ocupa MAX, default 45

  // Frases con timing
  phrases: ReelPhrase[];

  // Texto de cierre (aparece al final, pequeño, impactante)
  closingText?: string;
  closingFrame?: number;
  closingColor?: string;

  // Label de sección (tipo DM Mono, uppercase, pequeño)
  label?: string;

  // Formato
  format?: '4:5' | '9:16' | '1:1';
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

  // Highlight: escala + glow en frame de llegada
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

export const TipoReel: React.FC<TipoReelProps> = ({
  maxSrc,
  maxSide = 'right',
  maxWidthPct = 44,
  phrases,
  closingText,
  closingFrame = 70,
  closingColor,
  label,
  format = '4:5',
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // ── Safe zone padding (basado en research de plataformas) ──
  // 9:16: 120px laterales, evitar top 160px y bottom 480px
  // 4:5:  50px laterales, evitar bottom 250px
  const padH = format === '9:16' ? Math.round(width * 0.12) : Math.round(width * 0.09);
  const padTop = format === '9:16' ? Math.round(height * 0.1) : Math.round(height * 0.12);
  const padBottom = format === '9:16' ? Math.round(height * 0.28) : Math.round(height * 0.45);

  // ── MAX entra deslizando desde afuera del frame ──
  const maxProgress = spring({
    fps,
    frame: Math.max(0, frame - 3),
    config: { damping: 16, stiffness: 90, mass: 1.1 },
    durationInFrames: 28,
  });

  const maxDir = maxSide === 'right' ? 1 : -1;
  const maxOffsetX = 60 * maxDir * (1 - maxProgress);

  // ── Fondo: fade in suave ──
  const bgOpacity = Math.min(1, frame / 10);
  const sceneScale = interpolate(frame, [0, 180], [1.0, 1.06], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.linear,
  });

  // ── Zona de texto ──
  // Modo escena completa: siempre texto a la izquierda
  const textSide = maxSide === 'none' ? 'left' : (maxSide === 'right' ? 'left' : 'right');
  // Modo escena: texto en el 50% izquierdo — MAX ocupa el derecho
  const textWidth = maxSide === 'none' ? '50%' : `${100 - maxWidthPct + 4}%`;

  // ── Modo escena completa: imagen como fondo full-bleed ──
  const isFullScene = maxSide === 'none' && maxSrc;

  return (
    <AbsoluteFill style={{ backgroundColor: C.bg, fontFamily: inter, overflow: 'hidden' }}>

      {/* ── MODO ESCENA: imagen de fondo full-bleed con Ken Burns ── */}
      {isFullScene && (
        <>
          <div style={{
            position: 'absolute', inset: 0,
            transform: `scale(${sceneScale})`, transformOrigin: 'center center',
            opacity: bgOpacity,
          }}>
            <Img
              src={staticFile(maxSrc!)}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          {/* Overlay oscuro general para legibilidad */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'rgba(0,0,0,0.45)',
          }} />
          {/* Gradiente izquierda: fade suave sin borde visible */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(90deg, rgba(5,0,20,0.88) 0%, rgba(5,0,20,0.70) 35%, rgba(5,0,20,0.35) 58%, rgba(5,0,20,0.08) 78%, transparent 100%)',
          }} />
          {/* Borde violeta inferior — firma de marca */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: 4,
            background: 'linear-gradient(90deg, #7c3aed, #a855f7)',
          }} />
        </>
      )}

      {/* ── MODO PERSONAJE: glow de fondo + MAX como elemento posicionado ── */}
      {!isFullScene && (
        <div style={{
          position: 'absolute', inset: 0, opacity: bgOpacity,
          background: `radial-gradient(ellipse 75% 50% at 50% 110%, rgba(91,94,244,0.18) 0%, transparent 65%)`,
        }} />
      )}

      {/* ── MAX como elemento (solo cuando NO es modo escena) ── */}
      {maxSrc && maxSide !== 'none' && (
        <>
          {/* Underlight violeta específico de MAX */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              [maxSide]: 0,
              width: `${maxWidthPct + 6}%`,
              height: '40%',
              background: `radial-gradient(ellipse 70% 35% at 50% 100%, rgba(123,47,255,0.38) 0%, transparent 65%)`,
              opacity: maxProgress,
              pointerEvents: 'none',
            }}
          />
          {/* El personaje */}
          <div
            style={{
              position: 'absolute',
              [maxSide]: 0,
              bottom: 0,
              width: `${maxWidthPct + 2}%`,
              height: '92%',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'center',
              transform: `translateX(${maxOffsetX}px)`,
              opacity: Math.min(1, maxProgress * 1.15),
            }}
          >
            <Img
              src={staticFile(maxSrc)}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                objectPosition: 'bottom center',
              }}
            />
          </div>
        </>
      )}

      {/* ── Zona de texto ── */}
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          paddingTop: padTop,
          paddingBottom: padBottom,
          [textSide === 'left' ? 'paddingLeft' : 'paddingRight']: padH,
          [textSide === 'left' ? 'paddingRight' : 'paddingLeft']: maxSrc ? '12px' : padH,
          width: textWidth,
          [textSide === 'right' ? 'marginLeft' : 'marginRight']: maxSrc ? 'auto' : undefined,
        }}
      >
        {/* Label de sección */}
        {label && (
          <div
            style={{
              opacity: snap(fps, frame, 2),
              transform: `translateY(${10 * (1 - snap(fps, frame, 2))}px)`,
              fontSize: 12,
              fontWeight: 600,
              color: C.muted,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              fontFamily: inter,
              marginBottom: 20,
            }}
          >
            {label}
          </div>
        )}

        {/* Frases palabra por palabra */}
        {phrases.map((phrase, pi) => {
          const size = phrase.size ?? 76;
          const weight = phrase.weight ?? 900;
          const lh = phrase.lineHeight ?? 0.92;

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
          <div
            style={{
              opacity: snap(fps, frame, closingFrame),
              transform: `translateY(${12 * (1 - snap(fps, frame, closingFrame))}px)`,
              marginTop: 32,
              fontSize: 22,
              fontWeight: 500,
              color: closingColor ?? C.muted,
              letterSpacing: '-0.01em',
              lineHeight: 1.3,
              fontFamily: inter,
            }}
          >
            {closingText}
          </div>
        )}
      </AbsoluteFill>

      {/* ── Logo ícono pequeño — solo si no es escena completa ── */}
      {!isFullScene && (
        <Img
          src={staticFile('concepto-icon.png')}
          style={{
            position: 'absolute',
            bottom: 28,
            left: 28,
            width: 36,
            height: 36,
            opacity: 0.55,
          }}
        />
      )}

      {/* ── En modo escena: ícono mínimo abajo a la izquierda ── */}
      {isFullScene && (
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
      )}
    </AbsoluteFill>
  );
};
