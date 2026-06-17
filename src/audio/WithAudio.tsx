/**
 * WithAudio — envuelve un mecanismo visual y le monta encima la banda de sonido
 * (música + efectos sincronizados) definida en sfx.ts. NO modifica el componente
 * visual: lo renderiza tal cual y agrega capas de <Audio>. Así el audio se suma sin
 * riesgo de romper lo que ya está aprobado a nivel imagen.
 */
import React from 'react';
import { AbsoluteFill, Audio, Sequence, staticFile, useVideoConfig, interpolate } from 'remotion';
import { SFX } from './sfx';

const FADE = 14; // frames de fade in/out de la música

export const WithAudio: React.FC<{ track: string; children: React.ReactNode }> = ({ track, children }) => {
  const { durationInFrames } = useVideoConfig();
  const t = SFX[track];

  return (
    <AbsoluteFill>
      {children}
      {t?.music ? (
        <Audio
          src={staticFile(`audio/${t.music}`)}
          loop
          volume={(f) =>
            interpolate(
              f,
              [0, FADE, durationInFrames - FADE, durationInFrames],
              [0, t.musicVolume ?? 0.18, t.musicVolume ?? 0.18, 0],
              { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
            )
          }
        />
      ) : null}
      {(t?.cues ?? []).map((c, i) => (
        <Sequence key={i} from={Math.round(c.at)} name={`sfx:${c.src}`}>
          <Audio src={staticFile(`audio/${c.src}`)} volume={c.volume ?? 1} trimBefore={c.from} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
