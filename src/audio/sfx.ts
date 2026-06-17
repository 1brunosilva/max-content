/**
 * sfx.ts — manifiesto de audio por video. NO toca lo visual: el wrapper WithAudio
 * (ver WithAudio.tsx) lee de acá y monta música + efectos sincronizados encima del
 * mecanismo. Cada cue está atado a un frame concreto del movimiento (calculado del
 * código de cada componente), así el sonido ENCARNA el mecanismo igual que el visual.
 *
 * Música = 4 camas generadas a medida (modernas/fuertes, NO bailarinas), asignadas
 * por mood:
 *   - music-driving.m4a   pulso fuerte/propulsivo (atención, ritmo, acumulación)
 *   - music-dark.m4a      tensión cinematográfica (pérdida, presión, lo que se va)
 *   - music-anthemic.m4a  épica contenida (revelación, llegada, ancla/precio)
 *   - music-minimal.m4a   hipnótica/minimal (experimentos de percepción)
 * Archivos en public/audio/.
 */

export type Cue = {
  at: number;        // frame de inicio
  src: string;       // archivo en public/audio/
  volume?: number;   // 0..1 (default 1)
  from?: number;     // recortar inicio del clip (frames)
};

export type AudioTrack = {
  music?: string;        // cama de música (loopea/recorta a la duración del video)
  musicVolume?: number;  // default 0.14
  cues: Cue[];
};

const tick = (at: number, volume = 0.28): Cue => ({ at, src: 'tick.mp3', volume });

export const SFX: Record<string, AudioTrack> = {
  // ── APPLE ───────────────────────────────────────────────────────────────────

  // Conveyor (240f): fila de promos que pasa y FRENA → glow → payoff.
  Conveyor: {
    music: 'music-driving.m4a',
    musicVolume: 0.14,
    cues: [
      { at: 1, src: 'tick.mp3', volume: 0.22 },
      tick(4, 0.3), tick(6, 0.3), tick(9, 0.3), tick(13, 0.3), tick(17, 0.3), tick(23, 0.3), tick(33, 0.3),
      { at: 119, src: 'thunk.mp3', volume: 0.55 },
      { at: 137, src: 'chime.mp3', volume: 0.32 },
      { at: 156, src: 'whoosh.mp3', volume: 0.4 },
      { at: 168, src: 'boom.mp3', volume: 0.4 },
      { at: 196, src: 'chime.mp3', volume: 0.22 },
    ],
  },

  // SilentChurn (280f): clientes aparecen, uno se apaga EN SILENCIO → realización.
  SilentChurn: {
    music: 'music-dark.m4a',
    musicVolume: 0.13,
    cues: [
      tick(7, 0.22), tick(13, 0.28), tick(19, 0.28), tick(25, 0.28), tick(31, 0.28), tick(37, 0.28),
      { at: 110, src: 'whoosh.mp3', volume: 0.2 }, // se va, casi imperceptible
      { at: 182, src: 'thunk.mp3', volume: 0.48 }, // realización
      { at: 186, src: 'chime.mp3', volume: 0.32 },
      { at: 214, src: 'boom.mp3', volume: 0.42 },
      { at: 242, src: 'chime.mp3', volume: 0.24 },
    ],
  },

  // GridBreak (270f): grilla de 9 → una sube y rompe → glow → payoff.
  GridBreak: {
    music: 'music-driving.m4a',
    musicVolume: 0.14,
    cues: [
      tick(8, 0.26), tick(14, 0.26), tick(20, 0.26), tick(28, 0.26), tick(36, 0.26), tick(44, 0.26), tick(52, 0.26), tick(60, 0.26), tick(66, 0.26),
      { at: 95, src: 'whoosh.mp3', volume: 0.4 },
      tick(112, 0.26), tick(120, 0.26), tick(128, 0.26), tick(136, 0.26), tick(144, 0.26), tick(152, 0.26),
      { at: 130, src: 'chime.mp3', volume: 0.34 },
      { at: 168, src: 'boom.mp3', volume: 0.42 },
      { at: 210, src: 'chime.mp3', volume: 0.26 },
    ],
  },

  // Materialize (330f): recibo "gratis" → revela 80hs de tu tiempo → payoff.
  Materialize: {
    music: 'music-anthemic.m4a',
    musicVolume: 0.13,
    cues: [
      { at: 8, src: 'whoosh.mp3', volume: 0.38 },
      tick(38, 0.24), { at: 62, src: 'thunk.mp3', volume: 0.5 },
      tick(49, 0.24), { at: 73, src: 'thunk.mp3', volume: 0.5 },
      tick(60, 0.24), { at: 84, src: 'thunk.mp3', volume: 0.5 },
      tick(71, 0.24), { at: 95, src: 'thunk.mp3', volume: 0.5 },
      { at: 100, src: 'chime.mp3', volume: 0.28 },
      { at: 150, src: 'whoosh.mp3', volume: 0.22 },
      tick(158, 0.22), tick(166, 0.22), tick(174, 0.22), tick(182, 0.22), tick(190, 0.22),
      { at: 162, src: 'chime.mp3', volume: 0.36 },
      { at: 206, src: 'boom.mp3', volume: 0.44 },
      { at: 248, src: 'chime.mp3', volume: 0.26 },
    ],
  },

  // TimeSlip (310f): cámara salta de año en año (acelerando) → frena en 2027 → payoff.
  TimeSlip: {
    music: 'music-dark.m4a',
    musicVolume: 0.13,
    cues: [
      tick(7, 0.22),
      { at: 42, src: 'whoosh.mp3', volume: 0.38 },
      { at: 96, src: 'whoosh.mp3', volume: 0.4 },
      { at: 138, src: 'whoosh.mp3', volume: 0.44 },
      { at: 160, src: 'thunk.mp3', volume: 0.56 },
      { at: 164, src: 'chime.mp3', volume: 0.36 },
      { at: 218, src: 'boom.mp3', volume: 0.44 },
      { at: 260, src: 'chime.mp3', volume: 0.26 },
    ],
  },

  // MilCortes (305f, fondo claro): tareas caen una a una, suman tiempo oculto → payoff.
  MilCortes: {
    music: 'music-driving.m4a',
    musicVolume: 0.13,
    cues: [
      tick(7, 0.24),
      tick(16, 0.28), { at: 38, src: 'thunk.mp3', volume: 0.5 },
      tick(33, 0.28), { at: 55, src: 'thunk.mp3', volume: 0.5 },
      tick(50, 0.28), { at: 72, src: 'thunk.mp3', volume: 0.5 },
      tick(67, 0.28), { at: 89, src: 'thunk.mp3', volume: 0.5 },
      tick(84, 0.28), { at: 106, src: 'thunk.mp3', volume: 0.5 },
      tick(101, 0.28), { at: 123, src: 'thunk.mp3', volume: 0.5 },
      { at: 118, src: 'whoosh.mp3', volume: 0.24 },
      { at: 124, src: 'chime.mp3', volume: 0.36 },
      { at: 194, src: 'boom.mp3', volume: 0.44 },
      { at: 248, src: 'chime.mp3', volume: 0.28 },
    ],
  },

  // ── EXPLORE ───────────────────────────────────────────────────────────────────

  // TypeScan (391f): escaneo palabra por palabra → sobreviven 2 → payoff "1 seg 2 palabras".
  TypeScan: {
    music: 'music-minimal.m4a',
    musicVolume: 0.14,
    cues: [
      tick(8, 0.28), tick(10, 0.28), tick(12, 0.28), tick(14, 0.28), tick(16, 0.28), tick(18, 0.28), tick(20, 0.28), tick(22, 0.28), tick(24, 0.28), tick(26, 0.28),
      tick(30, 0.24), tick(34, 0.24), tick(38, 0.24), tick(42, 0.24),
      { at: 56, src: 'whoosh.mp3', volume: 0.4 },   // la ola de escaneo
      { at: 120, src: 'thunk.mp3', volume: 0.5 },   // el muro se desvanece
      { at: 138, src: 'chime.mp3', volume: 0.34 },  // sobreviven las 2 palabras
      { at: 212, src: 'boom.mp3', volume: 0.4 },    // payoff
      { at: 262, src: 'chime.mp3', volume: 0.22 },
    ],
  },

  // RisingBar (449f): 4 experiencias suben la vara → tu propuesta queda abajo → payoff.
  RisingBar: {
    music: 'music-driving.m4a',
    musicVolume: 0.14,
    cues: [
      tick(12, 0.26),
      tick(28, 0.3), { at: 30, src: 'whoosh.mp3', volume: 0.36 },
      tick(52, 0.3), { at: 54, src: 'whoosh.mp3', volume: 0.36 },
      tick(76, 0.3), { at: 78, src: 'whoosh.mp3', volume: 0.36 },
      tick(100, 0.3), { at: 102, src: 'whoosh.mp3', volume: 0.36 },
      tick(158, 0.26),
      { at: 168, src: 'thunk.mp3', volume: 0.5 },
      { at: 196, src: 'whoosh.mp3', volume: 0.38 },
      { at: 220, src: 'chime.mp3', volume: 0.3 },
      { at: 268, src: 'boom.mp3', volume: 0.4 },
      { at: 300, src: 'chime.mp3', volume: 0.22 },
    ],
  },

  // PeakEnd (336f): 6 momentos → quedan 1° y último con glow → payoff.
  PeakEnd: {
    music: 'music-anthemic.m4a',
    musicVolume: 0.13,
    cues: [
      tick(10, 0.3), tick(16, 0.3), tick(22, 0.3), tick(28, 0.28), tick(34, 0.28), tick(40, 0.3),
      { at: 60, src: 'chime.mp3', volume: 0.32 },
      { at: 75, src: 'whoosh.mp3', volume: 0.35 },
      { at: 102, src: 'chime.mp3', volume: 0.32 },
      { at: 176, src: 'boom.mp3', volume: 0.4 },
      { at: 190, src: 'chime.mp3', volume: 0.28 },
    ],
  },

  // LossFrame (336f): barra ganar vs barra perder (2.5×) → payoff.
  LossFrame: {
    music: 'music-dark.m4a',
    musicVolume: 0.13,
    cues: [
      tick(12, 0.26),
      tick(26, 0.3), { at: 56, src: 'thunk.mp3', volume: 0.5 }, { at: 58, src: 'chime.mp3', volume: 0.28 },
      tick(40, 0.32), { at: 60, src: 'whoosh.mp3', volume: 0.42 },
      { at: 86, src: 'thunk.mp3', volume: 0.58 },
      { at: 106, src: 'boom.mp3', volume: 0.4 },
      { at: 176, src: 'boom.mp3', volume: 0.4 },
      { at: 192, src: 'chime.mp3', volume: 0.26 },
    ],
  },

  // Anchor (336f): ancla $2.000 → se achica → $890 parece barato → payoff.
  Anchor: {
    music: 'music-anthemic.m4a',
    musicVolume: 0.13,
    cues: [
      tick(12, 0.26),
      { at: 28, src: 'boom.mp3', volume: 0.4 },     // el ancla impacta
      { at: 35, src: 'chime.mp3', volume: 0.3 },
      { at: 58, src: 'thunk.mp3', volume: 0.5 },    // se clava/achica
      { at: 60, src: 'whoosh.mp3', volume: 0.38 },  // aparece el 2º número
      tick(68, 0.28),
      { at: 84, src: 'chime.mp3', volume: 0.32 },
      { at: 110, src: 'thunk.mp3', volume: 0.42 },  // statement
      { at: 176, src: 'boom.mp3', volume: 0.4 },    // payoff
      { at: 192, src: 'chime.mp3', volume: 0.28 },
    ],
  },

  // OpenLoop (336f): círculo que llega a 91% y NO cierra (zeigarnik) → payoff.
  OpenLoop: {
    music: 'music-dark.m4a',
    musicVolume: 0.13,
    cues: [
      tick(12, 0.26),
      { at: 20, src: 'whoosh.mp3', volume: 0.38 },
      tick(28, 0.32), tick(36, 0.32), tick(44, 0.32), tick(52, 0.32), tick(60, 0.32), tick(68, 0.32),
      { at: 78, src: 'thunk.mp3', volume: 0.48 }, // se queda en 91%
      { at: 110, src: 'thunk.mp3', volume: 0.4 },
      { at: 176, src: 'boom.mp3', volume: 0.4 },
      { at: 192, src: 'chime.mp3', volume: 0.3 },
    ],
  },

  // RecallTest (492f): flash de 7 palabras → recordás 1ª y última → payoff.
  RecallTest: {
    music: 'music-minimal.m4a',
    musicVolume: 0.14,
    cues: [
      tick(36, 0.28), tick(54, 0.28), tick(72, 0.28), tick(90, 0.28), tick(108, 0.28), tick(126, 0.28), tick(144, 0.28),
      { at: 163, src: 'thunk.mp3', volume: 0.45 },
      { at: 216, src: 'whoosh.mp3', volume: 0.38 },
      { at: 228, src: 'chime.mp3', volume: 0.32 },
      { at: 306, src: 'boom.mp3', volume: 0.4 },
      { at: 372, src: 'chime.mp3', volume: 0.24 },
    ],
  },

  // PriceFlip (480f): precio solo (incierto) → ancla $6.000 → parece barato (flip) → payoff.
  PriceFlip: {
    music: 'music-anthemic.m4a',
    musicVolume: 0.13,
    cues: [
      { at: 26, src: 'whoosh.mp3', volume: 0.36 },
      tick(48, 0.26),
      { at: 120, src: 'whoosh.mp3', volume: 0.42 },
      tick(132, 0.3),
      { at: 166, src: 'whoosh.mp3', volume: 0.4 },  // el flip
      { at: 178, src: 'thunk.mp3', volume: 0.5 },   // cierra el flip
      { at: 186, src: 'chime.mp3', volume: 0.32 },
      { at: 226, src: 'thunk.mp3', volume: 0.42 },  // statement
      { at: 310, src: 'boom.mp3', volume: 0.4 },    // payoff
      { at: 372, src: 'chime.mp3', volume: 0.28 },
    ],
  },

  // Autopilot (492f): dashboard que trabaja solo (contadores + feed) → payoff aspiracional.
  Autopilot: {
    music: 'music-driving.m4a',
    musicVolume: 0.13,
    cues: [
      tick(36, 0.22), { at: 72, src: 'thunk.mp3', volume: 0.32 },
      tick(48, 0.22), { at: 84, src: 'thunk.mp3', volume: 0.32 },
      tick(60, 0.22), { at: 96, src: 'thunk.mp3', volume: 0.32 },
      tick(72, 0.24), tick(92, 0.24), tick(113, 0.24), tick(133, 0.24), tick(154, 0.24), tick(174, 0.24),
      { at: 240, src: 'whoosh.mp3', volume: 0.3 },
      { at: 257, src: 'boom.mp3', volume: 0.38 },
      { at: 336, src: 'chime.mp3', volume: 0.28 },
    ],
  },

  // Bottleneck (368f): tareas orbitan alrededor de VOS → VOS se va y todo se congela → payoff.
  Bottleneck: {
    music: 'music-dark.m4a',
    musicVolume: 0.13,
    cues: [
      { at: 7, src: 'whoosh.mp3', volume: 0.32 },
      tick(18, 0.26), tick(23, 0.26), tick(28, 0.26), tick(33, 0.26), tick(37, 0.26), tick(42, 0.26),
      tick(92, 0.18),
      { at: 129, src: 'thunk.mp3', volume: 0.55 }, // se congela
      { at: 147, src: 'whoosh.mp3', volume: 0.25 },
      { at: 180, src: 'boom.mp3', volume: 0.4 },
      { at: 255, src: 'boom.mp3', volume: 0.42 },
      { at: 325, src: 'chime.mp3', volume: 0.3 },
    ],
  },

  // MereExposure (336f): 5 marcas, una se repite/parpadea → la elegís sin darte cuenta → payoff.
  MereExposure: {
    music: 'music-minimal.m4a',
    musicVolume: 0.14,
    cues: [
      tick(12, 0.25), tick(17, 0.25), tick(22, 0.25), tick(26, 0.25), tick(31, 0.25),
      { at: 29, src: 'whoosh.mp3', volume: 0.35 },
      tick(47, 0.2), tick(61, 0.2), tick(76, 0.2), tick(91, 0.2),
      { at: 101, src: 'chime.mp3', volume: 0.34 },
      { at: 118, src: 'whoosh.mp3', volume: 0.3 },
      { at: 211, src: 'boom.mp3', volume: 0.4 },
      { at: 283, src: 'chime.mp3', volume: 0.26 },
    ],
  },
};
