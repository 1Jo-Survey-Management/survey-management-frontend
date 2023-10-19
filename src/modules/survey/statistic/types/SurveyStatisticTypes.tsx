import React from 'react';

export interface SurveyInfoProps {
  surveyNo: number; //설문지번호
  surveyTitle: string; //설문지제목
  surveyDescription: string; //설문지설명
  surveyQuestionTitle: string; //설문문항제목

  questionTypeNo: number;
  selectionNo: number;
  selectionValue: string;
  selectionCount: number;
  questionAttendCount: number;
}
