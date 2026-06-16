/**
 * HeroFlow — HÍBRIDO camera-through (estilo Ref "Flow" de Bruno).
 * Abre en la pieza foto-real (higgs-A.png, device sobre la piedra) con el hook de
 * marca → la CÁMARA ENTRA a la pantalla del device (push-in + motion blur) → adentro
 * caemos en una UI de producto real (chat de MAX → dashboard) → cierre de marca.
 *
 * Es la combinación que faltaba: entorno foto-real (Higgsfield) + el motor de
 * camera-through en código. Cero créditos nuevos (reúsa higgs-A.png).
 * Para Concepto Development (tokens violeta). Ver VIDEO-SYSTEM.md.
 */
import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Img, staticFile } from 'remotion';
import { fontDisplay, fontMono } from '../brand/fonts';

const VLT = '#7C3AED';
const VLT_L = '#A855F7';
const ease = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;
const expoOut = (t: number) => 1 - Math.pow(1 - t, 4);
const easeIn = (t: number) => t * t * t;
const inOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const ipo = (f: number, a: number, b: number, x: number, y: number, e?: (t: number) => number) =>
  interpolate(f, [a, b], [x, y], e ? { ...ease, easing: e } : ease);

// posición de la pantalla del device dentro de higgs-A.png (verificada por frames)
const SX = 47, SY = 52;

const Halo: React.FC<{ color?: string; size?: number; x?: string; y?: string; op?: number }> = ({ color = VLT, size = 1100, x = '50%', y = '46%', op = 0.45 }) => (
  <div style={{ position: 'absolute', left: x, top: y, width: size, height: size, transform: 'translate(-50%,-50%)', borderRadius: '50%', background: `radial-gradient(circle, ${color} 0%, transparent 65%)`, opacity: op, filter: 'blur(30px)', pointerEvents: 'none' }} />
);

// push-through con profundidad + motion blur (transiciones entre escenas internas)
type Win = { enter: number; start: number; end: number; exit: number; ox: number; oy: number; last?: boolean };
const Push: React.FC<{ w: Win; children: React.ReactNode }> = ({ w, children }) => {
  const f = useCurrentFrame();
  const hasEnter = w.start > w.enter;
  const inOp = hasEnter ? ipo(f, w.enter, w.enter + 10, 0, 1) : 1;
  const op = Math.min(inOp, w.last ? 1 : ipo(f, w.end + 6, w.exit, 1, 0));
  let scale: number, rotX: number, blur: number;
  if (hasEnter && f < w.start) {
    const t = ipo(f, w.enter, w.start, 0, 1, expoOut);
    scale = 0.5 + t * 0.5 + (1 - t) * t * 0.06;
    rotX = (1 - t) * 7;
    blur = (1 - t) * 9;
  } else if (f < w.end || w.last) {
    scale = ipo(f, w.start, Math.max(w.end, w.start + 1), 1, 1.05);
    rotX = 0;
    blur = 0;
  } else {
    const t = ipo(f, w.end, w.exit, 0, 1, inOut);
    scale = 1.05 + t * 1.15;
    rotX = -t * 5;
    blur = t * 11;
  }
  return (
    <AbsoluteFill style={{ opacity: op, transform: `perspective(1500px) rotateX(${rotX}deg) scale(${scale})`, transformOrigin: `${w.ox}% ${w.oy}%`, filter: blur > 0.2 ? `blur(${blur}px)` : 'none', backfaceVisibility: 'hidden' }}>
      {children}
    </AbsoluteFill>
  );
};

const Cursor: React.FC<{ frame: number; path: { f: number; x: number; y: number }[]; clickAt?: number[] }> = ({ frame, path, clickAt = [] }) => {
  const fs = path.map((p) => p.f);
  const x = interpolate(frame, fs, path.map((p) => p.x), { ...ease, easing: expoOut });
  const y = interpolate(frame, fs, path.map((p) => p.y), { ...ease, easing: expoOut });
  const click = clickAt.reduce((acc, c) => Math.max(acc, Math.max(0, 1 - Math.abs(frame - c) / 6)), 0);
  const app = ipo(frame, path[0].f, path[0].f + 8, 0, 1);
  return (
    <div style={{ position: 'absolute', left: x, top: y, opacity: app, transform: `scale(${1 - click * 0.22})`, filter: 'drop-shadow(0 6px 12px rgba(0,0,0,0.3))', zIndex: 50 }}>
      <svg width="48" height="48" viewBox="0 0 24 24"><path d="M4 2 L4 20 L9 15 L12.5 22 L15 21 L11.5 14 L18 14 Z" fill="#fff" stroke="#111" strokeWidth="1" /></svg>
      {click > 0.1 ? <div style={{ position: 'absolute', left: -10, top: -10, width: 60, height: 60, borderRadius: '50%', border: `3px solid ${VLT}`, opacity: click * 0.7, transform: `scale(${1 + (1 - click)})` }} /> : null}
    </div>
  );
};

// ── 1 · CHAT (UI de producto real) ───────────────────────────────────────────
const Bubble: React.FC<{ frame: number; at: number; me?: boolean; children: React.ReactNode; time?: string }> = ({ frame, at, me, children, time }) => {
  const t = ipo(frame, at, at + 12, 0, 1, expoOut);
  return (
    <div style={{ alignSelf: me ? 'flex-end' : 'flex-start', maxWidth: 560, opacity: t, transform: `translateY(${(1 - t) * 16}px) scale(${0.94 + t * 0.06})` }}>
      <div style={{ background: me ? VLT : 'rgba(255,255,255,0.92)', color: me ? '#fff' : '#0B0B14', fontFamily: fontDisplay, fontWeight: 500, fontSize: 31, lineHeight: 1.32, padding: '20px 28px', borderRadius: 28, borderBottomRightRadius: me ? 8 : 28, borderBottomLeftRadius: me ? 28 : 8, boxShadow: me ? `0 14px 34px -8px ${VLT}66` : '0 10px 28px -10px rgba(20,20,50,0.18)', backdropFilter: 'blur(8px)' }}>{children}</div>
      {time ? <div style={{ fontFamily: fontMono, fontSize: 15, color: '#9A9AAB', marginTop: 7, textAlign: me ? 'right' : 'left' }}>{time}</div> : null}
    </div>
  );
};
const Typing: React.FC<{ frame: number; from: number; to: number }> = ({ frame, from, to }) => {
  if (frame < from || frame > to) return null;
  return (
    <div style={{ alignSelf: 'flex-end', background: VLT, borderRadius: 24, padding: '20px 26px', display: 'flex', gap: 9 }}>
      {[0, 1, 2].map((i) => <span key={i} style={{ width: 13, height: 13, borderRadius: '50%', background: '#fff', opacity: 0.4 + 0.6 * Math.abs(Math.sin((frame - from) * 0.25 + i * 0.7)) }} />)}
    </div>
  );
};
const ChatScene: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: 'linear-gradient(180deg,#F0F0F5 0%,#E4E4EC 100%)', fontFamily: fontDisplay }}>
      <Halo color="rgba(124,58,237,0.18)" size={1300} y="42%" />
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 150, background: 'rgba(255,255,255,0.75)', backdropFilter: 'blur(24px)', borderBottom: '1px solid rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', gap: 20, padding: '40px 56px 0' }}>
        <div style={{ width: 62, height: 62, borderRadius: '50%', background: `linear-gradient(135deg,${VLT},${VLT_L})`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 30, fontWeight: 800 }}>M</div>
        <div>
          <div style={{ fontSize: 30, fontWeight: 700, color: '#0B0B14' }}>MAX · Ventas</div>
          <div style={{ fontSize: 19, color: '#30A46C', fontWeight: 600 }}>● en línea</div>
        </div>
      </div>
      <div style={{ position: 'absolute', top: 188, left: 56, right: 56, display: 'flex', flexDirection: 'column', gap: 18 }}>
        <Bubble frame={f} at={s + 4} time="23:47">Hola, ¿siguen abiertos? Necesito 200 cajas para el martes</Bubble>
        <Typing frame={f} from={s + 16} to={s + 26} />
        <Bubble frame={f} at={s + 27} me>¡Hola! Sí, tenemos stock. Entrega sin cargo el martes 👍</Bubble>
        <Bubble frame={f} at={s + 38} me>¿Te agendo una llamada mañana 10:00 para cerrarlo?</Bubble>
        <Bubble frame={f} at={s + 50} time="23:48">Dale, perfecto 🙌</Bubble>
        <div style={{ alignSelf: 'center', marginTop: 10, opacity: ipo(f, s + 60, s + 72, 0, 1), transform: `scale(${ipo(f, s + 60, s + 72, 0.86, 1, expoOut)})` }}>
          <div style={{ background: '#0B0B14', color: '#fff', borderRadius: 24, padding: '22px 32px', display: 'flex', alignItems: 'center', gap: 16, boxShadow: `0 24px 60px -16px ${VLT}cc` }}>
            <span style={{ width: 42, height: 42, borderRadius: 12, background: `linear-gradient(135deg,${VLT},${VLT_L})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>✓</span>
            <div><div style={{ fontSize: 27, fontWeight: 700 }}>Reunión agendada</div><div style={{ fontSize: 21, color: '#A8A8BE', fontFamily: fontMono }}>mañana · 10:00</div></div>
          </div>
        </div>
      </div>
      <Cursor frame={f} path={[{ f: s + 30, x: 760, y: 1500 }, { f: s + 52, x: 300, y: 620 }, { f: s + 64, x: 540, y: 1040 }]} clickAt={[s + 64]} />
    </AbsoluteFill>
  );
};

// ── 2 · DASHBOARD ────────────────────────────────────────────────────────────
const Tile: React.FC<{ frame: number; at: number; to: number; suffix?: string; label: string; big?: boolean }> = ({ frame, at, to, suffix = '', label, big }) => {
  const t = spring({ frame: frame - at, fps: 30, config: { damping: 20, stiffness: 150, mass: 1 } });
  const n = Math.round(ipo(frame, at, at + 30, 0, to, expoOut));
  return (
    <div style={{ flex: big ? 1.3 : 1, background: 'rgba(255,255,255,0.04)', border: `1px solid ${big ? VLT + '66' : 'rgba(255,255,255,0.09)'}`, borderRadius: 28, padding: 34, opacity: t, transform: `translateY(${(1 - t) * 26}px)`, backdropFilter: 'blur(10px)', boxShadow: big ? `0 30px 70px -24px ${VLT}99` : 'none' }}>
      <div style={{ fontSize: big ? 100 : 74, fontWeight: 800, letterSpacing: '-0.04em', color: big ? VLT_L : '#F4F4FA', lineHeight: 1, textShadow: big ? `0 0 44px ${VLT}88` : 'none' }}>{n}{suffix}</div>
      <div style={{ fontSize: 21, color: '#8A8AA0', marginTop: 12, fontFamily: fontMono, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</div>
    </div>
  );
};
const DashScene: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame();
  const pulse = 0.5 + 0.5 * Math.abs(Math.sin(f * 0.12));
  return (
    <AbsoluteFill style={{ background: 'radial-gradient(120% 80% at 50% 0%,#17131F 0%,#0B0A12 60%,#070509 100%)', fontFamily: fontDisplay, padding: 70, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <Halo color="rgba(124,58,237,0.4)" size={1200} y="50%" />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 36, opacity: ipo(f, s, s + 10, 0, 1) }}>
        <span style={{ fontSize: 42, fontWeight: 700, color: '#F4F4FA' }}>MAX · esta semana</span>
        <span style={{ fontFamily: fontMono, fontSize: 22, color: VLT_L, background: `${VLT}22`, padding: '10px 20px', borderRadius: 100, display: 'flex', alignItems: 'center', gap: 10 }}><span style={{ width: 11, height: 11, borderRadius: '50%', background: VLT_L, opacity: pulse, boxShadow: `0 0 12px ${VLT_L}` }} />LIVE</span>
      </div>
      <div style={{ display: 'flex', gap: 22, marginBottom: 22 }}>
        <Tile frame={f} at={s + 8} to={128} label="consultas" />
        <Tile frame={f} at={s + 14} to={4} suffix="s" label="respuesta" />
      </div>
      <div style={{ display: 'flex', gap: 22 }}>
        <Tile frame={f} at={s + 11} to={16} label="reuniones agendadas" big />
        <div style={{ flex: 1, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: 28, padding: 30, opacity: ipo(f, s + 18, s + 30, 0, 1), backdropFilter: 'blur(10px)' }}>
          <div style={{ fontSize: 21, color: '#8A8AA0', fontFamily: fontMono, marginBottom: 16 }}>+34% VS SEMANA PASADA</div>
          <svg width="100%" height="120" viewBox="0 0 300 120" preserveAspectRatio="none">
            <defs><linearGradient id="hf-fl" x1="0" x2="1"><stop offset="0%" stopColor={VLT} /><stop offset="100%" stopColor={VLT_L} /></linearGradient></defs>
            <polyline points="0,100 60,86 120,68 180,50 240,28 300,10" fill="none" stroke="url(#hf-fl)" strokeWidth={5} strokeLinecap="round" strokeDasharray={620} strokeDashoffset={ipo(f, s + 24, s + 54, 620, 0)} />
          </svg>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ── 3 · CIERRE ───────────────────────────────────────────────────────────────
const CTAScene: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const logo = spring({ frame: f - s, fps, config: { damping: 22, stiffness: 130, mass: 1 } });
  const pill = spring({ frame: f - s - 18, fps, config: { damping: 18, stiffness: 150, mass: 1 } });
  return (
    <AbsoluteFill style={{ background: 'radial-gradient(120% 80% at 50% 32%,#18131F 0%,#0B0A12 70%)', fontFamily: fontDisplay, alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
      <Halo color="rgba(124,58,237,0.4)" size={1000} y="40%" />
      <Img src={staticFile('concepto-icon.png')} style={{ width: 90, height: 90, marginBottom: 28, opacity: logo, transform: `scale(${0.8 + logo * 0.2})` }} />
      <div style={{ fontSize: 80, fontWeight: 800, letterSpacing: '-0.035em', color: '#F4F4FA', lineHeight: 1.04, opacity: logo }}>Tu mejor vendedor<br />no duerme.</div>
      <div style={{ fontSize: 31, color: '#8A8AA0', marginTop: 20, opacity: ipo(f, s + 10, s + 24, 0, 1) }}>Esto pasó anoche, sin que estuvieras.</div>
      <div style={{ marginTop: 48, padding: '24px 50px', borderRadius: 100, background: `linear-gradient(135deg,${VLT},${VLT_L})`, color: '#fff', fontSize: 34, fontWeight: 700, opacity: pill, transform: `scale(${0.9 + pill * 0.1})`, boxShadow: `0 22px 64px -12px ${VLT}cc` }}>Hablemos de tu proyecto →</div>
      <div style={{ fontFamily: fontMono, fontSize: 23, letterSpacing: '0.1em', color: '#6A6A82', marginTop: 28, opacity: pill }}>conceptodevelopment.com</div>
    </AbsoluteFill>
  );
};

// ── INTRO FOTO-REAL + ENTRAR A LA PANTALLA ───────────────────────────────────
const HANDOFF = 100; // frame en que la cámara "entra" a la pantalla

const PhotoIntro: React.FC = () => {
  const f = useCurrentFrame();
  // deriva lenta 0→66, luego aceleración hacia la pantalla 66→104
  const scale = f < 66 ? ipo(f, 0, 66, 1.0, 1.18) : ipo(f, 66, HANDOFF + 4, 1.18, 3.0, easeIn);
  const blur = ipo(f, 82, HANDOFF + 4, 0, 7);
  const op = ipo(f, HANDOFF - 2, HANDOFF + 8, 1, 0);
  const txtOut = ipo(f, 60, 76, 1, 0);
  return (
    <AbsoluteFill style={{ opacity: op, transform: `scale(${scale})`, transformOrigin: `${SX}% ${SY}%`, filter: blur > 0.2 ? `blur(${blur}px)` : 'none' }}>
      <Img src={staticFile('higgs-A.png')} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      <AbsoluteFill style={{ background: 'linear-gradient(180deg, rgba(8,6,14,0.74) 0%, rgba(8,6,14,0.12) 24%, rgba(8,6,14,0) 46%, rgba(8,6,14,0.18) 74%, rgba(8,6,14,0.4) 100%)' }} />
      <div style={{ position: 'absolute', top: 96, left: 70, fontFamily: fontMono, fontSize: 22, letterSpacing: '0.22em', color: 'rgba(255,255,255,0.85)', opacity: ipo(f, 4, 22, 0, 1) * txtOut, display: 'flex', alignItems: 'center', gap: 14 }}>
        <span style={{ width: 26, height: 2, background: VLT_L }} /> CONCEPTO DEVELOPMENT
      </div>
      <div style={{ position: 'absolute', top: 188, left: 70, right: 90, opacity: txtOut }}>
        {[['Mientras', false], ['no respondés,', false], ['una venta', false], ['se va.', true]].map((w, i) => {
          const t = ipo(f, 10 + i * 6, 26 + i * 6, 0, 1, expoOut);
          return <div key={i} style={{ fontFamily: fontDisplay, fontWeight: 800, fontSize: 86, letterSpacing: '-0.035em', lineHeight: 1.04, color: w[1] ? VLT_L : '#fff', textShadow: w[1] ? `0 0 38px ${VLT}aa` : '0 2px 24px rgba(0,0,0,0.55)', opacity: t, transform: `translateY(${(1 - t) * 20}px)`, filter: t < 0.9 ? `blur(${(1 - t) * 7}px)` : 'none' }}>{w[0]}</div>;
        })}
      </div>
    </AbsoluteFill>
  );
};

// La UI "nace" desde la pantalla del device y crece a pantalla completa.
const ScreenCatch: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const f = useCurrentFrame();
  // la UI matchea el tamaño de la pantalla del device (≈0.72) y sigue el push hasta full.
  const cIn = HANDOFF - 12;
  const t = ipo(f, cIn, cIn + 36, 0, 1, inOut);
  const scale = 0.72 + t * 0.28;
  const blur = (1 - t) * 6;
  const op = ipo(f, cIn + 4, cIn + 16, 0, 1);
  // salida (push-through hacia la siguiente escena)
  const ex = ipo(f, 176, 194, 0, 1, inOut);
  const exScale = 1 + ex * 1.1;
  const exBlur = ex * 11;
  const exOp = ipo(f, 182, 196, 1, 0);
  return (
    <AbsoluteFill style={{ opacity: op * exOp, transform: `scale(${scale * exScale})`, transformOrigin: `${SX}% ${SY}%`, filter: blur + exBlur > 0.2 ? `blur(${blur + exBlur}px)` : 'none', borderRadius: t < 0.98 ? 28 : 0, overflow: 'hidden' }}>
      {children}
    </AbsoluteFill>
  );
};

export const HEROFLOW_DURATION = 360;

export const HeroFlow: React.FC = () => (
  <AbsoluteFill style={{ background: '#000' }}>
    <PhotoIntro />
    <ScreenCatch><ChatScene s={HANDOFF + 4} /></ScreenCatch>
    <Push w={{ enter: 184, start: 198, end: 262, exit: 278, ox: 30, oy: 60 }}><DashScene s={196} /></Push>
    <Push w={{ enter: 270, start: 284, end: HEROFLOW_DURATION, exit: HEROFLOW_DURATION, ox: 50, oy: 42, last: true }}><CTAScene s={282} /></Push>
  </AbsoluteFill>
);
