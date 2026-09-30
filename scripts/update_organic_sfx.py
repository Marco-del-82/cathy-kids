#!/usr/bin/env python3
"""
Replace synthetic sine chords and faint chimes with real organic studio SFX:
- SFX 3: Audible physiological child breath + gentle magical twinkle (-20.2 LUFS).
- SFX 4: Warm cinematic acoustic strings + Tibetan bowl peaceful swell (-23.6 LUFS), ZERO synthetic chord.
"""

import os
import shutil
import subprocess

BASE_DIR = "/home/marco/Proyectos/Cathy-Kids"
SFX_DIR = os.path.join(BASE_DIR, "public/assets/sfx")
GROK_SFX_DIR = os.path.join(BASE_DIR, "public/assets/PARA_GROK/SFX_PACK")

# Copy normalized professional SFX
def update_sfx():
    print("Updating SFX 3 (Respiro Somático) and SFX 4 (Resolución Acústica Cálida)...")
    
    # SFX 3
    sfx3_wav = os.path.join(SFX_DIR, "sfx_03_lucia_respiro_magico.wav")
    sfx3_mp3 = os.path.join(SFX_DIR, "sfx_03_lucia_respiro_magico.mp3")
    shutil.copyfile("/tmp/respiro_norm.wav", sfx3_wav)
    subprocess.run(["ffmpeg", "-y", "-i", sfx3_wav, "-c:a", "libmp3lame", "-b:a", "192k", sfx3_mp3], check=True)
    
    # SFX 4
    sfx4_wav = os.path.join(SFX_DIR, "sfx_04_cierre_acorde_dorado.wav")
    sfx4_mp3 = os.path.join(SFX_DIR, "sfx_04_cierre_acorde_dorado.mp3")
    shutil.copyfile("/tmp/cierre_norm.wav", sfx4_wav)
    subprocess.run(["ffmpeg", "-y", "-i", sfx4_wav, "-c:a", "libmp3lame", "-b:a", "192k", sfx4_mp3], check=True)

    # Sync to PARA_GROK/SFX_PACK
    for f in ["sfx_03_lucia_respiro_magico.wav", "sfx_03_lucia_respiro_magico.mp3",
              "sfx_04_cierre_acorde_dorado.wav", "sfx_04_cierre_acorde_dorado.mp3"]:
        shutil.copyfile(os.path.join(SFX_DIR, f), os.path.join(GROK_SFX_DIR, f))
    
    print("SFX updated in public/assets/sfx/ and PARA_GROK/SFX_PACK/.")

if __name__ == "__main__":
    update_sfx()
