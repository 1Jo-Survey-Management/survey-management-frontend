/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useRef } from 'react';
import { Chart } from 'react-google-charts';
import '../../../../global.css';
import { Box } from '@mui/system';

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
  const [maxSelectionValue, setMaxSelectionValue] = useState<string>('');
  const [maxSelectionCount, setMaxSelectionCount] = useState<number>(0);
  const colorsRef = useRef<string[]>([]);

  // useEffect(() => {}, [selectionAnswer]);

  useEffect(() => {
    const handleResize = () => {
      const newOptions = {
        legend: window.innerWidth < 600 ? 'bottom' : 'right',
        pieSliceTextStyle: {
          color: '#747474',
          fontSize: 15,
        },
      };

      setOptions(newOptions);
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const aggregateData = (data: any[]) => {
    const aggregatedData = [];
    const map = new Map();

    for (const item of data) {
      if (map.has(item[0])) {
        const index = map.get(item[0]);
        aggregatedData[index][1] += item[1];

        if (aggregatedData[index][1] > maxSelectionCount) {
          setMaxSelectionCount(aggregatedData[index][1]);
          setMaxSelectionValue(item[0]);
        }
      } else {
        colorsRef.current.push(generateRandomPastelColor());
        map.set(item[0], aggregatedData.length);
        aggregatedData.push([item[0], item[1]]);

        if (item[1] > maxSelectionCount) {
          setMaxSelectionCount(item[1]);
          setMaxSelectionValue(item[0]);
        }
      }
    }
    return { aggregatedData, colorsRef, maxSelectionValue };
  };

  const { aggregatedData } = aggregateData(selectionAnswer);
  aggregatedData.unshift(['selectionValue', 'selectionCount']);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Chart
        chartType="PieChart"
        data={aggregatedData}
        width={`${window.innerWidth <= 600 ? '300px' : '780px'}`}
        height={`${window.innerWidth <= 600 ? '250px' : '400px'}`}
        style={{
          marginTop: '0',
          fontWeight: 900,
        }}
        options={{
          ...options,
          colors: colorsRef.current,
          is3D: true,
        }}
      />
    </Box>
  );
}
