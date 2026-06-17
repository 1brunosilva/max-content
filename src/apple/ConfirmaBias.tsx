/**
 * ConfirmaBias — Sesgo de Confirmación.
 * Dos feeds de posts: uno confirma lo que el cliente ya cree ("las redes no sirven"),
 * el otro lo desafía. Un cursor "instintivo" ignora el que desafía y hace clic en el que confirma.
 * Lever: confirmation bias. Palette: violeta. Mode: glassy-oscuro. C.
 */
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { Stage, Glass, SiriGlow, SiriFrame, BigType, ip, fonts, VLT_L } from './kit';

const CONFIRMING = [
  '"Las redes sociales no sirven para negocios B2B"',
  '"El email marketing está muerto"',
  '"Los chatbots alejan a los clientes"',
];
const CHALLENGING = [
  '"Cómo LinkedIn generó 40% de leads B2B en 2025"',
  '"El email marketing: ROI del 4200% en promedio"',
  '"Chatbots: 67% de usuarios prefieren respuesta inmediata"',
];

export const CONFIRMABIAS_DURATION = 270;

export const ConfirmaBias: React.FC = () => {
  const f = useCurrentFrame();

  const feedIn = ip(f, 8, 44, 0, 1);
  const cursorApp = ip(f, 72, 90, 0, 1);
  // el cursor se mueve al card de confirmación (izquierda)
  const cursorX = ip(f, 90, 118, 540, 230);
  const cursorY = ip(f, 90, 118, 960, 780);
  const clickP = ip(f, 120, 138, 0, 1);
  const glowI = ip(f, 130, 158, 0, 1);
  const pay = ip(f, 172, 200, 0, 1);
  const labelOp = ip(f, 4, 20, 0, 1) * (1 - pay);

  return (
    <Stage bg="radial-gradient(118% 88% at 50% 36%, #13101D 0%, #060408 80%)" hue={VLT_L} seed={17}>
      <div style={{
        position: 'absolute', top: 130, left: 0, right: 0, textAlign: 'center',
        fontFamily: fonts.mono, fontSize: 22, letterSpacing: '0.18em',
        color: 'rgba(255,255,255,0.65)', opacity: labelOp, zIndex: 30,
      }}>
        TU CLIENTE HOY EN EL FEED
      </div>

      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', opacity: 1 - pay }}>
        <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>

          {/* Feed izquierdo — confirma creencias */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, opacity: feedIn }}>
            <div style={{ fontFamily: fonts.mono, fontSize: 16, color: VLT_L, letterSpacing: '0.1em', textAlign: 'center', marginBottom: 4 }}>LO QUE CREE</div>
            {CONFIRMING.map((post, i) => {
              const isClicked = i === 0;
              return (
                <div key={i} style={{
                  position: 'relative',
                  transform: isClicked ? `scale(${1 + clickP * 0.04}) translateZ(${clickP * 40}px)` : 'none',
                }}>
                  {isClicked && glowI > 0.1 ? <SiriGlow frame={f} intensity={glowI * 0.9} radius={26} /> : null}
                  <Glass w={430} h={120} selected={isClicked && clickP > 0.2} pad={22}>
                    <div style={{ fontFamily: fonts.mono, fontSize: 14, color: isClicked && clickP > 0.3 ? VLT_L : '#4A4A62', letterSpacing: '0.06em', marginBottom: 8 }}>
                      {isClicked && clickP > 0.3 ? '✓ CLIC' : 'POST'}
                    </div>
                    <div style={{ fontFamily: fonts.display, fontWeight: 600, fontSize: 24, color: isClicked && clickP > 0.3 ? '#E0E0F8' : '#5A5A78', lineHeight: 1.35, letterSpacing: '-0.01em' }}>{post}</div>
                  </Glass>
                </div>
              );
            })}
          </div>

          {/* Feed derecho — desafía creencias */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, opacity: feedIn * (1 - clickP * 0.6) }}>
            <div style={{ fontFamily: fonts.mono, fontSize: 16, color: '#3A3A52', letterSpacing: '0.1em', textAlign: 'center', marginBottom: 4 }}>LO QUE DESAFÍA</div>
            {CHALLENGING.map((post, i) => (
              <Glass key={i} w={430} h={120} pad={22}>
                <div style={{ fontFamily: fonts.mono, fontSize: 14, color: '#2A2A42', letterSpacing: '0.06em', marginBottom: 8 }}>POST</div>
                <div style={{ fontFamily: fonts.display, fontWeight: 500, fontSize: 22, color: '#3A3A52', lineHeight: 1.35, letterSpacing: '-0.01em' }}>{post}</div>
              </Glass>
            ))}
          </div>
        </div>

        {/* Cursor */}
        {cursorApp > 0.05 ? (
          <div style={{
            position: 'absolute',
            left: cursorX, top: cursorY,
            width: 32, height: 32,
            opacity: cursorApp * (1 - pay),
            pointerEvents: 'none',
            transform: 'translate(-50%, -50%)',
            zIndex: 100,
          }}>
            <svg viewBox="0 0 32 32" width="32" height="32">
              <path d="M 4 2 L 4 26 L 10 20 L 15 30 L 18 28.5 L 13 18.5 L 22 18.5 Z" fill="white" stroke="rgba(0,0,0,0.4)" strokeWidth="1.5" />
            </svg>
          </div>
        ) : null}
      </AbsoluteFill>

      {/* Payoff */}
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 96, opacity: pay, zIndex: 200 }}>
        <SiriFrame frame={f} intensity={pay} />
        <div style={{ transform: `translateY(${(1 - pay) * 28}px)` }}>
          <BigType frame={f} s={172} size={84} lines={[
            { t: 'Tu cliente busca' },
            { t: 'lo que ya cree.' },
            { t: 'Confirmale', hl: false },
            { t: 'lo que sabe.', hl: true },
          ]} />
          <div style={{ fontFamily: fonts.display, fontSize: 30, color: '#8A8AAA', marginTop: 28, opacity: ip(f, 210, 232, 0, 1) }}>
            Y luego ampliale la perspectiva con una verdad nueva.
          </div>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};
