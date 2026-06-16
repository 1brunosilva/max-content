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
