/**
 * PrecioCalidad — Price-Quality Heuristic.
 * El mismo producto. El precio sube → la calidad percibida sube con él.
 * Una barra de "calidad percibida" que trepa cada vez que el precio aumenta.
 * Lever: price-quality heuristic / Veblen effect. Palette: dorado. Mode: editorial-claro. C.
 */
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { Stage, SiriGlow, SiriFrame, BigType, ip, fonts } from './kit';

const GOLD   = '#D97706';
const GOLD_L = '#FCD34D';
const DARK   = '#1C1000';

const STEPS = [
  { price: '$490',   quality: 28, frame: 30  },
  { price: '$990',   quality: 54, frame: 68  },
  { price: '$1.990', quality: 74, frame: 106 },
  { price: '$4.900', quality: 91, frame: 144 },
];

export const PRECIOCALIDAD_DURATION = 268;

export const PrecioCalidad: React.FC = () => {
  const f = useCurrentFrame();

  const titleOp    = ip(f, 6, 22, 0, 1) * (1 - ip(f, 182, 198, 0, 1));
  const productOp  = ip(f, 14, 32, 0, 1) * (1 - ip(f, 182, 198, 0, 1));
  const labelOp    = ip(f, 26, 42, 0, 1) * (1 - ip(f, 182, 198, 0, 1));
  const pay        = ip(f, 190, 218, 0, 1);

  const activeStep = STEPS.findIndex((s, i) => {
    const next = STEPS[i + 1];
    return f >= s.frame && (!next || f < next.frame);
  });
  const currentStep = activeStep >= 0 ? activeStep : STEPS.length - 1;

  const priceIn   = ip(f, STEPS[currentStep].frame, STEPS[currentStep].frame + 22, 0, 1);
  const barTarget = STEPS[currentStep].quality;
  const barW      = ip(f, STEPS[currentStep].frame, STEPS[currentStep].frame + 34, currentStep > 0 ? STEPS[currentStep - 1].quality : 0, barTarget);
  const glowI     = ip(f, 150, 175, 0, 1);

  return (
    <Stage
      bg="radial-gradient(120% 88% at 50% 42%, #FFF8E8 0%, #FBF0CF 100%)"
      hue={GOLD}
      seed={3}
    >
      {/* Title */}
      <div style={{
        position: 'absolute', top: 240, left: 90, right: 130, textAlign: 'center',
        fontFamily: fonts.mono, fontSize: 19, letterSpacing: '0.16em',
        color: `${DARK}55`, opacity: titleOp,
      }}>
        MISMO PRODUCTO · MISMO SERVICIO
      </div>

      <AbsoluteFill style={{ opacity: 1 - pay }}>
        <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: 780, display: 'flex', flexDirection: 'column', gap: 40 }}>

            {/* Product card */}
            <div style={{
              opacity: productOp,
              borderRadius: 28,
              background: 'rgba(255,255,255,0.82)',
              border: `1.5px solid ${GOLD}44`,
              backdropFilter: 'blur(14px)',
              padding: '32px 40px',
              boxShadow: glowI > 0.2 ? `0 0 48px ${GOLD}44` : '0 12px 48px rgba(0,0,0,0.08)',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              position: 'relative',
            }}>
              {glowI > 0.05 ? <SiriGlow frame={f} intensity={glowI * 0.55} radius={28} /> : null}
              <div>
                <div style={{ fontFamily: fonts.mono, fontSize: 16, letterSpacing: '0.14em', color: `${DARK}44` }}>
                  CONSULTORÍA BÁSICA
                </div>
                <div style={{
                  fontFamily: fonts.display, fontWeight: 700, fontSize: 40,
                  color: DARK, letterSpacing: '-0.025em', marginTop: 6,
                }}>
                  1 sesión de 60 min
                </div>
              </div>
              <div style={{
                fontFamily: fonts.display, fontWeight: 900, fontSize: 68,
                color: glowI > 0.2 ? GOLD : DARK,
                letterSpacing: '-0.04em',
                opacity: priceIn,
                transform: `scale(${0.8 + priceIn * 0.2})`,
                textShadow: glowI > 0.2 ? `0 0 28px ${GOLD}99` : 'none',
                transition: 'color 0.3s, text-shadow 0.3s',
              }}>
                {STEPS[currentStep].price}
              </div>
            </div>

            {/* Quality bar */}
            <div style={{ opacity: labelOp }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                <div style={{ fontFamily: fonts.mono, fontSize: 17, letterSpacing: '0.12em', color: `${DARK}66` }}>
                  CALIDAD PERCIBIDA
                </div>
                <div style={{
                  fontFamily: fonts.display, fontWeight: 900, fontSize: 44,
                  color: glowI > 0.2 ? GOLD : DARK,
                  textShadow: glowI > 0.2 ? `0 0 20px ${GOLD}88` : 'none',
                }}>
                  {Math.round(barW)}%
                </div>
              </div>
              <div style={{ height: 22, borderRadius: 11, background: 'rgba(0,0,0,0.08)', overflow: 'hidden' }}>
                <div style={{
                  height: '100%', borderRadius: 11, width: `${barW}%`,
                  background: `linear-gradient(90deg, ${GOLD} 0%, ${GOLD_L} 100%)`,
                  boxShadow: glowI > 0.2 ? `0 0 18px ${GOLD}AA` : 'none',
                  transition: 'box-shadow 0.3s',
                }} />
              </div>
              <div style={{
                fontFamily: fonts.display, fontSize: 28, color: `${DARK}55`,
                marginTop: 14, textAlign: 'center',
                opacity: ip(f, 158, 178, 0, 1) * (1 - ip(f, 182, 198, 0, 1)),
              }}>
                El precio habla antes que el producto.
              </div>
            </div>
          </div>
        </AbsoluteFill>
      </AbsoluteFill>

      {/* Payoff */}
      <AbsoluteFill style={{
        alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', padding: '0 96px',
        opacity: pay, zIndex: 200,
      }}>
        <SiriFrame frame={f} intensity={pay} />
        <div style={{ transform: `translateY(${(1 - pay) * 28}px)` }}>
          <BigType frame={f} s={190} size={88} lines={[
            { t: 'Tu precio' },
            { t: 'también es', hl: false },
            { t: 'tu mensaje.', hl: true },
          ]} dark={false} />
          <div style={{
            fontFamily: fonts.display, fontSize: 30,
            color: `${DARK}66`, marginTop: 28,
            opacity: ip(f, 232, 252, 0, 1),
          }}>
            Cobrar más comunica más valor.
          </div>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};
