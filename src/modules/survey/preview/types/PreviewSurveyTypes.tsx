import {
  QuestionProps,
  SurveyInfoProps,
} from '../../creation/types/SurveyTypes';

export interface PreviewSurveyProps {
  surveyInfo: SurveyInfoProps;
  surveyImage: File | undefined;
  questions: QuestionProps[];
}

export interface PreviewSurveyInfoProps {
  surveyInfo: SurveyInfoProps;
  surveyImage: File | undefined;
}

export interface PreviewQuestionProps {
  questions: QuestionProps[];
}

export interface PreviewEachQuestionProps {
  question: QuestionProps;
}
