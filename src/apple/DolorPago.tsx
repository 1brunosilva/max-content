/**
 * DolorPago — Pain of Paying.
 * El efectivo duele más que la tarjeta. El cerebro registra el pago en cash como pérdida literal.
 * La tarjeta anestesia ese dolor → más gasto.
 * Lever: pain of paying / coupling vs decoupling. Palette: azul frío / rojo. Mode: midnight-línea. C.
 */
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { Stage, SiriGlow, SiriFrame, BigType, ip, fonts } from './kit';

const BLUE   = '#38BDF8';
const BLUE_L = '#BAE6FD';
const RED    = '#EF4444';
const RED_L  = '#FCA5A5';

export const DOLORPAGO_DURATION = 272;

export const DolorPago: React.FC = () => {
  const f = useCurrentFrame();

  const titleOp  = ip(f, 8, 24, 0, 1) * (1 - ip(f, 184, 200, 0, 1));
  const cashIn   = ip(f, 22, 46, 0, 1);
  const cardIn   = ip(f, 46, 70, 0, 1);
  const cashPain = ip(f, 60, 120, 0, 1);
  const cardEase = ip(f, 80, 130, 0, 1);
  const glowI    = ip(f, 126, 155, 0, 1);
  const insightOp = ip(f, 148, 166, 0, 1) * (1 - ip(f, 184, 200, 0, 1));
  const pay      = ip(f, 192, 220, 0, 1);

  const cashScale = 1 - cashPain * 0.22;
  const cashRed   = cashPain;

  return (
    <Stage
      bg="radial-gradient(130% 90% at 50% 42%, #020810 0%, #010508 80%)"
      hue={BLUE}
      seed={6}
    >
      {/* Title */}
      <div style={{
        position: 'absolute', top: 240, left: 90, right: 130, textAlign: 'center',
        fontFamily: fonts.mono, fontSize: 19, letterSpacing: '0.16em',
        color: `${BLUE_L}55`, opacity: titleOp,
      }}>
        MISMO PRECIO · DISTINTO DOLOR
      </div>

      <AbsoluteFill style={{ opacity: 1 - pay }}>
        <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ display: 'flex', gap: 36, alignItems: 'flex-start' }}>

            {/* Cash card */}
            <div style={{
              opacity: cashIn,
              transform: `scale(${cashScale})`,
              width: 340, position: 'relative',
            }}>
              <div style={{
                borderRadius: 28,
                background: `rgba(${Math.round(cashPain * 60)},0,0,0.15)`,
                border: `2px solid ${cashRed > 0.1 ? RED + '88' : 'rgba(255,255,255,0.14)'}`,
                backdropFilter: 'blur(14px)',
                padding: '32px 28px',
                display: 'flex', flexDirection: 'column', gap: 18, alignItems: 'center',
                boxShadow: cashRed > 0.1 ? `0 0 ${cashRed * 44}px ${RED}44` : '0 30px 80px rgba(0,0,0,0.5)',
              }}>
                <div style={{ fontSize: 52, opacity: 0.9 - cashPain * 0.4 }}>💵</div>
                <div style={{
                  fontFamily: fonts.mono, fontSize: 16, letterSpacing: '0.14em',
                  color: cashRed > 0.1 ? RED_L : 'rgba(255,255,255,0.45)',
                }}>EFECTIVO</div>
                <div style={{
                  fontFamily: fonts.display, fontWeight: 900, fontSize: 58,
                  color: cashRed > 0.1 ? RED_L : 'rgba(255,255,255,0.7)',
                  letterSpacing: '-0.04em',
                  textShadow: cashRed > 0.1 ? `0 0 24px ${RED}AA` : 'none',
                }}>$990</div>
                <div style={{
                  fontFamily: fonts.display, fontWeight: 600, fontSize: 26,
                  color: cashRed > 0.2 ? RED_L : 'rgba(255,100,100,0.55)',
                  textAlign: 'center',
                  opacity: cashPain * 1.2,
                }}>
                  😣 El cerebro duele
                </div>
              </div>

              {/* Pain bar */}
              <div style={{ marginTop: 20, opacity: cashIn }}>
                <div style={{ fontFamily: fonts.mono, fontSize: 14, letterSpacing: '0.1em', color: `${RED_L}88`, marginBottom: 8, textAlign: 'center' }}>
                  DOLOR PERCIBIDO
                </div>
                <div style={{ height: 10, borderRadius: 5, background: 'rgba(255,255,255,0.05)', overflow: 'hidden' }}>
                  <div style={{
                    height: '100%', borderRadius: 5, width: `${cashPain * 84}%`,
                    background: `linear-gradient(90deg, ${RED} 0%, ${RED_L} 100%)`,
                  }} />
                </div>
                <div style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: 32, color: RED_L, textAlign: 'center', marginTop: 6 }}>
                  {Math.round(cashPain * 84)}%
                </div>
              </div>
            </div>

            {/* Credit card */}
            <div style={{
              opacity: cardIn,
              width: 340, position: 'relative',
            }}>
              {glowI > 0.05 ? <SiriGlow frame={f} intensity={glowI * 0.75} radius={28} /> : null}
              <div style={{
                borderRadius: 28,
                background: glowI > 0.2 ? 'rgba(56,189,248,0.1)' : 'rgba(255,255,255,0.04)',
                border: `2px solid ${glowI > 0.2 ? BLUE + 'AA' : 'rgba(255,255,255,0.14)'}`,
                backdropFilter: 'blur(14px)',
                padding: '32px 28px',
                display: 'flex', flexDirection: 'column', gap: 18, alignItems: 'center',
                boxShadow: glowI > 0.2 ? `0 0 44px ${BLUE}44` : '0 30px 80px rgba(0,0,0,0.5)',
              }}>
                <div style={{ fontSize: 52 }}>💳</div>
                <div style={{
                  fontFamily: fonts.mono, fontSize: 16, letterSpacing: '0.14em',
                  color: glowI > 0.2 ? BLUE_L : 'rgba(255,255,255,0.45)',
                }}>TARJETA</div>
                <div style={{
                  fontFamily: fonts.display, fontWeight: 900, fontSize: 58,
                  color: glowI > 0.2 ? BLUE_L : 'rgba(255,255,255,0.7)',
                  letterSpacing: '-0.04em',
                  textShadow: glowI > 0.2 ? `0 0 24px ${BLUE}AA` : 'none',
                }}>$990</div>
                <div style={{
                  fontFamily: fonts.display, fontWeight: 600, fontSize: 26,
                  color: glowI > 0.2 ? BLUE_L : 'rgba(100,200,255,0.55)',
                  textAlign: 'center',
                  opacity: cardEase,
                }}>
                  😌 Casi no se siente
                </div>
              </div>

              {/* Ease bar */}
              <div style={{ marginTop: 20, opacity: cardIn }}>
                <div style={{ fontFamily: fonts.mono, fontSize: 14, letterSpacing: '0.1em', color: `${BLUE_L}88`, marginBottom: 8, textAlign: 'center' }}>
                  DOLOR PERCIBIDO
                </div>
                <div style={{ height: 10, borderRadius: 5, background: 'rgba(255,255,255,0.05)', overflow: 'hidden' }}>
                  <div style={{
                    height: '100%', borderRadius: 5, width: `${cardEase * 18}%`,
                    background: `linear-gradient(90deg, ${BLUE} 0%, ${BLUE_L} 100%)`,
                  }} />
                </div>
                <div style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: 32, color: BLUE_L, textAlign: 'center', marginTop: 6 }}>
                  {Math.round(cardEase * 18)}%
                </div>
              </div>
            </div>
          </div>

          {/* Insight label */}
          <div style={{
            position: 'absolute', bottom: 450, left: 90, right: 130, textAlign: 'center',
            fontFamily: fonts.display, fontWeight: 700, fontSize: 38,
            color: BLUE_L, opacity: insightOp,
            textShadow: `0 0 22px ${BLUE}77`,
            letterSpacing: '-0.02em',
          }}>
            El mismo monto. Distinto dolor.
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
          <BigType frame={f} s={192} size={88} lines={[
            { t: 'La forma de' },
            { t: 'cobrar cambia', hl: false },
            { t: 'lo que duele.', hl: true },
          ]} />
          <div style={{
            fontFamily: fonts.display, fontSize: 29,
            color: `${BLUE_L}66`, marginTop: 28,
            opacity: ip(f, 232, 252, 0, 1),
          }}>
            Reducí la fricción del pago.
          </div>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};
