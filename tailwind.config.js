/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        theme: {
          bg: 'var(--page-bg)',
          surface: 'var(--surface)',
          'surface-raised': 'var(--surface-raised)',
          'surface-deep': 'var(--surface-deep)',
          'text-primary': 'var(--text-primary)',
          'text-secondary': 'var(--text-secondary)',
          accent: 'var(--accent)',
          'accent-strong': 'var(--accent-strong)',
          border: 'var(--border)',
          'footer-bg': 'var(--footer-bg)',
          'footer-text': 'var(--footer-text)',
          'footer-muted': 'var(--footer-muted)',
        },
        // Static references for specific design elements
        gold: {
          light: '#D0AD70',
          DEFAULT: '#AE8950',
          dark: '#8D6938',
          pale: '#E7C995',
        },
        olive: {
          DEFAULT: '#263321',
          muted: '#59614B',
          detail: '#333A2A',
        },
        espresso: {
          canvas: '#493629',
          surface: '#594333',
          raised: '#654D39',
          deep: '#3D2D23',
          border: '#8A6D4F',
        },
        ivory: {
          canvas: '#F4F0E6',
          surface: '#FBF8F1',
          raised: '#FFFDF8',
          deep: '#E9E0D1',
          border: '#D8C6A6',
          text: '#F3E8D4',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      letterSpacing: {
        widest: '.2em',
        eyebrow: '.15em',
      },
    },
  },
  plugins: [],
};

