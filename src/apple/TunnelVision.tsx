/**
 * TunnelVision — Tunneling / scarcity mindset.
 * 6 cards en grilla. Un vignette se cierra desde los bordes.
 * Las estratégicas desaparecen. Solo "APAGAR INCENDIO" queda visible.
 * Lever: tunneling / scarcity mindset. Palette: midnight/índigo. Mode: midnight-línea. C.
 */
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { Stage, SiriGlow, SiriFrame, BigType, ip, fonts } from './kit';

const INDIGO   = '#6366F1';
const INDIGO_L = '#818CF8';

const GRID_CARDS = [
  { label: 'ESTRATEGIA',       col: 0, row: 0 },
  { label: 'EQUIPO',           col: 1, row: 0 },
  { label: 'MARKETING',        col: 0, row: 1 },
  { label: 'APAGAR INCENDIO',  col: 1, row: 1, isHot: true },
  { label: 'CLIENTES',         col: 0, row: 2 },
  { label: 'PRODUCTO',         col: 1, row: 2 },
];

export const TUNNELVISION_DURATION = 278;

export const TunnelVision: React.FC = () => {
  const f = useCurrentFrame();

  // Vignette: inner radius shrinks from 250% to 18%
  const vigRadius  = ip(f, 40, 155, 250, 18);
  const vigOp      = ip(f, 40, 80, 0, 1);

  // Cards fade: corners first
  const cornerFade = ip(f, 80, 128, 1, 0);    // corners (rows 0,2 col 0,1 except hot)
  const midFade    = ip(f, 120, 155, 1, 0.12); // remaining dim

  const glowI      = ip(f, 100, 152, 0, 1);
  const bossLabel  = ip(f, 160, 178, 0, 1) * (1 - ip(f, 188, 205, 0, 1));
  const pay        = ip(f, 195, 222, 0, 1);

  const cardW = 340;
  const cardH = 170;

  return (
    <Stage bg="#020206" hue={INDIGO} seed={18}>
      {/* "Así ve el dueño ocupado" label */}
      <div style={{
        position: 'absolute', top: 240, left: 0, right: 0, textAlign: 'center',
        fontFamily: fonts.mono, fontSize: 20, letterSpacing: '0.18em',
        color: `rgba(129,140,248,0.75)`, opacity: bossLabel, zIndex: 50,
      }}>
        ASÍ VE EL DUEÑO OCUPADO
      </div>

      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', opacity: 1 - pay }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 22, width: cardW * 2 + 22 }}>
          {GRID_CARDS.map((card, i) => {
            const isCorner = (card.row === 0 || card.row === 2) && !card.isHot;
            const isMid    = card.row === 1 && !card.isHot;
            const elFade   = isCorner ? cornerFade : (isMid ? midFade : 1);
            const elGlow   = card.isHot ? glowI : 0;

            return (
              <div key={i} style={{
                position: 'relative',
                opacity: elFade,
                order: card.row * 2 + card.col,
              }}>
                {card.isHot && elGlow > 0.05 ? (
                  <SiriGlow frame={f} intensity={elGlow * 0.9} radius={24} />
                ) : null}
                <div style={{
                  width: cardW, height: cardH,
                  borderRadius: 24,
                  background: card.isHot && elGlow > 0.1
                    ? 'linear-gradient(165deg,#12103A 0%,#070620 100%)'
                    : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${card.isHot && elGlow > 0.1 ? INDIGO + '88' : 'rgba(255,255,255,0.08)'}`,
                  backdropFilter: 'blur(14px)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: card.isHot && elGlow > 0.1 ? `0 0 ${50 * elGlow}px ${INDIGO}44` : 'none',
                }}>
                  <div style={{
                    fontFamily: fonts.mono, fontSize: card.isHot ? 22 : 18,
                    letterSpacing: '0.14em',
                    color: card.isHot && elGlow > 0.1
                      ? INDIGO_L
                      : 'rgba(200,200,255,0.45)',
                    textAlign: 'center',
                    textShadow: card.isHot && elGlow > 0.3 ? `0 0 20px ${INDIGO}cc` : 'none',
                    fontWeight: card.isHot ? 700 : 400,
                  }}>
                    {card.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>

      {/* Vignette overlay */}
      <AbsoluteFill style={{ pointerEvents: 'none', zIndex: 20, opacity: vigOp * (1 - pay) }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: `radial-gradient(${vigRadius}% ${vigRadius}% at 50% 50%, transparent 0%, rgba(2,2,6,0.96) 100%)`,
        }} />
      </AbsoluteFill>

      {/* Payoff */}
      <AbsoluteFill style={{
        alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', padding: '0 96px',
        opacity: pay, zIndex: 200,
      }}>
        <SiriFrame frame={f} intensity={pay} />
        <div style={{ transform: `translateY(${(1 - pay) * 28}px)` }}>
          <BigType frame={f} s={195} size={80} lines={[
            { t: 'La urgencia' },
            { t: 'achica' },
            { t: 'el mundo.' },
            { t: 'Lo importante' },
            { t: 'queda afuera.', hl: true },
          ]} />
        </div>
      </AbsoluteFill>
    </Stage>
  );
};
