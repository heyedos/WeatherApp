import { useQuery, keepPreviousData } from "@tanstack/react-query";

export const Card = () => {
  const { isError, data, isLoading }: any = useQuery({
    queryKey: ["forecast"],
    enabled: false,
  });
  console.log(isError);

  return (
    <div className="w-1/4 bg-gray-700 opacity-90 py-8 flex flex-col items-center border-white border rounded-3xl gap-6">
      <h1 className="text-white text-2xl text-center">WeatherWise</h1>
      <div className="flex flex-col w-11/12 gap-2 ">
        <p className="text-start text-gray-400 pl-1">Status</p>
        <div className="bg-gray-900 flex flex-col p-2 w-full rounded-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 bg-gray-600 opacity-50 rounded-full px-2 py-1">
              <img
                src="../../assets/images/up-arrow.png"
                className="-rotate-90 w-4"
                alt=""
              />
              <p className="text-gray-300">26.8%</p>
            </div>
            <img src="../../assets/images/question.png" alt="" />
          </div>
          <div className="w-full h-28"></div>
        </div>
        <div className="text-white text-center">
          <p>See Moredetails {">"}</p>
        </div>
      </div>
      <div className="flex flex-col w-full items-center gap-4">
        <div className="flex items-center justify-between w-11/12">
          <p className="text-gray-400">Select Area</p>
          <div className="flex items-center gap-2">
            <img
              src="../../assets/images/cursor.png"
              className="w-5 rotate-90"
              alt=""
            />
            <div className="rounded-full border border-white w-4 h-4"></div>
            <div className="rounded-full border border-white w-4 h-4"></div>
          </div>
        </div>
        <div className="flex relative items-center w-full justify-center overflow-hidden">
          <img
            src="../../public/assets/images/world.png"
            alt=""
            className="w-5/12 relative -left-4"
          />
          <img
            src="../../public/assets/images/world.png"
            alt=""
            className="w-6/12 relative"
          />
          <img
            src="../../public/assets/images/world.png"
            alt=""
            className="w-5/12 relative -right-4"
          />
        </div>
        <div className="bg-gray-800 px-6 py-2 rounded-3xl">
          <p className="text-white">
            {isError ? "Error" : data?.city.name + " " + data?.city.country}
          </p>
        </div>
      </div>
    </div>
  );
};
