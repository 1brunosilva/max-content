/**
 * EfectoFoco — Spotlight Effect. El dueño cree que TODOS ven sus errores.
 * Un "ojo" de luz enorme ilumina el negocio desde arriba. Lentamente se achica:
 * el cliente solo "ve" el 10% de lo que el dueño cree que notan. El 90% restante
 * está en sombra — invisible para el cliente, agonizante para el dueño.
 *
 * Lever: spotlight effect (overestimate how much others notice us). Paleta: violeta. C.
 */
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { Stage, SiriFrame, BigType, ip, fonts, VLT, VLT_L } from './kit';

export const EFECTOFOCO_DURATION = 308;

export const EfectoFoco: React.FC = () => {
  const f = useCurrentFrame();

  const labelOp = ip(f, 8, 28, 0, 1) * (1 - ip(f, 230, 248, 0, 1));

  // El "ojo del dueño": circulo de luz grande
  const eyeIn = ip(f, 22, 58, 0, 1);
  // El ojo se achica (el cliente ve mucho menos)
  const eyeShrink = ip(f, 80, 148, 0, 1);

  // Porcentaje visible para el cliente
  const pctVisible = ip(f, 90, 150, 100, 10);

  // Lista de errores que el dueño cree que todos ven
  const worryIn = ip(f, 30, 80, 0, 1);
  const worryFade = ip(f, 90, 140, 0, 1);

  // Label revelación
  const revealIn = ip(f, 155, 185, 0, 1) * (1 - ip(f, 230, 245, 0, 1));

  const pay = ip(f, 238, 274, 0, 1);

  const WORRIES = [
    'El typo del lunes', 'La respuesta lenta', 'El logo no ideal',
    'El precio sin actualizar', 'La foto sin luz', 'El post sin likes',
  ];

  // Tamaño del ojo (radio en px, 1080 ancho)
  const eyeRadius = ip(f, 80, 148, 440, 68);

  return (
    <Stage
      bg="radial-gradient(130% 92% at 50% 44%, #0E0A1A 0%, #060408 80%)"
      hue={VLT}
      seed={7}
    >
      {/* Label */}
      <div style={{
        position: 'absolute', top: 252, left: 0, right: 0, textAlign: 'center',
        fontFamily: fonts.mono, fontSize: 34, letterSpacing: '0.16em',
        color: 'rgba(255,255,255,0.58)', opacity: labelOp, zIndex: 30,
      }}>
        LO QUE CREÉS QUE TODOS VEN
      </div>

      <AbsoluteFill style={{ opacity: 1 - pay }}>
        {/* Ojo / Spotlight visual */}
        <div style={{
          position: 'absolute',
          top: 960 - eyeRadius * eyeIn,
          left: 540 - eyeRadius,
          width: eyeRadius * 2,
          height: eyeRadius * eyeIn * 2,
          opacity: eyeIn,
          pointerEvents: 'none',
        }}>
          <div style={{
            width: '100%', height: '100%', borderRadius: '50%',
            background: `radial-gradient(circle, ${VLT_L}1A 0%, ${VLT}0A 60%, transparent 80%)`,
            border: `2px solid ${VLT}${Math.round(eyeIn * 120).toString(16).padStart(2, '0')}`,
            boxShadow: `0 0 80px ${VLT}44, 0 0 180px ${VLT}22`,
          }} />
          {/* Porcentaje dentro del ojo */}
          <div style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
          }}>
            <div style={{
              fontFamily: fonts.display, fontWeight: 800,
              fontSize: Math.max(48, eyeRadius * 0.28),
              color: VLT_L,
              textShadow: `0 0 30px ${VLT}AA`,
              lineHeight: 1,
            }}>
              {Math.round(pctVisible)}%
            </div>
            <div style={{
              fontFamily: fonts.mono, fontSize: Math.max(20, eyeRadius * 0.10),
              color: `${VLT_L}88`, letterSpacing: '0.1em', marginTop: 6,
            }}>
              el cliente ve esto
            </div>
          </div>
        </div>

        {/* Lista de preocupaciones del dueño */}
        <div style={{
          position: 'absolute', top: 350, left: 90, right: 130,
          opacity: worryIn * (1 - worryFade * 0.85),
          display: 'flex', flexDirection: 'column', gap: 14,
        }}>
          <div style={{
            fontFamily: fonts.mono, fontSize: 26, color: `${VLT_L}88`,
            letterSpacing: '0.10em', marginBottom: 8,
          }}>
            EL DUEÑO PIENSA:
          </div>
          {WORRIES.map((w, i) => {
            const wIn = ip(f, 34 + i * 7, 55 + i * 7, 0, 1);
            return (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 18,
                opacity: wIn,
                transform: `translateX(${(1 - wIn) * -18}px)`,
              }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: VLT_L, flexShrink: 0 }} />
                <div style={{
                  fontFamily: fonts.display, fontWeight: 500, fontSize: 36,
                  color: 'rgba(255,255,255,0.72)',
                }}>
                  {w}
                </div>
              </div>
            );
          })}
        </div>

        {/* Label revelación */}
        <div style={{
          position: 'absolute', bottom: 455, left: 0, right: 0, textAlign: 'center',
          opacity: revealIn * eyeShrink,
        }}>
          <div style={{
            fontFamily: fonts.display, fontWeight: 700, fontSize: 44,
            color: VLT_L, textShadow: `0 0 30px ${VLT}BB`,
          }}>
            El cliente no lo notó.
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
          <BigType frame={f} s={238} size={94} lines={[
            { t: 'El ojo más crítico' },
            { t: 'sobre tu negocio' },
            { t: 'es el tuyo.', hl: true },
            { t: 'El cliente ni lo vio.', hl: false },
          ]} />
          <div style={{
            fontFamily: fonts.display, fontWeight: 400, fontSize: 38, color: '#9A9AB5',
            marginTop: 30, opacity: ip(f, 278, 300, 0, 1),
          }}>
            Menos autocrítica. Más acción.
          </div>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};
