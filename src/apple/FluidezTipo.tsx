/**
 * FluidezTipo — Cognitive fluency / disfluencia cognitiva.
 * Lo que cuesta leer parece menos creíble. Dos cards lado a lado:
 * texto difícil vs texto claro. Las barras de "confianza" revelan
 * la asimetría. Modo editorial-claro (único en el catálogo).
 * Lever: cognitive fluency / disfluency. Palette: violeta/crema. Mode: editorial-claro. C.
 */
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { Stage, Glass, SiriGlow, SiriFrame, BigType, ip, fonts, VLT, VLT_L } from './kit';

const DARK_TEXT = '#1A1020';
const MID_TEXT  = '#3A2848';
const DIM_TEXT  = '#7A6888';

export const FLUIDEZTYPE_DURATION = 270;

export const FluidezTipo: React.FC = () => {
  const f = useCurrentFrame();

  const cardsIn    = ip(f,  8, 42, 0, 1);
  const labelOp    = ip(f,  4, 22, 0, 1);
  const barsIn     = ip(f, 82, 118, 0, 1);
  const barLeftW   = ip(f, 82, 120, 0, 32);
  const barRightW  = ip(f, 82, 130, 0, 91);
  const glowI      = ip(f, 162, 195, 0, 1);
  const hardFade   = ip(f, 162, 195, 1, 0.28);
  const pay        = ip(f, 200, 230, 0, 1);

  return (
    <Stage
      bg="radial-gradient(130% 90% at 50% 40%, #F8F6FF 0%, #E8E0FF 70%, #D5C8FF 100%)"
      hue={VLT_L}
      seed={7}
    >
      {/* Title */}
      <div style={{
        position: 'absolute', top: 232, left: 0, right: 0, textAlign: 'center',
        fontFamily: fonts.mono, fontSize: 22, letterSpacing: '0.18em',
        color: MID_TEXT, opacity: labelOp * (1 - pay), zIndex: 30,
      }}>
        LEGIBILIDAD Y CREDIBILIDAD
      </div>

      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', opacity: 1 - pay }}>
        <div style={{ display: 'flex', gap: 28, alignItems: 'flex-start' }}>

          {/* Left card: DIFÍCIL DE LEER */}
          <div style={{
            opacity: cardsIn * hardFade,
            transform: `translateY(${(1 - cardsIn) * 28}px)`,
            width: 370,
          }}>
            <Glass w={370} h={480} pad={28} style={{
              background: 'rgba(0,0,0,0.06)',
              border: '1px solid rgba(0,0,0,0.12)',
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  fontFamily: fonts.mono, fontSize: 13, letterSpacing: '0.18em',
                  color: DIM_TEXT, marginBottom: 18,
                }}>DIFÍCIL DE LEER</div>
                <div style={{
                  fontFamily: 'Georgia, serif', fontSize: 30,
                  color: '#4A3860', lineHeight: 1.25,
                  letterSpacing: '-0.02em', fontWeight: 400,
                }}>
                  Optimizamos la sinergia estratégica para maximizar el impacto multidimensional.
                </div>
                <div style={{ marginTop: 22 }}>
                  <div style={{
                    fontFamily: fonts.mono, fontSize: 13,
                    color: DIM_TEXT, letterSpacing: '0.1em', marginBottom: 8,
                  }}>CONFIANZA</div>
                  <div style={{
                    width: '100%', height: 12, borderRadius: 6,
                    background: 'rgba(0,0,0,0.10)',
                    overflow: 'hidden',
                  }}>
                    <div style={{
                      height: '100%', borderRadius: 6,
                      background: '#E57373',
                      width: `${barLeftW}%`,
                      opacity: barsIn,
                    }} />
                  </div>
                  <div style={{
                    fontFamily: fonts.display, fontWeight: 800,
                    fontSize: 38, color: '#E57373',
                    marginTop: 8, opacity: barsIn,
                  }}>{Math.round(barLeftW)}%</div>
                </div>
              </div>
            </Glass>
          </div>

          {/* Right card: FÁCIL DE LEER */}
          <div style={{
            opacity: cardsIn,
            transform: `translateY(${(1 - cardsIn) * 28}px)`,
            width: 370,
            position: 'relative',
          }}>
            {glowI > 0.05 ? <SiriGlow frame={f} intensity={glowI} radius={34} /> : null}
            <Glass w={370} h={480} pad={28} style={{
              background: 'rgba(0,0,0,0.06)',
              border: `1px solid ${glowI > 0.1 ? VLT + '66' : 'rgba(0,0,0,0.12)'}`,
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  fontFamily: fonts.mono, fontSize: 13, letterSpacing: '0.18em',
                  color: DIM_TEXT, marginBottom: 18,
                }}>FÁCIL DE LEER</div>
                <div style={{
                  fontFamily: fonts.display, fontWeight: 700, fontSize: 52,
                  color: DARK_TEXT, lineHeight: 1.12,
                  letterSpacing: '-0.03em',
                }}>
                  Hacemos que tu negocio crezca. Simple.
                </div>
                <div style={{ marginTop: 22 }}>
                  <div style={{
                    fontFamily: fonts.mono, fontSize: 13,
                    color: DIM_TEXT, letterSpacing: '0.1em', marginBottom: 8,
                  }}>CONFIANZA</div>
                  <div style={{
                    width: '100%', height: 12, borderRadius: 6,
                    background: 'rgba(0,0,0,0.10)',
                    overflow: 'hidden',
                  }}>
                    <div style={{
                      height: '100%', borderRadius: 6,
                      background: '#66BB6A',
                      width: `${barRightW}%`,
                      opacity: barsIn,
                      boxShadow: glowI > 0.1 ? '0 0 12px #66BB6A88' : 'none',
                    }} />
                  </div>
                  <div style={{
                    fontFamily: fonts.display, fontWeight: 800,
                    fontSize: 38, color: '#388E3C',
                    marginTop: 8, opacity: barsIn,
                  }}>{Math.round(barRightW)}%</div>
                </div>
              </div>
            </Glass>
          </div>
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
          <BigType frame={f} s={200} size={88} dark={false} lines={[
            { t: 'Si cuesta' },
            { t: 'leerlo,' },
            { t: 'cuesta', hl: true },
            { t: 'creerlo.', hl: true },
          ]} />
          <div style={{
            fontFamily: fonts.display, fontSize: 30,
            color: MID_TEXT, marginTop: 28,
            opacity: ip(f, 240, 258, 0, 1),
          }}>
            Tu diseño es tu credibilidad.
          </div>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};
