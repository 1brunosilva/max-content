/**
 * CaraConfianza — Mere exposure effect / efecto de mera exposición.
 * El logo/marca aparece 3 veces, cada vez más brillante. La barra
 * de familiaridad crece al 100%. Lo familiar genera confianza.
 * Lever: mere exposure effect. Palette: rosa/dorado cálido. Mode: glassy-oscuro cálido. C.
 */
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { Stage, SiriGlow, SiriFrame, BigType, ip, fonts } from './kit';

const GOLD   = '#F59E0B';
const GOLD_L = '#FCD34D';
const ROSE   = '#FF8C69';

export const CARACONFIANZA_DURATION = 268;

const IMPRESSIONS = [
  { label: '1ª IMPRESIÓN', startF: 0,   size: 110, opacity: 0.28, glowMul: 0   },
  { label: '2ª IMPRESIÓN', startF: 60,  size: 150, opacity: 0.62, glowMul: 0.4 },
  { label: '3ª IMPRESIÓN', startF: 120, size: 200, opacity: 1.0,  glowMul: 1.0 },
];

export const CaraConfianza: React.FC = () => {
  const f = useCurrentFrame();

  const pay        = ip(f, 215, 242, 0, 1);
  const barW       = ip(f, 0, 180, 0, 100);
  const barOp      = ip(f, 5, 22, 0, 1);
  const phaseGlowI = ip(f, 120, 175, 0, 1);
  const counterOp  = ip(f, 180, 210, 0, 1) * (1 - pay);

  return (
    <Stage
      bg="radial-gradient(120% 88% at 50% 42%, #1A0E12 0%, #080508 80%)"
      hue={ROSE}
      seed={5}
    >
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', opacity: 1 - pay }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 48 }}>

          {/* Three impressions */}
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 48 }}>
            {IMPRESSIONS.map((imp, i) => {
              const elIn = ip(f, imp.startF + 8, imp.startF + 36, 0, 1);
              const localGlow = imp.glowMul * ip(f, imp.startF + 28, imp.startF + 58, 0, 1);

              return (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18 }}>
                  <div style={{
                    fontFamily: fonts.mono, fontSize: 14, letterSpacing: '0.16em',
                    color: `rgba(255,220,180,${0.45 + imp.opacity * 0.3})`,
                    opacity: elIn,
                  }}>
                    {imp.label}
                  </div>
                  <div style={{
                    position: 'relative',
                    opacity: elIn * imp.opacity,
                    transform: `scale(${elIn * (0.8 + imp.opacity * 0.2) + (1 - elIn) * 0.7})`,
                  }}>
                    {localGlow > 0.05 ? <SiriGlow frame={f} intensity={localGlow * 0.9} radius={imp.size / 2 + 8} /> : null}
                    {/* Hexagon "C" logo */}
                    <div style={{
                      width: imp.size, height: imp.size,
                      borderRadius: '30%',
                      background: localGlow > 0.1
                        ? `linear-gradient(135deg, #2A1A08 0%, #1A0E04 100%)`
                        : 'rgba(255,255,255,0.06)',
                      border: `${2 + localGlow * 2}px solid ${localGlow > 0.1 ? GOLD + '99' : 'rgba(255,200,100,0.22)'}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      boxShadow: localGlow > 0.1 ? `0 0 ${40 * localGlow}px ${GOLD}66` : 'none',
                    }}>
                      <div style={{
                        fontFamily: fonts.display, fontWeight: 900,
                        fontSize: imp.size * 0.48, color: localGlow > 0.1 ? GOLD_L : 'rgba(255,200,130,0.55)',
                        letterSpacing: '-0.04em',
                        textShadow: localGlow > 0.1 ? `0 0 28px ${GOLD}aa` : 'none',
                      }}>C</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Familiarity bar */}
          <div style={{ width: 680, opacity: barOp }}>
            <div style={{
              fontFamily: fonts.mono, fontSize: 16, letterSpacing: '0.16em',
              color: 'rgba(255,200,130,0.65)', marginBottom: 12, textAlign: 'center',
            }}>FAMILIARIDAD</div>
            <div style={{
              width: '100%', height: 14, borderRadius: 7,
              background: 'rgba(255,255,255,0.08)',
              overflow: 'hidden',
            }}>
              <div style={{
                height: '100%', borderRadius: 7,
                background: `linear-gradient(90deg, ${ROSE} 0%, ${GOLD} 100%)`,
                width: `${barW}%`,
                boxShadow: phaseGlowI > 0.1 ? `0 0 18px ${GOLD}88` : 'none',
              }} />
            </div>
            <div style={{
              fontFamily: fonts.display, fontWeight: 800, fontSize: 42,
              color: GOLD_L, textAlign: 'center', marginTop: 8,
              textShadow: phaseGlowI > 0.1 ? `0 0 28px ${GOLD}aa` : 'none',
            }}>
              {Math.round(barW)}%
            </div>
          </div>

          {/* Counter text */}
          <div style={{
            fontFamily: fonts.display, fontWeight: 700, fontSize: 46,
            color: `rgba(255,220,170,0.85)`, letterSpacing: '-0.025em',
            opacity: counterOp, textAlign: 'center',
            textShadow: `0 0 32px ${GOLD}55`,
          }}>
            Confiás en lo familiar.
          </div>
        </div>
      </AbsoluteFill>

      {/* Payoff */}
      <AbsoluteFill style={{
        alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', padding: '0 96px',
        opacity: pay, zIndex: 200,
      }}>
        <SiriFrame frame={f} intensity={pay} />
        <div style={{ transform: `translateY(${(1 - pay) * 28}px)` }}>
          <BigType frame={f} s={215} size={88} lines={[
            { t: 'Lo que ven' },
            { t: 'seguido,' },
            { t: 'lo confían.', hl: true },
          ]} />
          <div style={{
            fontFamily: fonts.display, fontSize: 30,
            color: 'rgba(255,200,130,0.65)', marginTop: 28,
            opacity: ip(f, 252, 268, 0, 1),
          }}>
            Aparecer es una estrategia.
          </div>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};
