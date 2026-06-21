/**
 * VozCliente — Customer language. Una propuesta en jerga técnica (sin respuesta)
 * se transforma en la misma propuesta en palabras del cliente (con respuesta y glow).
 * El espectador SIENTE la diferencia de resonancia. No es el mensaje, es el idioma.
 *
 * Lever: cognitive fluency / customer language / linguistic matching. Paleta: verde. C.
 */
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { Stage, Glass, SiriGlow, SiriFrame, BigType, ip, fonts } from './kit';

export const VOZCLIENTE_DURATION = 290;

const GREEN = '#10B981';
const GREEN_L = '#34D399';

export const VozCliente: React.FC = () => {
  const f = useCurrentFrame();

  const cardIn = ip(f, 8, 44, 0, 1);
  const label1Op = ip(f, 12, 30, 0, 1) * (1 - ip(f, 115, 135, 0, 1));

  // Fase 1: card técnica aparece, sin respuesta
  const noResponseIn = ip(f, 62, 82, 0, 1) * (1 - ip(f, 112, 128, 0, 1));

  // Transformación: la card técnica desaparece, la del cliente aparece
  const transform = ip(f, 112, 152, 0, 1);
  const label2Op = ip(f, 140, 158, 0, 1) * (1 - ip(f, 220, 238, 0, 1));

  // Respuesta llega
  const responseIn = ip(f, 162, 188, 0, 1);
  const glowI = ip(f, 155, 185, 0, 1);

  const pay = ip(f, 228, 260, 0, 1);

  return (
    <Stage
      bg="radial-gradient(130% 92% at 50% 44%, #021A0F 0%, #010A06 80%)"
      hue={GREEN}
      seed={8}
    >
      {/* CARD TÉCNICA (fase 1) */}
      <AbsoluteFill style={{
        alignItems: 'center', justifyContent: 'center',
        opacity: cardIn * (1 - transform),
      }}>
        {/* Label "Tu propuesta" */}
        <div style={{
          position: 'absolute', top: 260, left: 0, right: 0, textAlign: 'center',
          fontFamily: fonts.mono, fontSize: 36, letterSpacing: '0.18em',
          color: 'rgba(255,255,255,0.62)', opacity: label1Op,
        }}>
          TU PROPUESTA
        </div>

        <Glass w={820} selected={false} pad={52}>
          <div style={{ fontFamily: fonts.mono, fontSize: 26, color: 'rgba(255,255,255,0.42)', letterSpacing: '0.08em', marginBottom: 18 }}>
            PROPUESTA COMERCIAL
          </div>
          <div style={{
            fontFamily: fonts.display, fontWeight: 600, fontSize: 46,
            color: 'rgba(255,255,255,0.62)', letterSpacing: '-0.02em', lineHeight: 1.38,
          }}>
            Automatización de flujos conversacionales multicanal con segmentación dinámica de audiencia y CRM integrado.
          </div>
          <div style={{ marginTop: 32, fontFamily: fonts.mono, fontSize: 28, color: 'rgba(255,255,255,0.28)' }}>
            Tarifa mensual: $4.900
          </div>
        </Glass>

        {/* Sin respuesta */}
        <div style={{
          position: 'absolute', bottom: 480, left: 0, right: 0,
          display: 'flex', justifyContent: 'center',
          opacity: noResponseIn,
        }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 18,
            background: 'rgba(255,80,80,0.12)', borderRadius: 50,
            border: '1px solid rgba(255,80,80,0.3)',
            padding: '20px 40px',
          }}>
            <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#EF4444' }} />
            <div style={{ fontFamily: fonts.mono, fontSize: 32, color: '#EF4444', letterSpacing: '0.06em' }}>
              SIN RESPUESTA
            </div>
          </div>
        </div>
      </AbsoluteFill>

      {/* CARD DEL CLIENTE (fase 2) */}
      <AbsoluteFill style={{
        alignItems: 'center', justifyContent: 'center',
        opacity: transform * (1 - pay),
      }}>
        {/* Label "En las palabras de tu cliente" */}
        <div style={{
          position: 'absolute', top: 260, left: 0, right: 0, textAlign: 'center',
          fontFamily: fonts.mono, fontSize: 36, letterSpacing: '0.18em',
          color: `${GREEN_L}CC`, opacity: label2Op,
        }}>
          EN SUS PALABRAS
        </div>

        <div style={{ position: 'relative' }}>
          <SiriGlow frame={f} intensity={glowI * 0.9} radius={34} />
          <Glass w={820} selected={glowI > 0.2} pad={52}>
            <div style={{ fontFamily: fonts.mono, fontSize: 26, color: `${GREEN}CC`, letterSpacing: '0.08em', marginBottom: 18 }}>
              PROPUESTA COMERCIAL
            </div>
            <div style={{
              fontFamily: fonts.display, fontWeight: 700, fontSize: 56,
              color: '#F4F4FA', letterSpacing: '-0.02em', lineHeight: 1.32,
            }}>
              Te avisamos cuando un cliente no te contestó, para que no pierdas la venta.
            </div>
            <div style={{ marginTop: 32, fontFamily: fonts.mono, fontSize: 28, color: `${GREEN}CC` }}>
              $4.900/mes
            </div>
          </Glass>
        </div>

        {/* Respuesta llega */}
        <div style={{
          position: 'absolute', bottom: 450, left: 0, right: 0,
          display: 'flex', justifyContent: 'center',
          opacity: responseIn,
          transform: `translateY(${(1 - responseIn) * 24}px)`,
        }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 18,
            background: `${GREEN}18`, borderRadius: 50,
            border: `1px solid ${GREEN}55`,
            padding: '20px 44px',
          }}>
            <div style={{ width: 20, height: 20, borderRadius: '50%', background: GREEN_L }} />
            <div style={{ fontFamily: fonts.display, fontWeight: 600, fontSize: 36, color: GREEN_L }}>
              "¿Podemos hablar esta semana?"
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
          <BigType frame={f} s={228} size={88} lines={[
            { t: 'Hablar en tu idioma' },
            { t: 'te hace sentir inteligente.' },
            { t: 'Hablar en el de', hl: false },
            { t: 'tu cliente vende.', hl: true },
          ]} />
        </div>
      </AbsoluteFill>
    </Stage>
  );
};
