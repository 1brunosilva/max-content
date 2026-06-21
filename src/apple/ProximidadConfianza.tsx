/**
 * ProximidadConfianza — Proximity heuristic / local trust effect. Tres negocios con
 * servicios similares en cover-flow. La distancia aparece como dato. El local
 * (Montevideo) sube con glow Siri, los lejanos se hunden. El espectador VIVE
 * cómo la proximidad geográfica dispara la confianza por defecto.
 *
 * Lever: proximity heuristic / local trust bias / in-group. Paleta: verde-rosa. V.
 */
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { Stage, Glass, SiriGlow, SiriFrame, BigType, ip, fonts, verbs } from './kit';

export const PROXIMIDADCONFIANZA_DURATION = 290;

const GREEN = '#10B981';
const GREEN_L = '#34D399';

const CARDS = [
  { name: 'TechSolutions Inc.', location: 'San Francisco, CA', dist: '14.000 km', trust: '42%', color: '#6B7280' },
  { name: 'Tu solución · Montevideo', location: 'Montevideo, Uruguay', dist: '12 km de vos', trust: '91%', color: GREEN_L, hero: true },
  { name: 'AgenciaDigital Pro', location: 'Buenos Aires, Argentina', dist: '2.100 km', trust: '61%', color: '#9CA3AF' },
];

const CW = 580, CH = 420;

export const ProximidadConfianza: React.FC = () => {
  const f = useCurrentFrame();

  const labelOp = ip(f, 8, 28, 0, 1) * (1 - ip(f, 218, 236, 0, 1));

  // Fan inicial de los 3 cards
  const fanOpen = ip(f, 8, 56, 0, 1);

  // El local sube, los demás se hunden
  const heroRise = ip(f, 72, 118, 0, 1);
  const otherSink = ip(f, 80, 125, 0, 1);
  const glowI = ip(f, 112, 148, 0, 1);

  // Trust bars se revelan
  const trustReveal = ip(f, 90, 130, 0, 1);

  const pay = ip(f, 218, 250, 0, 1);

  return (
    <Stage
      bg="radial-gradient(130% 92% at 50% 44%, #031A0D 0%, #010A05 80%)"
      hue={GREEN}
      seed={12}
    >
      {/* Label */}
      <div style={{
        position: 'absolute', top: 250, left: 0, right: 0, textAlign: 'center',
        fontFamily: fonts.mono, fontSize: 36, letterSpacing: '0.18em',
        color: 'rgba(255,255,255,0.68)', opacity: labelOp, zIndex: 30,
      }}>
        MISMO SERVICIO · 3 OPCIONES
      </div>

      {/* 3 CARDS en coverflow */}
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', opacity: 1 - pay }}>
        <div style={{ position: 'relative', transformStyle: 'preserve-3d', width: 0, height: 0 }}>
          {CARDS.map((card, i) => {
            const off = i - 1; // -1, 0, 1
            const isHero = card.hero;

            // cover-flow transform + hero rise
            const baseTransform = verbs.coverflow(off, fanOpen, 380, 200, 38);
            const heroZ = isHero ? heroRise * 180 : 0;
            const heroScale = isHero ? 1 + heroRise * 0.12 : 1 - otherSink * 0.06;
            const sinkY = isHero ? 0 : otherSink * 30;
            const otherOp = isHero ? 1 : 1 - otherSink * 0.55;

            return (
              <div key={i} style={{
                position: 'absolute', left: -CW / 2, top: -CH / 2,
                width: CW, height: CH,
                transform: `${baseTransform} translateZ(${heroZ}px) scale(${heroScale}) translateY(${sinkY}px)`,
                transformOrigin: 'center',
                opacity: fanOpen * otherOp,
                zIndex: isHero ? 10 : 1,
              }}>
                {isHero && <SiriGlow frame={f} intensity={glowI * 0.9} radius={30} />}
                <Glass w={CW} h={CH} selected={isHero && glowI > 0.3} pad={40}>
                  {/* Distancia */}
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20,
                  }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: '50%',
                      background: isHero ? `${GREEN}33` : 'rgba(255,255,255,0.08)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 18,
                    }}>
                      📍
                    </div>
                    <div style={{
                      fontFamily: fonts.mono, fontSize: 26,
                      color: isHero ? GREEN_L : 'rgba(255,255,255,0.36)',
                      letterSpacing: '0.08em',
                    }}>
                      {card.dist}
                    </div>
                  </div>

                  {/* Nombre */}
                  <div style={{
                    fontFamily: fonts.display, fontWeight: 700,
                    fontSize: isHero ? 52 : 42,
                    color: isHero ? '#F4F4FA' : 'rgba(255,255,255,0.5)',
                    letterSpacing: '-0.02em', lineHeight: 1.2, marginBottom: 8,
                  }}>
                    {card.name}
                  </div>
                  <div style={{
                    fontFamily: fonts.display, fontSize: 32,
                    color: isHero ? card.color : 'rgba(255,255,255,0.28)',
                    marginBottom: 28,
                  }}>
                    {card.location}
                  </div>

                  {/* Trust bar */}
                  <div style={{ opacity: trustReveal }}>
                    <div style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8,
                    }}>
                      <div style={{ fontFamily: fonts.mono, fontSize: 22, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.08em' }}>
                        CONFIANZA INICIAL
                      </div>
                      <div style={{
                        fontFamily: fonts.display, fontWeight: 700, fontSize: 40,
                        color: card.color,
                      }}>
                        {card.trust}
                      </div>
                    </div>
                    <div style={{
                      height: 8, borderRadius: 4, background: 'rgba(255,255,255,0.08)', overflow: 'hidden',
                    }}>
                      <div style={{
                        height: '100%', borderRadius: 4,
                        width: `${parseInt(card.trust) * trustReveal}%`,
                        background: isHero
                          ? `linear-gradient(90deg, ${GREEN}, ${GREEN_L})`
                          : card.color,
                        boxShadow: isHero ? `0 0 12px ${GREEN}88` : 'none',
                      }} />
                    </div>
                  </div>
                </Glass>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>

      {/* PAYOFF */}
      <AbsoluteFill style={{
        alignItems: 'center', justifyContent: 'center', textAlign: 'center',
        paddingLeft: 90, paddingRight: 130, opacity: pay, zIndex: 200,
      }}>
        <SiriFrame frame={f} intensity={pay} />
        <div style={{ transform: `translateY(${(1 - pay) * 26}px)` }}>
          <BigType frame={f} s={218} size={88} lines={[
            { t: 'El cliente no elige' },
            { t: 'al mejor.' },
            { t: 'Elige al más cercano', hl: false },
            { t: 'que parece confiable.', hl: true },
          ]} />
        </div>
      </AbsoluteFill>
    </Stage>
  );
};
