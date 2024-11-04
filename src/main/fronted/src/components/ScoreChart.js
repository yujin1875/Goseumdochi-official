import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ScoreChart = ({ scores }) => {
  // 10점 단위 구간별로 학생 수 계산
  const scoreRanges = Array(10).fill(0);
  scores.forEach(score => {
    const rangeIndex = Math.min(Math.floor(score / 10), 9);
    scoreRanges[rangeIndex]++;
  });

  // 그래프 데이터 설정
  const data = {
    labels: ['0-9', '10-19', '20-29', '30-39', '40-49', '50-59', '60-69', '70-79', '80-89', '90-100'],
    datasets: [
      {
        label: '학생 수',
        data: scoreRanges,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  // 그래프 옵션 설정
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: '학생 성적 분포',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: '학생 수',
        },
      },
      x: {
        title: {
          display: true,
          text: '점수 구간',
        },
      },
    },
  };

  return (
    <div style={{ width: '1200px', height: '300px' }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default ScoreChart;