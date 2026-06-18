/**
 * IdentidadRol — Motivación basada en identidad.
 * Una card con el ROL ACTUAL (dim, abrumado) transiciona al ROL FUTURO (glow).
 * No comprás una herramienta: elegís quién sos. El espectador siente que
 * la decisión es una declaración de identidad, no un gasto de dinero.
 * Lever: identity-based motivation. Palette: violeta. Mode: glassy-oscuro. C.
 */
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { Stage, Glass, SiriGlow, SiriFrame, BigType, ip, fonts, VLT, VLT_L } from './kit';

const TAGS_BEFORE = ['Apagando incendios todo el día', 'Atrapado en lo urgente', 'Sin tiempo para crecer'];
const TAGS_AFTER  = ['Construyendo sistemas que escalan', 'Libre para lo importante', 'Liderando el crecimiento'];

export const IDENTIDADROL_DURATION = 280;

export const IdentidadRol: React.FC = () => {
  const f = useCurrentFrame();

  const cardsIn = ip(f, 8, 40, 0, 1);
  const flip = ip(f, 70, 110, 0, 1);
  const glowI = ip(f, 118, 155, 0, 1);
  const pay = ip(f, 182, 212, 0, 1);
  const labelOp = ip(f, 4, 22, 0, 1) * (1 - pay);

  const showBefore = flip < 0.5;
  const cardOp = showBefore ? Math.max(0, 1 - flip * 2) : Math.min(1, (flip - 0.5) * 2);

  const tags = showBefore ? TAGS_BEFORE : TAGS_AFTER;
  const tagStartFrame = showBefore ? 18 : 95;

  return (
    <Stage bg="radial-gradient(120% 90% at 50% 38%, #120F1D 0%, #060408 80%)" hue={VLT_L} seed={14}>
      <div style={{
        position: 'absolute', top: 130, left: 0, right: 0, textAlign: 'center',
        fontFamily: fonts.mono, fontSize: 22, letterSpacing: '0.18em',
        color: 'rgba(255,255,255,0.65)', opacity: labelOp, zIndex: 30,
      }}>
        TU IDENTIDAD COMO DUEÑO
      </div>

      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', opacity: 1 - pay }}>
        <div style={{ width: 820, opacity: cardsIn }}>
          <div style={{
            position: 'relative',
            transform: `translateZ(${glowI * 50}px) scale(${1 + glowI * 0.03})`,
          }}>
            {!showBefore && glowI > 0.05 ? <SiriGlow frame={f} intensity={glowI} radius={30} /> : null}
            <Glass
              w={820}
              pad={44}
              selected={!showBefore && glowI > 0.3}
              style={{
                opacity: cardOp,
                border: `1px solid ${!showBefore && glowI > 0.3 ? VLT + '66' : 'rgba(255,255,255,0.08)'}`,
              }}
            >
              <div style={{ textAlign: 'center', marginBottom: 28 }}>
                <div style={{ fontFamily: fonts.mono, fontSize: 16, letterSpacing: '0.18em', color: showBefore ? '#5A5A72' : VLT_L, marginBottom: 16 }}>
                  {showBefore ? 'ROL ACTUAL' : 'ROL QUE ELEGÍS'}
                </div>
                <div style={{ fontFamily: fonts.display, fontWeight: 900, fontSize: 58, color: showBefore ? '#6A6A82' : '#E8E8F8', letterSpacing: '-0.04em', lineHeight: 1 }}>
                  {showBefore ? 'DUEÑO OCUPADO' : 'DUEÑO QUE ESCALA'}
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {tags.map((t, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'center', gap: 18,
                    opacity: ip(f, tagStartFrame + i * 8, tagStartFrame + i * 8 + 18, 0, 1) * cardOp,
                  }}>
                    <div style={{
                      width: 10, height: 10, borderRadius: '50%', flexShrink: 0,
                      background: showBefore ? '#5A5A72' : VLT_L,
                      boxShadow: !showBefore ? `0 0 10px ${VLT}` : 'none',
                    }} />
                    <div style={{ fontFamily: fonts.display, fontSize: 28, color: showBefore ? '#5A5A72' : '#C8C8E8', letterSpacing: '-0.02em' }}>
                      {t}
                    </div>
                  </div>
                ))}
              </div>
            </Glass>
          </div>
        </div>
      </AbsoluteFill>

      {/* Payoff */}
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 96, opacity: pay, zIndex: 200 }}>
        <SiriFrame frame={f} intensity={pay} />
        <div style={{ transform: `translateY(${(1 - pay) * 28}px)` }}>
          <BigType frame={f} s={182} size={88} lines={[
            { t: 'No comprás' },
            { t: 'una herramienta.' },
            { t: 'Elegís', hl: false },
            { t: 'quién sos.', hl: true },
          ]} />
          <div style={{ fontFamily: fonts.display, fontSize: 32, color: '#8A8AAA', marginTop: 28, opacity: ip(f, 222, 244, 0, 1) }}>
            La identidad mueve más que cualquier beneficio.
          </div>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};
