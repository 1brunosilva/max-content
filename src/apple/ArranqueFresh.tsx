/**
 * ArranqueFresh — Fresh Start Effect / Temporal Landmarks.
 * El lunes, el 1 de mes, el 1 de año disparan motivación real.
 * Timeline de días → el LUNES explota con glow → "los hitos temporales son poder".
 * Lever: fresh start effect / temporal landmarks. Palette: cyan-verde. Mode: glassy-oscuro. C.
 */
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { Stage, SiriGlow, SiriFrame, BigType, ip, fonts } from './kit';

const GREEN  = '#10B981';
const GREEN_L = '#6EE7B7';
const CYAN   = '#4FE0FF';

const DAYS = ['JUE', 'VIE', 'SÁB', 'DOM', 'LUN', 'MAR', 'MIÉ'];
const LANDMARKS = [
  { label: '1 DE MES',   y: 900,  delay: 68  },
  { label: 'AÑO NUEVO',  y: 1020, delay: 88  },
];

export const ARRANCUEFRESH_DURATION = 272;

export const ArranqueFresh: React.FC = () => {
  const f = useCurrentFrame();

  const titleOp  = ip(f, 8, 24, 0, 1) * (1 - ip(f, 188, 205, 0, 1));
  const daysIn   = ip(f, 18, 48, 0, 1);
  const mondayG  = ip(f, 60, 90, 0, 1);
  const barUp    = ip(f, 72, 115, 0, 1);
  const pay      = ip(f, 196, 224, 0, 1);

  const mondayIdx = 4;

  return (
    <Stage
      bg="radial-gradient(130% 90% at 50% 40%, #020E0A 0%, #010706 80%)"
      hue={GREEN}
      seed={11}
    >
      {/* Title */}
      <div style={{
        position: 'absolute', top: 240, left: 90, right: 130, textAlign: 'center',
        fontFamily: fonts.mono, fontSize: 19, letterSpacing: '0.16em',
        color: `${GREEN_L}77`, opacity: titleOp,
      }}>
        ¿POR QUÉ EL LUNES SENTÍS QUE TODO CAMBIA?
      </div>

      <AbsoluteFill style={{ opacity: 1 - pay }}>
        <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 28, alignItems: 'center', width: 800 }}>

            {/* Calendar row */}
            <div style={{ display: 'flex', gap: 12, opacity: daysIn }}>
              {DAYS.map((d, i) => {
                const isMonday = i === mondayIdx;
                const glow = isMonday ? mondayG : 0;
                return (
                  <div key={i} style={{ position: 'relative', width: 96, height: 108 }}>
                    {glow > 0.05 ? (
                      <div style={{ position: 'absolute', inset: -4, borderRadius: 22 }}>
                        <SiriGlow frame={f} intensity={glow * 0.9} radius={20} />
                      </div>
                    ) : null}
                    <div style={{
                      width: '100%', height: '100%', borderRadius: 18,
                      background: isMonday
                        ? (glow > 0.2 ? 'linear-gradient(165deg,#032418 0%,#01140D 100%)' : 'rgba(16,185,129,0.08)')
                        : 'rgba(255,255,255,0.04)',
                      border: `1.5px solid ${isMonday ? (glow > 0.2 ? GREEN + 'CC' : GREEN + '55') : 'rgba(255,255,255,0.1)'}`,
                      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6,
                      boxShadow: glow > 0.2 ? `0 0 40px ${GREEN}55` : 'none',
                      transition: 'background 0.4s, border 0.4s',
                    }}>
                      <div style={{
                        fontFamily: fonts.mono, fontSize: 14, letterSpacing: '0.14em',
                        color: isMonday ? (glow > 0.2 ? GREEN_L : `${GREEN_L}88`) : 'rgba(255,255,255,0.28)',
                      }}>{d}</div>
                      <div style={{
                        fontFamily: fonts.display, fontWeight: 900, fontSize: 38,
                        color: isMonday ? (glow > 0.2 ? GREEN_L : `${GREEN_L}66`) : 'rgba(255,255,255,0.35)',
                        letterSpacing: '-0.03em',
                        textShadow: isMonday && glow > 0.2 ? `0 0 20px ${GREEN}AA` : 'none',
                      }}>{[2,3,4,5,6,7,8][i]}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Motivation bar — spikes on Monday */}
            <div style={{ width: '100%', opacity: daysIn }}>
              <div style={{ fontFamily: fonts.mono, fontSize: 16, letterSpacing: '0.14em', color: `${GREEN_L}66`, marginBottom: 10, textAlign: 'center' }}>
                MOTIVACIÓN PARA EMPEZAR ALGO NUEVO
              </div>
              <div style={{ height: 18, borderRadius: 9, background: 'rgba(255,255,255,0.06)', overflow: 'visible', position: 'relative' }}>
                <div style={{
                  height: '100%', borderRadius: 9, position: 'relative',
                  background: `linear-gradient(90deg, rgba(16,185,129,0.22) 0%, rgba(16,185,129,0.22) 57%, ${GREEN} 57%, ${GREEN_L} 74%, rgba(16,185,129,0.22) 74%)`,
                  width: `${barUp * 100}%`,
                }}>
                  <div style={{
                    position: 'absolute', right: 0, top: '50%', transform: 'translate(50%,-50%)',
                    width: 22, height: 22, borderRadius: '50%',
                    background: GREEN_L,
                    boxShadow: mondayG > 0.2 ? `0 0 22px ${GREEN}EE` : 'none',
                  }} />
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
                {DAYS.map((d, i) => (
                  <div key={i} style={{
                    fontFamily: fonts.mono, fontSize: 14, width: 96, textAlign: 'center',
                    color: i === mondayIdx ? GREEN_L : 'rgba(255,255,255,0.22)',
                  }}>{d}</div>
                ))}
              </div>
            </div>

            {/* Landmark labels */}
            {LANDMARKS.map((lm, i) => (
              <div key={i} style={{
                opacity: ip(f, lm.delay, lm.delay + 20, 0, 1) * (1 - ip(f, 188, 205, 0, 1)),
                transform: `translateX(${ip(f, lm.delay, lm.delay + 20, -16, 0)}px)`,
              }}>
                <div style={{
                  fontFamily: fonts.mono, fontSize: 20, letterSpacing: '0.14em',
                  color: `${CYAN}BB`, textAlign: 'center',
                }}>
                  También funciona el {lm.label}
                </div>
              </div>
            ))}
          </div>
        </AbsoluteFill>
      </AbsoluteFill>

      {/* Payoff */}
      <AbsoluteFill style={{
        alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', padding: '0 96px',
        opacity: pay, zIndex: 200,
      }}>
        <SiriFrame frame={f} intensity={pay} />
        <div style={{ transform: `translateY(${(1 - pay) * 28}px)` }}>
          <BigType frame={f} s={196} size={88} lines={[
            { t: 'Los hitos' },
            { t: 'temporales', hl: true },
            { t: 'son palancas.' },
          ]} />
          <div style={{
            fontFamily: fonts.display, fontSize: 28,
            color: `${GREEN_L}77`, marginTop: 28,
            opacity: ip(f, 236, 256, 0, 1),
          }}>
            Lanzá los lunes. Abrí los meses.
          </div>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};
