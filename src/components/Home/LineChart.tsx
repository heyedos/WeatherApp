import { Line } from "react-chartjs-2";
import { useQuery } from "@tanstack/react-query";
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
import { weatherApp } from "../../types";

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

  const apiData = useQuery<weatherApp>({
    queryKey: ["forecast"],
    enabled: false,
    refetchOnWindowFocus: false,
  });
  /*  if (apiData.isLoading)
    return (
      <div className="flex justify-center items-center min-h-screen w-full bg-slate-700">
        <CircularProgress />
      </div>
    ); */

  const labels = array.map((key: number): string => {
    const dateString = apiData.data?.list[key]?.dt_txt;
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
          const dateString = apiData.data?.list[key]?.main.temp;
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
          color: "white",
          callback: function (_: string | number, index: number): string {
            return apiData.data
              ? data.datasets[0].data[index] +
                  " " +
                  apiData?.data?.list[array[index]].weather[0].description
              : apiData.isError
              ? "error"
              : "loading";
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
          color: "white",
          callback: function (_: string | number, index: number) {
            return apiData.data
              ? labels[index]
              : apiData.isError
              ? "error"
              : "loading";
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
  if (apiData.isSuccess)
    return (
      <div className="relative w-full min-h-52 h-full">
        <Line data={data} options={options} />
      </div>
    );
};
