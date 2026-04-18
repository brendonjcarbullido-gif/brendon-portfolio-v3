import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#F5F0E8',
        'cream-2': '#EDE7D9',
        'cream-3': '#E4DDD0',
        ink: '#1A1612',
        'ink-2': '#2E2820',
        'ink-light': '#6B6258',
        accent: '#8B6F47',
        /** Phase 3/4 design system */
        gold: '#C9A84C',
        muted: '#777777',
        'card-bg': '#141412',
        'border-subtle': '#1E1E1C',
        'ink-deep': '#0D0D0B',
        'cream-ds': '#F0EBE3',
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
        bebas: ['"Bebas Neue"', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config
