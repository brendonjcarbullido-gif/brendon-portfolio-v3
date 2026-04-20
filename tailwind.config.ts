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
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        'display-xl': ['clamp(3rem, 9vw, 10rem)', { lineHeight: '0.92', letterSpacing: '-0.025em' }],
        'display-lg': ['clamp(2.5rem, 7vw, 7rem)', { lineHeight: '0.96', letterSpacing: '-0.02em' }],
        'display-md': ['clamp(2rem, 5vw, 4.5rem)', { lineHeight: '1.02', letterSpacing: '-0.015em' }],
        'eyebrow': ['0.6875rem', { lineHeight: '1.4', letterSpacing: '0.16em' }],
      },
      transitionTimingFunction: {
        'dialect-out': 'cubic-bezier(0.19, 1, 0.22, 1)',
      },
    },
  },
  plugins: [],
} satisfies Config
