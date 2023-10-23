import React, { useState, useEffect } from 'react';
import { Chart } from 'react-google-charts';
import { PieData } from '../types/SurveyStatistics';
import '../../../../global.css';

const fontFamily = "'Noto Sans KR', sans-serif";
const textStyle = {
  fontFamily,
};

interface GooglePieChartProps {
  selectionAnswer: PieData[];
}

export default function GooglePieChart({
  selectionAnswer,
}: GooglePieChartProps) {
  const [options, setOptions] = useState({
    legend: 'right',
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 620) {
        setOptions({
          legend: 'bottom',
        });
      } else {
        setOptions({
          legend: 'right',
        });
      }
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const questionAnswerCount = (data: PieData[]): number => {
    let sum = 0;
    data.forEach((item) => {
      sum += item.selectionCount;
    });
    return sum;
  };

  const totalSelectionCount = questionAnswerCount(selectionAnswer);

  const extractChartData = (data: PieData[]): [string, unknown][] =>
    data.map((item) => [item.selectionValue, item.selectionCount]);

  const chartData = extractChartData(selectionAnswer);
  chartData.unshift(['selectionValue', 'selectionCount']);

  console.log(chartData);
  return (
    <div style={{ width: '100%', minWidth: '330px' }}>
      <p style={textStyle}>응답 수: {totalSelectionCount}</p>
      <Chart
        chartType="PieChart"
        data={chartData} // [['selectionValue', 'selectionCount'], ['아메리카노', 1], ['라뗴',]]
        width="100%"
        height="400px"
        options={options}
        style={{ marginTop: '0' }}
      />
    </div>
  );
}
