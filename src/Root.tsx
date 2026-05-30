import './index.css';
import React from 'react';
import { Composition } from 'remotion';
import { TipoA } from './templates/TipoA';
import { TipoB } from './templates/TipoB';
import { TipoC } from './templates/TipoC';
import { ContrastSlide } from './templates/ContrastSlide';

const DUR = 90; // 3s @ 30fps — frame 90 = exported still
const FPS = 30;
const W45 = 1080;
const H45 = 1350; // 4:5 max Instagram reach
const W11 = 1080;
const H11 = 1080; // 1:1 carousels + paid

export const RemotionRoot: React.FC = () => (
  <>
    {/* ══════════════════════════════════════════════
        BLOQUE A — COPY ATOMS (8 piezas, Feed 4:5)
        Lever dominante: Identity + Loss Aversion
    ══════════════════════════════════════════════ */}

    <Composition
      id="A1_AmenazaSilenciosa"
      component={TipoA}
      durationInFrames={DUR}
      fps={FPS}
      width={W45}
      height={H45}
      defaultProps={{
        preheadline: 'El mercado no espera.',
        lines: [
          { text: 'Cada mes que esperás,', color: 'white', size: 68 },
          { text: 'tu competencia', color: 'violet', size: 68 },
          { text: 'te saca más ventaja.', color: 'violet', size: 68, marginBottom: 36 },
          {
            text: 'Sin apuro.',
            color: 'white',
            size: 28,
            weight: 600,
            marginTop: 36,
            lineHeight: 1.2,
            letterSpacing: '-0.01em',
          },
        ],
      }}
    />

    <Composition
      id="A2_IdentityBinary"
      component={TipoA}
      durationInFrames={DUR}
      fps={FPS}
      width={W45}
      height={H45}
      defaultProps={{
        lines: [
          { text: 'Hay dos tipos de empresas:', color: 'white', size: 72, marginBottom: 52 },
          { text: 'las que automatizan', color: 'violet', size: 72, marginTop: 52 },
          { text: 'y las que trabajan', color: 'white', size: 72 },
          { text: 'para las que automatizan.', color: 'gray', size: 72 },
        ],
        glowHigh: true,
      }}
    />

    <Composition
      id="A3_CostoOportunidad"
      component={TipoA}
      durationInFrames={DUR}
      fps={FPS}
      width={W45}
      height={H45}
      defaultProps={{
        preheadline: 'No aparece en tu balance.',
        numberBlock: {
          value: '$8.280',
          label: 'AL AÑO EN RESPUESTAS REPETIDAS',
          color: 'violet',
        },
        divider: true,
        lines: [
          {
            text: 'Solo en las preguntas que tu equipo',
            color: 'white',
            size: 20,
            weight: 400,
            lineHeight: 1.6,
          },
          {
            text: 'responde una y otra vez.',
            color: 'white',
            size: 20,
            weight: 400,
            lineHeight: 1.6,
          },
        ],
        ctaLine: 'MAX las responde todas.',
      }}
    />

    <Composition
      id="A4_Inevitabilidad"
      component={TipoA}
      durationInFrames={DUR}
      fps={FPS}
      width={W45}
      height={H45}
      defaultProps={{
        preheadline: 'No es una pregunta de si.',
        lines: [
          { text: 'La pregunta no es', color: 'white', size: 64 },
          { text: 'si tu empresa va a usar IA.', color: 'white', size: 64, marginBottom: 44 },
          { text: 'Es si vas a ser', color: 'violet', size: 64, marginTop: 44 },
          { text: 'el primero o el último.', color: 'violet', size: 64 },
        ],
      }}
    />

    <Composition
      id="A5_VelocidadAsimetrica"
      component={ContrastSlide}
      durationInFrames={DUR}
      fps={FPS}
      width={W45}
      height={H45}
      defaultProps={{
        leftBlock: {
          label: 'TU EQUIPO HOY',
          value: '8 hs',
          sublabel: 'para procesar 50 cotizaciones',
          color: 'gray',
        },
        rightBlock: {
          label: 'EMPRESA CON MAX',
          value: '20 min',
          sublabel: 'mismo trabajo. siempre.',
          color: 'violet',
        },
        footer: '¿Cuánto tiempo más podés ignorarlo?',
        footerColor: 'gray',
      }}
    />

    <Composition
      id="A6_DeudaActiva"
      component={TipoA}
      durationInFrames={DUR}
      fps={FPS}
      width={W45}
      height={H45}
      defaultProps={{
        lines: [
          { text: 'No automatizar', color: 'white', size: 68 },
          { text: 'no es quedarse igual.', color: 'white', size: 68, marginBottom: 64 },
          { text: 'Es endeudarse', color: 'violet', size: 68, marginTop: 64 },
          { text: 'con el futuro.', color: 'violet', size: 68 },
        ],
        glowHigh: true,
      }}
    />

    <Composition
      id="A7_RedefineVentaja"
      component={TipoA}
      durationInFrames={DUR}
      fps={FPS}
      width={W45}
      height={H45}
      defaultProps={{
        preheadline: 'Las reglas cambiaron.',
        lines: [
          { text: 'La ventaja antes: experiencia.', color: 'muted', size: 44, weight: 700 },
          { text: 'La ventaja antes: red de contactos.', color: 'muted', size: 44, weight: 700 },
          {
            text: 'La ventaja antes: capital.',
            color: 'muted',
            size: 44,
            weight: 700,
            marginBottom: 42,
          },
          { text: 'Hoy la ventaja es velocidad.', color: 'violet', size: 60, marginTop: 42 },
          {
            text: 'La velocidad la da la IA.',
            color: 'white',
            size: 20,
            weight: 600,
            marginTop: 10,
            lineHeight: 1.4,
          },
        ],
      }}
    />

    <Composition
      id="A8_UnityExclusividad"
      component={TipoA}
      durationInFrames={DUR}
      fps={FPS}
      width={W45}
      height={H45}
      defaultProps={{
        preheadline: 'No es una diferenciación.',
        lines: [
          { text: 'Automatizar no te hace', color: 'white', size: 68 },
          { text: 'diferente.', color: 'white', size: 68, marginBottom: 36 },
          { text: 'Te hace parte del grupo', color: 'violet', size: 68, marginTop: 36 },
          { text: 'que ya definió quién gana.', color: 'violet', size: 68 },
        ],
      }}
    />

    {/* ══════════════════════════════════════════════
        BLOQUE B — SEMANA 1 (6 piezas)
        Lever: Loss Aversion — "el costo invisible"
    ══════════════════════════════════════════════ */}

    <Composition
      id="B1_CostoInvisible1"
      component={TipoC}
      durationInFrames={DUR}
      fps={FPS}
      width={W45}
      height={H45}
      defaultProps={{
        headline: 'Tu equipo gasta',
        headlineAccent: '552 horas al año',
        subtitle: 'respondiendo las mismas preguntas.',
        metrics: [
          { value: '$8.280', label: 'Anuales en respuestas repetidas', color: 'violet' },
          { value: '552h', label: 'Horas anuales de trabajo repetible' },
          { value: '4 seg', label: 'Tiempo de respuesta de MAX', color: 'green', trend: 'vs 47h', trendUp: false },
          { value: '100%', label: 'Preguntas que MAX responde solo', color: 'cyan' },
        ],
        maxSrc: 'renders-dark/max-dashboard.png',
      }}
    />

    <Composition
      id="B2_MientrasDormias1"
      component={TipoB}
      durationInFrames={DUR}
      fps={FPS}
      width={W45}
      height={H45}
      defaultProps={{
        maxSrc: 'renders-dark/max-laptop-floor.png',
        timestamp: '02:37',
        timestampSub: 'AM — mientras vos dormías',
        lines: [],
        listItems: [
          { text: 'MAX respondió 47 consultas de clientes', bullet: '▸' },
          { text: 'Capturó 3 leads nuevos', bullet: '▸' },
          { text: 'Procesó 2 cotizaciones', bullet: '▸' },
        ],
        ctaLine: 'Vos dormías. Tu negocio, no.',
        ctaColor: 'violet',
      }}
    />

    <Composition
      id="B3_MaxAccionHoteleria"
      component={TipoB}
      durationInFrames={DUR}
      fps={FPS}
      width={W45}
      height={H45}
      defaultProps={{
        maxSrc: 'renders-dark/max-dashboard.png',
        lines: [
          { text: '11 PM. Front desk cerrado.', color: 'white', size: 50 },
          { text: 'MAX no.', color: 'violet', size: 50 },
        ],
        chatMessages: [
          {
            from: 'client',
            text: '¿Tienen habitaciones para este fin de semana?',
          },
          {
            from: 'max',
            text: '¡Sí! Dbl estándar: $89/noche — Suite: $145/noche. Reservás directo aquí: [reservar]',
            meta: '4 segundos',
          },
        ],
        ctaLine: 'Reserva capturada. El equipo duerme.',
      }}
    />

    <Composition
      id="B4_ElDato68"
      component={TipoA}
      durationInFrames={DUR}
      fps={FPS}
      width={W45}
      height={H45}
      defaultProps={{
        numberBlock: { value: '68%', label: 'DE LAS CONSULTAS SON', sublabel: 'SIEMPRE LAS MISMAS PREGUNTAS', color: 'violet', size: 120 },
        divider: true,
        lines: [
          { text: 'Una y otra vez. Persona a persona.', color: 'white', size: 22, weight: 400, lineHeight: 1.6 },
          { text: 'Hora tras hora.', color: 'white', size: 22, weight: 400, lineHeight: 1.6 },
        ],
        ctaLine: 'MAX las responde todas. Sin cansarse.',
      }}
    />

    <Composition
      id="B5_OpinionChatbots"
      component={TipoA}
      durationInFrames={DUR}
      fps={FPS}
      width={W45}
      height={H45}
      defaultProps={{
        preheadline: 'Por qué el 80% de los chatbots no sirven.',
        lines: [
          { text: 'El chatbot no falla', color: 'white', size: 60 },
          { text: 'por la tecnología.', color: 'white', size: 60, marginBottom: 32 },
        ],
        listItems: [
          { text: 'Responde con links genéricos', color: 'gray' },
          { text: "Escala todo a 'un agente te contacta'", color: 'gray' },
          { text: 'No tiene datos reales de la empresa', color: 'gray' },
        ],
        ctaLine: 'MAX se construye diferente.',
      }}
    />

    <Composition
      id="B6_CulturaAspiracional1"
      component={TipoB}
      durationInFrames={DUR}
      fps={FPS}
      width={W45}
      height={H45}
      defaultProps={{
        maxSrc: 'renders-aspiracional/max-night.png',
        maxScale: 0.8,
        lines: [
          { text: 'Viernes, 10 PM. Montevideo.', color: 'white', size: 60 },
          { text: 'MAX sigue trabajando.', color: 'white', size: 22, weight: 400, marginTop: 36, lineHeight: 1.5 },
          { text: 'Respondiendo. Capturando. Cerrando.', color: 'violet', size: 22, weight: 600, lineHeight: 1.5 },
        ],
        ctaLine: 'Vos tomás ese vino que te merecés.',
        ctaColor: 'gray',
      }}
    />

    {/* ══════════════════════════════════════════════
        BLOQUE C — SEMANA 2 (6 piezas)
        Lever: Social Proof + Contrast
    ══════════════════════════════════════════════ */}

    <Composition
      id="C1_ErroresManuales"
      component={TipoA}
      durationInFrames={DUR}
      fps={FPS}
      width={W45}
      height={H45}
      defaultProps={{
        preheadline: 'No salen en el balance.',
        lines: [
          { text: 'Un precio mal cotizado.', color: 'white', size: 60 },
          { text: 'Un email al cliente equivocado.', color: 'white', size: 60 },
          { text: 'Una fecha confundida.', color: 'white', size: 60, marginBottom: 32 },
        ],
        listItems: [
          { text: 'Clientes perdidos', color: 'white' },
          { text: 'Retrabajos', color: 'white' },
          { text: 'Reputación', color: 'white' },
        ],
        ctaLine: 'MAX no se equivoca. Nunca.',
      }}
    />

    <Composition
      id="C2_FinDeSemana"
      component={TipoB}
      durationInFrames={DUR}
      fps={FPS}
      width={W45}
      height={H45}
      defaultProps={{
        maxSrc: 'renders-dark/max-contract.png',
        lines: [
          { text: 'Sábado. 2 PM.', color: 'gray', size: 16, weight: 400, lineHeight: 1.4 },
          { text: 'Tu oficina, cerrada.', color: 'white', size: 52 },
          { text: 'MAX no cerró.', color: 'violet', size: 52 },
        ],
        statsCards: [
          { value: '31', label: 'consultas respondidas', highlight: true },
          { value: '2', label: 'cotizaciones procesadas' },
          { value: '0', label: 'empleados trabajando' },
        ],
        ctaLine: 'Con los tuyos. Siempre.',
      }}
    />

    <Composition
      id="C3_ReportesAutomaticos"
      component={TipoC}
      durationInFrames={DUR}
      fps={FPS}
      width={W45}
      height={H45}
      defaultProps={{
        headline: 'Todos los lunes, 7 AM,',
        headlineAccent: 'este reporte llega solo.',
        bodyLines: [
          { text: 'Sin que nadie lo arme.', color: 'gray' },
          { text: 'Sin que nadie lo mande.', color: 'gray' },
        ],
        metrics: [
          { value: '$12.400', label: 'Ventas semana', trend: '↑23%', trendUp: true },
          { value: '284', label: 'Consultas atendidas', color: 'violet' },
          { value: '18', label: 'Leads generados', trend: '↑14%', trendUp: true },
          { value: '34h', label: 'Tiempo ahorrado', color: 'cyan' },
        ],
        maxSrc: 'renders-dark/max-dashboard.png',
      }}
    />

    <Composition
      id="C4_McKinsey34"
      component={TipoA}
      durationInFrames={DUR}
      fps={FPS}
      width={W45}
      height={H45}
      defaultProps={{
        numberBlock: {
          value: '34%',
          label: 'REDUCCIÓN DE COSTOS ADMINISTRATIVOS',
          color: 'violet',
          size: 120,
        },
        divider: true,
        lines: [
          { text: 'En empresas establecidas. 15-40 años de operación.', color: 'white', size: 22, weight: 400, lineHeight: 1.6 },
          { text: 'No startups. No empresas tech.', color: 'white', size: 22, weight: 400, lineHeight: 1.6 },
        ],
        ctaLine: 'Empresas como la tuya.',
        ctaColor: 'violet',
      }}
    />

    <Composition
      id="C5_EmpresasEstablecidas"
      component={TipoA}
      durationInFrames={DUR}
      fps={FPS}
      width={W45}
      height={H45}
      defaultProps={{
        preheadline: 'La narrativa está equivocada.',
        lines: [
          { text: 'La IA no es para startups.', color: 'white', size: 64 },
          { text: 'Es para los que ya construyeron algo.', color: 'violet', size: 64, marginBottom: 28 },
        ],
        listItems: [
          { text: 'Procesos documentados', color: 'white' },
          { text: 'Base de clientes real', color: 'white' },
          { text: 'Relaciones de confianza', color: 'white' },
        ],
        ctaLine: 'MAX no reemplaza lo que construiste 20 años. Lo amplifica.',
      }}
    />

    <Composition
      id="C6_MaxNocturna"
      component={TipoB}
      durationInFrames={DUR}
      fps={FPS}
      width={W45}
      height={H45}
      defaultProps={{
        maxSrc: 'renders-dark/max-contract.png',
        lines: [
          { text: '3:47 AM, Montevideo.', color: 'gray', size: 16, weight: 400 },
          { text: 'MAX no descansa.', color: 'white', size: 56 },
          { text: 'Mientras cerrás los ojos,', color: 'gray', size: 22, weight: 400, marginTop: 24, lineHeight: 1.6 },
          { text: 'él cierra negocios.', color: 'violet', size: 22, weight: 600, lineHeight: 1.6 },
        ],
        ctaLine: 'Así construimos.',
        ctaColor: 'gray',
      }}
    />

    {/* ══════════════════════════════════════════════
        BLOQUE D — SEMANA 3 (6 piezas)
        Lever: Authority + Urgency
    ══════════════════════════════════════════════ */}

    <Composition
      id="D1_RotacionLaboral"
      component={TipoA}
      durationInFrames={DUR}
      fps={FPS}
      width={W45}
      height={H45}
      defaultProps={{
        numberBlock: { value: '6 meses', label: 'PARA FORMAR UN EMPLEADO NUEVO', color: 'violet', size: 88 },
        divider: true,
        lines: [
          { text: 'Cada vez que alguien se va, empezás de cero.', color: 'white', size: 22, weight: 400, lineHeight: 1.6 },
        ],
        ctaLine: 'MAX nunca se va. Nunca olvida nada.',
      }}
    />

    <Composition
      id="D2_TemporadaAlta"
      component={TipoB}
      durationInFrames={DUR}
      fps={FPS}
      width={W45}
      height={H45}
      defaultProps={{
        maxSrc: 'renders-dark/max-laptop-floor.png',
        timestamp: '200',
        timestampSub: 'mensajes en una noche — temporada alta',
        lines: [],
        statsCards: [
          { value: '200', label: 'respondidos', highlight: true },
          { value: '0', label: 'sin respuesta' },
          { value: '0', label: 'leads perdidos' },
        ],
        ctaLine: 'Ningún lead perdido. Ningún cliente frustrado.',
      }}
    />

    <Composition
      id="D3_LeadNurturing"
      component={TipoC}
      durationInFrames={DUR}
      fps={FPS}
      width={W45}
      height={H45}
      defaultProps={{
        headline: 'El lead preguntó el lunes.',
        headlineAccent: 'MAX lo siguió 5 días.',
        timeline: [
          { date: 'Lunes', text: 'Consulta inicial → respondida en 4 segundos', status: 'good' },
          { date: 'Martes', text: 'Follow-up automático enviado' },
          { date: 'Miércoles', text: 'Cliente abrió el mensaje: recordatorio enviado' },
          { date: 'Jueves', text: 'Segunda consulta → respondida de inmediato', status: 'good' },
          { date: 'Viernes', text: 'Reunión agendada ✓', status: 'good' },
        ],
        ctaText: 'Sin que nadie en tu empresa recordara hacerlo.',
      }}
    />

    <Composition
      id="D4_NueveX"
      component={TipoA}
      durationInFrames={DUR}
      fps={FPS}
      width={W45}
      height={H45}
      defaultProps={{
        numberBlock: { value: '9x', label: 'MÁS CHANCES DE CERRAR', sublabel: 'SI RESPONDÉS EN MENOS DE 5 MINUTOS', color: 'violet', size: 120 },
        divider: true,
        lines: [
          { text: 'El promedio de las empresas: 47 horas.', color: 'gray', size: 22, weight: 400, lineHeight: 1.6 },
          { text: 'MAX: 4 segundos.', color: 'violet', size: 22, weight: 600, lineHeight: 1.6 },
        ],
        ctaLine: 'Fuente: Conversica Lead Response Report',
        ctaColor: 'muted',
      }}
    />

    <Composition
      id="D5_EsperarElMomento"
      component={TipoA}
      durationInFrames={DUR}
      fps={FPS}
      width={W45}
      height={H45}
      defaultProps={{
        lines: [
          { text: 'No hay momento correcto', color: 'white', size: 68 },
          { text: 'para empezar a automatizar.', color: 'violet', size: 68, marginBottom: 36 },
        ],
        listItems: [
          { text: "Cada semana que esperás el 'momento correcto,'", color: 'white' },
          { text: 'le regalás una semana a tu competencia.', color: 'gray' },
        ],
        ctaLine: 'El único momento fue ayer. El segundo mejor es hoy.',
      }}
    />

    <Composition
      id="D6_Uruguay"
      component={TipoB}
      durationInFrames={DUR}
      fps={FPS}
      width={W45}
      height={H45}
      defaultProps={{
        maxSrc: 'renders-dark/times-square-vertical.png',
        maxScale: 0.95,
        lines: [
          { text: 'Construido en Uruguay.', color: 'white', size: 52 },
          { text: 'Para empresas que entienden el largo plazo.', color: 'violet', size: 24, weight: 600, marginTop: 20, lineHeight: 1.4 },
          { text: 'No prometemos magia.', color: 'white', size: 20, weight: 400, marginTop: 24, lineHeight: 1.6 },
          { text: 'Prometemos un sistema que trabaja mientras vos construís.', color: 'gray', size: 20, weight: 400, lineHeight: 1.6 },
        ],
        ctaLine: 'Concepto Development — Automatización IA',
        ctaColor: 'muted',
      }}
    />

    {/* ══════════════════════════════════════════════
        BLOQUE E — SEMANA 4 (6 piezas)
        Lever: Mimetic Desire + Identity
    ══════════════════════════════════════════════ */}

    <Composition
      id="E1_2025Tarde"
      component={TipoA}
      durationInFrames={DUR}
      fps={FPS}
      width={W45}
      height={H45}
      defaultProps={{
        lines: [
          { text: '2025:', color: 'gray', size: 44, weight: 700 },
          { text: '¿cómo llegamos tan tarde?', color: 'white', size: 64, marginBottom: 40 },
        ],
        listItems: [
          { text: 'Esa frase la va a decir alguien en tu empresa.', color: 'white' },
        ],
        ctaLine: 'La pregunta es si vas a decirla vos o tu competencia.',
        ctaColor: 'violet',
      }}
    />

    <Composition
      id="E2_ContrasteMaximo"
      component={ContrastSlide}
      durationInFrames={DUR}
      fps={FPS}
      width={W45}
      height={H45}
      defaultProps={{
        headline: 'La diferencia no es esfuerzo.',
        headlineColor: 'white',
        leftBlock: {
          label: 'TU EMPRESA HOY',
          value: '8 PM→9 AM',
          sublabel: 'Sin responder. Sin capturar.',
          color: 'gray',
        },
        rightBlock: {
          label: 'EMPRESA CON MAX',
          value: '24/7',
          sublabel: 'Siempre. Sin excusas.',
          color: 'violet',
        },
        footer: 'Es sistema.',
        footerColor: 'white',
      }}
    />

    <Composition
      id="E3_ElNumeroReal"
      component={TipoC}
      durationInFrames={DUR}
      fps={FPS}
      width={W45}
      height={H45}
      defaultProps={{
        headline: 'Mientras leés esto,',
        headlineAccent: 'tu competencia está automatizando.',
        metrics: [
          { value: '$28.540', label: 'Ventas este mes', trend: '↑67%', trendUp: true, color: 'violet' },
          { value: '156', label: 'Leads captados', trend: '↑47%', trendUp: true },
          { value: '32', label: 'Reuniones agendadas', trend: '↑38%', trendUp: true },
          { value: '127h', label: 'Horas ahorradas este mes', color: 'cyan' },
        ],
        maxSrc: 'renders-dark/max-dashboard.png',
      }}
    />

    <Composition
      id="E4_DecisionMasCara"
      component={TipoA}
      durationInFrames={DUR}
      fps={FPS}
      width={W45}
      height={H45}
      defaultProps={{
        lines: [
          { text: 'El costo más alto de 2025', color: 'white', size: 64 },
          { text: 'no fue contratar mal.', color: 'white', size: 64, marginBottom: 48 },
          { text: 'Fue no automatizar', color: 'violet', size: 64, marginTop: 48 },
          { text: 'cuando todo indicaba que era el momento.', color: 'violet', size: 52 },
        ],
      }}
    />

    <Composition
      id="E5_DecisionFinal"
      component={TipoA}
      durationInFrames={DUR}
      fps={FPS}
      width={W45}
      height={H45}
      defaultProps={{
        preheadline: 'Si llegaste hasta acá, ya lo sabés.',
        lines: [
          { text: 'Hay un proceso en tu empresa', color: 'white', size: 60 },
          { text: 'que MAX puede hacer mejor.', color: 'violet', size: 60, marginBottom: 36 },
        ],
        listItems: [
          { text: '30 minutos. Gratis. Sin compromiso.', color: 'white', bullet: '→' },
          { text: 'Te decimos cuál es, con nombres y apellidos.', color: 'gray', bullet: '→' },
        ],
        ctaLine: '→ Agendar diagnóstico gratuito',
        ctaColor: 'violet',
      }}
    />

    <Composition
      id="E6_ElFuturo"
      component={TipoB}
      durationInFrames={DUR}
      fps={FPS}
      width={W45}
      height={H45}
      defaultProps={{
        maxSrc: 'renders-dark/times-square-horizontal.png',
        maxScale: 0.85,
        lines: [
          { text: 'Algunas empresas en Uruguay', color: 'white', size: 52 },
          { text: 'ya son las que su competencia estudia.', color: 'violet', size: 32, weight: 600, marginTop: 20, lineHeight: 1.4 },
        ],
        ctaLine: 'Vos decidís en cuál estás.',
        ctaColor: 'white',
      }}
    />

    {/* ══════════════════════════════════════════════
        BLOQUE F — CARRUSEL A: "Las dos empresas"
        6 slides 1:1 · Lever: Identity Binary
    ══════════════════════════════════════════════ */}

    <Composition
      id="F1_LasDosEmpresas_Hook"
      component={TipoA}
      durationInFrames={DUR}
      fps={FPS}
      width={W11}
      height={H11}
      defaultProps={{
        preheadline: 'Mientras leés esto,',
        lines: [
          { text: 'TU COMPETENCIA', color: 'white', size: 76 },
          { text: 'ESTÁ AUTOMATIZANDO.', color: 'violet', size: 76 },
        ],
        listItems: [{ text: 'Y mañana tampoco va a esperar.', color: 'gray', bullet: '' }],
        slideNumber: '01/06',
        noLensFlare: false,
        glowHigh: true,
      }}
    />

    <Composition
      id="F2_LasDosEmpresas_Dolor"
      component={ContrastSlide}
      durationInFrames={DUR}
      fps={FPS}
      width={W11}
      height={H11}
      defaultProps={{
        headline: 'El contraste que tu competencia ya vive:',
        leftBlock: {
          label: 'TU EQUIPO HOY',
          value: '50',
          sublabel: 'cotizaciones por día (manual)',
          color: 'gray',
        },
        rightBlock: {
          label: 'CON AUTOMATIZACIÓN',
          value: '2.000',
          sublabel: 'cotizaciones por día',
          color: 'violet',
        },
        footer: '¿Cuánto te cuesta esa diferencia por mes?',
        slideNumber: '02/06',
      }}
    />

    <Composition
      id="F3_LasDosEmpresas_Enemigo"
      component={TipoA}
      durationInFrames={DUR}
      fps={FPS}
      width={W11}
      height={H11}
      defaultProps={{
        lines: [
          { text: 'Tu competencia no trabaja más.', color: 'white', size: 60 },
          { text: 'Trabaja mejor.', color: 'violet', size: 60, marginBottom: 32 },
          { text: 'Mientras tu equipo escala tiempo,', color: 'gray', size: 22, weight: 400, marginTop: 32, lineHeight: 1.6 },
          { text: 'el de ellos escala sistemas.', color: 'white', size: 22, weight: 600, lineHeight: 1.6 },
        ],
        ctaLine: 'Eso no se cierra con esfuerzo. Se cierra con inteligencia.',
        slideNumber: '03/06',
      }}
    />

    <Composition
      id="F4_LasDosEmpresas_Vision"
      component={TipoA}
      durationInFrames={DUR}
      fps={FPS}
      width={W11}
      height={H11}
      defaultProps={{
        lines: [
          { text: 'Con IA implementada:', color: 'white', size: 48, marginBottom: 24 },
        ],
        listItems: [
          { text: 'Tu equipo deja las tareas repetitivas', bullet: '✓', color: 'white' },
          { text: 'Tus procesos corren solos, 24/7', bullet: '✓', color: 'white' },
          { text: 'Escalás sin contratar', bullet: '✓', color: 'white' },
          { text: 'Nunca más perdés un lead de madrugada', bullet: '✓', color: 'white' },
        ],
        ctaLine: 'Esto no es el futuro. Es lo que tiene tu competencia hoy.',
        slideNumber: '04/06',
      }}
    />

    <Composition
      id="F5_LasDosEmpresas_Prueba"
      component={TipoC}
      durationInFrames={DUR}
      fps={FPS}
      width={W11}
      height={H11}
      defaultProps={{
        headline: 'No son promesas.',
        headlineAccent: 'Son métricas documentadas.',
        metrics: [
          { value: '40-60%', label: 'Reducción tiempos operativos', color: 'violet' },
          { value: '3-5x', label: 'Capacidad de respuesta', color: 'cyan' },
          { value: '4.2 m', label: 'ROI promedio', color: 'green' },
          { value: '127h', label: 'Horas ahorradas / mes', color: 'white' },
        ],
        bodyLines: [{ text: 'McKinsey Global Institute, 2024', color: 'muted' }],
        slideNumber: '05/06',
        metricsColumns: 2,
      }}
    />

    <Composition
      id="F6_LasDosEmpresas_CTA"
      component={TipoB}
      durationInFrames={DUR}
      fps={FPS}
      width={W11}
      height={H11}
      defaultProps={{
        maxSrc: 'renders-dark/max-contract.png',
        lines: [
          { text: '¿Querés ver cómo', color: 'white', size: 52 },
          { text: 'funciona en tu empresa?', color: 'violet', size: 52 },
        ],
        listItems: [
          { text: '30 minutos. Gratis. Sin compromiso.', bullet: '→', color: 'white' },
          { text: 'Solo el mapa de automatización de tu negocio.', bullet: '→', color: 'gray' },
        ],
        ctaLine: '→ Agendar ahora',
        slideNumber: '06/06',
      }}
    />

    {/* ══════════════════════════════════════════════
        BLOQUE G — CARRUSEL B: "Costo de no hacer nada"
        6 slides 1:1 · Lever: Loss Aversion
    ══════════════════════════════════════════════ */}

    <Composition
      id="G1_CostoNoHacer_Hook"
      component={TipoA}
      durationInFrames={DUR}
      fps={FPS}
      width={W11}
      height={H11}
      defaultProps={{
        lines: [
          { text: 'No hacer nada', color: 'white', size: 76 },
          { text: 'también tiene un costo.', color: 'white', size: 68, marginBottom: 20 },
          { text: 'Y se paga con intereses.', color: 'red', size: 28, weight: 600, marginTop: 20, lineHeight: 1.3 },
        ],
        glowHigh: true,
        slideNumber: '01/06',
      }}
    />

    <Composition
      id="G2_CostoNoHacer_Calculadora"
      component={TipoA}
      durationInFrames={DUR}
      fps={FPS}
      width={W11}
      height={H11}
      defaultProps={{
        lines: [{ text: 'Calculá tu costo mensual:', color: 'white', size: 44, marginBottom: 24 }],
        listItems: [
          { text: 'Horas de tu equipo en tareas repetibles', bullet: '×', color: 'white' },
          { text: 'Velocidad de respuesta vs. competidores con IA', bullet: '×', color: 'white' },
          { text: 'Oportunidades no cerradas por capacidad', bullet: '×', color: 'white' },
        ],
        ctaLine: 'El número que te sale es lo que pagás por no cambiar.',
        slideNumber: '02/06',
      }}
    />

    <Composition
      id="G3_CostoNoHacer_Timeline"
      component={TipoC}
      durationInFrames={DUR}
      fps={FPS}
      width={W11}
      height={H11}
      defaultProps={{
        headline: 'Cómo se ve desde 2026:',
        timeline: [
          { date: 'Hoy', text: 'Decidís esperar', status: 'neutral' },
          { date: '+1 mes', text: 'Tu competencia lanza su chatbot', status: 'bad' },
          { date: '+3 meses', text: 'Leads nocturnos van a ellos, no a vos', status: 'bad' },
          { date: '+6 meses', text: 'Ya tienen 6 meses de ventaja sobre vos', status: 'bad' },
          { date: '+12 meses', text: '¿Cómo llegamos tan tarde?', status: 'bad' },
        ],
        slideNumber: '03/06',
      }}
    />

    <Composition
      id="G4_CostoNoHacer_Reframe"
      component={TipoA}
      durationInFrames={DUR}
      fps={FPS}
      width={W11}
      height={H11}
      defaultProps={{
        preheadline: 'Cambió la definición.',
        lines: [
          { text: 'No automatizar', color: 'white', size: 68 },
          { text: 'no es quedarse igual.', color: 'white', size: 68, marginBottom: 56 },
          { text: 'Es endeudarse', color: 'violet', size: 68, marginTop: 56 },
          { text: 'con el futuro.', color: 'violet', size: 68 },
        ],
        glowHigh: true,
        slideNumber: '04/06',
      }}
    />

    <Composition
      id="G5_CostoNoHacer_Solucion"
      component={TipoA}
      durationInFrames={DUR}
      fps={FPS}
      width={W11}
      height={H11}
      defaultProps={{
        lines: [{ text: 'La alternativa no es difícil.', color: 'white', size: 52, marginBottom: 28 }],
        listItems: [
          { text: 'Respuesta en 4 segundos, siempre', bullet: '✓', color: 'green' },
          { text: 'Tu equipo en lo que importa', bullet: '✓', color: 'green' },
          { text: 'Ejecución exacta, sin errores', bullet: '✓', color: 'green' },
          { text: 'Dashboard con todo en tiempo real', bullet: '✓', color: 'green' },
        ],
        ctaLine: 'Eso es MAX.',
        slideNumber: '05/06',
      }}
    />

    <Composition
      id="G6_CostoNoHacer_CTA"
      component={TipoB}
      durationInFrames={DUR}
      fps={FPS}
      width={W11}
      height={H11}
      defaultProps={{
        maxSrc: 'renders-dark/max-contract.png',
        lines: [
          { text: 'El mapa de automatización', color: 'white', size: 52 },
          { text: 'de tu empresa, gratis.', color: 'violet', size: 52 },
        ],
        listItems: [
          { text: '30 minutos. Te mostramos exactamente cuánto te cuesta no hacerlo.', bullet: '→', color: 'gray' },
        ],
        ctaLine: '→ Agendar diagnóstico gratuito',
        slideNumber: '06/06',
      }}
    />

    {/* ══════════════════════════════════════════════
        BLOQUE H — CARRUSEL C: "Qué hace MAX exactamente"
        5 slides 1:1 · Lever: Availability + JTBD
    ══════════════════════════════════════════════ */}

    <Composition
      id="H1_QueHaceMAX_Hook"
      component={TipoA}
      durationInFrames={DUR}
      fps={FPS}
      width={W11}
      height={H11}
      defaultProps={{
        lines: [
          { text: 'No es un chatbot más.', color: 'gray', size: 36, weight: 400 },
          { text: 'Es tu equipo nuevo.', color: 'white', size: 76 },
        ],
        ctaLine: 'Deslizá para ver qué hace exactamente →',
        ctaColor: 'muted',
        slideNumber: '01/05',
        glowHigh: true,
      }}
    />

    <Composition
      id="H2_QueHaceMAX_Consultas"
      component={TipoB}
      durationInFrames={DUR}
      fps={FPS}
      width={W11}
      height={H11}
      defaultProps={{
        maxSrc: 'renders-dark/max-dashboard.png',
        lines: [
          { text: '01. Responde consultas', color: 'violet', size: 16, weight: 600, isLabel: true },
          { text: '24 horas.', color: 'white', size: 68 },
          { text: '7 días. 4 segundos.', color: 'white', size: 68 },
        ],
        chatMessages: [
          { from: 'client', text: '¿Cuáles son sus horarios de atención?' },
          { from: 'max', text: 'Atendemos consultas las 24 horas. ¿En qué te puedo ayudar hoy?', meta: '4 seg' },
        ],
        slideNumber: '02/05',
      }}
    />

    <Composition
      id="H3_QueHaceMAX_Leads"
      component={TipoC}
      durationInFrames={DUR}
      fps={FPS}
      width={W11}
      height={H11}
      defaultProps={{
        headline: '02. Captura y nutre leads',
        headlineAccent: 'automáticamente.',
        timeline: [
          { date: 'Consulta', text: 'MAX responde y cualifica al lead', status: 'good' },
          { date: 'Follow-up', text: 'Recordatorio automático al día siguiente', status: 'good' },
          { date: 'Nurturing', text: 'Secuencia de mensajes personalizada', status: 'good' },
          { date: 'Cierre', text: 'Reunión agendada en tu calendario', status: 'good' },
        ],
        slideNumber: '03/05',
      }}
    />

    <Composition
      id="H4_QueHaceMAX_Reportes"
      component={TipoC}
      durationInFrames={DUR}
      fps={FPS}
      width={W11}
      height={H11}
      defaultProps={{
        headline: '03. Reportes automáticos',
        headlineAccent: 'sin que nadie los arme.',
        subtitle: 'Todos los lunes, 7 AM, llega el resumen.',
        metrics: [
          { value: '↑23%', label: 'Ventas semana', color: 'green' },
          { value: '284', label: 'Consultas atendidas', color: 'violet' },
          { value: '18', label: 'Leads captados', color: 'cyan' },
          { value: '34h', label: 'Tiempo ahorrado', color: 'white' },
        ],
        slideNumber: '04/05',
      }}
    />

    <Composition
      id="H5_QueHaceMAX_CTA"
      component={TipoB}
      durationInFrames={DUR}
      fps={FPS}
      width={W11}
      height={H11}
      defaultProps={{
        maxSrc: 'renders-dark/max-dashboard.png',
        lines: [
          { text: '¿Querés saber qué proceso', color: 'white', size: 52 },
          { text: 'automatizamos en el tuyo?', color: 'violet', size: 52 },
        ],
        ctaLine: '→ Diagnóstico gratuito — 30 minutos',
        slideNumber: '05/05',
      }}
    />

    {/* ══════════════════════════════════════════════
        BLOQUE I — CARRUSEL D: "MAX vs. contratar"
        5 slides 1:1 · Lever: Contrast + Anchoring
    ══════════════════════════════════════════════ */}

    <Composition
      id="I1_MaxVsContratar_Hook"
      component={TipoA}
      durationInFrames={DUR}
      fps={FPS}
      width={W11}
      height={H11}
      defaultProps={{
        lines: [
          { text: '¿Necesitás más capacidad?', color: 'white', size: 60 },
          { text: 'Tenés dos opciones.', color: 'violet', size: 60 },
        ],
        ctaLine: 'Deslizá para ver la comparación →',
        ctaColor: 'muted',
        slideNumber: '01/05',
        glowHigh: true,
      }}
    />

    <Composition
      id="I2_MaxVsContratar_Opcion1"
      component={TipoA}
      durationInFrames={DUR}
      fps={FPS}
      width={W11}
      height={H11}
      defaultProps={{
        lines: [{ text: 'Opción A: Contratar', color: 'gray', size: 16, weight: 600, isLabel: true, marginBottom: 16 }],
        listItems: [
          { text: '$1.200-2.000/mes en sueldo', bullet: '→', color: 'white' },
          { text: '3-6 meses de proceso de selección', bullet: '→', color: 'white' },
          { text: '6 meses para que rinda al 100%', bullet: '→', color: 'white' },
          { text: 'Se enferma, se va de vacaciones, renuncia', bullet: '→', color: 'gray' },
          { text: 'Trabaja 8 horas al día, 5 días a la semana', bullet: '→', color: 'gray' },
        ],
        slideNumber: '02/05',
      }}
    />

    <Composition
      id="I3_MaxVsContratar_Opcion2"
      component={TipoA}
      durationInFrames={DUR}
      fps={FPS}
      width={W11}
      height={H11}
      defaultProps={{
        lines: [{ text: 'Opción B: MAX', color: 'violet', size: 16, weight: 600, isLabel: true, marginBottom: 16 }],
        listItems: [
          { text: 'Inversión mensual fija (sin sorpresas)', bullet: '✓', color: 'green' },
          { text: 'Setup en 3 semanas, funcional al 100%', bullet: '✓', color: 'green' },
          { text: 'Nunca renuncia, nunca rinde menos', bullet: '✓', color: 'green' },
          { text: '24 horas / 7 días / 365 días', bullet: '✓', color: 'green' },
          { text: 'Responde en 4 segundos, siempre', bullet: '✓', color: 'green' },
        ],
        slideNumber: '03/05',
      }}
    />

    <Composition
      id="I4_MaxVsContratar_Tabla"
      component={ContrastSlide}
      durationInFrames={DUR}
      fps={FPS}
      width={W11}
      height={H11}
      defaultProps={{
        headline: 'La comparación directa:',
        leftBlock: {
          label: 'EMPLEADO NUEVO',
          value: '$1.800/m',
          sublabel: '+ 6 meses de formación + riesgos laborales',
          color: 'gray',
        },
        rightBlock: {
          label: 'MAX',
          value: '< $300/m',
          sublabel: 'Operativo en 3 semanas. Sin riesgos.',
          color: 'violet',
        },
        footer: 'Mismo trabajo. Sin las limitaciones.',
        footerColor: 'white',
        slideNumber: '04/05',
      }}
    />

    <Composition
      id="I5_MaxVsContratar_CTA"
      component={TipoB}
      durationInFrames={DUR}
      fps={FPS}
      width={W11}
      height={H11}
      defaultProps={{
        maxSrc: 'renders-dark/max-dashboard.png',
        lines: [
          { text: '¿Cuál es el proceso', color: 'white', size: 52 },
          { text: 'que MAX toma de tu equipo?', color: 'violet', size: 52 },
        ],
        ctaLine: '→ Descubrilo gratis en 30 minutos',
        slideNumber: '05/05',
      }}
    />

    {/* ══════════════════════════════════════════════
        BLOQUE J — PAID ADS (3 piezas, 1:1)
        Lever: BJ Fogg completo — máxima conversión
    ══════════════════════════════════════════════ */}

    <Composition
      id="J1_PaidAd_HorasPierde"
      component={TipoB}
      durationInFrames={DUR}
      fps={FPS}
      width={W11}
      height={H11}
      defaultProps={{
        maxSrc: 'renders-dark/max-dashboard.png',
        lines: [
          { text: '¿Cuántas horas pierde', color: 'white', size: 52 },
          { text: 'tu empresa en tareas', color: 'white', size: 52 },
          { text: 'que MAX puede hacer?', color: 'violet', size: 52 },
        ],
        ctaLine: '→ 30 min gratis. Sin compromiso.',
      }}
    />

    <Composition
      id="J2_PaidAd_127Horas"
      component={TipoA}
      durationInFrames={DUR}
      fps={FPS}
      width={W11}
      height={H11}
      defaultProps={{
        numberBlock: {
          value: '127',
          label: 'HORAS AHORRADAS ESTE MES',
          sublabel: 'POR EMPRESAS COMO LA TUYA',
          color: 'violet',
          size: 120,
        },
        divider: true,
        lines: [
          { text: 'Con un solo agente IA bien configurado.', color: 'white', size: 22, weight: 400, lineHeight: 1.6 },
        ],
        ctaLine: '→ Calculá el tuyo gratis',
        ctaColor: 'violet',
      }}
    />

    <Composition
      id="J3_PaidAd_DosEmpresas"
      component={TipoA}
      durationInFrames={DUR}
      fps={FPS}
      width={W11}
      height={H11}
      defaultProps={{
        lines: [
          { text: 'Hay empresas que automatizan.', color: 'white', size: 60 },
          { text: 'Y las que trabajan para ellas.', color: 'gray', size: 60, marginBottom: 36 },
        ],
        ctaLine: '¿En cuál querés estar? → Diagnóstico gratuito',
        ctaColor: 'violet',
        glowHigh: true,
      }}
    />
  </>
);
