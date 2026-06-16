/**
 * Tipos núcleo del motor de cámara continua.
 * Todo vive en "coordenadas de mundo" (px arbitrarios). La cámara decide qué
 * pedazo del mundo se ve en el frame 1080×1920.
 */

export type Vec = { x: number; y: number };

/** Punto-clave de cámara: en el frame N, la cámara mira (x,y) con zoom/rotación. */
export type CamKey = {
  frame: number;
  x: number;
  y: number;
  zoom: number;
  /** grados; default 0 */
  rotate?: number;
};

/** Estado de cámara resuelto para el frame actual. */
export type CamState = {
  x: number;
  y: number;
  zoom: number;
  rotate: number;
};

/** Caja en coordenadas de mundo (para morph y para encuadrar la cámara). */
export type BBox = {
  x: number; // centro x
  y: number; // centro y
  w: number;
  h: number;
  radius?: number;
};

export type Viewport = { w: number; h: number };
