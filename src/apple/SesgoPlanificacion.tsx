/**
 * SesgoPlanificacion — Planning Fallacy. Una barra de proyecto: "Plan: 2 semanas".
 * La barra se extiende más allá de lo estimado... 3 semanas... 5... 8... sale de frame.
 * Segunda barra (con sistema automatizado): termina en tiempo. El espectador VE
 * el sesgo del optimismo propio.
 *
 * Lever: planning fallacy / optimism bias en proyectos. Paleta: ámbar. V.
 */
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { Stage, SiriFrame, BigType, ip, fonts } from './kit';

export const SESGOPLANEACION_DURATION = 318;

const AMBER = '#F59E0B';
const AMBER_L = '#FCD34D';
const RED = '#EF4444';
const GREEN = '#10B981';

export const SesgoPlanificacion: React.FC = () => {
  const f = useCurrentFrame();

  const labelOp = ip(f, 8, 28, 0, 1) * (1 - ip(f, 240, 258, 0, 1));

  // Barra A (sin sistema) — se extiende más allá del target
  const barAIn = ip(f, 20, 50, 0, 1);
  const barAProgress = ip(f, 55, 200, 0, 1); // va hasta 100% (que visualmente es 150%)

  // Marcadores de tiempo en barra A
  const mark2w = ip(f, 70, 90, 0, 1);
  const mark3w = ip(f, 100, 118, 0, 1);
  const mark5w = ip(f, 130, 148, 0, 1);
  const mark8w = ip(f, 165, 185, 0, 1);

  // Barra B (con sistema) — llega justo al target
  const barBIn = ip(f, 115, 145, 0, 1);
  const barBProgress = ip(f, 148, 198, 0, 1);

  // Etiqueta final
  const labelFin = ip(f, 198, 222, 0, 1) * (1 - ip(f, 240, 255, 0, 1));

  const pay = ip(f, 248, 285, 0, 1);

  // Anchura de la zona útil: 90 → 950
  const TRACK_W = 760;
  const TRACK_X = 90;
  const TARGET_PX = TRACK_W * 0.52; // "2 semanas" = 52% del track

  return (
    <Stage
      bg="radial-gradient(130% 92% at 50% 44%, #140A02 0%, #080502 80%)"
      hue={AMBER}
      seed={9}
    >
      {/* Label */}
      <div style={{
        position: 'absolute', top: 252, left: 0, right: 0, textAlign: 'center',
        fontFamily: fonts.mono, fontSize: 34, letterSpacing: '0.16em',
        color: 'rgba(255,255,255,0.58)', opacity: labelOp, zIndex: 30,
      }}>
        EL PROYECTO QUE IBA A DURAR 2 SEMANAS
      </div>

      <AbsoluteFill style={{ opacity: 1 - pay }}>

        {/* ── BARRA A (Sin sistema) ── */}
        <div style={{
          position: 'absolute', top: 440, left: TRACK_X,
          opacity: barAIn,
          transform: `translateY(${(1 - barAIn) * 22}px)`,
        }}>
          <div style={{ fontFamily: fonts.mono, fontSize: 28, color: `${AMBER_L}AA`, letterSpacing: '0.10em', marginBottom: 14 }}>
            SIN SISTEMA · ESTIMADO
          </div>
          {/* Track */}
          <div style={{ width: TRACK_W, height: 22, borderRadius: 11, background: 'rgba(255,255,255,0.08)', overflow: 'visible', position: 'relative' }}>
            {/* Barra que crece */}
            <div style={{
              position: 'absolute', top: 0, left: 0,
              width: Math.min(TRACK_W * 1.6, barAProgress * TRACK_W * 1.58),
              height: 22, borderRadius: 11,
              background: `linear-gradient(90deg, ${AMBER} 0%, ${RED} 65%, ${RED} 100%)`,
              boxShadow: `0 0 18px ${RED}66`,
              transition: 'none',
            }} />
            {/* Línea target "2 semanas" */}
            <div style={{
              position: 'absolute', top: -16, left: TARGET_PX,
              width: 3, height: 54, background: `${AMBER_L}CC`,
              borderRadius: 2,
            }} />
          </div>
          {/* Marcadores de tiempo */}
          <div style={{ position: 'relative', width: TRACK_W * 1.5, height: 50, marginTop: 6 }}>
            {[
              { label: '2 sem →', px: TARGET_PX, op: mark2w, color: AMBER_L },
              { label: '3 sem →', px: TRACK_W * 0.75, op: mark3w, color: '#FB923C' },
              { label: '5 sem →', px: TRACK_W * 1.0, op: mark5w, color: RED },
              { label: '8 sem →', px: TRACK_W * 1.35, op: mark8w, color: RED },
            ].map((m) => (
              <div key={m.label} style={{
                position: 'absolute', left: m.px, top: 0,
                opacity: m.op,
                transform: `translateY(${(1 - m.op) * 10}px)`,
              }}>
                <div style={{ fontFamily: fonts.mono, fontSize: 24, color: m.color, whiteSpace: 'nowrap' }}>{m.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── BARRA B (Con sistema) ── */}
        <div style={{
          position: 'absolute', top: 760, left: TRACK_X,
          opacity: barBIn,
          transform: `translateY(${(1 - barBIn) * 22}px)`,
        }}>
          <div style={{ fontFamily: fonts.mono, fontSize: 28, color: `${GREEN}CC`, letterSpacing: '0.10em', marginBottom: 14 }}>
            CON SISTEMA · REAL
          </div>
          <div style={{ width: TRACK_W, height: 22, borderRadius: 11, background: 'rgba(255,255,255,0.08)', position: 'relative' }}>
            <div style={{
              position: 'absolute', top: 0, left: 0,
              width: barBProgress * TARGET_PX,
              height: 22, borderRadius: 11,
              background: `linear-gradient(90deg, ${GREEN}99 0%, ${GREEN} 100%)`,
              boxShadow: `0 0 18px ${GREEN}55`,
            }} />
            {/* Línea target */}
            <div style={{
              position: 'absolute', top: -16, left: TARGET_PX,
              width: 3, height: 54, background: `${AMBER_L}CC`, borderRadius: 2,
            }} />
          </div>
          <div style={{
            marginTop: 18, fontFamily: fonts.display, fontWeight: 700,
            fontSize: 38, color: GREEN,
            opacity: ip(f, 192, 210, 0, 1),
            textShadow: `0 0 20px ${GREEN}88`,
          }}>
            ✓ En tiempo
          </div>
        </div>

        {/* Label final */}
        <div style={{
          position: 'absolute', bottom: 440, left: 0, right: 0, textAlign: 'center',
          opacity: labelFin,
        }}>
          <div style={{
            fontFamily: fonts.display, fontWeight: 600, fontSize: 42,
            color: AMBER_L, textShadow: `0 0 24px ${AMBER}88`,
          }}>
            Tu cerebro es optimista. Los sistemas no.
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
          <BigType frame={f} s={248} size={90} lines={[
            { t: 'El 80% de los' },
            { t: 'proyectos terminan tarde.' },
            { t: 'Los sistemas no', hl: false },
            { t: 'tienen sesgo.', hl: true },
          ]} />
          <div style={{
            fontFamily: fonts.display, fontWeight: 400, fontSize: 38, color: '#9A9AB5',
            marginTop: 30, opacity: ip(f, 292, 310, 0, 1),
          }}>
            Automatizá lo que tu optimismo subestima.
          </div>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};
