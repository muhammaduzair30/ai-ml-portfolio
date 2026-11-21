/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        cyber: {
          darkest: '#03050a',
          bg: '#05070e',
          card: 'rgba(11, 16, 28, 0.72)',
          surface: '#0b1220',
          hover: 'rgba(17, 24, 39, 0.8)',
          border: 'rgba(255, 255, 255, 0.08)',
          borderLight: 'rgba(255, 255, 255, 0.16)',
          cyan: '#00f2fe',
          cyanDim: 'rgba(0, 242, 254, 0.15)',
          blue: '#3b82f6',
          purple: '#8b5cf6',
          purpleDim: 'rgba(139, 92, 246, 0.15)',
          emerald: '#10b981',
          emeraldDim: 'rgba(16, 185, 129, 0.15)',
          rose: '#f43f5e',
          amber: '#f59e0b',
        }
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'cyber-gradient': 'linear-gradient(135deg, rgba(0,242,254,0.1) 0%, rgba(139,92,246,0.1) 50%, rgba(16,185,129,0.05) 100%)',
      }
    },
  },
  plugins: [],
}
