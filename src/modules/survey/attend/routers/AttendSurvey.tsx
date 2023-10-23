import React, { useEffect, useState } from 'react';
import { Button, Container, Stack } from '@mui/material';
import axios from 'axios';
import AttendSingleChoice from '../components/AttendSingleChoice';
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
  const USER_NO = 1;
  const SURVEY_NO = 2;

  const handleSelectionClick = (
    selectedQuestionNo: number,
    moveToQuestionNo: number,
    isMovable: boolean
  ) => {
    if (isMovable) {
      // 숨겨야 할 문항 번호의 배열 설정
      setHiddenQuestions(
        Array.from(
          { length: moveToQuestionNo - selectedQuestionNo - 1 },
          (_, i) => i + selectedQuestionNo + 1
        )
      );

      // 지정된 문항으로 스크롤 이동
      const targetElement = document.getElementById(
        `question-${moveToQuestionNo}`
      );
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // 숨겨진 문항들을 다시 보여주기 위해 배열 초기화
      setHiddenQuestions([]);
    }
  };
  const handleAnswerChange =
    (questionNo: number) =>
    (
      answerOrAnswers:
        | Array<{ selectionValue: string; selectionNo: number }>
        | string
    ) => {
      console.log('handleAnswerChange called with:', {
        questionNo,
        answerOrAnswers,
      }); // 이 부분을 추가합니다.

      const currentQuestionData = surveyData.content.find(
        (item) => item.surveyQuestionNo === questionNo
      );

      if (!currentQuestionData) {
        console.error('Question not found');
        return;
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
    axios
      .get<SurveyData>(
        'http://localhost:8000/api/for-attend/surveys/survey-data'
      )
      .then((response) => {
        const filteredData = response.data.content
          .filter((item) => item.surveyNo === 2)
          .sort((a, b) => a.surveyQuestionNo - b.surveyQuestionNo);
        setSurveyData({
          ...response.data,
          content: filteredData,
        });
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
      <h1 style={{ fontSize: '25px' }}>플랫폼 만족도 조사</h1>
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
