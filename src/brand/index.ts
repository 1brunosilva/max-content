/** Barrel de marca + registry. */
export type { Brand } from './types';
export { concepto } from './concepto';
export { clienteEjemplo } from './_cliente-ejemplo';
export { BrandProvider, useBrand } from './BrandContext';
export { inter, dmMono } from './fonts';

import { concepto } from './concepto';
import { clienteEjemplo } from './_cliente-ejemplo';
import type { Brand } from './types';

/** Registry para elegir marca por nombre (útil al parametrizar por cliente). */
export const BRANDS: Record<string, Brand> = {
  concepto,
  clienteEjemplo,
};
