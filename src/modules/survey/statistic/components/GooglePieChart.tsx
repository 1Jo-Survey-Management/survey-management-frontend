import React, { useState, useEffect } from 'react';
import { Chart } from 'react-google-charts';
import axios from 'axios';

// interface surveyData {
//   surveyAnswerSelection: string;
//   surveyAnswerSelectionCount: number;
// }

interface Selection {
  surveyNo: number;
  surveyTitle: string;
  surveyQuestionTitle: string;
  questionTypeNo: number;
  selectionNo: number;
  selectionValue: string;
  selectionCount: number;
  questionAttendCount: number;
}
export default function GooglePieChart() {
  const [selectStat, setSelectStat] = useState<Selection[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/survey/result?surveyno=${}&questionno=${}`
        );
        setSelectStat(response.data);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };
    fetchData();
  }, []);

  const extractChartData = (data: Selection[]): [string, unknown][] =>
    data.map((item) => [item.selectionValue, item.selectionCount]);

  const chartData = extractChartData(selectStat);
  chartData.unshift(['selectionValue', 'selectionCount']);
  console.log(chartData);
  return (
    <Chart chartType="PieChart" data={chartData} width="100%" height="400px" />
  );
}
