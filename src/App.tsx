import "./App.css";
import { Header } from "./components/Header";
import { Main } from "./components/Main";
function App() {
  return (
    <div className="w-full bg-indigo-950 h-screen flex flex-col items-center">
      <Header />
      <Main />
    </div>
  );
}

export default App;
