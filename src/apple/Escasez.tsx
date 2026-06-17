/**
 * Escasez — Efecto escasez / urgencia real.
 * 5 "lugares disponibles" brillan al inicio. Uno a uno se apagan y desaparecen
 * hasta quedar solo 2. El espectador SIENTE la urgencia de actuar antes de que
 * sea tarde — sin texto manipulador, solo el mecanismo visual.
 * Lever: escasez / urgencia. Paleta: ámbar. V.
 */
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { Stage, SiriGlow, SiriFrame, ip, fonts } from './kit';

const AMBER   = '#F59E0B';
const AMBER_L = '#FCD34D';
const AMBER_D = '#78350F';

export const ESCASEZ_DURATION = 320;

const TOTAL = 5;
// frames en que cada slot se apaga (0..4)
const FADE_AT = [40, 68, 96, 124, -1]; // -1 = nunca se apaga (los 2 restantes son idx 3 y 4)
// Solo apagamos 0, 1, 2 → quedan 3 y 4 (último par)

export const Escasez: React.FC = () => {
  const f = useCurrentFrame();

  const labelOp   = ip(f,  8,  26, 0, 1) * (1 - ip(f, 140, 158, 0, 1));
  // Los 5 slots aparecen al inicio con stagger
  const slotsIn   = ip(f, 14,  44, 0, 1);
  // Glow de los últimos 2 (pulsante)
  const pulse     = 0.5 + 0.5 * Math.sin(f * 0.22);
  const lastGlow  = ip(f, 138, 162, 0, 1) * (1 - ip(f, 214, 232, 0, 1));
  const realOp    = ip(f, 168, 188, 0, 1) * (1 - ip(f, 218, 236, 0, 1));
  const sceneFade = 1 - ip(f, 222, 242, 0, 1);
  const pay  = ip(f, 248, 268, 0, 1);
  const l1   = ip(f, 268, 284, 0, 1);
  const l2   = ip(f, 292, 308, 0, 1);

  const SLOT_R = 100; // radio
  const GAP    = 54;

  return (
    <Stage bg="radial-gradient(130% 100% at 50% 44%, #1A1000 0%, #090500 82%)" hue={AMBER} seed={6}>
      <div style={{
        position: 'absolute', top: 272, left: 90, right: 130,
        textAlign: 'center', fontFamily: fonts.mono,
        fontSize: 36, letterSpacing: '0.18em',
        color: 'rgba(255,255,255,0.60)', opacity: labelOp, zIndex: 30,
      }}>
        LUGARES DISPONIBLES
      </div>

      {/* ── Los 5 slots ─────────────────────────────────────────────────────── */}
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', opacity: sceneFade, zIndex: 10 }}>
        <div style={{
          display: 'flex', gap: GAP, alignItems: 'center',
          opacity: slotsIn,
          transform: `translateY(${(1 - slotsIn) * 28}px)`,
        }}>
          {Array.from({ length: TOTAL }).map((_, i) => {
            const fadeAt = FADE_AT[i];
            const isAlive = fadeAt < 0 || f < fadeAt;
            const fadeOp  = fadeAt >= 0 ? 1 - ip(f, fadeAt, fadeAt + 22, 0, 1) : 1;
            const isLast2 = i >= TOTAL - 2;
            const glowPow = isLast2 ? lastGlow * pulse : 0;

            return (
              <div key={i} style={{
                width: SLOT_R * 2, height: SLOT_R * 2,
                position: 'relative',
                opacity: isAlive ? fadeOp : fadeOp,
                transform: `scale(${isAlive ? 1 : 0.6 + fadeOp * 0.4})`,
              }}>
                {isLast2 && <SiriGlow frame={f} intensity={glowPow} radius={SLOT_R} />}
                <div style={{
                  position: 'absolute', inset: 0, borderRadius: '50%',
                  background: isAlive
                    ? (isLast2
                      ? `radial-gradient(circle, ${AMBER}33 0%, ${AMBER}11 60%, transparent 85%)`
                      : 'rgba(255,255,255,0.07)')
                    : 'transparent',
                  border: `2px solid ${isAlive ? (isLast2 ? AMBER + 'cc' : 'rgba(255,255,255,0.22)') : 'rgba(255,255,255,0.05)'}`,
                  backdropFilter: 'blur(10px)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: isLast2 && isAlive ? `0 0 40px 8px ${AMBER}44` : 'none',
                }}>
                  {isAlive && (
                    <div style={{
                      fontFamily: fonts.display, fontWeight: 800, fontSize: 68,
                      color: isLast2 ? AMBER_L : 'rgba(200,200,220,0.70)',
                      textShadow: isLast2 ? `0 0 30px ${AMBER}aa` : 'none',
                    }}>{i + 1}</div>
                  )}
                  {!isAlive && (
                    <div style={{
                      fontFamily: fonts.display, fontWeight: 800, fontSize: 60,
                      color: 'rgba(255,255,255,0.12)',
                    }}>✕</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Contador de disponibles */}
        <div style={{
          position: 'absolute', bottom: 460, left: 90, right: 130,
          textAlign: 'center',
          opacity: ip(f, 130, 152, 0, 1) * sceneFade,
        }}>
          <span style={{
            fontFamily: fonts.display, fontWeight: 800, fontSize: 96,
            color: AMBER_L, letterSpacing: '-0.04em',
            textShadow: `0 0 50px ${AMBER}bb`,
          }}>
            {Math.max(0, TOTAL - [0,1,2].filter(idx => f >= FADE_AT[idx] + 22).length)}
          </span>
          <span style={{
            fontFamily: fonts.mono, fontSize: 40,
            color: 'rgba(200,170,90,0.70)', marginLeft: 18,
          }}>
            / 5 disponibles
          </span>
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
          color: AMBER_L, letterSpacing: '-0.025em',
          textAlign: 'center', lineHeight: 1.35,
          textShadow: `0 0 36px ${AMBER}77`,
        }}>
          Quedás o te quedás afuera.
          <br />
          <span style={{ color: 'rgba(220,185,100,0.60)', fontWeight: 500, fontSize: 46 }}>
            Y eso no es presión. Es la realidad.
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
            color: '#FFF8E7', letterSpacing: '-0.035em', lineHeight: 1.06,
            opacity: l1, transform: `translateY(${(1 - l1) * 22}px)`,
          }}>Lo escaso<br />se desea.</div>
          <div style={{
            fontFamily: fonts.display, fontWeight: 800, fontSize: 86,
            color: AMBER_L, letterSpacing: '-0.04em', lineHeight: 1.05,
            textShadow: `0 0 60px ${AMBER}bb`,
            opacity: l2, transform: `translateY(${(1 - l2) * 26}px)`,
          }}>Pero sin mentir.</div>
          <div style={{
            fontFamily: fonts.display, fontSize: 50,
            color: AMBER_D, lineHeight: 1.45,
            opacity: ip(f, 296, 314, 0, 1), transform: `translateY(${(1 - ip(f, 296, 314, 0, 1)) * 16}px)`,
            marginTop: 12,
          }}>
            La escasez real convierte.<br />La escasez falsa destruye la confianza.
          </div>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};
