/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',       // Next.js /app directory
    './pages/**/*.{js,ts,jsx,tsx}',     // If you use /pages
    './components/**/*.{js,ts,jsx,tsx}',// Custom components
    './src/**/*.{js,ts,jsx,tsx}',       // General source files
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'float-delayed': 'float 8s ease-in-out 1s infinite',
        'float-fast': 'float 4s ease-in-out 0.5s infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};
