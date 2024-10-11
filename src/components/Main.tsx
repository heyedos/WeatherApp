import { useState } from "react";
import { errorMsg, WeatherTypes } from "../types";
export const Main = ({ setErrorMsg }: errorMsg) => {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const [searchInput, setSearchInput] = useState<string>("");
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
      setIsError(true);
      const response = await fetch(url, options);
      const result = await response.json();
      setWeather(result);
      {
        response.status === 200 && setIsError(false);
      }
      console.log(result);
      setErrorMsg(result.error?.message);
    } catch (error) {
      setIsError(true);
      setErrorMsg(error);
      console.log(error);
    }
  };

  const nextDay = [1, 2, 3];
  return (
    <main className="w-1/2 items-center flex flex-col justify-between gap-6">
      <div className="searchBar flex w-full overflow-hidden rounded-lg ">
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
      <div
        className={
          " weather w-full bg-blue-900 flex flex-col items-center text-gray-200 gap-3 py-6 rounded-md " +
          (isError && " py-[2.75rem]")
        }
      >
        <h1 className="text-4xl">
          {isError
            ? "Name/Country"
            : weather.location.name + " , " + weather.location.country}
        </h1>
        <p className="text-xl">
          {isError ? "degree" : weather.current.temp_c + "c degree"}
        </p>
        {isError ? (
          <div>Icon</div>
        ) : (
          <img
            src={weather.current.condition.icon}
            alt="weatherIcon"
            className="w-1/12"
          />
        )}
        <p>{isError ? "Condition" : weather.current.condition.text}</p>
        <p>
          {isError
            ? "Local Time"
            : days[new Date(weather.location.localtime).getDay()] +
              " " +
              weather.location.localtime.slice(11, 16)}
        </p>
        <div className="flex items-center gap-8">
          <p>{isError ? "Cloud: " : "Cloud: " + weather.current.cloud + "%"}</p>
          <p>
            {isError ? "Wind: " : "Wind: " + weather.current.wind_mph + " mph"}
          </p>
          <p>{isError ? "F Degree" : weather.current.temp_f + "F Degree"}</p>
          <p>{isError ? "LAT: " : "Lat: " + weather.location.lat}</p>
          <p>{isError ? "Lon: " : "Lon: " + weather.location.lon}</p>
        </div>
      </div>
      <div className="botWeathers flex items-center justify-between w-full">
        {isError
          ? nextDay.map(() => (
              <div className="weathers bg-blue-900 flex flex-col items-center text-gray-200 gap-1 w-1/4 py-4 rounded-md">
                <h1 className="text-xl">Day</h1>
                <div>
                  <p>Image</p>
                </div>
                <p className="text-xl">Degree</p>
                <p>Condition</p>
              </div>
            ))
          : weather.forecast.forecastday.map((key: any, index: number) => (
              <div className="weathers bg-blue-900 flex flex-col items-center text-gray-200 gap-1 w-1/4 py-1 rounded-md">
                <h1 className="text-xl">
                  {
                    days[
                      new Date(
                        weather.forecast.forecastday[index].date
                      ).getDay()
                    ]
                  }
                </h1>

                <img
                  className="w-12"
                  src={weather.forecast.forecastday[index].day.condition.icon}
                  alt="weatherIcon"
                />

                <p className="text-xl">
                  {weather.forecast.forecastday[index].day.avgtemp_c}
                </p>
                <p className="text-center w-40">
                  {weather.forecast.forecastday[index].day.condition.text}
                </p>
              </div>
            ))}
      </div>
    </main>
  );
};
