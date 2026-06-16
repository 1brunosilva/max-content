/**
 * Brand — TODO color/tipografía/logo de un video sale de acá. Las scenes NUNCA
 * hardcodean color: leen useBrand(). Mismo video, otra marca = otro objeto Brand.
 */
export interface Brand {
  /** Nombre que aparece en el cierre (CTA). */
  name: string;
  /** Acento principal (CTA, keywords, glow). */
  primary: string;
  /** Acento claro (gradientes, highlights). */
  primaryLight: string;
  /** Fondo base (negro de marca). */
  ink: string;
  /** Superficie de cards/paneles. */
  surface: string;
  /** Borde sutil de cards. */
  border: string;
  /** Texto alto contraste. */
  textHi: string;
  /** Texto muted/soporte. */
  textLo: string;
  /** Gradiente de acento (botón CTA, barra de marca). */
  accentGradient: string;
  /** rgba del glow (text-shadow, orbs). */
  glow: string;
  font: { display: string; mono: string };
  /** Ícono PNG en /public (NUNCA el logo de texto completo). */
  logo: string;
  /** Tagline corto del cierre. */
  tagline?: string;
  /** URL/CTA del cierre. */
  cta?: string;
  /** Personaje/producto foto-real opcional (asset de Higgsfield en /public). */
  hero?: { src: string; kind: 'image' | 'video' };
}
