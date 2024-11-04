import React from 'react';
import ScoreChart from './ScoreChart';

const Score = () => {
  // 학생 40명의 성적 데이터
  const scores = [
    85, 92, 75, 60, 45, 88, 95, 66, 70, 55,
    78, 81, 62, 40, 32, 28, 99, 56, 77, 63,
    49, 90, 34, 54, 71, 82, 36, 58, 74, 67,
    85, 91, 72, 61, 52, 43, 39, 94, 53, 80,
  ];

  return (
    <div>
      <ScoreChart scores={scores} />
    </div>
  );
};

export default Score;