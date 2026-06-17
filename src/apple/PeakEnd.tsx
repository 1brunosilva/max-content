/**
 * PeakEnd — Peak-End Rule (Kahneman).
 * Timeline de 7 momentos de servicio al cliente como barras de altura variable.
 * Una barra muy alta (el pico) se ilumina con glow rosa. La última barra (el final)
 * también se ilumina. Las del medio quedan grises. El espectador entiende qué recuerda.
 * Lever: peak-end rule / experiencia del cliente. Palette: rosa-cyan. Mode: data/dark. C.
 */
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { Stage, SiriFrame, BigType, ip, fonts } from './kit';

const ROSE = '#FF6FD8';
const CYAN = '#4FE0FF';

const MOMENTS = [
  { label: 'Bienvenida', height: 140, isPeak: false, isEnd: false },
  { label: 'Onboarding', height: 100, isPeak: false, isEnd: false },
  { label: 'Uso diario', height: 90, isPeak: false, isEnd: false },
  { label: '¡Resultado!', height: 340, isPeak: true, isEnd: false },
  { label: 'Consulta', height: 110, isPeak: false, isEnd: false },
  { label: 'Facturación', height: 80, isPeak: false, isEnd: false },
  { label: 'Cierre', height: 260, isPeak: false, isEnd: true },
];

export const PEAKEND_DURATION = 270;

export const PeakEnd: React.FC = () => {
  const f = useCurrentFrame();

  const barsIn = ip(f, 10, 55, 0, 1);
  const peakGlow = ip(f, 80, 112, 0, 1);
  const endGlow = ip(f, 112, 144, 0, 1);
  const midDim = ip(f, 100, 136, 0, 1);
  const pay = ip(f, 158, 186, 0, 1);
  const labelOp = ip(f, 4, 20, 0, 1) * (1 - ip(f, 76, 90, 0, 1));

  const BAR_W = 88;
  const MAX_H = 340;
  const GAP = 22;

  return (
    <Stage bg="radial-gradient(120% 90% at 50% 60%, #180A16 0%, #060206 80%)" hue={ROSE} seed={14}>
      <div style={{
        position: 'absolute', top: 130, left: 0, right: 0, textAlign: 'center',
        fontFamily: fonts.mono, fontSize: 22, letterSpacing: '0.18em',
        color: 'rgba(255,255,255,0.65)', opacity: labelOp, zIndex: 30,
      }}>
        LA EXPERIENCIA DE TU CLIENTE
      </div>

      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', opacity: 1 - pay }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 40 }}>

          {/* Gráfico de barras */}
          <div style={{
            display: 'flex', alignItems: 'flex-end', gap: GAP,
            height: MAX_H + 80, paddingBottom: 0,
          }}>
            {MOMENTS.map((m, i) => {
              const glowI = m.isPeak ? peakGlow : m.isEnd ? endGlow : 0;
              const dimOp = m.isPeak || m.isEnd ? 1 : 1 - midDim * 0.75;
              const barH = m.height * barsIn;
              const glowColor = m.isPeak ? ROSE : CYAN;

              return (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, opacity: dimOp }}>
                  {/* Barra */}
                  <div style={{ position: 'relative', width: BAR_W, height: barH, display: 'flex', alignItems: 'flex-end' }}>
                    {glowI > 0.1 ? (
                      <div style={{
                        position: 'absolute', inset: -16, borderRadius: 20,
                        background: `radial-gradient(ellipse at center, ${glowColor}44 0%, transparent 70%)`,
                        filter: 'blur(8px)',
                        opacity: glowI,
                      }} />
                    ) : null}
                    <div style={{
                      width: BAR_W, height: barH, borderRadius: '14px 14px 6px 6px',
                      background: m.isPeak
                        ? `linear-gradient(180deg, ${ROSE} 0%, ${ROSE}88 100%)`
                        : m.isEnd
                        ? `linear-gradient(180deg, ${CYAN} 0%, ${CYAN}88 100%)`
                        : 'linear-gradient(180deg, #3A3A5A 0%, #1A1A2A 100%)',
                      boxShadow: glowI > 0.1 ? `0 0 30px ${glowColor}66` : 'none',
                    }} />
                  </div>
                  {/* Label */}
                  <div style={{ fontFamily: fonts.mono, fontSize: 14, color: glowI > 0.5 ? (m.isPeak ? ROSE : CYAN) : '#3A3A52', letterSpacing: '0.06em', textAlign: 'center', width: BAR_W + 10 }}>
                    {m.label}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Leyenda */}
          <div style={{ display: 'flex', gap: 32, opacity: ip(f, 115, 140, 0, 1) * (1 - pay) }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 16, height: 16, borderRadius: 4, background: ROSE }} />
              <div style={{ fontFamily: fonts.mono, fontSize: 20, color: ROSE }}>EL PICO</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 16, height: 16, borderRadius: 4, background: CYAN }} />
              <div style={{ fontFamily: fonts.mono, fontSize: 20, color: CYAN }}>EL FINAL</div>
            </div>
          </div>
        </div>
      </AbsoluteFill>

      {/* Payoff */}
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 96, opacity: pay, zIndex: 200 }}>
        <SiriFrame frame={f} intensity={pay} />
        <div style={{ transform: `translateY(${(1 - pay) * 28}px)` }}>
          <BigType frame={f} s={158} size={84} lines={[
            { t: 'No recuerda el medio.' },
            { t: 'Recuerda el pico', hl: true },
            { t: 'y el final.', hl: true },
          ]} />
          <div style={{ fontFamily: fonts.display, fontSize: 32, color: '#8A8AAA', marginTop: 28, opacity: ip(f, 198, 220, 0, 1) }}>
            Diseñá un momento WOW — y despedí bien.
          </div>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};
