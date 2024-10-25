import { Main } from "../components/Home/Main";
import { Card } from "../components/Home/Card";
import { LineChart } from "../components/Home/LineChart";
import { Chart } from "../components/Home/Chart";

export const Home = () => {
  return (
    <main className="w-full bg-slate-900 min-h-screen flex py-6 pl-8 pr-1 max-md:flex-col max-md:pr-8 max-md:gap-8 max-md:items-center max-sm:px-1">
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
