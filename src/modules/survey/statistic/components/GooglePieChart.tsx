// import React, { useState, useEffect } from 'react';
// import { Chart } from 'react-google-charts';
// import '../../../../global.css';

// interface GooglePieChartProps {
//   selectionAnswer: [string, number][];
// }

// export default function GooglePieChart({
//   selectionAnswer,
// }: GooglePieChartProps) {
//   const [options, setOptions] = useState({
//     legend: 'right',
//   });

//   useEffect(() => {
//     console.log('google Chart Data');
//     console.log(selectionAnswer);
//   }, [selectionAnswer]);

//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth < 620) {
//         setOptions({
//           legend: 'bottom',
//         });
//       } else {
//         setOptions({
//           legend: 'right',
//         });
//       }
//     };

//     window.addEventListener('resize', handleResize);

//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   const extractChartData = (data: [string, number][]): [string, unknown][] =>
//     data.map((item) => [item[0], item[1]]);

//   const aggregateData = (data: any[]) => {
//     const aggregatedData = [];
//     const map = new Map();
//     for (const item of data) {
//       if (map.has(item[0])) {
//         const index = map.get(item[0]);
//         aggregatedData[index][1] += item[1];
//       } else {
//         map.set(item[0], aggregatedData.length);
//         aggregatedData.push([item[0], item[1]]);
//       }
//     }
//     return aggregatedData;
//   };

//   const chartData = extractChartData(selectionAnswer);

//   const aggregatedChartData = aggregateData(chartData);
//   aggregatedChartData.unshift(['selectionValue', 'selectionCount']);

//   return (
//     <Chart
//       chartType="PieChart"
//       data={aggregatedChartData}
//       width="100%"
//       height="250px"
//       options={options}
//       style={{ marginTop: '0' }}
//     />
//   );
// }
