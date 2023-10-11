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
