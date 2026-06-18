/**
 * AutopilotoScroll — Inercia cognitiva / Piloto automático en el feed.
 * El feed vertical scrollea solo — cards genéricas pasan sin registrarse.
 * Una sola rompe el ritmo y el scroll se congela. El espectador experimenta
 * el efecto antes de poder procesarlo conscientemente.
 * Lever: cognitive autopilot / pattern interrupt. Palette: ámbar. Mode: glassy. C.
 */
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { Stage, Glass, SiriGlow, SiriFrame, BigType, ip, fonts } from './kit';

const AMBER = '#F59E0B';

const FEED_CARDS = [
  { text: 'Tips para tu negocio #47', sub: 'Contenido digital' },
  { text: '¿Cómo mejorar tus ventas?', sub: 'Marketing' },
  { text: 'Estrategias de crecimiento', sub: 'Emprendimiento' },
  { text: 'Tu cerebro va en piloto.', sub: '← Esto rompió el patrón', breaker: true },
  { text: 'Guía de productividad 2026', sub: 'Herramientas' },
  { text: 'Contenido digital efectivo', sub: 'Diseño' },
];

const BREAK_IDX = 3;
const CARD_H = 118;
const CARD_GAP = 16;
const CARD_STEP = CARD_H + CARD_GAP;
const CONTAINER_W = 1080 - 90 - 130; // 860

// Break card should be centered at screen midpoint (960px) when frozen
// Card top at center: 960 - CARD_H/2 = 901
// Container starts at Y=startY, break card is at: startY + BREAK_IDX * CARD_STEP
// Freeze Y: 901 - BREAK_IDX * CARD_STEP = 901 - 3*134 = 901 - 402 = 499
const START_Y = 800;
const END_Y   = 901 - BREAK_IDX * CARD_STEP;

export const AUTOPILOTOSCROLL_DURATION = 260;

export const AutopilotoScroll: React.FC = () => {
  const f = useCurrentFrame();

  const scrollY = ip(f, 4, 90, START_Y, END_Y); // smooth scroll up
  const glowI = ip(f, 98, 130, 0, 1);
  const otherDim = ip(f, 102, 130, 0, 1);
  const pay = ip(f, 170, 200, 0, 1);
  const labelOp = ip(f, 4, 22, 0, 1) * ip(f, 80, 96, 1, 0);

  return (
    <Stage bg="radial-gradient(115% 88% at 50% 40%, #1A1004 0%, #080600 80%)" hue={AMBER} seed={8}>
      <div style={{
        position: 'absolute', top: 130, left: 0, right: 0, textAlign: 'center',
        fontFamily: fonts.mono, fontSize: 22, letterSpacing: '0.18em',
        color: 'rgba(255,255,255,0.65)', opacity: labelOp, zIndex: 30,
      }}>
        TU FEED · HOY
      </div>

      <AbsoluteFill style={{ overflow: 'hidden', opacity: 1 - pay }}>
        <div style={{
          position: 'absolute', left: 90,
          width: CONTAINER_W,
          transform: `translateY(${scrollY}px)`,
        }}>
          {FEED_CARDS.map((card, i) => {
            const isBreak = i === BREAK_IDX;
            const dimOp = isBreak ? 1 : 1 - otherDim * 0.82;
            const zed = isBreak ? glowI * 58 : 0;
            const sc = isBreak ? 1 + glowI * 0.05 : 1;

            return (
              <div key={i} style={{
                marginBottom: CARD_GAP,
                opacity: dimOp,
                transform: `translateZ(${zed}px) scale(${sc})`,
                position: 'relative',
              }}>
                {isBreak && glowI > 0.05 ? <SiriGlow frame={f} intensity={glowI} radius={24} /> : null}
                <Glass
                  w={CONTAINER_W}
                  h={CARD_H}
                  selected={isBreak && glowI > 0.3}
                  pad={28}
                  style={{
                    border: `1px solid ${isBreak ? AMBER + '66' : 'rgba(255,255,255,0.06)'}`,
                    background: isBreak ? 'rgba(245,158,11,0.09)' : undefined,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
                    <div style={{
                      width: 10, height: 10, borderRadius: '50%', flexShrink: 0,
                      background: isBreak ? AMBER : '#3A3A52',
                      boxShadow: isBreak ? `0 0 12px ${AMBER}AA` : 'none',
                    }} />
                    <div style={{ flex: 1 }}>
                      <div style={{
                        fontFamily: fonts.display,
                        fontWeight: isBreak ? 700 : 500,
                        fontSize: isBreak ? 36 : 26,
                        color: isBreak ? '#FFF0CC' : '#5A5A72',
                        letterSpacing: '-0.02em',
                      }}>
                        {card.text}
                      </div>
                      <div style={{ fontFamily: fonts.mono, fontSize: 13, color: isBreak ? AMBER + 'AA' : '#2A2A42', letterSpacing: '0.08em', marginTop: 4 }}>
                        {card.sub}
                      </div>
                    </div>
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
          <BigType frame={f} s={170} size={88} lines={[
            { t: 'Tu cliente' },
            { t: 'va en piloto.' },
            { t: 'Diseñá', hl: false },
            { t: 'el quiebre.', hl: true },
          ]} />
          <div style={{ fontFamily: fonts.display, fontSize: 32, color: '#8A8AAA', marginTop: 28, opacity: ip(f, 210, 232, 0, 1) }}>
            El patrón que rompe el ritmo es el único que existe.
          </div>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};
