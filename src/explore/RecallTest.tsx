/**
 * RecallTest — EXPERIMENTO sobre el espectador (formato que impresiona). Le mostramos
 * 7 palabras rápido, le preguntamos cuáles recuerda, y le demostramos que solo le
 * quedaron la PRIMERA y la ÚLTIMA. Primero le pasa a ÉL → después se revela. Modo cyan.
 * (Esto es VIVIR el efecto, no diagramarlo.)
 */
import React from 'react';
import { AbsoluteFill } from 'remotion';
import { Stage, SiriFrame, Label, ip, useF, dur, fonts } from './lib';

const CY = '#8FE6FF';
const WORDS = ['SOL', 'MESA', 'PERRO', 'NUBE', 'LIBRO', 'AGUA', 'TREN'];
const T0 = 30, STEP = 15; // cada palabra
const BASE = 410; // cierre con hold largo para leer tranquilo (Bruno)
export const RECALLTEST_DURATION = dur(BASE);

export const RecallTest: React.FC = () => {
  const f = useF();
  const flashEnd = T0 + WORDS.length * STEP; // ~135
  const ask = ip(f, flashEnd + 8, flashEnd + 30, 0, 1) * (1 - ip(f, flashEnd + 56, flashEnd + 72, 0, 1)); // "¿cuáles recordás?"
  const reveal = ip(f, flashEnd + 80, flashEnd + 110, 0, 1);
  const pay = ip(f, flashEnd + 150, flashEnd + 180, 0, 1);
  const revealOut = 1 - ip(f, flashEnd + 144, flashEnd + 164, 0, 1);

  return (
    <Stage bg="radial-gradient(120% 90% at 50% 40%, #0C1322 0%, #05070E 78%)" hue="#5B8CFF" seed={4}>
      <Label frame={f} s={6} text="LEÉ ESTAS 7 PALABRAS — RÁPIDO" outAt={flashEnd - 6} />

      {/* FLASH: una palabra por vez, rápido (el estímulo del experimento) */}
      {WORDS.map((w, i) => {
        const at = T0 + i * STEP;
        const o = ip(f, at, at + 4, 0, 1) * (1 - ip(f, at + STEP - 4, at + STEP, 0, 1));
        if (o <= 0.01) return null;
        return <AbsoluteFill key={i} style={{ alignItems: 'center', justifyContent: 'center', opacity: o }}>
          <span style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: 150, letterSpacing: '-0.03em', color: '#F2F6FF' }}>{w}</span>
        </AbsoluteFill>;
      })}

      {/* PREGUNTA (el espectador trata de recordar) */}
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 70px', opacity: ask }}>
        <div style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: 84, letterSpacing: '-0.04em', lineHeight: 1.06, color: '#F2F6FF' }}>Sin volver atrás:<br />¿cuáles <span style={{ color: CY }}>recordás</span>?</div>
      </AbsoluteFill>

      {/* REVELACIÓN: la lista; primera y última brillan (las que recordás) */}
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', opacity: reveal * revealOut }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, alignItems: 'center' }}>
          {WORDS.map((w, i) => {
            const edge = i === 0 || i === WORDS.length - 1;
            const pulse = 0.7 + 0.3 * Math.sin(f * 0.18);
            return <span key={i} style={{ fontFamily: fonts.display, fontWeight: edge ? 800 : 600, fontSize: edge ? 80 : 54, color: edge ? CY : 'rgba(255,255,255,0.26)', textShadow: edge ? `0 0 38px ${CY}, 0 0 12px ${CY}` : 'none', opacity: edge ? 1 : 0.9, transform: `scale(${edge ? 1 + pulse * 0.02 : 1})` }}>{w}</span>;
          })}
        </div>
      </AbsoluteFill>

      {/* PAYOFF */}
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 70px', opacity: pay }}>
        <SiriFrame frame={f} intensity={pay} />
        <div style={{ transform: `translateY(${(1 - pay) * 24}px)` }}>
          <div style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: 80, letterSpacing: '-0.04em', lineHeight: 1.06, color: '#F2F6FF' }}>Recordaste la <span style={{ color: CY }}>primera</span><br />y la <span style={{ color: CY }}>última</span>. El resto, no.</div>
          <div style={{ fontFamily: fonts.display, fontWeight: 500, fontSize: 34, color: '#8A93A6', marginTop: 30, opacity: ip(f, flashEnd + 178, flashEnd + 200, 0, 1) }}>A tu cliente le pasa igual. Cuidá tu primer y tu último segundo.</div>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};
