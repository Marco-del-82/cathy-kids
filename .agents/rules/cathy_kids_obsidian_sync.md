# Directriz Obligatoria: Sincronización con Obsidian & Pipeline de Video Cathy Kids

## 1. Sincronización Obligatoria con Obsidian Vault
* **Ruta Maestra del Vault:**
  `/home/marco/Proyectos/SEYER-VENTAS/vault/01_CLIENTES/CATHY_KIDS/`
* **Regla de Documentación:**
  Cada hito arquitectónico, nuevo pipeline de generación (SFX, voces ElevenLabs, prompts Grok), rediseño de componentes o auditoría post-mortem DEBE registrarse inmediatamente como un documento Markdown dentro de este directorio con metadatos YAML frontmatter canónicos (`type`, `vault`, `cliente`, `tags`).
* **Enlazado de Nodos:**
  Los documentos deben mantener la interconexión de grafo bidireccional de Obsidian utilizando sintaxis `[[NOMBRE_DOCUMENTO]]` referenciando los nodos existentes:
  - `[[STORYBOARD_MAESTRO_45S_PRODUCCION]]`
  - `[[ESTRATEGIA_TRANSMEDIA_PHYGITAL_CATHY_KIDS]]`
  - `[[DOSSIER_CLIENTE_CATHY_KIDS]]`
  - `[[AUDITORIA_POSTMORTEM_VIDEO_IOS_STREAMING]]`

## 2. Invariantes de Medios y Pipeline de Video (Regla de Cero Regresiones)
* **Protección del Master:**
  Queda estrictamente PROHIBIDO sobreescribir los archivos maestros `public/video/cortometraje_45s.mp4` o `public/video/videobeta.mp4` con previews estáticos o borradores temporales.
* **Estándar Universal de Codificación (iOS + Android + Web):**
  Cualquier video que se sirva en producción debe cumplir sin excepción con:
  - **Codec:** H.264 (AVC) con **Profile High, Level 4.1** o inferior (el hardware decoder de Apple rechaza Level 4.2+ y Level 6.x en iPhone).
  - **Pixel Format:** `yuv420p` estricto (no yuv444p).
  - **FastStart:** `-movflags +faststart` obligatorio para ubicar el átomo `moov` al byte 0 (permite streaming progresivo instantáneo).
  - **Audio:** AAC estéreo a 48,000 Hz, bitrate entre 128 kbps y 192 kbps.
* **Geometría y Render en UI:**
  El elemento `<video>` en el frontend debe emplear `object-contain` en lugar de `object-cover` para preservar el encuadre 16:9 y erradicar cualquier deformación de aspecto ("alargar pantalla") en dispositivos móviles y monitores ultrawide.
