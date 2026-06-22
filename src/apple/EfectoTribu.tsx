/**
 * EfectoTribu — In-group Favoritism / Tribal Identity. Un feed de logos genéricos
 * (fríos, anónimos, "de afuera") pasa en cover-flow. Cuando aparece el negocio LOCAL
 * con el badge "Uruguay" y nombre real, toda la pantalla explota con glow cálido verde-dorado.
 * El espectador vive que ser local es una ventaja, no un límite.
 *
 * Lever: in-group favoritism / tribal belonging. Paleta: verde-dorado. C.
 */
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { Stage, Glass, SiriGlow, SiriFrame, BigType, ip, fonts, verbs } from './kit';

export const EFECTOTRIBU_DURATION = 312;

const GREEN = '#10B981';
const GREEN_L = '#34D399';
const GOLD = '#F59E0B';
const GOLD_L = '#FCD34D';

const BRANDS = [
  { name: 'GlobalCorp', sub: 'Internacional · Sin contacto local', local: false },
  { name: 'MegaAgency', sub: 'HQ: Miami · Responde en 5 días', local: false },
  { name: 'Tu Negocio', sub: 'Montevideo · Responde en minutos', local: true },
  { name: 'DigiPro', sub: 'Buenos Aires · Plantillas genéricas', local: false },
  { name: 'FlowDesk', sub: 'España · Sin soporte en español UY', local: false },
];

const CENTER = 2; // el negocio local es la card central (índice 2)

export const EfectoTribu: React.FC = () => {
  const f = useCurrentFrame();

  const labelOp = ip(f, 8, 28, 0, 1) * (1 - ip(f, 232, 250, 0, 1));

  // Fan abre
  const fanP = ip(f, 22, 80, 0, 1);
  // Focus en el local
  const focusP = ip(f, 98, 148, 0, 1);
  // Glow local
  const glowLocal = ip(f, 130, 175, 0, 1);
  // Badge sube
  const badgeIn = ip(f, 165, 195, 0, 1) * (1 - ip(f, 232, 248, 0, 1));

  const pay = ip(f, 240, 278, 0, 1);

  const CARD_W = 620;
  const CARD_H = 320;

  return (
    <Stage
      bg="radial-gradient(130% 92% at 50% 44%, #041008 0%, #020604 80%)"
      hue={GREEN}
      seed={12}
    >
      {/* Label */}
      <div style={{
        position: 'absolute', top: 252, left: 0, right: 0, textAlign: 'center',
        fontFamily: fonts.mono, fontSize: 34, letterSpacing: '0.16em',
        color: 'rgba(255,255,255,0.58)', opacity: labelOp, zIndex: 30,
      }}>
        ENTRE TODOS LOS IGUALES…
      </div>

      <AbsoluteFill style={{ opacity: 1 - pay }}>
        {/* Cover-flow de marcas */}
        <div style={{
          position: 'absolute',
          top: 820 - CARD_H / 2,
          left: 540 - CARD_W / 2,
          width: CARD_W, height: CARD_H,
        }}>
          {BRANDS.map((brand, i) => {
            const o = i - CENTER;
            const isLocal = brand.local;
            const isCenter = i === CENTER;
            const focus = isCenter ? focusP : 0;
            const glow = isLocal ? glowLocal : 0;

            const fanT = verbs.fan(o, fanP, 280, 100, 14, 20);
            const focusT = isCenter ? `translateZ(${focus * 120}px) scale(${1 + focus * 0.15})` : '';

            const cardIn = ip(f, 25 + i * 6, 48 + i * 6, 0, 1);

            return (
              <div key={i} style={{
                position: 'absolute', top: 0, left: 0,
                width: CARD_W, height: CARD_H,
                transform: `${fanT} ${focusT}`,
                opacity: cardIn * (isCenter ? 1 : Math.max(0.25, 1 - focusP * 0.65)),
              }}>
                <div style={{ position: 'relative' }}>
                  {isLocal && glow > 0.1 && (
                    <SiriGlow frame={f} intensity={glow * 0.85} radius={28} />
                  )}
                  <Glass
                    w={CARD_W} h={CARD_H}
                    selected={isCenter && focusP > 0.5}
                    pad={40}
                    style={{
                      borderColor: isLocal && glow > 0.3 ? GREEN + '88' : undefined,
                      boxShadow: isLocal && glow > 0.3 ? `0 40px 100px -24px ${GREEN}55` : undefined,
                      background: isLocal && glow > 0.3
                        ? 'linear-gradient(165deg,#071A0E 0%,#030C06 100%)'
                        : undefined,
                    }}
                  >
                    {isLocal && (
                      <div style={{
                        fontFamily: fonts.mono, fontSize: 22, color: GREEN_L,
                        letterSpacing: '0.10em', marginBottom: 10,
                        opacity: glow,
                      }}>
                        🇺🇾 LOCAL · URUGUAYO
                      </div>
                    )}
                    <div style={{
                      fontFamily: fonts.display, fontWeight: 800, fontSize: 48,
                      color: isLocal && glow > 0.3 ? GREEN_L : 'rgba(255,255,255,0.78)',
                      textShadow: isLocal && glow > 0.4 ? `0 0 24px ${GREEN}88` : 'none',
                    }}>
                      {brand.name}
                    </div>
                    <div style={{
                      fontFamily: fonts.display, fontWeight: 400, fontSize: 32,
                      color: isLocal && glow > 0.3 ? `${GREEN_L}CC` : 'rgba(255,255,255,0.38)',
                      marginTop: 10, lineHeight: 1.3,
                    }}>
                      {brand.sub}
                    </div>
                  </Glass>
                </div>
              </div>
            );
          })}
        </div>

        {/* Badge "tu mayor ventaja" */}
        <div style={{
          position: 'absolute', bottom: 440, left: 90, right: 130,
          textAlign: 'center', opacity: badgeIn,
          transform: `translateY(${(1 - badgeIn) * 18}px)`,
        }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 16,
            background: `${GOLD}1A`, borderRadius: 50,
            border: `1px solid ${GOLD}55`, padding: '18px 44px',
          }}>
            <div style={{ width: 14, height: 14, borderRadius: '50%', background: GOLD_L }} />
            <div style={{ fontFamily: fonts.display, fontWeight: 700, fontSize: 38, color: GOLD_L }}>
              Ser local es tu mayor ventaja
            </div>
          </div>
        </div>
      </AbsoluteFill>

      {/* PAYOFF */}
      <AbsoluteFill style={{
        alignItems: 'center', justifyContent: 'center', textAlign: 'center',
        paddingLeft: 90, paddingRight: 130, opacity: pay, zIndex: 200,
      }}>
        <SiriFrame frame={f} intensity={pay} />
        <div style={{ transform: `translateY(${(1 - pay) * 26}px)` }}>
          <BigType frame={f} s={240} size={92} lines={[
            { t: 'Los negocios de afuera' },
            { t: 'tienen más marketing.' },
            { t: 'Vos tenés', hl: false },
            { t: 'algo mejor.', hl: true },
          ]} />
          <div style={{
            fontFamily: fonts.display, fontWeight: 400, fontSize: 38, color: '#9A9AB5',
            marginTop: 30, opacity: ip(f, 284, 305, 0, 1),
          }}>
            Tu tribu ya te conoce. Solo falta que te vean.
          </div>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};
