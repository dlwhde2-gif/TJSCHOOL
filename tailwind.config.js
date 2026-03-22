/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#004d3d', // Deep Green from Yujung School
          light: '#006d56',
          dark: '#00362b',
        },
        secondary: {
          DEFAULT: '#ffca08', // Yellow from Yujung School
          light: '#ffd43a',
          dark: '#cca206',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Noto Sans KR', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
