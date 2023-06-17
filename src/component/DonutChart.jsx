import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const DonutChart = ({ data }) => {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        data: data.values,
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)'
        ],
        borderWidth: 1
      }
    ]
  };

  const options = {
    cutout: '70%',
    plugins: {
      legend: {
        position: 'top'
      }
    }
  };

  return (
    <div>
      <Doughnut data={chartData} options={options} />
    </div>
  );
};

export default DonutChart;
