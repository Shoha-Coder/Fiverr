/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    screens: {
      p200: "200px",
      mintf: "320px",
      midtf: "375px",
      maxtf: "425px",
      minp: "768px",
      p922: "922px",
      p1089: "1089px",
      minn: "1024px",
      p1200: "1200px",
      maxn: "1440px",
      p710: "710px",
      p550: "550px",
      p800: "800px",
      p899: "899px",
      p1288: "1288px",
      p1396: "1396px",
      p1150: "1150px",
      p1600: "1600px",
      p1361:"1361px",
      p1182: "1182px",
      p838: "838px",
      p1485: "1485px",
      p974: "974px",
      p908:"908px",
      sm: "680px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      p1111:"1111px"
    },
  },
  plugins: [],
};
