/**
 * CurvaConfianza — Dunning-Kruger Effect. Una línea de curva sube rápido al "Pico de
 * confianza" ("3 videos vistos"), luego cae al "Valle de la desesperación", y sube
 * lentamente a la "Competencia real". El espectador reconoce el pico — lo vivió.
 * El glow Siri ilumina el punto de "competencia real".
 *
 * Lever: Dunning-Kruger (overconfidence gap in expertise). Paleta: violeta-cyan. C.
 */
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { Stage, SiriFrame, BigType, ip, fonts, VLT, VLT_L } from './kit';

export const CURVACONFIANZA_DURATION = 322;

const CYAN = '#4FE0FF';

// Puntos de la curva Dunning-Kruger normalizados (x 0-1, y 0-1, y=1 es arriba)
const CURVE_POINTS = [
  [0, 0.05],     // origen
  [0.08, 0.10],  // empieza a subir
  [0.22, 0.80],  // ramp-up rápido
  [0.30, 0.96],  // PICO (máxima confianza)
  [0.44, 0.60],  // bajando
  [0.52, 0.22],  // VALLE (desesperación)
  [0.60, 0.28],  // inicio subida real
  [0.72, 0.45],  // subida lenta
  [0.84, 0.60],  // iluminación
  [0.92, 0.72],  // maestría
  [1.00, 0.78],  // competencia real
];

function getY(x: number) {
  for (let i = 0; i < CURVE_POINTS.length - 1; i++) {
    const [x0, y0] = CURVE_POINTS[i];
    const [x1, y1] = CURVE_POINTS[i + 1];
    if (x >= x0 && x <= x1) {
      const t = (x - x0) / (x1 - x0);
      return y0 + (y1 - y0) * t;
    }
  }
  return CURVE_POINTS[CURVE_POINTS.length - 1][1];
}

export const CurvaConfianza: React.FC = () => {
  const f = useCurrentFrame();

  const labelOp = ip(f, 8, 28, 0, 1) * (1 - ip(f, 242, 260, 0, 1));

  // Cuánto de la curva está dibujado (0..1)
  const drawP = ip(f, 22, 160, 0, 1);
  const glowReal = ip(f, 155, 190, 0, 1); // glow en punto de competencia real

  // Etiquetas del eje
  const axis = ip(f, 18, 45, 0, 1);

  // Labels en los puntos clave
  const labelPico = ip(f, 75, 98, 0, 1) * (1 - ip(f, 242, 258, 0, 1));
  const labelValle = ip(f, 108, 128, 0, 1) * (1 - ip(f, 242, 258, 0, 1));
  const labelReal = ip(f, 162, 185, 0, 1) * (1 - ip(f, 242, 258, 0, 1));

  const pay = ip(f, 248, 285, 0, 1);

  // Área del gráfico en canvas 1080×1920
  const GX = 90;   // left
  const GY = 340;  // top
  const GW = 860;  // ancho
  const GH = 820;  // alto (curva ocupa esto)

  // Generar path SVG de la curva
  const STEPS = 200;
  let path = '';
  let drawnPts: Array<{ x: number; y: number }> = [];
  for (let i = 0; i <= STEPS; i++) {
    const t = i / STEPS;
    if (t > drawP) break;
    const gx = GX + t * GW;
    const gy = GY + GH - getY(t) * GH;
    if (i === 0) path += `M ${gx} ${gy}`;
    else path += ` L ${gx} ${gy}`;
    drawnPts.push({ x: gx, y: gy });
  }

  const lastPt = drawnPts[drawnPts.length - 1] ?? { x: GX, y: GY + GH };
  const picoX = GX + 0.30 * GW;
  const picoY = GY + GH - getY(0.30) * GH;
  const valleX = GX + 0.52 * GW;
  const valleY = GY + GH - getY(0.52) * GH;
  const realX = GX + 1.0 * GW;
  const realY = GY + GH - getY(1.0) * GH;

  return (
    <Stage
      bg="radial-gradient(130% 92% at 50% 44%, #0E0A1A 0%, #060408 80%)"
      hue={VLT}
      seed={5}
    >
      {/* Label */}
      <div style={{
        position: 'absolute', top: 252, left: 0, right: 0, textAlign: 'center',
        fontFamily: fonts.mono, fontSize: 33, letterSpacing: '0.16em',
        color: 'rgba(255,255,255,0.56)', opacity: labelOp, zIndex: 30,
      }}>
        LA CURVA DE DUNNING-KRUGER
      </div>

      <AbsoluteFill style={{ opacity: 1 - pay }}>
        <svg
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
          viewBox="0 0 1080 1920"
        >
          {/* Ejes */}
          <line x1={GX} y1={GY + GH} x2={GX + GW + 20} y2={GY + GH}
            stroke="rgba(255,255,255,0.18)" strokeWidth={2} opacity={axis} />
          <line x1={GX} y1={GY} x2={GX} y2={GY + GH + 20}
            stroke="rgba(255,255,255,0.18)" strokeWidth={2} opacity={axis} />

          {/* La curva */}
          {path && (
            <>
              {/* Glow de la curva */}
              <path d={path} fill="none"
                stroke={VLT_L} strokeWidth={12} opacity={0.25}
                strokeLinecap="round" strokeLinejoin="round"
                style={{ filter: 'blur(8px)' }}
              />
              {/* Línea principal */}
              <path d={path} fill="none"
                stroke={VLT_L} strokeWidth={4} opacity={0.9}
                strokeLinecap="round" strokeLinejoin="round"
              />
            </>
          )}

          {/* Punto activo (cabeza de la curva) */}
          {drawnPts.length > 0 && (
            <circle cx={lastPt.x} cy={lastPt.y} r={10}
              fill={VLT_L} opacity={0.9}
              style={{ filter: `drop-shadow(0 0 8px ${VLT_L})` }}
            />
          )}

          {/* Punto PICO */}
          {drawP > 0.30 && (
            <circle cx={picoX} cy={picoY} r={14}
              fill={VLT_L} opacity={labelPico * 0.9}
              style={{ filter: `drop-shadow(0 0 12px ${VLT_L})` }}
            />
          )}

          {/* Punto VALLE */}
          {drawP > 0.52 && (
            <circle cx={valleX} cy={valleY} r={12}
              fill="#9CA3AF" opacity={labelValle * 0.8}
            />
          )}

          {/* Punto REAL con glow Siri */}
          {drawP > 0.95 && (
            <>
              <circle cx={realX} cy={realY} r={20}
                fill={CYAN} opacity={glowReal * 0.85}
                style={{ filter: `drop-shadow(0 0 20px ${CYAN})` }}
              />
              <circle cx={realX} cy={realY} r={9}
                fill={CYAN} opacity={glowReal}
              />
            </>
          )}
        </svg>

        {/* Ejes labels */}
        <div style={{ position: 'absolute', left: GX, top: GY + GH + 18, opacity: axis }}>
          <div style={{ fontFamily: fonts.mono, fontSize: 28, color: 'rgba(255,255,255,0.42)', letterSpacing: '0.08em' }}>
            EXPERIENCIA →
          </div>
        </div>
        <div style={{
          position: 'absolute', left: GX - 28, top: GY + GH / 2,
          opacity: axis,
          transform: 'rotate(-90deg) translateX(50%)',
          transformOrigin: 'left center',
        }}>
          <div style={{ fontFamily: fonts.mono, fontSize: 26, color: 'rgba(255,255,255,0.42)', letterSpacing: '0.08em', whiteSpace: 'nowrap' }}>
            ↑ CONFIANZA
          </div>
        </div>

        {/* Label PICO */}
        <div style={{
          position: 'absolute', left: picoX - 180, top: picoY - 80,
          opacity: labelPico,
          transform: `translateY(${(1 - labelPico) * -10}px)`,
        }}>
          <div style={{
            background: `${VLT}2A`, border: `1px solid ${VLT_L}55`,
            borderRadius: 18, padding: '10px 22px',
            fontFamily: fonts.display, fontWeight: 700, fontSize: 30,
            color: VLT_L, textAlign: 'center',
          }}>
            "3 videos vistos"<br />
            <span style={{ fontWeight: 400, fontSize: 24, color: `${VLT_L}88` }}>Pico de confianza</span>
          </div>
        </div>

        {/* Label VALLE */}
        <div style={{
          position: 'absolute', left: valleX - 150, top: valleY + 22,
          opacity: labelValle,
          transform: `translateY(${(1 - labelValle) * 10}px)`,
        }}>
          <div style={{
            background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: 18, padding: '10px 22px',
            fontFamily: fonts.display, fontWeight: 600, fontSize: 28,
            color: 'rgba(255,255,255,0.52)', textAlign: 'center',
          }}>
            "¿Por qué no funciona?"<br />
            <span style={{ fontWeight: 400, fontSize: 22, color: 'rgba(255,255,255,0.32)' }}>Valle de la desesperación</span>
          </div>
        </div>

        {/* Label REAL */}
        <div style={{
          position: 'absolute', left: realX - 280, top: realY - 80,
          opacity: labelReal,
          transform: `translateY(${(1 - labelReal) * -10}px)`,
        }}>
          <div style={{
            background: `${CYAN}18`, border: `1px solid ${CYAN}55`,
            borderRadius: 18, padding: '10px 22px',
            fontFamily: fonts.display, fontWeight: 700, fontSize: 30,
            color: CYAN, textAlign: 'center',
          }}>
            "2 años de práctica"<br />
            <span style={{ fontWeight: 400, fontSize: 24, color: `${CYAN}88` }}>Competencia real</span>
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
            { t: 'Después de 3 reels,' },
            { t: 'todos son expertos.' },
            { t: 'Después de 2 años,', hl: false },
            { t: 'empiezan a serlo.', hl: true },
          ]} />
          <div style={{
            fontFamily: fonts.display, fontWeight: 400, fontSize: 38, color: '#9A9AB5',
            marginTop: 30, opacity: ip(f, 294, 315, 0, 1),
          }}>
            La diferencia entre saber y creer que sabés puede costar tu negocio.
          </div>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};
