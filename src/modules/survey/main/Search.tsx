import React from 'react';
import Container from '@mui/material/Container';
import Floating from './components/Floating';
import SurveyCard from './components/Card';

function Search() {
  return (
    <Container maxWidth="md">
      <h1>전체 설문</h1>
      <SurveyCard />
      <Floating />
    </Container>
  );
}

export default Search;
