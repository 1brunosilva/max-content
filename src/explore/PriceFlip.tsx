/**
 * PriceFlip — EXPERIMENTO sobre el espectador, para VENTA (anclaje + contraste,
 * vía /marketing-psychology). Le hacemos juzgar un precio solo (lo siente caro/dudoso),
 * le mostramos el precio del "otro" (ancla alta), y SIENTE cómo el mismo precio ahora
 * parece barato. Después se revela. Visuales 100% distintas a RecallTest: precios
 * grandes, paleta money (verde/oscuro). Vende: cómo presentar un precio.
 */
import React from 'react';
import { AbsoluteFill } from 'remotion';
import { Stage, SiriFrame, Label, ip, useF, dur, fonts } from './lib';

const GREEN = '#34C77B';
const BASE = 400;
export const PRICEFLIP_DURATION = dur(BASE);

export const PriceFlip: React.FC = () => {
  const f = useF();
  const p1 = ip(f, 22, 44, 0, 1);                 // aparece $1.900 (juzgalo solo)
  const judge = ip(f, 40, 58, 0, 1) * (1 - ip(f, 96, 112, 0, 1)); // "¿caro o barato?"
  const anchor = ip(f, 100, 128, 0, 1);           // entra el ancla $6.000
  const cheap = ip(f, 138, 166, 0, 1);            // $1.900 ahora parece barato (✓)
  const sceneOut = 1 - ip(f, 176, 200, 0, 1);
  const stmt = ip(f, 188, 216, 0, 1) * (1 - ip(f, 250, 266, 0, 1));
  const pay = ip(f, 258, 290, 0, 1);
  const priceColor = cheap > 0.4 ? GREEN : '#F2F4F0';

  return (
    <Stage bg="radial-gradient(120% 95% at 50% 38%, #0C1A12 0%, #05080B 78%)" hue="#2F9E63" seed={7}>
      <Label frame={f} s={6} text="RÁPIDO, SIN PENSAR:" outAt={176} />
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', opacity: sceneOut }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18 }}>
          {/* el ancla (lo que cobran otros) */}
          <div style={{ opacity: anchor, transform: `translateY(${(1 - anchor) * -20}px)`, textAlign: 'center' }}>
            <div style={{ fontFamily: fonts.mono, fontSize: 28, color: '#8A9A90', letterSpacing: '0.06em' }}>el de al lado cobra</div>
            <div style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: 110, color: '#6E7A72', letterSpacing: '-0.04em', textDecoration: 'line-through', textDecorationColor: '#4A5650' }}>$6.000</div>
          </div>
          {/* tu precio */}
          <div style={{ opacity: p1, transform: `scale(${0.9 + p1 * 0.1 + cheap * 0.06})` }}>
            <div style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: 200, letterSpacing: '-0.05em', color: priceColor, textShadow: cheap > 0.4 ? `0 0 50px ${GREEN}66` : '0 10px 60px rgba(0,0,0,0.5)' }}>$1.900</div>
          </div>
          {/* prompt: primero duda, después "barato" */}
          <div style={{ fontFamily: fonts.mono, fontSize: 34, color: judge > 0.1 ? '#C9C3CC' : GREEN, opacity: Math.max(judge, cheap) }}>{cheap > 0.4 ? '¿y ahora? → barato ✓' : '¿caro o barato?'}</div>
        </div>
      </AbsoluteFill>

      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 70px', opacity: stmt }}>
        <div style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: 92, letterSpacing: '-0.04em', lineHeight: 1.06, color: '#F1F4F0' }}>
          No bajé el precio.<br />Te <span style={{ color: GREEN }}>anclé</span>.
        </div>
      </AbsoluteFill>

      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 70px', opacity: pay }}>
        <SiriFrame frame={f} intensity={pay} />
        <div style={{ transform: `translateY(${(1 - pay) * 24}px)` }}>
          <div style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: 80, letterSpacing: '-0.04em', lineHeight: 1.06, color: '#F1F4F0' }}>Mostrá primero<br />el número <span style={{ color: GREEN, textShadow: `0 0 30px ${GREEN}66` }}>grande</span>.</div>
          <div style={{ fontFamily: fonts.display, fontWeight: 500, fontSize: 34, color: '#92A39A', marginTop: 30, opacity: ip(f, 286, 310, 0, 1) }}>Si no, tu cliente ancla solo… y casi siempre en tu contra.</div>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};
