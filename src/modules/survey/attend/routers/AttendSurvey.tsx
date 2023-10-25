import React, { useEffect, useState } from 'react';
import { Button, Container, Stack } from '@mui/material';
import axios from 'axios';
import AttendSingleChoice from '../components/AttendSingleChoice';
import AttendSingleMoveChoice from '../components/AttendSingleMoveChoice';
import { SurveyData, SurveyItem } from '../types/AttendTypes';
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
  endOfSurvey?: boolean;
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
  // 모든 문항의 숨김 상태를 합친 배열 생성
  const allHiddenQuestions = Object.values(hiddenQuestions).flat();
  const uniqueQuestions = Array.from(
    new Set(surveyData.content.map((item) => item.surveyQuestionNo))
  );
  const [userResponses, setUserResponses] = useState<UserResponse[]>([]);
  const [surveyTitle, setSurveyTitle] = useState<string | null>(null);

  useState<number | null>(null);

  const USER_NO = 1;
  const SURVEY_NO = 8;

  const handleSelectionClick = (
    selectedQuestionNo: number,
    moveToQuestionNo: number,
    questionTypeNo: number,
    isMovable: boolean,
    isUnchecked: boolean,
    endOfSurvey: boolean
  ) => {
    console.log(
      `selectedQuestionNo: ${JSON.stringify(selectedQuestionNo, null, 2)}`
    );
    console.log(
      `moveToQuestionNo: ${JSON.stringify(moveToQuestionNo, null, 2)}`
    );
    console.log(`questionTypeNo: ${JSON.stringify(questionTypeNo, null, 2)}`);
    console.log(`isMovable: ${JSON.stringify(isMovable, null, 2)}`);
    console.log(`isUnchecked: ${JSON.stringify(isUnchecked, null, 2)}`);
    console.log(`endOfSurvey: ${JSON.stringify(endOfSurvey, null, 2)}`);
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

    if (endOfSurvey) {
      // 다른 모든 문항을 숨깁니다.
      setHiddenQuestions({
        ...hiddenQuestions,
        [selectedQuestionNo]: uniqueQuestions.filter(
          (q) => q !== selectedQuestionNo
        ),
      });
      // 다른 필수 문항의 답변을 초기화합니다.
      setUserResponses((responses) =>
        responses.filter(
          (response) => response.surveyQuestionNo === selectedQuestionNo
        )
      );
    }
  };

  const handleAnswerChange =
    (questionNo: number) =>
    (
      answerOrAnswers:
        | Array<{ selectionValue: string; selectionNo: number }>
        | { selectionValue: string; selectionNo: number; endOfSurvey: boolean }
        | string
    ) => {
      console.log(
        'handleAnswerChange called for question:',
        questionNo,
        answerOrAnswers
      );

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
            endOfSurvey: currentQuestionData.endOfSurvey,
          });
        });
        console.log(
          `객관식 복수 선택: ${JSON.stringify(newResponses, null, 2)}`
        );
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
          endOfSurvey: currentQuestionData.endOfSurvey,
        });
        console.log(
          `주관식 답변 (단답 or 장문): ${JSON.stringify(newResponses, null, 2)}`
        );
      }
      // 객관식 단일 선택 or 객관식 단일 선택(movable=true)
      else if (
        !Array.isArray(answerOrAnswers) &&
        typeof answerOrAnswers === 'object' &&
        (currentQuestionData.questionTypeNo === 1 ||
          currentQuestionData.questionTypeNo === 2)
      ) {
        const {
          selectionValue: answerString,
          selectionNo,
          endOfSurvey,
        } = answerOrAnswers;

        console.log('Selected answer:', answerString); // 1. answerString 확인

        newResponses.push({
          surveyQuestionTitle: currentQuestionData.surveyQuestionTitle,
          selectionValue: answerString,
          userNo: USER_NO,
          surveyNo: SURVEY_NO,
          surveyQuestionNo: currentQuestionData.surveyQuestionNo,
          questionTypeNo: currentQuestionData.questionTypeNo,
          selectionNo,
          surveySubjectiveAnswer: null,
          endOfSurvey, // 이 부분은 endOfSurvey가 selection에서 온다면 수정이 필요합니다.
        });
        console.log(
          `객관식 단일 선택 or 객관식 단일 선택(movable=true): ${JSON.stringify(
            newResponses,
            null,
            2
          )}`
        );
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
            onAnswerChange={(answer) => handleAnswerChange(questionNo)(answer)}
            handleSelectionClick={handleSelectionClick}
          />
        );
      case 2:
        return (
          <AttendSingleMoveChoice
            key={questionNo}
            surveyData={surveyData.content}
            questionNo={questionNo}
            onAnswerChange={(answer) => handleAnswerChange(questionNo)(answer)}
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

  // Alert function with scroll behavior
  function alertAndScrollTo(item: SurveyItem) {
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
  }

  const handleSubmit = async () => {
    if (!userResponses.some((response) => response.endOfSurvey)) {
      console.log(`제출 시: ${JSON.stringify(userResponses)}`);

      // eslint-disable-next-line no-restricted-syntax
      for (const item of surveyData.content) {
        if (item.required) {
          const responseExists = userResponses.find(
            (response) => response.surveyQuestionNo === item.surveyQuestionNo
          );

          if (!responseExists) {
            console.log(
              `Missing response for question: ${item.surveyQuestionNo}`
            );
            alertAndScrollTo(item);
            return;
          }

          if (
            item.questionTypeNo > 3 &&
            (!responseExists.surveySubjectiveAnswer ||
              responseExists.surveySubjectiveAnswer.trim() === '')
          ) {
            console.log(
              `Empty subjective answer for question: ${item.surveyQuestionNo}`
            );
            alertAndScrollTo(item);
            return;
          }
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
