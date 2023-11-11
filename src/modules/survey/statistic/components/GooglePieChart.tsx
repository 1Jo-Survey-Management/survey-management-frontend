import React, { useState, useEffect } from 'react';
import { Chart } from 'react-google-charts';
import '../../../../global.css';

interface GooglePieChartProps {
  selectionAnswer: [string, number][];
}

export default function GooglePieChart({
  selectionAnswer,
}: GooglePieChartProps) {
  const [options, setOptions] = useState({
    legend: 'right',
  });

  useEffect(() => {
    console.log('google Chart Data');
    console.log(selectionAnswer);
  }, [selectionAnswer]);

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

  const extractChartData = (data: [string, number][]): [string, number][] =>
    data.map((item) => [item[0], item[1]]);

  const aggregateData = (data: [string, number][]) => {
    const aggregatedData: [string, number][] = [];
    const map = new Map<string, number>();

    data.forEach((item) => {
      if (map.has(item[0])) {
        const index = map.get(item[0])!;
        aggregatedData[index][1] += item[1];
      } else {
        map.set(item[0], aggregatedData.length);
        aggregatedData.push([item[0], item[1]]);
      }
    });

    return aggregatedData;
  };

  const chartData: [string, number][] = extractChartData(selectionAnswer);

  // aggregatedChartData를 [string, unknown][]에서 [string, number][]로 변경
  const aggregatedChartData: [string, number][] = aggregateData(chartData);
  aggregatedChartData.unshift(['selectionValue', 0]);

  // console.log(chartData);
  return (
    <div style={{ width: '100%', minWidth: '330px' }}>
      <Chart
        chartType="PieChart"
        data={aggregatedChartData}
        width="100%"
        height="250px"
        options={options}
        style={{ marginTop: '0' }}
      />
    </div>
  );
}
