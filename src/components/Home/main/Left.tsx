import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { optionsProps, positionProps, weatherApp } from "../../../types";

export const Left = () => {
  const options: optionsProps = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const [lon, setLon] = useState<number>();
  const [lat, setLat] = useState<number>();
  const handleLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, errorr);
    } else {
      console.log("Geolocation is not supported");
      setLat(41.015137);
      setLon(28.97953);
    }
  };
  const success = (position: positionProps) => {
    setLat(position.coords.latitude);
    setLon(position.coords.longitude);
  };
  function errorr() {
    console.log("Unable to retrieve your location");
    setLat(41.015137);
    setLon(28.97953);
  }

  const fetchWeatherDays = async () => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=81f21fae0eae35404c85514685353bfe`
    );
    const res = await response.json();
    if (!response.ok) {
      throw res;
    }
    return res;
  };
  const { data, isSuccess } = useQuery<weatherApp>({
    queryKey: ["forecast"],
    queryFn: () => fetchWeatherDays(),
    enabled: !!handleLocation && !!lat && !!lon,
    refetchOnWindowFocus: false,
  });
  if (!data) {
    useEffect(() => {
      handleLocation();
    }, []);
  }

  if (isSuccess)
    return (
      <div className="left bars w-9/12 flex flex-col gap-12 items-start max-xl:w-full">
        <div className="location w-full flex items-center justify-start gap-4">
          <img src="../../assets/images/location.svg" alt="" className="w-6" />
          <p className="text-2xl text-black">
            {data?.city.name + " " + data?.city.country}
            <span className="text-gray-600">
              (
              {data
                ? new Date(data?.list[0].dt * 1000)
                    .toLocaleDateString("en-US", options)
                    .slice(0, 18)
                : "undefined"}
              )
            </span>
          </p>
        </div>
        <div className="degree flex items-center gap-4">
          <h1 className="text-7xl text-black">
            {data?.list[0].main.temp
              ? (data?.list[0].main.temp - 273.15).toPrecision(2) + "°"
              : "undefiend"}
          </h1>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-6 backdrop-blur-3xl px-5 py-1 rounded-full">
              <p className="text-gray-500">H</p>
              <p className="text-black">
                {data?.list[0].main.temp_max
                  ? (data?.list[0].main.temp_max - 273.15).toPrecision(2) + "°"
                  : "undefiend"}
              </p>
            </div>
            <div className="flex items-center gap-6 backdrop-blur-3xl px-5 py-1 rounded-full">
              <p className="text-gray-500">L</p>
              <p className="text-black">
                {data?.list[0].main.temp_min
                  ? (data?.list[0].main.temp_min - 273.15).toPrecision(2) + "°"
                  : "undefiend "}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 text-6xl text-gray-800">
          <p>{data?.list[0].weather[0].main}</p>
          <p>{data?.list[0].weather[0].description}</p>
        </div>
      </div>
    );
};
