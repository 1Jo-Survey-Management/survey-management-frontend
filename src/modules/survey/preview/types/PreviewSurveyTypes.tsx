import {
  QuestionProps,
  SurveyInfoProps,
} from '../../creation/types/SurveyTypes';

export interface PreviewSurveyProps {
  surveyInfo: SurveyInfoProps;
  surveyImage: File | undefined;
  questions: QuestionProps[];
  previewImageUrl?: string;
}

export interface PreviewSurveyInfoProps {
  surveyInfo: SurveyInfoProps;
  surveyImage: File | undefined;
  previewImageUrl?: string;
}

export interface PreviewQuestionProps {
  questions: QuestionProps[];
}

export interface PreviewEachQuestionProps {
  question: QuestionProps;
}
