import { useSelector } from "react-redux";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function ReportBarChart() {
  const members = useSelector((state) => state.members || []);

  const labels = members.map((m) => m.name || "—");
  const taskCounts = members.map((m) => (Array.isArray(m.tasks) ? m.tasks.length : 0));

  const data = {
    labels,
    datasets: [
      {
        label: "Tasks Assigned",
        data: taskCounts,
        backgroundColor: "rgba(59, 130, 241, 0.7)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: document.documentElement.classList.contains("dark")
            ? "#fff"
            : "#fff",
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => ` ${context.parsed.y} task(s)`,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: document.documentElement.classList.contains("dark")
            ? "#fff"
            : "#fff",
        },
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: document.documentElement.classList.contains("dark")
            ? "#fff"
            : "#fff",
          stepSize: 1,
        },
        grid: {
          color: document.documentElement.classList.contains("dark")
            ? "rgba(255,255,255,0.1)"
            : "rgba(255,255,255,0.1)",
        },
      },
    },
  };

  if (labels.length === 0) {
    return (
      <div className="p-6 bg-white dark:bg-gray-800 rounded shadow">
        <p className="text-center text-gray-500 dark:text-gray-400">
          No employees to report on.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
        Employee Task Load
      </h2>
      <Bar data={data} options={options} />
    </div>
  );
}

export default ReportBarChart;