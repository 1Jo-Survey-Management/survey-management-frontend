import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Card,
  CardContent,
} from '@mui/material';
import { SurveyItem } from '../types/AttendTypes';

interface AttendMultipleChoiceProps {
  surveyData: SurveyItem[];
  questionNo: number;
  onAnswerChange: (
    answers: Array<{ selectionValue: string; selectionNo: number }>
  ) => void;
}

function AttendMultipleChoice({
  surveyData,
  questionNo,
  onAnswerChange,
}: AttendMultipleChoiceProps) {
  const [checkedValues, setCheckedValues] = useState<
    Array<{ selectionValue: string; selectionNo: number }>
  >([]);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = {
      selectionValue: event.target.value,
      selectionNo: Number(event.target.name),
    };

    const newValues = event.target.checked
      ? [...checkedValues, newValue]
      : checkedValues.filter(
          (val) => val.selectionValue !== event.target.value
        );

    setCheckedValues(newValues);
    onAnswerChange(newValues);
  };

  const questionItems = surveyData.filter(
    (item) => item.surveyQuestionNo === questionNo
  );

  const mainQuestion = questionItems[0];

  if (!mainQuestion) {
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
        {!checkedValues.length && mainQuestion.required && (
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
        <FormControl component="fieldset">
          <FormLabel
            component="legend"
            sx={{
              fontSize: '18px',
              fontWeight: '600',
              color: 'black',
              marginBottom: '10px',
            }}
          >
            {mainQuestion.surveyQuestionTitle}
          </FormLabel>
          <FormGroup
            sx={{
              paddingTop: '10px',
            }}
          >
            {questionItems.map((item) => (
              <FormControlLabel
                key={item.selectionNo}
                control={
                  <Checkbox
                    checked={checkedValues.some(
                      (v) => v.selectionValue === (item.selectionValue || '')
                    )}
                    onChange={handleCheckboxChange}
                    value={item.selectionValue || ''}
                    name={item.selectionNo.toString()}
                  />
                }
                label={item.selectionValue || ''}
              />
            ))}
          </FormGroup>
        </FormControl>
      </CardContent>
    </Card>
  );
}

export default AttendMultipleChoice;
