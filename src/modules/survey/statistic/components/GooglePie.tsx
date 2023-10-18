import React from 'react';
import { Chart } from 'react-google-charts';

// interface surveyData {
//   surveyAnswerSelection: string;
//   surveyAnswerSelectionCount: number;
// }

const surveyData = [
  ['surveyAnswerSelection', 'surveyAnswerSelectionCount'],
  ['차 종류', 7],
  ['차 ', 7],
];

export function GooglePie() {
  return (
    <Chart chartType="PieChart" data={surveyData} width="100%" height="400px" />
  );
}
