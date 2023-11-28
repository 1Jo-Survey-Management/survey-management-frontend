/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { Chart } from 'react-google-charts';
import '../../../../global.css';

interface GooglePieChartProps {
  selectionAnswer: [string, number][];
}

const generateRandomPastelColor = (): string => {
  const pastelColors = [
    '#FFD1DC', // 연한 분홍
    '#FFA07A', // 연한 주황
    '#FFB6C1', // 연한 분홍
    '#FFDEAD', // 연한 베이지
    '#87CEEB', // 연한 하늘색
    '#98FB98', // 연한 녹색
    '#DDA0DD', // 연한 보라
    '#FFD700', // 연한 금색
  ];

  return pastelColors[Math.floor(Math.random() * pastelColors.length)];
};

export default function GooglePieChart({
  selectionAnswer,
}: GooglePieChartProps) {
  const [options, setOptions] = useState({
    legend: 'right',
  });

  useEffect(() => {}, [selectionAnswer]);

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

  const aggregateData = (data: any[]) => {
    const aggregatedData = [];
    const colors = [];
    const map = new Map();
    for (const item of data) {
      if (map.has(item[0])) {
        const index = map.get(item[0]);
        aggregatedData[index][1] += item[1];
      } else {
        map.set(item[0], aggregatedData.length);
        aggregatedData.push([item[0], item[1]]);
        colors.push(generateRandomPastelColor());
      }
    }
    return { aggregatedData, colors };
  };

  const { aggregatedData, colors } = aggregateData(selectionAnswer);
  aggregatedData.unshift(['selectionValue', 'selectionCount']);

  return (
    <Chart
      chartType="PieChart"
      data={aggregatedData}
      width="100%"
      height="250px"
      style={{ marginTop: '0' }}
      options={{
        ...options,
        colors,
      }}
    />
  );
}
