/**
 * SlotFeed — Variable ratio reinforcement / slot machine del feed.
 * 5 cards caen en cascade como un slot. Las primeras 4 son genéricas.
 * La 5ta explota en dorado con glow. El contador de "dopamina" sube.
 * Lever: variable ratio reinforcement. Palette: ámbar/dorado con destellos. Mode: glassy-oscuro. C.
 */
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { Stage, SiriGlow, SiriFrame, BigType, ip, fonts } from './kit';

const AMBER  = '#F59E0B';
const AMBER_L = '#FCD34D';

const CARDS = [
  { label: 'Tip #34',          emoji: '💡', special: false, dropF: 10  },
  { label: 'Post de motivación', emoji: '🙌', special: false, dropF: 30  },
  { label: 'Meme',              emoji: '😂', special: false, dropF: 50  },
  { label: 'Consejo genérico',  emoji: '📋', special: false, dropF: 70  },
  { label: 'NUEVA OFERTA 🔥',   emoji: '🔥', special: true,  dropF: 90  },
];

export const SLOTFEED_DURATION = 275;

export const SlotFeed: React.FC = () => {
  const f = useCurrentFrame();

  const specialGlow   = ip(f, 120, 155, 0, 1);
  const dopamineVal   = Math.round(ip(f, 140, 185, 0, 100));
  const dopamineOp    = ip(f, 140, 158, 0, 1) * (1 - ip(f, 188, 205, 0, 1));
  const nextLabelOp   = ip(f, 165, 182, 0, 1) * (1 - ip(f, 188, 205, 0, 1));
  const pay           = ip(f, 195, 222, 0, 1);

  return (
    <Stage
      bg="radial-gradient(120% 90% at 50% 48%, #0E0800 0%, #040300 80%)"
      hue={AMBER}
      seed={11}
    >
      {/* Dopamine counter */}
      <div style={{
        position: 'absolute', top: 238, left: 90, zIndex: 40,
        opacity: dopamineOp * (1 - pay),
      }}>
        <div style={{ fontFamily: fonts.mono, fontSize: 15, letterSpacing: '0.16em', color: 'rgba(245,158,11,0.55)', marginBottom: 4 }}>
          DOPAMINA
        </div>
        <div style={{
          fontFamily: fonts.display, fontWeight: 900, fontSize: 58,
          color: AMBER_L, letterSpacing: '-0.04em',
          textShadow: `0 0 32px ${AMBER}aa`,
        }}>{dopamineVal}%</div>
      </div>

      {/* "¿Cuándo viene la próxima?" */}
      <div style={{
        position: 'absolute', bottom: 438, left: 0, right: 0, textAlign: 'center',
        fontFamily: fonts.mono, fontSize: 20, letterSpacing: '0.14em',
        color: `rgba(245,158,11,0.7)`, opacity: nextLabelOp * (1 - pay), zIndex: 40,
      }}>
        ¿CUÁNDO VIENE LA PRÓXIMA?
      </div>

      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', opacity: 1 - pay }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 640 }}>
          {CARDS.map((card, i) => {
            const dropIn = ip(f, card.dropF, card.dropF + 26, 0, 1);
            const glowI  = card.special ? specialGlow : 0;
            const sc     = card.special ? 1 + glowI * 0.08 : 1;

            return (
              <div key={i} style={{
                position: 'relative',
                opacity: dropIn * (card.special ? 1 : 0.52),
                transform: `translateY(${(1 - dropIn) * -48}px) scale(${sc})`,
              }}>
                {card.special && glowI > 0.05 ? (
                  <SiriGlow frame={f} intensity={glowI * 0.85} radius={28} />
                ) : null}
                <div style={{
                  borderRadius: 28,
                  background: card.special && glowI > 0.1
                    ? 'linear-gradient(165deg,#2A1A00 0%,#140C00 100%)'
                    : 'rgba(255,255,255,0.05)',
                  border: `1px solid ${card.special && glowI > 0.1 ? AMBER + '88' : 'rgba(255,255,255,0.08)'}`,
                  backdropFilter: 'blur(14px)',
                  padding: '22px 34px',
                  display: 'flex', alignItems: 'center', gap: 22,
                  boxShadow: card.special && glowI > 0.1 ? `0 0 ${50 * glowI}px ${AMBER}44` : 'none',
                }}>
                  <div style={{ fontSize: 42 }}>{card.emoji}</div>
                  <div style={{
                    fontFamily: fonts.display, fontWeight: card.special ? 800 : 500,
                    fontSize: card.special ? 38 : 30,
                    color: card.special && glowI > 0.1 ? AMBER_L : 'rgba(255,255,255,0.55)',
                    letterSpacing: '-0.02em',
                    textShadow: card.special && glowI > 0.3 ? `0 0 24px ${AMBER}99` : 'none',
                  }}>
                    {card.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>

      {/* Payoff */}
      <AbsoluteFill style={{
        alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', padding: '0 96px',
        opacity: pay, zIndex: 200,
      }}>
        <SiriFrame frame={f} intensity={pay} />
        <div style={{ transform: `translateY(${(1 - pay) * 28}px)` }}>
          <BigType frame={f} s={195} size={88} lines={[
            { t: 'Tu cliente' },
            { t: 'busca la' },
            { t: 'próxima' },
            { t: 'dopamina.', hl: true },
          ]} />
          <div style={{
            fontFamily: fonts.display, fontSize: 28,
            color: `rgba(245,158,11,0.55)`, marginTop: 28,
            opacity: ip(f, 238, 255, 0, 1),
          }}>
            El scroll no para. ¿Tu contenido sí?
          </div>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};
