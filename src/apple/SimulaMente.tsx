/**
 * SimulaMente — Mental Simulation / Ownership Visualization.
 * Antes de comprar, tu cliente ya se imagina usándolo.
 * Una silueta vacía de negocio ideal → features se materializan una a una → glow Siri.
 * Lever: mental simulation / ownership visualization. Palette: rosa/violeta. Mode: glassy-oscuro. C.
 */
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { Stage, Glass, SiriGlow, SiriFrame, BigType, ip, fonts } from './kit';

const ROSE   = '#EC4899';
const ROSE_L = '#F9A8D4';

const FEATURES = [
  { icon: '💬', label: 'Chatbot 24/7',        frame: 36  },
  { icon: '📊', label: 'Dashboard en tiempo real', frame: 64 },
  { icon: '🔄', label: 'Automatización de leads', frame: 92 },
  { icon: '⭐', label: 'Reseñas automáticas',  frame: 120 },
];

export const SIMULAMENTE_DURATION = 270;

export const SimulaMente: React.FC = () => {
  const f = useCurrentFrame();

  const titleOp  = ip(f, 8, 26, 0, 1) * (1 - ip(f, 188, 204, 0, 1));
  const siluetaIn = ip(f, 18, 40, 0, 1);
  const glowI    = ip(f, 128, 158, 0, 1);
  const taglineOp = ip(f, 158, 176, 0, 1) * (1 - ip(f, 188, 204, 0, 1));
  const pay      = ip(f, 196, 224, 0, 1);

  return (
    <Stage
      bg="radial-gradient(130% 90% at 50% 42%, #150616 0%, #080309 80%)"
      hue={ROSE}
      seed={8}
    >
      {/* Title */}
      <div style={{
        position: 'absolute', top: 240, left: 90, right: 130, textAlign: 'center',
        fontFamily: fonts.mono, fontSize: 19, letterSpacing: '0.16em',
        color: `${ROSE_L}66`, opacity: titleOp,
      }}>
        IMAGINÁ QUE YA LO TENÉS
      </div>

      <AbsoluteFill style={{ opacity: 1 - pay }}>
        <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ position: 'relative', width: 680 }}>

            {/* Outer business card — silueta */}
            <div style={{ opacity: siluetaIn, position: 'relative' }}>
              {glowI > 0.05 ? <SiriGlow frame={f} intensity={glowI * 0.75} radius={36} /> : null}
              <Glass w={680} h={520} pad={40} selected={glowI > 0.3} style={{
                border: `1.5px solid ${glowI > 0.2 ? ROSE + '99' : 'rgba(236,72,153,0.25)'}`,
                background: glowI > 0.2 ? 'rgba(236,72,153,0.07)' : 'rgba(255,255,255,0.03)',
              }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <div style={{
                    fontFamily: fonts.mono, fontSize: 17, letterSpacing: '0.14em',
                    color: glowI > 0.2 ? ROSE_L + 'AA' : 'rgba(249,168,212,0.4)',
                    marginBottom: 10,
                  }}>
                    TU NEGOCIO · VERSIÓN IDEAL
                  </div>

                  {FEATURES.map((feat, i) => {
                    const featIn  = ip(f, feat.frame, feat.frame + 22, 0, 1);
                    const featGl  = glowI > 0.2 ? glowI * 0.6 : 0;
                    return (
                      <div key={i} style={{
                        display: 'flex', alignItems: 'center', gap: 20,
                        opacity: featIn,
                        transform: `translateX(${(1 - featIn) * -18}px)`,
                        padding: '12px 0',
                        borderBottom: i < FEATURES.length - 1 ? `1px solid rgba(236,72,153,${0.08 + glowI * 0.1})` : 'none',
                      }}>
                        <div style={{
                          width: 50, height: 50, borderRadius: 14, flexShrink: 0,
                          background: featGl > 0 ? `${ROSE}22` : 'rgba(236,72,153,0.1)',
                          border: `1.5px solid ${featGl > 0 ? ROSE + '66' : 'rgba(236,72,153,0.25)'}`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: 22,
                        }}>
                          {feat.icon}
                        </div>
                        <div style={{
                          fontFamily: fonts.display, fontWeight: 600, fontSize: 30,
                          color: featGl > 0 ? ROSE_L : 'rgba(249,168,212,0.7)',
                          letterSpacing: '-0.02em',
                          textShadow: featGl > 0 ? `0 0 16px ${ROSE}88` : 'none',
                        }}>{feat.label}</div>
                        <div style={{
                          marginLeft: 'auto',
                          fontFamily: fonts.mono, fontSize: 14,
                          color: featGl > 0 ? ROSE + 'CC' : 'rgba(236,72,153,0.4)',
                        }}>✓</div>
                      </div>
                    );
                  })}
                </div>
              </Glass>
            </div>

            {/* Tagline */}
            <div style={{
              position: 'absolute', bottom: -70, left: 0, right: 0, textAlign: 'center',
              fontFamily: fonts.display, fontWeight: 700, fontSize: 36,
              color: ROSE_L, opacity: taglineOp,
              textShadow: `0 0 22px ${ROSE}99`,
              letterSpacing: '-0.02em',
            }}>
              Ya lo estás viviendo en tu cabeza.
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
          <BigType frame={f} s={196} size={88} lines={[
            { t: 'Si lo imaginaron,' },
            { t: 'ya lo', hl: false },
            { t: 'necesitan.', hl: true },
          ]} />
          <div style={{
            fontFamily: fonts.display, fontSize: 29,
            color: `${ROSE_L}77`, marginTop: 28,
            opacity: ip(f, 234, 254, 0, 1),
          }}>
            Hacélos visualizar el resultado.
          </div>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};
