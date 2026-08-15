/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        void: {
          DEFAULT: '#05070D',
          soft: '#080B15',
        },
        ink: {
          DEFAULT: '#0B0F1E',
          light: '#111529',
          border: '#1E2338',
        },
        saffron: {
          DEFAULT: '#FF9933',
          soft: '#FFB566',
          deep: '#DB7A1A',
        },
        chakra: {
          DEFAULT: '#2B3AA8',
          bright: '#4F63E0',
        },
        flag: {
          green: '#0F9D58',
          'green-deep': '#0A7A43',
        },
        pearl: {
          DEFAULT: '#F5F3EE',
          dim: '#C9CBD6',
          faint: '#8A8FA3',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      backgroundImage: {
        'tricolor-line': 'linear-gradient(90deg, #FF9933 0%, #FF9933 33%, #F5F3EE 33%, #F5F3EE 66%, #0F9D58 66%, #0F9D58 100%)',
        'saffron-glow': 'radial-gradient(circle, rgba(255,153,51,0.16) 0%, rgba(255,153,51,0) 70%)',
        'green-glow': 'radial-gradient(circle, rgba(15,157,88,0.14) 0%, rgba(15,157,88,0) 70%)',
      },
      boxShadow: {
        glass: '0 8px 32px rgba(0,0,0,0.45)',
        'glow-saffron': '0 0 0 1px rgba(255,153,51,0.4), 0 0 24px rgba(255,153,51,0.15)',
      },
      keyframes: {
        'spin-slow': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        'spin-slower': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(-360deg)' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        'spin-slow': 'spin-slow 90s linear infinite',
        'spin-slower': 'spin-slower 140s linear infinite',
        'fade-up': 'fade-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) both',
        shimmer: 'shimmer 2.5s linear infinite',
      },
    },
  },
  plugins: [],
}
