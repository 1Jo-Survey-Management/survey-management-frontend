import React from 'react';

export interface SurveyInfoProps {
  surveyId: number;
  surveyInfoId: number;
  surveyTitle: string;
  surveyTags: string[];
  surveyClosingAt: string;
  openStatusNo: number;
  surveyDescription: string;
  surveyStatusNo: number;
  surveyPostAt?: string; // surveyPostAt?
  userNo: string | null;
}

export interface AttendSurveyInfoProps {
  surveyInfo: SurveyInfoProps;
  setAttendSurveyInfo: React.Dispatch<React.SetStateAction<SurveyInfoProps>>;
  setAttendSurveyImage: React.Dispatch<React.SetStateAction<File | undefined>>;
}

export interface SelectionProps {
  questionId: number;
  selectionId: number;
  questionMoveId?: number;
  selectionValue: string;
  isMoveable: boolean;
  isEndOfSurvey: boolean;
}

export interface QuestionProps {
  surveyId: number;
  questionId: number;
  questionTitle: string;
  questionDescription?: string;
  questionRequired: boolean;
  questionType: string;
  selections: SelectionProps[];
}

export interface AttendSelectionProps {
  question: QuestionProps;
  questions: QuestionProps[];
  setAttendQuestions: React.Dispatch<React.SetStateAction<QuestionProps[]>>;
}

export interface AttendQuestionProps {
  question: QuestionProps;
  questions: QuestionProps[];
  setAttendQuestions: React.Dispatch<React.SetStateAction<QuestionProps[]>>;
}

export interface SurveyProps {
  survyeId: number;
  surveyInfo: SurveyInfoProps;
  questions: QuestionProps[];
  selections: SelectionProps[];
}
