/**
 * EfectoEspectador — Bystander Effect / Diffusion of Responsibility.
 * 7 avatares rodean un mensaje. Ninguno actúa. El espectador siente la
 * parálisis del grupo. Uno rompe → glow → responde solo.
 * El espectador VIVE que el mensaje masivo no le habla a nadie específico.
 *
 * Lever: bystander effect / diffusion of responsibility. Paleta: cyan-azul. C.
 */
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { Stage, SiriGlow, SiriFrame, BigType, ip, fonts } from './kit';

export const EFECTOESPECTADOR_DURATION = 306;

const CYAN = '#4FE0FF';
const CYAN_L = '#A5F3FC';
const BLUE = '#3B82F6';

const AVATARS = [
  { x: 540, y: 520, label: 'Ana' },
  { x: 760, y: 600, label: 'Marcos' },
  { x: 820, y: 800, label: 'Laura' },
  { x: 700, y: 980, label: 'Diego' },
  { x: 460, y: 1020, label: 'Sol' },
  { x: 250, y: 860, label: 'Pablo' },
  { x: 220, y: 640, label: 'María' },
];

export const EfectoEspectador: React.FC = () => {
  const f = useCurrentFrame();

  const labelIn = ip(f, 8, 28, 0, 1) * (1 - ip(f, 224, 238, 0, 1));

  // El mensaje central aparece
  const msgIn = ip(f, 18, 48, 0, 1);

  // Los avatares aparecen escalonados
  const avIn = (i: number) => ip(f, 42 + i * 10, 65 + i * 10, 0, 1);

  // Fase "nadie actúa" — los avatares pulsan débilmente
  const idlePulse = 0.55 + 0.12 * Math.sin(f * 0.14);

  // Un avatar (índice 1 = Marcos) rompe el patrón y se mueve hacia el mensaje
  const breakerMove = ip(f, 132, 168, 0, 1);
  const breakerGlow = ip(f, 152, 188, 0, 1) * (1 - ip(f, 222, 236, 0, 1));

  // El mensaje se vuelve personal con el nombre del breaker
  const personalIn = ip(f, 165, 195, 0, 1) * (1 - ip(f, 220, 234, 0, 1));

  // Línea de conexión del breaker al mensaje
  const lineIn = ip(f, 148, 175, 0, 1) * (1 - ip(f, 218, 230, 0, 1));

  const pay = ip(f, 232, 270, 0, 1);

  const CENTER_X = 540;
  const CENTER_Y = 760;
  const BREAKER = AVATARS[1]; // Marcos

  return (
    <Stage
      bg="radial-gradient(130% 92% at 50% 44%, #020814 0%, #010408 80%)"
      hue={CYAN}
      seed={2}
    >
      <div style={{
        position: 'absolute', top: 252, left: 0, right: 0, textAlign: 'center',
        fontFamily: fonts.mono, fontSize: 30, letterSpacing: '0.18em',
        color: 'rgba(255,255,255,0.50)', opacity: labelIn, zIndex: 30,
      }}>
        MANDASTE EL MISMO MENSAJE A TODOS
      </div>

      <AbsoluteFill style={{ opacity: 1 - pay }}>

        {/* Mensaje central */}
        <div style={{
          position: 'absolute',
          left: CENTER_X - 200, top: CENTER_Y - 68,
          opacity: msgIn,
          transform: `scale(${0.82 + msgIn * 0.18})`,
          width: 400,
        }}>
          <div style={{
            background: 'rgba(255,255,255,0.07)',
            border: `1px solid rgba(255,255,255,0.14)`,
            borderRadius: 24, padding: '24px 32px',
            textAlign: 'center',
          }}>
            <div style={{ fontFamily: fonts.mono, fontSize: 22, color: 'rgba(255,255,255,0.36)', letterSpacing: '0.12em', marginBottom: 8 }}>
              BROADCAST
            </div>
            <div style={{
              fontFamily: fonts.display, fontWeight: 700, fontSize: 38,
              color: '#F4F4FA',
            }}>
              "¡Tenemos una<br />oferta para vos!"
            </div>
          </div>
        </div>

        {/* Mensaje personal que reemplaza */}
        {personalIn > 0.01 && (
          <div style={{
            position: 'absolute',
            left: CENTER_X - 200, top: CENTER_Y - 68,
            opacity: personalIn,
            width: 400,
          }}>
            <div style={{
              background: `${CYAN}15`,
              border: `1px solid ${CYAN}55`,
              borderRadius: 24, padding: '24px 32px',
              textAlign: 'center',
              position: 'relative',
            }}>
              <SiriGlow frame={f} intensity={personalIn * 0.8} radius={24} inset={0} />
              <div style={{ fontFamily: fonts.mono, fontSize: 22, color: CYAN, letterSpacing: '0.12em', marginBottom: 8 }}>
                DIRECTO
              </div>
              <div style={{ fontFamily: fonts.display, fontWeight: 700, fontSize: 38, color: '#F4F4FA' }}>
                "Marcos, pensé<br />en vos."
              </div>
            </div>
          </div>
        )}

        {/* Avatares */}
        {AVATARS.map((av, i) => {
          const isBreaker = i === 1;
          const avOpacity = avIn(i);
          const bx = isBreaker ? BREAKER.x + (CENTER_X - BREAKER.x - 60) * breakerMove : av.x;
          const by = isBreaker ? BREAKER.y + (CENTER_Y - BREAKER.y - 60) * breakerMove : av.y;

          return (
            <div key={i} style={{
              position: 'absolute',
              left: bx - 44, top: by - 44,
              opacity: avOpacity * (isBreaker ? 1 : idlePulse * (0.4 + 0.3 * (i % 3))),
              transition: 'none',
            }}>
              {/* Glow del breaker */}
              {isBreaker && breakerGlow > 0.01 && (
                <SiriGlow frame={f} intensity={breakerGlow} radius={44} inset={0} />
              )}
              <div style={{
                width: 88, height: 88, borderRadius: '50%',
                background: isBreaker && breakerMove > 0.1
                  ? `radial-gradient(circle, ${CYAN}55 0%, ${BLUE}33 100%)`
                  : 'rgba(255,255,255,0.08)',
                border: `2px solid ${isBreaker && breakerMove > 0.1 ? CYAN + '88' : 'rgba(255,255,255,0.15)'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <div style={{
                  fontFamily: fonts.display, fontWeight: 700, fontSize: 30,
                  color: isBreaker && breakerMove > 0.1 ? CYAN_L : 'rgba(255,255,255,0.6)',
                }}>
                  {av.label[0]}
                </div>
              </div>
              <div style={{
                fontFamily: fonts.mono, fontSize: 20,
                color: isBreaker && breakerMove > 0.1 ? CYAN_L : 'rgba(255,255,255,0.38)',
                textAlign: 'center', marginTop: 6, letterSpacing: '0.06em',
              }}>
                {av.label}
              </div>
            </div>
          );
        })}

        {/* Línea de conexión del breaker al mensaje */}
        {lineIn > 0.01 && (
          <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
            <line
              x1={BREAKER.x + (CENTER_X - BREAKER.x - 60) * breakerMove + 44}
              y1={BREAKER.y + (CENTER_Y - BREAKER.y - 60) * breakerMove + 44}
              x2={CENTER_X}
              y2={CENTER_Y}
              stroke={CYAN}
              strokeWidth={2}
              strokeDasharray="8 6"
              opacity={lineIn * 0.7}
            />
          </svg>
        )}

        {/* Texto inferencial */}
        <div style={{
          position: 'absolute', bottom: 444, left: 90, right: 130,
          textAlign: 'center',
          opacity: ip(f, 78, 108, 0, 1) * (1 - ip(f, 185, 200, 0, 1)),
        }}>
          <div style={{
            fontFamily: fonts.display, fontWeight: 600, fontSize: 42,
            color: 'rgba(255,255,255,0.42)',
          }}>
            7 personas recibieron el mensaje.
          </div>
          <div style={{
            fontFamily: fonts.display, fontWeight: 700, fontSize: 52,
            color: 'rgba(255,255,255,0.22)', marginTop: 10,
          }}>
            Ninguna responde.
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
          <BigType frame={f} s={236} size={92} lines={[
            { t: 'El mensaje masivo' },
            { t: 'no le habla' },
            { t: 'a nadie.', hl: true },
          ]} />
          <div style={{
            fontFamily: fonts.display, fontWeight: 400, fontSize: 38,
            color: '#9A9AB5', marginTop: 32,
            opacity: ip(f, 280, 302, 0, 1),
          }}>
            Nombrá a uno. Hablale a uno. Vendele a uno.
          </div>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};
