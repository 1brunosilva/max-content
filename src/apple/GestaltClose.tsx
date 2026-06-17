/**
 * GestaltClose — Principio de cierre / Gestalt Closure.
 * Un círculo incompleto gira lentamente. La mente "quiere" completarlo.
 * Luego el arco faltante aparece con glow Siri — alivio instantáneo.
 * Aplicado a branding: si tu marca da la forma correcta, el cliente la completa.
 * Lever: Gestalt / cierre cognitivo. Palette: rosa-cyan. Mode: midnight. C.
 */
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { Stage, SiriFrame, BigType, ip, fonts } from './kit';

const ROSE = '#FF6FD8';
const CYAN = '#4FE0FF';
const R = 220; // radio del círculo

export const GESTALTCLOSE_DURATION = 255;

export const GestaltClose: React.FC = () => {
  const f = useCurrentFrame();

  const circleIn = ip(f, 8, 40, 0, 1);
  const rotAngle = f * 0.8; // gira lentamente
  const gapAngle = ip(f, 10, 70, 80, 80); // hueco fijo de 80 grados mientras el arco falta
  const closeP = ip(f, 95, 138, 0, 1);    // el arco faltante aparece
  const glowI = ip(f, 120, 155, 0, 1);
  const pay = ip(f, 168, 196, 0, 1);
  const labelOp = ip(f, 4, 20, 0, 1) * (1 - ip(f, 92, 108, 0, 1));

  const gap = gapAngle * (1 - closeP); // el hueco se cierra progresivamente

  // SVG arc helpers
  const polarToXY = (deg: number, r: number) => {
    const rad = (deg - 90) * Math.PI / 180;
    return { x: 540 + r * Math.cos(rad), y: 960 + r * Math.sin(rad) };
  };

  const arcPath = (startDeg: number, endDeg: number, r: number, color: string, strokeW: number, glow: boolean) => {
    const start = polarToXY(startDeg, r);
    const end = polarToXY(endDeg, r);
    const large = (endDeg - startDeg) > 180 ? 1 : 0;
    return (
      <path
        d={`M ${start.x} ${start.y} A ${r} ${r} 0 ${large} 1 ${end.x} ${end.y}`}
        stroke={color}
        strokeWidth={strokeW}
        fill="none"
        strokeLinecap="round"
        style={{
          filter: glow ? `drop-shadow(0 0 16px ${color}) drop-shadow(0 0 32px ${color}88)` : 'none',
          opacity: circleIn,
        }}
      />
    );
  };

  const mainStart = rotAngle;
  const mainEnd = mainStart + (360 - gap);
  const missingStart = mainEnd;
  const missingEnd = mainStart + 360;

  return (
    <Stage bg="radial-gradient(115% 85% at 50% 50%, #160A18 0%, #060206 80%)" hue={ROSE} seed={16}>
      <div style={{
        position: 'absolute', top: 130, left: 0, right: 0, textAlign: 'center',
        fontFamily: fonts.mono, fontSize: 22, letterSpacing: '0.18em',
        color: 'rgba(255,255,255,0.65)', opacity: labelOp, zIndex: 30,
      }}>
        TU MENTE BUSCA EL CIERRE
      </div>

      {/* Texto central mientras el arco falta */}
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', opacity: ip(f, 20, 48, 0, 1) * (1 - closeP * 0.7) }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: 52, color: 'rgba(255,255,255,0.3)', letterSpacing: '-0.03em' }}>
            ¿Dónde
          </div>
          <div style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: 52, color: 'rgba(255,111,216,0.5)', letterSpacing: '-0.03em' }}>
            está el cierre?
          </div>
        </div>
      </AbsoluteFill>

      {/* Texto central cuando se cierra */}
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', opacity: closeP * (1 - pay) }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: 56, color: ROSE, letterSpacing: '-0.03em', textShadow: `0 0 40px ${ROSE}88` }}>
            Ahí está.
          </div>
        </div>
      </AbsoluteFill>

      {/* Círculo SVG */}
      <svg width="1080" height="1920" style={{ position: 'absolute', top: 0, left: 0, opacity: 1 - pay }}>
        {/* Arco principal (casi completo) */}
        {arcPath(mainStart, mainEnd, R, '#5B8CFF', 8, false)}
        {/* Hueco — arco faltante */}
        {gap > 2 ? arcPath(missingStart, missingEnd, R, 'rgba(255,255,255,0.1)', 5, false) : null}
        {/* Cierre con glow */}
        {closeP > 0.05 ? arcPath(missingStart, missingEnd, R, ROSE, 8, glowI > 0.1) : null}
        {/* Punto de inicio */}
        {(() => {
          const p = polarToXY(mainStart, R);
          return <circle cx={p.x} cy={p.y} r={10} fill={CYAN} style={{ filter: `drop-shadow(0 0 12px ${CYAN})`, opacity: circleIn }} />;
        })()}
      </svg>

      {/* Payoff */}
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 96, opacity: pay, zIndex: 200 }}>
        <SiriFrame frame={f} intensity={pay} />
        <div style={{ transform: `translateY(${(1 - pay) * 28}px)` }}>
          <BigType frame={f} s={168} size={84} lines={[
            { t: 'La mente completa' },
            { t: 'lo que falta.' },
            { t: 'Dale la forma', hl: false },
            { t: 'correcta.', hl: true },
          ]} />
          <div style={{ fontFamily: fonts.display, fontSize: 32, color: '#8A8AAA', marginTop: 28, opacity: ip(f, 206, 228, 0, 1) }}>
            El diseño de tu marca habla antes que vos.
          </div>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};
