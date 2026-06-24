/**
 * NumeroConcreto — Scope Insensitivity / Psychic Numbing.
 * Paul Slovic: los números grandes adormecen la empatía y la acción.
 * "1.000 clientes perdidos" parece abstracto; "3 clientes que no volvieron"
 * duele de verdad. El espectador ve la diferencia de impacto emocional.
 *
 * Lever: scope insensitivity / psychic numbing. Paleta: ámbar. C.
 */
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { Stage, SiriGlow, SiriFrame, BigType, ip, fonts, countUp } from './kit';

export const NUMEROCONCRETO_DURATION = 292;

const AMBER = '#F59E0B';
const RED = '#EF4444';

export const NumeroConcreto: React.FC = () => {
  const f = useCurrentFrame();

  const labelIn = ip(f, 8, 28, 0, 1) * (1 - ip(f, 204, 218, 0, 1));

  // Fase 1: número grande (abstracto)
  const bigNumIn = ip(f, 25, 55, 0, 1);
  const bigCount = countUp(f, 32, 105, 1000000);
  const bigNumFade = ip(f, 105, 135, 0, 1);
  const reactionBig = ip(f, 68, 96, 0, 1) * (1 - bigNumFade);

  // Fase 2: número concreto (vivido)
  const smallNumIn = ip(f, 140, 170, 0, 1);
  const glowSmall = ip(f, 172, 205, 0, 1) * (1 - ip(f, 202, 218, 0, 1));
  const reactionSmall = ip(f, 175, 200, 0, 1) * (1 - ip(f, 202, 218, 0, 1));

  const pay = ip(f, 218, 258, 0, 1);

  const formatMillions = (n: number) => {
    if (n >= 1000000) return '1.000.000';
    return n.toLocaleString('es-UY');
  };

  return (
    <Stage
      bg="radial-gradient(130% 92% at 50% 44%, #120A00 0%, #070400 80%)"
      hue={AMBER}
      seed={7}
    >
      <div style={{
        position: 'absolute', top: 252, left: 0, right: 0, textAlign: 'center',
        fontFamily: fonts.mono, fontSize: 30, letterSpacing: '0.18em',
        color: 'rgba(255,255,255,0.50)', opacity: labelIn, zIndex: 30,
      }}>
        ¿QUÉ NÚMERO DUELE MÁS?
      </div>

      <AbsoluteFill style={{ opacity: 1 - pay }}>

        {/* NÚMERO GRANDE */}
        <div style={{
          position: 'absolute', top: 340, left: 90, right: 130,
          opacity: bigNumIn * (1 - bigNumFade),
          transform: `translateY(${(1 - bigNumIn) * 22}px)`,
        }}>
          <div style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.10)',
            borderRadius: 30, padding: '40px 52px', textAlign: 'center',
          }}>
            <div style={{
              fontFamily: fonts.mono, fontSize: 26, color: 'rgba(255,255,255,0.32)',
              letterSpacing: '0.14em', marginBottom: 18,
            }}>
              DATO ESTADÍSTICO
            </div>
            <div style={{
              fontFamily: fonts.display, fontWeight: 900, fontSize: 108,
              letterSpacing: '-0.04em', color: 'rgba(255,255,255,0.28)', lineHeight: 1,
            }}>
              {formatMillions(bigCount)}
            </div>
            <div style={{
              fontFamily: fonts.display, fontWeight: 600, fontSize: 44,
              color: 'rgba(255,255,255,0.38)', marginTop: 10,
            }}>
              negocios cerraron este año
            </div>

            {/* Reacción emocional: adormecimiento */}
            {reactionBig > 0.1 && (
              <div style={{
                display: 'flex', justifyContent: 'center', marginTop: 24, gap: 8,
                opacity: reactionBig,
              }}>
                <div style={{
                  fontFamily: fonts.mono, fontSize: 26,
                  color: 'rgba(255,255,255,0.25)',
                }}>
                  😐  Mmm... qué lástima.
                </div>
              </div>
            )}
          </div>
        </div>

        {/* VS separador */}
        <div style={{
          position: 'absolute', top: 640, left: 0, right: 0, textAlign: 'center',
          fontFamily: fonts.display, fontWeight: 900, fontSize: 38,
          color: 'rgba(255,255,255,0.15)',
          opacity: ip(f, 144, 160, 0, 1) * (1 - ip(f, 202, 218, 0, 1)),
        }}>
          vs
        </div>

        {/* NÚMERO CONCRETO */}
        <div style={{
          position: 'absolute', top: 690, left: 90, right: 130,
          opacity: smallNumIn,
          transform: `translateY(${(1 - smallNumIn) * 22}px)`,
        }}>
          <div style={{
            background: glowSmall > 0.1 ? `${AMBER}12` : 'rgba(255,255,255,0.05)',
            border: `1.5px solid ${glowSmall > 0.1 ? AMBER + '55' : 'rgba(255,255,255,0.12)'}`,
            borderRadius: 30, padding: '40px 52px', textAlign: 'center',
            position: 'relative',
          }}>
            {glowSmall > 0.01 && (
              <SiriGlow frame={f} intensity={glowSmall * 0.9} radius={30} inset={0} />
            )}
            <div style={{
              fontFamily: fonts.mono, fontSize: 26,
              color: glowSmall > 0.3 ? AMBER : 'rgba(255,255,255,0.35)',
              letterSpacing: '0.14em', marginBottom: 18,
            }}>
              CONCRETO Y REAL
            </div>
            <div style={{
              fontFamily: fonts.display, fontWeight: 900, fontSize: 108,
              letterSpacing: '-0.04em', lineHeight: 1,
              color: glowSmall > 0.3 ? AMBER : 'rgba(255,255,255,0.6)',
              textShadow: glowSmall > 0.3 ? `0 0 40px ${AMBER}66` : 'none',
            }}>
              3
            </div>
            <div style={{
              fontFamily: fonts.display, fontWeight: 600, fontSize: 44,
              color: glowSmall > 0.3 ? '#F4F4FA' : 'rgba(255,255,255,0.55)', marginTop: 10,
            }}>
              clientes que no volvieron
            </div>

            {/* Reacción emocional: dolor real */}
            {reactionSmall > 0.1 && (
              <div style={{
                display: 'flex', justifyContent: 'center', marginTop: 24,
                opacity: reactionSmall,
              }}>
                <div style={{
                  fontFamily: fonts.mono, fontSize: 26,
                  color: RED,
                  textShadow: `0 0 10px ${RED}44`,
                }}>
                  💔  ¿Quiénes fueron? ¿Por qué?
                </div>
              </div>
            )}
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
          <BigType frame={f} s={222} size={92} lines={[
            { t: 'El número grande' },
            { t: 'adormece.' },
            { t: 'El concreto duele.', hl: true },
          ]} />
          <div style={{
            fontFamily: fonts.display, fontWeight: 400, fontSize: 38,
            color: '#9A9AB5', marginTop: 32,
            opacity: ip(f, 268, 288, 0, 1),
          }}>
            Nombrá al cliente de carne y hueso, no a la estadística.
          </div>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};
