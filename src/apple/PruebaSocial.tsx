/**
 * PruebaSocial — mecanismo: un RÍO de reseñas reales (5★) pasa en cover-flow 3D
 * mientras un contador sube ("1.240 ya eligieron"). El espectador siente el tirón de
 * "si todos eligen, yo también". El río frena, una reseña queda al frente con glow, y
 * se nombra el efecto.
 *
 * Lever: prueba social. Venta (cierra en "mostrá tus reseñas"). Contenido REAL del
 * negocio (reseñas), NO un experimento de laboratorio. Paleta dorada.
 */
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { Stage, Drift, SiriGlow, SiriFrame, BigType, ip, countUp, verbs, fonts } from './kit';

const GOLD = '#E8B23A';
const GOLD_L = '#FFCF6A';

const REVIEWS = [
  { name: 'Carolina M.', quote: 'Resolvieron en el día. Volvería sin dudar.', hue: '#FF8A5B' },
  { name: 'Gastón P.',   quote: 'Atención impecable, súper recomendados.',     hue: '#5B8CFF' },
  { name: 'Valeria R.',  quote: 'La mejor decisión que tomé este año.',        hue: '#34C77B' },
  { name: 'Diego F.',    quote: 'Cumplieron todo lo que prometieron.',         hue: '#A855F7' },
  { name: 'Lucía S.',    quote: 'Rápidos, claros y muy profesionales.',        hue: '#4FE0FF' },
  { name: 'Martín G.',   quote: 'No esperaba este nivel. Diez puntos.',        hue: '#FF6FD8' },
  { name: 'Sofía T.',    quote: 'Confianza total desde el primer mensaje.',    hue: '#FFCF6A' },
];
const CW = 720, CH = 360;
const CENTER = 3; // la reseña que queda al frente

export const PRUEBASOCIAL_DURATION = 320;

const Stars: React.FC = () => (
  <div style={{ display: 'flex', gap: 8 }}>
    {[0, 1, 2, 3, 4].map((i) => (
      <span key={i} style={{ fontSize: 46, color: GOLD_L, textShadow: `0 0 16px ${GOLD}aa`, lineHeight: 1 }}>★</span>
    ))}
  </div>
);

export const PruebaSocial: React.FC = () => {
  const f = useCurrentFrame();

  // scroll del río: arranca corriendo y FRENA (desacelera) hasta centrar CENTER
  const scroll = ip(f, 8, 150, 0.4, CENTER);
  const counter = countUp(f, 14, 150, 1240);
  const focus = ip(f, 150, 184, 0, 1);          // la del centro se enciende
  const reveal = ip(f, 196, 224, 0, 1);
  const pay = ip(f, 248, 280, 0, 1);

  const labelOp = ip(f, 10, 28, 0, 1) * (1 - ip(f, 198, 214, 0, 1));
  const counterOp = ip(f, 12, 30, 0, 1) * (1 - ip(f, 198, 214, 0, 1));

  return (
    <Stage bg="radial-gradient(125% 95% at 50% 42%, #1B1710 0%, #080604 78%)" hue={GOLD} seed={7}>
      {/* etiqueta + contador (zona segura) */}
      <div style={{ position: 'absolute', top: 250, left: 0, right: 0, textAlign: 'center', fontFamily: fonts.mono, fontSize: 44, letterSpacing: '0.16em', color: 'rgba(255,255,255,0.74)', opacity: labelOp, zIndex: 30 }}>
        LO QUE DICEN DE VOS
      </div>
      <div style={{ position: 'absolute', top: 322, left: 0, right: 0, textAlign: 'center', opacity: counterOp, zIndex: 30 }}>
        <span style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: 96, color: GOLD_L, letterSpacing: '-0.03em', textShadow: `0 0 40px ${GOLD}aa` }}>{counter.toLocaleString('es-UY')}</span>
        <span style={{ fontFamily: fonts.mono, fontSize: 40, color: '#B9A678', marginLeft: 18 }}>ya eligieron</span>
      </div>

      {/* RÍO de reseñas en cover-flow 3D (se funde con el payoff) */}
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', opacity: 1 - pay }}>
        <Drift amp={3}>
          <div style={{ position: 'relative', width: CW, height: CH, transformStyle: 'preserve-3d' }}>
            {REVIEWS.map((r, i) => {
              const o = i - scroll;                       // offset respecto al centro
              if (Math.abs(o) > 3.2) return null;
              const isFocus = i === CENTER;
              const lit = isFocus ? focus : 0;
              const dist = Math.abs(o);
              const op = ip(dist, 0, 3, 1, 0) * (isFocus ? 1 : 1 - focus * 0.55);
              return (
                <div key={i} style={{ position: 'absolute', top: 0, left: 0, width: CW, height: CH, transform: verbs.coverflow(o, 1, 360, 230, 34), opacity: op, zIndex: 100 - Math.round(dist * 10) }}>
                  <SiriGlow frame={f} intensity={lit} radius={34} />
                  <div style={{ position: 'absolute', inset: 0, borderRadius: 34, background: lit > 0.05 ? 'linear-gradient(165deg,#2A2110 0%,#120D05 100%)' : 'rgba(255,255,255,0.055)', border: `1px solid ${lit > 0.05 ? GOLD + 'aa' : 'rgba(255,255,255,0.12)'}`, backdropFilter: 'blur(14px)', boxShadow: '0 40px 100px -34px rgba(0,0,0,0.85)', padding: 44, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 22 }}>
                    <Stars />
                    <div style={{ fontFamily: fonts.display, fontWeight: 600, fontSize: 52, color: '#F4F0E6', letterSpacing: '-0.02em', lineHeight: 1.12 }}>“{r.quote}”</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginTop: 4 }}>
                      <div style={{ width: 66, height: 66, borderRadius: '50%', background: `linear-gradient(135deg, ${r.hue}, ${r.hue}99)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: fonts.display, fontWeight: 800, fontSize: 32, color: '#fff' }}>{r.name[0]}</div>
                      <span style={{ fontFamily: fonts.mono, fontSize: 36, color: '#B9A678' }}>{r.name}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Drift>
      </AbsoluteFill>

      {/* REALIZACIÓN */}
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'flex-start', paddingTop: 300, paddingLeft: 90, paddingRight: 130, opacity: reveal * (1 - pay), zIndex: 40 }}>
        <BigType frame={f} s={198} size={66} lines={[{ t: 'Si todos eligen,' }, { t: 'vos también querés.', hl: true }]} />
      </AbsoluteFill>

      {/* PAYOFF */}
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center', paddingLeft: 90, paddingRight: 130, opacity: pay, zIndex: 200 }}>
        <SiriFrame frame={f} intensity={pay} />
        <div style={{ transform: `translateY(${(1 - pay) * 26}px)` }}>
          <BigType frame={f} s={248} size={94} lines={[{ t: 'La prueba social' }, { t: 'vende sola.', hl: true }]} />
          <div style={{ fontFamily: fonts.display, fontWeight: 600, fontSize: 46, color: '#9A9AB5', marginTop: 36, opacity: ip(f, 278, 304, 0, 1) }}>Mostrá quién ya confía en vos.</div>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};
