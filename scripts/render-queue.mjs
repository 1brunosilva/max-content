/**
 * render-queue.mjs
 * Lee queue/*.json, renderiza cada video con Remotion,
 * sube el MP4 a Supabase Storage, inserta en tabla `videos`.
 * Se corre desde GitHub Actions.
 */

import { execSync } from 'child_process';
import { readFileSync, readdirSync, renameSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const QUEUE_DIR = join(ROOT, 'queue');
const DONE_DIR = join(QUEUE_DIR, 'done');
const OUT_DIR = join(ROOT, 'out');

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;
const STORAGE_BUCKET = 'videos';

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error('❌ Faltan SUPABASE_URL o SUPABASE_SERVICE_KEY');
  process.exit(1);
}

const sbHeaders = {
  'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`,
  'apikey': SUPABASE_SERVICE_KEY,
  'Content-Type': 'application/json',
};

// Leer todos los JSONs de la queue (ignorar .gitkeep y carpeta done/)
const files = readdirSync(QUEUE_DIR).filter(f => f.endsWith('.json'));

if (files.length === 0) {
  console.log('No hay videos en la queue. Nada que hacer.');
  process.exit(0);
}

console.log(`🎬 Encontré ${files.length} video(s) para renderizar`);

if (!existsSync(DONE_DIR)) mkdirSync(DONE_DIR, { recursive: true });
if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true });

for (const file of files) {
  const queuePath = join(QUEUE_DIR, file);
  const data = JSON.parse(readFileSync(queuePath, 'utf8'));

  const {
    composition,    // ej: "StackFan" — ID de composición en Root.tsx
    name,           // ej: "La paradoja de la elección"
    mechanism,      // ej: "StackFan"
    lever,          // ej: "paradox_of_choice"
    visual_mode,    // ej: "glassy_dark"
    format,         // ej: "reflection"
    palette,        // ej: "violet"
    hook_text,      // ej: "¿Cuántas opciones es demasiado?"
    payoff_text,    // ej: "Más opciones = menos decisiones."
    duration_sec,   // ej: 30
    share_to_feed = false,
  } = data;

  // Nombre de archivo basado en el JSON (sin extensión)
  const fileKey = file.replace('.json', '');
  const filename = `${fileKey}.mp4`;
  const outFile = join(OUT_DIR, filename);

  console.log(`\n▶ Renderizando: ${name} (${composition})`);

  try {
    execSync(
      `npx remotion render ${composition} "${outFile}" --gl=angle --concurrency=2`,
      { cwd: ROOT, stdio: 'inherit' }
    );
  } catch (err) {
    console.error(`❌ Error renderizando ${name}:`, err.message);
    continue;
  }

  console.log(`☁️  Subiendo a Supabase Storage...`);

  const videoBytes = readFileSync(outFile);

  const uploadRes = await fetch(
    `${SUPABASE_URL}/storage/v1/object/${STORAGE_BUCKET}/${filename}`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`,
        'Content-Type': 'video/mp4',
        'x-upsert': 'true',
      },
      body: videoBytes,
    }
  );

  if (!uploadRes.ok) {
    const err = await uploadRes.text();
    console.error(`❌ Error subiendo a Storage:`, err);
    continue;
  }

  const storageUrl = `${SUPABASE_URL}/storage/v1/object/public/${STORAGE_BUCKET}/${filename}`;

  console.log(`💾 Insertando en tabla videos...`);

  const insertRes = await fetch(`${SUPABASE_URL}/rest/v1/videos`, {
    method: 'POST',
    headers: { ...sbHeaders, 'Prefer': 'return=minimal' },
    body: JSON.stringify({
      name,
      filename,
      mechanism,
      lever,
      visual_mode,
      format,
      palette,
      hook_text: hook_text || null,
      payoff_text: payoff_text || null,
      duration_sec: duration_sec || 30,
      storage_url: storageUrl,
      share_to_feed,
      status: 'pending_approval',
    }),
  });

  if (!insertRes.ok) {
    const err = await insertRes.text();
    console.error(`❌ Error insertando en DB:`, err);
    continue;
  }

  // Mover el JSON a done/
  renameSync(queuePath, join(DONE_DIR, file));
  console.log(`✅ ${name} → pending_approval`);
}

console.log('\n🎉 Queue procesada.');
