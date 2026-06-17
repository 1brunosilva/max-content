/**
 * PreguntaAbierta — mecanismo: un BUCLE ABIERTO. Una pregunta aparece dentro de un
 * anillo de luz que se dibuja pero NO se cierra: queda un hueco que pulsa. Eso es la
 * pregunta sin responder latiendo en la cabeza del espectador. En el payoff el anillo
 * se cierra (la respuesta cierra el bucle).
 *
 * Lever: curiosity gap / open loop. Contenido (enseña). Mecanismo = el anillo abierto
 * (la animación ES el mensaje), NO un experimento de laboratorio. Paleta cyan.
 */
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { Stage, Drift, SiriFrame, BigType, ip, fonts, VLT_L } from './kit';

const CY = '#4FE0FF';
const R = 372, CXY = 440, SW = 7;
const C = 2 * Math.PI * R;

export const PREGUNTAABIERTA_DURATION = 320;

export const PreguntaAbierta: React.FC = () => {
  const f = useCurrentFrame();

  const draw = ip(f, 18, 96, 0, 1);             // el anillo se dibuja
  const pulse = 0.6 + 0.4 * Math.sin(f * 0.13); // el hueco late (bucle abierto vivo)
  const qIn = ip(f, 40, 80, 0, 1);              // entra la pregunta
  const reveal = ip(f, 168, 196, 0, 1);
  const pay = ip(f, 224, 256, 0, 1);
  const close = ip(f, 190, 222, 0, 1);          // el anillo se cierra ANTES del payoff (la respuesta cierra el bucle)

  const gapFrac = 0.17 * (1 - close);           // hueco abierto → 0 al cerrar
  const arc = C * (1 - gapFrac) * draw;
  const labelOp = ip(f, 10, 28, 0, 1) * (1 - ip(f, 170, 188, 0, 1));

  return (
    <Stage bg="radial-gradient(125% 95% at 50% 40%, #0C1620 0%, #050709 78%)" hue={CY} seed={11}>
      <div style={{ position: 'absolute', top: 250, left: 0, right: 0, textAlign: 'center', fontFamily: fonts.mono, fontSize: 44, letterSpacing: '0.16em', color: 'rgba(255,255,255,0.74)', opacity: labelOp, zIndex: 30 }}>
        PROBÁ ESTO
      </div>

      {/* ANILLO ABIERTO + pregunta (se funde con el payoff) */}
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', opacity: 1 - pay }}>
        <Drift amp={4}>
          <div style={{ position: 'relative', width: CXY * 2, height: CXY * 2 }}>
            <svg width={CXY * 2} height={CXY * 2} style={{ position: 'absolute', inset: 0, transform: 'rotate(-90deg)' }}>
              <defs>
                <linearGradient id="qa-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={CY} />
                  <stop offset="55%" stopColor="#5B8CFF" />
                  <stop offset="100%" stopColor={VLT_L} />
                </linearGradient>
                <filter id="qa-glow"><feGaussianBlur stdDeviation="14" /></filter>
              </defs>
              {/* bloom */}
              <circle cx={CXY} cy={CXY} r={R} fill="none" stroke="url(#qa-grad)" strokeWidth={SW + 8} strokeLinecap="round" strokeDasharray={`${arc} ${C}`} filter="url(#qa-glow)" opacity={0.55 * (0.7 + 0.3 * pulse)} />
              {/* anillo nítido */}
              <circle cx={CXY} cy={CXY} r={R} fill="none" stroke="url(#qa-grad)" strokeWidth={SW} strokeLinecap="round" strokeDasharray={`${arc} ${C}`} opacity={0.95} />
            </svg>

            {/* pregunta centrada dentro del anillo */}
            <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', padding: 150, opacity: qIn, transform: `scale(${0.97 + qIn * 0.03})` }}>
              <div style={{ textAlign: 'center', fontFamily: fonts.display, fontWeight: 800, fontSize: 78, lineHeight: 1.08, letterSpacing: '-0.03em', color: '#F2F7FA' }}>
                ¿Por qué te eligen<br />a vos y no al<br />de al lado?
              </div>
            </AbsoluteFill>
          </div>
        </Drift>
      </AbsoluteFill>

      {/* REALIZACIÓN */}
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'flex-start', paddingTop: 290, paddingLeft: 90, paddingRight: 130, opacity: reveal * (1 - pay), zIndex: 40 }}>
        <BigType frame={f} s={170} size={66} lines={[{ t: 'Tu cabeza ya está' }, { t: 'buscando la respuesta.', hl: true }]} />
      </AbsoluteFill>

      {/* PAYOFF */}
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center', paddingLeft: 90, paddingRight: 130, opacity: pay, zIndex: 200 }}>
        <SiriFrame frame={f} intensity={pay} />
        <div style={{ transform: `translateY(${(1 - pay) * 26}px)` }}>
          <BigType frame={f} s={224} size={92} lines={[{ t: 'Una pregunta' }, { t: 'abre la cabeza.', hl: true }]} />
          <div style={{ fontFamily: fonts.display, fontWeight: 600, fontSize: 46, color: '#9A9AB5', marginTop: 36, opacity: ip(f, 254, 280, 0, 1) }}>Abrí siempre con una pregunta, no con la respuesta.</div>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};
