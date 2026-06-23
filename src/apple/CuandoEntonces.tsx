/**
 * CuandoEntonces — Implementation Intentions. "Voy a hacer X" no funciona.
 * "Cuando pase Y, haré X en Z" sí. Una intención vaga queda apagada y sin
 * respuesta. Un plan Si-Cuando específico brilla con glow y genera acción.
 * El espectador ve la diferencia entre intención y plan concreto.
 *
 * Lever: implementation intentions / Gollwitzer. Paleta: verde-cyan. V.
 */
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { Stage, SiriGlow, SiriFrame, BigType, ip, fonts, Glass } from './kit';

export const CUANDOENTONCES_DURATION = 294;

const GREEN = '#10B981';
const GREEN_L = '#34D399';
const CYAN = '#4FE0FF';

export const CuandoEntonces: React.FC = () => {
  const f = useCurrentFrame();

  const labelIn = ip(f, 8, 28, 0, 1) * (1 - ip(f, 206, 220, 0, 1));

  // Tarjeta de intención vaga — entra apagada
  const vagueIn = ip(f, 22, 52, 0, 1);
  // La etiqueta "INTENCIÓN" aparece
  const vagueLabel = ip(f, 45, 65, 0, 1) * (1 - ip(f, 88, 105, 0, 1));
  // Se tacha / fade
  const vagueFade = ip(f, 88, 118, 0, 1);

  // La tarjeta de plan Si-Cuando entra con energía
  const planIn = ip(f, 108, 148, 0, 1);
  const planGlow = ip(f, 132, 175, 0, 1) * (1 - ip(f, 204, 218, 0, 1));

  // El check de completion aparece
  const check1 = ip(f, 160, 182, 0, 1) * (1 - ip(f, 203, 215, 0, 1));
  const check2 = ip(f, 170, 192, 0, 1) * (1 - ip(f, 203, 215, 0, 1));
  const check3 = ip(f, 180, 202, 0, 1) * (1 - ip(f, 203, 215, 0, 1));

  // Stat — "3x más probable"
  const statIn = ip(f, 148, 175, 0, 1) * (1 - ip(f, 202, 215, 0, 1));

  const pay = ip(f, 220, 258, 0, 1);

  return (
    <Stage
      bg="radial-gradient(130% 92% at 50% 44%, #051A10 0%, #020A06 80%)"
      hue={GREEN}
      seed={3}
    >
      <div style={{
        position: 'absolute', top: 252, left: 0, right: 0, textAlign: 'center',
        fontFamily: fonts.mono, fontSize: 30, letterSpacing: '0.18em',
        color: 'rgba(255,255,255,0.50)', opacity: labelIn, zIndex: 30,
      }}>
        ¿POR QUÉ NO HACEMOS LO QUE PLANEAMOS?
      </div>

      <AbsoluteFill style={{ opacity: 1 - pay }}>

        {/* Tarjeta intención vaga */}
        <div style={{
          position: 'absolute', top: 330, left: 90, right: 130,
          opacity: vagueIn * (1 - vagueFade * 0.75),
          transform: `translateY(${(1 - vagueIn) * 24}px)`,
        }}>
          <div style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.10)',
            borderRadius: 28, padding: '28px 38px',
            position: 'relative',
          }}>
            <div style={{
              fontFamily: fonts.mono, fontSize: 26,
              color: vagueFade > 0.3 ? '#EF4444' : 'rgba(255,255,255,0.32)',
              letterSpacing: '0.12em', marginBottom: 12,
              opacity: vagueLabel,
            }}>
              ✗ INTENCIÓN VAGA
            </div>
            <div style={{
              fontFamily: fonts.display, fontWeight: 700, fontSize: 46,
              color: `rgba(255,255,255,${0.62 - vagueFade * 0.52})`,
              textDecoration: vagueFade > 0.5 ? 'line-through' : 'none',
              textDecorationColor: '#EF4444',
            }}>
              "Voy a responder más rápido a los leads."
            </div>
            {vagueFade > 0.4 && (
              <div style={{
                position: 'absolute', top: 38, right: 38,
                fontFamily: fonts.display, fontWeight: 900, fontSize: 52,
                color: '#EF444488',
                opacity: vagueFade,
              }}>
                ✗
              </div>
            )}
          </div>
        </div>

        {/* Tarjeta Si-Cuando */}
        {planIn > 0.01 && (
          <div style={{
            position: 'absolute', top: 490, left: 90, right: 130,
            opacity: planIn,
            transform: `translateY(${(1 - planIn) * 28}px)`,
          }}>
            <Glass w={860} selected style={{ position: 'relative' }}>
              {planGlow > 0.01 && (
                <SiriGlow frame={f} intensity={planGlow} radius={34} inset={0} />
              )}
              <div style={{
                fontFamily: fonts.mono, fontSize: 26,
                color: GREEN, letterSpacing: '0.12em', marginBottom: 14,
              }}>
                ✓ PLAN ESPECÍFICO
              </div>
              <div style={{ fontFamily: fonts.display, fontWeight: 400, fontSize: 32, color: GREEN_L, marginBottom: 8 }}>
                <span style={{ color: CYAN, fontWeight: 700 }}>CUANDO</span> llegue un lead nuevo...
              </div>
              <div style={{ fontFamily: fonts.display, fontWeight: 400, fontSize: 32, color: GREEN_L, marginBottom: 8 }}>
                <span style={{ color: CYAN, fontWeight: 700 }}>ENTONCES</span> le respondo en 5 minutos...
              </div>
              <div style={{ fontFamily: fonts.display, fontWeight: 400, fontSize: 32, color: GREEN_L }}>
                <span style={{ color: CYAN, fontWeight: 700 }}>CON</span> el mensaje guardado en notas.
              </div>
            </Glass>
          </div>
        )}

        {/* Checkmarks de seguimiento */}
        <div style={{
          position: 'absolute', top: 830, left: 90,
          display: 'flex', gap: 28,
        }}>
          {[check1, check2, check3].map((c, i) => (
            <div key={i} style={{
              opacity: c,
              transform: `scale(${0.6 + c * 0.4})`,
              width: 68, height: 68, borderRadius: '50%',
              background: `${GREEN}28`, border: `2px solid ${GREEN}66`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <div style={{ fontFamily: fonts.display, fontWeight: 900, fontSize: 36, color: GREEN_L }}>
                ✓
              </div>
            </div>
          ))}
          <div style={{
            opacity: check1,
            display: 'flex', alignItems: 'center',
            fontFamily: fonts.display, fontWeight: 600, fontSize: 38,
            color: 'rgba(255,255,255,0.65)',
          }}>
            3 leads seguidos con éxito
          </div>
        </div>

        {/* Stat */}
        {statIn > 0.01 && (
          <div style={{
            position: 'absolute', bottom: 450, left: 0, right: 0,
            textAlign: 'center', opacity: statIn,
          }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 18,
              background: `${GREEN}18`, border: `1px solid ${GREEN}44`,
              borderRadius: 50, padding: '16px 48px',
            }}>
              <div style={{ fontFamily: fonts.display, fontWeight: 900, fontSize: 56, color: GREEN_L, textShadow: `0 0 20px ${GREEN}88` }}>
                3×
              </div>
              <div style={{ fontFamily: fonts.display, fontWeight: 600, fontSize: 36, color: GREEN_L }}>
                más probable de ejecutarlo
              </div>
            </div>
          </div>
        )}
      </AbsoluteFill>

      {/* PAYOFF */}
      <AbsoluteFill style={{
        alignItems: 'center', justifyContent: 'center', textAlign: 'center',
        paddingLeft: 90, paddingRight: 130, opacity: pay, zIndex: 200,
      }}>
        <SiriFrame frame={f} intensity={pay} />
        <div style={{ transform: `translateY(${(1 - pay) * 26}px)` }}>
          <BigType frame={f} s={224} size={88} lines={[
            { t: '"Voy a hacerlo"' },
            { t: 'no es un plan.' },
            { t: 'Cuándo y cómo, sí.', hl: true },
          ]} />
          <div style={{
            fontFamily: fonts.display, fontWeight: 400, fontSize: 38,
            color: '#9A9AB5', marginTop: 32,
            opacity: ip(f, 270, 290, 0, 1),
          }}>
            Ayudá a tu cliente a armar el plan. Lo ejecuta 3 veces más.
          </div>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};
