/**
 * Anchor — reflexión: el primer número que ve tu cliente ANCLA todo lo que sigue
 * (anclaje). Mecanismo: un número grande se clava ($2.000) y el siguiente ($890)
 * parece barato al lado. Modo oscuro-verde (plata). Vende: copy/pricing/marca.
 */
import React from 'react';
import { AbsoluteFill } from 'remotion';
import { Stage, SiriFrame, Label, ip, useF, dur, fonts, VLT_L } from './lib';

const GREEN = '#34C77B';
const BASE = 280;
export const ANCHOR_DURATION = dur(BASE);

export const Anchor: React.FC = () => {
  const f = useF();
  const sceneOut = 1 - ip(f, 98, 122, 0, 1);
  const stmt = ip(f, 106, 134, 0, 1) * (1 - ip(f, 168, 184, 0, 1));
  const pay = ip(f, 176, 206, 0, 1);
  const anchorIn = ip(f, 14, 40, 0, 1);
  const anchorShrink = ip(f, 58, 80, 1, 0.42);     // el ancla se achica al aparecer el 2º
  const second = ip(f, 60, 88, 0, 1);
  const tag = ip(f, 84, 100, 0, 1);

  return (
    <Stage bg="radial-gradient(120% 95% at 50% 38%, #0C1A12 0%, #05080B 78%)" hue="#2F9E63" seed={5}>
      <Label frame={f} s={6} text="LO PRIMERO QUE VE TU CLIENTE" outAt={96} />
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', opacity: sceneOut }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
          {/* el ANCLA */}
          <div style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: 200, letterSpacing: '-0.05em', color: '#F2F4F0', opacity: anchorIn, transform: `scale(${anchorIn * anchorShrink})`, textShadow: '0 10px 60px rgba(0,0,0,0.5)' }}>$2.000</div>
          {/* el segundo número, que ahora parece barato */}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 24, opacity: second, transform: `translateY(${(1 - second) * 30}px)` }}>
            <span style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: 150, letterSpacing: '-0.05em', color: GREEN, textShadow: `0 0 50px ${GREEN}55` }}>$890</span>
            <span style={{ fontFamily: fonts.mono, fontSize: 34, color: GREEN, opacity: tag }}>¿barato? ✓</span>
          </div>
        </div>
      </AbsoluteFill>

      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 70px', opacity: stmt }}>
        <div style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: 90, letterSpacing: '-0.04em', lineHeight: 1.06, color: '#F1F4F0' }}>
          $890 no es caro<br />ni barato.
        </div>
      </AbsoluteFill>

      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 70px', opacity: pay }}>
        <SiriFrame frame={f} intensity={pay} />
        <div style={{ transform: `translateY(${(1 - pay) * 24}px)` }}>
          <div style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: 84, letterSpacing: '-0.04em', lineHeight: 1.06, color: '#F1F4F0' }}>Lo <span style={{ color: GREEN, textShadow: `0 0 30px ${GREEN}66` }}>primero</span> que ve<br />decide todo lo demás.</div>
          <div style={{ fontFamily: fonts.display, fontWeight: 500, fontSize: 34, color: '#92A39A', marginTop: 30, opacity: ip(f, 204, 226, 0, 1) }}>Mostrá el número alto primero. El resto parece una ganga.</div>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};
