export interface SelectionItem {
  selectionValue: string;
  selectionNo: number;
  // 필요하면 여기에 추가적인 속성들을 추가할 수 있습니다.
}

export interface SurveyItem {
  surveyTitle: string;
  surveyImage: string;
  surveyQuestionNo: number;
  surveyNo: number;
  questionTypeNo: number;
  surveyQuestionTitle: string;
  surveyQuestionDescription: string;
  selectionNo: number;
  surveyQuestionMoveNo: number;
  selectionValue: string | null;
  required: boolean;
  endOfSurvey: boolean;
  movable: boolean;
  selections?: SelectionItem[]; // 수정된 부분
}

export interface SurveyData {
  success: boolean;
  content: SurveyItem[];
  errorResponse: unknown;
}
