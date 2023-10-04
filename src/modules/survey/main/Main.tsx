// Main.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Floating from './components/Floating';
import ClosingSurvey from './components/ClosingSurvey';
import RecentSurvey from './components/RecentSurvey';
import WeeklySurvey from './components/WeeklySurvey';
import '../../../global.css';

function Main() {
  const navigate = useNavigate();
  const fontFamily = "'Noto Sans KR', sans-serif";
  const textStyle = {
    fontFamily: fontFamily,
  };

  return (
    <Container maxWidth="md">
      <h2 style={textStyle}>인기 설문</h2>
      <WeeklySurvey />
      <h2 style={textStyle}>
        최근 등록된 설문
        <Button onClick={() => navigate('/survey/Search')}>전체 보기</Button>
      </h2>

      <RecentSurvey />
      <h2 style={textStyle}>최근 마감된 설문</h2>
      <ClosingSurvey />
      <Floating />
    </Container>
  );
}

export default Main;
