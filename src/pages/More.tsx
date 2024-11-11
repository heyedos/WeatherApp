import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import { weatherApp } from "../types";
import { fetchWeather } from "../api/getWeather";
import CircularProgress from "@mui/material/CircularProgress";
import { ToastBar, Toaster } from "react-hot-toast";
import { useContext, useEffect } from "react";
import classNames from "classnames";
import { dataContext } from "../App";
export const More = () => {
  const { setGlobalData, globalData } = useContext(dataContext);
  const navigate = useNavigate();
  const { city } = useParams<{ city: string }>();
  const { isLoading, isError, data, refetch } = useQuery<weatherApp>({
    queryKey: ["forecast"],
    refetchOnWindowFocus: false,
    queryFn: () => fetchWeather(city as string),
    enabled: false,
    retry: false,
    staleTime: Infinity,
  });
  useEffect(() => {
    if (data) {
      setGlobalData(data);
    }
    if (!globalData && !data) {
      refetch();
    }
    if (isError) {
      navigate("/");
    }
  }, [data, isError]);

  return isLoading ? (
    <div className="flex justify-center items-center min-h-screen w-full bg-slate-700">
      <CircularProgress />
    </div>
  ) : (
    <main
      className={classNames(
        "w-full items-center flex flex-col gap-6 min-h-screen  pt-10 bg-slate-900 max-md:pt-0 bg-cover",
        {
          "bg-Clouds": "Clouds" === globalData?.list[0].weather[0].main,
          "bg-Rain": "Rain" === globalData?.list[0].weather[0].main,
          "bg-Clear": "Clear" === globalData?.list[0].weather[0].main,
          "bg-Snow": "Snow" === globalData?.list[0].weather[0].main,
          "bg-Thunderstorm":
            "Thunderstorm" === globalData?.list[0].weather[0].main,
          "bg-Mist": "Mist" === globalData?.list[0].weather[0].main,
        }
      )}
    >
      <Toaster>
        {(t) => (
          <ToastBar
            toast={t}
            style={{
              opacity: 1,
            }}
          ></ToastBar>
        )}
      </Toaster>
      <div className=" backdrop-blur-xl  flex flex-col items-center text-gray-200 gap-3 py-6 rounded-md px-4 text-center">
        <h1 className="text-4xl max-sm:text-xl">
          {city + "/" + globalData?.city.country}
        </h1>
        <div className="flex items-center gap-4 max-md:flex-col">
          <p className="text-2xl">
            {"LAT: " + (globalData ? globalData?.city.coord.lat : "error")}
          </p>
          <p className="text-2xl">
            {"LON: " + (globalData ? globalData?.city.coord.lon : "error")}
          </p>
        </div>
        <p className="text-2xl">
          {"Population: " +
            (globalData ? globalData?.city.population : "error")}
        </p>
        <div className="flex items-center gap-4 text-2xl max-md:flex-col">
          <p>
            {"Sunrise: " +
              (globalData?.city.sunrise
                ? new Date(globalData?.city.sunrise * 1000).toLocaleTimeString()
                : "error")}
          </p>
          <p>
            {"Sunset: " +
              (globalData?.city.sunrise
                ? new Date(globalData?.city.sunset * 1000).toLocaleTimeString()
                : "error")}
          </p>
        </div>
        <p className="text-2xl">
          {"Current Time: " +
            (globalData ? new Date().toLocaleTimeString() : "error")}
        </p>
        <div className="flex items-center gap-8 max-md:flex-col">
          <h1 className="text-3xl">
            {"Temp: " +
              (globalData?.list[0].main.temp
                ? (globalData?.list[0].main.temp - 273.15).toPrecision(2) + "°"
                : "error")}
          </h1>
          <div className="weatherCond flex flex-col gap-2">
            <p className="text-3xl text-gray-600">
              {globalData ? globalData?.list[0].weather[0].main : "error"}
            </p>
            <p className="text-3xl text-gray-600">
              {globalData
                ? globalData?.list[0].weather[0].description
                : "error"}
            </p>
          </div>
          {globalData ? (
            <img
              src={
                "http://openweathermap.org/img/w/" +
                globalData?.list[0].weather[0].icon +
                ".png"
              }
              alt=""
              className="w-14"
            />
          ) : (
            <div className="w-14">error</div>
          )}
        </div>
        <div className="flex items-center gap-10 max-md:flex-col text-xl">
          <p>
            {"Cloud: " +
              (globalData ? globalData?.list[0].clouds.all + "%" : "error")}
          </p>
          <div className="flex flex-col items-center">
            <p>Wind</p>
            <div className="flex items-center gap-4">
              <p>
                {"degree: " +
                  (globalData ? globalData?.list[0].wind.deg : "error")}
              </p>
              <p>
                {"speed: " +
                  (globalData ? globalData?.list[0].wind.speed : "error")}
              </p>
            </div>
          </div>
          <p>
            {"Feels like: " +
              (globalData?.list[0].main.feels_like
                ? (globalData?.list[0].main.feels_like - 273.15).toPrecision(
                    2
                  ) + "°"
                : "error")}
          </p>
          <div className="flex flex-col">
            <p>
              {"Max Temp: " +
                (globalData?.list[0].main.temp_max
                  ? (globalData?.list[0].main.temp_max - 273.15).toPrecision(
                      2
                    ) + "°"
                  : "error")}
            </p>
            <p>
              {"Min Temp: " +
                (globalData?.list[0].main.temp_min
                  ? (globalData?.list[0].main.temp_min - 273.15).toPrecision(
                      2
                    ) + "°"
                  : "error")}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};
