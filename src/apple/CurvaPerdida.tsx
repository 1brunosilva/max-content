/**
 * CurvaPerdida — Prospect theory / loss aversion magnitude.
 * Dos barras simétricas: ganancia +$1.000 sube moderado, pérdida -$1.000
 * baja 2.5x más. La asimetría emocional es visible y visceral.
 * Lever: prospect theory / loss aversion. Palette: verde/rojo → violeta. Mode: data/glassy-oscuro. C.
 */
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { Stage, SiriFrame, BigType, ip, fonts, VLT_L } from './kit';

const GREEN  = '#22C55E';
const RED    = '#EF4444';
const RED_L  = '#FCA5A5';

export const CURVAPERDIDA_DURATION = 270;

export const CurvaPerdida: React.FC = () => {
  const f = useCurrentFrame();

  const axisOp    = ip(f, 10, 30, 0, 1);
  const gainH     = ip(f, 22, 82, 0, 1); // 0..1 → controls height
  const lossH     = ip(f, 22, 102, 0, 1);
  const mulLabel  = ip(f, 102, 122, 0, 1) * (1 - ip(f, 178, 195, 0, 1));
  const arrowOp   = ip(f, 122, 142, 0, 1) * (1 - ip(f, 178, 195, 0, 1));
  const pay       = ip(f, 185, 212, 0, 1);

  const GAIN_MAX_PX = 200;
  const LOSS_MAX_PX = 500; // 2.5× taller

  const gainPx = gainH * GAIN_MAX_PX;
  const lossPx = lossH * LOSS_MAX_PX;

  return (
    <Stage
      bg="radial-gradient(120% 85% at 50% 40%, #08061A 0%, #030210 80%)"
      hue={VLT_L}
      seed={13}
    >
      {/* Title */}
      <div style={{
        position: 'absolute', top: 238, left: 0, right: 0, textAlign: 'center',
        fontFamily: fonts.mono, fontSize: 18, letterSpacing: '0.18em',
        color: 'rgba(168,85,247,0.65)', opacity: axisOp * (1 - pay), zIndex: 30,
      }}>
        PESO EMOCIONAL DEL DINERO
      </div>

      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', opacity: 1 - pay }}>
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          gap: 0, width: 680,
        }}>
          {/* Upper space for gain bar */}
          <div style={{ height: GAIN_MAX_PX + 30, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: 120 }}>
            {/* Gain bar going up */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
              <div style={{
                fontFamily: fonts.display, fontWeight: 800, fontSize: 36,
                color: GREEN, letterSpacing: '-0.02em',
                opacity: gainH,
              }}>+$1.000</div>
              <div style={{
                width: 120, height: gainPx, borderRadius: '10px 10px 0 0',
                background: `linear-gradient(180deg, ${GREEN} 0%, rgba(34,197,94,0.5) 100%)`,
                boxShadow: `0 0 ${20 * gainH}px ${GREEN}66`,
              }} />
            </div>

            {/* Loss bar going up (will be flipped below axis) */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
              <div style={{
                fontFamily: fonts.display, fontWeight: 800, fontSize: 36,
                color: 'transparent',
                opacity: 0,
              }}>spacer</div>
              <div style={{ width: 120, height: 2 }} />
            </div>
          </div>

          {/* Horizontal axis */}
          <div style={{
            width: '100%', height: 3, borderRadius: 2,
            background: 'rgba(255,255,255,0.22)',
            opacity: axisOp,
            position: 'relative',
          }}>
            {/* Axis label */}
            <div style={{
              position: 'absolute', left: '50%', transform: 'translateX(-50%)',
              top: -28, fontFamily: fonts.mono, fontSize: 14, letterSpacing: '0.12em',
              color: 'rgba(255,255,255,0.35)', whiteSpace: 'nowrap',
            }}>
              REFERENCIA $0
            </div>
            {/* × 2.5 label */}
            <div style={{
              position: 'absolute', right: -10, top: LOSS_MAX_PX * lossH / 2 + 10,
              fontFamily: fonts.mono, fontSize: 20, letterSpacing: '0.1em',
              color: RED, opacity: mulLabel, whiteSpace: 'nowrap',
              textShadow: `0 0 16px ${RED}88`,
            }}>
              × 2.5 MÁS INTENSO →
            </div>
          </div>

          {/* Lower space: loss bar going down */}
          <div style={{ height: LOSS_MAX_PX + 30, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', gap: 120 }}>
            {/* Empty left */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
              <div style={{ width: 120, height: 2 }} />
            </div>

            {/* Loss bar */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
              <div style={{
                width: 120, height: lossPx, borderRadius: '0 0 10px 10px',
                background: `linear-gradient(180deg, rgba(239,68,68,0.5) 0%, ${RED} 100%)`,
                boxShadow: `0 0 ${28 * lossH}px ${RED}88`,
              }} />
              <div style={{
                fontFamily: fonts.display, fontWeight: 800, fontSize: 36,
                color: RED_L, letterSpacing: '-0.02em',
                opacity: lossH,
                textShadow: `0 0 20px ${RED}aa`,
              }}>-$1.000</div>
            </div>
          </div>

          {/* Double arrow label */}
          <div style={{
            textAlign: 'center', opacity: arrowOp,
            fontFamily: fonts.mono, fontSize: 19,
            color: `rgba(168,85,247,0.7)`, letterSpacing: '0.1em',
            marginTop: 8,
          }}>
            La pérdida duele más que la ganancia equivalente
          </div>
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
          <BigType frame={f} s={185} size={88} lines={[
            { t: 'Perder $1.000' },
            { t: 'duele 2.5x' },
            { t: 'más que' },
            { t: 'ganarlos.', hl: true },
          ]} />
          <div style={{
            fontFamily: fonts.display, fontSize: 28,
            color: `rgba(168,85,247,0.6)`, marginTop: 28,
            opacity: ip(f, 228, 245, 0, 1),
          }}>
            Encuadrá tu oferta como evitar pérdida.
          </div>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};
