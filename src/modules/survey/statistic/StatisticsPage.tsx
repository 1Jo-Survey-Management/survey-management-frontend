import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import AnswerList from './components/AnswerList';
import GooglePieChart from './components/GooglePieChart';
import '../../../global.css';
import axios from 'axios';
import WordCloud from './components/WordCloud';
import { PieData, SurveyQuestion } from './types/SurveyStatistics';

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
  const [questionData, setQuestionData] = useState<SurveyQuestion[]>([]);
  const [selectionData, setSelectionData] = useState<PieData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/survey/result?surveyno=1`
        );
        setQuestionData(response.data);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };
    fetchData();
  });

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

          {questionData.map((question, index) => (
            <div key={index}>
              <Typography style={textStyle}>
                <h4>{`${question.questionNo}. ${question.surveyQuestionTitle}`}</h4>
              </Typography>
              {question.questionTypeNo === 1 || 2 ? (
                <GooglePieChart selectionAnswer={question} />
              ) : (
                <AnswerList selectionAnswer={question} />
              )}
            </div>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}
