/**
 * DotDotDot — Anticipación + violación de expectativa.
 * Un chat: el cliente pregunta. Los "..." pulsando prometen respuesta.
 * De repente desaparecen. Silencio. El cliente se va.
 * Lever: anticipation / expectation violation. Palette: ámbar/naranja. Mode: real/raw. C.
 */
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { Stage, SiriFrame, BigType, ip, fonts } from './kit';

const AMBER = '#F59E0B';

export const DOTDOTDOT_DURATION = 280;

export const DotDotDot: React.FC = () => {
  const f = useCurrentFrame();

  const clientMsgIn  = ip(f,  15,  38, 0, 1);
  const bubblesIn    = ip(f,  55,  72, 0, 1);
  const bubblesOut   = ip(f, 130, 138, 1, 0);
  const silenceOp    = ip(f, 145, 165, 0, 1) * ip(f, 182, 192, 1, 0);
  const clientMsg2In = ip(f, 185, 200, 0, 1);
  const clientMsg2Out= ip(f, 200, 210, 1, 0);
  const pay          = ip(f, 208, 235, 0, 1);

  // Dot pulse loop: each dot pulses with 18-frame offset
  const dotPhase = (f - 55) % 54;
  const dot1 = f >= 55 && f < 130 ? ip(dotPhase, 0, 9, 0.2, 1) * ip(dotPhase, 9, 18, 1, 0.2) + 0.2 : 0;
  const dot2 = f >= 55 && f < 130 ? ip(dotPhase, 18, 27, 0.2, 1) * ip(dotPhase, 27, 36, 1, 0.2) + 0.2 : 0;
  const dot3 = f >= 55 && f < 130 ? ip(dotPhase, 36, 45, 0.2, 1) * ip(dotPhase, 45, 54, 1, 0.2) + 0.2 : 0;
  const dotsVisible = bubblesIn * bubblesOut;

  return (
    <Stage
      bg="radial-gradient(120% 80% at 50% 50%, #100A00 0%, #040200 80%)"
      hue={AMBER}
      seed={9}
    >
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', opacity: 1 - pay }}>
        {/* Chat mock container */}
        <div style={{
          width: 720, display: 'flex', flexDirection: 'column', gap: 20,
          paddingTop: 60,
        }}>

          {/* Client question bubble (right aligned) */}
          <div style={{
            alignSelf: 'flex-end',
            opacity: clientMsgIn,
            transform: `translateY(${(1 - clientMsgIn) * 18}px)`,
            maxWidth: 480,
          }}>
            <div style={{
              background: 'rgba(245,158,11,0.18)',
              border: '1px solid rgba(245,158,11,0.32)',
              borderRadius: '22px 22px 4px 22px',
              padding: '20px 28px',
            }}>
              <div style={{
                fontFamily: fonts.display, fontSize: 32,
                color: 'rgba(255,220,140,0.92)', lineHeight: 1.3,
              }}>
                Me interesa, ¿podés enviarme más info?
              </div>
            </div>
            <div style={{
              fontFamily: fonts.mono, fontSize: 14, color: 'rgba(255,200,100,0.38)',
              textAlign: 'right', marginTop: 6, letterSpacing: '0.06em',
            }}>14:32 ✓✓</div>
          </div>

          {/* Typing indicator (left aligned) */}
          <div style={{
            alignSelf: 'flex-start',
            opacity: dotsVisible,
            transform: `translateY(${(1 - bubblesIn) * 18}px)`,
          }}>
            <div style={{
              background: 'rgba(255,255,255,0.07)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: '22px 22px 22px 4px',
              padding: '22px 34px',
              display: 'flex', gap: 10, alignItems: 'center',
            }}>
              {[dot1, dot2, dot3].map((d, i) => (
                <div key={i} style={{
                  width: 14, height: 14, borderRadius: '50%',
                  background: AMBER, opacity: d,
                  boxShadow: `0 0 10px ${AMBER}66`,
                }} />
              ))}
            </div>
          </div>

          {/* Silence label */}
          <div style={{
            textAlign: 'center', opacity: silenceOp,
          }}>
            <div style={{
              fontFamily: fonts.mono, fontSize: 17, letterSpacing: '0.14em',
              color: 'rgba(255,180,80,0.45)',
            }}>— 2 horas después —</div>
          </div>

          {/* Client second message (right aligned) */}
          <div style={{
            alignSelf: 'flex-end',
            opacity: clientMsg2In * clientMsg2Out,
            transform: `translateY(${(1 - clientMsg2In) * 18}px)`,
            maxWidth: 380,
          }}>
            <div style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.10)',
              borderRadius: '22px 22px 4px 22px',
              padding: '18px 26px',
            }}>
              <div style={{
                fontFamily: fonts.display, fontSize: 30,
                color: 'rgba(255,220,140,0.55)', lineHeight: 1.3,
              }}>
                ¿Seguís ahí?
              </div>
            </div>
            <div style={{
              fontFamily: fonts.mono, fontSize: 14, color: 'rgba(255,200,100,0.28)',
              textAlign: 'right', marginTop: 6, letterSpacing: '0.06em',
            }}>16:41 ✓</div>
          </div>

        </div>
      </AbsoluteFill>

      {/* Payoff */}
      <AbsoluteFill style={{
        alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', padding: '0 96px',
        opacity: pay, zIndex: 200,
      }}>
        <SiriFrame frame={f} intensity={pay} />
        <div style={{ transform: `translateY(${(1 - pay) * 28}px)` }}>
          <BigType frame={f} s={208} size={88} lines={[
            { t: 'No respondiste' },
            { t: 'a tiempo.' },
            { t: 'Se fue.', hl: true },
          ]} />
          <div style={{
            fontFamily: fonts.display, fontSize: 30,
            color: `rgba(245,158,11,0.55)`, marginTop: 28,
            opacity: ip(f, 248, 264, 0, 1),
          }}>
            El silencio es una respuesta.
          </div>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};
