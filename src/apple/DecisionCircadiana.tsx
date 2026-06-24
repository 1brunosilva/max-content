/**
 * DecisionCircadiana — Circadian Decision Making / Time of Day Effect.
 * Shai Danziger (parole study) & otros: la calidad de las decisiones varía
 * sistemáticamente a lo largo del día — alta en la mañana, baja post-almuerzo,
 * ligera recuperación a última hora. El momento en que enviás tu propuesta
 * importa más de lo que creés.
 *
 * Lever: decision fatigue / circadian rhythm / timing. Paleta: dorado-naranja. C.
 */
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { Stage, SiriFrame, BigType, ip, fonts } from './kit';

export const DECISIONCIRCADIANA_DURATION = 290;

const GOLD = '#F59E0B';
const ORANGE = '#F97316';

const HOURS = [
  { label: '8AM', quality: 0.88, isGood: true },
  { label: '10AM', quality: 0.94, isGood: true },
  { label: '12PM', quality: 0.72, isGood: false },
  { label: '2PM', quality: 0.38, isGood: false },
  { label: '4PM', quality: 0.55, isGood: false },
  { label: '6PM', quality: 0.67, isGood: false },
];

export const DecisionCircadiana: React.FC = () => {
  const f = useCurrentFrame();

  const labelIn = ip(f, 8, 28, 0, 1) * (1 - ip(f, 200, 215, 0, 1));

  // Las barras entran de izquierda a derecha
  const barReveal = (i: number) => ip(f, 28 + i * 18, 55 + i * 18, 0, 1) * (1 - ip(f, 198, 214, 0, 1));

  // El glow aparece en las horas buenas
  const peakGlow = ip(f, 110, 148, 0, 1) * (1 - ip(f, 198, 214, 0, 1));

  // Indicador de "enviá aquí"
  const indicatorIn = ip(f, 148, 170, 0, 1) * (1 - ip(f, 198, 214, 0, 1));

  // La propuesta "enviada en el momento equivocado"
  const badTimeIn = ip(f, 58, 82, 0, 1) * (1 - ip(f, 148, 168, 0, 1));

  const pay = ip(f, 216, 256, 0, 1);

  const BAR_MAX_H = 300;

  return (
    <Stage
      bg="radial-gradient(130% 90% at 50% 44%, #120900 0%, #070500 80%)"
      hue={GOLD}
      seed={14}
    >
      <div style={{
        position: 'absolute', top: 252, left: 0, right: 0, textAlign: 'center',
        fontFamily: fonts.mono, fontSize: 30, letterSpacing: '0.18em',
        color: 'rgba(255,255,255,0.50)', opacity: labelIn, zIndex: 30,
      }}>
        ¿A QUÉ HORA ENVIÁS TU PROPUESTA?
      </div>

      <AbsoluteFill style={{ opacity: 1 - pay }}>

        {/* Título de eje */}
        <div style={{
          position: 'absolute', top: 345, left: 0, right: 0, textAlign: 'center',
          fontFamily: fonts.mono, fontSize: 24, color: 'rgba(255,255,255,0.28)', letterSpacing: '0.14em',
          opacity: ip(f, 30, 50, 0, 1) * (1 - ip(f, 198, 214, 0, 1)),
        }}>
          CALIDAD DE DECISIÓN DEL CLIENTE
        </div>

        {/* Barras del histograma */}
        <div style={{
          position: 'absolute', top: 380, left: 90, right: 130,
          display: 'flex', alignItems: 'flex-end', gap: 18, height: BAR_MAX_H + 90,
        }}>
          {HOURS.map((hour, i) => {
            const barH = hour.quality * BAR_MAX_H;
            const revealProgress = barReveal(i);
            const isHighlighted = hour.isGood && peakGlow > 0.2;

            return (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
                {/* Indicador "enviá aquí" */}
                {hour.isGood && indicatorIn > 0.1 && (
                  <div style={{
                    fontFamily: fonts.mono, fontSize: 20, color: GOLD,
                    marginBottom: 8, opacity: indicatorIn,
                    textShadow: `0 0 8px ${GOLD}88`,
                  }}>
                    ↓ IDEAL
                  </div>
                )}

                {/* Bar */}
                <div style={{ position: 'relative', width: '100%' }}>
                  {isHighlighted && (
                    <div style={{
                      position: 'absolute', bottom: 0, left: 0, right: 0,
                      height: barH * revealProgress,
                      borderRadius: '12px 12px 0 0',
                      background: `${GOLD}20`,
                      filter: 'blur(16px)',
                      opacity: peakGlow * 0.6,
                    }} />
                  )}
                  <div style={{
                    height: barH * revealProgress,
                    borderRadius: '12px 12px 0 0',
                    background: isHighlighted
                      ? `linear-gradient(180deg, ${GOLD}, ${ORANGE})`
                      : hour.quality < 0.5
                      ? 'rgba(239,68,68,0.30)'
                      : 'rgba(255,255,255,0.12)',
                    boxShadow: isHighlighted ? `0 0 24px ${GOLD}77` : 'none',
                    position: 'relative',
                  }} />
                </div>

                {/* Label porcentaje */}
                <div style={{
                  fontFamily: fonts.display, fontWeight: 800, fontSize: 26,
                  color: isHighlighted ? GOLD : 'rgba(255,255,255,0.35)',
                  marginTop: 8, opacity: revealProgress,
                }}>
                  {Math.round(hour.quality * 100)}%
                </div>

                {/* Label hora */}
                <div style={{
                  fontFamily: fonts.mono, fontSize: 24, color: 'rgba(255,255,255,0.40)',
                  marginTop: 4, opacity: revealProgress,
                }}>
                  {hour.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* Peor horario: indicador */}
        {badTimeIn > 0.1 && (
          <div style={{
            position: 'absolute', top: 812, left: 90, right: 130,
            opacity: badTimeIn,
            transform: `translateY(${(1 - badTimeIn) * 16}px)`,
          }}>
            <div style={{
              background: 'rgba(239,68,68,0.08)',
              border: '1px solid rgba(239,68,68,0.22)',
              borderRadius: 22, padding: '20px 36px',
              fontFamily: fonts.display, fontWeight: 600, fontSize: 36,
              color: 'rgba(239,68,68,0.7)', textAlign: 'center',
            }}>
              📤 Enviás la propuesta a las 2PM → 38% de chance de avanzar
            </div>
          </div>
        )}

        {/* Mejor horario: glow insight */}
        {indicatorIn > 0.5 && (
          <div style={{
            position: 'absolute', bottom: 440, left: 90, right: 130,
            textAlign: 'center',
            opacity: indicatorIn * (1 - ip(f, 198, 214, 0, 1)),
            transform: `translateY(${(1 - indicatorIn) * 16}px)`,
          }}>
            <div style={{
              display: 'inline-block',
              background: `${GOLD}12`, border: `1px solid ${GOLD}44`,
              borderRadius: 50, padding: '14px 44px',
              fontFamily: fonts.display, fontWeight: 700, fontSize: 36, color: GOLD,
            }}>
              ✦ El mismo mensaje a las 10AM: 94% de chance
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
          <BigType frame={f} s={220} size={92} lines={[
            { t: 'La misma propuesta,' },
            { t: 'a distinta hora:' },
            { t: 'distinto resultado.', hl: true },
          ]} />
          <div style={{
            fontFamily: fonts.display, fontWeight: 400, fontSize: 38,
            color: '#9A9AB5', marginTop: 32,
            opacity: ip(f, 264, 286, 0, 1),
          }}>
            El timing no es suerte. Es estrategia.
          </div>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};
