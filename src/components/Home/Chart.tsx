import { useQuery } from "@tanstack/react-query";
export const Chart = () => {
  const { data, isLoading, isError }: any = useQuery({
    queryKey: ["forecast"],
    enabled: false,
    refetchOnWindowFocus: false,
  });
  const array = [6, 14, 22, 30, 38];
  if (isLoading)
    return (
      <div className="w-full h-full px-6 pt-6 text-5xl text-white">
        Loading...
      </div>
    );
  return (
    <div className="w-full flex items-center justify-between pl-2">
      {array.map((key) => (
        <div className="pl-2 pr-3 max-md:px-0">
          {data ? (
            <img
              src={
                "http://openweathermap.org/img/w/" +
                data?.list[key].weather[0].icon +
                ".png"
              }
              alt=""
              className="w-16"
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
