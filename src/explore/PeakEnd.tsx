/**
 * PeakEnd — reflexión: tu cliente recuerda cómo EMPEZÓ y cómo TERMINÓ; el medio se
 * borra (regla peak-end / posición serial). Mecanismo: timeline de 6 momentos; el
 * primero y el último quedan nítidos y brillan, el medio se desvanece. Modo midnight/cyan.
 */
import React from 'react';
import { AbsoluteFill } from 'remotion';
import { Stage, SiriGlow, SiriFrame, Label, ip, useF, dur, fonts } from './lib';

const CY = '#8FE6FF';
const MOMENTS = ['Te encontró', 'Esperó', 'Preguntó', 'Comparó', 'Dudó', 'Decidió'];
const BASE = 280;
export const PEAKEND_DURATION = dur(BASE);

export const PeakEnd: React.FC = () => {
  const f = useF();
  const sceneOut = 1 - ip(f, 98, 122, 0, 1);
  const stmt = ip(f, 106, 134, 0, 1) * (1 - ip(f, 168, 184, 0, 1));
  const pay = ip(f, 176, 206, 0, 1);
  const fade = ip(f, 40, 92, 0, 1); // el medio se borra

  return (
    <Stage bg="radial-gradient(120% 90% at 50% 35%, #0C1322 0%, #05070E 78%)" hue="#5B8CFF" seed={4}>
      <Label frame={f} s={6} text="LA EXPERIENCIA DE TU CLIENTE" outAt={96} />
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', opacity: sceneOut }}>
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 30 }}>
          <div style={{ position: 'absolute', left: 27, top: 20, bottom: 20, width: 2, background: 'rgba(255,255,255,0.14)' }} />
          {MOMENTS.map((m, i) => {
            const edge = i === 0 || i === MOMENTS.length - 1;
            const appear = ip(f, 10 + i * 6, 28 + i * 6, 0, 1);
            const op = appear * (edge ? 1 : 1 - fade * 0.78);
            const blur = edge ? 0 : fade * 5;
            return (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 28, opacity: op, filter: blur > 0.3 ? `blur(${blur}px)` : 'none' }}>
                <div style={{ position: 'relative', width: 56, height: 56, flexShrink: 0 }}>
                  {edge ? <SiriGlow frame={f} intensity={ip(f, 60, 92, 0, 1)} radius={28} /> : null}
                  <div style={{ width: 56, height: 56, borderRadius: '50%', background: edge ? CY : 'rgba(255,255,255,0.18)', boxShadow: edge ? `0 0 24px ${CY}` : 'none' }} />
                </div>
                <span style={{ fontFamily: fonts.display, fontWeight: edge ? 800 : 600, fontSize: 46, color: edge ? '#EAF6FF' : '#9AA3B2', letterSpacing: '-0.02em' }}>{m}</span>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>

      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 70px', opacity: stmt }}>
        <div style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: 84, letterSpacing: '-0.04em', lineHeight: 1.06, color: '#F2F6FF' }}>
          Tu cliente no recuerda<br />todo lo que pasó.
        </div>
      </AbsoluteFill>

      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 70px', opacity: pay }}>
        <SiriFrame frame={f} intensity={pay} />
        <div style={{ transform: `translateY(${(1 - pay) * 24}px)` }}>
          <div style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: 86, letterSpacing: '-0.04em', lineHeight: 1.06, color: '#F2F6FF' }}>Recuerda cómo <span style={{ color: CY, textShadow: `0 0 30px ${CY}66` }}>empezó</span><br />y cómo <span style={{ color: CY, textShadow: `0 0 30px ${CY}66` }}>terminó</span>.</div>
          <div style={{ fontFamily: fonts.display, fontWeight: 500, fontSize: 34, color: '#8A93A6', marginTop: 30, opacity: ip(f, 204, 226, 0, 1) }}>Cuidá el primer y el último segundo. El resto se borra.</div>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};
