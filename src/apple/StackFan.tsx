/**
 * StackFan — SEGUNDO mecanismo (distinto a CardWheel), mismo ADN (kit).
 * Prueba de que entiendo el ESTILO, no una animación: una PILA de opciones que se
 * DESPLIEGA en abanico 3D (abrumar) → colapsa a UNA con glow Siri → payoff.
 *
 * Tema NUEVO (psicología de la decisión / paradoja de la elección): cuantas más
 * opciones le das al cliente, menos decide. Nada de precio ni chatbot.
 */
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { Stage, Drift, Glass, SiriGlow, SiriFrame, BigType, ip, fonts, VLT_L } from './kit';

// IMPAR a propósito: una card queda en el centro exacto (o=0) y el resto se abre
// a los costados sin pisarse. La del centro es la elegida.
const OPTS = ['Plan Pro', 'A medida', 'Combo', 'Plan Anual', 'Personalizado'];
const N = OPTS.length;          // 5
const M = (N - 1) / 2;          // 2 (entero) = centro
const CHOSEN = 2;               // la card central sobrevive
const CW = 520, CH = 300;

export const STACKFAN_DURATION = 250;

export const StackFan: React.FC = () => {
  const f = useCurrentFrame();
  const appear = ip(f, 0, 14, 0, 1);
  const fan = ip(f, 16, 84, 0, 1);          // se despliega (momentum)
  const collapse = ip(f, 122, 172, 0, 1);   // colapsa a una
  const chosenRise = ip(f, 124, 176, 0, 1);
  const glow = ip(f, 150, 178, 0, 1);
  const pay = ip(f, 182, 210, 0, 1);
  const chosenFade = ip(f, 184, 204, 1, 0); // la card elegida se va cuando entra el payoff
  const wheelGone = 1 - collapse;

  const lab1 = ip(f, 24, 44, 0, 1) * (1 - ip(f, 96, 112, 0, 1));
  const big1 = ip(f, 92, 116, 0, 1) * (1 - ip(f, 120, 136, 0, 1));

  return (
    <Stage bg="radial-gradient(120% 100% at 50% 18%, #1A1622 0%, #070608 76%)" hue="#5B8CFF" seed={3}>
      {/* label arriba */}
      <div style={{ position: 'absolute', top: 130, left: 0, right: 0, textAlign: 'center', fontFamily: fonts.mono, fontSize: 24, letterSpacing: '0.18em', color: 'rgba(255,255,255,0.72)', opacity: lab1, zIndex: 30 }}>
        LE DISTE 5 OPCIONES
      </div>
      {/* statement que abruma */}
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'flex-start', paddingTop: 230, opacity: big1, zIndex: 30 }}>
        <BigType frame={f} s={92} size={92} lines={[{ t: 'Y no eligió' }, { t: 'ninguna.', hl: true }]} />
      </AbsoluteFill>

      {/* LA PILA → ABANICO 3D */}
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Drift amp={4}>
          <div style={{ position: 'relative', transformStyle: 'preserve-3d', width: 0, height: 0 }}>
            {OPTS.map((txt, i) => {
              const o = i - M;
              const chosen = i === CHOSEN;
              // ABANICO cover-flow: más giro + profundidad → los costados se hunden y
              // giran (no se pisan planos). gap 300, rot 44 (clamp 60), tz 260.
              const tx = o * 300 * fan;
              const ry = Math.max(-60, Math.min(60, -o * 44)) * fan;
              const tz = (-Math.abs(o) * 260) * fan + (chosen ? chosenRise * 340 : 0);
              const ty0 = -Math.abs(o) * 12 * fan; // arco sutil
              // colapso: las no elegidas caen y se van; la elegida se centra al frente
              const ty = chosen ? ty0 * (1 - chosenRise) : ty0 + collapse * 760;
              const txC = chosen ? tx * (1 - chosenRise) : tx;
              // atenuar laterales para que el centro mande (no compiten)
              const sideDim = chosen ? 1 : 1 - Math.min(Math.abs(o) * 0.24, 0.7);
              const op = (chosen ? chosenFade : wheelGone * sideDim) * appear;
              const sc = chosen ? 1 + chosenRise * 0.28 : 1;
              if (op <= 0.01) return null;
              return (
                <div key={i} style={{ position: 'absolute', left: -CW / 2, top: -CH / 2, width: CW, height: CH, transform: `translateX(${txC}px) translateY(${ty}px) translateZ(${tz}px) rotateY(${ry}deg) scale(${sc})`, transformOrigin: 'center', opacity: op, zIndex: chosen ? 100 : 50 - Math.round(Math.abs(o)) }}>
                  {/* la elegida se "enciende" recién en el colapso (antes todas iguales) */}
                  {chosen ? <SiriGlow frame={f} intensity={glow * chosenFade} radius={34} /> : null}
                  <Glass w={CW} h={CH} selected={chosen && collapse > 0.02} pad={40} style={{ justifyContent: 'space-between' }}>
                    <div style={{ fontFamily: fonts.mono, fontSize: 18, letterSpacing: '0.08em', color: chosen && collapse > 0.02 ? VLT_L : '#8A8AA0' }}>OPCIÓN</div>
                    <div style={{ fontFamily: fonts.display, fontWeight: 700, fontSize: 56, color: '#F2F2FA', letterSpacing: '-0.02em' }}>{txt}</div>
                    <div style={{ height: 8, borderRadius: 8, background: chosen && collapse > 0.02 ? `linear-gradient(90deg, ${VLT_L}, #5B8CFF)` : 'rgba(255,255,255,0.1)' }} />
                  </Glass>
                </div>
              );
            })}
          </div>
        </Drift>
      </AbsoluteFill>

      {/* PAYOFF — adentro del marco de glow (no template plano) */}
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 96, opacity: pay, zIndex: 200 }}>
        <SiriFrame frame={f} intensity={pay} />
        <div style={{ transform: `translateY(${(1 - pay) * 26}px)` }}>
          <BigType frame={f} s={178} size={104} lines={[{ t: 'Menos opciones.' }, { t: 'Más ventas.', hl: true }]} />
          <div style={{ fontFamily: fonts.display, fontSize: 34, color: '#9A9AB5', marginTop: 32, opacity: ip(f, 204, 226, 0, 1) }}>El cliente confundido nunca compra.</div>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};
