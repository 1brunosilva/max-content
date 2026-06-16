/**
 * Carga de fuentes del motor continuo. Inter (display, look Apple/Linear) +
 * DM Mono (labels/metadata). Se cargan una vez; las familias se exponen para
 * que las scenes las usen vía brand.font.
 */
import { loadFont as loadInter } from '@remotion/google-fonts/Inter';
import { loadFont as loadDMMono } from '@remotion/google-fonts/DMMono';

export const { fontFamily: inter } = loadInter();
export const { fontFamily: dmMono } = loadDMMono();

/**
 * Familias LISTAS para usar como `fontFamily`, con fallback explícito (nunca serif).
 * Las marcas las consumen como valor → fuerza la evaluación de este módulo (carga
 * real de la fuente) y evita que el bundler lo tree-shakee.
 */
export const fontDisplay = `${inter}, system-ui, sans-serif`;
export const fontMono = `${dmMono}, ui-monospace, monospace`;
