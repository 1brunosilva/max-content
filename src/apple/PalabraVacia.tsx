/**
 * PalabraVacia — Semantic Satiation. Repetí una palabra muchas veces
 * y pierde su significado. "CALIDAD" aparece y se repite: cada eco más
 * desaturado, más borroso, hasta volverse ruido. Luego una palabra SIMPLE
 * con glow rompe el silencio.
 * El espectador experimenta la saturación del buzzword.
 *
 * Lever: semantic satiation / palabra gastada. Paleta: violeta → midnight. C.
 */
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { Stage, SiriGlow, SiriFrame, BigType, ip, fonts } from './kit';

export const PALABRAVACIA_DURATION = 288;

const VLT = '#7C3AED';
const VLT_L = '#A855F7';

const ECHOES = [
  { y: 440, scale: 1.0, opacity: 1.0, blur: 0 },
  { y: 560, scale: 0.88, opacity: 0.78, blur: 1 },
  { y: 665, scale: 0.76, opacity: 0.55, blur: 3 },
  { y: 755, scale: 0.64, opacity: 0.34, blur: 6 },
  { y: 834, scale: 0.52, opacity: 0.18, blur: 10 },
  { y: 902, scale: 0.40, opacity: 0.09, blur: 16 },
];

export const PalabraVacia: React.FC = () => {
  const f = useCurrentFrame();

  const labelIn = ip(f, 8, 28, 0, 1) * (1 - ip(f, 196, 210, 0, 1));

  // Los ecos de "CALIDAD" aparecen en secuencia
  const echoIn = (i: number) => ip(f, 22 + i * 14, 44 + i * 14, 0, 1);

  // La degradación progresiva se intensifica
  const saturation = ip(f, 40, 140, 1, 0);

  // El fondo se va a gris/apagado
  const greyFade = ip(f, 80, 155, 0, 1);

  // La etiqueta "BUZZWORD VACÍO" aparece
  const buzzIn = ip(f, 148, 172, 0, 1) * (1 - ip(f, 195, 208, 0, 1));

  // La palabra SIMPLE aparece con glow
  const simpleIn = ip(f, 152, 185, 0, 1) * (1 - ip(f, 195, 208, 0, 1));
  const simpleGlow = ip(f, 162, 195, 0, 1) * (1 - ip(f, 195, 207, 0, 1));

  const pay = ip(f, 210, 250, 0, 1);

  return (
    <Stage
      bg="radial-gradient(130% 90% at 50% 46%, #120B1E 0%, #05030A 76%)"
      hue={VLT}
      seed={7}
    >
      {/* Label superior */}
      <div style={{
        position: 'absolute', top: 252, left: 0, right: 0, textAlign: 'center',
        fontFamily: fonts.mono, fontSize: 30, letterSpacing: '0.18em',
        color: 'rgba(255,255,255,0.50)', opacity: labelIn, zIndex: 30,
      }}>
        REPETÍ ESTO 10 VECES
      </div>

      <AbsoluteFill style={{ opacity: 1 - pay }}>
        {/* Ecos de CALIDAD */}
        {ECHOES.map((echo, i) => {
          const eIn = echoIn(i);
          const degrade = ip(f, 55 + i * 8, 120 + i * 8, 0, 1);
          const finalOpacity = echo.opacity * (1 - degrade * 0.7) * eIn;
          const finalBlur = echo.blur + degrade * 12;
          const finalSat = Math.max(0, saturation - i * 0.08);

          return (
            <div key={i} style={{
              position: 'absolute',
              top: echo.y,
              left: 0, right: 0,
              textAlign: 'center',
              opacity: finalOpacity,
              transform: `scale(${echo.scale})`,
              filter: `blur(${finalBlur}px) saturate(${finalSat})`,
            }}>
              <span style={{
                fontFamily: fonts.display,
                fontWeight: 900,
                fontSize: 108,
                letterSpacing: '-0.04em',
                color: i === 0 ? VLT_L : `rgba(255,255,255,${0.9 - i * 0.13})`,
                textShadow: i === 0 ? `0 0 44px ${VLT}88` : 'none',
              }}>
                CALIDAD
              </span>
            </div>
          );
        })}

        {/* Barra de "significado que queda" */}
        <div style={{
          position: 'absolute', bottom: 500, left: 90, right: 130,
          opacity: ip(f, 48, 72, 0, 1) * (1 - ip(f, 190, 205, 0, 1)),
        }}>
          <div style={{ fontFamily: fonts.mono, fontSize: 26, color: 'rgba(255,255,255,0.36)', letterSpacing: '0.12em', marginBottom: 14 }}>
            SIGNIFICADO PERCIBIDO
          </div>
          <div style={{ height: 24, borderRadius: 12, background: 'rgba(255,255,255,0.06)' }}>
            <div style={{
              width: `${Math.max(2, (1 - greyFade) * 100)}%`,
              height: '100%', borderRadius: 12,
              background: `linear-gradient(90deg, ${VLT} 0%, ${VLT_L} 100%)`,
              boxShadow: `0 0 14px ${VLT}66`,
            }} />
          </div>
          <div style={{
            fontFamily: fonts.display, fontWeight: 700, fontSize: 36,
            color: greyFade > 0.7 ? 'rgba(255,255,255,0.28)' : VLT_L,
            marginTop: 10, textAlign: 'right',
          }}>
            {Math.max(0, Math.round((1 - greyFade) * 100))}%
          </div>
        </div>

        {/* Etiqueta: buzzword vacío */}
        {buzzIn > 0.01 && (
          <div style={{
            position: 'absolute', bottom: 450, left: 0, right: 0, textAlign: 'center',
            opacity: buzzIn,
          }}>
            <div style={{
              display: 'inline-block',
              background: 'rgba(239,68,68,0.15)',
              border: '1px solid rgba(239,68,68,0.4)',
              borderRadius: 50, padding: '14px 44px',
              fontFamily: fonts.mono, fontSize: 28,
              color: '#FCA5A5', letterSpacing: '0.12em',
            }}>
              BUZZWORD VACÍO — nadie lo escucha
            </div>
          </div>
        )}

        {/* La palabra SIMPLE con glow */}
        {simpleIn > 0.01 && (
          <div style={{
            position: 'absolute', bottom: 420, left: 0, right: 0,
            display: 'flex', justifyContent: 'center',
            opacity: simpleIn,
            transform: `scale(${0.72 + simpleIn * 0.28})`,
          }}>
            <div style={{ position: 'relative', display: 'inline-block' }}>
              {simpleGlow > 0.01 && (
                <SiriGlow frame={f} intensity={simpleGlow} radius={12} inset={-24} />
              )}
              <span style={{
                fontFamily: fonts.display, fontWeight: 900, fontSize: 128,
                letterSpacing: '-0.04em', color: '#F4F4FA',
                textShadow: `0 0 60px rgba(255,255,255,0.4)`,
              }}>
                CLARO
              </span>
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
          <BigType frame={f} s={214} size={88} lines={[
            { t: '"Calidad" ya' },
            { t: 'no dice nada.' },
            { t: 'Decí algo específico.', hl: true },
          ]} />
          <div style={{
            fontFamily: fonts.display, fontWeight: 400, fontSize: 38,
            color: '#9A9AB5', marginTop: 32,
            opacity: ip(f, 264, 284, 0, 1),
          }}>
            Los buzzwords no venden. La claridad sí.
          </div>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};
