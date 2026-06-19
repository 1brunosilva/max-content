/**
 * SocialNorm — Social norm / descriptive norm.
 * Barra de porcentaje crece a 78%. Avatares se encienden de verde.
 * "8 de cada 10 negocios ya lo hacen." Modo editorial-claro (verde).
 * Lever: descriptive social norm. Palette: verde/cyan editorial. Mode: editorial-claro. C.
 */
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { Stage, SiriFrame, BigType, ip, fonts } from './kit';

const GREEN   = '#10B981';
const GREEN_L = '#34D399';
const MID     = '#2D4A38';
const DIM     = '#5A7A68';

export const SOCIALNORM_DURATION = 272;

export const SocialNorm: React.FC = () => {
  const f = useCurrentFrame();

  const titleOp    = ip(f,  0, 22, 0, 1);
  const barW       = ip(f, 20, 102, 0, 78);
  const numVal     = Math.round(ip(f, 20, 102, 0, 78));
  const barOp      = ip(f, 20, 36, 0, 1);
  const pay        = ip(f, 195, 222, 0, 1);

  // Avatars: 8 total, light up one by one from f=100, every 8f
  const avatarCount = 8;
  const avatarTimes = Array.from({ length: avatarCount }, (_, i) => 100 + i * 8);

  return (
    <Stage
      bg="radial-gradient(120% 85% at 50% 42%, #F0FFF4 0%, #E6FFEF 60%, #D5F5E3 100%)"
      hue={GREEN}
      seed={14}
    >
      {/* Title */}
      <div style={{
        position: 'absolute', top: 240, left: 90, right: 130,
        fontFamily: fonts.mono, fontSize: 19, letterSpacing: '0.16em',
        color: MID, opacity: titleOp * (1 - pay), zIndex: 30, textAlign: 'center',
      }}>
        ¿CÓMO RESPONDEN LOS NEGOCIOS COMO EL TUYO?
      </div>

      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', opacity: 1 - pay }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 40, width: 780 }}>

          {/* Percentage bar block */}
          <div style={{ width: '100%', opacity: barOp }}>
            <div style={{
              fontFamily: fonts.display, fontWeight: 900, fontSize: 100,
              color: GREEN, letterSpacing: '-0.04em', textAlign: 'center',
              lineHeight: 1, textShadow: `0 0 40px ${GREEN}44`,
            }}>
              {numVal}%
            </div>
            <div style={{
              width: '100%', height: 18, borderRadius: 9,
              background: 'rgba(16,185,129,0.15)',
              border: `1px solid rgba(16,185,129,0.35)`,
              overflow: 'hidden', marginTop: 16,
            }}>
              <div style={{
                height: '100%', borderRadius: 9,
                background: `linear-gradient(90deg, ${GREEN} 0%, ${GREEN_L} 100%)`,
                width: `${barW}%`,
                boxShadow: `0 0 14px ${GREEN}66`,
              }} />
            </div>
            <div style={{
              fontFamily: fonts.display, fontSize: 28,
              color: MID, textAlign: 'center', marginTop: 14,
              letterSpacing: '-0.01em',
            }}>
              Ya usa respuesta automática
            </div>
          </div>

          {/* Avatar grid 2×4 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18, alignItems: 'center' }}>
            {[0, 1].map(row => (
              <div key={row} style={{ display: 'flex', gap: 20 }}>
                {Array.from({ length: 4 }, (_, col) => {
                  const idx  = row * 4 + col;
                  const litOp = ip(f, avatarTimes[idx], avatarTimes[idx] + 12, 0, 1);
                  const isLit = idx < 6; // last 2 remain grey
                  const lit   = isLit ? litOp : 0;

                  return (
                    <div key={col} style={{
                      width: 64, height: 64, borderRadius: '50%',
                      background: lit > 0.1
                        ? `rgba(16,185,129,${0.18 + lit * 0.18})`
                        : 'rgba(0,0,0,0.08)',
                      border: `2px solid ${lit > 0.1 ? GREEN + 'CC' : 'rgba(0,0,0,0.12)'}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      boxShadow: lit > 0.1 ? `0 0 16px ${GREEN}55` : 'none',
                      transition: 'all 0.3s',
                    }}>
                      <div style={{
                        fontFamily: fonts.display, fontWeight: 700, fontSize: 22,
                        color: lit > 0.1 ? GREEN : 'rgba(0,0,0,0.28)',
                      }}>
                        {String.fromCharCode(65 + idx)}
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
            <div style={{
              fontFamily: fonts.mono, fontSize: 16, letterSpacing: '0.12em',
              color: DIM, textAlign: 'center', marginTop: 4,
              opacity: ip(f, 162, 180, 0, 1) * (1 - pay),
            }}>
              8 DE CADA 10 NEGOCIOS EN TU RUBRO
            </div>
          </div>
        </div>
      </AbsoluteFill>

      {/* Payoff */}
      <AbsoluteFill style={{
        alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', padding: '0 96px',
        opacity: pay, zIndex: 200,
      }}>
        <SiriFrame frame={f} intensity={pay} />
        <div style={{ transform: `translateY(${(1 - pay) * 28}px)` }}>
          <BigType frame={f} s={195} size={88} dark={false} lines={[
            { t: 'La norma' },
            { t: 'del grupo' },
            { t: 'vende', hl: true },
            { t: 'solo.', hl: true },
          ]} />
          <div style={{
            fontFamily: fonts.display, fontSize: 30,
            color: MID, marginTop: 28,
            opacity: ip(f, 238, 255, 0, 1),
          }}>
            ¿Sos el que se queda atrás?
          </div>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};
