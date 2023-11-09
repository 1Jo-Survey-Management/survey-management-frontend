/**
 * AttendSurvey 컴포넌트는 사용자에게 설문조사를 제출할 수 있는 인터페이스를 제공합니다.
 * 이 컴포넌트는 여러 종류의 질문 유형을 지원하며 사용자 응답을 수집하고 제출하는 기능을 포함합니다.
 *
 * @component
 * @author 박창우
 */
import React, { useEffect, useState } from 'react';
import { Button, Container, Stack } from '@mui/material';
import axios from '../../../login/components/customApi';
import AttendSingleChoice from '../components/AttendSingleChoice';
import AttendSingleMoveChoice from '../components/AttendSingleMoveChoice';
import { SurveyData, SurveyItem } from '../types/AttendTypes';
import AttendMultipleChoice from '../components/AttendMultipleChoice';
import ShortAnswer from '../components/ShortAnswer';
import LongAnswer from '../components/LongAnswer';
import ScrollProgress from '../util/ScrollProgress';

/**
 * 사용자의 응답 데이터 인터페이스입니다.
 */
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
  const allHiddenQuestions = Object.values(hiddenQuestions).flat();
  const uniqueQuestions = Array.from(
    new Set(surveyData.content.map((item) => item.surveyQuestionNo))
  );
  const [userResponses, setUserResponses] = useState<UserResponse[]>([]);
  const [surveyTitle, setSurveyTitle] = useState<string | null>(null);

  useState<number | null>(null);

  const USER_NO = 1;
  const SURVEY_NO = 8;

  /**
   * 선택 항목을 클릭할 때 동작하는 함수입니다.
   * 이 함수는 사용자가 선택한 항목에 따라 특정 질문을 숨기거나 표시하는 로직을 담당합니다.
   *
   * @param selectedQuestionNo 현재 선택된 질문 번호
   * @param moveToQuestionNo 이동할 질문 번호
   * @param questionTypeNo 질문 유형 번호
   * @param isMovable 이동 가능 여부
   * @param isUnchecked 선택 여부 확인
   * @param endOfSurvey 설문 종료 여부
   * @returns 없음
   * @author 박창우
   */
  const handleSelectionClick = (
    selectedQuestionNo: number,
    moveToQuestionNo: number,
    questionTypeNo: number,
    isMovable: boolean,
    isUnchecked: boolean,
    endOfSurvey: boolean
  ) => {
    const currentHiddenQuestions = hiddenQuestions[selectedQuestionNo] || [];

    let newHiddenQuestions: number[] = [];

    if (isMovable && questionTypeNo === 2) {
      for (let i = selectedQuestionNo + 1; i < moveToQuestionNo; i += 1) {
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

    if (isUnchecked) {
      setUserResponses((prev) =>
        prev.filter(
          (response) => response.surveyQuestionNo !== selectedQuestionNo
        )
      );
    }

    setHiddenQuestions({
      ...hiddenQuestions,
      [selectedQuestionNo]: newHiddenQuestions,
    });

    if (endOfSurvey) {
      const questionsToHide = uniqueQuestions.filter(
        (q) => q > selectedQuestionNo
      );

      setHiddenQuestions({
        ...hiddenQuestions,
        [selectedQuestionNo]: questionsToHide,
      });

      const questionsToRemove = uniqueQuestions.filter((q) => {
        const currentQuestion = surveyData.content.find(
          (item) => item.surveyQuestionNo === q
        );
        return (
          q > selectedQuestionNo &&
          currentQuestion &&
          currentQuestion.questionTypeNo !== 2
        );
      });

      setUserResponses((responses) =>
        responses.filter(
          (response) => !questionsToRemove.includes(response.surveyQuestionNo)
        )
      );
    }
  };

  /**
   * 사용자의 응답을 처리하는 함수입니다.
   * 각 질문 유형에 따라 다르게 동작합니다.
   *
   * @param questionNo 현재 질문 번호
   * @returns 변경된 응답 처리 함수
   * @author 박창우
   */
  const handleAnswerChange =
    (questionNo: number) =>
    (
      answerOrAnswers:
        | Array<{ selectionValue: string; selectionNo: number }>
        | { selectionValue: string; selectionNo: number; endOfSurvey: boolean }
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
            endOfSurvey: currentQuestionData.endOfSurvey,
          });
        });
      } else if (
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
      } else if (
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

        if (!answerString) {
          setUserResponses((prev) =>
            prev.filter(
              (response) =>
                response.surveyQuestionNo !==
                currentQuestionData.surveyQuestionNo
            )
          );
        } else {
          newResponses.push({
            surveyQuestionTitle: currentQuestionData.surveyQuestionTitle,
            selectionValue: answerString,
            userNo: USER_NO,
            surveyNo: SURVEY_NO,
            surveyQuestionNo: currentQuestionData.surveyQuestionNo,
            questionTypeNo: currentQuestionData.questionTypeNo,
            selectionNo,
            surveySubjectiveAnswer: null,
            endOfSurvey,
          });
        }
      }

      setUserResponses((prev) => {
        const updatedResponses = prev.filter(
          (response) =>
            response.surveyQuestionNo !== currentQuestionData.surveyQuestionNo
        );
        return [...updatedResponses, ...newResponses];
      });
    };

  /**
   * 설문조사의 특정 질문을 렌더링하는 함수입니다.
   *
   * @param questionNo 렌더링할 질문 번호
   * @returns 렌더링된 React 요소
   * @author 박창우
   */
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

  /**
   * 컴포넌트가 마운트 될 때 설문조사 데이터를 가져오는 함수입니다.
   *
   * @returns 없음
   * @author 박창우
   */
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

  /**
   * 사용자가 제출 버튼을 클릭했을 때 동작하는 함수입니다.
   * 유효성 검사 후 서버에 응답 데이터를 제출합니다.
   *
   * @returns 없음
   * @author 박창우
   */
  const handleSubmit = async () => {
    console.log(`제출 시: ${JSON.stringify(userResponses)}`);

    const lastEndOfSurveyQuestion = userResponses.some(
      (response) => response.endOfSurvey
    )
      ? Math.max(
          ...userResponses
            .filter((response) => response.endOfSurvey)
            .map((response) => response.surveyQuestionNo)
        )
      : null;

    // eslint-disable-next-line no-restricted-syntax
    for (const item of surveyData.content) {
      if (
        lastEndOfSurveyQuestion &&
        item.surveyQuestionNo > lastEndOfSurveyQuestion
      )
        // eslint-disable-next-line no-continue
        continue;

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
      <ScrollProgress />
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
