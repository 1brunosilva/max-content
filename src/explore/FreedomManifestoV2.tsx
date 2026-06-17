/**
 * FreedomManifestoV2 — versión LIMPIA del manifiesto (pedido de Bruno: el guión es
 * bueno pero la V1 tenía demasiados gestos compitiendo —calendario, texto que se
 * desmorona, blur, zoom, barra—). Acá: tipografía ENORME y clara, UN solo motivo
 * (la luz cálida que se ABRE = amanecer/libertad, continua a lo largo de toda la
 * pieza), movimiento mínimo (cada línea sube apenas y se asienta), pacing lento,
 * cierre con hold largo. Guión idéntico, palabra por palabra. Ver STYLE-DNA.md.
 */
import React from 'react';
import { AbsoluteFill } from 'remotion';
import { ip, useF, dur, fonts } from './lib';

const CREAM = '#F4EEE3', GOLD = '#E8B06A', DIM = '#94897A';
const BASE = 760;
export const FREEDOMMANIFESTOV2_DURATION = dur(BASE);

// Línea con peso: sube apenas y se asienta (física Apple). Sin blur, sin rotación,
// sin desmoronarse. El highlight va en dorado. Nada más.
const Line: React.FC<{
  f: number; at: number; size: number; color?: string; children: React.ReactNode;
}> = ({ f, at, size, color = CREAM, children }) => {
  const t = ip(f, at, at + 30, 0, 1);
  return (
    <div style={{
      fontFamily: fonts.display, fontWeight: 800, fontSize: size,
      letterSpacing: '-0.035em', lineHeight: 1.1, color,
      opacity: t, transform: `translateY(${(1 - t) * 20}px)`,
    }}>{children}</div>
  );
};

// Un beat: aparece, vive, se va con un fade suave. Sin movimiento de salida (nada
// que distraiga); solo opacidad. El último se queda (hold largo).
const Beat: React.FC<{
  f: number; in: number; out: number; last?: boolean; children: React.ReactNode;
}> = ({ f, in: inn, out, last, children }) => {
  const op = ip(f, inn, inn + 20, 0, 1) * (last ? 1 : 1 - ip(f, out, out + 22, 0, 1));
  if (op <= 0.002) return null;
  return (
    <AbsoluteFill style={{
      alignItems: 'center', justifyContent: 'center', textAlign: 'center',
      padding: '0 90px', opacity: op,
    }}>{children}</AbsoluteFill>
  );
};

export const FreedomManifestoV2: React.FC = () => {
  const f = useF();
  // UN solo motivo: la luz cálida que se abre. Sube lento toda la pieza y florece
  // en el cierre (amanecer = libertad). Es lo único que "se mueve" además del texto.
  const dawn = ip(f, 0, BASE - 40, 0, 0.4) + ip(f, 612, 700, 0, 0.55);

  return (
    <AbsoluteFill style={{ background: '#0B0907', fontFamily: fonts.display, overflow: 'hidden' }}>
      {/* base oscura cálida */}
      <AbsoluteFill style={{ background: 'radial-gradient(125% 85% at 50% 32%, #19130C 0%, #0B0907 70%)' }} />
      {/* la luz que se abre desde abajo */}
      <div style={{
        position: 'absolute', left: '50%', top: '96%', width: 2000, height: 2000,
        transform: 'translate(-50%,-50%)', borderRadius: '50%',
        background: `radial-gradient(circle, ${GOLD} 0%, transparent 60%)`,
        opacity: 0.05 + dawn, filter: 'blur(70px)',
      }} />
      {/* grano sutil: textura, no animación */}
      <AbsoluteFill style={{ opacity: 0.045, mixBlendMode: 'overlay', pointerEvents: 'none' }}>
        <svg width="100%" height="100%"><filter id="fmg2"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" /></filter><rect width="100%" height="100%" filter="url(#fmg2)" /></svg>
      </AbsoluteFill>

      {/* 1 · HOOK */}
      <Beat f={f} in={0} out={92}>
        <Line f={f} at={12} size={96}>Nadie abre una empresa<br />para <span style={{ color: GOLD }}>trabajar más</span>.</Line>
        <div style={{ height: 40 }} />
        <Line f={f} at={54} size={58} color={DIM}>Pero mirá dónde estás.</Line>
      </Beat>

      {/* 2 · PROBLEMA */}
      <Beat f={f} in={108} out={250}>
        <Line f={f} at={120} size={84}>Primero en llegar.<br />Último en irte.</Line>
        <div style={{ height: 38 }} />
        <Line f={f} at={158} size={66} color={DIM}>Contestás los domingos.</Line>
        <div style={{ height: 38 }} />
        <Line f={f} at={196} size={76}>Y si parás un día…<br /><span style={{ color: GOLD }}>todo se cae</span>.</Line>
      </Beat>

      {/* 3 · REENCUADRE */}
      <Beat f={f} in={266} out={386}>
        <Line f={f} at={278} size={88}>Eso no es ser dueño.</Line>
        <div style={{ height: 42 }} />
        <Line f={f} at={318} size={68} color={GOLD}>Es ser el empleado<br />mejor pagado de tu<br />propia empresa.</Line>
      </Beat>

      {/* 4 · GIRO (esperanza) */}
      <Beat f={f} in={402} out={510}>
        <Line f={f} at={414} size={60} color={DIM}>Todo lo que te ata<br />—responder, seguir, cargar, recordar—</Line>
        <div style={{ height: 44 }} />
        <Line f={f} at={456} size={88}>ya no necesita<br />ser <span style={{ color: GOLD }}>tuyo</span>.</Line>
      </Beat>

      {/* 5 · SOLUCIÓN */}
      <Beat f={f} in={526} out={606}>
        <Line f={f} at={538} size={104}>Lo <span style={{ color: GOLD }}>automatizamos</span>.</Line>
        <div style={{ height: 42 }} />
        <Line f={f} at={576} size={64} color={DIM}>Tu empresa sigue.<br />Sin vos encima.</Line>
      </Beat>

      {/* 6 · CIERRE (callback) — hold largo */}
      <Beat f={f} in={622} out={760} last>
        <Line f={f} at={634} size={70} color={DIM}>La abriste para ser libre.</Line>
        <div style={{ height: 48 }} />
        <Line f={f} at={680} size={112} color={GOLD}>Es hora de<br />que lo seas.</Line>
      </Beat>
    </AbsoluteFill>
  );
};
