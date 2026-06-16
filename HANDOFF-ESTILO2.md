# HANDOFF — Estilo 2 de videos MAX (sesión nueva)

> Pegar este archivo en la sesión nueva. Es autosuficiente.
> No generar nada hasta leerlo entero.

---

## 0. Contexto de dónde venimos

En la sesión del 15/06/2026 Bruno mandó **4 videos de referencia** y construimos **2 motores de video**.

Los 4 videos están en `max-content/references/` con nombres descriptivos.
Los contact sheets para verlos están en el mismo folder (`V1-sheet.jpg`, `V2-sheet.jpg`, `V3-sheet.jpg`).

**Resultado:**
- **Estilo 1 (DocReel = V3)** → construido, NO quedó bien. Abandonado.
- **Video que SÍ quedó bien** → `output/Premium-PerdidaSilenciosa.mp4` (estilo V2 elevado).
- **Estilo 2 (V1 = PLATA)** → NO construido todavía. Es la tarea de esta sesión nueva.

---

## 1. Los 4 videos de referencia — qué son exactamente

### V1 — PLATA (banco digital mexicano) `references/V1-PLATA-banco-mockups.mp4`
**~16s. Lo que más importa construir.**

**Cómo se ve beat por beat:**
1. Fondo negro + ícono PLATA (rojo) que aparece y rebota — solo el ícono, centrado
2. iPhone flotando en ángulo 3D, fondo blanco/gris limpio, mostrando UI real del banco (saldo $89,109.11, transacciones)
3. Fondo cambia a azul/rojo bicolor — el teléfono sigue flotando, ahora muestra pantalla de inversiones
4. Fondo negro de nuevo — teléfono mostrando teclado numérico y pantalla de pago
5. Pantalla de íconos del sistema (CFE, etc.) — beat más oscuro
6. Beat final: texto kinético enorme, 3 palabras que se reemplazan una por una: **"Más segura" → "Más rápida" → "Más maravillosa"**

**Lo que lo hace premium:**
- El dispositivo es un frame REAL de iPhone (no generado con AI) — renderizado en 3D, con sombra y ángulo correcto
- La UI adentro es la app REAL con datos reales/inventados creíbles
- Los fondos gradiente no son planos — tienen profundidad
- El ritmo es 1.5-2s por beat, muy pegado
- Sin cara, sin persona — puro producto

### V2 — Google Health / Fitbit `references/V2-GoogleHealth-aurora-typo.mp4`
**~17s. El que inspiró el PremiumReel que SÍ funcionó.**

**Cómo se ve beat por beat:**
1. Fondo blanco + ícono Fitbit pulsando
2. El ícono MORPHEA: Fitbit → corazón Google multicolor (teal/rojo/amarillo/azul)
3. Texto grande: **"The Fitbit app is getting better"**
4. Logo Google Health aparece
5. Fondo oscuro teal/verde profundo — formas orgánicas de salud en wireframe (bicicleta, actividades) como fondo
6. Texto enorme palabra por palabra: **"There are a lot of opinions about what's healthy"**
7. **"But what matters most is"**
8. **"health"** (una palabra, llenando pantalla) → **"for"** → **"you"**
9. Cierre: fondo celeste con flores borrosas, **"Personalized coaching built with Gemini"**

**Lo que lo hace premium:**
- Las formas de fondo son orgánicas (no geométricas/HUD) — blur suave
- La tipografía es ENORME, una palabra llena la pantalla
- El morph del ícono es suave, tipo Apple
- Cada beat tiene un fondo diferente (no siempre negro)

### V3 — The Conversion Doc `references/V3-ConversionDoc-lineart.mov`
**~37s. Lo que construimos (Estilo 1). NO quedó bien.**

**Cómo se ve:**
- Fondo negro total
- Line-art que se dibuja solo (reloj, botellas, logo Walmart, íconos de comercio)
- Subtítulos blancos sincronizados con voz grave en off
- Contadores: $925,293 → $10,000,000
- Minimalista extremo — texto es el protagonista

**Por qué no funcionó para nosotros:** los íconos line-art no quedaron al nivel de la referencia, especialmente MAX chibi (intentado 7+ veces, abandonado). El sistema técnico funciona, el look no convence.

### V4 — _k.elsie `references/V4-Elsie-persona.mp4`
**~45s. Persona filmada + subtítulos. NO es motion graphics.** No aplica al sistema de código.

---

## 2. Los 2 estilos definidos en sesión

| | Estilo 1 (HECHO, no funcionó) | Estilo 2 (A CONSTRUIR) |
|---|---|---|
| **Referencia** | V3 (The Conversion Doc) | V1 (PLATA) + elementos de V2 |
| **Look** | Negro + line-art que se dibuja + subtítulos + voz | Mockup dispositivo flotando + UI real adentro + fondos gradiente por beat + tipografía kinética |
| **Motor** | `src/doc/DocReel.tsx` | A crear en `src/plata/` |
| **Estado** | Abandonado | ← acá arranca esta sesión |

---

## 3. Lo que SÍ funciona (no romper, reusar)

### PremiumReel — el que quedó bien
`src/premium/PremiumReel.tsx` + `src/premium/Aurora.tsx`

- Aurora animada de fondo (gradientes borrosos que se mueven)
- Palabras gigantes que entran con 4 tipos de entrada: `up`, `down`, `scale`, `blur`
- Keyword con orbe violeta difuso detrás
- `rule`: línea de acento que barre
- **Base sólida. Para Estilo 2, extender desde acá o construir nuevo `PlataReel` que lo tome de referencia.**

El video está en `output/Premium-PerdidaSilenciosa.mp4` — abrirlo para calibrar la calidad base.

### Keyword highlight chip (spec verificada en render)
```tsx
background: 'rgba(124,58,237,0.16)',
boxShadow: 'inset 0 0 0 1.5px rgba(168,85,247,0.45), 0 0 30px rgba(124,58,237,0.30)',
borderRadius: 10,
padding: '0.02em 0.18em',
textShadow: '0 0 22px rgba(124,58,237,0.75), 0 0 52px rgba(124,58,237,0.40)',
```

### Float + respiración en objetos visuales (verificado)
```tsx
const floatY = 10 * Math.sin(localFrame * 0.045);
const rot = 2.2 * Math.sin(localFrame * 0.03);
const breathe = 1 + 0.018 * Math.sin(localFrame * 0.06);
// aplicar al contenedor del dispositivo
```

### Fuentes (sistema verificado)
- Cargar con `loadFont()` de `@remotion/google-fonts` — NO `@font-face` CSS (Remotion no lo levanta)
- Ver `src/doc/fonts.tsx` como referencia
- **Archivo variable 400–900 + DM Mono** — Inter PROHIBIDO en video
- fontStretch: '88%' o '96%' para el look condensado

---

## 4. El bug crítico que NUNCA se puede ignorar

### Arc commands en SVG + pathLength = invisible en Chromium

**Remotion usa Chromium internamente.** Los path SVG con comandos `A` (arc) combinados con `pathLength={1}` + `strokeDasharray` + `strokeDashoffset` NO se renderizan. El stroke simplemente no aparece.

**Regla fija para cualquier SVG animado con stroke:**
- ✅ Usar: `L`, `C`, `Q`, `H`, `V`, `Z`
- ❌ Nunca: `A` con pathLength
- Si necesitás una curva circular → aproximar con beziers `C`
- Si no hay alternativa → usar `opacity` en vez de `strokeDashoffset`

---

## 5. MAX no va como line-art

Se intentó 7+ veces. Nunca quedó al nivel. Decisión final: **no usar MaxChibi en ningún video.**

Si MAX tiene que aparecer → imagen real de Higgsfield:
- Modelo: Nano Banana Pro (`nano_banana_2`)
- Fotos de referencia: `Max Assets/Max Referencias Creaciones/`
- Subir foto como media (`media_upload` → PUT → `media_confirm`) y pasarla como `medias[{role:"image"}]`
- MAX: robot chibi, capucha BLANCA, campera negra, ojos LED violeta rectangulares
- Cara de MAX NUNCA refleja luces — siempre limpia, solo brillan los ojos violeta

---

## 6. Qué construir para Estilo 2 (V1 / PLATA)

### Los componentes que necesita

**A. Mockup de dispositivo flotando**
- El frame del iPhone/Mac tiene que ser REAL, no generado con AI
- Opciones: Apple Design Resources (gratis, PNG oficial), Rotato, Shots.so, Angle, Figma mockups
- Se toma el PNG del frame con fondo transparente y se mete en Remotion como `<Img>`
- La UI "adentro" se renderiza encima del frame, recortada al área de la pantalla (clipPath o position absoluta dentro del frame)

**B. UI real adentro de la pantalla**
- Datos inventados creíbles (NUNCA datos de clientes reales)
- Sugerencias para Concepto: chat de MAX respondiendo, dashboard de consultas atendidas, notificación de lead captado
- Construir en HTML/React a alta fidelidad (sombras reales, blur, tipografía correcta)

**C. Fondos gradiente que cambian por beat**
- Cada beat tiene su propio color de fondo — no siempre negro
- Los cambios son suaves (cross-fade, no corte duro)
- Paleta sugerida para Concepto: negro → violeta profundo → negro de nuevo → gris oscuro
- Técnica: `interpolate(frame, [from, from+20], ['#0d0d0d', '#1a0a3d'])` en el background-color

**D. Ícono animado de apertura**
- El logo de Concepto (concepto-icon.png) que rebota y escala al inicio
- 1 beat de solo el ícono, fondo negro, centrado

**E. Texto kinético de cierre**
- Las últimas 3 palabras/frases del mensaje, una por beat, muy grandes
- Estilo PremiumReel: palabras gigantes que entran con ease

### Estructura de beats sugerida (adaptar al guion)

```
Beat 1 (frames 0–40):    Ícono Concepto — rebota al centro, fondo negro
Beat 2 (frames 40–100):  Dispositivo flotando — UI "chat" — fondo blanco/gris
Beat 3 (frames 100–160): Fondo cambia violeta/oscuro — dispositivo sigue — UI "stats"
Beat 4 (frames 160–220): Fondo negro — dispositivo — UI "notificación lead"
Beat 5 (frames 220–280): Texto kinético enorme palabra por palabra — el claim del guion
Beat 6 (frames 280–330): CTA — fondo negro — label DM Mono — borde violeta inferior
```

Total: ~330 frames = ~11s @30fps

---

## 7. Stack y comandos

```
Remotion 4.0.467, React 19, 30fps, 1080×1920
Archivo variable + DM Mono (ya instaladas)
Tokens: ink #0d0d0d · violet #7c3aed · violetLite #a855f7 · stroke #EAEAF2

# Render video completo
cd /Users/brune/Desktop/ClaudeCode/max-content
npx remotion render [ID] output/[nombre].mp4 --log=error

# Still para verificar un frame
npx remotion still [ID] output/probe.png --frame=100 --log=error

# Ver en studio (localhost:3000)
npm run dev
```

---

## 8. Lo que FALTA definir antes de construir (preguntar a Bruno)

1. **¿Qué dice el guion?** — Las frases exactas del video, keyword de cada beat
2. **¿Dispositivo teléfono o Mac?** — Cambia qué asset de frame usar
3. **¿Qué muestra la UI adentro?** — Chat, dashboard de stats, notificación (datos inventados)
4. **¿ElevenLabs está disponible?** — Bruno dijo que iba a agregar la key a `~/.zshrc`. Confirmar con `echo $ELEVENLABS_API_KEY`

---

## 9. Cómo arrancar la sesión nueva

```
"Leé HANDOFF-ESTILO2.md en max-content/. Leé también los contact sheets
V1-sheet.jpg, V2-sheet.jpg, V3-sheet.jpg en max-content/references/
para calibrar las referencias. No generes nada todavía.
Grillame para definir el guion y el dispositivo, y después construimos
el motor de Estilo 2 (V1/PLATA) desde cero."
```

---

## 10. Reglas permanentes de Bruno (no negociables)

- Honestidad brutal — prohibido "100% listo / perfecto"
- Datos de clientes: NUNCA usar reales — datos inventados creíbles
- Créditos Higgsfield: avisar costo antes de gastar
- No declarar terminado sin el MP4 renderizado y verificado
- No tocar la máquina de Bruno (portapapeles/navegador) en pasos sensibles
- Todo reporte final incluye "⚠️ Riesgos y pendientes"
