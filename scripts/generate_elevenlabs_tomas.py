#!/usr/bin/env python3
"""
Generate ElevenLabs voice takes for Cathy Kids:
Voices:
- Bella: hpp4J3VqNfWAUOO0d1Us
- Sarah: EXAVITQu4vr4xnSDxMaL
Script:
- T1 (01_enojo_sucio)
- T2 (02_enojo_limpio)
- T3 (03_mirada_lucia)
- T4 (04_cierre_pregunta)
"""

import os
import sys
import json
import requests
import subprocess

API_KEY = os.environ.get("ELEVENLABS_API_KEY")
if not API_KEY:
    print("❌ [ZERO-LEAK ERROR] Falta la variable 'ELEVENLABS_API_KEY' en el entorno.", file=sys.stderr)
    print("   Defínela en tu archivo .env local o exporta ELEVENLABS_API_KEY=tu_token.", file=sys.stderr)
    sys.exit(1)

BASE_DIR = "/home/marco/Proyectos/Cathy-Kids"
DEST_ROOT = os.path.join(BASE_DIR, "public/assets/PARA_GROK")

VOICES = {
    "BELLA": {
        "voice_id": "hpp4J3VqNfWAUOO0d1Us",
        "folder": os.path.join(DEST_ROOT, "VERSION_BELLA"),
        "description": "Narradora clínica serena y cálida (Bella)"
    },
    "SARAH": {
        "voice_id": "EXAVITQu4vr4xnSDxMaL",
        "folder": os.path.join(DEST_ROOT, "VERSION_SARAH"),
        "description": "Narradora clínica firme y reflexiva (Sarah)"
    }
}

TAKES = [
    {
        "id": "01_TOMA1_enojo_sucio",
        "take_label": "T1 (0:00–0:11)",
        "video_match": "01_enojo_sucio.mp4",
        "sfx_match": "sfx_01_enojo_sucio_maza_lava.mp3",
        "text": "Cuando corregimos desde la reactividad y la humillación, el límite se convierte en herida. El Enojo Sucio contamina el vínculo y apaga el aprendizaje infantil por miedo."
    },
    {
        "id": "02_TOMA2_enojo_limpio",
        "take_label": "T2 (0:11–0:23)",
        "video_match": "02_enojo_limpio.mp4",
        "sfx_match": "sfx_02_enojo_limpio_latido_60bpm.mp3",
        "text": "Pero el enojo no se reprime: es energía vital para frenar la injusticia. Cuando nace desde el respeto, se convierte en Enojo Limpio: sostiene el límite con firmeza, manteniendo el corazón abierto y el apego a salvo."
    },
    {
        "id": "03_TOMA3_mirada_lucia",
        "take_label": "T3 (0:23–0:35)",
        "video_match": "03_mirada_lucia.mp4",
        "sfx_match": "sfx_03_lucia_respiro_magico.mp3",
        "text": "El niño no necesita que le quiten el enojo; necesita aprender a poner límites sin lastimar a los que ama."
    },
    {
        "id": "04_TOMA4_cierre_pregunta",
        "take_label": "T4 (0:35–0:45)",
        "video_match": "04_cierre_end.mp4",
        "sfx_match": "sfx_04_cierre_acorde_dorado.mp3",
        "text": "En la familia y en el espacio terapéutico... ¿desde cuál estamos interviniendo? ¿A cuál decides alimentar hoy?"
    }
]

def synthesize_take(api_key, voice_id, text, out_file):
    url = f"https://api.elevenlabs.io/v1/text-to-speech/{voice_id}"
    headers = {
        "xi-api-key": api_key,
        "Content-Type": "application/json",
        "Accept": "audio/mpeg"
    }
    payload = {
        "text": text,
        "model_id": "eleven_multilingual_v2",
        "voice_settings": {
            "stability": 0.55,
            "similarity_boost": 0.85,
            "style": 0.15,
            "use_speaker_boost": True
        }
    }
    res = requests.post(url, json=payload, headers=headers, timeout=60)
    if res.status_code != 200:
        raise RuntimeError(f"ElevenLabs API Error {res.status_code}: {res.text}")
    with open(out_file, "wb") as f:
        f.write(res.content)
    
    # Check duration with ffprobe
    cmd = ["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "default=noprint_wrappers=1:nokey=1", out_file]
    dur_str = subprocess.check_output(cmd).decode().strip()
    return float(dur_str)

def main():
    print("=== INICIANDO SÍNTESIS DE VOCES ELEVENLABS PARA GROK ===")
    os.makedirs(DEST_ROOT, exist_ok=True)
    
    # 1. Prepare subdirectories
    for key, vdata in VOICES.items():
        os.makedirs(vdata["folder"], exist_ok=True)
        print(f"\n--- Generando {vdata['description']} ({key}) ---")
        
        take_audios = []
        for t in TAKES:
            out_name = f"{t['id']}.mp3"
            out_path = os.path.join(vdata["folder"], out_name)
            print(f"Sintetizando {t['id']} ({len(t['text'])} caracteres)...")
            dur = synthesize_take(API_KEY, vdata["voice_id"], t["text"], out_path)
            print(f" -> Guardado: {out_path} (Duración: {dur:.2f}s)")
            take_audios.append((out_path, dur))
        
        # Build composite 45s audio for this voice
        print(f"\nGenerando Master 45s para {key}...")
        master_out = os.path.join(vdata["folder"], f"00_MASTER_45S_{key}.mp3")
        
        # Each take corresponds to scenes: 0s, 11s, 23s, 35s
        # We place each take at its exact storyboard offset
        t1, t2, t3, t4 = [item[0] for item in take_audios]
        sfx_dir = os.path.join(BASE_DIR, "public/assets/sfx")
        sfx1 = os.path.join(sfx_dir, "sfx_01_enojo_sucio_maza_lava.wav")
        sfx2 = os.path.join(sfx_dir, "sfx_02_enojo_limpio_latido_60bpm.wav")
        sfx3 = os.path.join(sfx_dir, "sfx_03_lucia_respiro_magico.wav")
        sfx4 = os.path.join(sfx_dir, "sfx_04_cierre_acorde_dorado.wav")
        
        # Audio delays in milliseconds:
        # T1: 0ms
        # T2: 11000ms
        # T3: 23000ms
        # T4: 35000ms
        cmd_master = [
            "ffmpeg", "-y",
            "-i", t1,
            "-i", t2,
            "-i", t3,
            "-i", t4,
            "-i", sfx1,
            "-i", sfx2,
            "-i", sfx3,
            "-i", sfx4,
            "-filter_complex", (
                "[0:a]volume=1.0,adelay=0|0,aresample=48000[v1];"
                "[1:a]volume=1.0,adelay=11000|11000,aresample=48000[v2];"
                "[2:a]volume=1.0,adelay=23000|23000,aresample=48000[v3];"
                "[3:a]volume=1.0,adelay=35000|35000,aresample=48000[v4];"
                "[4:a]volume=0.20,adelay=0|0,aresample=48000[s1];"
                "[5:a]volume=0.25,adelay=11000|11000,aresample=48000[s2];"
                "[6:a]volume=0.20,adelay=23000|23000,aresample=48000[s3];"
                "[7:a]volume=0.22,adelay=35000|35000,aresample=48000[s4];"
                "[v1][v2][v3][v4][s1][s2][s3][s4]amix=inputs=8:duration=longest:dropout_transition=2,volume=1.3[out]"
            ),
            "-map", "[out]",
            "-t", "45.0",
            "-codec:a", "libmp3lame",
            "-b:a", "256k",
            master_out
        ]
        subprocess.run(cmd_master, check=True)
        print(f"Master creado: {master_out}")

    print("\n=== SÍNTESIS ELEVENLABS COMPLETADA CON ÉXITO ===")

if __name__ == "__main__":
    main()
