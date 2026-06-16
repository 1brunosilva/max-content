/**
 * AppleAd — sistema de motion "anuncio Apple" en CÓDIGO (cero Higgsfield).
 *
 * El feeling que pide Bruno = curva de desaceleración fuerte (entra rápido, frena
 * suave y se "asienta"), micro-overshoot, todo con un drift lento de fondo (nunca
 * quieto), transiciones por crossfade+escala (nunca corte duro) y profundidad.
 *
 * El visual es un VEHÍCULO; el guión psicológico es el producto. Cada video = una
 * lista de beats con copy nuevo. El lenguaje glassy/3D se reusa infinito y gratis.
 *
 * Primer ejemplar: "El precio no es tu problema" (psicología de precios).
 */
import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring, Easing, Img, staticFile } from 'remotion';
import { fontDisplay, fontMono } from '../brand/fonts';

const VLT = '#7C3AED';
const VLT_L = '#A855F7';
const INK = '#08070D';
// La curva Apple: aceleración corta + desaceleración larga ("se asienta").
const APPLE = Easing.bezier(0.16, 1, 0.3, 1);
const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;
const ip = (f: number, a: number, b: number, x: number, y: number, e: (t: number) => number = APPLE) =>
  interpolate(f, [a, b], [x, y], { ...clamp, easing: e });

// ── primitivas de ambiente ───────────────────────────────────────────────────
const Grain: React.FC<{ op?: number }> = ({ op = 0.05 }) => (
  <AbsoluteFill style={{ opacity: op, pointerEvents: 'none', mixBlendMode: 'overlay' }}>
    <svg width="100%" height="100%"><filter id="gr"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" /></filter><rect width="100%" height="100%" filter="url(#gr)" /></svg>
  </AbsoluteFill>
);
// bokeh suave que deriva lento (la "vida" de fondo, tipo Apple)
const Bokeh: React.FC<{ dark?: boolean }> = ({ dark = true }) => {
  const f = useCurrentFrame();
  const orbs = [
    { x: 18, y: 26, s: 360, c: VLT, o: 0.5 }, { x: 82, y: 70, s: 520, c: VLT_L, o: 0.38 },
    { x: 60, y: 14, s: 240, c: '#5B8CFF', o: 0.3 }, { x: 30, y: 86, s: 300, c: VLT, o: 0.32 },
  ];
  return (
    <AbsoluteFill style={{ pointerEvents: 'none' }}>
      {orbs.map((o, i) => {
        const dx = Math.sin(f * 0.012 + i * 1.7) * 26;
        const dy = Math.cos(f * 0.010 + i) * 22;
        return <div key={i} style={{ position: 'absolute', left: `${o.x}%`, top: `${o.y}%`, width: o.s, height: o.s, transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px))`, borderRadius: '50%', background: `radial-gradient(circle, ${o.c} 0%, transparent 68%)`, opacity: dark ? o.o * 0.5 : o.o * 0.22, filter: 'blur(38px)' }} />;
      })}
    </AbsoluteFill>
  );
};

// drift global de un beat: siempre un poquito de movimiento + escala lenta
const Drift: React.FC<{ start: number; children: React.ReactNode; rate?: number }> = ({ start, children, rate = 1 }) => {
  const f = useCurrentFrame();
  const p = (f - start) * rate;
  const scale = 1 + Math.min(p, 120) * 0.0004; // crece muy lento mientras la escena vive
  const y = Math.sin(p * 0.02) * 5;
  return <AbsoluteFill style={{ transform: `scale(${scale}) translateY(${y}px)` }}>{children}</AbsoluteFill>;
};

// transición de escena: crossfade + escala + blur (nunca corte)
type SceneWin = { in: number; out: number; last?: boolean };
const Scene: React.FC<{ w: SceneWin; bg: string; dark?: boolean; children: React.ReactNode }> = ({ w, bg, dark = true, children }) => {
  const f = useCurrentFrame();
  const inP = ip(f, w.in, w.in + 22, 0, 1);
  const outP = w.last ? 0 : ip(f, w.out, w.out + 18, 0, 1);
  const opacity = inP * (1 - outP);
  if (opacity <= 0.001) return null;
  const scale = (1.05 - inP * 0.05) * (1 + outP * 0.06); // entra desde 1.05, sale a 1.06
  const blur = (1 - inP) * 9 + outP * 7;
  return (
    <AbsoluteFill style={{ opacity, transform: `scale(${scale})`, filter: blur > 0.2 ? `blur(${blur}px)` : 'none', background: bg }}>
      <Bokeh dark={dark} />
      <Drift start={w.in}>{children}</Drift>
      <Grain op={dark ? 0.05 : 0.03} />
    </AbsoluteFill>
  );
};

// texto grande, corto, que entra rápido y se asienta (palabra/línea con stagger)
type Ln = { t: string; hl?: boolean };
const Lines: React.FC<{ s: number; lines: Ln[]; size: number; dark?: boolean; align?: 'left' | 'center' }> = ({ s, lines, size, dark = true, align = 'left' }) => {
  const f = useCurrentFrame();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: align === 'center' ? 'center' : 'flex-start', gap: size * 0.06, textAlign: align }}>
      {lines.map((l, i) => {
        const at = s + i * 5;
        const t = ip(f, at, at + 26, 0, 1);
        return (
          <span key={i} style={{
            fontFamily: fontDisplay, fontWeight: 800, fontSize: size, letterSpacing: '-0.04em', lineHeight: 1.0,
            color: l.hl ? VLT_L : dark ? '#F5F4FA' : '#0B0A12',
            textShadow: l.hl ? `0 0 40px ${VLT}99` : dark ? '0 2px 30px rgba(0,0,0,0.5)' : 'none',
            opacity: t, transform: `translateY(${(1 - t) * 26}px) scale(${0.985 + t * 0.015})`,
            filter: t < 0.9 ? `blur(${(1 - t) * 7}px)` : 'none',
          }}>{l.t}</span>
        );
      })}
    </div>
  );
};
const Label: React.FC<{ s: number; text: string; dark?: boolean }> = ({ s, text, dark = true }) => {
  const f = useCurrentFrame();
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, opacity: ip(f, s, s + 16, 0, 1), fontFamily: fontMono, fontSize: 22, letterSpacing: '0.16em', color: dark ? 'rgba(255,255,255,0.7)' : '#6A6A82' }}>
      <span style={{ width: 28, height: 2, background: VLT_L }} /> {text}
    </div>
  );
};
const Sub: React.FC<{ s: number; text: string; dark?: boolean }> = ({ s, text, dark = true }) => {
  const f = useCurrentFrame();
  return <div style={{ marginTop: 34, fontFamily: fontDisplay, fontWeight: 400, fontSize: 34, color: dark ? '#9A9AB5' : '#6A6A82', opacity: ip(f, s, s + 20, 0, 1), transform: `translateY(${(1 - ip(f, s, s + 20, 0, 1)) * 14}px)` }}>{text}</div>;
};

// card de vidrio que "se asienta" con micro-overshoot (spring Apple)
const Glass: React.FC<{ s: number; w: number; children: React.ReactNode; glow?: boolean; pad?: number; dark?: boolean }> = ({ s, w, children, glow, pad = 40, dark = true }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = spring({ frame: f - s, fps, config: { damping: 18, stiffness: 95, mass: 1.05 } }); // overshoot suave = "asentarse"
  return (
    <div style={{
      width: w, padding: pad, borderRadius: 30,
      background: dark ? 'rgba(255,255,255,0.055)' : 'rgba(255,255,255,0.72)',
      border: `1px solid ${glow ? VLT + '88' : dark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.06)'}`,
      boxShadow: glow ? `0 50px 130px -30px ${VLT}cc, inset 0 1px 0 rgba(255,255,255,0.18)` : dark ? '0 40px 100px -34px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.1)' : '0 30px 80px -30px rgba(30,20,60,0.25)',
      backdropFilter: 'blur(18px)',
      opacity: Math.min(1, t * 1.4),
      transform: `perspective(1500px) rotateY(${(1 - t) * -10}deg) translateY(${(1 - t) * 46}px) scale(${0.92 + t * 0.08})`,
    }}>{children}</div>
  );
};

// ── BEATS del video "El precio no es tu problema" ─────────────────────────────
const PriceTag: React.FC<{ s: number; value: string; dim?: boolean; glow?: boolean }> = ({ s, value, dim, glow }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = spring({ frame: f - s, fps, config: { damping: 17, stiffness: 90, mass: 1.1 } });
  return (
    <div style={{ opacity: Math.min(1, t * 1.5), transform: `translateY(${(1 - t) * 40}px) rotate(${(1 - t) * -4}deg) scale(${0.9 + t * 0.1})` }}>
      <div style={{ padding: '26px 46px', borderRadius: 22, background: glow ? `linear-gradient(135deg,${VLT},${VLT_L})` : 'rgba(255,255,255,0.06)', border: `1px solid ${glow ? VLT_L : 'rgba(255,255,255,0.14)'}`, backdropFilter: 'blur(14px)', boxShadow: glow ? `0 40px 100px -30px ${VLT}cc` : '0 24px 60px -24px rgba(0,0,0,0.6)', fontFamily: fontDisplay, fontWeight: 800, fontSize: 88, letterSpacing: '-0.04em', color: dim ? '#7A7A90' : '#F5F4FA' }}>{value}</div>
    </div>
  );
};

const PAD = 96;

export const APPLEAD_DURATION = 600;
// timeline de beats (in / out)
const B = [
  { in: 0, out: 92 },     // 1 hook
  { in: 86, out: 176 },   // 2 confianza
  { in: 170, out: 268 },  // 3 el más caro gana
  { in: 262, out: 350 },  // 4 sin seguridad
  { in: 344, out: 452 },  // 5 construimos seguridad
  { in: 446, out: 600, last: true }, // 6 cierre
];

export const AppleAd: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: INK }}>
      {/* 1 · HOOK — pattern interrupt + price tag cayendo */}
      <Scene w={B[0]} bg={`radial-gradient(130% 90% at 28% 30%, #140F22 0%, ${INK} 70%)`}>
        <AbsoluteFill style={{ padding: PAD, justifyContent: 'center' }}>
          <Label s={B[0].in + 6} text="PSICOLOGÍA DE PRECIOS" />
          <div style={{ height: 38 }} />
          <Lines s={B[0].in + 14} size={104} lines={[{ t: 'Bajar el precio' }, { t: 'no te va', hl: true }, { t: 'a salvar.', hl: true }]} />
          <div style={{ position: 'absolute', right: PAD, bottom: 360 }}><PriceTag s={B[0].in + 40} value="−30%" dim /></div>
          <Sub s={B[0].in + 54} text="Y subirlo, tampoco." />
        </AbsoluteFill>
      </Scene>

      {/* 2 · El cliente compara confianza, no precio */}
      <Scene w={B[1]} bg={`radial-gradient(120% 90% at 70% 40%, #120E1E 0%, ${INK} 72%)`}>
        <AbsoluteFill style={{ padding: PAD, justifyContent: 'center' }}>
          <Lines s={B[1].in + 12} size={92} lines={[{ t: 'Tu cliente no' }, { t: 'compara precios.' }]} />
          <div style={{ height: 30 }} />
          <Lines s={B[1].in + 30} size={108} lines={[{ t: 'Compara', hl: false }, { t: 'confianza.', hl: true }]} />
        </AbsoluteFill>
      </Scene>

      {/* 3 · Por eso el más caro gana (anchoring: dos cards) */}
      <Scene w={B[2]} bg={`radial-gradient(120% 90% at 50% 20%, #161020 0%, ${INK} 74%)`}>
        <AbsoluteFill style={{ padding: PAD, justifyContent: 'center' }}>
          <Lines s={B[2].in + 10} size={80} lines={[{ t: 'Por eso el más caro,' }, { t: 'muchas veces, gana.', hl: true }]} />
          <div style={{ display: 'flex', gap: 30, marginTop: 70, alignItems: 'flex-end' }}>
            <Glass s={B[2].in + 34} w={380} pad={34}>
              <div style={{ fontFamily: fontMono, fontSize: 20, color: '#8A8AA0', letterSpacing: '0.08em' }}>EL BARATO</div>
              <div style={{ fontFamily: fontDisplay, fontWeight: 800, fontSize: 70, color: '#9A9AB5', marginTop: 10 }}>$ ?</div>
              <div style={{ fontFamily: fontDisplay, fontSize: 26, color: '#7A7A90', marginTop: 8 }}>"¿Por qué tan barato?"</div>
            </Glass>
            <Glass s={B[2].in + 46} w={420} pad={36} glow>
              <div style={{ fontFamily: fontMono, fontSize: 20, color: VLT_L, letterSpacing: '0.08em' }}>EL QUE TRANSMITE SEGURIDAD</div>
              <div style={{ fontFamily: fontDisplay, fontWeight: 800, fontSize: 76, color: '#F5F4FA', marginTop: 10 }}>$$$</div>
              <div style={{ fontFamily: fontDisplay, fontSize: 27, color: '#D8D2EC', marginTop: 8 }}>"Estos saben lo que hacen."</div>
            </Glass>
          </div>
        </AbsoluteFill>
      </Scene>

      {/* 4 · Sin seguridad todo parece caro */}
      <Scene w={B[3]} bg={`radial-gradient(120% 90% at 30% 70%, #130F1F 0%, ${INK} 72%)`}>
        <AbsoluteFill style={{ padding: PAD, justifyContent: 'center' }}>
          <Lines s={B[3].in + 12} size={100} lines={[{ t: 'Sin seguridad,' }, { t: 'todo parece', hl: false }, { t: 'caro.', hl: true }]} />
          <Sub s={B[3].in + 40} text="El precio no es el problema. La duda sí." />
        </AbsoluteFill>
      </Scene>

      {/* 5 · Construimos esa seguridad (light beat — contraste) */}
      <Scene w={B[4]} bg={'linear-gradient(180deg,#FAFAFC 0%,#ECECF2 100%)'} dark={false}>
        <AbsoluteFill style={{ padding: PAD, justifyContent: 'center' }}>
          <Label s={B[4].in + 6} text="CONCEPTO DEVELOPMENT" dark={false} />
          <div style={{ height: 36 }} />
          <Lines s={B[4].in + 14} size={96} dark={false} lines={[{ t: 'Construimos' }, { t: 'esa seguridad.', hl: true }]} />
          <div style={{ display: 'flex', gap: 16, marginTop: 56 }}>
            {['Marca', 'Sistemas', 'Atención'].map((c, i) => {
              const t2 = ip(f, B[4].in + 30 + i * 8, B[4].in + 48 + i * 8, 0, 1);
              return <span key={c} style={{ fontFamily: fontMono, fontSize: 26, color: '#2A2438', border: `1px solid rgba(124,58,237,0.3)`, background: 'rgba(124,58,237,0.06)', padding: '14px 26px', borderRadius: 100, opacity: t2, transform: `translateY(${(1 - t2) * 16}px)` }}>{c}</span>;
            })}
          </div>
        </AbsoluteFill>
      </Scene>

      {/* 6 · Cierre */}
      <Scene w={B[5]} bg={`radial-gradient(120% 80% at 50% 34%, #1B1430 0%, ${INK} 72%)`}>
        <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: PAD }}>
          <Img src={staticFile('concepto-icon.png')} style={{ width: 96, height: 96, marginBottom: 30, opacity: ip(f, B[5].in + 4, B[5].in + 24, 0, 1), transform: `scale(${0.8 + ip(f, B[5].in + 4, B[5].in + 24, 0, 1) * 0.2})` }} />
          <Lines s={B[5].in + 14} size={86} align="center" lines={[{ t: 'No vendemos barato.' }, { t: 'Vendemos que confíen.', hl: true }]} />
          <div style={{ marginTop: 48 }}>
            <ClosingCTA s={B[5].in + 40} />
          </div>
        </AbsoluteFill>
      </Scene>
    </AbsoluteFill>
  );
};

const ClosingCTA: React.FC<{ s: number }> = ({ s }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = spring({ frame: f - s, fps, config: { damping: 16, stiffness: 110, mass: 1 } });
  return (
    <div style={{ opacity: Math.min(1, t * 1.4), transform: `scale(${0.9 + t * 0.1})` }}>
      <div style={{ padding: '24px 50px', borderRadius: 100, background: `linear-gradient(135deg,${VLT},${VLT_L})`, color: '#fff', fontFamily: fontDisplay, fontWeight: 700, fontSize: 34, boxShadow: `0 24px 64px -12px ${VLT}cc` }}>Hablemos de tu proyecto →</div>
    </div>
  );
};
