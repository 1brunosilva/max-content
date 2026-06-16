import './index.css';
import React from 'react';
import { Composition } from 'remotion';
import { V1_PerdidaSilenciosa, V1_DURATION } from './compositions/V1_PerdidaSilenciosa';
import { clienteEjemplo } from './brand';

/**
 * Root del MOTOR CONTINUO. Registra solo composiciones nuevas (engine + scenes).
 * El sistema viejo (hard-cuts) está archivado en src/_legacy/ — ver VIDEO-SYSTEM.md.
 */
export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* V1 — "La pérdida silenciosa" (Loss Aversion), marca Concepto. */}
      <Composition
        id="V1-PerdidaSilenciosa"
        component={V1_PerdidaSilenciosa}
        durationInFrames={V1_DURATION}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{}}
      />

      {/* Mismo video, OTRA marca (demo de parametrización para clientes). */}
      <Composition
        id="V1-PerdidaSilenciosa-Cliente"
        component={V1_PerdidaSilenciosa}
        durationInFrames={V1_DURATION}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{ brand: clienteEjemplo }}
      />
    </>
  );
};
