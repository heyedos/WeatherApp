import { errorType } from "../types";

export const Header = ({ errorMsg }: errorType) => {
  return (
    <header className="w-full pl-8 pt-8 pb-4">
      <h1 className="text-white text-4xl">WeatherApp</h1>
      <p className="text-center text-2xl text-red-500 h-8">
        {errorMsg === "Parameter q is missing."
          ? "Input can not be empty"
          : errorMsg}
      </p>
    </header>
  );
};
