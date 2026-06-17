/**
 * Decoy — reflexión: el efecto señuelo. Agregá una opción "mala" (cara, da casi lo
 * mismo que la del medio) y la del medio se vuelve la obvia. Mecanismo: 2 planes →
 * entra el señuelo → el del medio se ilumina como elección obvia. Modo violeta.
 */
import React from 'react';
import { AbsoluteFill } from 'remotion';
import { Stage, SiriGlow, SiriFrame, Label, ip, useF, dur, fonts, VLT, VLT_L } from './lib';

const BASE = 280;
export const DECOY_DURATION = dur(BASE);

export const Decoy: React.FC = () => {
  const f = useF();
  const sceneOut = 1 - ip(f, 98, 122, 0, 1);
  const stmt = ip(f, 106, 134, 0, 1) * (1 - ip(f, 168, 184, 0, 1));
  const pay = ip(f, 176, 206, 0, 1);
  const decoyIn = ip(f, 50, 78, 0, 1);      // entra el señuelo
  const pick = ip(f, 78, 96, 0, 1);          // el del medio se vuelve obvio
  const Plan: React.FC<{ name: string; price: string; note: string; chosen?: boolean; decoy?: boolean }> = ({ name, price, note, chosen, decoy }) => (
    <div style={{ position: 'relative', width: 300, padding: '34px 28px', borderRadius: 26, background: chosen ? `linear-gradient(165deg,#241B3A,#0E0B17)` : 'rgba(255,255,255,0.05)', border: `1px solid ${chosen && pick > 0.3 ? VLT_L : 'rgba(255,255,255,0.12)'}`, opacity: decoy ? decoyIn : 1, transform: `translateY(${chosen ? -pick * 18 : 0}px) scale(${chosen ? 1 + pick * 0.06 : 1})` }}>
      {chosen ? <SiriGlow frame={f} intensity={pick} radius={26} /> : null}
      <div style={{ fontFamily: fonts.mono, fontSize: 22, color: '#8A8AA0', letterSpacing: '0.06em' }}>{name}</div>
      <div style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: 66, color: chosen && pick > 0.3 ? VLT_L : '#F2F0FA', letterSpacing: '-0.03em', marginTop: 6 }}>{price}</div>
      <div style={{ fontFamily: fonts.display, fontWeight: 500, fontSize: 26, color: '#9A96AC', marginTop: 6 }}>{note}</div>
    </div>
  );
  return (
    <Stage bg="radial-gradient(120% 95% at 50% 40%, #15101F 0%, #06050B 78%)" hue={VLT} seed={6}>
      <Label frame={f} s={6} text="3 PLANES" outAt={96} />
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', opacity: sceneOut }}>
        <div style={{ display: 'flex', gap: 26, alignItems: 'center' }}>
          <Plan name="BÁSICO" price="$20" note="lo justo" />
          <Plan name="PRO" price="$40" note="el completo" chosen />
          <Plan name="PRO + EXTRA" price="$42" note="casi igual al Pro" decoy />
        </div>
      </AbsoluteFill>

      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 70px', opacity: stmt }}>
        <div style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: 88, letterSpacing: '-0.04em', lineHeight: 1.06, color: '#F2F0FA' }}>
          Nadie elige el de <span style={{ color: VLT_L }}>$42</span>.<br />Pero hace su trabajo.
        </div>
      </AbsoluteFill>

      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 70px', opacity: pay }}>
        <SiriFrame frame={f} intensity={pay} />
        <div style={{ transform: `translateY(${(1 - pay) * 24}px)` }}>
          <div style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: 84, letterSpacing: '-0.04em', lineHeight: 1.06, color: '#F2F0FA' }}>Sumá una opción<br />que <span style={{ color: VLT_L, textShadow: `0 0 30px ${VLT}` }}>nadie elige</span>.</div>
          <div style={{ fontFamily: fonts.display, fontWeight: 500, fontSize: 34, color: '#9A96AC', marginTop: 30, opacity: ip(f, 204, 226, 0, 1) }}>El cerebro no elige solo. Compara. Dale con qué comparar.</div>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};
