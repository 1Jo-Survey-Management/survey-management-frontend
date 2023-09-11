// LoginDisplay.tsx
import React from "react";
import Container from "@mui/material/Container";
import { useLocation } from "react-router-dom";
import CreateQuestionSingleSelection from "../components/CreateQuestionSingleSelection";

const CreationSurvey: React.FC = () => {
  const location = useLocation();

  console.log(location.pathname);
  return (
    <Container maxWidth="md">
      <h1>Creation Survey</h1>

      <CreateQuestionSingleSelection></CreateQuestionSingleSelection>
    </Container>
  );
};

export default CreationSurvey;
