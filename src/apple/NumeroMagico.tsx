/**
 * NumeroMagico — Anclaje numérico / mostrar el valor antes del precio.
 * Un número GRANDE aparece primero: el valor entregado ($24.900). Se ve enorme.
 * Después se revela el precio real ($4.900) — y de repente parece una ganga.
 * El espectador VIVE el efecto: el primer número ancla todo lo que viene.
 * Lever: anclaje numérico / percepción de valor. Paleta: violeta. C.
 */
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { Stage, SiriGlow, SiriFrame, ip, fonts, VLT, VLT_L } from './kit';

export const NUMEROMAGICO_DURATION = 330;

const fmt = (n: number) => '$' + n.toLocaleString('es-UY');

export const NumeroMagico: React.FC = () => {
  const f = useCurrentFrame();

  const labelOp = ip(f,  8,  26, 0, 1) * (1 - ip(f,  82, 100, 0, 1));

  // Fase 1: el valor enorme aparece
  const valueIn  = ip(f, 16,  50, 0, 1);
  const valueTag = ip(f, 54,  72, 0, 1);

  // Fase 2: el valor se achica y sube; aparece el precio real
  const shrinkV  = ip(f, 92, 130, 0, 1);  // 0→1: valor sube y achica
  const priceIn  = ip(f, 118, 152, 0, 1); // precio aparece debajo
  const glowI    = ip(f, 148, 180, 0, 1); // glow Siri en precio
  const strikeOp = ip(f, 164, 188, 0, 1); // "ahorro" aparece

  const sceneFade = 1 - ip(f, 202, 222, 0, 1);

  const pay  = ip(f, 228, 248, 0, 1);
  const l1   = ip(f, 248, 264, 0, 1);
  const l2   = ip(f, 272, 290, 0, 1);
  const psub = ip(f, 300, 318, 0, 1);

  // Posiciones interpoladas del valor grande
  const valueSizeBase = 160;
  const valueSize  = valueSizeBase - shrinkV * 60;   // 160 → 100
  const valueTopPos = 860 - shrinkV * 260;            // baja al centro → sube

  return (
    <Stage bg="radial-gradient(130% 100% at 50% 44%, #130D1E 0%, #060409 80%)" hue={VLT_L} seed={3}>
      <div style={{
        position: 'absolute', top: 272, left: 90, right: 130,
        textAlign: 'center', fontFamily: fonts.mono,
        fontSize: 36, letterSpacing: '0.18em',
        color: 'rgba(255,255,255,0.60)', opacity: labelOp, zIndex: 30,
      }}>
        EL NÚMERO QUE LO CAMBIA TODO
      </div>

      <AbsoluteFill style={{ opacity: sceneFade, zIndex: 10 }}>

        {/* Valor entregado (ancla) */}
        <div style={{
          position: 'absolute', left: '50%',
          top: valueTopPos,
          transform: `translate(-50%, -50%)`,
          opacity: valueIn,
          textAlign: 'center',
        }}>
          <div style={{
            fontFamily: fonts.mono, fontSize: 36, letterSpacing: '0.16em',
            color: 'rgba(160,140,200,0.65)',
            opacity: valueTag,
            marginBottom: 12,
          }}>VALOR ENTREGADO</div>
          <div style={{
            fontFamily: fonts.display, fontWeight: 800,
            fontSize: valueSize,
            color: 'rgba(220,210,240,0.88)',
            letterSpacing: '-0.04em', lineHeight: 1,
            transition: 'font-size 0s',
          }}>{fmt(24900)}</div>
          <div style={{
            fontFamily: fonts.mono, fontSize: 34,
            color: 'rgba(160,140,200,0.55)',
            opacity: valueTag, marginTop: 8,
          }}>en automatización + IA + soporte</div>
        </div>

        {/* Precio real (con glow Siri) */}
        <div style={{
          position: 'absolute', left: '50%', top: 1040,
          transform: 'translate(-50%, -50%)',
          opacity: priceIn,
          textAlign: 'center',
        }}>
          <div style={{
            fontFamily: fonts.mono, fontSize: 36, letterSpacing: '0.16em',
            color: `${VLT_L}99`, marginBottom: 12,
          }}>TU INVERSIÓN</div>
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <SiriGlow frame={f} intensity={glowI} radius={20} />
            <div style={{
              fontFamily: fonts.display, fontWeight: 800, fontSize: 140,
              color: VLT_L, letterSpacing: '-0.04em', lineHeight: 1,
              textShadow: glowI > 0.05 ? `0 0 60px ${VLT}cc` : 'none',
              position: 'relative', zIndex: 1,
            }}>{fmt(4900)}</div>
          </div>
          <div style={{
            fontFamily: fonts.mono, fontSize: 34,
            color: `${VLT_L}88`, marginTop: 8,
          }}>/ mes</div>

          {/* Ahorro destacado */}
          <div style={{
            fontFamily: fonts.display, fontSize: 52, fontWeight: 700,
            color: '#34D399',
            marginTop: 20, opacity: strikeOp,
            transform: `translateY(${(1 - strikeOp) * 12}px)`,
          }}>
            Ahorrás $20.000 vs. contratar
          </div>
        </div>
      </AbsoluteFill>

      {/* PAYOFF */}
      <AbsoluteFill style={{
        alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', padding: '0 96px',
        opacity: pay, zIndex: 200,
      }}>
        <SiriFrame frame={f} intensity={pay} />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 22 }}>
          <div style={{
            fontFamily: fonts.display, fontWeight: 800, fontSize: 92,
            color: '#E0D0FF', letterSpacing: '-0.035em', lineHeight: 1.06,
            opacity: l1, transform: `translateY(${(1 - l1) * 22}px)`,
          }}>El primer número<br />ancla todo.</div>
          <div style={{
            fontFamily: fonts.display, fontWeight: 800, fontSize: 100,
            color: VLT_L, letterSpacing: '-0.04em', lineHeight: 1.05,
            textShadow: `0 0 60px ${VLT}bb`,
            opacity: l2, transform: `translateY(${(1 - l2) * 26}px)`,
          }}>Mostrá el valor<br />antes del precio.</div>
          <div style={{
            fontFamily: fonts.display, fontSize: 50,
            color: 'rgba(160,130,210,0.70)', lineHeight: 1.45,
            opacity: psub, transform: `translateY(${(1 - psub) * 16}px)`,
            marginTop: 12,
          }}>
            El precio siempre es relativo<br />a lo que mostraste antes.
          </div>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};
