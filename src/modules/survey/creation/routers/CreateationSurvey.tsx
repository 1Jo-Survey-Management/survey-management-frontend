// LoginDisplay.tsx
import React, { useState } from "react";
import Container from "@mui/material/Container";
import { useLocation } from "react-router-dom";
import CreateQuestion from "../components/CreateQuestion";
import FloatingActionButtons from "../components/FloatingActionButtons";
import CreateSurveyInfo from "../components/CreateSurveyInfo";

interface SurveyInfoProps {
  id: number;
  surveyTitle: string;
  surveyImage: string;
  surveyTags: string[];
  endDate: string;
  openStatus: string;
  surveyDescription: string;
}

const CreationSurvey: React.FC = () => {
  const location = useLocation();

  const [questions, setQuestions] = useState<any[]>([
    { id: new Date().getTime() },
  ]);

  const [surveyInfo, setSurveyInfo] = useState<SurveyInfoProps>({
    id: new Date().getTime(),
    surveyTitle: "",
    surveyImage: "",
    surveyTags: [],
    surveyDescription: "",
    endDate: "",
    openStatus: "",
  });

  const handleAddQuestion = () => {
    setQuestions([...questions, { id: new Date().getTime() }]);
    console.log(questions);
  };

  const handleRemoveQuestion = (removeTargetId: number) => {
    console.log("제대로 들어옴?");
    if (questions.length === 1) {
      return;
    }

    console.log(removeTargetId);
    const updateSelections = questions.filter((question) => {
      return question.id !== removeTargetId;
    });

    setQuestions(updateSelections);
  };
  console.log("삭제후", questions);

  console.log(location.pathname);
  return (
    <Container maxWidth="md">
      <h1>Creation Survey</h1>

      <CreateSurveyInfo></CreateSurveyInfo>

      {questions.map((question, index) => {
        return (
          <CreateQuestion
            key={index}
            question={question}
            onClickRemoveQuestion={() => handleRemoveQuestion(question.id)}
            questions={questions}
            setQuestions={setQuestions}
          ></CreateQuestion>
        );
      })}

      <FloatingActionButtons
        onClickAddQuestion={handleAddQuestion}
      ></FloatingActionButtons>
    </Container>
  );
};

export default CreationSurvey;
