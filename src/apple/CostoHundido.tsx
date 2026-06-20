/**
 * CostoHundido — Sunk Cost Fallacy.
 * Seguís invirtiendo porque ya pusiste mucho... aunque no tenga sentido.
 * Barras de dinero acumulado suben → glow "ya invertí tanto" → payoff "el pasado no decide".
 * Lever: sunk cost fallacy. Palette: índigo/violeta profundo. Mode: glassy-oscuro. C.
 */
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { Stage, SiriGlow, SiriFrame, BigType, ip, fonts } from './kit';

const INDIGO   = '#6366F1';
const INDIGO_L = '#A5B4FC';

const BARS = [
  { label: 'Mes 1', amount: '$1.200', frames: [30, 55]  },
  { label: 'Mes 2', amount: '$2.400', frames: [58, 80]  },
  { label: 'Mes 3', amount: '$3.600', frames: [86, 108] },
  { label: 'Mes 4', amount: '$4.800', frames: [114, 136]},
];

export const COSTOHUNDIDO_DURATION = 272;

export const CostoHundido: React.FC = () => {
  const f = useCurrentFrame();

  const titleOp   = ip(f, 8, 26, 0, 1);
  const glowI     = ip(f, 140, 168, 0, 1);
  const totalOp   = ip(f, 148, 170, 0, 1) * (1 - ip(f, 178, 196, 0, 1));
  const pay       = ip(f, 186, 214, 0, 1);

  return (
    <Stage
      bg="radial-gradient(130% 90% at 50% 42%, #0A0820 0%, #04030F 80%)"
      hue={INDIGO}
      seed={7}
    >
      <AbsoluteFill style={{ opacity: 1 - pay }}>

        {/* Title */}
        <div style={{
          position: 'absolute', top: 238, left: 90, right: 130, textAlign: 'center',
          fontFamily: fonts.mono, fontSize: 19, letterSpacing: '0.16em',
          color: `${INDIGO_L}88`, opacity: titleOp,
        }}>
          YA INVERTISTE TANTO QUE...
        </div>

        {/* Bars */}
        <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: 780 }}>
            {BARS.map((bar, i) => {
              const barIn   = ip(f, bar.frames[0], bar.frames[1], 0, 1);
              const barW    = ip(f, bar.frames[0], bar.frames[1], 0, (i + 1) * 22);
              const isTop   = i === BARS.length - 1;
              const barGlow = isTop ? glowI : 0;
              return (
                <div key={i} style={{ opacity: barIn, transform: `translateX(${(1 - barIn) * -22}px)` }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                    <div style={{
                      fontFamily: fonts.mono, fontSize: 18, letterSpacing: '0.1em',
                      color: isTop ? INDIGO_L : 'rgba(165,180,252,0.5)',
                      width: 62, textAlign: 'right', flexShrink: 0,
                    }}>{bar.label}</div>
                    <div style={{ flex: 1, height: 44, borderRadius: 10, background: 'rgba(255,255,255,0.05)', overflow: 'hidden', position: 'relative' }}>
                      <div style={{
                        position: 'absolute', inset: 0, width: `${barW}%`,
                        borderRadius: 10,
                        background: isTop
                          ? `linear-gradient(90deg, ${INDIGO} 0%, ${INDIGO_L} 100%)`
                          : `rgba(99,102,241,${0.35 + i * 0.1})`,
                        boxShadow: barGlow > 0.1 ? `0 0 22px ${INDIGO}88` : 'none',
                        transition: 'box-shadow 0.3s',
                      }} />
                      {barGlow > 0.05 ? (
                        <div style={{ position: 'absolute', inset: 0, borderRadius: 10 }}>
                          <SiriGlow frame={f} intensity={barGlow * 0.6} radius={10} />
                        </div>
                      ) : null}
                    </div>
                    <div style={{
                      fontFamily: fonts.display, fontWeight: 800, fontSize: 28,
                      color: isTop ? INDIGO_L : `rgba(165,180,252,${0.4 + i * 0.1})`,
                      width: 88, textAlign: 'right', flexShrink: 0,
                      textShadow: barGlow > 0.2 ? `0 0 18px ${INDIGO}aa` : 'none',
                    }}>{bar.amount}</div>
                  </div>
                </div>
              );
            })}

            {/* Total */}
            <div style={{ opacity: totalOp, paddingTop: 8, borderTop: `1.5px solid ${INDIGO}44` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{
                  fontFamily: fonts.mono, fontSize: 19, letterSpacing: '0.14em',
                  color: INDIGO_L + 'AA',
                }}>TOTAL INVERTIDO</div>
                <div style={{
                  fontFamily: fonts.display, fontWeight: 900, fontSize: 54,
                  color: INDIGO_L, letterSpacing: '-0.03em',
                  textShadow: `0 0 28px ${INDIGO}BB`,
                }}>$4.800</div>
              </div>
              <div style={{
                fontFamily: fonts.display, fontWeight: 700, fontSize: 36,
                color: `${INDIGO_L}88`, marginTop: 12, textAlign: 'center',
              }}>
                "No puedo parar ahora..."
              </div>
            </div>
          </div>
        </AbsoluteFill>
      </AbsoluteFill>

      {/* Payoff */}
      <AbsoluteFill style={{
        alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', padding: '0 96px',
        opacity: pay, zIndex: 200,
      }}>
        <SiriFrame frame={f} intensity={pay} />
        <div style={{ transform: `translateY(${(1 - pay) * 28}px)` }}>
          <BigType frame={f} s={186} size={88} lines={[
            { t: 'El pasado' },
            { t: 'no decide', hl: true },
            { t: 'el futuro.' },
          ]} />
          <div style={{
            fontFamily: fonts.display, fontSize: 30,
            color: `${INDIGO_L}88`, marginTop: 28,
            opacity: ip(f, 228, 248, 0, 1),
          }}>
            Seguir por lo que ya gastaste es la trampa.
          </div>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};
