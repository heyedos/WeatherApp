import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
export const More = () => {
  const { city } = useParams<{ city: string }>();
  const { data }: any = useQuery({
    queryKey: ["forecast"],
    enabled: false,
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
  });

  return (
    <main className="w-full items-center flex flex-col gap-6 min-h-screen  pt-10 bg-slate-900 ">
      <div className=" weather  flex flex-col items-center text-gray-200 gap-3 py-6 rounded-md bg-slate-800 px-4 ">
        <h1 className="text-4xl max-sm:text-xl">
          {city?.toUpperCase()} / {data.city.country}
        </h1>
        <div className="flex items-center gap-4">
          <p className="text-2xl">{"LAT: " + data.city.coord.lat}</p>
          <p className="text-2xl">{"LON: " + data.city.coord.lon}</p>
        </div>
        <p className="text-2xl">{"Population: " + data.city.population}</p>
        <div className="flex items-center gap-4 text-2xl">
          <p>
            {"Sunrise: " +
              new Date(data.city.sunrise * 1000).toLocaleTimeString()}
          </p>
          <p>
            {"Sunset: " +
              new Date(data.city.sunset * 1000).toLocaleTimeString()}
          </p>
        </div>
        <p className="text-2xl">
          {"Current Time: " + new Date().toLocaleTimeString()}
        </p>
        <div className="flex items-center gap-8">
          <h1 className="text-3xl">
            {"Temp: " + (data?.list[0].main.temp - 273.15).toPrecision(2) + "°"}
          </h1>
          <div className="weatherCond flex flex-col gap-2">
            <p className="text-3xl text-gray-600">
              {data.list[0].weather[0].main}
            </p>
            <p className="text-3xl text-gray-600">
              {data.list[0].weather[0].description}
            </p>
          </div>
          <img
            src={
              "http://openweathermap.org/img/w/" +
              data.list[0].weather[0].icon +
              ".png"
            }
            alt=""
            className="w-14"
          />
        </div>
        <div className="flex items-center gap-10 max-md:flex-col text-xl">
          <p>{"Cloud: " + data.list[0].clouds.all + "%"}</p>
          <div className="flex flex-col items-center">
            <p>Wind</p>
            <div className="flex items-center gap-4">
              <p>{"degree: " + data.list[0].wind.deg}</p>
              <p>{"speed: " + data.list[0].wind.speed}</p>
            </div>
          </div>
          <p>
            {"Feels like: " +
              (data?.list[0].main.feels_like - 273.15).toPrecision(2) +
              "°"}
          </p>
          <div className="flex flex-col">
            <p>
              {"Max Temp: " +
                (data?.list[0].main.temp_max - 273.15).toPrecision(2) +
                "°"}
            </p>
            <p>
              {"Min Temp: " +
                (data?.list[0].main.temp_min - 273.15).toPrecision(2) +
                "°"}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};
