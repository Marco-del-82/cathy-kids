#!/usr/bin/env python3
"""
Refine 45s Composite Masters for Bella and Sarah with non-overlapping pauses,
and structure the PARA_GROK folder with all assets and instructions.
"""

import os
import shutil
import subprocess

BASE_DIR = "/home/marco/Proyectos/Cathy-Kids"
GROK_DIR = os.path.join(BASE_DIR, "public/assets/PARA_GROK")
SFX_DIR = os.path.join(BASE_DIR, "public/assets/sfx")
VIDEO_DIR = os.path.join(BASE_DIR, "public/assets/video/tomas")

def build_refined_masters():
    # 1. Bella Master (Offsets: T1=0ms, T2=12000ms, T3=27500ms, T4=35500ms)
    # SFX cues: sfx1=0ms, sfx2=11500ms, sfx3=27000ms, sfx4=35000ms
    bella_dir = os.path.join(GROK_DIR, "VERSION_BELLA")
    t1_b = os.path.join(bella_dir, "01_TOMA1_enojo_sucio.mp3")
    t2_b = os.path.join(bella_dir, "02_TOMA2_enojo_limpio.mp3")
    t3_b = os.path.join(bella_dir, "03_TOMA3_mirada_lucia.mp3")
    t4_b = os.path.join(bella_dir, "04_TOMA4_cierre_pregunta.mp3")
    master_bella = os.path.join(bella_dir, "00_MASTER_45S_BELLA.mp3")
    
    sfx1 = os.path.join(SFX_DIR, "sfx_01_enojo_sucio_maza_lava.wav")
    sfx2 = os.path.join(SFX_DIR, "sfx_02_enojo_limpio_latido_60bpm.wav")
    sfx3 = os.path.join(SFX_DIR, "sfx_03_lucia_respiro_magico.wav")
    sfx4 = os.path.join(SFX_DIR, "sfx_04_cierre_acorde_dorado.wav")

    cmd_bella = [
        "ffmpeg", "-y",
        "-i", t1_b,
        "-i", t2_b,
        "-i", t3_b,
        "-i", t4_b,
        "-i", sfx1,
        "-i", sfx2,
        "-i", sfx3,
        "-i", sfx4,
        "-filter_complex", (
            "[0:a]volume=1.0,adelay=0|0,aresample=48000[v1];"
            "[1:a]volume=1.0,adelay=12000|12000,aresample=48000[v2];"
            "[2:a]volume=1.0,adelay=27500|27500,aresample=48000[v3];"
            "[3:a]volume=1.0,adelay=35500|35500,aresample=48000[v4];"
            "[4:a]volume=0.22,adelay=0|0,aresample=48000[s1];"
            "[5:a]volume=0.28,adelay=11500|11500,aresample=48000[s2];"
            "[6:a]volume=0.22,adelay=27000|27000,aresample=48000[s3];"
            "[7:a]volume=0.25,adelay=35000|35000,aresample=48000[s4];"
            "[v1][v2][v3][v4][s1][s2][s3][s4]amix=inputs=8:duration=longest:dropout_transition=2,volume=1.3[out]"
        ),
        "-map", "[out]",
        "-t", "45.0",
        "-codec:a", "libmp3lame",
        "-b:a", "256k",
        master_bella
    ]
    subprocess.run(cmd_bella, check=True)
    print(f"Refined Master BELLA generated: {master_bella}")

    # 2. Sarah Master (Offsets: T1=0ms, T2=12800ms, T3=30200ms, T4=38000ms)
    sarah_dir = os.path.join(GROK_DIR, "VERSION_SARAH")
    t1_s = os.path.join(sarah_dir, "01_TOMA1_enojo_sucio.mp3")
    t2_s = os.path.join(sarah_dir, "02_TOMA2_enojo_limpio.mp3")
    t3_s = os.path.join(sarah_dir, "03_TOMA3_mirada_lucia.mp3")
    t4_s = os.path.join(sarah_dir, "04_TOMA4_cierre_pregunta.mp3")
    master_sarah = os.path.join(sarah_dir, "00_MASTER_45S_SARAH.mp3")

    cmd_sarah = [
        "ffmpeg", "-y",
        "-i", t1_s,
        "-i", t2_s,
        "-i", t3_s,
        "-i", t4_s,
        "-i", sfx1,
        "-i", sfx2,
        "-i", sfx3,
        "-i", sfx4,
        "-filter_complex", (
            "[0:a]volume=1.0,adelay=0|0,aresample=48000[v1];"
            "[1:a]volume=1.0,adelay=12800|12800,aresample=48000[v2];"
            "[2:a]volume=1.0,adelay=30200|30200,aresample=48000[v3];"
            "[3:a]volume=1.0,adelay=38000|38000,aresample=48000[v4];"
            "[4:a]volume=0.22,adelay=0|0,aresample=48000[s1];"
            "[5:a]volume=0.28,adelay=12500|12500,aresample=48000[s2];"
            "[6:a]volume=0.22,adelay=30000|30000,aresample=48000[s3];"
            "[7:a]volume=0.25,adelay=37500|37500,aresample=48000[s4];"
            "[v1][v2][v3][v4][s1][s2][s3][s4]amix=inputs=8:duration=longest:dropout_transition=2,volume=1.3[out]"
        ),
        "-map", "[out]",
        "-t", "46.0",
        "-codec:a", "libmp3lame",
        "-b:a", "256k",
        master_sarah
    ]
    subprocess.run(cmd_sarah, check=True)
    print(f"Refined Master SARAH generated: {master_sarah}")

def package_for_grok():
    print("Organizando paquete PARA_GROK...")
    
    # 1. Video Clips
    target_video_dir = os.path.join(GROK_DIR, "CLIPS_VIDEO_720P")
    os.makedirs(target_video_dir, exist_ok=True)
    for f in ["01_enojo_sucio.mp4", "02_enojo_limpio.mp4", "03_mirada_lucia.mp4", "04_cierre_end.mp4"]:
        src = os.path.join(VIDEO_DIR, f)
        dst = os.path.join(target_video_dir, f)
        shutil.copyfile(src, dst)
        print(f"Copied video: {dst}")

    # 2. SFX Pack
    target_sfx_dir = os.path.join(GROK_DIR, "SFX_PACK")
    os.makedirs(target_sfx_dir, exist_ok=True)
    for f in os.listdir(SFX_DIR):
        if f.endswith(".wav") or f.endswith(".mp3"):
            src = os.path.join(SFX_DIR, f)
            dst = os.path.join(target_sfx_dir, f)
            shutil.copyfile(src, dst)
    print("Copied SFX pack.")

    # 3. Create INSTRUCCIONES_GROK.txt
    readme_path = os.path.join(GROK_DIR, "INSTRUCCIONES_GROK.txt")
    instructions = """================================================================================
GUÍA DE ENCAPSULACIÓN Y MONTAJE CINEMATOGRÁFICO - CATHY KIDS (45 SEGUNDOS)
================================================================================
CLIENTE: Cathy Calderón de la Barca (Cathy Kids)
OBJETIVO: Presentación clínica y psicoeducativa para terapeutas y padres.
ESTILO DE NARRACIÓN: Narradora clínica serena, empática y reflexiva. Cero dramatismo infantil burdo.

--------------------------------------------------------------------------------
1. ESTRUCTURA DE CARPETAS ENTREGADA:
--------------------------------------------------------------------------------
PARA_GROK/
├── CLIPS_VIDEO_720P/           -> 4 clips de video brutos (10.04s c/u, 24fps, H.264, 1280x720)
│   ├── 01_enojo_sucio.mp4      (Toma 1: Furia volcánica, maza, reactividad tóxica)
│   ├── 02_enojo_limpio.mp4     (Toma 2: Guardián con escudo y corazón palpitante)
│   ├── 03_mirada_lucia.mp4     (Toma 3: Lucía regulándose con respiración somática)
│   └── 04_cierre_end.mp4       (Toma 4: Cathy Calderón y la pregunta reflexiva)
│
├── VERSION_BELLA/              -> VERSIÓN RECOMENDADA (Voz cálida y humana)
│   ├── 00_MASTER_45S_BELLA.mp3 (Master continuo de 45 segundos con voces + SFX mezclados)
│   ├── 01_TOMA1_enojo_sucio.mp3 (11.1s)
│   ├── 02_TOMA2_enojo_limpio.mp3 (14.7s)
│   ├── 03_TOMA3_mirada_lucia.mp3 (6.4s)
│   └── 04_TOMA4_cierre_pregunta.mp3 (6.8s)
│
├── VERSION_SARAH/              -> VERSIÓN ALTERNATIVA (Voz más pausada y solemne)
│   ├── 00_MASTER_45S_SARAH.mp3 (Master continuo de 46 segundos con voces + SFX mezclados)
│   ├── 01_TOMA1_enojo_sucio.mp3 (12.3s)
│   ├── 02_TOMA2_enojo_limpio.mp3 (17.0s)
│   ├── 03_TOMA3_mirada_lucia.mp3 (7.4s)
│   └── 04_TOMA4_cierre_pregunta.mp3 (7.5s)
│
└── SFX_PACK/                   -> Efectos de sonido orgánicos a 48kHz (sin ruido de fondo)
    ├── sfx_01_enojo_sucio_maza_lava.wav / .mp3 (Impactos pesados con cuerpo sub-bass)
    ├── sfx_02_enojo_limpio_latido_60bpm.wav / .mp3 (Latido cardíaco 60 BPM puro)
    ├── sfx_03_lucia_respiro_magico.wav / .mp3 (Campanillas pentatónicas cálidas)
    └── sfx_04_cierre_acorde_dorado.wav / .mp3 (Acorde cinematográfico de resolución)

--------------------------------------------------------------------------------
2. MAPEO TIMELINE ESCENA POR ESCENA (45 SEGUNDOS):
--------------------------------------------------------------------------------

[ESCENA 1: 0:00 - 0:11] -> ENOJO SUCIO (LA HERIDA)
• Video: CLIPS_VIDEO_720P/01_enojo_sucio.mp4
• Audio Locución: 01_TOMA1_enojo_sucio.mp3
  Guión: "Cuando corregimos desde la reactividad y la humillación, el límite se convierte en herida. El Enojo Sucio contamina el vínculo y apaga el aprendizaje infantil por miedo."
• SFX: sfx_01_enojo_sucio_maza_lava (Impactos pesados sutiles en fondo)
• Criterio Grok: Transición visual a los 11s con cross-fade oscuro o disolución hacia la luz.

[ESCENA 2: 0:11 - 0:25] -> ENOJO LIMPIO (EL LÍMITE SANO)
• Video: CLIPS_VIDEO_720P/02_enojo_limpio.mp4
• Audio Locución: 02_TOMA2_enojo_limpio.mp3
  Guión: "Pero el enojo no se reprime: es energía vital para frenar la injusticia. Cuando nace desde el respeto, se convierte en Enojo Limpio: sostiene el límite con firmeza, manteniendo el corazón abierto y el apego a salvo."
• SFX: sfx_02_enojo_limpio_latido_60bpm (Latido fisiológico de 60 BPM sutil de fondo)
• Criterio Grok: Alargar clip 2 con cámara lenta o loop sutil si se requiere cubrir los ~14s de habla.

[ESCENA 3: 0:25 - 0:35] -> MIRADA DE LUCÍA (LA REGULACIÓN)
• Video: CLIPS_VIDEO_720P/03_mirada_lucia.mp4
• Audio Locución: 03_TOMA3_mirada_lucia.mp3
  Guión: "El niño no necesita que le quiten el enojo; necesita aprender a poner límites sin lastimar a los que ama."
• SFX: sfx_03_lucia_respiro_magico (Respiro sutil y campanillas de regulación)

[ESCENA 4: 0:35 - 0:45] -> CIERRE Y PREGUNTA ANCLA
• Video: CLIPS_VIDEO_720P/04_cierre_end.mp4
• Audio Locución: 04_TOMA4_cierre_pregunta.mp3
  Guión: "En la familia y en el espacio terapéutico... ¿desde cuál estamos interviniendo? ¿A cuál decides alimentar hoy?"
• SFX: sfx_04_cierre_acorde_dorado (Resolución armónica cálida en el fade out)

--------------------------------------------------------------------------------
3. OPCIÓN DE MONTAJE RÁPIDO:
--------------------------------------------------------------------------------
Si Grok ensambla el video completo en una sola pista:
1. Utilizar directamente "00_MASTER_45S_BELLA.mp3" como pista de audio principal.
2. Concatenar los 4 clips con transiciones de disolución cruzada (0.5s).
3. Asegurar salida en 1080p o 720p H.264 / AAC 256kbps.
================================================================================
"""
    with open(readme_path, "w", encoding="utf-8") as f:
        f.write(instructions)
    print(f"Instrucciones para Grok creadas: {readme_path}")

if __name__ == "__main__":
    build_refined_masters()
    package_for_grok()
