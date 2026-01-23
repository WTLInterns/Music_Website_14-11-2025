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
        oswald: ['var(--font-oswald)', 'ui-sans-serif', 'system-ui'],
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
        },
        musicPulse: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.8' },
          '50%': { transform: 'scale(1.05)', opacity: '1' }
        },
        beat: {
          '0%, 100%': { transform: 'scale(1)' },
          '25%': { transform: 'scale(1.02)' },
          '50%': { transform: 'scale(1.05)' },
          '75%': { transform: 'scale(1.02)' }
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' }
        },
        bounceIcon: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        wave: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(5deg)' },
          '75%': { transform: 'rotate(-5deg)' }
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' }
        },
        fadeInUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' }
        }
      },
      animation: {
        float: 'float 4s ease-in-out infinite',
        pulseGlow: 'pulseGlow 2s ease-in-out infinite',
        equalize: 'equalize 1.2s ease-in-out infinite',
        musicPulse: 'musicPulse 2s ease-in-out infinite',
        beat: 'beat 1.5s ease-in-out infinite',
        shimmer: 'shimmer 2s infinite',
        bounceIcon: 'bounceIcon 2s ease-in-out infinite',
        wave: 'wave 3s ease-in-out infinite',
        slideIn: 'slideIn 0.5s ease-out',
        fadeInUp: 'fadeInUp 0.6s ease-out',
        blob: 'blob 7s infinite'
      }
    },
  },
  plugins: [],
}
