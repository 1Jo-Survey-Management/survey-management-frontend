// LoginDisplay.tsx
import React, { useState } from "react";
import Container from "@mui/material/Container";
import { useLocation } from "react-router-dom";
import CreateQuestionSingleSelection from "../components/CreateQuestionSingleSelection";
import FloatingActionButtons from "../components/FloatingActionButtons";

const CreationSurvey: React.FC = () => {
  const location = useLocation();

  const [questions, setQuestions] = useState<any[]>([
    { id: new Date().getTime() },
  ]);

  const handleAddQuestion = () => {
    setQuestions([...questions, { id: new Date().getTime() }]);
  };

  const handleRemoveQuestion = () => {};

  console.log(location.pathname);
  return (
    <Container maxWidth="md">
      <h1>Creation Survey</h1>

      {questions.map((question, index) => {
        return (
          <CreateQuestionSingleSelection
            key={index}
          ></CreateQuestionSingleSelection>
        );
      })}

      {/* <CreateQuestionSingleSelection></CreateQuestionSingleSelection> */}
      <FloatingActionButtons
        onClickAddQuestion={handleAddQuestion}
      ></FloatingActionButtons>
    </Container>
  );
};

export default CreationSurvey;
