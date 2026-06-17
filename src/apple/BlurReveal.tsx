/**
 * BlurReveal — mecanismo #16: Context-dependent Mere Exposure.
 * Tu marca conocida (borrosa) vs competidor desconocido (nítido).
 * El espectador prefiere al nítido sin darse cuenta.
 * Lever: fluidez de procesamiento / mera exposición contextual. Paleta: dorado/rosa.
 */
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { Stage, Glass, SiriFrame, BigType, ip, fonts } from './kit';

const GOLD = '#F59E0B';
const ROSE = '#FB7185';

// Glow dorado/rosa — distinto al Siri cyan del kit, paleta propia del video
const GoldGlow: React.FC<{ frame: number; intensity: number; radius: number }> = ({ frame, intensity, radius }) => {
  if (intensity <= 0.001) return null;
  const pulse = 0.72 + 0.28 * Math.sin(frame * 0.18);
  return (
    <>
      <div style={{
        position: 'absolute', inset: -36, borderRadius: radius + 36,
        background: `conic-gradient(from 0deg, ${GOLD}, ${ROSE}, #FF6FD8, ${GOLD})`,
        filter: 'blur(46px)', opacity: 0.52 * intensity * pulse,
      }} />
      <div style={{
        position: 'absolute', inset: -3, borderRadius: radius + 3,
        background: `linear-gradient(135deg, ${GOLD}, ${ROSE})`,
        filter: 'blur(1px)', opacity: 0.88 * intensity,
      }} />
    </>
  );
};

const CW = 400;
const CH = 490;

// Timings (30fps):
// 0-50   : label
// 32-64  : cards entran (stagger izq→der)
// 82-110 : glow dorado en card derecha
// 118-172: "PREFERISTE ESTA" (sale antes del payoff)
// 154-170: "Aunque nunca la viste antes."
// 178-196: scene fade
// 198-340: payoff con hold ~4.7s

export const BLURREVEAL_DURATION = 340;

export const BlurReveal: React.FC = () => {
  const f = useCurrentFrame();

  const labelOp    = ip(f,  6,  22, 0, 1) * (1 - ip(f, 36, 52, 0, 1));
  const cardL      = ip(f, 32,  52, 0, 1);
  const cardR      = ip(f, 44,  64, 0, 1);
  const glowR      = ip(f, 82, 110, 0, 1);
  const preferiste = ip(f, 118, 134, 0, 1) * (1 - ip(f, 160, 174, 0, 1));
  const aunque     = ip(f, 152, 168, 0, 1);
  const sceneFade  = 1 - ip(f, 178, 196, 0, 1);
  const pay        = ip(f, 198, 216, 0, 1);

  return (
    <Stage
      bg="radial-gradient(128% 96% at 50% 40%, #16100A 0%, #060504 80%)"
      hue={GOLD}
      seed={5}
    >
      {/* Label */}
      <div style={{
        position: 'absolute', top: 272, left: 90, right: 130,
        textAlign: 'center', fontFamily: fonts.mono,
        fontSize: 28, letterSpacing: '0.18em',
        color: 'rgba(255,255,255,0.62)', opacity: labelOp, zIndex: 30,
      }}>
        UNA DECISIÓN RÁPIDA
      </div>

      {/* ── Las dos cards ── */}
      <AbsoluteFill style={{ opacity: sceneFade, zIndex: 10 }}>
        <div style={{
          position: 'absolute', left: '50%', top: '46%',
          transform: 'translate(-50%, -50%)',
          display: 'flex', gap: 40, alignItems: 'flex-start',
        }}>

          {/* Card izquierda — TU MARCA (borrosa) */}
          <div style={{
            opacity: cardL,
            transform: `translateY(${(1 - cardL) * 38}px)`,
          }}>
            <Glass w={CW} h={CH} pad={36} style={{
              background: 'rgba(255,255,255,0.03)',
              borderColor: 'rgba(255,255,255,0.08)',
              justifyContent: 'flex-start',
            }}>
              {/* Contenido borroso — decorativo, no necesita ser legible */}
              <div style={{ filter: 'blur(5px)', display: 'flex', flexDirection: 'column' }}>
                <div style={{
                  width: 72, height: 72, borderRadius: '50%',
                  background: 'rgba(255,255,255,0.12)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: 22, flexShrink: 0,
                }}>
                  <span style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: 40, color: 'rgba(255,255,255,0.5)' }}>T</span>
                </div>
                <div style={{
                  fontFamily: fonts.display, fontWeight: 800, fontSize: 52,
                  color: 'rgba(255,255,255,0.5)', letterSpacing: '-0.02em', marginBottom: 14,
                }}>
                  Tu Marca
                </div>
                <div style={{
                  fontFamily: fonts.display, fontSize: 40,
                  color: 'rgba(255,255,255,0.32)', lineHeight: 1.4,
                }}>
                  Soluciones para<br />tu empresa
                </div>
              </div>
              {/* Label al pie — sin blur */}
              <div style={{
                fontFamily: fonts.mono, fontSize: 40, letterSpacing: '0.12em',
                color: 'rgba(255,255,255,0.18)', marginTop: 'auto', paddingTop: 20,
              }}>
                CONOCIDA
              </div>
            </Glass>
          </div>

          {/* Card derecha — COMPETIDOR (nítida) */}
          <div style={{
            opacity: cardR,
            transform: `translateY(${(1 - cardR) * 38}px)`,
          }}>
            <div style={{ position: 'relative' }}>
              <GoldGlow frame={f} intensity={glowR} radius={34} />
              <Glass w={CW} h={CH} pad={36} style={{
                background: glowR > 0.02
                  ? 'linear-gradient(165deg, rgba(32,20,8,0.92) 0%, rgba(14,8,2,0.94) 100%)'
                  : 'rgba(255,255,255,0.05)',
                borderColor: `rgba(245,158,11,${Math.min(glowR * 0.65, 1).toFixed(2)})`,
                justifyContent: 'flex-start',
              }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <div style={{
                    width: 72, height: 72, borderRadius: '50%',
                    background: `linear-gradient(135deg, ${GOLD}, ${ROSE})`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: 22, flexShrink: 0,
                  }}>
                    <span style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: 40, color: '#fff' }}>N</span>
                  </div>
                  <div style={{
                    fontFamily: fonts.display, fontWeight: 800, fontSize: 52,
                    color: '#FFF8EE', letterSpacing: '-0.02em', marginBottom: 14,
                    textShadow: glowR > 0.4 ? `0 0 28px ${GOLD}77` : 'none',
                  }}>
                    Nova
                  </div>
                  <div style={{
                    fontFamily: fonts.display, fontSize: 40,
                    color: 'rgba(255,248,238,0.72)', lineHeight: 1.4, marginBottom: 22,
                  }}>
                    Hacemos crecer<br />tu negocio.
                  </div>
                  <div style={{ display: 'flex', gap: 6 }}>
                    {[1, 2, 3, 4, 5].map((k) => (
                      <span key={k} style={{ fontFamily: fonts.display, fontSize: 40, color: GOLD }}>★</span>
                    ))}
                  </div>
                </div>
                <div style={{
                  fontFamily: fonts.mono, fontSize: 40, letterSpacing: '0.12em',
                  color: `rgba(245,158,11,${Math.min(0.3 + glowR * 0.5, 1).toFixed(2)})`,
                  marginTop: 'auto', paddingTop: 20,
                }}>
                  NUEVA
                </div>
              </Glass>
            </div>

            {/* "ELEGISTE ESTA" */}
            <div style={{
              fontFamily: fonts.mono, fontSize: 40, letterSpacing: '0.06em',
              color: GOLD, textAlign: 'center', marginTop: 22,
              opacity: preferiste, whiteSpace: 'nowrap',
              textShadow: `0 0 22px ${GOLD}88`,
            }}>
              ↑ ELEGISTE ESTA
            </div>
          </div>
        </div>

        {/* "Aunque nunca la viste antes." */}
        <div style={{
          position: 'absolute', left: 90, right: 130,
          bottom: 460, textAlign: 'center',
          fontFamily: fonts.display, fontWeight: 600, fontSize: 52,
          color: 'rgba(255,230,180,0.88)', letterSpacing: '-0.02em',
          opacity: aunque,
          transform: `translateY(${(1 - aunque) * 20}px)`,
        }}>
          Aunque nunca la viste antes.
        </div>
      </AbsoluteFill>

      {/* ── PAYOFF ── */}
      <AbsoluteFill style={{
        alignItems: 'center', justifyContent: 'center', textAlign: 'center',
        padding: '0 96px', opacity: pay, zIndex: 200,
      }}>
        <SiriFrame frame={f} intensity={pay} />
        <div style={{ transform: `translateY(${(1 - pay) * 26}px)` }}>
          <BigType frame={f} s={198} size={88} lines={[
            { t: 'La claridad' },
            { t: 'supera a la' },
            { t: 'familiaridad.', hl: true },
          ]} />
          <div style={{
            fontFamily: fonts.display, fontSize: 52,
            color: 'rgba(255,220,160,0.78)', marginTop: 44, lineHeight: 1.4,
            opacity: ip(f, 230, 248, 0, 1),
          }}>
            Un competidor con<br />mejor presencia te gana<br />aunque te conozcan.
          </div>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};
