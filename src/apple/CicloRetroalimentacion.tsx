/**
 * CicloRetroalimentacion — Feedback loop / virtuous cycle. Una rueda de 5 nodos
 * se dibuja orbitando: Buena experiencia → Reseña 5★ → Más clientes → Mejor servicio
 * → Mejor experiencia. Cada nodo llega con glow. La rueda gira sola, el ciclo no para.
 * El espectador VIVE que la calidad es un sistema, no un momento.
 *
 * Lever: compound growth / feedback loop psychology / service quality compounding. Paleta: cyan-verde. C.
 */
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { Stage, SiriFrame, BigType, ip, fonts } from './kit';

export const CICLORETROALIMENTACION_DURATION = 320;

const CYAN = '#4FE0FF';
const GREEN = '#10B981';
const VLT = '#7C3AED';

const NODES = [
  { label: 'Buena experiencia', icon: '✨', color: CYAN },
  { label: 'Reseña 5★', icon: '⭐', color: '#F59E0B' },
  { label: 'Más clientes', icon: '👥', color: GREEN },
  { label: 'Mejor servicio', icon: '🎯', color: VLT },
  { label: 'Más ingresos', icon: '📈', color: '#EC4899' },
];

const N = NODES.length;
const R = 290; // radio del círculo
const CX = 540; // center X
const CY = 960; // center Y

const getNodePos = (index: number, rotation: number) => {
  const angle = (index / N) * 2 * Math.PI - Math.PI / 2 + rotation;
  return {
    x: CX + R * Math.cos(angle),
    y: CY + R * Math.sin(angle),
  };
};

export const CicloRetroalimentacion: React.FC = () => {
  const f = useCurrentFrame();

  const labelOp = ip(f, 8, 28, 0, 1) * (1 - ip(f, 248, 266, 0, 1));

  // Rotación del ciclo (gira lentamente)
  const rotation = ip(f, 60, 280, 0, 2 * Math.PI * 0.8);

  // Los nodos aparecen en secuencia
  const nodesReveal = (i: number) => ip(f, 42 + i * 18, 68 + i * 18, 0, 1);
  const connReveal = (i: number) => ip(f, 58 + i * 18, 82 + i * 18, 0, 1);

  // El ciclo completo brilla al cerrarse
  const cycleGlow = ip(f, 155, 185, 0, 1);

  // "el ciclo no para" text
  const loopLabel = ip(f, 185, 210, 0, 1) * (1 - ip(f, 248, 265, 0, 1));

  const pay = ip(f, 258, 290, 0, 1);

  const NODE_SIZE = 96;
  const CIRCLE_STROKE = 2;

  return (
    <Stage
      bg="radial-gradient(130% 92% at 50% 44%, #030D12 0%, #010507 80%)"
      hue={CYAN}
      seed={18}
    >
      {/* Label */}
      <div style={{
        position: 'absolute', top: 250, left: 0, right: 0, textAlign: 'center',
        fontFamily: fonts.mono, fontSize: 38, letterSpacing: '0.18em',
        color: 'rgba(79,224,255,0.72)', opacity: labelOp, zIndex: 30,
      }}>
        EL CICLO DE LA CALIDAD
      </div>

      <AbsoluteFill style={{ opacity: 1 - pay }}>
        {/* SVG del círculo conectando los nodos */}
        <svg
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
          viewBox={`0 0 1080 1920`}
        >
          {/* Círculo guía (tenue) */}
          <circle
            cx={CX} cy={CY} r={R}
            fill="none"
            stroke={`rgba(79,224,255,0.08)`}
            strokeWidth={CIRCLE_STROKE}
          />

          {/* Arcos de conexión entre nodos (aparecen en secuencia) */}
          {NODES.map((_, i) => {
            const next = (i + 1) % N;
            const from = getNodePos(i, rotation);
            const to = getNodePos(next, rotation);
            const rev = connReveal(i);
            if (rev <= 0.01) return null;

            // Punto medio interpolado
            const mx = from.x + (to.x - from.x) * rev;
            const my = from.y + (to.y - from.y) * rev;

            return (
              <g key={i}>
                <line
                  x1={from.x} y1={from.y}
                  x2={mx} y2={my}
                  stroke={NODES[i].color}
                  strokeWidth={3}
                  strokeOpacity={0.5 + cycleGlow * 0.4}
                  strokeLinecap="round"
                />
                {/* Flecha en el extremo */}
                {rev > 0.7 && (
                  <circle cx={mx} cy={my} r={5} fill={NODES[i].color} opacity={0.7 + cycleGlow * 0.3} />
                )}
              </g>
            );
          })}
        </svg>

        {/* NODOS */}
        {NODES.map((node, i) => {
          const pos = getNodePos(i, rotation);
          const nRev = nodesReveal(i);
          const isCurrent = (Math.floor((f - 40) / 28) % N) === i && f > 40;
          const glowIntensity = isCurrent ? cycleGlow * 0.7 + nRev * 0.3 : nRev * 0.25 * cycleGlow;

          return (
            <div key={i} style={{
              position: 'absolute',
              left: pos.x - NODE_SIZE / 2,
              top: pos.y - NODE_SIZE / 2,
              width: NODE_SIZE, height: NODE_SIZE,
              opacity: nRev,
              transform: `scale(${0.85 + nRev * 0.15 + (isCurrent ? cycleGlow * 0.12 : 0)})`,
            }}>
              {/* Glow del nodo */}
              <div style={{
                position: 'absolute', inset: -24, borderRadius: '50%',
                background: node.color,
                opacity: glowIntensity * 0.35,
                filter: 'blur(20px)',
              }} />
              {/* Card del nodo */}
              <div style={{
                position: 'relative', width: NODE_SIZE, height: NODE_SIZE,
                borderRadius: '50%',
                background: isCurrent
                  ? `radial-gradient(circle, ${node.color}33 0%, ${node.color}11 100%)`
                  : 'rgba(255,255,255,0.06)',
                border: `2px solid ${node.color}${isCurrent ? 'CC' : '55'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 38,
                boxShadow: isCurrent ? `0 0 30px ${node.color}66` : 'none',
              }}>
                {node.icon}
              </div>
              {/* Label externo al nodo */}
              <div style={{
                position: 'absolute',
                top: NODE_SIZE + 12,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 200, textAlign: 'center',
                fontFamily: fonts.display, fontWeight: 600, fontSize: 28,
                color: isCurrent ? node.color : 'rgba(255,255,255,0.5)',
                lineHeight: 1.3,
                textShadow: isCurrent ? `0 0 20px ${node.color}` : 'none',
                whiteSpace: 'nowrap',
              }}>
                {node.label}
              </div>
            </div>
          );
        })}

        {/* "el ciclo no para" label central */}
        <div style={{
          position: 'absolute',
          left: CX - 180, top: CY - 60, width: 360, textAlign: 'center',
          opacity: loopLabel,
        }}>
          <div style={{
            fontFamily: fonts.mono, fontSize: 28, color: `${CYAN}88`,
            letterSpacing: '0.1em',
          }}>
            EL CICLO NO PARA
          </div>
        </div>
      </AbsoluteFill>

      {/* PAYOFF */}
      <AbsoluteFill style={{
        alignItems: 'center', justifyContent: 'center', textAlign: 'center',
        paddingLeft: 90, paddingRight: 130, opacity: pay, zIndex: 200,
      }}>
        <SiriFrame frame={f} intensity={pay} />
        <div style={{ transform: `translateY(${(1 - pay) * 26}px)` }}>
          <BigType frame={f} s={258} size={96} lines={[
            { t: 'La calidad no es' },
            { t: 'un momento.' },
            { t: 'Es un sistema', hl: false },
            { t: 'que se alimenta solo.', hl: true },
          ]} />
          <div style={{
            fontFamily: fonts.display, fontWeight: 400, fontSize: 40, color: '#9A9AB5',
            marginTop: 32, opacity: ip(f, 296, 316, 0, 1),
          }}>
            Cada cliente bien atendido trae el siguiente.
          </div>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};
