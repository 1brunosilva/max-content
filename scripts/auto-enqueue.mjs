// auto-enqueue.mjs — Crea un queue/<id>.json por cada mecanismo NUEVO de un push,
// para que el render (render.yml, que se dispara con queue/*.json) lo procese solo.
// Solo encola lo que cambió EN ESE PUSH (recibido por args), nunca el backlog viejo.
// Dedup: si la composición ya está en queue/ o queue/done/, no la vuelve a encolar.
// Tope de seguridad: CAP por corrida, para no inundar el render si llegan muchos de golpe.
import { writeFileSync, readdirSync, existsSync, mkdirSync, readFileSync } from 'fs';
import { join } from 'path';

const CAP = 10;
const QUEUE = 'queue';
const DONE = 'queue/done';

// Args = rutas de archivos .tsx cambiados en el push (las pasa el workflow).
const ids = [...new Set(
  process.argv.slice(2)
    .filter((f) => f.endsWith('.tsx'))
    .map((f) => f.split('/').pop().replace(/\.tsx$/, '')) // composition id = nombre del archivo
)];

// Composiciones ya encoladas o ya renderizadas (leídas del campo "composition" de cada json).
function handledSet() {
  const set = new Set();
  for (const dir of [QUEUE, DONE]) {
    if (!existsSync(dir)) continue;
    for (const f of readdirSync(dir)) {
      if (!f.endsWith('.json')) continue;
      try {
        const j = JSON.parse(readFileSync(join(dir, f), 'utf8'));
        if (j.composition) set.add(j.composition);
      } catch { /* json inválido: lo ignoramos */ }
    }
  }
  return set;
}

const handled = handledSet();
const todo = ids.filter((id) => !handled.has(id)).slice(0, CAP);
const date = new Date().toISOString().slice(0, 10);

if (!existsSync(QUEUE)) mkdirSync(QUEUE, { recursive: true });

for (const id of todo) {
  const file = join(QUEUE, `${id}-${date}-auto.json`);
  writeFileSync(
    file,
    JSON.stringify(
      {
        composition: id,
        name: id,
        mechanism: id,
        lever: '',
        visual_mode: 'glassy_dark',
        format: 'mechanism',
        palette: 'violet',
        hook_text: null,
        payoff_text: null,
        duration_sec: null,
        share_to_feed: false, // nunca auto-publica: queda pending_approval para que Bruno apruebe
      },
      null,
      2
    )
  );
  console.log('encolado:', file);
}
console.log(`${todo.length} encolados (de ${ids.length} mecanismos cambiados, cap ${CAP}, ${ids.length - todo.length} ya estaban).`);
