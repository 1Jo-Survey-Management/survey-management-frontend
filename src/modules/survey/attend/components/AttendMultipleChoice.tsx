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
}

function AttendMultipleChoice({
  surveyData,
  questionNo,
}: AttendMultipleChoiceProps) {
  const [checkedValues, setCheckedValues] = useState<string[]>([]);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setCheckedValues((prev) => [...prev, event.target.value]);
    } else {
      setCheckedValues((prev) =>
        prev.filter((val) => val !== event.target.value)
      );
    }
  };

  const questionItems = surveyData.filter(
    (item) => item.surveyQuestionNo === questionNo
  );

  const mainQuestion = questionItems[0];

  if (!mainQuestion) {
    return null; // 혹은 다른 적절한 처리
  }

  return (
    <Card
      sx={{
        marginBottom: '30px',
      }}
    >
      <CardContent>
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
                    checked={checkedValues.includes(item.selectionValue || '')}
                    onChange={handleCheckboxChange}
                    value={item.selectionValue || ''}
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
