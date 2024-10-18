/* import { useEffect, useState } from "react";
import { ForecastdayTypes } from "../types";
import cn from "classnames";
import { Weather } from "./Weather";
import { useMutation, useQuery } from "@tanstack/react-query"; */
import { Right } from "./main/Right";
import { Left } from "./main/Left";
import cn from "classnames";
import { useState } from "react";
export const Main = () => {
  /* const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ]; */
  /* const nextDays = [1, 2, 3];
  const [searchInput, setSearchInput] = useState<string>("");
  const [lon, setLon] = useState<string>();
  const [lat, setLat] = useState<string>(); */

  /*  const mutation = useMutation({
    mutationKey: ["repoData"],
    mutationFn: async () => {
      const response = await fetch("url");
      const res = await response.json();
      setSearchInput("");
      if (!response.ok) {
        throw new Error(res.error.message);
      }
      return res;
    },
  }); */

  /* useEffect(() => {
    const handleLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
      } else {
        console.log("Geolocation is not supported");
      }
    };
    handleLocation();
    function success(position: any) {
      setLat(position.coords.latitude);
      setLon(position.coords.longitude);
      console.log(
        `Latitude: ${position.coords.latitude}, Longitude: ${position.coords.longitude}`
      );
    }
    function error() {
      console.log("Unable to retrieve your location");
    }
  }, []); */

  /* const fetchWeather = async () => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${searchInput}&appid=81f21fae0eae35404c85514685353bfe`
    );
    const res = await response.json();
    console.log(res);
    return res;
  }; */
  /* const fetchLocationName = async () => {
    const response = await fetch(
      `https://us1.locationiq.com/v1/reverse?key=pk.2fd7ccf82e202634c8d70cc1597769e7&lat=${lat}&lon=${lon}&format=json&`
    );
    const res = await response.json();
    return res;
  }; */
  /* const { refetch, data } = useQuery({
    queryKey: ["forecast"],
    queryFn: () => fetchWeather(),
    enabled: false,
  }); */
  /* const location = useQuery({
    queryKey: ["location"],
    queryFn: () => fetchLocationName(),
    enabled: false,
  }); */

  /* if (mutation.isPending) return <div>isLoading...</div>; */
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
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
