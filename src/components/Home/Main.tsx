import { Right } from "./main/Right";
import { Left } from "./main/Left";
import cn from "classnames";
import { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const Main = () => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");

  const fetchWeather = async () => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${inputValue}&appid=81f21fae0eae35404c85514685353bfe`
    );
    const res = await response.json();
    if (!response.ok) {
      throw res;
    }
    return res;
  };
  const { refetch, error, isLoading } = useQuery({
    queryKey: ["forecast"],
    queryFn: () => fetchWeather(),
    enabled: false,
    staleTime: 10000,
    retry: false,
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
  });
  if (isLoading) return <div>Loading...</div>;
  return (
    <div>
      <div className="search w-full flex items-center justify-end gap-8 pr-8 max-md:pb-8">
        <div className="text-3xl text-red-600">
          {error?.message === "Nothing to geocode"
            ? "Input can't be empty"
            : error?.message}
        </div>

        <div
          className={cn(
            "bg-gray-600 rounded-full p-4 relative w-1/2 transition-all duration-500 hover:transition-[50%] ease-linear ",
            { " w-4 ": !isClicked },
            { "  hover:w-1/2 ": isHovered }
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
              refetch().then(() => {
                setInputValue("");
              });
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
                className=" outline-none absolute top-0 bg-slate-600 right-0 rounded-full border-b-0 h-full pl-3 z-0 w-full "
              />
            )}
          </form>
        </div>

        <div className="bg-gray-700 px-4 py-1 rounded-2xl border-gray-300 border border-b-0 cursor-pointer">
          <p className="text-white text-xl">Download App</p>
        </div>
      </div>
      <div className="container flex items-center px-6 max-xl:flex-col max-xl:gap-8 max-md:pb-8">
        <Left />
        <Right />
      </div>
    </div>
  );
};
