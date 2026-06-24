/**
 * DopaminaEspera — Anticipatory Affect / Pre-reward Dopamine.
 * Schultz et al: el pico de dopamina ocurre ANTES del reward, en la anticipación.
 * Una barra de progreso se llena con glow; el espectador siente el suspenso;
 * el payoff: la espera bien construida ES el producto. Tu onboarding y lead magnet
 * tienen que alimentar esa anticipación antes de entregar el valor.
 *
 * Lever: anticipatory affect / dopamine peak. Paleta: rosa-violeta. C.
 */
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { Stage, SiriGlow, SiriFrame, BigType, ip, fonts } from './kit';

export const DOPAMINAESPERA_DURATION = 296;

const VLT = '#7C3AED';
const VLT_L = '#A855F7';
const PINK = '#FF6FD8';
const CYAN = '#4FE0FF';

export const DopaminaEspera: React.FC = () => {
  const f = useCurrentFrame();

  const labelIn = ip(f, 8, 28, 0, 1) * (1 - ip(f, 206, 222, 0, 1));

  // Barra de progreso
  const barIn = ip(f, 28, 52, 0, 1);
  const progress = ip(f, 52, 165, 0, 1); // 0 → 100%
  const barFade = ip(f, 168, 198, 0, 1);

  // Dopamina: sube con la barra, pica antes del 100%
  const dopPeak = ip(f, 52, 140, 0, 1) - ip(f, 140, 168, 0, 0.35);
  const dopFade = ip(f, 168, 196, 0, 1);

  // Mensajes de anticipación
  const msg1In = ip(f, 65, 88, 0, 1) * (1 - ip(f, 128, 148, 0, 1));
  const msg2In = ip(f, 112, 132, 0, 1) * (1 - ip(f, 148, 168, 0, 1));
  const msg3In = ip(f, 142, 162, 0, 1) * (1 - barFade);

  // Reward aparece al 100%
  const rewardIn = ip(f, 168, 196, 0, 1) * (1 - ip(f, 206, 222, 0, 1));
  const rewardGlow = ip(f, 172, 198, 0, 1) * (1 - ip(f, 206, 222, 0, 1));

  // Glow de la barra: más intenso cuanto más cerca del 100%
  const barGlow = progress * (0.5 + Math.sin(f * 0.3) * 0.3);

  const pay = ip(f, 224, 264, 0, 1);

  const pct = Math.round(progress * 100);
  const barColor = progress > 0.75
    ? `linear-gradient(90deg, ${VLT}, ${PINK})`
    : progress > 0.4
    ? `linear-gradient(90deg, ${VLT}, ${VLT_L})`
    : `linear-gradient(90deg, ${CYAN}, ${VLT})`;

  return (
    <Stage
      bg="radial-gradient(130% 92% at 50% 44%, #100818 0%, #06040E 80%)"
      hue={VLT}
      seed={12}
    >
      <div style={{
        position: 'absolute', top: 252, left: 0, right: 0, textAlign: 'center',
        fontFamily: fonts.mono, fontSize: 30, letterSpacing: '0.18em',
        color: 'rgba(255,255,255,0.50)', opacity: labelIn, zIndex: 30,
      }}>
        ¿CUÁNDO PICA MÁS LA DOPAMINA?
      </div>

      <AbsoluteFill style={{ opacity: 1 - pay }}>

        {/* BARRA DE PROGRESO */}
        <div style={{
          position: 'absolute', top: 440, left: 90, right: 130,
          opacity: barIn * (1 - barFade),
          transform: `translateY(${(1 - barIn) * 22}px)`,
        }}>
          <div style={{ fontFamily: fonts.mono, fontSize: 26, color: 'rgba(255,255,255,0.40)', letterSpacing: '0.14em', marginBottom: 18 }}>
            PREPARANDO TU ACCESO...
          </div>

          {/* Barra */}
          <div style={{
            position: 'relative', height: 28, background: 'rgba(255,255,255,0.08)',
            borderRadius: 14, overflow: 'visible',
          }}>
            <div style={{
              position: 'absolute', left: 0, top: 0, bottom: 0,
              width: `${pct}%`, borderRadius: 14,
              background: barColor,
              boxShadow: `0 0 ${barGlow * 40}px ${VLT_L}88`,
              transition: 'width 0.05s linear',
            }} />

            {/* Cabeza de la barra (glow) */}
            {progress > 0.02 && progress < 1 && (
              <div style={{
                position: 'absolute', top: -8, bottom: -8,
                left: `${Math.max(0, pct - 2)}%`,
                width: 20, borderRadius: 10,
                background: PINK,
                boxShadow: `0 0 ${barGlow * 30}px ${PINK}`,
                opacity: 0.9,
              }} />
            )}
          </div>

          {/* Porcentaje */}
          <div style={{
            textAlign: 'right', marginTop: 12,
            fontFamily: fonts.display, fontWeight: 900, fontSize: 72,
            letterSpacing: '-0.04em',
            color: progress > 0.7 ? PINK : VLT_L,
            textShadow: `0 0 30px ${progress > 0.7 ? PINK : VLT_L}66`,
          }}>
            {pct}%
          </div>
        </div>

        {/* Curva de dopamina (mental) */}
        <div style={{
          position: 'absolute', top: 640, left: 90, right: 130,
          opacity: (1 - dopFade) * barIn,
        }}>
          <div style={{
            fontFamily: fonts.mono, fontSize: 24, color: 'rgba(255,255,255,0.28)',
            letterSpacing: '0.12em', marginBottom: 14,
          }}>
            NIVEL DE DESEO
          </div>
          <div style={{ position: 'relative', height: 18, background: 'rgba(255,255,255,0.07)', borderRadius: 9 }}>
            <div style={{
              position: 'absolute', left: 0, top: 0, bottom: 0,
              width: `${dopPeak * 100}%`, borderRadius: 9,
              background: `linear-gradient(90deg, ${CYAN}, ${PINK})`,
              boxShadow: `0 0 20px ${PINK}55`,
            }} />
          </div>
          <div style={{
            display: 'flex', justifyContent: 'space-between', marginTop: 8,
            fontFamily: fonts.mono, fontSize: 22, color: 'rgba(255,255,255,0.25)',
          }}>
            <span>inicio</span><span>← PICO AQUÍ</span><span>entrega</span>
          </div>
        </div>

        {/* Mensajes de anticipación */}
        {msg1In > 0.1 && (
          <div style={{
            position: 'absolute', top: 808, left: 90, right: 130,
            opacity: msg1In,
            fontFamily: fonts.display, fontWeight: 600, fontSize: 40,
            color: 'rgba(255,255,255,0.50)',
          }}>
            ✦ Personalizando tu experiencia...
          </div>
        )}
        {msg2In > 0.1 && (
          <div style={{
            position: 'absolute', top: 808, left: 90, right: 130,
            opacity: msg2In,
            fontFamily: fonts.display, fontWeight: 600, fontSize: 40,
            color: `rgba(255,111,216,0.75)`,
          }}>
            ✦ Casi listo. Preparate.
          </div>
        )}
        {msg3In > 0.1 && (
          <div style={{
            position: 'absolute', top: 808, left: 90, right: 130,
            opacity: msg3In,
            fontFamily: fonts.display, fontWeight: 700, fontSize: 40,
            color: PINK,
            textShadow: `0 0 20px ${PINK}66`,
          }}>
            ✦ ¡Un segundo más...!
          </div>
        )}

        {/* REWARD — ya disponible */}
        {rewardIn > 0.05 && (
          <div style={{
            position: 'absolute', top: 360, left: 90, right: 130,
            opacity: rewardIn,
            transform: `scale(${0.8 + rewardIn * 0.2}) translateY(${(1 - rewardIn) * 30}px)`,
          }}>
            <div style={{
              background: `${VLT}18`,
              border: `2px solid ${VLT_L}66`,
              borderRadius: 28, padding: '40px 52px', textAlign: 'center',
              position: 'relative',
            }}>
              {rewardGlow > 0.01 && (
                <SiriGlow frame={f} intensity={rewardGlow} radius={28} inset={0} />
              )}
              <div style={{ fontFamily: fonts.mono, fontSize: 28, color: PINK, letterSpacing: '0.14em', marginBottom: 16 }}>
                ✓ ACCESO LISTO
              </div>
              <div style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: 58, color: '#F4F4FA' }}>
                Tu guía está lista.
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
          <BigType frame={f} s={228} size={88} lines={[
            { t: 'El pico de deseo' },
            { t: 'es antes' },
            { t: 'de la entrega.', hl: true },
          ]} />
          <div style={{
            fontFamily: fonts.display, fontWeight: 400, fontSize: 38,
            color: '#9A9AB5', marginTop: 32,
            opacity: ip(f, 272, 292, 0, 1),
          }}>
            Diseñá la espera, no solo el producto.
          </div>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};
