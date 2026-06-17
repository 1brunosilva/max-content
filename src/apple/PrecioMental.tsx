/**
 * PrecioMental — Contabilidad Mental (Mental Accounting, Thaler).
 * El mismo dinero ($5.000/mes) se siente distinto según cómo se presenta:
 * como "gasto de marketing" vs. "el sueldo de un empleado a tiempo parcial"
 * vs. "1 cliente nuevo al mes". El espectador vive que el dinero no es dinero.
 * Lever: mental accounting / framing. Palette: verde-azul. Mode: glassy. C.
 */
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { Stage, Glass, SiriGlow, SiriFrame, BigType, ip, fonts } from './kit';

const GREEN = '#10B981';

const FRAMES = [
  { emoji: '📣', category: 'GASTO DE MARKETING', amount: '$5.000', feel: 'Costo', color: '#EF4444', sub: '¿Rinde?' },
  { emoji: '👤', category: 'MEDIO EMPLEADO', amount: '$5.000', feel: 'Salario', color: '#F59E0B', sub: '8h/semana' },
  { emoji: '🤝', category: '1 CLIENTE NUEVO', amount: '$5.000', feel: 'Inversión', color: GREEN, sub: 'Al mes' },
];

export const PRECIOMENTAL_DURATION = 270;

export const PrecioMental: React.FC = () => {
  const f = useCurrentFrame();

  const cardsIn = ip(f, 8, 44, 0, 1);
  // cada frame "activo" en secuencia
  const activeIdx = f < 55 ? 0 : f < 100 ? 1 : f < 145 ? 2 : 2;
  const glowF = activeIdx === 2 ? ip(f, 145, 175, 0, 1) : 0;
  const pay = ip(f, 185, 212, 0, 1);
  const labelOp = ip(f, 4, 20, 0, 1) * (1 - pay);

  return (
    <Stage bg="radial-gradient(120% 90% at 50% 38%, #061412 0%, #020808 80%)" hue={GREEN} seed={20}>
      <div style={{
        position: 'absolute', top: 130, left: 0, right: 0, textAlign: 'center',
        fontFamily: fonts.mono, fontSize: 22, letterSpacing: '0.18em',
        color: 'rgba(255,255,255,0.65)', opacity: labelOp, zIndex: 30,
      }}>
        EL MISMO DINERO · TRES REALIDADES
      </div>

      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', opacity: 1 - pay }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, alignItems: 'center' }}>
          {FRAMES.map((fr, i) => {
            const isActive = i === activeIdx;
            const appear = ip(f, 12 + i * 12, 28 + i * 12, 0, 1) * cardsIn;
            const scale = isActive ? 1 + (i === 2 ? glowF : ip(f, 55 + (i === 0 ? 0 : i * 45), 75 + (i === 0 ? 0 : i * 45), 0, 1)) * 0.05 : 1;
            const zed = isActive ? (i === 2 ? glowF * 60 : 30) : 0;

            return (
              <div key={i} style={{
                opacity: appear,
                transform: `scale(${scale}) translateZ(${zed}px)`,
                position: 'relative',
              }}>
                {isActive && i === 2 && glowF > 0.1 ? <SiriGlow frame={f} intensity={glowF} radius={28} /> : null}
                <Glass w={820} h={140} selected={isActive} pad={36} style={{
                  background: isActive ? `rgba(${i === 0 ? '239,68,68' : i === 1 ? '245,158,11' : '16,185,129'},0.1)` : undefined,
                  border: `1px solid ${isActive ? fr.color + '66' : 'rgba(255,255,255,0.08)'}`,
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
                    <div style={{ fontSize: 52, lineHeight: 1 }}>{fr.emoji}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: fonts.mono, fontSize: 16, color: isActive ? fr.color : '#3A3A52', letterSpacing: '0.1em' }}>{fr.category} · {fr.sub}</div>
                      <div style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: 48, color: isActive ? '#E8E8F8' : '#4A4A62', letterSpacing: '-0.03em', marginTop: 4 }}>
                        {fr.amount}<span style={{ fontSize: 24, fontWeight: 500, color: isActive ? fr.color : '#3A3A52' }}>/mes</span>
                      </div>
                    </div>
                    <div style={{
                      fontFamily: fonts.display, fontWeight: 700, fontSize: 28,
                      color: isActive ? fr.color : '#2A2A42',
                      padding: '8px 18px', borderRadius: 12,
                      background: isActive ? `${fr.color}18` : 'transparent',
                      border: isActive ? `1px solid ${fr.color}44` : '1px solid transparent',
                    }}>
                      {fr.feel}
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
          <BigType frame={f} s={185} size={84} lines={[
            { t: 'El precio no cambia.' },
            { t: 'Lo que cambia es', hl: false },
            { t: 'cómo lo enmarcás.', hl: true },
          ]} />
          <div style={{ fontFamily: fonts.display, fontSize: 32, color: '#8A8AAA', marginTop: 28, opacity: ip(f, 222, 244, 0, 1) }}>
            El cerebro no cuenta dinero. Cuenta historias.
          </div>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};
