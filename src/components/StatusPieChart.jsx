import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

function StatusPieChart({ summary }) {
  const data = {
    labels: Object.keys(summary),
    datasets: [{
      data: Object.values(summary),
      backgroundColor: ['#22c55e', '#eab308', '#3b82f6', '#9ca3af'],
      borderWidth: 1,
    }]
  };

  const options = {
    plugins: {
      legend: {
        position: 'right',
        labels: {
          color:'black'  
        }
      }
    }
  };

  return (
    <div className="bg-transparent">
      <Pie data={data} options={options} />
    </div>
  );
}

export default StatusPieChart;