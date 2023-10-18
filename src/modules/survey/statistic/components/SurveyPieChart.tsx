import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

export default function SurveyPieChart() {
  const surveyData = [
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
      surveyQuestionNo: 1,
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

  // Transforming surveyData into the appropriate format for the PieChart
  const seriesData = surveyData.map((data) => ({
    value: data.surveyAnswerSelectionCount,
    label: data.surveyAnswerSelection,
  }));

  return (
    <PieChart
      series={[
        {
          data: seriesData,
        },
      ]}
      sx={{
        textAlign: 'center',
        width: '100%',
      }}
      height={200}
    />
  );
}
