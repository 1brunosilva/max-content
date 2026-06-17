/**
 * DobleCosto — Costo de oportunidad (lo que no ves).
 * 6 meses aparecen uno a uno. Cada mes una barra sube mostrando el costo
 * acumulado de no automatizar. El espectador VIVE el crecimiento invisible
 * mes a mes — hasta que el total lo sorprende.
 * Lever: costo de oportunidad / costo invisible. Paleta: ámbar. V.
 */
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { Stage, SiriGlow, SiriFrame, ip, countUp, fonts } from './kit';

const AMBER   = '#F59E0B';
const AMBER_L = '#FCD34D';
const AMBER_D = '#78350F';

export const DOBLECOSTO_DURATION = 390;

const MONTHS = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN'];
const VALUES = [4200, 4200, 4200, 4200, 4200, 4200]; // $4.200/mes costo de trabajo manual
const MAX_H  = 360; // altura máxima de barra (px)
const MAX_VAL = VALUES[0];

export const DobleCosto: React.FC = () => {
  const f = useCurrentFrame();

  const labelOp   = ip(f,  8,  26, 0, 1) * (1 - ip(f, 218, 236, 0, 1));
  const sceneFade = 1 - ip(f, 224, 244, 0, 1);
  const pay  = ip(f, 250, 270, 0, 1);
  const l1   = ip(f, 270, 286, 0, 1);
  const l2   = ip(f, 294, 312, 0, 1);
  const psub = ip(f, 322, 340, 0, 1);

  // Cada mes aparece en stagger
  const monthAppear = MONTHS.map((_, i) => ip(f, 24 + i * 20, 50 + i * 20, 0, 1));
  // La barra de cada mes sube después de que aparece
  const barGrow    = MONTHS.map((_, i) => ip(f, 34 + i * 20, 68 + i * 20, 0, 1));
  // Total aparece después del último mes
  const totalIn    = ip(f, 162, 188, 0, 1);
  const glowI      = ip(f, 175, 210, 0, 1) * (1 - ip(f, 218, 236, 0, 1));
  const totalVal   = countUp(f, 162, 200, VALUES.reduce((a, b) => a + b, 0));
  const realOp     = ip(f, 200, 220, 0, 1) * (1 - ip(f, 220, 238, 0, 1));

  const BAR_W = 108;
  const BAR_GAP = 28;
  const CHART_W = MONTHS.length * BAR_W + (MONTHS.length - 1) * BAR_GAP;

  return (
    <Stage bg="radial-gradient(130% 100% at 50% 44%, #1A1000 0%, #090500 82%)" hue={AMBER} seed={8}>
      <div style={{
        position: 'absolute', top: 272, left: 90, right: 130,
        textAlign: 'center', fontFamily: fonts.mono,
        fontSize: 36, letterSpacing: '0.16em',
        color: 'rgba(255,255,255,0.62)', opacity: labelOp, zIndex: 30,
      }}>
        EL COSTO QUE NO VES
      </div>

      {/* ── Gráfico de barras ───────────────────────────────────────────────── */}
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', opacity: sceneFade, zIndex: 10 }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 32 }}>

          {/* Subtítulo del gráfico */}
          <div style={{
            fontFamily: fonts.display, fontSize: 40,
            color: 'rgba(200,175,110,0.65)', textAlign: 'center',
            opacity: ip(f, 14, 30, 0, 1),
          }}>
            Tareas manuales que pagás con tiempo · $4.200/mes
          </div>

          {/* Barras */}
          <div style={{
            display: 'flex', alignItems: 'flex-end', gap: BAR_GAP,
            width: CHART_W, height: MAX_H + 60,
            position: 'relative',
          }}>
            {MONTHS.map((m, i) => {
              const barH   = barGrow[i] * MAX_H * (VALUES[i] / MAX_VAL);
              const isLast = i === MONTHS.length - 1;
              return (
                <div key={i} style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center',
                  gap: 10, opacity: monthAppear[i],
                  transform: `translateY(${(1 - monthAppear[i]) * 20}px)`,
                }}>
                  {/* Valor encima de la barra */}
                  <div style={{
                    fontFamily: fonts.mono, fontSize: 26,
                    color: isLast ? AMBER_L : 'rgba(200,175,110,0.55)',
                    opacity: barGrow[i],
                  }}>
                    ${VALUES[i].toLocaleString('es-UY')}
                  </div>
                  {/* Barra */}
                  <div style={{
                    width: BAR_W, height: MAX_H,
                    display: 'flex', alignItems: 'flex-end',
                  }}>
                    <div style={{
                      width: '100%', height: barH,
                      borderRadius: '10px 10px 4px 4px',
                      background: isLast
                        ? `linear-gradient(180deg, ${AMBER_L} 0%, ${AMBER} 100%)`
                        : `linear-gradient(180deg, rgba(245,158,11,0.55) 0%, rgba(245,158,11,0.28) 100%)`,
                      boxShadow: isLast ? `0 0 30px 6px ${AMBER}44` : 'none',
                    }} />
                  </div>
                  {/* Label mes */}
                  <div style={{
                    fontFamily: fonts.mono, fontSize: 28,
                    color: isLast ? AMBER_L : 'rgba(200,175,110,0.65)',
                    letterSpacing: '0.10em',
                  }}>{m}</div>
                </div>
              );
            })}
          </div>

          {/* Total acumulado */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 20,
            opacity: totalIn,
            transform: `translateY(${(1 - totalIn) * 16}px)`,
            position: 'relative',
          }}>
            <SiriGlow frame={f} intensity={glowI * 0.6} radius={10} />
            <div style={{ fontFamily: fonts.mono, fontSize: 36, color: 'rgba(200,170,90,0.70)', letterSpacing: '0.10em' }}>
              TOTAL SEMESTRE
            </div>
            <div style={{
              fontFamily: fonts.display, fontWeight: 800, fontSize: 92,
              color: AMBER_L, letterSpacing: '-0.04em',
              textShadow: `0 0 50px ${AMBER}bb`,
            }}>
              ${totalVal.toLocaleString('es-UY')}
            </div>
          </div>
        </div>
      </AbsoluteFill>

      {/* Realización */}
      <AbsoluteFill style={{
        alignItems: 'center', justifyContent: 'flex-end',
        paddingBottom: 450, paddingLeft: 90, paddingRight: 130,
        opacity: realOp * sceneFade, zIndex: 40,
      }}>
        <div style={{
          fontFamily: fonts.display, fontWeight: 700, fontSize: 58,
          color: AMBER_L, letterSpacing: '-0.025em',
          textAlign: 'center', lineHeight: 1.35,
          textShadow: `0 0 36px ${AMBER}77`,
        }}>
          $25.200 que no estaban<br />en ninguna factura.
          <br />
          <span style={{ color: 'rgba(220,185,100,0.60)', fontWeight: 500, fontSize: 46 }}>
            Pero los pagaste igual.
          </span>
        </div>
      </AbsoluteFill>

      {/* PAYOFF */}
      <AbsoluteFill style={{
        alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', padding: '0 96px',
        opacity: pay, zIndex: 200,
      }}>
        <SiriFrame frame={f} intensity={pay} />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 22 }}>
          <div style={{
            fontFamily: fonts.display, fontWeight: 800, fontSize: 92,
            color: '#FFF8E7', letterSpacing: '-0.035em', lineHeight: 1.06,
            opacity: l1, transform: `translateY(${(1 - l1) * 22}px)`,
          }}>Cada mes sin<br />automatizar</div>
          <div style={{
            fontFamily: fonts.display, fontWeight: 800, fontSize: 100,
            color: AMBER_L, letterSpacing: '-0.04em', lineHeight: 1.05,
            textShadow: `0 0 60px ${AMBER}bb`,
            opacity: l2, transform: `translateY(${(1 - l2) * 26}px)`,
          }}>tiene precio.</div>
          <div style={{
            fontFamily: fonts.display, fontSize: 50,
            color: AMBER_D, lineHeight: 1.45,
            opacity: psub, transform: `translateY(${(1 - psub) * 16}px)`,
            marginTop: 12,
          }}>
            Solo que no aparece<br />en ninguna línea de gasto.
          </div>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};
