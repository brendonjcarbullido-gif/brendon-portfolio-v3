export interface Project {
  id: string
  slug: string
  title: string
  client: string
  category: string
  year: string | number
  mediaType: 'image' | 'video'
  image?: string
  video?: string
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
    video: '/videos/anne-klein-hero.mp4',
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
        '/images/work/anne-klein-gallery-1.jpg',
        '/videos/anne-klein-1.mp4',
        '/videos/anne-klein-2.mp4',
        '/images/work/anne-klein-gallery-2.jpg',
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
    video: '/videos/lotto-us-3.mp4',
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
        '/videos/lotto-us-2.mp4',
        '/videos/lotto-us-1.mp4',
        '/videos/lotto-us-3.mp4',
        '/videos/lotto-us-4.mp4',
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
    video: '/videos/teeccino-packaging.mp4',
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
        '/images/work/teeccino-gallery-1.jpg',
        '/videos/teeccino-1.mp4',
        '/videos/teeccino-2.mp4',
        '/images/work/teeccino-gallery-2.jpg',
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
    video: '/videos/teeccino-social.mp4',
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
        '/videos/teeccino-social-1.mp4',
        '/videos/teeccino-social-2.mp4',
        '/videos/teeccino-social-3.mp4',
        '/videos/teeccino-social-4.mp4',
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
    video: '/videos/joseph-abboud-correct.mp4',
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
        '/images/work/joseph-abboud-gallery-1.jpg',
        '/videos/joseph-abboud-1.mp4',
        '/videos/joseph-abboud-3.mp4',
        '/images/work/joseph-abboud-gallery-2.jpg',
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
    image: '/images/work/casa-amour-gallery-2.jpg',
    caseStudy: {
      headline: 'Spirit. Identity. Presence.',
      overview:
        'GCMG Agency acquired Casa Amour Tequila as a client ahead of their brand launch. As Associate Creative Director, I led the creation of their initial imagery and brand manual — developing a cohesive modern aesthetic and visual identity system to define the brand before it hit the market.',
      role: 'Associate Creative Director',
      deliverables: ['Brand Manual', 'Visual Identity', 'Art Direction', 'Photography', 'Campaign Direction'],
      color: '#2a1a0a',
      images: [
        '/images/work/casa-amour-gallery-1.jpg',
        '/images/work/casa-amour-gallery-2.jpg',
        '/images/work/casa-amour-gallery-3.jpg',
        '/images/work/casa-amour-gallery-4.jpg',
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
    video: '/videos/design-craft-1.mp4',
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
        '/images/work/design-craft-gallery-1.jpg',
        '/videos/design-craft-1.mp4',
        '/videos/design-craft-2.mp4',
        '/images/work/design-craft-gallery-2.jpg',
      ],
    },
  },
  {
    id: '8',
    slug: 'kloo-coffee',
    title: 'Brand Direction',
    client: 'Kloo Coffee',
    category: 'Creative Direction',
    year: '2023',
    mediaType: 'video',
    video: '/videos/kloo-coffee-correct.mp4',
    caseStudy: {
      headline: 'Crafting a Coffee Identity.',
      overview:
        'Creative direction and content strategy for Kloo Coffee — defining the brand voice and visual language across digital channels.',
      role: 'Creative Director',
      deliverables: ['Creative Direction', 'Brand Strategy', 'Content'],
      images: [
        '/images/work/kloo-coffee.jpg',
        '/images/work/kloo-coffee.jpg',
        '/images/work/kloo-coffee.jpg',
        '/images/work/kloo-coffee.jpg',
      ],
      color: '#6B5A47',
    },
  },
]
