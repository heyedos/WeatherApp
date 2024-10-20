import { useQuery } from "@tanstack/react-query";
import { Bars } from "../Home/Bars";
export const Chart = () => {
  const { data, isLoading }: any = useQuery({
    queryKey: ["forecast"],
    enabled: false,
  });
  const array = [6, 14, 22, 30, 38];
  /* const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ]; */
  if (isLoading)
    return (
      <div className="w-full h-full px-6 pt-6 text-5xl text-white">
        Loading...
      </div>
    );
  return (
    <div className="w-full flex px-6 pt-6 flex-col">
      <Bars />
      <div className="w-full flex justify-between">
        {array.map((key) => (
          <div className="flex w-28 text-white text-xl">
            <p>{data?.list[key].weather[0].description}</p>
            <img
              src={
                "http://openweathermap.org/img/w/" +
                data?.list[key].weather[0].icon +
                ".png"
              }
              alt=""
              className="w-8"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
