import React from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import Floating from './components/Floating';
import ClosingSurvey from './components/ClosingSurvey';
import RecentSurvey from './components/RecentSurvey';
import WeeklySurvey from './components/WeeklySurvey';
import '../../../global.css';

import StatisticsPage from '../statistic/StatisticsPage';

function Main() {
  const navigate = useNavigate();
  const fontFamily = 'GmarketSansMedium';
  const textStyle = {
    fontFamily,
    color: '#464646',
  };
  const arrowStyle = {
    display: 'flex',
    justifyContent: 'flex-end',
    marginRight: '8px',
    marginTop: '8px',
  };

  return (
    <Container maxWidth="md">
      <h3 style={textStyle}>인기 설문🔥</h3>

      <Button onClick={() => navigate(`/survey/statistics/${1}`)}>
        통계보기
      </Button>

      {/* <WeeklySurvey />
      <div style={arrowStyle}>
        <ArrowBackIosRoundedIcon
          sx={{ fontSize: 'medium', marginRight: '8px' }}
        />
        <ArrowForwardIosRoundedIcon sx={{ fontSize: 'medium' }} />
      </div>
      <h3 style={textStyle}>
        최근 등록된 설문📝
        <Button onClick={() => navigate('/survey/search')} style={textStyle}>
          전체 보기
          <ArrowForwardIosRoundedIcon sx={{ fontSize: 'medium' }} />
        </Button>
      </h3>

      <RecentSurvey />
      <div style={arrowStyle}>
        <ArrowBackIosRoundedIcon
          sx={{ fontSize: 'medium', marginRight: '8px' }}
        />
        <ArrowForwardIosRoundedIcon sx={{ fontSize: 'medium' }} />
      </div>
      <h3 style={textStyle}>최근 마감된 설문⌛</h3>
      <ClosingSurvey />
      <div style={arrowStyle}>
        <ArrowBackIosRoundedIcon
          sx={{ fontSize: 'medium', marginRight: '8px' }}
        />
        <ArrowForwardIosRoundedIcon sx={{ fontSize: 'medium' }} />
      </div>
      <Floating /> */}
    </Container>
  );
}

export default Main;
