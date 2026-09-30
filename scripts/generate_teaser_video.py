#!/usr/bin/env python3
"""
Generates the 45-second pilot teaser video using high-res 3D assets and studio voiceover.
Resolution: 1920x1080 (16:9), 30fps, H.264 + AAC.
"""
import os
import subprocess

ASSETS_DIR = "/home/marco/Proyectos/Cathy-Kids/public/assets"
AUDIO_PATH = "/home/marco/Proyectos/Cathy-Kids/public/voz_locucion_broadcast.wav"
OUTPUT_DIR = "/home/marco/Proyectos/Cathy-Kids/public/video"
OUTPUT_FILE = os.path.join(OUTPUT_DIR, "cortometraje_45s.mp4")

os.makedirs(OUTPUT_DIR, exist_ok=True)

# Scene definitions
scenes = [
    {
        "img": os.path.join(ASSETS_DIR, "enojo-sucio.jpg"),
        "duration": 12.5,
        "zoom": "min(zoom+0.0008,1.15)"
    },
    {
        "img": os.path.join(ASSETS_DIR, "enojo-limpio.jpg"),
        "duration": 13.0,
        "zoom": "min(zoom+0.0008,1.15)"
    },
    {
        "img": os.path.join(ASSETS_DIR, "piedrita_paz.jpg"),
        "duration": 12.0,
        "zoom": "min(zoom+0.0008,1.15)"
    },
    {
        "img": os.path.join(ASSETS_DIR, "lucia.jpg"),
        "duration": 7.476,
        "zoom": "min(zoom+0.0008,1.15)"
    }
]

# Generate individual clips
clip_files = []
for i, s in enumerate(scenes):
    clip_out = f"/tmp/cathy_clip_{i}.mp4"
    clip_files.append(clip_out)
    
    # Scale and pad to 1920x1080 with subtle zoom
    cmd = [
        "ffmpeg", "-y",
        "-loop", "1",
        "-i", s["img"],
        "-t", str(s["duration"]),
        "-vf", (
            f"scale=1920:1080:force_original_aspect_ratio=decrease,"
            f"pad=1920:1080:(ow-iw)/2:(oh-ih)/2:color=black,"
            f"zoompan=z='{s['zoom']}':d=1:s=1920x1080:fps=30"
        ),
        "-c:v", "libx264",
        "-pix_fmt", "yuv420p",
        "-r", "30",
        clip_out
    ]
    print(f"Rendering Clip {i+1} ({s['duration']}s)...")
    res = subprocess.run(cmd, capture_output=True, text=True)
    if res.returncode != 0:
        print(f"Error rendering clip {i+1}: {res.stderr}")
        # fallback simple scale without zoompan
        fallback_cmd = [
            "ffmpeg", "-y",
            "-loop", "1",
            "-i", s["img"],
            "-t", str(s["duration"]),
            "-vf", "scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2:color=0x07090e",
            "-c:v", "libx264",
            "-pix_fmt", "yuv420p",
            "-r", "30",
            clip_out
        ]
        subprocess.run(fallback_cmd, check=True)

# Create concat list
concat_list = "/tmp/cathy_clips.txt"
with open(concat_list, "w") as f:
    for c in clip_files:
        f.write(f"file '{c}'\n")

# Concat video and merge with audio
print("Merging clips and audio track...")
merge_cmd = [
    "ffmpeg", "-y",
    "-f", "concat",
    "-safe", "0",
    "-i", concat_list,
    "-i", AUDIO_PATH,
    "-c:v", "copy",
    "-c:a", "aac",
    "-b:a", "192k",
    "-shortest",
    OUTPUT_FILE
]
subprocess.run(merge_cmd, check=True)

print(f"SUCCESS: Video generated at {OUTPUT_FILE}")
