/**
 * EspejoMensaje — Mirroring / linguistic matching effect. Un cliente escribe con sus
 * propias palabras. Dos respuestas: una con tu jerga, otra que refleja exactamente
 * las palabras del cliente (espejo). La respuesta-espejo genera glow y confianza.
 * El cerebro reconoce SUS palabras y siente que lo entendieron.
 *
 * Lever: mirroring / linguistic matching / rapport psychology. Paleta: rosa-violeta. C.
 */
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { Stage, Glass, SiriGlow, SiriFrame, BigType, ip, fonts } from './kit';

export const ESPEJOMENSAJE_DURATION = 300;

const PINK = '#EC4899';
const PINK_L = '#F472B6';

export const EspejoMensaje: React.FC = () => {
  const f = useCurrentFrame();

  const labelOp = ip(f, 8, 28, 0, 1) * (1 - ip(f, 228, 246, 0, 1));

  // Mensaje del cliente aparece
  const clientMsgIn = ip(f, 10, 46, 0, 1);

  // Respuesta 1 (jerga técnica) aparece
  const resp1In = ip(f, 58, 84, 0, 1);
  const resp1Dim = ip(f, 106, 138, 0, 1);

  // Respuesta 2 (espejo del cliente) aparece
  const resp2In = ip(f, 118, 148, 0, 1);
  const glowI = ip(f, 142, 172, 0, 1);

  // Trust indicator
  const trustIn = ip(f, 165, 192, 0, 1);

  const pay = ip(f, 228, 260, 0, 1);

  return (
    <Stage
      bg="radial-gradient(130% 92% at 50% 44%, #180D17 0%, #080508 80%)"
      hue={PINK}
      seed={17}
    >
      {/* Label */}
      <div style={{
        position: 'absolute', top: 250, left: 0, right: 0, textAlign: 'center',
        fontFamily: fonts.mono, fontSize: 36, letterSpacing: '0.18em',
        color: 'rgba(255,255,255,0.66)', opacity: labelOp, zIndex: 30,
      }}>
        UN CLIENTE ESCRIBE…
      </div>

      <AbsoluteFill style={{ opacity: 1 - pay }}>
        {/* MENSAJE DEL CLIENTE */}
        <div style={{
          position: 'absolute', top: 340, left: 90, right: 200,
          opacity: clientMsgIn,
          transform: `translateX(${(1 - clientMsgIn) * -30}px)`,
        }}>
          <div style={{
            background: 'rgba(255,255,255,0.07)',
            border: '1px solid rgba(255,255,255,0.14)',
            borderRadius: '24px 24px 24px 4px',
            padding: '28px 36px',
          }}>
            <div style={{ fontFamily: fonts.mono, fontSize: 22, color: 'rgba(255,255,255,0.44)', letterSpacing: '0.06em', marginBottom: 12 }}>
              CLIENTE · hace 2 minutos
            </div>
            <div style={{
              fontFamily: fonts.display, fontWeight: 500, fontSize: 46,
              color: '#F4F4FA', lineHeight: 1.4, letterSpacing: '-0.01em',
            }}>
              "Necesito que me ayuden a que <span style={{ color: PINK_L, fontWeight: 700 }}>no se me escapen más ventas</span> cuando no estoy en el local."
            </div>
          </div>
        </div>

        {/* RESPUESTA 1: Jerga técnica */}
        <div style={{
          position: 'absolute', top: 620, left: 180, right: 90,
          opacity: resp1In * (1 - resp1Dim * 0.82),
          transform: `translateX(${(1 - resp1In) * 30}px)`,
        }}>
          <Glass w={790} selected={false} pad={32} style={{ borderRadius: '24px 24px 4px 24px' }}>
            <div style={{ fontFamily: fonts.mono, fontSize: 20, color: 'rgba(255,255,255,0.36)', marginBottom: 12 }}>
              RESPUESTA A
            </div>
            <div style={{
              fontFamily: fonts.display, fontWeight: 500, fontSize: 40,
              color: 'rgba(255,255,255,0.52)', lineHeight: 1.4,
            }}>
              "Implementamos automatización de flujos de atención multicanal con respuesta en tiempo real para maximizar la conversión."
            </div>
          </Glass>
        </div>

        {/* RESPUESTA 2: Espejo del cliente */}
        <div style={{
          position: 'absolute', top: 862, left: 180, right: 90,
          opacity: resp2In,
          transform: `translateX(${(1 - resp2In) * 30}px)`,
        }}>
          <div style={{ position: 'relative' }}>
            <SiriGlow frame={f} intensity={glowI * 0.85} radius={26} />
            <div style={{
              width: 790,
              background: glowI > 0.3 ? 'linear-gradient(165deg,#1F0D1A 0%,#0D060E 100%)' : 'rgba(255,255,255,0.06)',
              border: `1px solid ${glowI > 0.3 ? PINK + '77' : 'rgba(255,255,255,0.12)'}`,
              borderRadius: '24px 24px 4px 24px',
              padding: '32px 36px',
              boxShadow: glowI > 0.3 ? `0 30px 80px -24px ${PINK}44` : 'none',
            }}>
              <div style={{ fontFamily: fonts.mono, fontSize: 20, color: `${PINK}CC`, marginBottom: 12 }}>
                RESPUESTA B · ESPEJO
              </div>
              <div style={{
                fontFamily: fonts.display, fontWeight: 500, fontSize: 40,
                color: '#F4F4FA', lineHeight: 1.4,
              }}>
                "Entendemos exactamente. Para que <span style={{ color: PINK_L, fontWeight: 700 }}>no se te escapen más ventas</span> cuando no estás en el local, hacemos esto…"
              </div>
            </div>
          </div>
        </div>

        {/* Trust indicator */}
        <div style={{
          position: 'absolute', bottom: 430, right: 130,
          opacity: trustIn,
          transform: `translateY(${(1 - trustIn) * 18}px)`,
        }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 16,
            background: `${PINK}18`, borderRadius: 50,
            border: `1px solid ${PINK}44`, padding: '16px 36px',
          }}>
            <div style={{ width: 16, height: 16, borderRadius: '50%', background: PINK_L }} />
            <div style={{ fontFamily: fonts.display, fontWeight: 600, fontSize: 34, color: PINK_L }}>
              "Sí, exactamente eso necesito"
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
          <BigType frame={f} s={228} size={92} lines={[
            { t: 'Cuando el cliente' },
            { t: 'escucha sus propias' },
            { t: 'palabras,', hl: false },
            { t: 'siente que lo entienden.', hl: true },
          ]} />
          <div style={{
            fontFamily: fonts.display, fontWeight: 400, fontSize: 40, color: '#9A9AB5',
            marginTop: 32, opacity: ip(f, 268, 288, 0, 1),
          }}>
            Reflejá su lenguaje. La confianza llega sola.
          </div>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};
