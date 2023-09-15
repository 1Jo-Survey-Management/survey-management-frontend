// Main.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Floating from './components/Floating';
import CardSlide from './components/CardSlide';

function Main() {
  const navigate = useNavigate();
  return (
    <Container maxWidth="md">
      <h1>인기 설문</h1>
      <CardSlide />
      <h1>최근 등록된 설문</h1>
      <Button onClick={() => navigate('/survey/Search')}>전체 보기</Button>
      <CardSlide />
      <h1>최근 마감된 설문</h1>
      <CardSlide />
      <Floating />
    </Container>
  );
}

export default Main;
