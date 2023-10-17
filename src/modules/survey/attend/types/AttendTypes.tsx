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
}

export interface SurveyData {
  success: boolean;
  content: SurveyItem[];
  errorResponse: unknown;
}
