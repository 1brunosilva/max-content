/**
 * UmbralCambio — Weber-Fechner / Just Noticeable Difference.
 * Las mejoras graduales pasan desapercibidas. Solo se nota cuando se cruza el UMBRAL.
 * Una barra sube despacio sin que nadie lo perciba → cruza el umbral → GLOW.
 * Lever: JND / threshold effect / Weber-Fechner law. Palette: crema/violeta. Mode: editorial-claro. C.
 */
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { Stage, SiriGlow, SiriFrame, BigType, ip, fonts, VLT, VLT_L } from './kit';

const DARK   = '#1E1233';
const VIOLET = VLT;
const VIOLET_L = VLT_L;

export const UMBRALCAMBIO_DURATION = 270;

export const UmbralCambio: React.FC = () => {
  const f = useCurrentFrame();

  const titleOp    = ip(f, 6, 22, 0, 1) * (1 - ip(f, 182, 198, 0, 1));
  const barIn      = ip(f, 18, 36, 0, 1);
  const slowPhase  = ip(f, 36, 128, 0, 62);
  const threshLine = ip(f, 48, 66, 0, 1) * (1 - ip(f, 182, 198, 0, 1));
  const crossI     = ip(f, 128, 148, 0, 1);
  const glowI      = ip(f, 134, 162, 0, 1);
  const blastPhase = ip(f, 148, 172, 0, 80);
  const insightOp  = ip(f, 162, 180, 0, 1) * (1 - ip(f, 182, 198, 0, 1));
  const pay        = ip(f, 190, 218, 0, 1);

  const barPercent = crossI > 0 ? 62 + blastPhase : slowPhase;
  const threshold  = 65;
  const hasCrossed = barPercent >= threshold;

  const steps = [
    { label: 'Semana 1', val: 8,  frame: 36  },
    { label: 'Semana 2', val: 21, frame: 64  },
    { label: 'Semana 3', val: 44, frame: 92  },
    { label: 'Semana 4', val: 62, frame: 120 },
    { label: 'Semana 5', val: 91, frame: 148 },
  ];

  return (
    <Stage
      bg="radial-gradient(120% 88% at 50% 42%, #FAF7F0 0%, #F2E8D8 100%)"
      hue={VIOLET}
      seed={1}
    >
      {/* Title */}
      <div style={{
        position: 'absolute', top: 240, left: 90, right: 130, textAlign: 'center',
        fontFamily: fonts.mono, fontSize: 19, letterSpacing: '0.16em',
        color: `${DARK}44`, opacity: titleOp,
      }}>
        LO QUE NO SE VE · IGUAL IMPORTA
      </div>

      <AbsoluteFill style={{ opacity: 1 - pay }}>
        <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: 800, display: 'flex', flexDirection: 'column', gap: 32 }}>

            {/* Main metric label */}
            <div style={{ opacity: barIn }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 14 }}>
                <div style={{ fontFamily: fonts.mono, fontSize: 17, letterSpacing: '0.12em', color: `${DARK}55` }}>
                  CONFIANZA DEL CLIENTE
                </div>
                <div style={{
                  fontFamily: fonts.display, fontWeight: 900, fontSize: 54,
                  color: hasCrossed ? VIOLET : DARK,
                  letterSpacing: '-0.04em',
                  textShadow: hasCrossed ? `0 0 28px ${VIOLET}AA` : 'none',
                  transition: 'color 0.4s',
                }}>
                  {Math.round(barPercent)}%
                </div>
              </div>

              {/* Bar */}
              <div style={{ height: 26, borderRadius: 13, background: 'rgba(0,0,0,0.07)', overflow: 'visible', position: 'relative' }}>
                <div style={{
                  height: '100%', borderRadius: 13, width: `${barPercent}%`,
                  background: hasCrossed
                    ? `linear-gradient(90deg, ${VIOLET} 0%, ${VIOLET_L} 100%)`
                    : 'rgba(0,0,0,0.22)',
                  boxShadow: hasCrossed ? `0 0 22px ${VIOLET}99` : 'none',
                  transition: 'background 0.4s, box-shadow 0.4s',
                }}>
                  {hasCrossed && glowI > 0.05 ? (
                    <div style={{ position: 'absolute', right: -4, top: '50%', transform: 'translateY(-50%)', width: 26, height: 26 }}>
                      <SiriGlow frame={f} intensity={glowI * 0.8} radius={13} />
                    </div>
                  ) : null}
                </div>

                {/* Threshold line */}
                <div style={{
                  position: 'absolute', left: `${threshold}%`, top: -16, bottom: -10,
                  width: 2,
                  background: hasCrossed ? `${VIOLET}CC` : 'rgba(0,0,0,0.25)',
                  opacity: threshLine,
                  boxShadow: hasCrossed ? `0 0 12px ${VIOLET}99` : 'none',
                }} />
                <div style={{
                  position: 'absolute', left: `calc(${threshold}% + 8px)`, top: -36,
                  fontFamily: fonts.mono, fontSize: 14, letterSpacing: '0.1em',
                  color: hasCrossed ? VIOLET : `${DARK}55`,
                  opacity: threshLine,
                  whiteSpace: 'nowrap',
                }}>
                  UMBRAL DE PERCEPCIÓN
                </div>
              </div>
            </div>

            {/* Steps row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', opacity: barIn }}>
              {steps.map((s, i) => {
                const stepOp = ip(f, s.frame, s.frame + 18, 0, 1);
                const isPast = f > s.frame + 18;
                const isHot  = s.val >= threshold && hasCrossed;
                return (
                  <div key={i} style={{
                    opacity: stepOp,
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, width: 136,
                  }}>
                    <div style={{
                      fontFamily: fonts.display, fontWeight: 800, fontSize: 36,
                      color: isHot ? VIOLET : `${DARK}${isPast ? 'CC' : '77'}`,
                      textShadow: isHot ? `0 0 18px ${VIOLET}AA` : 'none',
                    }}>{s.val}%</div>
                    <div style={{ fontFamily: fonts.mono, fontSize: 14, color: `${DARK}55`, letterSpacing: '0.08em' }}>
                      {s.label}
                    </div>
                    <div style={{
                      fontFamily: fonts.mono, fontSize: 13,
                      color: isPast && !isHot ? 'rgba(0,0,0,0.28)' : isHot ? VIOLET + '99' : 'transparent',
                    }}>
                      {isPast && !isHot ? '— invisible' : isHot ? '✓ se nota' : ''}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Insight label */}
            <div style={{
              opacity: insightOp,
              textAlign: 'center',
              fontFamily: fonts.display, fontWeight: 700, fontSize: 36,
              color: VIOLET, letterSpacing: '-0.02em',
              textShadow: `0 0 22px ${VIOLET}77`,
            }}>
              Antes del umbral, nadie lo percibe.
            </div>
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
          <BigType frame={f} s={190} size={88} lines={[
            { t: 'Pequeños cambios' },
            { t: 'son invisibles.', hl: false },
            { t: 'El umbral', hl: true },
            { t: 'lo cambia todo.' },
          ]} dark={false} />
          <div style={{
            fontFamily: fonts.display, fontSize: 28,
            color: `${DARK}55`, marginTop: 28,
            opacity: ip(f, 232, 252, 0, 1),
          }}>
            Hacé cambios que se noten.
          </div>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};
