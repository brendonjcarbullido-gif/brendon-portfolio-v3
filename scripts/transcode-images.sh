#!/bin/bash
# Convert all JPG/PNG in public/images/work to WebP + AVIF, keep originals as fallback
set -e
SRC="$HOME/apps/portfolio-v3/public/images/work"
cd "$SRC"

for f in *.jpg *.jpeg *.png *.JPG *.JPEG *.PNG; do
  [ -f "$f" ] || continue
  name="${f%.*}"
  [ -f "${name}.webp" ] && continue
  echo "Converting $f..."
  ffmpeg -y -i "$f" -vf "scale='min(2400,iw)':'-2'" -c:v libwebp -q:v 82 "${name}.webp" < /dev/null 2>&1 | tail -1
  ffmpeg -y -i "$f" -vf "scale='min(2400,iw)':'-2'" -c:v libaom-av1 -still-picture 1 -crf 32 "${name}.avif" < /dev/null 2>&1 | tail -1 || echo "  avif skipped for $f"
done

echo "=== RESULTS ==="
du -sh "$SRC"
