/**
 * AmbiguedadParaliza — Ambiguity Aversion / Ellsberg Paradox.
 * Preferimos el riesgo conocido sobre lo desconocido, aunque el desconocido
 * tenga mayor valor esperado. En marketing: la propuesta clara vence aunque
 * cueste más. El espectador elige entre dos caminos: uno claro, uno borroso.
 *
 * Lever: ambiguity aversion / known vs unknown risk. Paleta: midnight-azul. C.
 */
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { Stage, SiriGlow, SiriFrame, BigType, ip, fonts } from './kit';

export const AMBIGUEDADPARALIZA_DURATION = 290;

const CYAN = '#4FE0FF';
const BLUE = '#3B82F6';

export const AmbiguedadParaliza: React.FC = () => {
  const f = useCurrentFrame();

  const labelIn = ip(f, 8, 28, 0, 1) * (1 - ip(f, 202, 216, 0, 1));

  // Las dos propuestas entran
  const propsIn = ip(f, 28, 58, 0, 1);
  const propsFade = ip(f, 200, 216, 0, 1);

  // La ambigua se vuelve borrosa
  const blurAmbig = ip(f, 75, 118, 0, 1) * (1 - propsFade);

  // La clara brilla
  const glowClara = ip(f, 92, 135, 0, 1) * (1 - propsFade);

  // Cursor elige la clara
  const cursorIn = ip(f, 145, 168, 0, 1) * (1 - propsFade);

  // Stat
  const statIn = ip(f, 162, 185, 0, 1) * (1 - propsFade);

  const pay = ip(f, 218, 258, 0, 1);

  const clampBlur = Math.max(0, blurAmbig * 10);

  return (
    <Stage
      bg="radial-gradient(130% 92% at 50% 44%, #020614 0%, #010108 80%)"
      hue={BLUE}
      seed={4}
    >
      <div style={{
        position: 'absolute', top: 252, left: 0, right: 0, textAlign: 'center',
        fontFamily: fonts.mono, fontSize: 30, letterSpacing: '0.18em',
        color: 'rgba(255,255,255,0.50)', opacity: labelIn, zIndex: 30,
      }}>
        EL RIESGO QUE MÁS ASUSTA
      </div>

      <AbsoluteFill style={{ opacity: 1 - pay }}>
        <div style={{
          position: 'absolute', top: 320, left: 90, right: 130,
          display: 'flex', flexDirection: 'column', gap: 28,
          opacity: propsIn,
          transform: `translateY(${(1 - propsIn) * 22}px)`,
        }}>

          {/* Propuesta ambigua */}
          <div style={{
            filter: `blur(${clampBlur}px)`,
            opacity: 1 - blurAmbig * 0.65,
          }}>
            <div style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.10)',
              borderRadius: 26, padding: '36px 48px',
            }}>
              <div style={{
                fontFamily: fonts.mono, fontSize: 26, color: 'rgba(255,255,255,0.28)',
                letterSpacing: '0.14em', marginBottom: 16,
              }}>
                PROPUESTA A
              </div>
              <div style={{
                fontFamily: fonts.display, fontWeight: 700, fontSize: 48,
                color: 'rgba(255,255,255,0.4)', lineHeight: 1.2,
              }}>
                "Servicio integral para negocios según necesidad"
              </div>
              <div style={{
                fontFamily: fonts.mono, fontSize: 26, color: 'rgba(255,255,255,0.22)',
                marginTop: 14,
              }}>
                Precio: a consultar · Tiempo: variable
              </div>
            </div>
          </div>

          {/* Propuesta clara */}
          <div>
            <div style={{
              background: glowClara > 0.1 ? `${CYAN}0F` : 'rgba(255,255,255,0.05)',
              border: `1.5px solid ${glowClara > 0.1 ? CYAN + '44' : 'rgba(255,255,255,0.12)'}`,
              borderRadius: 26, padding: '36px 48px',
              position: 'relative',
            }}>
              {glowClara > 0.01 && (
                <SiriGlow frame={f} intensity={glowClara * 0.85} radius={26} inset={0} />
              )}
              <div style={{
                fontFamily: fonts.mono, fontSize: 26,
                color: glowClara > 0.3 ? CYAN : 'rgba(255,255,255,0.35)',
                letterSpacing: '0.14em', marginBottom: 16,
              }}>
                PROPUESTA B
              </div>
              <div style={{
                fontFamily: fonts.display, fontWeight: 700, fontSize: 48,
                color: glowClara > 0.3 ? '#F4F4FA' : 'rgba(255,255,255,0.55)',
                lineHeight: 1.2,
              }}>
                "Automatización de respuestas en 48h · Precio fijo: $4.900"
              </div>
              <div style={{
                fontFamily: fonts.mono, fontSize: 26,
                color: glowClara > 0.3 ? '#4ADE80' : 'rgba(255,255,255,0.3)',
                marginTop: 14,
              }}>
                Precio: $4.900 · Entrega: 48 horas
              </div>
            </div>
          </div>
        </div>

        {/* Cursor */}
        {cursorIn > 0.1 && (
          <div style={{
            position: 'absolute', top: 820, right: 160,
            opacity: cursorIn,
            fontFamily: fonts.mono, fontSize: 28, color: CYAN,
          }}>
            👆 Esta, sin dudar.
          </div>
        )}

        {/* Stat / insight */}
        {statIn > 0.1 && (
          <div style={{
            position: 'absolute', bottom: 440, left: 90, right: 130,
            textAlign: 'center', opacity: statIn,
            transform: `translateY(${(1 - statIn) * 16}px)`,
          }}>
            <div style={{
              display: 'inline-block',
              background: `${CYAN}12`, border: `1px solid ${CYAN}44`,
              borderRadius: 50, padding: '14px 44px',
              fontFamily: fonts.display, fontWeight: 600, fontSize: 36, color: CYAN,
            }}>
              La ambigüedad paraliza. La claridad cierra.
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
          <BigType frame={f} s={222} size={92} lines={[
            { t: 'Lo incierto' },
            { t: 'da miedo.' },
            { t: 'Sé específico.', hl: true },
          ]} />
          <div style={{
            fontFamily: fonts.display, fontWeight: 400, fontSize: 38,
            color: '#9A9AB5', marginTop: 32,
            opacity: ip(f, 266, 286, 0, 1),
          }}>
            Tu cliente prefiere pagar más por saber exactamente qué recibe.
          </div>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};
