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
import { Anchor, ANCHOR_DURATION } from './apple/Anchor';
import { PruebaSocial, PRUEBASOCIAL_DURATION } from './apple/PruebaSocial';
import { PreguntaAbierta, PREGUNTAABIERTA_DURATION } from './apple/PreguntaAbierta';
import { EchoStack, ECHOSTACK_DURATION } from './apple/EchoStack';
import { PrimerSegundo, PRIMERSEGUNDO_DURATION } from './apple/PrimerSegundo';
import { Contraste, CONTRASTE_DURATION } from './apple/Contraste';
import { EsperaQueDuele, ESPERAQUEDUELE_DURATION } from './apple/EsperaQueDuele';
import { BlurReveal, BLURREVEAL_DURATION } from './apple/BlurReveal';
import { PrecioCero, PRECIOCERO_DURATION } from './apple/PrecioCero';
import { Decoy, DECOY_DURATION } from './apple/Decoy';
import { EfectoIKEA, EFECTOIKEA_DURATION } from './apple/EfectoIKEA';
import { Escasez, ESCASEZ_DURATION } from './apple/Escasez';
import { Reciprocidad, RECIPROCIDAD_DURATION } from './apple/Reciprocidad';
import { DobleCosto, DOBLECOSTO_DURATION } from './apple/DobleCosto';
import { NumeroMagico, NUMEROMAGICO_DURATION } from './apple/NumeroMagico';
import { TextoVsImagen, TEXTOVSIMAGEN_DURATION } from './apple/TextoVsImagen';
import { LoUrgente, LOURGENTE_DURATION } from './apple/LoUrgente';
import { HaloEffect, HALOEFFECT_DURATION } from './apple/HaloEffect';
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

      {/* Anchor — mecanismo #12: precio ancla $9.900 se tacha → real $4.900 con glow → "el primer número ancla todo". */}
      <Composition id="Anchor" component={Anchor} durationInFrames={ANCHOR_DURATION} fps={30} width={1080} height={1920} defaultProps={{}} />

      {/* PruebaSocial — mecanismo #13: río de reseñas 5★ en cover-flow + contador → una queda al frente → "la prueba social vende sola". */}
      <Composition id="PruebaSocial" component={PruebaSocial} durationInFrames={PRUEBASOCIAL_DURATION} fps={30} width={1080} height={1920} defaultProps={{}} />

      {/* PreguntaAbierta — mecanismo #14: anillo de luz que NO se cierra (bucle abierto) → se cierra en el payoff → "una pregunta abre la cabeza". */}
      <Composition id="PreguntaAbierta" component={PreguntaAbierta} durationInFrames={PREGUNTAABIERTA_DURATION} fps={30} width={1080} height={1920} defaultProps={{}} />

      {/* EchoStack — mecanismo #15: Illusory Truth Effect. La misma frase 3 veces, más brillante cada vez. */}
      <Composition id="EchoStack" component={EchoStack} durationInFrames={ECHOSTACK_DURATION} fps={30} width={1080} height={1920} defaultProps={{}} />

      {/* PrimerSegundo — mecanismo #16: barra 3s corre, 7 avatares caen uno a uno, quedan 2/9. Atención/hook. Cyan. */}
      <Composition id="PrimerSegundo" component={PrimerSegundo} durationInFrames={PRIMERSEGUNDO_DURATION} fps={30} width={1080} height={1920} defaultProps={{}} />

      {/* Contraste — mecanismo #17: una card de $15.900 sola → entra la tuya al lado → la tuya parece razonable. Dorado. */}
      <Composition id="Contraste" component={Contraste} durationInFrames={CONTRASTE_DURATION} fps={30} width={1080} height={1920} defaultProps={{}} />

      {/* EsperaQueDuele — mecanismo #18: mensaje cálido → reloj corre → card se enfría y se va. Ámbar. */}
      <Composition id="EsperaQueDuele" component={EsperaQueDuele} durationInFrames={ESPERAQUEDUELE_DURATION} fps={30} width={1080} height={1920} defaultProps={{}} />

      {/* BlurReveal — mecanismo #19: Context-dependent Mere Exposure. Tu marca borrosa vs competidor nítido → el espectador elige al nítido. Dorado/rosa. */}
      <Composition id="BlurReveal" component={BlurReveal} durationInFrames={BLURREVEAL_DURATION} fps={30} width={1080} height={1920} defaultProps={{}} />

      {/* PrecioCero — mecanismo #20: Efecto precio-cero. Card FREE pulsa con glow → el espectador elige gratis aunque sea peor. Verde. C. */}
      <Composition id="PrecioCero" component={PrecioCero} durationInFrames={PRECIOCERO_DURATION} fps={30} width={1080} height={1920} defaultProps={{}} />

      {/* Decoy — mecanismo #21: Efecto señuelo. 3 planes; el señuelo hace que Pro sea la elección obvia. Violeta. C. */}
      <Composition id="Decoy" component={Decoy} durationInFrames={DECOY_DURATION} fps={30} width={1080} height={1920} defaultProps={{}} />

      {/* EfectoIKEA — mecanismo #22: Efecto IKEA. Dashboard se arma pieza a pieza; el espectador lo valora más por haberlo "construido". Cyan. C. */}
      <Composition id="EfectoIKEA" component={EfectoIKEA} durationInFrames={EFECTOIKEA_DURATION} fps={30} width={1080} height={1920} defaultProps={{}} />

      {/* Escasez — mecanismo #23: Escasez/urgencia real. 5 plazas se apagan de a una; quedan 2 pulsando con glow. Ámbar. V. */}
      <Composition id="Escasez" component={Escasez} durationInFrames={ESCASEZ_DURATION} fps={30} width={1080} height={1920} defaultProps={{}} />

      {/* Reciprocidad — mecanismo #24: Principio de reciprocidad. Gift card cae con glow → el espectador siente que debe algo. Rosa-verde. C. */}
      <Composition id="Reciprocidad" component={Reciprocidad} durationInFrames={RECIPROCIDAD_DURATION} fps={30} width={1080} height={1920} defaultProps={{}} />

      {/* DobleCosto — mecanismo #25: Costo de oportunidad. 6 meses con barras que suman el costo invisible de no automatizar. Ámbar. V. */}
      <Composition id="DobleCosto" component={DobleCosto} durationInFrames={DOBLECOSTO_DURATION} fps={30} width={1080} height={1920} defaultProps={{}} />

      {/* NumeroMagico — mecanismo #26: Anclaje numérico. Valor $24.900 ancla → precio $4.900 parece ganga. Violeta. C. */}
      <Composition id="NumeroMagico" component={NumeroMagico} durationInFrames={NUMEROMAGICO_DURATION} fps={30} width={1080} height={1920} defaultProps={{}} />

      {/* TextoVsImagen — mecanismo #27: Superioridad de imagen. Card texto se borra de la memoria; card imagen permanece con glow. Dorado. C. */}
      <Composition id="TextoVsImagen" component={TextoVsImagen} durationInFrames={TEXTOVSIMAGEN_DURATION} fps={30} width={1080} height={1920} defaultProps={{}} />

      {/* LoUrgente — mecanismo #28: Sesgo de urgencia. Conveyor de tareas urgentes; card IMPORTANTE cae y se pierde. Ámbar. C. */}
      <Composition id="LoUrgente" component={LoUrgente} durationInFrames={LOURGENTE_DURATION} fps={30} width={1080} height={1920} defaultProps={{}} />

      {/* HaloEffect — mecanismo #29: Efecto halo. Zoom en un detalle imperfecto "mancha" la percepción de toda la marca. Rosa. C. */}
      <Composition id="HaloEffect" component={HaloEffect} durationInFrames={HALOEFFECT_DURATION} fps={30} width={1080} height={1920} defaultProps={{}} />

      {/* Variantes con audio (música + SFX sincronizados): "<Id>-A". No tocan el visual. */}
      <AudioCompositions />
    </>
  );
};
