/**
 * SilentChurn — mecanismo: una lista de clientes (CRM), todos activos… y UNO se
 * apaga y se va EN SILENCIO, sin glow ni llamar la atención (= no lo notás). Recién
 * en el payoff se ilumina lo que perdiste. El mecanismo ENCARNA el mensaje.
 *
 * Tema (loss aversion / pérdida silenciosa): el cliente que perdés sin darte cuenta
 * es el más caro. Mismo ADN (kit). Nada de precio ni chatbot.
 */
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { Stage, Drift, SiriGlow, SiriFrame, BigType, ip, fonts, VLT, VLT_L } from './kit';

const CLIENTS = [
  { name: 'Martín Rodríguez', init: 'M', hue: '#5B8CFF' },
  { name: 'Sofía Gutiérrez', init: 'S', hue: '#34C77B' },
  { name: 'Diego Pereyra', init: 'D', hue: '#FF8A5B' },   // ← el que se va (CHURN)
  { name: 'Lucía Fernández', init: 'L', hue: '#A855F7' },
  { name: 'Andrés Méndez', init: 'A', hue: '#FF6FD8' },
  { name: 'Valentina Castro', init: 'V', hue: '#4FE0FF' },
];
const CHURN = 2;
const RW = 880, RH = 138, GAP = 22;

export const SILENTCHURN_DURATION = 280;

export const SilentChurn: React.FC = () => {
  const f = useCurrentFrame();
  const churn = ip(f, 96, 172, 0, 1);     // el cliente se apaga en silencio (lento, sin glow)
  const real = ip(f, 182, 212, 0, 1);     // realización: se ilumina lo que perdiste
  const pay = ip(f, 214, 244, 0, 1);      // payoff
  const labelOp = ip(f, 6, 24, 0, 1) * (1 - ip(f, 184, 200, 0, 1));
  const totalH = CLIENTS.length * RH + (CLIENTS.length - 1) * GAP;

  return (
    <Stage bg="radial-gradient(120% 95% at 50% 35%, #14141E 0%, #060509 76%)" hue={VLT} seed={5}>
      <div style={{ position: 'absolute', top: 120, left: 0, right: 0, textAlign: 'center', fontFamily: fonts.mono, fontSize: 24, letterSpacing: '0.18em', color: 'rgba(255,255,255,0.72)', opacity: labelOp, zIndex: 30 }}>
        TUS CLIENTES · ACTIVOS
      </div>

      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', opacity: 1 - pay }}>
        <Drift amp={3}>
          <div style={{ position: 'relative', width: RW, height: totalH }}>
            {CLIENTS.map((c, i) => {
              const isChurn = i === CHURN;
              const appear = ip(f, 6 + i * 6, 26 + i * 6, 0, 1);
              // el que se va: baja opacidad, se dessatura, se desliza — SIN glow (no lo notás)
              const leave = isChurn ? churn : 0;
              // realización: los demás se atenúan, el perdido vuelve a verse (con glow)
              const dimOther = isChurn ? 0 : real * 0.66;
              const baseOp = isChurn ? 1 - leave * 0.6 : 1;
              const op = appear * (isChurn ? baseOp + real * (0.95 - baseOp) : baseOp * (1 - dimOther));
              const tx = leave * 26;
              const gray = isChurn ? Math.max(leave, real) : 0; // desaturado
              return (
                <div key={i} style={{ position: 'absolute', top: i * (RH + GAP), left: 0, width: RW, height: RH, opacity: op, transform: `translateX(${tx}px) scale(${0.96 + appear * 0.04})` }}>
                  {isChurn ? <SiriGlow frame={f} intensity={real} radius={28} /> : null}
                  <div style={{ position: 'absolute', inset: 0, borderRadius: 28, background: 'rgba(255,255,255,0.05)', border: `1px solid ${isChurn && real > 0.05 ? VLT + '99' : 'rgba(255,255,255,0.12)'}`, backdropFilter: 'blur(14px)', boxShadow: '0 24px 60px -34px rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', gap: 28, padding: '0 36px' }}>
                    {/* avatar */}
                    <div style={{ width: 88, height: 88, borderRadius: '50%', background: `linear-gradient(135deg, ${c.hue}, ${c.hue}99)`, filter: `saturate(${1 - gray * 0.85})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: fonts.display, fontWeight: 800, fontSize: 40, color: '#fff', flexShrink: 0 }}>{c.init}</div>
                    {/* nombre */}
                    <div style={{ flex: 1, fontFamily: fonts.display, fontWeight: 600, fontSize: 40, color: '#F2F2FA', letterSpacing: '-0.02em' }}>{c.name}</div>
                    {/* estado */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, position: 'relative' }}>
                      {/* activo (se va si churned) */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12, opacity: isChurn ? 1 - leave : 1 }}>
                        <span style={{ width: 14, height: 14, borderRadius: '50%', background: '#34C77B', boxShadow: '0 0 12px #34C77B' }} />
                        <span style={{ fontFamily: fonts.mono, fontSize: 22, color: '#8A8AA0' }}>Activo</span>
                      </div>
                      {/* inactivo (aparece en el churned) */}
                      {isChurn ? <div style={{ position: 'absolute', right: 0, display: 'flex', alignItems: 'center', gap: 12, opacity: leave, whiteSpace: 'nowrap' }}>
                        <span style={{ width: 14, height: 14, borderRadius: '50%', background: '#5A5A66' }} />
                        <span style={{ fontFamily: fonts.mono, fontSize: 22, color: '#6A6A78' }}>hace 4 meses</span>
                      </div> : null}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Drift>
      </AbsoluteFill>

      {/* realización (antes del payoff) */}
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'flex-start', paddingTop: 200, opacity: real * (1 - pay), zIndex: 40 }}>
        <BigType frame={f} s={186} size={70} lines={[{ t: 'Uno dejó de volver.' }]} />
      </AbsoluteFill>

      {/* PAYOFF */}
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 96, opacity: pay, zIndex: 200 }}>
        <SiriFrame frame={f} intensity={pay} />
        <div style={{ transform: `translateY(${(1 - pay) * 26}px)` }}>
          <BigType frame={f} s={214} size={96} lines={[{ t: 'Se fue.' }, { t: 'Y no te enteraste.', hl: true }]} />
          <div style={{ fontFamily: fonts.display, fontSize: 34, color: '#9A9AB5', marginTop: 32, opacity: ip(f, 240, 262, 0, 1) }}>El cliente que perdés en silencio es el más caro.</div>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};
