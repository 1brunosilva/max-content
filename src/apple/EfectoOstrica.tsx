/**
 * EfectoOstrica — Ostrich Effect. Cards de métricas críticas (clientes perdidos,
 * tasa de abandono, tiempo de respuesta) flotan visibles al principio. El dueño
 * "las ignora": se oscurecen progresivamente. Hasta que UN número enorme aparece
 * en el centro — ineludible — y ya no se puede ignorar.
 *
 * Lever: ostrich effect (ignorar información negativa hasta que es tarde). Paleta: índigo-ámbar. V.
 */
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { Stage, SiriFrame, BigType, ip, fonts } from './kit';

export const EFECTOOSTRICA_DURATION = 315;

const AMBER = '#F59E0B';
const AMBER_L = '#FCD34D';
const INDIGO = '#6366F1';
const RED = '#EF4444';

const METRICS = [
  { label: 'Clientes perdidos este mes', value: '−12', warn: true },
  { label: 'Tasa de abandono', value: '34%', warn: true },
  { label: 'Tiempo de respuesta', value: '6 hs', warn: false },
  { label: 'Reseñas sin responder', value: '8', warn: true },
  { label: 'Mensajes sin leer', value: '47', warn: false },
];

export const EfectoOstrica: React.FC = () => {
  const f = useCurrentFrame();

  const labelOp = ip(f, 8, 28, 0, 1) * (1 - ip(f, 238, 255, 0, 1));

  // Métricas aparecen
  const metricsIn = ip(f, 18, 65, 0, 1);
  // Se oscurecen (ignoradas)
  const ignoreP = ip(f, 80, 152, 0, 1);

  // Número bomba aparece en el centro
  const bombIn = ip(f, 160, 196, 0, 1);
  const bombPulse = 0.92 + 0.08 * Math.sin(f * 0.22);

  // Label revelación
  const revealLabel = ip(f, 198, 220, 0, 1) * (1 - ip(f, 238, 252, 0, 1));

  const pay = ip(f, 245, 282, 0, 1);

  return (
    <Stage
      bg="radial-gradient(130% 92% at 50% 44%, #080818 0%, #030307 80%)"
      hue={INDIGO}
      seed={11}
    >
      {/* Label */}
      <div style={{
        position: 'absolute', top: 252, left: 0, right: 0, textAlign: 'center',
        fontFamily: fonts.mono, fontSize: 32, letterSpacing: '0.16em',
        color: 'rgba(255,255,255,0.56)', opacity: labelOp, zIndex: 30,
      }}>
        LAS MÉTRICAS QUE PREFERÍS NO VER
      </div>

      <AbsoluteFill style={{ opacity: 1 - pay }}>
        {/* GRID DE MÉTRICAS */}
        <div style={{
          position: 'absolute', top: 330, left: 90, right: 130,
          display: 'flex', flexDirection: 'column', gap: 20,
          opacity: metricsIn,
        }}>
          {METRICS.map((m, i) => {
            const mIn = ip(f, 22 + i * 9, 46 + i * 9, 0, 1);
            const dimmed = ignoreP;
            return (
              <div key={i} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                background: `rgba(255,255,255,${0.04 * (1 - dimmed * 0.7)})`,
                border: `1px solid rgba(255,255,255,${0.10 * (1 - dimmed * 0.8)})`,
                borderRadius: 20,
                padding: '22px 32px',
                opacity: mIn * (1 - dimmed * 0.82),
                transform: `translateX(${(1 - mIn) * -18}px)`,
              }}>
                <div style={{
                  fontFamily: fonts.display, fontWeight: 500, fontSize: 36,
                  color: `rgba(255,255,255,${0.72 - dimmed * 0.5})`,
                }}>
                  {m.label}
                </div>
                <div style={{
                  fontFamily: fonts.display, fontWeight: 800, fontSize: 44,
                  color: m.warn ? `rgba(239,68,68,${0.9 - dimmed * 0.7})` : `rgba(245,158,11,${0.9 - dimmed * 0.7})`,
                  textShadow: dimmed < 0.5 && m.warn ? `0 0 20px ${RED}66` : 'none',
                }}>
                  {m.value}
                </div>
              </div>
            );
          })}
        </div>

        {/* NÚMERO BOMBA — lo que ya no se puede ignorar */}
        <div style={{
          position: 'absolute', top: 820, left: 0, right: 0,
          textAlign: 'center',
          opacity: bombIn,
          transform: `scale(${0.7 + bombIn * 0.3 * bombPulse})`,
        }}>
          <div style={{
            fontFamily: fonts.display, fontWeight: 900, fontSize: 180,
            color: RED,
            textShadow: `0 0 60px ${RED}88, 0 0 120px ${RED}44`,
            lineHeight: 1,
          }}>
            −$47k
          </div>
          <div style={{
            fontFamily: fonts.mono, fontSize: 32, color: `${AMBER_L}AA`,
            letterSpacing: '0.12em', marginTop: 8,
          }}>
            INGRESOS PERDIDOS ESTE AÑO
          </div>
        </div>

        {/* Label revelación */}
        <div style={{
          position: 'absolute', bottom: 445, left: 0, right: 0, textAlign: 'center',
          opacity: revealLabel,
        }}>
          <div style={{
            fontFamily: fonts.display, fontWeight: 600, fontSize: 40,
            color: AMBER_L, textShadow: `0 0 24px ${AMBER}88`,
          }}>
            Esconder la cabeza no apaga el fuego.
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
          <BigType frame={f} s={245} size={90} lines={[
            { t: 'Lo que no medís,' },
            { t: 'no lo podés mejorar.' },
            { t: 'Y lo que ignorás', hl: false },
            { t: 'te alcanza.', hl: true },
          ]} />
          <div style={{
            fontFamily: fonts.display, fontWeight: 400, fontSize: 38, color: '#9A9AB5',
            marginTop: 30, opacity: ip(f, 292, 308, 0, 1),
          }}>
            Los datos no son el problema. Ignorarlos, sí.
          </div>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};
