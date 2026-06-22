/**
 * CargaCognitiva — Cognitive Load / Friction Cost. Un cliente intenta comprar:
 * cada paso extra agrega un "peso" visual (capas que se apilan sobre él).
 * En cierto punto, el peso aplasta la decisión y el cliente abandona.
 * En el carril paralelo (proceso simplificado), el cliente llega al final sin fricción.
 *
 * Lever: cognitive load / friction reduction in sales funnels. Paleta: índigo-crema. V.
 */
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { Stage, SiriFrame, BigType, ip, fonts } from './kit';

export const CARGACOGNITIVA_DURATION = 316;

const INDIGO = '#6366F1';
const RED = '#EF4444';
const GREEN = '#10B981';

const STEPS_A = [
  'Llenás un formulario largo',
  'Esperás confirmación por mail',
  'Mandás comprobante por WhatsApp',
  'Esperás 24h para respuesta',
  'Te piden más datos',
  'Completás otro formulario…',
];

const STEPS_B = [
  'Elegís lo que necesitás',
  'Un click para confirmar',
  '✓ Listo',
];

export const CargaCognitiva: React.FC = () => {
  const f = useCurrentFrame();

  const labelOp = ip(f, 8, 28, 0, 1) * (1 - ip(f, 238, 256, 0, 1));

  // CARRIL A: pasos que se apilan
  const stepsAIn = (i: number) => ip(f, 20 + i * 20, 44 + i * 20, 0, 1);
  const abandonA = ip(f, 148, 175, 0, 1); // cliente abandona
  const collapseA = ip(f, 175, 205, 0, 1); // carril A colapsa

  // CARRIL B: proceso limpio
  const stepsBIn = (i: number) => ip(f, 115 + i * 22, 138 + i * 22, 0, 1);
  const succeedB = ip(f, 168, 195, 0, 1);

  const pay = ip(f, 244, 280, 0, 1);

  // Peso acumulado sobre el ícono de cliente A
  const weightA = (i: number) => stepsAIn(i) * (1 - collapseA);

  return (
    <Stage
      bg="radial-gradient(130% 92% at 50% 44%, #080816 0%, #030308 80%)"
      hue={INDIGO}
      seed={13}
    >
      {/* Label */}
      <div style={{
        position: 'absolute', top: 252, left: 0, right: 0, textAlign: 'center',
        fontFamily: fonts.mono, fontSize: 33, letterSpacing: '0.16em',
        color: 'rgba(255,255,255,0.56)', opacity: labelOp, zIndex: 30,
      }}>
        CADA PASO EXTRA CUESTA UNA VENTA
      </div>

      <AbsoluteFill style={{ opacity: 1 - pay }}>
        {/* ── CARRIL A (proceso complejo) ── */}
        <div style={{
          position: 'absolute', top: 336, left: 90,
          width: 430,
        }}>
          <div style={{
            fontFamily: fonts.mono, fontSize: 26, color: `${RED}AA`,
            letterSpacing: '0.10em', marginBottom: 16,
          }}>
            SIN SISTEMA
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {STEPS_A.map((step, i) => {
              const sIn = stepsAIn(i);
              const w = weightA(i);
              return (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: 14,
                  background: `rgba(239,68,68,${0.06 * w})`,
                  border: `1px solid rgba(239,68,68,${0.30 * w})`,
                  borderRadius: 18, padding: '16px 22px',
                  opacity: sIn * (1 - collapseA * 0.88),
                  transform: `translateX(${(1 - sIn) * -18}px) translateY(${abandonA * i * 3}px)`,
                }}>
                  <div style={{
                    width: 10, height: 10, borderRadius: '50%', flexShrink: 0,
                    background: RED, opacity: w,
                  }} />
                  <div style={{
                    fontFamily: fonts.display, fontWeight: 500, fontSize: 32,
                    color: `rgba(255,255,255,${0.65 * w + 0.1})`,
                  }}>
                    {step}
                  </div>
                </div>
              );
            })}
          </div>
          {/* Cliente abandona */}
          <div style={{
            marginTop: 22,
            opacity: abandonA * (1 - collapseA),
            transform: `translateY(${(1 - abandonA) * 16}px)`,
          }}>
            <div style={{
              fontFamily: fonts.display, fontWeight: 700, fontSize: 38,
              color: RED, textShadow: `0 0 20px ${RED}88`,
            }}>
              ✗ El cliente abandonó
            </div>
          </div>
        </div>

        {/* Divisor */}
        <div style={{
          position: 'absolute', top: 340, left: 545, width: 2,
          height: 960, background: 'rgba(255,255,255,0.08)', borderRadius: 1,
          opacity: ip(f, 22, 48, 0, 1),
        }} />

        {/* ── CARRIL B (proceso limpio) ── */}
        <div style={{
          position: 'absolute', top: 336, left: 575,
          width: 395,
        }}>
          <div style={{
            fontFamily: fonts.mono, fontSize: 26, color: `${GREEN}AA`,
            letterSpacing: '0.10em', marginBottom: 16,
          }}>
            CON SISTEMA
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
            {STEPS_B.map((step, i) => {
              const sIn = stepsBIn(i);
              const isLast = i === STEPS_B.length - 1;
              return (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: 16,
                  background: isLast && succeedB > 0.5
                    ? `rgba(16,185,129,0.14)`
                    : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${isLast && succeedB > 0.5 ? GREEN + '66' : 'rgba(255,255,255,0.10)'}`,
                  borderRadius: 20, padding: '22px 24px',
                  opacity: sIn,
                  transform: `translateX(${(1 - sIn) * 18}px)`,
                  boxShadow: isLast && succeedB > 0.5 ? `0 0 30px ${GREEN}22` : 'none',
                }}>
                  <div style={{
                    width: 10, height: 10, borderRadius: '50%', flexShrink: 0,
                    background: GREEN, opacity: sIn,
                  }} />
                  <div style={{
                    fontFamily: fonts.display, fontWeight: 600, fontSize: 34,
                    color: isLast && succeedB > 0.5 ? GREEN : 'rgba(255,255,255,0.72)',
                    textShadow: isLast && succeedB > 0.5 ? `0 0 16px ${GREEN}88` : 'none',
                  }}>
                    {step}
                  </div>
                </div>
              );
            })}
          </div>
          {/* Éxito */}
          <div style={{
            marginTop: 28,
            opacity: succeedB,
            transform: `translateY(${(1 - succeedB) * 16}px)`,
          }}>
            <div style={{
              fontFamily: fonts.display, fontWeight: 700, fontSize: 38,
              color: GREEN, textShadow: `0 0 20px ${GREEN}88`,
            }}>
              ✓ Compró. Y volvió.
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
          <BigType frame={f} s={244} size={92} lines={[
            { t: 'La fricción es invisible.' },
            { t: 'Pero el abandono,', hl: false },
            { t: 'no.', hl: true },
          ]} />
          <div style={{
            fontFamily: fonts.display, fontWeight: 400, fontSize: 40, color: '#9A9AB5',
            marginTop: 32, opacity: ip(f, 286, 308, 0, 1),
          }}>
            Cada paso extra en tu proceso es una venta que perdiste.
          </div>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};
