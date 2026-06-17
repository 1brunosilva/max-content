/**
 * FOMONotif — FOMO / Fear Of Missing Out.
 * Notificaciones de otros negocios activos se apilan rápido (ventas, clientes,
 * automatizaciones). Una card "VOS · ESPERANDO" queda sola y dimm.
 * "Mientras esperás, otros avanzan."
 * Lever: FOMO / disponibilidad. Palette: amber. Mode: glassy-oscuro. V.
 */
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { Stage, Glass, SiriFrame, BigType, ip, fonts } from './kit';

const AMBER = '#F59E0B';

const NOTIFS = [
  { emoji: '🤖', msg: 'Automatización activa · 3am', biz: 'Estudio Vargas' },
  { emoji: '💬', msg: 'Respuesta enviada · 2:47am', biz: 'Clínica Moreno' },
  { emoji: '📦', msg: 'Pedido procesado · sin esperar', biz: 'Tienda Rivas' },
  { emoji: '⭐', msg: '+1 reseña 5★ · respondida', biz: 'RestBar Lucía' },
  { emoji: '📊', msg: 'Reporte generado · automático', biz: 'Consulting BR' },
  { emoji: '🔔', msg: 'Lead calificado · ya en CRM', biz: 'InmoTech UY' },
];

export const FOMOMNOTIF_DURATION = 270;

export const FOMONotif: React.FC = () => {
  const f = useCurrentFrame();

  const pay = ip(f, 155, 182, 0, 1);
  const labelOp = ip(f, 4, 20, 0, 1) * (1 - pay);
  const youCard = ip(f, 85, 110, 0, 1);

  return (
    <Stage bg="radial-gradient(120% 88% at 50% 40%, #1A1000 0%, #060402 78%)" hue={AMBER} seed={13}>
      <div style={{
        position: 'absolute', top: 130, left: 0, right: 0, textAlign: 'center',
        fontFamily: fonts.mono, fontSize: 22, letterSpacing: '0.18em',
        color: 'rgba(255,255,255,0.65)', opacity: labelOp, zIndex: 30,
      }}>
        MIENTRAS VOS ESPERÁS · ESTA NOCHE
      </div>

      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', opacity: 1 - pay }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 840, marginTop: 60 }}>

          {NOTIFS.map((n, i) => {
            const appear = ip(f, 10 + i * 14, 26 + i * 14, 0, 1);
            if (appear < 0.01) return null;
            return (
              <div key={i} style={{ opacity: appear, transform: `translateX(${(1 - appear) * -40}px)` }}>
                <Glass w={840} h={96} pad={22} style={{
                  background: 'rgba(245,158,11,0.06)',
                  border: '1px solid rgba(245,158,11,0.18)',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
                    <div style={{ fontSize: 36, lineHeight: 1 }}>{n.emoji}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: fonts.display, fontWeight: 600, fontSize: 26, color: '#C4C4E0', letterSpacing: '-0.01em' }}>{n.msg}</div>
                      <div style={{ fontFamily: fonts.mono, fontSize: 16, color: AMBER, letterSpacing: '0.06em', marginTop: 4 }}>{n.biz}</div>
                    </div>
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: AMBER, boxShadow: `0 0 12px ${AMBER}` }} />
                  </div>
                </Glass>
              </div>
            );
          })}

          {/* La card de "VOS" — sola y apagada */}
          <div style={{ opacity: youCard, transform: `translateX(${(1 - youCard) * 40}px)`, marginTop: 8 }}>
            <Glass w={840} h={96} pad={22} style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.06)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
                <div style={{ fontSize: 36, lineHeight: 1, opacity: 0.3 }}>⏳</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: fonts.display, fontWeight: 600, fontSize: 26, color: '#3A3A52', letterSpacing: '-0.01em' }}>Sin automatizar · esperando</div>
                  <div style={{ fontFamily: fonts.mono, fontSize: 16, color: '#2A2A42', letterSpacing: '0.06em', marginTop: 4 }}>TU NEGOCIO</div>
                </div>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#2A2A42' }} />
              </div>
            </Glass>
          </div>

        </div>
      </AbsoluteFill>

      {/* Payoff */}
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 96, opacity: pay, zIndex: 200 }}>
        <SiriFrame frame={f} intensity={pay} />
        <div style={{ transform: `translateY(${(1 - pay) * 28}px)` }}>
          <BigType frame={f} s={155} size={88} lines={[
            { t: 'Mientras esperás,' },
            { t: 'otros avanzan', hl: false },
            { t: 'de noche.', hl: true },
          ]} />
          <div style={{ fontFamily: fonts.display, fontSize: 32, color: '#8A8AAA', marginTop: 28, opacity: ip(f, 192, 214, 0, 1) }}>
            La automatización no descansa. Vos podés.
          </div>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};
