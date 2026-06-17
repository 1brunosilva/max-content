/**
 * MereExposure — reflexión: "no te eligen por ser el mejor, por ser el que más vieron"
 * (efecto de mera exposición). Mecanismo: 5 marcas; una se repite/parpadea (la ves
 * seguido) y termina elegida. Modo glassy-violeta. Vende: contenido/constancia.
 */
import React from 'react';
import { AbsoluteFill } from 'remotion';
import { Stage, SiriGlow, SiriFrame, Label, ip, useF, dur, fonts, VLT, VLT_L } from './lib';

const MARKS = ['A', 'B', 'C', 'D', 'E'];
const REP = 2; // la que se repite
const BASE = 280;
export const MEREEXPOSURE_DURATION = dur(BASE);

export const MereExposure: React.FC = () => {
  const f = useF();
  const sceneOut = 1 - ip(f, 98, 122, 0, 1);
  const stmt = ip(f, 106, 134, 0, 1) * (1 - ip(f, 168, 184, 0, 1));
  const pay = ip(f, 176, 206, 0, 1);
  const seen = Math.min(7, Math.floor(ip(f, 22, 86, 0, 8)));

  return (
    <Stage bg="radial-gradient(120% 95% at 50% 40%, #15101F 0%, #06050B 78%)" hue={VLT} seed={1}>
      <Label frame={f} s={6} text="POR QUÉ TE ELIGEN" outAt={96} />
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', opacity: sceneOut }}>
        <div style={{ display: 'flex', gap: 40 }}>
          {MARKS.map((m, i) => {
            const isRep = i === REP;
            const appear = ip(f, 10 + i * 4, 26 + i * 4, 0, 1);
            const flash = isRep ? 0.55 + 0.45 * Math.abs(Math.sin(f * 0.45)) : 0.4;
            const pop = isRep ? ip(f, 84, 96, 1, 1.22) : 1;
            return (
              <div key={i} style={{ position: 'relative', opacity: appear, transform: `scale(${pop})` }}>
                {isRep ? <SiriGlow frame={f} intensity={ip(f, 84, 96, 0, 1)} radius={70} /> : null}
                <div style={{ width: 140, height: 140, borderRadius: '50%', background: isRep ? `linear-gradient(135deg, ${VLT}, ${VLT_L})` : 'rgba(255,255,255,0.06)', border: `1px solid ${isRep ? VLT_L : 'rgba(255,255,255,0.12)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: fonts.display, fontWeight: 800, fontSize: 64, color: '#fff', opacity: isRep ? flash : 0.55 }}>{m}</div>
                {isRep ? <div style={{ position: 'absolute', top: -54, left: '50%', transform: 'translateX(-50%)', fontFamily: fonts.mono, fontSize: 26, color: VLT_L, whiteSpace: 'nowrap' }}>visto {seen}×</div> : null}
              </div>
            );
          })}
        </div>
      </AbsoluteFill>

      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 70px', opacity: stmt }}>
        <div style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: 90, letterSpacing: '-0.04em', lineHeight: 1.06, color: '#F2F0FA' }}>
          No te eligen<br />por ser el <span style={{ color: VLT_L }}>mejor</span>.
        </div>
      </AbsoluteFill>

      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 70px', opacity: pay }}>
        <SiriFrame frame={f} intensity={pay} />
        <div style={{ transform: `translateY(${(1 - pay) * 24}px)` }}>
          <div style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: 90, letterSpacing: '-0.04em', lineHeight: 1.06, color: '#F2F0FA' }}>Te eligen por ser<br />el que <span style={{ color: VLT_L, textShadow: `0 0 30px ${VLT}` }}>más vieron</span>.</div>
          <div style={{ fontFamily: fonts.display, fontWeight: 500, fontSize: 34, color: '#9A96AC', marginTop: 30, opacity: ip(f, 204, 226, 0, 1) }}>Por eso aparecer seguido no es vanidad. Es estrategia.</div>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};
