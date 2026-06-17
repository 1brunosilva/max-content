/**
 * Contraste — mecanismo #17: Efecto contraste / precio relativo.
 * Primero entra UNA card sola (precio alto de la competencia). Se ve cara.
 * Después entra la tuya al lado — y de repente la tuya parece razonable.
 * El espectador VIVE el efecto contraste: el mismo número, percepción distinta.
 * Lever: contraste / precio relativo. Paleta: dorado. Intención: C.
 */
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { Stage, SiriGlow, SiriFrame, ip, fonts } from './kit';

const GOLD = '#F5C842';
const GOLD_L = '#FFE08A';
const GOLD_DIM = '#8A6F20';

export const CONTRASTE_DURATION = 380;

const fmt = (n: number) => '$' + n.toLocaleString('es-UY');

export const Contraste: React.FC = () => {
  const f = useCurrentFrame();

  // ── FASE 1: card competencia sola ──────────────────────────────────────────
  // Frame 0-60: label intro + card competencia entra centrada
  const labelOp = ip(f, 8, 26, 0, 1) * (1 - ip(f, 62, 80, 0, 1));
  const compIn   = ip(f, 16, 50, 0, 1);
  // Card competencia está centrada hasta f=70, luego se desplaza a la izquierda
  const compShift = ip(f, 72, 110, 0, -210); // translateX → hacia izquierda
  const compScale = 1 - ip(f, 72, 110, 0, 0.08); // se achica levemente cuando entra la otra

  // ── FASE 2: card Concepto entra desde la derecha ───────────────────────────
  const concIn    = ip(f, 88, 126, 0, 1);
  // Empieza en X=+320px y llega a +0
  const concFromX = (1 - concIn) * 320;
  const glowI     = ip(f, 128, 158, 0, 1);

  // ── FASE 3: realización ────────────────────────────────────────────────────
  const realOp = ip(f, 166, 186, 0, 1) * (1 - ip(f, 198, 216, 0, 1));

  // ── ESCENA FADE ───────────────────────────────────────────────────────────
  const sceneFade = 1 - ip(f, 198, 220, 0, 1);

  // ── PAYOFF ────────────────────────────────────────────────────────────────
  const pay  = ip(f, 222, 244, 0, 1);
  const l1   = ip(f, 244, 260, 0, 1);
  const l2   = ip(f, 268, 284, 0, 1);
  const psub = ip(f, 296, 314, 0, 1);

  // Posición vertical centro (zona segura 220-1500)
  const CY = 880;
  const CARD_W = 390;
  const CARD_H = 420;

  return (
    <Stage
      bg="radial-gradient(130% 100% at 50% 44%, #14100A 0%, #080601 80%)"
      hue={GOLD}
      seed={11}
    >
      {/* Label */}
      <div style={{
        position: 'absolute', top: 270, left: 90, right: 130,
        textAlign: 'center', fontFamily: fonts.mono,
        fontSize: 36, letterSpacing: '0.16em',
        color: 'rgba(255,255,255,0.60)', opacity: labelOp, zIndex: 30,
      }}>
        EL EFECTO CONTRASTE
      </div>

      {/* ── Escena de las dos cards ─────────────────────────────────────────── */}
      <AbsoluteFill style={{ opacity: sceneFade, zIndex: 10 }}>

        {/* Card competencia */}
        <div style={{
          position: 'absolute', left: '50%', top: CY,
          transform: `translate(calc(-50% + ${compShift}px), -50%) scale(${compScale})`,
          opacity: compIn,
        }}>
          <div style={{
            width: CARD_W, height: CARD_H, borderRadius: 36,
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.12)',
            backdropFilter: 'blur(14px)',
            boxShadow: '0 30px 80px -30px rgba(0,0,0,0.85)',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: 12, padding: 44,
          }}>
            <div style={{
              fontFamily: fonts.mono, fontSize: 32, letterSpacing: '0.12em',
              color: 'rgba(160,160,180,0.70)', textAlign: 'center',
            }}>COMPETENCIA</div>
            <div style={{
              fontFamily: fonts.display, fontWeight: 800, fontSize: 88,
              color: 'rgba(210,210,220,0.82)', letterSpacing: '-0.04em',
              textAlign: 'center', lineHeight: 1,
            }}>{fmt(15900)}</div>
            <div style={{
              fontFamily: fonts.mono, fontSize: 34, color: 'rgba(130,130,150,0.65)',
              textAlign: 'center',
            }}>/ mes</div>
            <div style={{
              marginTop: 8, fontFamily: fonts.display, fontSize: 38,
              color: 'rgba(160,160,170,0.55)', textAlign: 'center', lineHeight: 1.4,
            }}>Automatización<br />básica</div>
          </div>
        </div>

        {/* Card Concepto — entra desde la derecha */}
        <div style={{
          position: 'absolute', left: '50%', top: CY,
          transform: `translate(calc(-50% + 210px + ${concFromX}px), -50%)`,
          opacity: concIn,
        }}>
          {/* Glow Siri */}
          <div style={{ position: 'absolute', inset: -4, borderRadius: 42 }}>
            <SiriGlow frame={f} intensity={glowI} radius={40} />
          </div>
          <div style={{
            width: CARD_W, height: CARD_H, borderRadius: 36,
            background: glowI > 0.05
              ? 'linear-gradient(165deg, #221A06 0%, #120E02 100%)'
              : 'rgba(255,255,255,0.05)',
            border: `1px solid ${glowI > 0.05 ? GOLD + '99' : 'rgba(255,255,255,0.12)'}`,
            backdropFilter: 'blur(14px)',
            boxShadow: glowI > 0.05
              ? `0 50px 130px -30px ${GOLD}66`
              : '0 30px 80px -30px rgba(0,0,0,0.85)',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: 12, padding: 44,
          }}>
            <div style={{
              fontFamily: fonts.mono, fontSize: 32, letterSpacing: '0.12em',
              color: `${GOLD}cc`, textAlign: 'center',
            }}>CONCEPTO AI</div>
            <div style={{
              fontFamily: fonts.display, fontWeight: 800, fontSize: 88,
              color: GOLD_L, letterSpacing: '-0.04em',
              textAlign: 'center', lineHeight: 1,
              textShadow: `0 0 44px ${GOLD}bb`,
            }}>{fmt(4900)}</div>
            <div style={{
              fontFamily: fonts.mono, fontSize: 34, color: `${GOLD}99`,
              textAlign: 'center',
            }}>/ mes</div>
            <div style={{
              marginTop: 8, fontFamily: fonts.display, fontSize: 38,
              color: `${GOLD_L}cc`, textAlign: 'center', lineHeight: 1.4,
            }}>IA completa<br />+ soporte</div>
          </div>
        </div>
      </AbsoluteFill>

      {/* Realización (entre las cards y el payoff) */}
      <AbsoluteFill style={{
        alignItems: 'center', justifyContent: 'flex-end',
        paddingBottom: 480, paddingLeft: 90, paddingRight: 130,
        opacity: realOp * sceneFade, zIndex: 40,
      }}>
        <div style={{
          fontFamily: fonts.display, fontWeight: 700, fontSize: 58,
          color: GOLD_L, letterSpacing: '-0.025em',
          textAlign: 'center', lineHeight: 1.35,
          textShadow: `0 0 36px ${GOLD}77`,
        }}>
          ¿La tuya se siente barata?<br />
          <span style={{ color: 'rgba(200,185,140,0.7)', fontWeight: 500, fontSize: 46 }}>Nada cambió. Solo la comparación.</span>
        </div>
      </AbsoluteFill>

      {/* PAYOFF */}
      <AbsoluteFill style={{
        alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', padding: '0 96px',
        opacity: pay, zIndex: 200,
      }}>
        <SiriFrame frame={f} intensity={pay} />

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
          <div style={{
            fontFamily: fonts.display, fontWeight: 800, fontSize: 88,
            color: '#E8D8A0', letterSpacing: '-0.035em', lineHeight: 1.08,
            opacity: l1, transform: `translateY(${(1 - l1) * 22}px)`,
          }}>
            No subás el precio.
          </div>
          <div style={{
            fontFamily: fonts.display, fontWeight: 800, fontSize: 100,
            color: GOLD_L, letterSpacing: '-0.04em', lineHeight: 1.05,
            textShadow: `0 0 60px ${GOLD}bb`,
            opacity: l2, transform: `translateY(${(1 - l2) * 26}px)`,
          }}>
            Cambiá la<br />comparación.
          </div>
          <div style={{
            fontFamily: fonts.display, fontSize: 50,
            color: GOLD_DIM, lineHeight: 1.45,
            opacity: psub, transform: `translateY(${(1 - psub) * 16}px)`,
            marginTop: 12,
          }}>
            Tu precio es lo que parece,<br />no lo que cuesta.
          </div>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};
