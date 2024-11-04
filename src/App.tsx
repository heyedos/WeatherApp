import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./App.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { More } from "./pages/More";
import { createContext, useState } from "react";
export const dataContext = createContext<any>(null);
function App() {
  const queryClient = new QueryClient();
  const [globalData, setGlobalData] = useState<any>(null);

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <dataContext.Provider value={{ globalData, setGlobalData }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:city" element={<More />} />
          </Routes>
        </BrowserRouter>
      </dataContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
