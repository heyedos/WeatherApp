import { weatherProp } from "../types";
import cn from "classnames";

export const Weather = ({ weather }: weatherProp) => {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return (
    <div
      className={cn(
        "weathers bg-blue-900 flex flex-col items-center text-gray-200 gap-1 w-1/4 rounded-md ",
        { " py-4 ": !weather, " py-1 ": weather }
      )}
    >
      <h1 className="text-xl">
        {weather ? days[new Date(weather.date).getDay()] : "Day"}
      </h1>
      <div>
        {weather ? (
          <img
            className="w-12"
            src={weather.day.condition.icon}
            alt="weatherIcon"
          />
        ) : (
          <p>Image</p>
        )}
      </div>
      <p className="text-xl">{weather ? weather.day.avgtemp_c : "Degree"}</p>
      <p className={cn({ "text-center w-40": weather })}>
        {weather ? weather.day.condition.text : "Condition"}
      </p>
    </div>
  );
};

{
  /* <div className="weathers bg-blue-900 flex flex-col items-center text-gray-200 gap-1 w-1/4 py-1 rounded-md">
                <h1 className="text-xl">{days[new Date(key.date).getDay()]}</h1>

                <img
                  className="w-12"
                  src={key.day.condition.icon}
                  alt="weatherIcon"
                />

                <p className="text-xl">{key.day.avgtemp_c}</p>
                <p className="text-center w-40">{key.day.condition.text}</p>
              </div>  */
}
