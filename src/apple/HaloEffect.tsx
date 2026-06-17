/**
 * HaloEffect — Efecto halo (Halo Effect).
 * Una marca entra impecable. La cámara hace zoom en un detalle imperfecto
 * (logo pixelado, fuente barata). Luego vuelve a la vista completa — pero
 * ahora la marca entera se ve "manchada". El primer detalle tiñe todo.
 * Lever: efecto halo / primera impresión. Paleta: rosa/crema. C.
 */
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { Stage, SiriFrame, ip, fonts } from './kit';

const ROSE   = '#F472B6';
const ROSE_L = '#FBCFE8';
const CREAM  = '#F5F0E8';

export const HALOEFFECT_DURATION = 330;

export const HaloEffect: React.FC = () => {
  const f = useCurrentFrame();

  const labelOp = ip(f,  8,  26, 0, 1) * (1 - ip(f,  80,  98, 0, 1));

  // Fase 1: La marca entra limpia y elegante
  const brandIn  = ip(f, 14,  48, 0, 1);

  // Fase 2: Zoom al detalle problemático
  const zoomIn   = ip(f, 62, 110, 0, 1);    // 0=vista general, 1=zoom en el detalle
  const zoomScale = 1 + zoomIn * 2.8;
  const zoomX     = zoomIn * -120;   // se desplaza para centrar el detalle
  const zoomY     = zoomIn * 60;

  // El detalle problemático se revela con calidad pobre
  const detailReveal = ip(f, 88, 118, 0, 1);
  const glowBad = ip(f, 100, 130, 0, 1) * (1 - ip(f, 158, 178, 0, 1));

  // Fase 3: Zoom out — la marca ahora parece "manchada"
  const zoomOut  = ip(f, 148, 190, 0, 1);   // zoom vuelve a 1
  const taintOp  = ip(f, 168, 196, 0, 1);   // overlay de "mancha" sobre la marca

  const sceneFade = 1 - ip(f, 208, 228, 0, 1);
  const realOp    = ip(f, 188, 208, 0, 1) * (1 - ip(f, 212, 230, 0, 1));

  const pay  = ip(f, 236, 256, 0, 1);
  const l1   = ip(f, 256, 272, 0, 1);
  const l2   = ip(f, 280, 296, 0, 1);
  const psub = ip(f, 308, 326, 0, 1);

  const actualZoomScale = zoomIn < 1 ? zoomScale : (1 + (1 - zoomOut) * 2.8);
  const actualZoomX = zoomIn < 1 ? zoomX : zoomX * (1 - zoomOut);
  const actualZoomY = zoomIn < 1 ? zoomY : zoomY * (1 - zoomOut);

  return (
    <Stage bg="radial-gradient(130% 100% at 50% 44%, #1A0A12 0%, #090407 82%)" hue={ROSE} seed={16}>
      <div style={{
        position: 'absolute', top: 272, left: 90, right: 130,
        textAlign: 'center', fontFamily: fonts.mono,
        fontSize: 36, letterSpacing: '0.16em',
        color: 'rgba(255,255,255,0.60)', opacity: labelOp, zIndex: 30,
      }}>
        EL EFECTO HALO
      </div>

      <AbsoluteFill style={{ opacity: sceneFade, zIndex: 10 }}>
        <div style={{
          position: 'absolute', left: '50%', top: '50%',
          transform: `translate(calc(-50% + ${actualZoomX}px), calc(-50% + ${actualZoomY}px)) scale(${actualZoomScale})`,
          opacity: brandIn,
          width: 780,
        }}>
          {/* La marca "perfecta" */}
          <div style={{
            width: 780, borderRadius: 42,
            background: taintOp > 0.05
              ? `rgba(60,5,20,${0.05 + taintOp * 0.12})`
              : 'rgba(255,255,255,0.06)',
            border: `1px solid ${taintOp > 0.05 ? `rgba(220,80,100,${taintOp * 0.35})` : 'rgba(255,255,255,0.12)'}`,
            backdropFilter: 'blur(16px)',
            padding: '52px 56px',
            boxShadow: taintOp > 0.05
              ? `0 0 80px -20px rgba(220,60,80,${taintOp * 0.3})`
              : '0 40px 100px -34px rgba(0,0,0,0.85)',
          }}>
            {/* Header de marca */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 28, marginBottom: 36 }}>
              {/* Logo "pixelado / barato" */}
              <div style={{ position: 'relative' }}>
                <div style={{
                  width: 96, height: 96, borderRadius: 20,
                  background: 'linear-gradient(135deg, #c0392b, #8e44ad)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  imageRendering: 'pixelated',
                  // Cuando el zoom revela el detalle, se ve la "baja calidad"
                  filter: detailReveal > 0.3 ? `blur(${detailReveal * 1.5}px) contrast(2)` : 'none',
                  opacity: detailReveal > 0.3 ? 1 : 1,
                }}>
                  <div style={{
                    fontFamily: 'monospace', fontSize: 44, fontWeight: 900, color: '#fff',
                    letterSpacing: '-0.04em',
                    // Fuente que parece "barata" al hacer zoom
                    fontStretch: 'condensed',
                  }}>MA</div>
                </div>
                {/* Indicador de "baja resolución" */}
                {detailReveal > 0.2 && (
                  <div style={{
                    position: 'absolute', top: -8, right: -8,
                    background: '#ef4444', borderRadius: '50%',
                    width: 28, height: 28,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: fonts.mono, fontSize: 18, color: '#fff',
                    opacity: detailReveal,
                    boxShadow: `0 0 12px 4px rgba(239,68,68,0.6)`,
                  }}>!</div>
                )}
              </div>
              <div>
                <div style={{ fontFamily: fonts.display, fontWeight: 700, fontSize: 58, color: CREAM, letterSpacing: '-0.03em' }}>
                  Mi Agencia
                </div>
                <div style={{
                  fontFamily: 'Comic Sans MS, cursive', fontSize: 34,
                  color: taintOp > 0.05 ? `rgba(220,120,140,${0.5 + taintOp * 0.3})` : 'rgba(180,160,175,0.55)',
                  filter: detailReveal > 0.2 ? 'none' : 'blur(1px)',
                }}>
                  {/* Fuente incorrecta / barata */}
                  "Soluciones para su empresa"
                </div>
              </div>
            </div>

            {/* Body de la propuesta */}
            {['Experiencia comprobada', 'Equipo comprometido', 'Resultados garantizados'].map((t, i) => (
              <div key={i} style={{
                fontFamily: fonts.display, fontSize: 44,
                color: taintOp > 0.05
                  ? `rgba(200,170,180,${0.6 - taintOp * 0.2})`
                  : 'rgba(200,185,200,0.65)',
                lineHeight: 1.6, display: 'flex', alignItems: 'center', gap: 16,
              }}>
                <span style={{ color: taintOp > 0.05 ? `rgba(220,80,100,${taintOp * 0.7})` : `${ROSE}77` }}>•</span> {t}
              </div>
            ))}
          </div>

          {/* Glow de "problema" en el logo */}
          {glowBad > 0.05 && (
            <div style={{
              position: 'absolute', left: 56, top: 52,
              width: 96, height: 96,
            }}>
              <div style={{
                position: 'absolute', inset: -16, borderRadius: 36,
                background: 'radial-gradient(circle, rgba(239,68,68,0.6) 0%, transparent 70%)',
                filter: 'blur(12px)',
                opacity: glowBad,
              }} />
            </div>
          )}
        </div>
      </AbsoluteFill>

      {/* Realización */}
      <AbsoluteFill style={{
        alignItems: 'center', justifyContent: 'flex-end',
        paddingBottom: 450, paddingLeft: 90, paddingRight: 130,
        opacity: realOp * sceneFade, zIndex: 40,
      }}>
        <div style={{
          fontFamily: fonts.display, fontWeight: 700, fontSize: 60,
          color: ROSE_L, letterSpacing: '-0.025em',
          textAlign: 'center', lineHeight: 1.35,
          textShadow: `0 0 36px ${ROSE}77`,
        }}>
          Un detalle barato<br />mancha todo lo demás.
          <br />
          <span style={{ color: 'rgba(240,190,220,0.60)', fontWeight: 500, fontSize: 46 }}>
            Aunque todo lo demás sea excelente.
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
          }}>El primer detalle<br />tiñe todo el resto.</div>
          <div style={{
            fontFamily: fonts.display, fontWeight: 800, fontSize: 88,
            color: ROSE_L, letterSpacing: '-0.04em', lineHeight: 1.05,
            textShadow: `0 0 60px ${ROSE}bb`,
            opacity: l2, transform: `translateY(${(1 - l2) * 26}px)`,
          }}>Cuidá el primer<br />segundo.</div>
          <div style={{
            fontFamily: fonts.display, fontSize: 50,
            color: 'rgba(210,150,185,0.65)', lineHeight: 1.45,
            opacity: psub, transform: `translateY(${(1 - psub) * 16}px)`,
            marginTop: 12,
          }}>
            Logo, fuente, paleta.<br />Todo habla antes que vos.
          </div>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};
