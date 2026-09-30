#!/usr/bin/env python3
"""
Audio and SFX Production Engine for Cathy Kids 45s Storyboard.
Generates:
1. Professional Sound Effects (SFX / Foley) with physiological 60 BPM heartbeat, mace impact, breath, and cinematic chords.
2. High-fidelity Character Voices using Neural TTS with custom acoustic modulation (Pitch, Rate, Post-processing).
3. Synchronized stem files for Grok Video AI.
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
    """SFX 1: Heavy monster footsteps, iron mace clang, sub-bass seismic tension (11 seconds)"""
    duration = 11.0
    t = np.linspace(0, duration, int(SAMPLE_RATE * duration), endpoint=False)
    
    # 1. Sub-bass amydala drone (55 Hz with slow throbbing LFO)
    lfo = 0.5 * (1 + np.sin(2 * np.pi * 0.8 * t))
    drone = 0.35 * np.sin(2 * np.pi * 55 * t) * lfo
    
    # 2. Embers / crackle texture (filtered noise)
    noise = np.random.normal(0, 0.05, len(t))
    
    # 3. Two heavy spiked mace impacts at t=2.0s and t=6.5s
    impacts = np.zeros_like(t)
    for hit_time in [2.0, 6.5]:
        hit_idx = int(hit_time * SAMPLE_RATE)
        hit_len = int(1.2 * SAMPLE_RATE)
        if hit_idx + hit_len < len(t):
            t_hit = np.linspace(0, 1.2, hit_len, endpoint=False)
            decay = np.exp(-5.0 * t_hit)
            # Metallic ring (880 Hz + 1320 Hz) + heavy low thump (65 Hz)
            metallic = 0.5 * np.sin(2 * np.pi * 880 * t_hit) + 0.3 * np.sin(2 * np.pi * 1320 * t_hit)
            thump = 0.7 * np.sin(2 * np.pi * 65 * t_hit)
            impacts[hit_idx:hit_idx + hit_len] += (metallic + thump) * decay
            
    signal = drone + noise * 0.2 + impacts
    signal = np.clip(signal, -0.95, 0.95)
    out_path = os.path.join(SFX_DIR, "sfx_01_enojo_sucio_maza_lava.wav")
    wavfile.write(out_path, SAMPLE_RATE, (signal * 32767).astype(np.int16))
    print(f"Generated: {out_path}")
    return out_path

def generate_sfx_02_enojo_limpio():
    """SFX 2: Physiological 60 BPM Heartbeat (LUB-DUB at 1.0s interval) + soothing celestial pulse (12 seconds)"""
    duration = 12.0
    t = np.linspace(0, duration, int(SAMPLE_RATE * duration), endpoint=False)
    signal = np.zeros_like(t)
    
    # 60 BPM = exactly 1 beat per second
    for beat in range(int(duration)):
        beat_start = beat * 1.0
        
        # Lub (S1 sound: 45-55 Hz, ~0.14s)
        idx_lub = int(beat_start * SAMPLE_RATE)
        len_lub = int(0.14 * SAMPLE_RATE)
        if idx_lub + len_lub < len(t):
            t_lub = np.linspace(0, 0.14, len_lub, endpoint=False)
            decay_lub = np.sin(np.pi * t_lub / 0.14)
            signal[idx_lub:idx_lub + len_lub] += 0.7 * np.sin(2 * np.pi * 50 * t_lub) * decay_lub
            
        # Dub (S2 sound: 65-75 Hz, ~0.10s, delayed by 0.28s)
        idx_dub = int((beat_start + 0.28) * SAMPLE_RATE)
        len_dub = int(0.10 * SAMPLE_RATE)
        if idx_dub + len_dub < len(t):
            t_dub = np.linspace(0, 0.10, len_dub, endpoint=False)
            decay_dub = np.sin(np.pi * t_dub / 0.10)
            signal[idx_dub:idx_dub + len_dub] += 0.55 * np.sin(2 * np.pi * 70 * t_dub) * decay_dub

    # Celestial warm protective resonance (sine chords: 432 Hz, 648 Hz soft warm pad)
    warm_pad = 0.08 * (np.sin(2 * np.pi * 432 * t) + np.sin(2 * np.pi * 648 * t))
    signal += warm_pad
    signal = np.clip(signal, -0.95, 0.95)
    out_path = os.path.join(SFX_DIR, "sfx_02_enojo_limpio_latido_60bpm.wav")
    wavfile.write(out_path, SAMPLE_RATE, (signal * 32767).astype(np.int16))
    print(f"Generated: {out_path}")
    return out_path

def generate_sfx_03_lucia_respiro():
    """SFX 3: Somatic breath inhalation + fairy tale sparkle chimes (12 seconds)"""
    duration = 12.0
    t = np.linspace(0, duration, int(SAMPLE_RATE * duration), endpoint=False)
    
    # Filtered shaped white noise simulating deep calm breath (in at 1.5s, hold, exhale at 4.0s)
    breath = np.zeros_like(t)
    idx_in = int(1.5 * SAMPLE_RATE)
    len_in = int(2.0 * SAMPLE_RATE)
    if idx_in + len_in < len(t):
        t_in = np.linspace(0, 1, len_in)
        envelope_in = np.sin(np.pi * t_in) ** 2
        breath[idx_in:idx_in + len_in] = np.random.normal(0, 0.25, len_in) * envelope_in

    idx_out = int(4.2 * SAMPLE_RATE)
    len_out = int(2.5 * SAMPLE_RATE)
    if idx_out + len_out < len(t):
        t_out = np.linspace(0, 1, len_out)
        envelope_out = np.sin(np.pi * t_out) ** 2
        breath[idx_out:idx_out + len_out] = np.random.normal(0, 0.20, len_out) * envelope_out

    # Magical sparkle chimes at t=7.0s (Pentatonic glockenspiel frequencies: 1046, 1174, 1318, 1567, 1760 Hz)
    chimes = np.zeros_like(t)
    chime_freqs = [1046.5, 1174.6, 1318.5, 1567.9, 1760.0, 2093.0]
    for i, freq in enumerate(chime_freqs):
        c_time = 7.0 + i * 0.18
        c_idx = int(c_time * SAMPLE_RATE)
        c_len = int(1.5 * SAMPLE_RATE)
        if c_idx + c_len < len(t):
            t_c = np.linspace(0, 1.5, c_len, endpoint=False)
            decay_c = np.exp(-3.5 * t_c)
            chimes[c_idx:c_idx + c_len] += 0.25 * np.sin(2 * np.pi * freq * t_c) * decay_c

    signal = breath * 0.4 + chimes
    signal = np.clip(signal, -0.95, 0.95)
    out_path = os.path.join(SFX_DIR, "sfx_03_lucia_respiro_magico.wav")
    wavfile.write(out_path, SAMPLE_RATE, (signal * 32767).astype(np.int16))
    print(f"Generated: {out_path}")
    return out_path

def generate_sfx_04_cierre_acorde():
    """SFX 4: Warm cinematic closure chord swell & golden harmonic resolve (10 seconds)"""
    duration = 10.0
    t = np.linspace(0, duration, int(SAMPLE_RATE * duration), endpoint=False)
    
    # Warm orchestral major chord (F major 9: F3, C4, E4, G4, A4 -> 174.6, 261.6, 329.6, 392.0, 440.0 Hz)
    envelope = np.zeros_like(t)
    # Slow attack (3s), long smooth decay (7s)
    attack_len = int(3.0 * SAMPLE_RATE)
    envelope[:attack_len] = np.linspace(0, 1, attack_len) ** 1.5
    decay_len = len(t) - attack_len
    envelope[attack_len:] = np.linspace(1, 0, decay_len) ** 0.8
    
    chord = (
        0.30 * np.sin(2 * np.pi * 174.61 * t) +
        0.25 * np.sin(2 * np.pi * 261.63 * t) +
        0.20 * np.sin(2 * np.pi * 329.63 * t) +
        0.20 * np.sin(2 * np.pi * 392.00 * t) +
        0.15 * np.sin(2 * np.pi * 440.00 * t)
    ) * envelope

    signal = np.clip(chord, -0.95, 0.95)
    out_path = os.path.join(SFX_DIR, "sfx_04_cierre_acorde_dorado.wav")
    wavfile.write(out_path, SAMPLE_RATE, (signal * 32767).astype(np.int16))
    print(f"Generated: {out_path}")
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

    for item in voice_tasks:
        print(f"Synthesizing voice for {item['character']}...")
        communicate = edge_tts.Communicate(item["text"], item["voice"], pitch=item["pitch"], rate=item["rate"])
        await communicate.save(item["mp3_out"])
        print(f"Saved: {item['mp3_out']}")
        
        # Also copy to public/audio/ for frontend selector
        if item["id"] == "toma1_enojo_sucio":
            import shutil
            shutil.copyfile(item["mp3_out"], os.path.join(PUBLIC_AUDIO_DIR, "enojo_sucio_voice.mp3"))
        elif item["id"] == "toma2_enojo_limpio":
            import shutil
            shutil.copyfile(item["mp3_out"], os.path.join(PUBLIC_AUDIO_DIR, "enojo_limpio_voice.mp3"))
        elif item["id"] == "toma3_lucia":
            import shutil
            shutil.copyfile(item["mp3_out"], os.path.join(PUBLIC_AUDIO_DIR, "lucia_voice.mp3"))

def convert_sfx_to_mp3():
    """Ensures all SFX are available in both WAV and lightweight MP3 for web streaming"""
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
            print(f"Converted SFX to MP3: {mp3_path}")

def build_composite_master():
    """Assembles a 45s audio track layering narration + character voices + physiological SFX"""
    print("Building full 45s audio master with synchronized SFX...")
    master_out = os.path.join(AUDIO_DIR, "cathy_kids_master_45s_con_sfx.mp3")
    
    # Mix original broadcast voiceover with low-volume SFX bed
    cmd = [
        "ffmpeg", "-y",
        "-i", "/home/marco/Proyectos/Cathy-Kids/public/voz_locucion_broadcast.wav",
        "-i", os.path.join(SFX_DIR, "sfx_01_enojo_sucio_maza_lava.wav"),
        "-i", os.path.join(SFX_DIR, "sfx_02_enojo_limpio_latido_60bpm.wav"),
        "-i", os.path.join(SFX_DIR, "sfx_03_lucia_respiro_magico.wav"),
        "-i", os.path.join(SFX_DIR, "sfx_04_cierre_acorde_dorado.wav"),
        "-filter_complex", (
            "[1:a]volume=0.35,adelay=0|0[sfx1];"
            "[2:a]volume=0.45,adelay=11000|11000[sfx2];"
            "[3:a]volume=0.30,adelay=23000|23000[sfx3];"
            "[4:a]volume=0.35,adelay=35000|35000[sfx4];"
            "[0:a]volume=1.0[voice];"
            "[voice][sfx1][sfx2][sfx3][sfx4]amix=inputs=5:duration=first:dropout_transition=2[out]"
        ),
        "-map", "[out]",
        "-codec:a", "libmp3lame",
        "-b:a", "192k",
        master_out
    ]
    subprocess.run(cmd, check=True)
    print(f"Master Composite Created: {master_out}")
    # Also update broadcast audio if desired
    wav_master = os.path.join(AUDIO_DIR, "cathy_kids_master_45s_con_sfx.wav")
    subprocess.run(["ffmpeg", "-y", "-i", master_out, wav_master], check=True)

if __name__ == "__main__":
    print("=== CATHY KIDS AUDIO & SFX PRODUCTION ===")
    generate_sfx_01_enojo_sucio()
    generate_sfx_02_enojo_limpio()
    generate_sfx_03_lucia_respiro()
    generate_sfx_04_cierre_acorde()
    convert_sfx_to_mp3()
    asyncio.run(generate_character_voices())
    build_composite_master()
    print("=== ALL ASSETS GENERATED SUCCESSFULLY ===")
