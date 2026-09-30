#!/usr/bin/env python3
"""
Generate the 3 official character voices for Cathy Kids interactive lab:
1. Lucía: Jessica (cgSgspJ2msm6clMCkdW9) - Young girl, bright, warm
2. Enojo Limpio: Brian (nPczCjzI2devNBz1zQrb) - Deep, resonant, comforting protector
3. Enojo Sucio: Callum (N2lVS1w4EtoT3dr4eOWO) - Husky, trickster, reactive lava
"""

import os
import requests

API_KEY = "sk_f1487b05905246c20b70f14d0078356380288a49281a9445"
BASE_DIR = "/home/marco/Proyectos/Cathy-Kids"
PUBLIC_AUDIO = os.path.join(BASE_DIR, "public/audio")
os.makedirs(PUBLIC_AUDIO, exist_ok=True)

CHARACTERS = [
    {
        "id": "lucia",
        "file": "lucia_voice.mp3",
        "voice_id": "cgSgspJ2msm6clMCkdW9", # Jessica
        "text": "A veces siento el volcán en el pecho... pero respiro profundo y elijo no lastimar a los que amo. ¡Elijo la luz del Enojo Limpio!",
        "stability": 0.40,
        "similarity": 0.85,
        "style": 0.25
    },
    {
        "id": "enojo_limpio",
        "file": "enojo_limpio_voice.mp3",
        "voice_id": "nPczCjzI2devNBz1zQrb", # Brian
        "text": "El enojo no es para destruir; es mi fuerza para poner límites con amor y cuidar nuestro corazón.",
        "stability": 0.55,
        "similarity": 0.85,
        "style": 0.15
    },
    {
        "id": "enojo_sucio",
        "file": "enojo_sucio_voice.mp3",
        "voice_id": "N2lVS1w4EtoT3dr4eOWO", # Callum
        "text": "¡Todo me molesta! ¡Si me hieren, yo grito más fuerte para defenderme!",
        "stability": 0.45,
        "similarity": 0.85,
        "style": 0.35
    }
]

headers = {
    "xi-api-key": API_KEY,
    "Content-Type": "application/json"
}

for c in CHARACTERS:
    url = f"https://api.elevenlabs.io/v1/text-to-speech/{c['voice_id']}"
    payload = {
        "text": c["text"],
        "model_id": "eleven_multilingual_v2",
        "voice_settings": {
            "stability": c["stability"],
            "similarity_boost": c["similarity"],
            "style": c["style"],
            "use_speaker_boost": True
        }
    }
    print(f"Generating voice for {c['id']} ({c['voice_id']})...")
    res = requests.post(url, json=payload, headers=headers)
    if res.status_code == 200:
        out_path = os.path.join(PUBLIC_AUDIO, c["file"])
        with open(out_path, "wb") as f:
            f.write(res.content)
        print(f" -> Saved {out_path} ({len(res.content)} bytes)")
    else:
        print(f" -> ERROR {res.status_code}: {res.text}")

print("=== Character voices generation complete ===")
