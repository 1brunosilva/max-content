/**
 * AtribucionError — Fundamental Attribution Error. Tendemos a atribuir
 * los fracasos de otros a su carácter ("es flojo") ignorando el contexto.
 * Dos frames: persona sola con stamp "FLOJO" vs misma persona rodeada de
 * circunstancias. El espectador ve el reencuadre — y cómo vender desde ahí.
 *
 * Lever: fundamental attribution error / contexto vs carácter. Paleta: dorado-crema. C.
 */
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { Stage, SiriGlow, SiriFrame, BigType, ip, fonts, Glass } from './kit';

export const ATRIBUCIONERROR_DURATION = 284;

const GOLD = '#F59E0B';
const RED = '#EF4444';

const CIRCUMSTANCES = [
  'Sin sistema de seguimiento',
  'Propuestas genéricas',
  'Sin automatización',
  'Respuesta lenta al lead',
  'Sin diferenciación',
];

export const AtribucionError: React.FC = () => {
  const f = useCurrentFrame();

  const labelIn = ip(f, 8, 28, 0, 1) * (1 - ip(f, 196, 210, 0, 1));

  // Fase 1: el dueño solo con el stamp
  const personIn = ip(f, 22, 52, 0, 1);
  const stampIn = ip(f, 65, 95, 0, 1);
  const phase1Fade = ip(f, 112, 142, 0, 1);

  // Fase 2: las circunstancias rodean al dueño
  const circIn = (i: number) => ip(f, 145 + i * 12, 168 + i * 12, 0, 1);
  const phase2 = ip(f, 140, 165, 0, 1);
  const reframeGlow = ip(f, 162, 200, 0, 1) * (1 - ip(f, 198, 212, 0, 1));

  // El reencuadre
  const reframeIn = ip(f, 168, 195, 0, 1) * (1 - ip(f, 196, 210, 0, 1));

  const pay = ip(f, 212, 252, 0, 1);

  return (
    <Stage
      bg="radial-gradient(130% 90% at 50% 44%, #12100A 0%, #07060300 80%)"
      hue={GOLD}
      seed={3}
    >
      <div style={{
        position: 'absolute', top: 252, left: 0, right: 0, textAlign: 'center',
        fontFamily: fonts.mono, fontSize: 30, letterSpacing: '0.18em',
        color: 'rgba(255,255,255,0.50)', opacity: labelIn, zIndex: 30,
      }}>
        ¿POR QUÉ TU CLIENTE "NO VENDE MÁS"?
      </div>

      <AbsoluteFill style={{ opacity: 1 - pay }}>

        {/* Fase 1: la persona sola */}
        <AbsoluteFill style={{ opacity: (1 - phase1Fade) }}>
          {/* Avatar central */}
          <div style={{
            position: 'absolute', top: 390, left: 0, right: 0,
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            opacity: personIn,
          }}>
            <div style={{
              width: 160, height: 160, borderRadius: '50%',
              background: 'rgba(255,255,255,0.06)',
              border: '2px solid rgba(255,255,255,0.14)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: 20,
              position: 'relative',
            }}>
              <div style={{ fontFamily: fonts.display, fontSize: 80 }}>😔</div>

              {/* Stamp "FLOJO" */}
              {stampIn > 0.05 && (
                <div style={{
                  position: 'absolute', top: -18, right: -48,
                  background: `${RED}22`,
                  border: `2px solid ${RED}88`,
                  borderRadius: 12, padding: '8px 18px',
                  fontFamily: fonts.display, fontWeight: 900, fontSize: 32,
                  color: RED,
                  transform: `rotate(${-12}deg) scale(${0.5 + stampIn * 0.5})`,
                  opacity: stampIn,
                  textShadow: `0 0 12px ${RED}66`,
                }}>
                  FLOJO
                </div>
              )}
            </div>

            <div style={{
              fontFamily: fonts.display, fontWeight: 600, fontSize: 46,
              color: 'rgba(255,255,255,0.55)',
            }}>
              "No vende más por flojo."
            </div>
            <div style={{
              fontFamily: fonts.mono, fontSize: 28, color: 'rgba(255,255,255,0.28)',
              letterSpacing: '0.1em', marginTop: 12,
            }}>
              ← Lo que pensamos al instante
            </div>
          </div>
        </AbsoluteFill>

        {/* Fase 2: las circunstancias */}
        <AbsoluteFill style={{ opacity: phase2 }}>
          {/* Avatar central con glow */}
          <div style={{
            position: 'absolute', top: 560, left: 0, right: 0,
            display: 'flex', justifyContent: 'center',
          }}>
            <div style={{ position: 'relative' }}>
              {reframeGlow > 0.01 && (
                <SiriGlow frame={f} intensity={reframeGlow * 0.7} radius={80} inset={-16} />
              )}
              <div style={{
                width: 140, height: 140, borderRadius: '50%',
                background: `${GOLD}18`,
                border: `2px solid ${GOLD}55`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <div style={{ fontFamily: fonts.display, fontSize: 70 }}>👤</div>
              </div>
            </div>
          </div>

          {/* Circunstancias alrededor */}
          {CIRCUMSTANCES.map((circ, i) => {
            const angle = (i / CIRCUMSTANCES.length) * Math.PI * 2 - Math.PI / 2;
            const radius = 320;
            const cx = 540 + Math.cos(angle) * radius;
            const cy = 760 + Math.sin(angle) * radius;
            const cIn = circIn(i);

            return (
              <div key={i} style={{
                position: 'absolute',
                left: cx - 168, top: cy - 36,
                opacity: cIn,
                transform: `scale(${0.7 + cIn * 0.3})`,
              }}>
                <div style={{
                  background: `${GOLD}15`,
                  border: `1px solid ${GOLD}33`,
                  borderRadius: 14, padding: '12px 22px',
                  fontFamily: fonts.display, fontWeight: 600, fontSize: 28,
                  color: `rgba(255,255,255,0.7)`,
                  whiteSpace: 'nowrap',
                }}>
                  {circ}
                </div>
              </div>
            );
          })}

          {/* El reencuadre */}
          {reframeIn > 0.01 && (
            <div style={{
              position: 'absolute', bottom: 448, left: 90, right: 130,
              opacity: reframeIn,
              transform: `translateY(${(1 - reframeIn) * 20}px)`,
            }}>
              <Glass w={860} selected style={{ position: 'relative', textAlign: 'center' }}>
                {reframeGlow > 0.01 && (
                  <SiriGlow frame={f} intensity={reframeGlow * 0.7} radius={34} inset={0} />
                )}
                <div style={{ fontFamily: fonts.mono, fontSize: 24, color: GOLD, letterSpacing: '0.1em', marginBottom: 12 }}>
                  EL CONTEXTO REAL
                </div>
                <div style={{ fontFamily: fonts.display, fontWeight: 700, fontSize: 44, color: '#F4F4FA' }}>
                  No es flojo. Le faltan las herramientas.
                </div>
              </Glass>
            </div>
          )}
        </AbsoluteFill>
      </AbsoluteFill>

      {/* PAYOFF */}
      <AbsoluteFill style={{
        alignItems: 'center', justifyContent: 'center', textAlign: 'center',
        paddingLeft: 90, paddingRight: 130, opacity: pay, zIndex: 200,
      }}>
        <SiriFrame frame={f} intensity={pay} />
        <div style={{ transform: `translateY(${(1 - pay) * 26}px)` }}>
          <BigType frame={f} s={216} size={92} lines={[
            { t: 'No es flojo.' },
            { t: 'El contexto' },
            { t: 'lo frenó.', hl: true },
          ]} />
          <div style={{
            fontFamily: fonts.display, fontWeight: 400, fontSize: 38,
            color: '#9A9AB5', marginTop: 32,
            opacity: ip(f, 260, 280, 0, 1),
          }}>
            Vendé desde el contexto del cliente, no desde su carácter.
          </div>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};
