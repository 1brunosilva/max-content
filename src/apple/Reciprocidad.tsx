/**
 * Reciprocidad — Principio de reciprocidad.
 * Una card-regalo cae desde arriba con glow y se asienta frente al espectador.
 * Después aparece la reacción interna: "Ahora sentís que debés algo."
 * El mecanismo encarna el regalo entrante — el espectador lo recibe visualmente.
 * Lever: reciprocidad / dar primero. Paleta: verde-rosa. C.
 */
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { Stage, SiriGlow, SiriFrame, ip, fonts } from './kit';

const ROSE   = '#F472B6';
const ROSE_L = '#FBCFE8';
const GREEN  = '#34D399';

export const RECIPROCIDAD_DURATION = 350;

export const Reciprocidad: React.FC = () => {
  const f = useCurrentFrame();

  const labelOp   = ip(f,  8,  26, 0, 1) * (1 - ip(f,  82, 100, 0, 1));
  // La card cae desde arriba y se asienta con spring
  const cardY     = ip(f, 14,  60, -320, 0);
  const cardIn    = ip(f, 14,  44, 0, 1);
  const glowI     = ip(f, 66, 100, 0, 1) * (1 - ip(f, 196, 214, 0, 1));
  const pulseGlow = glowI * (0.7 + 0.3 * Math.sin(f * 0.20));

  // Bono de cortesía que aparece dentro de la card
  const line1 = ip(f,  50,  70, 0, 1);
  const line2 = ip(f,  68,  88, 0, 1);
  const line3 = ip(f,  86, 106, 0, 1);

  // Texto de la reacción interna
  const reactOp   = ip(f, 124, 144, 0, 1) * (1 - ip(f, 200, 218, 0, 1));
  const sceneFade = 1 - ip(f, 204, 224, 0, 1);

  const pay  = ip(f, 230, 250, 0, 1);
  const l1   = ip(f, 250, 266, 0, 1);
  const l2   = ip(f, 274, 290, 0, 1);
  const psub = ip(f, 302, 320, 0, 1);

  const CW = 720;
  const CH = 440;

  return (
    <Stage bg="radial-gradient(130% 100% at 50% 44%, #180A14 0%, #080408 82%)" hue={ROSE} seed={14}>
      <div style={{
        position: 'absolute', top: 272, left: 90, right: 130,
        textAlign: 'center', fontFamily: fonts.mono,
        fontSize: 36, letterSpacing: '0.18em',
        color: 'rgba(255,255,255,0.60)', opacity: labelOp, zIndex: 30,
      }}>
        EL PRINCIPIO DE RECIPROCIDAD
      </div>

      {/* ── La card regalo ────────────────────────────────────────────────────── */}
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', opacity: sceneFade, zIndex: 10 }}>
        <div style={{
          transform: `translateY(${cardY}px)`,
          opacity: cardIn,
          position: 'relative', width: CW,
        }}>
          <SiriGlow frame={f} intensity={pulseGlow} radius={38} />
          <div style={{
            width: CW, height: CH, borderRadius: 38,
            background: glowI > 0.05
              ? 'linear-gradient(165deg, #1A0814 0%, #0A0409 100%)'
              : 'rgba(255,255,255,0.06)',
            border: `1px solid ${glowI > 0.05 ? ROSE + '88' : 'rgba(255,255,255,0.12)'}`,
            backdropFilter: 'blur(16px)',
            boxShadow: glowI > 0.05
              ? `0 60px 140px -40px ${ROSE}66`
              : '0 40px 100px -34px rgba(0,0,0,0.85)',
            padding: 52, display: 'flex', flexDirection: 'column', gap: 20,
          }}>
            {/* Tag "para vos" */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 12,
              opacity: line1,
              transform: `translateY(${(1 - line1) * 10}px)`,
            }}>
              <div style={{
                fontFamily: fonts.mono, fontSize: 30, letterSpacing: '0.14em',
                color: glowI > 0.05 ? `${ROSE}cc` : 'rgba(180,140,160,0.70)',
              }}>🎁 PARA VOS</div>
            </div>

            {/* Contenido del regalo */}
            <div style={{
              opacity: line2,
              transform: `translateY(${(1 - line2) * 10}px)`,
            }}>
              <div style={{
                fontFamily: fonts.display, fontWeight: 800, fontSize: 78,
                color: ROSE_L, letterSpacing: '-0.03em', lineHeight: 1.05,
                textShadow: glowI > 0.05 ? `0 0 40px ${ROSE}bb` : 'none',
              }}>
                Guía gratuita
              </div>
              <div style={{
                fontFamily: fonts.display, fontSize: 46,
                color: 'rgba(230,190,210,0.70)', marginTop: 8, lineHeight: 1.4,
              }}>
                "Cómo automatizar tu negocio<br />en 30 días sin saber código"
              </div>
            </div>

            {/* Tag valor */}
            <div style={{
              opacity: line3,
              transform: `translateY(${(1 - line3) * 10}px)`,
              display: 'flex', gap: 16, alignItems: 'center',
            }}>
              <div style={{
                fontFamily: fonts.mono, fontSize: 32,
                color: GREEN, letterSpacing: '0.08em',
              }}>✓ DESCARGA INMEDIATA</div>
              <div style={{
                fontFamily: fonts.mono, fontSize: 32,
                color: 'rgba(160,140,155,0.55)', textDecoration: 'line-through',
              }}>$4.900</div>
              <div style={{
                fontFamily: fonts.display, fontWeight: 800, fontSize: 48,
                color: GREEN, letterSpacing: '-0.02em',
              }}>GRATIS</div>
            </div>
          </div>
        </div>
      </AbsoluteFill>

      {/* Reacción interna */}
      <AbsoluteFill style={{
        alignItems: 'center', justifyContent: 'flex-end',
        paddingBottom: 450, paddingLeft: 90, paddingRight: 130,
        opacity: reactOp * sceneFade, zIndex: 40,
      }}>
        <div style={{
          fontFamily: fonts.display, fontWeight: 700, fontSize: 62,
          color: ROSE_L, letterSpacing: '-0.025em',
          textAlign: 'center', lineHeight: 1.35,
          textShadow: `0 0 36px ${ROSE}77`,
        }}>
          Ahora sentís que debés algo.
          <br />
          <span style={{ color: 'rgba(220,175,195,0.60)', fontWeight: 500, fontSize: 48 }}>
            Sin que nadie te lo pidiera.
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
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 22 }}>
          <div style={{
            fontFamily: fonts.display, fontWeight: 800, fontSize: 96,
            color: '#FDE8F4', letterSpacing: '-0.035em', lineHeight: 1.06,
            opacity: l1, transform: `translateY(${(1 - l1) * 22}px)`,
          }}>Dar primero<br />abre la venta.</div>
          <div style={{
            fontFamily: fonts.display, fontWeight: 800, fontSize: 86,
            color: ROSE_L, letterSpacing: '-0.04em', lineHeight: 1.05,
            textShadow: `0 0 60px ${ROSE}bb`,
            opacity: l2, transform: `translateY(${(1 - l2) * 26}px)`,
          }}>Sin pedir nada<br />a cambio.</div>
          <div style={{
            fontFamily: fonts.display, fontSize: 50,
            color: 'rgba(200,140,170,0.65)', lineHeight: 1.45,
            opacity: psub, transform: `translateY(${(1 - psub) * 16}px)`,
            marginTop: 12,
          }}>
            El lead magnet no es un truco.<br />Es una promesa que cumplís primero.
          </div>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};
