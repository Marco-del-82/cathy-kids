# 🎬 Teaser Cápsula 45 Segundos: "La Anatomía del Límite"
**Target:** Foro Clínico de Terapeutas, Psicólogos Infantiles y Educadores  
**Cliente:** Cathy Calderón de la Barca (`cathykids.club`)  
**Duración Exacta:** 45 Segundos (125 palabras @ 140 WPM)  
**Audio Master:** Generado con `edge-tts` (voz `es-MX-DaliaNeural`)

---

## ⏱️ Storyboard Cinematográfico (4 Tomas)

### [00:00 - 00:12] TOMA 1: La Amenaza Neurobiológica (Enojo Sucio)
* **Visual:** Plano oscuro y tenso. El monstruo rojo (*Enojo Sucio*) proyecta una sombra amenazante sobre la silueta de espaldas de Lucía. En su pecho, la maza/coraza metálica con púas grises encadenada a un corazón rojo lastimado vibra con tensión. Garras verdes en primer plano.
* **Voz en Off (Locución Femenina Cálida / Clínica):**
  > *"Cuando un límite se marca desde la reactividad, el cerebro infantil no procesa el aprendizaje: entra en alerta por amenaza y miedo. El Enojo Sucio contamina el vínculo... es un corazón blindado por el dolor que termina dejando a todos en soledad."*
* **Diseño Sonoro:** Latido cardíaco acelerado de baja frecuencia, zumbido subgrave y respiración agitada.
* **Prompt para Generación 3D (Grok / Kite / ComfyUI):**
  ```text
  Cinematic Pixar 3D style. A bulky, furry red monster inspired by Monsters Inc with thick dark expressive eyebrows, standing in a dim room casting a dramatic shadow toward a small 7-year-old girl viewed from behind. Centered on the monster's chest is a cracked spiky rough grey stone and metal shield bruising a red heart. Volumetric moody lighting, cool blue shadows, dust motes, cinematic 8k octane render.
  ```

---

### [00:12 - 00:25] TOMA 2: La Regulación y el Apego Seguro (Enojo Limpio)
* **Visual:** Transición cálida por destello de luz dorado/azul. El monstruo azul cobalto (*Enojo Limpio*) se arrodilla respetuosamente a la altura visual de Lucía. Postura erguida, manos suaves y abiertas en señal de contención. En su pecho, el corazón azul profundo late con cadencia calmada de 60 BPM, emitiendo una bioluminiscencia suave que baña la escena.
* **Voz en Off:**
  > *"Pero el enojo no tiene que reprimir su fuerza: es energía vital. Cuando nace desde el respeto, se convierte en Enojo Limpio. Tiene la firmeza para frenar la injusticia y sostener la estructura, manteniendo el corazón abierto y el apego a salvo. Son límites firmes... sin lastimar la relación."*
* **Diseño Sonoro:** Pulso 808 profundo simulando un latido sereno a 60 BPM, armónico cálido de cuerdas y exhalación relajada.
* **Prompt para Generación 3D (Grok / Kite / ComfyUI):**
  ```text
  Cinematic Pixar 3D style. A firm, kind, fluffy deep-blue monster with two curved horns and thick expressive brown eyebrows, kneeling down respectfully to eye-level with a little girl with curly hair. Clearly centered on its chest is an uncovered glowing navy heart pulsating with warm golden-cyan light. Cozy warm sunset lighting, soft subsurface scattering, tactile plush fur, cinematic 8k render.
  ```

---

### [00:25 - 00:37] TOMA 3: El Futuro Clínico: El Regulador Relacional (App Mockup)
* **Visual:** Plano cerrado sobre una mesa familiar de comedor. Un smartphone con la app *Cathy Kids AI* o un dispositivo ambiental estilo Apple/diseño nórdico mostrando ondas de audio en tiempo real. Cuando una voz sube de decibeles o tono agresivo, la onda se tiñe de ámbar y aparece una micro-notificación sutil: *"Detectando reactividad. Respira. Regresa al Enojo Limpio."*
* **Voz en Off:**
  > *"Tecnología al servicio de la regulación familiar: monitoreo ambiental y alertas compasivas para intervenir antes de que la reactividad contamine la mesa."*
* **Prompt para Generación 3D:**
  ```text
  High-end industrial design product render. A sleek, minimal ambient device and modern smartphone on a warm wooden dinner table, glowing with a soft curved OLED screen displaying elegant audio waveforms and a serene blue heart icon. Warm morning sunlight, shallow depth of field, Apple design aesthetics, hyper-realistic 8k.
  ```

---

### [00:37 - 00:45] TOMA 4: Cierre Confrontativo para el Foro Terapéutico
* **Visual:** Lucía en el centro tomando de los hombros a Enojo Limpio y Enojo Sucio (fiel a la portada oficial `Lucia-Enojo-sucio-Enojo-Limpio.jpeg`). El fondo se funde a negro elegante. Tipografía blanca minimalista.
* **Texto Animado en Pantalla:**
  ```text
  ¿Límites que hieren o límites con respeto?
  ¿Desde cuál intervenimos hoy?
  cathykids.club
  ```
* **Voz en Off:**
  > *"En la familia y en el espacio terapéutico... ¿desde cuál de los dos estamos interviniendo? ¿A cuál decidimos alimentar hoy?"*
* **Cierre de Marca:** *"Cathy Calderón de la Barca. Herramientas clínicas para una crianza con apego seguro."*

---

## 🎛️ Pipeline de Renderizado de Voz en Pop!_OS / Linux

### Comando de Generación Inmediata (edge-tts):
```bash
uv run --with edge-tts edge-tts --voice es-MX-DaliaNeural \
  --rate="-4%" \
  --pitch="-2Hz" \
  --text "Cuando un límite se marca desde la reactividad, el cerebro infantil no procesa el aprendizaje: entra en alerta por amenaza y miedo. El Enojo Sucio contamina el vínculo... es un corazón blindado por el dolor que termina dejando a todos en soledad. Pero el enojo no tiene que reprimir su fuerza: es energía vital. Cuando nace desde el respeto, se convierte en Enojo Limpio. Tiene la firmeza para frenar la injusticia y sostener la estructura, manteniendo el corazón abierto y el apego a salvo. Son límites firmes... sin lastimar la relación. En la familia y en el espacio terapéutico... ¿desde cuál de los dos estamos interviniendo? ¿A cuál decidimos alimentar hoy?" \
  --write-media /home/marco/Proyectos/Cathy-Kids/voz_locucion_master.mp3
```

### Filtro Broadcast de Masterización de Audio (FFmpeg):
```bash
ffmpeg -i voz_locucion_master.mp3 -af "highpass=f=80,lowpass=f=12000,acompressor=threshold=-18dB:ratio=4:attack=15:release=100,volume=1.8" /home/marco/Proyectos/Cathy-Kids/voz_locucion_broadcast.wav
```
