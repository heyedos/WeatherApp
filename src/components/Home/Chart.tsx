import { useQuery } from "@tanstack/react-query";
import { weatherApp } from "../../types";
export const Chart = () => {
  const { data, isLoading, isError } = useQuery<weatherApp>({
    queryKey: ["forecast"],
    enabled: false,
    refetchOnWindowFocus: false,
  });
  const array: number[] = [6, 14, 22, 30, 38];
  if (isLoading)
    return (
      <div className="w-full h-full px-6 pt-6 text-5xl text-white">
        Loading...
      </div>
    );
  return (
    <div className="w-full flex items-center justify-between pl-2 h-1/3 max-md:px-8">
      {array.map((key, index: number) => (
        <div className="pl-2 pr-3 max-md:p-0" key={index}>
          {data ? (
            <img
              src={
                "http://openweathermap.org/img/w/" +
                data?.list[key].weather[0].icon +
                ".png"
              }
              alt=""
              className="w-full"
            />
          ) : isError ? (
            "error"
          ) : (
            "loading"
          )}
        </div>
      ))}
    </div>
  );
};
