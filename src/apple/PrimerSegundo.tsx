/**
 * PrimerSegundo — mecanismo #16: Atención / primeros 3 segundos.
 * Una barra de progreso corre 3 segundos. Mientras avanza, avatares caen
 * uno a uno (scatter). Al final quedan 2 de 9. El espectador lo VIVE.
 * Lever: atención / hook / retención inicial. Paleta: cyan.
 * Intención: C (contenido).
 */
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { Stage, SiriGlow, SiriFrame, ip, fonts } from './kit';

const CYAN = '#4FE0FF';
const AVATARS = [
  { name: 'Marcos R.',     emoji: '👨‍💼' },
  { name: 'Laura M.',      emoji: '👩‍💻' },
  { name: 'Nicolás B.',    emoji: '👨‍🏫' },
  { name: 'Valentina G.',  emoji: '👩‍🎨' },
  { name: 'Diego F.',      emoji: '👨‍🔧' },
  { name: 'Camila S.',     emoji: '👩‍🍳' },
  { name: 'Rodrigo P.',    emoji: '👨‍⚕️' },
  { name: 'Sofía T.',      emoji: '👩‍💼' }, // queda ✅
  { name: 'Pablo H.',      emoji: '👨‍🎤' }, // queda ✅
];

// Frame en que cada avatar "se va"
const FALL = [22, 34, 46, 58, 68, 80, 93, -1, -1];

// Cuánto dura la animación de caída
const FALL_DUR = 18;

export const PRIMERSEGUNDO_DURATION = 360;

export const PrimerSegundo: React.FC = () => {
  const f = useCurrentFrame();

  // Barra de progreso: frame 18 → 108 (90f = 3s a 30fps)
  const BAR_START = 18;
  const BAR_END = 108;
  const barPct = ip(f, BAR_START, BAR_END, 0, 1);
  const barLabel = (barPct * 3).toFixed(1).replace('.', ',');

  // Label intro
  const labelOp = ip(f, 6, 22, 0, 1) * (1 - ip(f, 100, 118, 0, 1));

  // Escena fade antes del payoff
  const sceneFade = 1 - ip(f, 130, 154, 0, 1);

  // "Quedan solo 2" — aparece en la zona final de la escena
  const quedanOp = ip(f, 112, 132, 0, 1) * sceneFade;

  // Payoff
  const pay = ip(f, 156, 176, 0, 1);
  const p1  = ip(f, 176, 192, 0, 1);
  const p2  = ip(f, 200, 216, 0, 1);
  const p3  = ip(f, 222, 238, 0, 1);
  const psub = ip(f, 248, 264, 0, 1);

  // Glow en los dos últimos (Sofía y Pablo)
  const survivorGlow = ip(f, 108, 130, 0, 1) * sceneFade;

  // Dimensiones de cada avatar-card
  const CARD_W = 700;
  const CARD_H = 90;
  const CARD_GAP = 12;
  const STACK_H = AVATARS.length * (CARD_H + CARD_GAP);
  // Centrado vertical (zona segura 220–1500, centro ≈ 860)
  const STACK_TOP = 860 - STACK_H / 2 + 80; // +80 por la barra de arriba

  return (
    <Stage
      bg="radial-gradient(130% 100% at 50% 35%, #080E14 0%, #030508 80%)"
      hue={CYAN}
      seed={7}
    >
      {/* Label */}
      <div style={{
        position: 'absolute', top: 270, left: 90, right: 130,
        textAlign: 'center', fontFamily: fonts.mono,
        fontSize: 36, letterSpacing: '0.16em',
        color: 'rgba(255,255,255,0.62)', opacity: labelOp, zIndex: 30,
      }}>
        LOS PRIMEROS 3 SEGUNDOS
      </div>

      {/* Barra de progreso */}
      <AbsoluteFill style={{ opacity: sceneFade, zIndex: 10 }}>
        {/* Track */}
        <div style={{
          position: 'absolute', top: 360, left: 90, right: 130,
          height: 8, borderRadius: 4,
          background: 'rgba(255,255,255,0.08)',
        }}>
          {/* Fill */}
          <div style={{
            height: '100%', borderRadius: 4,
            width: `${barPct * 100}%`,
            background: `linear-gradient(90deg, ${CYAN} 0%, #5B8CFF 100%)`,
            boxShadow: `0 0 14px ${CYAN}aa`,
          }} />
        </div>
        {/* Timer */}
        <div style={{
          position: 'absolute', top: 380, left: 90, right: 130,
          textAlign: 'right', fontFamily: fonts.mono,
          fontSize: 44, color: CYAN, letterSpacing: '-0.02em',
          opacity: ip(f, 16, 30, 0, 1),
          textShadow: `0 0 22px ${CYAN}`,
        }}>
          {barLabel}s
        </div>
      </AbsoluteFill>

      {/* Stack de avatares */}
      <AbsoluteFill style={{ zIndex: 15, opacity: sceneFade }}>
        {AVATARS.map((av, i) => {
          const fallFrame = FALL[i];
          const isSurvivor = fallFrame === -1;

          // Estado de caída
          const gone = !isSurvivor && f >= fallFrame + FALL_DUR;
          const falling = !isSurvivor && f >= fallFrame && !gone;
          const fallP = falling ? ip(f, fallFrame, fallFrame + FALL_DUR, 0, 1) : gone ? 1 : 0;

          const cardOp = isSurvivor
            ? ip(f, 14, 28, 0, 1)
            : Math.max(0, 1 - fallP * 1.4);

          const cardY = fallP * 340;
          const cardRotate = (i % 2 === 0 ? 1 : -1) * fallP * 8;
          const cardX = (i % 3 - 1) * 28 * fallP;

          const posY = STACK_TOP + i * (CARD_H + CARD_GAP);

          return (
            <div
              key={av.name}
              style={{
                position: 'absolute',
                left: '50%',
                top: posY,
                width: CARD_W,
                transform: `translateX(-50%) translateY(${cardY}px) translateX(${cardX}px) rotate(${cardRotate}deg)`,
                opacity: cardOp,
              }}
            >
              {isSurvivor && (
                <div style={{ position: 'absolute', inset: -2, borderRadius: 20 }}>
                  <SiriGlow frame={f} intensity={survivorGlow * 0.8} radius={20} />
                </div>
              )}
              <div style={{
                width: CARD_W, height: CARD_H, borderRadius: 20,
                background: isSurvivor
                  ? 'linear-gradient(135deg, #0D1A22 0%, #081018 100%)'
                  : 'rgba(255,255,255,0.05)',
                border: isSurvivor
                  ? `1px solid ${CYAN}55`
                  : '1px solid rgba(255,255,255,0.10)',
                backdropFilter: 'blur(12px)',
                display: 'flex', alignItems: 'center', gap: 24, padding: '0 32px',
              }}>
                <span style={{ fontSize: 40 }}>{av.emoji}</span>
                <span style={{
                  fontFamily: fonts.display, fontWeight: 700, fontSize: 44,
                  color: isSurvivor ? '#E8F8FF' : 'rgba(200,220,230,0.72)',
                  letterSpacing: '-0.02em',
                }}>{av.name}</span>
                {!isSurvivor && fallP > 0.1 && (
                  <span style={{
                    marginLeft: 'auto', fontFamily: fonts.mono,
                    fontSize: 36, color: '#FF5A6E',
                    opacity: Math.min(1, fallP * 2),
                  }}>✕</span>
                )}
              </div>
            </div>
          );
        })}
      </AbsoluteFill>

      {/* "2 de 9 llegaron" — aparece al final de la escena */}
      <AbsoluteFill style={{ opacity: quedanOp, zIndex: 25, pointerEvents: 'none' }}>
        <div style={{
          position: 'absolute', bottom: 460, left: 0, right: 0,
          textAlign: 'center',
          fontFamily: fonts.display, fontWeight: 800,
          fontSize: 58, color: CYAN,
          letterSpacing: '-0.03em',
          textShadow: `0 0 44px ${CYAN}88`,
        }}>
          2 de 9 llegaron.
        </div>
      </AbsoluteFill>

      {/* PAYOFF */}
      <AbsoluteFill style={{
        alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', padding: '0 96px',
        opacity: pay, zIndex: 200,
      }}>
        <SiriFrame frame={f} intensity={pay} />

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
          <div style={{
            fontFamily: fonts.display, fontWeight: 500, fontSize: 54,
            color: 'rgba(160,230,245,0.7)', letterSpacing: '-0.02em',
            lineHeight: 1.3, opacity: p1,
            transform: `translateY(${(1 - p1) * 22}px)`,
          }}>
            Los perdiste en los
          </div>

          <div style={{
            fontFamily: fonts.display, fontWeight: 800, fontSize: 140,
            color: CYAN, letterSpacing: '-0.05em', lineHeight: 1,
            textShadow: `0 0 80px ${CYAN}cc`,
            opacity: p2, transform: `translateY(${(1 - p2) * 28}px)`,
          }}>
            3 segundos.
          </div>

          <div style={{
            fontFamily: fonts.display, fontWeight: 800, fontSize: 88,
            color: '#E8F8FF', letterSpacing: '-0.035em', lineHeight: 1.1,
            opacity: p3, transform: `translateY(${(1 - p3) * 22}px)`,
            marginTop: 12,
          }}>
            No al minuto.
          </div>

          <div style={{
            fontFamily: fonts.display, fontSize: 50,
            color: '#7EC8D8', lineHeight: 1.45,
            opacity: psub, transform: `translateY(${(1 - psub) * 16}px)`,
            marginTop: 16,
          }}>
            Esos primeros segundos<br />son tu marca.
          </div>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};
