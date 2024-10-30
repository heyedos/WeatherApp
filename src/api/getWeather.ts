import toast from "react-hot-toast";

export const fetchWeather = async (inputValue: string) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${inputValue}&appid=81f21fae0eae35404c85514685353bfe`
  );
  const res = await response.json();
  if (!response.ok) {
    toast.error(res.message, { id: "error", duration: 2000 });
    throw res.message;
  }
  return res;
};
