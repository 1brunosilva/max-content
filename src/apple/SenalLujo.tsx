/**
 * SeñalLujo — Veblen Effect / Price as Quality Signal.
 * Para bienes premium, el precio ALTO puede aumentar la demanda.
 * El mismo servicio con dos encuadres: "PROMOCIÓN -50%" (descuento = dim,
 * sentido de duda de calidad) vs "EDICIÓN PREMIUM" (precio completo = glow,
 * deseabilidad). El espectador elige y siente el contraste.
 *
 * Lever: Veblen effect / luxury signaling / price-quality link. Paleta: dorado-crema. V.
 */
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { Stage, SiriGlow, SiriFrame, BigType, ip, fonts } from './kit';

export const SENALLUJO_DURATION = 286;

const GOLD = '#F59E0B';
const CREAM = '#F5F0E8';
const RED = '#EF4444';

export const SenalLujo: React.FC = () => {
  const f = useCurrentFrame();

  const labelIn = ip(f, 8, 28, 0, 1) * (1 - ip(f, 198, 214, 0, 1));

  // Las dos cards aparecen juntas
  const cardsIn = ip(f, 28, 62, 0, 1);
  const cardsFade = ip(f, 196, 212, 0, 1);

  // La descuento se apaga / desconfianza
  const discountDim = ip(f, 88, 128, 0, 1);
  // La premium se enciende
  const premiumGlow = ip(f, 104, 145, 0, 1) * (1 - cardsFade);

  // Cursor / elección
  const cursorIn = ip(f, 148, 172, 0, 1) * (1 - cardsFade);

  // Insight
  const insightIn = ip(f, 154, 178, 0, 1) * (1 - cardsFade);

  const pay = ip(f, 214, 254, 0, 1);

  return (
    <Stage
      bg="radial-gradient(130% 88% at 50% 40%, #120D04 0%, #07060300 78%)"
      hue={GOLD}
      seed={9}
    >
      <div style={{
        position: 'absolute', top: 252, left: 0, right: 0, textAlign: 'center',
        fontFamily: fonts.mono, fontSize: 30, letterSpacing: '0.18em',
        color: 'rgba(255,255,255,0.50)', opacity: labelIn, zIndex: 30,
      }}>
        EL PRECIO QUE ESPANTA... Y EL QUE ATRAE
      </div>

      <AbsoluteFill style={{ opacity: 1 - pay }}>
        <div style={{
          position: 'absolute', top: 340, left: 90, right: 130,
          display: 'flex', gap: 22,
          opacity: cardsIn,
          transform: `translateY(${(1 - cardsIn) * 22}px)`,
        }}>

          {/* Card A: con descuento */}
          <div style={{
            flex: 1,
            opacity: 1 - discountDim * 0.82,
            filter: `saturate(${1 - discountDim * 0.9})`,
          }}>
            <div style={{
              background: 'rgba(239,68,68,0.06)',
              border: `1.5px solid ${discountDim > 0.4 ? 'rgba(239,68,68,0.15)' : 'rgba(239,68,68,0.30)'}`,
              borderRadius: 28, padding: '36px 32px',
              position: 'relative', minHeight: 540,
            }}>
              {/* Badge descuento */}
              <div style={{
                position: 'absolute', top: -18, left: 22,
                background: RED, borderRadius: 10, padding: '6px 18px',
                fontFamily: fonts.display, fontWeight: 900, fontSize: 28, color: '#fff',
              }}>
                -50% OFF
              </div>

              <div style={{
                fontFamily: fonts.mono, fontSize: 23, color: 'rgba(255,255,255,0.3)',
                letterSpacing: '0.12em', marginBottom: 16, marginTop: 14,
              }}>
                OPCIÓN ECONÓMICA
              </div>

              <div style={{
                fontFamily: fonts.display, fontWeight: 800, fontSize: 50,
                color: 'rgba(255,255,255,0.4)',
                letterSpacing: '-0.02em', lineHeight: 1.1,
              }}>
                <span style={{ textDecoration: 'line-through', fontSize: 36, opacity: 0.5 }}>$15.000</span>
                <br />$7.500
              </div>

              <div style={{
                fontFamily: fonts.display, fontWeight: 500, fontSize: 32,
                color: 'rgba(255,255,255,0.32)', marginTop: 18, lineHeight: 1.3,
              }}>
                Consultoría de marketing
              </div>

              {discountDim > 0.3 && (
                <div style={{
                  fontFamily: fonts.mono, fontSize: 22, color: 'rgba(239,68,68,0.6)',
                  marginTop: 24, opacity: discountDim,
                }}>
                  ¿Por qué tan barato?
                </div>
              )}
            </div>
          </div>

          {/* Card B: premium */}
          <div style={{ flex: 1 }}>
            <div style={{
              background: premiumGlow > 0.1 ? `${GOLD}14` : 'rgba(255,255,255,0.05)',
              border: `1.5px solid ${premiumGlow > 0.1 ? GOLD + '55' : 'rgba(255,255,255,0.12)'}`,
              borderRadius: 28, padding: '36px 32px',
              position: 'relative', minHeight: 540,
            }}>
              {premiumGlow > 0.01 && (
                <SiriGlow frame={f} intensity={premiumGlow * 0.9} radius={28} inset={0} />
              )}

              {/* Badge premium */}
              <div style={{
                position: 'absolute', top: -18, left: 22,
                background: `${GOLD}cc`, borderRadius: 10, padding: '6px 18px',
                fontFamily: fonts.display, fontWeight: 900, fontSize: 28, color: '#0B0900',
              }}>
                EDICIÓN LIMITADA
              </div>

              <div style={{
                fontFamily: fonts.mono, fontSize: 23,
                color: premiumGlow > 0.3 ? GOLD : 'rgba(255,255,255,0.35)',
                letterSpacing: '0.12em', marginBottom: 16, marginTop: 14,
              }}>
                SELECCIÓN EXCLUSIVA
              </div>

              <div style={{
                fontFamily: fonts.display, fontWeight: 800, fontSize: 50,
                color: premiumGlow > 0.3 ? CREAM : 'rgba(255,255,255,0.6)',
                letterSpacing: '-0.02em', lineHeight: 1.1,
                textShadow: premiumGlow > 0.3 ? `0 0 30px ${GOLD}44` : 'none',
              }}>
                $15.000
              </div>

              <div style={{
                fontFamily: fonts.display, fontWeight: 500, fontSize: 32,
                color: premiumGlow > 0.3 ? 'rgba(255,255,255,0.75)' : 'rgba(255,255,255,0.4)',
                marginTop: 18, lineHeight: 1.3,
              }}>
                Consultoría de marketing
              </div>

              {premiumGlow > 0.3 && (
                <div style={{
                  fontFamily: fonts.mono, fontSize: 22, color: GOLD,
                  marginTop: 24, opacity: premiumGlow,
                }}>
                  ✦ Solo 3 lugares este mes
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Cursor eligiendo el premium */}
        {cursorIn > 0.1 && (
          <div style={{
            position: 'absolute', top: 900, right: 175,
            opacity: cursorIn,
            fontFamily: fonts.mono, fontSize: 28, color: GOLD,
          }}>
            👆 Esta
          </div>
        )}

        {/* Insight */}
        {insightIn > 0.1 && (
          <div style={{
            position: 'absolute', bottom: 446, left: 90, right: 130,
            textAlign: 'center', opacity: insightIn,
            transform: `translateY(${(1 - insightIn) * 16}px)`,
          }}>
            <div style={{
              display: 'inline-block',
              background: `${GOLD}14`, border: `1px solid ${GOLD}44`,
              borderRadius: 50, padding: '14px 44px',
              fontFamily: fonts.display, fontWeight: 600, fontSize: 36, color: GOLD,
            }}>
              El precio alto es la señal. No el obstáculo.
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
            { t: 'El precio bajo' },
            { t: 'no atrae.' },
            { t: 'Genera dudas.', hl: true },
          ]} />
          <div style={{
            fontFamily: fonts.display, fontWeight: 400, fontSize: 38,
            color: '#9A9AB5', marginTop: 32,
            opacity: ip(f, 264, 282, 0, 1),
          }}>
            El precio es la primera señal de calidad que tu cliente lee.
          </div>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};
