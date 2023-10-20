import * as React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import AnswerList from './components/AnswerList';
import GooglePieChart from './components/GooglePieChart';
import '../../../global.css';
import WordCloud from './components/WordCloud';

const styles = {
  card: {
    boxShadow: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);',
    marginBottom: '30px',
  },
};
const fontFamily = "'Noto Sans KR', sans-serif";
const textStyle = {
  fontFamily,
};

export default function StatisticsPage() {
  return (
    <Card sx={styles.card}>
      <CardContent>
        <Box>
          <Typography style={textStyle}>
            <h1>설문조사 결과보기</h1>
          </Typography>
          <Typography style={textStyle} sx={{ textAlign: 'center' }}>
            <h2>카페 이용 조사</h2>
          </Typography>

          <Typography style={textStyle}>
            <h4>1. 가장 선호하는 음료는 무엇입니까?</h4>
          </Typography>
          <GooglePieChart />

          {/* <Typography style={textStyle}>
            <h4>1. 가장 선호하는 음료는 무엇입니까?</h4>
          </Typography>
          <WordCloud /> */}

          <Typography style={textStyle}>
            <h4>1-2. 선호하는 이유는 무엇입니까?</h4>
          </Typography>
          <AnswerList />
        </Box>
      </CardContent>
    </Card>
  );
}
