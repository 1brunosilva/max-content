/**
 * Marca de cliente de EJEMPLO — demuestra que el MISMO motor genera el video con
 * otra paleta/logo/nombre. Cliente sin personaje (hero ausente → ProductHero usa
 * placeholder). Duplicar este archivo por cliente y cambiar los tokens.
 */
import type { Brand } from './types';
import { fontDisplay, fontMono } from './fonts';

export const clienteEjemplo: Brand = {
  name: 'Tu Empresa',
  primary: '#2563EB',
  primaryLight: '#38BDF8',
  ink: '#0A0F1A',
  surface: '#111A2B',
  border: 'rgba(56,189,248,0.18)',
  textHi: '#EAF2FF',
  textLo: '#6B7B95',
  accentGradient: 'linear-gradient(135deg, #2563EB, #38BDF8)',
  glow: 'rgba(37,99,235,0.45)',
  font: { display: fontDisplay, mono: fontMono },
  logo: 'concepto-icon.png',
  tagline: 'Tu negocio, siempre activo.',
  cta: 'tuempresa.com',
  // sin hero: el cierre/ProductHero cae a placeholder de producto.
};
