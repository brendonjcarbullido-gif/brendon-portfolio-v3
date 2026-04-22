export const resume = {
  identity: {
    name: 'Brendon Carbullido',
    roles: ['Art Director', 'Creative Director', 'Brand Strategist'],
    location: 'Los Angeles, CA',
    email: 'brendonjcarbullido@gmail.com',
    phone: '(650) 454-9689',
    portfolio: 'worksbyb.art',
    instagram: 'https://www.instagram.com/brendon.carbullido',
    linkedin: 'https://www.linkedin.com/in/brendoncarbullido',
    resumePdf: '/files/brendon-carbullido-resume.pdf',
  },
  summary:
    'One person. Every medium. Seven years building brands that perform — from concept and camera to campaign and calendar. Known for transforming stagnant identities into cohesive visual ecosystems that grow audiences and drive engagement.',
  summaryShort:
    'A full creative department in one person. Seven years directing brands that perform — from concept and camera to campaign and calendar.',
  impact: [
    { value: '45K+', label: 'Followers Built' },
    { value: '40%', label: 'Engagement Growth' },
    { value: '7+', label: 'Years Experience' },
    { value: '6%', label: 'Engagement Rate' },
  ],
  experience: [
    {
      title: 'Art Director',
      company: 'Teeccino Caffé',
      dateRange: 'May 2025 – Present',
      current: true,
      bullets: [
        'Lead all creative output across packaging, digital, and print — functioning as sole creative executor while maintaining full brand cohesion across touchpoints.',
        'Architected and implemented integrated systems bridging marketing, customer service, and production departments, streamlining cross-functional creative workflows.',
        'Developed contemporary product packaging and visual identities that balance modern design sensibility with established brand heritage.',
      ],
    },
    {
      title: 'Director of Social Media',
      company: 'Teeccino Caffé',
      dateRange: 'Oct 2024 – Present',
      current: true,
      bullets: [
        'Transformed social presence from outdated content into a cohesive ecosystem — growing to 45K+ followers at a sustained 6% engagement rate.',
        'Scaled content cadence from 2x to 5x per week as sole creator — shooting, editing, and publishing all static and reel content independently.',
        'Drove a 40% increase in overall social engagement through data-informed strategy and high-quality visual production.',
      ],
    },
    {
      title: 'Creative Director',
      company: 'The GCMG Agency',
      dateRange: 'Jan 2023 – May 2024',
      bullets: [
        'Directed creative strategy for 7+ clients across fashion, lifestyle, and spirits — including Anne Klein, Joseph Abboud, Lotto US, Kloo Coffee, and Casa Amour Tequila.',
        'Spearheaded Lotto US American branch launch — developed full visual identity and bridged assets to international markets.',
        "Led Anne Klein International Women's Campaign from concept through delivery across digital and print channels.",
      ],
    },
    {
      title: 'Art Director',
      company: 'Kandeyce Jorden Art',
      dateRange: 'Jul 2022 – Dec 2023',
      bullets: [
        "Built artist's social presence and visual brand from zero to thousands of engaged followers — executing all content planning, curation, and production independently.",
        "Directed mood board workshops that became a successful recurring revenue offering, establishing the artist's full visual identity.",
      ],
    },
    {
      title: 'Creative Director',
      company: 'Saints Rose Agency',
      dateRange: 'Mar 2021 – Jun 2022',
      bullets: [
        'Directed photo, video, and styling campaigns for food and lifestyle brands across greater Los Angeles.',
      ],
    },
    {
      title: 'Freelance Creative Director & Brand Manager',
      company: 'Fashion · Beauty · Health & Wellness · Jewelry · Celebrity Styling',
      dateRange: 'May 2018 – Feb 2021',
      bullets: [
        'Built and managed brand identities and content strategies across seven verticals as a sole creative operator.',
        'Developed multi-month content calendars ensuring consistent messaging, cadence, and platform-native creative.',
      ],
    },
  ],
  skills: {
    direction: ['Art & Creative Direction', 'Brand Strategy', 'Visual Identity', 'Content Strategy'],
    production: ['Photography & Videography', 'Shoot Direction', 'Post-Production', 'Livestream Production'],
    tools: ['Adobe Creative Suite', 'AI Creative Workflows', 'Figma / eClincher', 'Asana / Monday.com'],
  },
  industries: [
    'Fashion',
    'Jewelry',
    'Beauty',
    'Alcohol / Spirits',
    'Health & Wellness',
    'Food & Beverage',
  ],
  education: {
    school: 'California Lutheran University',
    degree: 'Bachelor of Arts',
    focus: 'Business Administration',
    emphasis: 'Innovation & Entrepreneurship',
    years: '2018 – 2022',
  },
  clients: [
    'Anne Klein',
    'Joseph Abboud',
    'Lotto US',
    'Teeccino Caffé',
    'SWAU',
    'Casa Amour Tequila',
    'Kandeyce Jorden',
    'Isaac Mizrahi',
  ],
} as const

export type Resume = typeof resume
