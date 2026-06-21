/**
 * VentajaInvisible — Hidden value / iceberg effect. Un negocio visible (la fachada)
 * parece simple. La cámara baja revelando 4 capas que trabajan invisibles debajo:
 * automatizaciones, seguimientos, datos, alertas. El espectador descubre que el 95%
 * del valor está donde nadie mira.
 *
 * Lever: iceberg effect / hidden value perception. Paleta: azul-midnight. Modo: midnight-línea. V.
 */
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { Stage, Glass, SiriGlow, SiriFrame, BigType, ip, fonts } from './kit';

export const VENTAJAINVISIBLE_DURATION = 310;

const BLUE = '#3B82F6';
const BLUE_L = '#60A5FA';
const INDIGO = '#6366F1';

const LAYERS = [
  { icon: '⚡', label: 'Respuestas automáticas 24/7', sub: 'El cliente recibe respuesta. Siempre.', color: BLUE_L },
  { icon: '🔔', label: 'Seguimiento de clientes perdidos', sub: 'Sin perder ni uno.', color: INDIGO },
  { icon: '📊', label: 'Reportes que se construyen solos', sub: 'Sabés qué está funcionando.', color: '#8B5CF6' },
  { icon: '🎯', label: 'Alertas de oportunidades', sub: 'Te avisamos antes de que se enfríen.', color: '#EC4899' },
];

const CW = 780, CH = 130, GAP = 16;

export const VentajaInvisible: React.FC = () => {
  const f = useCurrentFrame();

  const surfaceIn = ip(f, 8, 44, 0, 1);
  const surfaceLabel = ip(f, 12, 30, 0, 1) * (1 - ip(f, 92, 108, 0, 1));

  // La "cámara" baja — parallax reveal de las capas
  const panDown = ip(f, 78, 170, 0, 1);

  // Separador "LA SUPERFICIE" vs "LO QUE TRABAJA ABAJO"
  const dividerIn = ip(f, 90, 118, 0, 1) * (1 - ip(f, 228, 248, 0, 1));

  const pay = ip(f, 248, 280, 0, 1);

  // El canvas total se desplaza hacia arriba revelando las capas
  const sceneShift = panDown * -600;

  return (
    <Stage
      bg="radial-gradient(130% 92% at 50% 44%, #020818 0%, #010308 80%)"
      hue={BLUE}
      seed={13}
    >
      <AbsoluteFill style={{ overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, transform: `translateY(${sceneShift}px)` }}>

          {/* SUPERFICIE — el negocio visible */}
          <div style={{
            position: 'absolute', top: 480, left: (1080 - CW) / 2,
            opacity: surfaceIn * (1 - pay),
          }}>
            {/* Label "Lo que el cliente ve" */}
            <div style={{
              textAlign: 'center', fontFamily: fonts.mono, fontSize: 32,
              letterSpacing: '0.18em', color: 'rgba(255,255,255,0.58)',
              marginBottom: 20, opacity: surfaceLabel,
            }}>
              LO QUE EL CLIENTE VE
            </div>

            <Glass w={CW} h={200} selected={false} pad={44} style={{ justifyContent: 'center' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: fonts.mono, fontSize: 26, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em', marginBottom: 12 }}>
                  TU NEGOCIO
                </div>
                <div style={{
                  fontFamily: fonts.display, fontWeight: 700, fontSize: 64,
                  color: '#F4F4FA', letterSpacing: '-0.02em',
                }}>
                  "Atención al cliente"
                </div>
              </div>
            </Glass>

            {/* Porcentaje */}
            <div style={{
              textAlign: 'center', marginTop: 16, fontFamily: fonts.mono,
              fontSize: 28, color: 'rgba(255,255,255,0.36)',
              opacity: surfaceLabel,
            }}>
              5% del valor real
            </div>
          </div>

          {/* LÍNEA DIVISORA */}
          <div style={{
            position: 'absolute', top: 730, left: 90, right: 90,
            height: 2, opacity: dividerIn,
            background: `linear-gradient(90deg, transparent, ${BLUE}88, transparent)`,
          }} />
          <div style={{
            position: 'absolute', top: 748, left: 0, right: 0,
            textAlign: 'center', fontFamily: fonts.mono, fontSize: 26,
            letterSpacing: '0.18em', color: `${BLUE_L}88`, opacity: dividerIn,
          }}>
            LO QUE TRABAJA ABAJO
          </div>

          {/* CAPAS INVISIBLES */}
          {LAYERS.map((layer, i) => {
            const layerReveal = ip(f, 88 + i * 22, 118 + i * 22, 0, 1);
            const glowI = ip(f, 108 + i * 22, 138 + i * 22, 0, 1) * 0.6;

            return (
              <div key={i} style={{
                position: 'absolute',
                top: 800 + i * (CH + GAP),
                left: (1080 - CW) / 2,
                opacity: layerReveal * (1 - pay),
                transform: `translateX(${(1 - layerReveal) * -30}px)`,
              }}>
                <div style={{ position: 'relative' }}>
                  <SiriGlow frame={f} intensity={glowI} radius={22} />
                  <Glass w={CW} h={CH} selected={false} pad={30} style={{ borderColor: `${layer.color}44` }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
                      <div style={{
                        width: 56, height: 56, borderRadius: 16,
                        background: `${layer.color}18`, border: `1px solid ${layer.color}55`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 28, flexShrink: 0,
                      }}>
                        {layer.icon}
                      </div>
                      <div>
                        <div style={{ fontFamily: fonts.display, fontWeight: 700, fontSize: 40, color: layer.color }}>{layer.label}</div>
                        <div style={{ fontFamily: fonts.display, fontSize: 30, color: 'rgba(255,255,255,0.45)', marginTop: 2 }}>{layer.sub}</div>
                      </div>
                    </div>
                  </Glass>
                </div>
              </div>
            );
          })}

          {/* Porcentaje capas */}
          <div style={{
            position: 'absolute',
            top: 800 + LAYERS.length * (CH + GAP) + 20,
            left: 0, right: 0,
            textAlign: 'center', fontFamily: fonts.mono,
            fontSize: 28, color: `${BLUE_L}66`,
            opacity: ip(f, 158, 180, 0, 1) * (1 - pay),
          }}>
            95% del valor real
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
          <BigType frame={f} s={248} size={88} lines={[
            { t: 'Lo que ven es el 5%.' },
            { t: 'Lo que trabaja', hl: false },
            { t: 'mientras dormís,', hl: false },
            { t: 'el 95%.', hl: true },
          ]} />
        </div>
      </AbsoluteFill>
    </Stage>
  );
};
