/**
 * PrecioTrayectoria — Price Momentum / Price Trajectory Effect.
 * El mismo precio final se siente diferente según su trayectoria:
 * un precio que SUBIÓ → los clientes compran antes de que suba más.
 * Un precio que BAJÓ → los clientes esperan a que baje más aún.
 * Dos líneas de tiempo revelan el mismo $5.000 con comportamientos opuestos.
 *
 * Lever: price trajectory / momentum / reference point dynamics. Paleta: ámbar-verde. V.
 */
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { Stage, SiriGlow, SiriFrame, BigType, ip, fonts } from './kit';

export const PRECIOTRAYECTORIA_DURATION = 294;

const AMBER = '#F59E0B';
const GREEN = '#10B981';
const RED = '#EF4444';

export const PrecioTrayectoria: React.FC = () => {
  const f = useCurrentFrame();

  const labelIn = ip(f, 8, 28, 0, 1) * (1 - ip(f, 205, 220, 0, 1));
  const mainFade = ip(f, 203, 220, 0, 1);

  // Las dos timelines entran
  const tlIn = ip(f, 25, 55, 0, 1);

  // Timeline A: precio sube (de $3.000 → $5.000)
  const priceARise = ip(f, 52, 110, 0, 1);
  const glowA = ip(f, 104, 140, 0, 1) * (1 - mainFade);
  const buyA = ip(f, 115, 140, 0, 1) * (1 - mainFade);

  // Timeline B: precio baja (de $8.000 → $5.000)
  const priceBFall = ip(f, 58, 118, 0, 1);
  const waitB = ip(f, 125, 148, 0, 1) * (1 - mainFade);
  const dimB = ip(f, 120, 155, 0, 1) * (1 - mainFade);

  const pay = ip(f, 222, 262, 0, 1);

  // Precio A animado
  const priceAVal = Math.round(3000 + priceARise * 2000);
  // Precio B animado
  const priceBVal = Math.round(8000 - priceBFall * 3000);

  const fmtPrice = (n: number) => `$${n.toLocaleString('es-UY')}`;

  return (
    <Stage
      bg="radial-gradient(130% 90% at 50% 44%, #0E0800 0%, #070500 78%)"
      hue={AMBER}
      seed={10}
    >
      <div style={{
        position: 'absolute', top: 252, left: 0, right: 0, textAlign: 'center',
        fontFamily: fonts.mono, fontSize: 30, letterSpacing: '0.18em',
        color: 'rgba(255,255,255,0.50)', opacity: labelIn, zIndex: 30,
      }}>
        EL MISMO PRECIO, DOS HISTORIAS
      </div>

      <AbsoluteFill style={{ opacity: 1 - pay }}>
        <div style={{
          position: 'absolute', top: 320, left: 90, right: 130,
          display: 'flex', gap: 22,
          opacity: tlIn,
          transform: `translateY(${(1 - tlIn) * 22}px)`,
        }}>

          {/* TIMELINE A: precio sube */}
          <div style={{ flex: 1 }}>
            <div style={{
              background: glowA > 0.1 ? `${GREEN}10` : 'rgba(255,255,255,0.04)',
              border: `1.5px solid ${glowA > 0.1 ? GREEN + '44' : 'rgba(255,255,255,0.10)'}`,
              borderRadius: 26, padding: '34px 32px',
              position: 'relative', minHeight: 600,
            }}>
              {glowA > 0.01 && (
                <SiriGlow frame={f} intensity={glowA * 0.85} radius={26} inset={0} />
              )}

              <div style={{
                fontFamily: fonts.mono, fontSize: 23,
                color: glowA > 0.3 ? GREEN : 'rgba(255,255,255,0.30)',
                letterSpacing: '0.12em', marginBottom: 18,
              }}>
                PRECIO QUE SUBE ↑
              </div>

              {/* Flecha ascendente */}
              <div style={{
                display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20,
              }}>
                {[
                  { time: 'Ene', price: '$3.000', dim: false },
                  { time: 'Feb', price: '$3.800', dim: false },
                  { time: 'Mar', price: fmtPrice(priceAVal), dim: false },
                ].map((row, i) => (
                  <div key={i} style={{
                    display: 'flex', justifyContent: 'space-between',
                    opacity: ip(f, 58 + i * 16, 78 + i * 16, 0, 1),
                  }}>
                    <div style={{ fontFamily: fonts.mono, fontSize: 24, color: 'rgba(255,255,255,0.35)' }}>
                      {row.time}
                    </div>
                    <div style={{
                      fontFamily: fonts.display, fontWeight: 800, fontSize: 36,
                      color: i === 2 ? (glowA > 0.2 ? GREEN : '#F4F4FA') : 'rgba(255,255,255,0.5)',
                    }}>
                      {i < 2 ? row.price : fmtPrice(priceAVal)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Reacción: comprar ahora */}
              {buyA > 0.1 && (
                <div style={{
                  background: `${GREEN}18`, border: `1px solid ${GREEN}44`,
                  borderRadius: 16, padding: '14px 20px',
                  fontFamily: fonts.display, fontWeight: 700, fontSize: 32,
                  color: GREEN, textAlign: 'center',
                  opacity: buyA,
                  textShadow: `0 0 16px ${GREEN}55`,
                }}>
                  "Compro YA antes de que suba más"
                </div>
              )}
            </div>
          </div>

          {/* TIMELINE B: precio baja */}
          <div style={{ flex: 1, opacity: 1 - dimB * 0.75 }}>
            <div style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 26, padding: '34px 32px',
              minHeight: 600,
              filter: `saturate(${1 - dimB * 0.85})`,
            }}>
              <div style={{
                fontFamily: fonts.mono, fontSize: 23,
                color: 'rgba(255,255,255,0.28)',
                letterSpacing: '0.12em', marginBottom: 18,
              }}>
                PRECIO QUE BAJA ↓
              </div>

              <div style={{
                display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20,
              }}>
                {[
                  { time: 'Ene', price: '$8.000' },
                  { time: 'Feb', price: '$6.500' },
                  { time: 'Mar', price: fmtPrice(priceBVal) },
                ].map((row, i) => (
                  <div key={i} style={{
                    display: 'flex', justifyContent: 'space-between',
                    opacity: ip(f, 62 + i * 16, 82 + i * 16, 0, 1),
                  }}>
                    <div style={{ fontFamily: fonts.mono, fontSize: 24, color: 'rgba(255,255,255,0.28)' }}>
                      {row.time}
                    </div>
                    <div style={{
                      fontFamily: fonts.display, fontWeight: 800, fontSize: 36,
                      color: i === 2 ? 'rgba(255,255,255,0.45)' : 'rgba(255,255,255,0.35)',
                      textDecoration: i < 2 ? 'line-through' : 'none',
                    }}>
                      {i < 2 ? row.price : fmtPrice(priceBVal)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Reacción: esperar */}
              {waitB > 0.1 && (
                <div style={{
                  background: 'rgba(239,68,68,0.10)',
                  border: '1px solid rgba(239,68,68,0.25)',
                  borderRadius: 16, padding: '14px 20px',
                  fontFamily: fonts.display, fontWeight: 700, fontSize: 30,
                  color: RED, textAlign: 'center',
                  opacity: waitB,
                }}>
                  "Espero a que baje más..."
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Insight */}
        <div style={{
          position: 'absolute', bottom: 442, left: 90, right: 130,
          textAlign: 'center',
          opacity: glowA * (1 - mainFade),
          transform: `translateY(${(1 - glowA) * 16}px)`,
        }}>
          <div style={{
            display: 'inline-block',
            background: `${AMBER}12`, border: `1px solid ${AMBER}44`,
            borderRadius: 50, padding: '14px 44px',
            fontFamily: fonts.display, fontWeight: 700, fontSize: 36, color: AMBER,
          }}>
            El mismo $5.000. Comportamiento opuesto.
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
          <BigType frame={f} s={226} size={92} lines={[
            { t: 'El precio que sube' },
            { t: 'genera urgencia.' },
            { t: 'El que baja, espera.', hl: true },
          ]} />
          <div style={{
            fontFamily: fonts.display, fontWeight: 400, fontSize: 38,
            color: '#9A9AB5', marginTop: 32,
            opacity: ip(f, 270, 290, 0, 1),
          }}>
            La trayectoria del precio importa tanto como el precio mismo.
          </div>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};
