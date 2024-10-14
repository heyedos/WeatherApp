import { useQuery } from "@tanstack/react-query";
import { queryProps } from "../types";
export const Header = () => {
  const { error }: queryProps = useQuery({
    queryKey: ["repoData"],
    enabled: false,
  });

  return (
    <header className="w-full pl-8 pt-8 pb-4">
      <h1 className="text-white text-4xl">WeatherApp</h1>
      <p className="text-center text-2xl text-red-500 h-8">
        {error?.toString() === "Error: Parameter q is missing."
          ? "Error: Input can not be empty"
          : error?.toString()}
      </p>
    </header>
  );
};
