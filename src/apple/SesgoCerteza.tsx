/**
 * SesgoCerteza — Efecto certeza (Allais Paradox).
 * Dos opciones: $1.000 seguro vs $2.200 con 50% de probabilidad.
 * El espectador elige lo seguro de instinto — aunque el valor esperado
 * sea mayor en la opción arriesgada. Luego ve los números reales y lo vive.
 * Lever: certainty effect / risk aversion. Palette: violeta. Mode: glassy-oscuro. C.
 */
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { Stage, Glass, SiriGlow, SiriFrame, BigType, ip, fonts, VLT, VLT_L } from './kit';

const TEAL = '#2DD4BF';

export const SESGOCERTEZA_DURATION = 268;

export const SesgoCerteza: React.FC = () => {
  const f = useCurrentFrame();

  const cardsIn = ip(f, 8, 40, 0, 1);
  const evReveal = ip(f, 82, 115, 0, 1);
  const glowI = ip(f, 112, 148, 0, 1);
  const arrowOp = ip(f, 140, 160, 0, 1) * ip(f, 164, 176, 1, 0);
  const pay = ip(f, 178, 208, 0, 1);
  const labelOp = ip(f, 4, 22, 0, 1) * ip(f, 56, 72, 1, 0);

  return (
    <Stage bg="radial-gradient(120% 90% at 50% 38%, #0E0A1A 0%, #050308 80%)" hue={VLT_L} seed={16}>
      <div style={{
        position: 'absolute', top: 130, left: 0, right: 0, textAlign: 'center',
        fontFamily: fonts.mono, fontSize: 22, letterSpacing: '0.18em',
        color: 'rgba(255,255,255,0.65)', opacity: labelOp, zIndex: 30,
      }}>
        ¿CUÁL ELEGÍS?
      </div>

      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', opacity: 1 - pay }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0, width: 820 }}>
          {/* Both cards side by side */}
          <div style={{ display: 'flex', gap: 26, opacity: cardsIn, alignItems: 'flex-start' }}>

            {/* Left: Certainty */}
            <div style={{
              transform: `translateY(${(1 - cardsIn) * 28}px) translateZ(${(1 - evReveal) * 22}px)`,
              position: 'relative', width: 388,
            }}>
              <Glass w={388} h={420} pad={32} style={{ border: '1px solid rgba(255,255,255,0.11)' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 52, marginBottom: 18, lineHeight: 1 }}>🔒</div>
                  <div style={{ fontFamily: fonts.mono, fontSize: 15, color: '#8888AA', letterSpacing: '0.14em', marginBottom: 14 }}>OPCIÓN A</div>
                  <div style={{ fontFamily: fonts.display, fontWeight: 900, fontSize: 60, color: '#E8E8F8', letterSpacing: '-0.04em', lineHeight: 1 }}>$1.000</div>
                  <div style={{ fontFamily: fonts.display, fontSize: 24, color: '#8888AA', marginTop: 10 }}>seguro</div>
                  <div style={{
                    marginTop: 22, padding: '10px 18px', borderRadius: 10,
                    background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.13)',
                    fontFamily: fonts.mono, fontSize: 17, color: '#9090B8', letterSpacing: '0.08em',
                  }}>100% chance</div>
                </div>
              </Glass>
            </div>

            {/* Right: Risk (better EV) */}
            <div style={{
              transform: `translateY(${(1 - cardsIn) * 28}px) translateZ(${glowI * 62}px) scale(${1 + glowI * 0.04})`,
              position: 'relative', width: 388,
            }}>
              {glowI > 0.05 ? <SiriGlow frame={f} intensity={glowI} radius={28} /> : null}
              <Glass w={388} h={420} selected={glowI > 0.32} pad={32} style={{
                border: `1px solid ${glowI > 0.32 ? VLT + '66' : 'rgba(255,255,255,0.11)'}`,
                background: glowI > 0.32 ? 'rgba(124,58,237,0.09)' : undefined,
              }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 52, marginBottom: 18, lineHeight: 1 }}>🎲</div>
                  <div style={{ fontFamily: fonts.mono, fontSize: 15, color: glowI > 0.32 ? VLT_L : '#8888AA', letterSpacing: '0.14em', marginBottom: 14 }}>OPCIÓN B</div>
                  <div style={{ fontFamily: fonts.display, fontWeight: 900, fontSize: 60, color: glowI > 0.32 ? '#DDD8FF' : '#E8E8F8', letterSpacing: '-0.04em', lineHeight: 1 }}>$2.200</div>
                  <div style={{ fontFamily: fonts.display, fontSize: 24, color: glowI > 0.32 ? VLT_L : '#8888AA', marginTop: 10 }}>posible</div>
                  <div style={{
                    marginTop: 22, padding: '10px 18px', borderRadius: 10,
                    background: glowI > 0.32 ? `rgba(124,58,237,0.14)` : 'rgba(255,255,255,0.06)',
                    border: `1px solid ${glowI > 0.32 ? VLT + '44' : 'rgba(255,255,255,0.10)'}`,
                    fontFamily: fonts.mono, fontSize: 17, color: glowI > 0.32 ? VLT_L : '#8888AA', letterSpacing: '0.08em',
                  }}>50% chance</div>

                  {/* EV reveal */}
                  <div style={{ marginTop: 18, opacity: evReveal }}>
                    <div style={{ fontFamily: fonts.mono, fontSize: 15, color: TEAL, letterSpacing: '0.08em' }}>
                      50% × $2.200 = <span style={{ fontWeight: 800 }}>$1.100</span>
                    </div>
                    <div style={{ fontFamily: fonts.display, fontSize: 20, color: TEAL, marginTop: 6 }}>
                      Valor esperado: mayor ↑
                    </div>
                  </div>
                </div>
              </Glass>
            </div>
          </div>

          {/* Arrow */}
          <div style={{ textAlign: 'center', marginTop: 28, opacity: arrowOp }}>
            <div style={{ fontFamily: fonts.mono, fontSize: 20, color: VLT_L, letterSpacing: '0.08em' }}>
              ← Elegiste la opción matemáticamente peor
            </div>
          </div>
        </div>
      </AbsoluteFill>

      {/* Payoff */}
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 96, opacity: pay, zIndex: 200 }}>
        <SiriFrame frame={f} intensity={pay} />
        <div style={{ transform: `translateY(${(1 - pay) * 28}px)` }}>
          <BigType frame={f} s={178} size={88} lines={[
            { t: 'Le regalás dinero' },
            { t: 'a la certeza.' },
            { t: 'Igual que', hl: false },
            { t: 'tus clientes.', hl: true },
          ]} />
          <div style={{ fontFamily: fonts.display, fontSize: 32, color: '#8A8AAA', marginTop: 28, opacity: ip(f, 218, 240, 0, 1) }}>
            Mostrales la certeza. No el riesgo.
          </div>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};
