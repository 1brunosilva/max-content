/**
 * CompromisoMedio — Efecto del compromiso / Regla del medio.
 * Tres planes a precios muy distintos. Un cursor animado prueba el básico,
 * prueba el caro, y se asienta solo en el del medio. El espectador vive
 * cómo el precio del medio "parece lógico" sin que nadie se lo diga.
 * Lever: compromise effect / middle-option preference. Palette: dorado. Mode: glassy. C.
 */
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { Stage, Glass, SiriGlow, SiriFrame, BigType, ip, fonts } from './kit';

const GOLD = '#F59E0B';
const GOLD_L = '#FCD34D';

const PLANS = [
  { tier: 'Básico', price: '$990', note: 'Lo mínimo' },
  { tier: 'Profesional', price: '$3.500', note: 'Todo incluido', tag: 'MÁS ELEGIDO' },
  { tier: 'Empresa', price: '$9.900', note: 'Sin límites' },
];

export const COMPROMISOMEDIO_DURATION = 275;

export const CompromisoMedio: React.FC = () => {
  const f = useCurrentFrame();

  // cursor journey: Básico → Empresa → Profesional
  const cursorIdx = f < 55 ? 0 : f < 98 ? 2 : 1;
  const settleGlow = cursorIdx === 1 ? ip(f, 98, 128, 0, 1) : 0;
  const subOp = ip(f, 148, 168, 0, 1) * (1 - ip(f, 178, 192, 0, 1));
  const pay = ip(f, 190, 220, 0, 1);
  const labelOp = ip(f, 4, 22, 0, 1) * (1 - pay);

  return (
    <Stage bg="radial-gradient(118% 90% at 50% 40%, #1A1208 0%, #080604 80%)" hue={GOLD} seed={9}>
      <div style={{
        position: 'absolute', top: 130, left: 0, right: 0, textAlign: 'center',
        fontFamily: fonts.mono, fontSize: 22, letterSpacing: '0.18em',
        color: 'rgba(255,255,255,0.65)', opacity: labelOp, zIndex: 30,
      }}>
        ¿CUÁL ELEGÍS?
      </div>

      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', opacity: 1 - pay }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 22, width: 820 }}>
          {PLANS.map((p, i) => {
            const appear = ip(f, 8 + i * 10, 32 + i * 10, 0, 1);
            const isFocus = cursorIdx === i;
            const isMid = i === 1;
            const zed = isFocus ? (isMid ? settleGlow * 48 : 28) : 0;
            const sc = isMid ? 1 + settleGlow * 0.04 : 1;

            return (
              <div key={i} style={{
                opacity: appear,
                transform: `translateZ(${zed}px) scale(${sc})`,
                position: 'relative',
              }}>
                {isMid && settleGlow > 0.05 ? (
                  <SiriGlow frame={f} intensity={settleGlow} radius={28} />
                ) : null}
                <Glass w={820} h={132} selected={isMid && settleGlow > 0.35} pad={32} style={{
                  border: `1px solid ${isMid && settleGlow > 0.35 ? GOLD + '66' : isFocus && !isMid ? 'rgba(255,255,255,0.22)' : 'rgba(255,255,255,0.06)'}`,
                  background: isMid && settleGlow > 0.35 ? 'rgba(245,158,11,0.08)' : undefined,
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
                    {/* Cursor dot */}
                    <div style={{
                      width: 16, height: 16, borderRadius: '50%', flexShrink: 0,
                      background: isFocus ? GOLD : 'rgba(255,255,255,0.10)',
                      boxShadow: isFocus ? `0 0 12px ${GOLD}AA` : 'none',
                    }} />

                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                        <div style={{ fontFamily: fonts.display, fontWeight: 700, fontSize: 36, color: isMid && settleGlow > 0.35 ? '#FFF8E8' : isFocus ? '#C8C8D8' : '#4A4A62', letterSpacing: '-0.02em' }}>
                          {p.tier}
                        </div>
                        {p.tag && isMid && settleGlow > 0.4 ? (
                          <div style={{
                            fontFamily: fonts.mono, fontSize: 13, letterSpacing: '0.14em',
                            color: GOLD, background: GOLD + '18', padding: '4px 12px',
                            borderRadius: 8, border: `1px solid ${GOLD}44`,
                            opacity: settleGlow,
                          }}>{p.tag}</div>
                        ) : null}
                      </div>
                      <div style={{ fontFamily: fonts.mono, fontSize: 16, color: isMid && settleGlow > 0.35 ? GOLD + 'BB' : '#3A3A4A', letterSpacing: '0.06em', marginTop: 3 }}>
                        {p.note}
                      </div>
                    </div>

                    <div style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: 42, color: isMid && settleGlow > 0.35 ? GOLD_L : isFocus ? '#8A8AA8' : '#3A3A4A', letterSpacing: '-0.03em' }}>
                      {p.price}
                    </div>
                  </div>
                </Glass>
              </div>
            );
          })}

          <div style={{ textAlign: 'center', fontFamily: fonts.display, fontSize: 28, color: '#8A7830', opacity: subOp, marginTop: 8 }}>
            Lo hiciste sin darte cuenta.
          </div>
        </div>
      </AbsoluteFill>

      {/* Payoff */}
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 96, opacity: pay, zIndex: 200 }}>
        <SiriFrame frame={f} intensity={pay} />
        <div style={{ transform: `translateY(${(1 - pay) * 28}px)` }}>
          <BigType frame={f} s={190} size={88} lines={[
            { t: 'Nadie elige' },
            { t: 'el extremo.' },
            { t: 'El del medio', hl: false },
            { t: 'siempre gana.', hl: true },
          ]} />
          <div style={{ fontFamily: fonts.display, fontSize: 32, color: '#8A8AAA', marginTop: 28, opacity: ip(f, 230, 252, 0, 1) }}>
            Si no tenés opción del medio, perdés la venta más fácil.
          </div>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};
