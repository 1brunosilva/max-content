/**
 * VentanaTiempo — Ventana de oportunidad que se cierra lentamente.
 * Un marco 3D iluminado se estrecha frame a frame. La oportunidad que había
 * adentro se oscurece mientras la ventana se cierra. El espectador siente
 * la urgencia sin que nadie use la palabra "urgente".
 * Lever: loss aversion + temporal urgency. Palette: ámbar-dorado. Mode: glassy. V.
 */
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { Stage, SiriFrame, BigType, ip, fonts } from './kit';

const AMBER = '#F59E0B';
const GOLD  = '#FCD34D';

const FRAME_W = 620;
const FRAME_H = 700;

export const VENTANATIEMPO_DURATION = 268;

export const VentanaTiempo: React.FC = () => {
  const f = useCurrentFrame();

  const openRatio = ip(f, 0, 132, 1, 0.04);
  const urgencyOp = ip(f, 58, 80, 0, 1) * ip(f, 126, 142, 1, 0);
  const closedOp  = ip(f, 148, 168, 0, 1) * ip(f, 170, 184, 1, 0);
  const pay = ip(f, 182, 212, 0, 1);
  const labelOp = ip(f, 4, 22, 0, 1) * ip(f, 100, 122, 1, 0);

  const currentW = Math.max(4, FRAME_W * openRatio);
  const frameLeft = (1080 - currentW) / 2;
  const frameTop  = (1920 - FRAME_H) / 2 - 60;

  const borderAlpha = Math.round(openRatio * 200)
    .toString(16).padStart(2, '0');
  const glowAlpha = Math.round(openRatio * 110)
    .toString(16).padStart(2, '0');

  return (
    <Stage bg="radial-gradient(120% 90% at 50% 42%, #1A1004 0%, #080602 80%)" hue={AMBER} seed={15}>
      <div style={{
        position: 'absolute', top: 130, left: 0, right: 0, textAlign: 'center',
        fontFamily: fonts.mono, fontSize: 22, letterSpacing: '0.18em',
        color: 'rgba(255,255,255,0.65)', opacity: labelOp, zIndex: 30,
      }}>
        VENTANA DE OPORTUNIDAD
      </div>

      <AbsoluteFill style={{ opacity: 1 - pay }}>
        {/* Window frame */}
        <div style={{
          position: 'absolute',
          left: frameLeft,
          top: frameTop,
          width: currentW,
          height: FRAME_H,
          border: `3px solid ${AMBER}${borderAlpha}`,
          borderRadius: Math.min(28, currentW * 0.06),
          boxShadow: `0 0 ${60 * openRatio}px ${AMBER}${glowAlpha}`,
          overflow: 'hidden',
        }}>
          {/* Inner warm light */}
          <div style={{
            position: 'absolute', inset: 0,
            background: `radial-gradient(ellipse at center, ${GOLD}38 0%, ${AMBER}18 40%, transparent 80%)`,
            opacity: openRatio,
          }} />

          {/* Text inside window */}
          {openRatio > 0.22 ? (
            <div style={{
              position: 'absolute', inset: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexDirection: 'column', gap: 14,
              opacity: Math.max(0, (openRatio - 0.22) / 0.78),
            }}>
              <div style={{ fontFamily: fonts.mono, fontSize: Math.round(16 * openRatio + 4), color: GOLD, letterSpacing: '0.14em' }}>
                OPORTUNIDAD
              </div>
              <div style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: Math.round(36 * openRatio + 8), color: '#FFF8E8', letterSpacing: '-0.03em', textAlign: 'center', lineHeight: 1.1 }}>
                Automatizá{'\n'}ahora
              </div>
            </div>
          ) : null}
        </div>

        {/* Urgency percentage */}
        <div style={{
          position: 'absolute',
          top: frameTop + FRAME_H + 36,
          left: 0, right: 0, textAlign: 'center',
          opacity: urgencyOp,
        }}>
          <div style={{ fontFamily: fonts.mono, fontSize: 20, color: AMBER, letterSpacing: '0.14em' }}>
            {`${Math.round(openRatio * 100)}% ABIERTA`}
          </div>
        </div>

        {/* Closed label */}
        <div style={{
          position: 'absolute',
          top: frameTop + FRAME_H / 2 - 24,
          left: 0, right: 0, textAlign: 'center',
          opacity: closedOp,
        }}>
          <div style={{ fontFamily: fonts.display, fontWeight: 700, fontSize: 36, color: '#6A6A82', letterSpacing: '-0.02em' }}>
            La oportunidad no avisó.
          </div>
        </div>
      </AbsoluteFill>

      {/* Payoff */}
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 96, opacity: pay, zIndex: 200 }}>
        <SiriFrame frame={f} intensity={pay} />
        <div style={{ transform: `translateY(${(1 - pay) * 28}px)` }}>
          <BigType frame={f} s={182} size={88} lines={[
            { t: 'No la pierdas' },
            { t: 'esperando' },
            { t: 'el momento', hl: false },
            { t: 'perfecto.', hl: true },
          ]} />
          <div style={{ fontFamily: fonts.display, fontSize: 32, color: '#8A8AAA', marginTop: 28, opacity: ip(f, 222, 244, 0, 1) }}>
            Las ventanas se cierran. Actuá antes.
          </div>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};
