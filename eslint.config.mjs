import { config } from "@remotion/eslint-config-flat";

export default [
  // Código viejo archivado: no se lintea (se conserva como referencia, no se mantiene).
  { ignores: ["src/_legacy/**"] },
  ...(Array.isArray(config) ? config : [config]),
];
