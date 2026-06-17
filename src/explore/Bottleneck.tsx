/**
 * Bottleneck — guión BRILLANTE que vende a Concepto (estándar Conveyor).
 * Insight contraintuitivo: "tu empresa funciona porque VOS estás → eso es un empleo,
 * no una empresa". Vende automatización/sistemas (que funcione sin vos = lo de Concepto).
 * Mecanismo que lo ENCARNA: todo orbita alrededor de "VOS"; cuando te vas, se congela.
 *
 * Reglas Bruno horneadas: SLOW + labels grandes + cierre con hold. src/explore/.
 */
import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from 'remotion';
import { fontDisplay, fontMono } from '../brand/fonts';

const VLT = '#7C3AED';
const VLT_L = '#A855F7';
const EASE = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;
const APPLE = Easing.bezier(0.16, 1, 0.3, 1);
const ip = (f: number, a: number, b: number, x: number, y: number, e: (t: number) => number = APPLE) =>
  interpolate(f, [a, b], [x, y], { ...EASE, easing: e });

const TASKS = ['Responder', 'Cotizar', 'Facturar', 'Seguir al cliente', 'Agendar', 'Aprobar todo'];
const CX = 540, CY = 760, R = 330;

const SLOW = 1.15; // apenitas más lento, siempre (regla Bruno)
export const BOTTLENECK_DURATION = Math.round(320 * SLOW);

export const Bottleneck: React.FC = () => {
  const f = useCurrentFrame() / SLOW;
  const appear = ip(f, 0, 24, 0, 1);
  const rot = Math.min(f, 104) * 0.009;          // orbita mientras estás; se congela al irte
  const leave = ip(f, 100, 144, 0, 1);            // VOS se va → todo se congela y se apaga
  const sceneOut = 1 - ip(f, 150, 176, 0, 1);
  const stmt = ip(f, 156, 186, 0, 1) * (1 - ip(f, 214, 230, 0, 1));
  const pay = ip(f, 222, 256, 0, 1);
  const pulse = 0.6 + 0.4 * Math.sin(f * 0.16) * (1 - leave);

  const pts = TASKS.map((t, i) => {
    const th = rot + (i * Math.PI * 2) / TASKS.length;
    return { t, x: CX + R * Math.cos(th), y: CY + R * Math.sin(th) };
  });

  return (
    <AbsoluteFill style={{ background: 'radial-gradient(120% 90% at 50% 40%, #14101F 0%, #06050B 78%)', fontFamily: fontDisplay }}>
      <div style={{ position: 'absolute', top: 120, left: 0, right: 0, textAlign: 'center', fontFamily: fontMono, fontSize: 31, fontWeight: 500, letterSpacing: '0.14em', color: 'rgba(255,255,255,0.66)', opacity: ip(f, 6, 24, 0, 1) * sceneOut }}>
        TU EMPRESA, HOY
      </div>

      {/* ESCENA orbital (se desvanece antes del statement) */}
      <AbsoluteFill style={{ opacity: sceneOut * appear }}>
        {/* líneas de dependencia center→tarea */}
        <svg width="1080" height="1920" style={{ position: 'absolute', inset: 0 }}>
          {pts.map((p, i) => (
            <line key={i} x1={CX} y1={CY} x2={p.x} y2={p.y} stroke={leave > 0.5 ? '#3A3A46' : VLT} strokeWidth={2} opacity={(1 - leave * 0.7) * 0.7} />
          ))}
        </svg>

        {/* tareas orbitando */}
        {pts.map((p, i) => {
          const a = ip(f, 16 + i * 4, 32 + i * 4, 0, 1);
          const gray = leave;
          return (
            <div key={i} style={{ position: 'absolute', left: p.x, top: p.y, transform: 'translate(-50%,-50%)', opacity: a * (1 - leave * 0.45) }}>
              <div style={{ padding: '16px 26px', borderRadius: 100, background: gray > 0.5 ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.07)', border: `1px solid ${gray > 0.5 ? 'rgba(255,255,255,0.1)' : VLT + '66'}`, backdropFilter: 'blur(10px)', fontFamily: fontDisplay, fontWeight: 600, fontSize: 32, color: gray > 0.5 ? '#6A6A78' : '#EDEAF7', whiteSpace: 'nowrap', filter: `saturate(${1 - gray})` }}>{p.t}</div>
            </div>
          );
        })}

        {/* centro: VOS (se va) */}
        <div style={{ position: 'absolute', left: CX, top: CY, transform: `translate(-50%,-50%) scale(${(0.9 + pulse * 0.12)})`, opacity: 1 - leave }}>
          <div style={{ position: 'absolute', inset: -40, borderRadius: '50%', background: `radial-gradient(circle, ${VLT}, transparent 68%)`, filter: 'blur(28px)', opacity: 0.6 * (1 - leave) }} />
          <div style={{ width: 200, height: 200, borderRadius: '50%', background: `linear-gradient(135deg, ${VLT}, ${VLT_L})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: fontDisplay, fontWeight: 800, fontSize: 64, color: '#fff', boxShadow: `0 30px 90px -20px ${VLT}` }}>VOS</div>
        </div>
        {/* hueco vacío cuando VOS se fue */}
        <div style={{ position: 'absolute', left: CX, top: CY, transform: 'translate(-50%,-50%)', width: 200, height: 200, borderRadius: '50%', border: '2px dashed #3A3A46', opacity: leave * 0.9 }} />
      </AbsoluteFill>

      {/* STATEMENT (centrado — layout que prefiere Bruno) */}
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 70px', opacity: stmt }}>
        <div style={{ fontFamily: fontDisplay, fontWeight: 800, fontSize: 88, letterSpacing: '-0.04em', lineHeight: 1.05, color: '#F2F0FA' }}>
          <div style={{ opacity: ip(f, 158, 180, 0, 1), transform: `translateY(${(1 - ip(f, 158, 180, 0, 1)) * 22}px)` }}>Funciona porque</div>
          <div style={{ opacity: ip(f, 166, 188, 0, 1), transform: `translateY(${(1 - ip(f, 166, 188, 0, 1)) * 22}px)` }}>vos estás.</div>
          <div style={{ color: VLT_L, fontSize: 80, marginTop: 22, opacity: ip(f, 182, 206, 0, 1), transform: `translateY(${(1 - ip(f, 182, 206, 0, 1)) * 22}px)`, textShadow: `0 0 34px ${VLT}66` }}>Eso no es una empresa.<br />Es un empleo.</div>
        </div>
      </AbsoluteFill>

      {/* PAYOFF — vende a Concepto (centrado, hold largo) */}
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 70px', opacity: pay }}>
        <div style={{ fontFamily: fontMono, fontSize: 30, fontWeight: 500, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.6)', marginBottom: 26, opacity: ip(f, 224, 242, 0, 1) }}>CONCEPTO DEVELOPMENT</div>
        <div style={{ fontFamily: fontDisplay, fontWeight: 800, fontSize: 90, letterSpacing: '-0.04em', lineHeight: 1.06, color: '#F2F0FA', transform: `translateY(${(1 - pay) * 24}px)` }}>
          Construimos la empresa<br />que funciona <span style={{ color: VLT_L, textShadow: `0 0 30px ${VLT}66` }}>sin vos</span>.
        </div>
        <div style={{ fontFamily: fontDisplay, fontWeight: 500, fontSize: 34, color: '#9A96AC', marginTop: 30, opacity: ip(f, 250, 272, 0, 1) }}>Sistemas y agentes que no duermen, no renuncian, no se olvidan.</div>
      </AbsoluteFill>

      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 8, background: `linear-gradient(90deg, ${VLT}, ${VLT_L})` }} />
    </AbsoluteFill>
  );
};
