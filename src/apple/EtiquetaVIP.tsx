/**
 * EtiquetaVIP — Labeling Effect / Pygmalion Effect. Cuando le ponés una
 * etiqueta positiva a alguien, empieza a actuar acorde a ella.
 * Un avatar genérico y apagado recibe la tarjeta "CLIENTE VIP" que cae
 * sobre él con glow Siri → se transforma visualmente → su comportamiento cambia.
 * El espectador ve que las etiquetas moldean la realidad.
 *
 * Lever: labeling effect / Pygmalion / expectancy. Paleta: dorado. C.
 */
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { Stage, SiriGlow, SiriFrame, BigType, ip, fonts } from './kit';

export const ETIQUETAVIP_DURATION = 292;

const GOLD = '#F59E0B';
const GOLD_L = '#FCD34D';
const GOLD_DIM = '#92400E';

export const EtiquetaVIP: React.FC = () => {
  const f = useCurrentFrame();

  const labelIn = ip(f, 8, 28, 0, 1) * (1 - ip(f, 205, 218, 0, 1));

  // Avatar "antes" — genérico y apagado
  const avatarIn = ip(f, 22, 52, 0, 1);

  // La etiqueta VIP cae desde arriba
  const tagDrop = ip(f, 88, 130, 0, 1);
  const tagGlow = ip(f, 118, 162, 0, 1) * (1 - ip(f, 202, 215, 0, 1));

  // La transformación del avatar
  const transform = ip(f, 125, 175, 0, 1);

  // Las acciones "VIP" aparecen
  const action1 = ip(f, 155, 178, 0, 1) * (1 - ip(f, 200, 212, 0, 1));
  const action2 = ip(f, 165, 188, 0, 1) * (1 - ip(f, 200, 212, 0, 1));
  const action3 = ip(f, 175, 198, 0, 1) * (1 - ip(f, 200, 212, 0, 1));

  const pay = ip(f, 218, 258, 0, 1);

  const avatarBg = transform > 0.1
    ? `radial-gradient(circle, ${GOLD}44 0%, ${GOLD_DIM}22 100%)`
    : 'rgba(255,255,255,0.07)';
  const avatarBorder = transform > 0.1
    ? `${GOLD}88`
    : 'rgba(255,255,255,0.15)';

  return (
    <Stage
      bg="radial-gradient(130% 92% at 50% 44%, #1A1000 0%, #080500 80%)"
      hue={GOLD}
      seed={6}
    >
      <div style={{
        position: 'absolute', top: 252, left: 0, right: 0, textAlign: 'center',
        fontFamily: fonts.mono, fontSize: 30, letterSpacing: '0.18em',
        color: 'rgba(255,255,255,0.50)', opacity: labelIn, zIndex: 30,
      }}>
        LAS ETIQUETAS MOLDEAN EL COMPORTAMIENTO
      </div>

      <AbsoluteFill style={{ opacity: 1 - pay }}>

        {/* Avatar central */}
        <div style={{
          position: 'absolute',
          top: 440, left: 0, right: 0,
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          opacity: avatarIn,
        }}>
          <div style={{
            position: 'relative',
            width: 180, height: 180, borderRadius: '50%',
            background: avatarBg,
            border: `3px solid ${avatarBorder}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: transform > 0.1 ? `0 0 60px ${GOLD}44` : 'none',
          }}>
            {transform > 0.1 && tagGlow > 0.01 && (
              <SiriGlow frame={f} intensity={tagGlow * 0.7} radius={90} inset={0} />
            )}
            <div style={{
              fontFamily: fonts.display, fontWeight: 900, fontSize: 88,
              color: transform > 0.1 ? GOLD_L : 'rgba(255,255,255,0.45)',
              textShadow: transform > 0.1 ? `0 0 30px ${GOLD}88` : 'none',
            }}>
              {transform > 0.5 ? '⭐' : '👤'}
            </div>
          </div>
          <div style={{
            fontFamily: fonts.display, fontWeight: 600, fontSize: 42,
            color: transform > 0.1 ? GOLD_L : 'rgba(255,255,255,0.42)',
            marginTop: 18,
            textShadow: transform > 0.1 ? `0 0 20px ${GOLD}66` : 'none',
          }}>
            {transform > 0.5 ? 'Cliente Premium' : 'Cliente genérico'}
          </div>
        </div>

        {/* La etiqueta VIP cayendo */}
        <div style={{
          position: 'absolute',
          top: 340 - (1 - tagDrop) * 180,
          left: 0, right: 0,
          display: 'flex', justifyContent: 'center',
          opacity: tagDrop * (1 - ip(f, 118, 135, 0, 1)),
        }}>
          <div style={{
            background: `${GOLD}28`,
            border: `2px solid ${GOLD_L}99`,
            borderRadius: 20, padding: '18px 52px',
            position: 'relative',
          }}>
            {tagGlow > 0.3 && (
              <SiriGlow frame={f} intensity={tagGlow * 0.6} radius={20} inset={-4} />
            )}
            <div style={{
              fontFamily: fonts.display, fontWeight: 900, fontSize: 68,
              color: GOLD_L, letterSpacing: '0.04em',
              textShadow: `0 0 30px ${GOLD}AA`,
            }}>
              ★ CLIENTE VIP ★
            </div>
          </div>
        </div>

        {/* Badge VIP en el avatar (post-transform) */}
        {transform > 0.3 && (
          <div style={{
            position: 'absolute', top: 490, left: 0, right: 0,
            display: 'flex', justifyContent: 'center',
            opacity: transform,
          }}>
            <div style={{
              background: GOLD,
              borderRadius: 50, padding: '10px 32px',
              display: 'flex', alignItems: 'center', gap: 12,
            }}>
              <div style={{ fontFamily: fonts.display, fontWeight: 900, fontSize: 32, color: '#000' }}>
                ★ VIP
              </div>
            </div>
          </div>
        )}

        {/* Acciones del cliente VIP */}
        <div style={{
          position: 'absolute', bottom: 450, left: 90, right: 130,
          display: 'flex', flexDirection: 'column', gap: 14,
        }}>
          {[
            { a: action1, text: '→ Responde más rápido a tus mensajes' },
            { a: action2, text: '→ Refiere a sus conocidos espontáneamente' },
            { a: action3, text: '→ No negocia el precio — siente que vale' },
          ].map((item, i) => (
            <div key={i} style={{
              opacity: item.a,
              transform: `translateX(${(1 - item.a) * -24}px)`,
              fontFamily: fonts.display, fontWeight: 600, fontSize: 38,
              color: `rgba(${255 - i * 20},${180 + i * 20},0,0.9)`,
            }}>
              {item.text}
            </div>
          ))}
        </div>
      </AbsoluteFill>

      {/* PAYOFF */}
      <AbsoluteFill style={{
        alignItems: 'center', justifyContent: 'center', textAlign: 'center',
        paddingLeft: 90, paddingRight: 130, opacity: pay, zIndex: 200,
      }}>
        <SiriFrame frame={f} intensity={pay} />
        <div style={{ transform: `translateY(${(1 - pay) * 26}px)` }}>
          <BigType frame={f} s={222} size={92} lines={[
            { t: 'Llamale "VIP".' },
            { t: 'Empezará a' },
            { t: 'actuar como tal.', hl: true },
          ]} />
          <div style={{
            fontFamily: fonts.display, fontWeight: 400, fontSize: 38,
            color: '#9A9AB5', marginTop: 32,
            opacity: ip(f, 268, 288, 0, 1),
          }}>
            Las etiquetas que ponés moldean el cliente que obtenés.
          </div>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};
