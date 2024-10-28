import { Main } from "../components/Home/Main";
import { Card } from "../components/Home/Card";
import { LineChart } from "../components/Home/LineChart";
import { Chart } from "../components/Home/Chart";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { weatherApp } from "../types";

export const Home = () => {
  const { data, isLoading } = useQuery<weatherApp>({
    queryKey: ["forecast"],
    enabled: false,
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
  });

  console.log(data?.list[0].weather[0].main);
  if (isLoading) return <div>Loading...</div>;
  return (
    <main
      className={`w-full  min-h-screen flex py-6 pl-8 pr-1 max-md:flex-col max-md:pr-8 max-md:gap-8 max-md:items-center max-sm:px-1 bg-cover bg-slate-900 bg-${data?.list[0].weather[0].main} `}
    >
      <Card />
      <div className="flex flex-col items-center w-3/4 max-md:w-full min-h-full justify-between ">
        <Main />
        <div className="w-full h-full flex flex-col justify-center">
          <LineChart />
          <Chart />
        </div>
      </div>
    </main>
  );
};
