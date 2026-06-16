/**
 * lineart.tsx — Librería de íconos line-art que se DIBUJAN solos.
 *
 * Sistema nuevo (estilo "The Conversion Doc"): fondo negro, ilustración de
 * línea fina con glow violeta, trazo que se revela con stroke-dashoffset.
 *
 * Truco clave: cada <path> usa pathLength={1}, así strokeDasharray={1} y
 * strokeDashoffset={1 - p} animan el dibujo sin medir el largo real del path.
 *
 * Tokens de marca Concepto (NO se reusa nada viejo):
 *   tinta #0d0d0d · violeta #7c3aed · violeta claro #a855f7 · trazo #E9E9F2
 */

import React from 'react';

export const TOKENS = {
  ink: '#0d0d0d',
  stroke: '#EAEAF2',
  dim: '#6E6E86',
  violet: '#7c3aed',
  violetLite: '#a855f7',
} as const;

const GLOW = 'drop-shadow(0 0 10px rgba(124,58,237,0.55)) drop-shadow(0 0 26px rgba(124,58,237,0.28))';

type DrawProps = {
  /** progreso de dibujo 0→1 */
  p: number;
  /** tamaño en px (cuadrado) */
  size?: number;
  /** grosor de trazo en unidades de viewBox (200) */
  weight?: number;
  /** acentuar en violeta (glow) en vez de blanco */
  accent?: boolean;
};

/** props comunes de dibujo para un <path> con pathLength=1 */
const drawn = (p: number) => ({
  pathLength: 1 as const,
  strokeDasharray: 1,
  strokeDashoffset: 1 - Math.max(0, Math.min(1, p)),
});

const baseStroke = (weight: number, accent: boolean) => ({
  fill: 'none' as const,
  stroke: accent ? TOKENS.violetLite : TOKENS.stroke,
  strokeWidth: weight,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  vectorEffect: 'non-scaling-stroke' as const,
});

const Svg: React.FC<{ size: number; accent: boolean; children: React.ReactNode }> = ({
  size,
  accent,
  children,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 200 200"
    style={{ filter: accent ? GLOW : 'drop-shadow(0 0 8px rgba(234,234,242,0.12))', overflow: 'visible' }}
  >
    {children}
  </svg>
);

// ─── Reloj nocturno (2 AM) ──────────────────────────────────────────────────
export const ClockNight: React.FC<DrawProps> = ({ p, size = 280, weight = 3.4, accent = false }) => {
  const s = baseStroke(weight, accent);
  // dial primero (0→0.6), luego manijas (0.55→1)
  const dial = Math.min(1, p / 0.6);
  const hands = Math.max(0, Math.min(1, (p - 0.55) / 0.45));
  return (
    <Svg size={size} accent={accent}>
      <circle cx={100} cy={100} r={72} {...s} {...drawn(dial)} />
      {/* ticks */}
      <path d="M100 36 L100 46" {...s} {...drawn(dial)} />
      <path d="M100 154 L100 164" {...s} {...drawn(dial)} />
      <path d="M36 100 L46 100" {...s} {...drawn(dial)} />
      <path d="M154 100 L164 100" {...s} {...drawn(dial)} />
      {/* manija hora → apuntando a 2 (≈ 60° desde arriba) */}
      <path d="M100 100 L138 84" {...s} {...drawn(hands)} strokeWidth={weight + 0.6} />
      {/* manija minuto → 12 */}
      <path d="M100 100 L100 52" {...s} {...drawn(hands)} />
      <circle cx={100} cy={100} r={4} fill={accent ? TOKENS.violetLite : TOKENS.stroke} stroke="none" opacity={hands} />
    </Svg>
  );
};

// ─── Mensaje entrante (burbuja de chat con puntos) ─────────────────────────
export const IncomingMessage: React.FC<DrawProps> = ({ p, size = 280, weight = 3.4, accent = false }) => {
  const s = baseStroke(weight, accent);
  const bubble = Math.min(1, p / 0.7);
  const dots = Math.max(0, Math.min(1, (p - 0.65) / 0.35));
  return (
    <Svg size={size} accent={accent}>
      <path
        d="M44 56 H156 a14 14 0 0 1 14 14 V120 a14 14 0 0 1 -14 14 H86 L60 158 V134 H44 a14 14 0 0 1 -14 -14 V70 a14 14 0 0 1 14 -14 Z"
        {...s}
        {...drawn(bubble)}
      />
      <circle cx={74} cy={95} r={5.5} fill={accent ? TOKENS.violetLite : TOKENS.stroke} stroke="none" opacity={dots} />
      <circle cx={100} cy={95} r={5.5} fill={accent ? TOKENS.violetLite : TOKENS.stroke} stroke="none" opacity={dots} />
      <circle cx={126} cy={95} r={5.5} fill={accent ? TOKENS.violetLite : TOKENS.stroke} stroke="none" opacity={dots} />
    </Svg>
  );
};

// ─── Puerta de salida (cliente que se va) ───────────────────────────────────
export const ExitDoor: React.FC<DrawProps> = ({ p, size = 280, weight = 3.4, accent = false }) => {
  const s = baseStroke(weight, accent);
  const door = Math.min(1, p / 0.6);
  const arrow = Math.max(0, Math.min(1, (p - 0.5) / 0.5));
  return (
    <Svg size={size} accent={accent}>
      {/* marco de puerta */}
      <path d="M70 40 H150 V160 H70" {...s} {...drawn(door)} />
      {/* hoja */}
      <path d="M70 40 L70 160" {...s} {...drawn(door)} />
      <circle cx={84} cy={100} r={3.6} fill={accent ? TOKENS.violetLite : TOKENS.stroke} stroke="none" opacity={door} />
      {/* flecha saliendo */}
      <path d="M22 100 H58" {...s} {...drawn(arrow)} strokeWidth={weight + 0.4} stroke={TOKENS.violetLite} />
      <path d="M44 86 L58 100 L44 114" {...s} {...drawn(arrow)} strokeWidth={weight + 0.4} stroke={TOKENS.violetLite} />
    </Svg>
  );
};

// ─── MAX chibi (line-art) ───────────────────────────────────────────────────
// Robot cabezón con capucha, ojos LED violeta, cuerpito chico.
// Reescrito: proporciones chibi claras (cabeza grande, cuerpo chico), capucha
// con visera, ojos LED que prenden al final. Trazo limpio, sin "globos".
export const MaxChibi: React.FC<DrawProps> = ({ p, size = 300, weight = 3 }) => {
  // Basado en el PNG de referencia de Bruno: capucha en domo que cae a los
  // hombros, cara cuadrada redondeada dentro, dos ojos pill violeta, sonrisita.
  const s = baseStroke(weight, false);
  const accent = false;
  const hood = Math.min(1, p / 0.5);
  const head = Math.max(0, Math.min(1, (p - 0.32) / 0.4));
  const face = Math.max(0, Math.min(1, (p - 0.62) / 0.28));
  const eyes = Math.max(0, Math.min(1, (p - 0.85) / 0.15));
  const eyeStyle = { filter: 'drop-shadow(0 0 9px rgba(124,58,237,0.95))' as const };
  return (
    <Svg size={size} accent={accent}>
      {/* capucha exterior: domo simétrico que cae a los hombros */}
      <path d="M64 158 C42 146 44 92 100 56 C156 92 158 146 136 158" {...s} {...drawn(hood)} />
      {/* borde interior de la capucha (la sombra del rostro) */}
      <path d="M82 150 C66 138 70 100 100 80 C130 100 134 138 118 150" {...s} {...drawn(head)} />
      {/* mentón: cierra el rostro en sombra */}
      <path d="M82 150 Q100 160 118 150" {...s} {...drawn(face)} />
      {/* sonrisita */}
      <path d="M92 124 Q100 132 108 124" {...s} {...drawn(face)} />
      {/* ojos LED violeta rectangulares (pills verticales, prenden al final) */}
      <rect x={86} y={102} width={9} height={18} rx={4.5} fill={TOKENS.violet} stroke="none" opacity={eyes} style={eyeStyle} />
      <rect x={105} y={102} width={9} height={18} rx={4.5} fill={TOKENS.violet} stroke="none" opacity={eyes} style={eyeStyle} />
    </Svg>
  );
};

// ─── Cubo wireframe 3D (estilo "The Conversion Doc") ────────────────────────
// Se dibuja por capas: cara frontal → cara trasera → conectores.
export const WireCube: React.FC<DrawProps> = ({ p, size = 300, weight = 3.2, accent = true }) => {
  const s = baseStroke(weight, accent);
  const front = Math.min(1, p / 0.4);
  const back = Math.max(0, Math.min(1, (p - 0.3) / 0.4));
  const conn = Math.max(0, Math.min(1, (p - 0.6) / 0.4));
  // front (55,80)-(135,80)-(135,160)-(55,160) ; back desplazada arriba-derecha
  return (
    <Svg size={size} accent={accent}>
      {/* cara frontal */}
      <path d="M55 80 H135 V160 H55 Z" {...s} {...drawn(front)} />
      {/* cara trasera */}
      <path d="M85 50 H165 V130 H85 Z" {...s} {...drawn(back)} stroke={accent ? TOKENS.violetLite : TOKENS.dim} />
      {/* conectores */}
      <path d="M55 80 L85 50" {...s} {...drawn(conn)} />
      <path d="M135 80 L165 50" {...s} {...drawn(conn)} />
      <path d="M135 160 L165 130" {...s} {...drawn(conn)} />
      <path d="M55 160 L85 130" {...s} {...drawn(conn)} />
    </Svg>
  );
};

// ─── Diamante / gema wireframe (facetas) ────────────────────────────────────
export const WireDiamond: React.FC<DrawProps> = ({ p, size = 300, weight = 3.2, accent = true }) => {
  const s = baseStroke(weight, accent);
  const out = Math.min(1, p / 0.45);
  const fac = Math.max(0, Math.min(1, (p - 0.4) / 0.6));
  return (
    <Svg size={size} accent={accent}>
      {/* contorno rombo */}
      <path d="M100 38 L162 102 L100 170 L38 102 Z" {...s} {...drawn(out)} />
      {/* mesa superior + cinturón (facetas) */}
      <path d="M70 82 H130" {...s} {...drawn(fac)} stroke={accent ? TOKENS.violetLite : TOKENS.dim} />
      <path d="M38 102 H162" {...s} {...drawn(fac)} stroke={accent ? TOKENS.violetLite : TOKENS.dim} />
      <path d="M70 82 L100 38" {...s} {...drawn(fac)} stroke={accent ? TOKENS.violetLite : TOKENS.dim} />
      <path d="M130 82 L100 38" {...s} {...drawn(fac)} stroke={accent ? TOKENS.violetLite : TOKENS.dim} />
      <path d="M70 82 L38 102" {...s} {...drawn(fac)} stroke={accent ? TOKENS.violetLite : TOKENS.dim} />
      <path d="M130 82 L162 102" {...s} {...drawn(fac)} stroke={accent ? TOKENS.violetLite : TOKENS.dim} />
      <path d="M70 82 L100 170" {...s} {...drawn(fac)} stroke={accent ? TOKENS.violetLite : TOKENS.dim} />
      <path d="M130 82 L100 170" {...s} {...drawn(fac)} stroke={accent ? TOKENS.violetLite : TOKENS.dim} />
    </Svg>
  );
};

// ─── Burst / estrella destello (núcleo que late) ─────────────────────────────
// Rayos radiales que se dibujan + núcleo brillante que pulsa con localFrame.
export const Burst: React.FC<DrawProps & { localFrame?: number }> = ({
  p,
  size = 300,
  weight = 2.6,
  accent = true,
  localFrame = 0,
}) => {
  const rays = 16;
  const pulse = 1 + 0.18 * Math.sin(localFrame * 0.12);
  const coreR = 9 * pulse;
  const grow = Math.max(0, Math.min(1, p));
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" style={{ overflow: 'visible', filter: GLOW }}>
      {Array.from({ length: rays }).map((_, i) => {
        const a = (i / rays) * Math.PI * 2;
        const r0 = 16;
        const long = i % 2 === 0;
        const r1 = (long ? 72 : 48) * grow;
        const x0 = 100 + r0 * Math.cos(a);
        const y0 = 100 + r0 * Math.sin(a);
        const x1 = 100 + r1 * Math.cos(a);
        const y1 = 100 + r1 * Math.sin(a);
        return (
          <line
            key={i}
            x1={x0}
            y1={y0}
            x2={x1}
            y2={y1}
            stroke={i % 2 === 0 ? TOKENS.violetLite : TOKENS.stroke}
            strokeWidth={weight}
            strokeLinecap="round"
            opacity={0.85 * grow}
          />
        );
      })}
      <circle cx={100} cy={100} r={coreR} fill="#ffffff" opacity={grow}
        style={{ filter: 'drop-shadow(0 0 14px rgba(168,85,247,0.95)) drop-shadow(0 0 30px rgba(124,58,237,0.7))' }} />
    </svg>
  );
};

// ─── Anillo de segundos (contador 0→3s) ─────────────────────────────────────
export const SecondsRing: React.FC<DrawProps & { seconds: number; max?: number }> = ({
  p,
  size = 300,
  weight = 4,
  seconds,
  max = 3,
}) => {
  const ringP = Math.min(1, p) * Math.min(1, seconds / max);
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" style={{ overflow: 'visible' }}>
      {/* track */}
      <circle cx={100} cy={100} r={74} fill="none" stroke="rgba(234,234,242,0.10)" strokeWidth={weight} />
      {/* progreso violeta */}
      <circle
        cx={100}
        cy={100}
        r={74}
        fill="none"
        stroke={TOKENS.violetLite}
        strokeWidth={weight}
        strokeLinecap="round"
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1 - ringP}
        transform="rotate(-90 100 100)"
        style={{ filter: GLOW }}
      />
    </svg>
  );
};
