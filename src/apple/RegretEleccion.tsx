/**
 * RegretEleccion — Post-choice Regret / Paradox of Choice Aftermath.
 * Barry Schwartz: más opciones → menos satisfacción DESPUÉS de elegir,
 * porque más alternativas no elegidas = más arrepentimiento imaginado.
 * El espectador ve dos escenarios: 12 opciones vs 3 opciones;
 * el termómetro de satisfacción post-compra revela la verdad.
 *
 * Lever: post-choice regret / paradox of choice consequences. Paleta: violeta. C.
 */
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { Stage, SiriGlow, SiriFrame, BigType, ip, fonts } from './kit';

export const REGETELECCION_DURATION = 294;

const VLT = '#7C3AED';
const VLT_L = '#A855F7';
const GREEN = '#10B981';
const RED = '#EF4444';

export const RegretEleccion: React.FC = () => {
  const f = useCurrentFrame();

  const labelIn = ip(f, 8, 28, 0, 1) * (1 - ip(f, 205, 219, 0, 1));

  // Fase 1: 12 opciones
  const manyIn = ip(f, 25, 55, 0, 1);
  const manyFade = ip(f, 108, 138, 0, 1);

  // Satisfacción post-compra con 12 opciones: baja (35%)
  const satisfA = ip(f, 72, 106, 0, 0.35) * (1 - manyFade);

  // Fase 2: 3 opciones
  const fewIn = ip(f, 142, 172, 0, 1);
  const glowFew = ip(f, 186, 210, 0, 1) * (1 - ip(f, 203, 218, 0, 1));

  // Satisfacción post-compra con 3 opciones: alta (88%)
  const satisfB = ip(f, 178, 208, 0, 0.88) * (1 - ip(f, 203, 218, 0, 1));

  const pay = ip(f, 220, 260, 0, 1);

  const DOTS_MANY = 12;
  const DOTS_FEW = 3;

  return (
    <Stage
      bg="radial-gradient(130% 92% at 50% 44%, #0C0616 0%, #060410 80%)"
      hue={VLT}
      seed={5}
    >
      <div style={{
        position: 'absolute', top: 252, left: 0, right: 0, textAlign: 'center',
        fontFamily: fonts.mono, fontSize: 30, letterSpacing: '0.18em',
        color: 'rgba(255,255,255,0.50)', opacity: labelIn, zIndex: 30,
      }}>
        ELEGISTE. ¿ESTÁS SATISFECHO?
      </div>

      <AbsoluteFill style={{ opacity: 1 - pay }}>

        {/* ESCENARIO A: 12 opciones */}
        <div style={{
          position: 'absolute', top: 330, left: 90, right: 130,
          opacity: manyIn * (1 - manyFade),
          transform: `translateY(${(1 - manyIn) * 22}px)`,
        }}>
          <div style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.10)',
            borderRadius: 28, padding: '36px 44px',
          }}>
            <div style={{
              fontFamily: fonts.mono, fontSize: 26, color: 'rgba(255,255,255,0.32)',
              letterSpacing: '0.14em', marginBottom: 22,
            }}>
              MENÚ DE 12 OPCIONES → ELEGISTE 1
            </div>

            {/* Grid de dots */}
            <div style={{
              display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 28,
            }}>
              {Array.from({ length: DOTS_MANY }).map((_, i) => (
                <div key={i} style={{
                  width: 42, height: 42, borderRadius: 12,
                  background: i === 5 ? `${VLT_L}66` : 'rgba(255,255,255,0.08)',
                  border: `1.5px solid ${i === 5 ? VLT_L + '88' : 'rgba(255,255,255,0.12)'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: fonts.mono, fontSize: 18, color: i === 5 ? VLT_L : 'rgba(255,255,255,0.25)',
                }} >
                  {i === 5 ? '✓' : ''}
                </div>
              ))}
            </div>

            {/* Satisfacción */}
            <div style={{ fontFamily: fonts.mono, fontSize: 24, color: 'rgba(255,255,255,0.35)', marginBottom: 10 }}>
              SATISFACCIÓN POST-COMPRA
            </div>
            <div style={{ position: 'relative', height: 22, background: 'rgba(255,255,255,0.08)', borderRadius: 11 }}>
              <div style={{
                position: 'absolute', left: 0, top: 0, bottom: 0,
                width: `${satisfA * 100}%`, borderRadius: 11,
                background: RED,
                boxShadow: `0 0 14px ${RED}55`,
              }} />
            </div>
            <div style={{
              fontFamily: fonts.display, fontWeight: 800, fontSize: 44,
              color: RED, marginTop: 10,
            }}>
              {Math.round(satisfA * 100)}%
            </div>
            <div style={{
              fontFamily: fonts.mono, fontSize: 22, color: 'rgba(255,255,255,0.28)', marginTop: 8,
            }}>
              "¿Y si alguna de las otras era mejor?"
            </div>
          </div>
        </div>

        {/* VS */}
        <div style={{
          position: 'absolute', top: 622, left: 0, right: 0, textAlign: 'center',
          fontFamily: fonts.display, fontWeight: 900, fontSize: 38,
          color: 'rgba(255,255,255,0.15)',
          opacity: ip(f, 146, 162, 0, 1) * (1 - ip(f, 203, 218, 0, 1)),
        }}>
          vs
        </div>

        {/* ESCENARIO B: 3 opciones */}
        <div style={{
          position: 'absolute', top: 672, left: 90, right: 130,
          opacity: fewIn,
          transform: `translateY(${(1 - fewIn) * 22}px)`,
        }}>
          <div style={{
            background: glowFew > 0.1 ? `${VLT}14` : 'rgba(255,255,255,0.05)',
            border: `1.5px solid ${glowFew > 0.1 ? VLT_L + '44' : 'rgba(255,255,255,0.12)'}`,
            borderRadius: 28, padding: '36px 44px',
            position: 'relative',
          }}>
            {glowFew > 0.01 && (
              <SiriGlow frame={f} intensity={glowFew * 0.8} radius={28} inset={0} />
            )}
            <div style={{
              fontFamily: fonts.mono, fontSize: 26,
              color: glowFew > 0.3 ? VLT_L : 'rgba(255,255,255,0.35)',
              letterSpacing: '0.14em', marginBottom: 22,
            }}>
              MENÚ DE 3 OPCIONES → ELEGISTE 1
            </div>

            <div style={{ display: 'flex', gap: 18, marginBottom: 28 }}>
              {Array.from({ length: DOTS_FEW }).map((_, i) => (
                <div key={i} style={{
                  width: 72, height: 72, borderRadius: 18,
                  background: i === 1 ? `${VLT_L}44` : 'rgba(255,255,255,0.08)',
                  border: `2px solid ${i === 1 ? VLT_L + '99' : 'rgba(255,255,255,0.14)'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: fonts.mono, fontSize: 26, color: i === 1 ? VLT_L : 'rgba(255,255,255,0.28)',
                }}>
                  {i === 1 ? '✓' : ''}
                </div>
              ))}
            </div>

            <div style={{
              fontFamily: fonts.mono, fontSize: 24,
              color: glowFew > 0.3 ? 'rgba(255,255,255,0.45)' : 'rgba(255,255,255,0.35)',
              marginBottom: 10,
            }}>
              SATISFACCIÓN POST-COMPRA
            </div>
            <div style={{ position: 'relative', height: 22, background: 'rgba(255,255,255,0.08)', borderRadius: 11 }}>
              <div style={{
                position: 'absolute', left: 0, top: 0, bottom: 0,
                width: `${satisfB * 100}%`, borderRadius: 11,
                background: GREEN,
                boxShadow: `0 0 18px ${GREEN}66`,
              }} />
            </div>
            <div style={{
              fontFamily: fonts.display, fontWeight: 800, fontSize: 44,
              color: glowFew > 0.4 ? GREEN : 'rgba(255,255,255,0.5)', marginTop: 10,
              textShadow: glowFew > 0.4 ? `0 0 24px ${GREEN}66` : 'none',
            }}>
              {Math.round(satisfB * 100)}%
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
          <BigType frame={f} s={224} size={92} lines={[
            { t: 'Menos opciones,' },
            { t: 'más satisfacción' },
            { t: 'después.', hl: true },
          ]} />
          <div style={{
            fontFamily: fonts.display, fontWeight: 400, fontSize: 38,
            color: '#9A9AB5', marginTop: 32,
            opacity: ip(f, 268, 290, 0, 1),
          }}>
            El cliente que duda más también arrepiente más. Simplificá.
          </div>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};
