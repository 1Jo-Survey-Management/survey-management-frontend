import React, { useState } from 'react';
import { Card, CardContent, TextField } from '@mui/material';
import { SurveyItem } from '../types/AttendTypes';

interface ShortAnswerProps {
  surveyData: SurveyItem[];
  questionNo: number;
  onAnswerChange: (answer: string) => void;
}

function ShortAnswer({
  surveyData,
  questionNo,
  onAnswerChange,
}: ShortAnswerProps) {
  const [answer, setAnswer] = useState<string>('');

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setAnswer(newValue);
    onAnswerChange(newValue);
  };

  const currentQuestion = surveyData.find(
    (item) => item.surveyQuestionNo === questionNo
  );

  if (!currentQuestion) {
    return null;
  }

  return (
    <Card
      id={`question-${questionNo}`}
      sx={{
        marginBottom: '30px',
      }}
    >
      <CardContent>
        {!answer && currentQuestion?.required && (
          <h1
            style={{
              fontSize: '9px',
              display: 'flex',
              justifyContent: 'flex-end',
              height: '10px',
              color: 'red',
              margin: '0',
              padding: '0',
            }}
          >
            * 필수 응답 문항입니다.
          </h1>
        )}
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
        <TextField fullWidth value={answer} onChange={handleTextChange} />
      </CardContent>
    </Card>
  );
}

export default ShortAnswer;
