import React, { useEffect, useState } from 'react';
import { Button, Container, Stack } from '@mui/material';
import axios from 'axios';
import AttendSingleChoice from '../components/AttendSingleChoice';
import AttendMultipleChoice from '../components/AttendMultipleChoice';
import ShortAnswer from '../components/ShortAnswer';
import LongAnswer from '../components/LongAnswer';
import { SurveyData } from '../types/AttendTypes';

function AttendSurvey() {
  const [surveyData, setSurveyData] = useState<SurveyData>({
    success: false,
    content: [],
    errorResponse: null,
  });

  useEffect(() => {
    // 데이터를 불러오는 API 호출
    axios
      .get<SurveyData>(
        'http://localhost:8000/api/for-attend/surveys/survey-data'
      )
      .then((response) => {
        // 서버에서 받은 데이터 중 surveyNo가 2인 데이터만 필터링
        const filteredData = response.data.content
          .filter((item) => item.surveyNo === 6)
          .sort((a, b) => a.surveyQuestionNo - b.surveyQuestionNo); // surveyQuestionNo를 기준으로 오름차순 정렬

        console.log('surveyNo가 2인 데이터들만 필터링: ', filteredData);
        setSurveyData({
          ...response.data,
          content: filteredData,
        });
      })
      .catch((error) => {
        console.error('Error fetching survey data:', error);
      });
  }, []);

  const uniqueQuestions = Array.from(
    new Set(surveyData.content.map((item) => item.surveyQuestionNo))
  );

  return (
    <Container maxWidth="md" sx={{ paddingLeft: '5px', paddingRight: '5px' }}>
      <h1 style={{ fontSize: '25px' }}>플랫폼 만족도 조사</h1>
      {uniqueQuestions.map((questionNo) => {
        const question = surveyData.content.find(
          (item) => item.surveyQuestionNo === questionNo
        );
        // question 값이 존재하는지 체크하기
        if (!question) {
          return null; // 혹은 다른 적절한 처리
        }

        const { questionTypeNo } = question;
        switch (questionTypeNo) {
          case 1:
            return (
              <AttendSingleChoice
                key={questionNo}
                surveyData={surveyData.content}
                questionNo={questionNo}
              />
            );
          case 2:
            return (
              <AttendMultipleChoice
                key={questionNo}
                surveyData={surveyData.content}
                questionNo={questionNo}
              />
            );
          case 3:
            return (
              <ShortAnswer
                key={questionNo}
                surveyData={surveyData.content}
                questionNo={questionNo}
              />
            );
          case 4:
            return (
              <LongAnswer
                key={questionNo}
                surveyData={surveyData.content}
                questionNo={questionNo}
              />
            );
          default:
            return null;
        }
      })}
      <Stack
        direction="row"
        spacing={2}
        style={{ display: 'flex', justifyContent: 'space around' }}
      >
        <Button variant="contained">제출하기</Button>
        <Button variant="contained">돌아가기</Button>
      </Stack>
    </Container>
  );
}

export default AttendSurvey;
