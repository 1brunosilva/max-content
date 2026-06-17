/**
 * LoUrgente — Sesgo de urgencia (Urgency Bias).
 * Un conveyor de tareas urgentes pasa sin parar. En medio de ellas,
 * una card "IMPORTANTE" (crecimiento real del negocio) se hunde y cae
 * fuera de pantalla mientras las urgentes siguen pasando.
 * El espectador VIVE cómo lo urgente aplasta lo importante.
 * Lever: sesgo de urgencia / matriz Eisenhower. Paleta: ámbar. C.
 */
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { Stage, SiriGlow, SiriFrame, ip, fonts } from './kit';

const AMBER   = '#F59E0B';
const AMBER_L = '#FCD34D';
const AMBER_D = '#78350F';
const RED     = '#EF4444';

export const LOURGENTE_DURATION = 370;

const URGENT = [
  { txt: 'Responder WhatsApp', tag: '🔴 URGENTE' },
  { txt: 'Llamada pendiente',  tag: '🔴 URGENTE' },
  { txt: 'Factura vencida',    tag: '🔴 URGENTE' },
  { txt: 'Reunión de último momento', tag: '🔴 URGENTE' },
  { txt: 'Presupuesto para hoy',      tag: '🔴 URGENTE' },
  { txt: 'Reclamo de cliente',        tag: '🔴 URGENTE' },
  { txt: 'Email sin responder',       tag: '🔴 URGENTE' },
];

const IMPORTANT_IDX = 3; // posición donde la card importante se intercala

export const LoUrgente: React.FC = () => {
  const f = useCurrentFrame();

  const labelOp = ip(f, 8, 26, 0, 1) * (1 - ip(f, 196, 214, 0, 1));

  // El conveyor corre a velocidad constante hasta ~f=160, luego frena
  const scrollSpeed = ip(f, 0, 160, 0, 1) * 5.5; // avanza 5.5 cards
  const scroll = scrollSpeed;

  // La card IMPORTANTE entra en el conveyor en f~80, luego cae en f~130
  const impIn   = ip(f, 72, 96, 0, 1);
  const impFall = ip(f, 130, 180, 0, 1); // 0=en posición, 1=caída
  const impGlow = ip(f, 80, 110, 0, 1) * (1 - ip(f, 126, 150, 0, 1));

  const realOp    = ip(f, 190, 210, 0, 1) * (1 - ip(f, 222, 240, 0, 1));
  const sceneFade = 1 - ip(f, 226, 246, 0, 1);
  const pay  = ip(f, 252, 272, 0, 1);
  const l1   = ip(f, 272, 288, 0, 1);
  const l2   = ip(f, 296, 314, 0, 1);
  const psub = ip(f, 324, 342, 0, 1);

  const CW = 700;
  const CH = 200;

  const VISIBLE = 4; // cuántas cards se ven al mismo tiempo

  return (
    <Stage bg="radial-gradient(130% 100% at 50% 44%, #1A0F00 0%, #090500 82%)" hue={AMBER} seed={10}>
      <div style={{
        position: 'absolute', top: 272, left: 90, right: 130,
        textAlign: 'center', fontFamily: fonts.mono,
        fontSize: 36, letterSpacing: '0.16em',
        color: 'rgba(255,255,255,0.60)', opacity: labelOp, zIndex: 30,
      }}>
        TU SEMANA · EN TIEMPO REAL
      </div>

      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', opacity: sceneFade, zIndex: 10 }}>
        <div style={{
          position: 'relative', width: CW,
          height: (CH + 24) * VISIBLE,
          overflow: 'hidden',
        }}>

          {/* Gradient mask arriba y abajo para sensación de flujo */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: 80, zIndex: 20,
            background: 'linear-gradient(to bottom, rgba(9,5,0,1) 0%, transparent 100%)',
            pointerEvents: 'none',
          }} />
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: 80, zIndex: 20,
            background: 'linear-gradient(to top, rgba(9,5,0,1) 0%, transparent 100%)',
            pointerEvents: 'none',
          }} />

          {/* Cards urgentes desfilando */}
          {URGENT.map((card, i) => {
            const yBase = (i - scroll) * (CH + 24) + (VISIBLE / 2 - 0.5) * (CH + 24);
            const op = 1 - Math.abs((i - scroll) - (VISIBLE / 2 - 0.5)) / (VISIBLE / 2 + 0.5);
            if (op <= 0) return null;
            return (
              <div key={i} style={{
                position: 'absolute', left: 0, top: yBase, width: CW, height: CH,
                opacity: Math.max(0, op),
              }}>
                <div style={{
                  width: '100%', height: CH, borderRadius: 26,
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,80,80,0.18)',
                  backdropFilter: 'blur(14px)',
                  padding: '0 36px',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                }}>
                  <div style={{
                    fontFamily: fonts.display, fontWeight: 600, fontSize: 48,
                    color: 'rgba(220,200,180,0.80)', letterSpacing: '-0.02em',
                  }}>{card.txt}</div>
                  <div style={{
                    fontFamily: fonts.mono, fontSize: 28, letterSpacing: '0.10em',
                    color: `${RED}cc`,
                  }}>{card.tag}</div>
                </div>
              </div>
            );
          })}

          {/* Card IMPORTANTE — entra y cae */}
          <div style={{
            position: 'absolute', left: 0, width: CW, height: CH,
            top: (IMPORTANT_IDX - scroll) * (CH + 24) + (VISIBLE / 2 - 0.5) * (CH + 24),
            opacity: impIn * (1 - impFall * 0.85),
            transform: `translateY(${impFall * 280}px) translateX(${impFall * -30}px) rotate(${impFall * 8}deg)`,
            zIndex: 15,
          }}>
            <SiriGlow frame={f} intensity={impGlow * 0.7} radius={26} />
            <div style={{
              width: '100%', height: CH, borderRadius: 26,
              background: impGlow > 0.05
                ? 'linear-gradient(165deg, #221A04 0%, #110E02 100%)'
                : 'rgba(255,255,255,0.05)',
              border: `2px solid ${impGlow > 0.05 ? AMBER + 'aa' : 'rgba(245,158,11,0.30)'}`,
              backdropFilter: 'blur(14px)',
              boxShadow: impGlow > 0.05 ? `0 0 40px 8px ${AMBER}44` : 'none',
              padding: '0 36px',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
              <div style={{
                fontFamily: fonts.display, fontWeight: 700, fontSize: 48,
                color: AMBER_L, letterSpacing: '-0.02em',
                textShadow: impGlow > 0.05 ? `0 0 30px ${AMBER}aa` : 'none',
              }}>Estrategia de crecimiento Q3</div>
              <div style={{
                fontFamily: fonts.mono, fontSize: 28, letterSpacing: '0.10em',
                color: `${AMBER}cc`,
              }}>⭐ IMPORTANTE</div>
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
          fontFamily: fonts.display, fontWeight: 700, fontSize: 60,
          color: AMBER_L, letterSpacing: '-0.025em',
          textAlign: 'center', lineHeight: 1.35,
          textShadow: `0 0 36px ${AMBER}77`,
        }}>
          Atendiste lo urgente.
          <br />
          <span style={{ color: 'rgba(220,185,100,0.60)', fontWeight: 500, fontSize: 48 }}>
            Perdiste lo importante.
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
          }}>Lo urgente te<br />llena la semana.</div>
          <div style={{
            fontFamily: fonts.display, fontWeight: 800, fontSize: 96,
            color: AMBER_L, letterSpacing: '-0.04em', lineHeight: 1.05,
            textShadow: `0 0 60px ${AMBER}bb`,
            opacity: l2, transform: `translateY(${(1 - l2) * 26}px)`,
          }}>Lo importante<br />te llena el año.</div>
          <div style={{
            fontFamily: fonts.display, fontSize: 50,
            color: AMBER_D, lineHeight: 1.45,
            opacity: psub, transform: `translateY(${(1 - psub) * 16}px)`,
            marginTop: 12,
          }}>
            Automatizá lo urgente.<br />Invertí tu tiempo en lo que crece.
          </div>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};
