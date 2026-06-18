/**
 * FragmentaPrecio — Efecto de fragmentación del precio (Price Chunking).
 * $180.000/año paraliza. El mismo número fragmentado en cuatro marcos temporales
 * se siente manejable. El espectador vive cómo el encuadre temporal cambia
 * la percepción del costo sin mover ni un peso del precio real.
 * Lever: price chunking / temporal framing. Palette: verde. Mode: glassy. C.
 */
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { Stage, Glass, SiriGlow, SiriFrame, BigType, ip, fonts } from './kit';

const GREEN = '#10B981';
const GREEN_L = '#34D399';

const CHUNKS = [
  { period: 'POR AÑO', amount: '$180.000', note: 'Parece caro' },
  { period: 'POR MES', amount: '$15.000', note: 'Razonable' },
  { period: 'POR DÍA', amount: '$493', note: 'Casi nada', hero: true },
  { period: 'POR HORA', amount: '$20', note: 'Invisible' },
];

export const FRAGMENTAPRECIO_DURATION = 275;

export const FragmentaPrecio: React.FC = () => {
  const f = useCurrentFrame();

  const bigIn = ip(f, 8, 36, 0, 1);
  const bigOp = bigIn * ip(f, 55, 80, 1, 0);
  const chunksIn = ip(f, 78, 108, 0, 1);
  const glowI = ip(f, 125, 158, 0, 1);
  const pay = ip(f, 182, 212, 0, 1);
  const labelOp = ip(f, 4, 22, 0, 1) * ip(f, 50, 68, 1, 0);

  return (
    <Stage bg="radial-gradient(120% 90% at 50% 40%, #041A0E 0%, #020A05 80%)" hue={GREEN} seed={12}>
      <div style={{
        position: 'absolute', top: 130, left: 0, right: 0, textAlign: 'center',
        fontFamily: fonts.mono, fontSize: 22, letterSpacing: '0.18em',
        color: 'rgba(255,255,255,0.65)', opacity: labelOp, zIndex: 30,
      }}>
        EL MISMO PRECIO · CUATRO FORMAS
      </div>

      {/* Big scary number */}
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'column', opacity: bigOp }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontFamily: fonts.mono, fontSize: 22, color: '#EF4444', letterSpacing: '0.18em', marginBottom: 18 }}>
            PRECIO TOTAL
          </div>
          <div style={{ fontFamily: fonts.display, fontWeight: 900, fontSize: 116, color: '#EF4444', letterSpacing: '-0.05em', lineHeight: 1 }}>
            $180.000
          </div>
          <div style={{ fontFamily: fonts.mono, fontSize: 28, color: '#EF444488', letterSpacing: '0.12em', marginTop: 14 }}>
            AL AÑO
          </div>
        </div>
      </AbsoluteFill>

      {/* Chunked cards */}
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', opacity: chunksIn * (1 - pay) }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18, width: 820 }}>
          {CHUNKS.map((c, i) => {
            const appear = ip(f, 80 + i * 8, 105 + i * 8, 0, 1);
            const zed = c.hero ? glowI * 55 : 0;
            const sc = c.hero ? 1 + glowI * 0.05 : 1;

            return (
              <div key={i} style={{
                opacity: appear,
                transform: `translateZ(${zed}px) scale(${sc})`,
                position: 'relative',
              }}>
                {c.hero && glowI > 0.05 ? <SiriGlow frame={f} intensity={glowI} radius={26} /> : null}
                <Glass w={820} h={118} selected={c.hero} pad={28} style={{
                  border: `1px solid ${c.hero ? GREEN + '66' : 'rgba(255,255,255,0.07)'}`,
                  background: c.hero ? 'rgba(16,185,129,0.08)' : undefined,
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
                    <div style={{ fontFamily: fonts.mono, fontSize: 14, letterSpacing: '0.14em', color: c.hero ? GREEN : '#3A3A52', width: 100, flexShrink: 0 }}>
                      {c.period}
                    </div>
                    <div style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: c.hero ? 48 : 40, color: c.hero ? GREEN_L : '#5A5A72', letterSpacing: '-0.03em', flex: 1 }}>
                      {c.amount}
                    </div>
                    <div style={{ fontFamily: fonts.display, fontWeight: 600, fontSize: 22, color: c.hero ? GREEN : '#4A4A62' }}>
                      {c.note}
                    </div>
                  </div>
                </Glass>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>

      {/* Payoff */}
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 96, opacity: pay, zIndex: 200 }}>
        <SiriFrame frame={f} intensity={pay} />
        <div style={{ transform: `translateY(${(1 - pay) * 28}px)` }}>
          <BigType frame={f} s={182} size={88} lines={[
            { t: 'No cambia' },
            { t: 'el precio.' },
            { t: 'Cambia cómo', hl: false },
            { t: 'lo sentís.', hl: true },
          ]} />
          <div style={{ fontFamily: fonts.display, fontSize: 32, color: '#8A8AAA', marginTop: 28, opacity: ip(f, 222, 244, 0, 1) }}>
            El marco temporal vende antes que el número.
          </div>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};
