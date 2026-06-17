/**
 * GridBreak — mecanismo: grilla 3×3 de cards genéricas (el mercado hoy).
 * Una sola rompe: sube en 3D, gira, Siri glow la envuelve. Las demás se esfuman.
 *
 * Tema (Von Restorff): el cerebro ignora lo que se parece. Lo que rompe el patrón
 * captura TODA la atención — y no podés evitarlo. Lo vivís en pantalla.
 *
 * Lever: diferenciación + atención selectiva. Sin precio, sin chatbot.
 */
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { Stage, Glass, SiriGlow, SiriFrame, BigType, ip, fonts, VLT_L } from './kit';

const CARDS = [
  'Calidad garantizada',
  'Equipo profesional',
  'Años de experiencia',
  'Soluciones a medida',
  'Atención personalizada',
  'Confianza total',
  'Tecnología avanzada',
  'Compromiso real',
  'Servicio de excelencia',
];

const BREAK_IDX = 4; // la del centro — impar → queda exactamente al medio
const COLS = 3;
const CW = 296, CH = 146, GAP = 18;
const GRID_W = COLS * CW + (COLS - 1) * GAP; // 924px
const GRID_H = COLS * CH + (COLS - 1) * GAP; // 474px

export const GRIDBREAK_DURATION = 270;

export const GridBreak: React.FC = () => {
  const f = useCurrentFrame();

  const breakP  = ip(f,  95, 135, 0, 1); // la elegida sube
  const scatter = ip(f, 112, 158, 0, 1); // las demás se esfuman
  const glowI   = ip(f, 130, 162, 0, 1); // glow Siri — aparece DESPUÉS del rise (no pre-revela)
  const pay     = ip(f, 168, 200, 0, 1); // payoff
  const labelOp = ip(f, 6, 24, 0, 1) * (1 - ip(f, 98, 116, 0, 1));
  // drift constante que se apaga cuando empieza el break (el rise se siente intencional)
  const driftY  = Math.sin(f * 0.02) * 2.5 * ip(f, 88, 110, 1, 0);

  return (
    <Stage bg="radial-gradient(115% 88% at 52% 36%, #120F1B 0%, #050408 80%)" hue={VLT_L} seed={7}>
      {/* Label */}
      <div style={{
        position: 'absolute', top: 130, left: 0, right: 0, textAlign: 'center',
        fontFamily: fonts.mono, fontSize: 24, letterSpacing: '0.18em',
        color: 'rgba(255,255,255,0.72)', opacity: labelOp, zIndex: 30,
      }}>
        TU SECTOR · HOY
      </div>

      {/* Grid — se desvanece completa cuando entra el payoff (GOTCHA) */}
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', opacity: 1 - pay }}>
        <div style={{
          transform: `translateY(${driftY}px)`,
          position: 'relative', width: GRID_W, height: GRID_H,
          transformStyle: 'preserve-3d',
        }}>
          {CARDS.map((txt, i) => {
            const col = i % COLS;
            const row = Math.floor(i / COLS);
            const isBreak = i === BREAK_IDX;

            // stagger de entrada: esquina superior-izq primero, rellena en filas
            const delay = row * 8 + col * 4;
            const appear = ip(f, 8 + delay, 30 + delay, 0, 1);

            // la elegida: sube en Z y crece
            const riseZ     = isBreak ? breakP * 210 : 0;
            const riseScale = isBreak ? 1 + breakP * 0.20 : 1;
            const tiltY     = isBreak ? breakP * -4 : 0; // giro leve, no decorativo

            // las demás: se hunden y desaparecen
            const sinkY   = isBreak ? 0 : scatter * 22;
            const otherOp = isBreak ? 1 : 1 - scatter * 0.88;

            const x = col * (CW + GAP);
            const y = row * (CH + GAP);

            return (
              <div key={i} style={{
                position: 'absolute', left: x, top: y, width: CW, height: CH,
                opacity: appear * otherOp,
                transform: `translateZ(${riseZ}px) scale(${riseScale}) rotateY(${tiltY}deg) translateY(${sinkY}px)`,
                zIndex: isBreak ? 10 : 1,
              }}>
                {isBreak ? <SiriGlow frame={f} intensity={glowI} radius={26} /> : null}
                <Glass w={CW} h={CH} selected={isBreak && breakP > 0.4} pad={26}>
                  <div style={{
                    fontFamily: fonts.mono, fontSize: 13, letterSpacing: '0.12em',
                    color: '#5A5A72', marginBottom: 6,
                  }}>
                    EMPRESA
                  </div>
                  <div style={{
                    fontFamily: fonts.display, fontWeight: 600, fontSize: 26,
                    color: '#9090A8', letterSpacing: '-0.02em', lineHeight: 1.25,
                  }}>
                    {txt}
                  </div>
                </Glass>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>

      {/* PAYOFF */}
      <AbsoluteFill style={{
        alignItems: 'center', justifyContent: 'center', textAlign: 'center',
        padding: 96, opacity: pay, zIndex: 200,
      }}>
        <SiriFrame frame={f} intensity={pay} />
        <div style={{ transform: `translateY(${(1 - pay) * 26}px)` }}>
          <BigType frame={f} s={168} size={92} lines={[
            { t: 'Todos dicen' },
            { t: 'lo mismo.' },
            { t: 'Uno se recuerda.', hl: true },
          ]} />
          <div style={{
            fontFamily: fonts.display, fontSize: 34, color: '#9A9AB5',
            marginTop: 32, opacity: ip(f, 210, 232, 0, 1),
          }}>
            Lo diferente no compite. Gana solo.
          </div>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};
