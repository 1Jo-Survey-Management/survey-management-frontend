import React, { useState } from 'react';
import Container from '@mui/material/Container';
import CreateQuestion from '../components/CreateQuestion';
import FloatingActionButtons from '../components/FloatingActionButtons';
import CreateSurveyInfo from '../components/CreateSurveyInfo';
import { QuestionProps, SurveyInfoProps } from '../types/SurveyTypes';

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
    openStatus: '',
  });

  const [questions, setQuestions] = useState<QuestionProps[]>([
    {
      surveyId,
      questionId: new Date().getTime(),
      questionTitle: '',
      questionDescription: '',
      questionRequired: true,
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
        questionRequired: true,
      },
    ]);
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
        />
      ))}

      <FloatingActionButtons onClickAddQuestion={handleAddQuestion} />
    </Container>
  );
}

export default CreationSurvey;
