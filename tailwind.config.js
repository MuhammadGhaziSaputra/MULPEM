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
          DEFAULT: '#4338CA', // Indigo
          50: '#EEF2FF',
          100: '#E0E7FF',
          200: '#C7D2FE',
          300: '#A5B4FC',
          400: '#818CF8',
          500: '#6366F1',
          600: '#4F46E5',
          700: '#4338CA',
          800: '#3730A3',
          900: '#312E81',
          950: '#1E1B4B',
        },
        accent: {
          teal: '#0D9488',
          'teal-light': '#F0FDFA',
          amber: '#F59E0B',
          'amber-light': '#FFFBEB',
          rose: '#E11D48',
          'rose-light': '#FFF1F2',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          page: '#F8FAFC',
          muted: '#F1F5F9',
        }
      },
      fontFamily: {
        heading: ['Outfit', 'sans-serif'],
        body: ['"DM Sans"', 'sans-serif'],
      },
      boxShadow: {
        card: '0 2px 8px -2px rgba(0, 0, 0, 0.05), 0 1px 4px -1px rgba(0, 0, 0, 0.03)',
        'card-hover': '0 12px 24px -6px rgba(67, 56, 202, 0.12), 0 4px 8px -2px rgba(0, 0, 0, 0.05)',
      }
    },
  },
  plugins: [],
};
