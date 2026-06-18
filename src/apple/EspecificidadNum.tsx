/**
 * EspecificidadNum — Efecto de especificidad numérica.
 * "100 clientes" suena inventado. "97 clientes verificados" suena real.
 * Los números exactos activan credibilidad cognitiva automáticamente.
 * El espectador siente la diferencia antes de que se la expliquen.
 * Lever: specificity / cognitive fluency. Palette: cyan-azul. Mode: glassy-oscuro. C.
 */
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { Stage, Glass, SiriGlow, SiriFrame, BigType, ip, fonts } from './kit';

const CYAN = '#4FE0FF';
const BLUE = '#5B8CFF';

export const ESPECIFICIDADNUM_DURATION = 265;

export const EspecificidadNum: React.FC = () => {
  const f = useCurrentFrame();

  const roundIn = ip(f, 8, 36, 0, 1);
  const strikeW = ip(f, 50, 76, 0, 1);
  const fakeOp = ip(f, 64, 82, 0, 1) * ip(f, 88, 102, 1, 0);
  const exactIn = ip(f, 95, 122, 0, 1);
  const glowI = ip(f, 120, 152, 0, 1);
  const checkOp = ip(f, 142, 162, 0, 1) * ip(f, 164, 176, 1, 0);
  const pay = ip(f, 176, 206, 0, 1);
  const labelOp = ip(f, 4, 22, 0, 1) * ip(f, 44, 60, 1, 0);

  return (
    <Stage bg="radial-gradient(120% 90% at 50% 38%, #04101A 0%, #020608 80%)" hue={BLUE} seed={6}>
      <div style={{
        position: 'absolute', top: 130, left: 0, right: 0, textAlign: 'center',
        fontFamily: fonts.mono, fontSize: 22, letterSpacing: '0.18em',
        color: 'rgba(255,255,255,0.65)', opacity: labelOp, zIndex: 30,
      }}>
        EL PODER DE LO EXACTO
      </div>

      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', opacity: 1 - pay }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 38, width: 820, alignItems: 'center' }}>

          {/* Round number — crossed out */}
          <div style={{ position: 'relative', opacity: roundIn, width: '100%' }}>
            <Glass w={820} h={158} pad={36} style={{
              border: '1px solid rgba(255,255,255,0.07)',
              opacity: 1 - ip(f, 95, 118, 0, 0.72),
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: fonts.mono, fontSize: 16, letterSpacing: '0.18em', color: '#4A4A62', marginBottom: 12 }}>
                  NÚMERO REDONDO
                </div>
                <div style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: 72, color: '#6A6A82', letterSpacing: '-0.04em', lineHeight: 1 }}>
                  100 clientes
                </div>
              </div>
            </Glass>
            {/* Strike-through */}
            <div style={{
              position: 'absolute', top: '50%', left: '8%',
              width: `${strikeW * 84}%`, height: 4,
              background: 'rgba(239,68,68,0.8)', borderRadius: 2,
              transform: 'translateY(-50%)',
            }} />
            {/* "¿Inventado?" */}
            <div style={{
              position: 'absolute', bottom: -30, right: 12,
              fontFamily: fonts.mono, fontSize: 18, color: '#EF4444',
              opacity: fakeOp, letterSpacing: '0.1em',
            }}>¿INVENTADO?</div>
          </div>

          {/* Exact number */}
          <div style={{
            position: 'relative', opacity: exactIn, width: '100%',
            transform: `translateZ(${glowI * 52}px) scale(${1 + glowI * 0.04})`,
          }}>
            {glowI > 0.05 ? <SiriGlow frame={f} intensity={glowI} radius={28} /> : null}
            <Glass w={820} h={178} pad={36} selected={exactIn > 0.5} style={{
              border: `1px solid ${CYAN}44`,
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: fonts.mono, fontSize: 16, letterSpacing: '0.18em', color: CYAN, marginBottom: 12 }}>
                  NÚMERO EXACTO
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 22 }}>
                  <div style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: 72, color: '#CCF0FF', letterSpacing: '-0.04em', lineHeight: 1 }}>
                    97 clientes
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, opacity: checkOp }}>
                    <svg width="28" height="28" viewBox="0 0 24 24">
                      <path d="M 3 12 L 9 18 L 21 6" stroke={CYAN} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <div style={{ fontFamily: fonts.mono, fontSize: 16, color: CYAN, letterSpacing: '0.1em' }}>VERIFICADOS</div>
                  </div>
                </div>
              </div>
            </Glass>
          </div>
        </div>
      </AbsoluteFill>

      {/* Payoff */}
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 96, opacity: pay, zIndex: 200 }}>
        <SiriFrame frame={f} intensity={pay} />
        <div style={{ transform: `translateY(${(1 - pay) * 28}px)` }}>
          <BigType frame={f} s={176} size={88} lines={[
            { t: 'Lo redondo' },
            { t: 'suena inventado.' },
            { t: 'Lo exacto', hl: false },
            { t: 'suena honesto.', hl: true },
          ]} />
          <div style={{ fontFamily: fonts.display, fontSize: 32, color: '#8A8AAA', marginTop: 28, opacity: ip(f, 216, 238, 0, 1) }}>
            Un número preciso vende más que uno redondo.
          </div>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};
