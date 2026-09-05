/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        fi: {
          bg: '#F5F5F7',
          purple: '#7B2FF7',
          'purple-hover': '#6820E3',
          'purple-light': '#EDE4FB',
          'purple-light-hover': '#E2D4F8',
          text: '#1A1A2E',
          muted: '#8A8A9E',
          card: '#FFFFFF',
          amber: '#FFC24B',
          border: '#E8E8EE',
          badge: '#F0EAFB',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'phone': '0 25px 60px -15px rgba(0, 0, 0, 0.25), 0 0 1px rgba(0, 0, 0, 0.1)',
        'card': '0 2px 10px rgba(0, 0, 0, 0.03)',
        'nav': '0 -4px 20px rgba(0, 0, 0, 0.06)',
        'pill': '0 8px 24px rgba(123, 47, 247, 0.25)',
      },
      borderRadius: {
        '3xl': '1.5rem',
        '4xl': '2rem',
      }
    },
  },
  plugins: [],
}
