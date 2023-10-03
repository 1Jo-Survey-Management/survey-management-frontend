import React, { useState } from 'react';
import Container from '@mui/material/Container';
import { Box, Button } from '@mui/material';
import axios from 'axios';
import { validate } from 'class-validator';
import Swal from 'sweetalert2';
import CreateQuestion from '../components/CreateQuestion';
import FloatingActionButtons from '../components/FloatingActionButtons';
import CreateSurveyInfo from '../components/CreateSurveyInfo';
import { QuestionProps, SurveyInfoProps } from '../types/SurveyTypes';
import SurveyInfoValidation from '../validator/SurveyInfoValidation';
import QuestionValidation from '../validator/QuestionValidation';
import SelectionValidation from '../validator/SelectionValidation';
import { getValidationErrorMessage } from '../util/ValidatorUtil';

function CreationSurvey() {
  const [surveyId] = useState<number>(new Date().getTime());

  const [surveyImage, setSurveyImage] = useState<File>();

  const [surveyInfo, setSurveyInfo] = useState<SurveyInfoProps>({
    surveyId,
    surveyInfoId: new Date().getTime(),
    surveyTitle: '',
    surveyTags: [],
    surveyDescription: '',
    surveyClosingAt: '',
    openStatusNo: 1,
    surveyStatusNo: 1,
    userNo: null,
  });

  const [questions, setQuestions] = useState<QuestionProps[]>([
    {
      surveyId,
      questionId: new Date().getTime(),
      questionTitle: '',
      questionDescription: '',
      questionType: '1',
      questionRequired: true,
      selections: [],
    },
  ]);

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      {
        surveyId,
        questionId: new Date().getTime(),
        questionTitle: '',
        questionDescription: '',
        questionType: '1',
        questionRequired: true,
        selections: [],
      },
    ]);
  };

  /**
   * 설문을 작성하는 메서드입니다.
   *
   * @returns 설문이 성공적으로 작성시 main 페이지로 리다이렉트 합니다.
   * @author 강명관
   */
  const handleSubmitSurveyWrite = async () => {
    /**
     * FIXME: 현재 로그인 기능 미완료로 인한 테스트 데이터.
     */
    surveyInfo.userNo = '1';

    const surveyInfoValidation: SurveyInfoValidation = new SurveyInfoValidation(
      surveyInfo.surveyId,
      surveyInfo.surveyInfoId,
      surveyInfo.surveyClosingAt,
      surveyInfo.surveyTitle,
      surveyInfo.surveyTags,
      surveyInfo.openStatusNo,
      surveyInfo.surveyDescription,
      surveyInfo.surveyStatusNo,
      surveyInfo.userNo
    );

    const surveyInfoErrors = await validate(surveyInfoValidation);

    if (surveyInfoErrors.length > 0) {
      const errorMessage = getValidationErrorMessage(
        surveyInfoValidation,
        surveyInfoErrors
      );
      Swal.fire({
        icon: 'error',
        title: '입력되지 않은 사항이 존재합니다.',
        text: `${errorMessage}`,
      });
      return;
    }

    if (surveyImage === undefined || surveyImage === null) {
      Swal.fire({
        icon: 'error',
        title: '입력되지 않은 사항이 존재합니다.',
        text: `설문의 대표 이미지는 필수 입니다.`,
      });
      return;
    }

    if (questions.length < 1) {
      Swal.fire({
        icon: 'error',
        title: '입력되지 않은 사항이 존재합니다.',
        text: `문항의 개수는 최소 1개 이상입니다.`,
      });
      return;
    }

    const questionSelectionType: string[] = ['1', '2', '3'];

    questions.map(async (question) => {
      const questionValidation = new QuestionValidation(
        question.surveyId,
        question.questionId,
        question.questionTitle,
        question.questionRequired,
        question.questionType,
        question.selections,
        question.questionDescription
      );

      const questionErrors = await validate(questionValidation);
      if (questionErrors.length > 0) {
        const errorMessage: string[] = getValidationErrorMessage(
          questionValidation,
          questionErrors
        );
        Swal.fire({
          icon: 'error',
          title: '입력되지 않은 사항이 존재합니다.',
          text: `${errorMessage}`,
        });
        return;
      }

      if (questionSelectionType.includes(question.questionType)) {
        question.selections.map(async (selection) => {
          const selectionValidation = new SelectionValidation(
            selection.questionId,
            selection.selectionId,
            selection.selectionValue,
            selection.isMoveable,
            selection.questionMoveId
          );

          const selectionErrors = await validate(selectionValidation);

          if (selectionErrors.length > 0) {
            const errorMessage: string[] = getValidationErrorMessage(
              selectionValidation,
              selectionErrors
            );
            Swal.fire({
              icon: 'error',
              title: '입력되지 않은 사항이 존재합니다.',
              text: `${errorMessage}`,
            });
          }
        });
      }
    });

    const formData = new FormData();
    formData.append('surveyInfoCreateDto', JSON.stringify(surveyInfo));
    formData.append('surveyQuestionCreateDtoList', JSON.stringify(questions));

    if (surveyImage !== undefined) {
      formData.append('surveyImage', surveyImage);
    }

    try {
      const response = await axios.post(
        'http://localhost:8080/v1/survey',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.status === 201) {
        console.log('설문 등록 성공');
      } else {
        console.error('요청 실패:', response.status, response.statusText);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container maxWidth="md">
      <h1>Creation Survey</h1>
      <CreateSurveyInfo
        surveyInfo={surveyInfo}
        setSurveyInfo={setSurveyInfo}
        setSurveyImage={setSurveyImage}
      />
      {questions.map((question) => (
        <CreateQuestion
          key={question.questionId}
          question={question}
          questions={questions}
          setQuestions={setQuestions}
        />
      ))}
      <Box sx={{ marginRight: '10px', marginBottom: '1000px' }}>
        <Button
          variant="contained"
          color="success"
          sx={{ marginRight: '20px' }}
          onClick={handleSubmitSurveyWrite}
        >
          작성하기
        </Button>

        <Button variant="contained">개시하기</Button>
      </Box>
      <FloatingActionButtons onClickAddQuestion={handleAddQuestion} />
    </Container>
  );
}

export default CreationSurvey;
