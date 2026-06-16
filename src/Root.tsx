import './index.css';
import React from 'react';
import { Composition } from 'remotion';
import { TipoA } from './templates/TipoA';
import { TipoB } from './templates/TipoB';
import { TipoC } from './templates/TipoC';
import { ContrastSlide } from './templates/ContrastSlide';
import { DocReel } from './doc/DocReel';
import { PremiumReel } from './premium/PremiumReel';
import { DashboardReel } from './dashboard/DashboardReel';

const DUR = 90;   // 3s @30fps — still en frame 89
const FPS = 30;
const W45 = 1080;
const H45 = 1350; // 4:5 feed
const W11 = 1080;
const H11 = 1080; // 1:1 carrusel

export const RemotionRoot: React.FC = () => (
  <>
    {/* ════════════════════════════════════════
        DASHBOARD REEL — estilo @madebyext / @earnedits
        Tema: visibilidad de resultados. 360f = 12s.
    ════════════════════════════════════════ */}
    <Composition
      id="Dashboard-AhoraSabes"
      component={DashboardReel}
      durationInFrames={360}
      fps={30}
      width={1080}
      height={1920}
      defaultProps={{}}
    />
    {/* ════════════════════════════════════════
        POSTS 4:5 — 10 aprobados
        8 tipografía pura + 2 con foto de MAX
    ════════════════════════════════════════ */}

    {/* A4 — FOMO / Inevitabilidad */}
    <Composition
      id="A4-Inevitabilidad"
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

    {/* A6 — Loss Aversion / Deuda compuesta */}
    <Composition
      id="A6-DeudaActiva"
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

    {/* A7 — Authority / Paradigm shift */}
    <Composition
      id="A7-RedefineVentaja"
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
          { text: 'La ventaja antes: capital.', color: 'muted', size: 44, weight: 700, marginBottom: 42 },
          { text: 'Hoy la ventaja es velocidad.', color: 'violet', size: 60, marginTop: 42 },
          { text: 'La velocidad la da la IA.', color: 'white', size: 20, weight: 600, marginTop: 10, lineHeight: 1.4 },
        ],
      }}
    />

    {/* A8 — Identity / In-group */}
    <Composition
      id="A8-UnityExclusividad"
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

    {/* K1 — JTBD / Dormir tranquilo */}
    <Composition
      id="K1-NoComprasTeconologia"
      component={TipoA}
      durationInFrames={DUR}
      fps={FPS}
      width={W45}
      height={H45}
      defaultProps={{
        preheadline: 'El trabajo de la IA.',
        lines: [
          { text: 'No comprás', color: 'white', size: 80 },
          { text: 'tecnología.', color: 'violet', size: 80, marginBottom: 48 },
          { text: 'Comprás dormir', color: 'white', size: 60, marginTop: 48 },
          { text: 'tranquilo.', color: 'white', size: 60 },
        ],
        ctaLine: 'MAX trabaja. Vos descansás.',
        ctaColor: 'muted',
      }}
    />

    {/* K2 — Zeigarnik / Blind spot */}
    <Composition
      id="K2-CuantosClientesPerdiste"
      component={TipoA}
      durationInFrames={DUR}
      fps={FPS}
      width={W45}
      height={H45}
      defaultProps={{
        lines: [
          { text: '¿Cuántos clientes', color: 'white', size: 72 },
          { text: 'perdiste', color: 'violet', size: 72 },
          { text: 'anoche?', color: 'white', size: 72, marginBottom: 56 },
          { text: 'No lo sabés.', color: 'muted', size: 24, weight: 400, marginTop: 56, lineHeight: 1.4 },
          { text: 'Eso es el problema.', color: 'white', size: 24, weight: 600, lineHeight: 1.4 },
        ],
        ctaLine: 'MAX registra todo. Vos decidís.',
        ctaColor: 'violet',
        glowHigh: true,
      }}
    />

    {/* K3 — Identity aspiracional / Legado */}
    <Composition
      id="K3-EmpresasQuePerduran"
      component={TipoA}
      durationInFrames={DUR}
      fps={FPS}
      width={W45}
      height={H45}
      defaultProps={{
        preheadline: 'Para quienes construyeron algo real.',
        lines: [
          { text: 'Las empresas que', color: 'white', size: 68 },
          { text: 'van a durar', color: 'white', size: 68 },
          { text: '20 años más', color: 'violet', size: 80, marginBottom: 44 },
          { text: 'ya están construyendo', color: 'white', size: 64, marginTop: 44 },
          { text: 'con IA.', color: 'white', size: 64 },
        ],
        ctaLine: 'No desde cero. Sobre lo que ya funciona.',
        ctaColor: 'muted',
      }}
    />

    {/* E2 — Contrast / Costo del horario */}
    <Composition
      id="E2-ContrasteMaximo"
      component={TipoA}
      durationInFrames={DUR}
      fps={FPS}
      width={W45}
      height={H45}
      defaultProps={{
        preheadline: 'La diferencia no es esfuerzo.',
        lines: [
          { text: 'Tu empresa:', color: 'muted', size: 36, weight: 600 },
          { text: '8 PM → 9 AM', color: 'white', size: 76, weight: 900 },
          { text: 'sin responder.', color: 'gray', size: 40, weight: 600, marginBottom: 44 },
          { text: 'Con MAX:', color: 'violet', size: 36, weight: 600, marginTop: 44 },
          { text: '24/7.', color: 'violet', size: 100, weight: 900 },
          { text: 'Siempre. Sin excusas.', color: 'white', size: 28, weight: 400 },
        ],
        ctaLine: 'Es sistema.',
        ctaColor: 'muted',
      }}
    />

    {/* A9 — JTBD / Amplifica legado (necesita foto MAX) */}
    <Composition
      id="A9-AmplificaLegado"
      component={TipoB}
      durationInFrames={DUR}
      fps={FPS}
      width={W45}
      height={H45}
      defaultProps={{
        maxSrc: 'renders-dark/max-consulting-legacy.png',
        lines: [
          { text: 'No es reemplazo.', color: 'gray', size: 22, weight: 400, lineHeight: 1.4 },
          { text: 'MAX no reemplaza', color: 'white', size: 60 },
          { text: 'lo que construiste 20 años.', color: 'white', size: 60 },
          { text: 'Lo amplifica.', color: 'violet', size: 72, marginTop: 28 },
        ],
        ctaLine: 'Lo que construiste, potenciado.',
        ctaColor: 'muted',
      }}
    />

    {/* B2 — FOMO nocturno / 03:47 AM (necesita foto MAX) */}
    <Composition
      id="B2-MientrasDormias"
      component={TipoB}
      durationInFrames={DUR}
      fps={FPS}
      width={W45}
      height={H45}
      defaultProps={{
        maxSrc: 'renders-dark/max-mientras-dormias.png',
        timestamp: '03:47',
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

    {/* ════════════════════════════════════════
        CARRUSELES 1:1 — 10 en total
        Cada uno profundiza el lever del post
    ════════════════════════════════════════ */}

    {/* ── CAR-A4: "El mercado ya decidió" — Inevitability (5 slides) ── */}

    <Composition
      id="CAR-A4-1-Hook"
      component={TipoA}
      durationInFrames={DUR}
      fps={FPS}
      width={W11}
      height={H11}
      defaultProps={{
        lines: [
          { text: 'El mercado', color: 'white', size: 80 },
          { text: 'ya decidió.', color: 'violet', size: 80, marginBottom: 32 },
          { text: 'Vos solo elegís', color: 'white', size: 48, marginTop: 32 },
          { text: 'tu posición en él.', color: 'white', size: 48 },
        ],
        ctaLine: 'Deslizá →',
        ctaColor: 'muted',
        slideNumber: '01/05',
        glowHigh: true,
      }}
    />
    <Composition
      id="CAR-A4-2-Adopcion"
      component={TipoA}
      durationInFrames={DUR}
      fps={FPS}
      width={W11}
      height={H11}
      defaultProps={{
        preheadline: 'No es tendencia. Ya pasó.',
        lines: [
          { text: '7 de cada 10', color: 'violet', size: 80 },
          { text: 'empresas globales', color: 'white', size: 48, marginTop: 12 },
          { text: 'ya operan con IA.', color: 'white', size: 48, marginBottom: 32 },
          { text: 'No están experimentando.', color: 'muted', size: 22, weight: 400, marginTop: 32, lineHeight: 1.5 },
          { text: 'Ya compiten contra vos con ventaja.', color: 'white', size: 22, weight: 600, lineHeight: 1.5 },
        ],
        slideNumber: '02/05',
      }}
    />
    <Composition
      id="CAR-A4-3-PrimerosTienen"
      component={TipoA}
      durationInFrames={DUR}
      fps={FPS}
      width={W11}
      height={H11}
      defaultProps={{
        preheadline: 'Los que llegaron primero tienen:',
        lines: [{ text: '6 meses de', color: 'white', size: 56, marginBottom: 16 }],
        listItems: [
          { text: 'Datos de sus clientes que vos no tenés', bullet: '✓', color: 'white' },
          { text: 'Procesos afinados que vos recién arrancás', bullet: '✓', color: 'white' },
          { text: 'Velocidad de respuesta que vos no podés igualar', bullet: '✓', color: 'white' },
          { text: 'Leads capturados que podrían haber sido tuyos', bullet: '✓', color: 'violet' },
        ],
        slideNumber: '03/05',
      }}
    />
    <Composition
      id="CAR-A4-4-LoQueEspera"
      component={TipoA}
      durationInFrames={DUR}
      fps={FPS}
      width={W11}
      height={H11}
      defaultProps={{
        preheadline: 'Lo que te espera si seguís esperando.',
        lines: [
          { text: '"¿Cómo llegamos', color: 'white', size: 60 },
          { text: 'tan tarde?"', color: 'white', size: 60, marginBottom: 36 },
          { text: 'Alguien en tu empresa', color: 'muted', size: 24, weight: 400, marginTop: 36, lineHeight: 1.5 },
          { text: 'va a decir esa frase.', color: 'white', size: 24, weight: 600, lineHeight: 1.5 },
          { text: 'La pregunta es si vas a ser vos', color: 'gray', size: 20, weight: 400, marginTop: 16, lineHeight: 1.5 },
          { text: 'o tu competencia.', color: 'violet', size: 20, weight: 600, lineHeight: 1.5 },
        ],
        slideNumber: '04/05',
      }}
    />
    <Composition
      id="CAR-A4-5-CTA"
      component={TipoA}
      durationInFrames={DUR}
      fps={FPS}
      width={W11}
      height={H11}
      defaultProps={{
        preheadline: 'La puerta todavía está abierta.',
        lines: [
          { text: 'Pero no', color: 'white', size: 76 },
          { text: 'para siempre.', color: 'violet', size: 76, marginBottom: 40 },
          { text: 'Diagnóstico gratuito:', color: 'white', size: 22, weight: 600, marginTop: 40 },
          { text: 'Dónde podés ganar terreno esta semana.', color: 'gray', size: 20, weight: 400, lineHeight: 1.5 },
        ],
        ctaLine: '→ 30 minutos. Sin compromiso.',
        ctaColor: 'violet',
        slideNumber: '05/05',
        glowHigh: true,
      }}
    />

    {/* ── CAR-A6: "La deuda que crece sola" — Sunk Cost (5 slides) ── */}

    <Composition
      id="CAR-A6-1-Hook"
      component={TipoA}
      durationInFrames={DUR}
      fps={FPS}
      width={W11}
      height={H11}
      defaultProps={{
        lines: [
          { text: 'Cada semana', color: 'white', size: 72 },
          { text: 'que no automatizás,', color: 'white', size: 60, marginBottom: 28 },
          { text: 'la deuda', color: 'violet', size: 72, marginTop: 28 },
          { text: 'crece sola.', color: 'violet', size: 72 },
        ],
        ctaLine: 'Deslizá →',
        ctaColor: 'muted',
        slideNumber: '01/05',
        glowHigh: true,
      }}
    />
    <Composition
      id="CAR-A6-2-LoQueSeAcumula"
      component={TipoA}
      durationInFrames={DUR}
      fps={FPS}
      width={W11}
      height={H11}
      defaultProps={{
        preheadline: 'Lo que se acumula sin que lo veas.',
        lines: [{ text: 'Cada mes sin sistema:', color: 'white', size: 44, marginBottom: 20 }],
        listItems: [
          { text: '45 horas de trabajo repetible que pagás igual', bullet: '→', color: 'white' },
          { text: 'Leads perdidos fuera de horario sin registro', bullet: '→', color: 'white' },
          { text: 'Errores manuales que cuestan clientes', bullet: '→', color: 'white' },
          { text: '1 mes más de ventaja que le regalás a tu competencia', bullet: '→', color: 'violet' },
        ],
        slideNumber: '02/05',
      }}
    />
    <Composition
      id="CAR-A6-3-ElMomento"
      component={TipoC}
      durationInFrames={DUR}
      fps={FPS}
      width={W11}
      height={H11}
      defaultProps={{
        headline: 'Cómo crece la deuda.',
        headlineAccent: 'Mes a mes.',
        timeline: [
          { date: 'Mes 1', text: 'Decidís esperar. La competencia empieza.', status: 'neutral' },
          { date: 'Mes 3', text: 'Ellos tienen 3 meses de datos y ajustes sobre vos.', status: 'bad' },
          { date: 'Mes 6', text: 'Sus leads nocturnos van a ellos. Los tuyos, perdidos.', status: 'bad' },
          { date: 'Mes 12', text: 'Recuperar cuesta el doble. La brecha es visible.', status: 'bad' },
        ],
        slideNumber: '03/05',
      }}
    />
    <Composition
      id="CAR-A6-4-Reframe"
      component={TipoA}
      durationInFrames={DUR}
      fps={FPS}
      width={W11}
      height={H11}
      defaultProps={{
        preheadline: 'Cambió la definición.',
        lines: [
          { text: 'No automatizar', color: 'white', size: 68 },
          { text: 'no es una decisión neutral.', color: 'white', size: 56, marginBottom: 40 },
          { text: 'Es elegir pagar', color: 'violet', size: 60, marginTop: 40 },
          { text: 'más tarde,', color: 'violet', size: 60 },
          { text: 'con intereses.', color: 'violet', size: 60 },
        ],
        slideNumber: '04/05',
        glowHigh: false,
      }}
    />
    <Composition
      id="CAR-A6-5-CTA"
      component={TipoA}
      durationInFrames={DUR}
      fps={FPS}
      width={W11}
      height={H11}
      defaultProps={{
        preheadline: 'Todavía estás a tiempo de saldarla.',
        lines: [
          { text: '3 semanas.', color: 'violet', size: 80 },
          { text: 'MAX operativo.', color: 'white', size: 56, marginTop: 16 },
          { text: 'La deuda, cancelada.', color: 'white', size: 56 },
        ],
        ctaLine: '→ Diagnóstico gratuito — 30 minutos',
        ctaColor: 'violet',
        slideNumber: '05/05',
        glowHigh: true,
      }}
    />

    {/* ── CAR-A7: "Las reglas cambiaron" — Paradigm Shift (5 slides) ── */}

    <Composition
      id="CAR-A7-1-Hook"
      component={TipoA}
      durationInFrames={DUR}
      fps={FPS}
      width={W11}
      height={H11}
      defaultProps={{
        lines: [
          { text: 'Las reglas', color: 'white', size: 80 },
          { text: 'cambiaron.', color: 'violet', size: 80, marginBottom: 32 },
          { text: 'No todos lo saben.', color: 'white', size: 44, marginTop: 32 },
          { text: 'Todavía.', color: 'muted', size: 44 },
        ],
        ctaLine: 'Deslizá →',
        ctaColor: 'muted',
        slideNumber: '01/05',
        glowHigh: true,
      }}
    />
    <Composition
      id="CAR-A7-2-ReglasViejas"
      component={TipoA}
      durationInFrames={DUR}
      fps={FPS}
      width={W11}
      height={H11}
      defaultProps={{
        preheadline: 'Funcionaron 30 años. Ya no alcanzan.',
        lines: [{ text: 'Las reglas de antes:', color: 'muted', size: 20, weight: 600, marginBottom: 20 }],
        listItems: [
          { text: 'Más empleados = más capacidad', bullet: '—', color: 'gray' },
          { text: 'Más experiencia = más ventaja', bullet: '—', color: 'gray' },
          { text: 'Más capital = más crecimiento', bullet: '—', color: 'gray' },
        ],
        ctaLine: 'El mercado se aceleró. Esas reglas no escalan solas.',
        ctaColor: 'muted',
        slideNumber: '02/05',
      }}
    />
    <Composition
      id="CAR-A7-3-NuevaRegla"
      component={TipoA}
      durationInFrames={DUR}
      fps={FPS}
      width={W11}
      height={H11}
      defaultProps={{
        preheadline: 'La nueva regla es una sola.',
        lines: [
          { text: 'Velocidad.', color: 'violet', size: 100, marginBottom: 32 },
          { text: 'Velocidad de respuesta.', color: 'white', size: 36, weight: 700, marginTop: 32 },
          { text: 'Velocidad de proceso.', color: 'white', size: 36, weight: 700 },
          { text: 'Velocidad de decisión.', color: 'white', size: 36, weight: 700 },
        ],
        ctaLine: 'La velocidad la da la IA. No el esfuerzo.',
        ctaColor: 'muted',
        slideNumber: '03/05',
      }}
    />
    <Composition
      id="CAR-A7-4-QuienesPierden"
      component={TipoA}
      durationInFrames={DUR}
      fps={FPS}
      width={W11}
      height={H11}
      defaultProps={{
        preheadline: 'Lo que le pasa al que no lo ve.',
        lines: [
          { text: 'Sigue siendo bueno.', color: 'white', size: 52 },
          { text: 'Sigue trabajando duro.', color: 'white', size: 52, marginBottom: 36 },
          { text: 'Y pierde igual,', color: 'violet', size: 52, marginTop: 36 },
          { text: 'porque el juego cambió', color: 'violet', size: 52 },
          { text: 'y él no.', color: 'muted', size: 52 },
        ],
        slideNumber: '04/05',
      }}
    />
    <Composition
      id="CAR-A7-5-CTA"
      component={TipoA}
      durationInFrames={DUR}
      fps={FPS}
      width={W11}
      height={H11}
      defaultProps={{
        preheadline: 'Cómo conseguir velocidad.',
        lines: [
          { text: 'MAX responde en 4 segundos.', color: 'white', size: 48, marginBottom: 20 },
          { text: 'Tu equipo: en horas.', color: 'muted', size: 36, weight: 400 },
        ],
        listItems: [
          { text: 'Consultas, cotizaciones, seguimiento', bullet: '→', color: 'white' },
          { text: 'Sin depender de horario ni disponibilidad', bullet: '→', color: 'white' },
        ],
        ctaLine: '→ Diagnóstico gratuito — 30 minutos',
        ctaColor: 'violet',
        slideNumber: '05/05',
        glowHigh: true,
      }}
    />

    {/* ── CAR-A8: "Dos tipos de empresa" — In-group/Out-group (5 slides) ── */}

    <Composition
      id="CAR-A8-1-Hook"
      component={TipoA}
      durationInFrames={DUR}
      fps={FPS}
      width={W11}
      height={H11}
      defaultProps={{
        lines: [
          { text: 'Hay dos tipos', color: 'white', size: 76 },
          { text: 'de empresa.', color: 'white', size: 76, marginBottom: 36 },
          { text: '¿En cuál', color: 'violet', size: 60, marginTop: 36 },
          { text: 'estás vos?', color: 'violet', size: 60 },
        ],
        ctaLine: 'Deslizá →',
        ctaColor: 'muted',
        slideNumber: '01/05',
        glowHigh: true,
      }}
    />
    <Composition
      id="CAR-A8-2-SinSistema"
      component={TipoA}
      durationInFrames={DUR}
      fps={FPS}
      width={W11}
      height={H11}
      defaultProps={{
        preheadline: 'Empresa sin sistema. Su día a día.',
        lines: [{ text: 'Viven apagando incendios:', color: 'muted', size: 22, weight: 400, marginBottom: 20 }],
        listItems: [
          { text: 'Equipo respondiendo preguntas repetidas todo el día', bullet: '—', color: 'gray' },
          { text: 'Leads que se enfrían porque nadie los siguió', bullet: '—', color: 'gray' },
          { text: 'Reportes que alguien arma cada lunes', bullet: '—', color: 'gray' },
          { text: 'Todo depende de que alguien recuerde hacerlo', bullet: '—', color: 'gray' },
        ],
        ctaLine: 'El equipo trabaja duro. El sistema no les da velocidad.',
        ctaColor: 'muted',
        slideNumber: '02/05',
      }}
    />
    <Composition
      id="CAR-A8-3-ConSistema"
      component={TipoA}
      durationInFrames={DUR}
      fps={FPS}
      width={W11}
      height={H11}
      defaultProps={{
        preheadline: 'Empresa con sistema. Su día a día.',
        lines: [{ text: 'Se dedican a lo que importa:', color: 'white', size: 22, weight: 600, marginBottom: 20 }],
        listItems: [
          { text: 'MAX responde consultas las 24 horas', bullet: '✓', color: 'green' },
          { text: 'Leads seguidos automáticamente hasta el cierre', bullet: '✓', color: 'green' },
          { text: 'Reporte cada lunes sin que nadie lo arme', bullet: '✓', color: 'green' },
          { text: 'El equipo construye, no apaga incendios', bullet: '✓', color: 'violet' },
        ],
        ctaLine: 'Mismo mercado. Resultados distintos.',
        ctaColor: 'muted',
        slideNumber: '03/05',
      }}
    />
    <Composition
      id="CAR-A8-4-En12Meses"
      component={ContrastSlide}
      durationInFrames={DUR}
      fps={FPS}
      width={W11}
      height={H11}
      defaultProps={{
        headline: 'La diferencia en 12 meses.',
        leftBlock: {
          label: 'SIN SISTEMA',
          value: 'Igual',
          sublabel: 'Mismos procesos. Más cansancio.',
          color: 'gray',
        },
        rightBlock: {
          label: 'CON SISTEMA',
          value: '3x',
          sublabel: 'Más leads. Más tiempo. Menos errores.',
          color: 'violet',
        },
        footer: 'La brecha crece cada mes que esperás.',
        footerColor: 'white',
        slideNumber: '04/05',
      }}
    />
    <Composition
      id="CAR-A8-5-CTA"
      component={TipoA}
      durationInFrames={DUR}
      fps={FPS}
      width={W11}
      height={H11}
      defaultProps={{
        preheadline: 'La puerta sigue abierta.',
        lines: [
          { text: 'El grupo con sistema', color: 'white', size: 56 },
          { text: 'todavía acepta', color: 'white', size: 56 },
          { text: 'nuevos miembros.', color: 'violet', size: 56, marginBottom: 36 },
          { text: 'Por ahora.', color: 'muted', size: 36, weight: 400, marginTop: 36 },
        ],
        ctaLine: '→ Diagnóstico gratuito — 30 minutos',
        ctaColor: 'violet',
        slideNumber: '05/05',
        glowHigh: true,
      }}
    />

    {/* ── CAR-K1: "Qué comprás de verdad" — JTBD profundo (5 slides) ── */}

    <Composition
      id="CAR-K1-1-Hook"
      component={TipoA}
      durationInFrames={DUR}
      fps={FPS}
      width={W11}
      height={H11}
      defaultProps={{
        lines: [
          { text: 'Cuando implementás IA,', color: 'white', size: 52 },
          { text: '¿qué comprás', color: 'white', size: 64, marginBottom: 20 },
          { text: 'realmente?', color: 'violet', size: 80, marginTop: 20 },
        ],
        ctaLine: 'Deslizá →',
        ctaColor: 'muted',
        slideNumber: '01/05',
        glowHigh: true,
      }}
    />
    <Composition
      id="CAR-K1-2-NoEsTecno"
      component={TipoA}
      durationInFrames={DUR}
      fps={FPS}
      width={W11}
      height={H11}
      defaultProps={{
        lines: [
          { text: 'No comprás', color: 'muted', size: 36, weight: 600 },
          { text: 'un chatbot.', color: 'white', size: 72, marginBottom: 36 },
          { text: 'No comprás', color: 'muted', size: 36, weight: 600, marginTop: 36 },
          { text: 'tecnología.', color: 'white', size: 72 },
        ],
        ctaLine: 'Comprás algo más profundo que eso.',
        ctaColor: 'muted',
        slideNumber: '02/05',
      }}
    />
    <Composition
      id="CAR-K1-3-Compras"
      component={TipoA}
      durationInFrames={DUR}
      fps={FPS}
      width={W11}
      height={H11}
      defaultProps={{
        preheadline: 'Lo que realmente estás comprando.',
        lines: [{ text: 'Comprás:', color: 'white', size: 44, marginBottom: 24 }],
        listItems: [
          { text: 'Control — tu negocio corre aunque vos no estés', bullet: '→', color: 'white' },
          { text: 'Tiempo — de vuelta en tu agenda', bullet: '→', color: 'white' },
          { text: 'Certeza — que ningún lead se pierde en silencio', bullet: '→', color: 'white' },
          { text: 'Dormir tranquilo.', bullet: '→', color: 'violet' },
        ],
        slideNumber: '03/05',
      }}
    />
    <Composition
      id="CAR-K1-4-LoQueSignifica"
      component={TipoA}
      durationInFrames={DUR}
      fps={FPS}
      width={W11}
      height={H11}
      defaultProps={{
        preheadline: 'Lo que significa en la práctica.',
        lines: [
          { text: 'Tu empresa atiende a las 3 AM.', color: 'white', size: 48 },
          { text: 'Vos no.', color: 'violet', size: 48, marginBottom: 40 },
          { text: 'Tu empresa hace seguimiento de cada lead.', color: 'white', size: 36, weight: 600, marginTop: 40 },
          { text: 'Vos no tenés que recordarlo.', color: 'gray', size: 36, weight: 400 },
        ],
        slideNumber: '04/05',
      }}
    />
    <Composition
      id="CAR-K1-5-CTA"
      component={TipoA}
      durationInFrames={DUR}
      fps={FPS}
      width={W11}
      height={H11}
      defaultProps={{
        lines: [
          { text: 'MAX trabaja.', color: 'white', size: 72 },
          { text: 'Vos construís.', color: 'violet', size: 72, marginBottom: 40 },
          { text: 'Eso es lo que comprás.', color: 'muted', size: 28, weight: 400, marginTop: 40 },
        ],
        ctaLine: '→ Diagnóstico gratuito — 30 minutos',
        ctaColor: 'violet',
        slideNumber: '05/05',
        glowHigh: true,
      }}
    />

    {/* ── CAR-K2: "Los números que no ves" — Blind Spot (5 slides) ── */}

    <Composition
      id="CAR-K2-1-Hook"
      component={TipoA}
      durationInFrames={DUR}
      fps={FPS}
      width={W11}
      height={H11}
      defaultProps={{
        lines: [
          { text: 'Tu empresa tiene', color: 'white', size: 56 },
          { text: 'un problema', color: 'white', size: 56 },
          { text: 'que no podés ver.', color: 'violet', size: 60, marginBottom: 28 },
          { text: 'Todavía.', color: 'muted', size: 36, weight: 400, marginTop: 28 },
        ],
        ctaLine: 'Deslizá →',
        ctaColor: 'muted',
        slideNumber: '01/05',
        glowHigh: true,
      }}
    />
    <Composition
      id="CAR-K2-2-ElBlindSpot"
      component={TipoA}
      durationInFrames={DUR}
      fps={FPS}
      width={W11}
      height={H11}
      defaultProps={{
        preheadline: 'Lo que pasa cuando no estás mirando.',
        lines: [{ text: 'Cada noche, cada fin de semana:', color: 'muted', size: 22, weight: 400, marginBottom: 20 }],
        listItems: [
          { text: 'Leads que llegan y no reciben respuesta', bullet: '→', color: 'white' },
          { text: 'Preguntas que quedan sin contestar hasta el lunes', bullet: '→', color: 'white' },
          { text: 'Clientes que eligen a otro porque respondió primero', bullet: '→', color: 'white' },
          { text: 'Sin registro. Sin número. Sin que nadie lo sepa.', bullet: '→', color: 'violet' },
        ],
        slideNumber: '02/05',
      }}
    />
    <Composition
      id="CAR-K2-3-ElNumero"
      component={TipoA}
      durationInFrames={DUR}
      fps={FPS}
      width={W11}
      height={H11}
      defaultProps={{
        preheadline: 'El número que no está en ningún reporte.',
        numberBlock: {
          value: '47h',
          label: 'PROMEDIO QUE TARDA UNA EMPRESA EN RESPONDER UN LEAD',
          color: 'violet',
          size: 100,
        },
        divider: true,
        lines: [
          { text: 'El 78% de los clientes elige al primero que responde.', color: 'white', size: 20, weight: 400, lineHeight: 1.6 },
          { text: 'MAX responde en 4 segundos.', color: 'violet', size: 20, weight: 600, lineHeight: 1.6 },
        ],
        slideNumber: '03/05',
      }}
    />
    <Composition
      id="CAR-K2-4-VerVsNoVer"
      component={ContrastSlide}
      durationInFrames={DUR}
      fps={FPS}
      width={W11}
      height={H11}
      defaultProps={{
        headline: 'La diferencia entre ver y no ver.',
        leftBlock: {
          label: 'SIN MAX',
          value: '?',
          sublabel: 'No sabés cuántos leads llegaron anoche.',
          color: 'gray',
        },
        rightBlock: {
          label: 'CON MAX',
          value: '100%',
          sublabel: 'Cada consulta registrada. Ninguna perdida.',
          color: 'violet',
        },
        footer: 'Ver es poder actuar.',
        footerColor: 'white',
        slideNumber: '04/05',
      }}
    />
    <Composition
      id="CAR-K2-5-CTA"
      component={TipoA}
      durationInFrames={DUR}
      fps={FPS}
      width={W11}
      height={H11}
      defaultProps={{
        preheadline: 'Lo que Max registra esta noche.',
        lines: [
          { text: 'Cada consulta.', color: 'white', size: 60 },
          { text: 'Cada lead.', color: 'white', size: 60 },
          { text: 'Cada oportunidad.', color: 'violet', size: 60, marginBottom: 36 },
          { text: 'Llegó o se perdió — vas a saberlo.', color: 'muted', size: 24, weight: 400, marginTop: 36 },
        ],
        ctaLine: '→ Diagnóstico gratuito — 30 minutos',
        ctaColor: 'violet',
        slideNumber: '05/05',
        glowHigh: true,
      }}
    />

    {/* ── CAR-K3: "Legado que perdura" — Legacy thinking (5 slides) ── */}

    <Composition
      id="CAR-K3-1-Hook"
      component={TipoA}
      durationInFrames={DUR}
      fps={FPS}
      width={W11}
      height={H11}
      defaultProps={{
        lines: [
          { text: 'Construiste algo real.', color: 'white', size: 60 },
          { text: 'Ahora viene', color: 'white', size: 56, marginBottom: 24 },
          { text: 'la parte más', color: 'violet', size: 68, marginTop: 24 },
          { text: 'importante.', color: 'violet', size: 68 },
        ],
        ctaLine: 'Deslizá →',
        ctaColor: 'muted',
        slideNumber: '01/05',
        glowHigh: true,
      }}
    />
    <Composition
      id="CAR-K3-2-QuetienenEnComun"
      component={TipoA}
      durationInFrames={DUR}
      fps={FPS}
      width={W11}
      height={H11}
      defaultProps={{
        preheadline: 'Qué tienen en común las que duran.',
        lines: [{ text: 'Las empresas que sobreviven 30+ años:', color: 'white', size: 28, weight: 600, marginBottom: 24 }],
        listItems: [
          { text: 'Evolucionan sin perder lo que las hace únicas', bullet: '✓', color: 'white' },
          { text: 'Adoptan las herramientas de cada época', bullet: '✓', color: 'white' },
          { text: 'No esperan que sea urgente para actuar', bullet: '✓', color: 'white' },
          { text: 'Amplían, no reemplazan, lo que construyeron', bullet: '✓', color: 'violet' },
        ],
        slideNumber: '02/05',
      }}
    />
    <Composition
      id="CAR-K3-3-ElRiesgo"
      component={TipoA}
      durationInFrames={DUR}
      fps={FPS}
      width={W11}
      height={H11}
      defaultProps={{
        preheadline: 'El riesgo que pocos nombran.',
        lines: [
          { text: 'No es fracasar.', color: 'white', size: 60 },
          { text: 'Es volverse', color: 'white', size: 60, marginBottom: 32 },
          { text: 'irrelevante', color: 'violet', size: 72, marginTop: 32 },
          { text: 'de a poco.', color: 'violet', size: 72 },
        ],
        ctaLine: 'Sin que nadie lo diga en voz alta.',
        ctaColor: 'muted',
        slideNumber: '03/05',
      }}
    />
    <Composition
      id="CAR-K3-4-Amplificar"
      component={TipoA}
      durationInFrames={DUR}
      fps={FPS}
      width={W11}
      height={H11}
      defaultProps={{
        preheadline: 'Amplificar, no reemplazar.',
        lines: [
          { text: 'Tu conocimiento del sector.', color: 'white', size: 40, weight: 700 },
          { text: 'Tus relaciones de 20 años.', color: 'white', size: 40, weight: 700 },
          { text: 'Tu reputación construida.', color: 'white', size: 40, weight: 700, marginBottom: 36 },
          { text: '+ velocidad de la IA', color: 'violet', size: 48, weight: 800, marginTop: 36 },
          { text: '= ventaja que no se copia rápido.', color: 'white', size: 36, weight: 600 },
        ],
        slideNumber: '04/05',
      }}
    />
    <Composition
      id="CAR-K3-5-CTA"
      component={TipoA}
      durationInFrames={DUR}
      fps={FPS}
      width={W11}
      height={H11}
      defaultProps={{
        preheadline: 'Las que van a durar ya empezaron.',
        lines: [
          { text: 'La pregunta es', color: 'white', size: 56 },
          { text: 'cuándo lo hacés', color: 'white', size: 56 },
          { text: 'vos.', color: 'violet', size: 80, marginBottom: 36 },
          { text: 'Hoy es mejor que mañana.', color: 'muted', size: 24, weight: 400, marginTop: 36 },
        ],
        ctaLine: '→ Diagnóstico gratuito — 30 minutos',
        ctaColor: 'violet',
        slideNumber: '05/05',
        glowHigh: true,
      }}
    />

    {/* ── CAR-E2: "El costo del silencio" — Anchoring (5 slides) ── */}

    <Composition
      id="CAR-E2-1-Hook"
      component={TipoA}
      durationInFrames={DUR}
      fps={FPS}
      width={W11}
      height={H11}
      defaultProps={{
        lines: [
          { text: 'Tu empresa', color: 'white', size: 68 },
          { text: 'cierra a las 6PM.', color: 'white', size: 68, marginBottom: 32 },
          { text: 'Los leads, no.', color: 'violet', size: 68, marginTop: 32 },
        ],
        ctaLine: 'Deslizá →',
        ctaColor: 'muted',
        slideNumber: '01/05',
        glowHigh: true,
      }}
    />
    <Composition
      id="CAR-E2-2-ElHorario"
      component={TipoA}
      durationInFrames={DUR}
      fps={FPS}
      width={W11}
      height={H11}
      defaultProps={{
        preheadline: 'El horario real de tu empresa.',
        numberBlock: {
          value: '13hs',
          label: 'DE SILENCIO CADA DÍA',
          sublabel: '6PM → 9AM — SIN RESPUESTA, SIN COBERTURA',
          color: 'violet',
          size: 100,
        },
        divider: true,
        lines: [
          { text: '× 365 días = 4.745 horas al año', color: 'white', size: 22, weight: 600, lineHeight: 1.6 },
          { text: 'en que tu empresa no existe para el cliente.', color: 'gray', size: 20, weight: 400, lineHeight: 1.6 },
        ],
        slideNumber: '02/05',
      }}
    />
    <Composition
      id="CAR-E2-3-LoQuePasa"
      component={TipoC}
      durationInFrames={DUR}
      fps={FPS}
      width={W11}
      height={H11}
      defaultProps={{
        headline: 'Lo que pasa en esas 13 horas.',
        headlineAccent: 'Sin MAX.',
        timeline: [
          { date: '8 PM', text: 'Cliente pregunta precio. Nadie responde.', status: 'bad' },
          { date: '11 PM', text: 'Decide buscar otra opción. Encuentra a tu competencia.', status: 'bad' },
          { date: '11:04 PM', text: 'Tu competencia (con MAX) responde en 4 segundos.', status: 'good' },
          { date: '9 AM', text: 'Vos llegás a la oficina. El cliente ya eligió.', status: 'bad' },
        ],
        slideNumber: '03/05',
      }}
    />
    <Composition
      id="CAR-E2-4-ConMax"
      component={TipoA}
      durationInFrames={DUR}
      fps={FPS}
      width={W11}
      height={H11}
      defaultProps={{
        preheadline: 'Las mismas 13 horas con MAX.',
        lines: [{ text: 'MAX responde en 4 segundos.', color: 'violet', size: 48, marginBottom: 24 }],
        listItems: [
          { text: 'Precios, disponibilidad, cotizaciones — automático', bullet: '✓', color: 'white' },
          { text: 'Lead cualificado y seguido desde el primer mensaje', bullet: '✓', color: 'white' },
          { text: 'Reunión agendada antes de que salga el sol', bullet: '✓', color: 'white' },
          { text: 'Vos te enterás el lunes con todo listo', bullet: '✓', color: 'violet' },
        ],
        slideNumber: '04/05',
      }}
    />
    <Composition
      id="CAR-E2-5-CTA"
      component={TipoA}
      durationInFrames={DUR}
      fps={FPS}
      width={W11}
      height={H11}
      defaultProps={{
        preheadline: 'El número que estás regalando.',
        lines: [
          { text: '4.745 horas', color: 'violet', size: 72 },
          { text: 'al año', color: 'white', size: 52, marginBottom: 32 },
          { text: 'sin cobertura.', color: 'white', size: 52, marginTop: 32 },
        ],
        ctaLine: '→ MAX las cubre todas — Diagnóstico gratuito',
        ctaColor: 'violet',
        slideNumber: '05/05',
        glowHigh: true,
      }}
    />

    {/* ── CAR-A9: "30 años multiplicados" — Amplification (5 slides) ── */}

    <Composition
      id="CAR-A9-1-Hook"
      component={TipoA}
      durationInFrames={DUR}
      fps={FPS}
      width={W11}
      height={H11}
      defaultProps={{
        lines: [
          { text: '30 años', color: 'violet', size: 88 },
          { text: 'de negocio.', color: 'white', size: 64, marginBottom: 24 },
          { text: 'Un sistema que', color: 'white', size: 48, marginTop: 24 },
          { text: 'los multiplica.', color: 'white', size: 48 },
        ],
        ctaLine: 'Deslizá →',
        ctaColor: 'muted',
        slideNumber: '01/05',
        glowHigh: true,
      }}
    />
    <Composition
      id="CAR-A9-2-ElActivo"
      component={TipoA}
      durationInFrames={DUR}
      fps={FPS}
      width={W11}
      height={H11}
      defaultProps={{
        preheadline: 'El activo más valioso que tenés.',
        lines: [{ text: 'Lo que construiste:', color: 'white', size: 36, weight: 600, marginBottom: 24 }],
        listItems: [
          { text: 'Conocimiento profundo de tu sector', bullet: '→', color: 'white' },
          { text: 'Relaciones de confianza que llevan años', bullet: '→', color: 'white' },
          { text: 'Reputación que no se copia', bullet: '→', color: 'white' },
          { text: 'Procesos que funcionan', bullet: '→', color: 'violet' },
        ],
        ctaLine: 'Eso es lo que MAX amplifica. No reemplaza.',
        ctaColor: 'muted',
        slideNumber: '02/05',
      }}
    />
    <Composition
      id="CAR-A9-3-ElProblema"
      component={TipoA}
      durationInFrames={DUR}
      fps={FPS}
      width={W11}
      height={H11}
      defaultProps={{
        preheadline: 'El único problema.',
        lines: [
          { text: 'Lo que construiste', color: 'white', size: 56 },
          { text: 'no escala solo.', color: 'violet', size: 60, marginBottom: 36 },
          { text: 'Necesita de vos', color: 'white', size: 44, weight: 600, marginTop: 36 },
          { text: 'para cada cosa.', color: 'white', size: 44, weight: 600 },
          { text: 'Eso tiene un límite.', color: 'muted', size: 36, weight: 400, marginTop: 16 },
        ],
        slideNumber: '03/05',
      }}
    />
    <Composition
      id="CAR-A9-4-LaFormula"
      component={TipoA}
      durationInFrames={DUR}
      fps={FPS}
      width={W11}
      height={H11}
      defaultProps={{
        preheadline: 'La fórmula que cambia todo.',
        lines: [
          { text: 'Tu experiencia', color: 'white', size: 44, weight: 700 },
          { text: '+ velocidad de MAX', color: 'violet', size: 44, weight: 800 },
          { text: '= ventaja que nadie', color: 'white', size: 44, weight: 700, marginTop: 20 },
          { text: 'puede copiar rápido.', color: 'white', size: 44, weight: 700 },
        ],
        ctaLine: 'Tus 30 años, con la velocidad de la IA.',
        ctaColor: 'muted',
        slideNumber: '04/05',
      }}
    />
    <Composition
      id="CAR-A9-5-CTA"
      component={TipoA}
      durationInFrames={DUR}
      fps={FPS}
      width={W11}
      height={H11}
      defaultProps={{
        preheadline: 'Lo que construiste, ahora puede crecer solo.',
        lines: [
          { text: 'Sin depender', color: 'white', size: 64 },
          { text: 'de que vos', color: 'white', size: 64 },
          { text: 'estés presente', color: 'violet', size: 64 },
          { text: 'en todo.', color: 'violet', size: 64 },
        ],
        ctaLine: '→ Diagnóstico gratuito — 30 minutos',
        ctaColor: 'violet',
        slideNumber: '05/05',
        glowHigh: true,
      }}
    />

    {/* ── CAR-B2: "365 noches" — Compounding (5 slides) ── */}

    <Composition
      id="CAR-B2-1-Hook"
      component={TipoA}
      durationInFrames={DUR}
      fps={FPS}
      width={W11}
      height={H11}
      defaultProps={{
        lines: [
          { text: '03:47 AM.', color: 'violet', size: 88 },
          { text: 'Un lead llegó.', color: 'white', size: 56, marginBottom: 24 },
          { text: '¿Quién lo atendió?', color: 'white', size: 56, marginTop: 24 },
        ],
        ctaLine: 'Deslizá →',
        ctaColor: 'muted',
        slideNumber: '01/05',
        glowHigh: true,
      }}
    />
    <Composition
      id="CAR-B2-2-SinMax"
      component={TipoC}
      durationInFrames={DUR}
      fps={FPS}
      width={W11}
      height={H11}
      defaultProps={{
        headline: 'Sin MAX. Lo que pasó.',
        timeline: [
          { date: '11:00 PM', text: 'Cliente pregunta disponibilidad y precio.', status: 'neutral' },
          { date: '11:01 PM', text: 'Silencio. Nadie responde.', status: 'bad' },
          { date: '11:05 PM', text: 'Busca alternativas. Encuentra a tu competencia.', status: 'bad' },
          { date: '11:09 PM', text: 'Tu competencia responde. En 4 segundos.', status: 'good' },
          { date: '9:00 AM', text: 'Vos llegás. El lead ya reservó con otro.', status: 'bad' },
        ],
        slideNumber: '02/05',
      }}
    />
    <Composition
      id="CAR-B2-3-ConMax"
      component={TipoC}
      durationInFrames={DUR}
      fps={FPS}
      width={W11}
      height={H11}
      defaultProps={{
        headline: 'Con MAX. La misma noche.',
        timeline: [
          { date: '11:00 PM', text: 'Cliente pregunta disponibilidad y precio.', status: 'neutral' },
          { date: '11:00:04', text: 'MAX responde con precios y disponibilidad real.', status: 'good' },
          { date: '11:02 PM', text: 'Cliente confirma. MAX procesa y agenda.', status: 'good' },
          { date: '11:04 PM', text: 'Reunión en tu calendario. Lead capturado.', status: 'good' },
          { date: '9:00 AM', text: 'Vos llegás con 2 reuniones agendadas de anoche.', status: 'good' },
        ],
        slideNumber: '03/05',
      }}
    />
    <Composition
      id="CAR-B2-4-ElEfecto"
      component={TipoA}
      durationInFrames={DUR}
      fps={FPS}
      width={W11}
      height={H11}
      defaultProps={{
        preheadline: 'El efecto compuesto de 365 noches.',
        numberBlock: {
          value: '365',
          label: 'NOCHES AL AÑO QUE TU EMPRESA NO CIERRA',
          sublabel: 'CON MAX ACTIVO',
          color: 'violet',
          size: 100,
        },
        divider: true,
        lines: [
          { text: 'Cada noche sin MAX = leads que se pierden.', color: 'white', size: 20, weight: 400, lineHeight: 1.6 },
          { text: 'Cada noche con MAX = oportunidades capturadas.', color: 'violet', size: 20, weight: 600, lineHeight: 1.6 },
        ],
        slideNumber: '04/05',
      }}
    />
    <Composition
      id="CAR-B2-5-CTA"
      component={TipoA}
      durationInFrames={DUR}
      fps={FPS}
      width={W11}
      height={H11}
      defaultProps={{
        preheadline: 'Esta noche, MAX puede estar activo.',
        lines: [
          { text: 'Mientras dormís,', color: 'white', size: 56 },
          { text: 'tu negocio', color: 'white', size: 56 },
          { text: 'sigue abierto.', color: 'violet', size: 68, marginBottom: 36 },
          { text: 'Las 24 horas. Los 365 días.', color: 'muted', size: 24, weight: 400, marginTop: 36 },
        ],
        ctaLine: '→ Diagnóstico gratuito — 30 minutos',
        ctaColor: 'violet',
        slideNumber: '05/05',
        glowHigh: true,
      }}
    />

    {/* ════════════════════════════════════════
        SISTEMA DOC — estilo "The Conversion Doc" (negro + line-art + voz grave)
        Guion primero. Video #1: MAX responde al instante (palanca velocidad/24-7).
    ════════════════════════════════════════ */}
    <Composition
      id="Doc-MAX-Responde"
      component={DocReel}
      durationInFrames={690}
      fps={FPS}
      width={1080}
      height={1920}
      defaultProps={{
        label: 'CONCEPTO DEVELOPMENT',
        cta: 'conceptodevelopment.com',
        voiceSrc: undefined,
        beats: [
          {
            from: 0, dur: 75, visual: { kind: 'clock' as const },
            caption: [{ t: 'Son' }, { t: 'las' }, { t: '2', hl: true }, { t: 'de' }, { t: 'la' }, { t: 'mañana.' }],
          },
          {
            from: 75, dur: 75, visual: { kind: 'message' as const },
            caption: [{ t: 'Un' }, { t: 'cliente' }, { t: 'acaba' }, { t: 'de' }, { t: 'escribirte.', hl: true }],
          },
          {
            from: 150, dur: 75,
            caption: [{ t: 'Vos' }, { t: 'estás' }, { t: 'durmiendo.', dim: true }],
          },
          {
            from: 225, dur: 95, visual: { kind: 'door' as const },
            caption: [{ t: 'Cuando' }, { t: 'te' }, { t: 'despertás,' }, { t: 'ya' }, { t: 'se', hl: true }, { t: 'fue', hl: true }, { t: 'con' }, { t: 'otro.' }],
          },
          {
            from: 320, dur: 90, visual: { kind: 'burst' as const }, drawIn: 30,
            caption: [{ t: 'El' }, { t: 'que' }, { t: 'responde' }, { t: 'primero,', hl: true }, { t: 'gana.' }],
          },
          {
            from: 410, dur: 110, visual: { kind: 'seconds' as const, value: 3, max: 3 }, drawIn: 70,
            caption: [{ t: 'MAX' }, { t: 'responde' }, { t: 'en' }, { t: '3', hl: true }, { t: 'segundos.', hl: true }],
          },
          {
            from: 520, dur: 90, visual: { kind: 'burst' as const }, drawIn: 20,
            caption: [{ t: 'De' }, { t: 'día.' }, { t: 'De' }, { t: 'noche.' }, { t: 'Mientras', hl: true }, { t: 'dormís.', hl: true }],
          },
          {
            from: 610, dur: 80, visual: { kind: 'diamond' as const }, drawIn: 30,
            caption: [{ t: 'Tu' }, { t: 'competencia' }, { t: 'ya' }, { t: 'lo' }, { t: 'tiene.' }, { t: '¿Y', hl: true }, { t: 'vos?', hl: true }],
          },
        ],
      }}
    />

    {/* ════════════════════════════════════════
        SISTEMA PREMIUM — estilo Google Health/Apple (aurora + tipografía kinética)
        Video #2: "La pérdida silenciosa" (loss aversion afilado, presencia vs ausencia).
    ════════════════════════════════════════ */}
    <Composition
      id="Premium-PerdidaSilenciosa"
      component={PremiumReel}
      durationInFrames={696}
      fps={FPS}
      width={1080}
      height={1920}
      defaultProps={{
        label: 'CONCEPTO DEVELOPMENT',
        cta: 'conceptodevelopment.com',
        voiceSrc: undefined,
        beats: [
          { from: 0, dur: 70, size: 104, words: [{ t: 'Ninguna' }, { t: 'venta', br: true }, { t: 'se' }, { t: 'pierde' }, { t: 'de' }, { t: 'golpe.' }] },
          { from: 70, dur: 70, size: 122, words: [{ t: 'Se' }, { t: 'pierde', br: true }, { t: 'en' }, { t: 'silencio.', hl: true }] },
          { from: 140, dur: 66, size: 96, words: [{ t: 'En' }, { t: 'el' }, { t: 'mensaje', br: true }, { t: 'que' }, { t: 'no' }, { t: 'viste.', enter: 'blur' as const }] },
          { from: 206, dur: 66, size: 96, words: [{ t: 'En' }, { t: 'la' }, { t: 'respuesta', br: true }, { t: 'que' }, { t: 'llegó' }, { t: 'tarde.', hl: true }] },
          { from: 272, dur: 60, size: 112, words: [{ t: 'Tu' }, { t: 'cliente', br: true }, { t: 'no' }, { t: 'avisa.' }] },
          { from: 332, dur: 74, size: 132, rule: true, words: [{ t: 'Simplemente', br: true }, { t: 'se' }, { t: 'va.', hl: true }] },
          { from: 406, dur: 64, size: 104, words: [{ t: 'MAX' }, { t: 'no' }, { t: 'se' }, { t: 'distrae.' }] },
          { from: 470, dur: 60, size: 104, words: [{ t: 'No' }, { t: 'se' }, { t: 'cansa.', br: true }, { t: 'No' }, { t: 'duerme.' }] },
          { from: 530, dur: 82, size: 248, words: [{ t: 'Está.', hl: true }] },
          { from: 612, dur: 84, size: 100, words: [{ t: 'Siempre' }, { t: 'que', br: true }, { t: 'te' }, { t: 'necesitan.', hl: true }] },
        ],
      }}
    />

  </>
);
