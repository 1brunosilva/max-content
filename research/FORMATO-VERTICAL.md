# Research — Formato vertical (9:16) y ZONAS SEGURAS (1080×1920)
> Reglas de formato para los videos de Concepto. Esto NO es psicología de laboratorio: son datos de cómo se ve y retiene un corto vertical en TikTok / Reels / Shorts. Síntesis de guías de industria (no papers). Revisar si las plataformas cambian su UI.

## Retención / estructura (corto vertical 9:16)
- **El gancho son los primeros ~1,5s:** 50–60% de los que abandonan lo hacen en los **primeros 3 segundos**. El hook va en 1–3s, antes del cuerpo.
- **Cambio visual cada 2–5s:** más de 8s sin cambio = se van. Transición/movimiento ~cada 2–4s.
- **Duración óptima:** 20–40s en general; tips 15–20s, storytelling 30–45s. Shorts de 15–30s logran la mejor retención.
- **Subtítulos quemados:** +15–25% de retención vs sin captions.
- Mínimo 1080p (nunca 720p); Shorts <60s.

## Zonas seguras — números (varían por plataforma y cambian seguido)
| Plataforma | Top bloqueado | Bottom bloqueado | Lado derecho (íconos) | Izquierda |
|---|---|---|---|---|
| TikTok | ~108–160px | ~250–350px (ads: ~370) | ~120px | ~60px |
| Instagram Reels | ~210–220px | ~310–450px (subió fin 2025) | ~84–120px | ~60–120px |
| YouTube Shorts | ~120px | ~300px | ~48–96px | ~60px |

**Conclusión operativa (la regla que usamos):** para postear el MISMO video en las tres plataformas sin que nada importante quede tapado, mantener todo el **texto/elemento clave dentro de un rectángulo central seguro**. Tomamos el caso más restrictivo (Reels) con margen:
- **Zona segura: TOP 220px · BOTTOM 420px · IZQUIERDA 90px · DERECHA 130px** (la derecha un poco más por el stack de likes/comentarios/compartir).
- Área útil aprox. **860×1280px centrada-tirando-a-arriba** (x: 90–950, y: 220–1500).
- Error más común: texto pegado al borde derecho (lo tapan los íconos) o muy abajo (lo tapa el caption). **Nada clave fuera de la zona.**
- En código: helper `SAFE` / `SafeArea` en `src/apple/kit.tsx`.

## ⚠️ Notas de honestidad
- Las **zonas seguras en píxeles no son oficiales** de cada plataforma y cambian con cada update de UI; son la mejor síntesis de varias fuentes. Revisar si TikTok/IG cambian su interfaz.
- Los **números de retención** (15–30s, +15–25% por captions, 50–60% drop en 3s) vienen de guías de industria, no de papers; tratarlos como referencia, no ley.
</content>
</invoke>
