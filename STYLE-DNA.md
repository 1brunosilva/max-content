# STYLE-DNA — el estilo de video de Concepto (no es una plantilla, son los principios)

> Objetivo de Bruno: poder crear videos **nuevos y distintos todos los días** (3-4/día)
> sin recaer en la misma plantilla. Esto define el ESTILO; cada video recombina:
> **tema psicológico + UN mecanismo + este ADN.** Implementado en `src/apple/kit.tsx`.
> Regla dura: ver memoria `feedback-video-no-mismo-estilo`.

## Norte (brief Bruno, 2026-06-16)
Que cada escena parezca **una foto de una marca de lujo cobrando vida**. Mezcla de
**Apple + arquitectura contemporánea + editorial premium + motion moderno**. Elegancia,
claridad y sofisticación **por encima del impacto fácil**. Objetos reales como
protagonistas (mensajes, tarjetas, productos, interfaces, documentos, números) vueltos
experiencia premium. Espacios amplios, composición limpia, materiales refinados,
profundidad cinematográfica, movimiento controlado. La tecnología, integrada y natural.

## El ADN (9 principios)
1. Elementos en **espacio 3D real** (profundidad, perspectiva, rotación, parallax). Cards planas movidas en 3D.
2. **Un héroe por vez**, grande, con aire. Nunca "texto al costado + card".
3. **Física con peso (Apple):** entra rápido, **desacelera fuerte y se asienta** (micro-overshoot). Nunca 100% quieto (drift sutil).
4. **Un momento de foco** con luz refinada (no neón). La luz dice "esto importa".
5. **Transiciones espaciales** (zoom adentro, push, órbita), **nunca corte duro**.
6. **Cards glassy con contenido REAL** = el vocabulario (los sustantivos).
7. **Base oscura cinematográfica**, acento controlado. Variar el fondo por mecanismo. NUNCA el gradiente violeta plano de siempre.
8. **Historia psicológica:** gancho (algo que reconocen/sienten) → tensión → reencuadre → payoff. El mecanismo sirve a la historia.
9. **Variedad = recombinar:** un **mecanismo distinto** por video + tema distinto.

## Reglas de movimiento (Apple HIG + Google Material 3 — verificado)
- **Duración:** 200–400ms la mayoría de transiciones (rango 100–500). Más que eso = pesado.
- **Easing:** curva de **desaceleración** (frena al final), no easeInOut default. Material lo llama **"emphasized"** = más énfasis al final; con duración un poco más larga para momentos destacados.
- **Física/springs** (Material 3 ya migró a física): usar springs con overshoot leve para el "asentarse" (`useSettle` en el kit).
- **Coreografía:** entradas **escalonadas** (stagger 4-6 frames), coordinadas, no todo junto.
- **Conciencia espacial:** capas que se apilan/deslizan/profundizan como en el mundo real.
- **Sin movimiento decorativo:** cada animación comunica un cambio; si no, sobra (HIG).

## ⏱️ LEGIBILIDAD Y TIEMPO DE LECTURA (regla de Bruno, obligatoria)
- **Apenitas más lento, SIEMPRE (Bruno, regla firme):** errar del lado de que se entienda. Mejor un toque lento que apurado. Truco de implementación: **time-scale global** por composición — `const f = useCurrentFrame() / SLOW` con `SLOW≈1.15` y escalar `durationInFrames` por el mismo factor → todo ~15% más lento con un solo cambio.
- **Dar tiempo a leer:** si hay texto, que se lea sin apuro. El **payoff/cierre SIEMPRE con buen hold (~3–3.5s visible)**. Regla práctica: poder leer la frase en voz alta ~2 veces antes del corte.

### 🔠 LETRAS GRANDES — piso duro (regla de Bruno, ICP adulto 40–60 que ve poco)
Pensá SIEMPRE en un adulto que ve mal. **Ante la duda, agrandá.** Pisos mínimos en canvas 1080×1920:
| Rol | Mínimo | Recomendado |
|-----|--------|-------------|
| Labels / notas al pie (DM Mono) | **40px** | 44–52px |
| Cuerpo / texto de card | **52px** | 56–72px |
| Headline / payoff | **88px** | 96–120px |
Nada de letra chica nunca. Buen contraste (texto claro sobre base oscura). Una idea por pantalla, no párrafos.

### 🟩 ZONA SEGURA — nada clave fuera de acá (1080×1920)
La plataforma tapa bordes con su UI (likes, comentarios, caption, botones, barra). Para que el mismo video sirva en TikTok + Reels + Shorts, **todo el texto/elemento clave va dentro de la zona segura** (tomamos el caso más restrictivo, Reels, con margen):
- **TOP 220px · BOTTOM 420px · IZQUIERDA 90px · DERECHA 130px** (la derecha un poco más por el stack de íconos).
- Área útil ≈ **x: 90–950, y: 220–1500**. El error más común: texto pegado al borde derecho o muy abajo → lo tapan.
- Verificar con el helper **`SafeArea`** del kit (overlay visible solo en preview/dev). Fuente: `research/FORMATO-VERTICAL.md`. ⚠️ los píxeles cambian si las apps actualizan su UI.

### 🎬 LA ANIMACIÓN ES LA PROTAGONISTA (no el texto)
Lo principal es el **movimiento/mecanismo**; el texto **acompaña y nombra**, no al revés. Si sacás la animación y el video sigue "entendiéndose" como una placa con texto → está mal: era una infografía, no un experimento. El espectador primero VIVE el efecto (animación), después lee el payoff.

## Tendencias 2026 a usar (verificado)
- **Tipografía cinética** con variable fonts (peso/ancho que muta) — contraste de peso extremo.
- **3D premium hiperrealista** para lanzamientos/tech storytelling.
- **Mixed media** (2D + 3D + foto) cuando suma.
- **Minimalismo premium**: sutil > recargado. Es la dirección dominante.

## ⛔ EVITAR (lista negra)
- Estética **gamer / sci-fi genérica**. (OJO: el **glow tipo Siri SÍ va, y prominente** — es el favorito de Bruno. No confundir "evitar neón gamer" con apagar el glow Siri: el glow es la firma del estilo.)
- Interfaces **recargadas** o "elementos tecnológicos obvios".
- El **template plano** (gradiente violeta/negro + texto a la izquierda blanco+violeta) → PROHIBIDO.
- Cortes duros, movimiento por moverse, todo el texto del mismo tamaño.
- Reciclar copy ("3AM chatbot / 47h / 4 segundos / velocidad de respuesta").

## Catálogo de mecanismos (verbos — uno por video)
- ✅ `CardWheel` — rueda cover-flow 3D → foco → zoom in. (zoom-in a mejorar)
- ✅ `StackFan` — pila → abanico 3D → colapsa a una.
- ⏳ Próximos: pila de notificaciones que se despliega; dashboard que se arma solo; comparación que se voltea (flip); número que cuenta en 3D; hub que orbita; documento/recibo que se materializa.

## Pipeline de un video nuevo
1. Tema psicológico (lever: loss aversion / paradoja de elección / prueba social / identidad / JTBD…). Copy nuevo.
2. Elegir un mecanismo del catálogo que NO se haya usado en el anterior.
3. Componer con el kit (Stage con bg propio, mecanismo, BigType, foco refinado, payoff).
4. Render + **verificar leyendo frames** (nunca describir desde el código).
5. (Próximo) voice over TTS + música.

⛔ Regla dura (Bruno): NUNCA re-montar experimentos famosos de laboratorio / ilusiones de percepción (gorila, McGurk, Stroop, Ames, bailarina, cambio ciego…). La psicología se demuestra con el contenido REAL del negocio. Ver `EXPERIMENT-PLAYBOOK.md`.

Fuente de verdad: este `STYLE-DNA.md` + `EMPEZAR-ACA-VIDEO.md` + `EXPERIMENT-PLAYBOOK.md` (formato experimento + biblioteca de ideas) + `research/FORMATO-VERTICAL.md` (zonas seguras). ADN en código: `src/apple/kit.tsx`.
