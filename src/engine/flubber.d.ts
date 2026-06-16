declare module 'flubber' {
  export type InterpolatorOptions = { maxSegmentLength?: number; string?: boolean };
  export function interpolate(
    fromShape: string,
    toShape: string,
    options?: InterpolatorOptions,
  ): (t: number) => string;
  export function toCircle(
    fromShape: string,
    cx: number,
    cy: number,
    r: number,
    options?: InterpolatorOptions,
  ): (t: number) => string;
  export function separate(
    fromShape: string,
    toShapes: string[],
    options?: InterpolatorOptions,
  ): (t: number) => string;
}
