import { Line } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";

import { useContext } from "react";
import { dataContext } from "../../App";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

export const LineChart = () => {
  const array = [6, 14, 22, 30, 38];

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const { globalData, colorScheme, color } = useContext(dataContext);

  const labels = array.map((key: number): string => {
    const dateString = globalData?.list[key]?.dt_txt;
    return dateString
      ? days[new Date(dateString.slice(0, 10)).getDay()]
      : "Unknown Day";
  });

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Temperature Data",
        data: array.map((key: number) => {
          const dateString = globalData?.list[key]?.main.temp;
          return dateString ? (dateString - 273.15).toPrecision(3) : "unknown";
        }),
        borderColor: "white",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        pointRadius: 0,
        fill: false,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    elements: {
      line: {
        tension: 0.5,
        borderWidth: 1.25,
      },
    },
    scales: {
      x: {
        position: "bottom",
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
        ticks: {
          font: { size: 16 },
          color: colorScheme[color]?.colorv2,
          callback: function (_: string | number, index: number): string {
            return globalData
              ? data.datasets[0].data[index] +
                  " " +
                  globalData?.list[array[index]].weather[0].description
              : "error";
          },
          padding: 10,
        },
      },
      x2: {
        border: {
          display: false,
        },
        position: "top",
        ticks: {
          font: {
            size: 16,
          },
          color: colorScheme[color]?.color,
          callback: function (_: string | number, index: number) {
            return globalData ? labels[index] : "error";
          },
          padding: 10,
        },
        grid: {
          display: false,
          drawOnChartArea: false,
        },
      },
      y: {
        ticks: {
          stepSize: 0.1,
        },
        display: false,
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="relative w-full min-h-52 h-full">
      <Line data={data} options={options} />
    </div>
  );
};
