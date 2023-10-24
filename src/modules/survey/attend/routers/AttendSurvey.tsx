import React, { useEffect, useState } from 'react';
import { Button, Container, Stack } from '@mui/material';
import axios from 'axios';
import AttendSingleChoice from '../components/AttendSingleChoice';
import AttendSingleMoveChoice from '../components/AttendSingleMoveChoice';
import { SurveyData } from '../types/AttendTypes';
import AttendMultipleChoice from '../components/AttendMultipleChoice';
import ShortAnswer from '../components/ShortAnswer';
import LongAnswer from '../components/LongAnswer';

interface UserResponse {
  surveyQuestionTitle: string;
  selectionValue: string | null;
  userNo: number;
  surveyNo: number;
  surveyQuestionNo: number;
  questionTypeNo: number;
  selectionNo: number;
  surveySubjectiveAnswer: string | null;
}

function AttendSurvey() {
  const [surveyData, setSurveyData] = useState<SurveyData>({
    success: false,
    content: [],
    errorResponse: null,
  });

  const [hiddenQuestions, setHiddenQuestions] = useState<number[]>([]);
  const [userResponses, setUserResponses] = useState<UserResponse[]>([]);
  const [surveyTitle, setSurveyTitle] = useState<string | null>(null);

  useState<number | null>(null);

  const USER_NO = 1;
  const SURVEY_NO = 2;

  const handleSelectionClick = (
    selectedQuestionNo: number,
    moveToQuestionNo: number,
    questionTypeNo: number,
    isMovable: boolean
  ) => {
    console.log(`selectedQuestionNo: ${selectedQuestionNo}`);
    console.log(`moveToQuestionNo: ${moveToQuestionNo}`);
    console.log(`questionTypeNo: ${questionTypeNo}`);
    console.log(`isMovable: ${isMovable}`);
    const newHiddenQuestions = [...hiddenQuestions];

    // movable=true이며, questionTypeNo가 2인 경우
    if (isMovable && questionTypeNo === 2) {
      // 현재 선택된 문항과 moveToQuestionNo 사이의 문항들을 숨김 처리합니다.
      // eslint-disable-next-line no-plusplus
      for (let i = selectedQuestionNo + 1; i < moveToQuestionNo; i++) {
        if (!newHiddenQuestions.includes(i)) {
          newHiddenQuestions.push(i);
        }
      }
    }
    // movable=false인 선택지가 선택된 경우, 그리고 해당 문항의 숨김 처리가 이미 되었다면
    else if (!isMovable && questionTypeNo === 2 && moveToQuestionNo === 0) {
      for (
        let i = selectedQuestionNo + 1;
        i <= hiddenQuestions[hiddenQuestions.length - 1];
        // eslint-disable-next-line no-plusplus
        i++
      ) {
        const index = newHiddenQuestions.indexOf(i);
        if (index !== -1) {
          newHiddenQuestions.splice(index, 1);
        }
      }
    }

    setHiddenQuestions(newHiddenQuestions);
  };

  const handleAnswerChange =
    (questionNo: number) =>
    (
      answerOrAnswers:
        | Array<{ selectionValue: string; selectionNo: number }>
        | string
    ) => {
      const currentQuestionData = surveyData.content.find(
        (item) => item.surveyQuestionNo === questionNo
      );

      if (!currentQuestionData) {
        console.error('Question not found');
        return;
      }

      if (currentQuestionData && currentQuestionData.questionTypeNo === 2) {
        if (typeof answerOrAnswers === 'string') {
          const answerString = answerOrAnswers;
          if (!answerString) {
            // 선택 해제 시
            setHiddenQuestions((prevHidden) =>
              prevHidden.filter((q) => q <= questionNo || q > questionNo + 1)
            );
          }
        }
      }

      const newResponses: UserResponse[] = [];

      if (
        Array.isArray(answerOrAnswers) &&
        typeof answerOrAnswers[0] === 'object'
      ) {
        // 객관식 복수 선택인 경우
        answerOrAnswers.forEach((selection) => {
          newResponses.push({
            surveyQuestionTitle: currentQuestionData.surveyQuestionTitle,
            selectionValue: selection.selectionValue,
            userNo: USER_NO,
            surveyNo: SURVEY_NO,
            surveyQuestionNo: currentQuestionData.surveyQuestionNo,
            questionTypeNo: currentQuestionData.questionTypeNo,
            selectionNo: selection.selectionNo, // 여기에서 직접 selectionNo를 가져옵니다.
            surveySubjectiveAnswer: null, // 기본 값을 null로 설정
          });
        });
      } else if (currentQuestionData.questionTypeNo > 2) {
        // 주관식 답변인 경우
        newResponses.push({
          surveyQuestionTitle: currentQuestionData.surveyQuestionTitle,
          selectionValue: null,
          userNo: USER_NO,
          surveyNo: SURVEY_NO,
          surveyQuestionNo: currentQuestionData.surveyQuestionNo,
          questionTypeNo: currentQuestionData.questionTypeNo,
          selectionNo: 0,
          surveySubjectiveAnswer: answerOrAnswers as string, // 주관식 답변은 string 타입이므로 형변환
        });
      } else if (typeof answerOrAnswers === 'string') {
        // 나머지 경우
        const answerString = answerOrAnswers;
        newResponses.push({
          surveyQuestionTitle: currentQuestionData.surveyQuestionTitle,
          selectionValue: answerString,
          userNo: USER_NO,
          surveyNo: SURVEY_NO,
          surveyQuestionNo: currentQuestionData.surveyQuestionNo,
          questionTypeNo: currentQuestionData.questionTypeNo,
          selectionNo: currentQuestionData.selectionNo,
          surveySubjectiveAnswer: null,
        });
      }

      setUserResponses((prev) => {
        let updatedResponses = prev.filter(
          (response) =>
            response.surveyQuestionNo !== currentQuestionData.surveyQuestionNo
        );
        updatedResponses = [...updatedResponses, ...newResponses];
        return updatedResponses;
      });
    };

  const renderQuestion = (questionNo: number) => {
    // if (hiddenQuestions.includes(questionNo)) return null;
    const question = surveyData.content.find(
      (item) => item.surveyQuestionNo === questionNo
    );
    if (!question) return null;

    const { questionTypeNo } = question;
    switch (questionTypeNo) {
      case 1:
        return (
          <AttendSingleChoice
            key={questionNo}
            surveyData={surveyData.content}
            questionNo={questionNo}
            onAnswerChange={handleAnswerChange(questionNo)}
            handleSelectionClick={handleSelectionClick} // 함수 자체만 전달합니다.
          />
        );
      case 2:
        return (
          <AttendSingleMoveChoice
            key={questionNo}
            surveyData={surveyData.content}
            questionNo={questionNo}
            onAnswerChange={handleAnswerChange(questionNo)}
            handleSelectionClick={handleSelectionClick}
          />
        );
      case 3:
        return (
          <AttendMultipleChoice
            key={questionNo}
            surveyData={surveyData.content}
            questionNo={questionNo}
            onAnswerChange={handleAnswerChange(questionNo)}
          />
        );
      case 4:
        return (
          <ShortAnswer
            key={questionNo}
            surveyData={surveyData.content}
            questionNo={questionNo}
            onAnswerChange={handleAnswerChange(questionNo)}
          />
        );
      case 5:
        return (
          <LongAnswer
            key={questionNo}
            surveyData={surveyData.content}
            questionNo={questionNo}
            onAnswerChange={handleAnswerChange(questionNo)}
          />
        );
      default:
        return null;
    }
  };

  useEffect(() => {
    console.log('useEffect running');
    axios
      .get<SurveyData>(
        'http://localhost:8000/api/for-attend/surveys/survey-data'
      )
      .then((response) => {
        const filteredData = response.data.content
          .filter((item) => item.surveyNo === 8)
          .sort((a, b) => a.surveyQuestionNo - b.surveyQuestionNo);
        setSurveyData({
          ...response.data,
          content: filteredData,
        });

        if (response.data.success && filteredData.length > 0) {
          setSurveyTitle(filteredData[0].surveyTitle);
        }
      })
      .catch((error) => {
        console.error('Error fetching survey data:', error);
      });
  }, []);

  const handleSubmit = async () => {
    // 필수 응답 문항 체크
    // eslint-disable-next-line no-restricted-syntax
    for (const item of surveyData.content) {
      if (item.required) {
        const responseExists = userResponses.find(
          (response) => response.surveyQuestionNo === item.surveyQuestionNo
        );
        if (
          !responseExists ||
          (item.questionTypeNo > 2 &&
            (!responseExists.surveySubjectiveAnswer ||
              responseExists.surveySubjectiveAnswer.trim() === ''))
        ) {
          alert('필수 응답 문항에 답변하세요.');
          const targetElement = document.getElementById(
            `question-${item.surveyQuestionNo}`
          );
          if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
          } else {
            console.error(
              'Target element not found for question:',
              item.surveyQuestionNo
            );
          }
          return;
        }
      }
    }

    const isConfirmed = window.confirm('설문을 제출하시겠습니까?');
    if (!isConfirmed) return;

    try {
      const response = await axios.post(
        'http://localhost:8000/api/for-attend/surveys/save-responses',
        userResponses
      );

      if (response.data.success) {
        alert('설문 응답이 성공적으로 전송되었습니다.');
      } else if (response.data.errorCode === 'ERROR_SAVING_SURVEY') {
        alert('설문 응답 저장 중 오류가 발생했습니다.');
      } else {
        alert('오류가 발생했습니다. 다시 시도해주세요.');
      }
    } catch (error) {
      console.error('Error submitting data:', error);
      alert('서버와의 통신 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  const uniqueQuestions = Array.from(
    new Set(surveyData.content.map((item) => item.surveyQuestionNo))
  );

  return (
    <Container maxWidth="md" sx={{ paddingLeft: '5px', paddingRight: '5px' }}>
      <h1
        style={{ fontSize: '25px', display: 'flex', justifyContent: 'center' }}
      >
        {surveyTitle}
      </h1>
      {uniqueQuestions.map((questionNo) => {
        if (!hiddenQuestions.includes(questionNo)) {
          return renderQuestion(questionNo);
        }
        return null;
      })}
      <Stack spacing={2}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSubmit}
        >
          설문 제출
        </Button>
      </Stack>
    </Container>
  );
}

export default AttendSurvey;
