/**
 * FreedomManifesto — pieza MANIFIESTO emocional (intención nueva: ni experimento ni
 * demo). Guión aprobado por Bruno palabra por palabra. Tono cálido/cinematográfico,
 * tipografía con peso, motivo del TIEMPO (calendario), luz que se ABRE en el cierre.
 * Vende automatización de Concepto por lo emocional (libertad/tiempo). Pacing lento.
 */
import React from 'react';
import { AbsoluteFill } from 'remotion';
import { ip, useF, dur, fonts } from './lib';

const CREAM = '#F3EDE2', GOLD = '#E8B06A', DIM = '#9A8E7C';
const BASE = 670;
export const FREEDOMMANIFESTO_DURATION = dur(BASE);

// línea con peso: entra de abajo, blur→nítido. `fall`=se desmorona un poco
const Line: React.FC<{ f: number; at: number; children: React.ReactNode; size: number; color?: string; fall?: number }> = ({ f, at, children, size, color = CREAM, fall = 0 }) => {
  const t = ip(f, at, at + 26, 0, 1);
  const drop = fall * ip(f, at + 30, at + 70, 0, 1);
  return <div style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: size, letterSpacing: '-0.035em', lineHeight: 1.08, color, opacity: t * (1 - drop * 0.5), transform: `translateY(${(1 - t) * 26 + drop * 60}px) rotate(${drop * 2}deg)`, filter: t < 0.9 ? `blur(${(1 - t) * 7}px)` : 'none' }}>{children}</div>;
};

const Beat: React.FC<{ f: number; in: number; out: number; last?: boolean; children: React.ReactNode }> = ({ f, in: inn, out, last, children }) => {
  const op = ip(f, inn, inn + 16, 0, 1) * (last ? 1 : 1 - ip(f, out, out + 16, 0, 1));
  if (op <= 0.002) return null;
  return <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 80px', opacity: op }}>{children}</AbsoluteFill>;
};

export const FreedomManifesto: React.FC = () => {
  const f = useF();
  const warmth = ip(f, 524, 600, 0, 1); // la luz se abre en el cierre
  const cal = ip(f, 108, 130, 0, 1) * (1 - ip(f, 205, 225, 0, 1));

  return (
    <AbsoluteFill style={{ background: '#0C0A08', fontFamily: fonts.display, overflow: 'hidden' }}>
      {/* luz cálida base + la que se abre al final (amanecer = libertad) */}
      <AbsoluteFill style={{ background: 'radial-gradient(120% 80% at 50% 30%, #1A140C 0%, #0C0A08 66%)' }} />
      <div style={{ position: 'absolute', left: '50%', top: '92%', width: 1700, height: 1700, transform: 'translate(-50%,-50%)', borderRadius: '50%', background: `radial-gradient(circle, ${GOLD} 0%, transparent 60%)`, opacity: 0.06 + warmth * 0.5, filter: 'blur(60px)' }} />
      <AbsoluteFill style={{ opacity: 0.05, mixBlendMode: 'overlay', pointerEvents: 'none' }}><svg width="100%" height="100%"><filter id="fmg"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" /></filter><rect width="100%" height="100%" filter="url(#fmg)" /></svg></AbsoluteFill>

      {/* motivo del tiempo: semana con fines de semana tachados (trabajás siempre) */}
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'flex-end', paddingBottom: 360, opacity: cal * 0.9 }}>
        <div style={{ display: 'flex', gap: 14 }}>
          {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((d, i) => {
            const we = i >= 5;
            const mark = ip(f, 150 + i * 4, 166 + i * 4, 0, 1);
            return <div key={i} style={{ width: 64, height: 64, borderRadius: 12, border: `1px solid ${we ? GOLD + '88' : '#3A3026'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: fonts.mono, fontSize: 26, color: we ? GOLD : DIM, position: 'relative' }}>{d}{we ? <span style={{ position: 'absolute', fontSize: 44, color: GOLD, opacity: mark }}>✕</span> : null}</div>;
          })}
        </div>
      </AbsoluteFill>

      {/* 1 · HOOK */}
      <Beat f={f} in={0} out={78}>
        <Line f={f} at={8} size={92}>Nadie abre una empresa<br />para <span style={{ color: GOLD }}>trabajar más</span>.</Line>
        <div style={{ height: 30 }} />
        <Line f={f} at={46} size={56} color={DIM}>Pero mirá dónde estás.</Line>
      </Beat>

      {/* 2 · PROBLEMA */}
      <Beat f={f} in={90} out={210}>
        <Line f={f} at={98} size={80}>Primero en llegar.<br />Último en irte.</Line>
        <div style={{ height: 26 }} />
        <Line f={f} at={130} size={64} color={DIM}>Contestás los domingos.</Line>
        <div style={{ height: 26 }} />
        <Line f={f} at={162} size={72} fall={1}>Y si parás un día…<br /><span style={{ color: GOLD }}>todo se cae</span>.</Line>
      </Beat>

      {/* 3 · REENCUADRE */}
      <Beat f={f} in={226} out={320}>
        <Line f={f} at={234} size={84}>Eso no es ser dueño.</Line>
        <div style={{ height: 28 }} />
        <Line f={f} at={262} size={66} color={GOLD}>Es ser el empleado<br />mejor pagado de tu<br />propia empresa.</Line>
      </Beat>

      {/* 4 · GIRO (esperanza) */}
      <Beat f={f} in={328} out={418}>
        <Line f={f} at={336} size={60} color={DIM}>Todo lo que te ata<br />—responder, seguir, cargar, recordar—</Line>
        <div style={{ height: 30 }} />
        <Line f={f} at={372} size={84}>ya no necesita<br />ser <span style={{ color: GOLD }}>tuyo</span>.</Line>
      </Beat>

      {/* 5 · SOLUCIÓN */}
      <Beat f={f} in={426} out={512}>
        <Line f={f} at={434} size={96}>Lo <span style={{ color: GOLD }}>automatizamos</span>.</Line>
        <div style={{ height: 30 }} />
        <Line f={f} at={464} size={62} color={DIM}>Tu empresa sigue.<br />Sin vos encima.</Line>
      </Beat>

      {/* 6 · CIERRE (callback) */}
      <Beat f={f} in={520} out={670} last>
        <Line f={f} at={532} size={70} color={DIM}>La abriste para ser libre.</Line>
        <div style={{ height: 34 }} />
        <Line f={f} at={572} size={104} color={GOLD}>Es hora de<br />que lo seas.</Line>
      </Beat>

      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 8, background: `linear-gradient(90deg, ${GOLD}, #F0C98A)`, opacity: 0.5 + warmth * 0.5 }} />
    </AbsoluteFill>
  );
};
