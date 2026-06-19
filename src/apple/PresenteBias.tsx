/**
 * PresenteBias — Present bias / hyperbolic discounting.
 * Timeline con HOY (grande, brillante, cyan) vs 30 DÍAS (pequeño, borroso, apagado).
 * El cursor señala HOY instintivamente. "El cerebro elige HOY."
 * Lever: present bias / hyperbolic discounting. Palette: azul-profundo/cyan. Mode: glassy-oscuro profundo. C.
 */
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { Stage, SiriGlow, SiriFrame, BigType, ip, fonts } from './kit';

const CYAN   = '#4FE0FF';
const CYAN_L = '#A5F3FC';
const CYAN_D = '#0E7490';

export const PRESENTEBIAS_DURATION = 268;

export const PresenteBias: React.FC = () => {
  const f = useCurrentFrame();

  const timelineOp  = ip(f, 10, 32, 0, 1);
  const nowCardIn   = ip(f, 18, 46, 0, 1);
  const laterCardIn = ip(f, 38, 64, 0, 1);
  const cursorIn    = ip(f, 80, 102, 0, 1);
  const brainLabel  = ip(f, 122, 140, 0, 1) * (1 - ip(f, 178, 195, 0, 1));
  const statOp      = ip(f, 152, 172, 0, 1) * (1 - ip(f, 178, 195, 0, 1));
  const pay         = ip(f, 185, 212, 0, 1);

  const nowGlow     = ip(f, 18, 80, 0, 1);

  return (
    <Stage
      bg="radial-gradient(120% 88% at 50% 44%, #020D1A 0%, #010509 80%)"
      hue={CYAN}
      seed={10}
    >
      {/* Timeline axis */}
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', opacity: 1 - pay }}>
        <div style={{ position: 'relative', width: 840, height: 560 }}>

          {/* Dotted timeline line */}
          <div style={{
            position: 'absolute', top: '50%', left: 0, right: 0,
            height: 3,
            background: 'repeating-linear-gradient(90deg, rgba(79,224,255,0.35) 0px, rgba(79,224,255,0.35) 14px, transparent 14px, transparent 28px)',
            transform: 'translateY(-50%)',
            opacity: timelineOp,
          }} />

          {/* NOW card — left, large, bright */}
          <div style={{
            position: 'absolute', left: 30, top: '50%',
            transform: `translateY(-50%) scale(${0.75 + nowCardIn * 0.25})`,
            opacity: nowCardIn,
          }}>
            {nowGlow > 0.05 ? (
              <div style={{ position: 'absolute', inset: -8, borderRadius: 40 }}>
                <SiriGlow frame={f} intensity={nowGlow * 0.85} radius={36} />
              </div>
            ) : null}
            <div style={{
              width: 280, borderRadius: 32,
              background: nowGlow > 0.1 ? 'linear-gradient(165deg, #041828 0%, #020D14 100%)' : 'rgba(79,224,255,0.06)',
              border: `2px solid ${nowGlow > 0.1 ? CYAN + '99' : 'rgba(79,224,255,0.28)'}`,
              backdropFilter: 'blur(14px)',
              padding: '36px 32px',
              boxShadow: nowGlow > 0.1 ? `0 0 ${60 * nowGlow}px ${CYAN}44` : 'none',
              textAlign: 'center',
            }}>
              <div style={{ fontFamily: fonts.mono, fontSize: 14, letterSpacing: '0.18em', color: CYAN + 'CC', marginBottom: 12 }}>
                HOY
              </div>
              <div style={{
                fontFamily: fonts.display, fontWeight: 900, fontSize: 68,
                color: CYAN_L, letterSpacing: '-0.04em', lineHeight: 1,
                textShadow: `0 0 36px ${CYAN}bb`,
              }}>$50</div>
              <div style={{ fontFamily: fonts.display, fontSize: 24, color: 'rgba(165,243,252,0.7)', marginTop: 8 }}>AHORA</div>
            </div>
          </div>

          {/* Cursor/finger pointing NOW */}
          <div style={{
            position: 'absolute', left: 310, top: '50%',
            transform: `translateY(-50%) translateX(${(1 - cursorIn) * -30}px)`,
            opacity: cursorIn * (1 - pay),
            fontSize: 52,
            filter: `drop-shadow(0 0 12px ${CYAN}88)`,
          }}>
            👆
          </div>

          {/* 30 DAYS card — right, small, blurry */}
          <div style={{
            position: 'absolute', right: 10, top: '50%',
            transform: `translateY(-50%) scale(${0.55 + laterCardIn * 0.1})`,
            opacity: laterCardIn * 0.42,
            filter: `blur(${(1 - laterCardIn * 0.5) * 3}px)`,
          }}>
            <div style={{
              width: 220, borderRadius: 28,
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.10)',
              backdropFilter: 'blur(8px)',
              padding: '28px 24px',
              textAlign: 'center',
            }}>
              <div style={{ fontFamily: fonts.mono, fontSize: 12, letterSpacing: '0.16em', color: 'rgba(79,224,255,0.35)', marginBottom: 10 }}>
                30 DÍAS
              </div>
              <div style={{
                fontFamily: fonts.display, fontWeight: 900, fontSize: 52,
                color: 'rgba(165,243,252,0.35)', letterSpacing: '-0.04em', lineHeight: 1,
              }}>$100</div>
              <div style={{ fontFamily: fonts.display, fontSize: 20, color: 'rgba(165,243,252,0.28)', marginTop: 6 }}>DESPUÉS</div>
            </div>
          </div>

          {/* Timeline dots */}
          {[150, 420, 680].map((x, i) => (
            <div key={i} style={{
              position: 'absolute', left: x, top: '50%',
              width: 10, height: 10, borderRadius: '50%',
              background: i === 0 ? CYAN : 'rgba(255,255,255,0.22)',
              transform: 'translate(-50%, -50%)',
              boxShadow: i === 0 ? `0 0 14px ${CYAN}88` : 'none',
              opacity: timelineOp,
            }} />
          ))}
        </div>

        {/* Brain label */}
        <div style={{
          position: 'absolute', bottom: 470, left: 0, right: 0, textAlign: 'center',
          fontFamily: fonts.display, fontWeight: 700, fontSize: 42,
          color: CYAN_L, letterSpacing: '-0.025em',
          opacity: brainLabel,
          textShadow: `0 0 28px ${CYAN}77`,
        }}>
          El cerebro elige HOY
        </div>

        {/* Stat */}
        <div style={{
          position: 'absolute', bottom: 430, left: 90, right: 130, textAlign: 'center',
          fontFamily: fonts.mono, fontSize: 18, letterSpacing: '0.1em',
          color: 'rgba(79,224,255,0.55)',
          opacity: statOp,
        }}>
          El 89% prefiere menos ahora que más después
        </div>
      </AbsoluteFill>

      {/* Payoff */}
      <AbsoluteFill style={{
        alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', padding: '0 96px',
        opacity: pay, zIndex: 200,
      }}>
        <SiriFrame frame={f} intensity={pay} />
        <div style={{ transform: `translateY(${(1 - pay) * 28}px)` }}>
          <BigType frame={f} s={185} size={88} lines={[
            { t: 'Tu cliente' },
            { t: 'prefiere' },
            { t: 'menos hoy', hl: true },
            { t: 'que más mañana.' },
          ]} />
          <div style={{
            fontFamily: fonts.display, fontSize: 28,
            color: CYAN_D, marginTop: 28,
            opacity: ip(f, 228, 245, 0, 1),
          }}>
            Hacé que el HOY sea irresistible.
          </div>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};
