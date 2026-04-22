#!/bin/bash
# Transcode all videos to web-optimized MP4 (H.264, faststart, 1080p cap, ~2-4Mbps)
# Also generate poster frames as WebP
set -e
SRC="$HOME/apps/portfolio-v3/public/videos"
OUT="$HOME/apps/portfolio-v3/public/videos-optimized"
POSTERS="$HOME/apps/portfolio-v3/public/images/posters"
mkdir -p "$OUT" "$POSTERS"

for f in "$SRC"/*.mp4 "$SRC"/*.mov "$SRC"/*.MP4; do
  [ -f "$f" ] || continue
  base=$(basename "$f")
  name="${base%.*}"
  out_file="$OUT/${name}.mp4"
  poster="$POSTERS/${name}.webp"

  if [ -f "$out_file" ]; then
    echo "SKIP $base (already optimized)"
    continue
  fi

  echo "=== $base ==="
  ffmpeg -y -i "$f" \
    -vf "scale='min(1920,iw)':'-2'" \
    -c:v libx264 -preset slow -crf 24 \
    -profile:v high -level 4.0 \
    -pix_fmt yuv420p \
    -movflags +faststart \
    -c:a aac -b:a 128k -ac 2 \
    -max_muxing_queue_size 1024 \
    "$out_file" < /dev/null 2>&1 | tail -5

  ffmpeg -y -i "$f" -vf "thumbnail,scale=1280:-2" -frames:v 1 \
    -c:v libwebp -q:v 75 "$poster" < /dev/null 2>&1 | tail -2

  orig=$(du -h "$f" | cut -f1)
  new=$(du -h "$out_file" | cut -f1)
  echo "  $orig -> $new"
done

echo ""
echo "=== TOTALS ==="
du -sh "$SRC" "$OUT"
