import React, { useState } from 'react';
import Container from '@mui/material/Container';
import { Box, Button } from '@mui/material';
import axios from 'axios';
import CreateQuestion from '../components/CreateQuestion';
import FloatingActionButtons from '../components/FloatingActionButtons';
import CreateSurveyInfo from '../components/CreateSurveyInfo';
import { QuestionProps, SurveyInfoProps } from '../types/SurveyTypes';

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

  const handleSubmitSurveyWrite = async () => {
    /**
     * FIXME: 현재 로그인 기능 미완료로 인한 테스트 데이터.
     */
    surveyInfo.userNo = '1';

    const formData = new FormData();
    formData.append('surveyInfoCreateDto', JSON.stringify(surveyInfo));
    formData.append('surveyQuestionCreateDtoList', JSON.stringify(questions));

    console.log('questions json');
    console.log(JSON.stringify(questions));

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
        console.log('요청 성공');
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
