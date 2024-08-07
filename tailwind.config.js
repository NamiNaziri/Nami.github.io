// /** @type {import('tailwindcss').Config} */
// import nextui from "@nextui-org/react"

// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//     "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {},
//   },
//   darkMode: "class",
//   plugins: [nextui()],

// }
// eslint-disable-next-line no-undef
const {nextui} = require("@nextui-org/react");

// eslint-disable-next-line no-undef
module.exports = { 
  content: [ 
    
    './app/**/*.{js,ts,jsx,tsx,mdx}', // Note the addition of the `app` directory.
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",

 
    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  
  ], 
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [nextui()],
 
  
  }

