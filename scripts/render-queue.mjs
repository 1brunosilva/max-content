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
import { createClient } from '@supabase/supabase-js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const QUEUE_DIR = join(ROOT, 'queue');
const DONE_DIR = join(QUEUE_DIR, 'done');
const OUT_DIR = join(ROOT, 'out');

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error('❌ Faltan SUPABASE_URL o SUPABASE_SERVICE_KEY');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

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
    composition,
    name,
    mechanism,
    lever,
    visual_mode,
    format,
    palette,
    hook_text,
    payoff_text,
    duration_sec,
    share_to_feed = false,
  } = data;

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

  const { error: uploadError } = await supabase.storage
    .from('videos')
    .upload(filename, videoBytes, {
      contentType: 'video/mp4',
      upsert: true,
    });

  if (uploadError) {
    console.error(`❌ Error subiendo a Storage:`, uploadError.message);
    continue;
  }

  const { data: urlData } = supabase.storage.from('videos').getPublicUrl(filename);
  const storageUrl = urlData.publicUrl;

  console.log(`💾 Insertando en tabla videos...`);

  const { error: insertError } = await supabase.from('videos').insert({
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
  });

  if (insertError) {
    console.error(`❌ Error insertando en DB:`, insertError.message);
    continue;
  }

  renameSync(queuePath, join(DONE_DIR, file));
  console.log(`✅ ${name} → pending_approval`);
}

console.log('\n🎉 Queue procesada.');
