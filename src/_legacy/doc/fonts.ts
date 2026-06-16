/**
 * Carga de fuentes locales para el sistema Doc — Archivo (variable) + DM Mono.
 * Se cargan vía FontFace + staticFile (patrón Remotion), con delayRender para
 * que el render espere a tenerlas listas. NO usar @font-face en CSS: webpack
 * intenta resolver el url() como módulo y rompe el bundle.
 */
import { continueRender, delayRender, staticFile } from 'remotion';

const handle = delayRender('load-doc-fonts');

const faces = [
  new FontFace('Archivo', `url(${staticFile('fonts/archivo-var.ttf')}) format("truetype")`, {
    weight: '100 900',
    stretch: '62.5% 125%',
  }),
  new FontFace('DM Mono', `url(${staticFile('fonts/dm-mono-400.woff2')}) format("woff2")`, {
    weight: '400',
  }),
];

Promise.all(faces.map((f) => f.load()))
  .then((loaded) => {
    loaded.forEach((f) => document.fonts.add(f));
    continueRender(handle);
  })
  .catch(() => continueRender(handle));
