import type { MediaAsset } from '@/hooks/useMediaPreload'
import { projects } from '@/data/projects'

// These 5 slugs map to the hero mosaic tiles — load them first
const HERO_SLUGS = ['teeccino-packaging', 'anne-klein', 'joseph-abboud', 'lotto-us', 'casa-amour']

function buildAssetList(): MediaAsset[] {
  const seen = new Set<string>()
  const assets: MediaAsset[] = []

  const add = (src: string, type: 'image' | 'video') => {
    if (seen.has(src)) return
    seen.add(src)
    assets.push({ src, type })
  }

  // Hero tile covers (highest priority — visible immediately)
  HERO_SLUGS.forEach((slug) => {
    const p = projects.find((pr) => pr.slug === slug)
    if (!p) return
    if (p.mediaType === 'video' && p.video) add(p.video, 'video')
    else if (p.image) add(p.image, 'image')
  })

  // Remaining project covers (rail panels)
  projects.forEach((p) => {
    if (p.mediaType === 'video' && p.video) add(p.video, 'video')
    else if (p.image) add(p.image, 'image')
  })

  // Above-the-fold static images
  add('/images/about/brendon-portrait.webp', 'image')

  // Poster images for all video projects — mobile video fallback
  projects.forEach((p) => {
    if (p.image) add(p.image, 'image')
  })

  return assets
}

export const PRELOAD_ASSETS: MediaAsset[] = buildAssetList()

function isVideo(src: string) {
  return src.endsWith('.mp4') || src.endsWith('.mov') || src.endsWith('.MOV')
}

/** Returns the media assets a given route needs that aren't already in PRELOAD_ASSETS. */
export function getPageAssets(pathname: string): MediaAsset[] {
  // Case study gallery — these are the only assets not preloaded on home visit
  if (pathname.startsWith('/work/')) {
    const slug = pathname.slice('/work/'.length)
    const project = projects.find((p) => p.slug === slug)
    if (!project) return []
    return project.caseStudy.images.map((src) => ({
      src,
      type: isVideo(src) ? 'video' : 'image',
    } as MediaAsset))
  }
  // /work, /about, /contact, /resume — all media already in PRELOAD_ASSETS or media-free
  return []
}
