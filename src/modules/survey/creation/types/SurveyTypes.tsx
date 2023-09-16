import React from 'react';

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

export interface SelectionProps {
  questionId: number;
  selectionId: number;
  questionMoveId?: number;
  selectionValue: string;
  isMoveable: boolean;
}

export interface QuestionProps {
  surveyId: number;
  questionId: number;
  questionTitle: string;
  questionDescription: string;
  questionRequired: boolean;
  selections?: SelectionProps[];
}

export interface CreateQuestionProps {
  question: QuestionProps;
  questions: QuestionProps[];
  setQuestions: React.Dispatch<React.SetStateAction<QuestionProps[]>>;
}

export interface SurveyProps {
  survyeId: number;
  surveyInfo: SurveyInfoProps;
  questions: QuestionProps[];
  selections: SelectionProps[];
}
