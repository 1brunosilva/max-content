/**
 * PuertaCerrada — Psychological Reactance / Exclusivity.
 * Cuando algo está cerrado o prohibido, lo queremos más.
 * Un botón "EXCLUSIVO — CERRADO" → el deseo crece → se abre con glow.
 * Lever: psychological reactance / exclusivity. Palette: violeta. Mode: glassy-oscuro. V.
 */
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { Stage, Glass, SiriGlow, SiriFrame, BigType, ip, fonts, VLT, VLT_L } from './kit';

export const PUERTACERRADA_DURATION = 270;

export const PuertaCerrada: React.FC = () => {
  const f = useCurrentFrame();

  const titleOp   = ip(f, 8, 26, 0, 1) * (1 - ip(f, 186, 202, 0, 1));
  const lockIn    = ip(f, 22, 46, 0, 1);
  const desireBar = ip(f, 46, 138, 0, 100);
  const desireOp  = ip(f, 46, 64, 0, 1) * (1 - ip(f, 186, 202, 0, 1));
  const unlockI   = ip(f, 144, 172, 0, 1);
  const openLabel = ip(f, 162, 180, 0, 1) * (1 - ip(f, 186, 202, 0, 1));
  const pay       = ip(f, 194, 222, 0, 1);

  const glowIntensity = unlockI;

  return (
    <Stage
      bg="radial-gradient(130% 90% at 50% 44%, #100B1F 0%, #060310 80%)"
      hue={VLT}
      seed={5}
    >
      {/* Title */}
      <div style={{
        position: 'absolute', top: 240, left: 90, right: 130, textAlign: 'center',
        fontFamily: fonts.mono, fontSize: 19, letterSpacing: '0.16em',
        color: `${VLT_L}66`, opacity: titleOp,
      }}>
        ACCESO EXCLUSIVO · SOLO POR INVITACIÓN
      </div>

      <AbsoluteFill style={{ opacity: 1 - pay }}>
        <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 44 }}>

            {/* Lock card */}
            <div style={{
              opacity: lockIn,
              transform: `scale(${0.88 + lockIn * 0.12})`,
              position: 'relative', width: 580,
            }}>
              {glowIntensity > 0.05 ? <SiriGlow frame={f} intensity={glowIntensity * 0.9} radius={34} /> : null}
              <Glass w={580} h={220} pad={36} selected={glowIntensity > 0.3}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
                  {/* Lock icon */}
                  <div style={{
                    width: 80, height: 80, borderRadius: 20, flexShrink: 0,
                    background: glowIntensity > 0.2 ? `${VLT}33` : 'rgba(255,255,255,0.06)',
                    border: `2px solid ${glowIntensity > 0.2 ? VLT_L + '88' : 'rgba(255,255,255,0.18)'}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: glowIntensity > 0.2 ? `0 0 28px ${VLT}66` : 'none',
                    transition: 'all 0.4s',
                  }}>
                    {unlockI < 0.5 ? (
                      <svg viewBox="0 0 24 24" width="36" height="36" fill="none">
                        <path d="M18 11H6a2 2 0 00-2 2v7a2 2 0 002 2h12a2 2 0 002-2v-7a2 2 0 00-2-2z" stroke={VLT_L} strokeWidth="1.8" />
                        <path d="M8 11V7a4 4 0 018 0v4" stroke={VLT_L} strokeWidth="1.8" strokeLinecap="round" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" width="36" height="36" fill="none">
                        <path d="M18 11H6a2 2 0 00-2 2v7a2 2 0 002 2h12a2 2 0 002-2v-7a2 2 0 00-2-2z" stroke={VLT_L} strokeWidth="1.8" />
                        <path d="M8 11V7a4 4 0 017.75-1.66" stroke={VLT_L} strokeWidth="1.8" strokeLinecap="round" />
                      </svg>
                    )}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontFamily: fonts.display, fontWeight: 800, fontSize: 42,
                      color: glowIntensity > 0.2 ? VLT_L : 'rgba(200,170,255,0.6)',
                      letterSpacing: '-0.025em',
                      textShadow: glowIntensity > 0.2 ? `0 0 22px ${VLT}BB` : 'none',
                    }}>
                      {unlockI < 0.5 ? 'ACCESO CERRADO' : 'ACCESO ABIERTO'}
                    </div>
                    <div style={{
                      fontFamily: fonts.mono, fontSize: 17, letterSpacing: '0.1em',
                      color: `${VLT_L}66`, marginTop: 8,
                    }}>
                      {unlockI < 0.5 ? 'Lista de espera activa' : '✓ Entrás ahora'}
                    </div>
                  </div>
                </div>
              </Glass>
            </div>

            {/* Desire bar */}
            <div style={{ width: 580, opacity: desireOp }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                <div style={{ fontFamily: fonts.mono, fontSize: 17, letterSpacing: '0.12em', color: `${VLT_L}77` }}>
                  DESEO
                </div>
                <div style={{
                  fontFamily: fonts.display, fontWeight: 900, fontSize: 38,
                  color: glowIntensity > 0.2 ? VLT_L : `${VLT_L}AA`,
                  textShadow: glowIntensity > 0.2 ? `0 0 18px ${VLT}BB` : 'none',
                }}>
                  {Math.round(desireBar)}%
                </div>
              </div>
              <div style={{ height: 16, borderRadius: 8, background: 'rgba(255,255,255,0.05)', overflow: 'hidden' }}>
                <div style={{
                  height: '100%', borderRadius: 8, width: `${desireBar}%`,
                  background: `linear-gradient(90deg, ${VLT} 0%, ${VLT_L} 100%)`,
                  boxShadow: desireBar > 70 ? `0 0 18px ${VLT}99` : 'none',
                }} />
              </div>
              <div style={{
                fontFamily: fonts.display, fontSize: 28, color: `${VLT_L}66`,
                marginTop: 12, textAlign: 'center',
                opacity: ip(f, 80, 100, 0, 1) * (1 - ip(f, 186, 202, 0, 1)),
              }}>
                Lo cerrado despierta más deseo.
              </div>
            </div>

            {/* Open label */}
            <div style={{
              opacity: openLabel,
              fontFamily: fonts.display, fontWeight: 700, fontSize: 40,
              color: VLT_L, textAlign: 'center',
              textShadow: `0 0 24px ${VLT}AA`,
              letterSpacing: '-0.02em',
            }}>
              Y cuando se abre... ya lo querías.
            </div>
          </div>
        </AbsoluteFill>
      </AbsoluteFill>

      {/* Payoff */}
      <AbsoluteFill style={{
        alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', padding: '0 96px',
        opacity: pay, zIndex: 200,
      }}>
        <SiriFrame frame={f} intensity={pay} />
        <div style={{ transform: `translateY(${(1 - pay) * 28}px)` }}>
          <BigType frame={f} s={194} size={88} lines={[
            { t: 'Prohibir' },
            { t: 'aumenta', hl: false },
            { t: 'el deseo.', hl: true },
          ]} />
          <div style={{
            fontFamily: fonts.display, fontSize: 30,
            color: `${VLT_L}77`, marginTop: 28,
            opacity: ip(f, 234, 254, 0, 1),
          }}>
            La exclusividad no se negocia.
          </div>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};
