/**
 * NombrePropio — Self-Reference Effect / Efecto de nombre propio.
 * Un feed de mensajes genéricos pasa gris. Luego aparece uno con el NOMBRE
 * del cliente en negrita y glow. El cerebro no puede ignorarlo.
 * Lever: self-reference effect / personalización. Palette: cyan. Mode: glassy. C.
 */
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { Stage, Glass, SiriGlow, SiriFrame, BigType, ip, fonts } from './kit';

const CYAN = '#4FE0FF';

const GENERIC_MSGS = [
  { from: 'Marketing Bot', msg: 'Descubrí nuestras soluciones de IA para tu empresa.' },
  { from: 'Newsletter Co.', msg: 'Esta semana: las 5 tendencias de automatización.' },
  { from: 'SaaS Platform', msg: 'Tu prueba gratis expira en 3 días. Actualizá ahora.' },
  { from: 'Digital Agency', msg: 'Aumentá tus ventas con nuestra nueva metodología.' },
];

const PERSONAL_MSG = { from: 'Concepto Dev', name: 'Sofía', msg: ', vimos que tu negocio podría ahorrar 6h/semana.' };

export const NOMBREPROPIO_DURATION = 255;

export const NombrePropio: React.FC = () => {
  const f = useCurrentFrame();

  const genericIn = ip(f, 8, 50, 0, 1);
  const personalIn = ip(f, 88, 112, 0, 1);
  const glowI = ip(f, 112, 140, 0, 1);
  const pay = ip(f, 158, 185, 0, 1);
  const labelOp = ip(f, 4, 20, 0, 1) * (1 - pay);

  return (
    <Stage bg="radial-gradient(118% 88% at 50% 36%, #0D1A24 0%, #040810 80%)" hue={CYAN} seed={15}>
      <div style={{
        position: 'absolute', top: 130, left: 0, right: 0, textAlign: 'center',
        fontFamily: fonts.mono, fontSize: 22, letterSpacing: '0.18em',
        color: 'rgba(255,255,255,0.65)', opacity: labelOp, zIndex: 30,
      }}>
        LA BANDEJA DE ENTRADA · ESTA MAÑANA
      </div>

      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', opacity: 1 - pay }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, width: 840 }}>

          {/* Mensajes genéricos */}
          {GENERIC_MSGS.map((msg, i) => {
            const appear = ip(f, 8 + i * 10, 22 + i * 10, 0, 1) * genericIn;
            return (
              <div key={i} style={{ opacity: appear * (1 - glowI * 0.7), transform: `translateX(${(1 - appear) * -30}px)` }}>
                <Glass w={840} h={100} pad={24}>
                  <div style={{ fontFamily: fonts.mono, fontSize: 16, color: '#3A3A52', letterSpacing: '0.06em', marginBottom: 6 }}>{msg.from}</div>
                  <div style={{ fontFamily: fonts.display, fontWeight: 500, fontSize: 28, color: '#4A4A62', letterSpacing: '-0.01em', lineHeight: 1.3 }}>{msg.msg}</div>
                </Glass>
              </div>
            );
          })}

          {/* El mensaje personalizado con el nombre */}
          <div style={{
            opacity: personalIn,
            transform: `translateX(${(1 - personalIn) * 40}px) translateZ(${glowI * 60}px) scale(${1 + glowI * 0.04})`,
            position: 'relative',
          }}>
            {glowI > 0.1 ? <SiriGlow frame={f} intensity={glowI} radius={28} /> : null}
            <Glass w={840} h={120} selected={glowI > 0.2} pad={24}>
              <div style={{ fontFamily: fonts.mono, fontSize: 16, color: `rgba(79,224,255,${0.4 + glowI * 0.6})`, letterSpacing: '0.06em', marginBottom: 6 }}>{PERSONAL_MSG.from} · PARA VOS</div>
              <div style={{ fontFamily: fonts.display, fontWeight: 500, fontSize: 32, letterSpacing: '-0.01em', lineHeight: 1.3 }}>
                <span style={{ color: CYAN, fontWeight: 800, textShadow: glowI > 0.3 ? `0 0 24px ${CYAN}88` : 'none' }}>{PERSONAL_MSG.name}</span>
                <span style={{ color: glowI > 0.3 ? '#E8E8F8' : '#5A5A78' }}>{PERSONAL_MSG.msg}</span>
              </div>
            </Glass>
          </div>

        </div>
      </AbsoluteFill>

      {/* Payoff */}
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 96, opacity: pay, zIndex: 200 }}>
        <SiriFrame frame={f} intensity={pay} />
        <div style={{ transform: `translateY(${(1 - pay) * 28}px)` }}>
          <BigType frame={f} s={158} size={84} lines={[
            { t: 'El cerebro no puede' },
            { t: 'ignorar', hl: false },
            { t: 'su propio nombre.', hl: true },
          ]} />
          <div style={{ fontFamily: fonts.display, fontSize: 32, color: '#8A8AAA', marginTop: 28, opacity: ip(f, 196, 218, 0, 1) }}>
            Personalizar no es cortesía — es neurociencia.
          </div>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};
