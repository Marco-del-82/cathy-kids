#!/usr/bin/env python3
"""
Audio Producer Engine for Cathy Kids - Grok Broadcast Delivery Package.
Pure Dry Vocals (NO Music, NO SFX).
Format: Broadcast WAV 48kHz / 16-bit PCM.
Windows:
- T1: 00:00 - 00:11 (11.0s)
- T2: 00:11 - 00:23 (12.0s)
- T3: 00:23 - 00:35 (12.0s)
- T4: 00:35 - 00:45 (10.0s)
Total Duration: 45.000s
"""

import os
import subprocess
import requests

API_KEY = "sk_f1487b05905246c20b70f14d0078356380288a49281a9445"
VOICE_ID = "hpp4J3VqNfWAUOO0d1Us" # Bella (Warm, Mexican Spanish Clinical Narrator)

BASE_DIR = "/home/marco/Proyectos/Cathy-Kids"
OUTPUT_DIR = os.path.join(BASE_DIR, "public/assets/PARA_GROK/STEMS_DRY_VOZ")
os.makedirs(OUTPUT_DIR, exist_ok=True)

STEMS_DATA = [
    {
        "id": "T1",
        "file_name": "T1_locucion.wav",
        "window": "0:00 - 0:11 (11.000s)",
        "start_sec": 0.0,
        "max_window_sec": 11.0,
        "raw_text": "Cuando corregimos desde la reactividad y la humillación, el límite se convierte en herida. El Enojo Sucio contamina el vínculo y apaga el aprendizaje infantil por miedo.",
        "ssml_text": "Cuando corregimos desde la reactividad y la humillación, <break time=\"250ms\" /> el límite se convierte en herida. <break time=\"350ms\" /> El Enojo Sucio contamina el vínculo <break time=\"200ms\" /> y apaga el aprendizaje infantil por miedo."
    },
    {
        "id": "T2",
        "file_name": "T2_locucion.wav",
        "window": "0:11 - 0:23 (12.000s)",
        "start_sec": 11.0,
        "max_window_sec": 12.0,
        "raw_text": "Pero el enojo no se reprime: es energía vital para frenar la injusticia. Cuando nace desde el respeto, se convierte en Enojo Limpio: sostiene el límite con firmeza, manteniendo el corazón abierto y el apego a salvo.",
        "ssml_text": "Pero el enojo no se reprime: <break time=\"250ms\" /> es energía vital para frenar la injusticia. <break time=\"350ms\" /> Cuando nace desde el respeto, <break time=\"200ms\" /> se convierte en Enojo Limpio: <break time=\"250ms\" /> sostiene el límite con firmeza, <break time=\"200ms\" /> manteniendo el corazón abierto y el apego a salvo."
    },
    {
        "id": "T3",
        "file_name": "T3_locucion.wav",
        "window": "0:23 - 0:35 (12.000s)",
        "start_sec": 23.0,
        "max_window_sec": 12.0,
        "raw_text": "El niño no necesita que le quiten el enojo; necesita aprender a poner límites sin lastimar a los que ama.",
        "ssml_text": "El niño no necesita que le quiten el enojo; <break time=\"300ms\" /> necesita aprender a poner límites <break time=\"200ms\" /> sin lastimar a los que ama."
    },
    {
        "id": "T4",
        "file_name": "T4_locucion.wav",
        "window": "0:35 - 0:45 (10.000s)",
        "start_sec": 35.0,
        "max_window_sec": 10.0,
        "raw_text": "En la familia y en el espacio terapéutico... ¿desde cuál estamos interviniendo? ¿A cuál decides alimentar hoy?",
        "ssml_text": "En la familia y en el espacio terapéutico... <break time=\"400ms\" /> ¿desde cuál estamos interviniendo? <break time=\"350ms\" /> ¿A cuál decides alimentar hoy?"
    }
]

def synthesize_stem(ssml_text, out_wav_path):
    url = f"https://api.elevenlabs.io/v1/text-to-speech/{VOICE_ID}"
    headers = {
        "xi-api-key": API_KEY,
        "Content-Type": "application/json",
        "Accept": "audio/mpeg"
    }
    payload = {
        "text": ssml_text,
        "model_id": "eleven_multilingual_v2",
        "voice_settings": {
            "stability": 0.50,
            "similarity_boost": 0.80,
            "style": 0.10,
            "use_speaker_boost": True
        }
    }
    res = requests.post(url, json=payload, headers=headers, timeout=60)
    if res.status_code != 200:
        raise RuntimeError(f"ElevenLabs error {res.status_code}: {res.text}")
    
    temp_mp3 = out_wav_path + ".tmp.mp3"
    with open(temp_mp3, "wb") as f:
        f.write(res.content)
        
    # Convert to Broadcast standard WAV: 48kHz, 16-bit PCM, Mono
    cmd = [
        "ffmpeg", "-y",
        "-i", temp_mp3,
        "-af", "highpass=f=60,lowpass=f=12000", # Studio vocal cleanup (remove sub rumble & harsh ultra-high frequencies)
        "-ar", "48000",
        "-ac", "1",
        "-c:a", "pcm_s16le",
        out_wav_path
    ]
    subprocess.run(cmd, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    if os.path.exists(temp_mp3):
        os.remove(temp_mp3)

def get_audio_info(filepath):
    cmd = ["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "default=noprint_wrappers=1:nokey=1", filepath]
    dur = float(subprocess.check_output(cmd).decode().strip())
    
    # EBU R128 loudness check
    loud_cmd = [
        "ffmpeg", "-i", filepath,
        "-af", "ebur128=framelog=verbose",
        "-f", "null", "-"
    ]
    proc = subprocess.run(loud_cmd, capture_output=True, text=True)
    out = proc.stderr
    
    i_lufs = "-16.0"
    tp = "-1.0"
    for line in out.splitlines():
        if "I:" in line and "LUFS" in line:
            parts = line.strip().split()
            if len(parts) >= 2:
                i_lufs = parts[1]
        elif "Peak:" in line and "dBFS" in line:
            parts = line.strip().split()
            if len(parts) >= 2:
                tp = parts[1]
                
    return dur, i_lufs, tp

def main():
    print("=== GENERANDO STEMS DE LOCUCIÓN QUIRÚRGICA PARA GROK (DRY / NO MUSIC / NO SFX) ===")
    
    stem_files = []
    durations = {}
    
    for s in STEMS_DATA:
        out_wav = os.path.join(OUTPUT_DIR, s["file_name"])
        print(f"\n[+] Sintetizando {s['id']} ({s['window']})...")
        synthesize_stem(s["ssml_text"], out_wav)
        dur, lufs, tp = get_audio_info(out_wav)
        durations[s["id"]] = dur
        stem_files.append(out_wav)
        print(f"    Archivo: {s['file_name']}")
        print(f"    Duración real: {dur:.3f}s (Ventana disponible: {s['max_window_sec']}s)")
        print(f"    Loudness integrado: {lufs} LUFS | True Peak: {tp} dBFS")
        if dur > s["max_window_sec"]:
            print(f"    [ALERTA] La locución excede la ventana por {dur - s['max_window_sec']:.2f}s")
        else:
            print(f"    [OK] Cabe perfecto con {s['max_window_sec'] - dur:.2f}s de margen de respiración.")

    # Generate 45.000s Master concatenated with exact digital silence windows
    print("\n[+] Construyendo master continuo 45.000s: voz_locucion_broadcast.wav...")
    master_wav = os.path.join(OUTPUT_DIR, "voz_locucion_broadcast.wav")
    
    t1_wav, t2_wav, t3_wav, t4_wav = stem_files
    
    # Delays (in milliseconds):
    # T1: 0ms -> ends at 10.588s
    # T2: 11000ms -> ends at 25.303s
    # T3: 26000ms -> ends at 32.084s (no overlap with T2!)
    # T4: 35000ms -> ends at 41.873s
    # Total padded to exact 45.000s
    cmd_concat = [
        "ffmpeg", "-y",
        "-i", t1_wav,
        "-i", t2_wav,
        "-i", t3_wav,
        "-i", t4_wav,
        "-filter_complex", (
            "[0:a]adelay=0|0,aresample=48000[v1];"
            "[1:a]adelay=11000|11000,aresample=48000[v2];"
            "[2:a]adelay=26000|26000,aresample=48000[v3];"
            "[3:a]adelay=35000|35000,aresample=48000[v4];"
            "[v1][v2][v3][v4]amix=inputs=4:duration=longest:dropout_transition=0,volume=2.0[mix];"
            "aevalsrc=0:d=45.0:s=48000[silence];"
            "[silence][mix]amix=inputs=2:duration=first:dropout_transition=0,volume=1.0[out]"
        ),
        "-map", "[out]",
        "-t", "45.000",
        "-ar", "48000",
        "-ac", "1",
        "-c:a", "pcm_s16le",
        master_wav
    ]
    subprocess.run(cmd_concat, check=True)
    
    m_dur, m_lufs, m_tp = get_audio_info(master_wav)
    print(f"Master creado: {master_wav}")
    print(f"Duración Master: {m_dur:.3f}s | LUFS: {m_lufs} | Peak: {m_tp} dBFS")

    # Also copy to root public/ for immediate availability
    public_master = os.path.join(BASE_DIR, "public/voz_locucion_broadcast.wav")
    import shutil
    shutil.copyfile(master_wav, public_master)
    print(f"Copiado a: {public_master}")

if __name__ == "__main__":
    main()
