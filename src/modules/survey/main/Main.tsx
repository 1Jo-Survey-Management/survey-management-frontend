/* eslint-disable react/react-in-jsx-scope */
import { useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import Floating from './components/Floating';
import ClosingSurvey from './components/ClosingSurvey';
import RecentSurvey from './components/RecentSurvey';
import WeeklySurvey from './components/WeeklySurvey';
import '../../../global.css';

function Main() {
  const navigate = useNavigate();
  const fontFamily = 'GmarketSansMedium';
  const textStyle = {
    fontFamily,
    color: '#464646',
  };
  const searchAll = {
    fontFamily,
    display: 'flex',
    alignItems: 'center', // 버튼을 세로 중앙으로 정렬
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
    justifyContent: 'space-between', // 자식 요소들을 가로로 나란히 배치
    alignItems: 'center', // 자식 요소들을 세로 중앙으로 정렬
  };

  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <Container sx={{ maxWidth: '1150px' }}>
      <h2 style={textStyle}>인기 설문🔥</h2>
      <WeeklySurvey />
      <div style={arrowStyle} />

      <Box sx={containerStyle}>
        <h2 style={textStyle}>최근 등록된 설문📝</h2>
        <Button onClick={() => navigate('/survey/search')} style={searchAll}>
          전체 보기
        </Button>
      </Box>

      <RecentSurvey />
      <div style={arrowStyle} />
      <h2 style={textStyle}>최근 마감된 설문⌛</h2>
      <ClosingSurvey />
      <div style={arrowStyle} />
      <Floating />
    </Container>
  );
}

export default Main;
