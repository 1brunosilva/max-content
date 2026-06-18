/**
 * RedConfianza — Efecto de red / Sesgo del grupo (in-group belonging).
 * Puntos-negocio que primero están aislados. Líneas de luz los conectan
 * uno a uno — la red crece y brilla. Un nodo solitario queda en sombras.
 * El espectador siente el aislamiento vs la pertenencia antes del payoff.
 * Lever: network effect / in-group belonging. Palette: cyan. Mode: midnight. V.
 */
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { Stage, SiriGlow, SiriFrame, BigType, ip, fonts } from './kit';

const CYAN = '#4FE0FF';
const BLUE = '#5B8CFF';

const NODES = [
  { x: 540, y: 700 }, { x: 370, y: 850 }, { x: 720, y: 840 },
  { x: 440, y: 1010 }, { x: 660, y: 990 }, { x: 295, y: 1120 },
  { x: 790, y: 1080 },
];
const LONE = { x: 200, y: 590 };
const EDGES: [number, number][] = [[0,1],[0,2],[1,3],[2,4],[3,4],[1,5],[2,6],[4,6]];

export const REDCONFIANZA_DURATION = 265;

export const RedConfianza: React.FC = () => {
  const f = useCurrentFrame();

  const nodesIn = ip(f, 8, 36, 0, 1);
  const networkGlow = ip(f, 88, 125, 0, 1);
  const loneOp = ip(f, 40, 62, 1, 0.2);
  const glowI = ip(f, 112, 148, 0, 1);
  const pay = ip(f, 175, 205, 0, 1);
  const labelOp = ip(f, 4, 22, 0, 1) * (1 - pay);

  return (
    <Stage bg="radial-gradient(130% 95% at 50% 60%, #040C14 0%, #020508 80%)" hue={CYAN} seed={11}>
      <div style={{
        position: 'absolute', top: 130, left: 0, right: 0, textAlign: 'center',
        fontFamily: fonts.mono, fontSize: 22, letterSpacing: '0.18em',
        color: 'rgba(255,255,255,0.65)', opacity: labelOp, zIndex: 30,
      }}>
        LA RED · SE FORMA SOLA
      </div>

      <AbsoluteFill style={{ opacity: 1 - pay }}>
        {/* SVG for edges */}
        <svg
          width="1080" height="1920"
          style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}
        >
          <defs>
            <filter id="lg">
              <feGaussianBlur stdDeviation="3" result="b" />
              <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>
          {EDGES.map(([a, b], i) => {
            const nA = NODES[a];
            const nB = NODES[b];
            const ep = ip(f, 42 + i * 8, 64 + i * 8, 0, 1);
            if (ep < 0.01) return null;
            const mx = nA.x + (nB.x - nA.x) * ep;
            const my = nA.y + (nB.y - nA.y) * ep;
            return (
              <line
                key={i}
                x1={nA.x} y1={nA.y} x2={mx} y2={my}
                stroke={CYAN}
                strokeWidth={2}
                strokeOpacity={0.32 + networkGlow * 0.38}
                filter="url(#lg)"
              />
            );
          })}
        </svg>

        {/* Connected nodes */}
        {NODES.map((n, i) => {
          const pulse = 0.6 + 0.4 * Math.sin(f * 0.09 + i * 1.4);
          const sz = i === 0 ? 26 : 18;
          return (
            <div key={i} style={{
              position: 'absolute',
              left: n.x - sz, top: n.y - sz,
              width: sz * 2, height: sz * 2, borderRadius: '50%',
              background: `radial-gradient(circle, ${CYAN} 0%, ${BLUE}80 55%, transparent 100%)`,
              opacity: nodesIn * (0.55 + networkGlow * pulse * 0.45),
              boxShadow: `0 0 ${16 + networkGlow * 28}px ${CYAN}77`,
            }}>
              {i === 0 && glowI > 0.05 ? <SiriGlow frame={f} intensity={glowI * 0.8} radius={sz} /> : null}
            </div>
          );
        })}

        {/* Lone node */}
        <div style={{
          position: 'absolute',
          left: LONE.x - 16, top: LONE.y - 16,
          width: 32, height: 32, borderRadius: '50%',
          background: '#2A2A3A',
          opacity: loneOp * nodesIn,
        }} />
        <div style={{
          position: 'absolute',
          left: LONE.x - 60, top: LONE.y + 24,
          fontFamily: fonts.mono, fontSize: 15, color: '#3A3A52',
          letterSpacing: '0.12em', opacity: loneOp * nodesIn, width: 120, textAlign: 'center',
        }}>SOLO</div>
      </AbsoluteFill>

      {/* Payoff */}
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 96, opacity: pay, zIndex: 200 }}>
        <SiriFrame frame={f} intensity={pay} />
        <div style={{ transform: `translateY(${(1 - pay) * 28}px)` }}>
          <BigType frame={f} s={175} size={88} lines={[
            { t: 'La red crece' },
            { t: 'sola.' },
            { t: 'El que no entra', hl: false },
            { t: 'queda afuera.', hl: true },
          ]} />
          <div style={{ fontFamily: fonts.display, fontSize: 32, color: '#8A8AAA', marginTop: 28, opacity: ip(f, 215, 237, 0, 1) }}>
            Los que automatizan se reconocen entre sí.
          </div>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};
