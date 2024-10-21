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
        borderColor: "white",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        pointRadius: 0,
        fill: false,
      },
    ],
  };

  const options: any = {
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
        borderWidth: 1.5,
      },
    },
    scales: {
      x: {
        position: "bottom",
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 16,
          },
          color: "white",
          callback: function (_: any, index: any) {
            return (
              data.datasets[0].data[index] +
              " " +
              apiData?.data?.list[array[index]].weather[0].description
            );
          },
          padding: 10,
        },
      },
      x2: {
        position: "top",
        ticks: {
          font: {
            size: 16,
          },
          color: "white",
          callback: function (_: any, index: any) {
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
    <div className="relative w-full h-52">
      <Line data={data} options={options} />
    </div>
  );
};
