import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { Backdrop, Box, CircularProgress } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Floating from '../components/Floating';
import ClosingSurvey from '../components/ClosingSurvey';
import RecentSurvey from '../components/RecentSurvey';
import WeeklySurvey from '../components/WeeklySurvey';
import '../../../../global.css';
import { CardDataProps } from '../types/MainType';
import axios from '../../../login/components/customApi';

const fontFamily = 'GmarketSansMedium';
const textStyle = {
  fontFamily,
  color: '#464646',
};
const searchAll = {
  fontFamily,
  display: 'flex',
  alignItems: 'center',
  color: '#464646',
};
const arrowStyle = {
  display: 'flex',
  justifyContent: 'flex-end',
  marginRight: '8px',
  marginTop: '8px',
};
const containerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

function Main() {
  const [weeklySurveyData, setWeeklySurveyData] = useState<CardDataProps[]>([]);
  const [recentSurveyData, setRecentSurveyData] = useState<CardDataProps[]>([]);
  const [closingSurveyData, setClosingSurveyData] = useState<CardDataProps[]>(
    []
  );

  const [weeklySurveyLoaded, setWeeklySurveyLoaded] = useState(false);
  const [recentSurveyLoaded, setRecentSurveyLoaded] = useState(false);
  const [closingSurveyLoaded, setClosingSurveyLoaded] = useState(false);

  const navigate = useNavigate();

  const fetchWeeklySurveyData = async () => {
    try {
      const weeklyResponse = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/surveys/weekly`
      );
      setWeeklySurveyData(weeklyResponse.data);
      setWeeklySurveyLoaded(true);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchRecentSurveyData = async () => {
    try {
      const card = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/surveys/recent`
      );

      setRecentSurveyData(card.data);
      setRecentSurveyLoaded(true);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchClosingSurveyData = async () => {
    try {
      const card = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/surveys/closing`
      );
      setClosingSurveyData(card.data);
      setClosingSurveyLoaded(true);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchWeeklySurveyData();
    fetchRecentSurveyData();
    fetchClosingSurveyData();
  }, []);

  const redirectToSurvey = sessionStorage.getItem('redirectToSurvey');

  useEffect(() => {
    console.log(redirectToSurvey);
  }, [redirectToSurvey]);

  if (!weeklySurveyLoaded && !recentSurveyLoaded && !closingSurveyLoaded) {
    return (
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={
          !weeklySurveyLoaded && !recentSurveyLoaded && !closingSurveyLoaded
        }
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  return (
    <Container sx={{ maxWidth: '1150px', marginTop: '60px' }}>
      <h2 style={textStyle}>인기 설문🔥</h2>
      <WeeklySurvey cardList={weeklySurveyData} />
      <div style={arrowStyle} />

      <Box sx={containerStyle}>
        <h2 style={textStyle}>최근 등록된 설문📝</h2>
        <Button onClick={() => navigate('/survey/search')} style={searchAll}>
          전체 보기
          <ChevronRightIcon sx={{ marginBottom: '2.5px' }} />
        </Button>
      </Box>

      <RecentSurvey cardList={recentSurveyData} />
      <div style={arrowStyle} />
      <h2 style={textStyle}>최근 마감된 설문⌛</h2>
      <ClosingSurvey cardList={closingSurveyData} />
      <div style={arrowStyle} />
      <Floating />
    </Container>
  );
}

export default Main;
