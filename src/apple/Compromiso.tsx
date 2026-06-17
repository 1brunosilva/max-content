/**
 * Compromiso — Principio de Compromiso y Consistencia (Cialdini).
 * Un pequeño checkbox "¿Querés más clientes?" se tilda → genera una cadena
 * de compromisos mayores que se materializan en cascade. El espectador
 * entiende: quien dice sí a algo pequeño, dice sí a lo grande.
 * Lever: commitment & consistency. Palette: violeta. Mode: glassy-oscuro. V.
 */
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { Stage, Glass, SiriGlow, SiriFrame, BigType, ip, fonts, VLT, VLT_L } from './kit';

const STEPS = [
  { small: true, label: '¿Querés más clientes?', sub: 'Un clic simple' },
  { label: 'Suscribite a nuestra newsletter', sub: 'Comprometido con aprender' },
  { label: 'Descargá el recurso gratuito', sub: 'Comprometido con mejorar' },
  { label: 'Agendá una llamada de 15min', sub: 'Comprometido con crecer' },
  { label: 'Empezá tu primer proyecto', sub: 'Comprometido con el cambio' },
];

export const COMPROMISO_DURATION = 270;

export const Compromiso: React.FC = () => {
  const f = useCurrentFrame();

  const pay = ip(f, 182, 210, 0, 1);
  const labelOp = ip(f, 4, 20, 0, 1) * (1 - pay);

  // cada step aparece y se completa en secuencia
  const getStepState = (i: number) => {
    const appearF = 20 + i * 22;
    const checkF = appearF + 20;
    const appear = ip(f, appearF, appearF + 18, 0, 1);
    const check = ip(f, checkF, checkF + 14, 0, 1);
    return { appear, check };
  };

  const lastChecked = STEPS.findIndex((_, i) => {
    const { check } = getStepState(i);
    return check < 0.9;
  }) - 1;

  return (
    <Stage bg="radial-gradient(120% 90% at 50% 36%, #120F1D 0%, #060408 80%)" hue={VLT_L} seed={18}>
      <div style={{
        position: 'absolute', top: 130, left: 0, right: 0, textAlign: 'center',
        fontFamily: fonts.mono, fontSize: 22, letterSpacing: '0.18em',
        color: 'rgba(255,255,255,0.65)', opacity: labelOp, zIndex: 30,
      }}>
        EL CAMINO DEL SÍ
      </div>

      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', opacity: 1 - pay }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 820 }}>
          {STEPS.map((step, i) => {
            const { appear, check } = getStepState(i);
            const isActive = i === lastChecked + 1;
            if (appear < 0.01) return null;

            return (
              <div key={i} style={{
                opacity: appear,
                transform: `translateX(${(1 - appear) * -30}px) translateZ(${isActive ? check * 30 : 0}px)`,
                position: 'relative',
              }}>
                {isActive && check > 0.2 ? <SiriGlow frame={f} intensity={check * 0.7} radius={22} /> : null}
                <Glass w={820} h={step.small ? 96 : 110} selected={check > 0.5} pad={28}
                  style={{ background: check > 0.5 ? 'rgba(124,58,237,0.12)' : undefined }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
                    {/* Checkbox */}
                    <div style={{
                      width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                      border: `2.5px solid ${check > 0.5 ? VLT_L : 'rgba(255,255,255,0.2)'}`,
                      background: check > 0.5 ? VLT : 'transparent',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      boxShadow: check > 0.5 ? `0 0 20px ${VLT}88` : 'none',
                    }}>
                      {check > 0.4 ? (
                        <svg viewBox="0 0 24 24" width="22" height="22" style={{ opacity: check }}>
                          <path d="M 4 12 L 9 17 L 20 6" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      ) : null}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: fonts.display, fontWeight: step.small ? 700 : 600, fontSize: step.small ? 34 : 30, color: check > 0.5 ? '#E8E8F8' : '#5A5A78', letterSpacing: '-0.02em' }}>
                        {step.label}
                      </div>
                      <div style={{ fontFamily: fonts.mono, fontSize: 16, color: check > 0.5 ? VLT_L : '#3A3A52', letterSpacing: '0.06em', marginTop: 4 }}>
                        {step.sub}
                      </div>
                    </div>
                    {/* Flecha al próximo */}
                    {i < STEPS.length - 1 && check > 0.6 ? (
                      <div style={{ fontFamily: fonts.mono, fontSize: 24, color: VLT_L, opacity: check - 0.6 }}>→</div>
                    ) : null}
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
          <BigType frame={f} s={182} size={84} lines={[
            { t: 'Quien dice sí' },
            { t: 'a algo pequeño' },
            { t: 'dice sí', hl: false },
            { t: 'a lo grande.', hl: true },
          ]} />
          <div style={{ fontFamily: fonts.display, fontSize: 32, color: '#8A8AAA', marginTop: 28, opacity: ip(f, 220, 242, 0, 1) }}>
            Diseñá el primer sí. El resto fluye solo.
          </div>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};
