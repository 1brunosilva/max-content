/** Contexto de marca. Las scenes leen useBrand(); cambiar marca = otro <BrandProvider>. */
import React, { createContext, useContext } from 'react';
import type { Brand } from './types';
import { concepto } from './concepto';

const Ctx = createContext<Brand>(concepto);

export const BrandProvider: React.FC<{ brand: Brand; children: React.ReactNode }> = ({
  brand,
  children,
}) => <Ctx.Provider value={brand}>{children}</Ctx.Provider>;

export const useBrand = (): Brand => useContext(Ctx);
