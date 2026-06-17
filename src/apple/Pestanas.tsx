/**
 * Pestanas — mecanismo NUEVO. Tema: carga mental / efecto Zeigarnik. Una tarea sin
 * cerrar te ocupa la cabeza aunque no la estés haciendo. El espectador VIVE el ruido:
 * 6 tarjetas a medio cerrar laten y se mueven inquietas (imposibles de ignorar) →
 * se cierran solas una por una con un destello Siri → silencio, aire. Vende:
 * automatización como liberación mental. Paleta: midnight + glow Siri PROMINENTE.
 */
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { Stage, SiriGlow, SiriFrame, BigType, ip, APPLE, fonts } from './kit';

const OPEN = [
  { t: 'Falta confirmar el pago', x: -300, y: -350, r: -7 },
  { t: 'Responder a Marta', x: 300, y: -290, r: 6 },
  { t: 'Mandar el presupuesto', x: -330, y: 30, r: 5 },
  { t: 'Avisar que llegó el pedido', x: 320, y: 100, r: -5 },
  { t: 'Pasar la factura', x: -250, y: 410, r: 4 },
  { t: 'Seguir al cliente de ayer', x: 270, y: 460, r: -6 },
];

export const PESTANAS_DURATION = 330;

export const Pestanas: React.FC = () => {
  const f = useCurrentFrame();
  const intro = (i: number) => ip(f, 10 + i * 8, 10 + i * 8 + 24, 0, 1, APPLE);

  const CLOSE0 = 116, CGAP = 13, CLEN = 20;
  const closeP = (i: number) => ip(f, CLOSE0 + i * CGAP, CLOSE0 + i * CGAP + CLEN, 0, 1, APPLE);
  const allClosed = CLOSE0 + OPEN.length * CGAP + CLEN; // ~214
  const calm = ip(f, allClosed, allClosed + 26, 0, 1);
  const pay = ip(f, allClosed + 32, allClosed + 64, 0, 1);
  const back = 1 - pay;
  const topLabel = ip(f, 6, 24, 0, 1) * (1 - ip(f, CLOSE0 - 12, CLOSE0 + 8, 0, 1));

  return (
    <Stage bg="radial-gradient(125% 100% at 50% 42%, #0E1320 0%, #050507 76%)" hue="#4FE0FF" seed={3}>
      <div style={{ position: 'absolute', top: 122, left: 0, right: 0, textAlign: 'center', fontFamily: fonts.mono, fontSize: 27, letterSpacing: '0.16em', color: 'rgba(255,255,255,0.72)', opacity: topLabel, zIndex: 60 }}>
        TU CABEZA A LAS 11 DE LA NOCHE
      </div>

      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', opacity: back }}>
        <div style={{ position: 'relative', transformStyle: 'preserve-3d' }}>
          {OPEN.map((o, i) => {
            const inP = intro(i);
            const cP = closeP(i);
            if (inP <= 0.001) return null;
            const lid = 1 - cP;                 // 1 abierta → 0 cerrada
            const op = inP * lid;
            if (op <= 0.01) return null;
            // zumbido mientras está abierta: respiración + jitter sutil
            const breathe = lid > 0.05 ? 0.5 + 0.5 * Math.sin(f * 0.16 + i * 1.3) : 0;
            const jx = lid * Math.sin(f * 0.09 + i) * 5;
            const jy = lid * Math.cos(f * 0.08 + i * 1.7) * 5;
            const w = 440, hgt = 152;
            return (
              <div key={i} style={{ position: 'absolute', left: -w / 2 + o.x, top: -hgt / 2 + o.y, width: w, transform: `translate(${jx}px, ${(1 - inP) * 30 + jy}px) rotate(${o.r}deg)`, opacity: op }}>
                <SiriGlow frame={f} intensity={cP > 0.02 && cP < 0.98 ? 1 : 0} radius={26} />
                <div style={{ position: 'relative', transformOrigin: 'top', transform: `scaleY(${lid})`, borderRadius: 24, background: 'rgba(255,255,255,0.06)', border: `1px solid rgba(127,227,255,${0.16 + breathe * 0.24})`, backdropFilter: 'blur(12px)', boxShadow: `0 30px 70px -36px rgba(0,0,0,0.8), 0 0 ${22 + breathe * 34}px -4px rgba(79,224,255,${breathe * 0.55})`, padding: '0 32px', height: hgt, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div style={{ fontFamily: fonts.mono, fontSize: 19, letterSpacing: '0.1em', color: '#7FE3FF', opacity: (0.4 + breathe * 0.5) }}>SIN CERRAR</div>
                  <div style={{ fontFamily: fonts.display, fontWeight: 700, fontSize: 37, color: '#EDEDF4', letterSpacing: '-0.02em', marginTop: 8, opacity: lid }}>{o.t}</div>
                </div>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>

      {/* respiración del marco al quedar todo en silencio */}
      <SiriFrame frame={f} intensity={calm * 0.5 * back} />

      {/* PAYOFF */}
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 92, opacity: pay, zIndex: 200 }}>
        <SiriFrame frame={f} intensity={pay} />
        <div style={{ transform: `translateY(${(1 - pay) * 26}px)` }}>
          <BigType frame={f} s={allClosed + 32} size={84} lines={[{ t: 'Automatizar no es' }, { t: 'ir más rápido.' }, { t: 'Es sacarte el ruido' }, { t: 'de la cabeza.', hl: true }]} />
        </div>
      </AbsoluteFill>
    </Stage>
  );
};
