/**
 * CasiLlego — Near-Miss Effect / Downward Counterfactual Thinking.
 * El contador gira y se acerca a META. Para a UN paso antes. El espectador
 * siente el dolor del "casi". Luego: mismo contador llega al 100% → todo
 * cambia con glow. La brecha del "casi" es más motivante que el fracaso lejano.
 *
 * Lever: near-miss / counterfactual / motivación por proximidad. Paleta: ámbar. C.
 */
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { Stage, SiriGlow, SiriFrame, BigType, ip, fonts } from './kit';

export const CASILLLEGO_DURATION = 296;

const AMBER = '#F59E0B';
const AMBER_L = '#FCD34D';
const RED = '#EF4444';
const GREEN = '#10B981';

export const CasiLlego: React.FC = () => {
  const f = useCurrentFrame();

  const labelIn = ip(f, 8, 28, 0, 1) * (1 - ip(f, 202, 216, 0, 1));

  // Fase 1: el contador sube hacia la meta... y para antes
  const count1 = Math.round(ip(f, 22, 108, 0, 97));
  const count1Visible = ip(f, 16, 40, 0, 1) * (1 - ip(f, 120, 142, 0, 1));

  // El "CASI" aparece con destello rojo
  const almostIn = ip(f, 110, 132, 0, 1) * (1 - ip(f, 148, 165, 0, 1));
  const almostPulse = 0.8 + 0.2 * Math.sin(f * 0.28);

  // Barra de progreso primera vuelta
  const bar1Fill = ip(f, 28, 108, 0, 0.97);

  // Fase 2: el contador llega al 100% con glow
  const count2 = Math.round(ip(f, 160, 235, 0, 100));
  const count2Visible = ip(f, 155, 178, 0, 1) * (1 - ip(f, 196, 210, 0, 1));
  const bar2Fill = ip(f, 162, 236, 0, 1);
  const bar2Glow = ip(f, 228, 250, 0, 1) * (1 - ip(f, 200, 213, 0, 1));

  // El "LLEGASTE" con Siri glow
  const arrivedIn = ip(f, 234, 258, 0, 1) * (1 - ip(f, 196, 210, 0, 1));

  const pay = ip(f, 210, 250, 0, 1);

  return (
    <Stage
      bg="radial-gradient(130% 92% at 50% 44%, #160C00 0%, #080400 80%)"
      hue={AMBER}
      seed={9}
    >
      <div style={{
        position: 'absolute', top: 252, left: 0, right: 0, textAlign: 'center',
        fontFamily: fonts.mono, fontSize: 30, letterSpacing: '0.18em',
        color: 'rgba(255,255,255,0.50)', opacity: labelIn, zIndex: 30,
      }}>
        ¿QUÉ DUELE MÁS? ¿FALLAR O CASI LOGRARLO?
      </div>

      <AbsoluteFill style={{ opacity: 1 - pay }}>
        {/* VUELTA 1 — el "casi" */}
        <div style={{
          position: 'absolute', top: 360, left: 90, right: 130,
          opacity: count1Visible,
        }}>
          <div style={{ fontFamily: fonts.mono, fontSize: 28, color: 'rgba(255,255,255,0.36)', letterSpacing: '0.12em', marginBottom: 16 }}>
            PRIMER INTENTO — META: 100 CLIENTES
          </div>

          {/* Contador gigante */}
          <div style={{
            textAlign: 'center', marginBottom: 28,
          }}>
            <span style={{
              fontFamily: fonts.display, fontWeight: 900, fontSize: 186,
              letterSpacing: '-0.04em',
              color: count1 >= 95 ? RED : AMBER_L,
              textShadow: count1 >= 95 ? `0 0 40px ${RED}88` : `0 0 40px ${AMBER}66`,
              lineHeight: 1,
            }}>
              {count1}
            </span>
          </div>

          {/* Barra */}
          <div style={{ height: 28, borderRadius: 14, background: 'rgba(255,255,255,0.06)' }}>
            <div style={{
              width: `${bar1Fill * 100}%`, height: '100%', borderRadius: 14,
              background: bar1Fill > 0.94 ? RED : `linear-gradient(90deg, ${AMBER} 0%, ${AMBER_L} 100%)`,
              boxShadow: bar1Fill > 0.94 ? `0 0 18px ${RED}88` : `0 0 14px ${AMBER}55`,
            }} />
          </div>
          <div style={{
            display: 'flex', justifyContent: 'space-between', marginTop: 10,
            fontFamily: fonts.mono, fontSize: 26, color: 'rgba(255,255,255,0.32)',
          }}>
            <span>0</span><span style={{ color: AMBER_L }}>META: 100</span>
          </div>
        </div>

        {/* EL CASI */}
        {almostIn > 0.01 && (
          <div style={{
            position: 'absolute', top: 720, left: 0, right: 0,
            display: 'flex', justifyContent: 'center',
            opacity: almostIn * almostPulse,
          }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 18,
              background: `${RED}18`, border: `2px solid ${RED}66`,
              borderRadius: 50, padding: '18px 52px',
            }}>
              <div style={{
                fontFamily: fonts.display, fontWeight: 900, fontSize: 52,
                color: RED,
                textShadow: `0 0 24px ${RED}AA`,
              }}>
                ✗ CASI. LE FALTÓ 3.
              </div>
            </div>
          </div>
        )}

        {/* VUELTA 2 — llega al 100% */}
        <div style={{
          position: 'absolute', top: 360, left: 90, right: 130,
          opacity: count2Visible,
        }}>
          <div style={{ fontFamily: fonts.mono, fontSize: 28, color: 'rgba(255,255,255,0.36)', letterSpacing: '0.12em', marginBottom: 16 }}>
            SEGUNDO INTENTO — la brecha motivó
          </div>

          <div style={{ textAlign: 'center', marginBottom: 28 }}>
            <span style={{
              fontFamily: fonts.display, fontWeight: 900, fontSize: 186,
              letterSpacing: '-0.04em',
              color: count2 >= 100 ? GREEN : AMBER_L,
              textShadow: count2 >= 100 ? `0 0 60px ${GREEN}AA` : `0 0 40px ${AMBER}66`,
              lineHeight: 1,
            }}>
              {count2}
            </span>
          </div>

          <div style={{ height: 28, borderRadius: 14, background: 'rgba(255,255,255,0.06)', position: 'relative' }}>
            <div style={{
              width: `${bar2Fill * 100}%`, height: '100%', borderRadius: 14,
              background: bar2Fill >= 1 ? GREEN : `linear-gradient(90deg, ${AMBER} 0%, ${AMBER_L} 100%)`,
              boxShadow: bar2Fill >= 1 ? `0 0 28px ${GREEN}AA` : `0 0 14px ${AMBER}55`,
            }} />
            {bar2Glow > 0.01 && (
              <SiriGlow frame={f} intensity={bar2Glow * 0.6} radius={14} inset={0} />
            )}
          </div>
        </div>

        {/* LLEGASTE */}
        {arrivedIn > 0.01 && (
          <div style={{
            position: 'absolute', top: 720, left: 0, right: 0,
            display: 'flex', justifyContent: 'center',
            opacity: arrivedIn,
            transform: `scale(${0.7 + arrivedIn * 0.3})`,
          }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 18,
              background: `${GREEN}22`, border: `2px solid ${GREEN}66`,
              borderRadius: 50, padding: '18px 52px',
              position: 'relative',
            }}>
              <SiriGlow frame={f} intensity={arrivedIn * 0.8} radius={50} inset={-4} />
              <div style={{
                fontFamily: fonts.display, fontWeight: 900, fontSize: 52,
                color: GREEN,
                textShadow: `0 0 24px ${GREEN}AA`,
              }}>
                ✓ 100 CLIENTES — LLEGÓ
              </div>
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
          <BigType frame={f} s={214} size={92} lines={[
            { t: 'El "casi"' },
            { t: 'mueve más' },
            { t: 'que el fracaso.', hl: true },
          ]} />
          <div style={{
            fontFamily: fonts.display, fontWeight: 400, fontSize: 38,
            color: '#9A9AB5', marginTop: 32,
            opacity: ip(f, 268, 292, 0, 1),
          }}>
            Mostrá la brecha. Es el motor más potente.
          </div>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};
