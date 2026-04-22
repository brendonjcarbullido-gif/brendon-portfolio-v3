const R2_BASE = import.meta.env.VITE_MEDIA_URL || '';
const USE_LOCAL = import.meta.env.VITE_USE_LOCAL_MEDIA === '1';

export function video(filename: string): string {
  const clean = filename.replace(/^\/+/, '').replace(/^videos\//, '');
  if (USE_LOCAL || !R2_BASE) return `/videos/${clean}`;
  return `${R2_BASE}/videos/${clean}`;
}

export function poster(filename: string): string {
  const clean = filename.replace(/\.(mp4|mov|webm)$/i, '.webp').replace(/^\/+/, '').replace(/^(videos|posters)\//, '');
  if (USE_LOCAL || !R2_BASE) return `/images/posters/${clean}`;
  return `${R2_BASE}/posters/${clean}`;
}
