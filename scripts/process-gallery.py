#!/usr/bin/env python3
"""Refresh gallery assets and manifest. Requires Pillow, ffmpeg and ffprobe."""
from pathlib import Path
from PIL import Image, ImageOps
import hashlib
import io
import json
import os
import shutil
import subprocess
import tempfile

ROOT = Path(__file__).resolve().parents[1]
BASE = ROOT / 'public/assets/gallery'
PREVIEW = BASE / 'preview'
MANIFEST = ROOT / 'src/gallery.ts'
PREFIX = 'export const gallery: GalleryItem[] = '
HEADER = """export type GalleryItem = {
  id: string; type: 'photo' | 'video'; title: { zh: string; en: string }; description: { zh: string; en: string }; src: string; preview: string; original?: string; width: number; height: number; duration?: number
}
"""

def run(args):
    return subprocess.check_output(args)

def main():
    for binary in ('ffmpeg', 'ffprobe'):
        if not shutil.which(binary):
            raise SystemExit(f'{binary} is required')
    captions = json.loads((ROOT / 'scripts/gallery-captions.json').read_text())
    old = json.loads(MANIFEST.read_text().split(PREFIX, 1)[1]) if MANIFEST.exists() else []
    old_paths = [item.get('original', item['src']) for item in old]
    files = [(kind, path) for kind, folder, extensions in (
        ('photo', 'photo', {'.jpg', '.jpeg', '.png', '.webp'}),
        ('video', 'video', {'.mov', '.mp4', '.m4v'}),
    ) for path in sorted((BASE / folder).iterdir()) if path.is_file() and path.suffix.lower() in extensions]
    if not files:
        raise SystemExit('No gallery originals found; previous manifest is unchanged.')
    PREVIEW.mkdir(parents=True, exist_ok=True)
    items = {}
    with tempfile.TemporaryDirectory(prefix='silver-salt-gallery-') as directory:
        stage = Path(directory)
        for kind, path in files:
            # Content hash changes preview URLs when an original is replaced under the same name.
            digest = hashlib.sha256(path.read_bytes()).hexdigest()[:12]
            stem = path.stem if kind == 'photo' else 'video-' + path.stem.rsplit('_', 1)[-1]
            key = f'{stem}-{digest}'
            poster = key + '.webp'
            relative = '/assets/gallery/' + path.relative_to(BASE).as_posix()
            text = captions.get(path.name, {
                'title': {'zh': '日常的一刻', 'en': 'An everyday moment'},
                'description': {'zh': '通过银盐 App，留住眼前的生活。', 'en': 'Everyday life, captured with Silver Salt.'},
            })
            item = dict(id=stem, type=kind, **text, preview='/assets/gallery/preview/' + poster)
            if kind == 'photo':
                with Image.open(path) as source:
                    image = ImageOps.exif_transpose(source).convert('RGB')
                    item.update(width=image.width, height=image.height, src=relative)
                    if not (PREVIEW / poster).exists():
                        image.thumbnail((1000, 1300))
                        image.save(stage / poster, 'WEBP', quality=84)
            else:
                info = json.loads(run(['ffprobe', '-v', 'error', '-show_streams', '-show_format', '-of', 'json', str(path)]))
                stream = next(s for s in info['streams'] if s['codec_type'] == 'video')
                movie = key + '.mp4'
                destination = stage / movie
                if not (PREVIEW / movie).exists():
                    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', str(path), '-map', '0:v:0', '-map', '0:a?', '-vf', 'scale=min(720\\,iw):-2', '-c:v', 'libx264', '-crf', '25', '-preset', 'fast', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', '-c:a', 'aac', '-b:a', '96k', str(destination)], check=True)
                else:
                    destination = PREVIEW / movie
                # Probe the actual output to account for display rotation and transcoding.
                output = json.loads(run(['ffprobe', '-v', 'error', '-show_streams', '-show_format', '-of', 'json', str(destination)]))
                video = next(s for s in output['streams'] if s['codec_type'] == 'video')
                duration = float(output['format']['duration'])
                item.update(width=video['width'], height=video['height'], duration=duration, src='/assets/gallery/preview/' + movie, original=relative)
                if not (PREVIEW / poster).exists():
                    frame = run(['ffmpeg', '-v', 'error', '-ss', str(min(.5, duration / 2)), '-i', str(destination), '-frames:v', '1', '-f', 'image2pipe', '-vcodec', 'png', '-'])
                    with Image.open(io.BytesIO(frame)) as image:
                        image.convert('RGB').save(stage / poster, 'WEBP', quality=84)
            items[relative] = item
        # Keep existing curation, remove missing works, then weave new videos into new photos.
        ordered = [items.pop(path) for path in old_paths if path in items]
        photos = [item for item in items.values() if item['type'] == 'photo']
        videos = [item for item in items.values() if item['type'] == 'video']
        while photos or videos:
            ordered.extend(photos[:3]); del photos[:3]
            if videos:
                ordered.append(videos.pop(0))
        for path in stage.iterdir():
            shutil.copy2(path, PREVIEW / path.name)
        for item in ordered:
            for field in ('src', 'preview', 'original'):
                if field in item and not (ROOT / 'public' / item[field].lstrip('/')).is_file():
                    raise RuntimeError(f'Missing {field}: {item[field]}')
        pending = MANIFEST.with_suffix('.ts.tmp')
        pending.write_text(HEADER + PREFIX + json.dumps(ordered, ensure_ascii=False, indent=2) + '\n')
        os.replace(pending, MANIFEST)
        # Only remove generated files referenced by the previous manifest, never source media.
        used = {item[field] for item in ordered for field in ('src', 'preview')}
        for item in old:
            for field in ('src', 'preview'):
                url = item[field]
                if url.startswith('/assets/gallery/preview/') and url not in used:
                    path = ROOT / 'public' / url.lstrip('/')
                    if path.parent == PREVIEW:
                        path.unlink(missing_ok=True)
    counts = {kind: sum(item['type'] == kind for item in ordered) for kind in ('photo', 'video')}
    print(f"Gallery updated: {counts['photo']} photos, {counts['video']} videos; {len(ordered)} works.")

if __name__ == '__main__':
    main()
