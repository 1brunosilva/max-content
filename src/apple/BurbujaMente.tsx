/**
 * BurbujaMente — Filter Bubble / Echo Chamber.
 * El algoritmo te muestra solo lo que ya creés.
 * 5 cards de contenido idéntico en loop circular → la burbuja se cierra → payoff.
 * Lever: filter bubble / echo chamber / confirmation loop. Palette: azul midnight. Mode: midnight-línea. C.
 */
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { Stage, SiriGlow, SiriFrame, BigType, ip, fonts } from './kit';

const BLUE   = '#3B82F6';
const BLUE_L = '#93C5FD';
const INDIGO = '#6366F1';

const POSTS = [
  '"Bajar precios es la clave"',
  '"Bajar precios es la clave"',
  '"Bajar precios es la clave"',
  '"Bajar precios es la clave"',
  '"Bajar precios es la clave"',
];

export const BURBUJAMENTE_DURATION = 275;

export const BurbujaMente: React.FC = () => {
  const f = useCurrentFrame();

  const titleOp   = ip(f, 8, 26, 0, 1) * (1 - ip(f, 192, 208, 0, 1));
  const feedIn    = ip(f, 24, 52, 0, 1);
  const loopLabel = ip(f, 100, 118, 0, 1) * (1 - ip(f, 160, 178, 0, 1));
  const glowI     = ip(f, 148, 172, 0, 1);
  const bubbleIn  = ip(f, 158, 176, 0, 1) * (1 - ip(f, 192, 208, 0, 1));
  const pay       = ip(f, 200, 228, 0, 1);

  const scrollOffset = (f * 3.2) % (POSTS.length * 122);

  return (
    <Stage
      bg="radial-gradient(130% 90% at 50% 44%, #010310 0%, #000208 80%)"
      hue={BLUE}
      seed={2}
    >
      {/* Title */}
      <div style={{
        position: 'absolute', top: 240, left: 90, right: 130, textAlign: 'center',
        fontFamily: fonts.mono, fontSize: 19, letterSpacing: '0.16em',
        color: `${BLUE_L}66`, opacity: titleOp,
      }}>
        TU FEED · TU BURBUJA
      </div>

      <AbsoluteFill style={{ opacity: 1 - pay }}>
        <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ position: 'relative', width: 680, height: 760 }}>

            {/* Feed scroll — clipped window */}
            <div style={{
              position: 'absolute', left: '50%', top: 40, transform: 'translateX(-50%)',
              width: 560, height: 660,
              overflow: 'hidden',
              borderRadius: 28,
              border: `1.5px solid ${BLUE}44`,
              opacity: feedIn,
            }}>
              <div style={{ transform: `translateY(-${scrollOffset}px)`, display: 'flex', flexDirection: 'column', gap: 14, padding: '14px 16px' }}>
                {[...POSTS, ...POSTS, ...POSTS].map((p, i) => {
                  const isSelf = i % 5 === 2;
                  return (
                    <div key={i} style={{
                      borderRadius: 18,
                      background: isSelf ? `rgba(99,102,241,0.12)` : 'rgba(255,255,255,0.04)',
                      border: `1px solid ${isSelf ? INDIGO + '55' : 'rgba(255,255,255,0.08)'}`,
                      padding: '18px 22px',
                      display: 'flex', flexDirection: 'column', gap: 8,
                    }}>
                      <div style={{
                        fontFamily: fonts.mono, fontSize: 14, letterSpacing: '0.1em',
                        color: `${BLUE_L}55`,
                      }}>
                        @experto_{(i % 5) + 1} · hace {i % 3 + 1}h
                      </div>
                      <div style={{
                        fontFamily: fonts.display, fontWeight: 600, fontSize: 26,
                        color: `${BLUE_L}CC`, letterSpacing: '-0.015em',
                      }}>{p}</div>
                    </div>
                  );
                })}
              </div>
              {/* Loop indicator overlay */}
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                height: 90, background: 'linear-gradient(transparent, rgba(0,2,8,0.96))',
              }} />
            </div>

            {/* Glow around feed */}
            {glowI > 0.05 ? (
              <div style={{ position: 'absolute', left: '50%', top: 40, transform: 'translateX(-50%)', width: 560, height: 660 }}>
                <SiriGlow frame={f} intensity={glowI * 0.45} radius={28} />
              </div>
            ) : null}

            {/* Loop label */}
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0, textAlign: 'center',
              fontFamily: fonts.display, fontWeight: 700, fontSize: 36,
              color: BLUE_L, opacity: loopLabel,
              textShadow: `0 0 22px ${BLUE}99`,
              letterSpacing: '-0.02em',
            }}>
              ↺ Siempre lo mismo
            </div>

            {/* Bubble closing */}
            {bubbleIn > 0 ? (
              <div style={{
                position: 'absolute', left: '50%', top: '50%',
                transform: 'translate(-50%,-50%)',
                width: 620 + bubbleIn * 30, height: 700 + bubbleIn * 30,
                borderRadius: '50%',
                border: `2px solid ${BLUE}${Math.round(bubbleIn * 160).toString(16).padStart(2,'0')}`,
                boxShadow: `0 0 ${bubbleIn * 48}px ${BLUE}44`,
                opacity: bubbleIn * 0.6,
                zIndex: 60,
              }} />
            ) : null}
          </div>
        </AbsoluteFill>
      </AbsoluteFill>

      {/* Payoff */}
      <AbsoluteFill style={{
        alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', padding: '0 96px',
        opacity: pay, zIndex: 200,
      }}>
        <SiriFrame frame={f} intensity={pay} />
        <div style={{ transform: `translateY(${(1 - pay) * 28}px)` }}>
          <BigType frame={f} s={200} size={88} lines={[
            { t: 'Tu cliente' },
            { t: 'vive en', hl: false },
            { t: 'su burbuja.', hl: true },
          ]} />
          <div style={{
            fontFamily: fonts.display, fontSize: 28,
            color: `${BLUE_L}66`, marginTop: 28,
            opacity: ip(f, 240, 260, 0, 1),
          }}>
            Rompela con algo que no esperaba.
          </div>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};
