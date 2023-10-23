import React, { useEffect, useState } from 'react';
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
  handleSelectionClick: (
    currentQuestionNo: number,
    moveToQuestionNo: number,
    isMovable: boolean
  ) => void;
}

function AttendSingleChoice({
  surveyData,
  questionNo,
  onAnswerChange,
  handleSelectionClick, // 이 부분을 추가합니다.
}: AttendSingleChoiceProps) {
  const [selectedValue, setSelectedValue] = useState<string | null>('');

  useEffect(() => {
    console.log(`selectedValue in useEffect: ${selectedValue}`);

    const selectedOption = surveyData.find(
      (opt) => opt.selectionValue === selectedValue
    );

    if (selectedOption?.movable) {
      const isMovable = selectedOption.movable;
      const moveToQuestionNo = selectedOption.surveyQuestionMoveNo;
      handleSelectionClick(questionNo, moveToQuestionNo, isMovable);
    } else {
      // 이 부분을 추가하여 선택지1이 아닌 다른 선택지가 선택되었거나 선택이 해제되었을 때,
      // 숨김처리를 해제하도록 합니다.
      handleSelectionClick(questionNo, questionNo, false);
    }
  }, [selectedValue]);
  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;

    if (selectedValue === newValue) {
      setSelectedValue(null);
      onAnswerChange('');
    } else {
      setSelectedValue(newValue);
      onAnswerChange(newValue);
    }
  };

  const handleRadioToggle = (value: string) => {
    if (selectedValue === value) {
      setSelectedValue(null);
      onAnswerChange('');
    } else {
      setSelectedValue(value);
      onAnswerChange(value);
    }
  };

  const currentQuestion = surveyData.find(
    (item) => item.surveyQuestionNo === questionNo
  );
  const relatedSelections = surveyData.filter(
    (item) => item.surveyQuestionNo === questionNo && item.selectionValue
  );

  return (
    <Card id={`question-${questionNo}`} sx={{ marginBottom: '30px' }}>
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
            sx={{
              paddingTop: '10px',
            }}
          >
            {relatedSelections.map((item) => (
              <div key={item.selectionNo}>
                <FormControlLabel
                  value={item.selectionValue || ''}
                  control={
                    <Radio
                      onClick={() =>
                        handleRadioToggle(item.selectionValue || '')
                      }
                    />
                  }
                  label={item.selectionValue || ''}
                />
              </div>
            ))}
          </RadioGroup>
        </FormControl>
      </CardContent>
    </Card>
  );
}

export default AttendSingleChoice;
