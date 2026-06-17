# 🎬 EMPEZAR ACÁ — Sistema de video Concepto (handoff de sesión)

> Si sos una sesión nueva de Claude y vas a hacer videos para Bruno: **leé este archivo
> entero + `STYLE-DNA.md` ANTES de tocar nada.** Esto te pone al día con lo que se logró
> en la sesión del 2026-06-16, que Bruno calificó de "brillante / 9-10". No empieces de cero.

## 0. Dónde estás y cómo arrancar
- **Carpeta canónica (iCloud, respaldada):** `/Users/brune/Desktop/Escritorio - Bruno/ClaudeCode/max-content`. Trabajá SIEMPRE acá.
- **Backup en GitHub (privado):** `conceptodevelopment-dev/max-content`. Después de cada cambio bueno: `git add -A && git commit && git push origin main`.
- Remotion 4.0.467, 30fps, 1080×1920. `npm run dev` abre el studio. Render: `npx remotion render <id> out/<id>.mp4 --concurrency=4`.
- El ADN del estilo en código: `src/apple/kit.tsx`. Los mecanismos: `src/apple/*.tsx`, registrados en `src/Root.tsx`.

## 1. ⭐ LA REGLA DE ORO (esto es lo que lo hace "brillante")
**El mecanismo DEBE encarnar el mensaje.** El visual te hace *vivir* el punto; el payoff le pone nombre. No es decoración — es la PRUEBA del argumento.
- Conveyor: 9 cards pasan (vivís el scroll) → "pasaste por 9 marcas, no te acordás de ninguna. Lo aburrido es invisible." ← Bruno: "concepto BRILLANTE".
- StackFan: el abanico te abruma con opciones → colapsa a una = "más opciones, menos decisión".
- SilentChurn: un cliente se apaga SIN glow (no lo notás) → "se fue y no te enteraste".
Cada video nuevo: **concepto psicológico + un mecanismo que lo hace experimentar.**

## 1.5 ⭐⭐ EL FORMATO QUE MÁS LE GUSTA A BRUNO (priorizar SIEMPRE): la REFLEXIÓN / insight de marketing
Los 2 favoritos absolutos de Bruno son **TypeScan** ("1 segundo, 2 palabras" — tu cliente escanea, no lee) y **Conveyor** ("pasaste por 9 marcas, no te acordás de ninguna"). ¿Qué tienen en común? **Te ENSEÑAN una verdad de marketing real y NO obvia, demostrándola con un ejemplo**, y te hacen pensar *"guau, es verdad, no lo había considerado"*. Después la conectan con su propio cliente (*"a tu consumidor le pasa lo mismo"*).
**La fórmula del formato rey:**
1. Una **verdad de marketing/psicología del consumidor** que el dueño NO tenía presente (no un lugar común). Algo que vos sí sabés y él no.
2. **EXPERIMENTO SOBRE EL ESPECTADOR (lo más importante):** el video le HACE VIVIR el efecto en su propia cabeza EN TIEMPO REAL, y recién después se lo nombra ("¿viste lo que te acaba de pasar?"). NO es ilustrar/diagramar un tip desde afuera (eso = infografía genérica, FALLA). TypeScan: VOS escaneaste y captaste 2 palabras. Conveyor: VOS pasaste 9 marcas y no recordaste ninguna. → primero le pasa a ÉL, después se revela. Si el espectador solo MIRA un gráfico del concepto en vez de VIVIRLO, está mal.
3. **"A tu cliente le pasa igual"** — conectar el insight con su negocio.
4. Eso te posiciona como **el que SABE** (autoridad) → genera ganas de seguirte/contratarte. La venta es indirecta, por valor — no arranca vendiendo.
Es VALOR/enseñanza primero. Buscar SIEMPRE muchas ideas de este estilo (verdades de atención, memoria, decisión, percepción, confianza que el dueño no considera). Este formato gana sobre la venta directa.

## 1.6 ♾️ VARIEDAD / EXPANSIÓN — SIEMPRE distinto (regla de Bruno)
Regla madre: **cada video distinto del anterior en TODO** (animación, guión, mecanismo, tema). Se logra recombinando EJES, manteniendo fijo lo que a Bruno le gusta.

**INVARIANTES (NUNCA cambian — son "lo que le gusta" = la marca):** el mecanismo encarna el mensaje · formato reflexión/insight (enseña una verdad, nunca genérico) · texto CENTRADO, grande y legible · ritmo lento (se lee, cierre con hold) · glow/luz como foco · premium/cinematográfico · un acento · física Apple · ADN del kit.

**EJES QUE VARÍAN (recombinar; NUNCA repetir el del video anterior):**
1. **Modo visual:** glassy-oscuro · editorial-claro · midnight-línea · real/raw · [a abrir: MAX-personaje · híbrido foto-real · data · objeto-3D · blueprint/iso].
2. **Mecanismo (verbo×objeto):** stack, fan, coverflow, conveyor, zoom-into, flip, count, orbit, materialize, scatter, parallax, scan, rising-bar, grid-break… (verbos en `kit.tsx`).
3. **Lever psicológico:** loss aversion, FOMO, anclaje, prueba social, identidad, JTBD, zeigarnik, paradoja de elección, autoridad, contraste, **mera exposición, peak-end, precio-cero, aversión a la ambigüedad**, escasez, reciprocidad, compromiso…
4. **Formato:** reflexión/insight (rey) · hook contrario · "3 cosas" · derribar mito · historia · revelación de número · antes/después.
5. **Objeto:** mensajes, cards, dashboard, números, documentos, reseñas, notificaciones, avatares, precios, logos…
6. **Acento/paleta:** violeta+glow · cyan · dorado · crema…

**LA MATEMÁTICA (por qué nunca se agota):** ~6 modos × ~15 mecanismos × ~15 levers × ~7 formatos = **miles de combinaciones únicas.** El espacio es prácticamente infinito.

**REGLAS para mantenerlo amplio y sin repetir:**
- **Rotación:** no repetir mecanismo, lever, modo ni paleta del video inmediato anterior.
- **Registro:** anotar cada video producido (modo+mecanismo+lever+tema+paleta) para no repetir y ver cobertura (futuro `src/content/produced.ts`).
- **Expandir, no reusar:** cuando un eje se siente "gastado", **ABRIR un valor nuevo** (un modo nuevo, un verbo nuevo, un lever del banco de psicología) en vez de reciclar — cada valor nuevo MULTIPLICA el espacio.
- Si algo se empieza a parecer a algo ya hecho → cambiar de eje. La meta es que dos videos seguidos no compartan ni el mecanismo ni la sensación.

## 2. El ADN (no negociable)
Leé `STYLE-DNA.md`. Resumen:
- 3D real (perspective/rotateY/translateZ), física Apple (entra rápido, **desacelera y se asienta**, micro-overshoot), drift constante (nada quieto).
- **Glow tipo Siri PROMINENTE** (cyan→azul→violeta→rosa) = la firma, FAVORITO de Bruno. NO lo moderes (me equivoqué una vez haciéndolo; lo odió).
- Transiciones espaciales (zoom/push/fila/colapso), nunca corte duro. Cards glassy = vocabulario. Base oscura, fondo VARIADO por mecanismo.
- ⛔ PROHIBIDO: el template plano (gradiente violeta + texto a la izquierda); estética gamer; reciclar "3am chatbot / 47h / 4 segundos / velocidad de respuesta".

## 3. Catálogo construido + qué sigue
Hechos y aprobados (cada uno = familia distinta): **StackFan** (abanico→colapsa), **Conveyor** (fila que pasa→frena), **SilentChurn** (cliente que se va en silencio). CardWheel existe pero su zoom-in quedó flojo (rehacer como CoverWheel). AppleAd = CONTRAEJEMPLO del template plano, NO usar.
Próximos en la recámara: "Todos dicen lo mismo" (grilla que se quiebra), "3 segundos" (timer que corre), FlipCompare, CountHero, Materialize. **Norte: ~150 mecanismos** combinando verbos (`kit.tsx` → `verbs`) × objetos × coreografía.

## 4. Cómo trabajar con Bruno (clave)
- Español rioplatense, directo, socio estratégico (aportá más de lo pedido). **Honestidad brutal**: si algo no quedó bien, decílo vos antes; reporte siempre con riesgos.
- **Bruno NO programa** — el video se juzga reproduciéndolo. Mostrále prototipos cortos, él reacciona, iterás. No entregues 10 cosas juntas; UNA, verificada, y mostrar.
- Tiene **libertad creativa para vos**: cuando dice "elegí vos", elegí y construí. Le encanta que generes conceptos psicológicos (cruce de lo que ofrece × dolores del dueño uruguayo × psicología).
- Temas que le encantan: "Bajar el precio no te va a salvar", pérdida silenciosa, paradoja de elección, el scroll/atención. Estilo "Conversion Doc" (enseñar/psicología).

## 5. Cómo construir un mecanismo + GOTCHAS
1. Definí concepto (lever psicológico) + cómo el mecanismo lo encarna. Copy nuevo, corto, grande.
2. Componé con `kit.tsx`: `Stage` (bg propio), `verbs`, `Glass`, `SiriGlow`/`SiriFrame`, `BigType`, `ip`, `useSettle`.
3. Registrá en `Root.tsx`. Render. **VERIFICÁ leyendo los frames** (`npx remotion still <id> out/x.png --frame=N` y leé el PNG). NUNCA describas desde el código. NUNCA uses computer-use sobre la pantalla de Bruno.
4. **GOTCHA del payoff (pasó 3 veces):** cuando entra el texto de cierre, **desvanecé toda la escena de atrás** (multiplicá su opacidad por `1 - pay`), si no las cards quedan pisando el texto.
5. **GOTCHA del centro:** para abanicos/filas usá número IMPAR de cards (una queda en el centro exacto, no se pisan dos).
6. La elegida se "enciende" (glow) recién en el momento de foco, no antes (no pre-reveles).

## 6. El plan grande (aprobado)
~150 mecanismos vía lenguaje de primitivas (verbos×objetos) + **motor de temas** (`src/content/` — generar conceptos psicológicos en serie, 5/día, con frameworks Hook→Tensión→valor→prueba→payoff / PAS·BAB·AIDA·Open Loop) + **audio** (música libre de Pixabay + captions cinéticas ahora; voz IA/TTS después). Banco de patrones OSS para minar: Locomotion + reactvideoeditor (MIT) → clonar en `vendor/`.

## 7. Cómo arrancar la sesión nueva (decíselo a Claude)
"Leé `max-content/EMPEZAR-ACA-VIDEO.md` y `STYLE-DNA.md`, después seguimos el catálogo de mecanismos." Con eso ya está al día.
