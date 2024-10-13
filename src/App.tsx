import { useState } from "react";
import "./App.css";
import { Header } from "./components/Header";
import { Main } from "./components/Main";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient();
  const [errorMsg, setErrorMsg] = useState<string>();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="w-full bg-indigo-950 min-h-screen flex flex-col items-center">
        <Header {...{ errorMsg }} />
        <Main {...{ setErrorMsg }} />
      </div>
    </QueryClientProvider>
  );
}

export default App;
