/**
 * RisingBar — EXPLORACIÓN: tercer modo. Midnight, minimalista, una LÍNEA luminosa
 * como héroe (ni glassy-violeta ni crema-editorial). La "vara" de expectativa SUBE
 * sola (Mercado Libre, Netflix, su banco) y "tu propuesta" queda abajo, fuera de
 * alcance. El mecanismo (la vara que sube) ENCARNA el mensaje.
 *
 * Tema (anclaje de expectativas): no competís contra tu competencia, competís contra
 * la última gran experiencia que tuvo tu cliente. Aislado en src/explore/. Self-contained.
 */
import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from 'remotion';
import { fontDisplay, fontMono } from '../brand/fonts';

const CYAN = '#8FE6FF';
const VLT_L = '#A855F7';
const EASE = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;
const APPLE = Easing.bezier(0.16, 1, 0.3, 1);
const ip = (f: number, a: number, b: number, x: number, y: number, e: (t: number) => number = APPLE) =>
  interpolate(f, [a, b], [x, y], { ...EASE, easing: e });

const EXPS = [
  { t: 'Mercado Libre', f: 28 },
  { t: 'Netflix', f: 52 },
  { t: 'su banco en el celu', f: 76 },
  { t: 'Uber', f: 100 },
];

const SLOW = 1.3; // más lento para que se lea bien (Bruno) — time-scale global
export const RISINGBAR_DURATION = Math.round(345 * SLOW);

export const RisingBar: React.FC = () => {
  const f = useCurrentFrame() / SLOW;
  // la vara sube: cada experiencia la empuja ~12% más arriba (settle por exp)
  const jumps = EXPS.reduce((acc, e) => acc + ip(f, e.f, e.f + 20, 0, 1), 0);
  const barY = 78 - jumps * 12.5; // % desde arriba (menor = más alto)
  const glow = 0.6 + 0.4 * Math.sin(f * 0.16);

  const youIn = ip(f, 150, 172, 0, 1);       // "tu propuesta" aparece abajo
  const gap = ip(f, 168, 196, 0, 1);          // se marca la distancia
  const stmt = ip(f, 196, 226, 0, 1) * (1 - ip(f, 250, 268, 0, 1));
  const pay = ip(f, 268, 300, 0, 1);
  const sceneOut = 1 - ip(f, 186, 212, 0, 1); // la escena se va ANTES del statement (no se pisa)

  return (
    <AbsoluteFill style={{ background: 'radial-gradient(120% 90% at 50% 30%, #0C1322 0%, #05070E 78%)', fontFamily: fontDisplay, overflow: 'hidden' }}>
      {/* label (grande/legible) */}
      <div style={{ position: 'absolute', top: 130, left: 0, right: 0, textAlign: 'center', fontFamily: fontMono, fontSize: 30, fontWeight: 500, letterSpacing: '0.14em', color: 'rgba(255,255,255,0.66)', opacity: ip(f, 6, 24, 0, 1) * (1 - ip(f, 250, 268, 0, 1)) }}>
        LA VARA DE TU CLIENTE
      </div>

      {/* escena de la vara (se desvanece en el payoff) */}
      <AbsoluteFill style={{ opacity: sceneOut }}>
        {/* zona "fuera de alcance" arriba de la vara (sutil) */}
        <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: `${barY}%`, background: `linear-gradient(180deg, ${CYAN}10, transparent)` }} />

        {/* LA VARA (línea luminosa que sube) */}
        <div style={{ position: 'absolute', left: 70, right: 70, top: `${barY}%`, height: 4, borderRadius: 4, background: `linear-gradient(90deg, transparent, ${CYAN}, transparent)`, boxShadow: `0 0 ${24 * glow}px ${CYAN}, 0 0 ${60 * glow}px ${CYAN}88` }} />
        {/* etiqueta de la vara, sobre la línea, a la derecha */}
        <div style={{ position: 'absolute', right: 70, top: `calc(${barY}% - 46px)`, fontFamily: fontMono, fontSize: 26, color: CYAN, letterSpacing: '0.06em', textShadow: `0 0 16px ${CYAN}` }}>la espera del cliente</div>

        {/* experiencias que la empujan (aparecen cerca de la vara cuando suben) */}
        {EXPS.map((e, i) => {
          const a = ip(f, e.f, e.f + 18, 0, 1);
          const out = ip(f, e.f + 30, e.f + 55, 0, 1);
          const op = a * (1 - out) * sceneOut;
          if (op <= 0.01) return null;
          const lvlY = 78 - (i + 1) * 12.5; // dónde estaba la vara al empujarla
          return (
            <div key={i} style={{ position: 'absolute', left: 70 + (i % 2) * 40, top: `calc(${lvlY}% + 18px)`, opacity: op, transform: `translateY(${(1 - a) * 18}px)` }}>
              <span style={{ fontFamily: fontDisplay, fontWeight: 700, fontSize: 40, color: '#EAF6FF', letterSpacing: '-0.02em' }}>{e.t}</span>
              <span style={{ fontFamily: fontMono, fontSize: 26, color: CYAN, marginLeft: 16 }}>↑</span>
            </div>
          );
        })}

        {/* TU PROPUESTA, abajo, lejos de la vara */}
        <div style={{ position: 'absolute', left: 70, top: '84%', opacity: youIn, transform: `translateY(${(1 - youIn) * 20}px)` }}>
          <div style={{ height: 4, width: 360, borderRadius: 4, background: 'rgba(255,255,255,0.28)' }} />
          <div style={{ fontFamily: fontDisplay, fontWeight: 700, fontSize: 40, color: '#9AA3B2', marginTop: 14 }}>tu propuesta</div>
        </div>
        {/* la distancia (gap) entre la vara y vos */}
        <div style={{ position: 'absolute', left: 90, top: `${barY}%`, height: `calc(84% - ${barY}%)`, width: 2, background: `repeating-linear-gradient(${VLT_L} 0 6px, transparent 6px 14px)`, opacity: gap * 0.9 }} />
        <div style={{ position: 'absolute', left: 110, top: `calc(${barY}% + (84% - ${barY}%)/2 - 22px)`, fontFamily: fontMono, fontSize: 28, color: VLT_L, opacity: gap, fontWeight: 500 }}>la diferencia</div>
      </AbsoluteFill>

      {/* STATEMENT */}
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 70px', opacity: stmt }}>
        <div style={{ fontFamily: fontDisplay, fontWeight: 800, fontSize: 86, letterSpacing: '-0.04em', lineHeight: 1.05, color: '#F2F6FF' }}>
          <div style={{ opacity: ip(f, 198, 218, 0, 1), transform: `translateY(${(1 - ip(f, 198, 218, 0, 1)) * 22}px)` }}>No competís contra</div>
          <div style={{ opacity: ip(f, 206, 226, 0, 1), transform: `translateY(${(1 - ip(f, 206, 226, 0, 1)) * 22}px)` }}>tu competencia.</div>
          <div style={{ color: CYAN, fontSize: 76, marginTop: 24, opacity: ip(f, 220, 244, 0, 1), transform: `translateY(${(1 - ip(f, 220, 244, 0, 1)) * 22}px)`, textShadow: `0 0 30px ${CYAN}66` }}>Competís contra lo último<br />que lo dejó feliz.</div>
        </div>
      </AbsoluteFill>

      {/* PAYOFF (hold largo para leer) */}
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 70px', opacity: pay }}>
        <div style={{ fontFamily: fontMono, fontSize: 30, fontWeight: 500, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.6)', marginBottom: 28, opacity: ip(f, 270, 288, 0, 1) }}>LE SUBIERON LA VARA SIN QUE LO NOTES</div>
        <div style={{ fontFamily: fontDisplay, fontWeight: 800, fontSize: 92, letterSpacing: '-0.04em', lineHeight: 1.05, color: '#F2F6FF', transform: `translateY(${(1 - pay) * 24}px)` }}>
          ¿Tu marca está<br />a <span style={{ color: CYAN, textShadow: `0 0 30px ${CYAN}66` }}>esa altura</span>?
        </div>
      </AbsoluteFill>

      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 8, background: `linear-gradient(90deg, ${CYAN}, ${VLT_L})` }} />
    </AbsoluteFill>
  );
};
