/**
 * FramingPerdida — Efecto de encuadre: pérdida vs ganancia.
 * El mismo dato económico presentado de dos formas: como lo que PERDÉS
 * o como lo que GANÁS. Los números son idénticos; la reacción emocional, opuesta.
 * El espectador lo vive antes de que el payoff lo nombre.
 * Lever: framing effect (loss vs gain). Palette: rosa/verde. Mode: glassy-oscuro. C.
 */
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { Stage, Glass, SiriGlow, SiriFrame, BigType, ip, fonts } from './kit';

const ROSE = '#FF6FD8';
const GREEN = '#34D399';

export const FRAMINGPERDIDA_DURATION = 265;

export const FramingPerdida: React.FC = () => {
  const f = useCurrentFrame();

  const lossIn = ip(f, 8, 40, 0, 1);
  const gainIn = ip(f, 85, 118, 0, 1);
  const glowI = ip(f, 115, 148, 0, 1);
  const sameOp = ip(f, 140, 160, 0, 1) * ip(f, 164, 178, 1, 0);
  const pay = ip(f, 178, 208, 0, 1);
  const labelOp = ip(f, 4, 20, 0, 1) * ip(f, 76, 92, 1, 0);

  return (
    <Stage bg="radial-gradient(118% 90% at 50% 40%, #150A0F 0%, #060208 80%)" hue={ROSE} seed={5}>
      <div style={{
        position: 'absolute', top: 130, left: 0, right: 0, textAlign: 'center',
        fontFamily: fonts.mono, fontSize: 22, letterSpacing: '0.18em',
        color: 'rgba(255,255,255,0.65)', opacity: labelOp, zIndex: 30,
      }}>
        UN DATO · DOS REALIDADES
      </div>

      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', opacity: 1 - pay }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 28, width: 820, alignItems: 'center' }}>

          {/* Loss card */}
          <div style={{
            opacity: lossIn * (1 - ip(f, 80, 100, 0, 0.45)),
            transform: `translateY(${(1 - lossIn) * 28}px) translateZ(${lossIn * 18}px)`,
            width: '100%',
          }}>
            <Glass w={820} h={172} pad={36} style={{
              border: '1px solid rgba(239,68,68,0.38)',
              background: 'rgba(239,68,68,0.06)',
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: fonts.mono, fontSize: 18, color: '#EF4444', letterSpacing: '0.18em', marginBottom: 12 }}>
                  ↓ ENCUADRE PÉRDIDA
                </div>
                <div style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: 64, color: '#EF9999', letterSpacing: '-0.04em', lineHeight: 1 }}>
                  Perdés $1.800
                </div>
                <div style={{ fontFamily: fonts.display, fontSize: 28, color: '#996666', marginTop: 10 }}>
                  cada mes que no automatizás
                </div>
              </div>
            </Glass>
          </div>

          {/* Gain card */}
          <div style={{
            opacity: gainIn,
            transform: `translateZ(${gainIn * 42}px) scale(${1 + gainIn * 0.03})`,
            width: '100%',
            position: 'relative',
          }}>
            {glowI > 0.05 ? <SiriGlow frame={f} intensity={glowI} radius={28} /> : null}
            <Glass w={820} h={172} pad={36} style={{
              border: `1px solid ${GREEN}44`,
              background: 'rgba(52,211,153,0.07)',
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: fonts.mono, fontSize: 18, color: GREEN, letterSpacing: '0.18em', marginBottom: 12 }}>
                  ↑ ENCUADRE GANANCIA
                </div>
                <div style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: 64, color: '#88FFD0', letterSpacing: '-0.04em', lineHeight: 1 }}>
                  Ganás $1.800
                </div>
                <div style={{ fontFamily: fonts.display, fontSize: 28, color: '#448866', marginTop: 10 }}>
                  cada mes automatizando
                </div>
              </div>
            </Glass>
          </div>

          {/* Same data label */}
          <div style={{ textAlign: 'center', opacity: sameOp }}>
            <div style={{ fontFamily: fonts.mono, fontSize: 20, color: '#8A8AAA', letterSpacing: '0.14em' }}>
              ← EL MISMO NÚMERO →
            </div>
          </div>
        </div>
      </AbsoluteFill>

      {/* Payoff */}
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 96, opacity: pay, zIndex: 200 }}>
        <SiriFrame frame={f} intensity={pay} />
        <div style={{ transform: `translateY(${(1 - pay) * 28}px)` }}>
          <BigType frame={f} s={178} size={88} lines={[
            { t: 'El dato no' },
            { t: 'cambió.' },
            { t: 'El encuadre', hl: false },
            { t: 'lo cambia todo.', hl: true },
          ]} />
          <div style={{ fontFamily: fonts.display, fontSize: 32, color: '#8A8AAA', marginTop: 28, opacity: ip(f, 218, 240, 0, 1) }}>
            Mismo número. Distinta decisión. Elegí cómo lo mostrás.
          </div>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};
