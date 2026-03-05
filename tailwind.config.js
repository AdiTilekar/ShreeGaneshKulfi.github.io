/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  safelist: [
    // Dynamic accent colors used in FeatureCard component
    'bg-brand-orange/10', 'text-brand-orange',
    'bg-brand-mint/10', 'text-brand-mint',
    'bg-brand-pink/10', 'text-brand-pink',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          // Primary - Deep Saffron Orange (Signature Brand Color)
          orange: '#E8860C',
          'orange-light': '#F6A93B',
          'orange-dark': '#C26E08',
          'orange-bg': '#FFF8EB',
          // Secondary - Cool Mint (Refreshing)
          mint: '#4ECDC4',
          'mint-light': '#7EDDD6',
          'mint-dark': '#26A69A',
          'mint-bg': '#E0F7F6',
          // Tertiary - Warm Gold (Sweet)
          pink: '#D97706',
          'pink-light': '#FCD34D',
          'pink-dark': '#B45309',
          'pink-bg': '#FFFBEB',
        },
        status: {
          pending: '#E8860C',
          confirmed: '#26DE81',
          packed: '#45B7D1',
          delivery: '#8B5CF6',
          delivered: '#10B981',
          cancelled: '#EE5A6F',
        },
        tier: {
          gold: '#FFD700',
          'gold-light': '#FFE55C',
          'gold-bg': '#FFF4CC',
          silver: '#C0C0C0',
          'silver-light': '#D9D9D9',
          'silver-bg': '#F0F0F0',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}