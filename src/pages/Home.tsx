import { Main } from "../components/Home/Main";
import { Chart } from "../components/Home/Chart";
import { Card } from "../components/Home/Card";
export const Home = () => {
  return (
    <main className="w-full bg-slate-900 min-h-screen flex py-6 pl-8 pr-1">
      <Card />
      <div className="flex flex-col items-center w-3/4">
        <Main />
        <Chart />
      </div>
    </main>
  );
};
