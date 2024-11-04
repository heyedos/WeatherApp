/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        Rain: "url('../../assets/images/rain.jpg')",
        Clear: "url('../../assets/images/sunny1.jpg')",
        Clouds: "url('../../assets/images/Clouds2.jpg')",
        Snow: "url('../../assets/images/snow.png')",
        Thunderstorm: "url('../../assets/images/thunderstorm.png')",
        Mist: "url('../../assets/images/mist.jpeg')",
      },
    },
  },
  plugins: [],
};
