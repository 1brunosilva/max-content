/**
 * MarcaHumana — Brand Anthropomorphism. Dos respuestas de WhatsApp aparecen:
 * A es robótica (fuente mono, fría, jerga técnica). B es cálida y personal
 * (nombre, emoji, lenguaje natural). La cálida genera glow masivo y una "conexión"
 * visual entre las dos burbujas. El espectador SIENTE la diferencia.
 *
 * Lever: brand anthropomorphism / personality-driven marketing. Paleta: rosa-violeta. C.
 */
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { Stage, Glass, SiriGlow, SiriFrame, BigType, ip, fonts } from './kit';

export const MARCAHUMANA_DURATION = 308;

const PINK = '#EC4899';
const PINK_L = '#F472B6';

export const MarcaHumana: React.FC = () => {
  const f = useCurrentFrame();

  const labelOp = ip(f, 8, 28, 0, 1) * (1 - ip(f, 230, 248, 0, 1));

  // Encabezado de chat
  const chatIn = ip(f, 16, 42, 0, 1);

  // Mensaje del cliente
  const clientIn = ip(f, 28, 58, 0, 1);

  // Respuesta A (robot)
  const respAIn = ip(f, 68, 98, 0, 1);
  const respADim = ip(f, 118, 152, 0, 1);

  // Respuesta B (humana)
  const respBIn = ip(f, 106, 140, 0, 1);
  const glowB = ip(f, 132, 172, 0, 1);

  // "Conexión" visual: corazón que crece
  const connectionIn = ip(f, 170, 200, 0, 1) * (1 - ip(f, 230, 246, 0, 1));

  const pay = ip(f, 238, 274, 0, 1);

  return (
    <Stage
      bg="radial-gradient(130% 92% at 50% 44%, #140812 0%, #080408 80%)"
      hue={PINK}
      seed={16}
    >
      {/* Label */}
      <div style={{
        position: 'absolute', top: 252, left: 0, right: 0, textAlign: 'center',
        fontFamily: fonts.mono, fontSize: 34, letterSpacing: '0.16em',
        color: 'rgba(255,255,255,0.58)', opacity: labelOp, zIndex: 30,
      }}>
        DOS RESPUESTAS AL MISMO MENSAJE
      </div>

      <AbsoluteFill style={{ opacity: 1 - pay }}>
        {/* Chat header */}
        <div style={{
          position: 'absolute', top: 336, left: 90, right: 130,
          opacity: chatIn,
          display: 'flex', alignItems: 'center', gap: 18,
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.10)',
          borderRadius: 28, padding: '20px 32px',
        }}>
          <div style={{
            width: 52, height: 52, borderRadius: '50%',
            background: 'rgba(255,255,255,0.12)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 26,
          }}>👤</div>
          <div>
            <div style={{ fontFamily: fonts.display, fontWeight: 600, fontSize: 34, color: 'rgba(255,255,255,0.82)' }}>
              María García
            </div>
            <div style={{ fontFamily: fonts.mono, fontSize: 22, color: 'rgba(255,255,255,0.36)' }}>
              hace 2 minutos
            </div>
          </div>
        </div>

        {/* Mensaje del cliente */}
        <div style={{
          position: 'absolute', top: 464, left: 90, right: 200,
          opacity: clientIn,
          transform: `translateX(${(1 - clientIn) * -18}px)`,
        }}>
          <div style={{
            background: 'rgba(255,255,255,0.07)',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: '22px 22px 22px 4px',
            padding: '22px 30px',
          }}>
            <div style={{
              fontFamily: fonts.display, fontWeight: 500, fontSize: 40,
              color: '#F4F4FA', lineHeight: 1.4,
            }}>
              "Hola! Me interesa el servicio, ¿pueden contarme más?" 👋
            </div>
          </div>
        </div>

        {/* RESPUESTA A — robótica */}
        <div style={{
          position: 'absolute', top: 620, left: 200, right: 90,
          opacity: respAIn * (1 - respADim * 0.80),
          transform: `translateX(${(1 - respAIn) * 18}px)`,
        }}>
          <Glass w={770} selected={false} pad={28} style={{ borderRadius: '22px 22px 4px 22px' }}>
            <div style={{ fontFamily: fonts.mono, fontSize: 20, color: 'rgba(255,255,255,0.30)', marginBottom: 10, letterSpacing: '0.08em' }}>
              RESPUESTA A · AUTO-RESPUESTA
            </div>
            <div style={{
              fontFamily: fonts.mono, fontSize: 34,
              color: 'rgba(255,255,255,0.48)', lineHeight: 1.5,
            }}>
              "Estimado/a cliente: Gracias por contactar a [EMPRESA]. Un representante se comunicará en el plazo de 24-48 horas hábiles."
            </div>
          </Glass>
        </div>

        {/* RESPUESTA B — humana */}
        <div style={{
          position: 'absolute', top: 850, left: 200, right: 90,
          opacity: respBIn,
          transform: `translateX(${(1 - respBIn) * 18}px)`,
        }}>
          <div style={{ position: 'relative' }}>
            {glowB > 0.1 && <SiriGlow frame={f} intensity={glowB * 0.85} radius={26} />}
            <div style={{
              width: 770,
              background: glowB > 0.3 ? 'linear-gradient(165deg,#1A0812 0%,#0A0408 100%)' : 'rgba(255,255,255,0.05)',
              border: `1px solid ${glowB > 0.3 ? PINK + '77' : 'rgba(255,255,255,0.10)'}`,
              borderRadius: '22px 22px 4px 22px',
              padding: 28,
              boxShadow: glowB > 0.3 ? `0 40px 100px -24px ${PINK}44` : 'none',
            }}>
              <div style={{ fontFamily: fonts.mono, fontSize: 20, color: `${PINK}CC`, marginBottom: 10, letterSpacing: '0.08em' }}>
                RESPUESTA B · SANTI DE CONCEPTO
              </div>
              <div style={{
                fontFamily: fonts.display, fontWeight: 500, fontSize: 38,
                color: '#F4F4FA', lineHeight: 1.4,
              }}>
                "¡Hola María! 😊 ¡Claro que sí! ¿Qué tipo de negocio tenés? Así te cuento exactamente lo que puede funcionar para vos."
              </div>
            </div>
          </div>
        </div>

        {/* Conexión visual */}
        <div style={{
          position: 'absolute', bottom: 442, left: 0, right: 0, textAlign: 'center',
          opacity: connectionIn,
          transform: `scale(${0.8 + connectionIn * 0.2})`,
        }}>
          <div style={{
            fontFamily: fonts.display, fontWeight: 700, fontSize: 48,
            color: PINK_L, textShadow: `0 0 30px ${PINK}AA`,
          }}>
            ❤️ Conexión real
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
          <BigType frame={f} s={238} size={90} lines={[
            { t: 'Tu cliente no quiere' },
            { t: 'hablar con una empresa.' },
            { t: 'Quiere hablar', hl: false },
            { t: 'con una persona.', hl: true },
          ]} />
          <div style={{
            fontFamily: fonts.display, fontWeight: 400, fontSize: 38, color: '#9A9AB5',
            marginTop: 30, opacity: ip(f, 282, 302, 0, 1),
          }}>
            La calidez no se automatiza. Pero la consistencia, sí.
          </div>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};
