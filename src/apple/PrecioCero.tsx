/**
 * PrecioCero — Efecto precio cero.
 * El espectador VIVE el tirón irracional hacia lo gratuito: la card FREE
 * pulsa y se enciende visualmente aunque la opción paga sea objetivamente mejor.
 * Lever: efecto precio-cero. Paleta: verde. Intención: C.
 */
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { Stage, SiriGlow, SiriFrame, ip, fonts } from './kit';

const GREEN   = '#22C55E';
const GREEN_L = '#4ADE80';
const GREEN_D = '#166534';

export const PRECIOCERO_DURATION = 340;

export const PrecioCero: React.FC = () => {
  const f = useCurrentFrame();

  const labelOp  = ip(f,  8,  26, 0, 1) * (1 - ip(f,  64,  80, 0, 1));
  const cardAIn  = ip(f, 18,  52, 0, 1);
  const cardBIn  = ip(f, 42,  76, 0, 1);
  const glowI    = ip(f, 86, 118, 0, 1) * (1 - ip(f, 188, 206, 0, 1));
  const aDim     = 1 - ip(f, 86, 120, 0, 0.52);
  const realOp   = ip(f, 138, 158, 0, 1) * (1 - ip(f, 192, 210, 0, 1));
  const sceneFade = 1 - ip(f, 196, 218, 0, 1);
  const pay  = ip(f, 224, 244, 0, 1);
  const l1   = ip(f, 244, 260, 0, 1);
  const l2   = ip(f, 268, 284, 0, 1);
  const psub = ip(f, 296, 314, 0, 1);

  const CY = 900;
  const CW = 390;
  const CH = 480;

  return (
    <Stage bg="radial-gradient(130% 100% at 50% 44%, #0D1A0F 0%, #050908 80%)" hue={GREEN} seed={5}>
      {/* Label */}
      <div style={{
        position: 'absolute', top: 272, left: 90, right: 130,
        textAlign: 'center', fontFamily: fonts.mono,
        fontSize: 38, letterSpacing: '0.16em',
        color: 'rgba(255,255,255,0.62)', opacity: labelOp, zIndex: 30,
      }}>
        EL EFECTO PRECIO CERO
      </div>

      {/* ── Escena de las dos opciones ─────────────────────────────────────── */}
      <AbsoluteFill style={{ opacity: sceneFade, zIndex: 10 }}>

        {/* Card A — opción paga (más completa) */}
        <div style={{
          position: 'absolute', left: '50%', top: CY,
          transform: 'translate(calc(-50% - 218px), -50%)',
          opacity: cardAIn * aDim,
        }}>
          <div style={{
            width: CW, height: CH, borderRadius: 36,
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.12)',
            backdropFilter: 'blur(14px)',
            boxShadow: '0 30px 80px -30px rgba(0,0,0,0.85)',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: 16, padding: 44,
          }}>
            <div style={{ fontFamily: fonts.mono, fontSize: 30, letterSpacing: '0.12em', color: 'rgba(160,160,180,0.70)' }}>PLAN PRO</div>
            <div style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: 86, color: 'rgba(210,210,220,0.85)', letterSpacing: '-0.04em', lineHeight: 1 }}>$4.900</div>
            <div style={{ fontFamily: fonts.mono, fontSize: 30, color: 'rgba(130,130,150,0.60)' }}>/ mes</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%', marginTop: 6 }}>
              {['✓ IA completa', '✓ Flujos ilimitados', '✓ Soporte 24/7', '✓ Sin restricciones'].map((t, i) => (
                <div key={i} style={{ fontFamily: fonts.display, fontSize: 34, color: 'rgba(155,175,155,0.70)' }}>{t}</div>
              ))}
            </div>
          </div>
        </div>

        {/* Card B — GRATIS (básica) */}
        <div style={{
          position: 'absolute', left: '50%', top: CY,
          transform: 'translate(calc(-50% + 218px), -50%)',
          opacity: cardBIn,
        }}>
          <div style={{ position: 'absolute', inset: -4, borderRadius: 42 }}>
            <SiriGlow frame={f} intensity={glowI} radius={40} />
          </div>
          <div style={{
            width: CW, height: CH, borderRadius: 36,
            background: glowI > 0.05 ? 'linear-gradient(165deg, #0A1F0C 0%, #050D06 100%)' : 'rgba(255,255,255,0.05)',
            border: `1px solid ${glowI > 0.05 ? GREEN + '99' : 'rgba(255,255,255,0.12)'}`,
            backdropFilter: 'blur(14px)',
            boxShadow: glowI > 0.05 ? `0 50px 130px -30px ${GREEN}66` : '0 30px 80px -30px rgba(0,0,0,0.85)',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: 16, padding: 44,
          }}>
            <div style={{ fontFamily: fonts.mono, fontSize: 30, letterSpacing: '0.12em', color: `${GREEN}cc` }}>PLAN FREE</div>
            <div style={{
              fontFamily: fonts.display, fontWeight: 800, fontSize: 88,
              color: GREEN_L, letterSpacing: '-0.04em', lineHeight: 1,
              textShadow: `0 0 44px ${GREEN}bb`,
            }}>GRATIS</div>
            <div style={{ fontFamily: fonts.mono, fontSize: 30, color: `${GREEN}88` }}>para siempre</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%', marginTop: 6 }}>
              {['✓ Básico', '✗ Sin soporte', '✗ Con límites', '✗ Sin IA'].map((t, i) => (
                <div key={i} style={{
                  fontFamily: fonts.display, fontSize: 34,
                  color: i === 0 ? `${GREEN_L}99` : 'rgba(140,80,80,0.65)',
                }}>{t}</div>
              ))}
            </div>
          </div>
        </div>
      </AbsoluteFill>

      {/* Realización */}
      <AbsoluteFill style={{
        alignItems: 'center', justifyContent: 'flex-end',
        paddingBottom: 468, paddingLeft: 90, paddingRight: 130,
        opacity: realOp * sceneFade, zIndex: 40,
      }}>
        <div style={{
          fontFamily: fonts.display, fontWeight: 700, fontSize: 58,
          color: GREEN_L, letterSpacing: '-0.025em',
          textAlign: 'center', lineHeight: 1.35,
          textShadow: `0 0 36px ${GREEN}77`,
        }}>
          ¿Cuál elegiste mentalmente?
          <br />
          <span style={{ color: 'rgba(180,200,180,0.60)', fontWeight: 500, fontSize: 46 }}>
            Tu cerebro ya decidió.
          </span>
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
            fontFamily: fonts.display, fontWeight: 800, fontSize: 96,
            color: '#C8F0D8', letterSpacing: '-0.035em', lineHeight: 1.06,
            opacity: l1, transform: `translateY(${(1 - l1) * 22}px)`,
          }}>Gratis no es barato.</div>
          <div style={{
            fontFamily: fonts.display, fontWeight: 800, fontSize: 96,
            color: GREEN_L, letterSpacing: '-0.04em', lineHeight: 1.05,
            textShadow: `0 0 60px ${GREEN}bb`,
            opacity: l2, transform: `translateY(${(1 - l2) * 26}px)`,
          }}>Es otra categoría<br />mental.</div>
          <div style={{
            fontFamily: fonts.display, fontSize: 50,
            color: GREEN_D, lineHeight: 1.45,
            opacity: psub, transform: `translateY(${(1 - psub) * 16}px)`,
            marginTop: 12,
          }}>
            Usalo en tus ofertas<br />para mover la decisión.
          </div>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};
