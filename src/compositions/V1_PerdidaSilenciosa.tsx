/**
 * V1 — "La pérdida silenciosa" (Loss Aversion).
 *
 * ── GUION (Capa 1 — persuasión) ─────────────────────────────────────────────
 * A QUIÉN: director PyME Uruguay 40–60. OBJECIÓN que crush: "no pasa nada si
 *   tardo en responder". LEVER: Loss Aversion (perder duele 2.5×).
 * PROMESA: con MAX ninguna consulta queda sin responder → ninguna venta se pierde.
 * CTA: "Hablemos de tu proyecto".
 * BEATS (cámara viaja sin cortar por un mundo 2.5D):
 *   1 CAOS  → mensajes sin responder se acumulan. HOOK <1.5s.
 *   2 DATO  → 47h promedio en responder un lead (la pérdida, NIVEL 1).
 *   3 ALIVIO→ MAX: una notificación se expande y revela el dashboard resuelto.
 *   4 RESULTADO → la curva de oportunidades pasa de plana a crecer.
 *   5 CTA   → marca + "Hablemos de tu proyecto".
 *
 * ── MOTION (Capa 2) ─────────────────────────────────────────────────────────
 * Una sola cámara continua recorre el mundo. Parallax por capas. Sin hard-cuts.
 */
import React from 'react';
import { AbsoluteFill } from 'remotion';
import {
  Camera,
  Layer,
  World,
  useCamera,
  SUBTLE_DRIFT,
  DepthGrid,
  GlowOrb,
  Particles,
  beats,
  totalFrames,
  type CamKey,
} from '../engine';
import { BrandProvider, concepto, type Brand } from '../brand';
import {
  FullBg,
  UIChrome,
  ChaosMessages,
  KineticHeadline,
  MetricCounter,
  UIReveal,
  ChartMorph,
  CTAEnd,
} from '../scenes';

// ── Timeline: beats solapados (3–5s c/u) ─────────────────────────────────────
const [S1, S2, S3, S4, S5] = beats([155, 150, 165, 140, 150], 30);
export const V1_DURATION = totalFrames([S1, S2, S3, S4, S5]); // ≈ 640f / 21s

// ── Posiciones en el MUNDO (la cámara las recorre) ───────────────────────────
const P = {
  hook: { x: 0, y: -560 },
  chaos: { x: 0, y: 120 },
  metric: { x: 1180, y: 760 },
  ui: { x: 1120, y: 1820 },
  chart: { x: -160, y: 2820 },
  cta: { x: 0, y: 3820 },
};

// ── Camera path: una curva continua que visita cada beat ─────────────────────
const CAM: CamKey[] = [
  { frame: S1.from, x: 0, y: -150, zoom: 0.92 },
  { frame: S1.to - 10, x: 0, y: -40, zoom: 0.98 },
  { frame: S2.from + 40, x: P.metric.x, y: P.metric.y, zoom: 0.9 },
  { frame: S2.to - 5, x: P.metric.x, y: P.metric.y + 30, zoom: 0.95 },
  { frame: S3.from + 45, x: P.ui.x, y: P.ui.y, zoom: 1.12 },
  { frame: S3.to - 5, x: P.ui.x, y: P.ui.y + 20, zoom: 1.16 },
  { frame: S4.from + 45, x: P.chart.x, y: P.chart.y, zoom: 0.98 },
  { frame: S4.to - 5, x: P.chart.x + 30, y: P.chart.y, zoom: 1.02 },
  { frame: S5.from + 45, x: P.cta.x, y: P.cta.y, zoom: 0.95 },
  { frame: V1_DURATION, x: 0, y: P.cta.y + 40, zoom: 0.98 },
];

export const V1_PerdidaSilenciosa: React.FC<{ brand?: Brand }> = ({ brand = concepto }) => {
  const cam = useCamera(CAM, { drift: SUBTLE_DRIFT });
  return (
    <BrandProvider brand={brand}>
      <AbsoluteFill style={{ background: '#000' }}>
        <Camera cam={cam} anchor={{ x: 0, y: 1200 }}>
          {/* fondo de pantalla fijo (profundidad) */}
          <FullBg />

          {/* capa de fondo lejano: grilla (parallax lento) */}
          <Layer depth={0.16}>
            <World x={300} y={1500}>
              <DepthGrid w={2600} h={4800} color="rgba(168,85,247,0.12)" />
            </World>
          </Layer>

          {/* glows por beat (parallax medio) */}
          <Layer depth={0.42}>
            <World x={P.chaos.x} y={P.chaos.y}><GlowOrb size={900} color="rgba(124,58,237,0.5)" opacity={0.5} /></World>
            <World x={P.metric.x} y={P.metric.y}><GlowOrb size={1000} color="rgba(124,58,237,0.55)" opacity={0.5} /></World>
            <World x={P.ui.x} y={P.ui.y}><GlowOrb size={900} color="rgba(124,58,237,0.45)" opacity={0.45} /></World>
            <World x={P.chart.x} y={P.chart.y}><GlowOrb size={900} color="rgba(124,58,237,0.45)" opacity={0.45} /></World>
            <World x={P.cta.x} y={P.cta.y}><GlowOrb size={1100} color="rgba(124,58,237,0.5)" opacity={0.5} /></World>
          </Layer>

          {/* PLANO FOCAL: las scenes */}
          <Layer depth={1}>
            <KineticHeadline
              at={P.hook}
              frames={S1}
              words={[
                { t: 'Ninguna' }, { t: 'venta' }, { t: 'se' }, { t: 'pierde', br: true },
                { t: 'de' }, { t: 'golpe.' },
              ]}
              size={88}
              maxWidth={820}
            />
            <ChaosMessages
              at={P.chaos}
              frames={S1}
              messages={[
                { text: '¿Cuánto sale?' },
                { text: 'Hola, ¿siguen atendiendo?' },
                { text: 'Necesito una cotización' },
                { text: '¿Tienen stock?' },
                { text: 'Quiero más info' },
              ]}
            />

            <MetricCounter
              at={P.metric}
              frames={S2}
              value={47}
              suffix="h"
              label="es lo que tarda una empresa promedio en responder un lead. El 78% elige al primero que contesta."
              size={360}
            />

            <UIReveal
              at={P.ui}
              frames={S3}
              compactLabel="MAX respondió en 4 segundos"
              title="MAX · esta noche"
              rows={['Respondió 47 consultas', 'Calificó 6 leads', 'Agendó 2 reuniones']}
            />

            <ChartMorph at={P.chart} frames={S4} title="Oportunidades atendidas" />

            <CTAEnd at={P.cta} frames={S5} />
          </Layer>

          {/* primer plano: partículas (parallax rápido, "volar a través") */}
          <Layer depth={1.4}>
            <World x={300} y={1500}>
              <Particles w={2400} h={4600} count={46} color="rgba(216,180,254,0.5)" seed="v1" />
            </World>
          </Layer>

          {/* chrome de pantalla fija */}
          <UIChrome />
        </Camera>
      </AbsoluteFill>
    </BrandProvider>
  );
};
