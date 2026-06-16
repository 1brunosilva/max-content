/**
 * CardWheel — PROTOTIPO de UN mecanismo (no es un video terminado).
 * Lo que pidió Bruno: rueda cover-flow de cards en 3D REAL que gira con momentum y
 * se ASIENTA → glow tipo Siri en la card elegida → zoom IN dentro de la card → el
 * contenido sale DE ADENTRO de esa card. Sin gradiente violeta de fondo, sin texto
 * a la izquierda. Cards planas (que le gustan) en espacio 3D real.
 *
 * Tema: psicología de precios.
 */
import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from 'remotion';
import { fontDisplay, fontMono } from '../brand/fonts';

const VLT = '#7C3AED';
const VLT_L = '#A855F7';
const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;
const APPLE = Easing.bezier(0.16, 1, 0.3, 1);
const ip = (f: number, a: number, b: number, x: number, y: number, e: (t: number) => number = APPLE) =>
  interpolate(f, [a, b], [x, y], { ...clamp, easing: e });

const CARDS = ['Lo vi más barato', '¿Me hacés precio?', 'Está caro', 'Dejame pensarlo', 'Te aviso', 'Mándame info', '¿Por qué tanto?'];
const SELECTED = 2; // "Está caro"
const CW = 560, CH = 380;

export const CARDWHEEL_DURATION = 270;

// glow tipo Siri: anillo de gradiente que fluye + bloom pulsante
const SiriGlow: React.FC<{ frame: number; intensity: number; radius: number }> = ({ frame, intensity, radius }) => {
  if (intensity <= 0.001) return null;
  const ang = (frame * 4) % 360;
  const pulse = 0.7 + 0.3 * Math.sin(frame * 0.18);
  const grad = `conic-gradient(from ${ang}deg, #4FE0FF, #5B8CFF, ${VLT_L}, #FF6FD8, #4FE0FF)`;
  return (
    <>
      <div style={{ position: 'absolute', inset: -30, borderRadius: radius + 30, background: grad, filter: 'blur(38px)', opacity: 0.55 * intensity * pulse }} />
      <div style={{ position: 'absolute', inset: -3, borderRadius: radius + 3, background: grad, filter: 'blur(1px)', opacity: 0.95 * intensity }} />
    </>
  );
};

const Meta = ({ s }: { s: number }) => <div style={{ fontFamily: fontMono, fontSize: s, letterSpacing: '0.06em', color: '#8A8AA0' }}>CLIENTE · 23:47</div>;

export const CardWheel: React.FC = () => {
  const f = useCurrentFrame();

  // 1) FLICK + SETTLE: barre 7 cards rápido y se asienta con micro-overshoot
  const c = f < 96
    ? ip(f, 0, 96, SELECTED - 7, SELECTED + 0.35)   // flick: fast → slow (decel Apple)
    : ip(f, 96, 116, SELECTED + 0.35, SELECTED);    // se asienta de vuelta al centro

  const settled = ip(f, 100, 116, 0, 1);            // 0..1 cuando ya está centrada
  const glow = ip(f, 110, 134, 0, 1);               // glow Siri entra tras asentarse
  const zoom = ip(f, 140, 196, 0, 1);               // zoom IN dentro de la elegida
  const pay = ip(f, 168, 198, 0, 1);                // el contenido nuevo aparece adentro
  const wheelGone = ip(f, 140, 162, 1, 0);          // las vecinas se van al empezar el zoom
  const topLabel = ip(f, 8, 28, 0, 1) * (1 - ip(f, 130, 150, 0, 1));

  const zScale = 1 + APPLE(zoom) * 2.5;             // la card crece y nos "metemos"
  const zBlur = Math.sin(zoom * Math.PI) * 8;       // motion blur sube y baja

  return (
    <AbsoluteFill style={{ background: 'radial-gradient(130% 95% at 50% 44%, #15151D 0%, #060608 74%)' }}>
      <div style={{ position: 'absolute', left: '50%', top: '46%', width: 1150, height: 1150, transform: 'translate(-50%,-50%)', borderRadius: '50%', background: `radial-gradient(circle, ${VLT}2e 0%, transparent 62%)`, filter: 'blur(44px)', opacity: 0.6 - zoom * 0.3 }} />

      <div style={{ position: 'absolute', top: 120, left: 0, right: 0, textAlign: 'center', fontFamily: fontMono, fontSize: 24, letterSpacing: '0.18em', color: 'rgba(255,255,255,0.72)', opacity: topLabel }}>
        LO QUE ESCUCHÁS TODO EL DÍA
      </div>

      {/* RUEDA 3D cover-flow */}
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', perspective: 1700 }}>
        <div style={{ position: 'relative', transformStyle: 'preserve-3d', width: 0, height: 0 }}>
          {CARDS.map((txt, i) => {
            if (i === SELECTED) return null; // la elegida se dibuja aparte (arriba de todo)
            const off = i - c;
            const absO = Math.abs(off);
            if (absO > 3.1) return null; // culling: no dibujar las lejanas
            const tx = off * 330;
            const ry = Math.max(-58, Math.min(58, -off * 50));
            const tz = -absO * 340;
            const op = (1 - Math.min(absO * 0.4, 0.84)) * wheelGone;
            if (op <= 0.01) return null;
            return (
              <div key={i} style={{ position: 'absolute', left: -CW / 2, top: -CH / 2, width: CW, height: CH, transform: `translateX(${tx}px) translateZ(${tz}px) rotateY(${ry}deg)`, transformOrigin: 'center', opacity: op, zIndex: 40 - Math.round(absO) }}>
                <div style={{ position: 'absolute', inset: 0, borderRadius: 34, background: 'rgba(255,255,255,0.045)', border: '1px solid rgba(255,255,255,0.12)', backdropFilter: 'blur(14px)', boxShadow: '0 30px 80px -34px rgba(0,0,0,0.8)', padding: 44, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <Meta s={18} />
                  <div style={{ fontFamily: fontDisplay, fontWeight: 600, fontSize: 54, color: '#E8E8F2', letterSpacing: '-0.02em', marginTop: 20 }}>{txt}</div>
                </div>
              </div>
            );
          })}

          {/* LA CARD ELEGIDA: se centra, recibe glow, hace zoom in y revela el payoff adentro */}
          <div style={{ position: 'absolute', left: -CW / 2, top: -CH / 2, width: CW, height: CH, transform: `translateX(${(SELECTED - c) * 330}px) scale(${zScale})`, transformOrigin: 'center', filter: zBlur > 0.3 ? `blur(${zBlur}px)` : 'none', zIndex: 100 }}>
            <SiriGlow frame={f} intensity={glow * (1 - zoom * 0.7)} radius={34} />
            <div style={{ position: 'absolute', inset: 0, borderRadius: 34 - zoom * 18, background: `linear-gradient(165deg, #211B36 0%, #0E0B17 100%)`, border: `1px solid ${VLT}${zoom > 0.5 ? '33' : '99'}`, boxShadow: `0 50px 130px -30px ${VLT}aa`, padding: 46, display: 'flex', flexDirection: 'column', justifyContent: 'center', overflow: 'hidden' }}>
              {/* la objeción (se desvanece al entrar) */}
              <div style={{ opacity: 1 - ip(f, 150, 176, 0, 1) }}>
                <Meta s={18} />
                <div style={{ fontFamily: fontDisplay, fontWeight: 600, fontSize: 62, color: '#F4F4FA', letterSpacing: '-0.02em', marginTop: 20 }}>Está caro</div>
              </div>
            </div>
          </div>
        </div>
      </AbsoluteFill>

      {/* PAYOFF: aparece "desde adentro" de la card, con marco de glow Siri (no el template plano) */}
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 96, opacity: pay, zIndex: 200 }}>
        {/* marco de glow que respira en los bordes — nos deja "dentro" de la card */}
        <div style={{ position: 'absolute', inset: 26, borderRadius: 44, border: '2px solid transparent', background: `conic-gradient(from ${(f * 4) % 360}deg, #4FE0FF, #5B8CFF, ${VLT_L}, #FF6FD8, #4FE0FF) border-box`, WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude', opacity: 0.5 * (0.7 + 0.3 * Math.sin(f * 0.18)) } as React.CSSProperties} />
        <div style={{ transform: `translateY(${(1 - pay) * 26}px)` }}>
          <div style={{ fontFamily: fontDisplay, fontWeight: 800, fontSize: 100, letterSpacing: '-0.04em', lineHeight: 1.0, color: '#F4F4FA' }}>No está caro.</div>
          <div style={{ fontFamily: fontDisplay, fontWeight: 800, fontSize: 100, letterSpacing: '-0.04em', lineHeight: 1.06, color: VLT_L, textShadow: `0 0 44px ${VLT}aa`, marginTop: 6 }}>Todavía no confía.</div>
          <div style={{ fontFamily: fontDisplay, fontSize: 34, color: '#9A9AB5', marginTop: 34, opacity: ip(f, 196, 220, 0, 1) }}>El precio nunca fue el problema.</div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
