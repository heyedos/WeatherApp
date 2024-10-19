import { useQuery } from "@tanstack/react-query";

export const Chart = () => {
  const { data, isLoading }: any = useQuery({
    queryKey: ["forecast"],
    enabled: false,
  });
  const array = [6, 14, 22, 30, 38];
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  if (isLoading)
    return (
      <div className="w-full h-full px-6 pt-6 text-5xl text-white">
        Loading...
      </div>
    );
  return (
    <div className="w-full h-full flex items-end justify-between px-6 pt-6">
      {array.map((key) => (
        <div className="flex flex-col items-center justify-between h-5/6 text-white text-xl">
          <p>{days[new Date(data?.list[key].dt_txt.slice(0, 10)).getDay()]}</p>
          <div className="flex flex-col items-center">
            <div className="flex items-center">
              <p className="text-4xl">
                {(data?.list[key].main.temp - 273.15).toPrecision(2) + "°"}
              </p>
              <img
                src={
                  "http://openweathermap.org/img/w/" +
                  data?.list[key].weather[0].icon +
                  ".png"
                }
                alt=""
                className="w-10"
              />
            </div>
            <p>{data?.list[key].weather[0].description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
