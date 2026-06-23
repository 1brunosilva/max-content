/**
 * PuntoDeInflexion — Tipping Point / Threshold Effect. Las cargas se apilan
 * y aparentemente nada cambia... hasta que UNA MÁS lo rompe todo. El espectador
 * vive el momento exacto en que el sistema colapsa o se transforma.
 * "No cambian cuando saben. Cambian cuando cruzan el umbral."
 *
 * Lever: tipping point / threshold behavior / straw that broke. Paleta: cyan-verde. C.
 */
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { Stage, SiriGlow, SiriFrame, BigType, ip, fonts } from './kit';

export const PUNTODEINFLEXION_DURATION = 304;

const CYAN = '#4FE0FF';
const CYAN_L = '#A5F3FC';
const GREEN = '#10B981';

const WEIGHT_CARDS = [
  '1 cliente nuevo', '2 clientes nuevos', '3 — sin sistema',
  '4 — sin CRM', '5 — sin automatización',
  '6 — sin flujo claro', '7 — el caos empieza',
];

export const PuntoDeInflexion: React.FC = () => {
  const f = useCurrentFrame();

  const labelIn = ip(f, 8, 28, 0, 1) * (1 - ip(f, 218, 232, 0, 1));

  // Las cargas caen una a una
  const weightIn = (i: number) => ip(f, 20 + i * 16, 40 + i * 16, 0, 1);
  const weightMax = Math.floor(ip(f, 16, 128, 0, 7));

  // Nada cambia inicialmente — texto "sin cambios"
  const noChangeIn = ip(f, 42, 62, 0, 1) * (1 - ip(f, 115, 132, 0, 1));

  // La última carga (la gota que derrama)
  const lastCardIn = ip(f, 132, 162, 0, 1);
  const lastCardGlow = ip(f, 148, 175, 0, 1) * (1 - ip(f, 210, 225, 0, 1));

  // EL QUIEBRE — todo cambia
  const breakIn = ip(f, 162, 192, 0, 1);
  const breakGlow = ip(f, 168, 205, 0, 1) * (1 - ip(f, 210, 222, 0, 1));
  const breakPulse = 0.8 + 0.2 * Math.sin(f * 0.22);

  // Transformación — nuevo sistema
  const newSystemIn = ip(f, 185, 215, 0, 1) * (1 - ip(f, 210, 222, 0, 1));
  const newGlow = ip(f, 192, 218, 0, 1) * (1 - ip(f, 210, 220, 0, 1));

  const pay = ip(f, 226, 265, 0, 1);

  // Stack visual — las cargas bajan el "nivel" (representado como presión)
  const pressureLevel = ip(f, 24, 128, 0, 1);
  const scalePressure = 1 + pressureLevel * 0.08; // el stack se "comprime"

  return (
    <Stage
      bg="radial-gradient(130% 92% at 50% 44%, #040E10 0%, #020608 80%)"
      hue={CYAN}
      seed={10}
    >
      <div style={{
        position: 'absolute', top: 252, left: 0, right: 0, textAlign: 'center',
        fontFamily: fonts.mono, fontSize: 30, letterSpacing: '0.18em',
        color: 'rgba(255,255,255,0.50)', opacity: labelIn, zIndex: 30,
      }}>
        ¿CUÁNTO AGUANTA EL SISTEMA SIN CAMBIAR?
      </div>

      <AbsoluteFill style={{ opacity: 1 - pay }}>
        {/* Stack de cargas */}
        <div style={{
          position: 'absolute', top: 325, left: 90, right: 130,
        }}>
          {WEIGHT_CARDS.map((card, i) => {
            if (i >= weightMax && i < 6) return null;
            if (i === 6) return null; // la última se muestra por separado
            const wIn = weightIn(i);
            const isLate = i >= 4;
            return (
              <div key={i} style={{
                opacity: wIn * (1 - ip(f, 155 + i * 4, 175 + i * 4, 0, 1) * 0.5),
                transform: `translateY(${(1 - wIn) * -20}px) scaleY(${scalePressure})`,
                marginBottom: 10,
                background: isLate ? `rgba(239,68,68,0.08)` : 'rgba(255,255,255,0.04)',
                border: `1px solid ${isLate ? 'rgba(239,68,68,0.22)' : 'rgba(255,255,255,0.10)'}`,
                borderRadius: 18, padding: '16px 28px',
                fontFamily: fonts.display, fontWeight: 600, fontSize: 36,
                color: isLate ? 'rgba(255,100,100,0.7)' : `rgba(255,255,255,${0.68 - i * 0.04})`,
              }}>
                {card}
              </div>
            );
          })}
        </div>

        {/* Nada cambia todavía */}
        {noChangeIn > 0.01 && (
          <div style={{
            position: 'absolute', bottom: 640, left: 0, right: 0,
            textAlign: 'center', opacity: noChangeIn,
          }}>
            <div style={{
              fontFamily: fonts.display, fontWeight: 600, fontSize: 40,
              color: 'rgba(255,255,255,0.30)',
            }}>
              → El sistema aguanta... aguanta... aguanta...
            </div>
          </div>
        )}

        {/* LA ÚLTIMA GOTA */}
        {lastCardIn > 0.01 && (
          <div style={{
            position: 'absolute', top: 842, left: 90, right: 130,
            opacity: lastCardIn,
            transform: `translateY(${(1 - lastCardIn) * -24}px)`,
          }}>
            <div style={{
              background: `rgba(239,68,68,0.15)`,
              border: `2px solid rgba(239,68,68,0.55)`,
              borderRadius: 18, padding: '18px 28px',
              position: 'relative',
              fontFamily: fonts.display, fontWeight: 700, fontSize: 42,
              color: '#FCA5A5',
            }}>
              {lastCardGlow > 0.01 && (
                <div style={{
                  position: 'absolute', inset: -2, borderRadius: 18,
                  boxShadow: `0 0 30px rgba(239,68,68,${lastCardGlow * 0.7})`,
                }} />
              )}
              8 — "No puedo más sin un sistema"
            </div>
          </div>
        )}

        {/* EL QUIEBRE */}
        {breakIn > 0.01 && (
          <div style={{
            position: 'absolute', top: 945, left: 0, right: 0,
            textAlign: 'center',
            opacity: breakIn * breakPulse,
            transform: `scale(${0.72 + breakIn * 0.28})`,
          }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 22,
              background: `${CYAN}18`, border: `2px solid ${CYAN}66`,
              borderRadius: 50, padding: '20px 56px',
              position: 'relative',
            }}>
              {breakGlow > 0.01 && (
                <SiriGlow frame={f} intensity={breakGlow} radius={50} inset={-4} />
              )}
              <div style={{
                fontFamily: fonts.display, fontWeight: 900, fontSize: 52,
                color: CYAN_L,
                textShadow: `0 0 30px ${CYAN}AA`,
              }}>
                ⚡ TODO CAMBIA — PUNTO DE INFLEXIÓN
              </div>
            </div>
          </div>
        )}

        {/* Nuevo sistema */}
        {newSystemIn > 0.01 && (
          <div style={{
            position: 'absolute', bottom: 448, left: 90, right: 130,
            opacity: newSystemIn,
            transform: `translateY(${(1 - newSystemIn) * 22}px)`,
          }}>
            <div style={{
              background: `${GREEN}15`,
              border: `1px solid ${GREEN}44`,
              borderRadius: 20, padding: '20px 32px',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              position: 'relative',
            }}>
              {newGlow > 0.01 && (
                <SiriGlow frame={f} intensity={newGlow * 0.6} radius={20} inset={0} />
              )}
              <div style={{ fontFamily: fonts.display, fontWeight: 700, fontSize: 40, color: '#34D399' }}>
                Sistema nuevo implementado
              </div>
              <div style={{ fontFamily: fonts.display, fontWeight: 900, fontSize: 56, color: '#34D399', textShadow: `0 0 20px ${GREEN}88` }}>
                ✓
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
          <BigType frame={f} s={230} size={92} lines={[
            { t: 'No cambian' },
            { t: 'cuando saben.' },
            { t: 'Cambian cuando ya no pueden más.', hl: true },
          ]} />
          <div style={{
            fontFamily: fonts.display, fontWeight: 400, fontSize: 36,
            color: '#9A9AB5', marginTop: 32,
            opacity: ip(f, 278, 300, 0, 1),
          }}>
            Ayudá a tu cliente a llegar al umbral antes de que sea tarde.
          </div>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};
