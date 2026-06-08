from openai import OpenAI
from dotenv import load_dotenv
import glob
import os
import subprocess
import json
import tempfile

load_dotenv()
client = OpenAI()

MAX_SIZE = 24 * 1024 * 1024  # 24MB


def get_duration(file_path):
    """Get audio duration in seconds using ffprobe."""
    result = subprocess.run(
        ["ffprobe", "-v", "quiet", "-print_format", "json", "-show_format", file_path],
        capture_output=True, text=True
    )
    info = json.loads(result.stdout)
    return float(info["format"]["duration"])


def split_and_transcribe(mp3_file, file_size):
    """Split large file with ffmpeg and transcribe each chunk."""
    duration = get_duration(mp3_file)

    # Calculate chunk duration to stay under 24MB
    chunk_duration = int(duration * (MAX_SIZE / file_size))
    num_chunks = int(duration // chunk_duration) + 1

    print(f"  Duration: {duration/60:.1f} min, splitting into ~{num_chunks} chunks of ~{chunk_duration}s each")

    transcript_parts = []
    for i in range(num_chunks):
        start = i * chunk_duration
        if start >= duration:
            break

        print(f"  Transcribing chunk {i+1}/{num_chunks}...")

        # Use ffmpeg to extract chunk
        tmp_path = os.path.join(tempfile.gettempdir(), f"chunk_{i}.mp3")
        subprocess.run(
            ["ffmpeg", "-y", "-i", mp3_file, "-ss", str(start), "-t", str(chunk_duration),
             "-acodec", "copy", tmp_path],
            capture_output=True
        )

        with open(tmp_path, "rb") as audio_file:
            part = client.audio.transcriptions.create(
                model="whisper-1",
                file=audio_file,
                response_format="text"
            )
        transcript_parts.append(part)
        os.unlink(tmp_path)

    return "\n".join(transcript_parts)


mp3_files = glob.glob("*.mp3")

for mp3_file in mp3_files:
    output_name = os.path.splitext(mp3_file)[0] + "_transcript.txt"
    if os.path.exists(output_name):
        print(f"\nSkipping (already transcribed): {mp3_file}")
        continue

    file_size = os.path.getsize(mp3_file)
    print(f"\nProcessing: {mp3_file} ({file_size / (1024*1024):.1f} MB)")

    if file_size <= MAX_SIZE:
        with open(mp3_file, "rb") as audio_file:
            transcript = client.audio.transcriptions.create(
                model="whisper-1",
                file=audio_file,
                response_format="text"
            )
    else:
        transcript = split_and_transcribe(mp3_file, file_size)

    with open(output_name, "w", encoding="utf-8") as f:
        f.write(transcript)

    print(f"Saved: {output_name}")

print("\nAll transcriptions complete!")
