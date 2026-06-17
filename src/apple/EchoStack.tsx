/**
 * EchoStack — mecanismo #15: Illusory Truth Effect.
 * La misma frase aparece 3 veces, cada vez más grande y brillante.
 * El espectador VIVE el efecto: la 3ª vez se siente más cierta,
 * aunque sabe que es la misma frase.
 * Lever: verdad ilusoria / repetición. Paleta: cyan.
 */
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { Stage, Glass, SiriGlow, SiriFrame, ip, fonts } from './kit';

const CYAN = '#4FE0FF';

// Timings (30fps):
// 0-22   : label intro
// 22-64  : Aparición 1 (gris, pequeña)
// 66-108 : Aparición 2 (azul, mediana)
// 110-178: Aparición 3 (glow, grande)
// 172-192: sceneFade
// 192-340: PAYOFF en 4 pasos (pregunta → Sí. → insight → subtexto)
//           hold payoff ~4.8s

export const ECHOSTACK_DURATION = 340;

export const EchoStack: React.FC = () => {
  const f = useCurrentFrame();

  const labelOp = ip(f, 6, 20, 0, 1) * (1 - ip(f, 26, 40, 0, 1));

  const show1 = ip(f, 22, 36, 0, 1) * (1 - ip(f, 52, 64, 0, 1));
  const show2 = ip(f, 66, 80, 0, 1) * (1 - ip(f, 96, 108, 0, 1));
  const show3 = ip(f, 110, 126, 0, 1);
  const glow3 = ip(f, 128, 148, 0, 1);

  // GOTCHA: toda la escena se borra antes del payoff
  const sceneFade = 1 - ip(f, 172, 192, 0, 1);
  const pay = ip(f, 194, 210, 0, 1);

  // Payoff en 4 capas con stagger
  const q  = ip(f, 210, 224, 0, 1); // "¿La tercera vez...?"
  const si = ip(f, 236, 250, 0, 1); // "Sí."
  const l1 = ip(f, 256, 270, 0, 1); // "No cambió nada."
  const l2 = ip(f, 268, 282, 0, 1); // "Solo se repitió."
  const sub = ip(f, 290, 304, 0, 1); // subtexto

  // Cards centradas en 40% del canvas (Y ≈ 768px, zona segura 220-1500)
  const CY = 768;

  return (
    <Stage
      bg="radial-gradient(130% 100% at 50% 38%, #081318 0%, #030508 80%)"
      hue={CYAN}
      seed={3}
    >
      {/* Label */}
      <div style={{
        position: 'absolute', top: 270, left: 90, right: 130,
        textAlign: 'center', fontFamily: fonts.mono,
        fontSize: 28, letterSpacing: '0.18em',
        color: 'rgba(255,255,255,0.62)', opacity: labelOp, zIndex: 30,
      }}>
        EL MISMO MENSAJE · 3 VECES
      </div>

      {/* ── Aparición 1 — pequeña, gris ── */}
      <AbsoluteFill style={{ opacity: show1 * sceneFade, zIndex: 10 }}>
        <div style={{ position: 'absolute', left: '50%', top: CY, transform: 'translate(-50%, -50%)' }}>
          <div style={{
            fontFamily: fonts.mono, fontSize: 40, color: `${CYAN}55`,
            letterSpacing: '0.14em', textAlign: 'center', marginBottom: 14,
          }}>
            1 / 3
          </div>
          <Glass w={540} h={200} pad={44}>
            <div style={{
              fontFamily: fonts.display, fontWeight: 800, fontSize: 68,
              color: 'rgba(150,165,175,0.48)', letterSpacing: '-0.03em',
              lineHeight: 1.1, textAlign: 'center',
            }}>
              Los mejores<br />del sector.
            </div>
          </Glass>
        </div>
      </AbsoluteFill>

      {/* ── Aparición 2 — mediana, azul tenue ── */}
      <AbsoluteFill style={{ opacity: show2 * sceneFade, zIndex: 10 }}>
        <div style={{ position: 'absolute', left: '50%', top: CY, transform: 'translate(-50%, -50%)' }}>
          <div style={{
            fontFamily: fonts.mono, fontSize: 40, color: `${CYAN}88`,
            letterSpacing: '0.14em', textAlign: 'center', marginBottom: 14,
          }}>
            2 / 3
          </div>
          <Glass w={680} h={248} pad={48} style={{ borderColor: `${CYAN}44`, background: 'rgba(79,224,255,0.05)' }}>
            <div style={{
              fontFamily: fonts.display, fontWeight: 800, fontSize: 84,
              color: 'rgba(200,238,250,0.76)', letterSpacing: '-0.03em',
              lineHeight: 1.1, textAlign: 'center', textShadow: `0 0 40px ${CYAN}44`,
            }}>
              Los mejores<br />del sector.
            </div>
          </Glass>
        </div>
      </AbsoluteFill>

      {/* ── Aparición 3 — grande, glow Siri ── */}
      <AbsoluteFill style={{ opacity: show3 * sceneFade, zIndex: 10 }}>
        <div style={{ position: 'absolute', left: '50%', top: CY, transform: 'translate(-50%, -50%)' }}>
          <div style={{
            fontFamily: fonts.mono, fontSize: 40, letterSpacing: '0.14em',
            textAlign: 'center', marginBottom: 16,
            color: CYAN, textShadow: `0 0 20px ${CYAN}`,
          }}>
            3 / 3
          </div>
          <div style={{ position: 'relative' }}>
            <SiriGlow frame={f} intensity={glow3} radius={40} />
            <Glass w={820} h={302} pad={54} style={{ borderColor: `${CYAN}77`, background: 'rgba(79,224,255,0.08)' }}>
              <div style={{
                fontFamily: fonts.display, fontWeight: 800, fontSize: 102,
                color: '#E8F8FF', letterSpacing: '-0.03em',
                lineHeight: 1.08, textAlign: 'center', textShadow: `0 0 70px ${CYAN}aa`,
              }}>
                Los mejores<br />del sector.
              </div>
            </Glass>
          </div>
        </div>
      </AbsoluteFill>

      {/* ── PAYOFF ── todo en un solo frame, stagger interno */}
      <AbsoluteFill style={{
        alignItems: 'center', justifyContent: 'center', textAlign: 'center',
        padding: '0 96px', opacity: pay, zIndex: 200,
      }}>
        <SiriFrame frame={f} intensity={pay} />

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>

          {/* Pregunta — entra primero, pequeña */}
          <div style={{
            fontFamily: fonts.display, fontWeight: 500, fontSize: 52,
            color: 'rgba(160,225,245,0.75)', letterSpacing: '-0.02em',
            lineHeight: 1.3, opacity: q,
            transform: `translateY(${(1 - q) * 22}px)`,
          }}>
            ¿La tercera vez<br />se siente más cierta?
          </div>

          {/* Sí. — grande, cyan */}
          <div style={{
            fontFamily: fonts.display, fontWeight: 800, fontSize: 108,
            color: CYAN, letterSpacing: '-0.04em',
            textShadow: `0 0 70px ${CYAN}cc`,
            opacity: si, transform: `translateY(${(1 - si) * 28}px)`,
            lineHeight: 1,
          }}>
            Sí.
          </div>

          {/* Insight */}
          <div style={{ marginTop: 16 }}>
            <div style={{
              fontFamily: fonts.display, fontWeight: 800, fontSize: 88,
              color: '#E8F8FF', letterSpacing: '-0.035em', lineHeight: 1.08,
              opacity: l1, transform: `translateY(${(1 - l1) * 22}px)`,
            }}>
              No cambió nada.
            </div>
            <div style={{
              fontFamily: fonts.display, fontWeight: 800, fontSize: 88,
              color: CYAN, letterSpacing: '-0.035em', lineHeight: 1.08,
              textShadow: `0 0 44px ${CYAN}99`,
              opacity: l2, transform: `translateY(${(1 - l2) * 22}px)`,
            }}>
              Solo se repitió.
            </div>
          </div>

          {/* Subtexto */}
          <div style={{
            fontFamily: fonts.display, fontSize: 52,
            color: '#7EC8D8', lineHeight: 1.4,
            opacity: sub, transform: `translateY(${(1 - sub) * 16}px)`,
            marginTop: 8,
          }}>
            Aparecer seguido ya es<br />una ventaja sobre<br />tu competencia.
          </div>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};
