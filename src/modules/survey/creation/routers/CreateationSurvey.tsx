import React, { useState } from 'react';
import Container from '@mui/material/Container';
import { Box, Button } from '@mui/material';
import CreateQuestion from '../components/CreateQuestion';
import FloatingActionButtons from '../components/FloatingActionButtons';
import CreateSurveyInfo from '../components/CreateSurveyInfo';
import {
  QuestionProps,
  // SelectionProps,
  SurveyInfoProps,
} from '../types/SurveyTypes';

function CreationSurvey() {
  const [surveyId] = useState<number>(new Date().getTime());

  const [surveyInfo, setSurveyInfo] = useState<SurveyInfoProps>({
    surveyId,
    surveyInfoId: new Date().getTime(),
    surveyTitle: '',
    surveyImage: '',
    surveyTags: [],
    surveyDescription: '',
    surveyClosingAt: '',
    openStatus: '전체공개',
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

  // const [selections, setSelections] = useState<SelectionProps[]>([]);

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

  const handleSubmitSurvey = () => {
    console.log(surveyInfo);
    console.log(questions);
    // console.log(selections);
  };

  return (
    <Container maxWidth="md">
      <h1>Creation Survey</h1>

      <CreateSurveyInfo surveyInfo={surveyInfo} setSurveyInfo={setSurveyInfo} />

      {questions.map((question) => (
        <CreateQuestion
          key={question.questionId}
          question={question}
          questions={questions}
          setQuestions={setQuestions}
          // selections={selections}
          // setSelections={setSelections}
        />
      ))}

      <Box sx={{ marginRight: '10px', marginBottom: '1000px' }}>
        <Button
          variant="contained"
          color="success"
          sx={{ marginRight: '20px' }}
          onClick={handleSubmitSurvey}
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
