#!/usr/bin/env python3
"""
Audio and SFX Production Engine for Cathy Kids 45s Storyboard.
REVISED: Zero noise, zero harsh sine tones, pure studio broadcast quality.
- Heartbeat: Organic 60 BPM (Lub-Dub) with absolute silence between beats.
- Mace impacts: Low-passed heavy cinematic punches (no screeching metal beeps).
- Chimes: Exponential decaying harmonic bells (no static hiss).
- Closure: Warm harmonic cinematic swell.
"""

import os
import asyncio
import subprocess
import numpy as np
from scipy.io import wavfile
import edge_tts

SFX_DIR = "/home/marco/Proyectos/Cathy-Kids/public/assets/sfx"
AUDIO_DIR = "/home/marco/Proyectos/Cathy-Kids/public/assets/audio"
PUBLIC_AUDIO_DIR = "/home/marco/Proyectos/Cathy-Kids/public/audio"

os.makedirs(SFX_DIR, exist_ok=True)
os.makedirs(AUDIO_DIR, exist_ok=True)
os.makedirs(PUBLIC_AUDIO_DIR, exist_ok=True)

SAMPLE_RATE = 44100

def generate_sfx_01_enojo_sucio():
    """SFX 1: Heavy cinematic thuds (spiked mace impacts) with warm sub-bass punch (11s).
       ZERO WHITE NOISE, ZERO CONTINUOUS HUM."""
    duration = 11.0
    t = np.linspace(0, duration, int(SAMPLE_RATE * duration), endpoint=False)
    signal = np.zeros_like(t)

    # Two distinct cinematic impacts at t=2.0s and t=6.5s
    for hit_time in [2.0, 6.5]:
        hit_idx = int(hit_time * SAMPLE_RATE)
        hit_len = int(0.8 * SAMPLE_RATE)
        if hit_idx + hit_len < len(t):
            t_hit = np.linspace(0, 0.8, hit_len, endpoint=False)
            decay = np.exp(-7.0 * t_hit) # Fast, natural acoustic decay
            # Warm sub-bass punch (55 Hz decaying to 35 Hz) + subtle mid transient (180 Hz)
            freq_drop = 55.0 * np.exp(-4.0 * t_hit) + 35.0
            thump = np.sin(2 * np.pi * freq_drop * t_hit)
            body = 0.3 * np.sin(2 * np.pi * 180 * t_hit) * np.exp(-12.0 * t_hit)
            signal[hit_idx:hit_idx + hit_len] += (thump + body) * decay * 0.7

    signal = np.clip(signal, -0.90, 0.90)
    out_path = os.path.join(SFX_DIR, "sfx_01_enojo_sucio_maza_lava.wav")
    wavfile.write(out_path, SAMPLE_RATE, (signal * 32767).astype(np.int16))
    print(f"Generated clean SFX 1: {out_path}")
    return out_path

def generate_sfx_02_enojo_limpio():
    """SFX 2: Physiological 60 BPM Heartbeat (Lub-Dub, exactly 1 beat per second).
       ZERO CONTINUOUS SINE WHISTLE, absolute silence between beats."""
    duration = 12.0
    t = np.linspace(0, duration, int(SAMPLE_RATE * duration), endpoint=False)
    signal = np.zeros_like(t)

    # 60 BPM = 1 beat every 1.0 second
    for beat in range(int(duration)):
        beat_start = beat * 1.0
        
        # Lub (S1 sound: 48 Hz, 0.12s duration, Hann envelope)
        idx_lub = int(beat_start * SAMPLE_RATE)
        len_lub = int(0.12 * SAMPLE_RATE)
        if idx_lub + len_lub < len(t):
            t_lub = np.linspace(0, 0.12, len_lub, endpoint=False)
            env_lub = np.sin(np.pi * t_lub / 0.12) ** 2
            signal[idx_lub:idx_lub + len_lub] += 0.65 * np.sin(2 * np.pi * 48 * t_lub) * env_lub
            
        # Dub (S2 sound: 62 Hz, 0.09s duration, Hann envelope, delayed by 0.26s)
        idx_dub = int((beat_start + 0.26) * SAMPLE_RATE)
        len_dub = int(0.09 * SAMPLE_RATE)
        if idx_dub + len_dub < len(t):
            t_dub = np.linspace(0, 0.09, len_dub, endpoint=False)
            env_dub = np.sin(np.pi * t_dub / 0.09) ** 2
            signal[idx_dub:idx_dub + len_dub] += 0.50 * np.sin(2 * np.pi * 62 * t_dub) * env_dub

    # Zero background whistle: signal remains completely silent between pulses!
    signal = np.clip(signal, -0.90, 0.90)
    out_path = os.path.join(SFX_DIR, "sfx_02_enojo_limpio_latido_60bpm.wav")
    wavfile.write(out_path, SAMPLE_RATE, (signal * 32767).astype(np.int16))
    print(f"Generated clean SFX 2 (no whistle): {out_path}")
    return out_path

def generate_sfx_03_lucia_respiro():
    """SFX 3: Gentle fairy-tale sparkle chimes at t=6.0s (12s).
       ZERO WHITE NOISE, pure crystalline harmonic decay."""
    duration = 12.0
    t = np.linspace(0, duration, int(SAMPLE_RATE * duration), endpoint=False)
    signal = np.zeros_like(t)

    # Sweet pentatonic glockenspiel notes (C6, D6, E6, G6, A6)
    chime_freqs = [1046.5, 1174.6, 1318.5, 1567.9, 1760.0]
    for i, freq in enumerate(chime_freqs):
        c_time = 5.5 + i * 0.25
        c_idx = int(c_time * SAMPLE_RATE)
        c_len = int(1.4 * SAMPLE_RATE)
        if c_idx + c_len < len(t):
            t_c = np.linspace(0, 1.4, c_len, endpoint=False)
            decay_c = np.exp(-4.5 * t_c)
            # Fundamental + soft octave harmonic
            tone = np.sin(2 * np.pi * freq * t_c) + 0.2 * np.sin(2 * np.pi * freq * 2 * t_c)
            signal[c_idx:c_idx + c_len] += 0.22 * tone * decay_c

    signal = np.clip(signal, -0.90, 0.90)
    out_path = os.path.join(SFX_DIR, "sfx_03_lucia_respiro_magico.wav")
    wavfile.write(out_path, SAMPLE_RATE, (signal * 32767).astype(np.int16))
    print(f"Generated clean SFX 3: {out_path}")
    return out_path

def generate_sfx_04_cierre_acorde():
    """SFX 4: Warm cinematic closure chord with smooth parabolic fade-in and long fade-out (10s)."""
    duration = 10.0
    t = np.linspace(0, duration, int(SAMPLE_RATE * duration), endpoint=False)
    
    # Warm chord (Fa Mayor: F3 174.6Hz, C4 261.6Hz, A4 440.0Hz)
    attack_len = int(2.5 * SAMPLE_RATE)
    decay_len = len(t) - attack_len
    envelope = np.concatenate([
        np.linspace(0, 1, attack_len) ** 2,
        np.linspace(1, 0, decay_len) ** 1.5
    ])
    
    chord = (
        0.35 * np.sin(2 * np.pi * 174.61 * t) +
        0.25 * np.sin(2 * np.pi * 261.63 * t) +
        0.20 * np.sin(2 * np.pi * 440.00 * t)
    ) * envelope * 0.4

    signal = np.clip(chord, -0.90, 0.90)
    out_path = os.path.join(SFX_DIR, "sfx_04_cierre_acorde_dorado.wav")
    wavfile.write(out_path, SAMPLE_RATE, (signal * 32767).astype(np.int16))
    print(f"Generated clean SFX 4: {out_path}")
    return out_path

async def generate_character_voices():
    """Generates the 4 canonical character lines with tailored voice prosody and pitch"""
    voice_tasks = [
        {
            "id": "toma1_enojo_sucio",
            "voice": "es-MX-JorgeNeural",
            "pitch": "-12Hz",
            "rate": "+6%",
            "text": "¡Todo me molesta! ¡Si me hieren, yo grito más fuerte para defenderme!",
            "character": "Enojo Sucio (Monstruo de Lava)",
            "mp3_out": os.path.join(AUDIO_DIR, "voz_storyboard_toma1_enojo_sucio.mp3")
        },
        {
            "id": "toma2_enojo_limpio",
            "voice": "es-MX-JorgeNeural",
            "pitch": "-4Hz",
            "rate": "-4%",
            "text": "¡Para! No me gusta. El enojo no es para destruir; es mi fuerza para poner límites con amor y cuidar nuestro corazón.",
            "character": "Enojo Limpio (Guardián con Corazón)",
            "mp3_out": os.path.join(AUDIO_DIR, "voz_storyboard_toma2_enojo_limpio.mp3")
        },
        {
            "id": "toma3_lucia",
            "voice": "es-MX-DaliaNeural",
            "pitch": "+24Hz",
            "rate": "+5%",
            "text": "A veces siento el volcán en el pecho... pero respiro profundo y elijo no lastimar a los que amo. ¡Elijo la luz del Enojo Limpio!",
            "character": "Lucía (6 Años • La Domadora)",
            "mp3_out": os.path.join(AUDIO_DIR, "voz_storyboard_toma3_lucia.mp3")
        },
        {
            "id": "toma4_cathy_calderon",
            "voice": "es-MX-DaliaNeural",
            "pitch": "-2Hz",
            "rate": "-3%",
            "text": "En la familia y en el espacio terapéutico... ¿desde cuál de los dos estamos interviniendo? ¿A cuál decides alimentar hoy?",
            "character": "Cathy Calderón de la Barca (Pregunta Ancla)",
            "mp3_out": os.path.join(AUDIO_DIR, "voz_storyboard_toma4_cathy_pregunta.mp3")
        }
    ]

    import shutil
    for item in voice_tasks:
        print(f"Synthesizing voice for {item['character']}...")
        communicate = edge_tts.Communicate(item["text"], item["voice"], pitch=item["pitch"], rate=item["rate"])
        await communicate.save(item["mp3_out"])
        print(f"Saved: {item['mp3_out']}")
        
        # Copy to public/audio/ for frontend selector
        if item["id"] == "toma1_enojo_sucio":
            shutil.copyfile(item["mp3_out"], os.path.join(PUBLIC_AUDIO_DIR, "enojo_sucio_voice.mp3"))
        elif item["id"] == "toma2_enojo_limpio":
            shutil.copyfile(item["mp3_out"], os.path.join(PUBLIC_AUDIO_DIR, "enojo_limpio_voice.mp3"))
        elif item["id"] == "toma3_lucia":
            shutil.copyfile(item["mp3_out"], os.path.join(PUBLIC_AUDIO_DIR, "lucia_voice.mp3"))

def convert_sfx_to_mp3():
    """Converts clean SFX to MP3"""
    for fname in os.listdir(SFX_DIR):
        if fname.endswith(".wav"):
            base = os.path.splitext(fname)[0]
            wav_path = os.path.join(SFX_DIR, fname)
            mp3_path = os.path.join(SFX_DIR, f"{base}.mp3")
            subprocess.run([
                "ffmpeg", "-y", "-i", wav_path,
                "-codec:a", "libmp3lame", "-b:a", "192k",
                mp3_path
            ], capture_output=True, check=True)
            print(f"Converted clean SFX to MP3: {mp3_path}")

def build_composite_master():
    """Assembles a clean, pristine 45s audio master:
       Studio voiceover + subtle sub-bass heartbeat (NO hiss, NO whistling)."""
    print("Building pristine 45s audio master...")
    master_mp3 = os.path.join(AUDIO_DIR, "cathy_kids_master_45s_con_sfx.mp3")
    master_wav = os.path.join(AUDIO_DIR, "cathy_kids_master_45s_con_sfx.wav")
    
    # Mix with delicate, subtle levels so voice is 100% intelligible and background is dead silent
    cmd = [
        "ffmpeg", "-y",
        "-i", "/home/marco/Proyectos/Cathy-Kids/public/voz_locucion_broadcast.wav",
        "-i", os.path.join(SFX_DIR, "sfx_01_enojo_sucio_maza_lava.wav"),
        "-i", os.path.join(SFX_DIR, "sfx_02_enojo_limpio_latido_60bpm.wav"),
        "-i", os.path.join(SFX_DIR, "sfx_03_lucia_respiro_magico.wav"),
        "-i", os.path.join(SFX_DIR, "sfx_04_cierre_acorde_dorado.wav"),
        "-filter_complex", (
            "[1:a]volume=0.25,adelay=0|0[sfx1];"
            "[2:a]volume=0.35,adelay=11000|11000[sfx2];"
            "[3:a]volume=0.20,adelay=23000|23000[sfx3];"
            "[4:a]volume=0.25,adelay=35000|35000[sfx4];"
            "[0:a]volume=1.0[voice];"
            "[voice][sfx1][sfx2][sfx3][sfx4]amix=inputs=5:duration=first:dropout_transition=2[out]"
        ),
        "-map", "[out]",
        "-codec:a", "libmp3lame",
        "-b:a", "256k",
        master_mp3
    ]
    subprocess.run(cmd, check=True)
    subprocess.run(["ffmpeg", "-y", "-i", master_mp3, master_wav], check=True)
    print(f"Pristine Master Composite Created: {master_mp3}")

if __name__ == "__main__":
    print("=== PRODUCING PRISTINE AUDIO (NO HISS / NO WHISTLE) ===")
    generate_sfx_01_enojo_sucio()
    generate_sfx_02_enojo_limpio()
    generate_sfx_03_lucia_respiro()
    generate_sfx_04_cierre_acorde()
    convert_sfx_to_mp3()
    asyncio.run(generate_character_voices())
    build_composite_master()
    print("=== AUDIO RE-MASTERING COMPLETE ===")
