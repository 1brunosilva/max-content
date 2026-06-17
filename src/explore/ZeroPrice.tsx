/**
 * ZeroPrice — reflexión: "GRATIS" apaga el cerebro analítico (efecto precio-cero,
 * Ariely): la gente elige lo gratis aunque le convenga lo pago. Mecanismo: dos
 * opciones, la elección salta a GRATIS aunque la otra es mejor. Modo editorial CLARO.
 */
import React from 'react';
import { AbsoluteFill } from 'remotion';
import { Stage, Label, ip, useF, dur, fonts, VLT } from './lib';

const BASE = 280;
export const ZEROPRICE_DURATION = dur(BASE);

export const ZeroPrice: React.FC = () => {
  const f = useF();
  const sceneOut = 1 - ip(f, 98, 122, 0, 1);
  const stmt = ip(f, 106, 134, 0, 1) * (1 - ip(f, 168, 184, 0, 1));
  const pay = ip(f, 176, 206, 0, 1);
  const choose = ip(f, 54, 88, 0, 1); // la elección se va a GRATIS
  const Card: React.FC<{ tag: string; big: string; note: string; chosen?: boolean; x: number }> = ({ tag, big, note, chosen, x }) => (
    <div style={{ position: 'relative', width: 360, padding: '38px 34px', borderRadius: 28, background: '#FFFFFF', border: `2px solid ${chosen ? VLT : 'rgba(0,0,0,0.08)'}`, boxShadow: chosen ? `0 30px 80px -24px ${VLT}88, 0 0 ${40 * choose}px ${VLT}55` : '0 20px 50px -28px rgba(20,16,40,0.25)', transform: `translateY(${chosen ? -choose * 22 : 0}px) scale(${chosen ? 1 + choose * 0.06 : 1 - choose * 0.04})`, opacity: chosen ? 1 : 1 - choose * 0.35 }}>
      <div style={{ fontFamily: fonts.mono, fontSize: 24, color: '#8A8576', letterSpacing: '0.06em' }}>{tag}</div>
      <div style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: 72, color: chosen ? VLT : '#15131C', letterSpacing: '-0.03em', marginTop: 8 }}>{big}</div>
      <div style={{ fontFamily: fonts.display, fontWeight: 500, fontSize: 30, color: '#6E695C', marginTop: 6 }}>{note}</div>
    </div>
  );
  return (
    <Stage bg="linear-gradient(180deg, #F5F2EB 0%, #ECE8DF 100%)" hue={VLT} seed={3}>
      <Label frame={f} s={6} text="¿CUÁL ELIGE TU CLIENTE?" outAt={96} dark={false} />
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', opacity: sceneOut }}>
        <div style={{ display: 'flex', gap: 40, alignItems: 'center' }}>
          <Card tag="OPCIÓN A" big="$1" note="la que más conviene" x={0} />
          <Card tag="OPCIÓN B" big="GRATIS" note="peor, pero gratis" chosen x={1} />
        </div>
      </AbsoluteFill>

      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 70px', opacity: stmt }}>
        <div style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: 90, letterSpacing: '-0.04em', lineHeight: 1.06, color: '#15131C' }}>
          Le convenía la otra.<br />Igual eligió <span style={{ color: VLT }}>gratis</span>.
        </div>
      </AbsoluteFill>

      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 70px', opacity: pay }}>
        <div style={{ transform: `translateY(${(1 - pay) * 24}px)` }}>
          <div style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: 96, letterSpacing: '-0.04em', lineHeight: 1.04, color: '#15131C' }}>"Gratis" apaga<br />la parte que <span style={{ color: VLT }}>piensa</span>.</div>
          <div style={{ fontFamily: fonts.display, fontWeight: 500, fontSize: 34, color: '#6E695C', marginTop: 30, opacity: ip(f, 204, 226, 0, 1) }}>Un "envío gratis" vende más que el mismo descuento en plata.</div>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};
