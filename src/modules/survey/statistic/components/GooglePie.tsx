import React from 'react';
import { Chart } from 'react-google-charts';

interface surveyData {
  surveyNo: number;
  surveyTitle: string;
  surveyQuestionNo: number;
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
    surveyQuestionNo: 1,
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
    surveyQuestionNo: 1,
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
    surveyQuestionNo: 1,
    surveyQuestion: '가장 선호하는 음료는 무엇입니까?',
    surveyQuestionType: 1,
    surveyAnswerCount: 50,
    surveyAnswerSelection: '차 종류',
    surveyAnswerSelectionNo: 4,
    surveyAnswerSelectionCount: 7,
  },
];

export function GooglePie() {
  return (
    <Chart chartType="PieChart" data={surveyData} width="100%" height="400px" />
  );
}
