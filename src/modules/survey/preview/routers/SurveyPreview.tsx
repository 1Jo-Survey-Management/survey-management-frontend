import React from 'react';
import PreviewSurveyInfo from '../components/PreviewSurveyInfo';
import { PreviewSurveyProps } from '../types/PreviewSurveyTypes';

function SurveyPreview({
  surveyInfo,
  surveyImage,
  questions,
}: PreviewSurveyProps) {
  return (
    <div>
      <PreviewSurveyInfo surveyInfo={surveyInfo} surveyImage={surveyImage} />
    </div>
  );
}

export default SurveyPreview;
