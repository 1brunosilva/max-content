/**
 * CostoEspera — Temporal Discounting / Patience Cost. Un presupuesto enviado
 * tiene un "valor percibido" que BAJA con cada hora que pasa sin seguimiento.
 * La barra de valor desciende en tiempo real. A las 24h, el cliente ya "enfrió"
 * y el negocio vale menos. El espectador VE que el tiempo mata la venta.
 *
 * Lever: temporal discounting / decision cooling (distinto de EsperaQueDuele que
 * es la espera del cliente; acá es el VALOR del presupuesto que se deprecia). Paleta: ámbar-rojo. V.
 */
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { Stage, SiriFrame, BigType, ip, fonts } from './kit';

export const COSTOESPERA_DURATION = 314;

const AMBER = '#F59E0B';
const AMBER_L = '#FCD34D';
const RED = '#EF4444';
const GREEN = '#10B981';

const TIME_MARKS = [
  { label: '0 hs', value: 100, color: GREEN },
  { label: '2 hs', value: 80, color: '#22C55E' },
  { label: '6 hs', value: 55, color: AMBER },
  { label: '12 hs', value: 32, color: '#F97316' },
  { label: '24 hs', value: 12, color: RED },
  { label: '48 hs', value: 3, color: RED },
];

export const CostoEspera: React.FC = () => {
  const f = useCurrentFrame();

  const labelOp = ip(f, 8, 28, 0, 1) * (1 - ip(f, 235, 252, 0, 1));

  // El "presupuesto" aparece con valor alto
  const budgetIn = ip(f, 18, 52, 0, 1);

  // Cada barra de tiempo aparece en secuencia
  const barIn = (i: number) => ip(f, 30 + i * 22, 56 + i * 22, 0, 1);

  // La barra "roja" final pulsa
  const redPulse = 0.85 + 0.15 * Math.sin(f * 0.24);
  const lastMark = ip(f, 160, 185, 0, 1);

  // CTA sube
  const ctaIn = ip(f, 178, 205, 0, 1) * (1 - ip(f, 235, 250, 0, 1));

  const pay = ip(f, 242, 278, 0, 1);

  // Valor actual de la propuesta
  const currentValue = Math.round(ip(f, 35, 175, 100, 3));

  // Color dinámico del valor
  const valueColor = currentValue > 70 ? GREEN : currentValue > 35 ? AMBER : RED;

  const BAR_W = 760;
  const BAR_X = 90;

  return (
    <Stage
      bg="radial-gradient(130% 92% at 50% 44%, #140802 0%, #080402 80%)"
      hue={AMBER}
      seed={8}
    >
      {/* Label */}
      <div style={{
        position: 'absolute', top: 252, left: 0, right: 0, textAlign: 'center',
        fontFamily: fonts.mono, fontSize: 33, letterSpacing: '0.16em',
        color: 'rgba(255,255,255,0.56)', opacity: labelOp, zIndex: 30,
      }}>
        TU PROPUESTA TIENE FECHA DE VENCIMIENTO
      </div>

      <AbsoluteFill style={{ opacity: 1 - pay }}>
        {/* Card de presupuesto */}
        <div style={{
          position: 'absolute', top: 336, left: 90, right: 130,
          opacity: budgetIn,
          transform: `translateY(${(1 - budgetIn) * 22}px)`,
        }}>
          <div style={{
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: 28, padding: '28px 38px',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <div>
              <div style={{ fontFamily: fonts.mono, fontSize: 24, color: 'rgba(255,255,255,0.42)', letterSpacing: '0.08em', marginBottom: 8 }}>
                PROPUESTA ENVIADA
              </div>
              <div style={{ fontFamily: fonts.display, fontWeight: 700, fontSize: 46, color: '#F4F4FA' }}>
                "Proyecto completo · $15.000"
              </div>
            </div>
            {/* Valor percibido dinámico */}
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontFamily: fonts.mono, fontSize: 24, color: 'rgba(255,255,255,0.42)', letterSpacing: '0.08em', marginBottom: 4 }}>
                VALOR PERCIBIDO
              </div>
              <div style={{
                fontFamily: fonts.display, fontWeight: 900, fontSize: 68,
                color: valueColor,
                textShadow: `0 0 24px ${valueColor}88`,
                lineHeight: 1,
              }}>
                {currentValue}%
              </div>
            </div>
          </div>
        </div>

        {/* Barra de valor que cae */}
        <div style={{
          position: 'absolute', top: 530, left: BAR_X,
          opacity: budgetIn,
        }}>
          <div style={{ fontFamily: fonts.mono, fontSize: 24, color: 'rgba(255,255,255,0.38)', letterSpacing: '0.08em', marginBottom: 12 }}>
            INTERÉS DEL CLIENTE
          </div>
          <div style={{ width: BAR_W, height: 28, borderRadius: 14, background: 'rgba(255,255,255,0.06)', position: 'relative' }}>
            <div style={{
              position: 'absolute', top: 0, left: 0,
              width: BAR_W * (currentValue / 100),
              height: 28, borderRadius: 14,
              background: `linear-gradient(90deg, ${GREEN} 0%, ${valueColor} 100%)`,
              boxShadow: `0 0 16px ${valueColor}66`,
            }} />
          </div>
        </div>

        {/* Timeline de barras por hora */}
        <div style={{
          position: 'absolute', top: 620, left: BAR_X,
          display: 'flex', gap: 18, alignItems: 'flex-end',
        }}>
          {TIME_MARKS.map((mark, i) => {
            const bIn = barIn(i);
            const isLast = i === TIME_MARKS.length - 1;
            const barH = (mark.value / 100) * 340;
            return (
              <div key={i} style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
                opacity: bIn,
                transform: `translateY(${(1 - bIn) * 20}px)`,
              }}>
                <div style={{
                  fontFamily: fonts.display, fontWeight: 700, fontSize: 28,
                  color: mark.color,
                  textShadow: isLast && lastMark > 0.5 ? `0 0 16px ${RED}AA` : 'none',
                  opacity: isLast ? redPulse : 1,
                }}>
                  {mark.value}%
                </div>
                <div style={{
                  width: 96, height: barH, borderRadius: 8,
                  background: `linear-gradient(180deg, ${mark.color} 0%, ${mark.color}66 100%)`,
                  boxShadow: isLast && lastMark > 0.5 ? `0 0 20px ${RED}55` : 'none',
                  opacity: isLast ? redPulse : 1,
                }} />
                <div style={{ fontFamily: fonts.mono, fontSize: 24, color: mark.color, letterSpacing: '0.06em' }}>
                  {mark.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div style={{
          position: 'absolute', bottom: 444, left: 0, right: 0, textAlign: 'center',
          opacity: ctaIn,
          transform: `translateY(${(1 - ctaIn) * 16}px)`,
        }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 16,
            background: `${AMBER}1A`, borderRadius: 50,
            border: `1px solid ${AMBER_L}55`, padding: '16px 40px',
          }}>
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: AMBER_L }} />
            <div style={{
              fontFamily: fonts.display, fontWeight: 700, fontSize: 36,
              color: AMBER_L,
            }}>
              El seguimiento es la venta
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
          <BigType frame={f} s={242} size={92} lines={[
            { t: 'Tu propuesta pierde valor' },
            { t: 'con cada hora' },
            { t: 'sin seguimiento.', hl: true },
          ]} />
          <div style={{
            fontFamily: fonts.display, fontWeight: 400, fontSize: 38, color: '#9A9AB5',
            marginTop: 32, opacity: ip(f, 284, 308, 0, 1),
          }}>
            La venta no vive en el presupuesto. Vive en el seguimiento.
          </div>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};
