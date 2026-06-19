/**
 * EndowmentCard — Endowment effect / efecto de dotación.
 * Dos cards idénticas, mismo precio. Pero "TU PROPUESTA" se percibe
 * como de mayor valor. Lo que sentís tuyo, vale más.
 * Lever: endowment effect. Palette: dorado. Mode: glassy-oscuro cálido. C.
 */
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { Stage, Glass, SiriGlow, SiriFrame, BigType, ip, fonts } from './kit';

const GOLD   = '#D97706';
const GOLD_L = '#FCD34D';
const GOLD_M = '#F59E0B';

export const ENDOWMENTCARD_DURATION = 265;

export const EndowmentCard: React.FC = () => {
  const f = useCurrentFrame();

  const labelOp  = ip(f,  4, 22, 0, 1);
  const cardsIn  = ip(f, 10, 46, 0, 1);
  const barsIn   = ip(f, 62, 95, 0, 1);
  const barLW    = ip(f, 62, 108, 0, 45);
  const barRW    = ip(f, 62, 118, 0, 88);
  const glowI    = ip(f, 120, 155, 0, 1);
  const midLabel = ip(f, 140, 158, 0, 1) * (1 - ip(f, 172, 188, 0, 1));
  const pay      = ip(f, 180, 208, 0, 1);

  return (
    <Stage
      bg="radial-gradient(120% 85% at 50% 42%, #100C00 0%, #060400 80%)"
      hue={GOLD_M}
      seed={6}
    >
      {/* Top label */}
      <div style={{
        position: 'absolute', top: 238, left: 0, right: 0, textAlign: 'center',
        fontFamily: fonts.mono, fontSize: 18, letterSpacing: '0.18em',
        color: 'rgba(255,200,100,0.55)', opacity: labelOp * (1 - pay), zIndex: 30,
      }}>
        MISMA PROPUESTA. MISMO PRECIO.
      </div>

      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', opacity: 1 - pay }}>
        <div style={{ display: 'flex', gap: 30, alignItems: 'flex-start' }}>

          {/* Left: External option */}
          <div style={{
            opacity: cardsIn,
            transform: `translateY(${(1 - cardsIn) * 28}px)`,
            width: 360,
          }}>
            <Glass w={360} h={360} pad={32} style={{
              border: '1px solid rgba(255,255,255,0.10)',
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: fonts.mono, fontSize: 14, letterSpacing: '0.16em', color: 'rgba(200,180,120,0.45)', marginBottom: 14 }}>
                  OPCIÓN EXTERNA
                </div>
                <div style={{ fontFamily: fonts.display, fontWeight: 900, fontSize: 58, color: 'rgba(200,180,100,0.55)', letterSpacing: '-0.04em' }}>
                  $4.900
                </div>
                <div style={{ fontFamily: fonts.mono, fontSize: 18, color: 'rgba(200,180,100,0.35)', marginTop: 4 }}>/mes</div>
                <div style={{ marginTop: 28 }}>
                  <div style={{ fontFamily: fonts.mono, fontSize: 13, letterSpacing: '0.12em', color: 'rgba(200,180,100,0.38)', marginBottom: 8 }}>
                    VALOR PERCIBIDO
                  </div>
                  <div style={{ width: '100%', height: 10, borderRadius: 5, background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
                    <div style={{
                      height: '100%', borderRadius: 5,
                      background: 'rgba(200,160,60,0.45)',
                      width: `${barLW}%`, opacity: barsIn,
                    }} />
                  </div>
                  <div style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: 34, color: 'rgba(200,160,60,0.45)', marginTop: 6, opacity: barsIn }}>
                    {Math.round(barLW)}%
                  </div>
                </div>
              </div>
            </Glass>
          </div>

          {/* Right: Tu propuesta */}
          <div style={{
            opacity: cardsIn,
            transform: `translateY(${(1 - cardsIn) * 28}px) scale(${1 + glowI * 0.04})`,
            width: 360, position: 'relative',
          }}>
            {glowI > 0.05 ? <SiriGlow frame={f} intensity={glowI * 0.9} radius={34} /> : null}
            <Glass w={360} h={360} selected={glowI > 0.2} pad={32} style={{
              border: `1px solid ${glowI > 0.2 ? GOLD + '88' : 'rgba(255,200,80,0.22)'}`,
              background: glowI > 0.2 ? 'linear-gradient(165deg,#1A1200 0%,#0A0800 100%)' : undefined,
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: fonts.mono, fontSize: 14, letterSpacing: '0.16em', color: glowI > 0.2 ? GOLD_M : 'rgba(200,180,120,0.6)', marginBottom: 14 }}>
                  TU PROPUESTA
                </div>
                <div style={{
                  fontFamily: fonts.display, fontWeight: 900, fontSize: 58,
                  color: glowI > 0.2 ? GOLD_L : 'rgba(255,220,140,0.85)',
                  letterSpacing: '-0.04em',
                  textShadow: glowI > 0.2 ? `0 0 32px ${GOLD}aa` : 'none',
                }}>
                  $4.900
                </div>
                <div style={{ fontFamily: fonts.mono, fontSize: 18, color: glowI > 0.2 ? GOLD_M : 'rgba(200,180,120,0.45)', marginTop: 4 }}>/mes</div>
                <div style={{ marginTop: 28 }}>
                  <div style={{ fontFamily: fonts.mono, fontSize: 13, letterSpacing: '0.12em', color: glowI > 0.2 ? GOLD_M : 'rgba(200,180,120,0.38)', marginBottom: 8 }}>
                    VALOR PERCIBIDO
                  </div>
                  <div style={{ width: '100%', height: 10, borderRadius: 5, background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
                    <div style={{
                      height: '100%', borderRadius: 5,
                      background: glowI > 0.2 ? `linear-gradient(90deg, ${GOLD} 0%, ${GOLD_L} 100%)` : 'rgba(220,170,60,0.65)',
                      width: `${barRW}%`,
                      opacity: barsIn,
                      boxShadow: glowI > 0.2 ? `0 0 12px ${GOLD}88` : 'none',
                    }} />
                  </div>
                  <div style={{
                    fontFamily: fonts.display, fontWeight: 800, fontSize: 34,
                    color: glowI > 0.2 ? GOLD_L : 'rgba(220,170,60,0.85)',
                    marginTop: 6, opacity: barsIn,
                    textShadow: glowI > 0.2 ? `0 0 20px ${GOLD}88` : 'none',
                  }}>
                    {Math.round(barRW)}%
                  </div>
                </div>
              </div>
            </Glass>
          </div>
        </div>

        {/* Mid reveal label */}
        <div style={{
          marginTop: 36, textAlign: 'center',
          fontFamily: fonts.display, fontWeight: 700, fontSize: 38,
          color: GOLD_L, letterSpacing: '-0.02em',
          opacity: midLabel,
          textShadow: `0 0 28px ${GOLD}77`,
        }}>
          Lo tuyo siempre parece más valioso.
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
          <BigType frame={f} s={180} size={88} lines={[
            { t: 'Lo que sentís' },
            { t: 'tuyo,' },
            { t: 'vale más.', hl: true },
          ]} />
          <div style={{
            fontFamily: fonts.display, fontSize: 30,
            color: `rgba(217,119,6,0.65)`, marginTop: 28,
            opacity: ip(f, 222, 240, 0, 1),
          }}>
            Hacé que sea suyo antes de vender.
          </div>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};
