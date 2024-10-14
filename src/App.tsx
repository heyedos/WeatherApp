import "./App.css";
import { Header } from "./components/Header";
import { Main } from "./components/Main";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="w-full bg-indigo-950 min-h-screen flex flex-col items-center">
        <Header />
        <Main />
      </div>
    </QueryClientProvider>
  );
}

export default App;
