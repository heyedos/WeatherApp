export const fetchWeather = async (inputValue: string) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${inputValue}&appid=81f21fae0eae35404c85514685353bfe`
  );
  const res = await response.json();
  if (!response.ok) {
    throw res;
  }
  return res;
};
