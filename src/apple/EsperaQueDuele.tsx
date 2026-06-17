/**
 * EsperaQueDuele — mecanismo #18: Percepción del tiempo de espera.
 * Un mensaje de cliente aparece cálido (ámbar). Un reloj empieza a correr.
 * La card se va "enfriando" y apagando minuto a minuto — el cliente se fue.
 * El espectador VIVE la espera. Lever: urgencia / respuesta / chatbot.
 * Paleta: ámbar cálido → frío. Intención: V (venta, chatbot 24/7).
 */
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { Stage, SiriGlow, SiriFrame, ip, fonts } from './kit';

const AMBER = '#F5A623';
const AMBER_L = '#FFD580';
const COLD = '#6B8CA0';

export const ESPERAQUEDUELE_DURATION = 420;

// Interpolate color component
const lerp = (a: number, b: number, t: number) => Math.round(a + (b - a) * t);
const lerpHex = (ca: [number, number, number], cb: [number, number, number], t: number): string => {
  const r = lerp(ca[0], cb[0], t);
  const g = lerp(ca[1], cb[1], t);
  const b = lerp(ca[2], cb[2], t);
  return `rgb(${r},${g},${b})`;
};

const AMBER_RGB: [number, number, number] = [245, 166, 35];
const COLD_RGB: [number, number, number] = [107, 140, 160];

export const EsperaQueDuele: React.FC = () => {
  const f = useCurrentFrame();

  // ── TIMINGS ───────────────────────────────────────────────────────────────
  // 0-18:   label entra
  // 18-54:  card de mensaje aparece (cálida)
  // 54-180: reloj corre (0:00 → 5:00), card se enfría y dimma
  // 180-210: card se va con scatter/fade
  // 210-234: "Se fue." aparece
  // 234-260: todo fade
  // 260-420: PAYOFF

  const labelOp = ip(f, 8, 24, 0, 1) * (1 - ip(f, 50, 68, 0, 1));

  // Card de mensaje
  const cardIn   = ip(f, 18, 54, 0, 1);

  // Reloj: cuenta de 0:00 a 5:00 (300 segundos) entre frame 54 y 180
  const elapsedSeconds = Math.floor(ip(f, 54, 180, 0, 300));
  const mins = Math.floor(elapsedSeconds / 60);
  const secs = elapsedSeconds % 60;
  const timerStr = `${mins}:${String(secs).padStart(2, '0')}`;

  // Enfriamiento: t=0 (ámbar) → t=1 (frío)
  const coolT = ip(f, 54, 178, 0, 1);
  const borderColor = lerpHex(AMBER_RGB, COLD_RGB, coolT);
  const textColor = lerpHex([245, 220, 160], [130, 160, 175], coolT);

  // Dimming de la card (opacity baja de 1 a 0.18)
  const cardAlive = ip(f, 54, 178, 1, 0.18);

  // Card se va
  const cardLeave = ip(f, 180, 208, 0, 1);
  const cardScattered = cardLeave > 0;

  // "Se fue."
  const seFue = ip(f, 212, 232, 0, 1) * (1 - ip(f, 236, 254, 0, 1));

  // Escena fade
  const sceneFade = 1 - ip(f, 236, 260, 0, 1);

  // PAYOFF
  const pay  = ip(f, 262, 282, 0, 1);
  const l1   = ip(f, 282, 298, 0, 1);
  const l2   = ip(f, 306, 322, 0, 1);
  const psub = ip(f, 336, 354, 0, 1);

  // Glow ámbar al principio (se apaga con el tiempo)
  const glowIntensity = ip(f, 40, 60, 0, 1) * ip(f, 54, 180, 1, 0);

  // Layout
  const CY = 820; // centro de la card
  const CARD_W = 780;
  const CARD_H = 360;

  // Scatter de la card
  const cardY = cardLeave * 600;
  const cardOpLeave = 1 - cardLeave;

  return (
    <Stage
      bg="radial-gradient(130% 100% at 50% 40%, #120C04 0%, #060402 80%)"
      hue={AMBER}
      seed={13}
    >
      {/* Label */}
      <div style={{
        position: 'absolute', top: 270, left: 90, right: 130,
        textAlign: 'center', fontFamily: fonts.mono,
        fontSize: 36, letterSpacing: '0.16em',
        color: 'rgba(255,255,255,0.58)', opacity: labelOp, zIndex: 30,
      }}>
        TIEMPO DE RESPUESTA
      </div>

      {/* ── ESCENA PRINCIPAL ─────────────────────────────────────────────────── */}
      <AbsoluteFill style={{ opacity: sceneFade, zIndex: 10 }}>

        {/* Reloj / timer — arriba a la izquierda, zona segura */}
        <div style={{
          position: 'absolute', top: 340, left: 90,
          fontFamily: fonts.mono, fontSize: 52, letterSpacing: '0.08em',
          color: coolT > 0.7 ? COLD : AMBER,
          opacity: ip(f, 54, 72, 0, 1),
          textShadow: coolT < 0.5 ? `0 0 24px ${AMBER}99` : 'none',
          transition: 'color 0.3s',
        }}>
          ⏱ {timerStr}
        </div>

        {/* Card del mensaje */}
        {!cardScattered ? (
          <div style={{
            position: 'absolute', left: '50%', top: CY,
            transform: `translate(-50%, -50%) scale(${0.94 + cardIn * 0.06})`,
            opacity: cardIn * cardAlive,
          }}>
            <div style={{ position: 'absolute', inset: -4, borderRadius: 42 }}>
              <SiriGlow frame={f} intensity={glowIntensity * 0.9} radius={40} />
            </div>
            <div style={{
              width: CARD_W, height: CARD_H, borderRadius: 36,
              background: `rgba(255,255,255,0.04)`,
              border: `1px solid ${borderColor}66`,
              backdropFilter: 'blur(14px)',
              boxShadow: coolT < 0.5
                ? `0 40px 100px -30px ${AMBER}55`
                : '0 30px 80px -30px rgba(0,0,0,0.6)',
              display: 'flex', flexDirection: 'column',
              justifyContent: 'center', padding: '36px 48px', gap: 18,
            }}>
              {/* Header: avatar + nombre */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                <div style={{
                  width: 64, height: 64, borderRadius: '50%',
                  background: `linear-gradient(135deg, ${AMBER}44 0%, ${COLD}22 100%)`,
                  border: `2px solid ${borderColor}88`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 36,
                }}>👤</div>
                <div>
                  <div style={{
                    fontFamily: fonts.display, fontWeight: 700, fontSize: 44,
                    color: textColor, letterSpacing: '-0.02em',
                  }}>Miguel Castro</div>
                  <div style={{
                    fontFamily: fonts.mono, fontSize: 32,
                    color: coolT > 0.5 ? `${COLD}99` : `${AMBER}99`,
                  }}>WhatsApp · {timerStr}</div>
                </div>
              </div>

              {/* Mensaje */}
              <div style={{
                fontFamily: fonts.display, fontWeight: 500, fontSize: 52,
                color: textColor, letterSpacing: '-0.02em',
                lineHeight: 1.4,
              }}>
                "Hola, ¿me pueden<br />ayudar con algo?"
              </div>

              {/* Status: typing... → sin respuesta */}
              <div style={{
                fontFamily: fonts.mono, fontSize: 34,
                color: coolT > 0.6 ? `${COLD}77` : `${AMBER}88`,
                letterSpacing: '0.04em',
              }}>
                {coolT < 0.35
                  ? '● escribiendo...'
                  : coolT < 0.7
                    ? '— sin respuesta'
                    : '✕ se desconectó'}
              </div>
            </div>
          </div>
        ) : (
          /* Card cayéndose */
          <div style={{
            position: 'absolute', left: '50%', top: CY,
            transform: `translate(-50%, calc(-50% + ${cardY}px)) rotate(${cardLeave * 5}deg)`,
            opacity: Math.max(0, cardOpLeave),
          }}>
            <div style={{
              width: CARD_W, height: CARD_H, borderRadius: 36,
              background: 'rgba(255,255,255,0.02)',
              border: `1px solid ${COLD}33`,
              backdropFilter: 'blur(14px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <div style={{
                fontFamily: fonts.display, fontWeight: 700, fontSize: 72,
                color: `${COLD}66`, letterSpacing: '-0.03em',
              }}>Miguel Castro</div>
            </div>
          </div>
        )}

        {/* "Se fue." — aparece después que la card se va */}
        <div style={{
          position: 'absolute', left: 0, right: 0, top: CY - 60,
          textAlign: 'center',
          fontFamily: fonts.display, fontWeight: 800, fontSize: 100,
          color: COLD, letterSpacing: '-0.04em',
          opacity: seFue * sceneFade,
          textShadow: `0 0 44px ${COLD}66`,
        }}>
          Se fue.
        </div>
      </AbsoluteFill>

      {/* PAYOFF */}
      <AbsoluteFill style={{
        alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', padding: '0 96px',
        opacity: pay, zIndex: 200,
      }}>
        <SiriFrame frame={f} intensity={pay} />

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 22 }}>
          <div style={{
            fontFamily: fonts.display, fontWeight: 500, fontSize: 58,
            color: 'rgba(220,185,120,0.75)', letterSpacing: '-0.02em',
            lineHeight: 1.35, opacity: l1,
            transform: `translateY(${(1 - l1) * 22}px)`,
          }}>
            Cada minuto sin responder,
          </div>

          <div style={{
            fontFamily: fonts.display, fontWeight: 800, fontSize: 96,
            color: AMBER_L, letterSpacing: '-0.04em', lineHeight: 1.08,
            textShadow: `0 0 60px ${AMBER}cc`,
            opacity: l2, transform: `translateY(${(1 - l2) * 26}px)`,
          }}>
            el cliente decide<br />sin vos.
          </div>

          <div style={{
            fontFamily: fonts.display, fontSize: 50,
            color: `${AMBER}99`, lineHeight: 1.45,
            opacity: psub, transform: `translateY(${(1 - psub) * 16}px)`,
            marginTop: 14,
          }}>
            No importa qué tan bueno<br />es tu producto.
          </div>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};
