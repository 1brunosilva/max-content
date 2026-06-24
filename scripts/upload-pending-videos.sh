#!/usr/bin/env bash
# upload-pending-videos.sh
# Subir MP4s pendientes a Supabase Storage + insertar filas en la DB.
# Correr desde la máquina local donde Supabase no está bloqueado.
# Uso: bash scripts/upload-pending-videos.sh
set -euo pipefail

API_KEY="sb_publishable_nNQhjFQGR4n8FuSLCjOA0Q_2FsgmXUA"
BASE_URL="https://zngbeqbvmbxeweldmyaf.supabase.co"

VIDEOS=(
  '{"file":"out/razon-porque.mp4","name":"razon-porque","mechanism":"reason-heuristic-cards","lever":"reason_heuristic","visual_mode":"glassy-dark","format":"reflexion","palette":"verde-cyan","hook_text":"¿Por qué una sola palabra duplica el sí?","payoff_text":"Una razón, aunque pequeña, duplica el sí."}'
  '{"file":"out/numero-concreto.mp4","name":"numero-concreto","mechanism":"scope-insensitivity-countup","lever":"scope_insensitivity","visual_mode":"glassy-dark","format":"reflexion","palette":"ambar","hook_text":"¿Qué número duele más?","payoff_text":"El número grande adormece. El concreto duele."}'
  '{"file":"out/senal-lujo.mp4","name":"senal-lujo","mechanism":"veblen-label-swap","lever":"veblen_effect","visual_mode":"glassy-dark","format":"reflexion","palette":"dorado-crema","hook_text":"El precio alto no espanta. El bajo puede.","payoff_text":"El precio bajo no atrae. Genera dudas."}'
  '{"file":"out/ambiguedad-paraliza.mp4","name":"ambiguedad-paraliza","mechanism":"blur-clarity-compare","lever":"ambiguity_aversion","visual_mode":"midnight-linea","format":"reflexion","palette":"midnight-azul","hook_text":"¿Qué paraliza más que el riesgo?","payoff_text":"Lo incierto da miedo. Sé específico."}'
  '{"file":"out/regret-eleccion.mp4","name":"regret-eleccion","mechanism":"satisfaction-bars-compare","lever":"post_choice_regret","visual_mode":"glassy-dark","format":"reflexion","palette":"violeta","hook_text":"Elegiste. ¿Estás satisfecho?","payoff_text":"Menos opciones, más satisfacción después."}'
  '{"file":"out/acerca-el-mensaje.mp4","name":"acerca-el-mensaje","mechanism":"zoom-into-specificity","lever":"construal_level","visual_mode":"glassy-dark","format":"reflexion","palette":"cyan","hook_text":"Hablar a todos = no hablar a nadie.","payoff_text":"Cuanto más cerca te sentís del mensaje, más comprás."}'
  '{"file":"out/dopamina-espera.mp4","name":"dopamina-espera","mechanism":"progress-bar-dopamine","lever":"anticipatory_affect","visual_mode":"glassy-dark","format":"reflexion","palette":"rosa-violeta","hook_text":"¿Cuándo pica más la dopamina?","payoff_text":"El pico de deseo es antes de la entrega."}'
  '{"file":"out/decision-circadiana.mp4","name":"decision-circadiana","mechanism":"histogram-hours","lever":"circadian_decision","visual_mode":"data","format":"reflexion","palette":"dorado-naranja","hook_text":"¿A qué hora enviás tu propuesta?","payoff_text":"La misma propuesta, a distinta hora: distinto resultado."}'
  '{"file":"out/suma-cero.mp4","name":"suma-cero","mechanism":"balance-scale-reframe","lever":"zero_sum_bias","visual_mode":"glassy-dark","format":"reflexion","palette":"verde-dorado","hook_text":"¿Negocio o batalla?","payoff_text":"Si el cliente siente que ganaste vos, cree que perdió él."}'
  '{"file":"out/precio-trayectoria.mp4","name":"precio-trayectoria","mechanism":"dual-price-timeline","lever":"price_trajectory","visual_mode":"data","format":"reflexion","palette":"ambar-verde","hook_text":"El mismo precio, dos historias.","payoff_text":"El precio que sube genera urgencia. El que baja, espera."}'
)

ok=0
fail=0

for entry in "${VIDEOS[@]}"; do
  FILE=$(echo "$entry" | python3 -c "import sys,json; print(json.load(sys.stdin)['file'])")
  NAME=$(echo "$entry" | python3 -c "import sys,json; print(json.load(sys.stdin)['name'])")
  FILENAME="${NAME}.mp4"

  if [ ! -f "$FILE" ]; then
    echo "⚠️  No encontrado: $FILE — saltando"
    ((fail++)) || true
    continue
  fi

  echo "⬆️  Subiendo $FILENAME..."

  # 1. Upload al storage
  HTTP=$(curl -s -o /tmp/sb_resp.json -w "%{http_code}" \
    -X POST "${BASE_URL}/storage/v1/object/videos/${FILENAME}" \
    -H "apikey: ${API_KEY}" \
    -H "Authorization: Bearer ${API_KEY}" \
    -H "Content-Type: video/mp4" \
    --data-binary "@${FILE}")

  if [[ "$HTTP" != "200" && "$HTTP" != "201" ]]; then
    echo "   ❌ Storage falló (HTTP $HTTP): $(cat /tmp/sb_resp.json)"
    ((fail++)) || true
    continue
  fi
  echo "   ✅ Storage OK"

  # 2. Insertar fila en la DB
  MECHANISM=$(echo "$entry" | python3 -c "import sys,json; print(json.load(sys.stdin)['mechanism'])")
  LEVER=$(echo "$entry" | python3 -c "import sys,json; print(json.load(sys.stdin)['lever'])")
  VISUAL_MODE=$(echo "$entry" | python3 -c "import sys,json; print(json.load(sys.stdin)['visual_mode'])")
  FORMAT=$(echo "$entry" | python3 -c "import sys,json; print(json.load(sys.stdin)['format'])")
  PALETTE=$(echo "$entry" | python3 -c "import sys,json; print(json.load(sys.stdin)['palette'])")
  HOOK=$(echo "$entry" | python3 -c "import sys,json; print(json.load(sys.stdin)['hook_text'])")
  PAYOFF=$(echo "$entry" | python3 -c "import sys,json; print(json.load(sys.stdin)['payoff_text'])")

  PAYLOAD=$(python3 -c "
import json
print(json.dumps({
  'name': '${NAME}',
  'filename': '${FILENAME}',
  'mechanism': '${MECHANISM}',
  'lever': '${LEVER}',
  'visual_mode': '${VISUAL_MODE}',
  'format': '${FORMAT}',
  'palette': '${PALETTE}',
  'hook_text': '${HOOK}',
  'payoff_text': '${PAYOFF}',
  'status': 'pending_approval',
  'storage_url': '${BASE_URL}/storage/v1/object/public/videos/${FILENAME}'
}))
")

  HTTP2=$(curl -s -o /tmp/sb_row.json -w "%{http_code}" \
    -X POST "${BASE_URL}/rest/v1/videos" \
    -H "apikey: ${API_KEY}" \
    -H "Authorization: Bearer ${API_KEY}" \
    -H "Content-Type: application/json" \
    -H "Prefer: return=representation" \
    -d "$PAYLOAD")

  if [[ "$HTTP2" != "200" && "$HTTP2" != "201" ]]; then
    echo "   ❌ DB insert falló (HTTP $HTTP2): $(cat /tmp/sb_row.json)"
    ((fail++)) || true
    continue
  fi

  echo "   ✅ DB OK — ${NAME} listo para aprobar en Concepto HQ"
  ((ok++)) || true
done

echo ""
echo "═══════════════════════════════════════"
echo "✅ Subidos exitosamente: ${ok}/10"
echo "❌ Fallidos: ${fail}"
echo "═══════════════════════════════════════"
