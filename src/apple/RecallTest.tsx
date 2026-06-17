/**
 * RecallTest — Primacy + Recency Effect.
 * 7 cards aparecen en secuencia, se apagan. Solo la primera y la última
 * vuelven a brillar con glow Siri. El espectador VIVE que su memoria no
 * guarda el medio — solo el comienzo y el final.
 * Lever: primacía/recencia. Palette: cyan. Mode: glassy-oscuro. C.
 */
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { Stage, Glass, SiriGlow, SiriFrame, BigType, ip, fonts } from './kit';

const WORDS = ['Tu marca', 'Propuesta', 'Beneficio', 'Precio', 'Garantía', 'Testimonios', 'Llamada'];
const CYAN = '#4FE0FF';
const CW = 680, CH = 110;

export const RECALLTEST_DURATION = 270;

export const RecallTest: React.FC = () => {
  const f = useCurrentFrame();

  // Fase 1: aparecen en secuencia (0-105)
  // Fase 2: se apagan todas (105-148)
  // Fase 3: primera y última reaparecen con glow (148-200)
  // Fase 4: payoff (200-270)

  const fadeAll = ip(f, 105, 145, 0, 1);     // desvanece todo
  const revealFirst = ip(f, 148, 170, 0, 1); // primera reaparece
  const revealLast = ip(f, 162, 184, 0, 1);  // última reaparece
  const pay = ip(f, 200, 228, 0, 1);
  const labelOp = ip(f, 4, 20, 0, 1) * (1 - ip(f, 100, 118, 0, 1));

  return (
    <Stage bg="radial-gradient(120% 90% at 48% 38%, #0D1A24 0%, #040810 78%)" hue={CYAN} seed={3}>
      <div style={{
        position: 'absolute', top: 130, left: 0, right: 0, textAlign: 'center',
        fontFamily: fonts.mono, fontSize: 22, letterSpacing: '0.18em',
        color: 'rgba(255,255,255,0.65)', opacity: labelOp, zIndex: 30,
      }}>
        ¿CUÁNTO RECUERDA TU CLIENTE?
      </div>

      {/* Cards en lista vertical centrada */}
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', opacity: 1 - pay }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, alignItems: 'center' }}>
          {WORDS.map((word, i) => {
            const appear = ip(f, 8 + i * 12, 24 + i * 12, 0, 1);
            const isFirst = i === 0;
            const isLast = i === WORDS.length - 1;
            const glowTarget = isFirst ? revealFirst : isLast ? revealLast : 0;
            const dimmed = fadeAll * (isFirst ? 0 : isLast ? 0 : 1); // primero y último NO se apagan
            const cardOp = appear * (1 - dimmed * 0.88);
            if (cardOp < 0.01) return null;

            return (
              <div key={i} style={{
                position: 'relative', opacity: cardOp,
                transform: `translateZ(${glowTarget * 60}px) scale(${1 + glowTarget * 0.06})`,
              }}>
                {(isFirst || isLast) ? <SiriGlow frame={f} intensity={glowTarget} radius={22} /> : null}
                <Glass w={CW} h={CH} selected={(isFirst || isLast) && glowTarget > 0.1} pad={28}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ fontFamily: fonts.display, fontWeight: 700, fontSize: 44, color: (isFirst || isLast) ? '#E8E8F8' : '#6A6A88', letterSpacing: '-0.02em' }}>{word}</div>
                    {(isFirst || isLast) && glowTarget > 0.1 ? (
                      <div style={{ fontFamily: fonts.mono, fontSize: 20, color: CYAN, letterSpacing: '0.12em', opacity: glowTarget }}>RECUERDA ✓</div>
                    ) : (
                      <div style={{ fontFamily: fonts.mono, fontSize: 20, color: 'rgba(255,255,255,0.18)', letterSpacing: '0.08em' }}>#{i + 1}</div>
                    )}
                  </div>
                </Glass>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>

      {/* Payoff */}
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 96, opacity: pay, zIndex: 200 }}>
        <SiriFrame frame={f} intensity={pay} />
        <div style={{ transform: `translateY(${(1 - pay) * 28}px)` }}>
          <BigType frame={f} s={200} size={88} lines={[
            { t: 'Recuerda el primero.' },
            { t: 'Recuerda el último.' },
            { t: 'Lo del medio', hl: false },
            { t: 'desaparece.', hl: true },
          ]} />
          <div style={{ fontFamily: fonts.display, fontSize: 32, color: '#8A8AAA', marginTop: 28, opacity: ip(f, 232, 254, 0, 1) }}>
            Tu primer y último segundo lo son todo.
          </div>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};
