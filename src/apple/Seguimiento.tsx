/**
 * Seguimiento — mecanismo NUEVO. Tema: la plata está en el seguimiento (follow-up
 * neglect / costo de oportunidad). El 80% no compra en el primer mensaje. El
 * espectador VIVE el contraste en dos vías paralelas: misma consulta, mismo primer
 * mensaje. Izquierda (sin seguimiento): queda muerta → venta perdida. Derecha (con
 * seguimiento automático): salen solos los toques 2-3-4 → el cliente responde y
 * compra. Vende: automatización de seguimiento de leads. Paleta: dorado.
 */
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { Stage, BigType, ip, APPLE, fonts } from './kit';

const GOLD = '#E8B85B';

type Row =
  | { kind: 'msg'; who: 'you' | 'them' | 'auto'; t: string; tag?: string; at: number }
  | { kind: 'day'; t: string; at: number }
  | { kind: 'end'; win: boolean; t: string; at: number };

const LEFT: Row[] = [
  { kind: 'msg', who: 'you', t: 'Te paso el presupuesto', at: 42 },
  { kind: 'day', t: 'Día 2 · silencio', at: 86 },
  { kind: 'day', t: 'Día 5 · silencio', at: 118 },
  { kind: 'end', win: false, t: 'Venta perdida', at: 156 },
];

const RIGHT: Row[] = [
  { kind: 'msg', who: 'you', t: 'Te paso el presupuesto', at: 42 },
  { kind: 'msg', who: 'auto', t: '¿Lo pudiste ver?', tag: 'Día 2 · automático', at: 78 },
  { kind: 'msg', who: 'auto', t: 'Te dejo un ejemplo', tag: 'Día 4 · automático', at: 104 },
  { kind: 'msg', who: 'auto', t: '¿Avanzamos?', tag: 'Día 6 · automático', at: 130 },
  { kind: 'msg', who: 'them', t: 'Dale, lo confirmo 🙌', at: 162 },
  { kind: 'end', win: true, t: 'Venta confirmada', at: 188 },
];

const COL_W = 462;

const RowView: React.FC<{ row: Row; frame: number }> = ({ row, frame }) => {
  const p = ip(frame, row.at, row.at + 22, 0, 1, APPLE);
  if (p <= 0.001) return null;
  const rise = { opacity: p, transform: `translateY(${(1 - p) * 26}px)` } as React.CSSProperties;

  if (row.kind === 'day') {
    return <div style={{ ...rise, textAlign: 'center', fontFamily: fonts.mono, fontSize: 24, letterSpacing: '0.08em', color: 'rgba(255,255,255,0.34)', padding: '4px 0' }}>{row.t}</div>;
  }
  if (row.kind === 'end') {
    const win = row.win;
    return (
      <div style={{ ...rise, alignSelf: 'center', marginTop: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '20px 34px', borderRadius: 20, background: win ? 'linear-gradient(160deg,#3A2C10,#15110A)' : 'rgba(255,255,255,0.05)', border: `1px solid ${win ? GOLD + '99' : 'rgba(255,255,255,0.14)'}`, boxShadow: win ? `0 0 70px -8px ${GOLD}aa, 0 30px 60px -30px rgba(0,0,0,0.8)` : 'none' }}>
          <span style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: 40, color: win ? GOLD : 'rgba(255,255,255,0.5)', letterSpacing: '-0.02em' }}>{win ? '✓ ' : '✕ '}{row.t}</span>
        </div>
      </div>
    );
  }
  // mensajes (burbujas)
  const them = row.who === 'them';
  const auto = row.who === 'auto';
  return (
    <div style={{ ...rise, display: 'flex', flexDirection: 'column', alignItems: them ? 'flex-end' : 'flex-start' }}>
      {auto && row.tag ? <div style={{ fontFamily: fonts.mono, fontSize: 19, letterSpacing: '0.06em', color: GOLD, opacity: 0.85, margin: '0 6px 7px' }}>⚡ {row.tag}</div> : null}
      <div style={{ maxWidth: 372, padding: '22px 28px', borderRadius: 24, borderBottomLeftRadius: them ? 24 : 8, borderBottomRightRadius: them ? 8 : 24, background: them ? `${GOLD}26` : auto ? 'rgba(232,184,91,0.12)' : 'rgba(255,255,255,0.08)', border: `1px solid ${them ? GOLD + '88' : auto ? GOLD + '44' : 'rgba(255,255,255,0.14)'}` }}>
        <span style={{ fontFamily: fonts.display, fontWeight: 600, fontSize: 35, color: '#F1F0F6', letterSpacing: '-0.01em', lineHeight: 1.12 }}>{row.t}</span>
      </div>
    </div>
  );
};

const Column: React.FC<{ rows: Row[]; frame: number; label: string; side: 'L' | 'R'; dim?: number }> = ({ rows, frame, label, side, dim = 1 }) => (
  <div style={{ position: 'absolute', top: 372, width: COL_W, left: side === 'L' ? 48 : undefined, right: side === 'R' ? 48 : undefined, opacity: dim }}>
    <div style={{ fontFamily: fonts.mono, fontSize: 23, letterSpacing: '0.12em', color: side === 'R' ? GOLD : 'rgba(255,255,255,0.5)', textAlign: 'center', marginBottom: 22, opacity: ip(frame, 20, 40, 0, 1) }}>{label}</div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {rows.map((r, i) => <RowView key={i} row={r} frame={frame} />)}
    </div>
  </div>
);

export const SEGUIMIENTO_DURATION = 320;

export const Seguimiento: React.FC = () => {
  const f = useCurrentFrame();
  const pay = ip(f, 224, 256, 0, 1);
  const back = 1 - pay;
  const topLabel = ip(f, 6, 24, 0, 1) * (1 - ip(f, 210, 226, 0, 1));
  // la vía perdida se apaga un poco antes del payoff (refuerza el contraste)
  const leftDim = 1 - ip(f, 170, 196, 0, 0.42);

  return (
    <Stage bg="radial-gradient(125% 100% at 50% 38%, #1A150C 0%, #060504 78%)" hue={GOLD} seed={5}>
      <div style={{ position: 'absolute', top: 132, left: 0, right: 0, textAlign: 'center', fontFamily: fonts.display, fontWeight: 700, fontSize: 46, letterSpacing: '-0.02em', color: '#F1F0F6', opacity: topLabel * back }}>
        Mismo cliente. Mismo presupuesto.
      </div>
      <div style={{ position: 'absolute', top: 196, left: 0, right: 0, textAlign: 'center', fontFamily: fonts.mono, fontSize: 26, letterSpacing: '0.06em', color: GOLD, opacity: topLabel * back }}>
        lo único distinto: el seguimiento
      </div>

      <AbsoluteFill style={{ opacity: back }}>
        <Column rows={LEFT} frame={f} label="SIN SEGUIMIENTO" side="L" dim={leftDim} />
        <Column rows={RIGHT} frame={f} label="CON SEGUIMIENTO" side="R" />
      </AbsoluteFill>

      {/* PAYOFF */}
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 92, opacity: pay, zIndex: 200 }}>
        <div style={{ transform: `translateY(${(1 - pay) * 26}px)` }}>
          <BigType frame={f} s={224} size={86} lines={[{ t: 'No perdiste la venta.' }, { t: 'Dejaste de insistir.' }]} />
          <div style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: 52, color: GOLD, letterSpacing: '-0.03em', marginTop: 30, opacity: ip(f, 256, 282, 0, 1), textShadow: `0 0 50px ${GOLD}66` }}>El seguimiento se hace solo.</div>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};
