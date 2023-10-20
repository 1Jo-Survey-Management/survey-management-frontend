import React, { useState, useEffect } from 'react';
import { Chart } from 'react-google-charts';
import axios from 'axios';
import '../../../../global.css';

interface Selection {
  surveyNo: number;
  surveyTitle: string;
  surveyQuestionNo: number;
  surveyQuestionTitle: string;
  questionTypeNo: number;
  selectionNo: number;
  selectionValue: string;
  selectionCount: number;
  surveySubjectiveAnswer: string;
}

const fontFamily = "'Noto Sans KR', sans-serif";
const textStyle = {
  fontFamily,
};

export default function GooglePieChart() {
  const [selectStat, setSelectStat] = useState<Selection[]>([]);
  const [options, setOptions] = useState({
    legend: 'right',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/survey/result?surveyno=1&questionno=1`
        );
        setSelectStat(response.data);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };
    fetchData();

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

  const questionAnswerCount = (data: Selection[]): number => {
    let sum = 0;
    data.forEach((item) => {
      sum += item.selectionCount;
    });
    return sum;
  };

  const totalSelectionCount = questionAnswerCount(selectStat);

  const extractChartData = (data: Selection[]): [string, unknown][] =>
    data.map((item) => [item.selectionValue, item.selectionCount]);

  const chartData = extractChartData(selectStat);
  chartData.unshift(['selectionValue', 'selectionCount']);

  return (
    <div style={{ width: '100%', minWidth: '330px' }}>
      <p style={textStyle}>응답 수: {totalSelectionCount}</p>
      <Chart
        chartType="PieChart"
        data={chartData}
        width="100%"
        height="400px"
        options={options}
        style={{ marginTop: '0' }}
      />
    </div>
  );
}
