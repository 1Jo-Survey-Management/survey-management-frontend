import { Container } from '@mui/material';
import React from 'react';
import AttendSingleChoice from '../components/AttendSingleChoice';
import AttendMultipleChoice from '../components/AttendMultipleChoice';
import ShortAnswer from '../components/ShortAnswer';
import LongAnswer from '../components/LongAnswer';

function AttendSurvey() {
  return (
    <Container maxWidth="md" sx={{ paddingLeft: '5px', paddingRight: '5px' }}>
      <h1
        style={{
          fontSize: '25px',
        }}
      >
        플랫폼 만족도 조사
      </h1>
      <AttendSingleChoice />
      <AttendMultipleChoice />
      <ShortAnswer />
      <LongAnswer />
    </Container>
  );
}

export default AttendSurvey;
