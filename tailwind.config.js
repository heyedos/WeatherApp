/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        Rain: "url('../../public/assets/images/rain.jpg')",
        Clear: "url('../../public/assets/images/sunny1.jpg')",
        Clouds: "url('../../public/assets/images/Clouds2.jpg')",
        Snow: "url('../../public/assets/images/snow.png')",
        Thunderstorm: "url('../../public/assets/images/thunderstorm.png')",
        Mist: "url('../../public/assets/images/mist.jpeg')",
      },
    },
  },
  plugins: [],
};
