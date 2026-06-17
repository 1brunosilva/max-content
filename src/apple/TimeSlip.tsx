/**
 * TimeSlip — mecanismo: los AÑOS viajan hacia la cámara por el eje Z, uno tras otro,
 * cada uno con la misma excusa, ACELERANDO. De golpe frenan en el año que todavía no
 * llegó, donde la excusa se vuelve arrepentimiento (glow de alarma). El mecanismo te
 * hace VIVIR el paso del tiempo (regla de oro: el mecanismo encarna el mensaje).
 *
 * Lever: Regret Aversion + Present Bias. El miedo a arrepentirse mueve más que el deseo
 * de ganar. Arco: Hook (reconocés la excusa) → Tensión (los años pasan) → Cierre (regret).
 * Sin precio, sin chatbot, sin reciclar copy viejo. ADN del kit.
 */
import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from 'remotion';
import { Stage, SiriGlow, SiriFrame, BigType, ip, fonts, VLT, VLT_L } from './kit';

const CL = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;

const YEARS = [
  { year: '2024', excuse: '«Es para las grandes.»' },
  { year: '2025', excuse: '«Todavía está cara.»' },
  { year: '2026', excuse: '«Hay que ver cómo evoluciona.»' },
  { year: '2027', excuse: '¿Cómo llegamos tan tarde?', alarm: true },
];
const STEP = 1300;            // separación de los años en profundidad (Z)
const CW = 760, CH = 430;

export const TIMESLIP_DURATION = 310;

export const TimeSlip: React.FC = () => {
  const f = useCurrentFrame();

  // la cámara viaja por el tiempo: PARA en cada año un beat (se lee la excusa) y
  // acelera de a poco (dwell largo en 2024 → más cortos) hasta frenar en 2027.
  const cameraZ = interpolate(
    f,
    [12, 42, 74, 96, 122, 138, 160],
    [0, 0, STEP, STEP, 2 * STEP, 2 * STEP, 3 * STEP],
    { ...CL, easing: Easing.inOut(Easing.cubic) },
  );
  const glowI = ip(f, 164, 198, 0, 1);     // alarma se enciende al frenar en 2027
  const pay = ip(f, 218, 252, 0, 1);
  const labelOp = ip(f, 6, 22, 0, 1) * (1 - ip(f, 202, 218, 0, 1));

  return (
    <Stage bg="radial-gradient(125% 95% at 50% 40%, #14131B 0%, #050507 78%)" hue={VLT} seed={4} perspective={1500}>
      <div style={{
        position: 'absolute', top: 132, left: 0, right: 0, textAlign: 'center',
        fontFamily: fonts.mono, fontSize: 24, letterSpacing: '0.18em',
        color: 'rgba(255,255,255,0.72)', opacity: labelOp, zIndex: 40,
      }}>
        TODOS LOS AÑOS · LA MISMA EXCUSA
      </div>

      {/* el viaje por los años — se desvanece al entrar el payoff (GOTCHA) */}
      <AbsoluteFill style={{ opacity: 1 - pay, transformStyle: 'preserve-3d' }}>
        {YEARS.map((y, i) => {
          const z = -i * STEP + cameraZ;                       // posición de cada año respecto a cámara
          const appear = interpolate(z, [-1.2 * STEP, -0.4 * STEP], [0, 1], CL); // surge al acercarse (el de atrás queda tenue)
          const passFade = interpolate(z, [150, 560], [1, 0], CL);                // se desvanece al pasar de largo
          const op = appear * passFade;
          const blur = interpolate(z, [150, 560], [0, 16], CL);
          const isLast = !!y.alarm;
          return (
            <AbsoluteFill key={i} style={{ alignItems: 'center', justifyContent: 'center', transformStyle: 'preserve-3d' }}>
              <div style={{
                position: 'relative', width: CW, height: CH,
                transform: `translateZ(${z}px)`,
                opacity: op, filter: blur > 0.3 ? `blur(${blur}px)` : 'none',
              }}>
                {isLast ? <SiriGlow frame={f} intensity={glowI} radius={36} /> : null}
                <div style={{
                  position: 'absolute', inset: 0, borderRadius: 36, padding: 56,
                  display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 18,
                  background: isLast
                    ? 'linear-gradient(165deg, rgba(38,20,26,0.93) 0%, rgba(18,10,14,0.94) 100%)'
                    : 'linear-gradient(165deg, rgba(22,22,28,0.92) 0%, rgba(11,11,15,0.92) 100%)',
                  border: `1px solid ${isLast ? '#FF5A5A88' : 'rgba(255,255,255,0.10)'}`,
                  boxShadow: '0 50px 130px -40px rgba(0,0,0,0.9)',
                }}>
                  <div style={{
                    fontFamily: fonts.display, fontWeight: 800, fontSize: 120, lineHeight: 0.9,
                    letterSpacing: '-0.04em',
                    color: isLast ? '#FF5A5A' : '#52525E',
                    textShadow: isLast ? '0 0 50px rgba(255,90,90,0.6)' : 'none',
                  }}>{y.year}</div>
                  <div style={{
                    fontFamily: fonts.display, fontWeight: isLast ? 700 : 500, fontSize: isLast ? 44 : 38,
                    letterSpacing: '-0.02em', color: isLast ? '#F6EEF0' : '#9A9AAA',
                  }}>{y.excuse}</div>
                </div>
              </div>
            </AbsoluteFill>
          );
        })}
      </AbsoluteFill>

      {/* PAYOFF */}
      <AbsoluteFill style={{
        alignItems: 'center', justifyContent: 'center', textAlign: 'center',
        padding: 96, opacity: pay, zIndex: 200,
      }}>
        <SiriFrame frame={f} intensity={pay} />
        <div style={{ transform: `translateY(${(1 - pay) * 26}px)` }}>
          <BigType frame={f} s={218} size={86} lines={[
            { t: 'El año que viene' },
            { t: 'vas a desear' },
            { t: 'haber empezado hoy.', hl: true },
          ]} />
          <div style={{
            fontFamily: fonts.display, fontSize: 34, color: '#9A9AB5',
            marginTop: 32, opacity: ip(f, 262, 286, 0, 1),
          }}>
            La excusa de hoy es el arrepentimiento de mañana.
          </div>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};
