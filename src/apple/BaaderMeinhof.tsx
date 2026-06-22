/**
 * BaaderMeinhof — Frequency Illusion. Tu marca aparece tenue una vez en un feed
 * neutro. Luego, el cerebro "la ve en todos lados": el mismo feed ahora está lleno
 * de tu logo con glow creciente. El espectador VIVE la ilusión de frecuencia.
 * Mensaje: una vez que alguien te conoce, te encuentra solo.
 *
 * Lever: Baader-Meinhof / frequency illusion. Paleta: cyan. C.
 */
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { Stage, SiriFrame, BigType, ip, fonts } from './kit';

export const BAADERMEINHOF_DURATION = 320;

const CYAN = '#4FE0FF';
const CYAN_D = '#0EA5E9';

const FEED_ITEMS = [
  { title: 'Marketing Digital', sub: '@agencia_mx', isTarget: false },
  { title: 'Concepto Dev', sub: '@conceptodev', isTarget: true },
  { title: 'Negocios Uruguay', sub: '@negocios_uy', isTarget: false },
  { title: 'Tips de Ventas', sub: '@ventaspro', isTarget: false },
  { title: 'Concepto Dev', sub: '@conceptodev', isTarget: true },
  { title: 'Automatización', sub: '@autoflow', isTarget: false },
  { title: 'Concepto Dev', sub: '@conceptodev', isTarget: true },
  { title: 'Growth Hacking', sub: '@growth', isTarget: false },
  { title: 'Concepto Dev', sub: '@conceptodev', isTarget: true },
];

export const BaaderMeinhof: React.FC = () => {
  const f = useCurrentFrame();

  const labelOp = ip(f, 8, 28, 0, 1) * (1 - ip(f, 240, 258, 0, 1));

  // Fase 1: feed aparece tenue (logo apenas visible)
  const feedIn = ip(f, 18, 60, 0, 1);
  const phase2 = ip(f, 95, 130, 0, 1); // todos los logos se iluminan
  const glowIntensity = ip(f, 118, 168, 0, 1);
  const labelDos = ip(f, 170, 195, 0, 1) * (1 - ip(f, 240, 255, 0, 1));

  const pay = ip(f, 248, 285, 0, 1);

  return (
    <Stage
      bg="radial-gradient(130% 92% at 50% 44%, #040D14 0%, #020608 80%)"
      hue={CYAN}
      seed={3}
    >
      {/* Label fase 1 */}
      <div style={{
        position: 'absolute', top: 252, left: 0, right: 0, textAlign: 'center',
        fontFamily: fonts.mono, fontSize: 34, letterSpacing: '0.16em',
        color: 'rgba(255,255,255,0.58)', opacity: labelOp * (1 - phase2), zIndex: 30,
      }}>
        TU MARCA APARECE UNA VEZ…
      </div>

      <AbsoluteFill style={{ opacity: 1 - pay }}>
        {/* FEED DE CARDS */}
        <div style={{
          position: 'absolute', top: 330, left: 90, right: 130,
          display: 'flex', flexDirection: 'column', gap: 18,
          opacity: feedIn,
        }}>
          {FEED_ITEMS.map((item, i) => {
            const itemIn = ip(f, 22 + i * 8, 46 + i * 8, 0, 1);
            const glow = item.isTarget ? glowIntensity : 0;
            const highlight = item.isTarget ? phase2 : 0;

            return (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 22,
                background: highlight > 0.3
                  ? `linear-gradient(90deg, rgba(79,224,255,0.10) 0%, rgba(14,165,233,0.06) 100%)`
                  : 'rgba(255,255,255,0.04)',
                border: `1px solid ${highlight > 0.3 ? CYAN + '55' : 'rgba(255,255,255,0.08)'}`,
                borderRadius: 22,
                padding: '20px 28px',
                opacity: itemIn,
                transform: `translateX(${(1 - itemIn) * -20}px)`,
                transition: 'background 0.3s, border-color 0.3s',
                boxShadow: glow > 0.4 ? `0 0 30px ${CYAN}22` : 'none',
              }}>
                {/* Avatar */}
                <div style={{
                  width: 54, height: 54, borderRadius: '50%', flexShrink: 0,
                  background: item.isTarget
                    ? `radial-gradient(circle, ${CYAN}33 0%, ${CYAN_D}22 100%)`
                    : 'rgba(255,255,255,0.10)',
                  border: `2px solid ${item.isTarget ? CYAN + (glow > 0.4 ? 'CC' : '44') : 'rgba(255,255,255,0.15)'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 24,
                  boxShadow: glow > 0.4 ? `0 0 20px ${CYAN}55` : 'none',
                }}>
                  {item.isTarget ? '◆' : '○'}
                </div>
                <div>
                  <div style={{
                    fontFamily: fonts.display, fontWeight: 700, fontSize: 34,
                    color: item.isTarget && highlight > 0.3 ? CYAN : 'rgba(255,255,255,0.72)',
                    textShadow: glow > 0.5 ? `0 0 20px ${CYAN}88` : 'none',
                  }}>
                    {item.title}
                  </div>
                  <div style={{ fontFamily: fonts.mono, fontSize: 24, color: 'rgba(255,255,255,0.38)' }}>
                    {item.sub}
                  </div>
                </div>
                {item.isTarget && glow > 0.5 && (
                  <div style={{
                    marginLeft: 'auto',
                    fontFamily: fonts.mono, fontSize: 22,
                    color: CYAN, opacity: glow,
                    background: `${CYAN}1A`, borderRadius: 30, padding: '6px 18px',
                    border: `1px solid ${CYAN}44`,
                  }}>
                    de nuevo
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Label fase 2 */}
        <div style={{
          position: 'absolute', bottom: 434, left: 0, right: 0, textAlign: 'center',
          fontFamily: fonts.mono, fontSize: 34, letterSpacing: '0.14em',
          color: CYAN, opacity: labelDos * phase2,
          textShadow: `0 0 24px ${CYAN}88`,
        }}>
          …Y DE REPENTE ESTÁ EN TODOS LADOS
        </div>
      </AbsoluteFill>

      {/* PAYOFF */}
      <AbsoluteFill style={{
        alignItems: 'center', justifyContent: 'center', textAlign: 'center',
        paddingLeft: 90, paddingRight: 130, opacity: pay, zIndex: 200,
      }}>
        <SiriFrame frame={f} intensity={pay} />
        <div style={{ transform: `translateY(${(1 - pay) * 26}px)` }}>
          <BigType frame={f} s={248} size={94} lines={[
            { t: 'Una vez que te conocen,' },
            { t: 'te encuentran', hl: false },
            { t: 'en todos lados.', hl: true },
          ]} />
          <div style={{
            fontFamily: fonts.display, fontWeight: 400, fontSize: 40, color: '#9A9AB5',
            marginTop: 32, opacity: ip(f, 292, 312, 0, 1),
          }}>
            No es magia. Es el cerebro buscando lo que ya conoce.
          </div>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};
