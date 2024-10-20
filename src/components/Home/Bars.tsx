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
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

export const Bars = () => {
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

  const apiData: any = useQuery({
    queryKey: ["forecast"],
    enabled: false,
  });

  if (!apiData.data) return <div>Loading...</div>;

  const labels = array.map((key): string => {
    return days[new Date(apiData.data.list[key].dt_txt.slice(0, 10)).getDay()];
  });

  const data: any = {
    labels: labels,
    datasets: [
      {
        label: "Temperature Data",
        data: array.map((key) =>
          (apiData.data.list[key].main.temp - 273.15).toPrecision(3)
        ),
        borderColor: "red",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        pointRadius: 0,
        fill: false,
      },
    ],
  };

  const options: any = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
      },
    },
    elements: {
      point: {
        radius: 5,
      },
      line: {
        tension: 0.4,
      },
    },
    scales: {
      x: {
        position: "bottom",
        grid: {
          display: false,
        },
        ticks: {
          callback: function (val: any, index: any) {
            return data.datasets[0].data[index];
          },
          padding: 10,
        },
      },
      x2: {
        position: "top",
        ticks: {
          callback: function (val: any, index: any) {
            return labels[index];
          },
          padding: 10,
        },
        grid: {
          display: false,
          drawOnChartArea: false,
        },
      },
      y: {
        display: false,
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="w-full">
      <Line data={data} options={options} />
    </div>
  );
};
