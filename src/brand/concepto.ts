/**
 * Brand de Concepto Development (default). Tokens OFICIALES de marca:
 * violeta #7c3aed / #a855f7 sobre negro #0d0d0d. Personaje = MAX.
 *
 * Nota de criterio: para el motor CONTINUO (look Apple/Linear) la tipografía
 * display es Inter limpia — NO Barlow Condensed (eso queda para las piezas
 * legacy de impacto con hard-cuts). Ver VIDEO-SYSTEM.md.
 */
import type { Brand } from './types';
import { fontDisplay, fontMono } from './fonts';

export const concepto: Brand = {
  name: 'Concepto Development',
  primary: '#7c3aed',
  primaryLight: '#a855f7',
  ink: '#0d0d0d',
  surface: '#14141f',
  border: 'rgba(168,85,247,0.16)',
  textHi: '#F2F2F7',
  textLo: '#7C7C95',
  accentGradient: 'linear-gradient(135deg, #7c3aed, #a855f7)',
  glow: 'rgba(124,58,237,0.45)',
  font: { display: fontDisplay, mono: fontMono },
  logo: 'concepto-icon.png',
  tagline: 'IA que vende. 24/7.',
  cta: 'conceptodevelopment.com',
  hero: { src: 'renders-dark/max-consulting-legacy.png', kind: 'image' },
};
