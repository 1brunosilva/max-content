/**
 * DefaultGana — Sesgo del default / Status quo bias.
 * Tres planes; el del medio ya viene pre-marcado desde el inicio.
 * El espectador ve un contador: 73 de 100 personas no lo cambiaron.
 * Vivís lo fácil que es aceptar lo que ya viene elegido.
 * Lever: default bias / status quo. Palette: cyan. Mode: glassy-oscuro. C.
 */
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { Stage, Glass, SiriGlow, SiriFrame, BigType, ip, fonts } from './kit';

const CYAN = '#4FE0FF';

const PLANS = [
  { name: 'Básico', price: '$990', features: '1 canal · 1 usuario', isDefault: false },
  { name: 'Pro', price: '$3.500', features: '5 canales · equipo', isDefault: true },
  { name: 'Premium', price: '$9.900', features: 'Ilimitado · IA', isDefault: false },
];

export const DEFAULTGANA_DURATION = 270;

export const DefaultGana: React.FC = () => {
  const f = useCurrentFrame();

  const cardsIn = ip(f, 6, 36, 0, 1);
  const checkPulse = 0.8 + 0.2 * Math.sin(f * 0.15);
  const glowI = ip(f, 38, 72, 0, 1);
  const counterV = Math.round(ip(f, 72, 108, 0, 73));
  const counterOp = ip(f, 72, 90, 0, 1);
  const pay = ip(f, 178, 208, 0, 1);
  const labelOp = ip(f, 4, 22, 0, 1) * (1 - pay);

  return (
    <Stage bg="radial-gradient(120% 88% at 50% 38%, #041420 0%, #020608 80%)" hue={CYAN} seed={3}>
      <div style={{
        position: 'absolute', top: 130, left: 0, right: 0, textAlign: 'center',
        fontFamily: fonts.mono, fontSize: 22, letterSpacing: '0.18em',
        color: 'rgba(255,255,255,0.65)', opacity: labelOp, zIndex: 30,
      }}>
        ELEGÍ UN PLAN
      </div>

      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', opacity: 1 - pay }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: 820 }}>
          {PLANS.map((p, i) => {
            const delay = i * 10;
            const appear = ip(f, 8 + delay, 30 + delay, 0, 1) * cardsIn;
            const zed = p.isDefault ? glowI * 52 : 0;
            const sc = p.isDefault ? 1 + glowI * 0.04 : 1;

            return (
              <div key={i} style={{
                opacity: appear,
                transform: `translateZ(${zed}px) scale(${sc})`,
                position: 'relative',
              }}>
                {p.isDefault && glowI > 0.05 ? (
                  <SiriGlow frame={f} intensity={glowI * checkPulse * 0.9} radius={28} />
                ) : null}
                <Glass w={820} h={130} selected={p.isDefault} pad={32} style={{
                  border: `1px solid ${p.isDefault ? CYAN + '66' : 'rgba(255,255,255,0.07)'}`,
                  background: p.isDefault ? 'rgba(79,224,255,0.07)' : undefined,
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
                    {/* Checkbox */}
                    <div style={{
                      width: 34, height: 34, borderRadius: 10, flexShrink: 0,
                      border: `2.5px solid ${p.isDefault ? CYAN : 'rgba(255,255,255,0.18)'}`,
                      background: p.isDefault ? CYAN + '25' : 'transparent',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      boxShadow: p.isDefault ? `0 0 18px ${CYAN}55` : 'none',
                    }}>
                      {p.isDefault ? (
                        <svg viewBox="0 0 24 24" width="20" height="20" style={{ opacity: Math.min(1, glowI * 2) }}>
                          <path d="M 4 12 L 9 17 L 20 6" stroke={CYAN} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      ) : null}
                    </div>

                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                        <div style={{ fontFamily: fonts.display, fontWeight: 700, fontSize: 36, color: p.isDefault ? '#E8F8FF' : '#5A5A72', letterSpacing: '-0.02em' }}>
                          {p.name}
                        </div>
                        {p.isDefault && glowI > 0.2 ? (
                          <div style={{
                            fontFamily: fonts.mono, fontSize: 14, letterSpacing: '0.14em',
                            color: CYAN, background: CYAN + '18', padding: '4px 12px',
                            borderRadius: 8, border: `1px solid ${CYAN}44`,
                            opacity: glowI,
                          }}>DEFAULT</div>
                        ) : null}
                      </div>
                      <div style={{ fontFamily: fonts.mono, fontSize: 16, color: p.isDefault ? CYAN + 'BB' : '#3A3A52', letterSpacing: '0.06em', marginTop: 3 }}>
                        {p.features}
                      </div>
                    </div>

                    <div style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: 40, color: p.isDefault ? '#E8F8FF' : '#3A3A52', letterSpacing: '-0.03em' }}>
                      {p.price}
                    </div>
                  </div>
                </Glass>
              </div>
            );
          })}

          {/* Counter */}
          <div style={{ textAlign: 'center', marginTop: 8, opacity: counterOp * (1 - ip(f, 155, 175, 0, 1)) }}>
            <span style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: 68, color: CYAN, letterSpacing: '-0.04em' }}>
              {counterV}
            </span>
            <span style={{ fontFamily: fonts.display, fontSize: 34, color: '#8ABFD4', letterSpacing: '-0.02em' }}>
              {' '}de 100 no lo cambiaron.
            </span>
          </div>
        </div>
      </AbsoluteFill>

      {/* Payoff */}
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 96, opacity: pay, zIndex: 200 }}>
        <SiriFrame frame={f} intensity={pay} />
        <div style={{ transform: `translateY(${(1 - pay) * 28}px)` }}>
          <BigType frame={f} s={178} size={88} lines={[
            { t: 'El default' },
            { t: 'no se cuestiona.' },
            { t: 'Elegí vos', hl: false },
            { t: 'cuál es el tuyo.', hl: true },
          ]} />
          <div style={{ fontFamily: fonts.display, fontSize: 32, color: '#8A8AAA', marginTop: 28, opacity: ip(f, 218, 240, 0, 1) }}>
            La opción pre-marcada siempre gana.
          </div>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};
