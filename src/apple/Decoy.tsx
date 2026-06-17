/**
 * Decoy — Efecto señuelo (Decoy Effect).
 * Tres planes en abanico. El señuelo (mismo precio que Pro, peor features) aparece
 * y hace que Pro parezca la elección "obvia". El espectador SIENTE el tirón
 * sin darse cuenta de que la tercer opción fue puesta ahí para empujarlo.
 * Lever: efecto señuelo / arquitectura de elección. Paleta: violeta. C.
 */
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { Stage, SiriGlow, SiriFrame, ip, fonts, VLT, VLT_L } from './kit';

export const DECOY_DURATION = 370;

const PLANS = [
  { name: 'BÁSICO',   price: '$1.900', feat: ['Chat básico', '1 flujo', 'Sin soporte'],         role: 'left'  },
  { name: 'SEÑUELO',  price: '$5.800', feat: ['Chat + email', '3 flujos', 'Sin soporte'],        role: 'decoy' },
  { name: 'PRO',      price: '$5.900', feat: ['Todo incluido', 'Sin límites', 'Soporte 24/7'],   role: 'hero'  },
];

export const Decoy: React.FC = () => {
  const f = useCurrentFrame();

  const labelOp  = ip(f,  8,  26, 0, 1) * (1 - ip(f, 100, 118, 0, 1));
  const cIn = [ip(f, 20, 52, 0, 1), ip(f, 36, 68, 0, 1), ip(f, 52, 84, 0, 1)];
  const heroGlow = ip(f, 102, 132, 0, 1);
  const decoyDim = ip(f, 112, 148, 0, 0.72);
  const arrowOp  = ip(f, 150, 170, 0, 1) * (1 - ip(f, 198, 216, 0, 1));
  const sceneFade = 1 - ip(f, 202, 222, 0, 1);
  const pay  = ip(f, 228, 248, 0, 1);
  const l1   = ip(f, 248, 264, 0, 1);
  const l2   = ip(f, 272, 290, 0, 1);
  const psub = ip(f, 302, 320, 0, 1);

  const CY = 900;
  const CW = 290;
  const CH = 500;
  const OFFSETS = [-324, 0, 324];

  return (
    <Stage bg="radial-gradient(120% 95% at 50% 40%, #130D1E 0%, #060409 80%)" hue={VLT_L} seed={9}>
      <div style={{
        position: 'absolute', top: 272, left: 90, right: 130,
        textAlign: 'center', fontFamily: fonts.mono,
        fontSize: 38, letterSpacing: '0.16em',
        color: 'rgba(255,255,255,0.60)', opacity: labelOp, zIndex: 30,
      }}>EL EFECTO SEÑUELO</div>

      <AbsoluteFill style={{ opacity: sceneFade, zIndex: 10 }}>
        {PLANS.map((plan, i) => {
          const isHero  = plan.role === 'hero';
          const isDecoy = plan.role === 'decoy';
          const dimOp   = isDecoy ? 1 - decoyDim : 1;
          return (
            <div key={i} style={{
              position: 'absolute', left: '50%', top: CY,
              transform: `translate(calc(-50% + ${OFFSETS[i]}px), -50%)`,
              opacity: cIn[i] * dimOp,
              zIndex: isHero ? 10 : 1,
            }}>
              {isHero && <SiriGlow frame={f} intensity={heroGlow} radius={30} />}
              <div style={{
                width: CW, height: CH, borderRadius: 34,
                background: isHero && heroGlow > 0.05
                  ? 'linear-gradient(165deg,#1A1030 0%,#0A0818 100%)'
                  : 'rgba(255,255,255,0.05)',
                border: `1px solid ${isHero && heroGlow > 0.05 ? VLT + '99' : 'rgba(255,255,255,0.10)'}`,
                backdropFilter: 'blur(14px)',
                boxShadow: isHero && heroGlow > 0.05
                  ? `0 50px 120px -28px ${VLT}88`
                  : '0 24px 60px -28px rgba(0,0,0,0.80)',
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', padding: 32, gap: 12,
              }}>
                {isDecoy && (
                  <div style={{
                    fontFamily: fonts.mono, fontSize: 22, letterSpacing: '0.18em',
                    color: 'rgba(200,130,70,0.72)',
                  }}>⚡ SEÑUELO</div>
                )}
                <div style={{
                  fontFamily: fonts.mono, fontSize: 28, letterSpacing: '0.14em',
                  color: isHero ? `${VLT_L}dd` : 'rgba(140,140,160,0.65)',
                  marginTop: isDecoy ? 0 : 16,
                }}>{plan.name}</div>
                <div style={{
                  fontFamily: fonts.display, fontWeight: 800,
                  fontSize: isHero ? 74 : 68,
                  color: isHero ? VLT_L : 'rgba(200,200,220,0.75)',
                  letterSpacing: '-0.04em', lineHeight: 1,
                  textShadow: isHero ? `0 0 44px ${VLT}aa` : 'none',
                }}>{plan.price}</div>
                <div style={{ fontFamily: fonts.mono, fontSize: 26, color: 'rgba(110,110,130,0.65)' }}>/mes</div>
                <div style={{ width: '100%', height: 1, background: 'rgba(255,255,255,0.08)', margin: '6px 0' }} />
                {plan.feat.map((ft, j) => (
                  <div key={j} style={{
                    fontFamily: fonts.display, fontSize: 32,
                    color: isHero ? `${VLT_L}bb` : 'rgba(130,130,150,0.60)',
                    textAlign: 'center', lineHeight: 1.3,
                  }}>{ft}</div>
                ))}
              </div>
            </div>
          );
        })}

        {/* Flecha hacia PRO */}
        <div style={{
          position: 'absolute', left: '50%', top: CY + 286,
          transform: 'translate(calc(-50% + 324px), 0)',
          opacity: arrowOp,
        }}>
          <div style={{
            fontFamily: fonts.display, fontSize: 46, fontWeight: 700,
            color: VLT_L, textAlign: 'center',
            textShadow: `0 0 30px ${VLT}99`,
          }}>← obvia</div>
        </div>
      </AbsoluteFill>

      {/* PAYOFF */}
      <AbsoluteFill style={{
        alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', padding: '0 96px',
        opacity: pay, zIndex: 200,
      }}>
        <SiriFrame frame={f} intensity={pay} />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 22 }}>
          <div style={{
            fontFamily: fonts.display, fontWeight: 800, fontSize: 92,
            color: '#E0D0FF', letterSpacing: '-0.035em', lineHeight: 1.06,
            opacity: l1, transform: `translateY(${(1 - l1) * 22}px)`,
          }}>El señuelo vende<br />el plan del medio.</div>
          <div style={{
            fontFamily: fonts.display, fontWeight: 800, fontSize: 86,
            color: VLT_L, letterSpacing: '-0.04em', lineHeight: 1.05,
            textShadow: `0 0 60px ${VLT}bb`,
            opacity: l2, transform: `translateY(${(1 - l2) * 26}px)`,
          }}>No es trampa.<br />Es arquitectura.</div>
          <div style={{
            fontFamily: fonts.display, fontSize: 50,
            color: 'rgba(160,130,200,0.70)', lineHeight: 1.45,
            opacity: psub, transform: `translateY(${(1 - psub) * 16}px)`,
            marginTop: 12,
          }}>
            Diseñá tus planes<br />para que el mejor parezca obvio.
          </div>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};
