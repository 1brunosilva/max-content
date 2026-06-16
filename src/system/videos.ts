/**
 * Definiciones de VIDEOS (data). Cada uno es una lista de escenas → el sistema lo
 * arma. Para un video nuevo: copiá un bloque, cambiá copy/escenas/orden. SIEMPRE
 * distinto (regla de Bruno). Primero el guión de venta, después se eligen escenas.
 * Ver VIDEO-SYSTEM.md.
 */
import type { SceneSpec } from './Reel';
import type { TipData } from './modes/TipReel';

// ── MODO TIP — contenido de VALOR (no vende). Look claro/editorial. ───────────
export const TIP_AUTOMATIZAR: TipData = {
  kicker: 'AUTOMATIZACIÓN · 60 SEG',
  hook: [{ t: '3 cosas que tu' }, { t: 'negocio puede' }, { t: 'automatizar', hl: true }, { t: 'esta semana.' }],
  tips: [
    { n: '01', icon: '🕐', title: 'Responder fuera de hora', body: 'El cliente que escribe a las 11 PM no espera al lunes. Una respuesta al instante lo mantiene caliente.' },
    { n: '02', icon: '🔁', title: 'Seguir al que no volvió', body: 'Un recordatorio a los 7 días recupera ventas que ya dabas por perdidas. Nadie lo hace a mano.' },
    { n: '03', icon: '📊', title: 'Cargar pedidos solo', body: 'Lo que copiás a una planilla todos los días, un flujo lo hace solo — sin errores y sin tu tiempo.' },
  ],
  sign: 'Concepto Development',
};

// ── VIDEO 1 — "La pérdida" (Loss Aversion). El aprobado / plantilla madre. ────
export const VIDEO_PERDIDA: SceneSpec[] = [
  { type: 'type', props: { lines: [{ t: 'Tu empresa no tiene' }, { t: 'un problema' }, { t: 'de ventas.', hl: true }], sub: 'El problema es otro.', atmos: true } },
  { type: 'type', props: { lines: [{ t: 'Tiene un problema' }, { t: 'de velocidad.', hl: true }], sub: 'El mundo va más rápido que tu empresa.', glow: true, atmos: true } },
  { type: 'bubbles', props: { caption: [{ t: 'Mensajes. Consultas.' }, { t: 'Oportunidades.' }, { t: 'Entrando. Todo el tiempo.', hl: true }] } },
  { type: 'oneBubble', props: { bubbleText: '¿Siguen atendiendo?', caption: [{ t: 'Tus clientes' }, { t: 'esperan segundos.' }, { t: 'Vos respondés horas después.', hl: true }], tag: 'Visto 8 horas después' } },
  { type: 'lead', props: { name: 'María González', items: ['Interesada en el plan Pro', 'Presupuesto aprobado', 'Reunión agendada · mañana 11:00'], caption: [{ t: 'De conversación ' }, { t: 'a cliente.', hl: true }] } },
  { type: 'dash', props: { value: 48285, prefix: '$', delta: '+32%', caption: [{ t: 'Integrado a tu ' }, { t: 'ERP.', hl: true }] } },
  { type: 'metrics', props: { titleLines: [{ t: 'Resultados que' }, { t: 'se notan.', hl: true }], items: [{ v: '+32%', l: 'más ventas' }, { v: '−45%', l: 'menos tiempo en tareas' }, { v: '+28%', l: 'más clientes' }] } },
  { type: 'type', props: { lines: [{ t: '24 horas. 7 días.' }, { t: 'Sin descansos.', hl: true }], sub: 'Tu mejor vendedor nunca duerme.', light: true } },
  { type: 'brand', props: { lines: [{ t: 'Mientras otros responden,' }, { t: 'vos ya vendiste.', hl: true }] } },
];

// ── VIDEO 2 — "El equipo desbordado" (Automatización). DISTINTO. ─────────────
export const VIDEO_AUTOMATIZACION: SceneSpec[] = [
  { type: 'type', props: { lines: [{ t: 'Tu equipo' }, { t: 'no da abasto.', hl: true }], sub: 'Y no es un problema de gente.', atmos: true } },
  { type: 'bubbles', props: { caption: [{ t: 'Todo entra.' }, { t: 'Nadie llega', hl: false }, { t: 'a todo.', hl: true }] } },
  { type: 'checklist', props: { title: 'MAX hace lo repetitivo', items: ['Responde consultas 24/7', 'Califica cada lead', 'Agenda reuniones', 'Envía propuestas'], caption: [{ t: 'Tu gente, ' }, { t: 'en lo que importa.', hl: true }] } },
  { type: 'dash', props: { label: 'OPORTUNIDADES ATENDIDAS · ESTE MES', value: 312, suffix: '', delta: '+41%', caption: [{ t: 'Nada se ' }, { t: 'cae.', hl: true }] } },
  { type: 'growth', props: { caption: [{ t: 'Escalá sin ' }, { t: 'sumar gente.', hl: true }], low: 'Sin sistema', high: 'Con Concepto' } },
  { type: 'metrics', props: { titleLines: [{ t: 'El equipo' }, { t: 'rinde 3×.', hl: true }], items: [{ v: '+41%', l: 'oportunidades atendidas' }, { v: '−60%', l: 'tareas manuales' }, { v: '4s', l: 'tiempo de respuesta' }] } },
  { type: 'brand', props: { lines: [{ t: 'Automatizamos procesos.' }, { t: 'Multiplicamos resultados.', hl: true }] } },
];

// ── VIDEO 3 — "Eso es para empresas grandes" (Objeción / Identity). DISTINTO. ──
// Lever: rompe la creencia "esto no es para mí". Abre citando la objeción del ICP,
// la da vuelta (reframe), muestra que arranca chico, y cierra por identidad.
export const VIDEO_PARA_GRANDES: SceneSpec[] = [
  { type: 'type', props: { label: 'LO QUE MÁS ESCUCHAMOS', lines: [{ t: '«Eso es para' }, { t: 'empresas' }, { t: 'grandes».', hl: true }], sub: 'Casi siempre lo dice el que todavía está a tiempo.', atmos: true } },
  { type: 'type', props: { lines: [{ t: 'Las grandes' }, { t: 'no empezaron', hl: false }, { t: 'grandes.', hl: true }], sub: 'Empezaron antes que el resto.', glow: true, atmos: true } },
  { type: 'checklist', props: { title: 'Sin equipo técnico. Sin obra.', items: ['Funciona desde el día 1', 'Habla como habla tu negocio', 'Aprende de tus propios datos', 'Cuesta menos que un sueldo'], caption: [{ t: 'Hecho a ' }, { t: 'tu medida.', hl: true }] } },
  { type: 'growth', props: { caption: [{ t: 'No hace falta ser grande' }, { t: 'para crecer como una.', hl: true }], low: 'Tu empresa hoy', high: 'En 6 meses' } },
  { type: 'dash', props: { label: 'CONSULTAS RESUELTAS SOLAS · ESTE MES', value: 1240, suffix: '', delta: '+38%', caption: [{ t: 'Sin sumar a ' }, { t: 'nadie.', hl: true }] } },
  { type: 'metrics', props: { titleLines: [{ t: 'Tamaño chico.' }, { t: 'Ventaja grande.', hl: true }], items: [{ v: '1', l: 'persona basta para arrancar' }, { v: '24/7', l: 'sin contratar a nadie' }, { v: '×3', l: 'capacidad, mismos costos' }] } },
  { type: 'brand', props: { lines: [{ t: 'La IA no es para los grandes.' }, { t: 'Es para los que empiezan.', hl: true }] } },
];
