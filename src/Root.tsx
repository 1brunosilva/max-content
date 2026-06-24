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
import { RecallTest, RECALLTEST_DURATION } from './apple/RecallTest';
import { TypeScan, TYPESCAN_DURATION } from './apple/TypeScan';
import { ForgetCurve, FORGETCURVE_DURATION } from './apple/ForgetCurve';
import { NarrativaVs, NARRATIVAVS_DURATION } from './apple/NarrativaVs';
import { FOMONotif, FOMOMNOTIF_DURATION } from './apple/FOMONotif';
import { PeakEnd, PEAKEND_DURATION } from './apple/PeakEnd';
import { NombrePropio, NOMBREPROPIO_DURATION } from './apple/NombrePropio';
import { GestaltClose, GESTALTCLOSE_DURATION } from './apple/GestaltClose';
import { ConfirmaBias, CONFIRMABIAS_DURATION } from './apple/ConfirmaBias';
import { Compromiso, COMPROMISO_DURATION } from './apple/Compromiso';
import { OrbitaTrust, ORBITATRUST_DURATION } from './apple/OrbitaTrust';
import { PrecioMental, PRECIOMENTAL_DURATION } from './apple/PrecioMental';
import { DefaultGana, DEFAULTGANA_DURATION } from './apple/DefaultGana';
import { CompromisoMedio, COMPROMISOMEDIO_DURATION } from './apple/CompromisoMedio';
import { FragmentaPrecio, FRAGMENTAPRECIO_DURATION } from './apple/FragmentaPrecio';
import { FramingPerdida, FRAMINGPERDIDA_DURATION } from './apple/FramingPerdida';
import { IdentidadRol, IDENTIDADROL_DURATION } from './apple/IdentidadRol';
import { EspecificidadNum, ESPECIFICIDADNUM_DURATION } from './apple/EspecificidadNum';
import { AutopilotoScroll, AUTOPILOTOSCROLL_DURATION } from './apple/AutopilotoScroll';
import { RedConfianza, REDCONFIANZA_DURATION } from './apple/RedConfianza';
import { VentanaTiempo, VENTANATIEMPO_DURATION } from './apple/VentanaTiempo';
import { SesgoCerteza, SESGOCERTEZA_DURATION } from './apple/SesgoCerteza';
import { FluidezTipo, FLUIDEZTYPE_DURATION } from './apple/FluidezTipo';
import { CaraConfianza, CARACONFIANZA_DURATION } from './apple/CaraConfianza';
import { DotDotDot, DOTDOTDOT_DURATION } from './apple/DotDotDot';
import { SlotFeed, SLOTFEED_DURATION } from './apple/SlotFeed';
import { SocialNorm, SOCIALNORM_DURATION } from './apple/SocialNorm';
import { TunnelVision, TUNNELVISION_DURATION } from './apple/TunnelVision';
import { EndowmentCard, ENDOWMENTCARD_DURATION } from './apple/EndowmentCard';
import { CurvaPerdida, CURVAPERDIDA_DURATION } from './apple/CurvaPerdida';
import { PresenteBias, PRESENTEBIAS_DURATION } from './apple/PresenteBias';
import { EsfuerzoValor, ESFUERZOVALOR_DURATION } from './apple/EsfuerzoValor';
import { CostoHundido, COSTOHUNDIDO_DURATION } from './apple/CostoHundido';
import { OptimismoCiego, OPTIMISMOCIEGO_DURATION } from './apple/OptimismoCiego';
import { PrecioCalidad, PRECIOCALIDAD_DURATION } from './apple/PrecioCalidad';
import { ArranqueFresh, ARRANCUEFRESH_DURATION } from './apple/ArranqueFresh';
import { BurbujaMente, BURBUJAMENTE_DURATION } from './apple/BurbujaMente';
import { PuertaCerrada, PUERTACERRADA_DURATION } from './apple/PuertaCerrada';
import { SimulaMente, SIMULAMENTE_DURATION } from './apple/SimulaMente';
import { MomentoSocial, MOMENTOSOCIAL_DURATION } from './apple/MomentoSocial';
import { DolorPago, DOLORPAGO_DURATION } from './apple/DolorPago';
import { UmbralCambio, UMBRALCAMBIO_DURATION } from './apple/UmbralCambio';
import { SesgoSupervivencia, SESGOSUPERVIVENCIA_DURATION } from './apple/SesgoSupervivencia';
import { EgoDepletion, EGODEPLETION_DURATION } from './apple/EgoDepletion';
import { MomentoCero, MOMENTOCERO_DURATION } from './apple/MomentoCero';
import { VozCliente, VOZCLIENTE_DURATION } from './apple/VozCliente';
import { SilencioElocuente, SILENCIOELOCUENTE_DURATION } from './apple/SilencioElocuente';
import { VentajaInvisible, VENTAJAINVISIBLE_DURATION } from './apple/VentajaInvisible';
import { AnclajeVerbal, ANCLAJEEVERBAL_DURATION } from './apple/AnclajeVerbal';
import { NarrativaNumeros, NARRATIVANNUMEROS_DURATION } from './apple/NarrativaNumeros';
import { ProximidadConfianza, PROXIMIDADCONFIANZA_DURATION } from './apple/ProximidadConfianza';
import { CertezaPremium, CERTEZAPREMIUM_DURATION } from './apple/CertezaPremium';
import { EspejoMensaje, ESPEJOMENSAJE_DURATION } from './apple/EspejoMensaje';
import { CicloRetroalimentacion, CICLORETROALIMENTACION_DURATION } from './apple/CicloRetroalimentacion';
import { PratfallEleva, PRATFALLELEVA_DURATION } from './apple/PratfallEleva';
import { BaaderMeinhof, BAADERMEINHOF_DURATION } from './apple/BaaderMeinhof';
import { EfectoFoco, EFECTOFOCO_DURATION } from './apple/EfectoFoco';
import { SesgoPlanificacion, SESGOPLANEACION_DURATION } from './apple/SesgoPlanificacion';
import { EfectoOstrica, EFECTOOSTRICA_DURATION } from './apple/EfectoOstrica';
import { EfectoTribu, EFECTOTRIBU_DURATION } from './apple/EfectoTribu';
import { ContagioEmocional, CONTAGIOEMOCIONAL_DURATION } from './apple/ContagioEmocional';
import { CurvaConfianza, CURVACONFIANZA_DURATION } from './apple/CurvaConfianza';
import { CargaCognitiva, CARGACOGNITIVA_DURATION } from './apple/CargaCognitiva';
import { MarcaHumana, MARCAHUMANA_DURATION } from './apple/MarcaHumana';
import { CostoEspera, COSTOESPERA_DURATION } from './apple/CostoEspera';
import { LicenciaMoral, LICENCIAMORAL_DURATION } from './apple/LicenciaMoral';
import { EfectoEspectador, EFECTOESPECTADOR_DURATION } from './apple/EfectoEspectador';
import { PalabraVacia, PALABRAVACIA_DURATION } from './apple/PalabraVacia';
import { EtiquetaVIP, ETIQUETAVIP_DURATION } from './apple/EtiquetaVIP';
import { CuandoEntonces, CUANDOENTONCES_DURATION } from './apple/CuandoEntonces';
import { CasiLlego, CASILLLEGO_DURATION } from './apple/CasiLlego';
import { EstadoDeAnimo, ESTADODEANIMO_DURATION } from './apple/EstadoDeAnimo';
import { SaberVsHacer, SABERVSHACER_DURATION } from './apple/SaberVsHacer';
import { PuntoDeInflexion, PUNTODEINFLEXION_DURATION } from './apple/PuntoDeInflexion';
import { AtribucionError, ATRIBUCIONERROR_DURATION } from './apple/AtribucionError';
import { VelocidadRespuesta, VELOCIDADRESPUESTA_DURATION } from './apple/VelocidadRespuesta';
import { RazonPorque, RAZONPORQUE_DURATION } from './apple/RazonPorque';
import { NumeroConcreto, NUMEROCONCRETO_DURATION } from './apple/NumeroConcreto';
import { SenalLujo, SENALLUJO_DURATION } from './apple/SenalLujo';
import { AmbiguedadParaliza, AMBIGUEDADPARALIZA_DURATION } from './apple/AmbiguedadParaliza';
import { RegretEleccion, REGETELECCION_DURATION } from './apple/RegretEleccion';
import { AcercaElMensaje, ACERCAELMENSAJE_DURATION } from './apple/AcercaElMensaje';
import { DopaminaEspera, DOPAMINAESPERA_DURATION } from './apple/DopaminaEspera';
import { DecisionCircadiana, DECISIONCIRCADIANA_DURATION } from './apple/DecisionCircadiana';
import { SumaCero, SUMACERO_DURATION } from './apple/SumaCero';
import { PrecioTrayectoria, PRECIOTRAYECTORIA_DURATION } from './apple/PrecioTrayectoria';
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

      {/* RecallTest — mecanismo #30: Primacía/recencia. 7 cards, se apagan, solo primera y última brillan. Cyan. C. */}
      <Composition id="RecallTest" component={RecallTest} durationInFrames={RECALLTEST_DURATION} fps={30} width={1080} height={1920} defaultProps={{}} />

      {/* TypeScan — mecanismo #31: Atención/escaneo. Landing page + scanner barre → solo 2 palabras quedan iluminadas. Violeta. C. */}
      <Composition id="TypeScan" component={TypeScan} durationInFrames={TYPESCAN_DURATION} fps={30} width={1080} height={1920} defaultProps={{}} />

      {/* ForgetCurve — mecanismo #32: Curva del olvido. Card de mensaje se desvanece con marcadores de tiempo. Cyan-azul. C. */}
      <Composition id="ForgetCurve" component={ForgetCurve} durationInFrames={FORGETCURVE_DURATION} fps={30} width={1080} height={1920} defaultProps={{}} />

      {/* NarrativaVs — mecanismo #33: Narrativa vs argumento. Historia vs lista lógica, la historia gana. Dorado. C. */}
      <Composition id="NarrativaVs" component={NarrativaVs} durationInFrames={NARRATIVAVS_DURATION} fps={30} width={1080} height={1920} defaultProps={{}} />

      {/* FOMONotif — mecanismo #34: FOMO. Notificaciones de negocios activos apilándose, tu card apagada. Ámbar. V. */}
      <Composition id="FOMONotif" component={FOMONotif} durationInFrames={FOMOMNOTIF_DURATION} fps={30} width={1080} height={1920} defaultProps={{}} />

      {/* PeakEnd — mecanismo #35: Peak-End rule. Timeline de experiencia del cliente, pico y final iluminados. Rosa-cyan. C. */}
      <Composition id="PeakEnd" component={PeakEnd} durationInFrames={PEAKEND_DURATION} fps={30} width={1080} height={1920} defaultProps={{}} />

      {/* NombrePropio — mecanismo #36: Efecto nombre propio. Feed genérico gris, un mensaje con el nombre glow. Cyan. C. */}
      <Composition id="NombrePropio" component={NombrePropio} durationInFrames={NOMBREPROPIO_DURATION} fps={30} width={1080} height={1920} defaultProps={{}} />

      {/* GestaltClose — mecanismo #37: Gestalt/cierre. Arco incompleto, la mente lo completa con glow. Rosa. C. */}
      <Composition id="GestaltClose" component={GestaltClose} durationInFrames={GESTALTCLOSE_DURATION} fps={30} width={1080} height={1920} defaultProps={{}} />

      {/* ConfirmaBias — mecanismo #38: Sesgo de confirmación. Dos feeds; cursor instintivo elige el que confirma. Violeta. C. */}
      <Composition id="ConfirmaBias" component={ConfirmaBias} durationInFrames={CONFIRMABIAS_DURATION} fps={30} width={1080} height={1920} defaultProps={{}} />

      {/* Compromiso — mecanismo #39: Compromiso/consistencia. Checkboxes en cascade: sí pequeño → sí grande. Violeta. V. */}
      <Composition id="Compromiso" component={Compromiso} durationInFrames={COMPROMISO_DURATION} fps={30} width={1080} height={1920} defaultProps={{}} />

      {/* OrbitaTrust — mecanismo #40: Autoridad por asociación. Sellos/logos orbitan tu marca y transfieren credibilidad. Dorado. C. */}
      <Composition id="OrbitaTrust" component={OrbitaTrust} durationInFrames={ORBITATRUST_DURATION} fps={30} width={1080} height={1920} defaultProps={{}} />

      {/* PrecioMental — mecanismo #41: Contabilidad mental. El mismo $5.000 enmarcado de 3 formas distintas. Verde. C. */}
      <Composition id="PrecioMental" component={PrecioMental} durationInFrames={PRECIOMENTAL_DURATION} fps={30} width={1080} height={1920} defaultProps={{}} />

      {/* DefaultGana — mecanismo #42: Sesgo del default. Plan del medio pre-marcado, 73/100 no lo cambian. Cyan. C. */}
      <Composition id="DefaultGana" component={DefaultGana} durationInFrames={DEFAULTGANA_DURATION} fps={30} width={1080} height={1920} defaultProps={{}} />

      {/* CompromisoMedio — mecanismo #43: Compromise effect. Cursor elige el del medio solo. Dorado. C. */}
      <Composition id="CompromisoMedio" component={CompromisoMedio} durationInFrames={COMPROMISOMEDIO_DURATION} fps={30} width={1080} height={1920} defaultProps={{}} />

      {/* FragmentaPrecio — mecanismo #44: Price chunking. $180.000/año → $493/día. Verde. C. */}
      <Composition id="FragmentaPrecio" component={FragmentaPrecio} durationInFrames={FRAGMENTAPRECIO_DURATION} fps={30} width={1080} height={1920} defaultProps={{}} />

      {/* FramingPerdida — mecanismo #45: Framing loss vs gain. Mismo dato, dos encuadres opuestos. Rosa. C. */}
      <Composition id="FramingPerdida" component={FramingPerdida} durationInFrames={FRAMINGPERDIDA_DURATION} fps={30} width={1080} height={1920} defaultProps={{}} />

      {/* IdentidadRol — mecanismo #46: Identity-based motivation. ROL ACTUAL → ROL QUE ELEGÍS con glow. Violeta. C. */}
      <Composition id="IdentidadRol" component={IdentidadRol} durationInFrames={IDENTIDADROL_DURATION} fps={30} width={1080} height={1920} defaultProps={{}} />

      {/* EspecificidadNum — mecanismo #47: Specificity effect. "100 clientes" tachado → "97 verificados". Cyan-azul. C. */}
      <Composition id="EspecificidadNum" component={EspecificidadNum} durationInFrames={ESPECIFICIDADNUM_DURATION} fps={30} width={1080} height={1920} defaultProps={{}} />

      {/* AutopilotoScroll — mecanismo #48: Cognitive autopilot. Feed vertical scrollea, un card rompe el patrón. Ámbar. C. */}
      <Composition id="AutopilotoScroll" component={AutopilotoScroll} durationInFrames={AUTOPILOTOSCROLL_DURATION} fps={30} width={1080} height={1920} defaultProps={{}} />

      {/* RedConfianza — mecanismo #49: Network/in-group effect. Nodos se conectan con luz, uno queda solo. Cyan. V. */}
      <Composition id="RedConfianza" component={RedConfianza} durationInFrames={REDCONFIANZA_DURATION} fps={30} width={1080} height={1920} defaultProps={{}} />

      {/* VentanaTiempo — mecanismo #50: Urgencia temporal. Ventana 3D que se cierra lentamente. Ámbar. V. */}
      <Composition id="VentanaTiempo" component={VentanaTiempo} durationInFrames={VENTANATIEMPO_DURATION} fps={30} width={1080} height={1920} defaultProps={{}} />

      {/* SesgoCerteza — mecanismo #51: Certainty effect (Allais). $1.000 seguro vs $2.200 al 50% — EV reveal. Violeta. C. */}
      <Composition id="SesgoCerteza" component={SesgoCerteza} durationInFrames={SESGOCERTEZA_DURATION} fps={30} width={1080} height={1920} defaultProps={{}} />

      {/* FluidezTipo — mecanismo #52: Cognitive fluency. Texto difícil = menos creíble. Barras de confianza 32% vs 91%. Crema/violeta editorial-claro. C. */}
      <Composition id="FluidezTipo" component={FluidezTipo} durationInFrames={FLUIDEZTYPE_DURATION} fps={30} width={1080} height={1920} defaultProps={{}} />

      {/* CaraConfianza — mecanismo #53: Mere exposure effect. Logo visto 3 veces con glow creciente. Rosa/dorado. C. */}
      <Composition id="CaraConfianza" component={CaraConfianza} durationInFrames={CARACONFIANZA_DURATION} fps={30} width={1080} height={1920} defaultProps={{}} />

      {/* DotDotDot — mecanismo #54: Anticipación + violación de expectativa. Tres puntos que aparecen y desaparecen sin respuesta. Ámbar. V. */}
      <Composition id="DotDotDot" component={DotDotDot} durationInFrames={DOTDOTDOT_DURATION} fps={30} width={1080} height={1920} defaultProps={{}} />

      {/* SlotFeed — mecanismo #55: Variable ratio reinforcement. El feed es una máquina tragamonedas. Ámbar. C. */}
      <Composition id="SlotFeed" component={SlotFeed} durationInFrames={SLOTFEED_DURATION} fps={30} width={1080} height={1920} defaultProps={{}} />

      {/* SocialNorm — mecanismo #56: Norma social descriptiva. "8 de cada 10 negocios ya lo usan." Barra progresiva. Verde editorial-claro. C. */}
      <Composition id="SocialNorm" component={SocialNorm} durationInFrames={SOCIALNORM_DURATION} fps={30} width={1080} height={1920} defaultProps={{}} />

      {/* TunnelVision — mecanismo #57: Tunneling / scarcity mindset. Vignette que oscurece todo excepto "APAGAR INCENDIO". Midnight-índigo. C. */}
      <Composition id="TunnelVision" component={TunnelVision} durationInFrames={TUNNELVISION_DURATION} fps={30} width={1080} height={1920} defaultProps={{}} />

      {/* EndowmentCard — mecanismo #58: Endowment effect. Misma card, "la tuya" vale 88%, la externa 45%. Dorado. C. */}
      <Composition id="EndowmentCard" component={EndowmentCard} durationInFrames={ENDOWMENTCARD_DURATION} fps={30} width={1080} height={1920} defaultProps={{}} />

      {/* CurvaPerdida — mecanismo #59: Prospect theory. Barras asimétricas: perder duele 2.5x más que ganar. Violeta/data. C. */}
      <Composition id="CurvaPerdida" component={CurvaPerdida} durationInFrames={CURVAPERDIDA_DURATION} fps={30} width={1080} height={1920} defaultProps={{}} />

      {/* PresenteBias — mecanismo #60: Present bias / hiperbolic discounting. $50 HOY brilla, $100 en 30 días es borroso. Cyan. C. */}
      <Composition id="PresenteBias" component={PresenteBias} durationInFrames={PRESENTEBIAS_DURATION} fps={30} width={1080} height={1920} defaultProps={{}} />

      {/* EsfuerzoValor — mecanismo #61: Effort heuristic. Misma propuesta construida paso a paso vs instantánea: 91% vs 38% valor percibido. Dorado. C. */}
      <Composition id="EsfuerzoValor" component={EsfuerzoValor} durationInFrames={ESFUERZOVALOR_DURATION} fps={30} width={1080} height={1920} defaultProps={{}} />

      {/* CostoHundido — mecanismo #62: Sunk cost fallacy. Barras de dinero acumulado → "ya invertí tanto" → payoff "el pasado no decide". Índigo. C. */}
      <Composition id="CostoHundido" component={CostoHundido} durationInFrames={COSTOHUNDIDO_DURATION} fps={30} width={1080} height={1920} defaultProps={{}} />

      {/* OptimismoCiego — mecanismo #63: Optimism bias. Problemas que le pasan a "otros" hasta que uno impacta. Ámbar. C. */}
      <Composition id="OptimismoCiego" component={OptimismoCiego} durationInFrames={OPTIMISMOCIEGO_DURATION} fps={30} width={1080} height={1920} defaultProps={{}} />

      {/* PrecioCalidad — mecanismo #64: Price-quality heuristic. Mismo producto, precio sube → calidad percibida sube. Dorado editorial-claro. C. */}
      <Composition id="PrecioCalidad" component={PrecioCalidad} durationInFrames={PRECIOCALIDAD_DURATION} fps={30} width={1080} height={1920} defaultProps={{}} />

      {/* ArranqueFresh — mecanismo #65: Fresh start effect. El lunes, 1 de mes, año nuevo disparan motivación. Cyan-verde. C. */}
      <Composition id="ArranqueFresh" component={ArranqueFresh} durationInFrames={ARRANCUEFRESH_DURATION} fps={30} width={1080} height={1920} defaultProps={{}} />

      {/* BurbujaMente — mecanismo #66: Filter bubble / echo chamber. Feed en loop siempre lo mismo → la burbuja se cierra. Azul midnight. C. */}
      <Composition id="BurbujaMente" component={BurbujaMente} durationInFrames={BURBUJAMENTE_DURATION} fps={30} width={1080} height={1920} defaultProps={{}} />

      {/* PuertaCerrada — mecanismo #67: Psychological reactance. EXCLUSIVO cerrado → deseo crece → se abre. Violeta. V. */}
      <Composition id="PuertaCerrada" component={PuertaCerrada} durationInFrames={PUERTACERRADA_DURATION} fps={30} width={1080} height={1920} defaultProps={{}} />

      {/* SimulaMente — mecanismo #68: Mental simulation / ownership visualization. Silueta vacía → features materializan → ownership. Rosa. C. */}
      <Composition id="SimulaMente" component={SimulaMente} durationInFrames={SIMULAMENTE_DURATION} fps={30} width={1080} height={1920} defaultProps={{}} />

      {/* MomentoSocial — mecanismo #69: Social proof velocity. "47 nuevos esta semana" > "200 en total". Contador que acelera. Verde editorial-claro. C. */}
      <Composition id="MomentoSocial" component={MomentoSocial} durationInFrames={MOMENTOSOCIAL_DURATION} fps={30} width={1080} height={1920} defaultProps={{}} />

      {/* DolorPago — mecanismo #70: Pain of paying. Efectivo duele (rojo encoge) vs tarjeta (azul no duele). Azul frío / rojo. C. */}
      <Composition id="DolorPago" component={DolorPago} durationInFrames={DOLORPAGO_DURATION} fps={30} width={1080} height={1920} defaultProps={{}} />

      {/* UmbralCambio — mecanismo #71: Weber-Fechner / JND. Barra sube sin ser percibida → cruza el umbral → GLOW. Crema editorial-claro. C. */}
      <Composition id="UmbralCambio" component={UmbralCambio} durationInFrames={UMBRALCAMBIO_DURATION} fps={30} width={1080} height={1920} defaultProps={{}} />

      {/* SesgoSupervivencia — mecanismo #72: Survivorship bias. Cards brillantes → cámara baja → cementerio de cards apagadas. Dorado. C. */}
      <Composition id="SesgoSupervivencia" component={SesgoSupervivencia} durationInFrames={SESGOSUPERVIVENCIA_DURATION} fps={30} width={1080} height={1920} defaultProps={{}} />

      {/* EgoDepletion — mecanismo #73: Decision fatigue. Micro-decisiones apilan y aplastan la decisión importante. Ámbar. C. */}
      <Composition id="EgoDepletion" component={EgoDepletion} durationInFrames={EGODEPLETION_DURATION} fps={30} width={1080} height={1920} defaultProps={{}} />

      {/* MomentoCero — mecanismo #74: Zero Moment of Truth. Timeline del cliente: decide antes de contactarte. Cyan. C. */}
      <Composition id="MomentoCero" component={MomentoCero} durationInFrames={MOMENTOCERO_DURATION} fps={30} width={1080} height={1920} defaultProps={{}} />

      {/* VozCliente — mecanismo #75: Customer language. Jerga técnica sin respuesta → mismas palabras del cliente → glow y respuesta. Verde. C. */}
      <Composition id="VozCliente" component={VozCliente} durationInFrames={VOZCLIENTE_DURATION} fps={30} width={1080} height={1920} defaultProps={{}} />

      {/* SilencioElocuente — mecanismo #76: Whitespace as signal. Propuesta densa vs limpia → el espacio en blanco vende. Crema-dorado. C. */}
      <Composition id="SilencioElocuente" component={SilencioElocuente} durationInFrames={SILENCIOELOCUENTE_DURATION} fps={30} width={1080} height={1920} defaultProps={{}} />

      {/* VentajaInvisible — mecanismo #77: Iceberg effect. Negocio visible → layers ocultas de automatización reveladas. Azul midnight. V. */}
      <Composition id="VentajaInvisible" component={VentajaInvisible} durationInFrames={VENTAJAINVISIBLE_DURATION} fps={30} width={1080} height={1920} defaultProps={{}} />

      {/* AnclajeVerbal — mecanismo #78: Semantic/verbal anchoring. Misma oferta: "COSTO" vs "INVERSIÓN" → cambio de percepción total. Violeta. C. */}
      <Composition id="AnclajeVerbal" component={AnclajeVerbal} durationInFrames={ANCLAJEEVERBAL_DURATION} fps={30} width={1080} height={1920} defaultProps={{}} />

      {/* NarrativaNumeros — mecanismo #79: Story vs statistics. Datos fríos se apagan, historia de Juan brilla y genera respuesta. Dorado. C. */}
      <Composition id="NarrativaNumeros" component={NarrativaNumeros} durationInFrames={NARRATIVANNUMEROS_DURATION} fps={30} width={1080} height={1920} defaultProps={{}} />

      {/* ProximidadConfianza — mecanismo #80: Proximity heuristic. 3 negocios similares: el local sube con glow, los lejanos se hunden. Verde. V. */}
      <Composition id="ProximidadConfianza" component={ProximidadConfianza} durationInFrames={PROXIMIDADCONFIANZA_DURATION} fps={30} width={1080} height={1920} defaultProps={{}} />

      {/* CertezaPremium — mecanismo #81: Certainty effect. Valor esperado mayor vs certeza → el 73% elige lo garantizado. Violeta-azul. C. */}
      <Composition id="CertezaPremium" component={CertezaPremium} durationInFrames={CERTEZAPREMIUM_DURATION} fps={30} width={1080} height={1920} defaultProps={{}} />

      {/* EspejoMensaje — mecanismo #82: Mirroring/linguistic matching. Respuesta espejo de las palabras del cliente → confianza inmediata. Rosa. C. */}
      <Composition id="EspejoMensaje" component={EspejoMensaje} durationInFrames={ESPEJOMENSAJE_DURATION} fps={30} width={1080} height={1920} defaultProps={{}} />

      {/* CicloRetroalimentacion — mecanismo #83: Feedback loop compounding. 5 nodos orbitan: experiencia→reseña→clientes→servicio→más. Cyan-verde. C. */}
      <Composition id="CicloRetroalimentacion" component={CicloRetroalimentacion} durationInFrames={CICLORETROALIMENTACION_DURATION} fps={30} width={1080} height={1920} defaultProps={{}} />

      {/* PratfallEleva — mecanismo #84: Pratfall effect. Marca perfecta (fría) vs honesta (admite error) → la honesta gana confianza. Rosa-dorado. C. */}
      <Composition id="PratfallEleva" component={PratfallEleva} durationInFrames={PRATFALLELEVA_DURATION} fps={30} width={1080} height={1920} defaultProps={{}} />

      {/* BaaderMeinhof — mecanismo #85: Frequency illusion. Tu marca aparece una vez → el cerebro la ve en todos lados. Cyan. C. */}
      <Composition id="BaaderMeinhof" component={BaaderMeinhof} durationInFrames={BAADERMEINHOF_DURATION} fps={30} width={1080} height={1920} defaultProps={{}} />

      {/* EfectoFoco — mecanismo #86: Spotlight effect. El dueño cree que todos ven sus errores → el cliente ve solo el 10%. Violeta. C. */}
      <Composition id="EfectoFoco" component={EfectoFoco} durationInFrames={EFECTOFOCO_DURATION} fps={30} width={1080} height={1920} defaultProps={{}} />

      {/* SesgoPlanificacion — mecanismo #87: Planning fallacy. Barra de proyecto que se extiende más allá del plan. Ámbar. V. */}
      <Composition id="SesgoPlanificacion" component={SesgoPlanificacion} durationInFrames={SESGOPLANEACION_DURATION} fps={30} width={1080} height={1920} defaultProps={{}} />

      {/* EfectoOstrica — mecanismo #88: Ostrich effect. Métricas críticas ignoradas hasta que un número enorme es inevitable. Índigo-ámbar. V. */}
      <Composition id="EfectoOstrica" component={EfectoOstrica} durationInFrames={EFECTOOSTRICA_DURATION} fps={30} width={1080} height={1920} defaultProps={{}} />

      {/* EfectoTribu — mecanismo #89: In-group favoritism. Logos genéricos de afuera vs negocio local con glow → ser local es ventaja. Verde-dorado. C. */}
      <Composition id="EfectoTribu" component={EfectoTribu} durationInFrames={EFECTOTRIBU_DURATION} fps={30} width={1080} height={1920} defaultProps={{}} />

      {/* ContagioEmocional — mecanismo #90: Emotional contagion. Post frío vs post emotivo → engagement explota en el emotivo. Rosa. C. */}
      <Composition id="ContagioEmocional" component={ContagioEmocional} durationInFrames={CONTAGIOEMOCIONAL_DURATION} fps={30} width={1080} height={1920} defaultProps={{}} />

      {/* CurvaConfianza — mecanismo #91: Dunning-Kruger. Curva de confianza: pico→valle→competencia real con glow. Violeta-cyan. C. */}
      <Composition id="CurvaConfianza" component={CurvaConfianza} durationInFrames={CURVACONFIANZA_DURATION} fps={30} width={1080} height={1920} defaultProps={{}} />

      {/* CargaCognitiva — mecanismo #92: Cognitive load / friction. Proceso complejo vs simplificado: el cliente abandona vs compra. Índigo. V. */}
      <Composition id="CargaCognitiva" component={CargaCognitiva} durationInFrames={CARGACOGNITIVA_DURATION} fps={30} width={1080} height={1920} defaultProps={{}} />

      {/* MarcaHumana — mecanismo #93: Brand anthropomorphism. Respuesta robótica vs cálida/humana → la humana conecta. Rosa-violeta. C. */}
      <Composition id="MarcaHumana" component={MarcaHumana} durationInFrames={MARCAHUMANA_DURATION} fps={30} width={1080} height={1920} defaultProps={{}} />

      {/* CostoEspera — mecanismo #94: Temporal discounting. Propuesta que pierde valor percibido con cada hora sin seguimiento. Ámbar-rojo. V. */}
      <Composition id="CostoEspera" component={CostoEspera} durationInFrames={COSTOESPERA_DURATION} fps={30} width={1080} height={1920} defaultProps={{}} />

      {/* LicenciaMoral — mecanismo #95: barra de logros → UNLOCK → oferta tentadora. Moral licensing. Verde-dorado. C. */}
      <Composition id="LicenciaMoral" component={LicenciaMoral} durationInFrames={LICENCIAMORAL_DURATION} fps={30} width={1080} height={1920} defaultProps={{}} />

      {/* EfectoEspectador — mecanismo #96: 7 avatares, nadie actúa → uno rompe con glow. Bystander effect. Cyan-azul. C. */}
      <Composition id="EfectoEspectador" component={EfectoEspectador} durationInFrames={EFECTOESPECTADOR_DURATION} fps={30} width={1080} height={1920} defaultProps={{}} />

      {/* PalabraVacia — mecanismo #97: "CALIDAD" se repite hasta perder sentido → "CLARO" con glow. Semantic satiation. Violeta-midnight. C. */}
      <Composition id="PalabraVacia" component={PalabraVacia} durationInFrames={PALABRAVACIA_DURATION} fps={30} width={1080} height={1920} defaultProps={{}} />

      {/* EtiquetaVIP — mecanismo #98: avatar genérico → label VIP cae con glow → se transforma. Labeling/Pygmalion. Dorado. C. */}
      <Composition id="EtiquetaVIP" component={EtiquetaVIP} durationInFrames={ETIQUETAVIP_DURATION} fps={30} width={1080} height={1920} defaultProps={{}} />

      {/* CuandoEntonces — mecanismo #99: intención vaga (dim) vs plan Si-Cuando (glow) → ejecución 3x. Implementation intentions. Verde-cyan. V. */}
      <Composition id="CuandoEntonces" component={CuandoEntonces} durationInFrames={CUANDOENTONCES_DURATION} fps={30} width={1080} height={1920} defaultProps={{}} />

      {/* CasiLlego — mecanismo #100: contador que para 3 antes de la meta → dolor del "casi" → vuelta 2 llega con glow. Near-miss. Ámbar. C. */}
      <Composition id="CasiLlego" component={CasiLlego} durationInFrames={CASILLLEGO_DURATION} fps={30} width={1080} height={1920} defaultProps={{}} />

      {/* EstadoDeAnimo — mecanismo #101: misma propuesta en frío (28%) vs en caliente (91%). Affect heuristic. Azul-naranja. C. */}
      <Composition id="EstadoDeAnimo" component={EstadoDeAnimo} durationInFrames={ESTADODEANIMO_DURATION} fps={30} width={1080} height={1920} defaultProps={{}} />

      {/* SaberVsHacer — mecanismo #102: montaña de conocimiento (dim) vs una acción pequeña (glow, gran output). Knowing-doing gap. Dorado. C. */}
      <Composition id="SaberVsHacer" component={SaberVsHacer} durationInFrames={SABERVSHACER_DURATION} fps={30} width={1080} height={1920} defaultProps={{}} />

      {/* PuntoDeInflexion — mecanismo #103: cargas que se apilan sin cambio → última gota → quiebre con glow Siri. Tipping point. Cyan-verde. C. */}
      <Composition id="PuntoDeInflexion" component={PuntoDeInflexion} durationInFrames={PUNTODEINFLEXION_DURATION} fps={30} width={1080} height={1920} defaultProps={{}} />

      {/* AtribucionError — mecanismo #104: "FLOJO" stamped → circunstancias rodean → reencuadre con glow. Fundamental attribution error. Dorado-crema. C. */}
      <Composition id="AtribucionError" component={AtribucionError} durationInFrames={ATRIBUCIONERROR_DURATION} fps={30} width={1080} height={1920} defaultProps={{}} />

      {/* VelocidadRespuesta — mecanismo #105: dos negocios compitiendo, el rápido gana con glow. First-mover / response speed. Cyan-violeta. V. */}
      <Composition id="VelocidadRespuesta" component={VelocidadRespuesta} durationInFrames={VELOCIDADRESPUESTA_DURATION} fps={30} width={1080} height={1920} defaultProps={{}} />

      {/* RazonPorque — mecanismo #106: "porque" effect. Sin razón=ignorado, con "porque..."=aceptado. Reason heuristic. Verde-cyan. C. */}
      <Composition id="RazonPorque" component={RazonPorque} durationInFrames={RAZONPORQUE_DURATION} fps={30} width={1080} height={1920} defaultProps={{}} />

      {/* NumeroConcreto — mecanismo #107: scope insensitivity. 1.000.000 adormece; "3 clientes" duele. Ámbar. C. */}
      <Composition id="NumeroConcreto" component={NumeroConcreto} durationInFrames={NUMEROCONCRETO_DURATION} fps={30} width={1080} height={1920} defaultProps={{}} />

      {/* SenalLujo — mecanismo #108: Veblen effect. "-50% OFF" genera desconfianza; "Edición Limitada" brilla. Dorado-crema. V. */}
      <Composition id="SenalLujo" component={SenalLujo} durationInFrames={SENALLUJO_DURATION} fps={30} width={1080} height={1920} defaultProps={{}} />

      {/* AmbiguedadParaliza — mecanismo #109: ambiguity aversion. Propuesta vaga se desenfoca; propuesta clara gana con glow. Midnight-azul. C. */}
      <Composition id="AmbiguedadParaliza" component={AmbiguedadParaliza} durationInFrames={AMBIGUEDADPARALIZA_DURATION} fps={30} width={1080} height={1920} defaultProps={{}} />

      {/* RegretEleccion — mecanismo #110: post-choice regret. 12 opciones=35% satisfacción; 3 opciones=88%. Violeta. C. */}
      <Composition id="RegretEleccion" component={RegretEleccion} durationInFrames={REGETELECCION_DURATION} fps={30} width={1080} height={1920} defaultProps={{}} />

      {/* AcercaElMensaje — mecanismo #111: construal level theory. Mensaje genérico → zoom in → mensaje específico con glow. Cyan. C. */}
      <Composition id="AcercaElMensaje" component={AcercaElMensaje} durationInFrames={ACERCAELMENSAJE_DURATION} fps={30} width={1080} height={1920} defaultProps={{}} />

      {/* DopaminaEspera — mecanismo #112: anticipatory affect. Barra de progreso con glow; pico de dopamina antes del 100%. Rosa-violeta. C. */}
      <Composition id="DopaminaEspera" component={DopaminaEspera} durationInFrames={DOPAMINAESPERA_DURATION} fps={30} width={1080} height={1920} defaultProps={{}} />

      {/* DecisionCircadiana — mecanismo #113: circadian decision quality. Histograma de horas; 10AM=94%, 2PM=38%. Dorado-naranja. C. */}
      <Composition id="DecisionCircadiana" component={DecisionCircadiana} durationInFrames={DECISIONCIRCADIANA_DURATION} fps={30} width={1080} height={1920} defaultProps={{}} />

      {/* SumaCero — mecanismo #114: zero-sum bias. Balanza que se desequilibra → reencuadre suma positiva; ambos suben con glow. Verde-dorado. C. */}
      <Composition id="SumaCero" component={SumaCero} durationInFrames={SUMACERO_DURATION} fps={30} width={1080} height={1920} defaultProps={{}} />

      {/* PrecioTrayectoria — mecanismo #115: price momentum. Mismo $5.000: precio que sube=compran ya; precio que baja=esperan. Ámbar-verde. V. */}
      <Composition id="PrecioTrayectoria" component={PrecioTrayectoria} durationInFrames={PRECIOTRAYECTORIA_DURATION} fps={30} width={1080} height={1920} defaultProps={{}} />

      {/* Variantes con audio (música + SFX sincronizados): "<Id>-A". No tocan el visual. */}
      <AudioCompositions />
    </>
  );
};
