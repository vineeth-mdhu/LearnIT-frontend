import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const LineChart = ({ data }) => {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: 'Score',
        data: data.values,
        backgroundColor: 'rgba(75,192,192,0.3)',
        borderColor: 'rgba(75,192,192,1)',
        tension: 0.1,
        fill: true
      }
    ]
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        type: 'linear',
        max: 100,
      }
    },
    responsive: true,
    tension: 0.3,
    plugins: {
      legend: {
        display: false
      }
    }
  };

  return (
      <Line data={chartData} options={options} />
  );
};

export default LineChart;
