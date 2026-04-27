import { video, preview } from '@/lib/media'

export interface Project {
  id: string
  slug: string
  title: string
  client: string
  category: string
  year: string | number
  mediaType: 'image' | 'video'
  image?: string
  video?: string        // 480p preview — used by cards, mosaic, rail
  previewVideo?: string // explicit 480p reference
  fullVideo?: string    // full-res — used by case study hero and lightbox
  caseStudy: {
    headline: string
    overview: string
    role: string
    deliverables: string[]
    images: string[]
    color: string
  }
}

export const projects: Project[] = [
  {
    id: '1',
    slug: 'anne-klein',
    title: "International Women's Campaign",
    client: 'Anne Klein',
    category: 'Campaign Direction',
    year: 2023,
    mediaType: 'video',
    video: preview('anne-klein-hero.mp4'),
    previewVideo: preview('anne-klein-hero.mp4'),
    fullVideo: video('anne-klein-hero.mp4'),
    image: '/images/work/anne-klein.webp',
    caseStudy: {
      headline: 'Directing Power. Defining a Season.',
      overview:
        'A multi-season creative partnership with Anne Klein through GCMG Agency — spanning handbags, watches, accessories, and home goods. Full ownership from shot concept and set design through photography, videography, and final edit. Every frame conceived, directed, and delivered in-house.',
      role: 'Associate Creative Director',
      deliverables: [
        'Shot Concept',
        'Set Design',
        'Photography',
        'Videography',
        'Editing',
        'Campaign Direction',
      ],
      color: '#1a3a6b',
      images: [
        '/images/work/anne-klein-gallery-1.webp',
        video('anne-klein-1.mp4'),
        video('anne-klein-2.mp4'),
        '/images/work/anne-klein-gallery-2.webp',
        video('anne-klein-blk-bag.mp4'),
        video('anne-klein-sheets.mp4'),
      ],
    },
  },
  {
    id: '2',
    slug: 'lotto-us',
    title: 'American Branch Launch',
    client: 'Lotto US',
    category: 'Brand Identity',
    year: 2023,
    mediaType: 'video',
    video: preview('lotto-us-3.mp4'),
    previewVideo: preview('lotto-us-3.mp4'),
    fullVideo: video('lotto-us-3.mp4'),
    image: '/images/work/lotto-us-3.webp',
    caseStudy: {
      headline: 'Launching a Legend. Building a Market.',
      overview:
        "GCMG Agency was brought on to launch Lotto's soccer and futbol collection in the United States, featuring soccer superstar Stu Holden. As Associate Creative Director, I led the full content operation — conceiving, directing, and executing 10+ reels, 20+ graphics, and 100+ product images across the collection launch.",
      role: 'Associate Creative Director',
      deliverables: [
        'Campaign Direction',
        'Reels',
        'Product Photography',
        'Graphics',
        'Content Strategy',
      ],
      color: '#1a1a2e',
      images: [
        video('lotto-us-lifestyle.mp4'),
        video('lotto-us-nostalgia.mp4'),
        video('lotto-us-walk.mp4'),
        video('lotto-us-1.mp4'),
        video('lotto-us-clothing.mp4'),
        video('lotto-us-bts.mp4'),
        video('lotto-us-stadium.mp4'),
      ],
    },
  },
  {
    id: '3',
    slug: 'teeccino-packaging',
    title: 'Creative Direction',
    client: 'Teeccino',
    category: 'Art Direction',
    year: 2025,
    mediaType: 'video',
    video: preview('teeccino-matcha-hero.mp4'),
    previewVideo: preview('teeccino-matcha-hero.mp4'),
    fullVideo: video('teeccino-matcha-hero.mp4'),
    image: '/images/work/teeccino-social.webp',
    caseStudy: {
      headline: 'One Person. Every Frame.',
      overview:
        'As the sole creative force at Teeccino, I operated as an entire creative department — handling photography, videography, editing, set direction, and social media while managing the creative team. Every asset across web, Amazon, packaging, and social was conceived and executed in-house: website photos and videos, Amazon listing content, new packaging design, creative graphics, and the full content ecosystem.',
      role: 'Art Director / Creative Content Specialist',
      deliverables: [
        'Photography',
        'Videography',
        'Set Direction',
        'Packaging Design',
        'Amazon Content',
        'Website Assets',
        'Social Media',
        'Creative Graphics',
      ],
      color: '#3d2b1a',
      images: [
        video('matcha.mp4'),
        '/images/work/teeccino-dsc-1.webp',
        '/images/work/teeccino-dsc-2.webp',
        '/images/work/teeccino-dsc-3.webp',
        '/images/work/teeccino-gallery-2.webp',
        video('teeccino-1.mp4'),
      ],
    },
  },
  {
    id: '4',
    slug: 'teeccino-social',
    title: 'Content Ecosystem',
    client: 'Teeccino',
    category: 'Content Direction',
    year: 2024,
    mediaType: 'video',
    video: preview('teeccino-packaging.mp4'),
    previewVideo: preview('teeccino-packaging.mp4'),
    fullVideo: video('teeccino-packaging.mp4'),
    image: '/images/work/teeccino-packaging.webp',
    caseStudy: {
      headline: '45K Followers. 40% More Engagement.',
      overview:
        "Transformed Teeccino's social presence from infrequent low-quality posts into a fully operational content ecosystem — developing the strategy, workflow, cadence, and production system across Instagram, Facebook, YouTube, and TikTok. Scaled from 2x to 5x per week as sole creator, shooting, editing, and publishing all content independently.",
      role: 'Director of Social Media',
      deliverables: [
        'Content Strategy',
        'Photography',
        'Videography',
        'Editing',
        'Social Management',
        'Livestream Moderation',
        'Outreach',
      ],
      color: '#1a2e1a',
      images: [
        video('teeccino-social-ep0.mp4'),
        video('teeccino-social-ep2.mp4'),
        video('teeccino-social-3.mp4'),
        video('teeccino-social-4.mp4'),
      ],
    },
  },
  {
    id: '5',
    slug: 'joseph-abboud',
    title: 'Season Campaign',
    client: 'Joseph Abboud',
    category: 'Art Direction',
    year: 2023,
    mediaType: 'video',
    video: preview('joseph-abboud-correct.mp4'),
    previewVideo: preview('joseph-abboud-correct.mp4'),
    fullVideo: video('joseph-abboud-correct.mp4'),
    image: '/images/work/joseph-abboud.webp',
    caseStudy: {
      headline: 'The Craft of a Season.',
      overview:
        "As a client of GCMG Agency, we developed brand strategy and social media content for both the Joseph Abboud Bespoke line and the main brand. Full creative ownership from concept through delivery — building a visual language that matched the brand's refined, tailored identity.",
      role: 'Associate Creative Director',
      deliverables: [
        'Brand Strategy',
        'Art Direction',
        'Photo Production',
        'Post-Production',
        'Social Media Content',
      ],
      color: '#1a1a2a',
      images: [
        '/images/work/joseph-abboud-still-1.webp',
        video('joseph-abboud-1.mp4'),
        video('joseph-abboud-3.mp4'),
        '/images/work/joseph-abboud-still-2.webp',
        video('joseph-abboud-2b.mp4'),
        '/images/work/joseph-abboud-gallery-2.webp',
      ],
    },
  },
  {
    id: '6',
    slug: 'casa-amour',
    title: 'Brand Identity',
    client: 'Casa Amour Tequila',
    category: 'Visual Identity',
    year: 2023,
    mediaType: 'image',
    image: '/images/work/casa-amour.webp',
    caseStudy: {
      headline: 'Spirit. Identity. Presence.',
      overview:
        'GCMG Agency acquired Casa Amour Tequila as a client ahead of their brand launch. As Associate Creative Director, I led the creation of their initial imagery and brand manual — developing a cohesive modern aesthetic and visual identity system to define the brand before it hit the market.',
      role: 'Associate Creative Director',
      deliverables: ['Brand Manual', 'Visual Identity', 'Art Direction', 'Photography', 'Campaign Direction'],
      color: '#2a1a0a',
      images: [
        '/images/work/casa-amour-gallery-1.webp',
        '/images/work/casa-amour-gallery-2.webp',
        '/images/work/casa-amour-still-1.webp',
        '/images/work/casa-amour-still-2.webp',
        '/images/work/casa-amour-gallery-3.webp',
        '/images/work/casa-amour-gallery-4.webp',
      ],
    },
  },
  {
    id: '7',
    slug: 'design-craft',
    title: 'Design Craft',
    client: 'Personal Work',
    category: 'Art Direction',
    year: 2024,
    mediaType: 'video',
    video: preview('design-craft-1.mp4'),
    previewVideo: preview('design-craft-1.mp4'),
    fullVideo: video('design-craft-1.mp4'),
    image: '/images/work/design-craft.webp',
    caseStudy: {
      headline: 'Range. Versatility. Ownership.',
      overview:
        'A collection of personal and collaborative creative work spanning jewelry brand photography, celebrity event videography, commissioned design projects, and independent creative endeavors. This case study represents the full breadth of creative capability — the ability to move fluidly across industries, brands, and formats while maintaining a consistent standard of execution and visual quality.',
      role: 'Creative Director / Photographer / Videographer',
      deliverables: [
        'Photography',
        'Videography',
        'Brand Collaboration',
        'Event Coverage',
        'Commissioned Design',
        'Creative Direction',
      ],
      color: '#1a1a1a',
      images: [
        video('design-craft-2.mp4'),
        '/images/work/design-craft-gallery-1.webp',
        '/images/work/design-craft-gallery-2.webp',
        '/images/work/design-craft-gallery-7.webp',
        '/images/work/design-craft-gallery-8.webp',
        video('C0006.mp4'),
        video('design-craft-3.mp4'),
        video('design-craft-4.mp4'),
        video('design-craft-5.mp4'),
        video('design-craft-6.mp4'),
        video('design-craft-7.mp4'),
      ],
    },
  },
  {
    id: '8',
    slug: 'swau',
    title: 'Social & Marketing Content',
    client: 'SWAU',
    category: 'Content Direction',
    year: 2023,
    mediaType: 'video',
    video: preview('swau-reel.mp4'),
    previewVideo: preview('swau-reel.mp4'),
    fullVideo: video('swau-reel.mp4'),
    image: '/images/work/swau-1.webp',
    caseStudy: {
      headline: 'Collectibles. Culture. Content.',
      overview:
        "SWAU is a marketplace for authenticated signed memorabilia from iconic actors, films, and TV shows. As Creative Director at The GCMG Agency, I developed and executed social media, email, SMS, and marketing content — building a visual system that matched the brand's intersection of pop culture and collector culture.",
      role: 'Creative Director',
      deliverables: [
        'Social Media Content',
        'Email & SMS Campaigns',
        'Marketing Content',
        'Graphic Design',
        'Creative Direction',
      ],
      color: '#1a1a2e',
      images: [
        '/images/work/swau-1.webp',
        '/images/work/swau-2.webp',
        '/images/work/swau-3.webp',
        '/images/work/swau-4.webp',
        '/images/work/swau-graphic-1.webp',
        '/images/work/swau-graphic-2.webp',
        preview('swau-1.mp4'),
        preview('swau-2.mp4'),
      ],
    },
  },
]
