# Investigación — "Juegos Mentales / Brain Games" + psicología + formato vertical
> Base para la biblioteca de experimentos de video de Concepto. Hallazgos **verificados contra fuentes primarias** (deep research, 17/6/2026). Lo no confirmado va marcado como tal.

---

## FRENTE 1 — El patrón "Brain Games": hacer que el espectador lo VIVA

**La regla reproducible (la más importante).** Brain Games (Nat Geo, 2011–2022, 9 temporadas, 75 episodios) NO explica un concepto: **convierte al espectador en participante**. Cada episodio te hace *hacer* el experimento vos mismo y recién después un experto lo nombra. El productor ejecutivo Jerry Kolber lo definió como "un science show sin la palabra 'ciencia', donde el espectador es el concursante". **Ese es el formato que copiamos: primero te pasa a vos, después se revela.**

Programas análogos y qué aportan:
- **Mind Field (Vsauce / Michael Stevens, 2017–2019, 3 temp × 8 ep):** un experimento por episodio, el host o voluntarios lo *viven* en cámara (aislamiento, conformidad estilo Asch, memoria implantada, facial-feedback). Mismo patrón participativo.
- **The Mind, Explained (Netflix, 2 temp, ~20 min/ep):** formato **narrado/animado** (Emma Stone / Julianne Moore) — NO participativo. Sirve como **banco de temas** (Memoria, Foco, Ansiedad, Creatividad, Personalidad), no como modelo de formato.
- **Veritasium / Vsauce:** demostraciones que se autoadministran al espectador.

Demostraciones concretas de Brain Games reutilizables:
- **Foco/atención** = "spotlight" diminuto: la atención es un foco del tamaño de una uña (~1/1000 del campo visual) → todo lo demás se pierde.
- **Misdirection (Apollo Robbins):** te hacen buscar una carta en el mazo mientras la carta está sobre su cabeza; no la ves porque tu atención está en la tarea.
- **Visión periférica:** mirás una X central y no podés distinguir que una de las dos "porristas" laterales es un hombre con peluca → la periferia ve mucho menos de lo que creés.
- **Razonamiento espacial:** vaciar y recargar dos baúles llenos (te hacen vivir la dificultad).
- Temas-ancla por episodio: "Focus Pocus" (atención), "Remember This!" (memoria/testigo), "Seeing is Believing"/"Watch This!" (percepción: cuarto de Ames, bailarina que gira).

---

## FRENTE 2 — Efectos psicológicos con fuente (demostrables en 15–30s)

Cada uno **verificado contra el paper original** salvo aviso. Todos sirven para "hacérselo vivir" al espectador.

### Atención / percepción
- **Gorila invisible (ceguera por falta de atención)** — Simons & Chabris, 1999, *Perception* 28:1059–1074 ("Gorillas in Our Midst"). Contando pases del equipo blanco, **~46–50% NO ve** a la persona disfrazada de gorila que cruza, mira a cámara y se golpea el pecho. Datos finos: en la condición difícil solo el **8% lo nota** (92% lo pierde); notar sube si el objeto comparte color con lo atendido (58% vs 27%). Replica en radiólogos que no ven un gorila superpuesto en una tomografía. → *Verdad de marketing: si tu cliente está enfocado en otra cosa, tu mensaje es invisible aunque esté en pantalla.*
- **Efecto McGurk** — McGurk & MacDonald, 1976, *Nature* ("Hearing Lips and Seeing Voices"). Audio /ba-ba/ + labios /ga-ga/ → percibís /da-da/. **El audio nunca cambia**; lo que ves cambia lo que oís. Robusto: lo sentís aunque sepas que es un truco. → *La imagen manda sobre el mensaje; lo visual reescribe lo que tu cliente "escucha" de tu marca.*

### Memoria
- **Primacía/recencia (curva de posición serial):** recordás el principio y el final de una lista, el medio se pierde. (Ya implementado en `RecallTest`.) → *Cuidá tu primer y tu último segundo.*
- **Curva del olvido (Ebbinghaus):** sin repetición, la memoria cae rápido. (Ya implementado en `ForgetCurve`.) → *Una sola impresión no alcanza; la repetición retiene.*
- **Regla peak-end** — Kahneman, Fredrickson, Schreiber & Redelmeier, 1993 ("When More Pain Is Preferred to Less"); colonoscopía Kahneman & Redelmeier, 1996. Juzgamos una experiencia por su **pico** y su **final**, no por el promedio ni la duración (negligencia de duración): pacientes prefirieron un trial más largo y *objetivamente más doloroso* porque terminaba mejor. → *La gente recuerda tu peor/mejor momento y el final, no la duración. Diseñá el cierre.*

### Decisión / precio
- **Efecto del precio CERO (free)** — Shampanier, Mazar & Ariely, 2007, *Marketing Science* 26(6) ("Zero as a Special Price"). Hershey's de 1¢→gratis (Lindt 15¢→14¢, diferencia constante): la elección de Hershey's saltó de **27%→69%** y Lindt cayó **73%→31%**. "Gratis" mueve más que un descuento mucho mayor que sigue siendo pago. → *"Gratis" no es un precio bajo, es otra categoría mental. Una primera consulta/diagnóstico gratis convierte distinto.*
- **Efecto mera exposición** — Zajonc, 1968. La sola exposición repetida a un estímulo (palabras sin sentido, ideogramas, caras) **aumenta el agrado**, sin premio ni razonamiento. (Nota: una verificación marcó que el enunciado describe la *hipótesis* de Zajonc; el efecto está sólidamente replicado igual.) → *Lo familiar gusta más. Aparecer seguido, aunque no vendas, construye preferencia.*

### Banco de levers adicionales (del pedido, para la biblioteca)
Zeigarnik (tareas abiertas), paradoja de la elección, anclaje, señuelo/decoy, aversión a la pérdida, von Restorff (aislamiento), fluidez de procesamiento, prueba social, efecto IKEA, escasez, reciprocidad, compromiso/consistencia. *(Usar con su fuente al producir cada video; los 5 de arriba ya quedan citados y verificados.)*

---

## FRENTE 3 — Formato vertical y ZONAS SEGURAS (1080×1920)

### Retención / estructura (corto vertical 9:16)
- **El gancho son los primeros ~1,5s:** 50–60% de los que abandonan lo hacen en los **primeros 3 segundos**. El hook va en 1–3s, antes del cuerpo.
- **Cambio visual cada 2–5s:** más de 8s sin cambio = se van. Corte/transición ~cada 2–4s.
- **Duración óptima:** 20–40s en general; por tipo: tips 15–20s, comedia 18–28s, tutorial 25–40s, storytelling 30–45s. Shorts de 15–30s logran la mejor retención (a veces >80%).
- **Subtítulos quemados:** +15–25% de retención vs sin captions.
- Mínimo 1080p (nunca 720p); Shorts <60s.

### Zonas seguras — números (las fuentes varían por plataforma y cambian seguido)
| Plataforma | Top bloqueado | Bottom bloqueado | Lado derecho (íconos) | Izquierda |
|---|---|---|---|---|
| TikTok | ~108–160px | ~250–350px (ads: ~370) | ~120px | ~60px |
| Instagram Reels | ~210–220px | ~310–450px (subió fin 2025) | ~84–120px | ~60–120px |
| YouTube Shorts | ~120px | ~300px | ~48–96px | ~60px |

**Conclusión operativa (la regla que usamos):** para postear el MISMO video en las tres plataformas sin que nada importante quede tapado, mantener todo el **texto/elemento clave dentro de un rectángulo central seguro**. Tomamos el caso más restrictivo (Reels) con margen:
- **Zona segura: TOP 220px · BOTTOM 420px · IZQUIERDA 90px · DERECHA 130px** (el lado derecho un poco más por el stack de likes/comentarios/compartir).
- Eso deja un área útil aprox. **860×1280px centrada-tirando-a-arriba** (x: 90–950, y: 220–1500).
- El error más común: poner texto pegado al borde derecho (lo tapan los íconos) o muy abajo (lo tapa el caption). **Nada clave fuera de la zona.**

---

## Fuentes primarias citables (las verificadas)
- Simons & Chabris (1999), *Perception* 28:1059–1074 — gorila invisible.
- McGurk & MacDonald (1976), *Nature* — efecto McGurk.
- Kahneman, Fredrickson, Schreiber & Redelmeier (1993); Kahneman & Redelmeier (1996) — peak-end.
- Shampanier, Mazar & Ariely (2007), *Marketing Science* 26(6) — efecto precio cero.
- Zajonc (1968) — mera exposición.
- Brain Games (Nat Geo, 2011–2022); Mind Field (Vsauce, 2017–2019); The Mind, Explained (Netflix).

## ⚠️ Notas de honestidad
- Las **zonas seguras en píxeles no son oficiales de cada plataforma** y cambian con cada update de UI; son la mejor síntesis de varias fuentes. Revisar si TikTok/IG cambian su interfaz.
- Los **números de retención** (15–30s, +15–25% por captions, 50–60% drop en 3s) vienen de guías de la industria, no de papers; tratarlos como referencia, no ley.
- La psicología (5 efectos citados arriba) sí está verificada contra fuente primaria.
