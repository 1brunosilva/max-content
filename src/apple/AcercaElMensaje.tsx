/**
 * AcercaElMensaje — Construal Level Theory / Psychological Distance.
 * Trope & Liberman: cuanto más lejos psicológicamente (abstracto/lejano),
 * más abstracto es el pensamiento. Al acercar el mensaje al mundo concreto
 * del cliente, la persuasión se dispara. Un mensaje abstracto → zoom in →
 * se transforma en mensaje específico y cercano → glow.
 *
 * Lever: construal level theory / psychological distance. Paleta: cyan. C.
 */
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { Stage, SiriGlow, SiriFrame, BigType, ip, fonts } from './kit';

export const ACERCAELMENSAJE_DURATION = 288;

const CYAN = '#4FE0FF';

export const AcercaElMensaje: React.FC = () => {
  const f = useCurrentFrame();

  const labelIn = ip(f, 8, 28, 0, 1) * (1 - ip(f, 200, 215, 0, 1));

  // Mensaje lejano / abstracto
  const abstractIn = ip(f, 25, 55, 0, 1);
  const abstractFade = ip(f, 98, 132, 0, 1);

  // Zoom in / acercamiento
  const zoomScale = 1 + ip(f, 90, 125, 0, 0.6);
  const zoomFade = ip(f, 110, 135, 0, 1);

  // Mensaje cercano / concreto
  const concreteIn = ip(f, 138, 168, 0, 1);
  const glowConcrete = ip(f, 168, 198, 0, 1) * (1 - ip(f, 198, 215, 0, 1));

  // Stats
  const statsIn = ip(f, 178, 200, 0, 1) * (1 - ip(f, 198, 215, 0, 1));

  const pay = ip(f, 217, 256, 0, 1);

  return (
    <Stage
      bg="radial-gradient(130% 92% at 50% 44%, #030D12 0%, #020508 80%)"
      hue={CYAN}
      seed={8}
    >
      <div style={{
        position: 'absolute', top: 252, left: 0, right: 0, textAlign: 'center',
        fontFamily: fonts.mono, fontSize: 30, letterSpacing: '0.18em',
        color: 'rgba(255,255,255,0.50)', opacity: labelIn, zIndex: 30,
      }}>
        LEJOS VS CERCA
      </div>

      <AbsoluteFill style={{ opacity: 1 - pay }}>

        {/* MENSAJE ABSTRACTO / LEJANO */}
        <div style={{
          position: 'absolute', top: 340, left: 90, right: 130,
          opacity: abstractIn * (1 - abstractFade),
          transform: `scale(${zoomScale}) translateY(${(1 - abstractIn) * 22}px)`,
          transformOrigin: 'center top',
        }}>
          <div style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 28, padding: '40px 50px',
            filter: `blur(${zoomFade * 6}px)`,
          }}>
            <div style={{
              fontFamily: fonts.mono, fontSize: 24, color: 'rgba(255,255,255,0.25)',
              letterSpacing: '0.16em', marginBottom: 20,
            }}>
              MENSAJE GENÉRICO
            </div>

            {/* Distancia psicológica visual */}
            <div style={{
              fontFamily: fonts.display, fontWeight: 700, fontSize: 54,
              color: 'rgba(255,255,255,0.30)', lineHeight: 1.2,
            }}>
              "Soluciones digitales para empresas que buscan crecer"
            </div>

            <div style={{
              fontFamily: fonts.mono, fontSize: 26, color: 'rgba(255,255,255,0.18)',
              marginTop: 18,
            }}>
              📡 Dirigido a: todos  ·  Sentido por: nadie
            </div>
          </div>
        </div>

        {/* Flecha zoom */}
        <div style={{
          position: 'absolute', top: 590, left: 0, right: 0, textAlign: 'center',
          fontFamily: fonts.mono, fontSize: 48, color: CYAN,
          opacity: ip(f, 128, 148, 0, 1) * (1 - ip(f, 170, 188, 0, 1)),
          transform: `scale(${0.8 + ip(f, 128, 148, 0, 0.2)})`,
        }}>
          ↓ acercá
        </div>

        {/* MENSAJE CONCRETO / CERCANO */}
        <div style={{
          position: 'absolute', top: 620, left: 90, right: 130,
          opacity: concreteIn,
          transform: `translateY(${(1 - concreteIn) * 22}px)`,
        }}>
          <div style={{
            background: glowConcrete > 0.1 ? `${CYAN}0E` : 'rgba(255,255,255,0.05)',
            border: `1.5px solid ${glowConcrete > 0.1 ? CYAN + '44' : 'rgba(255,255,255,0.12)'}`,
            borderRadius: 28, padding: '40px 50px',
            position: 'relative',
          }}>
            {glowConcrete > 0.01 && (
              <SiriGlow frame={f} intensity={glowConcrete * 0.9} radius={28} inset={0} />
            )}
            <div style={{
              fontFamily: fonts.mono, fontSize: 24,
              color: glowConcrete > 0.3 ? CYAN : 'rgba(255,255,255,0.35)',
              letterSpacing: '0.16em', marginBottom: 20,
            }}>
              MENSAJE ESPECÍFICO Y CERCANO
            </div>

            <div style={{
              fontFamily: fonts.display, fontWeight: 700, fontSize: 54,
              color: glowConcrete > 0.3 ? '#F4F4FA' : 'rgba(255,255,255,0.55)',
              lineHeight: 1.2,
            }}>
              "Para la peluquería de Montevideo que pierde clientes sin saberlo"
            </div>

            <div style={{
              fontFamily: fonts.mono, fontSize: 26,
              color: glowConcrete > 0.3 ? '#4ADE80' : 'rgba(255,255,255,0.28)',
              marginTop: 18,
            }}>
              📍 "Ese soy yo" · Tasa de conversión: 3.4×
            </div>
          </div>
        </div>

        {/* Stats */}
        {statsIn > 0.1 && (
          <div style={{
            position: 'absolute', bottom: 442, left: 0, right: 0,
            textAlign: 'center', opacity: statsIn,
            transform: `translateY(${(1 - statsIn) * 16}px)`,
          }}>
            <div style={{
              display: 'inline-block',
              background: `${CYAN}12`, border: `1px solid ${CYAN}44`,
              borderRadius: 50, padding: '14px 44px',
              fontFamily: fonts.display, fontWeight: 700, fontSize: 36, color: CYAN,
            }}>
              Hablar a uno = vender. Hablar a todos = silencio.
            </div>
          </div>
        )}
      </AbsoluteFill>

      {/* PAYOFF */}
      <AbsoluteFill style={{
        alignItems: 'center', justifyContent: 'center', textAlign: 'center',
        paddingLeft: 90, paddingRight: 130, opacity: pay, zIndex: 200,
      }}>
        <SiriFrame frame={f} intensity={pay} />
        <div style={{ transform: `translateY(${(1 - pay) * 26}px)` }}>
          <BigType frame={f} s={221} size={92} lines={[
            { t: 'Cuanto más cerca' },
            { t: 'te sentís del mensaje,' },
            { t: 'más comprás.', hl: true },
          ]} />
          <div style={{
            fontFamily: fonts.display, fontWeight: 400, fontSize: 38,
            color: '#9A9AB5', marginTop: 32,
            opacity: ip(f, 264, 284, 0, 1),
          }}>
            Escribí para una persona. No para el mercado.
          </div>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};
