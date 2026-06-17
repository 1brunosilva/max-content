/**
 * EfectoIKEA — Efecto IKEA (endowment through assembly).
 * Un dashboard se arma pieza a pieza frente al espectador. Cada elemento
 * cae y se asienta. Al final, está completo — y el espectador siente que
 * lo armó él. Lo que uno ayuda a construir, lo valora más.
 * Lever: efecto IKEA / participación en la creación. Paleta: cyan. C.
 */
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { Stage, SiriGlow, SiriFrame, ip, fonts } from './kit';

const CYAN   = '#4FE0FF';
const CYAN_L = '#A5F3FC';
const CYAN_D = '#0E7490';

export const EFECTOIKEA_DURATION = 360;

const ELEMENTS = [
  { label: 'MÉTRICAS',      value: '1.240',  sub: 'consultas este mes',    delay: 20  },
  { label: 'CONVERSIÓN',    value: '34%',     sub: 'leads → clientes',      delay: 40  },
  { label: 'TIEMPO AHORRADO', value: '82h',  sub: 'al mes automatizando',  delay: 60  },
  { label: 'SATISFACCIÓN',  value: '4.9★',    sub: 'promedio de reseñas',   delay: 80  },
  { label: 'FACTURACIÓN',   value: '+$38k',   sub: 'vs. mismo mes año ant.', delay: 100 },
];

export const EfectoIKEA: React.FC = () => {
  const f = useCurrentFrame();

  const labelOp   = ip(f,  8,  26, 0, 1) * (1 - ip(f, 108, 126, 0, 1));
  const headerIn  = ip(f, 14,  40, 0, 1);
  const glowI     = ip(f, 118, 152, 0, 1);
  const realOp    = ip(f, 162, 182, 0, 1) * (1 - ip(f, 214, 232, 0, 1));
  const sceneFade = 1 - ip(f, 220, 242, 0, 1);
  const pay  = ip(f, 248, 268, 0, 1);
  const l1   = ip(f, 268, 284, 0, 1);
  const l2   = ip(f, 292, 308, 0, 1);
  const psub = ip(f, 320, 338, 0, 1);

  const CW = 840;

  return (
    <Stage bg="radial-gradient(130% 100% at 50% 38%, #061418 0%, #020709 82%)" hue={CYAN} seed={12}>
      <div style={{
        position: 'absolute', top: 272, left: 90, right: 130,
        textAlign: 'center', fontFamily: fonts.mono,
        fontSize: 38, letterSpacing: '0.16em',
        color: 'rgba(255,255,255,0.62)', opacity: labelOp, zIndex: 30,
      }}>
        EL EFECTO IKEA
      </div>

      {/* Dashboard que se arma */}
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', opacity: sceneFade, zIndex: 10 }}>
        <div style={{ position: 'relative', width: CW }}>
          {/* Marco del glow cuando está completo */}
          <div style={{ position: 'absolute', inset: -8, borderRadius: 46 }}>
            <SiriGlow frame={f} intensity={glowI * 0.7} radius={44} />
          </div>

          {/* Header del dashboard */}
          <div style={{
            opacity: headerIn,
            transform: `translateY(${(1 - headerIn) * -18}px)`,
            borderRadius: '34px 34px 0 0',
            background: glowI > 0.05 ? 'linear-gradient(165deg,#061C22 0%,#030D10 100%)' : 'rgba(255,255,255,0.06)',
            border: `1px solid ${glowI > 0.05 ? CYAN + '77' : 'rgba(255,255,255,0.10)'}`,
            borderBottom: 'none',
            backdropFilter: 'blur(14px)',
            padding: '36px 48px 28px',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <div style={{ fontFamily: fonts.mono, fontSize: 34, letterSpacing: '0.14em', color: `${CYAN}cc` }}>
              DASHBOARD · CONCEPTO AI
            </div>
            <div style={{ fontFamily: fonts.display, fontSize: 34, color: 'rgba(200,220,230,0.55)' }}>
              Jun 2026
            </div>
          </div>

          {/* Elementos que caen uno a uno */}
          {ELEMENTS.map((el, i) => {
            const elIn = ip(f, el.delay, el.delay + 30, 0, 1);
            const isLast = i === ELEMENTS.length - 1;
            return (
              <div key={i} style={{
                opacity: elIn,
                transform: `translateY(${(1 - elIn) * -14}px)`,
                background: glowI > 0.05 ? 'linear-gradient(180deg,#061C22 0%,#030D10 100%)' : 'rgba(255,255,255,0.04)',
                border: `1px solid ${glowI > 0.05 ? CYAN + '44' : 'rgba(255,255,255,0.08)'}`,
                borderTop: 'none',
                borderRadius: isLast ? '0 0 34px 34px' : 0,
                backdropFilter: 'blur(14px)',
                padding: '26px 48px',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <div style={{ fontFamily: fonts.mono, fontSize: 26, letterSpacing: '0.14em', color: 'rgba(160,190,200,0.65)' }}>{el.label}</div>
                  <div style={{ fontFamily: fonts.display, fontSize: 34, color: 'rgba(180,200,210,0.60)' }}>{el.sub}</div>
                </div>
                <div style={{
                  fontFamily: fonts.display, fontWeight: 800, fontSize: 68,
                  color: glowI > 0.05 ? CYAN_L : 'rgba(210,225,235,0.85)',
                  letterSpacing: '-0.03em',
                  textShadow: glowI > 0.05 ? `0 0 40px ${CYAN}aa` : 'none',
                }}>{el.value}</div>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>

      {/* Realización */}
      <AbsoluteFill style={{
        alignItems: 'center', justifyContent: 'flex-end',
        paddingBottom: 450, paddingLeft: 90, paddingRight: 130,
        opacity: realOp * sceneFade, zIndex: 40,
      }}>
        <div style={{
          fontFamily: fonts.display, fontWeight: 700, fontSize: 60,
          color: CYAN_L, letterSpacing: '-0.025em',
          textAlign: 'center', lineHeight: 1.35,
          textShadow: `0 0 36px ${CYAN}77`,
        }}>
          Vos lo armaste.
          <br />
          <span style={{ color: 'rgba(180,215,230,0.60)', fontWeight: 500, fontSize: 46 }}>
            Por eso lo valorás más.
          </span>
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
            color: '#C8F4FF', letterSpacing: '-0.035em', lineHeight: 1.08,
            opacity: l1, transform: `translateY(${(1 - l1) * 22}px)`,
          }}>Lo que el cliente<br />ayuda a armar,</div>
          <div style={{
            fontFamily: fonts.display, fontWeight: 800, fontSize: 100,
            color: CYAN_L, letterSpacing: '-0.04em', lineHeight: 1.05,
            textShadow: `0 0 60px ${CYAN}bb`,
            opacity: l2, transform: `translateY(${(1 - l2) * 26}px)`,
          }}>lo valora más.</div>
          <div style={{
            fontFamily: fonts.display, fontSize: 50,
            color: CYAN_D, lineHeight: 1.45,
            opacity: psub, transform: `translateY(${(1 - psub) * 16}px)`,
            marginTop: 12,
          }}>
            Hacé que el cliente participe<br />desde el primer paso.
          </div>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};
