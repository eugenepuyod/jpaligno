export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b', // Deep Slate/Navy Blue
          900: '#0f172a', // Obsidian Navy Blue
          950: '#090d16',
        },
        gold: {
          50: '#faf8f2',
          100: '#f3edd9',
          200: '#e5d7ad',
          300: '#d4bd77',
          400: '#c29f4b',
          500: '#b8860b', // Dark Goldenrod
          600: '#a37409', // Champagne Gold
          700: '#8c6109',
          800: '#734e0c',
          900: '#5c3d0c',
          950: '#362104',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'legal-pattern': "radial-gradient(circle, rgba(15, 23, 42, 0.03) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
}
