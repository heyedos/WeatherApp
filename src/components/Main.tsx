import { useState } from "react";
import { ForecastdayTypes } from "../types";
import cn from "classnames";
import { Weather } from "./Weather";
import { useMutation } from "@tanstack/react-query";
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
  const nextDays = [1, 2, 3];
  const [searchInput, setSearchInput] = useState<string>("");
  const url = `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${searchInput}&days=3`;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "aa6e1c2801msh0e44508236e744ep13c39fjsnac0d5b66848a",
      "x-rapidapi-host": "weatherapi-com.p.rapidapi.com",
    },
  };
  /* const userQueries = useQueries({
    queries: [
      {
        queryKey: ["repoData"],
        queryFn: async () => {
          const response = await fetch(url, options);
          const res = await response.json();
          if (!response.ok) {
            throw new Error(res.error.message);
          }
          return res;
        },
        enabled: false,
        retry: false,
        staleTime: Infinity,
      },
      {
        queryKey: ["repoData2"],
        queryFn: async () => {
          const response = await fetch(
            "https://weatherapi-com.p.rapidapi.com/forecast.json?q=paris&days=3",
            options
          );
          const res = await response.json();
          if (!response.ok) {
            throw new Error(res.error.message);
          }
          return res;
        },
        enabled: false,
        retry: false,
        staleTime: Infinity,
      },
    ],
  });
  const { isLoading, data, refetch, isError, isSuccess } = userQueries[0]; */

  /* const fetchapi = async () => {
    const response = await fetch("url").then((response) => response.json());
  };
  const fetchapi2 = async () => {
    const response = await fetch("url").then((response) => response.json());
  };
  const fetchapi3 = async () => {
    const response = await fetch("url").then((response) => response.json());
  };
  Promise.all([fetchapi, fetchapi2, fetchapi3]).then((results) => {
    const [data1, data2, data3] = results;
    console.log("data1: " + data1);
    console.log("data2: " + data2);
    console.log("data3: " + data3);
  }); */

  const mutation = useMutation({
    mutationKey: ["repoData"],
    mutationFn: async () => {
      const response = await fetch(url, options);
      const res = await response.json();
      setSearchInput("");
      if (!response.ok) {
        throw new Error(res.error.message);
      }
      return res;
    },
  });

  if (mutation.isPending) return <div>isLoading...</div>;

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
            mutation.mutate();
          }}
        >
          <img src="/assets/images/search.svg" alt="" />
        </div>
      </div>
      <div
        className={cn(
          " weather w-full bg-blue-900 flex flex-col items-center text-gray-200 gap-3 py-6 rounded-md ",
          { " py-10": mutation.isSuccess && !mutation.isError }
        )}
      >
        <h1 className="text-4xl max-sm:text-xl">
          {mutation.isSuccess && !mutation.isError
            ? mutation.data?.location.name +
              " , " +
              mutation.data?.location.country
            : "Name/Country"}
        </h1>
        <p className="text-xl">
          {mutation.isSuccess && !mutation.isError
            ? mutation.data?.current.temp_c + " °C degree"
            : "degree"}
        </p>
        {mutation.isSuccess && !mutation.isError ? (
          <img
            src={mutation.data?.current.condition.icon}
            alt="weatherIcon"
            className="w-1/12"
          />
        ) : (
          <div>Icon</div>
        )}
        <p>
          {mutation.isSuccess && !mutation.isError
            ? mutation.data?.current.condition.text
            : "Condition"}
        </p>
        <p>
          {mutation.isSuccess && !mutation.isError
            ? days[
                new Date(
                  mutation.data?.location.localtime || "unValid Date"
                ).getDay()
              ] +
              " " +
              mutation.data?.location.localtime.slice(11, 16)
            : "Local Time"}
        </p>
        <div className="flex items-center gap-8 max-md:flex-col">
          <p>
            {mutation.isSuccess && !mutation.isError
              ? "Cloud: " + mutation.data?.current.cloud + "%"
              : "Cloud: "}
          </p>
          <p>
            {mutation.isSuccess && !mutation.isError
              ? "Wind: " + mutation.data?.current.wind_mph + " mph"
              : "Wind: "}
          </p>
          <p>
            {mutation.isSuccess && !mutation.isError
              ? mutation.data?.current.temp_f + "F Degree"
              : "F Degree"}
          </p>
          <p>
            {mutation.isSuccess && !mutation.isError
              ? "Lat: " + mutation.data?.location.lat
              : "LAT: "}
          </p>
          <p>
            {mutation.isSuccess && !mutation.isError
              ? "Lon: " + mutation.data?.location.lon
              : "Lon: "}
          </p>
        </div>
      </div>
      <div className="botWeathers flex items-center justify-between w-full max-md:flex-col max-md:gap-4">
        {mutation.isSuccess && !mutation.isError
          ? mutation.data?.forecast.forecastday.map(
              (key: ForecastdayTypes, index: number) => (
                <Weather weather={key} key={index} />
              )
            )
          : nextDays.map((_, index: number) => <Weather key={index} />)}
      </div>
    </main>
  );
};
