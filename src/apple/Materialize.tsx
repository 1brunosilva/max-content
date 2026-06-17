/**
 * Materialize — mecanismo: un PRESUPUESTO se arma línea por línea en 3D. Cada
 * ítem cae y se asienta, todo da $0 → el total parece "GRATIS" (el ancla tentadora).
 * Beat. Después el recibo revela el costo invisible: un contador que se DISPARA
 * (0 → 80 horas/mes). El número que no estaba en la factura es el que más duele.
 *
 * Tema (anchoring + costo invisible): "hacerlo a mano" sale $0 en plata y una
 * fortuna en tiempo. El precio que ves no es el que pagás. Sin chatbot, sin precio
 * inventado en moneda (se mide en HORAS, que es honesto).
 */
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { Stage, SiriGlow, SiriFrame, BigType, ip, APPLE, countUp, fonts, VLT, VLT_L } from './kit';

// los ítems del presupuesto "hacerlo a mano" — todos $0 (esa es la trampa)
const ITEMS = [
  { label: 'Software', val: '$0' },
  { label: 'Suscripción mensual', val: '$0' },
  { label: 'Licencia', val: '$0' },
  { label: 'Instalación', val: '$0' },
];
const RW = 760, ROW_H = 92, PAD = 56;

export const MATERIALIZE_DURATION = 330; // +50 frames de aire al final para leer el payoff

export const Materialize: React.FC = () => {
  const f = useCurrentFrame();

  // el recibo entra en 3D y se endereza
  const enter = ip(f, 8, 40, 0, 1);
  const tiltX = (1 - enter) * 22;            // empieza inclinado hacia atrás → se asienta
  const lift  = (1 - enter) * 70;

  // total "GRATIS" tentador
  const free  = ip(f, 96, 120, 0, 1);
  // reveal del costo real: el $0 se atenúa, aparece "Tu tiempo"
  const reveal = ip(f, 150, 182, 0, 1);
  // el contador se dispara 0 → 80 hs
  const hours = countUp(f, 158, 196, 80, APPLE);
  const glowI = ip(f, 162, 192, 0, 1);
  // payoff
  const pay   = ip(f, 206, 238, 0, 1);
  const labelOp = ip(f, 6, 22, 0, 1) * (1 - ip(f, 150, 168, 0, 1));

  return (
    <Stage bg="radial-gradient(120% 90% at 50% 30%, #0F1119 0%, #050507 80%)" hue="#4FE0FF" seed={3}>
      {/* Label */}
      <div style={{
        position: 'absolute', top: 128, left: 0, right: 0, textAlign: 'center',
        fontFamily: fonts.mono, fontSize: 24, letterSpacing: '0.18em',
        color: 'rgba(255,255,255,0.72)', opacity: labelOp, zIndex: 30,
      }}>
        HACERLO A MANO · COSTO REAL
      </div>

      {/* EL RECIBO — se desvanece al entrar el payoff (GOTCHA) */}
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', opacity: 1 - pay }}>
        <div style={{
          position: 'relative', width: RW,
          transformStyle: 'preserve-3d',
          transform: `translateY(${lift}px) rotateX(${tiltX}deg) scale(${0.94 + enter * 0.06})`,
          opacity: enter,
        }}>
          {/* glow Siri detrás del número final */}
          <div style={{ position: 'absolute', inset: 0, borderRadius: 32 }}>
            <SiriGlow frame={f} intensity={glowI} radius={28} />
          </div>

          <div style={{
            position: 'relative', borderRadius: 32, padding: PAD,
            background: 'linear-gradient(165deg, rgba(28,26,40,0.92) 0%, rgba(12,11,20,0.92) 100%)',
            border: `1px solid ${reveal > 0.1 ? VLT + '99' : 'rgba(255,255,255,0.12)'}`,
            backdropFilter: 'blur(16px)',
            boxShadow: `0 50px 130px -40px rgba(0,0,0,0.9)`,
          }}>
            {/* header del recibo */}
            <div style={{
              fontFamily: fonts.mono, fontSize: 18, letterSpacing: '0.16em',
              color: '#6A6A82', borderBottom: '1px solid rgba(255,255,255,0.10)',
              paddingBottom: 22, marginBottom: 12,
            }}>
              PRESUPUESTO
            </div>

            {/* líneas que caen y se asientan (stagger) — se atenúan en el reveal */}
            {ITEMS.map((it, i) => {
              const at = 38 + i * 11;
              const drop = ip(f, at, at + 24, 0, 1);
              return (
                <div key={i} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  height: ROW_H, opacity: drop * (1 - reveal * 0.78),
                  transform: `translateY(${(1 - drop) * -16}px)`,
                  borderBottom: '1px solid rgba(255,255,255,0.06)',
                }}>
                  <span style={{ fontFamily: fonts.display, fontWeight: 500, fontSize: 32, color: '#C8C8DA' }}>{it.label}</span>
                  <span style={{ fontFamily: fonts.mono, fontSize: 30, color: '#7E7E96' }}>{it.val}</span>
                </div>
              );
            })}

            {/* TOTAL — pasa de "GRATIS" (ancla) al costo real en horas */}
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
              marginTop: 30, position: 'relative', minHeight: 120,
            }}>
              <span style={{
                fontFamily: fonts.mono, fontSize: 22, letterSpacing: '0.14em',
                color: '#6A6A82', paddingBottom: 14,
              }}>
                {reveal > 0.5 ? 'TU TIEMPO' : 'TOTAL'}
              </span>

              {/* "GRATIS" tentador — se va en el reveal */}
              <span style={{
                position: 'absolute', right: 0, bottom: 6,
                fontFamily: fonts.display, fontWeight: 800, fontSize: 76,
                letterSpacing: '-0.03em', color: '#34C77B',
                textShadow: '0 0 40px rgba(52,199,123,0.5)',
                opacity: free * (1 - reveal), transform: `scale(${0.9 + free * 0.1})`,
              }}>
                GRATIS
              </span>

              {/* el costo REAL que se dispara */}
              <span style={{
                position: 'absolute', right: 0, bottom: 0,
                fontFamily: fonts.display, fontWeight: 800, fontSize: 96,
                letterSpacing: '-0.04em', color: VLT_L,
                textShadow: `0 0 48px ${VLT}cc`,
                opacity: reveal, display: 'flex', alignItems: 'baseline', gap: 14,
              }}>
                {hours}
                <span style={{ fontSize: 38, fontWeight: 600, color: '#9A9AB5' }}>hs / mes</span>
              </span>
            </div>
          </div>
        </div>
      </AbsoluteFill>

      {/* PAYOFF */}
      <AbsoluteFill style={{
        alignItems: 'center', justifyContent: 'center', textAlign: 'center',
        padding: 96, opacity: pay, zIndex: 200,
      }}>
        <SiriFrame frame={f} intensity={pay} />
        <div style={{ transform: `translateY(${(1 - pay) * 26}px)` }}>
          <BigType frame={f} s={206} size={88} lines={[
            { t: 'Lo que no pagás' },
            { t: 'en plata,' },
            { t: 'lo pagás en horas.', hl: true },
          ]} />
          <div style={{
            fontFamily: fonts.display, fontSize: 34, color: '#9A9AB5',
            marginTop: 32, opacity: ip(f, 248, 270, 0, 1),
          }}>
            El precio que ves no es el que pagás.
          </div>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};
