import React from 'react';
import ReactWordcloud, { Options } from 'react-wordcloud';
import {
  Box,
  Card,
  CardContent,
  Typography,
  useMediaQuery,
} from '@mui/material';
import SurveyPieChart from './components/SurveyPieChart';
import AnswerList from './components/AnswerList';
import { GooglePie } from './components/GooglePie';
import '../../../global.css';
import WordCloud from './components/WordCloud';

const styles = {
  card: {
    boxShadow: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);',
    marginBottom: '30px',
  },
  WordCloud: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
};

const fontFamily = "'Noto Sans KR', sans-serif";
const textStyle = {
  fontFamily,
};

interface surveyData {
  surveyNo: number;
  surveyTitle: string;
  surveyQuestion: string;
  surveyQuestionType: number;
  surveyAnswerCount: number;
  surveyAnswerSelection: string;
  surveyAnswerSelectionNo: number;
  surveyAnswerSelectionCount: number;
}

const surveyData: surveyData[] = [
  // Survey data here...
];

export default function StatisticsPage() {
  const isSmallScreen = useMediaQuery('(max-width: 600px)');
  const pieChartWidth = isSmallScreen ? '100%' : '500px';
  const wordCloudWidth = isSmallScreen ? '100%' : '500px';

  return (
    <Card sx={styles.card}>
      <CardContent>
        <Box>
          <Typography style={textStyle} sx={{ textAlign: 'center' }}>
            <h2>카페 이용 조사</h2>
          </Typography>

          <Typography style={textStyle}>
            <h4>1. 가장 선호하는 음료는 무엇입니까?</h4>
          </Typography>
          <GooglePie width={pieChartWidth} />

          <Typography style={textStyle}>
            <h4>1. 가장 선호하는 음료는 무엇입니까?</h4>
          </Typography>
          <Box sx={{ width: wordCloudWidth, margin: '0 auto' }}>
            <WordCloud />
          </Box>
          <Typography style={textStyle}>
            <h4>1-2. 선호하는 이유는 무엇입니까?</h4>
          </Typography>
          <AnswerList />
        </Box>
      </CardContent>
    </Card>
  );
}
