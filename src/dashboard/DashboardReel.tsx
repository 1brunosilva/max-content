/**
 * DashboardReel — estilo @madebyext / @earnedits.motion
 *
 * Producto como protagonista: dashboard MAX flotando en aurora.
 * Sin word-by-word. Sin loss aversion. Las preguntas abren, el
 * dashboard responde, los números cuentan solos.
 * Tema: visibilidad de resultados (80% marketing, no IA).
 *
 * 360f = 12s @30fps  |  1080×1920  |  Archivo + DM Mono
 */

import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  Easing,
} from 'remotion';
import '../doc/fonts';
import { Aurora } from '../premium/Aurora';

const VIOLET   = '#7c3aed';
const VIOLET_L = '#a855f7';
const WHITE    = '#F2F1F8';
const MUTED    = 'rgba(242,241,248,0.50)';
const MONO     = '"DM Mono", monospace';
const ARCHIVO  = 'Archivo, sans-serif';
const clamp    = { extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const };

// ─── helpers ──────────────────────────────────────────────────────────────────

function easeCount(frame: number, start: number, end: number, target: number): number {
  const p = interpolate(frame, [start, end], [0, 1], {
    ...clamp,
    easing: Easing.out(Easing.cubic),
  });
  return Math.round(p * target);
}

// ─── Metric card ──────────────────────────────────────────────────────────────

const MetricCard: React.FC<{
  value: number | string;
  suffix?: string;
  label: string;
  glow?: boolean;
}> = ({ value, suffix = '', label, glow }) => (
  <div
    style={{
      flex: 1,
      background: 'rgba(255,255,255,0.05)',
      border: '1px solid rgba(255,255,255,0.09)',
      borderRadius: 20,
      padding: '32px 24px 28px',
      position: 'relative',
      overflow: 'hidden',
    }}
  >
    {glow && (
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(ellipse 80% 60% at 30% 30%, rgba(168,85,247,0.22) 0%, transparent 70%)`,
          pointerEvents: 'none',
        }}
      />
    )}
    <div
      style={{
        fontFamily: ARCHIVO,
        fontWeight: 900,
        fontSize: 78,
        color: WHITE,
        lineHeight: 1,
        letterSpacing: '-0.03em',
      }}
    >
      {value}
      <span style={{ fontSize: 50, fontWeight: 700 }}>{suffix}</span>
    </div>
    <div
      style={{
        fontFamily: ARCHIVO,
        fontWeight: 400,
        fontSize: 18,
        color: MUTED,
        marginTop: 12,
        lineHeight: 1.4,
        whiteSpace: 'pre-line',
      }}
    >
      {label}
    </div>
  </div>
);

// ─── Bar chart ────────────────────────────────────────────────────────────────

const BAR_HEIGHTS = [0.44, 0.60, 0.52, 0.76, 0.68, 1.0];

const BarChart: React.FC<{ frame: number; start: number; end: number }> = ({ frame, start, end }) => (
  <div style={{ display: 'flex', gap: 12, alignItems: 'flex-end', height: 130 }}>
    {BAR_HEIGHTS.map((h, i) => {
      const p = interpolate(
        frame,
        [start + i * 7, Math.min(end, start + i * 7 + 35)],
        [0, 1],
        { ...clamp, easing: Easing.out(Easing.quad) }
      );
      const finalH = Math.max(3, Math.round(p * h * 130));
      return (
        <div
          key={i}
          style={{
            flex: 1,
            height: finalH,
            background:
              i === 5
                ? `linear-gradient(180deg, ${VIOLET_L} 0%, ${VIOLET} 100%)`
                : `linear-gradient(180deg, rgba(168,85,247,0.80) 0%, rgba(124,58,237,0.80) 100%)`,
            borderRadius: '4px 4px 0 0',
            boxShadow: i === 5 && p > 0.8 ? `0 -6px 18px rgba(168,85,247,0.55)` : 'none',
          }}
        />
      );
    })}
  </div>
);

// ─── Dashboard card ───────────────────────────────────────────────────────────

const Dashboard: React.FC<{
  frame: number;
  count128: number;
  count47: number;
  count4: number;
}> = ({ frame, count128, count47, count4 }) => (
  <div
    style={{
      background: 'rgba(10, 7, 22, 0.78)',
      border: '1.5px solid rgba(168, 85, 247, 0.25)',
      borderRadius: 28,
      padding: '44px 44px 40px',
      backdropFilter: 'blur(24px)',
      WebkitBackdropFilter: 'blur(24px)',
      boxShadow: [
        '0 40px 100px rgba(0,0,0,0.55)',
        '0 0 0 1px rgba(255,255,255,0.055)',
        '0 0 90px rgba(124,58,237,0.18)',
      ].join(', '),
      width: 900,
    }}
  >
    {/* Header */}
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 30,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: '50%',
            background: '#22c55e',
            boxShadow: '0 0 10px #22c55e, 0 0 20px rgba(34,197,94,0.4)',
          }}
        />
        <span
          style={{
            fontFamily: ARCHIVO,
            fontWeight: 700,
            fontSize: 28,
            color: WHITE,
            letterSpacing: '-0.02em',
          }}
        >
          MAX · este mes
        </span>
      </div>
      <span
        style={{
          fontFamily: MONO,
          fontSize: 13,
          color: 'rgba(242,241,248,0.38)',
          letterSpacing: '0.08em',
        }}
      >
        tiempo real
      </span>
    </div>

    {/* Metrics */}
    <div style={{ display: 'flex', gap: 14, marginBottom: 28 }}>
      <MetricCard value={count128} label={'clientes\natendidos'} glow />
      <MetricCard value={count47} label={'reuniones\nagendadas'} />
      <MetricCard value={count4} suffix="s" label={'respuesta\npromedio'} />
    </div>

    {/* Bar chart */}
    <BarChart frame={frame} start={180} end={270} />
  </div>
);

// ─── Main component ────────────────────────────────────────────────────────────

export const DashboardReel: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // ── timing ──────────────────────────────────────────
  const Q1_IN   = 0;
  const Q1_OUT  = 55;
  const Q2_IN   = 52;
  const Q2_OUT  = 118;
  const DASH_IN = 112;
  const SETTLE  = 175;
  const CLOSE_IN = 278;
  const BRAND_IN = 328;

  // ── dashboard spring ────────────────────────────────
  const dashSpring = spring({
    fps,
    frame: Math.max(0, frame - DASH_IN),
    config: { damping: 14, stiffness: 88, mass: 1.3 },
    durationInFrames: 55,
  });
  const floatY  = 14 * Math.sin(frame * 0.038);
  const breathe = 1 + 0.016 * Math.sin(frame * 0.052);
  const dashScale = (0.84 + 0.16 * dashSpring) * breathe;
  const dashY     = (1 - dashSpring) * 130 + floatY;

  // ── number counters ─────────────────────────────────
  const count128 = easeCount(frame, SETTLE, SETTLE + 48, 128);
  const count47  = easeCount(frame, SETTLE + 10, SETTLE + 52, 47);
  const count4   = easeCount(frame, SETTLE + 18, SETTLE + 44, 4);

  // ── close spring ────────────────────────────────────
  const closeSpring = spring({
    fps,
    frame: Math.max(0, frame - CLOSE_IN),
    config: { damping: 16, stiffness: 180, mass: 0.8 },
    durationInFrames: 30,
  });

  // ── visibility flags ────────────────────────────────
  const showDash  = frame >= DASH_IN && frame < CLOSE_IN + 20;
  const showClose = frame >= CLOSE_IN;
  const showBrand = frame >= BRAND_IN;

  // ── question opacities ──────────────────────────────
  const q1op = interpolate(frame, [Q1_IN, Q1_IN + 18, Q1_OUT, Q1_OUT + 14], [0, 1, 1, 0], clamp);
  const q2op = interpolate(frame, [Q2_IN, Q2_IN + 18, Q2_OUT, Q2_OUT + 14], [0, 1, 1, 0], clamp);
  const dashOp = showDash
    ? interpolate(frame, [DASH_IN, DASH_IN + 8, CLOSE_IN - 10, CLOSE_IN + 16], [0, 1, 1, 0], clamp)
    : 0;
  const closeOp = showClose ? interpolate(frame, [CLOSE_IN, CLOSE_IN + 22], [0, 1], clamp) : 0;

  return (
    <AbsoluteFill style={{ overflow: 'hidden' }}>
      <Aurora />

      {/* ── Q1: ¿Cuánto vendiste esta semana? ─────────────── */}
      <AbsoluteFill
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 84px',
          opacity: q1op,
          transform: `translateY(${interpolate(q1op, [0, 1], [38, 0])}px)`,
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              fontFamily: ARCHIVO,
              fontWeight: 800,
              fontSize: 94,
              color: WHITE,
              lineHeight: 1.0,
              letterSpacing: '-0.038em',
              textShadow: '0 2px 40px rgba(0,0,0,0.45)',
            }}
          >
            ¿Cuánto vendiste
          </div>
          <div
            style={{
              fontFamily: ARCHIVO,
              fontWeight: 900,
              fontSize: 94,
              color: VIOLET_L,
              lineHeight: 1.0,
              letterSpacing: '-0.038em',
              textShadow: `0 0 40px rgba(168,85,247,0.75), 0 0 80px rgba(124,58,237,0.4)`,
            }}
          >
            esta semana?
          </div>
        </div>
      </AbsoluteFill>

      {/* ── Q2: ¿A cuánto estás del objetivo? ─────────────── */}
      <AbsoluteFill
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 84px',
          opacity: q2op,
          transform: `translateY(${interpolate(q2op, [0, 1], [38, 0])}px)`,
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              fontFamily: ARCHIVO,
              fontWeight: 800,
              fontSize: 90,
              color: WHITE,
              lineHeight: 1.0,
              letterSpacing: '-0.038em',
            }}
          >
            ¿A cuánto estás
          </div>
          <div
            style={{
              fontFamily: ARCHIVO,
              fontWeight: 900,
              fontSize: 90,
              color: VIOLET_L,
              lineHeight: 1.0,
              letterSpacing: '-0.038em',
              textShadow: `0 0 40px rgba(168,85,247,0.75)`,
            }}
          >
            del objetivo?
          </div>
        </div>
      </AbsoluteFill>

      {/* ── Glow orb detrás del dashboard ─────────────────── */}
      {showDash && (
        <AbsoluteFill
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: dashOp,
          }}
        >
          <div
            style={{
              width: 1000,
              height: 500,
              background: `radial-gradient(ellipse, rgba(124,58,237,0.28) 0%, transparent 68%)`,
              filter: 'blur(40px)',
              transform: `translateY(${floatY * 0.5}px)`,
            }}
          />
        </AbsoluteFill>
      )}

      {/* ── Dashboard ─────────────────────────────────────── */}
      {showDash && (
        <AbsoluteFill
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: dashOp,
          }}
        >
          <div
            style={{
              transform: `translateY(${dashY}px) scale(${dashScale})`,
              willChange: 'transform',
            }}
          >
            <Dashboard
              frame={frame}
              count128={count128}
              count47={count47}
              count4={count4}
            />
          </div>
        </AbsoluteFill>
      )}

      {/* ── "Ahora sabés." ────────────────────────────────── */}
      {showClose && (
        <AbsoluteFill
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: closeOp,
          }}
        >
          <div
            style={{
              textAlign: 'center',
              transform: `scale(${0.85 + 0.15 * closeSpring})`,
            }}
          >
            <div
              style={{
                fontFamily: ARCHIVO,
                fontWeight: 900,
                fontSize: 170,
                color: WHITE,
                lineHeight: 0.95,
                letterSpacing: '-0.042em',
                textShadow: '0 2px 40px rgba(0,0,0,0.4)',
              }}
            >
              Ahora
            </div>
            <div
              style={{
                fontFamily: ARCHIVO,
                fontWeight: 900,
                fontSize: 170,
                color: VIOLET_L,
                lineHeight: 0.95,
                letterSpacing: '-0.042em',
                textShadow: `0 0 60px rgba(168,85,247,0.8), 0 0 120px rgba(124,58,237,0.45)`,
              }}
            >
              sabés.
            </div>
          </div>
        </AbsoluteFill>
      )}

      {/* ── Label DM Mono ─────────────────────────────────── */}
      <div
        style={{
          position: 'absolute',
          top: Math.round(height * 0.065),
          left: 0,
          right: 0,
          textAlign: 'center',
          fontFamily: MONO,
          fontSize: 15,
          letterSpacing: '0.34em',
          color: 'rgba(242,241,248,0.45)',
          opacity: interpolate(frame, [0, 20], [0, 1], clamp),
        }}
      >
        CONCEPTO DEVELOPMENT
      </div>

      {/* ── CTA ───────────────────────────────────────────── */}
      {showBrand && (
        <div
          style={{
            position: 'absolute',
            bottom: Math.round(height * 0.085),
            left: 0,
            right: 0,
            textAlign: 'center',
            fontFamily: MONO,
            fontSize: 18,
            letterSpacing: '0.12em',
            color: VIOLET_L,
            opacity: interpolate(frame, [BRAND_IN, BRAND_IN + 20], [0, 1], clamp),
            transform: `translateY(${interpolate(frame, [BRAND_IN, BRAND_IN + 20], [12, 0], clamp)}px)`,
          }}
        >
          → conceptodevelopment.com
        </div>
      )}

      {/* ── Borde violeta inferior ────────────────────────── */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 5,
          background: `linear-gradient(90deg, ${VIOLET}, ${VIOLET_L})`,
        }}
      />
    </AbsoluteFill>
  );
};
