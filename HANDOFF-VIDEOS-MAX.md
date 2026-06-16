# HANDOFF — Videos cinematográficos de MAX (para sesión nueva de Claude)

> Bruno pega este archivo entero en una sesión nueva. Es autosuficiente: explica qué busca,
> qué ya probamos, **por qué estamos clavados en 6/10**, las herramientas, las referencias, y
> el plan para llegar a 10/10. La primera tarea de la sesión nueva NO es generar nada: es
> leer esto, mirar las referencias, y arrancar el plan con preguntas.

---

## 0. Lectura obligatoria antes de tocar nada

1. Este archivo, entero.
2. Las referencias de Bruno: `Ref video/` (≈24 frames PNG `IMG_61xx.PNG` de UN reel viral que a Bruno le encanta — el formato "POV: client paid us $200 extra": demo de producto disfrazada de flex, mockups de dispositivos flotando, gradientes que cambian de color, headline con una palabra resaltada, ritmo 1–2s por beat).
3. MAX real: `Max Assets/Max Referencias Creaciones/` (fotos canónicas de MAX — fuente de verdad).
4. La memoria `feedback-video-pipeline.md` (reglas del pipeline ya aprendidas).
5. Los dos videos que ya hicimos, en `max-content/output/`:
   - `Anuncio-MAX-Hero/Anuncio-MAX-Hero-FINAL.mp4` → **el mejor que logramos (≈6–7/10)**. Bruno lo aprobó "para subir". Clip de MAX en jet + chat + calendario + CTA, con música house + SFX.
   - `Anuncio-Competencia/Anuncio-Competencia.mp4` → **el que NO funcionó**. Dispositivos AI que Bruno calificó de "espantosos, lo más falso que vi". Sin sonido. Sirve como ejemplo de lo que NO hay que hacer.

**Cómo "ver" videos enteros (la API bloquea videos/imágenes grandes):** contact sheet con ffmpeg →
`ffmpeg -i video.mp4 -vf "fps=2,scale=190:-1,tile=5x6" -frames:v 1 sheet.jpg` → leer con Read. Para imágenes grandes, extraer frames chicos (~620px) y leer de a uno.

---

## 1. Qué quiere Bruno exactamente (el objetivo real)

Anuncios de **MAX** (robot mascota de Concepto Development, agencia de IA en Uruguay) para **Instagram/TikTok**, nivel **Apple / Hollywood**, **optimizados para venta y viralidad**. No "videos lindos": piezas que frenan el scroll y venden.

**Las dos leyes de Bruno sobre estos videos:**
- **GUION PRIMERO, MAX DESPUÉS.** Primero un guion que venda (gancho, arco problema→resultado→CTA, keyword por beat). Recién después se genera a MAX para que *acompañe*. Nunca al revés. Cita textual: *"Pensá en un guion que venda, y después generás a MAX para que acompañe, no al revés."*
- **Replicar las referencias de verdad** (`Ref video/`), no "inspirarse". El formato es: mockups de dispositivos flotando en 3D mostrando producto real + fondos de gradiente que cambian de color por escena + headline con UNA palabra resaltada en violeta + ritmo rápido 1–2s.

**Estado de calidad honesto:** lo mejor que logramos es **6/10**. Bruno quiere **10/10**. El video de MAX más reciente que generé fue un **3/10**. Las fotos de dispositivos (celular/Mac) generadas con AI fueron un **2/10** ("espantosas, no las subiría nunca").

---

## 2. ⚠️ LA VERDAD BRUTAL — por qué estamos clavados en 6/10

Hay **tres cuellos de botella concretos**. La sesión nueva tiene que atacar estos, no repetir el método viejo:

### Cuello 1 — Los dispositivos AI son el error de raíz
Generar el celular/Mac con AI (`nano_banana`) y componerle la UI adentro **siempre va a verse falso**. Las referencias de Bruno y Apple NO usan dispositivos inventados por AI: usan **frames de dispositivo reales y profesionales**. Ese es el descubrimiento clave que la sesión vieja no aplicó a tiempo.
**La solución correcta (elegir una):**
- **Apple Design Resources** — Apple regala los PNG/figmas oficiales de iPhone/Mac/iPad con licencia para mostrar TU app adentro. Es lo que usan los anuncios reales. Gratis, perfecto, legal.
- **Rotato** (app de Mac) o **Angle / Mockuuups / Shots.so / Mockup packs de Figma** — frames 3D fotorrealistas, exportables con transparencia y hasta con movimiento.
- **Screen recording real** de la app/UI dentro de un frame real, no UI fake en HTML.
> Regla nueva: **nunca más generar dispositivos con AI.** El dispositivo es un asset real; lo único que cambia adentro es la pantalla (nuestra UI, en alta fidelidad).

### Cuello 2 — La UI de adentro tiene que ser de verdad, no "cartón"
El chat/calendario/dashboard que metimos adentro de las pantallas se ven a veces como maqueta de HTML plano. Apple muestra **producto real** funcionando. O grabamos UI real (de Concepto HQ, de un chat real), o construimos la UI en altísima fidelidad (sombras reales, blur, tipografía correcta, datos creíbles —**inventados, nunca clientes reales**) y la grabamos/renderizamos a resolución alta.

### Cuello 3 — El clip de MAX sale 3/10 con image-to-video de una sola foto
Una foto de referencia → Seedance no alcanza para fidelidad + movimiento cinematográfico. Opciones a evaluar en la sesión nueva:
- Entrenar/usar **Soul ID / personaje consistente** de MAX en Higgsfield (consistencia de cara entre tomas) — ver skill `higgsfield-soul-id`.
- Curar **mejores stills primero** (Nano Banana Pro con la mejor foto de `Max Referencias Creaciones/` según la escena), aprobar el still, y recién animar.
- Aceptar el límite: el video AI de un personaje 3D puede morphear. Mejor **planos cortos y simples** (MAX quieto, cámara dolly lento, MAX gira la cabeza) que planos ambiciosos que se rompen.
- Considerar usar a MAX **menos como video y más como hero shot** corto + dejar que los motion graphics carguen el peso (que es donde la calidad es barata y alta).

---

## 3. Qué SÍ funcionó (no romper esto)

- **Pipeline Higgsfield → Hyperframes.** Higgsfield genera la escena visual limpia de MAX (sin texto). Hyperframes (HTML+GSAP) monta TODO el editorial: copy animado, keyword highlights `#7c3aed`, cortes, timing, sonido. Un video NO está terminado hasta el MP4 de Hyperframes.
- **MAX fiel = foto de referencia, NUNCA prompt de texto.** Generar MAX desde texto da un mascota genérico irreconocible. Subir foto real de `Max Referencias Creaciones/` como referencia/start_image.
- **Costos reales (Seedance 2.0):** 480p fast 4s = 6 cr · 720p fast 6s = 21 cr · 720p std 6s = 27 cr. Regla: **720p fast** de acá en más. Iterar es barato. Audio: `sonilo_music` 1 cr, `mirelo_text_to_audio` SFX 0.75 cr c/u. **Siempre avisar costo antes de gastar.** Quedan ≈256 créditos. Workspace Higgsfield: `bc38fe15`.
- **Audio importa (Apple es 50% sonido):** música house + SFX (riser, whoosh en cortes, pop en burbujas, chime en check). Mezcla con ffmpeg (adelay/amix normalize=0/alimiter). El SFX riser/whoosh ya aprobado por Bruno; la música la elige él entre 2–3 opciones.
- **Tipografía de video:** Archivo (variable, `wght 900 / wdth 75` = condensada black) + DM Mono. **Inter PROHIBIDO en video.**
- **El dashboard con contadores** del Anuncio-Competencia le encantó a Bruno — ese motion graphic es oro, reusarlo.

## 4. Qué NO funcionó (errores documentados — no repetir)

- ❌ Dispositivos generados con AI → se ven falsos. **Usar frames reales (Cuello 1).**
- ❌ Video de MAX ambicioso de una sola foto → 3/10. **Plano corto + still aprobado primero.**
- ❌ Clientes reales en las demos (Pintelux/Barraca/Oxford/MVD) → **siempre datos inventados creíbles.**
- ❌ "Concepto Development" repetido arriba a la izquierda → un solo label por pieza.
- ❌ Música que no pega + beats que van muy rápidos para leer → dar 2–3 opciones de música, y testear legibilidad del copy.
- ❌ Declarar terminado sin renderizar y verificar el MP4 real.

---

## 5. Herramientas disponibles (mapa)

- **Higgsfield (MCP / skill `higgsfield-generate`)** — stills (Nano Banana Pro), video (Seedance 2.0 image-to-video, Cinema Studio para máxima fidelidad, Kling más barato), música (sonilo), SFX (mirelo), remove_background, **Virality Predictor** (`brain_activity`: puntúa hook/retención de un video terminado — usarlo para validar antes de publicar). Skill `higgsfield-soul-id` para consistencia de cara.
- **Hyperframes (skill `hyperframes` + `hyperframes-cli`)** — el editor. `npx hyperframes lint .` → 0 errores → `render . --output X.mp4`. Video `<video>` necesita `id` + `data-start` + `data-duration`.
- **Frames de dispositivo reales** — Apple Design Resources (descargar), Rotato/Angle/Shots.so/Figma mockups. **Esto hay que incorporarlo — es el cambio de método más importante.**
- **ffmpeg** (instalado) — contact sheets para revisar, mezcla de audio.
- **emil-design-eng / framer-motion-animator** — skills de referencia para que el motion se sienta premium (easings resorte, stagger, micro-interacciones).

---

## 6. El método objetivo (cómo se ve un 10/10)

Un anuncio Apple/viral de MAX = **frame de dispositivo REAL** con UI de alta fidelidad adentro (producto como flex) **+ fondo de gradiente con profundidad que cambia de color por beat** (nunca negro plano con grilla de puntos) **+ headline con UNA palabra keyword en violeta** **+ ritmo 1–2s** **+ clip(s) corto(s) y limpios de MAX como cama/hero** **+ tipografía Archivo** **+ sonido (música + SFX en cada corte).** Guion de venta primero; MAX acompaña.

---

## 7. ▶ CÓMO ARRANCAR LA SESIÓN NUEVA (el plan)

**No generar nada en los primeros pasos.** Orden:

**Paso 1 — Calibrar contra la referencia (sin gastar créditos).**
Pasar `Ref video/` a contact sheet, leerla, y escribir en concreto: qué dispositivo aparece, cómo flota, qué colores tiene el fondo en cada beat, dónde va el texto, qué palabra se resalta, cuántos beats y de qué duración. Devolverle a Bruno ese "decode" para confirmar que entendimos la referencia.

**Paso 2 — Grill a Bruno (una pregunta a la vez, con respuesta recomendada).** Usar el estilo de la skill `grill-bruno`. Las preguntas que faltan resolver:
- ¿Qué vende este video puntual? (¿chatbot LUCA? ¿agentes? ¿la agencia en general?) → define el guion.
- Palanca psicológica: ¿loss aversion / FOMO / resultado concreto? (la sesión vieja venía con **loss aversion**).
- ¿Cuántos segundos? (referencia ≈ 10–15s, 4–6 beats).
- Decisión de método de dispositivos: **¿bajamos Apple Design Resources / Rotato, o Bruno consigue los mockups?** (recomendado: Apple Design Resources, gratis y reales).
- ¿La UI de adentro es de Concepto HQ real (screen recording) o la construimos en alta fidelidad con datos inventados?
- ¿Cuánto rol tiene MAX: hero shot corto, o protagonista? (recomendado: hero corto + motion graphics cargan el peso).

**Paso 3 — Guion + storyboard beat por beat** (texto, gratis): para cada beat → plano/dispositivo + motion graphic + copy + keyword + color de fondo + SFX. Aprobar con Bruno ANTES de producir.

**Paso 4 — Conseguir/armar los assets reales:** frames de dispositivo reales + UI de alta fidelidad (datos inventados creíbles, nunca clientes reales).

**Paso 5 — Stills de MAX (baratos) → aprobar → clip(s) 720p fast.** Avisar costo antes. Plano corto y limpio.

**Paso 6 — Montaje en Hyperframes** (dispositivos reales + motion + Archivo + transiciones + flash violeta en cortes) → **sonido** → render → contact sheet → revisión de Bruno → iterar.

**Paso 7 — Validar con Virality Predictor de Higgsfield** antes de dar por bueno.

---

## 8. Reglas permanentes de Bruno (no negociables)

- **Honestidad brutal.** Si una idea es mala, decirlo antes. Prohibido "100% listo / perfecto". Todo cierre lleva "⚠️ Riesgos y pendientes" + "Cómo volver atrás", en español rioplatense simple. Bruno NO es técnico.
- **Datos de clientes:** nunca usar clientes reales en demos — datos inventados creíbles.
- **Créditos:** avisar costo antes de gastar. No explorar variantes al pepe.
- **No declarar terminado sin el MP4 renderizado y verificado.**
- **No tocar la máquina de Bruno** (portapapeles/navegador) en pasos sensibles — pasarle el texto/pasos.

---

## 9. Frase para que Bruno arranque la sesión nueva

> "Leé `max-content/HANDOFF-VIDEOS-MAX.md` entero y las referencias que menciona. No generes nada todavía. Empezá por el Paso 1 (decode de la referencia) y después grillame para definir el guion. Quiero llegar a 10/10 y sé que el método viejo me dejaba en 6 — atacá los tres cuellos de botella."
