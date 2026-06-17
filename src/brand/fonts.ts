/**
 * Fuentes sin carga de red — compatibles con entornos offline/corporativos.
 * Usa system-ui (SF Pro/Segoe UI) + monospace del sistema.
 * Las fuentes Google se cargan en dev desde el browser; en render sin red
 * usamos system fallbacks de alta calidad.
 */

export const fontDisplay = 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif';
export const fontMono = 'ui-monospace, SFMono-Regular, "Cascadia Code", Consolas, "DejaVu Sans Mono", monospace';

// Aliases de compatibilidad
export const inter = fontDisplay;
export const dmMono = fontMono;
