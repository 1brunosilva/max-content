/**
 * EsfuerzoValor — Effort heuristic / labor illusion.
 * La misma solución percibida como más valiosa cuando se muestra el trabajo detrás.
 * Una propuesta "instantánea" vs una que se construye paso a paso. La construida brilla más.
 * Lever: effort heuristic / labor illusion. Palette: dorado/violeta. Mode: glassy-oscuro. C.
 */
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { Stage, Glass, SiriGlow, SiriFrame, BigType, ip, fonts } from './kit';

const GOLD   = '#D97706';
const GOLD_L = '#FCD34D';

const STEPS = [
  { label: '✓ Análisis inicial',         startF: 20  },
  { label: '✓ Estrategia personalizada', startF: 48  },
  { label: '✓ Implementación',           startF: 76  },
  { label: '✓ Seguimiento 30 días',      startF: 104 },
];

export const ESFUERZOVALOR_DURATION = 272;

export const EsfuerzoValor: React.FC = () => {
  const f = useCurrentFrame();

  const labelOp   = ip(f, 4, 22, 0, 1);
  const leftFlash = ip(f, 8, 18, 0, 1);
  const glowI     = ip(f, 130, 165, 0, 1);
  const barsIn    = ip(f, 148, 175, 0, 1);
  const barLeftW  = ip(f, 148, 182, 0, 38);
  const barRightW = ip(f, 148, 190, 0, 91);
  const pay       = ip(f, 195, 225, 0, 1);

  return (
    <Stage bg="radial-gradient(120% 88% at 50% 42%, #0E0A00 0%, #050300 80%)" hue={GOLD} seed={9}>

      {/* Top label */}
      <div style={{
        position: 'absolute', top: 232, left: 0, right: 0, textAlign: 'center',
        fontFamily: fonts.mono, fontSize: 19, letterSpacing: '0.16em',
        color: 'rgba(255,210,120,0.6)', opacity: labelOp * (1 - pay), zIndex: 30,
      }}>
        MISMA SOLUCIÓN · DOS FORMAS DE MOSTRARLA
      </div>

      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', opacity: 1 - pay }}>
        <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start' }}>

          {/* Left card: aparece de golpe */}
          <div style={{ opacity: leftFlash, width: 370, position: 'relative' }}>
            <Glass w={370} h={480} pad={28}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center' }}>
                <div style={{
                  fontFamily: fonts.mono, fontSize: 13, letterSpacing: '0.16em',
                  color: 'rgba(255,255,255,0.38)', marginBottom: 4,
                }}>PROPUESTA RÁPIDA</div>
                <div style={{
                  fontFamily: fonts.display, fontWeight: 700, fontSize: 34,
                  color: 'rgba(255,255,255,0.5)', letterSpacing: '-0.02em',
                  textAlign: 'center', lineHeight: 1.2,
                }}>Solución completa de automatización</div>
                <div style={{
                  fontFamily: fonts.mono, fontSize: 20, color: 'rgba(255,255,255,0.28)',
                  letterSpacing: '-0.01em', marginTop: 16,
                }}>$4.900 / mes</div>
              </div>
            </Glass>
            <div style={{ marginTop: 18, opacity: barsIn }}>
              <div style={{ fontFamily: fonts.mono, fontSize: 13, color: 'rgba(255,255,255,0.38)', letterSpacing: '0.1em', marginBottom: 8, textAlign: 'center' }}>
                VALOR PERCIBIDO
              </div>
              <div style={{ height: 10, borderRadius: 5, background: 'rgba(255,255,255,0.08)', overflow: 'hidden' }}>
                <div style={{ height: '100%', borderRadius: 5, background: 'rgba(255,100,80,0.7)', width: `${barLeftW}%` }} />
              </div>
              <div style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: 34, color: 'rgba(220,100,80,0.7)', textAlign: 'center', marginTop: 6 }}>
                {Math.round(barLeftW)}%
              </div>
            </div>
          </div>

          {/* Right card: se construye paso a paso */}
          <div style={{ width: 370, position: 'relative' }}>
            {glowI > 0.05 ? <SiriGlow frame={f} intensity={glowI} radius={34} /> : null}
            <Glass w={370} h={480} pad={28} selected={glowI > 0.3} style={{
              border: `1px solid ${glowI > 0.3 ? GOLD + '77' : 'rgba(255,255,255,0.12)'}`,
              background: glowI > 0.3 ? 'rgba(217,119,6,0.08)' : undefined,
            }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{
                  fontFamily: fonts.mono, fontSize: 13, letterSpacing: '0.16em',
                  color: glowI > 0.2 ? GOLD_L + 'BB' : 'rgba(255,200,100,0.45)',
                  marginBottom: 16, textAlign: 'center',
                }}>CON EL TRABAJO VISIBLE</div>

                {STEPS.map((step, i) => {
                  const stepIn = ip(f, step.startF, step.startF + 20, 0, 1);
                  return (
                    <div key={i} style={{
                      display: 'flex', alignItems: 'center', gap: 12,
                      opacity: stepIn,
                      transform: `translateX(${(1 - stepIn) * -16}px)`,
                      padding: '10px 0',
                      borderBottom: i < STEPS.length - 1 ? '1px solid rgba(255,200,80,0.10)' : 'none',
                    }}>
                      <div style={{
                        width: 26, height: 26, borderRadius: 8, flexShrink: 0,
                        background: glowI > 0.2 ? GOLD + '25' : 'rgba(255,200,80,0.12)',
                        border: `1.5px solid ${glowI > 0.2 ? GOLD + '88' : 'rgba(255,200,80,0.28)'}`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        boxShadow: glowI > 0.2 ? `0 0 10px ${GOLD}44` : 'none',
                      }}>
                        <svg viewBox="0 0 16 16" width="12" height="12">
                          <path d="M 2 8 L 6 12 L 14 4" stroke={glowI > 0.2 ? GOLD_L : 'rgba(255,200,80,0.6)'} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <div style={{
                        fontFamily: fonts.display, fontWeight: 600, fontSize: 26,
                        color: glowI > 0.2 ? GOLD_L : 'rgba(255,220,130,0.75)',
                        letterSpacing: '-0.02em',
                      }}>{step.label}</div>
                    </div>
                  );
                })}
              </div>
            </Glass>

            <div style={{ marginTop: 18, opacity: barsIn }}>
              <div style={{ fontFamily: fonts.mono, fontSize: 13, color: glowI > 0.2 ? GOLD_L + 'AA' : 'rgba(255,200,100,0.45)', letterSpacing: '0.1em', marginBottom: 8, textAlign: 'center' }}>
                VALOR PERCIBIDO
              </div>
              <div style={{ height: 10, borderRadius: 5, background: 'rgba(255,255,255,0.08)', overflow: 'hidden' }}>
                <div style={{
                  height: '100%', borderRadius: 5,
                  background: `linear-gradient(90deg, ${GOLD} 0%, ${GOLD_L} 100%)`,
                  width: `${barRightW}%`,
                  boxShadow: glowI > 0.2 ? `0 0 14px ${GOLD}88` : 'none',
                }} />
              </div>
              <div style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: 34, color: GOLD_L, textAlign: 'center', marginTop: 6, textShadow: glowI > 0.2 ? `0 0 20px ${GOLD}aa` : 'none' }}>
                {Math.round(barRightW)}%
              </div>
            </div>
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
          <BigType frame={f} s={195} size={88} lines={[
            { t: 'Mostrar' },
            { t: 'el trabajo' },
            { t: 'aumenta', hl: false },
            { t: 'el valor.', hl: true },
          ]} />
          <div style={{
            fontFamily: fonts.display, fontSize: 30,
            color: 'rgba(255,200,100,0.6)', marginTop: 28,
            opacity: ip(f, 236, 255, 0, 1),
          }}>
            El esfuerzo visible es persuasión.
          </div>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};
