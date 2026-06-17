/**
 * Autopilot — pieza ASPIRACIONAL / mostrar-el-producto (intención nueva, no experimento).
 * Un panel premium EN VIVO: el negocio del cliente funcionando SOLO (leads respondidos,
 * pedidos facturados, seguimientos enviados) con ✓ verdes, calmo y satisfactorio, mientras
 * el dueño está afuera. Tono calmo (lo opuesto a Overload). Diseño vía /ui-ux-pro-max:
 * Dark OLED slate + verde, números mono tabulares, estética dashboard de operaciones.
 * Vende: automatización de Concepto. Visuales 100% nuevas.
 */
import React from 'react';
import { AbsoluteFill } from 'remotion';
import { ip, useF, dur, fonts } from './lib';

const BG = '#020617', SURF = '#0E1626', BORDER = '#243049', TXT = '#F1F5F9', MUT = '#8A97AD', GREEN = '#22C55E';
const FEED = [
  { t: 'Lead nuevo respondido', m: 'en 9 s' },
  { t: 'Pedido #1042 facturado', m: 'auto' },
  { t: 'Seguimiento enviado a Diego', m: 'auto' },
  { t: 'Reunión agendada · mañana 10:00', m: 'auto' },
  { t: 'Cliente inactivo reactivado', m: 'auto' },
  { t: 'Reporte del día listo', m: 'auto' },
];
const BASE = 410;
export const AUTOPILOT_DURATION = dur(BASE);

const Tick: React.FC<{ f: number; to: number; at: number; label: string }> = ({ f, to, at, label }) => {
  const v = Math.round(ip(f, at, at + 50, 0, to));
  const a = ip(f, at - 6, at + 10, 0, 1);
  return (
    <div style={{ flex: 1, background: SURF, border: `1px solid ${BORDER}`, borderRadius: 22, padding: '26px 24px', opacity: a, transform: `translateY(${(1 - a) * 18}px)` }}>
      <div style={{ fontFamily: fonts.mono, fontSize: 40, fontWeight: 600, color: TXT, fontFeatureSettings: '"tnum"' }}>{v}</div>
      <div style={{ fontFamily: fonts.display, fontSize: 24, color: MUT, marginTop: 6, lineHeight: 1.2 }}>{label}</div>
    </div>
  );
};

export const Autopilot: React.FC = () => {
  const f = useF();
  const dash = ip(f, 200, 226, 1, 0);          // el panel se va al cierre
  const pay = ip(f, 214, 246, 0, 1);
  const pulse = 0.55 + 0.45 * Math.abs(Math.sin(f * 0.13));

  return (
    <AbsoluteFill style={{ background: `radial-gradient(120% 80% at 50% 0%, #0A1426 0%, ${BG} 70%)`, fontFamily: fonts.display }}>
      {/* PANEL EN VIVO */}
      <AbsoluteFill style={{ padding: 70, justifyContent: 'center', opacity: dash }}>
        <div style={{ background: 'rgba(10,16,30,0.6)', border: `1px solid ${BORDER}`, borderRadius: 34, padding: 40, boxShadow: '0 50px 120px -40px rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)' }}>
          {/* header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 30, opacity: ip(f, 4, 20, 0, 1) }}>
            <div style={{ fontFamily: fonts.display, fontWeight: 700, fontSize: 36, color: TXT, letterSpacing: '-0.02em' }}>Tu negocio</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontFamily: fonts.mono, fontSize: 24, color: GREEN, background: 'rgba(34,197,94,0.1)', border: `1px solid ${GREEN}55`, padding: '10px 20px', borderRadius: 100 }}>
              <span style={{ width: 12, height: 12, borderRadius: '50%', background: GREEN, opacity: pulse, boxShadow: `0 0 12px ${GREEN}` }} />EN AUTOMÁTICO
            </div>
          </div>
          {/* métricas que tickean */}
          <div style={{ display: 'flex', gap: 18, marginBottom: 30 }}>
            <Tick f={f} to={47} at={30} label="leads atendidos" />
            <Tick f={f} to={31} at={40} label="pedidos procesados" />
            <Tick f={f} to={58} at={50} label="seguimientos" />
          </div>
          {/* feed de actividad (todo hecho solo) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {FEED.map((it, i) => {
              const at = 60 + i * 17;
              const a = ip(f, at, at + 14, 0, 1);
              if (a <= 0.01) return null;
              return (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 18, padding: '18px 22px', background: SURF, border: `1px solid ${BORDER}`, borderRadius: 18, opacity: a, transform: `translateX(${(1 - a) * 24}px)` }}>
                  <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(34,197,94,0.14)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: GREEN, fontSize: 24, fontWeight: 800, flexShrink: 0 }}>✓</div>
                  <div style={{ flex: 1, fontFamily: fonts.display, fontWeight: 500, fontSize: 30, color: TXT, letterSpacing: '-0.01em' }}>{it.t}</div>
                  <div style={{ fontFamily: fonts.mono, fontSize: 22, color: MUT }}>{it.m}</div>
                </div>
              );
            })}
          </div>
          {/* estado: vos afuera, todo sigue */}
          <div style={{ marginTop: 26, textAlign: 'center', fontFamily: fonts.mono, fontSize: 24, color: MUT, opacity: ip(f, 150, 172, 0, 1) }}>
            vos: fuera hace 3 h · <span style={{ color: GREEN }}>todo bajo control</span>
          </div>
        </div>
      </AbsoluteFill>

      {/* PAYOFF aspiracional (hold largo) */}
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 80px', opacity: pay }}>
        <div style={{ position: 'absolute', left: '50%', top: '42%', width: 900, height: 900, transform: 'translate(-50%,-50%)', borderRadius: '50%', background: `radial-gradient(circle, ${GREEN}22 0%, transparent 64%)`, filter: 'blur(50px)', opacity: pulse }} />
        <div style={{ transform: `translateY(${(1 - pay) * 24}px)` }}>
          <div style={{ fontFamily: fonts.mono, fontSize: 30, fontWeight: 500, letterSpacing: '0.12em', color: MUT, marginBottom: 26 }}>MIENTRAS VOS VIVÍAS</div>
          <div style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: 92, letterSpacing: '-0.04em', lineHeight: 1.05, color: TXT }}>Tu negocio<br />trabajó <span style={{ color: GREEN, textShadow: `0 0 34px ${GREEN}66` }}>solo</span>.</div>
          <div style={{ fontFamily: fonts.display, fontWeight: 500, fontSize: 34, color: MUT, marginTop: 30, opacity: ip(f, 244, 268, 0, 1) }}>Concepto automatiza tu negocio. Vos hacés el resto de tu vida.</div>
        </div>
      </AbsoluteFill>

      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 8, background: `linear-gradient(90deg, ${GREEN}, #4ADE80)` }} />
    </AbsoluteFill>
  );
};
