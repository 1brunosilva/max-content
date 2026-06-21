/**
 * CertezaPremium — Certainty effect / risk aversion. Dos opciones al mismo precio:
 * "Probablemente 4-6 leads" (valor esperado mayor) vs "1 cliente garantizado"
 * (valor esperado menor pero cierto). La certeza gana. 73% elige lo seguro.
 * El espectador VIVE la atracción irresistible de la garantía.
 *
 * Lever: certainty effect / Allais paradox / risk aversion. Paleta: violeta-azul. C.
 */
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { Stage, Glass, SiriGlow, SiriFrame, BigType, ip, fonts, VLT, VLT_L, countUp } from './kit';

export const CERTEZAPREMIUM_DURATION = 310;

const BLUE = '#3B82F6';

export const CertezaPremium: React.FC = () => {
  const f = useCurrentFrame();

  const labelOp = ip(f, 8, 28, 0, 1) * (1 - ip(f, 228, 246, 0, 1));

  const cardsIn = ip(f, 10, 52, 0, 1);

  // La opción cierta sube con glow
  const certainRise = ip(f, 80, 125, 0, 1);
  const certainGlow = ip(f, 110, 148, 0, 1);
  const probDim = ip(f, 88, 128, 0, 1);

  // Contador del 73%
  const pctReveal = ip(f, 148, 188, 0, 1);
  const pctCount = countUp(f, 148, 185, 73);

  const pay = ip(f, 228, 260, 0, 1);

  const PANEL_W = 430;
  const PANEL_H = 600;

  return (
    <Stage
      bg="radial-gradient(130% 92% at 50% 44%, #0E0A1F 0%, #050308 80%)"
      hue={VLT}
      seed={16}
    >
      {/* Label */}
      <div style={{
        position: 'absolute', top: 250, left: 0, right: 0, textAlign: 'center',
        fontFamily: fonts.mono, fontSize: 36, letterSpacing: '0.18em',
        color: 'rgba(255,255,255,0.66)', opacity: labelOp, zIndex: 30,
      }}>
        MISMO PRECIO · DOS OPCIONES
      </div>

      {/* DOS PANELES */}
      <AbsoluteFill style={{
        alignItems: 'center', justifyContent: 'center',
        flexDirection: 'row', gap: 36,
        opacity: cardsIn * (1 - pay),
      }}>
        {/* PANEL IZQUIERDO: Probabilidad */}
        <Glass
          w={PANEL_W} h={PANEL_H}
          selected={false} pad={44}
          style={{
            opacity: 1 - probDim * 0.78,
            transform: `scale(${1 - probDim * 0.04}) translateY(${probDim * 20}px)`,
          }}
        >
          <div style={{ fontFamily: fonts.mono, fontSize: 22, color: BLUE + '88', letterSpacing: '0.12em', marginBottom: 24 }}>
            OPCIÓN A
          </div>
          <div style={{
            fontFamily: fonts.display, fontWeight: 800, fontSize: 58,
            color: 'rgba(255,255,255,0.55)', letterSpacing: '-0.02em', lineHeight: 1.18, marginBottom: 20,
          }}>
            Probablemente<br />4–6 leads<br />esta semana
          </div>
          <div style={{ height: 1, background: 'rgba(255,255,255,0.1)', marginBottom: 20 }} />
          <div style={{ fontFamily: fonts.mono, fontSize: 26, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.08em', marginBottom: 8 }}>
            PROBABILIDAD
          </div>
          <div style={{
            fontFamily: fonts.display, fontWeight: 700, fontSize: 54, color: BLUE + '88',
          }}>
            ~60%
          </div>
          <div style={{ fontFamily: fonts.mono, fontSize: 24, color: 'rgba(255,255,255,0.28)', marginTop: 12 }}>
            valor esperado: 3.2 leads
          </div>
        </Glass>

        {/* PANEL DERECHO: Garantía */}
        <div style={{ position: 'relative' }}>
          <SiriGlow frame={f} intensity={certainGlow * 0.9} radius={30} />
          <Glass
            w={PANEL_W} h={PANEL_H}
            selected={certainGlow > 0.3} pad={44}
            style={{
              transform: `scale(${1 + certainRise * 0.06}) translateY(${-certainRise * 16}px)`,
            }}
          >
            <div style={{ fontFamily: fonts.mono, fontSize: 22, color: VLT_L + 'BB', letterSpacing: '0.12em', marginBottom: 24 }}>
              OPCIÓN B
            </div>
            <div style={{
              fontFamily: fonts.display, fontWeight: 800, fontSize: 58,
              color: '#F4F4FA', letterSpacing: '-0.02em', lineHeight: 1.18, marginBottom: 20,
            }}>
              1 cliente<br />garantizado<br />esta semana
            </div>
            <div style={{ height: 1, background: `${VLT}66`, marginBottom: 20 }} />
            <div style={{ fontFamily: fonts.mono, fontSize: 26, color: VLT_L + 'AA', letterSpacing: '0.08em', marginBottom: 8 }}>
              PROBABILIDAD
            </div>
            <div style={{
              fontFamily: fonts.display, fontWeight: 800, fontSize: 54, color: VLT_L,
              textShadow: `0 0 30px ${VLT}AA`,
            }}>
              100%
            </div>
            <div style={{ fontFamily: fonts.mono, fontSize: 24, color: `${VLT_L}88`, marginTop: 12 }}>
              valor esperado: 1 cliente
            </div>
          </Glass>
        </div>
      </AbsoluteFill>

      {/* CONTADOR 73% elige la certeza */}
      <AbsoluteFill style={{
        alignItems: 'flex-end', justifyContent: 'center',
        paddingBottom: 450,
        opacity: pctReveal * (1 - pay),
        flexDirection: 'column', paddingRight: 132,
      }}>
        <div style={{
          textAlign: 'center',
          transform: `translateY(${(1 - pctReveal) * 20}px)`,
        }}>
          <div style={{
            fontFamily: fonts.display, fontWeight: 900, fontSize: 120,
            color: VLT_L, letterSpacing: '-0.04em',
            textShadow: `0 0 60px ${VLT}88`,
          }}>
            {pctCount}%
          </div>
          <div style={{ fontFamily: fonts.mono, fontSize: 28, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.08em' }}>
            ELIGIÓ LA OPCIÓN B
          </div>
          <div style={{ fontFamily: fonts.display, fontSize: 34, color: 'rgba(255,255,255,0.36)', marginTop: 8 }}>
            aunque el valor esperado era menor
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
          <BigType frame={f} s={228} size={84} lines={[
            { t: 'Tu cliente no compra' },
            { t: 'el mejor resultado esperado.' },
            { t: 'Compra la menor', hl: false },
            { t: 'incertidumbre.', hl: true },
          ]} />
          <div style={{
            fontFamily: fonts.display, fontWeight: 400, fontSize: 40, color: '#9A9AB5',
            marginTop: 32, opacity: ip(f, 268, 290, 0, 1),
          }}>
            Una garantía vale más que una probabilidad.
          </div>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};
