import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { optionsProps, weatherApp } from "../../../types";
import { fetchWeatherDays } from "../../../api/fetchWeather";
import { useContext } from "react";
import { dataContext } from "../../../App";
export const City = () => {
  const { globalData, setGlobalData } = useContext(dataContext);
  const options: optionsProps = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const [lon, setLon] = useState<string>();
  const [lat, setLat] = useState<string>();
  const handleLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, errorr);
    } else {
      console.log("Geolocation is not supported");
      setLat("41.015137");
      setLon("28.97953");
    }
  };
  const success = (position: GeolocationPosition) => {
    setLat(position.coords.latitude.toString());
    setLon(position.coords.longitude.toString());
  };
  function errorr() {
    console.log("Unable to retrieve your location");
    setLat("41.015137");
    setLon("28.97953");
  }

  const apiData = useQuery<weatherApp>({
    queryKey: ["forecast"],
    queryFn: () => fetchWeatherDays(lat as string, lon as string),
    enabled: !!handleLocation && !!lat && !!lon,
    refetchOnWindowFocus: false,
  });

  if (!apiData.data) {
    useEffect(() => {
      handleLocation();
    }, []);
  }
  if (apiData.data) {
    useEffect(() => {
      setGlobalData(apiData.data);
    }, [apiData.data]);
  }
  const { colorScheme, color } = useContext(dataContext);
  return (
    <div
      className="left bars w-9/12 flex flex-col gap-12 items-start max-xl:w-full text-red-900"
      style={{ color: colorScheme[color]?.color }}
    >
      <div className="location w-full flex items-center justify-start gap-4">
        <img src="../../assets/images/location.svg" alt="" className="w-6" />
        <p className="text-2xl ">
          {globalData?.city.name + " " + globalData?.city.country}
          <span>
            (
            {globalData
              ? new Date(globalData?.list[0].dt * 1000)
                  .toLocaleDateString("en-US", options)
                  .slice(0, 18)
              : "undefined"}
            )
          </span>
        </p>
      </div>
      <div className="degree flex items-center gap-4">
        <h1 className="text-7xl ">
          {globalData?.list[0].main.temp
            ? (globalData?.list[0].main.temp - 273.15).toPrecision(2) + "°"
            : ""}
        </h1>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-6 backdrop-blur-3xl px-5 py-1 rounded-full">
            <p className="text-gray-950">H</p>
            <p className="">
              {globalData?.list[0].main.temp_max
                ? (globalData?.list[0].main.temp_max - 273.15).toPrecision(2) +
                  "°"
                : ""}
            </p>
          </div>
          <div className="flex items-center gap-6 backdrop-blur-3xl px-5 py-1 rounded-full">
            <p className="text-gray-950">L</p>
            <p className="">
              {globalData?.list[0].main.temp_min
                ? (globalData?.list[0].main.temp_min - 273.15).toPrecision(2) +
                  "°"
                : " "}
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 text-6xl ">
        <p>{globalData?.list[0].weather[0].main}</p>
        <p>{globalData?.list[0].weather[0].description}</p>
      </div>
    </div>
  );
};
