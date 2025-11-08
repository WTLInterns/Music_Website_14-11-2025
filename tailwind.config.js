/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-display)', 'ui-sans-serif', 'system-ui'],
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui'],
      },
      colors: {
        brand: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95'
        },
        neon: {
          purple: '#a78bfa',
          pink: '#f472b6',
          yellow: '#facc15',
          blue: '#60a5fa',
          green: '#34d399'
        }
      },
      boxShadow: {
        card: '0 10px 25px rgba(0,0,0,0.08)',
        glow: '0 0 30px rgba(167,139,250,0.5)'
      },
      backgroundImage: {
        'music-waves': "url('/images/bg-music-waves.svg')",
        'abstract-music': "url('/images/bg-abstract-music.svg')",
        'hero-music': "url('/images/hero-music.svg')",
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' }
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 0 rgba(250,204,21,0.0)' },
          '50%': { boxShadow: '0 0 30px rgba(250,204,21,0.6)' }
        },
        equalize: {
          '0%': { transform: 'scaleY(0.3)' },
          '50%': { transform: 'scaleY(1)' },
          '100%': { transform: 'scaleY(0.3)' }
        }
      },
      animation: {
        float: 'float 4s ease-in-out infinite',
        pulseGlow: 'pulseGlow 2s ease-in-out infinite',
        equalize: 'equalize 1.2s ease-in-out infinite'
      }
    },
  },
  plugins: [],
}
