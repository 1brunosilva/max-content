/**
 * RealProof — EXPLORACIÓN: 4º modo "Real/Raw". Tarjetas de reseña AUTÉNTICAS (estilo
 * captura real: blancas, estrellas doradas, avatar, fecha) — no glass premium. La pila
 * de reseñas 5★ ENCARNA el mensaje: la prueba social que tenés pero no mostrás.
 *
 * Lever NUEVO: prueba social. Tema: "te creen más a un desconocido que a vos".
 * Reglas Bruno horneadas: SLOW global + labels grandes + cierre con hold. src/explore/.
 */
import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Easing } from 'remotion';
import { fontDisplay, fontMono } from '../brand/fonts';

const GOLD = '#FFC53D';
const VLT = '#7C3AED';
const EASE = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;
const APPLE = Easing.bezier(0.16, 1, 0.3, 1);
const ip = (f: number, a: number, b: number, x: number, y: number, e: (t: number) => number = APPLE) =>
  interpolate(f, [a, b], [x, y], { ...EASE, easing: e });

const REVIEWS = [
  { name: 'Martín R.', init: 'M', hue: '#5B8CFF', text: 'Resolvieron todo al instante. Una locura.', when: 'hace 2 días' },
  { name: 'Carolina V.', init: 'C', hue: '#34C77B', text: 'El mejor servicio que tuve. Los recomiendo 100%.', when: 'hace 1 semana' },
  { name: 'Diego S.', init: 'D', hue: '#FF8A5B', text: 'No vuelvo a otro lado. Impecables.', when: 'hace 3 días' },
];

const SLOW = 1.15; // apenitas más lento, siempre (regla Bruno)
export const REALPROOF_DURATION = Math.round(300 * SLOW);

export const RealProof: React.FC = () => {
  const f = useCurrentFrame() / SLOW;
  const { fps } = useVideoConfig();
  const sceneOut = 1 - ip(f, 150, 176, 0, 1);   // las reseñas se van antes del statement
  const stmt = ip(f, 154, 184, 0, 1) * (1 - ip(f, 206, 222, 0, 1));
  const pay = ip(f, 214, 248, 0, 1); // arranca antes (crossfade, sin hueco oscuro)

  return (
    <AbsoluteFill style={{ background: 'radial-gradient(120% 95% at 50% 30%, #11121A 0%, #060609 78%)', fontFamily: fontDisplay }}>
      {/* label grande/legible */}
      <div style={{ position: 'absolute', top: 132, left: 0, right: 0, textAlign: 'center', fontFamily: fontMono, fontSize: 31, fontWeight: 500, letterSpacing: '0.13em', color: 'rgba(255,255,255,0.66)', opacity: ip(f, 6, 24, 0, 1) * sceneOut }}>
        LO QUE DICEN DE VOS
      </div>

      {/* PILA DE RESEÑAS auténticas (cards blancas, no glass) */}
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', opacity: sceneOut }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 26, width: 880 }}>
          {REVIEWS.map((r, i) => {
            const at = 22 + i * 30;
            const t = spring({ frame: (f - at), fps, config: { damping: 18, stiffness: 95, mass: 1.05 } });
            return (
              <div key={i} style={{ opacity: Math.min(1, t * 1.4), transform: `translateY(${(1 - t) * 40}px) scale(${0.95 + t * 0.05})`, background: '#FFFFFF', borderRadius: 28, padding: '30px 34px', boxShadow: '0 30px 70px -28px rgba(0,0,0,0.7)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 16 }}>
                  <div style={{ width: 72, height: 72, borderRadius: '50%', background: `linear-gradient(135deg, ${r.hue}, ${r.hue}aa)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 34, color: '#fff', flexShrink: 0 }}>{r.init}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: 34, color: '#15151C', letterSpacing: '-0.01em' }}>{r.name}</div>
                    <div style={{ fontSize: 30, color: GOLD, letterSpacing: 2 }}>★★★★★</div>
                  </div>
                  <div style={{ fontFamily: fontMono, fontSize: 24, color: '#9A9AA6' }}>{r.when}</div>
                </div>
                <div style={{ fontSize: 36, color: '#2A2A34', fontWeight: 500, lineHeight: 1.3 }}>{r.text}</div>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>

      {/* STATEMENT */}
      <AbsoluteFill style={{ alignItems: 'flex-start', justifyContent: 'center', padding: '0 84px', opacity: stmt }}>
        <div style={{ fontFamily: fontDisplay, fontWeight: 800, fontSize: 94, letterSpacing: '-0.04em', lineHeight: 1.05, color: '#F3F3F8' }}>
          <div style={{ opacity: ip(f, 156, 178, 0, 1), transform: `translateY(${(1 - ip(f, 156, 178, 0, 1)) * 22}px)` }}>A vos te creen</div>
          <div style={{ opacity: ip(f, 164, 186, 0, 1), transform: `translateY(${(1 - ip(f, 164, 186, 0, 1)) * 22}px)` }}>a medias.</div>
          <div style={{ color: GOLD, marginTop: 22, opacity: ip(f, 180, 204, 0, 1), transform: `translateY(${(1 - ip(f, 180, 204, 0, 1)) * 22}px)` }}>A ellos, entero.</div>
        </div>
      </AbsoluteFill>

      {/* PAYOFF (hold largo) */}
      <AbsoluteFill style={{ alignItems: 'flex-start', justifyContent: 'center', padding: '0 84px', opacity: pay }}>
        <div style={{ fontFamily: fontMono, fontSize: 30, fontWeight: 500, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.6)', marginBottom: 26, opacity: ip(f, 228, 246, 0, 1) }}>TU MEJOR VENDEDOR</div>
        <div style={{ fontFamily: fontDisplay, fontWeight: 800, fontSize: 90, letterSpacing: '-0.04em', lineHeight: 1.05, color: '#F3F3F8', transform: `translateY(${(1 - pay) * 24}px)` }}>
          Son tus clientes<br />felices. <span style={{ color: VLT }}>¿Los mostrás?</span>
        </div>
      </AbsoluteFill>

      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 8, background: `linear-gradient(90deg, ${VLT}, #A855F7)` }} />
    </AbsoluteFill>
  );
};
