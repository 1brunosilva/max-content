# Sistema de Video Concepto — "Glassy Motion" (v1, 2026-06-16)

> **Material visual original (lo que le gusta a Bruno): `Contenido-Referencia/`** (en la raíz del
> repo: storyboards, clips de referencia, anuncios previos). Leé `Contenido-Referencia/_INDICE.md`
> para el mapa de cada archivo y las reglas de oro.

Sistema para generar videos verticales (9:16) premium que **venden**, con el look que aprobó
Bruno: limpio, espacioso, **glassy + inclinación 3D + glow + partículas + tipografía kinética**
y transiciones con **motion blur**. Reemplaza el sistema viejo de hard-cuts (archivado en `src/_legacy/`).

> Regla de Bruno: **de "Lead calificado" en adelante (las cards de vidrio) es lo que más le gusta** →
> el lenguaje glassy manda. Y **siempre quiere videos DISTINTOS** → nunca repetir la misma plantilla.

## Cómo funciona (la idea)

Un video = una **lista declarativa de escenas** (data). El builder las arma con tiempos y
transiciones automáticas. Cambiar la lista = otro video.

- `src/system/scenes.tsx` — librería de escenas parametrizables (reciben copy/datos por props).
- `src/system/Reel.tsx` — builder: `<Reel scenes={...} />` + `reelDuration(scenes)`.
- `src/system/videos.ts` — los videos como data (uno por bloque).
- `src/Root.tsx` — registra cada video (`Sis-*`).

## Catálogo de escenas (combinar libremente, NO repetir el mismo video)

| type | qué es | props clave |
|------|--------|-------------|
| `type` | tipografía grande (statement) | `lines[{t,hl}]`, `sub`, `light`, `glow`, `atmos` |
| `bubbles` | burbujas 3D + íconos volando hacia cámara (caos de mensajes) | `caption`, `bubbles?` |
| `oneBubble` | una burbuja de vidrio hero + reflejo + "visto Xh después" | `bubbleText`, `caption`, `tag` |
| `lead` | card glassy "Lead calificado" con checks + botón | `name`, `items[]`, `tag`, `button`, `caption` |
| `dash` | dashboard inclinado con número que tickea + gráfico | `value`, `prefix`, `suffix`, `delta`, `label`, `caption` |
| `metrics` | cards de métricas (+32% / −45% …) | `titleLines`, `items[{v,l}]` |
| `checklist` | card glassy con tareas tildadas | `title`, `items[]`, `caption` |
| `growth` | curva de crecimiento glassy (sin→con sistema) | `caption`, `low`, `high` |
| `brand` | cierre: logo + frase + chips + CTA | `lines`, `chips?`, `cta?` |

Keyword en violeta = `{ t: '...', hl: true }` (1 por línea como máximo).

## Receta para un video nuevo (orden que NO se saltea)

1. **Persuasión primero** (skill `marketing-psychology` + copy aprobado): definir **a quién**,
   **qué objeción** crush, **un lever** (Loss Aversion / FOMO / JTBD / Identity / Social Proof),
   la **promesa** y el **CTA**. Copy NUEVO (no reciclar "47h / 4 segundos / una venta se va").
2. **Elegir escenas distintas** del catálogo que cuenten ese guión (variá orden y tipos respecto
   de videos previos — Bruno quiere siempre algo distinto).
3. Agregar un bloque a `src/system/videos.ts` y registrarlo en `Root.tsx`.
4. **Render**: `npx remotion render Sis-<Nombre> out/Sis-<Nombre>.mp4 --concurrency=4`
   (still: `npx remotion still Sis-<Nombre> out/x.png --frame=N`).
5. **Verificar leyendo los frames** (NUNCA describir desde el código; NUNCA mirar la pantalla de
   Bruno con computer-use): extraer con `ffmpeg -i out/x.mp4 -vf fps=2 out/c-%03d.png` y leer los PNG.

## Reglas de ritmo / estilo (aprobadas)

- ~2.8s por escena (`DEFAULT_DUR=84` @30fps), solape 16f. Ni muy rápido (no se lee) ni lento.
- Transición = push-through con **motion blur** (no corte). Continuo.
- Fondo oscuro `#06050A`/`#16121F` con halo violeta + partículas; alternar alguna escena clara.
- Tipografía: Inter (display) + DM Mono (labels). Violeta `#7C3AED` / `#A855F7`. Un acento por línea.
- Texto y visual nunca se pisan; safe-zones 9:16.

## Híbrido foto-real (opcional)

Para tomas foto-realistas (ambiente/Apple-style) la IA (Higgsfield) genera el fondo y el texto/UI
se monta encima en código. Pero el núcleo del sistema es **código** (es lo que a Bruno le sale
"perfecto"; las imágenes IA sueltas las descartó). Componentes de referencia: `src/hybrid/HybridV1.tsx`.

## Estado

- Plantilla madre verificada: `Sis-Perdida` (= `src/ref/RefReel.tsx`, el aprobado).
- Variedad probada: `Sis-Automatizacion` (otro guión, otras escenas: checklist + growth).
- Marca parametrizable en `src/brand/`. Sistema viejo en `src/_legacy/` (no se borra).
