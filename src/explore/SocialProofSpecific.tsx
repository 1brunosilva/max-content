/**
 * SocialProofSpecific — reflexión: "miles de clientes" no convence; UNA historia
 * real, con nombre y cercana, sí. Mecanismo: una estadística vaga (gris, ignorada)
 * vs una reseña específica que se ilumina. Modo editorial CLARO.
 */
import React from 'react';
import { AbsoluteFill } from 'remotion';
import { Stage, Label, ip, useF, dur, fonts, VLT } from './lib';

const BASE = 280;
export const SOCIALPROOFSPECIFIC_DURATION = dur(BASE);

export const SocialProofSpecific: React.FC = () => {
  const f = useF();
  const sceneOut = 1 - ip(f, 98, 122, 0, 1);
  const stmt = ip(f, 106, 134, 0, 1) * (1 - ip(f, 168, 184, 0, 1));
  const pay = ip(f, 176, 206, 0, 1);
  const vague = ip(f, 14, 36, 0, 1);
  const specific = ip(f, 50, 84, 0, 1);
  return (
    <Stage bg="linear-gradient(180deg, #F5F2EB 0%, #ECE8DF 100%)" hue={VLT} seed={3}>
      <Label frame={f} s={6} text="¿QUÉ LE CREE TU CLIENTE?" outAt={96} dark={false} />
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', opacity: sceneOut }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 50 }}>
          {/* estadística vaga, ignorada */}
          <div style={{ opacity: vague * (1 - specific * 0.5), textAlign: 'center' }}>
            <div style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: 96, color: '#C3BEB2', letterSpacing: '-0.03em' }}>+5.000 clientes</div>
            <div style={{ fontFamily: fonts.mono, fontSize: 28, color: '#B0A99C' }}>🥱 no significa nada</div>
          </div>
          {/* reseña específica, con nombre, que se ilumina */}
          <div style={{ width: 720, padding: '32px 36px', borderRadius: 26, background: '#FFFFFF', border: `2px solid ${VLT}`, boxShadow: `0 30px 80px -24px ${VLT}66`, opacity: specific, transform: `translateY(${(1 - specific) * 26}px) scale(${0.96 + specific * 0.04})`, textAlign: 'left' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginBottom: 14 }}>
              <div style={{ width: 64, height: 64, borderRadius: '50%', background: `linear-gradient(135deg, ${VLT}, #A855F7)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 30, color: '#fff' }}>M</div>
              <div>
                <div style={{ fontFamily: fonts.display, fontWeight: 700, fontSize: 34, color: '#15131C' }}>Marcela, a 3 cuadras</div>
                <div style={{ fontFamily: fonts.mono, fontSize: 24, color: '#8A8576' }}>ayer · ★★★★★</div>
              </div>
            </div>
            <div style={{ fontFamily: fonts.display, fontWeight: 500, fontSize: 38, color: '#2A2630', lineHeight: 1.3 }}>"La llamé un martes a las 8 y me resolvieron todo. Me salvaron."</div>
          </div>
        </div>
      </AbsoluteFill>

      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 70px', opacity: stmt }}>
        <div style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: 90, letterSpacing: '-0.04em', lineHeight: 1.06, color: '#15131C' }}>
          "+5.000 clientes"<br />no le dice <span style={{ color: VLT }}>nada</span>.
        </div>
      </AbsoluteFill>

      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 70px', opacity: pay }}>
        <div style={{ transform: `translateY(${(1 - pay) * 24}px)` }}>
          <div style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: 88, letterSpacing: '-0.04em', lineHeight: 1.05, color: '#15131C' }}>Una historia con <span style={{ color: VLT }}>nombre</span><br />le gana a mil estadísticas.</div>
          <div style={{ fontFamily: fonts.display, fontWeight: 500, fontSize: 34, color: '#6E695C', marginTop: 30, opacity: ip(f, 204, 226, 0, 1) }}>Lo específico se cree. Lo genérico se ignora.</div>
        </div>
      </AbsoluteFill>
    </Stage>
  );
};
