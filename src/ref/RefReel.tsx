/**
 * RefReel — reproduce el lenguaje visual de los storyboards de Bruno (ref 1 + 3).
 * SIN orbe. Saca muchos elementos: tipografía grande, burbujas 3D (IA), card de lead,
 * checklist, dashboard ERP inclinado, métricas, cierre de marca. Vidrio + inclinación
 * 3D en código para matchear el glossy. Transiciones con motion blur. Copy de la ref.
 */
import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Img, staticFile } from 'remotion';
import { fontDisplay, fontMono } from '../brand/fonts';

const VLT = '#7C3AED';
const VLT_L = '#A855F7';
const ease = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;
const expoOut = (t: number) => 1 - Math.pow(1 - t, 4);
const inOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const ipo = (f: number, a: number, b: number, x: number, y: number, e?: (t: number) => number) =>
  interpolate(f, [a, b], [x, y], e ? { ...ease, easing: e } : ease);

// ── Transición push-through con motion blur ──────────────────────────────────
type Win = { s: number; e: number; last?: boolean };
const Push: React.FC<{ w: Win; children: React.ReactNode }> = ({ w, children }) => {
  const f = useCurrentFrame();
  const T = 14;
  const inO = ipo(f, w.s, w.s + 12, 0, 1);
  const op = Math.min(inO, w.last ? 1 : ipo(f, w.e, w.e + T, 1, 0));
  let scale: number, blur: number, rotX: number;
  if (f < w.s + 12) { const t = ipo(f, w.s, w.s + 12, 0, 1, expoOut); scale = 0.7 + t * 0.3 + (1 - t) * t * 0.04; blur = (1 - t) * 7; rotX = (1 - t) * 6; }
  else if (f < w.e || w.last) { scale = ipo(f, w.s + 12, Math.max(w.e, w.s + 13), 1, 1.04); blur = 0; rotX = 0; }
  else { const t = ipo(f, w.e, w.e + T, 0, 1, inOut); scale = 1.04 + t * 0.9; blur = t * 10; rotX = -t * 4; }
  return (
    <AbsoluteFill style={{ opacity: op, transform: `perspective(1600px) rotateX(${rotX}deg) scale(${scale})`, transformOrigin: '50% 52%', filter: blur > 0.2 ? `blur(${blur}px)` : 'none', backfaceVisibility: 'hidden' }}>
      {children}
    </AbsoluteFill>
  );
};

const Halo: React.FC<{ c?: string; size?: number; x?: string; y?: string; op?: number }> = ({ c = VLT, size = 1200, x = '50%', y = '50%', op = 0.4 }) => (
  <div style={{ position: 'absolute', left: x, top: y, width: size, height: size, transform: 'translate(-50%,-50%)', borderRadius: '50%', background: `radial-gradient(circle, ${c} 0%, transparent 65%)`, opacity: op, filter: 'blur(40px)', pointerEvents: 'none' }} />
);

const Particles: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ pointerEvents: 'none' }}>
      {Array.from({ length: 28 }).map((_, i) => {
        const x = ((i * 137) % 100);
        const y = (((i * 71) % 100) - f * 0.06 + 200) % 100;
        const s = 2 + (i % 3);
        const tw = 0.2 + 0.6 * Math.abs(Math.sin(f * 0.05 + i));
        return <div key={i} style={{ position: 'absolute', left: `${x}%`, top: `${y}%`, width: s, height: s, borderRadius: '50%', background: '#C9B6FF', opacity: tw * 0.5, boxShadow: `0 0 ${s * 3}px #A855F7` }} />;
      })}
    </AbsoluteFill>
  );
};

// keyword highlight
const Big: React.FC<{ frame: number; from: number; lines: { t: string; hl?: boolean }[]; size?: number; dark?: boolean }> = ({ frame, from, lines, size = 96, dark }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
    {lines.map((l, i) => {
      const t = ipo(frame, from + i * 6, from + i * 6 + 16, 0, 1, expoOut);
      return (
        <span key={i} style={{ fontFamily: fontDisplay, fontWeight: 800, fontSize: size, letterSpacing: '-0.035em', lineHeight: 1.02, color: l.hl ? VLT_L : dark ? '#0B0B14' : '#F4F4FA', textShadow: l.hl ? `0 0 38px ${VLT}88` : 'none', opacity: t, transform: `translateY(${(1 - t) * 18}px)`, filter: t < 0.85 ? `blur(${(1 - t) * 6}px)` : 'none' }}>{l.t}</span>
      );
    })}
  </div>
);

const Label: React.FC<{ frame: number; from: number; text: string; dark?: boolean }> = ({ frame, from, text, dark }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 14, opacity: ipo(frame, from, from + 12, 0, 1), fontFamily: fontMono, fontSize: 22, letterSpacing: '0.06em', color: dark ? '#7A7A90' : '#9A9AB5' }}>
    <span style={{ width: 26, height: 2, background: VLT }} />{text}
  </div>
);

// ── Burbuja de vidrio reutilizable (con cola) ────────────────────────────────
const GBubble: React.FC<{ children: React.ReactNode; w?: number; me?: boolean; fontSize?: number }> = ({ children, w, me, fontSize = 34 }) => (
  <div style={{ position: 'relative', width: w, background: 'rgba(255,255,255,0.06)', border: `1px solid ${VLT}55`, borderRadius: 28, padding: '22px 30px', backdropFilter: 'blur(14px)', boxShadow: `0 40px 90px -30px ${VLT}aa, inset 0 1px 0 rgba(255,255,255,0.18)`, color: '#F2F2FA', fontFamily: fontDisplay, fontWeight: 500, fontSize, whiteSpace: 'nowrap' }}>
    {children}
    <div style={{ position: 'absolute', bottom: -8, [me ? 'right' : 'left']: 26, width: 22, height: 22, background: 'rgba(255,255,255,0.06)', borderRight: me ? `1px solid ${VLT}55` : undefined, borderBottom: `1px solid ${VLT}55`, borderLeft: me ? undefined : `1px solid ${VLT}55`, transform: 'rotate(45deg)', backdropFilter: 'blur(14px)' } as React.CSSProperties} />
  </div>
);

const GIcon: React.FC<{ bg: string; glyph: string }> = ({ bg, glyph }) => (
  <div style={{ width: 78, height: 78, borderRadius: 20, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 38, boxShadow: `0 18px 40px -10px rgba(0,0,0,0.6), inset 0 2px 4px rgba(255,255,255,0.4)` }}>{glyph}</div>
);

// ── 3 · Burbujas volando hacia cámara (CÓDIGO: motion blur + profundidad) ─────
const FlyBubble: React.FC<{ frame: number; s: number; d: number; x: number; y: number; depth: number; t: string; time?: boolean }> = ({ frame, s, d, x, y, depth, t, time }) => {
  const p = ipo(frame, s + d, s + d + 20, 0, 1, expoOut);
  const over = (1 - p) * p * 0.18;
  const fl = Math.sin((frame + x) * 0.03) * 8;
  const sc = depth * (0.34 + p * 0.66 + over);
  const blur = (1 - p) * 16 + (1 - depth) * 7;
  return (
    <div style={{ position: 'absolute', left: `${x}%`, top: `${y}%`, opacity: Math.min(p, 1) * (0.4 + depth * 0.6), transform: `translate(-50%,-50%) translateY(${(1 - p) * 36 + fl}px) scale(${sc}) perspective(1100px) rotateY(${(x - 50) * 0.2}deg) rotateX(${(y - 50) * -0.07}deg)`, filter: blur > 0.4 ? `blur(${blur}px)` : 'none', whiteSpace: 'nowrap' }}>
      <div style={{ position: 'relative', background: 'rgba(255,255,255,0.07)', border: `1px solid ${VLT}66`, borderRadius: 30, padding: '24px 32px', backdropFilter: 'blur(14px)', boxShadow: `0 50px 110px -30px ${VLT}cc, inset 0 2px 0 rgba(255,255,255,0.25), inset 0 -16px 30px -20px rgba(255,255,255,0.15)`, color: '#F4F4FA', fontFamily: fontDisplay, fontWeight: 500, fontSize: 36, display: 'flex', alignItems: 'center', gap: 20 }}>
        {t}
        {time ? <span style={{ fontFamily: fontMono, fontSize: 20, color: '#9A9AB5' }}>23:47 <span style={{ color: '#5BA9F8' }}>✓✓</span></span> : null}
        {/* highlight especular */}
        <div style={{ position: 'absolute', inset: 0, borderRadius: 30, background: 'linear-gradient(135deg,rgba(255,255,255,0.22),transparent 40%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -9, left: 28, width: 22, height: 22, background: 'rgba(255,255,255,0.07)', borderRight: `1px solid ${VLT}66`, borderBottom: `1px solid ${VLT}66`, transform: 'rotate(45deg)', backdropFilter: 'blur(14px)' }} />
      </div>
    </div>
  );
};

const SBubbles: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame();
  const cam = ipo(f, s, s + 84, 1.0, 1.08); // leve push de cámara
  const bubbles = [
    { d: 40, x: 30, y: 40, depth: 0.55, t: '¿Atienden hoy?' },
    { d: 30, x: 70, y: 36, depth: 0.62, t: 'Necesito una demo' },
    { d: 20, x: 64, y: 58, depth: 0.78, t: '¿Tienen stock?', time: true },
    { d: 10, x: 26, y: 56, depth: 0.9, t: 'Hola, buenos días', time: true },
    { d: 4, x: 46, y: 74, depth: 1.05, t: '¿Cuánto sale?', time: true },
  ];
  const icons = [{ d: 16, x: 84, y: 48, bg: '#25D366', g: '💬', z: 0.8 }, { d: 24, x: 12, y: 42, bg: 'linear-gradient(135deg,#F58529,#DD2A7B,#8134AF)', g: '📷', z: 0.7 }, { d: 12, x: 80, y: 72, bg: '#0A7CFF', g: '✉', z: 0.85 }];
  return (
    <AbsoluteFill style={{ background: 'radial-gradient(120% 90% at 50% 55%,#15121E,#06050A 70%)', overflow: 'hidden' }}>
      <Halo c="rgba(124,58,237,0.45)" y="58%" /><Particles />
      <AbsoluteFill style={{ transform: `scale(${cam})` }}>
        {icons.map((it, i) => {
          const p = ipo(f, s + it.d, s + it.d + 20, 0, 1, expoOut);
          const blur = (1 - p) * 14 + (1 - it.z) * 6;
          return (
            <div key={`i${i}`} style={{ position: 'absolute', left: `${it.x}%`, top: `${it.y}%`, opacity: Math.min(p, 1) * (0.4 + it.z * 0.6), transform: `translate(-50%,-50%) scale(${it.z * (0.4 + p * 0.6)})`, filter: blur > 0.4 ? `blur(${blur}px)` : 'none' }}>
              <GIcon bg={it.bg} glyph={it.g} />
            </div>
          );
        })}
        {bubbles.map((b, i) => <FlyBubble key={i} frame={f} s={s} {...b} />)}
      </AbsoluteFill>
      <AbsoluteFill style={{ background: 'linear-gradient(180deg,rgba(6,5,10,0.92),transparent 30%,transparent 84%,rgba(6,5,10,0.7))' }} />
      <div style={{ position: 'absolute', left: 70, right: 80, top: 150 }}>
        <Big frame={f} from={s + 6} lines={[{ t: 'Mensajes. Consultas.' }, { t: 'Oportunidades.' }, { t: 'Entrando. Todo el tiempo.', hl: true }]} size={62} />
      </div>
    </AbsoluteFill>
  );
};

// ── 4 · Burbuja sola dramática (CÓDIGO) ──────────────────────────────────────
const SOneBubble: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame();
  const t = spring({ frame: f - (s + 6), fps: 30, config: { damping: 20, stiffness: 120, mass: 1 } });
  const tag = ipo(f, s + 34, s + 48, 0, 1);
  const ghosts = [
    { x: 24, y: 50, depth: 0.5, d: 16, t: '¿Hay alguien?' },
    { x: 78, y: 56, depth: 0.45, d: 22, t: '¿Precio?' },
    { x: 70, y: 40, depth: 0.4, d: 28, t: 'Hola...' },
  ];
  return (
    <AbsoluteFill style={{ background: 'radial-gradient(120% 90% at 50% 58%,#15121E,#06050A 72%)', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
      <Halo c="rgba(124,58,237,0.5)" y="56%" /><Particles />
      {/* burbujas fantasma de fondo (profundidad, sin responder) */}
      {ghosts.map((g, i) => {
        const p = ipo(f, s + g.d, s + g.d + 22, 0, 1, expoOut);
        return (
          <div key={i} style={{ position: 'absolute', left: `${g.x}%`, top: `${g.y}%`, opacity: p * g.depth * 0.7, transform: `translate(-50%,-50%) scale(${g.depth}) translateY(${Math.sin((f + i * 30) * 0.03) * 8}px)`, filter: `blur(${(1 - g.depth) * 10}px)` }}>
            <GBubble fontSize={32}>{g.t}</GBubble>
          </div>
        );
      })}
      <div style={{ position: 'absolute', left: 70, right: 80, top: 440 }}>
        <Big frame={f} from={s + 6} lines={[{ t: 'Tus clientes' }, { t: 'esperan segundos.' }, { t: 'Vos respondés horas después.', hl: true }]} size={62} />
      </div>
      {/* burbuja grande inclinada + reflejo en el piso */}
      <div style={{ opacity: t, transform: `translateY(${(1 - t) * 50}px) scale(${0.9 + t * 0.1}) perspective(1400px) rotateY(-14deg) rotateX(6deg)`, marginTop: 90, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {(() => {
          const bubble = (
            <div style={{ position: 'relative', background: 'rgba(255,255,255,0.07)', border: `1px solid ${VLT}66`, borderRadius: 34, padding: '46px 60px', backdropFilter: 'blur(18px)', boxShadow: `0 70px 140px -30px ${VLT}cc, inset 0 2px 0 rgba(255,255,255,0.22)`, color: '#F4F4FA', fontFamily: fontDisplay, fontWeight: 600, fontSize: 56, display: 'flex', alignItems: 'center', gap: 26, whiteSpace: 'nowrap' }}>
              ¿Siguen atendiendo?
              <span style={{ fontFamily: fontMono, fontSize: 26, color: '#9A9AB5' }}>23:47 <span style={{ color: '#5BA9F8' }}>✓✓</span></span>
              <div style={{ position: 'absolute', bottom: -16, left: 60, width: 34, height: 34, background: 'rgba(255,255,255,0.07)', borderRight: `1px solid ${VLT}66`, borderBottom: `1px solid ${VLT}66`, transform: 'rotate(45deg)', backdropFilter: 'blur(18px)' }} />
            </div>
          );
          return (
            <>
              {bubble}
              <div style={{ marginTop: 26, transform: 'scaleY(-1)', opacity: 0.22, filter: 'blur(7px)', maskImage: 'linear-gradient(transparent 35%, #000)', WebkitMaskImage: 'linear-gradient(transparent 35%, #000)' }}>{bubble}</div>
            </>
          );
        })()}
      </div>
      {/* tag visto 8 horas después */}
      <div style={{ marginTop: 70, display: 'flex', alignItems: 'center', gap: 14, opacity: tag, transform: `translateY(${(1 - tag) * 16}px)`, fontFamily: fontMono, fontSize: 26, color: '#8A8AA0' }}>
        <span style={{ fontSize: 28 }}>🕐</span> Visto 8 horas después
      </div>
    </AbsoluteFill>
  );
};

// ── Glass card reutilizable (vidrio + inclinación) ───────────────────────────
const Glass: React.FC<{ frame: number; from: number; w: number; tilt?: number; children: React.ReactNode; pad?: number }> = ({ frame, from, w, tilt = -12, children, pad = 44 }) => {
  const t = spring({ frame: frame - from, fps: 30, config: { damping: 22, stiffness: 130, mass: 1 } });
  return (
    <div style={{ width: w, padding: pad, borderRadius: 30, background: 'rgba(255,255,255,0.05)', border: `1px solid ${VLT}44`, boxShadow: `0 50px 120px -30px ${VLT}aa, inset 0 1px 0 rgba(255,255,255,0.12)`, backdropFilter: 'blur(16px)', opacity: t, transform: `perspective(1400px) rotateY(${tilt * (1 - t) + tilt * 0.4}deg) translateY(${(1 - t) * 40}px) scale(${0.92 + t * 0.08})`, transformOrigin: 'center' }}>
      {children}
    </div>
  );
};
const Check: React.FC<{ on?: boolean }> = ({ on = true }) => (
  <span style={{ width: 38, height: 38, borderRadius: 11, background: on ? `linear-gradient(135deg,${VLT},${VLT_L})` : 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 21, flexShrink: 0, boxShadow: on ? `0 6px 18px -4px ${VLT}` : 'none' }}>{on ? '✓' : ''}</span>
);

// ── Escenas de contenido ─────────────────────────────────────────────────────
const SType: React.FC<{ s: number; lines: { t: string; hl?: boolean }[]; sub: string; dark?: boolean; glow?: boolean; atmos?: boolean }> = ({ s, lines, sub, dark, glow, atmos }) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: dark ? 'linear-gradient(180deg,#FAFAFC,#EEEEF3)' : 'radial-gradient(130% 90% at 30% 40%,#120F1C,#06050A 70%)', padding: 80, justifyContent: 'center' }}>
      {atmos ? <><Halo c="rgba(124,58,237,0.32)" x="72%" y="34%" size={1000} op={0.5} /><Particles /></> : null}
      {glow ? <Halo c="rgba(124,58,237,0.5)" y="80%" op={0.5} /> : null}
      <Label frame={f} from={s} text="CONCEPTO DEVELOPMENT" dark={dark} />
      <div style={{ height: 40 }} />
      <Big frame={f} from={s + 6} lines={lines} size={104} dark={dark} />
      <div style={{ marginTop: 40, fontFamily: fontDisplay, fontSize: 32, color: dark ? '#6A6A82' : '#7A7A95', opacity: ipo(f, s + 24, s + 38, 0, 1) }}>{sub}</div>
    </AbsoluteFill>
  );
};

const SLead: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: 'radial-gradient(120% 80% at 50% 30%,#16121F,#07060C 70%)', alignItems: 'center', justifyContent: 'center', padding: 70 }}>
      <Halo c="rgba(124,58,237,0.4)" /><Particles />
      <Glass frame={f} from={s + 4} w={840} tilt={-10}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 }}>
          <div><div style={{ fontFamily: fontDisplay, fontSize: 36, fontWeight: 700, color: '#F4F4FA' }}>Lead calificado</div><div style={{ fontFamily: fontDisplay, fontSize: 26, color: '#9A9AB5' }}>María González</div></div>
          <span style={{ fontFamily: fontMono, fontSize: 20, color: '#fff', background: `linear-gradient(135deg,${VLT},${VLT_L})`, padding: '10px 20px', borderRadius: 100 }}>CALIENTE</span>
        </div>
        {['Interesada en el plan Pro', 'Presupuesto aprobado', 'Reunión agendada · mañana 11:00'].map((t, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 18, padding: '18px 0', borderBottom: '1px solid rgba(255,255,255,0.06)', opacity: ipo(f, s + 16 + i * 7, s + 28 + i * 7, 0, 1) }}>
            <Check /><span style={{ fontFamily: fontDisplay, fontSize: 30, color: '#F4F4FA' }}>{t}</span>
          </div>
        ))}
        <div style={{ marginTop: 30, padding: '22px', borderRadius: 18, background: `linear-gradient(135deg,${VLT},${VLT_L})`, textAlign: 'center', color: '#fff', fontFamily: fontDisplay, fontWeight: 700, fontSize: 30, opacity: ipo(f, s + 38, s + 50, 0, 1) }}>Listo para cerrar</div>
      </Glass>
      <div style={{ marginTop: 44, fontFamily: fontDisplay, fontSize: 40, fontWeight: 700, color: '#F4F4FA', opacity: ipo(f, s + 30, s + 44, 0, 1) }}>De conversación <span style={{ color: VLT_L }}>a cliente.</span></div>
    </AbsoluteFill>
  );
};

const SDash: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame();
  const v = Math.round(ipo(f, s + 8, s + 40, 0, 48750, expoOut));
  return (
    <AbsoluteFill style={{ background: 'radial-gradient(120% 80% at 50% 20%,#15121E,#07060C 65%)', alignItems: 'center', justifyContent: 'center', padding: 70 }}>
      <Halo c="rgba(124,58,237,0.35)" /><Particles />
      <Glass frame={f} from={s + 4} w={900} tilt={-13} pad={50}>
        <div style={{ fontFamily: fontMono, fontSize: 22, color: '#8A8AA0', marginBottom: 12 }}>NUEVAS VENTAS · ESTA SEMANA</div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 18 }}>
          <span style={{ fontFamily: fontDisplay, fontSize: 110, fontWeight: 800, letterSpacing: '-0.04em', color: '#F4F4FA' }}>${v.toLocaleString('es')}</span>
          <span style={{ fontFamily: fontDisplay, fontSize: 38, fontWeight: 700, color: '#30D158' }}>+32%</span>
        </div>
        <svg width="100%" height="200" viewBox="0 0 800 200" preserveAspectRatio="none" style={{ marginTop: 24 }}>
          <defs><linearGradient id="dg" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor={VLT_L} stopOpacity="0.5" /><stop offset="100%" stopColor={VLT_L} stopOpacity="0" /></linearGradient></defs>
          <path d={`M0,170 L130,150 L260,158 L390,120 L520,95 L650,55 L800,20`} fill="none" stroke={VLT_L} strokeWidth={6} strokeLinecap="round" strokeDasharray={1200} strokeDashoffset={ipo(f, s + 14, s + 52, 1200, 0)} />
          <path d={`M0,170 L130,150 L260,158 L390,120 L520,95 L650,55 L800,20 L800,200 L0,200 Z`} fill="url(#dg)" opacity={ipo(f, s + 40, s + 56, 0, 1)} />
        </svg>
      </Glass>
      <div style={{ marginTop: 44, fontFamily: fontDisplay, fontSize: 40, fontWeight: 700, color: '#F4F4FA', opacity: ipo(f, s + 30, s + 44, 0, 1) }}>Integrado a tu <span style={{ color: VLT_L }}>ERP.</span></div>
    </AbsoluteFill>
  );
};

const SMetrics: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame();
  const m = [{ v: '+32%', l: 'más ventas' }, { v: '−45%', l: 'menos tiempo en tareas' }, { v: '+28%', l: 'más clientes' }];
  return (
    <AbsoluteFill style={{ background: 'radial-gradient(120% 80% at 50% 30%,#15121E,#07060C 65%)', justifyContent: 'center', padding: 80 }}>
      <Halo c="rgba(124,58,237,0.35)" /><Particles />
      <div style={{ marginBottom: 44 }}><Big frame={f} from={s} lines={[{ t: 'Resultados que' }, { t: 'se notan.', hl: true }]} size={76} /></div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
        {m.map((x, i) => {
          const t = spring({ frame: f - (s + 14 + i * 8), fps: 30, config: { damping: 20, stiffness: 150, mass: 1 } });
          return (
            <div key={i} style={{ display: 'flex', alignItems: 'baseline', gap: 26, padding: '28px 40px', borderRadius: 24, background: 'rgba(255,255,255,0.05)', border: `1px solid ${VLT}33`, backdropFilter: 'blur(14px)', opacity: t, transform: `translateX(${(1 - t) * 40}px)`, boxShadow: `inset 0 1px 0 rgba(255,255,255,0.1)` }}>
              <span style={{ fontFamily: fontDisplay, fontSize: 92, fontWeight: 800, letterSpacing: '-0.04em', color: VLT_L, textShadow: `0 0 36px ${VLT}66` }}>{x.v}</span>
              <span style={{ fontFamily: fontDisplay, fontSize: 32, color: '#B8B8CC' }}>{x.l}</span>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

const SBrand: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const logo = spring({ frame: f - s, fps, config: { damping: 22, stiffness: 130, mass: 1 } });
  const pill = spring({ frame: f - s - 20, fps, config: { damping: 18, stiffness: 150, mass: 1 } });
  return (
    <AbsoluteFill style={{ background: 'radial-gradient(120% 80% at 50% 36%,#1A1426,#07060C 72%)', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
      <Halo c="rgba(124,58,237,0.5)" y="42%" /><Particles />
      <Img src={staticFile('concepto-icon.png')} style={{ width: 96, height: 96, marginBottom: 28, opacity: logo, transform: `scale(${0.8 + logo * 0.2})` }} />
      <div style={{ fontFamily: fontDisplay, fontSize: 78, fontWeight: 800, letterSpacing: '-0.035em', color: '#F4F4FA', lineHeight: 1.05, opacity: logo }}>Mientras otros responden,<br /><span style={{ color: VLT_L, textShadow: `0 0 40px ${VLT}88` }}>vos ya vendiste.</span></div>
      <div style={{ display: 'flex', gap: 18, marginTop: 34, opacity: ipo(f, s + 14, s + 28, 0, 1) }}>
        {['Chatbots', 'IA', 'ERP', 'Automatizaciones'].map((c) => (
          <span key={c} style={{ fontFamily: fontMono, fontSize: 22, color: '#B8B8CC', border: '1px solid rgba(255,255,255,0.14)', padding: '10px 20px', borderRadius: 100 }}>{c}</span>
        ))}
      </div>
      <div style={{ marginTop: 44, padding: '24px 50px', borderRadius: 100, background: `linear-gradient(135deg,${VLT},${VLT_L})`, color: '#fff', fontFamily: fontDisplay, fontWeight: 700, fontSize: 34, opacity: pill, transform: `scale(${0.9 + pill * 0.1})`, boxShadow: `0 22px 64px -12px ${VLT}cc` }}>Hablemos de tu proyecto →</div>
    </AbsoluteFill>
  );
};

// ── Timeline ─────────────────────────────────────────────────────────────────
const D = 84, OV = 16;
const at = (i: number) => i * (D - OV);
const S = Array.from({ length: 9 }, (_, i) => at(i));
export const REF_DURATION = S[8] + D + 30;

export const RefReel: React.FC = () => {
  const win = (i: number, last?: boolean): Win => ({ s: S[i], e: S[i] + D, last });
  return (
    <AbsoluteFill style={{ background: '#000' }}>
      <Push w={win(0)}><SType s={S[0]} lines={[{ t: 'Tu empresa no tiene' }, { t: 'un problema' }, { t: 'de ventas.', hl: true }]} sub="El problema es otro." atmos /></Push>
      <Push w={win(1)}><SType s={S[1]} lines={[{ t: 'Tiene un problema' }, { t: 'de velocidad.', hl: true }]} sub="El mundo va más rápido que tu empresa." glow atmos /></Push>
      <Push w={win(2)}><SBubbles s={S[2]} /></Push>
      <Push w={win(3)}><SOneBubble s={S[3]} /></Push>
      <Push w={win(4)}><SLead s={S[4]} /></Push>
      <Push w={win(5)}><SDash s={S[5]} /></Push>
      <Push w={win(6)}><SMetrics s={S[6]} /></Push>
      <Push w={win(7)}><SType s={S[7]} lines={[{ t: '24 horas. 7 días.' }, { t: 'Sin descansos.', hl: true }]} sub="Tu mejor vendedor nunca duerme." dark /></Push>
      <Push w={win(8, true)}><SBrand s={S[8]} /></Push>
    </AbsoluteFill>
  );
};
