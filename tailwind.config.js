/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563EB', // Electric Cobalt Blue (Neo-Brutalism)
          50: '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1D4ED8',
          800: '#1E40AF',
          900: '#1E3A8A',
          950: '#0F172A',
        },
        accent: {
          teal: '#10B981',
          'teal-light': '#ECFDF5',
          amber: '#FACC15',
          'amber-light': '#FEF9C3',
          rose: '#F43F5E',
          'rose-light': '#FFE4E6',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          page: '#FAF6EE',
          muted: '#F3EFE4',
        }
      },
      fontFamily: {
        heading: ['Outfit', 'sans-serif'],
        body: ['"DM Sans"', 'sans-serif'],
      },
      boxShadow: {
        card: '4px 4px 0px 0px #0F172A',
        'card-hover': '6px 6px 0px 0px #0F172A',
        neo: '4px 4px 0px 0px #0F172A',
        'neo-sm': '2px 2px 0px 0px #0F172A',
        'neo-lg': '6px 6px 0px 0px #0F172A',
      }
    },
  },
  plugins: [],
};
