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
          'bg-secondary': 'var(--bg-secondary)',
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
        gold: {
          light: '#D0AE78',
          DEFAULT: '#A77D43',
          dark: '#8A6431',
          pale: '#E5C38E',
        },
        olive: {
          DEFAULT: '#303526',
          muted: '#46503A',
          detail: '#2E3426',
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

