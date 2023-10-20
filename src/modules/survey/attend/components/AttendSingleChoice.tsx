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
  onAnswerChange: (answer: string) => void;
}

function AttendSingleChoice({
  surveyData,
  questionNo,
  onAnswerChange,
}: AttendSingleChoiceProps) {
  const [selectedValue, setSelectedValue] = useState<string | null>('');

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    // 이미 선택된 버튼을 다시 클릭한 경우 선택을 취소
    if (selectedValue === newValue) {
      setSelectedValue(null);
      onAnswerChange(''); // 또는 원하는 초기값
    } else {
      setSelectedValue(newValue);
      onAnswerChange(newValue);
    }
  };

  const handleRadioGroupClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const clickedValue = (event.target as HTMLInputElement).value;
    if (clickedValue === selectedValue) {
      setSelectedValue(null);
      onAnswerChange(''); // 또는 원하는 초기값
    }
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
      id={`question-${questionNo}`}
      sx={{
        marginBottom: '30px',
      }}
    >
      <CardContent>
        {!selectedValue && currentQuestion?.required && (
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
            }}
          >
            {currentQuestion?.surveyQuestionTitle}
          </FormLabel>

          <RadioGroup
            aria-label="문항"
            name={`question-${questionNo}`}
            value={selectedValue}
            onChange={handleRadioChange}
            onClick={handleRadioGroupClick}
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
