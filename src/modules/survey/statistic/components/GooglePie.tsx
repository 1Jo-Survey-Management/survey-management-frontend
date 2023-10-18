import React from 'react';
import { Chart } from 'react-google-charts';

interface surveyData {
  surveyAnswerSelection: string;
  surveyAnswerSelectionCount: number;
}

interface GooglePieProps {
  width: string;
}

const surveyData: surveyData[] = [
  {
    surveyAnswerSelection: '아이스 아메리카노',
    surveyAnswerSelectionCount: 25,
  },
  {
    surveyAnswerSelection: '카페라떼',
    surveyAnswerSelectionCount: 10,
  },
  {
    surveyAnswerSelection: '과일 주스',
    surveyAnswerSelectionCount: 8,
  },
  {
    surveyAnswerSelection: '차 종류',
    surveyAnswerSelectionCount: 7,
  },
];

export function GooglePie(props: GooglePieProps) {
  const chartData = surveyData.map((item) => [
    item.surveyAnswerSelection,
    item.surveyAnswerSelectionCount,
  ]);

  // 차트의 첫 번째 행은 레이블로 사용되므로 레이블을 추가합니다.
  const chartDataWithLabels = [['선택', '응답 수'], ...chartData];

  return (
    <Chart
      chartType="PieChart"
      data={chartDataWithLabels}
      width="100%"
      height="400px"
    />
  );
}
