# Sistema de video con código (motor Concepto) — la cocina

> Videos espectaculares hechos 100% con código (Remotion). Cero AI generativa,
> cero "cara de AI", iteración gratis e infinita. El guion manda; el visual acompaña.

## Cómo se cocina un video (pipeline)

1. **Guion primero** (psicología que vende, no genérico). Definir: palanca, hook en
   el primer segundo, 1 keyword por beat, arco problema→giro→resultado→CTA.
2. **Elegir engine** según el formato (ver abajo).
3. **Escribir los `beats`** en `src/Root.tsx` (un `<Composition>` por video).
4. **Lint:** `npx tsc --noEmit`
5. **Render:** `npx remotion render <ID> output/<ID>.mp4 --log=error`
6. **Verificar SIEMPRE leyendo la salida real** (nunca desde el código):
   `ffmpeg -i output/<ID>.mp4 -vf "fps=2.2,scale=150:-1,tile=7x7" -frames:v 1 sheet.jpg`
   y leer `sheet.jpg`.
7. **Voz** (cuando aplique): generar con ElevenLabs → `public/voz/<id>.mp3` →
   pasar como `voiceSrc` → re-sincronizar cortes a la narración → re-render.

## Engines disponibles

| Engine | Carpeta | Formato | Estado |
|--------|---------|---------|--------|
| **DocReel** | `src/doc/` | Estilo "The Conversion Doc": negro + line-art que se dibuja + voz grave + keyword violeta | ✅ funciona — backlog abajo |
| **PremiumReel** | `src/premium/` | Estilo Google Health/Apple: fondo aurora premium + tipografía kinética gigante | 🔧 en construcción (video #2) |

- `src/doc/lineart.tsx` — librería de íconos line-art reusables (reloj, mensaje, puerta, MAX, anillo). Se dibujan solos con `pathLength=1`.
- `src/doc/fonts.ts` — carga Archivo + DM Mono locales (FontFace + staticFile; NO usar @font-face CSS, rompe webpack).

## Backlog de mejoras (lo que NO está 10/10 todavía)

### DocReel (video #1 — "Doc-MAX-Responde")
- [ ] **Fondo:** los dos radiales se leen como "óvalos" feos. Reemplazar por fondo
      premium (aurora/mesh suave + grano para matar banding). Ver `src/premium/Aurora.tsx`.
- [ ] **Demasiado texto, poco motion graphic.** Era casi solo captions. Sumar más
      ilustración animada y elementos por beat (líneas, formas, transiciones).
- [ ] **Guion genérico** ("responde rápido" lo dice todo el mundo). Reescribir con
      psicología real (loss aversion del mensaje invisible, presencia vs ausencia,
      identidad). No desperdiciar el hook.
- [ ] **MAX line-art flojo** — se ve una cara vaga, no el robot reconocible. Rehacer.
- [ ] **Voz grave** pendiente (ElevenLabs). El formato vive de la voz.
- [ ] **Ritmo a ojo** — re-sincronizar a la voz cuando exista.

### Aprendizajes que SÍ funcionan (no romper)
- Motor Remotion → MP4 real, reusable, iterable gratis. Confirmado.
- Negro + keyword violeta + Archivo/DM Mono + borde violeta = marca correcta.
- Contador animado (anillo + número subiendo) = recurso fuerte, reusar.
- Line-art que se dibuja solo con `pathLength=1` = técnica válida, falta pulir trazos.
