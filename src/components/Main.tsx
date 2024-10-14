import { useState } from "react";
import { ForecastdayTypes, queryProps } from "../types";
import cn from "classnames";
import { Weather } from "./Weather";
import { useQuery } from "@tanstack/react-query";
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
  const [searchInput, setSearchInput] = useState<string>("");
  const { isLoading, data, refetch, isError, isSuccess }: queryProps = useQuery(
    {
      queryKey: ["repoData"],
      queryFn: async () => {
        const response = await fetch(url, options);
        const res = await response.json();
        console.log(data);
        if (!response.ok) {
          throw new Error(res.error.message);
        }
        return res;
      },
      enabled: false,
      retry: false,
      staleTime: Infinity,
    }
  );

  const url = `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${searchInput}&days=3`;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "aa6e1c2801msh0e44508236e744ep13c39fjsnac0d5b66848a",
      "x-rapidapi-host": "weatherapi-com.p.rapidapi.com",
    },
  };

  if (isLoading) return <div>isLoading...</div>;
  const nextDays = [1, 2, 3];
  return (
    <main className="w-1/2 items-center flex flex-col justify-between gap-6 max-md:w-4/6">
      <div className="searchBar flex w-full overflow-hidden rounded-xl ">
        <input
          type="text"
          placeholder="Search a city"
          className="bg-white w-full py-2 pl-2"
          value={searchInput}
          onChange={(e) => {
            setSearchInput(e.currentTarget.value);
          }}
        />
        <div
          className="bg-slate-600 flex items-center cursor-pointer p-2"
          onClick={() => {
            refetch().then(() => {
              setSearchInput("");
            });
          }}
        >
          <img src="/assets/images/search.svg" alt="" />
        </div>
      </div>
      <div
        className={cn(
          " weather w-full bg-blue-900 flex flex-col items-center text-gray-200 gap-3 py-6 rounded-md ",
          { " py-10": isSuccess && !isError }
        )}
      >
        <h1 className="text-4xl max-sm:text-xl">
          {isSuccess && !isError
            ? data?.location.name + " , " + data?.location.country
            : "Name/Country"}
        </h1>
        <p className="text-xl">
          {isSuccess && !isError
            ? data?.current.temp_c + " °C degree"
            : "degree"}
        </p>
        {isSuccess && !isError ? (
          <img
            src={data?.current.condition.icon}
            alt="weatherIcon"
            className="w-1/12"
          />
        ) : (
          <div>Icon</div>
        )}
        <p>
          {isSuccess && !isError ? data?.current.condition.text : "Condition"}
        </p>
        <p>
          {isSuccess && !isError
            ? days[
                new Date(data?.location.localtime || "unValid Date").getDay()
              ] +
              " " +
              data?.location.localtime.slice(11, 16)
            : "Local Time"}
        </p>
        <div className="flex items-center gap-8 max-md:flex-col">
          <p>
            {isSuccess && !isError
              ? "Cloud: " + data?.current.cloud + "%"
              : "Cloud: "}
          </p>
          <p>
            {isSuccess && !isError
              ? "Wind: " + data?.current.wind_mph + " mph"
              : "Wind: "}
          </p>
          <p>
            {isSuccess && !isError
              ? data?.current.temp_f + "F Degree"
              : "F Degree"}
          </p>
          <p>
            {isSuccess && !isError ? "Lat: " + data?.location.lat : "LAT: "}
          </p>
          <p>
            {isSuccess && !isError ? "Lon: " + data?.location.lon : "Lon: "}
          </p>
        </div>
      </div>
      <div className="botWeathers flex items-center justify-between w-full max-md:flex-col max-md:gap-4">
        {isSuccess && !isError
          ? data?.forecast.forecastday.map(
              (key: ForecastdayTypes, index: number) => (
                <Weather weather={key} key={index} />
              )
            )
          : nextDays.map((_, index: number) => <Weather key={index} />)}
      </div>
    </main>
  );
};
