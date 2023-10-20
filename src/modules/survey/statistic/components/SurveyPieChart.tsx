import * as React from 'react';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';

export default function SurveyPieChart() {
  interface surveyData {
    surveyNo: number;
    surveyTitle: string;
    surveyQuestion: string;
    surveyQuestionType: number;
    surveyAnswerCount: number;
    surveyAnswerSelection: string;
    surveyAnswerSelectionNo: number;
    surveyAnswerSelectionCount: number;
  }

  const surveyData: surveyData[] = [
    {
      surveyNo: 1,
      surveyTitle: '카페 이용 조사',
      surveyQuestion: '가장 선호하는 음료는 무엇입니까?',
      surveyQuestionType: 1,
      surveyAnswerCount: 50,
      surveyAnswerSelection: '아이스 아메리카노',
      surveyAnswerSelectionNo: 1,
      surveyAnswerSelectionCount: 25,
    },
    {
      surveyNo: 1,
      surveyTitle: '카페 이용 조사',
      surveyQuestion: '가장 선호하는 음료는 무엇입니까?',
      surveyQuestionType: 1,
      surveyAnswerCount: 50,
      surveyAnswerSelection: '카페라떼',
      surveyAnswerSelectionNo: 1,
      surveyAnswerSelectionCount: 10,
    },
    {
      surveyNo: 1,
      surveyTitle: '카페 이용 조사',
      surveyQuestion: '가장 선호하는 음료는 무엇입니까?',
      surveyQuestionType: 1,
      surveyAnswerCount: 50,
      surveyAnswerSelection: '과일 주스',
      surveyAnswerSelectionNo: 3,
      surveyAnswerSelectionCount: 8,
    },
    {
      surveyNo: 1,
      surveyTitle: '카페 이용 조사',
      surveyQuestion: '가장 선호하는 음료는 무엇입니까?',
      surveyQuestionType: 1,
      surveyAnswerCount: 50,
      surveyAnswerSelection: '차 종류',
      surveyAnswerSelectionNo: 4,
      surveyAnswerSelectionCount: 7,
    },
  ];
  const seriesData = surveyData.map((data, index) => ({
    id: index,
    value: data.surveyAnswerSelectionCount,
    label: data.surveyAnswerSelection,
  }));

  return (
    <PieChart
      series={[
        {
          arcLabel: (item) => `${item.label} (${item.value})`,
          arcLabelMinAngle: 45,
          data: seriesData,
        },
      ]}
      sx={{
        [`& .${pieArcLabelClasses.root}`]: {
          fill: 'white',
          fontWeight: 'bold',
        },
      }}
    />
  );
}
