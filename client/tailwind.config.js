/** @type {import('tailwindcss').Config} */
export default {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // clr-txt-primary: "fff" <-- custom colors here
      },
      fontFamily: {
        sans: ["Roboto", "sans-serif"],
        serif: ["Georgia", "serif"],
      },
    },
  },
  plugins: [],
  // darkMode: "class" <-- only if using tw for dark mode rather than radix
};
