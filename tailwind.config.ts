import type { Config } from 'tailwindcss'

export default {
  content: ['./src/app/**/*.{ts,tsx}', './src/components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: { ink: '#0b0d12', film: '#0f172a' },
    },
  },
  plugins: [],
} satisfies Config
