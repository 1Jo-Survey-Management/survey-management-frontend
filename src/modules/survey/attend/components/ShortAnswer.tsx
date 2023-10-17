import React from 'react';
import { Card, CardContent, TextField } from '@mui/material';
import { SurveyItem } from '../types/AttendTypes';

interface ShortAnswerProps {
  surveyData: SurveyItem[];
  questionNo: number;
}

function ShortAnswer({ surveyData, questionNo }: ShortAnswerProps) {
  const currentQuestion = surveyData.find(
    (item) => item.surveyQuestionNo === questionNo
  );

  if (!currentQuestion) {
    return null; // 혹은 다른 적절한 처리
  }

  return (
    <Card
      sx={{
        marginBottom: '30px',
      }}
    >
      <CardContent>
        <p
          style={{
            fontSize: '0.9rem',
            fontWeight: '600',
            margin: '0',
            marginBottom: '10px',
          }}
        >
          {currentQuestion.surveyQuestionTitle}
        </p>
        <p
          style={{
            fontSize: '0.8rem',
            fontWeight: '600',
            color: '#00000088',
            margin: '8px',
            paddingLeft: '10px',
          }}
        >
          {currentQuestion.surveyQuestionDescription}
        </p>
        <TextField
          label="답변 입력란"
          variant="outlined"
          fullWidth
          multiline
          rows={1}
        />
      </CardContent>
    </Card>
  );
}

export default ShortAnswer;
