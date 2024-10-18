/* import { useEffect, useState } from "react";
import { ForecastdayTypes } from "../types";
import cn from "classnames";
import { Weather } from "./Weather";
import { useMutation, useQuery } from "@tanstack/react-query"; */
import { Right } from "./main/Right";
import { Left } from "./main/Left";
import cn from "classnames";
import { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
export const Main = () => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");

  const fetchWeather = async () => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${inputValue}&appid=81f21fae0eae35404c85514685353bfe`
    );
    if (!response.ok) {
      throw new Error("error");
    }
    const res = await response.json();
    console.log(res);
    return res;
  };
  const { data, refetch } = useQuery({
    queryKey: ["forecast"],
    queryFn: () => fetchWeather(),
    enabled: false,
    placeholderData: keepPreviousData,
    staleTime: 10000,
  });

  console.log(data);

  return (
    <div>
      <div className="search w-full flex items-center justify-end gap-8 pr-8">
        <div
          className={cn(
            "bg-gray-600 rounded-full p-4 relative w-4 transition-all duration-1000 hover:transition-[50%] ease-linear",
            { " w-1/2 ": isHovered }
          )}
          onMouseEnter={() => {
            setIsHovered(true);
          }}
          onMouseLeave={() => {
            setIsHovered(false);
          }}
        >
          <img
            src="../../assets/images/search.svg"
            alt=""
            className="w-6 absolute top-1 right-1 z-10 cursor-pointer "
            onClick={() => {
              refetch().then(() => {
                setInputValue("");
              });
            }}
          />
          {isHovered && (
            <input
              type="text"
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.currentTarget.value);
              }}
              className=" outline-none absolute top-0 bg-slate-600 right-0 rounded-full border-b-0 w-full h-full pl-3 z-0  "
            />
          )}
        </div>
        <div className="bg-gray-700 px-4 py-1 rounded-2xl border-gray-300 border border-b-0">
          <p className="text-white text-xl">More Page</p>
        </div>
      </div>
      <div className="container flex items-center px-6">
        <Left />
        <Right />
      </div>
    </div>
  );
};
