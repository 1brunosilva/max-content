/**
 * AnclajeVerbal — Semantic/verbal anchoring. La misma oferta encuadrada con dos
 * palabras iniciales distintas: "COSTO" vs "INVERSIÓN". El espectador ve cómo
 * una sola palabra tiñe la percepción de todo lo que sigue. No cambia el precio.
 * Cambia el significado.
 *
 * Lever: verbal anchoring / semantic priming / framing. Paleta: violeta. Modo: glassy-oscuro. C.
 */
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { Stage, Glass, SiriGlow, SiriFrame, BigType, ip, fonts, VLT, VLT_L } from './kit';

export const ANCLAJEEVERBAL_DURATION = 310;

// Same content, different first word
const PRICE = '$4.900/mes';
const CONTENT = ['Respuestas automáticas', 'Seguimiento de clientes', 'Reportes en tiempo real'];

export const AnclajeVerbal: React.FC = () => {
  const f = useCurrentFrame();

  const labelOp = ip(f, 8, 28, 0, 1) * (1 - ip(f, 230, 248, 0, 1));

  // FASE 1: card COSTO (fría)
  const costoIn = ip(f, 10, 46, 0, 1);

  // Métrica de "consultas" baja
  const consultasLow = ip(f, 68, 96, 0, 1);

  // FASE 2: la palabra cambia (el resto se mantiene igual)
  const wordSwap = ip(f, 128, 155, 0, 1);
  const glowI = ip(f, 148, 180, 0, 1);

  // Métrica de "consultas" sube
  const consultasHigh = ip(f, 162, 192, 0, 1);

  // FASE 3: highlight de ambas palabras para comparar
  const compareIn = ip(f, 196, 218, 0, 1) * (1 - ip(f, 228, 248, 0, 1));

  const pay = ip(f, 248, 280, 0, 1);

  const cardWord = wordSwap > 0.5 ? 'INVERSIÓN' : 'COSTO';
  const cardWordColor = wordSwap > 0.5 ? VLT_L : '#9CA3AF';

  return (
    <Stage
      bg="radial-gradient(130% 92% at 50% 44%, #13101E 0%, #060508 80%)"
      hue={VLT}
      seed={7}
    >
      {/* Label */}
      <div style={{
        position: 'absolute', top: 250, left: 0, right: 0, textAlign: 'center',
        fontFamily: fonts.mono, fontSize: 38, letterSpacing: '0.18em',
        color: 'rgba(255,255,255,0.68)', opacity: labelOp, zIndex: 30,
      }}>
        LA MISMA OFERTA. UNA SOLA PALABRA DISTINTA.
      </div>

      {/* CARD CENTRAL — se mantiene, solo cambia la primera palabra */}
      <AbsoluteFill style={{
        alignItems: 'center', justifyContent: 'center',
        opacity: costoIn * (1 - pay),
      }}>
        <div style={{ position: 'relative' }}>
          {wordSwap > 0.2 && <SiriGlow frame={f} intensity={glowI * 0.85} radius={34} />}
          <Glass w={780} selected={wordSwap > 0.4} pad={52}>
            {/* La palabra ancla */}
            <div style={{
              fontFamily: fonts.mono, fontSize: 28, letterSpacing: '0.14em',
              color: cardWordColor,
              transition: 'none',
              marginBottom: 8,
              opacity: costoIn,
            }}>
              {cardWord} ←
            </div>
            <div style={{
              fontFamily: fonts.display, fontWeight: 800, fontSize: 76,
              letterSpacing: '-0.03em', color: '#F4F4FA',
              transition: 'none',
            }}>
              {PRICE}
            </div>
            <div style={{ height: 1, background: 'rgba(255,255,255,0.1)', margin: '32px 0' }} />
            {CONTENT.map((line, i) => (
              <div key={i} style={{
                fontFamily: fonts.display, fontSize: 40, color: 'rgba(255,255,255,0.62)',
                marginBottom: 10,
              }}>
                · {line}
              </div>
            ))}
          </Glass>
        </div>

        {/* Métrica de consultas */}
        <div style={{
          position: 'absolute', bottom: 440, left: 0, right: 0,
          display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', gap: 16,
        }}>
          {/* BAJA (Costo) */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 18,
            opacity: consultasLow * (1 - wordSwap),
          }}>
            <div style={{ fontFamily: fonts.mono, fontSize: 30, color: '#6B7280', letterSpacing: '0.06em' }}>
              CONSULTAS RECIBIDAS
            </div>
            <div style={{
              width: 180, height: 12, borderRadius: 6, background: 'rgba(255,255,255,0.1)',
              overflow: 'hidden',
            }}>
              <div style={{ width: '22%', height: '100%', background: '#6B7280', borderRadius: 6 }} />
            </div>
            <div style={{ fontFamily: fonts.display, fontWeight: 700, fontSize: 36, color: '#6B7280' }}>
              22%
            </div>
          </div>

          {/* SUBE (Inversión) */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 18,
            opacity: consultasHigh * wordSwap,
            transform: `translateY(${(1 - consultasHigh) * 16}px)`,
          }}>
            <div style={{ fontFamily: fonts.mono, fontSize: 30, color: VLT_L, letterSpacing: '0.06em' }}>
              CONSULTAS RECIBIDAS
            </div>
            <div style={{
              width: 180, height: 12, borderRadius: 6, background: 'rgba(255,255,255,0.1)',
              overflow: 'hidden',
            }}>
              <div style={{
                width: `${78 * consultasHigh}%`, height: '100%',
                background: `linear-gradient(90deg, ${VLT}, ${VLT_L})`,
                borderRadius: 6,
                boxShadow: `0 0 12px ${VLT}88`,
              }} />
            </div>
            <div style={{ fontFamily: fonts.display, fontWeight: 700, fontSize: 36, color: VLT_L }}>
              {Math.round(consultasHigh * 78)}%
            </div>
          </div>
        </div>
      </AbsoluteFill>

      {/* Comparación de palabras */}
      <AbsoluteFill style={{
        alignItems: 'center', justifyContent: 'center',
        opacity: compareIn,
      }}>
        <div style={{
          display: 'flex', gap: 60, alignItems: 'center',
          transform: `translateY(${(1 - compareIn) * 24}px)`,
        }}>
          <div style={{
            fontFamily: fonts.display, fontWeight: 800, fontSize: 96,
            color: '#6B7280', letterSpacing: '-0.03em',
            textDecoration: 'line-through',
          }}>
            COSTO
          </div>
          <div style={{ fontFamily: fonts.mono, fontSize: 40, color: 'rgba(255,255,255,0.3)' }}>vs</div>
          <div style={{
            fontFamily: fonts.display, fontWeight: 800, fontSize: 96,
            color: VLT_L, letterSpacing: '-0.03em',
            textShadow: `0 0 44px ${VLT}aa`,
          }}>
            INVERSIÓN
          </div>
        </div>
        <div style={{
          position: 'absolute', bottom: 480, left: 0, right: 0, textAlign: 'center',
          fontFamily: fonts.display, fontSize: 44, color: 'rgba(255,255,255,0.5)',
          opacity: compareIn,
        }}>
          El precio era el mismo.
        </div>
      </AbsoluteFill>

      {/* PAYOFF */}
      <AbsoluteFill style={{
        alignItems: 'center', justifyContent: 'center', textAlign: 'center',
        paddingLeft: 90, paddingRight: 130, opacity: pay, zIndex: 200,
      }}>
        <SiriFrame frame={f} intensity={pay} />
        <div style={{ transform: `translateY(${(1 - pay) * 26}px)` }}>
          <BigType frame={f} s={248} size={88} lines={[
            { t: 'La primera palabra' },
            { t: 'tiñe todo', hl: false },
            { t: 'lo que sigue.', hl: true },
          ]} />
          <div style={{
            fontFamily: fonts.display, fontWeight: 400, fontSize: 42, color: '#9A9AB5',
            marginTop: 32, opacity: ip(f, 286, 306, 0, 1),
          }}>
            Las palabras no son neutras. Elegí con intención.
          </div>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};
