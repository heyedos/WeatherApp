export const fetchWeatherDays = async (lat: string, lon: string) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=81f21fae0eae35404c85514685353bfe`
  );
  const res = await response.json();
  if (!response.ok) {
    throw res;
  }
  return res;
};
