/**
 * HybridV1 — el pipeline HÍBRIDO: fondo foto-real (Higgsfield) + texto/UI de marca
 * legible montado en código (Remotion). El texto vive en el espacio negativo de la
 * habitación, NUNCA sobre el device. Scrims para legibilidad sobre la foto.
 *
 * bg: por ahora la imagen A (para diseñar). Cuando llega el video, se pasa videoSrc.
 */
import React from 'react';
import {
  AbsoluteFill,
  Img,
  OffthreadVideo,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from 'remotion';
import { fontDisplay, fontMono } from '../brand/fonts';
import { concepto as B } from '../brand';

const ease = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;

type Word = { t: string; hl?: boolean; br?: boolean };

const Headline: React.FC<{ words: Word[]; from: number; size: number; top: number }> = ({ words, from, size, top }) => {
  const frame = useCurrentFrame();
  const out = interpolate(frame, [from + 70, from + 88], [1, 0], ease);
  return (
    <div style={{ position: 'absolute', top, left: 70, right: 90, opacity: out }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: `${size * 0.12}px ${size * 0.24}px`, fontFamily: fontDisplay, fontWeight: 800, fontSize: size, lineHeight: 1.0, letterSpacing: '-0.035em' }}>
        {words.map((w, i) => {
          const t = interpolate(frame, [from + i * 5, from + i * 5 + 16], [0, 1], { ...ease, easing: (x) => 1 - Math.pow(1 - x, 3) });
          return (
            <React.Fragment key={i}>
              <span style={{ display: 'inline-block', transform: `translateY(${(1 - t) * 22}px)`, filter: t < 0.9 ? `blur(${(1 - t) * 8}px)` : 'none', opacity: t, color: w.hl ? B.primaryLight : '#fff', textShadow: w.hl ? `0 0 36px ${B.glow}` : '0 2px 24px rgba(0,0,0,0.6)' }}>{w.t}</span>
              {w.br ? <span style={{ flexBasis: '100%', height: 0 }} /> : null}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export const HYBRID_DURATION = 300;

export const HybridV1: React.FC<{ videoSrc?: string; imgSrc?: string }> = ({ videoSrc, imgSrc = 'higgs-A.png' }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const ctaIn = spring({ frame: frame - 200, fps, config: { damping: 24, stiffness: 120, mass: 1 } });
  const tagIn = spring({ frame: frame - 120, fps, config: { damping: 20, stiffness: 140, mass: 1 } });
  const labelIn = interpolate(frame, [4, 24], [0, 1], ease);

  return (
    <AbsoluteFill style={{ background: '#000' }}>
      {/* fondo foto-real */}
      {videoSrc ? (
        <OffthreadVideo src={staticFile(videoSrc)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} muted />
      ) : (
        <Img src={staticFile(imgSrc)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      )}

      {/* scrims para legibilidad */}
      <AbsoluteFill style={{ background: 'linear-gradient(180deg, rgba(8,6,14,0.72) 0%, rgba(8,6,14,0.15) 26%, rgba(8,6,14,0) 45%, rgba(8,6,14,0.2) 72%, rgba(8,6,14,0.86) 100%)' }} />

      {/* label superior */}
      <div style={{ position: 'absolute', top: 96, left: 70, fontFamily: fontMono, fontSize: 22, letterSpacing: '0.22em', color: 'rgba(255,255,255,0.8)', opacity: labelIn, display: 'flex', alignItems: 'center', gap: 14 }}>
        <span style={{ width: 26, height: 2, background: B.primaryLight }} /> CONCEPTO DEVELOPMENT
      </div>

      {/* headlines (espacio negativo arriba) */}
      <Headline words={[{ t: 'Mientras' }, { t: 'no' }, { t: 'respondés,', br: true }, { t: 'una' }, { t: 'venta' }, { t: 'se' }, { t: 'va.', hl: true }]} from={8} size={84} top={200} />

      {/* tag de dato cerca del device */}
      <div style={{ position: 'absolute', top: 1180, left: 70, opacity: interpolate(frame, [120, 140, 188, 206], [0, 1, 1, 0], ease), transform: `translateY(${(1 - tagIn) * 14}px)` }}>
        <span style={{ fontFamily: fontMono, fontSize: 22, letterSpacing: '0.1em', color: '#fff', background: 'rgba(124,58,237,0.85)', padding: '12px 22px', borderRadius: 100, backdropFilter: 'blur(8px)' }}>
          47h PROMEDIO SIN RESPONDER
        </span>
      </div>

      {/* cierre: CTA */}
      <div style={{ position: 'absolute', bottom: 150, left: 70, right: 90, opacity: ctaIn, transform: `translateY(${(1 - ctaIn) * 24}px)` }}>
        <div style={{ fontFamily: fontDisplay, fontWeight: 800, fontSize: 70, letterSpacing: '-0.035em', color: '#fff', lineHeight: 1.02, textShadow: '0 2px 30px rgba(0,0,0,0.6)' }}>
          MAX responde en <span style={{ color: B.primaryLight, textShadow: `0 0 40px ${B.glow}` }}>4 segundos.</span>
        </div>
        <div style={{ marginTop: 30, display: 'inline-block', padding: '22px 46px', borderRadius: 100, background: B.accentGradient, color: '#fff', fontFamily: fontDisplay, fontWeight: 700, fontSize: 32, boxShadow: `0 18px 50px -10px ${B.glow}` }}>
          Hablemos de tu proyecto →
        </div>
      </div>

      {/* barra de marca */}
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 6, background: B.accentGradient }} />
    </AbsoluteFill>
  );
};
