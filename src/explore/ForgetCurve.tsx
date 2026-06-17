/**
 * ForgetCurve — reflexión: el cliente te olvida rápido (curva del olvido). Mecanismo:
 * el recuerdo de tu marca se desvanece día a día (3 estados: nítido → borroso → casi
 * fantasma). Modo ámbar/cálido. VENDE: seguimiento/automatización.
 */
import React from 'react';
import { AbsoluteFill } from 'remotion';
import { Stage, SiriFrame, Label, ip, useF, dur, fonts, VLT_L } from './lib';

const AMBER = '#FFB23D';
const DAYS = [{ d: 'DÍA 1', o: 1, b: 0 }, { d: 'DÍA 2', o: 0.5, b: 4 }, { d: 'DÍA 3', o: 0.16, b: 9 }];
const BASE = 280;
export const FORGETCURVE_DURATION = dur(BASE);

export const ForgetCurve: React.FC = () => {
  const f = useF();
  const sceneOut = 1 - ip(f, 98, 122, 0, 1);
  const stmt = ip(f, 106, 134, 0, 1) * (1 - ip(f, 168, 184, 0, 1));
  const pay = ip(f, 176, 206, 0, 1);
  return (
    <Stage bg="radial-gradient(120% 95% at 50% 38%, #1A140C 0%, #07050B 78%)" hue="#C9913D" seed={2}>
      <Label frame={f} s={6} text="TU MARCA EN SU MEMORIA" outAt={96} />
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', opacity: sceneOut }}>
        <div style={{ display: 'flex', gap: 36, alignItems: 'center' }}>
          {DAYS.map((day, i) => {
            const a = ip(f, 18 + i * 22, 40 + i * 22, 0, 1);
            return (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18, opacity: a }}>
                <div style={{ width: 200, height: 200, borderRadius: 32, background: `linear-gradient(135deg, ${AMBER}, ${AMBER}88)`, opacity: day.o, filter: `saturate(${1 - day.b / 12}) blur(${day.b}px)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: fonts.display, fontWeight: 800, fontSize: 70, color: '#1A140C' }}>★</div>
                <div style={{ fontFamily: fonts.mono, fontSize: 26, color: i === 2 ? '#6A6052' : '#B8B2A6' }}>{day.d}</div>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>

      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 70px', opacity: stmt }}>
        <div style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: 88, letterSpacing: '-0.04em', lineHeight: 1.06, color: '#F4EFE4' }}>
          Te conoció.<br />Y te <span style={{ color: AMBER }}>olvidó</span>.
        </div>
      </AbsoluteFill>

      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 70px', opacity: pay }}>
        <SiriFrame frame={f} intensity={pay} />
        <div style={{ transform: `translateY(${(1 - pay) * 24}px)` }}>
          <div style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: 82, letterSpacing: '-0.04em', lineHeight: 1.06, color: '#F4EFE4' }}>Si no volvés a aparecer,<br />en 48h sos un <span style={{ color: AMBER, textShadow: `0 0 30px ${AMBER}66` }}>desconocido</span>.</div>
          <div style={{ fontFamily: fonts.display, fontWeight: 500, fontSize: 34, color: '#A89E8C', marginTop: 30, opacity: ip(f, 204, 226, 0, 1) }}>Por eso el seguimiento no es opcional. Y no debería ser a mano.</div>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};
