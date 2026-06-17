/**
 * Overload — EXPERIMENTO sobre el espectador que VENDE automatización (servicio de
 * Concepto). Le caen como lluvia todos los eventos del negocio (pedidos, consultas,
 * pagos) cada vez más rápido y le pedimos seguirlos/contarlos → NO PUEDE. Lo SIENTE.
 * Revelación → "tu cabeza no es un sistema" → la automatización sí. Visuales nuevas:
 * lluvia de chips que se acumulan. Vende: automatización de negocios.
 */
import React from 'react';
import { AbsoluteFill } from 'remotion';
import { Stage, SiriFrame, Label, ip, useF, dur, fonts, VLT, VLT_L } from './lib';

const TYPES = ['Nuevo pedido', 'Consulta', 'Reserva', 'Pago recibido', 'Mensaje', 'Cotización'];
const N = 20;
const BASE = 400;
export const OVERLOAD_DURATION = dur(BASE);

export const Overload: React.FC = () => {
  const f = useF();
  const floodEnd = 28 + N * 5; // ~128
  const ask = ip(f, floodEnd + 6, floodEnd + 28, 0, 1) * (1 - ip(f, floodEnd + 52, floodEnd + 66, 0, 1));
  const reveal = ip(f, floodEnd + 70, floodEnd + 100, 0, 1) * (1 - ip(f, floodEnd + 140, floodEnd + 156, 0, 1));
  const sceneOut = 1 - ip(f, floodEnd + 6, floodEnd + 26, 0, 1);
  const pay = ip(f, floodEnd + 168, floodEnd + 198, 0, 1);
  const counted = Math.min(N, Math.round(ip(f, floodEnd + 74, floodEnd + 104, 0, N)));

  return (
    <Stage bg="radial-gradient(120% 95% at 50% 42%, #15101F 0%, #06050B 78%)" hue={VLT} seed={9}>
      <Label frame={f} s={6} text="TODO LO QUE ENTRA A TU NEGOCIO. SEGUILO." outAt={floodEnd - 4} />

      {/* LA LLUVIA de eventos (se acumulan, cada vez más rápido) */}
      <AbsoluteFill style={{ opacity: sceneOut }}>
        {Array.from({ length: N }).map((_, i) => {
          const at = 28 + i * 5;                 // entran cada vez (ritmo constante = mucho)
          const a = ip(f, at, at + 8, 0, 1);
          if (a <= 0.01) return null;
          const x = 12 + ((i * 53) % 74);        // posición determinística
          const y = 20 + ((i * 37) % 58);
          const t = TYPES[i % TYPES.length];
          return (
            <div key={i} style={{ position: 'absolute', left: `${x}%`, top: `${y}%`, transform: `translate(-50%,-50%) scale(${0.6 + a * 0.4})`, opacity: a * 0.92 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 22px', borderRadius: 100, background: 'rgba(255,255,255,0.06)', border: `1px solid ${VLT}55`, backdropFilter: 'blur(8px)', fontFamily: fonts.display, fontWeight: 600, fontSize: 30, color: '#EDEAF7', whiteSpace: 'nowrap', boxShadow: `0 12px 30px -12px ${VLT}88` }}>
                <span style={{ width: 12, height: 12, borderRadius: '50%', background: VLT_L, boxShadow: `0 0 10px ${VLT_L}` }} />{t}
              </div>
            </div>
          );
        })}
      </AbsoluteFill>

      {/* PREGUNTA */}
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 70px', opacity: ask }}>
        <div style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: 80, letterSpacing: '-0.04em', lineHeight: 1.06, color: '#F2F0FA' }}>¿Cuántos entraron?<br />¿Cuál no <span style={{ color: VLT_L }}>atendiste</span>?</div>
      </AbsoluteFill>

      {/* REVELACIÓN: el número real (no lo seguiste) */}
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center', opacity: reveal }}>
        <div>
          <div style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: 220, letterSpacing: '-0.05em', color: VLT_L, textShadow: `0 0 60px ${VLT}88`, lineHeight: 1 }}>{counted}</div>
          <div style={{ fontFamily: fonts.mono, fontSize: 34, color: '#9A96AC' }}>entraron. perdiste la cuenta.</div>
        </div>
      </AbsoluteFill>

      {/* PAYOFF — vende automatización (hold largo) */}
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 70px', opacity: pay }}>
        <SiriFrame frame={f} intensity={pay} />
        <div style={{ transform: `translateY(${(1 - pay) * 24}px)` }}>
          <div style={{ fontFamily: fonts.mono, fontSize: 30, fontWeight: 500, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.6)', marginBottom: 24 }}>TU CABEZA NO ES UN SISTEMA</div>
          <div style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: 80, letterSpacing: '-0.04em', lineHeight: 1.06, color: '#F2F0FA' }}>Un sistema no se<br /><span style={{ color: VLT_L, textShadow: `0 0 30px ${VLT}` }}>distrae</span>. No se olvida.</div>
          <div style={{ fontFamily: fonts.display, fontWeight: 500, fontSize: 34, color: '#9A96AC', marginTop: 30, opacity: ip(f, floodEnd + 196, floodEnd + 220, 0, 1) }}>En Concepto automatizamos tu negocio. Nada se te vuelve a escapar.</div>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};
