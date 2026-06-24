/**
 * SumaCero — Zero-Sum Bias.
 * Rozenblit & Keil: las personas tienden a ver las negociaciones y transacciones
 * como suma cero ("si ganás vos, pierdo yo"). Eso destruye la confianza.
 * Un reencuadre de suma positiva desbloquea la relación. Dos balanzas:
 * la que se hunde vs la que sube sola cuando ambos ganan.
 *
 * Lever: zero-sum bias / positive-sum reframe / trust. Paleta: verde-dorado. C.
 */
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { Stage, SiriGlow, SiriFrame, BigType, ip, fonts } from './kit';

export const SUMACERO_DURATION = 292;

const GREEN = '#10B981';
const GOLD = '#F59E0B';
const RED = '#EF4444';

export const SumaCero: React.FC = () => {
  const f = useCurrentFrame();

  const labelIn = ip(f, 8, 28, 0, 1) * (1 - ip(f, 204, 218, 0, 1));

  // Fase 1: suma cero (balanza se desequilibra)
  const zeroIn = ip(f, 25, 55, 0, 1);
  const zeroFade = ip(f, 108, 140, 0, 1);

  // Inclinación de la balanza (uno sube, otro baja)
  const tilt = ip(f, 62, 108, 0, 1) * (1 - zeroFade);
  const tiltDeg = tilt * 24;

  // Reacción desconfianza
  const distrustIn = ip(f, 82, 108, 0, 1) * (1 - zeroFade);

  // Fase 2: suma positiva (ambos suben)
  const posIn = ip(f, 144, 174, 0, 1);
  const bothRise = ip(f, 174, 210, 0, 1) * (1 - ip(f, 202, 218, 0, 1));
  const posGlow = ip(f, 176, 205, 0, 1) * (1 - ip(f, 202, 218, 0, 1));

  const pay = ip(f, 220, 260, 0, 1);

  const leftY = tiltDeg * 3;   // baja
  const rightY = -tiltDeg * 3; // sube

  const posLeftY = -bothRise * 40;

  return (
    <Stage
      bg="radial-gradient(130% 92% at 50% 44%, #041008 0%, #020704 80%)"
      hue={GREEN}
      seed={9}
    >
      <div style={{
        position: 'absolute', top: 252, left: 0, right: 0, textAlign: 'center',
        fontFamily: fonts.mono, fontSize: 30, letterSpacing: '0.18em',
        color: 'rgba(255,255,255,0.50)', opacity: labelIn, zIndex: 30,
      }}>
        ¿NEGOCIO O BATALLA?
      </div>

      <AbsoluteFill style={{ opacity: 1 - pay }}>

        {/* SUMA CERO */}
        <div style={{
          position: 'absolute', top: 330, left: 90, right: 130,
          opacity: zeroIn * (1 - zeroFade),
          transform: `translateY(${(1 - zeroIn) * 22}px)`,
        }}>
          <div style={{
            background: 'rgba(239,68,68,0.05)',
            border: '1px solid rgba(239,68,68,0.18)',
            borderRadius: 28, padding: '36px 44px', textAlign: 'center',
          }}>
            <div style={{
              fontFamily: fonts.mono, fontSize: 26, color: 'rgba(255,255,255,0.30)',
              letterSpacing: '0.14em', marginBottom: 22,
            }}>
              SUMA CERO — "Si él gana, yo pierdo"
            </div>

            {/* Balanza desequilibrada */}
            <div style={{
              display: 'flex', justifyContent: 'center', alignItems: 'center',
              gap: 0, position: 'relative', height: 180,
            }}>
              {/* Base pivote */}
              <div style={{
                position: 'absolute', bottom: 0, left: '50%',
                transform: 'translateX(-50%)',
                width: 8, height: 80, background: 'rgba(255,255,255,0.15)',
                borderRadius: 4,
              }} />

              {/* Brazo de la balanza */}
              <div style={{
                position: 'absolute', bottom: 72,
                width: 360, height: 6,
                background: 'rgba(255,255,255,0.20)',
                borderRadius: 3,
                transform: `rotate(${tiltDeg}deg)`,
                transformOrigin: 'center center',
              }} />

              {/* Plato izquierdo (CLIENTE — baja) */}
              <div style={{
                position: 'absolute', bottom: 72, left: 90,
                transform: `translateY(${leftY}px)`,
              }}>
                <div style={{
                  width: 100, height: 100, borderRadius: 18,
                  background: 'rgba(239,68,68,0.15)',
                  border: `2px solid rgba(239,68,68,0.35)`,
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center', gap: 4,
                }}>
                  <div style={{ fontFamily: fonts.display, fontSize: 36 }}>😟</div>
                  <div style={{ fontFamily: fonts.mono, fontSize: 18, color: RED }}>CLIENTE</div>
                </div>
              </div>

              {/* Plato derecho (VOS — sube) */}
              <div style={{
                position: 'absolute', bottom: 72, right: 90,
                transform: `translateY(${rightY}px)`,
              }}>
                <div style={{
                  width: 100, height: 100, borderRadius: 18,
                  background: 'rgba(16,185,129,0.12)',
                  border: '2px solid rgba(16,185,129,0.30)',
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center', gap: 4,
                }}>
                  <div style={{ fontFamily: fonts.display, fontSize: 36 }}>😏</div>
                  <div style={{ fontFamily: fonts.mono, fontSize: 18, color: GREEN }}>VOS</div>
                </div>
              </div>
            </div>

            {/* Reacción desconfianza */}
            {distrustIn > 0.1 && (
              <div style={{
                fontFamily: fonts.mono, fontSize: 26, color: RED,
                marginTop: 18, opacity: distrustIn,
              }}>
                "Me está cagando." — El cliente siempre
              </div>
            )}
          </div>
        </div>

        {/* VS */}
        <div style={{
          position: 'absolute', top: 640, left: 0, right: 0, textAlign: 'center',
          fontFamily: fonts.display, fontWeight: 900, fontSize: 38,
          color: 'rgba(255,255,255,0.15)',
          opacity: ip(f, 148, 165, 0, 1) * (1 - ip(f, 202, 218, 0, 1)),
        }}>
          vs
        </div>

        {/* SUMA POSITIVA */}
        <div style={{
          position: 'absolute', top: 688, left: 90, right: 130,
          opacity: posIn,
          transform: `translateY(${(1 - posIn) * 22}px)`,
        }}>
          <div style={{
            background: posGlow > 0.1 ? `${GREEN}10` : 'rgba(255,255,255,0.05)',
            border: `1.5px solid ${posGlow > 0.1 ? GREEN + '44' : 'rgba(255,255,255,0.12)'}`,
            borderRadius: 28, padding: '36px 44px', textAlign: 'center',
            position: 'relative',
          }}>
            {posGlow > 0.01 && (
              <SiriGlow frame={f} intensity={posGlow * 0.8} radius={28} inset={0} />
            )}
            <div style={{
              fontFamily: fonts.mono, fontSize: 26,
              color: posGlow > 0.3 ? GREEN : 'rgba(255,255,255,0.35)',
              letterSpacing: '0.14em', marginBottom: 22,
            }}>
              SUMA POSITIVA — "Ambos ganamos"
            </div>

            {/* Ambos suben */}
            <div style={{
              display: 'flex', justifyContent: 'center', gap: 48,
            }}>
              {[
                { emoji: '😊', label: 'CLIENTE', color: GREEN },
                { emoji: '😊', label: 'VOS', color: GOLD },
              ].map((p, i) => (
                <div key={i} style={{
                  transform: `translateY(${posLeftY}px)`,
                }}>
                  <div style={{
                    width: 110, height: 110, borderRadius: 22,
                    background: `${p.color}18`,
                    border: `2px solid ${posGlow > 0.1 ? p.color + '66' : p.color + '33'}`,
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center', gap: 6,
                    boxShadow: posGlow > 0.3 ? `0 0 24px ${p.color}44` : 'none',
                  }}>
                    <div style={{ fontFamily: fonts.display, fontSize: 42 }}>{p.emoji}</div>
                    <div style={{
                      fontFamily: fonts.mono, fontSize: 20,
                      color: posGlow > 0.3 ? p.color : `${p.color}88`,
                    }}>{p.label}</div>
                  </div>
                  {posGlow > 0.2 && (
                    <div style={{
                      textAlign: 'center', marginTop: 8,
                      fontFamily: fonts.display, fontWeight: 900, fontSize: 32,
                      color: p.color, textShadow: `0 0 12px ${p.color}66`,
                      opacity: posGlow,
                    }}>
                      ↑
                    </div>
                  )}
                </div>
              ))}
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
            { t: 'Si el cliente siente' },
            { t: 'que ganaste vos,' },
            { t: 'cree que perdió él.', hl: true },
          ]} />
          <div style={{
            fontFamily: fonts.display, fontWeight: 400, fontSize: 38,
            color: '#9A9AB5', marginTop: 32,
            opacity: ip(f, 268, 288, 0, 1),
          }}>
            Mostrá cómo ganan los dos. La confianza es el producto.
          </div>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};
