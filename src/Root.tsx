import './index.css';
import React from 'react';
import { Composition } from 'remotion';
import { Reel, reelDuration } from './system/Reel';
import { VIDEO_PERDIDA, VIDEO_AUTOMATIZACION, VIDEO_PARA_GRANDES } from './system/videos';
import { TIP_AUTOMATIZAR } from './system/videos';
import { TipReel, tipDuration } from './system/modes/TipReel';
import { RefReel, REF_DURATION } from './ref/RefReel';
import { HybridV1, HYBRID_DURATION } from './hybrid/HybridV1';
import { HeroFlow, HEROFLOW_DURATION } from './hybrid/HeroFlow';
import { AppleAd, APPLEAD_DURATION } from './apple/AppleAd';
import { CardWheel, CARDWHEEL_DURATION } from './apple/CardWheel';
import { StackFan, STACKFAN_DURATION } from './apple/StackFan';
import { Conveyor, CONVEYOR_DURATION } from './apple/Conveyor';
import { SilentChurn, SILENTCHURN_DURATION } from './apple/SilentChurn';
import { GridBreak, GRIDBREAK_DURATION } from './apple/GridBreak';
import { Materialize, MATERIALIZE_DURATION } from './apple/Materialize';
import { FlipCompare, FLIPCOMPARE_DURATION } from './apple/FlipCompare';
import { TimeSlip, TIMESLIP_DURATION } from './apple/TimeSlip';
import { MilCortes, MILCORTES_DURATION } from './apple/MilCortes';
import { Pestanas, PESTANAS_DURATION } from './apple/Pestanas';
import { Seguimiento, SEGUIMIENTO_DURATION } from './apple/Seguimiento';
import { AudioCompositions } from './audio/AudioCompositions';

/**
 * Root del sistema de video "Glassy Motion". Ver max-content/VIDEO-SYSTEM.md.
 * Un video = lista de escenas (src/system/videos.ts). Los enfoques viejos/descartados
 * están archivados en src/_legacy/ (fuera del build).
 */
export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* SISTEMA — videos armados desde data (cambiar la lista = otro video). */}
      <Composition id="Sis-Perdida" component={Reel} durationInFrames={reelDuration(VIDEO_PERDIDA)} fps={30} width={1080} height={1920} defaultProps={{ scenes: VIDEO_PERDIDA }} />
      <Composition id="Sis-Automatizacion" component={Reel} durationInFrames={reelDuration(VIDEO_AUTOMATIZACION)} fps={30} width={1080} height={1920} defaultProps={{ scenes: VIDEO_AUTOMATIZACION }} />
      <Composition id="Sis-ParaGrandes" component={Reel} durationInFrames={reelDuration(VIDEO_PARA_GRANDES)} fps={30} width={1080} height={1920} defaultProps={{ scenes: VIDEO_PARA_GRANDES }} />

      {/* MODO TIP — contenido de valor (no vende), look claro + movimiento 3D. */}
      <Composition id="Tip-Automatizar" component={TipReel} durationInFrames={tipDuration(TIP_AUTOMATIZAR)} fps={30} width={1080} height={1920} defaultProps={{ data: TIP_AUTOMATIZAR }} />

      {/* RefReel — storyboard madre aprobado (= Sis-Perdida en código directo). */}
      <Composition id="RefReel" component={RefReel} durationInFrames={REF_DURATION} fps={30} width={1080} height={1920} defaultProps={{}} />

      {/* HybridV1 — foto-real (Higgsfield) + texto/marca en código. */}
      <Composition id="HybridV1" component={HybridV1} durationInFrames={HYBRID_DURATION} fps={30} width={1080} height={1920} defaultProps={{ videoSrc: 'higgs-pushin.mp4' }} />

      {/* HeroFlow — HÍBRIDO camera-through: pieza foto-real → entra a la pantalla → UI producto → marca. */}
      <Composition id="HeroFlow" component={HeroFlow} durationInFrames={HEROFLOW_DURATION} fps={30} width={1080} height={1920} defaultProps={{}} />

      {/* AppleAd — motion "anuncio Apple" en código (cero Higgsfield). Guión psicológico nuevo. */}
      <Composition id="AppleAd" component={AppleAd} durationInFrames={APPLEAD_DURATION} fps={30} width={1080} height={1920} defaultProps={{}} />

      {/* CardWheel — mecanismo #1: rueda 3D cover-flow → glow Siri → zoom in. */}
      <Composition id="CardWheel" component={CardWheel} durationInFrames={CARDWHEEL_DURATION} fps={30} width={1080} height={1920} defaultProps={{}} />

      {/* StackFan — mecanismo #2 (mismo ADN, distinto): pila → abanico 3D → colapsa a una. */}
      <Composition id="StackFan" component={StackFan} durationInFrames={STACKFAN_DURATION} fps={30} width={1080} height={1920} defaultProps={{}} />

      {/* Conveyor — mecanismo #3: fila que pasa (cover-flow) → frena con glow → payoff. */}
      <Composition id="Conveyor" component={Conveyor} durationInFrames={CONVEYOR_DURATION} fps={30} width={1080} height={1920} defaultProps={{}} />

      {/* SilentChurn — mecanismo #4: lista de clientes, uno se va en silencio → realización. */}
      <Composition id="SilentChurn" component={SilentChurn} durationInFrames={SILENTCHURN_DURATION} fps={30} width={1080} height={1920} defaultProps={{}} />

      {/* GridBreak — mecanismo #5: grilla 3×3 genérica → una rompe → Siri glow → payoff. */}
      <Composition id="GridBreak" component={GridBreak} durationInFrames={GRIDBREAK_DURATION} fps={30} width={1080} height={1920} defaultProps={{}} />

      {/* Materialize — mecanismo #6: presupuesto que se arma → "GRATIS" → costo real se dispara. */}
      <Composition id="Materialize" component={Materialize} durationInFrames={MATERIALIZE_DURATION} fps={30} width={1080} height={1920} defaultProps={{}} />

      {/* FlipCompare — mecanismo #7: la card del negocio se voltea en 3D → mismos campos, respuestas opuestas. */}
      <Composition id="FlipCompare" component={FlipCompare} durationInFrames={FLIPCOMPARE_DURATION} fps={30} width={1080} height={1920} defaultProps={{}} />

      {/* TimeSlip — mecanismo #8: los años viajan por el eje Z (regret aversion) → slam en 2027 → payoff. */}
      <Composition id="TimeSlip" component={TimeSlip} durationInFrames={TIMESLIP_DURATION} fps={30} width={1080} height={1920} defaultProps={{}} />

      {/* MilCortes — mecanismo #9: micro-tareas que caen y suman → "5h 40m/semana" (costo invisible de lo manual). */}
      <Composition id="MilCortes" component={MilCortes} durationInFrames={MILCORTES_DURATION} fps={30} width={1080} height={1920} defaultProps={{}} />

      {/* Pestanas — mecanismo #10: tareas a medio cerrar que laten → se cierran solas con glow Siri (Zeigarnik). */}
      <Composition id="Pestanas" component={Pestanas} durationInFrames={PESTANAS_DURATION} fps={30} width={1080} height={1920} defaultProps={{}} />

      {/* Seguimiento — mecanismo #11: dos vías paralelas, con y sin seguimiento → la venta aparece del follow-up. */}
      <Composition id="Seguimiento" component={Seguimiento} durationInFrames={SEGUIMIENTO_DURATION} fps={30} width={1080} height={1920} defaultProps={{}} />
    </>
  );
};
