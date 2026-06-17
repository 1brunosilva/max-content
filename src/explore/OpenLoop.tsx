/**
 * OpenLoop — reflexión: el cerebro odia lo incompleto (efecto Zeigarnik). Un círculo
 * de progreso que se queda en 85% y NO cierra, pulsando, pidiendo cierre. Modo cyan.
 * Vende: hooks/contenido (abrir un loop y no cerrarlo enseguida).
 */
import React from 'react';
import { AbsoluteFill } from 'remotion';
import { Stage, SiriFrame, Label, ip, useF, dur, fonts } from './lib';

const CY = '#8FE6FF';
const BASE = 280;
export const OPENLOOP_DURATION = dur(BASE);

export const OpenLoop: React.FC = () => {
  const f = useF();
  const sceneOut = 1 - ip(f, 98, 122, 0, 1);
  const stmt = ip(f, 106, 134, 0, 1) * (1 - ip(f, 168, 184, 0, 1));
  const pay = ip(f, 176, 206, 0, 1);
  const fill = ip(f, 20, 78, 0, 0.91);              // se queda en 91% (no cierra)
  const R = 180, C = 2 * Math.PI * R;
  const pulse = 0.6 + 0.4 * Math.abs(Math.sin(f * 0.16));
  return (
    <Stage bg="radial-gradient(120% 90% at 50% 38%, #0C1322 0%, #05070E 78%)" hue="#5B8CFF" seed={4}>
      <Label frame={f} s={6} text="91% COMPLETO…" outAt={96} />
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', opacity: sceneOut }}>
        <div style={{ position: 'relative', width: 460, height: 460 }}>
          <svg width="460" height="460" style={{ transform: 'rotate(-90deg)' }}>
            <circle cx="230" cy="230" r={R} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="22" />
            <circle cx="230" cy="230" r={R} fill="none" stroke={CY} strokeWidth="22" strokeLinecap="round" strokeDasharray={C} strokeDashoffset={C * (1 - fill)} style={{ filter: `drop-shadow(0 0 ${20 * pulse}px ${CY})` }} />
          </svg>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: 120, color: '#EAF6FF', letterSpacing: '-0.04em' }}>{Math.round(fill * 100)}%</div>
            <div style={{ fontFamily: fonts.mono, fontSize: 30, color: CY, opacity: pulse }}>falta poco…</div>
          </div>
        </div>
      </AbsoluteFill>

      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 70px', opacity: stmt }}>
        <div style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: 86, letterSpacing: '-0.04em', lineHeight: 1.06, color: '#F2F6FF' }}>
          ¿Te molesta<br />que no <span style={{ color: CY }}>cierre</span>?
        </div>
      </AbsoluteFill>

      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 70px', opacity: pay }}>
        <SiriFrame frame={f} intensity={pay} />
        <div style={{ transform: `translateY(${(1 - pay) * 24}px)` }}>
          <div style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: 84, letterSpacing: '-0.04em', lineHeight: 1.06, color: '#F2F6FF' }}>Lo que queda <span style={{ color: CY, textShadow: `0 0 30px ${CY}66` }}>sin cerrar</span><br />no se lo sacan de la cabeza.</div>
          <div style={{ fontFamily: fonts.display, fontWeight: 500, fontSize: 34, color: '#8A93A6', marginTop: 30, opacity: ip(f, 204, 226, 0, 1) }}>Un buen hook abre algo… y te hace quedarte a ver cómo termina.</div>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};
