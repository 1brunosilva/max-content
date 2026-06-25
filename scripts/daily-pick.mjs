// daily-pick.mjs — El loop diario que CIERRA el aprendizaje.
// Lee el cerebro (learning_insights) + tu gusto (rechazos en HQ), y elige 3 mecanismos
// del backlog ya hecho (compile-safe): 2 sesgados a lo que funciona, 1 explorador.
// Los encola → render.yml los renderiza → quedan en HQ como pending_approval.
// NO genera código nuevo (eso es fase 2). NO auto-publica. Freno anti-cola incluido.
import { buildIndex } from './lib-mech.mjs';
import { readFileSync, readdirSync, existsSync, writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

const SB = (process.env.SUPABASE_URL || '').replace(/\/$/, '') + '/rest/v1';
const KEY = process.env.SUPABASE_KEY || process.env.SUPABASE_SERVICE_KEY;
const H = { apikey: KEY, Authorization: 'Bearer ' + KEY };
const QUEUE = 'queue', DONE = 'queue/done';
const PER_DAY = 3;          // 2 ganadores + 1 explorador
const QUEUE_CAP = Number(process.env.QUEUE_CAP || 15);  // freno anti-cola: +15 sin aprobar → saltea el día
const DRY = process.argv.includes('--dry');

async function sb(path) {
  const r = await fetch(SB + path, { headers: H });
  if (!r.ok) throw new Error(`Supabase ${r.status} en ${path}`);
  return r.json();
}

// Composiciones ya encoladas/renderizadas (no repetir).
function handled() {
  const set = new Set();
  for (const dir of [QUEUE, DONE]) {
    if (!existsSync(dir)) continue;
    for (const f of readdirSync(dir)) {
      if (!f.endsWith('.json')) continue;
      try { const j = JSON.parse(readFileSync(join(dir, f), 'utf8')); if (j.composition) set.add(j.composition); }
      catch { /* ignora json roto */ }
    }
  }
  return set;
}

// Shuffle determinístico por día (mismo día = misma elección; días distintos = distinta).
function seededShuffle(arr, seed) {
  const a = [...arr];
  let s = seed;
  const rnd = () => { s = (s * 1103515245 + 12345) & 0x7fffffff; return s / 0x7fffffff; };
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}

async function main() {
  if (!KEY) throw new Error('Falta SUPABASE_KEY / SUPABASE_SERVICE_KEY');

  // 1) FRENO ANTI-COLA
  const pending = await sb('/videos?status=eq.pending_approval&select=id');
  if (pending.length > QUEUE_CAP) {
    console.log(`⏸  ${pending.length} videos sin aprobar (>${QUEUE_CAP}). Salteo la generación de hoy. Aprobá/rechazá algunos en HQ.`);
    return { skipped: true, pending: pending.length };
  }

  // 2) CEREBRO: lever ganador
  const idx = buildIndex();
  let winningLever = null, topMech = null;
  try {
    const ins = await sb('/learning_insights?select=parameter_type,parameter_value');
    const tm = ins.find((i) => i.parameter_type === 'top_mechanism' || i.parameter_type === 'top_video');
    if (tm) { topMech = tm.parameter_value; winningLever = idx[topMech]?.lever || null; }
    const tl = ins.find((i) => i.parameter_type === 'top_lever' || i.parameter_type === 'top_theme');
    if (!winningLever && tl) winningLever = (tl.parameter_value || '').toLowerCase();
  } catch (e) { console.log('aviso: sin insights aún —', e.message); }

  // 3) TU GUSTO: mecanismos rechazados (excluir) + temas que rechazás seguido (deprioritizar)
  let rejected = new Set();
  const rejLeverCount = {};
  try {
    const rej = await sb('/videos?status=eq.rejected&select=name,mechanism,notes');
    rej.forEach((v) => {
      if (v.mechanism) rejected.add(v.mechanism);
      if (v.name) rejected.add(v.name);
      const lv = idx[v.mechanism]?.lever || idx[v.name]?.lever;  // tema del rechazado
      if (lv) rejLeverCount[lv] = (rejLeverCount[lv] || 0) + 1;
    });
  } catch { /* ok */ }
  // Un tema rechazado 2+ veces = no te gusta → lo evito (salvo que vacíe el pool).
  const dislikedLevers = new Set(Object.entries(rejLeverCount).filter(([, n]) => n >= 2).map(([l]) => l));

  // 4) POOL = mecanismos del KIT NUEVO (estilo bueno), con archivo, no encolados, no rechazados,
  //    y que NO tengan ya un video. Los viejos sin kit (AppleAd/CardWheel/experimentos) quedan afuera.
  const used = handled();
  try {
    const allVids = await sb('/videos?select=name,mechanism');  // todo lo que ya tiene video
    allVids.forEach((v) => { if (v.mechanism) used.add(v.mechanism); if (v.name) used.add(v.name); });
  } catch { /* ok */ }
  const poolAll = Object.keys(idx).filter((id) => idx[id].usesKit && idx[id].file && !used.has(id) && !rejected.has(id));
  if (!poolAll.length) { console.log('⚠ backlog agotado — toca sumar mecanismos nuevos (fase 2).'); return { picked: [] }; }
  // Saco los temas que rechazás seguido — pero si eso deja muy poco, uso todo igual.
  const poolLiked = poolAll.filter((id) => !dislikedLevers.has(idx[id].lever));
  const pool = poolLiked.length >= PER_DAY ? poolLiked : poolAll;

  const seed = Number(new Date().toISOString().slice(0, 10).replace(/-/g, ''));
  const shuffled = seededShuffle(pool, seed);

  // 5) ELEGIR: 2 del lever ganador + 1 explorador (lever distinto)
  // Match por solapamiento de palabras clave (ignora conectores y palabras cortas).
  const STOP = new Set(['de', 'la', 'el', 'y', 'o', 'a', 'inicial', 'efecto', 'del', 'por']);
  const keywords = (s) => (s || '').toLowerCase().split(/[^a-záéíóúñ]+/).filter((w) => w.length > 3 && !STOP.has(w));
  const winKw = new Set(keywords(winningLever));
  const matchesWinner = (id) => keywords(idx[id].lever).some((w) => winKw.has(w));

  const picks = [];
  if (winKw.size) {
    for (const id of shuffled) {                       // hasta 2 del lever ganador
      if (picks.length >= PER_DAY - 1) break;
      if (matchesWinner(id)) picks.push(id);
    }
  }
  for (const id of shuffled) {                          // explorador: lever distinto al ganador, primero
    if (picks.length >= PER_DAY) break;
    if (!picks.includes(id) && !matchesWinner(id)) picks.push(id);
  }
  for (const id of shuffled) {                          // completar si faltó
    if (picks.length >= PER_DAY) break;
    if (!picks.includes(id)) picks.push(id);
  }

  console.log(`🎯 lever ganador: ${winningLever || '(sin datos aún → elijo por diversidad)'} ${topMech ? '(via ' + topMech + ')' : ''}`);
  console.log(`📋 cola actual: ${pending.length}/${QUEUE_CAP} · pool disponible: ${pool.length}${dislikedLevers.size ? ` · evito temas: ${[...dislikedLevers].join(', ')}` : ''}`);
  console.log(`✅ elegidos hoy: ${picks.map((id) => `${id}[${idx[id].lever || 'explorador'}]`).join(', ')}`);

  if (DRY) { console.log('(dry-run: no escribo queue)'); return { picked: picks, dry: true }; }

  // 6) ENCOLAR
  if (!existsSync(QUEUE)) mkdirSync(QUEUE, { recursive: true });
  const date = new Date().toISOString().slice(0, 10);
  for (const id of picks) {
    writeFileSync(join(QUEUE, `${id}-${date}-auto.json`), JSON.stringify({
      composition: id, name: id, mechanism: id,
      lever: idx[id].lever || '', visual_mode: 'glassy_dark',
      format: 'mechanism', palette: idx[id].palette || 'violet',
      hook_text: null, payoff_text: null, duration_sec: null, share_to_feed: false,
    }, null, 2));
  }
  console.log(`📨 ${picks.length} encolados para render.`);
  return { picked: picks };
}

main().then((r) => { console.log('RESULT', JSON.stringify(r)); }).catch((e) => { console.error('ERROR', e.message); process.exit(1); });
