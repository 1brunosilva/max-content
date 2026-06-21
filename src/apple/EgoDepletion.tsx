/**
 * EgoDepletion — Decision fatigue / ego depletion. 6 micro-decisiones triviales caen
 * una a una formando una pila pesada. Cuando llega la decisión importante (¿DELEGO?),
 * el cerebro ya está agotado y la aplaza. El espectador SIENTE la acumulación aplastante.
 *
 * Lever: ego depletion / carga cognitiva. Paleta: ámbar-rojo. Modo: midnight-línea. C.
 */
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { Stage, SiriFrame, BigType, ip, fonts, APPLE } from './kit';
import { interpolate } from 'remotion';

export const EGODEPLETION_DURATION = 310;

const AMBER = '#F59E0B';
const RED = '#EF4444';
const CL = { extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const };

const MICRO = [
  { label: 'FUENTE DEL LOGO', sub: '¿Arial o Helvetica?' },
  { label: 'HORA DEL POST', sub: '¿10am o 12pm?' },
  { label: 'COLOR DEL BOTÓN', sub: '¿Verde o azul?' },
  { label: 'PRECIO DEL MENÚ', sub: '¿$4.900 o $5.000?' },
  { label: 'FOTO DE PORTADA', sub: '¿Esta o la otra?' },
  { label: 'TEXTO DEL SUBJECT', sub: '¿"Hola" o "Buenos días"?' },
];

const BIG_DECISION = { label: '¿DELEGO ESTO?', sub: 'La decisión que cambia todo' };

const CW = 820, CH = 108, GAP = 10;

export const EgoDepletion: React.FC = () => {
  const f = useCurrentFrame();

  const labelOp = ip(f, 8, 28, 0, 1) * (1 - ip(f, 155, 175, 0, 1));
  const pay = ip(f, 230, 262, 0, 1);

  // Cada micro-card cae en t y luego se squash al aterrizar
  const MICRO_START = 20;
  const INTERVAL = 22;

  // Centro vertical para la pila (se desplaza a medida que se acumula)
  const pileBase = 1140; // Y donde se acumula la base de la pila

  return (
    <Stage
      bg="radial-gradient(125% 92% at 50% 60%, #1A1000 0%, #0A0700 80%)"
      hue={AMBER}
      seed={11}
    >
      {/* Label */}
      <div style={{
        position: 'absolute', top: 250, left: 0, right: 0, textAlign: 'center',
        fontFamily: fonts.mono, fontSize: 38, letterSpacing: '0.18em',
        color: 'rgba(255,255,255,0.72)', opacity: labelOp, zIndex: 30,
      }}>
        TU DÍA COMO DUEÑO
      </div>

      {/* PILA DE MICRO-DECISIONES */}
      <AbsoluteFill style={{ opacity: 1 - pay }}>
        {MICRO.map((card, i) => {
          const startFrame = MICRO_START + i * INTERVAL;
          // Squash al aterrizar (se aplasta brevemente)
          const squash = ip(f, startFrame + 14, startFrame + 20, 0, 1) * (1 - ip(f, startFrame + 20, startFrame + 28, 0, 1));

          // Posición Y: empieza desde arriba (300px) y cae a su lugar en la pila
          const targetY = pileBase - i * (CH + GAP);
          const yPos = interpolate(f, [startFrame, startFrame + 18], [200, targetY], {
            ...CL, easing: APPLE,
          });
          const scaleY = 1 - squash * 0.07; // squash vertical
          const scaleX = 1 + squash * 0.04; // stretch horizontal al impacto

          const cardOp = ip(f, startFrame, startFrame + 10, 0, 1);

          const baseOp = 1 - (i / (MICRO.length - 1)) * 0.4;

          return (
            <div key={i} style={{
              position: 'absolute',
              left: (1080 - CW) / 2,
              top: yPos,
              width: CW, height: CH,
              opacity: cardOp * baseOp,
              transform: `scaleX(${scaleX}) scaleY(${scaleY})`,
            }}>
              <div style={{
                width: CW, height: CH, borderRadius: 20,
                background: `linear-gradient(135deg, #1A1400 0%, ${AMBER}11 100%)`,
                border: `1px solid ${AMBER}44`,
                backdropFilter: 'blur(10px)',
                display: 'flex', alignItems: 'center',
                paddingLeft: 40, paddingRight: 40, gap: 24,
              }}>
                <div style={{
                  width: 44, height: 44, borderRadius: '50%',
                  background: `${AMBER}22`, border: `1px solid ${AMBER}66`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  <div style={{ width: 16, height: 16, borderRadius: '50%', background: AMBER, opacity: 0.8 }} />
                </div>
                <div>
                  <div style={{ fontFamily: fonts.mono, fontSize: 22, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.12em' }}>{card.label}</div>
                  <div style={{ fontFamily: fonts.display, fontWeight: 600, fontSize: 38, color: 'rgba(255,255,255,0.72)', marginTop: 2 }}>{card.sub}</div>
                </div>
              </div>
            </div>
          );
        })}

        {/* LA GRAN DECISIÓN — aplastada al final */}
        {(() => {
          const bigStart = MICRO_START + MICRO.length * INTERVAL + 8;
          const bigIn = ip(f, bigStart, bigStart + 20, 0, 1);
          const crush = ip(f, bigStart + 22, bigStart + 40, 0, 1);
          const targetY = pileBase - MICRO.length * (CH + GAP);
          const yPos = interpolate(f, [bigStart, bigStart + 18], [160, targetY], { ...CL, easing: APPLE });

          return (
            <div style={{
              position: 'absolute',
              left: (1080 - CW) / 2,
              top: yPos,
              width: CW, height: CH + 18,
              opacity: bigIn * (1 - pay),
              transform: `scaleY(${1 - crush * 0.35}) scaleX(${1 + crush * 0.05})`,
            }}>
              <div style={{
                width: CW, height: CH + 18, borderRadius: 22,
                background: `linear-gradient(135deg, #200800 0%, ${RED}22 100%)`,
                border: `2px solid ${RED}88`,
                display: 'flex', alignItems: 'center',
                paddingLeft: 40, paddingRight: 40, gap: 24,
                boxShadow: `0 0 40px ${RED}44`,
              }}>
                <div style={{
                  width: 52, height: 52, borderRadius: '50%',
                  background: `${RED}33`, border: `2px solid ${RED}88`, flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <div style={{ width: 22, height: 22, borderRadius: '50%', background: RED }} />
                </div>
                <div>
                  <div style={{ fontFamily: fonts.mono, fontSize: 24, color: `${RED}CC`, letterSpacing: '0.12em' }}>{BIG_DECISION.label}</div>
                  <div style={{ fontFamily: fonts.display, fontWeight: 700, fontSize: 42, color: '#F4F4FA', marginTop: 2 }}>{BIG_DECISION.sub}</div>
                </div>
              </div>
            </div>
          );
        })()}
      </AbsoluteFill>

      {/* PAYOFF */}
      <AbsoluteFill style={{
        alignItems: 'center', justifyContent: 'center', textAlign: 'center',
        paddingLeft: 90, paddingRight: 130, opacity: pay, zIndex: 200,
      }}>
        <SiriFrame frame={f} intensity={pay} />
        <div style={{ transform: `translateY(${(1 - pay) * 26}px)` }}>
          <BigType frame={f} s={230} size={88} lines={[
            { t: 'El cerebro que decide' },
            { t: 'lo trivial' },
            { t: 'no puede decidir', hl: false },
            { t: 'lo importante.', hl: true },
          ]} />
          <div style={{
            fontFamily: fonts.display, fontWeight: 400, fontSize: 40, color: '#9A9AB5',
            marginTop: 32, opacity: ip(f, 268, 292, 0, 1),
          }}>
            Delegar no es debilidad. Es reservar energía para lo que importa.
          </div>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};
