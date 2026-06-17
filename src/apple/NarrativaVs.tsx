/**
 * NarrativaVs — Narrativa vs Argumento (Narrative Transportation Theory).
 * Dos cards compiten: una lista de "5 razones lógicas" vs. una historia corta.
 * La historia late y crece; la lista se apaga. El espectador elige.
 * Lever: narrative transportation / storytelling. Palette: dorado. Mode: midnight. C.
 */
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { Stage, Glass, SiriGlow, SiriFrame, BigType, ip, fonts } from './kit';

const GOLD = '#F59E0B';
const GOLD_L = '#FCD34D';

export const NARRATIVAVS_DURATION = 270;

export const NarrativaVs: React.FC = () => {
  const f = useCurrentFrame();

  // Fase 1: ambas cards aparecen (0-50)
  // Fase 2: la historia gana, la lista se apaga (75-140)
  // Fase 3: payoff (155-270)

  const cardsIn = ip(f, 8, 44, 0, 1);
  const storyWins = ip(f, 75, 130, 0, 1);
  const pay = ip(f, 155, 182, 0, 1);
  const labelOp = ip(f, 4, 20, 0, 1) * (1 - ip(f, 72, 88, 0, 1));

  const logicOp = cardsIn * (1 - storyWins * 0.85);
  const storyScale = 1 + storyWins * 0.08;
  const storyZ = storyWins * 80;

  return (
    <Stage bg="radial-gradient(125% 90% at 48% 35%, #1A1208 0%, #060401 80%)" hue={GOLD} seed={11}>
      <div style={{
        position: 'absolute', top: 130, left: 0, right: 0, textAlign: 'center',
        fontFamily: fonts.mono, fontSize: 22, letterSpacing: '0.18em',
        color: 'rgba(255,255,255,0.65)', opacity: labelOp, zIndex: 30,
      }}>
        ¿QUÉ VENDE MÁS?
      </div>

      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', opacity: 1 - pay }}>
        <div style={{ display: 'flex', gap: 28, alignItems: 'stretch' }}>

          {/* Card lógica — se apaga */}
          <div style={{ opacity: logicOp, transform: `translateZ(0px) scale(${1 - storyWins * 0.04})` }}>
            <Glass w={440} h={660} pad={44} style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}>
              <div style={{ fontFamily: fonts.mono, fontSize: 16, letterSpacing: '0.12em', color: '#4A4A62', marginBottom: 28 }}>EL ARGUMENTO</div>
              <div style={{ fontFamily: fonts.display, fontWeight: 700, fontSize: 34, color: '#5A5A78', letterSpacing: '-0.02em', marginBottom: 32 }}>
                5 Razones para elegirnos:
              </div>
              {['Más de 10 años de experiencia', 'Equipo certificado', 'Soporte 24/7', 'Precios competitivos', 'Metodología probada'].map((r, i) => (
                <div key={i} style={{ fontFamily: fonts.display, fontSize: 28, color: '#3A3A52', lineHeight: 1.4, marginBottom: 16, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <span style={{ color: '#2A2A42', fontWeight: 800 }}>{i + 1}.</span>
                  <span>{r}</span>
                </div>
              ))}
            </Glass>
          </div>

          {/* Card historia — gana */}
          <div style={{
            opacity: cardsIn,
            transform: `translateZ(${storyZ}px) scale(${storyScale})`,
            position: 'relative',
          }}>
            {storyWins > 0.1 ? <SiriGlow frame={f} intensity={storyWins * 0.95} radius={34} /> : null}
            <Glass w={440} h={660} selected={storyWins > 0.15} pad={44}>
              <div style={{ fontFamily: fonts.mono, fontSize: 16, letterSpacing: '0.12em', color: `rgba(245,158,11,${0.5 + storyWins * 0.5})`, marginBottom: 28 }}>LA HISTORIA</div>
              <div style={{ fontFamily: fonts.display, fontWeight: 700, fontSize: 34, color: storyWins > 0.3 ? GOLD_L : '#8A8AAA', letterSpacing: '-0.02em', marginBottom: 32, lineHeight: 1.3 }}>
                "Sofía perdió un cliente<br />un martes a las 2am."
              </div>
              <div style={{ fontFamily: fonts.display, fontSize: 26, color: storyWins > 0.3 ? '#C4C4E0' : '#4A4A62', lineHeight: 1.55, marginBottom: 20 }}>
                Llegó un mensaje. Nadie respondió.
                El cliente eligió a la competencia.
              </div>
              <div style={{ fontFamily: fonts.display, fontSize: 26, color: storyWins > 0.5 ? GOLD : '#4A4A62', lineHeight: 1.55 }}>
                Esa semana, Sofía automatizó sus respuestas.
              </div>
              <div style={{ marginTop: 32, fontFamily: fonts.mono, fontSize: 20, color: `rgba(245,158,11,${storyWins})`, letterSpacing: '0.08em' }}>
                Nunca más perdió uno.
              </div>
            </Glass>
          </div>

        </div>
      </AbsoluteFill>

      {/* Payoff */}
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 96, opacity: pay, zIndex: 200 }}>
        <SiriFrame frame={f} intensity={pay} />
        <div style={{ transform: `translateY(${(1 - pay) * 28}px)` }}>
          <BigType frame={f} s={155} size={88} lines={[
            { t: 'Los datos informan.' },
            { t: 'Las historias', hl: false },
            { t: 'venden.', hl: true },
          ]} />
          <div style={{ fontFamily: fonts.display, fontSize: 32, color: '#8A8AAA', marginTop: 28, opacity: ip(f, 192, 214, 0, 1) }}>
            Tu cliente no compra lógica. Compra cómo se siente.
          </div>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};
