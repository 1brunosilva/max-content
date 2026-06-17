/**
 * MilCortes — mecanismo NUEVO. Tema: el costo invisible de lo manual (neglect de
 * sumas chicas). No te agota la tarea grande: te agotan las 30 chiquitas de 2 min
 * que ni registrás. El espectador VIVE la acumulación: un contador de minutos sube
 * en silencio mientras caen micro-tareas, hasta revelar "5h 40m por semana".
 * Vende: automatización de tareas repetitivas. Paleta: editorial CLARO (rompe el oscuro).
 */
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { ip, APPLE, fonts, VLT } from './kit';

const TASKS = [
  { t: 'Responder el mismo WhatsApp', m: 58 },
  { t: 'Pasarlo a la planilla', m: 52 },
  { t: 'Agendar la entrega', m: 47 },
  { t: 'Confirmar por mail', m: 61 },
  { t: 'Cargar el contacto a mano', m: 55 },
  { t: 'Mandar el recordatorio', m: 67 },
];
const TOTAL = TASKS.reduce((a, b) => a + b.m, 0); // 340 = 5h 40m

export const MILCORTES_DURATION = 305;

export const MilCortes: React.FC = () => {
  const f = useCurrentFrame();
  const START = 16, STEP = 17;

  // total acumulado: suma de las tareas ya caídas (tween suave por tarea)
  let acc = 0;
  TASKS.forEach((tk, i) => {
    const at = START + i * STEP;
    acc += tk.m * ip(f, at, at + STEP, 0, 1, APPLE);
  });
  const minutes = Math.round(acc);

  const allIn = START + TASKS.length * STEP; // ~118
  const reveal = ip(f, allIn + 6, allIn + 34, 0, 1); // morph minutos → "5h 40m"
  const pay = ip(f, allIn + 76, allIn + 106, 0, 1);  // payoff
  const back = 1 - pay;                               // fade de toda la escena
  const h = Math.floor(TOTAL / 60), mm = TOTAL % 60;

  return (
    <AbsoluteFill style={{ background: 'radial-gradient(120% 92% at 50% 28%, #F3F1EB 0%, #D9D5CB 80%)' }}>
      <AbsoluteFill style={{ perspective: 1600 }}>
        {/* CONTENIDO (se desvanece al entrar el payoff) */}
        <AbsoluteFill style={{ opacity: back, alignItems: 'center', justifyContent: 'flex-start', paddingTop: 156 }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <div style={{ fontFamily: fonts.mono, fontSize: 30, letterSpacing: '0.14em', color: '#6B6760', opacity: ip(f, 6, 24, 0, 1) }}>LO QUE REPETÍS CADA SEMANA</div>
            <div style={{ position: 'relative', height: 158, marginTop: 10 }}>
              <div style={{ position: 'absolute', inset: 0, fontFamily: fonts.display, fontWeight: 800, fontSize: 150, letterSpacing: '-0.04em', color: '#19171F', opacity: 1 - reveal }}>
                {minutes}<span style={{ fontSize: 56, color: '#6B6760' }}> min</span>
              </div>
              <div style={{ position: 'absolute', inset: 0, fontFamily: fonts.display, fontWeight: 800, fontSize: 150, letterSpacing: '-0.04em', color: VLT, opacity: reveal, transform: `translateY(${(1 - reveal) * 22}px) scale(${0.96 + reveal * 0.04})`, textShadow: `0 0 60px ${VLT}44` }}>
                {h}h {mm}m
              </div>
            </div>
          </div>

          {/* LISTA de micro-tareas que caen una a una */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 900 }}>
            {TASKS.map((tk, i) => {
              const at = START + i * STEP;
              const p = ip(f, at, at + 22, 0, 1, APPLE);
              if (p <= 0.001) return null;
              return (
                <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '26px 36px', borderRadius: 22, background: 'rgba(255,255,255,0.74)', border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 26px 54px -32px rgba(0,0,0,0.4)', opacity: p, transform: `translateY(${(1 - p) * -42}px) scale(${0.96 + p * 0.04})` }}>
                  <span style={{ fontFamily: fonts.display, fontWeight: 700, fontSize: 41, color: '#211F2A', letterSpacing: '-0.02em' }}>{tk.t}</span>
                  <span style={{ fontFamily: fonts.mono, fontSize: 35, color: VLT, fontWeight: 700 }}>+{tk.m}m</span>
                </div>
              );
            })}
          </div>
        </AbsoluteFill>

        {/* PAYOFF */}
        <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 92, opacity: pay }}>
          <div style={{ transform: `translateY(${(1 - pay) * 26}px)` }}>
            <div style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: 94, lineHeight: 1.05, letterSpacing: '-0.04em', color: '#19171F' }}>No te falta tiempo.</div>
            <div style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: 94, lineHeight: 1.05, letterSpacing: '-0.04em', color: VLT, marginTop: 10, textShadow: `0 0 50px ${VLT}3a` }}>Tenés 5 horas atrapadas</div>
            <div style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: 94, lineHeight: 1.05, letterSpacing: '-0.04em', color: '#19171F', marginTop: 10 }}>en cosas que se hacen solas.</div>
            <div style={{ fontFamily: fonts.display, fontSize: 40, color: '#6B6760', marginTop: 46, opacity: ip(f, allIn + 116, allIn + 142, 0, 1) }}>Automatizá lo que repetís.</div>
          </div>
        </AbsoluteFill>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
