import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./App.css";
import { Main } from "./components/Main";
import { Chart } from "./components/Chart";
import { Card } from "./components/Card";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <main className="w-full bg-slate-900 min-h-screen flex py-6 pl-8 pr-1">
        <Card />
        <div className="flex flex-col items-center w-3/4">
          <Main />
          <Chart />
        </div>
      </main>
    </QueryClientProvider>
  );
}

export default App;
