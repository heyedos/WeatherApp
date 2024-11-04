import { Main } from "../components/Home/Main";
import { Card } from "../components/Home/Card";
import { LineChart } from "../components/Home/LineChart";
import { Chart } from "../components/Home/Chart";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { weatherApp } from "../types";
import classNames from "classnames";
import CircularProgress from "@mui/material/CircularProgress";
import { dataContext } from "../App";
import { useContext } from "react";

export const Home = () => {
  const { isLoading } = useQuery<weatherApp>({
    queryKey: ["forecast"],
    enabled: false,
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
  });
  const { globalData } = useContext(dataContext);

  /*   const colorScheme = {
    SNOW:{
      text:"text-black "
      background:"bg-gray-200"
    }
  }
colorScheme["SNOW"].text;
  console.log(data?.list[0].weather[0].main); 
    bg-${data?.list[0].weather[0].main}      */

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-screen w-full bg-slate-700">
        <CircularProgress />
      </div>
    );
  return (
    <main
      className={classNames(
        "w-full  min-h-screen flex py-6 pl-8 pr-1 max-md:flex-col max-md:pr-8 max-md:gap-8 max-md:items-center max-sm:px-1 bg-cover ",
        {
          "bg-Clouds": "Clouds" === globalData?.list[0].weather[0].main,
          "bg-Rain": "Rain" === globalData?.list[0].weather[0].main,
          "bg-Clear": "Clear" === globalData?.list[0].weather[0].main,
          "bg-Snow": "Snow" === globalData?.list[0].weather[0].main,
          "bg-Thunderstorm":
            "Thunderstorm" === globalData?.list[0].weather[0].main,
          "bg-Mist": "Mist" === globalData?.list[0].weather[0].main,
        }
      )}
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
