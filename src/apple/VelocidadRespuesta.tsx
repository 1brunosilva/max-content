/**
 * VelocidadRespuesta — Temporal Discounting Meets First Responder.
 * Hay un dato concreto: el negocio que responde primero gana la venta el 78%
 * de las veces. Un contador de segundos corre. Dos cards compiten en paralelo.
 * La que llega a los 5 minutos con glow → gana. La que llega tarde → se apaga.
 * El espectador VIVE la carrera que no puede ver.
 *
 * Lever: first-mover / temporal urgency / response speed. Paleta: cyan-violeta. V.
 */
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { Stage, SiriGlow, SiriFrame, BigType, ip, fonts } from './kit';

export const VELOCIDADRESPUESTA_DURATION = 290;

const CYAN = '#4FE0FF';
const VLT = '#7C3AED';
const VLT_L = '#A855F7';
const RED = '#EF4444';
const GREEN = '#10B981';

export const VelocidadRespuesta: React.FC = () => {
  const f = useCurrentFrame();

  const labelIn = ip(f, 8, 28, 0, 1) * (1 - ip(f, 200, 214, 0, 1));

  // El lead llega
  const leadIn = ip(f, 18, 48, 0, 1);
  const leadPulse = 0.85 + 0.15 * Math.sin(f * 0.2);

  // El reloj corre: 0 → 300 segundos en pantalla
  const seconds = Math.round(ip(f, 42, 165, 0, 300));
  const clockIn = ip(f, 36, 56, 0, 1);
  const clockFade = ip(f, 165, 188, 0, 1);

  // Negocio A (rápido): responde a los 5 minutos (frame ~84)
  const bizAWins = f >= 84;
  const bizAGlow = ip(f, 84, 115, 0, 1) * (1 - ip(f, 200, 213, 0, 1));
  const bizAIn = ip(f, 48, 72, 0, 1);

  // Negocio B (lento): sigue esperando, se enfría
  const bizBFade = ip(f, 84, 140, 0, 1);
  const bizBIn = ip(f, 52, 76, 0, 1);

  // Stat: 78% de ventas al primero
  const statIn = ip(f, 118, 148, 0, 1) * (1 - ip(f, 198, 212, 0, 1));

  const pay = ip(f, 214, 252, 0, 1);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <Stage
      bg="radial-gradient(130% 92% at 50% 44%, #060412 0%, #020108 80%)"
      hue={CYAN}
      seed={11}
    >
      <div style={{
        position: 'absolute', top: 252, left: 0, right: 0, textAlign: 'center',
        fontFamily: fonts.mono, fontSize: 30, letterSpacing: '0.18em',
        color: 'rgba(255,255,255,0.50)', opacity: labelIn, zIndex: 30,
      }}>
        LA CARRERA QUE NO VES
      </div>

      <AbsoluteFill style={{ opacity: 1 - pay }}>

        {/* El lead entrante */}
        {leadIn > 0.01 && (
          <div style={{
            position: 'absolute', top: 325, left: 0, right: 0,
            display: 'flex', justifyContent: 'center',
            opacity: leadIn * (1 - ip(f, 95, 118, 0, 1)),
          }}>
            <div style={{
              background: `${CYAN}15`,
              border: `1px solid ${CYAN}44`,
              borderRadius: 24, padding: '24px 48px',
              textAlign: 'center',
              position: 'relative',
            }}>
              {leadIn > 0.5 && (
                <div style={{
                  position: 'absolute', top: -12, right: -12,
                  width: 32, height: 32, borderRadius: '50%',
                  background: '#22C55E',
                  animation: 'none',
                  boxShadow: `0 0 14px #22C55E88`,
                  opacity: leadPulse,
                }} />
              )}
              <div style={{ fontFamily: fonts.mono, fontSize: 26, color: CYAN, letterSpacing: '0.1em', marginBottom: 10 }}>
                NUEVO LEAD
              </div>
              <div style={{ fontFamily: fonts.display, fontWeight: 700, fontSize: 46, color: '#F4F4FA' }}>
                "Me interesa el servicio,<br />¿tenés disponibilidad?"
              </div>
              <div style={{ fontFamily: fonts.mono, fontSize: 24, color: 'rgba(255,255,255,0.36)', marginTop: 10 }}>
                📱 Recibido ahora · Esperando respuesta...
              </div>
            </div>
          </div>
        )}

        {/* Reloj corriendo */}
        {clockIn > 0.01 && (
          <div style={{
            position: 'absolute', top: 552, left: 0, right: 0,
            textAlign: 'center',
            opacity: clockIn * (1 - clockFade),
          }}>
            <div style={{ fontFamily: fonts.mono, fontSize: 28, color: 'rgba(255,255,255,0.34)', letterSpacing: '0.12em', marginBottom: 12 }}>
              TIEMPO TRANSCURRIDO
            </div>
            <div style={{
              fontFamily: fonts.display, fontWeight: 900, fontSize: 132,
              letterSpacing: '-0.04em',
              color: seconds > 240 ? RED : seconds > 120 ? '#F59E0B' : CYAN,
              textShadow: seconds < 120 ? `0 0 40px ${CYAN}66` : 'none',
              lineHeight: 1,
            }}>
              {formatTime(seconds)}
            </div>
          </div>
        )}

        {/* Dos negocios compitiendo */}
        <div style={{
          position: 'absolute', top: bizAIn > 0 ? 705 : 999,
          left: 90, right: 130,
          display: 'flex', gap: 24,
        }}>
          {/* Negocio A — responde rápido */}
          <div style={{
            flex: 1,
            opacity: bizAIn,
            transform: `translateY(${(1 - bizAIn) * 20}px)`,
          }}>
            <div style={{
              background: bizAWins ? `${GREEN}15` : 'rgba(255,255,255,0.04)',
              border: `2px solid ${bizAWins ? GREEN + '66' : 'rgba(255,255,255,0.10)'}`,
              borderRadius: 24, padding: '24px 28px',
              position: 'relative',
            }}>
              {bizAGlow > 0.01 && (
                <SiriGlow frame={f} intensity={bizAGlow} radius={24} inset={0} />
              )}
              <div style={{ fontFamily: fonts.mono, fontSize: 22, color: bizAWins ? '#34D399' : 'rgba(255,255,255,0.3)', letterSpacing: '0.1em', marginBottom: 10 }}>
                {bizAWins ? '✓ RESPONDIÓ' : 'NEGOCIO A'}
              </div>
              <div style={{ fontFamily: fonts.display, fontWeight: 700, fontSize: 36, color: bizAWins ? '#F4F4FA' : 'rgba(255,255,255,0.5)' }}>
                {bizAWins ? '"Claro, hablemos ahora mismo."' : 'Preparando respuesta...'}
              </div>
              {bizAWins && (
                <div style={{ fontFamily: fonts.mono, fontSize: 22, color: '#34D399', marginTop: 10 }}>
                  ⏱ 4 min 52 seg
                </div>
              )}
            </div>
          </div>

          {/* Negocio B — lento */}
          <div style={{
            flex: 1,
            opacity: bizBIn * (0.9 - bizBFade * 0.75),
            transform: `translateY(${(1 - bizBIn) * 20}px)`,
          }}>
            <div style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 24, padding: '24px 28px',
              filter: `saturate(${1 - bizBFade * 0.8})`,
            }}>
              <div style={{ fontFamily: fonts.mono, fontSize: 22, color: bizBFade > 0.4 ? '#9CA3AF' : 'rgba(255,255,255,0.3)', letterSpacing: '0.1em', marginBottom: 10 }}>
                NEGOCIO B
              </div>
              <div style={{ fontFamily: fonts.display, fontWeight: 700, fontSize: 36, color: `rgba(255,255,255,${0.5 - bizBFade * 0.4})` }}>
                {bizBFade > 0.6 ? '(sin responder todavía)' : 'Sin sistema de respuesta...'}
              </div>
            </div>
          </div>
        </div>

        {/* Stat */}
        {statIn > 0.01 && (
          <div style={{
            position: 'absolute', bottom: 448, left: 0, right: 0,
            textAlign: 'center', opacity: statIn,
          }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 18,
              background: `${VLT}18`, border: `1px solid ${VLT_L}44`,
              borderRadius: 50, padding: '16px 48px',
            }}>
              <div style={{ fontFamily: fonts.display, fontWeight: 900, fontSize: 56, color: VLT_L, textShadow: `0 0 20px ${VLT}88` }}>78%</div>
              <div style={{ fontFamily: fonts.display, fontWeight: 600, fontSize: 36, color: 'rgba(255,255,255,0.7)' }}>
                de ventas al que responde primero
              </div>
            </div>
          </div>
        )}
      </AbsoluteFill>

      {/* PAYOFF */}
      <AbsoluteFill style={{
        alignItems: 'center', justifyContent: 'center', textAlign: 'center',
        paddingLeft: 90, paddingRight: 130, opacity: pay, zIndex: 200,
      }}>
        <SiriFrame frame={f} intensity={pay} />
        <div style={{ transform: `translateY(${(1 - pay) * 26}px)` }}>
          <BigType frame={f} s={218} size={88} lines={[
            { t: 'El primero en responder' },
            { t: 'gana el 78%' },
            { t: 'de las ventas.', hl: true },
          ]} />
          <div style={{
            fontFamily: fonts.display, fontWeight: 400, fontSize: 38,
            color: '#9A9AB5', marginTop: 32,
            opacity: ip(f, 264, 286, 0, 1),
          }}>
            La velocidad no es servicio. Es ventaja competitiva.
          </div>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};
