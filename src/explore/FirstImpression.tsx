/**
 * FirstImpression — reflexión: tu cliente decide en 3 segundos y después solo busca
 * confirmar (halo + sesgo de confirmación). Mecanismo: un veredicto se CLAVA rápido;
 * después aparecen datos buenos pero no mueven la aguja. Modo oscuro/rojo.
 */
import React from 'react';
import { AbsoluteFill } from 'remotion';
import { Stage, SiriFrame, Label, ip, useF, dur, fonts } from './lib';

const RED = '#FF5A6E';
const FACTS = ['20 años de trayectoria', 'Premio a la calidad', 'Los mejores precios'];
const BASE = 280;
export const FIRSTIMPRESSION_DURATION = dur(BASE);

export const FirstImpression: React.FC = () => {
  const f = useF();
  const sceneOut = 1 - ip(f, 98, 122, 0, 1);
  const stmt = ip(f, 106, 134, 0, 1) * (1 - ip(f, 168, 184, 0, 1));
  const pay = ip(f, 176, 206, 0, 1);
  const snap = ip(f, 18, 34, 0, 1);                 // el veredicto se clava (rápido)
  const glow = 0.6 + 0.4 * Math.abs(Math.sin(f * 0.16));
  return (
    <Stage bg="radial-gradient(120% 95% at 50% 36%, #1A0E12 0%, #07050B 78%)" hue="#C94D5E" seed={5}>
      <Label frame={f} s={6} text="PRIMERA IMPRESIÓN" outAt={96} />
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', opacity: sceneOut }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 50 }}>
          {/* veredicto que se clava */}
          <div style={{ position: 'relative', transform: `scale(${0.7 + snap * 0.3})`, opacity: snap }}>
            <div style={{ position: 'absolute', inset: -26, borderRadius: 30, background: RED, filter: 'blur(34px)', opacity: 0.4 * glow }} />
            <div style={{ padding: '26px 54px', borderRadius: 26, background: 'rgba(255,90,110,0.12)', border: `2px solid ${RED}`, fontFamily: fonts.display, fontWeight: 800, fontSize: 70, color: RED, letterSpacing: '-0.02em' }}>NO me convence ✕</div>
            <div style={{ fontFamily: fonts.mono, fontSize: 26, color: '#9A8A8E', marginTop: 16, textAlign: 'center' }}>decidido en 3 segundos</div>
          </div>
          {/* datos buenos que NO mueven la aguja */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center' }}>
            {FACTS.map((t, i) => {
              const a = ip(f, 44 + i * 14, 60 + i * 14, 0, 1);
              return <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, opacity: a * 0.55 }}>
                <span style={{ fontFamily: fonts.display, fontWeight: 600, fontSize: 36, color: '#C9C3CC' }}>{t}</span>
                <span style={{ fontFamily: fonts.mono, fontSize: 24, color: '#6A6068' }}>→ no cambió nada</span>
              </div>;
            })}
          </div>
        </div>
      </AbsoluteFill>

      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 70px', opacity: stmt }}>
        <div style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: 92, letterSpacing: '-0.04em', lineHeight: 1.06, color: '#F4EEF0' }}>
          Decidió en<br /><span style={{ color: RED }}>3 segundos</span>.
        </div>
      </AbsoluteFill>

      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 70px', opacity: pay }}>
        <SiriFrame frame={f} intensity={pay} />
        <div style={{ transform: `translateY(${(1 - pay) * 24}px)` }}>
          <div style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: 84, letterSpacing: '-0.04em', lineHeight: 1.06, color: '#F4EEF0' }}>Después solo busca<br />razones para <span style={{ color: RED, textShadow: `0 0 30px ${RED}66` }}>tener razón</span>.</div>
          <div style={{ fontFamily: fonts.display, fontWeight: 500, fontSize: 34, color: '#A8989C', marginTop: 30, opacity: ip(f, 204, 226, 0, 1) }}>Tu primer segundo no se discute. Se confirma. Cuidalo.</div>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};
