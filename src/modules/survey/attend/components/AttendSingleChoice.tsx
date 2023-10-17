import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  FormControlLabel,
  Card,
  CardContent,
} from '@mui/material';
import { SurveyItem } from '../types/AttendTypes';

interface AttendSingleChoiceProps {
  surveyData: SurveyItem[];
  questionNo: number;
}

function AttendSingleChoice({
  surveyData,
  questionNo,
}: AttendSingleChoiceProps) {
  const [selectedValue, setSelectedValue] = useState<string | null>('');

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };

  // 문항과 선택지를 필터링하기 위한 로직
  const currentQuestion = surveyData.find(
    (item) => item.surveyQuestionNo === questionNo
  );
  const relatedSelections = surveyData.filter(
    (item) => item.surveyQuestionNo === questionNo && item.selectionValue
  );

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
            }}
          >
            {currentQuestion?.surveyQuestionTitle}
          </FormLabel>
          <RadioGroup
            aria-label="문항"
            name={`question-${questionNo}`}
            value={selectedValue}
            onChange={handleRadioChange}
            sx={{
              paddingTop: '10px',
            }}
          >
            {relatedSelections.map((item) => (
              <FormControlLabel
                key={item.selectionNo}
                value={item.selectionValue || ''}
                control={<Radio />}
                label={item.selectionValue || ''}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </CardContent>
    </Card>
  );
}

export default AttendSingleChoice;
