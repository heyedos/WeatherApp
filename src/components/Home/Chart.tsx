import { dataContext } from "../../App";
import { useContext } from "react";

export const Chart = () => {
  const { globalData } = useContext(dataContext);
  const array: number[] = [6, 14, 22, 30, 38];

  return (
    <div className="w-full flex items-center justify-between pl-2 h-1/3 max-md:px-8">
      {array.map((key, index: number) => (
        <div className="pl-2 pr-3 max-md:p-0" key={index}>
          {
            <img
              src={
                "http://openweathermap.org/img/w/" +
                globalData?.list[key].weather[0].icon +
                ".png"
              }
              alt=""
              className="w-full"
            />
          }
        </div>
      ))}
    </div>
  );
};
