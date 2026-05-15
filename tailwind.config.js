/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // ===== Accrocar luxury palette =====
        // Soft Pearl — main background
        pearl: {
          DEFAULT: '#F2F1ED',
          50: '#FBFAF7',
          100: '#F2F1ED',
          200: '#E8E6DF',
          300: '#D8D5CB',
          400: '#BFBBAE',
          500: '#A29D8D',
        },
        // Obsidian Black — primary dark text and refined contrast
        obsidian: {
          DEFAULT: '#161616',
          50: '#F5F5F5',
          100: '#E5E5E5',
          200: '#BFBFBF',
          300: '#8E8E8E',
          400: '#5C5C5C',
          500: '#333333',
          600: '#222222',
          700: '#1A1A1A',
          800: '#161616',
          900: '#0E0E0E',
        },
        // Crimson Depth — premium accent (buttons, hover, active)
        crimson: {
          DEFAULT: '#710014',
          50: '#FCE9EC',
          100: '#F4C3CB',
          200: '#D87D8E',
          300: '#A6324A',
          400: '#8A1A2F',
          500: '#710014',
          600: '#5C0010',
          700: '#48000C',
          800: '#34000A',
          900: '#210006',
        },
        // Warm Sand — secondary accent (borders, subtle highlights)
        sand: {
          DEFAULT: '#B38F6F',
          50: '#F7F1EB',
          100: '#EDE0D2',
          200: '#DCC4AA',
          300: '#C9A788',
          400: '#B38F6F',
          500: '#9C7757',
          600: '#7E5F45',
          700: '#604734',
          800: '#423022',
          900: '#241A12',
        },
      },
      fontFamily: {
        /* Georgia fallback: neutral ampersand if a secondary face is ever substituted */
        serif: ['"Playfair Display"', 'Georgia', 'Times New Roman', 'serif'],
        display: ['"Cormorant Garamond"', '"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', '"Helvetica Neue"', 'Helvetica', 'Arial', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      fontSize: {
        'display-xl': ['clamp(3.75rem, 9vw, 9rem)', { lineHeight: '0.95', letterSpacing: '-0.04em' }],
        'display-lg': ['clamp(3rem, 7vw, 7rem)', { lineHeight: '0.98', letterSpacing: '-0.035em' }],
        'display-md': ['clamp(2.25rem, 5vw, 4.5rem)', { lineHeight: '1.04', letterSpacing: '-0.03em' }],
        'display-sm': ['clamp(1.875rem, 3.5vw, 3rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'eyebrow': ['0.75rem', { lineHeight: '1.4', letterSpacing: '0.32em' }],
      },
      letterSpacing: {
        luxe: '0.32em',
        wider2: '0.18em',
      },
      spacing: {
        section: 'clamp(5rem, 12vh, 10rem)',
      },
      maxWidth: {
        'editorial': '1440px',
      },
      transitionTimingFunction: {
        'expo-out': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'silk': 'cubic-bezier(0.77, 0, 0.175, 1)',
      },
      animation: {
        'marquee': 'marquee 40s linear infinite',
        'fade-up': 'fadeUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) both',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
