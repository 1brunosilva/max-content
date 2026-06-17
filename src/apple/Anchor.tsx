/**
 * Anchor — mecanismo: el ANCLAJE. Aparece un precio grande ($9.900), se tacha, y el
 * precio real ($4.900) baja al frente con glow. El espectador SIENTE que es barato…
 * solo porque vio el 9.900 primero. Recién después se le nombra el efecto.
 *
 * Lever: anclaje (el primer número condiciona todo lo que viene). Contenido (enseña).
 * Demostrado con el contenido REAL del negocio (un precio), NO con un experimento de
 * laboratorio. Mismo ADN del kit. Paleta violeta.
 */
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { Stage, Drift, SiriGlow, SiriFrame, BigType, ip, countUp, fonts, VLT, VLT_L } from './kit';

export const ANCHOR_DURATION = 320;

const fmt = (n: number) => '$' + n.toLocaleString('es-UY');

export const Anchor: React.FC = () => {
  const f = useCurrentFrame();

  const cardIn = ip(f, 8, 40, 0, 1);            // entra la card del plan
  const anchorVal = countUp(f, 30, 78, 9900);   // el ancla cuenta hasta 9.900
  const strike = ip(f, 96, 124, 0, 1);          // se tacha el ancla
  const realVal = countUp(f, 110, 150, 4900);   // baja el precio real
  const realScale = 0.9 + ip(f, 110, 156, 0, 1) * 0.1;
  const real = ip(f, 110, 150, 0, 1);           // presencia del precio real (glow)
  const reveal = ip(f, 168, 196, 0, 1);         // realización
  const pay = ip(f, 224, 256, 0, 1);            // payoff (funde todo lo de atrás)

  const labelOp = ip(f, 10, 28, 0, 1) * (1 - ip(f, 170, 188, 0, 1));

  return (
    <Stage bg="radial-gradient(125% 95% at 50% 40%, #16121F 0%, #070509 76%)" hue={VLT} seed={3}>
      {/* etiqueta superior (dentro de zona segura, top>220) */}
      <div style={{ position: 'absolute', top: 250, left: 0, right: 0, textAlign: 'center', fontFamily: fonts.mono, fontSize: 44, letterSpacing: '0.16em', color: 'rgba(255,255,255,0.74)', opacity: labelOp, zIndex: 30 }}>
        PLAN PRO · MENSUAL
      </div>

      {/* escena del precio (se funde al entrar el payoff — GOTCHA) */}
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', opacity: 1 - pay }}>
        <Drift amp={4}>
          <div style={{ position: 'relative', width: 760, height: 620, transform: `scale(${0.96 + cardIn * 0.04})`, opacity: cardIn }}>
            <SiriGlow frame={f} intensity={real * 0.95} radius={40} />
            <div style={{ position: 'absolute', inset: 0, borderRadius: 40, background: real > 0.05 ? 'linear-gradient(165deg,#241B3C 0%,#0E0B18 100%)' : 'rgba(255,255,255,0.05)', border: `1px solid ${real > 0.05 ? VLT + 'aa' : 'rgba(255,255,255,0.12)'}`, backdropFilter: 'blur(14px)', boxShadow: '0 50px 130px -34px rgba(0,0,0,0.85)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, padding: 56 }}>

              {/* ANCLA: precio grande que después se tacha y se achica/sube */}
              <div style={{ position: 'relative', transform: `translateY(${-strike * 40}px) scale(${1 - strike * 0.34})`, opacity: 1 - strike * 0.45 }}>
                <span style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: 150, color: '#EDEDF6', letterSpacing: '-0.04em' }}>{fmt(anchorVal)}</span>
                {/* tachado animado */}
                <div style={{ position: 'absolute', top: '52%', left: -10, height: 8, borderRadius: 4, width: `${strike * 104}%`, background: '#FF5A6E', boxShadow: '0 0 18px #FF5A6E' }} />
              </div>

              {/* PRECIO REAL: baja al frente con glow, se siente barato */}
              <div style={{ marginTop: 4, opacity: real, transform: `translateY(${(1 - real) * 30}px) scale(${realScale})` }}>
                <span style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: 184, color: VLT_L, letterSpacing: '-0.04em', textShadow: `0 0 54px ${VLT}cc` }}>{fmt(realVal)}</span>
              </div>
              <div style={{ fontFamily: fonts.mono, fontSize: 40, color: '#9A9AB5', opacity: real, marginTop: 6 }}>por mes</div>
            </div>
          </div>
        </Drift>
      </AbsoluteFill>

      {/* REALIZACIÓN (antes del payoff) */}
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'flex-start', paddingTop: 300, paddingLeft: 90, paddingRight: 130, opacity: reveal * (1 - pay), zIndex: 40 }}>
        <BigType frame={f} s={170} size={68} lines={[{ t: '¿Barato?' }, { t: 'Solo porque viste' }, { t: '$9.900 primero.', hl: true }]} />
      </AbsoluteFill>

      {/* PAYOFF */}
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center', paddingLeft: 90, paddingRight: 130, opacity: pay, zIndex: 200 }}>
        <SiriFrame frame={f} intensity={pay} />
        <div style={{ transform: `translateY(${(1 - pay) * 26}px)` }}>
          <BigType frame={f} s={224} size={100} lines={[{ t: 'El primer número' }, { t: 'ancla todo.', hl: true }]} />
          <div style={{ fontFamily: fonts.display, fontWeight: 600, fontSize: 46, color: '#9A9AB5', marginTop: 36, opacity: ip(f, 254, 280, 0, 1) }}>Mostrá tu valor antes que tu precio.</div>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};
