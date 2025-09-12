import type { Config } from 'tailwindcss'

export default {
  darkMode: 'class',
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: '#0b0b0e',
          card: '#111116',
          soft: '#15151c',
        },
      },
      boxShadow: {
        soft: '0 10px 30px rgba(0,0,0,0.3)',
        ring: '0 0 0 1px rgba(255,255,255,0.08) inset',
      },
      borderRadius: {
        xl: '14px',
        '2xl': '20px',
      },
    },
  },
  plugins: [],
} satisfies Config
