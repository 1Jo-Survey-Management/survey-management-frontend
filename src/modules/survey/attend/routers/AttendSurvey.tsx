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

  const [hiddenQuestions, setHiddenQuestions] = useState<
    Record<number, number[]>
  >({});
  const [userResponses, setUserResponses] = useState<UserResponse[]>([]);
  const [surveyTitle, setSurveyTitle] = useState<string | null>(null);

  useState<number | null>(null);

  const USER_NO = 1;
  const SURVEY_NO = 2;

  const handleSelectionClick = (
    selectedQuestionNo: number,
    moveToQuestionNo: number,
    questionTypeNo: number,
    isMovable: boolean,
    isUnchecked: boolean
  ) => {
    const currentHiddenQuestions = hiddenQuestions[selectedQuestionNo] || [];

    let newHiddenQuestions: number[] = [];

    if (isMovable && questionTypeNo === 2) {
      // eslint-disable-next-line no-plusplus
      for (let i = selectedQuestionNo + 1; i < moveToQuestionNo; i++) {
        if (!currentHiddenQuestions.includes(i)) {
          newHiddenQuestions.push(i);
        }
      }
    } else if (
      (!isMovable && questionTypeNo === 2 && moveToQuestionNo === 0) ||
      isUnchecked
    ) {
      newHiddenQuestions = currentHiddenQuestions.filter(
        (qNo) => qNo < moveToQuestionNo
      );
    }

    setHiddenQuestions({
      ...hiddenQuestions,
      [selectedQuestionNo]: newHiddenQuestions,
    });
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

      const newResponses: UserResponse[] = [];

      // 객관식 복수 선택
      if (
        Array.isArray(answerOrAnswers) &&
        typeof answerOrAnswers[0] === 'object'
      ) {
        answerOrAnswers.forEach((selection) => {
          newResponses.push({
            surveyQuestionTitle: currentQuestionData.surveyQuestionTitle,
            selectionValue: selection.selectionValue,
            userNo: USER_NO,
            surveyNo: SURVEY_NO,
            surveyQuestionNo: currentQuestionData.surveyQuestionNo,
            questionTypeNo: currentQuestionData.questionTypeNo,
            selectionNo: selection.selectionNo,
            surveySubjectiveAnswer: null,
          });
        });
      }
      // 주관식 답변 (단답 or 장문)
      else if (
        currentQuestionData.questionTypeNo === 4 ||
        currentQuestionData.questionTypeNo === 5
      ) {
        newResponses.push({
          surveyQuestionTitle: currentQuestionData.surveyQuestionTitle,
          selectionValue: null,
          userNo: USER_NO,
          surveyNo: SURVEY_NO,
          surveyQuestionNo: currentQuestionData.surveyQuestionNo,
          questionTypeNo: currentQuestionData.questionTypeNo,
          selectionNo: 0,
          surveySubjectiveAnswer: answerOrAnswers as string,
        });
      }
      // 객관식 단일 선택 or 객관식 단일 선택(movable=true)
      else if (
        typeof answerOrAnswers === 'string' &&
        (currentQuestionData.questionTypeNo === 1 ||
          currentQuestionData.questionTypeNo === 2)
      ) {
        const answerString = answerOrAnswers;
        if (answerString) {
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
      }

      // 기존 응답 중 해당 질문의 응답을 제거하고 새로운 응답을 추가
      setUserResponses((prev) => {
        const updatedResponses = prev.filter(
          (response) =>
            response.surveyQuestionNo !== currentQuestionData.surveyQuestionNo
        );
        return [...updatedResponses, ...newResponses];
      });
    };

  const renderQuestion = (questionNo: number) => {
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
            handleSelectionClick={handleSelectionClick}
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

  // 모든 문항의 숨김 상태를 합친 배열 생성
  const allHiddenQuestions = Object.values(hiddenQuestions).flat();
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
        if (!allHiddenQuestions.includes(questionNo)) {
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
