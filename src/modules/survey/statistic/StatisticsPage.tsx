import * as React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
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
  {
    surveyNo: 1,
    surveyTitle: '카페 이용 조사',
    surveyQuestion: '가장 선호하는 음료는 무엇입니까?',
    surveyQuestionType: 1,
    surveyAnswerCount: 50,
    surveyAnswerSelection: '아이스 아메리카노',
    surveyAnswerSelectionNo: 1,
    surveyAnswerSelectionCount: 25,
  },
  {
    surveyNo: 1,
    surveyTitle: '카페 이용 조사',
    surveyQuestion: '가장 선호하는 음료는 무엇입니까?',
    surveyQuestionType: 1,
    surveyAnswerCount: 50,
    surveyAnswerSelection: '카페라떼',
    surveyAnswerSelectionNo: 1,
    surveyAnswerSelectionCount: 10,
  },
  {
    surveyNo: 1,
    surveyTitle: '카페 이용 조사',
    surveyQuestion: '가장 선호하는 음료는 무엇입니까?',
    surveyQuestionType: 1,
    surveyAnswerCount: 50,
    surveyAnswerSelection: '과일 주스',
    surveyAnswerSelectionNo: 3,
    surveyAnswerSelectionCount: 8,
  },
  {
    surveyNo: 1,
    surveyTitle: '카페 이용 조사',
    surveyQuestion: '가장 선호하는 음료는 무엇입니까?',
    surveyQuestionType: 1,
    surveyAnswerCount: 50,
    surveyAnswerSelection: '차 종류',
    surveyAnswerSelectionNo: 4,
    surveyAnswerSelectionCount: 7,
  },
];

export default function StatisticsPage() {
  return (
    <Card sx={styles.card}>
      <CardContent>
        <Box>
          {/* <Typography style={textStyle}>
            <h1>설문조사 결과보기</h1>
          </Typography> */}
          <Typography style={textStyle} sx={{ textAlign: 'center' }}>
            <h2>카페 이용 조사</h2>
          </Typography>

          <Typography style={textStyle}>
            <h4>1. 가장 선호하는 음료는 무엇입니까?</h4>
          </Typography>
          <GooglePie />

          <Typography style={textStyle}>
            <h4>1. 가장 선호하는 음료는 무엇입니까?</h4>
          </Typography>
          <WordCloud />

          <Typography style={textStyle}>
            <h4>1-2. 선호하는 이유는 무엇입니까?</h4>
          </Typography>
          <AnswerList />
        </Box>
      </CardContent>
    </Card>
  );
}
