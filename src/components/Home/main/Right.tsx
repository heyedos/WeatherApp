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
    <div className="right bars w-5/12 flex flex-col gap-4 items-end max-xl:w-full max-xl:items-center">
      <div className="desc text-base text-black">
        <p>
          With real-time data and advanced technology, we provide reliable
          forecasts for any location around the world.
        </p>
      </div>
      <div className="recently w-full flex flex-col gap-2 items-center">
        <div className="flex justify-between text-sm w-full px-2">
          <p className="text-black">Recently Searched</p>
          <div className="text-black">
            <p>See All {">"}</p>
          </div>
        </div>
        <div className="flex items-center justify-between gap-2 w-full max-md:flex-col max-md:gap-4">
          {array.map((key, index: number) => (
            <div
              className="recent_card border border-white rounded-3xl backdrop-blur-3xl  w-full h-40 flex items-start flex-col justify-center p-5"
              key={index}
            >
              <div className="flex justify-between items-center w-full">
                {key ? (
                  <img
                    src={
                      "http://openweathermap.org/img/w/" +
                      key?.list[0].weather[0].icon +
                      ".png"
                    }
                    alt=""
                    className="w-12"
                  />
                ) : (
                  <div className="text-black text-3xl w-12">null</div>
                )}
                <p className="text-3xl text-black">
                  {key
                    ? (key?.list[0].main.temp - 273.14).toPrecision(3) + "°"
                    : "null"}
                </p>
              </div>
              <div className="flex flex-col">
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
