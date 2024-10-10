import weatherJson from "../weather.json";
import { useState } from "react";
import { WeatherTypes } from "../types";
export const Main = () => {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const [searchInput, setSearchInput] = useState<string>();
  const [weather, setWeather] = useState<WeatherTypes>({
    location: {
      name: "",
      country: "",
      lat: "",
      lon: "",
      localtime: "",
    },
    current: {
      condition: {
        icon: "",
        text: "",
      },
      cloud: "",
      wind_mph: "",
      temp_c: "",
      temp_f: "",
    },
    forecast: {
      forecastday: [
        {
          date: "",
          day: {
            avgtemp_c: "",
            condition: {
              text: "",
              icon: "",
            },
          },
        },
        {
          date: "",
          day: {
            avgtemp_c: "",
            condition: {
              text: "",
              icon: "",
            },
          },
        },
        {
          date: "",
          day: {
            avgtemp_c: "",
            condition: {
              text: "",
              icon: "",
            },
          },
        },
      ],
    },
  });
  const [isError, setIsError] = useState<boolean>(true);
  const url = `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${searchInput}&days=5`;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "aa6e1c2801msh0e44508236e744ep13c39fjsnac0d5b66848a",
      "x-rapidapi-host": "weatherapi-com.p.rapidapi.com",
    },
  };

  const getWeather = async () => {
    try {
      const response = await fetch(url, options);
      const result = await response.json();
      setWeather(result);
      setIsError(false);
      console.log(result);
    } catch (error) {
      console.error(error);
      setIsError(true);
    }
  };
  return (
    <main className="w-1/2 items-center flex flex-col justify-between gap-6">
      <div className="searchBar flex w-full overflow-hidden rounded-lg">
        <input
          type="text"
          placeholder="Search a city"
          className="bg-white w-full py-2 pl-2"
          onChange={(e) => {
            setSearchInput(e.currentTarget.value);
          }}
        />
        <div
          className="bg-slate-600 flex items-center cursor-pointer"
          onClick={() => {
            getWeather();
          }}
        >
          <img src="/assets/search.svg" alt="" />
        </div>
      </div>
      <div className="weather w-full bg-blue-900 flex flex-col items-center text-gray-200 gap-3 py-6 rounded-md">
        <h1 className="text-4xl">
          {isError
            ? "N/A"
            : weather.location.name + " , " + weather.location.country}
        </h1>
        <p className="text-xl">
          {isError ? "N/A" : weather.current.temp_c + "c degree"}
        </p>
        {isError ? (
          <div>N/A</div>
        ) : (
          <img
            src={weather.current.condition.icon}
            alt="weatherIcon"
            className="w-1/12"
          />
        )}
        <p>{isError ? "N/A" : weather.current.condition.text}</p>
        <p>
          {isError
            ? "N/A"
            : days[new Date(weatherJson.location.localtime).getDay()] +
              " " +
              weatherJson.location.localtime.slice(11, 16)}
        </p>
        <div className="flex items-center gap-8">
          <p>{isError ? "N/A" : "Cloud: " + weather.current.cloud + "%"}</p>
          <p>
            {isError ? "N/A" : "Wind: " + weather.current.wind_mph + " mph"}
          </p>
          <p>{isError ? "N/A" : weather.current.temp_f + "F Degree"}</p>
          <p>{isError ? "N/A" : "Lat: " + weather.location.lat}</p>
          <p>{isError ? "N/A" : "Lon: " + weather.location.lon}</p>
        </div>
      </div>
      <div className="botWeathers flex items-center justify-between w-full ">
        {weather.forecast.forecastday.map((key: any, index: number) => (
          <div className="weathers bg-blue-900 flex flex-col items-center text-gray-200 gap-1 px-8 py-2">
            <h1 className="text-xl">
              {isError ? (
                <p>N/A</p>
              ) : (
                days[
                  new Date(weather.forecast.forecastday[index].date).getDay()
                ]
              )}
            </h1>
            {isError ? (
              <div>not Found</div>
            ) : (
              <img
                className="w-12"
                src={weather.forecast.forecastday[index].day.condition.icon}
                alt="weatherIcon"
              />
            )}
            <p className="text-xl">
              {isError
                ? "N/A"
                : weather.forecast.forecastday[index].day.avgtemp_c}
            </p>
            <p>
              {isError
                ? "N/A"
                : weather.forecast.forecastday[index].day.condition.text}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
};
