/**
 * NarrativaNumeros — Story vs statistics. Panel izquierdo con datos fríos
 * (porcentajes, promedios). Panel derecho con una historia real de Juan.
 * Los datos se apagan. La historia brilla con glow y genera respuesta.
 * El espectador VIVE qué es lo que activa la acción.
 *
 * Lever: narrative transportation / story vs data effect. Paleta: dorado-ámbar. C.
 */
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { Stage, SiriGlow, SiriFrame, BigType, ip, fonts } from './kit';

export const NARRATIVANNUMEROS_DURATION = 300;

const GOLD = '#D97706';
const GOLD_L = '#FBBF24';

const STATS = [
  { num: '87%', desc: 'de las PYMEs no responden en menos de 24h' },
  { num: '3.2x', desc: 'más de conversión con seguimiento automatizado' },
  { num: '$127.000', desc: 'de ahorro promedio anual en horas manuales' },
  { num: '61%', desc: 'tasa de abandono sin follow-up inmediato' },
];

export const NarrativaNumeros: React.FC = () => {
  const f = useCurrentFrame();

  const labelOp = ip(f, 8, 28, 0, 1) * (1 - ip(f, 228, 246, 0, 1));

  // Ambos paneles entran
  const panelsIn = ip(f, 10, 52, 0, 1);

  // Los datos se apagan
  const statsDim = ip(f, 90, 128, 0, 1);

  // La historia brilla
  const storyGlow = ip(f, 100, 138, 0, 1);
  const storyText = ip(f, 88, 130, 0, 1);

  // Respuesta llega solo al panel de historia
  const responseIn = ip(f, 148, 172, 0, 1);

  const pay = ip(f, 228, 260, 0, 1);

  const PANEL_W = 430;
  const PANEL_H = 720;

  return (
    <Stage
      bg="radial-gradient(130% 92% at 50% 44%, #12090A 0%, #070406 80%)"
      hue={GOLD}
      seed={15}
    >
      {/* Label */}
      <div style={{
        position: 'absolute', top: 250, left: 0, right: 0, textAlign: 'center',
        fontFamily: fonts.mono, fontSize: 36, letterSpacing: '0.18em',
        color: 'rgba(255,255,255,0.66)', opacity: labelOp, zIndex: 30,
      }}>
        MISMA INFORMACIÓN. DISTINTO FORMATO.
      </div>

      {/* PANELES */}
      <AbsoluteFill style={{
        alignItems: 'center', justifyContent: 'center',
        flexDirection: 'row', gap: 32,
        opacity: panelsIn * (1 - pay),
      }}>
        {/* PANEL IZQUIERDO: Estadísticas */}
        <div style={{
          width: PANEL_W, height: PANEL_H, borderRadius: 32,
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.1)',
          padding: 40,
          display: 'flex', flexDirection: 'column', gap: 28,
          opacity: 1 - statsDim * 0.85,
          transform: `scale(${1 - statsDim * 0.02})`,
        }}>
          <div style={{ fontFamily: fonts.mono, fontSize: 24, color: 'rgba(255,255,255,0.38)', letterSpacing: '0.14em' }}>
            ESTADÍSTICAS
          </div>
          {STATS.map((s, i) => {
            const statIn = ip(f, 14 + i * 8, 34 + i * 8, 0, 1);
            return (
              <div key={i} style={{ opacity: statIn }}>
                <div style={{
                  fontFamily: fonts.display, fontWeight: 800, fontSize: 54,
                  color: 'rgba(255,255,255,0.45)', letterSpacing: '-0.03em',
                }}>
                  {s.num}
                </div>
                <div style={{
                  fontFamily: fonts.display, fontSize: 30, color: 'rgba(255,255,255,0.28)',
                  lineHeight: 1.35, marginTop: 4,
                }}>
                  {s.desc}
                </div>
              </div>
            );
          })}
        </div>

        {/* PANEL DERECHO: Historia */}
        <div style={{ position: 'relative' }}>
          <SiriGlow frame={f} intensity={storyGlow * 0.9} radius={30} />
          <div style={{
            width: PANEL_W, height: PANEL_H, borderRadius: 32,
            background: storyGlow > 0.3
              ? `linear-gradient(165deg, #1F1408 0%, #0A0703 100%)`
              : 'rgba(255,255,255,0.04)',
            border: `1px solid ${storyGlow > 0.3 ? GOLD + '66' : 'rgba(255,255,255,0.1)'}`,
            padding: 40,
            display: 'flex', flexDirection: 'column', justifyContent: 'center',
            boxShadow: storyGlow > 0.3 ? `0 40px 100px -30px ${GOLD}55` : 'none',
          }}>
            <div style={{ fontFamily: fonts.mono, fontSize: 24, color: `${GOLD}BB`, letterSpacing: '0.14em', marginBottom: 24 }}>
              HISTORIA REAL
            </div>
            <div style={{
              fontFamily: fonts.display, fontWeight: 700, fontSize: 50,
              color: '#F4F4FA', letterSpacing: '-0.02em', lineHeight: 1.3,
              opacity: storyText,
              transform: `translateY(${(1 - storyText) * 16}px)`,
            }}>
              Carlos tenía una ferretería. Perdía 3 clientes por semana. No sabía por qué.
            </div>
            <div style={{
              fontFamily: fonts.display, fontWeight: 600, fontSize: 46,
              color: GOLD_L, letterSpacing: '-0.02em', lineHeight: 1.3,
              marginTop: 28,
              opacity: ip(f, 118, 148, 0, 1) * storyGlow,
            }}>
              En 2 meses, su teléfono no paró.
            </div>
          </div>
        </div>
      </AbsoluteFill>

      {/* Respuesta al panel de historia */}
      <AbsoluteFill style={{
        alignItems: 'flex-end', justifyContent: 'flex-end',
        paddingRight: 132, paddingBottom: 460,
        opacity: responseIn * (1 - pay),
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 16,
          background: `${GOLD}18`, borderRadius: 50,
          border: `1px solid ${GOLD}55`,
          padding: '16px 36px',
          transform: `translateY(${(1 - responseIn) * 20}px)`,
        }}>
          <div style={{ width: 16, height: 16, borderRadius: '50%', background: GOLD_L }} />
          <div style={{ fontFamily: fonts.display, fontWeight: 600, fontSize: 34, color: GOLD_L }}>
            "Quiero saber más sobre Carlos"
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
          <BigType frame={f} s={228} size={96} lines={[
            { t: 'Los números' },
            { t: 'informan.' },
            { t: 'Las historias', hl: false },
            { t: 'venden.', hl: true },
          ]} />
        </div>
      </AbsoluteFill>
    </Stage>
  );
};
