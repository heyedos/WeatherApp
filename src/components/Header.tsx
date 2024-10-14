import { useMutationState } from "@tanstack/react-query";
export const Header = () => {
  /* const { error } = useQuery({
    queryKey: ["repoData"],
    enabled: false,
  }); */

  const states = useMutationState({
    filters: { mutationKey: ["repoData"] },
    select: (mutation) => mutation.state.error?.message,
  });
  const latest = states[states.length - 1];
  return (
    <header className="w-full pl-8 pt-8 pb-4">
      <h1 className="text-white text-4xl">WeatherApp</h1>
      <p className="text-center text-2xl text-red-500 h-8">
        {latest?.toString() === "Parameter q is missing."
          ? "Error: Input can not be empty"
          : latest?.toString()}
      </p>
    </header>
  );
};
