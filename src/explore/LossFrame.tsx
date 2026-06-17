/**
 * LossFrame — reflexión: perder duele 2.5× más que ganar (aversión a la pérdida) →
 * encuadrá en lo que PIERDE, no en lo que gana. Mecanismo: dos barras, "perder" 2.5×
 * más larga/pesada que "ganar". Modo oscuro-ámbar. Vende: copy/marca.
 */
import React from 'react';
import { AbsoluteFill } from 'remotion';
import { Stage, SiriFrame, Label, ip, useF, dur, fonts, VLT_L } from './lib';

const AMBER = '#FFB23D';
const BASE = 280;
export const LOSSFRAME_DURATION = dur(BASE);

export const LossFrame: React.FC = () => {
  const f = useF();
  const sceneOut = 1 - ip(f, 98, 122, 0, 1);
  const stmt = ip(f, 106, 134, 0, 1) * (1 - ip(f, 168, 184, 0, 1));
  const pay = ip(f, 176, 206, 0, 1);
  const gain = ip(f, 26, 56, 0, 1);
  const loss = ip(f, 40, 86, 0, 1);
  const Bar: React.FC<{ label: string; w: number; color: string; sub: string }> = ({ label, w, color, sub }) => (
    <div style={{ marginBottom: 56 }}>
      <div style={{ fontFamily: fonts.mono, fontSize: 28, color: '#B8B2A6', marginBottom: 16, letterSpacing: '0.04em' }}>{label}</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
        <div style={{ height: 64, width: w, borderRadius: 14, background: color, boxShadow: `0 0 30px ${color}66` }} />
        <span style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: 40, color: '#EDE7DA' }}>{sub}</span>
      </div>
    </div>
  );
  return (
    <Stage bg="radial-gradient(120% 95% at 50% 38%, #1A140C 0%, #07050B 78%)" hue="#C9913D" seed={2}>
      <Label frame={f} s={6} text="GANAR vs PERDER" outAt={96} />
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', opacity: sceneOut }}>
        <div style={{ width: 860 }}>
          <Bar label="Ganar $100" w={gain * 220} color="#3A8E5E" sub={gain > 0.6 ? '😊' : ''} />
          <Bar label="Perder $100" w={loss * 560} color={AMBER} sub={loss > 0.6 ? '😣 2.5×' : ''} />
        </div>
      </AbsoluteFill>

      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 70px', opacity: stmt }}>
        <div style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: 88, letterSpacing: '-0.04em', lineHeight: 1.06, color: '#F4EFE4' }}>
          Perder duele <span style={{ color: AMBER }}>2.5×</span><br />más que ganar.
        </div>
      </AbsoluteFill>

      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 70px', opacity: pay }}>
        <SiriFrame frame={f} intensity={pay} />
        <div style={{ transform: `translateY(${(1 - pay) * 24}px)` }}>
          <div style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: 90, letterSpacing: '-0.04em', lineHeight: 1.06, color: '#F4EFE4' }}>No le digas lo que gana.<br />Decile lo que <span style={{ color: AMBER, textShadow: `0 0 30px ${AMBER}66` }}>pierde</span>.</div>
          <div style={{ fontFamily: fonts.display, fontWeight: 500, fontSize: 34, color: '#A89E8C', marginTop: 30, opacity: ip(f, 204, 226, 0, 1) }}>El miedo a perder mueve más que las ganas de ganar.</div>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};
