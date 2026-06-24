/**
 * RazonPorque — The "Because" Effect / Reason Heuristic.
 * Ellen Langer 1978: agregar cualquier razón (incluso trivial) después de
 * "porque..." duplica la tasa de compliance. Dos solicitudes idénticas;
 * sin razón → rechazo; con "porque..." → aceptación con glow.
 * El espectador SIENTE el contraste antes de leer el payoff.
 *
 * Lever: reason heuristic / compliance trigger. Paleta: verde-cyan. C.
 */
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { Stage, SiriGlow, SiriFrame, BigType, ip, fonts } from './kit';

export const RAZONPORQUE_DURATION = 288;

const CYAN = '#4FE0FF';
const GREEN = '#10B981';

export const RazonPorque: React.FC = () => {
  const f = useCurrentFrame();

  const labelIn = ip(f, 8, 28, 0, 1) * (1 - ip(f, 202, 216, 0, 1));

  // Tarjeta A: sin razón (rechazada)
  const cardAIn = ip(f, 28, 56, 0, 1);
  const cardAFade = ip(f, 95, 125, 0, 1);
  const rejectIn = ip(f, 68, 90, 0, 1) * (1 - cardAFade);

  // Tarjeta B: con "porque..." (aceptada)
  const cardBIn = ip(f, 130, 162, 0, 1);
  const glowB = ip(f, 164, 195, 0, 1) * (1 - ip(f, 200, 215, 0, 1));
  const acceptIn = ip(f, 166, 190, 0, 1) * (1 - ip(f, 200, 215, 0, 1));

  const pay = ip(f, 216, 256, 0, 1);

  return (
    <Stage
      bg="radial-gradient(130% 92% at 50% 44%, #051208 0%, #020708 80%)"
      hue={GREEN}
      seed={6}
    >
      <div style={{
        position: 'absolute', top: 252, left: 0, right: 0, textAlign: 'center',
        fontFamily: fonts.mono, fontSize: 30, letterSpacing: '0.18em',
        color: 'rgba(255,255,255,0.50)', opacity: labelIn, zIndex: 30,
      }}>
        EL EFECTO "PORQUE"
      </div>

      <AbsoluteFill style={{ opacity: 1 - pay }}>

        {/* Tarjeta A — sin razón */}
        <div style={{
          position: 'absolute', top: 320, left: 90, right: 130,
          opacity: cardAIn * (1 - cardAFade),
          transform: `translateY(${(1 - cardAIn) * 22}px)`,
        }}>
          <div style={{
            background: 'rgba(239,68,68,0.06)',
            border: '1px solid rgba(239,68,68,0.22)',
            borderRadius: 30, padding: '38px 52px',
            position: 'relative',
          }}>
            <div style={{
              fontFamily: fonts.mono, fontSize: 26, color: 'rgba(255,255,255,0.35)',
              letterSpacing: '0.14em', marginBottom: 18,
            }}>
              SIN RAZÓN
            </div>
            <div style={{
              fontFamily: fonts.display, fontWeight: 700, fontSize: 52,
              color: 'rgba(255,255,255,0.55)', lineHeight: 1.18,
            }}>
              "¿Me podés enviar la propuesta hoy?"
            </div>

            {/* Stamp RECHAZADO */}
            {rejectIn > 0.05 && (
              <div style={{
                position: 'absolute', top: 28, right: 28,
                background: 'rgba(239,68,68,0.15)',
                border: '2px solid rgba(239,68,68,0.55)',
                borderRadius: 10, padding: '8px 20px',
                fontFamily: fonts.display, fontWeight: 900, fontSize: 30,
                color: '#EF4444',
                transform: `rotate(${-8}deg) scale(${0.6 + rejectIn * 0.4})`,
                opacity: rejectIn,
                textShadow: '0 0 12px rgba(239,68,68,0.5)',
              }}>
                IGNORADO
              </div>
            )}
          </div>
        </div>

        {/* Flecha / separador */}
        <div style={{
          position: 'absolute', top: 625, left: 0, right: 0, textAlign: 'center',
          fontFamily: fonts.mono, fontSize: 44, color: 'rgba(255,255,255,0.18)',
          opacity: ip(f, 138, 155, 0, 1) * (1 - ip(f, 200, 215, 0, 1)),
        }}>
          ↓
        </div>

        {/* Tarjeta B — con porque */}
        <div style={{
          position: 'absolute', top: 680, left: 90, right: 130,
          opacity: cardBIn,
          transform: `translateY(${(1 - cardBIn) * 22}px)`,
        }}>
          <div style={{
            background: glowB > 0.1 ? `${GREEN}12` : 'rgba(255,255,255,0.05)',
            border: `1.5px solid ${glowB > 0.1 ? GREEN + '44' : 'rgba(255,255,255,0.12)'}`,
            borderRadius: 30, padding: '38px 52px',
            position: 'relative',
            transition: 'all 0.3s',
          }}>
            {glowB > 0.01 && (
              <SiriGlow frame={f} intensity={glowB * 0.8} radius={30} inset={0} />
            )}
            <div style={{
              fontFamily: fonts.mono, fontSize: 26, color: glowB > 0.3 ? CYAN : 'rgba(255,255,255,0.35)',
              letterSpacing: '0.14em', marginBottom: 18,
            }}>
              CON "PORQUE..."
            </div>
            <div style={{
              fontFamily: fonts.display, fontWeight: 700, fontSize: 52,
              color: glowB > 0.3 ? '#F4F4FA' : 'rgba(255,255,255,0.55)', lineHeight: 1.18,
            }}>
              "¿Me podés enviar la propuesta hoy{' '}
              <span style={{ color: CYAN }}>porque</span>{' '}
              tengo una reunión mañana?"
            </div>

            {/* Stamp ACEPTADO */}
            {acceptIn > 0.05 && (
              <div style={{
                position: 'absolute', top: 28, right: 28,
                background: `${GREEN}20`,
                border: `2px solid ${GREEN}77`,
                borderRadius: 10, padding: '8px 20px',
                fontFamily: fonts.display, fontWeight: 900, fontSize: 30,
                color: GREEN,
                transform: `rotate(${-4}deg) scale(${0.6 + acceptIn * 0.4})`,
                opacity: acceptIn,
                textShadow: `0 0 12px ${GREEN}55`,
              }}>
                ✓ RESPONDIDO
              </div>
            )}
          </div>
        </div>

        {/* Stat bottom */}
        <div style={{
          position: 'absolute', bottom: 440, left: 0, right: 0, textAlign: 'center',
          opacity: ip(f, 190, 210, 0, 1) * (1 - ip(f, 200, 215, 0, 1)),
        }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 18,
            background: `${GREEN}14`, border: `1px solid ${GREEN}44`,
            borderRadius: 50, padding: '14px 44px',
          }}>
            <div style={{ fontFamily: fonts.display, fontWeight: 900, fontSize: 52, color: GREEN }}>2×</div>
            <div style={{ fontFamily: fonts.display, fontWeight: 600, fontSize: 34, color: 'rgba(255,255,255,0.7)' }}>
              más compliance con una razón
            </div>
          </div>
        </div>
      </AbsoluteFill>

      {/* PAYOFF */}
      <AbsoluteFill style={{
        alignItems: 'center', justifyContent: 'center', textAlign: 'center',
        paddingLeft: 90, paddingRight: 130, opacity: pay, zIndex: 200,
      }}>
        <SiriFrame frame={f} intensity={pay} />
        <div style={{ transform: `translateY(${(1 - pay) * 26}px)` }}>
          <BigType frame={f} s={220} size={92} lines={[
            { t: 'Una razón,' },
            { t: 'aunque pequeña,' },
            { t: 'duplica el sí.', hl: true },
          ]} />
          <div style={{
            fontFamily: fonts.display, fontWeight: 400, fontSize: 38,
            color: '#9A9AB5', marginTop: 32,
            opacity: ip(f, 264, 284, 0, 1),
          }}>
            "Porque" es la palabra más barata de tu copy.
          </div>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};
