/**
 * FreedomManifestoV3 — el manifiesto, AHORA como MECANISMO animado (pedido de Bruno:
 * todo animado, no solo texto). El mecanismo ENCARNA el mensaje:
 *
 *   El dueño (VOS) es el centro del que TODO cuelga. Las tareas —responder, seguir,
 *   cargar, recordar— se ATAN a él con cuerdas que tiran. Si para un día, todo se cae
 *   con él. Al AUTOMATIZAR: las cuerdas se cortan (glow Siri), las tareas se reordenan
 *   en un sistema que gira SOLO, y el dueño se ELEVA libre hacia la luz.
 *
 *   atado → se derrumba → se corta → gira solo → se eleva.
 *
 * Color story: dorado = lo humano/atado · glow Siri (cyan→violeta→rosa) = lo automatizado/
 * libre. Guión idéntico palabra por palabra. 3D + glow + transiciones, texto grande y lento.
 * Ver STYLE-DNA.md + EMPEZAR-ACA-VIDEO.md (gotcha payoff: fundir la escena detrás del cierre).
 */
import React from 'react';
import { AbsoluteFill, useCurrentFrame, Easing } from 'remotion';
import { SiriGlow, ip, fonts } from '../apple/kit';

const GOLD = '#E8B06A', CREAM = '#F4EEE3', DIM = '#94897A';
const LIN = Easing.linear;
const D2R = Math.PI / 180;
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

// centro del anillo (donde está el dueño y donde queda el sistema girando)
const CX = 540, CY = 720, R = 300;
const TASKS = [
  { w: 'Responder', a: -90 },
  { w: 'Seguir', a: 0 },
  { w: 'Recordar', a: 90 },
  { w: 'Cargar', a: 180 },
];

export const FREEDOMMANIFESTOV3_DURATION = 880;

// caption en tercio inferior (cinematográfica). last = cierre centrado (hero).
const Cap: React.FC<{ f: number; in: number; out: number; last?: boolean; children: React.ReactNode }> = ({ f, in: inn, out, last, children }) => {
  const enter = ip(f, inn, inn + 22, 0, 1);
  const op = enter * (last ? 1 : 1 - ip(f, out, out + 18, 0, 1));
  if (op <= 0.002) return null;
  return (
    <div style={{
      position: 'absolute', left: 0, right: 0, padding: '0 80px', textAlign: 'center',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      bottom: last ? undefined : 170, top: last ? 0 : undefined, height: last ? '100%' : undefined,
      justifyContent: last ? 'center' : 'flex-end',
      opacity: op, transform: `translateY(${(1 - enter) * 22}px)`,
    }}>{children}</div>
  );
};
const T: React.FC<{ size: number; color?: string; children: React.ReactNode }> = ({ size, color = CREAM, children }) => (
  <div style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: size, letterSpacing: '-0.035em', lineHeight: 1.08, color, marginTop: size * 0.14 }}>{children}</div>
);

export const FreedomManifestoV3: React.FC = () => {
  const f = useCurrentFrame();

  // ── progreso de fases (en orden temporal) ──────────────────────────────────
  const collapse = ip(f, 360, 404, 0, 1);   // "todo se cae"
  const recover = ip(f, 520, 592, 0, 1);     // vuelven a subir (giro)
  const snap = ip(f, 612, 650, 0, 1);        // se cortan las cuerdas
  const orbit = ip(f, 650, 726, 0, 1);       // forman el sistema que gira solo
  const spin = ip(f, 658, 870, 0, 360, LIN); // rotación continua del sistema
  const riseOut = ip(f, 652, 770, 0, 1);     // el dueño se eleva fuera
  const endFade = ip(f, 786, 846, 0, 1);     // funde la escena para el cierre
  const fallActive = collapse * (1 - recover);

  // luz que se abre (amanecer/libertad): crece al automatizar y florece en el cierre
  const dawn = ip(f, 648, 860, 0, 0.5) + endFade * 0.45;

  // ── posición del dueño (centro) ────────────────────────────────────────────
  const coreAppear = ip(f, 8, 56, 0, 1);
  const coreY = CY + fallActive * 300 - riseOut * 330 - endFade * 90;
  const coreOp = coreAppear * (1 - fallActive * 0.5);    // queda solo y atenuado al caer
  const freeGlow = Math.max(riseOut, snap * 0.5);        // se enciende al liberarse

  // ── nodos de tareas (siempre sobre el anillo; difieren por fase) ────────────
  const nodes = TASKS.map((t, i) => {
    const appear = ip(f, 150 + i * 16, 214 + i * 16, 0, 1);
    const ang = (t.a + spin * orbit) * D2R;             // gira solo cuando se automatiza
    let x = CX + Math.cos(ang) * R;
    let y = CY + Math.sin(ang) * R;
    // se DESPLOMAN (caída dramática, tumbando y saliendo de cuadro) y vuelven con recover
    const side = i % 2 ? 1 : -1;
    x += fallActive * side * (90 + i * 40);
    y += fallActive * (980 + i * 150);
    const rot = fallActive * side * 22;
    // foco: se nombran de a una en el giro, luego brillo del sistema
    const name = ip(f, 524 + i * 18, 560 + i * 18, 0, 1);
    const glow = Math.max(name * 0.9, orbit * 0.55, snap);
    const op = appear * (1 - fallActive * 0.75) * (1 - endFade);
    return { ...t, x, y, rot, op, glow, appear };
  });
  const tetherOp = (i: number) => nodes[i].appear * (1 - snap) * (1 - fallActive) * (1 - endFade);

  return (
    <AbsoluteFill style={{ background: '#0B0907', fontFamily: fonts.display, overflow: 'hidden' }}>
      <AbsoluteFill style={{ background: 'radial-gradient(125% 90% at 50% 34%, #18120B 0%, #0B0907 72%)' }} />
      {/* la luz que se abre */}
      <div style={{ position: 'absolute', left: '50%', top: '34%', width: 1900, height: 1900, transform: 'translate(-50%,-50%)', borderRadius: '50%', background: `radial-gradient(circle, ${GOLD} 0%, transparent 60%)`, opacity: 0.04 + dawn, filter: 'blur(80px)' }} />

      {/* ── MECANISMO (se funde para el cierre) ────────────────────────────── */}
      <AbsoluteFill style={{ opacity: 1 - endFade }}>
        {/* cuerdas (ataduras doradas) dueño → tarea */}
        <svg width="1080" height="1920" style={{ position: 'absolute', inset: 0 }}>
          {nodes.map((n, i) => (
            <g key={i} opacity={tetherOp(i)}>
              <line x1={CX} y1={coreY} x2={n.x} y2={n.y} stroke={GOLD} strokeWidth={11} opacity={0.18} strokeLinecap="round" />
              <line x1={CX} y1={coreY} x2={n.x} y2={n.y} stroke={GOLD} strokeWidth={3} opacity={0.9} strokeLinecap="round" />
            </g>
          ))}
        </svg>

        {/* tareas */}
        {nodes.map((n, i) => (
          <div key={i} style={{ position: 'absolute', left: n.x, top: n.y, transform: `translate(-50%,-50%) rotate(${n.rot}deg)`, opacity: n.op }}>
            <div style={{ position: 'relative', width: 280, height: 108 }}>
              <SiriGlow frame={f} intensity={n.glow} radius={26} />
              <div style={{ position: 'absolute', inset: 0, borderRadius: 26, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.14)', backdropFilter: 'blur(14px)', boxShadow: '0 30px 70px -34px rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontFamily: fonts.display, fontWeight: 700, fontSize: 40, color: CREAM, letterSpacing: '-0.02em' }}>{n.w}</span>
              </div>
            </div>
          </div>
        ))}

        {/* el dueño (VOS) */}
        <div style={{ position: 'absolute', left: CX, top: coreY, transform: `translate(-50%,-50%) scale(${0.9 + coreAppear * 0.1 + riseOut * 0.14 - fallActive * 0.12})`, opacity: coreOp }}>
          <div style={{ position: 'relative', width: 196, height: 196 }}>
            <SiriGlow frame={f} intensity={freeGlow} radius={44} />
            <div style={{ position: 'absolute', inset: 0, borderRadius: 46, background: 'linear-gradient(165deg,#241B10 0%,#120D07 100%)', border: `1px solid ${GOLD}66`, boxShadow: '0 40px 100px -34px rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: 60, color: GOLD, letterSpacing: '0.02em' }}>VOS</span>
            </div>
          </div>
        </div>
      </AbsoluteFill>

      {/* ── CAPTIONS (guión palabra por palabra) ───────────────────────────── */}
      <Cap f={f} in={14} out={94}><T size={84}>Nadie abre una empresa<br />para <span style={{ color: GOLD }}>trabajar más</span>.</T></Cap>
      <Cap f={f} in={100} out={150}><T size={56} color={DIM}>Pero mirá dónde estás.</T></Cap>

      <Cap f={f} in={176} out={258}><T size={72}>Primero en llegar.<br />Último en irte.</T></Cap>
      <Cap f={f} in={264} out={330}><T size={60} color={DIM}>Contestás los domingos.</T></Cap>
      <Cap f={f} in={336} out={406}><T size={76}>Y si parás un día…<br /><span style={{ color: GOLD }}>todo se cae</span>.</T></Cap>

      <Cap f={f} in={414} out={474}><T size={80}>Eso no es ser dueño.</T></Cap>
      <Cap f={f} in={480} out={544}><T size={60} color={GOLD}>Es ser el empleado mejor pagado<br />de tu propia empresa.</T></Cap>

      <Cap f={f} in={550} out={612}><T size={50} color={DIM}>Todo lo que te ata<br />—responder, seguir, cargar, recordar—</T></Cap>
      <Cap f={f} in={618} out={658}><T size={80}>ya no necesita ser <span style={{ color: GOLD }}>tuyo</span>.</T></Cap>

      <Cap f={f} in={666} out={726}><T size={96}>Lo <span style={{ color: GOLD }}>automatizamos</span>.</T></Cap>
      <Cap f={f} in={730} out={786}><T size={60} color={DIM}>Tu empresa sigue.<br />Sin vos encima.</T></Cap>

      {/* CIERRE (hero, escena fundida) */}
      <Cap f={f} in={794} out={880} last>
        <T size={62} color={DIM}>La abriste para ser libre.</T>
        <div style={{ height: 30 }} />
        <T size={110} color={GOLD}>Es hora de<br />que lo seas.</T>
      </Cap>
    </AbsoluteFill>
  );
};
