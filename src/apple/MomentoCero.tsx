/**
 * MomentoCero — Zero Moment of Truth. Un timeline horizontal del journey del cliente:
 * busca, compara, lee reseñas, decide. El punto de decisión se ilumina con Siri glow.
 * DESPUÉS aparece "Recibe tu consulta" (donde el dueño cree que empieza).
 * El espectador VIVE la distancia: la venta ocurrió antes que él supiera.
 *
 * Lever: ZMOT / customer decision journey. Paleta: cyan-azul. Modo: editorial-claro. C.
 */
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { Stage, SiriGlow, SiriFrame, BigType, ip, fonts } from './kit';

export const MOMENTOCERO_DURATION = 320;

const CYAN = '#4FE0FF';
const CYAN_D = '#0891B2';

const STEPS = [
  { label: 'Busca en Google', sub: '¿quién me puede ayudar?' },
  { label: 'Lee 3 comparaciones', sub: 'tu competencia incluida' },
  { label: 'Ve las reseñas', sub: '47 opiniones en 8 minutos' },
  { label: 'Hace su lista corta', sub: 'ya eliminó el 80%' },
  { label: 'TOMA LA DECISIÓN', sub: 'el verdadero momento cero', highlight: true },
  { label: 'Contacta un proveedor', sub: 'donde vos creés que empieza', late: true },
];

export const MomentoCero: React.FC = () => {
  const f = useCurrentFrame();

  const labelOp = ip(f, 8, 28, 0, 1) * (1 - ip(f, 230, 248, 0, 1));
  const pay = ip(f, 258, 290, 0, 1);

  const lineProgress = ip(f, 30, 160, 0, 1); // línea del timeline crece

  const NODE_Y = 960; // vertical center of nodes
  const FIRST_X = 120;
  const STEP_W = 156; // spacing between nodes

  return (
    <Stage
      bg="radial-gradient(130% 90% at 50% 50%, #03141A 0%, #010608 80%)"
      hue={CYAN}
      seed={14}
    >
      {/* Label superior */}
      <div style={{
        position: 'absolute', top: 250, left: 0, right: 0, textAlign: 'center',
        fontFamily: fonts.mono, fontSize: 38, letterSpacing: '0.18em',
        color: 'rgba(79,224,255,0.72)', opacity: labelOp, zIndex: 30,
      }}>
        EL JOURNEY REAL DEL CLIENTE
      </div>

      {/* TIMELINE */}
      <AbsoluteFill style={{ opacity: 1 - pay }}>
        {/* Línea base */}
        <div style={{
          position: 'absolute', top: NODE_Y, left: FIRST_X, right: 90,
          height: 3, background: 'rgba(79,224,255,0.12)', borderRadius: 2,
        }} />
        {/* Línea que crece */}
        <div style={{
          position: 'absolute', top: NODE_Y, left: FIRST_X, height: 3, borderRadius: 2,
          width: `${lineProgress * (1080 - FIRST_X - 90)}px`,
          background: `linear-gradient(90deg, ${CYAN_D}, ${CYAN})`,
          boxShadow: `0 0 12px ${CYAN}88`,
          transition: 'none',
        }} />

        {/* Nodos */}
        {STEPS.map((step, i) => {
          const xPos = FIRST_X + i * STEP_W;
          const nodeReveal = ip(f, 30 + i * 20, 50 + i * 20, 0, 1);
          const isHighlight = step.highlight;
          const isLate = step.late;

          const glowI = isHighlight ? ip(f, 130, 162, 0, 1) : 0;
          const nodeScale = 1 + (isHighlight ? glowI * 0.22 : 0);

          const subOp = ip(f, 50 + i * 20, 72 + i * 20, 0, 1);

          const nodeColor = isHighlight ? CYAN : isLate ? '#FF5A6E' : `rgba(79,224,255,${0.4 + i * 0.06})`;
          const nodeSize = isHighlight ? 36 : 24;

          return (
            <div key={i}>
              {/* Nodo */}
              <div style={{
                position: 'absolute',
                left: xPos - nodeSize / 2,
                top: NODE_Y - nodeSize / 2,
                width: nodeSize, height: nodeSize, borderRadius: '50%',
                background: isHighlight ? CYAN : isLate ? '#FF5A6E33' : `${CYAN}33`,
                border: `2px solid ${nodeColor}`,
                opacity: nodeReveal,
                transform: `scale(${nodeScale})`,
                zIndex: 10,
              }}>
                {isHighlight && (
                  <SiriGlow frame={f} intensity={glowI * 0.8} radius={18} />
                )}
              </div>

              {/* Label (alterna arriba/abajo para no pisar) */}
              <div style={{
                position: 'absolute',
                left: xPos - 60,
                top: i % 2 === 0 ? NODE_Y - 170 : NODE_Y + 56,
                width: 120,
                opacity: nodeReveal * subOp,
                textAlign: 'center',
              }}>
                <div style={{
                  fontFamily: fonts.mono,
                  fontSize: isHighlight ? 22 : 17,
                  fontWeight: isHighlight ? 700 : 400,
                  color: isHighlight ? CYAN : isLate ? '#FF5A6E' : 'rgba(255,255,255,0.7)',
                  letterSpacing: '0.06em',
                  lineHeight: 1.3,
                  textShadow: isHighlight ? `0 0 20px ${CYAN}` : 'none',
                }}>
                  {step.label}
                </div>
                <div style={{
                  fontFamily: fonts.display, fontSize: 24, color: 'rgba(255,255,255,0.4)',
                  marginTop: 6, lineHeight: 1.3,
                }}>
                  {step.sub}
                </div>
              </div>

              {/* Flecha "donde vos creés que empieza" en el último nodo */}
              {isLate && nodeReveal > 0.5 && (
                <div style={{
                  position: 'absolute',
                  left: xPos - 90, top: NODE_Y - 300,
                  width: 180, textAlign: 'center',
                  opacity: ip(f, 150, 175, 0, 1),
                }}>
                  <div style={{ fontFamily: fonts.mono, fontSize: 20, color: '#FF5A6E', letterSpacing: '0.06em' }}>
                    ← DÓNDE VOS<br />CREÉS QUE<br />EMPIEZA
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* Texto de realización */}
        <div style={{
          position: 'absolute', bottom: 480, left: 90, right: 130,
          textAlign: 'center',
          opacity: ip(f, 185, 210, 0, 1) * (1 - pay),
        }}>
          <div style={{
            fontFamily: fonts.display, fontWeight: 700, fontSize: 68,
            color: '#F4F4FA', letterSpacing: '-0.02em', lineHeight: 1.15,
          }}>
            El cliente ya decidió<br />antes de hablar con vos.
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
          <BigType frame={f} s={258} size={88} lines={[
            { t: 'La venta ocurre' },
            { t: 'donde vos', hl: false },
            { t: 'no estás todavía.', hl: true },
          ]} />
          <div style={{
            fontFamily: fonts.display, fontWeight: 400, fontSize: 42, color: '#9A9AB5',
            marginTop: 32, opacity: ip(f, 296, 316, 0, 1),
          }}>
            ¿Qué dice Google sobre vos cuando no estás en la sala?
          </div>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};
