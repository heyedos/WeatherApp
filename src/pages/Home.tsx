import { Main } from "../components/Home/Main";
import { Card } from "../components/Home/Card";
import { LineChart } from "../components/Home/LineChart";

export const Home = () => {
  return (
    <main className="w-full bg-slate-900 min-h-screen flex py-6 pl-8 pr-1 max-md:flex-col max-md:pr-8 max-md:gap-8 max-md:items-center">
      <Card />
      <div className="flex flex-col items-center w-3/4 max-md:w-full">
        <Main />
        <LineChart />
      </div>
    </main>
  );
};
