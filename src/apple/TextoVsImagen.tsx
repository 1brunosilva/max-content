/**
 * TextoVsImagen — Superioridad de imagen (Picture Superiority Effect).
 * Dos cards aparecen: una llena de texto, una con una imagen/visual clara.
 * El texto se difumina y desaparece de la "memoria". La imagen se mantiene.
 * El espectador VIVE qué se recuerda y qué se olvida.
 * Lever: superioridad de imagen / memoria visual. Paleta: dorado. C.
 */
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { Stage, SiriGlow, SiriFrame, ip, fonts } from './kit';

const GOLD   = '#E8B23A';
const GOLD_L = '#FFD97A';
const GOLD_D = '#78520A';

export const TEXTOVSIMAGEN_DURATION = 360;

export const TextoVsImagen: React.FC = () => {
  const f = useCurrentFrame();

  const labelOp   = ip(f,  8,  26, 0, 1) * (1 - ip(f, 102, 120, 0, 1));
  const textCardIn = ip(f, 18,  52, 0, 1);
  const imgCardIn  = ip(f, 38,  72, 0, 1);

  // La card de texto se difumina en la "memoria"
  const textFade = ip(f, 110, 150, 0, 1); // 0=nítida, 1=borrosa y tenue
  const textBlur = textFade * 8;

  // La card de imagen se enciende con glow
  const imgGlow  = ip(f, 114, 148, 0, 1);

  // Etiqueta de "se recuerda"
  const rememberOp = ip(f, 152, 172, 0, 1) * (1 - ip(f, 214, 232, 0, 1));
  const forgetOp   = ip(f, 160, 180, 0, 1) * (1 - ip(f, 214, 232, 0, 1));
  const sceneFade  = 1 - ip(f, 220, 240, 0, 1);

  const pay  = ip(f, 246, 266, 0, 1);
  const l1   = ip(f, 266, 282, 0, 1);
  const l2   = ip(f, 290, 308, 0, 1);
  const psub = ip(f, 320, 338, 0, 1);

  const CY = 860;
  const CW = 390;
  const CH = 460;

  return (
    <Stage bg="radial-gradient(130% 100% at 50% 44%, #1B1507 0%, #090701 82%)" hue={GOLD} seed={15}>
      <div style={{
        position: 'absolute', top: 272, left: 90, right: 130,
        textAlign: 'center', fontFamily: fonts.mono,
        fontSize: 36, letterSpacing: '0.16em',
        color: 'rgba(255,255,255,0.60)', opacity: labelOp, zIndex: 30,
      }}>
        ¿QUÉ SE RECUERDA?
      </div>

      <AbsoluteFill style={{ opacity: sceneFade, zIndex: 10 }}>

        {/* Card de TEXTO — densa, se olvida */}
        <div style={{
          position: 'absolute', left: '50%', top: CY,
          transform: 'translate(calc(-50% - 218px), -50%)',
          opacity: textCardIn * (1 - textFade * 0.75),
          filter: `blur(${textBlur}px)`,
        }}>
          <div style={{
            width: CW, height: CH, borderRadius: 34,
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.10)',
            backdropFilter: 'blur(14px)',
            padding: 40, display: 'flex', flexDirection: 'column', gap: 14,
          }}>
            <div style={{ fontFamily: fonts.mono, fontSize: 28, letterSpacing: '0.12em', color: 'rgba(150,150,165,0.65)' }}>
              NUESTRA EMPRESA
            </div>
            <div style={{
              fontFamily: fonts.display, fontSize: 34, color: 'rgba(160,160,180,0.65)',
              lineHeight: 1.4,
            }}>
              Somos una empresa con más de 10 años de experiencia en el sector, ofreciendo soluciones integrales y personalizadas para cada cliente, con un equipo altamente calificado y comprometido con la excelencia.
            </div>
            <div style={{
              fontFamily: fonts.display, fontSize: 30, color: 'rgba(130,130,150,0.50)',
              lineHeight: 1.4,
            }}>
              Nuestra misión es brindar el mejor servicio posible, superando las expectativas y generando valor en cada interacción con nuestros clientes.
            </div>
          </div>

          {/* Etiqueta "se olvida" */}
          <div style={{
            position: 'absolute', bottom: -64, left: '50%',
            transform: 'translateX(-50%)',
            fontFamily: fonts.mono, fontSize: 30, letterSpacing: '0.14em',
            color: 'rgba(220,80,80,0.75)', opacity: forgetOp,
            whiteSpace: 'nowrap',
          }}>✕ SE OLVIDA</div>
        </div>

        {/* Card IMAGEN — visual clara, se recuerda */}
        <div style={{
          position: 'absolute', left: '50%', top: CY,
          transform: 'translate(calc(-50% + 218px), -50%)',
          opacity: imgCardIn,
          zIndex: 10,
        }}>
          <SiriGlow frame={f} intensity={imgGlow} radius={34} />
          <div style={{
            width: CW, height: CH, borderRadius: 34,
            background: imgGlow > 0.05
              ? 'linear-gradient(165deg, #241A06 0%, #120D02 100%)'
              : 'rgba(255,255,255,0.05)',
            border: `1px solid ${imgGlow > 0.05 ? GOLD + '99' : 'rgba(255,255,255,0.10)'}`,
            backdropFilter: 'blur(14px)',
            boxShadow: imgGlow > 0.05 ? `0 50px 120px -28px ${GOLD}66` : '0 30px 80px -28px rgba(0,0,0,0.80)',
            overflow: 'hidden', position: 'relative',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20,
          }}>
            {/* Representación visual: gráfico simple de conversión */}
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16, height: 180 }}>
              {[40, 65, 90, 130, 180].map((h, i) => (
                <div key={i} style={{
                  width: 48, height: h,
                  borderRadius: '8px 8px 4px 4px',
                  background: i === 4
                    ? `linear-gradient(180deg, ${GOLD_L} 0%, ${GOLD} 100%)`
                    : `rgba(232,178,58,${0.18 + i * 0.08})`,
                  boxShadow: i === 4 ? `0 0 20px 4px ${GOLD}66` : 'none',
                }} />
              ))}
            </div>
            <div style={{
              fontFamily: fonts.display, fontWeight: 800, fontSize: 72,
              color: GOLD_L, letterSpacing: '-0.03em',
              textShadow: imgGlow > 0.05 ? `0 0 36px ${GOLD}aa` : 'none',
            }}>+34%</div>
            <div style={{
              fontFamily: fonts.display, fontSize: 38,
              color: `${GOLD_L}99`, textAlign: 'center',
            }}>conversión</div>
          </div>

          {/* Etiqueta "se recuerda" */}
          <div style={{
            position: 'absolute', bottom: -64, left: '50%',
            transform: 'translateX(-50%)',
            fontFamily: fonts.mono, fontSize: 30, letterSpacing: '0.14em',
            color: `${GOLD_L}cc`, opacity: rememberOp,
            whiteSpace: 'nowrap',
          }}>✓ SE RECUERDA</div>
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
            fontFamily: fonts.display, fontWeight: 800, fontSize: 96,
            color: '#FFF4D8', letterSpacing: '-0.035em', lineHeight: 1.06,
            opacity: l1, transform: `translateY(${(1 - l1) * 22}px)`,
          }}>Una imagen<br />vale más que</div>
          <div style={{
            fontFamily: fonts.display, fontWeight: 800, fontSize: 104,
            color: GOLD_L, letterSpacing: '-0.04em', lineHeight: 1.05,
            textShadow: `0 0 60px ${GOLD}bb`,
            opacity: l2, transform: `translateY(${(1 - l2) * 26}px)`,
          }}>mil palabras.</div>
          <div style={{
            fontFamily: fonts.display, fontSize: 50,
            color: GOLD_D, lineHeight: 1.45,
            opacity: psub, transform: `translateY(${(1 - psub) * 16}px)`,
            marginTop: 12,
          }}>
            Mostrá, no expliques.<br />El cerebro recuerda visuals.
          </div>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};
