/**
 * MomentoSocial — Social Proof Velocity / Momentum.
 * No son 200 clientes. Son "47 nuevos esta semana".
 * La velocidad de crecimiento importa más que el total acumulado.
 * Lever: social proof velocity / momentum effect. Palette: verde-esmeralda. Mode: editorial-claro. C.
 */
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { Stage, SiriGlow, SiriFrame, BigType, ip, fonts } from './kit';

const GREEN   = '#10B981';
const GREEN_L = '#6EE7B7';
const DARK    = '#022C22';

export const MOMENTOSOCIAL_DURATION = 266;

export const MomentoSocial: React.FC = () => {
  const f = useCurrentFrame();

  const titleOp    = ip(f, 6, 22, 0, 1) * (1 - ip(f, 180, 196, 0, 1));
  const totalIn    = ip(f, 18, 40, 0, 1) * (1 - ip(f, 180, 196, 0, 1));
  const vsOp       = ip(f, 50, 68, 0, 1) * (1 - ip(f, 180, 196, 0, 1));
  const weekIn     = ip(f, 60, 82, 0, 1) * (1 - ip(f, 180, 196, 0, 1));
  const glowI      = ip(f, 100, 132, 0, 1);
  const arrowIn    = ip(f, 110, 130, 0, 1) * (1 - ip(f, 180, 196, 0, 1));
  const speedLabel = ip(f, 140, 158, 0, 1) * (1 - ip(f, 180, 196, 0, 1));
  const pay        = ip(f, 188, 216, 0, 1);

  const totalCount = Math.round(ip(f, 18, 56, 0, 200));
  const weekCount  = Math.round(ip(f, 60, 132, 0, 47));

  const velocity   = ip(f, 60, 132, 0, 1);
  const barW       = velocity * 91;

  return (
    <Stage
      bg="radial-gradient(120% 88% at 50% 42%, #F0FDF9 0%, #D1FAE5 100%)"
      hue={GREEN}
      seed={12}
    >
      {/* Title */}
      <div style={{
        position: 'absolute', top: 240, left: 90, right: 130, textAlign: 'center',
        fontFamily: fonts.mono, fontSize: 19, letterSpacing: '0.16em',
        color: `${DARK}55`, opacity: titleOp,
      }}>
        ¿QUÉ CONVENCE MÁS?
      </div>

      <AbsoluteFill style={{ opacity: 1 - pay }}>
        <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: 780, display: 'flex', flexDirection: 'column', gap: 36, alignItems: 'center' }}>

            {/* Total card — dim */}
            <div style={{ opacity: totalIn, width: '100%' }}>
              <div style={{
                borderRadius: 24,
                background: 'rgba(0,0,0,0.04)',
                border: '1.5px solid rgba(0,0,0,0.08)',
                padding: '28px 36px',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              }}>
                <div>
                  <div style={{ fontFamily: fonts.mono, fontSize: 17, letterSpacing: '0.12em', color: `${DARK}55` }}>
                    TOTAL ACUMULADO
                  </div>
                  <div style={{ fontFamily: fonts.display, fontWeight: 700, fontSize: 36, color: `${DARK}77`, letterSpacing: '-0.025em', marginTop: 4 }}>
                    Desde que empezamos
                  </div>
                </div>
                <div style={{
                  fontFamily: fonts.display, fontWeight: 900, fontSize: 72,
                  color: `${DARK}66`, letterSpacing: '-0.04em',
                }}>
                  {totalCount}
                </div>
              </div>
            </div>

            {/* vs divider */}
            <div style={{
              opacity: vsOp,
              fontFamily: fonts.mono, fontSize: 22, letterSpacing: '0.18em',
              color: `${DARK}44`,
            }}>VS</div>

            {/* Weekly card — glowing */}
            <div style={{ opacity: weekIn, width: '100%', position: 'relative' }}>
              {glowI > 0.05 ? <SiriGlow frame={f} intensity={glowI * 0.7} radius={24} /> : null}
              <div style={{
                borderRadius: 24,
                background: glowI > 0.2 ? 'rgba(16,185,129,0.08)' : 'rgba(16,185,129,0.04)',
                border: `2px solid ${glowI > 0.2 ? GREEN + 'AA' : GREEN + '44'}`,
                padding: '28px 36px',
                display: 'flex', flexDirection: 'column', gap: 18,
                boxShadow: glowI > 0.2 ? `0 0 40px ${GREEN}33` : 'none',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontFamily: fonts.mono, fontSize: 17, letterSpacing: '0.12em', color: GREEN }}>
                      NUEVOS ESTA SEMANA
                    </div>
                    <div style={{ fontFamily: fonts.display, fontWeight: 700, fontSize: 36, color: DARK, letterSpacing: '-0.025em', marginTop: 4 }}>
                      En los últimos 7 días
                    </div>
                  </div>
                  <div style={{
                    fontFamily: fonts.display, fontWeight: 900, fontSize: 88,
                    color: glowI > 0.2 ? GREEN : DARK,
                    letterSpacing: '-0.04em',
                    textShadow: glowI > 0.2 ? `0 0 36px ${GREEN}88` : 'none',
                  }}>
                    {weekCount}
                  </div>
                </div>

                {/* Velocity bar */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <div style={{ fontFamily: fonts.mono, fontSize: 15, letterSpacing: '0.1em', color: `${DARK}55` }}>
                      VELOCIDAD DE CRECIMIENTO
                    </div>
                    <div style={{ fontFamily: fonts.display, fontWeight: 700, fontSize: 22, color: GREEN }}>
                      {Math.round(barW)}%
                    </div>
                  </div>
                  <div style={{ height: 12, borderRadius: 6, background: 'rgba(0,0,0,0.06)', overflow: 'hidden' }}>
                    <div style={{
                      height: '100%', borderRadius: 6, width: `${barW}%`,
                      background: `linear-gradient(90deg, ${GREEN} 0%, ${GREEN_L} 100%)`,
                      boxShadow: glowI > 0.2 ? `0 0 14px ${GREEN}99` : 'none',
                    }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Arrow + speed label */}
            <div style={{ opacity: arrowIn, textAlign: 'center' }}>
              <div style={{ fontSize: 42, filter: `drop-shadow(0 0 12px ${GREEN}88)` }}>↑</div>
            </div>
            <div style={{
              opacity: speedLabel,
              fontFamily: fonts.display, fontWeight: 700, fontSize: 36,
              color: DARK, textAlign: 'center', letterSpacing: '-0.02em',
            }}>
              La velocidad contagia.
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
          <BigType frame={f} s={188} size={88} lines={[
            { t: '"47 nuevos' },
            { t: 'esta semana"', hl: true },
            { t: 'vende más.' },
          ]} dark={false} />
          <div style={{
            fontFamily: fonts.display, fontSize: 29,
            color: `${DARK}66`, marginTop: 28,
            opacity: ip(f, 228, 248, 0, 1),
          }}>
            Mostrá el impulso, no solo el total.
          </div>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};
