/**
 * SilencioElocuente — Whitespace as cognitive signal. Una propuesta densa (muro de
 * texto, sin aire) vs la misma propuesta con espacio: una frase central, todo al
 * rededor vacío. La segunda tiene más glow, más respuesta. El espectador VIVE la
 * diferencia de carga cognitiva.
 *
 * Lever: cognitive fluency / processing ease / whitespace effect. Paleta: crema-dorado. Modo: editorial-claro. C.
 */
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { Stage, Glass, SiriGlow, SiriFrame, BigType, ip, fonts } from './kit';

export const SILENCIOELOCUENTE_DURATION = 290;

const GOLD = '#D97706';
const GOLD_L = '#FBBF24';

const DENSE_LINES = [
  'Somos una empresa con más de 10 años de experiencia en el mercado de soluciones digitales.',
  'Ofrecemos servicios de diseño, desarrollo, marketing digital, gestión de redes sociales,',
  'automatización de procesos, consultoría estratégica, soporte técnico 24/7, capacitación',
  'del equipo, integración de sistemas ERP y CRM, análisis de datos, reportes personalizados,',
  'gestión de campañas publicitarias online y offline, y mucho más. ¡Contáctenos hoy!',
  'Precio: a consultar. Disponibilidad: inmediata. Financiamiento: en cuotas sin interés.',
];

export const SilencioElocuente: React.FC = () => {
  const f = useCurrentFrame();

  // Fase 1: carta densa (fondo negro, texto en blanco tenue)
  const denseIn = ip(f, 8, 44, 0, 1);
  const denseLabel = ip(f, 12, 32, 0, 1) * (1 - ip(f, 120, 138, 0, 1));

  // Transición: densa se va
  const denseOut = ip(f, 118, 145, 0, 1);

  // Fase 2: carta limpia
  const cleanIn = ip(f, 138, 172, 0, 1);
  const glowI = ip(f, 168, 198, 0, 1);
  const cleanLabel = ip(f, 142, 162, 0, 1) * (1 - ip(f, 230, 248, 0, 1));

  // Response
  const responseIn = ip(f, 195, 218, 0, 1);

  const pay = ip(f, 240, 272, 0, 1);

  return (
    <Stage
      bg="radial-gradient(130% 92% at 50% 44%, #0C0A06 0%, #050400 80%)"
      hue={GOLD}
      seed={9}
    >
      {/* PROPUESTA DENSA */}
      <AbsoluteFill style={{
        alignItems: 'center', justifyContent: 'center',
        opacity: denseIn * (1 - denseOut) * (1 - pay),
      }}>
        <div style={{
          position: 'absolute', top: 260, left: 0, right: 0, textAlign: 'center',
          fontFamily: fonts.mono, fontSize: 34, letterSpacing: '0.18em',
          color: 'rgba(255,255,255,0.5)', opacity: denseLabel,
        }}>
          LA PROPUESTA DE SIEMPRE
        </div>

        <Glass w={840} selected={false} pad={44}>
          <div style={{ fontFamily: fonts.mono, fontSize: 22, color: 'rgba(255,255,255,0.38)', marginBottom: 16, letterSpacing: '0.1em' }}>
            PROPUESTA DE SERVICIOS
          </div>
          {DENSE_LINES.map((line, i) => (
            <div key={i} style={{
              fontFamily: fonts.display, fontSize: 34, color: 'rgba(255,255,255,0.52)',
              lineHeight: 1.48, letterSpacing: '-0.01em',
            }}>
              {line}
            </div>
          ))}
        </Glass>
      </AbsoluteFill>

      {/* PROPUESTA LIMPIA */}
      <AbsoluteFill style={{
        alignItems: 'center', justifyContent: 'center',
        opacity: cleanIn * (1 - pay),
      }}>
        <div style={{
          position: 'absolute', top: 260, left: 0, right: 0, textAlign: 'center',
          fontFamily: fonts.mono, fontSize: 34, letterSpacing: '0.18em',
          color: `${GOLD_L}CC`, opacity: cleanLabel,
        }}>
          LA MISMA PROPUESTA, CON AIRE
        </div>

        <div style={{ position: 'relative' }}>
          <SiriGlow frame={f} intensity={glowI * 0.85} radius={34} />
          <Glass w={840} h={560} selected={glowI > 0.2} pad={72} style={{ justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: fonts.mono, fontSize: 22, color: `${GOLD}CC`, letterSpacing: '0.1em', marginBottom: 40 }}>
                PROPUESTA
              </div>
              <div style={{
                fontFamily: fonts.display, fontWeight: 800, fontSize: 68,
                color: '#F5F0E8', letterSpacing: '-0.03em', lineHeight: 1.18, textAlign: 'center',
              }}>
                Nunca más<br />pierdas un<br />cliente por<br />no responder.
              </div>
            </div>
          </Glass>
        </div>

        {/* Respuesta */}
        <div style={{
          position: 'absolute', bottom: 440, left: 0, right: 0,
          display: 'flex', justifyContent: 'center',
          opacity: responseIn,
          transform: `translateY(${(1 - responseIn) * 22}px)`,
        }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 18,
            background: `${GOLD}18`, borderRadius: 50,
            border: `1px solid ${GOLD}55`, padding: '18px 40px',
          }}>
            <div style={{ width: 18, height: 18, borderRadius: '50%', background: GOLD_L }} />
            <div style={{ fontFamily: fonts.display, fontWeight: 600, fontSize: 34, color: GOLD_L }}>
              "Quiero saber más"
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
          <BigType frame={f} s={240} size={96} lines={[
            { t: 'El espacio en blanco' },
            { t: 'no es vacío.' },
            { t: 'Es claridad.', hl: true },
          ]} />
          <div style={{
            fontFamily: fonts.display, fontWeight: 400, fontSize: 42, color: '#9A9AB5',
            marginTop: 32, opacity: ip(f, 278, 286, 0, 1),
          }}>
            Y la claridad vende.
          </div>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};
