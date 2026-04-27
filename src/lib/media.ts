const R2_BASE = import.meta.env.VITE_MEDIA_URL || '';
const USE_LOCAL = import.meta.env.VITE_USE_LOCAL_MEDIA === '1';

function base() {
  return USE_LOCAL || !R2_BASE ? '' : R2_BASE;
}

export function video(filename: string): string {
  const clean = filename.replace(/^\/+/, '').replace(/^videos\//, '');
  return `${base()}/videos/${clean}`;
}

export function preview(filename: string): string {
  const clean = filename
    .replace(/^\/+/, '')
    .replace(/^videos\//, '')
    .replace(/\.mp4$/i, '');
  return `${base()}/videos/preview/${clean}-preview.mp4`;
}

export function poster(filename: string): string {
  const name = /^https?:\/\//.test(filename) ? (filename.split('/').pop() ?? filename) : filename;
  const clean = name
    .replace(/\.(mp4|mov|webm)$/i, '')
    .replace(/^\/+/, '')
    .replace(/^(videos\/preview\/|videos\/|posters\/)/, '')
    .replace(/-preview$/, '');
  return `${base()}/images/posters/${clean}.webp`;
}

export function image(filename: string): string {
  const clean = filename.replace(/^\/+/, '').replace(/^images\//, '');
  return `${base()}/images/${clean}`;
}
