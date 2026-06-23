/**
 * EstadoDeAnimo — Affect Heuristic. El estado emocional actual cambia
 * cuánto vale lo que percibís. La misma propuesta se muestra dos veces:
 * con filtro frío/negativo (baja percepción de valor) y con filtro cálido/positivo
 * (alta percepción). El espectador vive que el precio no existe en el vacío.
 *
 * Lever: affect heuristic / emotional state. Paleta: azul frío → naranja cálido. C.
 */
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { Stage, SiriGlow, SiriFrame, BigType, ip, fonts, Glass } from './kit';

export const ESTADODEANIMO_DURATION = 290;

const COLD = '#3B82F6';
const COLD_L = '#93C5FD';
const WARM = '#F97316';
const WARM_L = '#FED7AA';
const WARM_G = '#F59E0B';

export const EstadoDeAnimo: React.FC = () => {
  const f = useCurrentFrame();

  const labelIn = ip(f, 8, 28, 0, 1) * (1 - ip(f, 200, 215, 0, 1));

  // Fase fría — el estado negativo
  const coldIn = ip(f, 22, 52, 0, 1);
  const coldGlow = ip(f, 38, 75, 0, 1) * (1 - ip(f, 110, 130, 0, 1));
  const coldFade = ip(f, 112, 145, 0, 1);

  // El termómetro emocional
  const coldTemp = ip(f, 30, 90, 0, 1); // nivel frío
  const warmTemp = ip(f, 145, 215, 0, 1); // nivel cálido

  // Transición — el "estado cambia"
  const transIn = ip(f, 130, 158, 0, 1) * (1 - ip(f, 170, 188, 0, 1));

  // Fase cálida — el estado positivo
  const warmIn = ip(f, 152, 185, 0, 1);
  const warmGlow = ip(f, 168, 210, 0, 1) * (1 - ip(f, 200, 213, 0, 1));

  const pay = ip(f, 215, 255, 0, 1);

  const PROPOSAL = '"Automatizá tu CRM\npor $4.900/mes"';

  return (
    <Stage
      bg="radial-gradient(130% 92% at 50% 44%, #06080F 0%, #020308 80%)"
      hue={COLD}
      seed={4}
    >
      <div style={{
        position: 'absolute', top: 252, left: 0, right: 0, textAlign: 'center',
        fontFamily: fonts.mono, fontSize: 30, letterSpacing: '0.18em',
        color: 'rgba(255,255,255,0.50)', opacity: labelIn, zIndex: 30,
      }}>
        MISMA PROPUESTA. DOS ESTADOS DIFERENTES.
      </div>

      <AbsoluteFill style={{ opacity: 1 - pay }}>
        {/* Indicador de estado emocional */}
        <div style={{
          position: 'absolute', top: 328, left: 90, right: 130,
          opacity: ip(f, 20, 40, 0, 1) * (1 - ip(f, 196, 210, 0, 1)),
        }}>
          <div style={{ fontFamily: fonts.mono, fontSize: 24, color: 'rgba(255,255,255,0.34)', letterSpacing: '0.12em', marginBottom: 14 }}>
            ESTADO EMOCIONAL
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            <div style={{ fontFamily: fonts.display, fontWeight: 600, fontSize: 38, color: COLD_L }}>😔 Frío</div>
            <div style={{ flex: 1, height: 24, borderRadius: 12, background: 'rgba(255,255,255,0.06)', position: 'relative', overflow: 'hidden' }}>
              {/* Barra fría */}
              <div style={{
                position: 'absolute', top: 0, left: 0,
                width: `${coldTemp * 100}%`,
                height: '100%', borderRadius: 12,
                background: `linear-gradient(90deg, ${COLD} 0%, ${COLD_L} 100%)`,
                opacity: 1 - coldFade,
              }} />
              {/* Barra cálida */}
              <div style={{
                position: 'absolute', top: 0, left: 0,
                width: `${warmTemp * 100}%`,
                height: '100%', borderRadius: 12,
                background: `linear-gradient(90deg, ${WARM} 0%, ${WARM_L} 100%)`,
                boxShadow: `0 0 16px ${WARM}55`,
                opacity: ip(f, 148, 165, 0, 1),
              }} />
            </div>
            <div style={{ fontFamily: fonts.display, fontWeight: 600, fontSize: 38, color: WARM_L }}>Cálido 😊</div>
          </div>
        </div>

        {/* ESTADO FRÍO — La propuesta parece cara */}
        <div style={{
          position: 'absolute', top: 452, left: 90, right: 130,
          opacity: coldIn * (1 - coldFade),
        }}>
          <div style={{
            background: `${COLD}10`,
            border: `1px solid ${COLD}33`,
            borderRadius: 28, padding: '32px 40px',
            position: 'relative',
          }}>
            {coldGlow > 0.01 && (
              <div style={{
                position: 'absolute', inset: 0, borderRadius: 28,
                background: `${COLD}08`,
                filter: 'blur(20px)',
              }} />
            )}
            <div style={{ fontFamily: fonts.mono, fontSize: 24, color: COLD_L, letterSpacing: '0.1em', marginBottom: 14, opacity: 0.7 }}>
              😔 HOY TUVE UN DÍA DIFÍCIL
            </div>
            <div style={{ fontFamily: fonts.display, fontWeight: 700, fontSize: 46, color: 'rgba(255,255,255,0.65)', whiteSpace: 'pre-line', lineHeight: 1.2, marginBottom: 18 }}>
              {PROPOSAL}
            </div>
            <div style={{ display: 'flex', gap: 28 }}>
              <div>
                <div style={{ fontFamily: fonts.mono, fontSize: 22, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em' }}>PERCEPCIÓN DE VALOR</div>
                <div style={{ fontFamily: fonts.display, fontWeight: 900, fontSize: 68, color: COLD, lineHeight: 1, marginTop: 4 }}>28%</div>
              </div>
              <div>
                <div style={{ fontFamily: fonts.mono, fontSize: 22, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em' }}>RESPUESTA</div>
                <div style={{ fontFamily: fonts.display, fontWeight: 700, fontSize: 48, color: '#EF4444', lineHeight: 1, marginTop: 8 }}>"Muy caro"</div>
              </div>
            </div>
          </div>
        </div>

        {/* TRANSICIÓN — el estado cambia */}
        {transIn > 0.01 && (
          <div style={{
            position: 'absolute', top: 680, left: 0, right: 0,
            textAlign: 'center', opacity: transIn,
          }}>
            <div style={{
              fontFamily: fonts.display, fontWeight: 700, fontSize: 44,
              color: 'rgba(255,255,255,0.5)',
            }}>
              → El estado emocional cambia →
            </div>
          </div>
        )}

        {/* ESTADO CÁLIDO — La misma propuesta parece razonable */}
        <div style={{
          position: 'absolute', top: 452, left: 90, right: 130,
          opacity: warmIn,
          transform: `translateY(${(1 - warmIn) * 24}px)`,
        }}>
          <Glass w={860} selected style={{ position: 'relative' }}>
            {warmGlow > 0.01 && (
              <SiriGlow frame={f} intensity={warmGlow * 0.85} radius={34} inset={0} />
            )}
            <div style={{ fontFamily: fonts.mono, fontSize: 24, color: WARM_L, letterSpacing: '0.1em', marginBottom: 14 }}>
              😊 HOY CERRÉ DOS VENTAS
            </div>
            <div style={{ fontFamily: fonts.display, fontWeight: 700, fontSize: 46, color: '#F4F4FA', whiteSpace: 'pre-line', lineHeight: 1.2, marginBottom: 18 }}>
              {PROPOSAL}
            </div>
            <div style={{ display: 'flex', gap: 28 }}>
              <div>
                <div style={{ fontFamily: fonts.mono, fontSize: 22, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em' }}>PERCEPCIÓN DE VALOR</div>
                <div style={{ fontFamily: fonts.display, fontWeight: 900, fontSize: 68, color: WARM_G, lineHeight: 1, marginTop: 4, textShadow: `0 0 24px ${WARM_G}88` }}>91%</div>
              </div>
              <div>
                <div style={{ fontFamily: fonts.mono, fontSize: 22, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em' }}>RESPUESTA</div>
                <div style={{ fontFamily: fonts.display, fontWeight: 700, fontSize: 48, color: '#34D399', lineHeight: 1, marginTop: 8 }}>"Me interesa"</div>
              </div>
            </div>
          </Glass>
        </div>
      </AbsoluteFill>

      {/* PAYOFF */}
      <AbsoluteFill style={{
        alignItems: 'center', justifyContent: 'center', textAlign: 'center',
        paddingLeft: 90, paddingRight: 130, opacity: pay, zIndex: 200,
      }}>
        <SiriFrame frame={f} intensity={pay} />
        <div style={{ transform: `translateY(${(1 - pay) * 26}px)` }}>
          <BigType frame={f} s={219} size={88} lines={[
            { t: 'Tu precio no existe' },
            { t: 'en el vacío.' },
            { t: 'Existe en un estado.', hl: true },
          ]} />
          <div style={{
            fontFamily: fonts.display, fontWeight: 400, fontSize: 38,
            color: '#9A9AB5', marginTop: 32,
            opacity: ip(f, 265, 286, 0, 1),
          }}>
            Creá el contexto emocional antes de la propuesta.
          </div>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};
