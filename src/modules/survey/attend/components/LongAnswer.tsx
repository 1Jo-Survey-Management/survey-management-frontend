import React, { useState } from 'react';
import { Card, CardContent, TextField, Typography } from '@mui/material';
import { SurveyItem } from '../types/AttendTypes';

interface LongAnswerProps {
  surveyData: SurveyItem[];
  questionNo: number;
  onAnswerChange: (answer: string) => void;
}

function LongAnswer({
  surveyData,
  questionNo,
  onAnswerChange,
}: LongAnswerProps) {
  const [answer, setAnswer] = useState<string>('');

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
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
              height: '15px',
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
            fontSize: '1rem',
            fontWeight: '600',
            margin: '0',
            marginBottom: '10px',
          }}
        >
          {currentQuestion.surveyQuestionTitle}
        </p>

        <Typography
          variant="body1"
          sx={{
            fontSize: '0.9rem',
            marginBottom: '15px',
          }}
        >
          {currentQuestion?.surveyQuestionDescription}
        </Typography>

        <TextField
          label="장문 답변 입력란"
          variant="outlined"
          fullWidth
          multiline
          rows={10}
          value={answer}
          onChange={handleTextChange}
        />
      </CardContent>
    </Card>
  );
}

export default LongAnswer;
