import React from "react";

export interface SurveyProps {
  survyeId: number;
  surveyInfo: SurveyInfoProps;
  questions: QuestionProps[];
  selections: SelectionProps[];
}

export interface SurveyInfoProps {
  surveyId: number;
  surveyInfoId: number;
  surveyTitle: string;
  surveyImage: string;
  surveyTags: string[];
  surveyClosingAt: string;
  openStatus: string;
  surveyDescription: string;
}

export interface CreateSurveyInfoProps {
  surveyInfo: SurveyInfoProps;
  setSurveyInfo: React.Dispatch<React.SetStateAction<SurveyInfoProps>>;
}

export interface QuestionProps {
  surveyId: number;
  questionId: number;
  questionTitle: string;
  questionDescription: string;
  selections: SelectionProps[];
}

export interface SelectionProps {
  questionId: number;
  selectionId: number;
  questionMoveId: number;
  selectionValue: string;
  isMoveable: boolean;
}
