/**
 * PratfallEleva — Pratfall Effect. La marca "perfecta" (fría, sin fisuras) vs la que
 * admite un error y lo mejoró. El espectador VE cómo la imperfección estratégica gana
 * credibilidad: la card con el error reconocido se enciende con glow Siri, la perfecta se apaga.
 *
 * Lever: pratfall effect (admitir fallas aumenta confianza). Paleta: rosa-dorado. C.
 */
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { Stage, Glass, SiriGlow, SiriFrame, BigType, ip, fonts } from './kit';

export const PRATFALLELEVA_DURATION = 310;

const GOLD = '#F59E0B';
const GOLD_L = '#FCD34D';
const PINK = '#EC4899';

export const PratfallEleva: React.FC = () => {
  const f = useCurrentFrame();

  const labelOp = ip(f, 8, 28, 0, 1) * (1 - ip(f, 235, 252, 0, 1));

  // Card A (perfecta) entra
  const cardAIn = ip(f, 18, 52, 0, 1);
  const cardADim = ip(f, 120, 155, 0, 1);

  // Card B (admite error) entra
  const cardBIn = ip(f, 72, 108, 0, 1);
  const glowB = ip(f, 118, 158, 0, 1);

  // Badge "confianza" sube
  const badgeIn = ip(f, 162, 192, 0, 1);

  const pay = ip(f, 243, 278, 0, 1);

  return (
    <Stage
      bg="radial-gradient(130% 92% at 50% 44%, #160C10 0%, #080306 80%)"
      hue={PINK}
      seed={14}
    >
      {/* Label */}
      <div style={{
        position: 'absolute', top: 252, left: 0, right: 0, textAlign: 'center',
        fontFamily: fonts.mono, fontSize: 36, letterSpacing: '0.18em',
        color: 'rgba(255,255,255,0.60)', opacity: labelOp, zIndex: 30,
      }}>
        DOS MARCAS, UNA DIFERENCIA
      </div>

      <AbsoluteFill style={{ opacity: 1 - pay }}>
        {/* CARD A — la perfecta */}
        <div style={{
          position: 'absolute', top: 358, left: 90, right: 90,
          opacity: cardAIn * (1 - cardADim * 0.78),
          transform: `translateY(${(1 - cardAIn) * 30}px)`,
        }}>
          <Glass w={900} selected={false} pad={38} style={{ borderColor: 'rgba(255,255,255,0.10)' }}>
            <div style={{ fontFamily: fonts.mono, fontSize: 22, color: 'rgba(255,255,255,0.32)', marginBottom: 14, letterSpacing: '0.08em' }}>
              MARCA A · LA PERFECTA
            </div>
            <div style={{ fontFamily: fonts.display, fontWeight: 700, fontSize: 46, color: 'rgba(255,255,255,0.80)', lineHeight: 1.35 }}>
              "5 estrellas garantizadas. Siempre disponibles. Nunca fallamos."
            </div>
            <div style={{ display: 'flex', gap: 10, marginTop: 20, flexWrap: 'wrap' }}>
              {['✓ Perfecto', '✓ Sin errores', '✓ Siempre'].map((t) => (
                <span key={t} style={{ fontFamily: fonts.mono, fontSize: 26, color: 'rgba(255,255,255,0.36)', background: 'rgba(255,255,255,0.06)', borderRadius: 30, padding: '6px 22px' }}>{t}</span>
              ))}
            </div>
          </Glass>
        </div>

        {/* CARD B — admite un error */}
        <div style={{
          position: 'absolute', top: 680, left: 90, right: 90,
          opacity: cardBIn,
          transform: `translateY(${(1 - cardBIn) * 30}px)`,
        }}>
          <div style={{ position: 'relative' }}>
            <SiriGlow frame={f} intensity={glowB * 0.9} radius={34} />
            <div style={{
              width: 900,
              background: glowB > 0.3 ? 'linear-gradient(165deg,#1A0B12 0%,#0A0506 100%)' : 'rgba(255,255,255,0.05)',
              border: `1px solid ${glowB > 0.3 ? PINK + '88' : 'rgba(255,255,255,0.10)'}`,
              borderRadius: 34,
              padding: 38,
              boxShadow: glowB > 0.3 ? `0 40px 100px -30px ${PINK}55` : 'none',
            }}>
              <div style={{ fontFamily: fonts.mono, fontSize: 22, color: `${PINK}CC`, marginBottom: 14, letterSpacing: '0.08em' }}>
                MARCA B · LA HONESTA
              </div>
              <div style={{ fontFamily: fonts.display, fontWeight: 600, fontSize: 46, color: '#F4F4FA', lineHeight: 1.35 }}>
                "Una vez tardamos 3 horas más de lo prometido. Lo detectamos, avisamos y lo corregimos."
              </div>
              <div style={{ display: 'flex', gap: 10, marginTop: 20, flexWrap: 'wrap' }}>
                {['★★★★★', '+340 reseñas', 'Confían en nosotros'].map((t) => (
                  <span key={t} style={{ fontFamily: fonts.mono, fontSize: 26, color: GOLD_L, background: `${GOLD}18`, borderRadius: 30, padding: '6px 22px', border: `1px solid ${GOLD}44` }}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Badge confianza */}
        <div style={{
          position: 'absolute', bottom: 432, right: 130,
          opacity: badgeIn,
          transform: `translateY(${(1 - badgeIn) * 18}px)`,
        }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 14,
            background: `${GOLD}1A`, borderRadius: 50,
            border: `1px solid ${GOLD}55`, padding: '14px 34px',
          }}>
            <div style={{ width: 14, height: 14, borderRadius: '50%', background: GOLD_L }} />
            <div style={{ fontFamily: fonts.display, fontWeight: 600, fontSize: 34, color: GOLD_L }}>
              La B gana. Siempre.
            </div>
          </div>
        </div>
      </AbsoluteFill>

      {/* PAYOFF */}
      <AbsoluteFill style={{
        alignItems: 'center', justifyContent: 'center', textAlign: 'center',
        paddingLeft: 90, paddingRight: 130, opacity: pay, zIndex: 200,
      }}>
        <SiriFrame frame={f} intensity={pay} />
        <div style={{ transform: `translateY(${(1 - pay) * 26}px)` }}>
          <BigType frame={f} s={243} size={94} lines={[
            { t: 'Un error reconocido' },
            { t: 'genera más confianza' },
            { t: 'que mil garantías.', hl: true },
          ]} />
          <div style={{
            fontFamily: fonts.display, fontWeight: 400, fontSize: 40, color: '#9A9AB5',
            marginTop: 32, opacity: ip(f, 288, 306, 0, 1),
          }}>
            La imperfección honesta te hace humano. Y los humanos confían en humanos.
          </div>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};
