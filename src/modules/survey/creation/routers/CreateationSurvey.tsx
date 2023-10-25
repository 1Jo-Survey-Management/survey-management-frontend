/** @jsxImportSource @emotion/react */

import React, { useState } from 'react';
import Container from '@mui/material/Container';
import { Box, Button } from '@mui/material';
import axios from 'axios';
import FloatingActionButtons from '../components/FloatingActionButtons';
import CreateSurveyInfo from '../components/CreateSurveyInfo';
import { QuestionProps, SurveyInfoProps } from '../types/SurveyTypes';
import { validationSurvey } from '../util/ValidatorUtil';
import { QuestionTypeEnum } from '../../enums/QuestionTypeEnum';
import { OpenStatusEnum } from '../../enums/OpenStatusEnum';
import { SurveyStatusEunm } from '../../enums/SurveyStatusEnum';
import DragDropQuestion from '../components/DragDropQuestions';

function CreateationSurvey() {
  const [surveyId] = useState<number>(new Date().getTime());

  const [surveyImage, setSurveyImage] = useState<File>();

  const [surveyInfo, setSurveyInfo] = useState<SurveyInfoProps>({
    surveyId,
    surveyInfoId: new Date().getTime(),
    surveyTitle: '',
    surveyTags: [],
    surveyDescription: '',
    surveyClosingAt: '',
    openStatusNo: OpenStatusEnum.PUBLIC,
    surveyStatusNo: SurveyStatusEunm.WRITING,
  });

  const [questions, setQuestions] = useState<QuestionProps[]>([
    {
      surveyId,
      questionId: new Date().getTime(),
      questionTitle: '',
      questionDescription: '',
      questionType: QuestionTypeEnum.SINGLE_QUESTION,
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
        questionType: QuestionTypeEnum.SINGLE_QUESTION,
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
    const validationResult = await validationSurvey(
      surveyInfo,
      surveyImage,
      questions
    );

    if (!validationResult) {
      return;
    }

    const formData = new FormData();
    formData.append('surveyInfoCreateDto', JSON.stringify(surveyInfo));
    formData.append('surveyQuestionCreateDtoList', JSON.stringify(questions));

    if (surveyImage !== undefined) {
      formData.append('surveyImage', surveyImage);
    }

    try {
      const response = await axios.post(
        'http://localhost:8080/api/surveys',
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

  /**
   * 설문을 바로 게시하기 위해 제출하는 메서드 입니다.
   *
   * @returns 작성을 완료할 경우 main페이지로 리다이렉트
   * @author 강명관
   */
  const handleSubmitSurveyPost = async () => {
    const validationResult = await validationSurvey(
      surveyInfo,
      surveyImage,
      questions
    );

    if (!validationResult) {
      return;
    }

    surveyInfo.surveyStatusNo = SurveyStatusEunm.PROGRESS;

    const formData = new FormData();
    formData.append('surveyInfoCreateDto', JSON.stringify(surveyInfo));
    formData.append('surveyQuestionCreateDtoList', JSON.stringify(questions));

    if (surveyImage !== undefined) {
      formData.append('surveyImage', surveyImage);
    }

    try {
      const response = await axios.post(
        'http://localhost:8080/api/surveys',
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
    <Container maxWidth="md" css={{ marginTop: '30px' }}>
      <CreateSurveyInfo
        surveyInfo={surveyInfo}
        setSurveyInfo={setSurveyInfo}
        setSurveyImage={setSurveyImage}
      />

      <DragDropQuestion questions={questions} setQuestions={setQuestions} />

      <Box sx={{ marginRight: '10px', marginBottom: '100px' }}>
        <Button
          variant="contained"
          color="success"
          sx={{ marginRight: '20px' }}
          onClick={handleSubmitSurveyWrite}
        >
          작성하기
        </Button>

        <Button variant="contained" onClick={handleSubmitSurveyPost}>
          개시하기
        </Button>
      </Box>
      <FloatingActionButtons
        onClickAddQuestion={handleAddQuestion}
        surveyInfo={surveyInfo}
        surveyImage={surveyImage || undefined}
        questions={questions}
      />
    </Container>
  );
}

export default CreateationSurvey;
