/**
 * Conveyor — mecanismo NUEVO (lo que pidió Bruno): cards que van PASANDO como una
 * fila (scroll continuo cover-flow), desaceleran y FRENAN, glow Siri, payoff.
 * Distinto al abanico de StackFan. Usa el kit (verbs.coverflow + física Apple).
 *
 * Tema: atención / el scroll. El feed del cliente pasa lleno de promos iguales →
 * frena → "pasaste por 9 marcas y no te acordás de ninguna". (Psicología: sameness
 * = invisible; memoria/atención.) Nada de precio ni chatbot.
 */
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { Stage, Glass, SiriGlow, SiriFrame, BigType, ip, APPLE, verbs, fonts, VLT_L } from './kit';

// el feed: promos genéricas, todas iguales (ese es el punto)
const FEED = ['−20% OFF', 'NUEVO INGRESO', 'OFERTA', '2x1', 'LIQUIDACIÓN', 'PROMO', 'ENVÍO GRATIS', 'ÚLTIMO DÍA', 'DESCUENTO'];
const STOP = FEED.length - 1; // frena en la última
const CW = 470, CH = 300;

export const CONVEYOR_DURATION = 240;

export const Conveyor: React.FC = () => {
  const f = useCurrentFrame();

  // SCROLL continuo que desacelera y frena (la "fila que pasa")
  const c = f < 118
    ? ip(f, 0, 118, -0.6, STOP + 0.25, APPLE) // pasa rápido → frena (overshoot leve)
    : ip(f, 118, 134, STOP + 0.25, STOP);     // se asienta
  const locked = ip(f, 128, 150, 0, 1);       // 0..1 cuando ya frenó
  const glow = ip(f, 134, 158, 0, 1);
  const pay = ip(f, 158, 188, 0, 1);
  const lockedFade = ip(f, 160, 182, 1, 0);   // la card frenada se va al entrar el payoff
  const rowFade = ip(f, 156, 178, 1, 0);      // TODA la fila se va (no quedan vecinas atrás)
  const topLabel = ip(f, 6, 24, 0, 1) * (1 - ip(f, 132, 150, 0, 1));

  return (
    <Stage bg="radial-gradient(125% 95% at 50% 40%, #16131F 0%, #060509 74%)" hue={VLT_L} seed={1}>
      <div style={{ position: 'absolute', top: 130, left: 0, right: 0, textAlign: 'center', fontFamily: fonts.mono, fontSize: 24, letterSpacing: '0.18em', color: 'rgba(255,255,255,0.72)', opacity: topLabel, zIndex: 30 }}>
        EL SCROLL DE TU CLIENTE
      </div>

      {/* LA FILA QUE PASA (cover-flow horizontal continuo) */}
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'relative', transformStyle: 'preserve-3d', width: 0, height: 0 }}>
          {FEED.map((txt, i) => {
            const off = i - c;
            if (Math.abs(off) > 2.9) return null; // solo las visibles
            const isStop = i === STOP;
            // la frenada arranca su glow/payoff; el resto sigue el cover-flow
            const op = (isStop ? lockedFade : (1 - Math.min(Math.abs(off) * 0.26, 0.74)) * rowFade);
            if (op <= 0.01) return null;
            return (
              <div key={i} style={{ position: 'absolute', left: -CW / 2, top: -CH / 2, width: CW, height: CH, transform: verbs.coverflow(off, 1, 300, 260, 44), transformOrigin: 'center', opacity: op, zIndex: 50 - Math.round(Math.abs(off)) }}>
                {isStop ? <SiriGlow frame={f} intensity={glow * lockedFade} radius={34} /> : null}
                <Glass w={CW} h={CH} selected={isStop && locked > 0.05} pad={38} style={{ justifyContent: 'space-between' }}>
                  <div style={{ fontFamily: fonts.mono, fontSize: 17, letterSpacing: '0.08em', color: '#8A8AA0' }}>SPONSORED</div>
                  <div style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: 60, color: '#E6E6F0', letterSpacing: '-0.02em' }}>{txt}</div>
                  <div style={{ display: 'flex', gap: 10 }}>{[0, 1, 2].map((k) => <div key={k} style={{ height: 7, flex: 1, borderRadius: 6, background: 'rgba(255,255,255,0.1)' }} />)}</div>
                </Glass>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>

      {/* PAYOFF — sale de adentro, marco de glow */}
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 96, opacity: pay, zIndex: 200 }}>
        <SiriFrame frame={f} intensity={pay} />
        <div style={{ transform: `translateY(${(1 - pay) * 26}px)` }}>
          <BigType frame={f} s={158} size={86} lines={[{ t: 'Pasaste por 9 marcas.' }, { t: 'No te acordás', hl: false }, { t: 'de ninguna.', hl: true }]} />
          <div style={{ fontFamily: fonts.display, fontSize: 34, color: '#9A9AB5', marginTop: 32, opacity: ip(f, 188, 210, 0, 1) }}>Lo aburrido es invisible.</div>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};
