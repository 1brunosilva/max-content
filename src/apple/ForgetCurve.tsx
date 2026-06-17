/**
 * ForgetCurve — Curva del olvido (Ebbinghaus).
 * Una sola card "TU MENSAJE" brilla al 100%. A medida que pasan marcadores
 * de tiempo (1h → 1d → 3d → 7d), la card se desvanece dramáticamente.
 * Al final: queda casi invisible. "Sin repetición, en 7 días recordó el 10%."
 * Lever: curva del olvido / repetición. Palette: cyan-azul. Mode: data/dark. C.
 */
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { Stage, Glass, SiriGlow, SiriFrame, BigType, ip, fonts } from './kit';

const CYAN = '#4FE0FF';

const TIME_MARKS = [
  { label: '1h', retention: 0.58, frame: 52 },
  { label: '1 día', retention: 0.34, frame: 88 },
  { label: '3 días', retention: 0.18, frame: 124 },
  { label: '7 días', retention: 0.08, frame: 160 },
];

export const FORGETCURVE_DURATION = 270;

export const ForgetCurve: React.FC = () => {
  const f = useCurrentFrame();

  // retención actual interpolada entre time marks
  const getRetention = () => {
    if (f < 30) return ip(f, 10, 30, 0, 1);
    const marks = [{ frame: 30, r: 1 }, ...TIME_MARKS.map(m => ({ frame: m.frame, r: m.retention }))];
    for (let i = 0; i < marks.length - 1; i++) {
      if (f >= marks[i].frame && f < marks[i + 1].frame) {
        return ip(f, marks[i].frame, marks[i + 1].frame, marks[i].r, marks[i + 1].r);
      }
    }
    return TIME_MARKS[TIME_MARKS.length - 1].retention;
  };

  const retention = getRetention();
  const pay = ip(f, 175, 202, 0, 1);
  const labelOp = ip(f, 4, 20, 0, 1) * (1 - pay);
  const marksOp = ip(f, 38, 54, 0, 1) * (1 - pay);

  const pct = Math.round(retention * 100);

  return (
    <Stage bg="radial-gradient(122% 92% at 50% 38%, #080D18 0%, #030508 80%)" hue={CYAN} seed={9}>
      <div style={{
        position: 'absolute', top: 130, left: 0, right: 0, textAlign: 'center',
        fontFamily: fonts.mono, fontSize: 22, letterSpacing: '0.18em',
        color: 'rgba(255,255,255,0.65)', opacity: labelOp, zIndex: 30,
      }}>
        LA MEMORIA DE TU CLIENTE
      </div>

      {/* Card central con retención visual */}
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', opacity: 1 - pay }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 40 }}>

          {/* La card que se desvanece */}
          <div style={{ position: 'relative', opacity: Math.max(0.06, retention) }}>
            {retention > 0.7 ? <SiriGlow frame={f} intensity={retention * 0.9} radius={34} /> : null}
            <Glass w={640} h={260} selected={retention > 0.7} pad={52} style={{
              background: `rgba(79, 224, 255, ${retention * 0.12})`,
              border: `1px solid rgba(79, 224, 255, ${retention * 0.5})`,
            }}>
              <div style={{ fontFamily: fonts.mono, fontSize: 17, letterSpacing: '0.1em', color: `rgba(79,224,255,${retention * 0.7})`, marginBottom: 14 }}>TU MENSAJE</div>
              <div style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: 64, color: `rgba(248,248,255,${retention})`, letterSpacing: '-0.03em', lineHeight: 1.1 }}>
                "Automatizamos<br />tu negocio"
              </div>
            </Glass>
          </div>

          {/* Porcentaje de retención */}
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: 96, color: CYAN, letterSpacing: '-0.04em', opacity: 0.9 }}>
              {pct}%
            </div>
            <div style={{ fontFamily: fonts.mono, fontSize: 24, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em', marginTop: -8 }}>
              RECUERDA
            </div>
          </div>

          {/* Marcadores de tiempo */}
          <div style={{ display: 'flex', gap: 20, opacity: marksOp }}>
            {TIME_MARKS.map((m, i) => {
              const active = f >= m.frame;
              return (
                <div key={i} style={{
                  textAlign: 'center', padding: '10px 18px', borderRadius: 16,
                  background: active ? `rgba(79,224,255,0.12)` : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${active ? `rgba(79,224,255,0.4)` : 'rgba(255,255,255,0.08)'}`,
                  transition: 'all 0.3s',
                }}>
                  <div style={{ fontFamily: fonts.display, fontWeight: 700, fontSize: 28, color: active ? CYAN : '#4A4A62' }}>{m.label}</div>
                  <div style={{ fontFamily: fonts.mono, fontSize: 16, color: active ? `rgba(79,224,255,0.7)` : '#3A3A52', marginTop: 4 }}>{Math.round(m.retention * 100)}%</div>
                </div>
              );
            })}
          </div>
        </div>
      </AbsoluteFill>

      {/* Payoff */}
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 96, opacity: pay, zIndex: 200 }}>
        <SiriFrame frame={f} intensity={pay} />
        <div style={{ transform: `translateY(${(1 - pay) * 28}px)` }}>
          <BigType frame={f} s={175} size={88} lines={[
            { t: 'Sin repetición,' },
            { t: 'en 7 días' },
            { t: 'recordó el 10%.', hl: true },
          ]} />
          <div style={{ fontFamily: fonts.display, fontSize: 32, color: '#8A8AAA', marginTop: 28, opacity: ip(f, 212, 234, 0, 1) }}>
            Aparecer una vez no alcanza. Aparecer siempre sí.
          </div>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};
