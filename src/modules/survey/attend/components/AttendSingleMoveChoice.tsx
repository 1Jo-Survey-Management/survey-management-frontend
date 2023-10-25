import React, { useEffect, useState } from 'react';
import {
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  FormControlLabel,
  Card,
  CardContent,
  Typography,
} from '@mui/material';
import { SurveyItem } from '../types/AttendTypes';

interface AttendSingleMoveChoiceProps {
  surveyData: SurveyItem[];
  questionNo: number;
  onAnswerChange: (answer: {
    selectionValue: string;
    selectionNo: number;
    endOfSurvey: boolean;
  }) => void;
  handleSelectionClick: (
    currentQuestionNo: number,
    moveToQuestionNo: number,
    questionTypeNo: number,
    isMovable: boolean,
    isUnchecked: boolean,
    endOfSurvey: boolean
  ) => void;
}

function AttendSingleMoveChoice({
  surveyData,
  questionNo,
  onAnswerChange,
  handleSelectionClick,
}: AttendSingleMoveChoiceProps) {
  const [selectedValue, setSelectedValue] = useState<string | null>('');

  const currentQuestion = surveyData.find(
    (item) => item.surveyQuestionNo === questionNo
  );
  const relatedSelections = surveyData.filter(
    (item) => item.surveyQuestionNo === questionNo && item.selectionValue
  );

  const [isUnchecked, setIsUnchecked] = useState<boolean>(
    currentQuestion?.required || false
  );

  useEffect(() => {
    const selectedOption = surveyData.find(
      (opt) => opt.selectionValue === selectedValue
    );

    if (selectedOption) {
      const { questionTypeNo, movable, surveyQuestionMoveNo, endOfSurvey } =
        selectedOption;

      if (selectedValue === null) {
        handleSelectionClick(
          questionNo,
          surveyQuestionMoveNo,
          questionTypeNo,
          false,
          isUnchecked,
          endOfSurvey
        );
      } else if (movable) {
        handleSelectionClick(
          questionNo,
          surveyQuestionMoveNo,
          questionTypeNo,
          true,
          isUnchecked,
          endOfSurvey
        );
      } else {
        handleSelectionClick(
          questionNo,
          surveyQuestionMoveNo,
          questionTypeNo,
          false,
          isUnchecked,
          endOfSurvey
        );
      }
    }
  }, [selectedValue, isUnchecked]);

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    const selectedOption = relatedSelections.find(
      (opt) => opt.selectionValue === newValue
    );

    if (selectedOption) {
      if (selectedValue === newValue) {
        setSelectedValue(null);
        onAnswerChange({
          selectionValue: '',
          selectionNo: 0,
          endOfSurvey: false,
        });
        setIsUnchecked(true);
      } else {
        setSelectedValue(newValue);
        onAnswerChange({
          selectionValue: newValue,
          selectionNo: selectedOption.selectionNo,
          endOfSurvey: selectedOption.endOfSurvey,
        });
        setIsUnchecked(false);
      }
    }
  };

  const handleRadioToggle = (value: string) => {
    const selectedOption = relatedSelections.find(
      (opt) => opt.selectionValue === value
    );

    if (selectedOption) {
      if (selectedValue === value) {
        setSelectedValue(null);
        onAnswerChange({
          selectionValue: '',
          selectionNo: 0,
          endOfSurvey: false,
        });
        setIsUnchecked(true);
      } else {
        setSelectedValue(value);
        onAnswerChange({
          selectionValue: value,
          selectionNo: selectedOption.selectionNo,
          endOfSurvey: selectedOption.endOfSurvey,
        });
        setIsUnchecked(false);
      }
    }
  };
  return (
    <Card id={`question-${questionNo}`} sx={{ marginBottom: '30px' }}>
      <CardContent>
        {isUnchecked && currentQuestion?.required && (
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
        <FormControl component="fieldset">
          <FormLabel
            component="legend"
            sx={{
              fontSize: '1rem',
              fontWeight: '600',
              color: 'black',
              marginBottom: '10px',
            }}
          >
            {currentQuestion?.surveyQuestionTitle}
          </FormLabel>

          <Typography
            variant="body1"
            sx={{
              fontSize: '0.9rem',
            }}
          >
            {currentQuestion?.surveyQuestionDescription}
          </Typography>

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
                      sx={{
                        '& svg': {
                          width: '18px',
                          height: '18px',
                        },
                      }}
                      onClick={() =>
                        handleRadioToggle(item.selectionValue || '')
                      }
                    />
                  }
                  label={
                    <Typography
                      variant="body2"
                      sx={{
                        color:
                          selectedValue === item.selectionValue
                            ? 'blue'
                            : 'inherit',
                        fontWeight:
                          selectedValue === item.selectionValue
                            ? 'bold'
                            : 'normal',
                        fontSize:
                          selectedValue === item.selectionValue
                            ? '0.9rem'
                            : '0.8rem',
                      }}
                    >
                      {item.selectionValue || ''}
                    </Typography>
                  }
                />
              </div>
            ))}
          </RadioGroup>
        </FormControl>
      </CardContent>
    </Card>
  );
}

export default AttendSingleMoveChoice;
