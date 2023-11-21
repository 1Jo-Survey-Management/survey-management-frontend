/**
 * AttendSingleMoveChoice 컴포넌트는 단일 선택 가능한 문항에 대한 UI를 제공하며, 선택에 따라
 * 다른 문항으로 이동할 수 있는 기능을 지원합니다.
 * 이 컴포넌트는 MUI의 FormControl, FormLabel, RadioGroup, FormControlLabel, Radio 등의 컴포넌트를 사용하여 구현되었습니다.
 *
 * @component
 * @author 박창우
 *
 * @prop {SurveyItem[]} surveyData - 문항 및 선택 항목을 포함하는 설문 데이터입니다.
 * @prop {number} questionNo - 현재 문항 번호입니다.
 * @prop {function} onAnswerChange - 답변이 선택되거나 선택이 취소될 때 호출되는 콜백 함수입니다.
 * @prop {function} handleSelectionClick - 선택 항목이 클릭될 때 호출되는 콜백 함수입니다.
 */
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
    endOfSurvey: boolean,
    selectionNo: number
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

  /**
   * 선택된 옵션에 따른 이동 로직을 처리하는 함수입니다.
   *
   * @param selectedValue 사용자가 선택한 옵션 값
   * @param isUnchecked 선택 항목이 체크되지 않았는지의 여부
   * @returns 없음
   * @author 박창우
   */
  useEffect(() => {
    const selectedOption = surveyData.find(
      (opt) => opt.selectionValue === selectedValue
    );

    if (selectedOption) {
      const {
        questionTypeNo,
        movable,
        surveyQuestionMoveNo,
        endOfSurvey,
        selectionNo,
      } = selectedOption;

      if (selectedValue === null) {
        handleSelectionClick(
          questionNo,
          surveyQuestionMoveNo,
          questionTypeNo,
          false,
          isUnchecked,
          endOfSurvey,
          selectionNo
        );
      } else if (movable) {
        handleSelectionClick(
          questionNo,
          surveyQuestionMoveNo,
          questionTypeNo,
          true,
          isUnchecked,
          endOfSurvey,
          selectionNo
        );
      } else {
        handleSelectionClick(
          questionNo,
          surveyQuestionMoveNo,
          questionTypeNo,
          false,
          isUnchecked,
          endOfSurvey,
          selectionNo
        );
      }
    }
  }, [selectedValue, isUnchecked, surveyData, questionNo]);

  /**
   * 라디오 버튼 선택 변경 핸들러 함수입니다.
   *
   * @param event 라디오 버튼 이벤트 객체
   * @returns 없음
   * @author 박창우
   */
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

  /**
   * 라디오 버튼의 선택 상태를 토글하는 함수입니다.
   *
   * @param value 라디오 버튼의 값
   * @returns 없음
   * @author 박창우
   */
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
              '&.Mui-focused': {
                color: '#3e3e3e', // 포커스 시 색상 변경
              },
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
                        '&.Mui-checked': {
                          color: '#3e3e3e', // 선택 시 라디오 버튼 색상 변경
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
                            ? '#3e3e3e'
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
