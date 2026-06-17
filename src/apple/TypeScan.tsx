/**
 * TypeScan — Atención / escaneo ocular (F-pattern).
 * Un bloque de texto de landing aparece completo. Un "scanner" barre la pantalla
 * en 1 segundo y solo 2 palabras quedan iluminadas. El espectador vive que no lee.
 * Lever: atención selectiva / escaneo. Palette: violeta. Mode: editorial. C.
 */
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { Stage, Glass, SiriGlow, SiriFrame, BigType, ip, fonts, VLT, VLT_L } from './kit';

const BODY_LINES = [
  'Somos una empresa especializada en soluciones de',
  'automatización avanzada para empresas que buscan',
  'eficiencia operativa, reducción de costos y mejora',
  'continua en sus procesos de negocio digitales.',
];
const HIGHLIGHT_LINE = 1;
const HIGHLIGHT_WORD = 'automatización';

export const TYPESCAN_DURATION = 255;

export const TypeScan: React.FC = () => {
  const f = useCurrentFrame();

  // Fase 1: aparece el bloque de texto (0-40)
  // Fase 2: scanner barre de arriba a abajo (55-95)
  // Fase 3: solo 2 palabras quedan (100-140)
  // Fase 4: payoff (155-255)

  const textIn = ip(f, 8, 40, 0, 1);
  const scanY = ip(f, 55, 95, -60, 520);   // barra que barre verticalmente
  const scanOp = ip(f, 55, 70, 0, 0.85) * (1 - ip(f, 88, 100, 0, 1));
  const dimBody = ip(f, 96, 128, 0, 1);    // el cuerpo se desvanece
  const pay = ip(f, 155, 182, 0, 1);
  const labelOp = ip(f, 4, 18, 0, 1) * (1 - ip(f, 52, 68, 0, 1));

  return (
    <Stage bg="radial-gradient(118% 88% at 50% 36%, #13101D 0%, #060408 80%)" hue={VLT_L} seed={5}>
      <div style={{
        position: 'absolute', top: 130, left: 0, right: 0, textAlign: 'center',
        fontFamily: fonts.mono, fontSize: 22, letterSpacing: '0.18em',
        color: 'rgba(255,255,255,0.65)', opacity: labelOp, zIndex: 30,
      }}>
        TU LANDING · COMO LA VE EL CLIENTE
      </div>

      {/* Bloque de texto de landing */}
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', opacity: 1 - pay }}>
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          <Glass w={860} h={480} pad={56}>
            <div style={{ fontFamily: fonts.mono, fontSize: 17, color: '#4A4A62', letterSpacing: '0.06em', marginBottom: 22 }}>
              SERVICIOS · EMPRESA
            </div>
            {BODY_LINES.map((line, li) => {
              const words = line.split(' ');
              return (
                <div key={li} style={{ fontFamily: fonts.display, fontWeight: 500, fontSize: 32, lineHeight: 1.55, letterSpacing: '-0.01em', marginBottom: 4 }}>
                  {words.map((w, wi) => {
                    const isKey = li === HIGHLIGHT_LINE && w.startsWith(HIGHLIGHT_WORD);
                    const op = isKey
                      ? textIn
                      : textIn * (1 - dimBody * 0.9);
                    return (
                      <span key={wi} style={{ color: isKey ? VLT_L : '#5A5A78', opacity: op, marginRight: '0.28em', position: 'relative' }}>
                        {isKey && dimBody > 0.5 ? <SiriGlow frame={f} intensity={dimBody * 0.8} radius={4} inset={-8} /> : null}
                        {w}
                      </span>
                    );
                  })}
                </div>
              );
            })}
            {/* Línea "RESULTADOS" como 2da palabra destacada */}
            <div style={{ marginTop: 8, fontFamily: fonts.display, fontWeight: 700, fontSize: 32, letterSpacing: '-0.02em' }}>
              <span style={{ color: '#3A3A52', opacity: textIn * (1 - dimBody * 0.9) }}>Contáctenos para obtener </span>
              <span style={{ color: VLT_L, opacity: textIn, position: 'relative' }}>
                {dimBody > 0.5 ? <SiriGlow frame={f} intensity={dimBody * 0.7} radius={4} inset={-8} /> : null}
                resultados.
              </span>
            </div>
          </Glass>

          {/* Scanner bar */}
          {scanOp > 0.01 ? (
            <div style={{
              position: 'absolute', left: -20, right: -20, top: scanY,
              height: 3,
              background: `linear-gradient(90deg, transparent 0%, ${VLT} 20%, #4FE0FF 50%, ${VLT} 80%, transparent 100%)`,
              opacity: scanOp,
              filter: 'blur(1px)',
              boxShadow: `0 0 24px 4px ${VLT}88`,
            }} />
          ) : null}
        </div>
      </AbsoluteFill>

      {/* Payoff */}
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 96, opacity: pay, zIndex: 200 }}>
        <SiriFrame frame={f} intensity={pay} />
        <div style={{ transform: `translateY(${(1 - pay) * 28}px)` }}>
          <BigType frame={f} s={155} size={88} lines={[
            { t: 'En 1 segundo,' },
            { t: 'tu cliente capta' },
            { t: '2 palabras.', hl: true },
          ]} />
          <div style={{ fontFamily: fonts.display, fontSize: 34, color: '#8A8AAA', marginTop: 28, opacity: ip(f, 190, 212, 0, 1) }}>
            Escanea, no lee. ¿Cuáles elegiste tú?
          </div>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};
