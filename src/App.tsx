import { useState } from "react";
import "./App.css";
import { Header } from "./components/Header";
import { Main } from "./components/Main";
function App() {
  const [errorMsg, setErrorMsg] = useState<string>();
  return (
    <div className="w-full bg-indigo-950 min-h-screen flex flex-col items-center">
      <Header {...{ errorMsg }} />
      <Main {...{ setErrorMsg }} />
    </div>
  );
}

export default App;
