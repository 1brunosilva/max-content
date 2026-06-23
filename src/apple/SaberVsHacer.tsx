/**
 * SaberVsHacer — Knowing-Doing Gap. La brecha entre saber y ejecutar.
 * Una montaña de tarjetas de conocimiento vs una pequeña acción que genera
 * un output masivo. El espectador ve que la ejecución apalanca más que el saber.
 * "El 90% sabe. El 10% hace. Y ese 10% gana."
 *
 * Lever: knowing-doing gap / execution bias. Paleta: dorado-ámbar. C.
 */
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { Stage, SiriGlow, SiriFrame, BigType, ip, fonts } from './kit';

export const SABERVSHACER_DURATION = 292;

const GOLD = '#F59E0B';
const GOLD_L = '#FCD34D';
const GREEN = '#10B981';
const GREEN_L = '#34D399';
const DIM = 'rgba(255,255,255,0.26)';

const KNOWLEDGE_CARDS = [
  'Marketing digital', 'Estrategia de ventas', 'Automatización',
  'CRM', 'Embudo de conversión', 'Copy persuasivo', 'Redes sociales',
  'SEO', 'Email marketing', 'Analytics',
];

export const SaberVsHacer: React.FC = () => {
  const f = useCurrentFrame();

  const labelIn = ip(f, 8, 28, 0, 1) * (1 - ip(f, 202, 216, 0, 1));

  // Las tarjetas de conocimiento apilándose
  const stackIn = (i: number) => ip(f, 18 + i * 8, 38 + i * 8, 0, 1);
  const stackFade = ip(f, 120, 155, 0, 1);

  // El label SABER aparece
  const saberLabel = ip(f, 28, 48, 0, 1) * (1 - ip(f, 118, 136, 0, 1));

  // La pequeña acción entra
  const actionIn = ip(f, 148, 178, 0, 1);
  const actionGlow = ip(f, 162, 200, 0, 1) * (1 - ip(f, 200, 213, 0, 1));

  // La flecha de output masivo
  const outputIn = ip(f, 175, 205, 0, 1) * (1 - ip(f, 200, 213, 0, 1));
  const outputH = ip(f, 178, 208, 0, 1);

  // El stat
  const statIn = ip(f, 150, 178, 0, 1) * (1 - ip(f, 200, 212, 0, 1));

  const pay = ip(f, 214, 254, 0, 1);

  return (
    <Stage
      bg="radial-gradient(130% 92% at 50% 44%, #14100A 0%, #070502 80%)"
      hue={GOLD}
      seed={1}
    >
      <div style={{
        position: 'absolute', top: 252, left: 0, right: 0, textAlign: 'center',
        fontFamily: fonts.mono, fontSize: 30, letterSpacing: '0.18em',
        color: 'rgba(255,255,255,0.50)', opacity: labelIn, zIndex: 30,
      }}>
        EL 90% SABE. EL 10% HACE.
      </div>

      <AbsoluteFill style={{ opacity: 1 - pay }}>
        {/* Izquierda: la montaña de conocimiento */}
        <div style={{
          position: 'absolute', top: 325, left: 90,
          width: 440,
          opacity: 1 - stackFade * 0.8,
        }}>
          {/* Label SABER */}
          <div style={{
            fontFamily: fonts.mono, fontSize: 26,
            color: DIM, letterSpacing: '0.14em',
            marginBottom: 14, opacity: saberLabel,
          }}>
            📚 CONOCIMIENTO (SABER)
          </div>

          {/* Cards de conocimiento apiladas */}
          {KNOWLEDGE_CARDS.map((card, i) => (
            <div key={i} style={{
              opacity: stackIn(i) * (1 - stackFade * 0.72),
              transform: `translateX(${(1 - stackIn(i)) * -18}px) translateY(${(1 - stackIn(i)) * 10}px)`,
              marginBottom: 8,
              background: `${GOLD}12`,
              border: `1px solid ${GOLD}2A`,
              borderRadius: 14, padding: '12px 22px',
              fontFamily: fonts.display, fontWeight: 600, fontSize: 32,
              color: `rgba(255,255,255,${0.58 - i * 0.02})`,
            }}>
              {card}
            </div>
          ))}
        </div>

        {/* Derecha: la pequeña acción + output masivo */}
        {actionIn > 0.01 && (
          <div style={{
            position: 'absolute', top: 325, right: 130,
            width: 390,
          }}>
            <div style={{
              fontFamily: fonts.mono, fontSize: 26,
              color: GREEN, letterSpacing: '0.14em',
              marginBottom: 14,
            }}>
              ⚡ ACCIÓN (HACER)
            </div>

            {/* La acción pequeña con glow */}
            <div style={{
              opacity: actionIn,
              transform: `scale(${0.8 + actionIn * 0.2})`,
              position: 'relative',
              background: `${GREEN}18`,
              border: `2px solid ${GREEN}55`,
              borderRadius: 20, padding: '22px 28px',
              marginBottom: 20,
            }}>
              {actionGlow > 0.01 && (
                <SiriGlow frame={f} intensity={actionGlow * 0.85} radius={20} inset={0} />
              )}
              <div style={{
                fontFamily: fonts.display, fontWeight: 800, fontSize: 44,
                color: GREEN_L,
                textShadow: `0 0 20px ${GREEN}88`,
              }}>
                1 mensaje<br />enviado hoy
              </div>
            </div>

            {/* Flecha de output */}
            {outputIn > 0.01 && (
              <>
                <div style={{
                  opacity: outputIn,
                  textAlign: 'center', marginBottom: 14,
                  fontFamily: fonts.display, fontWeight: 900, fontSize: 44,
                  color: GREEN_L,
                }}>
                  ↓
                </div>

                {/* Output bar */}
                <div style={{
                  opacity: outputIn,
                  background: `${GREEN}10`,
                  border: `1px solid ${GREEN}33`,
                  borderRadius: 20, padding: '18px 24px',
                  position: 'relative', overflow: 'hidden',
                }}>
                  <div style={{
                    position: 'absolute', top: 0, left: 0,
                    width: '100%',
                    height: `${outputH * 100}%`,
                    background: `linear-gradient(180deg, ${GREEN}22 0%, ${GREEN}08 100%)`,
                    borderRadius: 20,
                  }} />
                  <div style={{ fontFamily: fonts.mono, fontSize: 22, color: GREEN, letterSpacing: '0.08em', marginBottom: 8 }}>
                    RESULTADO
                  </div>
                  <div style={{ fontFamily: fonts.display, fontWeight: 900, fontSize: 52, color: GREEN_L, lineHeight: 1 }}>
                    1 cliente<br />nuevo
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* VS en el medio */}
        {actionIn > 0.01 && (
          <div style={{
            position: 'absolute', top: 660, left: 0, right: 0,
            textAlign: 'center', opacity: ip(f, 158, 178, 0, 1) * (1 - ip(f, 200, 213, 0, 1)),
          }}>
            <div style={{
              fontFamily: fonts.display, fontWeight: 900, fontSize: 68,
              color: 'rgba(255,255,255,0.22)',
              letterSpacing: '-0.02em',
            }}>
              vs
            </div>
          </div>
        )}

        {/* Stat abajo */}
        {statIn > 0.01 && (
          <div style={{
            position: 'absolute', bottom: 448, left: 90, right: 130,
            textAlign: 'center', opacity: statIn,
          }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 18,
              background: `${GOLD}14`, border: `1px solid ${GOLD}44`,
              borderRadius: 50, padding: '16px 48px',
            }}>
              <div style={{ fontFamily: fonts.display, fontWeight: 400, fontSize: 38, color: 'rgba(255,255,255,0.6)' }}>
                10 libros leídos =&nbsp;
              </div>
              <div style={{ fontFamily: fonts.display, fontWeight: 900, fontSize: 38, color: GOLD_L }}>
                $0
              </div>
              <div style={{ fontFamily: fonts.display, fontWeight: 400, fontSize: 38, color: 'rgba(255,255,255,0.6)' }}>
                &nbsp;/ 1 acción =&nbsp;
              </div>
              <div style={{ fontFamily: fonts.display, fontWeight: 900, fontSize: 38, color: GREEN_L }}>
                resultado
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
          <BigType frame={f} s={218} size={92} lines={[
            { t: 'Saber no basta.' },
            { t: 'La acción' },
            { t: 'es la diferencia.', hl: true },
          ]} />
          <div style={{
            fontFamily: fonts.display, fontWeight: 400, fontSize: 38,
            color: '#9A9AB5', marginTop: 32,
            opacity: ip(f, 268, 288, 0, 1),
          }}>
            Tu cliente sabe que te necesita. Ayudalo a dar el primer paso.
          </div>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};
