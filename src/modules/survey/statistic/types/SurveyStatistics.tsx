// 전체 타입
export interface SurveyQuestion {
  surveyNo: number;
  surveyTitle: string;
  userNickname: string;
  surveyCreateAt: Date;
  surveyClosingAt: Date;
  surveyQuestionNo: number;
  surveyQuestionTitle: string;
  questionTypeNo: number;
  selectionNo: number;
  selectionValue: string;
  selectionCount: number;
  surveySubjectiveAnswer: string;
}

// 파이 차트
export interface PieData {
  selectionValue: string;
  selectionCount: number;
  selectionNo: number;
}

export interface SelectData {
  selectionValue: string;
  selectionCount: number;
}

// 리스트
export interface ListData {
  surveyQuestionNo: number;
  surveyQuestionTitle: string;
  surveySubjectiveAnswer: string;
}

const selectionAnswer = [
  {
    surveyQuestionNo: 1,
    surveyQuestion: '가장 선호하는 음료는 무엇입니까?',
    SelectionNo: 1,
    surveyAnswerSelection: '아이스 아메리카노',
    SelectionCount: 25,
  },
  {
    surveyQuestionNo: 1,
    surveyQuestion: '가장 선호하는 음료는 무엇입니까?',
    SelectionNo: 2,
    surveyAnswerSelection: '라떼',
    SelectionCount: 10,
  },
  {
    surveyQuestionNo: 1,
    surveyQuestion: '가장 선호하는 음료는 무엇입니까?',
    SelectionNo: 3,
    surveyAnswerSelection: '과일 주스',
    SelectionCount: 8,
  },
  {
    surveyQuestionNo: 1,
    surveyQuestion: '가장 선호하는 음료는 무엇입니까?',
    SelectionNo: 4,
    surveyAnswerSelection: '차 종류',
    SelectionCount: 7,
  },
];
