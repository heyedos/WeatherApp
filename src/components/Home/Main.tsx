import { Recent } from "./main/Recent";
import { City } from "./main/City";
import cn from "classnames";
import { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchWeather } from "../../api/getWeather";
import { Toaster } from "react-hot-toast";
export const Main = () => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");

  const { refetch, data } = useQuery({
    queryKey: ["forecast"],
    queryFn: () => fetchWeather(inputValue),
    enabled: false,
    retry: false,
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
  });
  console.log(data);

  return (
    <div>
      <Toaster />
      <div className="search w-full flex items-center justify-end gap-8 pr-8 max-md:pb-8 max-sm:flex-col max-sm:pr-0 ">
        <div
          className={cn(
            "  backdrop-blur-3xl rounded-full p-4 relative w-1/2 transition-all duration-500 hover:transition-[50%] ease-linear max-sm:order-1 max-md:w-11/12",
            { " w-4 max-sm:w-4 ": !isClicked },
            { "  hover:w-1/2 max-md:hover:w-11/12 ": isHovered }
          )}
          onMouseEnter={() => {
            setIsHovered(true);
          }}
          onMouseLeave={() => {
            setIsHovered(false);
          }}
          onFocus={() => {
            setIsClicked(true);
          }}
          onBlur={() => {
            setIsClicked(false);
          }}
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (inputValue.length !== 0) {
                refetch();
                setInputValue("");
              }
            }}
          >
            <button
              type="submit"
              className="w-6 absolute top-1 right-1 z-10 cursor-pointer "
            >
              <img src="../../assets/images/search.svg" alt="" />
            </button>

            {(isHovered || isClicked) && (
              <input
                type="text"
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.currentTarget.value);
                }}
                className=" outline-none absolute top-0 backdrop-blur-3xl right-0 rounded-full border-b-0 h-full pl-3 z-0 w-full bg-transparent"
              />
            )}
          </form>
        </div>

        <div className="backdrop-blur-3xl px-4 py-1 rounded-2xl border-gray-300 border border-b-0 cursor-pointer max-sm:order-3">
          <p className="text-black text-xl">Download App</p>
        </div>
      </div>
      <div className="container flex items-center px-6 max-xl:flex-col max-xl:gap-8 max-md:pb-8">
        <City />
        <Recent />
      </div>
    </div>
  );
};
