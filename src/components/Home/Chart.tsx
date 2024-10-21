import { useQuery } from "@tanstack/react-query";
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
    <div className="w-full flex items-center justify-between px-6">
      {array.map((key) => (
        <div className="pl-6 pr-8">
          <img
            src={
              "http://openweathermap.org/img/w/" +
              data?.list[key].weather[0].icon +
              ".png"
            }
            alt=""
            className="w-16"
          />
        </div>
      ))}
    </div>
  );
};
