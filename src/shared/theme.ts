export const C = {
  bg: '#080810',
  bgSec: '#0E0E1A',
  card: '#111120',
  border: '#1E1E38',
  white: '#E8E8F0',
  gray: '#9090B0',
  muted: '#5A5A7A',
  accent: '#5B5EF4',
  violet: '#8B5CF6',
  cyan: '#06B6D4',
  green: '#10B981',
  red: '#EF4444',
  yellow: '#F59E0B',
} as const;

export type ColorName = 'white' | 'violet' | 'gray' | 'muted' | 'red' | 'cyan' | 'green';

export const getColor = (name: ColorName): string => {
  const map: Record<ColorName, string> = {
    white: C.white,
    violet: C.violet,
    gray: C.gray,
    muted: C.muted,
    red: C.red,
    cyan: C.cyan,
    green: C.green,
  };
  return map[name];
};
