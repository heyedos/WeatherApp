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
  const color: string = "Mist";
  const colorScheme: any = {
    Clouds: {
      colorv2: "black",
      color: "black",
      background: "url('../../assets/images/Clouds2.jpg')",
    },
    Rain: {
      colorv2: "black",
      color: "black",
      background: "url('../../assets/images/rain.jpg')",
    },
    Snow: {
      colorv2: "black",
      color: "black",
      background: " url('../../assets/images/snow.png') ",
    },
    Clear: {
      colorv2: "white ",
      color: "black",
      background: "url('../../assets/images/sunny1.jpg')",
    },
    Thunderstorm: {
      colorv2: "white",
      color: "white",
      background: "url('../../assets/images/thunderstorm.png')",
    },
    Mist: {
      colorv2: "black",
      color: "black",
      background: "url('../../assets/images/mist.jpeg')",
    },
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <dataContext.Provider
        value={{ globalData, setGlobalData, colorScheme, color }}
      >
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
