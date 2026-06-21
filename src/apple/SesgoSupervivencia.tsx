/**
 * SesgoSupervivencia — Survivorship bias. 5 cards brillantes flotan arriba (los que
 * llegaron). La escena baja revelando docenas de cards apagadas debajo (los que
 * lo intentaron y no llegaron). El espectador VIVE el sesgo: primero solo ve los
 * éxitos, luego la realidad se expande.
 *
 * Lever: sesgo de supervivencia / base rate neglect. Paleta: dorado. Modo: glassy-oscuro.
 */
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { Stage, Glass, SiriGlow, SiriFrame, BigType, ip, fonts } from './kit';

export const SESGOSUPERVIVENCIA_DURATION = 300;

const GOLD = '#F59E0B';
const GOLD_L = '#FCD34D';

const WINNERS = ['$2M en ventas', 'Escalé 10x', 'De 0 a 200 clientes', '3 locales nuevos', 'Vendí la empresa'];
const LOSERS = [
  'Cerré a los 8 meses', 'No llegué al año', 'Perdí $40.000', 'Me quedé sin capital',
  'No pude escalar', 'El mercado no acompañó', 'Quemé mis ahorros', 'Sin clientes en 6 meses',
  'El producto no pegó', 'La sociedad se rompió', 'Falta de flujo', 'No lo supe comunicar',
  'Aposté todo y perdí', 'El timing fue mal', 'Sin equipo suficiente', 'No volví a intentarlo',
  'Cerré sin saber por qué', 'La competencia ganó', 'Quedé endeudado', 'Empezar de cero igual',
];

const CW = 340, CH = 120, GAP = 16;

export const SesgoSupervivencia: React.FC = () => {
  const f = useCurrentFrame();

  const winnerIn = ip(f, 8, 50, 0, 1);
  // La escena baja: revela el cementerio debajo
  const pan = ip(f, 70, 155, 0, 1);
  const loserReveal = ip(f, 85, 145, 0, 1);
  const loserLabel = ip(f, 120, 148, 0, 1) * (1 - ip(f, 188, 210, 0, 1));
  const pay = ip(f, 218, 250, 0, 1);

  // Desplazamiento vertical de toda la escena
  const sceneY = pan * -540;

  return (
    <Stage bg="radial-gradient(130% 92% at 50% 30%, #1A1508 0%, #080600 80%)" hue={GOLD} seed={5}>
      {/* etiqueta superior */}
      <div style={{
        position: 'absolute', top: 250, left: 0, right: 0, textAlign: 'center',
        fontFamily: fonts.mono, fontSize: 40, letterSpacing: '0.18em',
        color: 'rgba(255,255,255,0.72)', opacity: winnerIn * (1 - pan * 0.9), zIndex: 30,
      }}>
        CASOS DE ÉXITO
      </div>

      {/* CONTENEDOR que se desplaza para el parallax reveal */}
      <AbsoluteFill style={{ overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, transform: `translateY(${sceneY}px)` }}>

          {/* WINNERS — las 5 cards brillantes (los que llegaron) */}
          <div style={{
            position: 'absolute', top: 760, left: 0, right: 0,
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: GAP,
          }}>
            {WINNERS.map((txt, i) => {
              const delay = i * 7;
              const cardIn = ip(f, 12 + delay, 36 + delay, 0, 1) * winnerIn;
              return (
                <div key={i} style={{ opacity: cardIn * (1 - pay), transform: `translateX(${(1 - cardIn) * -40}px)` }}>
                  <div style={{ position: 'relative' }}>
                    <SiriGlow frame={f} intensity={0.55} radius={22} />
                    <Glass w={580} h={CH} selected pad={26}>
                      <div style={{ fontFamily: fonts.display, fontWeight: 700, fontSize: 52, color: GOLD_L, letterSpacing: '-0.02em' }}>{txt}</div>
                    </Glass>
                  </div>
                </div>
              );
            })}
          </div>

          {/* LOSERS — el cementerio debajo */}
          <div style={{
            position: 'absolute', top: 1640, left: 0, right: 0, padding: '0 90px',
          }}>
            {/* Label: "Los que lo intentaron" */}
            <div style={{
              textAlign: 'center', fontFamily: fonts.mono, fontSize: 34,
              letterSpacing: '0.16em', color: 'rgba(255,120,60,0.82)', marginBottom: 32,
              opacity: loserLabel, zIndex: 30,
            }}>
              LOS QUE TAMBIÉN LO INTENTARON
            </div>
            {/* Grid de cards oscuras */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: GAP, justifyContent: 'center' }}>
              {LOSERS.map((txt, i) => {
                const colStagger = (i % 4) * 4;
                const rowStagger = Math.floor(i / 4) * 10;
                const cardReveal = ip(f, 88 + colStagger + rowStagger, 120 + colStagger + rowStagger, 0, 1) * loserReveal;
                return (
                  <div key={i} style={{ opacity: cardReveal * (1 - pay), transform: `translateY(${(1 - cardReveal) * 18}px)` }}>
                    <Glass w={CW} h={CH - 16} selected={false} pad={20}>
                      <div style={{ fontFamily: fonts.display, fontWeight: 500, fontSize: 34, color: 'rgba(255,255,255,0.28)', letterSpacing: '-0.01em', lineHeight: 1.2 }}>{txt}</div>
                    </Glass>
                  </div>
                );
              })}
            </div>
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
          <BigType frame={f} s={218} size={92} lines={[
            { t: 'Siempre vés' },
            { t: 'a los que llegaron.' },
            { t: 'No a los que', hl: false },
            { t: 'lo intentaron.', hl: true },
          ]} />
          <div style={{
            fontFamily: fonts.display, fontWeight: 400, fontSize: 40, color: '#9A9AB5',
            marginTop: 32, opacity: ip(f, 258, 282, 0, 1),
          }}>
            El éxito es visible. El fracaso, silencioso.
          </div>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};
