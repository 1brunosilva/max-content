/**
 * ContagioEmocional — Emotional Contagion. Dos posts aparecen lado a lado:
 * A (frío/informativo: "Respondemos en 24h") y B (cálido/emocional: una historia real).
 * Los indicadores de engagement (corazones, comentarios, shares) explotan en el B.
 * El espectador SIENTE la diferencia antes de que el payoff la nombre.
 *
 * Lever: emotional contagion / emotional resonance in marketing. Paleta: rosa-cálido. C.
 */
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { Stage, Glass, SiriGlow, SiriFrame, BigType, ip, fonts, countUp } from './kit';

export const CONTAGIOEMOCIONAL_DURATION = 305;

const PINK = '#EC4899';
const PINK_L = '#F472B6';
const WARM = '#F97316';

export const ContagioEmocional: React.FC = () => {
  const f = useCurrentFrame();

  const labelOp = ip(f, 8, 28, 0, 1) * (1 - ip(f, 228, 245, 0, 1));

  // Ambos posts entran
  const postAIn = ip(f, 18, 52, 0, 1);
  const postBIn = ip(f, 40, 78, 0, 1);

  // Engagement explota en B
  const engageA = ip(f, 85, 120, 0, 1);
  const engageB = ip(f, 95, 155, 0, 1);
  const glowB = ip(f, 115, 160, 0, 1);

  // A se dimea
  const dimA = ip(f, 115, 155, 0, 1);

  // Label revelación
  const revealIn = ip(f, 162, 188, 0, 1) * (1 - ip(f, 228, 243, 0, 1));

  const pay = ip(f, 235, 272, 0, 1);

  const likeCountB = countUp(f, 95, 155, 3847);
  const likeCountA = countUp(f, 85, 120, 12);
  const shareB = countUp(f, 105, 155, 284);
  const shareA = countUp(f, 85, 120, 2);

  return (
    <Stage
      bg="radial-gradient(130% 92% at 50% 44%, #160812 0%, #080408 80%)"
      hue={PINK}
      seed={15}
    >
      {/* Label */}
      <div style={{
        position: 'absolute', top: 252, left: 0, right: 0, textAlign: 'center',
        fontFamily: fonts.mono, fontSize: 34, letterSpacing: '0.16em',
        color: 'rgba(255,255,255,0.58)', opacity: labelOp, zIndex: 30,
      }}>
        MISMO NEGOCIO · DOS MENSAJES
      </div>

      <AbsoluteFill style={{ opacity: 1 - pay }}>
        {/* POST A — frío/informativo */}
        <div style={{
          position: 'absolute', top: 360, left: 90,
          width: 420,
          opacity: postAIn * (1 - dimA * 0.75),
          transform: `translateY(${(1 - postAIn) * 22}px)`,
        }}>
          <Glass w={420} selected={false} pad={32}>
            <div style={{ fontFamily: fonts.mono, fontSize: 22, color: 'rgba(255,255,255,0.32)', marginBottom: 10, letterSpacing: '0.08em' }}>
              POST A
            </div>
            <div style={{
              fontFamily: fonts.display, fontWeight: 600, fontSize: 36,
              color: 'rgba(255,255,255,0.72)', lineHeight: 1.4,
            }}>
              "Respondemos consultas en menos de 24 horas. Servicio profesional garantizado."
            </div>
            {/* Engagement A */}
            <div style={{
              display: 'flex', gap: 22, marginTop: 22,
              opacity: engageA,
            }}>
              <span style={{ fontFamily: fonts.mono, fontSize: 28, color: 'rgba(255,255,255,0.35)' }}>
                ♡ {likeCountA}
              </span>
              <span style={{ fontFamily: fonts.mono, fontSize: 28, color: 'rgba(255,255,255,0.35)' }}>
                ↗ {shareA}
              </span>
            </div>
          </Glass>
        </div>

        {/* POST B — cálido/emocional */}
        <div style={{
          position: 'absolute', top: 360, left: 540,
          width: 420,
          opacity: postBIn,
          transform: `translateY(${(1 - postBIn) * 22}px)`,
        }}>
          <div style={{ position: 'relative' }}>
            {glowB > 0.1 && <SiriGlow frame={f} intensity={glowB * 0.85} radius={26} />}
            <div style={{
              width: 420,
              background: glowB > 0.3 ? 'linear-gradient(165deg,#1A080F 0%,#0A0406 100%)' : 'rgba(255,255,255,0.05)',
              border: `1px solid ${glowB > 0.3 ? PINK + '77' : 'rgba(255,255,255,0.10)'}`,
              borderRadius: 34,
              padding: 32,
              boxShadow: glowB > 0.3 ? `0 40px 100px -24px ${PINK}55` : 'none',
            }}>
              <div style={{ fontFamily: fonts.mono, fontSize: 22, color: `${PINK}CC`, marginBottom: 10, letterSpacing: '0.08em' }}>
                POST B
              </div>
              <div style={{
                fontFamily: fonts.display, fontWeight: 600, fontSize: 36,
                color: '#F4F4FA', lineHeight: 1.4,
              }}>
                "Gracias a ustedes, mi negocio sigue abierto. No saben lo que significa para mí. ❤️"
              </div>
              {/* Engagement B — explota */}
              <div style={{
                display: 'flex', gap: 22, marginTop: 22,
                opacity: engageB,
              }}>
                <span style={{
                  fontFamily: fonts.mono, fontSize: 28, color: PINK_L,
                  textShadow: `0 0 16px ${PINK}88`,
                }}>
                  ♡ {likeCountB.toLocaleString('es')}
                </span>
                <span style={{ fontFamily: fonts.mono, fontSize: 28, color: WARM }}>
                  ↗ {shareB}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Corazones flotando en B */}
        {glowB > 0.4 && [0, 1, 2, 3].map((i) => {
          const heartF = ip(f, 118 + i * 12, 168 + i * 12, 0, 1);
          const heartX = 600 + (i % 2 === 0 ? 80 : 130) + i * 30;
          const heartY = 700 - heartF * 180;
          return (
            <div key={i} style={{
              position: 'absolute',
              left: heartX, top: heartY,
              opacity: heartF * (1 - heartF * 0.7),
              fontSize: 36 + i * 8,
              pointerEvents: 'none',
            }}>❤️</div>
          );
        })}

        {/* Label revelación */}
        <div style={{
          position: 'absolute', bottom: 442, left: 0, right: 0, textAlign: 'center',
          opacity: revealIn,
          transform: `translateY(${(1 - revealIn) * 16}px)`,
        }}>
          <div style={{
            fontFamily: fonts.display, fontWeight: 600, fontSize: 40,
            color: PINK_L, textShadow: `0 0 24px ${PINK}88`,
          }}>
            La emoción no se explica. Se contagia.
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
          <BigType frame={f} s={235} size={94} lines={[
            { t: 'El cliente no recuerda' },
            { t: 'lo que dijiste.' },
            { t: 'Recuerda cómo', hl: false },
            { t: 'lo hiciste sentir.', hl: true },
          ]} />
          <div style={{
            fontFamily: fonts.display, fontWeight: 400, fontSize: 38, color: '#9A9AB5',
            marginTop: 30, opacity: ip(f, 278, 298, 0, 1),
          }}>
            La información informa. La emoción vende.
          </div>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};
