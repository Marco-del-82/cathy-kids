#!/usr/bin/env python3
"""
Assemble preview 45s composite video using the 4 video clips and the Bella audio master.
Clips:
1. 01_enojo_sucio.mp4 (10.04s)
2. 02_enojo_limpio.mp4 (10.04s)
3. 03_mirada_lucia.mp4 (10.04s)
4. 04_cierre_end.mp4 (10.04s + tpad to reach 45.0s)
Audio:
VERSION_BELLA/00_MASTER_45S_BELLA.mp3 (45.0s)
"""

import os
import subprocess

BASE_DIR = "/home/marco/Proyectos/Cathy-Kids"
VIDEO_DIR = os.path.join(BASE_DIR, "public/assets/video/tomas")
AUDIO_BELLA = os.path.join(BASE_DIR, "public/assets/PARA_GROK/VERSION_BELLA/00_MASTER_45S_BELLA.mp3")
AUDIO_SARAH = os.path.join(BASE_DIR, "public/assets/PARA_GROK/VERSION_SARAH/00_MASTER_45S_SARAH.mp3")

OUT_PREVIEW_BELLA = os.path.join(BASE_DIR, "public/assets/PARA_GROK/PREVIEW_VIDEO_45S_BELLA.mp4")
OUT_PREVIEW_SARAH = os.path.join(BASE_DIR, "public/assets/PARA_GROK/PREVIEW_VIDEO_45S_SARAH.mp4")
PUBLIC_VIDEO = os.path.join(BASE_DIR, "public/video/cortometraje_45s.mp4")

def assemble_video(audio_src, out_mp4, duration=45.0):
    c1 = os.path.join(VIDEO_DIR, "01_enojo_sucio.mp4")
    c2 = os.path.join(VIDEO_DIR, "02_enojo_limpio.mp4")
    c3 = os.path.join(VIDEO_DIR, "03_mirada_lucia.mp4")
    c4 = os.path.join(VIDEO_DIR, "04_cierre_end.mp4")

    # Filter complex to concatenate 4 clips, scale/pad consistently, and pad the last frame of c4
    # c1: 10.04s
    # c2: 10.04s
    # c3: 10.04s
    # c4: pad last frame so total is 45.0s
    cmd = [
        "ffmpeg", "-y",
        "-i", c1,
        "-i", c2,
        "-i", c3,
        "-i", c4,
        "-i", audio_src,
        "-filter_complex", (
            "[0:v]scale=1280:720,setsar=1,fps=24[v0];"
            "[1:v]scale=1280:720,setsar=1,fps=24[v1];"
            "[2:v]scale=1280:720,setsar=1,fps=24[v2];"
            "[3:v]scale=1280:720,setsar=1,fps=24,tpad=stop_mode=clone:stop_duration=5.5[v3];"
            "[v0][v1][v2][v3]concat=n=4:v=1:a=0[vconcat]"
        ),
        "-map", "[vconcat]",
        "-map", "4:a",
        "-t", str(duration),
        "-c:v", "libx264",
        "-preset", "medium",
        "-crf", "20",
        "-pix_fmt", "yuv420p",
        "-c:a", "aac",
        "-b:a", "256k",
        out_mp4
    ]
    subprocess.run(cmd, check=True)
    print(f"Generated preview video: {out_mp4}")

if __name__ == "__main__":
    print("Assembling 45s preview video for BELLA...")
    assemble_video(AUDIO_BELLA, OUT_PREVIEW_BELLA, duration=45.0)
    # Also update public video for web player
    import shutil
    shutil.copyfile(OUT_PREVIEW_BELLA, PUBLIC_VIDEO)
    print(f"Copied BELLA video to public web video: {PUBLIC_VIDEO}")

    print("Assembling 46s preview video for SARAH...")
    assemble_video(AUDIO_SARAH, OUT_PREVIEW_SARAH, duration=46.0)
    print("Video previews ready!")
