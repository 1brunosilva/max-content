/**
 * OptimismoCiego — Optimism bias / unrealistic optimism.
 * "A mí no me va a pasar." Cards de problemas comunes flotan alrededor —
 * el espectador los esquiva mentalmente — hasta que una lo impacta.
 * Lever: optimism bias. Palette: ámbar/índigo. Mode: glassy-oscuro. C.
 */
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { Stage, SiriGlow, SiriFrame, BigType, ip, fonts } from './kit';

const AMBER   = '#F59E0B';
const AMBER_L = '#FDE68A';

const RISKS = [
  { text: 'Cliente que no paga',  x: 100, y: 360, delay: 20 },
  { text: 'Redes sin engagement', x: 640, y: 420, delay: 34 },
  { text: 'Competidor más barato',x: 170, y: 780, delay: 48 },
  { text: 'Equipo renunciando',   x: 580, y: 720, delay: 60 },
];

export const OPTIMISMOCIEGO_DURATION = 278;

export const OptimismoCiego: React.FC = () => {
  const f = useCurrentFrame();

  const hookOp  = ip(f, 6, 24, 0, 1) * (1 - ip(f, 128, 148, 0, 1));
  const hitOp   = ip(f, 138, 160, 0, 1) * (1 - ip(f, 190, 210, 0, 1));
  const glowI   = ip(f, 150, 175, 0, 1);
  const pay     = ip(f, 200, 228, 0, 1);

  const hitY   = ip(f, 80, 132, -200, 960);
  const hitX   = 540 + Math.sin(f * 0.15) * 18;
  const impactScale = ip(f, 132, 148, 0, 1.1);

  return (
    <Stage
      bg="radial-gradient(130% 90% at 50% 44%, #100800 0%, #060300 80%)"
      hue={AMBER}
      seed={4}
    >
      <AbsoluteFill style={{ opacity: 1 - pay }}>

        {/* Hook line */}
        <div style={{
          position: 'absolute', top: 240, left: 90, right: 130, textAlign: 'center',
          fontFamily: fonts.display, fontWeight: 800, fontSize: 52,
          color: AMBER_L, letterSpacing: '-0.03em', opacity: hookOp,
          textShadow: `0 0 32px ${AMBER}88`,
        }}>
          "A mí no me va a pasar."
        </div>

        {/* Risk cards floating */}
        {RISKS.map((r, i) => {
          const rIn  = ip(f, r.delay, r.delay + 22, 0, 1);
          const rDy  = Math.sin(f * 0.014 + i * 1.2) * 8;
          return (
            <div key={i} style={{
              position: 'absolute', left: r.x, top: r.y,
              opacity: rIn * 0.55,
              transform: `translateY(${rDy}px)`,
            }}>
              <div style={{
                borderRadius: 18,
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(245,158,11,0.22)',
                backdropFilter: 'blur(12px)',
                padding: '16px 24px',
                fontFamily: fonts.display, fontWeight: 600, fontSize: 28,
                color: `${AMBER_L}99`,
                whiteSpace: 'nowrap',
              }}>{r.text}</div>
            </div>
          );
        })}

        {/* The one that hits — falls from top */}
        <div style={{
          position: 'absolute', left: hitX, top: hitY,
          transform: 'translateX(-50%)',
          opacity: f < 80 ? 0 : 1,
          zIndex: 50,
        }}>
          {glowI > 0.05 ? <SiriGlow frame={f} intensity={glowI * 0.8} radius={22} /> : null}
          <div style={{
            borderRadius: 22,
            background: glowI > 0.2 ? 'rgba(245,158,11,0.12)' : 'rgba(255,255,255,0.06)',
            border: `2px solid ${glowI > 0.2 ? AMBER + 'BB' : 'rgba(245,158,11,0.4)'}`,
            backdropFilter: 'blur(14px)',
            padding: '20px 32px',
            fontFamily: fonts.display, fontWeight: 700, fontSize: 34,
            color: AMBER_L,
            textShadow: glowI > 0.2 ? `0 0 22px ${AMBER}` : 'none',
            transform: `scale(${1 + impactScale * 0.12})`,
            boxShadow: glowI > 0.2 ? `0 0 44px ${AMBER}66` : 'none',
          }}>
            Clientes que se van sin avisar
          </div>
        </div>

        {/* Impact label */}
        <div style={{
          position: 'absolute', top: 1080, left: 90, right: 130, textAlign: 'center',
          fontFamily: fonts.display, fontWeight: 800, fontSize: 44,
          color: AMBER_L, letterSpacing: '-0.025em',
          opacity: hitOp,
          textShadow: `0 0 28px ${AMBER}99`,
        }}>
          Te pasó a vos también.
        </div>
      </AbsoluteFill>

      {/* Payoff */}
      <AbsoluteFill style={{
        alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', padding: '0 96px',
        opacity: pay, zIndex: 200,
      }}>
        <SiriFrame frame={f} intensity={pay} />
        <div style={{ transform: `translateY(${(1 - pay) * 28}px)` }}>
          <BigType frame={f} s={200} size={88} lines={[
            { t: 'El optimismo' },
            { t: 'no es un plan.', hl: true },
          ]} />
          <div style={{
            fontFamily: fonts.display, fontSize: 30,
            color: `${AMBER_L}77`, marginTop: 28,
            opacity: ip(f, 242, 262, 0, 1),
          }}>
            El sistema automático sí lo es.
          </div>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};
