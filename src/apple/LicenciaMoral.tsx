/**
 * LicenciaMoral — Moral Licensing. Cuando hacés algo "bueno", el cerebro
 * siente que merecés algo "malo". La barra verde de logros se llena
 * → aparece un UNLOCK con glow → la oferta tentadora entra con toda la luz.
 * El espectador vive el permiso interno que le da a sí mismo.
 *
 * Lever: moral licensing / self-permission. Paleta: verde → dorado. C.
 */
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { Stage, SiriGlow, SiriFrame, BigType, ip, fonts, Glass } from './kit';

export const LICENCIAMORAL_DURATION = 298;

const GREEN = '#10B981';
const GREEN_L = '#34D399';
const GOLD = '#F59E0B';
const GOLD_L = '#FCD34D';

const GOOD_ACTIONS = [
  '✓  Respondiste todos los mensajes',
  '✓  Completaste el presupuesto',
  '✓  Actualizaste el CRM',
];

export const LicenciaMoral: React.FC = () => {
  const f = useCurrentFrame();

  // Fase 1: el label de "lograste" aparece
  const labelIn = ip(f, 8, 30, 0, 1) * (1 - ip(f, 198, 212, 0, 1));

  // Cada acción buena aparece escalonada
  const actionIn = (i: number) => ip(f, 28 + i * 20, 52 + i * 20, 0, 1);

  // La barra de progreso se llena (0 → 100%)
  const barFill = ip(f, 38, 115, 0, 1);
  const barIn = ip(f, 30, 50, 0, 1) * (1 - ip(f, 198, 210, 0, 1));

  // El candado se abre con slam
  const unlockIn = ip(f, 118, 148, 0, 1);
  const unlockPulse = 0.85 + 0.15 * Math.sin(f * 0.2);

  // La oferta tentadora entra desde abajo
  const offerIn = ip(f, 152, 188, 0, 1);
  const offerGlow = ip(f, 162, 198, 0, 1) * (1 - ip(f, 218, 232, 0, 1));

  const pay = ip(f, 224, 262, 0, 1);

  return (
    <Stage
      bg="radial-gradient(130% 92% at 50% 44%, #071A0F 0%, #030A06 80%)"
      hue={GREEN}
      seed={5}
    >
      {/* Label superior */}
      <div style={{
        position: 'absolute', top: 252, left: 0, right: 0, textAlign: 'center',
        fontFamily: fonts.mono, fontSize: 30, letterSpacing: '0.18em',
        color: 'rgba(255,255,255,0.52)', opacity: labelIn, zIndex: 30,
      }}>
        HOY FUE UN DÍA PRODUCTIVO
      </div>

      <AbsoluteFill style={{ opacity: 1 - pay }}>
        {/* Acciones buenas */}
        <div style={{
          position: 'absolute', top: 316, left: 90, right: 130,
          display: 'flex', flexDirection: 'column', gap: 18,
        }}>
          {GOOD_ACTIONS.map((action, i) => (
            <div key={i} style={{
              opacity: actionIn(i),
              transform: `translateX(${(1 - actionIn(i)) * -28}px)`,
              background: `${GREEN}18`,
              border: `1px solid ${GREEN}44`,
              borderRadius: 20, padding: '22px 36px',
              fontFamily: fonts.display, fontWeight: 600, fontSize: 42,
              color: GREEN_L,
              textShadow: `0 0 24px ${GREEN}66`,
            }}>
              {action}
            </div>
          ))}
        </div>

        {/* Barra de progreso moral */}
        <div style={{
          position: 'absolute', top: 638, left: 90, right: 130,
          opacity: barIn,
        }}>
          <div style={{
            fontFamily: fonts.mono, fontSize: 26, color: 'rgba(255,255,255,0.38)',
            letterSpacing: '0.12em', marginBottom: 14,
          }}>
            BALANCE MORAL HOY
          </div>
          <div style={{
            height: 36, borderRadius: 18,
            background: 'rgba(255,255,255,0.06)',
            position: 'relative', overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute', top: 0, left: 0,
              width: `${barFill * 100}%`, height: '100%',
              borderRadius: 18,
              background: `linear-gradient(90deg, ${GREEN} 0%, ${GREEN_L} 100%)`,
              boxShadow: `0 0 20px ${GREEN}88`,
            }} />
          </div>
          <div style={{
            fontFamily: fonts.display, fontWeight: 700, fontSize: 38,
            color: GREEN_L, marginTop: 10, textAlign: 'right',
          }}>
            {Math.round(barFill * 100)}% completado
          </div>
        </div>

        {/* UNLOCK */}
        {unlockIn > 0.01 && (
          <div style={{
            position: 'absolute', top: 760, left: 0, right: 0,
            display: 'flex', justifyContent: 'center',
            opacity: unlockIn * unlockPulse,
            transform: `scale(${0.7 + unlockIn * 0.3})`,
          }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 20,
              background: `${GOLD}22`, border: `2px solid ${GOLD}88`,
              borderRadius: 50, padding: '18px 52px',
              position: 'relative',
            }}>
              <SiriGlow frame={f} intensity={unlockIn * 0.9} radius={50} inset={-2} />
              <div style={{ fontFamily: fonts.display, fontWeight: 900, fontSize: 52, color: GOLD_L, letterSpacing: '-0.02em' }}>
                🔓 MEREC ÉS UN RESPIRO
              </div>
            </div>
          </div>
        )}

        {/* La oferta tentadora */}
        {offerIn > 0.01 && (
          <div style={{
            position: 'absolute', top: 892, left: 90, right: 130,
            opacity: offerIn,
            transform: `translateY(${(1 - offerIn) * 36}px)`,
          }}>
            <Glass w={860} selected style={{ position: 'relative' }}>
              {offerGlow > 0.01 && (
                <SiriGlow frame={f} intensity={offerGlow} radius={34} inset={0} />
              )}
              <div style={{ fontFamily: fonts.mono, fontSize: 26, color: `${GOLD}AA`, letterSpacing: '0.1em', marginBottom: 12 }}>
                TU CEREBRO CALCULA
              </div>
              <div style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: 52, color: '#F4F4FA' }}>
                "Me lo merezco. Hoy fui productivo."
              </div>
              <div style={{ fontFamily: fonts.display, fontWeight: 400, fontSize: 38, color: 'rgba(255,255,255,0.56)', marginTop: 16 }}>
                → Y ahí abre el carrito.
              </div>
            </Glass>
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
          <BigType frame={f} s={228} size={92} lines={[
            { t: 'Hacer el bien' },
            { t: 'te da permiso' },
            { t: 'de darte un gusto.', hl: true },
          ]} />
          <div style={{
            fontFamily: fonts.display, fontWeight: 400, fontSize: 38,
            color: '#9A9AB5', marginTop: 32,
            opacity: ip(f, 274, 294, 0, 1),
          }}>
            Ofrecé tu servicio después de un logro del cliente.
          </div>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};
