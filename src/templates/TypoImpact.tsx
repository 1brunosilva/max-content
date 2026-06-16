/**
 * TypoImpact v2 — Template de tipografía de impacto máximo
 *
 * Animaciones v2:
 * - Flash cut blanco en cada cambio de video (pre-flash violeta + flash blanco)
 * - Ken Burns por clip — zoom in/out distinto por frase, variedad cinematográfica
 * - Phrase entrance: scale 1.06 → 1.0 con spring snappy
 * - Phrase exit: blur 0 → 5px + scale 1.0 → 1.025 (últimos 8 frames)
 * - Keyword glow pulsante (sin oscillation en radius)
 * - Keyword bounce ampliado (peak 1.12, overshoot 0.97)
 * - Vignette que se oscurece en cada keyword landing
 * - Progress dots — píldora violeta = frase activa
 * - CTA texto en los últimos ~30 frames
 * - Hard cut entre frases (no crossfade — más impacto)
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
  Sequence,
  staticFile,
} from 'remotion';
import { inter } from '../shared/fonts';
import { C } from '../shared/theme';

// ─── Tipos ────────────────────────────────────────────────────────────────────

export type ImpactWord = {
  text: string;
  highlight?: boolean;
  dim?: boolean;
  break?: boolean;
};

export type ImpactPhrase = {
  words: ImpactWord[];
  startFrame: number;
  endFrame: number;          // frame en que desaparece la frase (hard cut)
  size: number;
  weight?: number;
  lineHeight?: number;
  align?: 'left' | 'center';
  videoSrc?: string;         // video propio de esta frase
  kbDirection?: 1 | -1;     // Ken Burns: 1 = zoom in, -1 = zoom out
};

export type TypoImpactProps = {
  phrases: ImpactPhrase[];
  bgSrc?: string;
  videoSrc?: string;
  label?: string;
  showCta?: boolean;
  ctaText?: string;
  ctaFrame?: number;
};

// ─── Spring snappy ────────────────────────────────────────────────────────────

const snap = (fps: number, frame: number, startAt: number) =>
  spring({
    fps,
    frame: Math.max(0, frame - startAt),
    config: { damping: 12, stiffness: 180, mass: 0.6 },
    durationInFrames: 18,
  });

// ─── Componente palabra ───────────────────────────────────────────────────────

const Word: React.FC<{
  word: ImpactWord;
  globalFrame: number;
  fps: number;
  startFrame: number;
  wordIndex: number;
  fontSize: number;
  lineHeight: number;
  weight: number;
}> = ({ word, globalFrame, fps, startFrame, wordIndex, fontSize, lineHeight, weight }) => {
  const wordStart = startFrame + wordIndex * 4;
  const p = snap(fps, globalFrame, wordStart);

  // Bounce ampliado: 1.0 → 1.12 → 0.97 → 1.04
  const highlightScale = word.highlight
    ? interpolate(
        globalFrame,
        [wordStart + 4, wordStart + 12, wordStart + 20, wordStart + 28],
        [1.0, 1.12, 0.97, 1.04],
        {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
          easing: Easing.bezier(0.34, 1.56, 0.64, 1),
        }
      )
    : 1;

  // Glow pulsante — oscila suavemente después del landing
  const glowBase = p * (word.highlight ? 1 : 0);
  const glowPulse = word.highlight && globalFrame > wordStart + 8
    ? 0.80 + 0.20 * Math.sin((globalFrame - wordStart) * 0.22)
    : glowBase;

  const color = word.highlight ? C.violet : word.dim ? C.muted : C.white;

  return (
    <span
      style={{
        display: 'inline-block',
        marginRight: '0.22em',
        opacity: p,
        transform: `translateY(${16 * (1 - p)}px) scale(${highlightScale})`,
        color,
        textShadow: word.highlight
          ? [
              `0 0 ${40 * glowPulse}px rgba(139,92,246,${0.9 * p})`,
              `0 0 ${80 * glowPulse}px rgba(124,58,237,${0.5 * p})`,
              `0 0 ${140 * glowPulse}px rgba(124,58,237,${0.22 * p})`,
            ].join(', ')
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

export const TypoImpact: React.FC<TypoImpactProps> = ({
  phrases,
  bgSrc,
  videoSrc,
  label,
  showCta = true,
  ctaText = 'conceptodevelopment.com',
  ctaFrame,
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const padH   = Math.round(width * 0.09);
  const padTop = Math.round(height * 0.10);
  const bgOpacity = Math.min(1, frame / 8);

  const hasPhraseVideos = phrases.some(p => !!p.videoSrc);
  const isVideo = !!videoSrc || hasPhraseVideos;

  // ── Cortes de video ────────────────────────────────────────────────────────
  const cutFrames = phrases.slice(1).map(p => p.startFrame);

  // Pre-flash violeta (4 frames antes del corte)
  const preFlashViolet = cutFrames.reduce((sum, cf) =>
    sum + interpolate(frame, [cf - 4, cf - 1, cf], [0, 0.28, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
    0
  );

  // Flash blanco en el corte — empieza en 0 un frame antes para que extrapolateLeft clampe a 0
  const flashWhite = cutFrames.reduce((sum, cf) =>
    sum + interpolate(frame, [cf - 2, cf, cf + 1, cf + 5], [0, 0.88, 0.92, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
    0
  );

  // ── Frase activa ───────────────────────────────────────────────────────────
  const activePhraseIndex = phrases.findIndex(p => frame >= p.startFrame && frame < p.endFrame);

  // ── Vignette que pulsa en keyword landings ─────────────────────────────────
  const highlightLandingFrames: number[] = [];
  phrases.forEach(phrase => {
    let wi = 0;
    phrase.words.forEach(w => {
      if (w.highlight) highlightLandingFrames.push(phrase.startFrame + wi * 4 + 10);
      wi++;
    });
  });
  const vignetteBoost = Math.min(0.28, highlightLandingFrames.reduce((sum, lf) =>
    sum + interpolate(frame, [lf, lf + 4, lf + 16], [0, 0.20, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
    0
  ));

  // ── CTA ───────────────────────────────────────────────────────────────────
  const lastPhrase = phrases[phrases.length - 1];
  const resolvedCtaFrame = ctaFrame ?? lastPhrase.endFrame - 34;
  const ctaP = snap(fps, frame, resolvedCtaFrame);

  return (
    <AbsoluteFill style={{ backgroundColor: C.bg, fontFamily: inter, overflow: 'hidden' }}>

      {/* ── Video global (loop) ── */}
      {videoSrc && (
        <div style={{ position: 'absolute', inset: 0, opacity: bgOpacity }}>
          <Video src={staticFile(videoSrc)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} startFrom={0} muted loop />
        </div>
      )}

      {/* ── Imagen estática de fondo ── */}
      {bgSrc && !videoSrc && (
        <Img src={staticFile(bgSrc)} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.3 }} />
      )}

      {/* ── Videos por frase con Ken Burns ── */}
      {phrases.map((phrase, pi) => {
        if (!phrase.videoSrc) return null;
        const dur = phrase.endFrame - phrase.startFrame;
        const kbDir = phrase.kbDirection ?? (pi % 2 === 0 ? 1 : -1);
        const localFrame = Math.max(0, frame - phrase.startFrame);
        const kbScale = interpolate(localFrame, [0, dur], [1.0, 1.0 + kbDir * 0.06], {
          extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.linear,
        });
        const kbOrigin = kbDir > 0 ? 'center center' : 'center 40%';

        return (
          <Sequence key={`vid-${pi}`} from={phrase.startFrame} durationInFrames={dur}>
            <AbsoluteFill style={{ opacity: bgOpacity, overflow: 'hidden' }}>
              <div style={{
                width: '100%', height: '100%',
                transform: `scale(${kbScale})`,
                transformOrigin: kbOrigin,
              }}>
                <Video
                  src={staticFile(phrase.videoSrc)}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  startFrom={0}
                  muted
                />
              </div>
            </AbsoluteFill>
          </Sequence>
        );
      })}

      {/* ── Overlay oscuro base ── */}
      {isVideo && (
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.32)' }} />
      )}

      {/* ── Gradiente protección de texto (izquierda) ── */}
      {isVideo && (
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(90deg, rgba(5,0,20,0.84) 0%, rgba(5,0,20,0.62) 38%, rgba(5,0,20,0.22) 62%, transparent 100%)',
        }} />
      )}

      {/* ── Vignette base + keyword boost ── */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `radial-gradient(ellipse 90% 90% at 50% 50%, transparent 45%, rgba(0,0,0,${0.42 + vignetteBoost}) 100%)`,
      }} />

      {/* ── Radial glow de marca (solo sin video) ── */}
      {!isVideo && (
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 80% 60% at 15% 50%, rgba(91,94,244,0.14) 0%, transparent 65%)',
        }} />
      )}

      {/* ── Pre-flash violeta ── */}
      {preFlashViolet > 0.01 && (
        <div style={{
          position: 'absolute', inset: 0,
          background: `rgba(90,20,200,${Math.min(0.3, preFlashViolet)})`,
          pointerEvents: 'none',
        }} />
      )}

      {/* ── Flash blanco en cortes ── */}
      {flashWhite > 0.01 && (
        <div style={{
          position: 'absolute', inset: 0,
          background: `rgba(255,255,255,${Math.min(1, flashWhite)})`,
          pointerEvents: 'none',
        }} />
      )}

      {/* ── Borde violeta inferior ── */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 4,
        background: 'linear-gradient(90deg, #7c3aed, #a855f7)',
      }} />

      {/* ── Label ── */}
      {label && (
        <div style={{
          position: 'absolute',
          top: Math.round(padTop * 0.48),
          left: padH,
          opacity: Math.min(1, frame / 8),
          fontSize: 11,
          fontWeight: 600,
          color: C.muted,
          letterSpacing: '0.14em',
          textTransform: 'uppercase' as const,
          fontFamily: inter,
        }}>
          {label}
        </div>
      )}

      {/* ── Progress dots ── */}
      <div style={{
        position: 'absolute',
        top: Math.round(padTop * 0.5),
        right: padH,
        display: 'flex',
        alignItems: 'center',
        gap: 5,
        opacity: Math.min(1, frame / 12),
      }}>
        {phrases.map((phrase, pi) => {
          const isActive = pi === activePhraseIndex;
          const wasActive = pi < activePhraseIndex;
          const dotW = isActive
            ? interpolate(frame, [phrase.startFrame, phrase.startFrame + 10], [6, 22], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
            : 6;
          return (
            <div key={pi} style={{
              width: dotW,
              height: 4,
              borderRadius: 2,
              background: isActive
                ? '#7c3aed'
                : wasActive
                ? 'rgba(124,58,237,0.45)'
                : 'rgba(255,255,255,0.15)',
            }} />
          );
        })}
      </div>

      {/* ── Frases — hard cut, entrance scale, exit blur ── */}
      {phrases.map((phrase, pi) => {
        // Hard cut: invisible fuera de la ventana
        if (frame < phrase.startFrame || frame >= phrase.endFrame) return null;

        const size   = phrase.size;
        const weight = phrase.weight ?? 900;
        const lh     = phrase.lineHeight ?? 0.92;
        const align  = phrase.align ?? 'left';

        // Entrance: scale 1.06 → 1.0 con spring
        const entranceP = spring({
          fps,
          frame: Math.max(0, frame - phrase.startFrame),
          config: { damping: 14, stiffness: 155, mass: 0.7 },
          durationInFrames: 22,
        });
        const entranceScale = interpolate(entranceP, [0, 1], [1.06, 1.0]);

        // Exit: blur 0 → 5px + scale 1.0 → 1.025 (últimos 8 frames)
        const exitP = interpolate(
          frame,
          [phrase.endFrame - 8, phrase.endFrame],
          [0, 1],
          { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
        );
        const exitBlur  = exitP * 5;
        const exitScale = 1 + exitP * 0.025;

        // Agrupar palabras en líneas
        const lines: ImpactWord[][] = [];
        let currentLine: ImpactWord[] = [];
        phrase.words.forEach(w => {
          currentLine.push(w);
          if (w.break) { lines.push(currentLine); currentLine = []; }
        });
        if (currentLine.length > 0) lines.push(currentLine);

        let wordOffset = 0;

        return (
          <AbsoluteFill
            key={pi}
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              paddingLeft: padH,
              paddingRight: padH,
              paddingTop: padTop,
              paddingBottom: Math.round(height * 0.15),
              transform: `scale(${exitScale})`,
              filter: exitBlur > 0.1 ? `blur(${exitBlur}px)` : undefined,
              willChange: 'transform, filter',
            }}
          >
            <div style={{
              lineHeight: lh,
              transform: `scale(${entranceScale})`,
              transformOrigin: align === 'center' ? 'center center' : 'left center',
            }}>
              {lines.map((line, li) => (
                <div
                  key={li}
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'baseline',
                    justifyContent: align === 'center' ? 'center' : 'flex-start',
                    marginBottom: li < lines.length - 1 ? `${size * 0.06}px` : 0,
                  }}
                >
                  {line.map((word, wi) => {
                    const globalWordIndex = wordOffset + wi;
                    if (wi === line.length - 1 && li < lines.length - 1) wordOffset += line.length;
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
          </AbsoluteFill>
        );
      })}

      {/* ── CTA final ── */}
      {showCta && ctaP > 0.01 && (
        <div style={{
          position: 'absolute',
          bottom: 70,
          left: padH,
          opacity: ctaP,
          transform: `translateY(${10 * (1 - ctaP)}px)`,
          fontSize: 13,
          fontWeight: 700,
          color: C.violet,
          letterSpacing: '0.10em',
          textTransform: 'uppercase' as const,
          fontFamily: inter,
        }}>
          → {ctaText}
        </div>
      )}

      {/* ── Logo ícono ── */}
      <Img
        src={staticFile('concepto-icon.png')}
        style={{
          position: 'absolute', bottom: 24, left: 24,
          width: 28, height: 28, opacity: 0.40,
        }}
      />
    </AbsoluteFill>
  );
};
