/**
 * TypeScan — EXPLORACIÓN: modo opuesto al catálogo glassy/oscuro.
 * Tipográfico, CLARO, editorial. Sin cards, sin glow Siri, sin 3D de objetos.
 * La tipografía ENCARNA el mensaje: un muro de copy genérico se "escanea" (una ola
 * recorre el texto) y solo sobreviven 2 palabras → "tu cliente no te lee, te escanea".
 *
 * Aislado en src/explore/ con su propio entry (no toca Root.tsx ni kit.tsx) para no
 * pisar a la otra sesión. Tema: legibilidad/atención (Conversion Doc). Self-contained.
 */
import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from 'remotion';
import { fontDisplay, fontMono } from '../brand/fonts';

const INK = '#16130E';
const CREAM = '#F4F1EA';
const VLT = '#7C3AED';
const MUTE = '#B9B4A8';
const EASE = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;
const APPLE = Easing.bezier(0.16, 1, 0.3, 1);
const ip = (f: number, a: number, b: number, x: number, y: number, e: (t: number) => number = APPLE) =>
  interpolate(f, [a, b], [x, y], { ...EASE, easing: e });

// muro de copy genérico; las 2 "key" son lo único que el ojo registra
const WALL = 'Somos una empresa líder con más de 20·años de trayectoria, comprometidos con la excelencia, ofreciendo soluciones integrales a medida, calidad premium y la mejor atención del mercado.';
const KEY = new Set(['20·años', 'premium']);

const SLOW = 1.15; // apenitas más lento, siempre (regla Bruno) — time-scale global
export const TYPESCAN_DURATION = Math.round(340 * SLOW);

export const TypeScan: React.FC = () => {
  const f = useCurrentFrame() / SLOW;
  const words = WALL.split(' ');
  const wallOut = ip(f, 120, 150, 1, 0);          // el muro se va
  const stmt = ip(f, 150, 180, 0, 1) * (1 - ip(f, 196, 214, 0, 1));
  const pay = ip(f, 212, 244, 0, 1);

  return (
    <AbsoluteFill style={{ background: CREAM, fontFamily: fontDisplay }}>
      {/* textura sutil para que el fondo no sea plano */}
      <AbsoluteFill style={{ background: 'radial-gradient(120% 80% at 30% 20%, rgba(124,58,237,0.05), transparent 60%)' }} />

      {/* label */}
      <div style={{ position: 'absolute', top: 150, left: 90, fontFamily: fontMono, fontSize: 31, letterSpacing: '0.14em', color: '#7E7969', fontWeight: 500, opacity: ip(f, 6, 22, 0, 1) * (1 - ip(f, 130, 146, 0, 1)) }}>
        LO QUE ESCRIBISTE ▸
      </div>

      {/* EL MURO DE TEXTO + la "ola de escaneo" */}
      <div style={{ position: 'absolute', top: 230, left: 90, right: 90, opacity: wallOut }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px 16px', fontSize: 52, fontWeight: 600, lineHeight: 1.25, letterSpacing: '-0.02em' }}>
          {words.map((w, i) => {
            const isKey = KEY.has(w);
            const appear = ip(f, 8 + i * 1.0, 22 + i * 1.0, 0, 1);
            // ola de escaneo recorre el texto en orden de lectura
            const scan = ip(f, 50 + i * 1.4, 64 + i * 1.4, 0, 1);
            // no-key: se apaga a gris claro tras pasar la ola. key: salta a violeta y crece.
            const color = isKey ? VLT : `rgba(185,180,168,${1 - scan * 0.55})`;
            const sc = isKey ? 1 + scan * 0.18 : 1;
            const weight = isKey ? 800 : 600;
            return (
              <span key={i} style={{ display: 'inline-block', opacity: appear, color, fontWeight: weight, transform: `translateY(${(1 - appear) * 12}px) scale(${sc})`, textShadow: isKey && scan > 0.3 ? `0 6px 22px ${VLT}44` : 'none', transition: 'none' }}>
                {w.replace('·', ' ')}
              </span>
            );
          })}
        </div>
      </div>

      {/* lo que SOBREVIVE al escaneo (las 2 key, centradas) cuando el muro se va */}
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', opacity: wallOut < 0.5 ? ip(f, 128, 150, 0, 1) * (1 - ip(f, 150, 168, 0, 1)) : 0 }}>
        <div style={{ display: 'flex', gap: 40, fontFamily: fontDisplay, fontWeight: 800, fontSize: 120, color: VLT, letterSpacing: '-0.04em' }}>
          <span>20 años</span><span>premium</span>
        </div>
      </AbsoluteFill>

      {/* STATEMENT */}
      <AbsoluteFill style={{ alignItems: 'flex-start', justifyContent: 'center', padding: '0 90px', opacity: stmt }}>
        <div style={{ fontFamily: fontDisplay, fontWeight: 800, fontSize: 104, letterSpacing: '-0.045em', lineHeight: 1.0, color: INK }}>
          <div style={{ opacity: ip(f, 152, 172, 0, 1), transform: `translateY(${(1 - ip(f, 152, 172, 0, 1)) * 22}px)` }}>Tu cliente</div>
          <div style={{ opacity: ip(f, 160, 180, 0, 1), transform: `translateY(${(1 - ip(f, 160, 180, 0, 1)) * 22}px)` }}>no leyó esto.</div>
          <div style={{ color: VLT, opacity: ip(f, 172, 192, 0, 1), transform: `translateY(${(1 - ip(f, 172, 192, 0, 1)) * 22}px)` }}>Lo escaneó.</div>
        </div>
      </AbsoluteFill>

      {/* PAYOFF */}
      <AbsoluteFill style={{ alignItems: 'flex-start', justifyContent: 'center', padding: '0 90px', opacity: pay }}>
        <div style={{ fontFamily: fontMono, fontSize: 31, letterSpacing: '0.12em', color: '#7E7969', fontWeight: 500, marginBottom: 28, opacity: ip(f, 214, 230, 0, 1) }}>1 SEGUNDO · 2 PALABRAS</div>
        <div style={{ fontFamily: fontDisplay, fontWeight: 800, fontSize: 92, letterSpacing: '-0.04em', lineHeight: 1.04, color: INK, transform: `translateY(${(1 - pay) * 24}px)` }}>
          Vio dos palabras.<br />¿Esas dos <span style={{ color: VLT }}>venden</span>?
        </div>
        <div style={{ fontFamily: fontDisplay, fontWeight: 500, fontSize: 34, color: '#6E695C', marginTop: 30, opacity: ip(f, 240, 262, 0, 1) }}>Escribí para los ojos que vuelan.</div>
      </AbsoluteFill>

      {/* barra de marca inferior (firma, en violeta) */}
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 8, background: `linear-gradient(90deg, ${VLT}, #A855F7)` }} />
    </AbsoluteFill>
  );
};
