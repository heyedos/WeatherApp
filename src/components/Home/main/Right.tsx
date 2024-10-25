import { useEffect, useState } from "react";
import { weatherApp } from "../../../types";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
export const Right = () => {
  const [previosData, setPreviousData] = useState<weatherApp>();
  const [previosDataTwo, setPreviousDataTwo] = useState<weatherApp>();
  const [previosDataThree, setPreviousDataThree] = useState<weatherApp>();

  const { data } = useQuery<weatherApp>({
    queryKey: ["forecast"],
    enabled: false,
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
  });
  useEffect(() => {
    setPreviousData(data);
    setPreviousDataTwo(previosData);
    setPreviousDataThree(previosDataTwo);
  }, [data]);

  const array = [previosDataTwo, previosDataThree];
  return (
    <div className="right bars w-4/12 flex flex-col gap-12 items-end max-xl:w-full max-xl:items-center">
      <div className="desc text-base text-white">
        <p>
          With real-time data and advanced technology, we provide reliable
          forecasts for any location around the world.
        </p>
      </div>
      <div className="recently w-full flex flex-col gap-2">
        <div className="recentTop flex justify-between">
          <p className="text-white">Recently Searched</p>
          <div className="flex items-center text-white">
            <p>See All</p>
            <p>{">"}</p>
          </div>
        </div>
        <div className="flex items-center justify-between gap-2 max-md:flex-col max-md:gap-4">
          {array.map((key) => (
            <div className="recent_card border border-white p-5 rounded-3xl bg-gray-700 w-full">
              <div className="flex justify-between items-center">
                {key ? (
                  <img
                    src={
                      "http://openweathermap.org/img/w/" +
                      key?.list[0].weather[0].icon +
                      ".png"
                    }
                    alt=""
                    className="w-16"
                  />
                ) : (
                  <div className="text-white text-3xl">null</div>
                )}
                <p className="text-3xl text-white">
                  {key
                    ? (key?.list[0].main.temp - 273.14).toPrecision(3)
                    : "null"}
                </p>
              </div>
              <div className="flex flex-col pt-2">
                <p className="text-white text-lg">
                  {key ? key?.city.name + " / " + key?.city.country : "null"}
                </p>
                <p className="text-gray-500 text-sm">
                  {key ? key?.list[0].weather[0].description : "null"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
