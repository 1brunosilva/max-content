// lib-mech.mjs — Índice de mecanismos: para cada composición registrada en Root.tsx,
// encuentra su archivo y extrae el "lever" (tema psicológico) y la paleta del comentario
// de cabecera. Es lo que le permite al cerebro correlacionar y al picker sesgar por tema.
import { readFileSync, readdirSync, existsSync, statSync } from 'fs';
import { join } from 'path';

const SRC = 'src';

// Todas las composiciones registradas (id="X" en Root.tsx).
export function compositionIds(root = join(SRC, 'Root.tsx')) {
  const txt = readFileSync(root, 'utf8');
  return [...new Set([...txt.matchAll(/id="([A-Za-z0-9]+)"/g)].map((m) => m[1]))];
}

// Recorre src/ recursivo y mapea componentName -> ruta del archivo.
function walk(dir, out = {}) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) {
      if (name === 'kit' || name.startsWith('_')) continue; // kit y legacy no son mecanismos
      walk(p, out);
    } else if (name.endsWith('.tsx')) {
      out[name.replace(/\.tsx$/, '')] = p;
    }
  }
  return out;
}

// Extrae lever + paleta del header del archivo. Devuelve {lever, palette, file}.
function meta(file) {
  const txt = readFileSync(file, 'utf8').slice(0, 1200);
  const lever = (txt.match(/Lever:\s*([^.\n*]+)/i) || [])[1];
  const palette = (txt.match(/Paleta:\s*([^.\n*]+)/i) || [])[1];
  return {
    lever: lever ? lever.trim().toLowerCase() : null,
    palette: palette ? palette.trim().toLowerCase() : null,
  };
}

// Índice completo: { CompositionId: {lever, palette, file} }
export function buildIndex() {
  const ids = compositionIds();
  const files = walk(SRC);
  const idx = {};
  for (const id of ids) {
    const file = files[id];
    if (!file) { idx[id] = { lever: null, palette: null, file: null }; continue; }
    idx[id] = { ...meta(file), file };
  }
  return idx;
}

// CLI de prueba: node scripts/lib-mech.mjs
if (import.meta.url === `file://${process.argv[1]}`) {
  const idx = buildIndex();
  const ids = Object.keys(idx);
  const withLever = ids.filter((id) => idx[id].lever);
  const noFile = ids.filter((id) => !idx[id].file);
  console.log(`mecanismos: ${ids.length} · con lever: ${withLever.length} · sin archivo: ${noFile.length}`);
  console.log('muestra:');
  for (const id of ids.slice(0, 12)) console.log(`  ${id} → lever=${idx[id].lever || '—'} | paleta=${idx[id].palette || '—'}`);
  if (noFile.length) console.log('sin archivo:', noFile.join(', '));
}
