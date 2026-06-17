/**
 * FlipCompare — mecanismo: UNA card del negocio se voltea en 3D (flip sobre Y) y
 * revela su otra cara. Mismos campos, respuestas opuestas: el flip ES la comparación.
 * No son dos negocios distintos — es el MISMO negocio en otra versión. La cara A
 * está apagada (gris, sin glow); la cara B se enciende con glow Siri al revelarse.
 *
 * Tema (contraste / anchoring): la diferencia no se argumenta, se ve de un lado al
 * otro. Mismo ADN (kit). Abstracto, sin precio ni "chatbot".
 */
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { Stage, SiriGlow, SiriFrame, BigType, ip, APPLE, verbs, fonts, VLT, VLT_L } from './kit';

// mismos conceptos, valor opuesto — el flip muestra el mismo formulario, mejor respondido
const ROWS = [
  { k: 'Respuesta',   a: 'Cuando puede',   b: 'Al instante' },
  { k: 'Disponible',  a: '9 a 18 h',       b: '24 / 7' },
  { k: 'Mensajes',    a: 'Algunos se pierden', b: 'Cero perdidos' },
  { k: 'Seguimiento', a: 'A veces',        b: 'Siempre' },
];
const CW = 780, CH = 720;

export const FLIPCOMPARE_DURATION = 300;

const Face: React.FC<{ side: 'a' | 'b'; frame: number; glowI?: number }> = ({ side, frame, glowI = 0 }) => {
  const isB = side === 'b';
  return (
    <div style={{
      position: 'absolute', inset: 0,
      backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden',
      transform: isB ? 'rotateY(180deg)' : 'none',
    }}>
      {/* glow Siri DETRÁS de la card (halo prominente), no relleno → contenido legible */}
      {isB ? <SiriGlow frame={frame} intensity={glowI} radius={36} /> : null}
      <div style={{
        position: 'absolute', inset: 0, borderRadius: 36,
        background: isB
          ? 'linear-gradient(165deg, rgba(30,24,50,0.90) 0%, rgba(13,10,21,0.92) 100%)'
          : 'linear-gradient(165deg, rgba(24,24,30,0.92) 0%, rgba(12,12,15,0.92) 100%)',
        border: `1px solid ${isB ? VLT + '99' : 'rgba(255,255,255,0.10)'}`,
        backdropFilter: 'blur(16px)',
        boxShadow: '0 50px 130px -40px rgba(0,0,0,0.9)',
        padding: 56, display: 'flex', flexDirection: 'column',
      }}>
        <div style={{
          fontFamily: fonts.mono, fontSize: 18, letterSpacing: '0.16em',
          color: isB ? VLT_L : '#6A6A82',
          borderBottom: `1px solid ${isB ? VLT + '55' : 'rgba(255,255,255,0.08)'}`,
          paddingBottom: 22, marginBottom: 8,
        }}>
          {isB ? 'EL MISMO NEGOCIO' : 'TU NEGOCIO HOY'}
        </div>
        {ROWS.map((r, i) => (
          <div key={i} style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            height: 118, borderBottom: '1px solid rgba(255,255,255,0.05)',
          }}>
            <span style={{ fontFamily: fonts.display, fontWeight: 500, fontSize: 30, color: isB ? '#B8B4CC' : '#7E7E8C' }}>{r.k}</span>
            <span style={{
              fontFamily: fonts.display, fontWeight: isB ? 700 : 500, fontSize: 34,
              letterSpacing: '-0.02em',
              color: isB ? '#F4F2FF' : '#8E8E9C',
              textShadow: isB ? `0 0 30px ${VLT}88` : 'none',
            }}>{isB ? r.b : r.a}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export const FlipCompare: React.FC = () => {
  const f = useCurrentFrame();

  const enter = ip(f, 8, 40, 0, 1);
  const tiltX = (1 - enter) * 18;
  const lift  = (1 - enter) * 60;

  // el flip: 0 → 1 sobre frames 102..152
  const fp = ip(f, 102, 152, 0, 1, APPLE);
  const flipDeg = verbs.flip(fp, 'y');           // rotateY(0..180)
  const glowI = ip(f, 132, 168, 0, 1);           // glow enciende al revelar cara B
  const pay = ip(f, 214, 246, 0, 1);
  const labelOp = ip(f, 6, 22, 0, 1) * (1 - ip(f, 100, 120, 0, 1));

  return (
    <Stage bg="radial-gradient(120% 90% at 50% 32%, #111119 0%, #050506 80%)" hue={VLT} seed={7}>
      <div style={{
        position: 'absolute', top: 150, left: 0, right: 0, textAlign: 'center',
        fontFamily: fonts.mono, fontSize: 24, letterSpacing: '0.18em',
        color: 'rgba(255,255,255,0.72)', opacity: labelOp, zIndex: 30,
      }}>
        DALO VUELTA
      </div>

      {/* la card que se voltea — se desvanece al entrar el payoff (GOTCHA) */}
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', opacity: 1 - pay }}>
        <div style={{
          width: CW, height: CH, position: 'relative',
          transformStyle: 'preserve-3d',
          transform: `translateY(${lift}px) rotateX(${tiltX}deg) ${flipDeg} scale(${0.94 + enter * 0.06})`,
          opacity: enter,
        }}>
          <Face side="a" frame={f} />
          <Face side="b" frame={f} glowI={glowI} />
        </div>
      </AbsoluteFill>

      {/* PAYOFF */}
      <AbsoluteFill style={{
        alignItems: 'center', justifyContent: 'center', textAlign: 'center',
        padding: 96, opacity: pay, zIndex: 200,
      }}>
        <SiriFrame frame={f} intensity={pay} />
        <div style={{ transform: `translateY(${(1 - pay) * 26}px)` }}>
          <BigType frame={f} s={214} size={92} lines={[
            { t: 'La diferencia' },
            { t: 'no se explica.' },
            { t: 'Se nota.', hl: true },
          ]} />
          <div style={{
            fontFamily: fonts.display, fontSize: 34, color: '#9A9AB5',
            marginTop: 32, opacity: ip(f, 256, 280, 0, 1),
          }}>
            El mismo negocio. Otra versión.
          </div>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};
