/**
 * OrbitaTrust — Efecto Halo Inverso / Construcción de Autoridad.
 * Tres logos/sellos de autoridad (certificado, premio, cliente conocido) orbitan
 * alrededor de un logo central. Cada uno que entra en foco le transfiere su "halo"
 * de credibilidad. La percepción de la marca central sube visiblemente.
 * Lever: authority bias / social proof compuesto. Palette: dorado. Mode: midnight. C.
 */
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { Stage, Glass, SiriGlow, SiriFrame, BigType, ip, fonts } from './kit';

const GOLD = '#F59E0B';
const GOLD_L = '#FCD34D';

const ORBITERS = [
  { label: 'ISO 9001', sub: 'Certificado', emoji: '🏅', angle: 0 },
  { label: 'Premio\nInnovación', sub: 'Mejor App 2025', emoji: '🏆', angle: 120 },
  { label: 'Clientes\nGlobal 500', sub: '47 empresas', emoji: '🌐', angle: 240 },
];

export const ORBITATRUST_DURATION = 270;

export const OrbitaTrust: React.FC = () => {
  const f = useCurrentFrame();

  const centerIn = ip(f, 8, 40, 0, 1);
  const orbitP = ip(f, 35, 80, 0, 1);     // radio de órbita se abre
  const rotAngle = f * 0.55;               // rotación continua de la órbita
  const trustGlow = ip(f, 80, 130, 0, 1); // el centro se ilumina progresivamente
  const pay = ip(f, 162, 190, 0, 1);
  const labelOp = ip(f, 4, 20, 0, 1) * (1 - pay);

  const ORBIT_R = 270 * orbitP;
  const CX = 540, CY = 900;

  return (
    <Stage bg="radial-gradient(122% 90% at 50% 44%, #1A1200 0%, #060401 80%)" hue={GOLD} seed={19}>
      <div style={{
        position: 'absolute', top: 130, left: 0, right: 0, textAlign: 'center',
        fontFamily: fonts.mono, fontSize: 22, letterSpacing: '0.18em',
        color: 'rgba(255,255,255,0.65)', opacity: labelOp, zIndex: 30,
      }}>
        LO QUE TRANSFIERE CONFIANZA
      </div>

      <AbsoluteFill style={{ opacity: 1 - pay }}>

        {/* Líneas de órbita */}
        {orbitP > 0.1 ? (
          <svg width="1080" height="1920" style={{ position: 'absolute', top: 0, left: 0, opacity: orbitP * 0.25 }}>
            <circle cx={CX} cy={CY} r={ORBIT_R} stroke={GOLD} strokeWidth="1.5" fill="none" strokeDasharray="8 12" />
          </svg>
        ) : null}

        {/* Card central — la marca */}
        <div style={{
          position: 'absolute', left: CX - 160, top: CY - 160,
          width: 320, height: 320, opacity: centerIn,
        }}>
          {trustGlow > 0.1 ? <SiriGlow frame={f} intensity={trustGlow} radius={40} /> : null}
          <Glass w={320} h={320} selected={trustGlow > 0.3} pad={0} style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            background: `rgba(245,158,11,${trustGlow * 0.12})`,
            border: `1px solid rgba(245,158,11,${0.15 + trustGlow * 0.45})`,
          }}>
            <div style={{ fontSize: 72 }}>🚀</div>
            <div style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: 34, color: trustGlow > 0.5 ? GOLD_L : '#8A8AAA', letterSpacing: '-0.03em', marginTop: 14 }}>
              TU MARCA
            </div>
            {trustGlow > 0.4 ? (
              <div style={{ fontFamily: fonts.mono, fontSize: 18, color: `rgba(245,158,11,${trustGlow - 0.2})`, letterSpacing: '0.08em', marginTop: 8 }}>
                AUTORIDAD ↑
              </div>
            ) : null}
          </Glass>
        </div>

        {/* Orbitadores */}
        {ORBITERS.map((orb, i) => {
          const angleDeg = orb.angle + rotAngle;
          const rad = angleDeg * Math.PI / 180;
          const x = CX + ORBIT_R * Math.sin(rad);
          const y = CY - ORBIT_R * Math.cos(rad);
          const appear = ip(f, 40 + i * 12, 60 + i * 12, 0, 1);

          return (
            <div key={i} style={{
              position: 'absolute', left: x - 110, top: y - 80,
              width: 220, height: 160, opacity: appear * orbitP,
            }}>
              <Glass w={220} h={160} pad={18} style={{
                background: 'rgba(245,158,11,0.06)',
                border: '1px solid rgba(245,158,11,0.25)',
              }}>
                <div style={{ fontSize: 36, lineHeight: 1, textAlign: 'center' }}>{orb.emoji}</div>
                <div style={{ fontFamily: fonts.display, fontWeight: 700, fontSize: 22, color: GOLD, textAlign: 'center', letterSpacing: '-0.02em', marginTop: 8, whiteSpace: 'pre-line' }}>{orb.label}</div>
                <div style={{ fontFamily: fonts.mono, fontSize: 14, color: '#8A8870', textAlign: 'center', letterSpacing: '0.06em', marginTop: 6 }}>{orb.sub}</div>
              </Glass>
            </div>
          );
        })}

      </AbsoluteFill>

      {/* Payoff */}
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 96, opacity: pay, zIndex: 200 }}>
        <SiriFrame frame={f} intensity={pay} />
        <div style={{ transform: `translateY(${(1 - pay) * 28}px)` }}>
          <BigType frame={f} s={162} size={88} lines={[
            { t: 'La autoridad' },
            { t: 'se transfiere.' },
            { t: 'Asociate', hl: false },
            { t: 'bien.', hl: true },
          ]} />
          <div style={{ fontFamily: fonts.display, fontSize: 32, color: '#8A8AAA', marginTop: 28, opacity: ip(f, 200, 222, 0, 1) }}>
            Con quién estás dice más que lo que decís.
          </div>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};
